import { LitElement, html, css } from "https://cdn.jsdelivr.net/gh/lit/dist@3/core/lit-core.min.js";

export class ChabiFeatureCard extends LitElement {
  static properties = { icon: { type: String }, title: { type: String }, description: { type: String } };
  static styles = css`
    article { 
      height: 100%; 
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
    .icon { 
      width: 64px; 
      height: 64px; 
      border-radius: 18px; 
      display: flex; 
      align-items: center;
      justify-content: center;
      font-size: 2rem; 
      background: hsla(var(--p-h), var(--p-s), var(--p-l), 0.1); 
      border: 1px solid hsla(var(--p-h), var(--p-s), var(--p-l), 0.1);
      margin-bottom: 0.5rem; 
      transition: all 0.3s ease;
    }
    article:hover .icon {
      transform: scale(1.1) rotate(5deg);
      background: var(--gradient-primary);
      color: white;
    }
    h3 { 
      margin: 0; 
      font-size: 1.25rem; 
      font-family: var(--font-display); 
    }
    p { 
      margin: 0; 
      color: var(--color-text-muted); 
      font-size: 1rem;
      line-height: 1.6;
    }
  `;
  constructor() { super(); this.icon = "⚡"; this.title = ""; this.description = ""; }
  createRenderRoot() { return this; }
  render() { return html`<article class="card"><div class="icon" aria-hidden="true">${this.icon}</div><h3>${this.title}</h3><p>${this.description}</p></article>`; }
}

customElements.define("chabi-feature-card", ChabiFeatureCard);
