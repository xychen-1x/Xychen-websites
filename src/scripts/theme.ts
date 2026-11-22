const storageKey = "xychen-theme";
const root = document.documentElement;
const toggle = document.querySelector<HTMLButtonElement>("[data-theme-toggle]");
const label = document.querySelector<HTMLElement>("[data-theme-label]");

function applyTheme(theme: "dark" | "light") {
  root.dataset.theme = theme;
  toggle?.setAttribute("aria-pressed", String(theme === "dark"));
  toggle?.setAttribute("aria-label", theme === "dark" ? "Switch to light theme" : "Switch to dark theme");
  if (label) {
    label.textContent = theme === "dark" ? "Switch to light theme" : "Switch to dark theme";
  }

  try {
    localStorage.setItem(storageKey, theme);
  } catch {
    // Theme switching remains available for the current page.
  }
}

let initialTheme: "dark" | "light" = "light";
try {
  const savedTheme = localStorage.getItem(storageKey);
  if (savedTheme === "light" || savedTheme === "dark") initialTheme = savedTheme;
} catch {
  // Default to the light woodland theme.
}

applyTheme(initialTheme);
toggle?.addEventListener("click", () => {
  applyTheme(root.dataset.theme === "dark" ? "light" : "dark");
});
