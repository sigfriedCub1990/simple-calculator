import "./styles/index.scss";

const toggleThemeClass = (el, theme) => {
  const body = document.querySelector(el);
  const previousActiveClassRegex = /theme-*/i;
  const previousActiveClass = [...body.classList.values()].filter((cls) =>
    previousActiveClassRegex.test(cls)
  );
  if (previousActiveClass.length) {
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
    const previousActiveClassRegex = /circle--*/i;
    const previousActiveClass = [...themeCircle.classList.values()].filter(
      (cls) => previousActiveClassRegex.test(cls)
    );
    if (previousActiveClass.length) {
      themeCircle.classList.remove(previousActiveClass);
    }
    themeCircle.classList.toggle(`circle--${evt.target.id}`);
    toggleThemeClass("body", evt.target.id);
  }
};

