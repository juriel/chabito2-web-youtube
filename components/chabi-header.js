import { LitElement, html, css } from "https://cdn.jsdelivr.net/gh/lit/dist@3/core/lit-core.min.js";
import "./chabi-theme-toggle.js";
import "./chabi-version-badge.js";

export class ChabiHeader extends LitElement {
  static properties = { activePage: { type: String, attribute: "active-page" }, mobileOpen: { type: Boolean } };

  constructor() {
    super();
    this.activePage = "home";
    this.mobileOpen = false;
  }

  createRenderRoot() { return this; }
  
  navItems() {
    return [
      { id: "home", href: "index.html", label: "Inicio" },
      { id: "install", href: "install.html", label: "Instalación" },
      { id: "docs", href: "docs.html", label: "Documentación" },
    ];
  }

  toggleMobile = () => {
    this.mobileOpen = !this.mobileOpen;
    window.dispatchEvent(new CustomEvent("chabi:toggle-sidebar"));
  };

  renderNavLink(item) {
    return html`<a class=${this.activePage === item.id ? "active" : ""} href=${item.href}>${item.label}</a>`;
  }

  render() {
    return html`
      <header class="header-shell">
        <div class="container header-bar">
          <a class="header-brand" href="index.html">
            <img src="./assets/logo.svg" alt="Chabi" />
            <span>Chabi</span>
          </a>
          <nav class="header-nav">${this.navItems().map((item) => this.renderNavLink(item))}</nav>
          <div class="header-actions">
            <chabi-version-badge></chabi-version-badge>
            <chabi-theme-toggle></chabi-theme-toggle>
            <a class="header-github" href="https://github.com/juriel/chabito2" target="_blank" rel="noreferrer">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.58 2 12.23c0 4.51 2.87 8.33 6.84 9.68.5.1.68-.22.68-.49 0-.24-.01-1.05-.02-1.9-2.78.62-3.37-1.21-3.37-1.21-.45-1.19-1.11-1.5-1.11-1.5-.91-.64.07-.63.07-.63 1 .07 1.53 1.06 1.53 1.06.9 1.56 2.35 1.11 2.92.85.09-.67.35-1.11.63-1.36-2.22-.26-4.56-1.14-4.56-5.08 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.31.1-2.73 0 0 .84-.28 2.75 1.05A9.34 9.34 0 0 1 12 6.84c.85 0 1.7.12 2.5.36 1.9-1.33 2.74-1.05 2.74-1.05.56 1.42.21 2.47.1 2.73.64.72 1.03 1.63 1.03 2.75 0 3.95-2.34 4.82-4.58 5.07.36.32.68.95.68 1.92 0 1.39-.01 2.5-.01 2.84 0 .27.18.6.69.49A10.25 10.25 0 0 0 22 12.23C22 6.58 17.52 2 12 2Z"></path></svg>
            </a>
            <button class="header-hamburger" @click=${this.toggleMobile}>☰</button>
          </div>
        </div>
      </header>
    `;
  }
}

customElements.define("chabi-header", ChabiHeader);
