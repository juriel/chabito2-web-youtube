import { LitElement, html, css } from "https://cdn.jsdelivr.net/gh/lit/dist@3/core/lit-core.min.js";

export class ChabiSidebar extends LitElement {
  static properties = { sections: { attribute: false }, activeId: { type: String }, open: { type: Boolean } };
  static styles = css`
    .sidebar { position: sticky; top: 96px; max-height: calc(100vh - 110px); overflow: auto; padding: 1rem; border-radius: 28px; border: 1px solid var(--color-border); background: rgba(255, 255, 255, 0.84); box-shadow: var(--shadow-card); }
    .section + .section { margin-top: 1.25rem; padding-top: 1rem; border-top: 1px solid var(--color-border); }
    summary { cursor: pointer; list-style: none; font-size: 0.95rem; font-weight: 800; color: var(--color-sidebar-section); font-family: var(--font-display); }
    summary::-webkit-details-marker { display: none; }
    .links { display: grid; gap: 0.25rem; margin-top: 0.7rem; }
    .link { padding: 0.45rem 0.75rem; border-left: 3px solid transparent; color: var(--color-sidebar-link); font-size: 0.9rem; border-radius: 0 12px 12px 0; }
    .link.active { color: var(--color-sidebar-link-active); border-left-color: var(--color-sidebar-indicator); background: rgba(129, 195, 215, 0.1); font-weight: 700; }
    .mobile-toggle { display: none; }
    @media (max-width: 1023px) {
      .mobile-toggle { display: inline-flex; margin-bottom: 1rem; }
      .sidebar { display: none; position: static; max-height: none; }
      .sidebar.open { display: block; }
    }
  `;
  constructor() { super(); this.sections = []; this.activeId = ""; this.open = false; }
  createRenderRoot() { return this; }
  connectedCallback() {
    super.connectedCallback();
    window.addEventListener("hashchange", this.syncActiveFromHash);
    window.addEventListener("chabi:toggle-sidebar", this.toggleOpen);
    this.syncActiveFromHash();
  }
  disconnectedCallback() {
    window.removeEventListener("hashchange", this.syncActiveFromHash);
    window.removeEventListener("chabi:toggle-sidebar", this.toggleOpen);
    super.disconnectedCallback();
  }
  set data(value) { this.sections = value; this.requestUpdate(); queueMicrotask(() => this.observeSections()); }
  syncActiveFromHash = () => { this.activeId = window.location.hash.replace("#", "") || this.activeId; };
  toggleOpen = () => { this.open = !this.open; };
  observeSections() {
    if (this.observer) this.observer.disconnect();
    const targets = this.sections.flatMap((section) => section.items.map((item) => document.getElementById(item.id))).filter(Boolean);
    this.observer = new IntersectionObserver((entries) => {
      const visible = entries.find((entry) => entry.isIntersecting);
      if (visible?.target?.id) this.activeId = visible.target.id;
    }, { rootMargin: "-20% 0px -65% 0px" });
    targets.forEach((target) => this.observer.observe(target));
  }
  firstUpdated() { this.observeSections(); }
  render() {
    return html`
      <button class="btn-secondary mobile-toggle" type="button" @click=${this.toggleOpen}>${this.open ? "Ocultar índice" : "Mostrar índice"}</button>
      <aside class="sidebar ${this.open ? "open" : ""}" aria-label="Navegación de documentación">
        ${this.sections.map((section) => html`<details class="section" ?open=${true}><summary>${section.title}</summary><div class="links">${section.items.map((item) => html`<a class="link ${this.activeId === item.id ? "active" : ""}" href="#${item.id}">${item.label}</a>`)}</div></details>`)}
      </aside>
    `;
  }
}

customElements.define("chabi-sidebar", ChabiSidebar);
