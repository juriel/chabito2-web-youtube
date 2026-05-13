import { LitElement, html, css } from "https://cdn.jsdelivr.net/gh/lit/dist@3/core/lit-core.min.js";
import "./chabi-code-mockup.js";

export class ChabiHero extends LitElement {
  static properties = { compact: { type: Boolean, reflect: true }, title: { type: String }, subtitle: { type: String }, accent: { type: String } };

  constructor() {
    super();
    this.compact = false;
    this.title = "Tu asistente inteligente en WhatsApp, listo en minutos";
    this.subtitle = "Chabi es software open source para crear chatbots agénticos con IA. Conecta GPT-4, Claude, Gemini o cualquier LLM a WhatsApp con un simple escaneo de QR.";
    this.accent = "inteligente";
  }

  createRenderRoot() { return this; }

  highlightedTitle() {
    return this.title.split(this.accent).map((part, index, arr) => index < arr.length - 1 ? html`${part}<span class="hero-word">${this.accent}</span>` : html`${part}`);
  }

  render() {
    return html`<section class="hero-section">
      <div class="container hero-split">
        <div class="hero-copy">
          <span class="eyebrow">★ Open Source · MIT License</span>
          <h1 class="hero-title">${this.highlightedTitle()}</h1>
          <p class="lede">${this.subtitle}</p>
          <div class="hero-actions">
            <a class="btn-primary" href="install.html">Comenzar ahora</a>
            <a class="btn-outline" href="https://github.com/juriel/chabito2" target="_blank" rel="noreferrer">Ver en GitHub</a>
          </div>
        </div>
        <div class="hero-mockup-container animate-float">
          <chabi-code-mockup></chabi-code-mockup>
        </div>
      </div>
    </section>`;
  }
}

customElements.define("chabi-hero", ChabiHero);
