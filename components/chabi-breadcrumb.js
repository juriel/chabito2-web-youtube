import { LitElement, html, css } from "https://cdn.jsdelivr.net/gh/lit/dist@3/core/lit-core.min.js";

export class ChabiBreadcrumb extends LitElement {
  static properties = { items: { attribute: false } };

  constructor() {
    super();
    this.items = [];
  }

  createRenderRoot() { return this; }

  render() {
    return html`
      <nav class="breadcrumb-nav" aria-label="Ruta de navegación">
        <a href="index.html">Inicio</a>
        <span class="breadcrumb-separator" aria-hidden="true">/</span>
        <a href="docs.html">Docs</a>
        ${this.items.map((item, index) => html`
          <span class="breadcrumb-separator" aria-hidden="true">/</span>
          ${item.href 
            ? html`<a href=${item.href}>${item.label}</a>` 
            : html`<span class="breadcrumb-current">${item.label}</span>`}
        `)}
      </nav>
    `;
  }
}

customElements.define("chabi-breadcrumb", ChabiBreadcrumb);
