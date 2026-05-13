import { LitElement, html, css } from "https://cdn.jsdelivr.net/gh/lit/dist@3/core/lit-core.min.js";

export class ChabiSidebar extends LitElement {
  static properties = { sections: { attribute: false }, activeId: { type: String }, open: { type: Boolean } };

  constructor() { 
    super(); 
    this.sections = []; 
    this.activeId = ""; 
    this.open = false; 
  }

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

  set data(value) { 
    this.sections = value; 
    this.requestUpdate(); 
    queueMicrotask(() => this.observeSections()); 
  }

  syncActiveFromHash = () => { 
    this.activeId = window.location.hash.replace("#", "") || this.activeId; 
  };

  toggleOpen = () => { 
    this.open = !this.open; 
  };

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
      <button class="btn-outline mobile-sidebar-toggle" type="button" @click=${this.toggleOpen}>
        ${this.open ? "Cerrar índice" : "Ver índice de contenido"}
      </button>
      <aside class="sidebar-shell ${this.open ? "open" : ""}" aria-label="Navegación de documentación">
        ${this.sections.map((section) => html`
          <details class="sidebar-section" open>
            <summary class="sidebar-summary">${section.title}</summary>
            <div class="sidebar-links">
              ${section.items.map((item) => html`
                <a class="sidebar-link ${this.activeId === item.id ? "active" : ""}" href="#${item.id}">
                  ${item.label}
                </a>
              `)}
            </div>
          </details>
        `)}
      </aside>
    `;
  }
}

customElements.define("chabi-sidebar", ChabiSidebar);
