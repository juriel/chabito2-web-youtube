import { LitElement, html, css } from "https://cdn.jsdelivr.net/gh/lit/dist@3/core/lit-core.min.js";

export class ChabiStepCard extends LitElement {
  static properties = { step: { type: String }, title: { type: String }, description: { type: String } };
  static styles = css`
    .card-step { padding: 1.75rem; border-radius: var(--radius-xl); border: 1px solid var(--color-border); background: rgba(255, 255, 255, 0.76); box-shadow: var(--shadow-card); display: grid; gap: 1rem; }
    .step-no { width: 56px; height: 56px; border-radius: 20px; display: grid; place-items: center; background: var(--gradient-card); color: white; font-family: var(--font-display); font-size: 1.4rem; font-weight: 800; }
    h3 { margin: 0; font-family: var(--font-display); font-size: 1.35rem; }
    p { margin: 0; color: var(--color-text-muted); }
  `;
  constructor() { super(); this.step = "1"; this.title = ""; this.description = ""; }
  createRenderRoot() { return this; }
  render() { return html`<article class="card-step"><div class="step-no">${this.step}</div><div><h3>${this.title}</h3><p>${this.description}</p></div><slot></slot></article>`; }
}

customElements.define("chabi-step-card", ChabiStepCard);
