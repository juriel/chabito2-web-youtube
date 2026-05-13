import { LitElement, html, css } from "https://cdn.jsdelivr.net/gh/lit/dist@3/core/lit-core.min.js";

export class ChabiVersionBadge extends LitElement {
  static properties = { open: { type: Boolean }, version: { type: String } };

  constructor() {
    super();
    this.open = false;
    this.version = "v2.0";
  }

  createRenderRoot() { return this; }
  toggleMenu = () => { this.open = !this.open; };
  closeMenu = (event) => { if (!this.contains(event.target)) this.open = false; };

  connectedCallback() {
    super.connectedCallback();
    document.addEventListener("click", this.closeMenu);
  }

  disconnectedCallback() {
    document.removeEventListener("click", this.closeMenu);
    super.disconnectedCallback();
  }

  render() {
    return html`
      <div style="position: relative; display: inline-flex;">
        <button class="badge-trigger" type="button" aria-label="Abrir selector de versión" @click=${this.toggleMenu}>
          ${this.version} <span aria-hidden="true">${this.open ? "▴" : "▾"}</span>
        </button>
        ${this.open ? html`<div class="badge-menu">
          <a class="badge-menu-item" href="docs.html">Documentación ${this.version}</a>
          <a class="badge-menu-item" href="https://github.com/juriel/chabito2" target="_blank" rel="noreferrer">Ver roadmap</a>
        </div>` : ""}
      </div>
    `;
  }
}

customElements.define("chabi-version-badge", ChabiVersionBadge);
