const storageKey = "xychen-theme";
const root = document.documentElement;
const toggle = document.querySelector<HTMLButtonElement>("[data-theme-toggle]");
const icon = document.querySelector<HTMLElement>("[data-theme-icon]");
const label = document.querySelector<HTMLElement>("[data-theme-label]");

function applyTheme(theme: "dark" | "light") {
  root.dataset.theme = theme;
  toggle?.setAttribute("aria-pressed", String(theme === "light"));

  if (icon) icon.textContent = theme === "dark" ? "☼" : "☾";
  if (label) {
    label.textContent = theme === "dark" ? "Switch to light theme" : "Switch to dark theme";
  }

  try {
    localStorage.setItem(storageKey, theme);
  } catch {
    // The theme still works for this page when storage is unavailable.
  }
}

let initialTheme: "dark" | "light" = "dark";

try {
  const savedTheme = localStorage.getItem(storageKey);
  if (savedTheme === "light" || savedTheme === "dark") {
    initialTheme = savedTheme;
  }
} catch {
  // Use the default theme when browser storage is unavailable.
}

applyTheme(initialTheme);

toggle?.addEventListener("click", () => {
  const nextTheme = root.dataset.theme === "dark" ? "light" : "dark";
  applyTheme(nextTheme);
});
