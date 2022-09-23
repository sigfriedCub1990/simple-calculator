import { calculate } from "./js/parser.js";
import "./styles/index.scss";

const toggleThemeClass = (element, theme) => {
  const body = document.querySelector(element);
  const previousActiveClassRegex = /theme-*/i;
  const previousActiveClass = [...body.classList.values()].filter((cls) =>
    previousActiveClassRegex.test(cls)
  );
  if (previousActiveClass.length > 0) {
    body.classList.remove(previousActiveClass);
  }

  switch (theme) {
    case "theme-1":
      body.classList.toggle(`theme-default`);
      break;
    case "theme-2":
      body.classList.toggle(`theme-light`);
      break;
    case "theme-3":
      body.classList.toggle(`theme-dark`);
  }
};

const changeThemeHandler = (evt) => {
  if (evt.target.type === "radio") {
    const themeCircle = document.querySelector(".circle");
    const previousActiveClassRegex = /circle-+/i;
    const previousActiveClass = [...themeCircle.classList.values()].filter(
      (cls) => previousActiveClassRegex.test(cls)
    );
    if (previousActiveClass.length > 0) {
      themeCircle.classList.remove(previousActiveClass);
    }

    themeCircle.classList.toggle(`circle--${evt.target.id}`);
    toggleThemeClass("body", evt.target.id);
  }
};

const calculatorPadHandler = (evt) => {
  const { value } = evt.target;
  switch (value) {
    case "calc": {
      const display = document.querySelector("#display");
      const exp = display.value;
      if (exp.length === 0) return;
      const result = calculate(exp);
      display.value = result;
      return;
    }

    case "clear": {
      const display = document.querySelector("#display");
      display.value = "";
      return;
    }

    case "del": {
      const display = document.querySelector("#display");
      const value = display.value;
      display.value = value.slice(0, -1);
      return;
    }

    default: {
      if (value) {
        const display = document.querySelector("#display");
        display.value += value;
      }
    }
  }
};

document.addEventListener("DOMContentLoaded", () => {
  const theme = document.querySelector(".theme__selector");
  const calculatorPad = document.querySelector(".calculator__pad");

  theme.addEventListener("click", changeThemeHandler);
  calculatorPad.addEventListener("click", calculatorPadHandler);
});
