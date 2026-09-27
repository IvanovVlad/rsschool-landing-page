const setLightTheme = () => {
  window.localStorage.setItem("theme", "light");
  document.body.setAttribute("theme", "light");
};

const setDarkTheme = () => {
  window.localStorage.setItem("theme", "dark");
  document.body.setAttribute("theme", "dark");
};

let theme = window.localStorage.getItem("theme");

if (!theme || !["dark", "light"].includes(theme)) {
  setLightTheme();
} else if (theme === "light") {
  setLightTheme();
} else if (theme === "dark") {
  setDarkTheme();
}
