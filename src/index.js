import { calculate } from './js/parser.js';
import './styles/index.scss';

const toggleThemeClass = (element, theme) => {
  const body = document.querySelector(element);
  removePreviousClass(body, /theme-*/i);

  switch (theme) {
    case 'theme-1':
      body.classList.toggle(`theme-default`);
      break;
    case 'theme-2':
      body.classList.toggle(`theme-light`);
      break;
    case 'theme-3':
      body.classList.toggle(`theme-dark`);
  }
};

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
    const themeCircle = document.querySelector('.circle');
    removePreviousClass(themeCircle, /circle-+/i);

    themeCircle.classList.toggle(`circle--${evt.target.id}`);
    toggleThemeClass('body', evt.target.id);
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

  theme.addEventListener('click', changeThemeHandler);
  calculatorPad.addEventListener('click', calculatorPadHandler);
  display.addEventListener('keyup', onKeyupHandler);
});
