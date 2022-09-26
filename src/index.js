import { calculate } from './js/parser.js';
import { saveTheme, readTheme } from './js/localstorage.js';
import mitt from 'mitt';
import './styles/index.scss';

const emitter = mitt();

const toggleThemeClass = ({ theme }) => {
  const body = document.querySelector('body');
  removePreviousClass(body, /theme-*/i);

  body.classList.toggle(theme);
  saveTheme(theme);
};

const updateThemeSelectorToggle = ({ theme }) => {
  const themeCircle = document.querySelector('.circle');
  removePreviousClass(themeCircle, /circle-+/i);

  themeCircle.classList.toggle(`circle--${theme}`);
};

emitter.on('theme.change', toggleThemeClass);
emitter.on('theme.change', updateThemeSelectorToggle);

const removePreviousClass = (element, previousActiveClassRegex) => {
  const previousActiveClass = [...element.classList.values()].filter((cls) =>
    previousActiveClassRegex.test(cls)
  );
  if (previousActiveClass.length > 0) {
    element.classList.remove(previousActiveClass);
  }
};

const changeThemeHandler = (evt) => {
  if (evt.target.type === 'radio') {
    emitter.emit('theme.change', { theme: evt.target.id });
  }
};

const calculatorPadHandler = (evt) => {
  const { value } = evt.target;
  switch (value) {
    case 'calc': {
      const displayWrapper = document.querySelector('.display');
      const display = document.querySelector('#display');
      try {
        const exp = display.value;
        if (exp.length === 0) return;
        const result = calculate(exp);
        removePreviousClass(displayWrapper, /has-errors/i);
        display.value = result;
        return;
      } catch (err) {
        displayWrapper.classList.toggle('display--has-errors');
        return;
      }
    }

    case 'clear': {
      const displayWrapper = document.querySelector('.display');
      const display = document.querySelector('#display');
      display.value = '';
      removePreviousClass(displayWrapper, /has-errors/i);
      return;
    }

    case 'del': {
      const display = document.querySelector('#display');
      const value = display.value;
      display.value = value.slice(0, -1);
      return;
    }

    default: {
      if (value) {
        const display = document.querySelector('#display');
        display.value += value;
      }
    }
  }
};

const onKeyupHandler = (evt) => {
  if (evt.code === 'Enter') {
    const displayWrapper = document.querySelector('.display');
    const display = document.querySelector('#display');
    try {
      const exp = display.value;
      if (exp.length === 0) return;
      const result = calculate(exp);
      displayWrapper.classList.toggle('display--has-errors');
      display.value = result;
      return;
    } catch (err) {
      displayWrapper.classList.toggle('display--has-errors');
    }
  }
};

document.addEventListener('DOMContentLoaded', () => {
  const theme = document.querySelector('.theme__selector');
  const calculatorPad = document.querySelector('.calculator__pad');
  const display = document.querySelector('#display');

  const savedTheme = readTheme();
  if (savedTheme?.theme) {
    const { theme } = savedTheme;
    emitter.emit('theme.change', { theme });
  }

  theme.addEventListener('click', changeThemeHandler);
  calculatorPad.addEventListener('click', calculatorPadHandler);
  display.addEventListener('keyup', onKeyupHandler);
});
