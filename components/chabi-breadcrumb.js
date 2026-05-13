import { LitElement, html, css } from "https://cdn.jsdelivr.net/gh/lit/dist@3/core/lit-core.min.js";

export class ChabiBreadcrumb extends LitElement {
  static properties = { items: { attribute: false } };
  static styles = css`
    nav { display: flex; flex-wrap: wrap; gap: 0.5rem; color: var(--color-text-muted); font-size: 0.95rem; }
    .current { color: var(--color-secondary); font-weight: 700; }
  `;
  constructor() { super(); this.items = []; }
  createRenderRoot() { return this; }
  render() {
    return html`<nav aria-label="Breadcrumb">${this.items.map((item, index) => html`${index > 0 ? html`<span aria-hidden="true">›</span>` : ""}${item.href ? html`<a href=${item.href}>${item.label}</a>` : html`<span class="current">${item.label}</span>`}`)}</nav>`;
  }
}

customElements.define("chabi-breadcrumb", ChabiBreadcrumb);
