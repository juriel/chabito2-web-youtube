import { LitElement, html, css } from "https://cdn.jsdelivr.net/gh/lit/dist@3/core/lit-core.min.js";

const STORAGE_KEY = "chabi-theme";

export class ChabiThemeToggle extends LitElement {
  static properties = { theme: { type: String } };

  constructor() {
    super();
    this.theme = "light";
  }

  createRenderRoot() {
    return this;
  }

  connectedCallback() {
    super.connectedCallback();
    this.syncTheme();
    window.addEventListener("storage", this.syncTheme);
    window.addEventListener("chabi-theme-change", this.syncTheme);
  }

  disconnectedCallback() {
    window.removeEventListener("storage", this.syncTheme);
    window.removeEventListener("chabi-theme-change", this.syncTheme);
    super.disconnectedCallback();
  }

  syncTheme = () => {
    this.theme = document.documentElement.dataset.theme || localStorage.getItem(STORAGE_KEY) || "light";
  };

  toggleTheme = () => {
    const nextTheme = this.theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = nextTheme;
    localStorage.setItem(STORAGE_KEY, nextTheme);
    window.dispatchEvent(new CustomEvent("chabi-theme-change"));
    this.theme = nextTheme;
  };

  render() {
    const isDark = this.theme === "dark";
    return html`
      <button class="theme-toggle" type="button" aria-label=${isDark ? "Cambiar a modo claro" : "Cambiar a modo oscuro"} @click=${this.toggleTheme}>
        ${isDark ? "☀" : "🌙"}
      </button>
    `;
  }
}

customElements.define("chabi-theme-toggle", ChabiThemeToggle);
