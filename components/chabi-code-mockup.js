import { LitElement, html, css } from "https://cdn.jsdelivr.net/gh/lit/dist@3/core/lit-core.min.js";

export class ChabiCodeMockup extends LitElement {
  static properties = { activeTab: { type: Number } };

  constructor() {
    super();
    this.activeTab = 0;
    this.tabs = [
      { name: ".env", lines: ["# IA Configuration", "PI_PROVIDER=openai", "PI_MODEL=gpt-4o", "OPEN_API_KEY=sk-...", "", "# Persona Definition", "AGENT_PROMPT=Eres Chabi..."] },
      { name: "index.js", lines: ["import { Chabi } from 'chabi';", "", "const bot = new Chabi({", "  session: 'ventas-bot'", "});", "", "bot.start();"] },
    ];
  }

  createRenderRoot() { return this; }

  renderCodeLine(line) {
    if (!line) return html`<span>&nbsp;</span>`;
    if (line.startsWith("#")) return html`<span class="mockup-comment">${line}</span>`;
    if (line.includes("=")) {
      const [key, ...rest] = line.split("=");
      return html`<span><span class="mockup-key">${key}</span>=<span class="mockup-string">${rest.join("=")}</span></span>`;
    }
    if (line.includes("'")) {
       return html`<span class="mockup-key">${line.split("'")[0]}</span><span class="mockup-string">'${line.split("'")[1]}'</span><span class="mockup-key">${line.split("'")[2] || ""}</span>`;
    }
    return html`<span class="mockup-key">${line}</span>`;
  }

  render() {
    const current = this.tabs[this.activeTab];
    return html`<div class="mockup-shell">
      <div class="mockup-chrome">
        <div class="mockup-dots">
          <span class="mockup-dot mockup-red"></span>
          <span class="mockup-dot mockup-yellow"></span>
          <span class="mockup-dot mockup-green"></span>
        </div>
        <div class="mockup-tabs">${this.tabs.map((tab, index) => html`<button class="mockup-tab ${this.activeTab === index ? "active" : ""}" @click=${() => (this.activeTab = index)}>${tab.name}</button>`)}</div>
      </div>
      <div class="mockup-body">
        <div class="mockup-lines">${current.lines.map((_, index) => html`<div>${String(index + 1).padStart(2, "0")}</div>`)}</div>
        <div class="mockup-code">${current.lines.map((line) => this.renderCodeLine(line))}<span><span class="mockup-cursor"></span></span></div>
      </div>
      <div class="mockup-admin">
        <div class="mockup-admin-head"><span>Dashboard</span><span class="mockup-tag">QR Ready</span></div>
        <div class="mockup-admin-grid">
          <div class="mockup-qr"></div>
          <div><strong style="font-size: 1rem;">ventas-bot</strong><p style="margin: 0.2rem 0 0; font-size: 0.8rem; opacity: 0.7;">Escanea el código para conectar.</p></div>
        </div>
      </div>
    </div>`;
  }
}

customElements.define("chabi-code-mockup", ChabiCodeMockup);
