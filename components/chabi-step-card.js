import { LitElement, html, css } from "https://cdn.jsdelivr.net/gh/lit/dist@3/core/lit-core.min.js";

export class ChabiStepCard extends LitElement {
  static properties = { step: { type: String }, title: { type: String }, description: { type: String } };

  constructor() { 
    super(); 
    this.step = "1"; 
    this.title = ""; 
    this.description = ""; 
  }

  createRenderRoot() { return this; }

  render() { 
    return html`
      <article class="step-card-shell">
        <div class="step-card-number">${this.step}</div>
        <div class="step-card-header">
          <h3 class="step-card-title">${this.title}</h3>
          <p class="step-card-description">${this.description}</p>
        </div>
        <div class="step-card-content">
          <slot></slot>
        </div>
      </article>
    `; 
  }
}

customElements.define("chabi-step-card", ChabiStepCard);
