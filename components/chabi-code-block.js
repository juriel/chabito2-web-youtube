import { LitElement, html, css } from "https://cdn.jsdelivr.net/gh/lit/dist@3/core/lit-core.min.js";

export class ChabiCodeBlock extends LitElement {
  static properties = { copied: { type: Boolean }, activeTab: { type: Number }, snippets: { attribute: false } };

  constructor() { 
    super(); 
    this.copied = false; 
    this.activeTab = 0; 
    this.snippets = []; 
  }

  createRenderRoot() { return this; }

  set data(value) { 
    this.snippets = value; 
    this.requestUpdate(); 
  }

  get currentSnippet() { 
    return this.snippets[this.activeTab] || { code: "", filename: "snippet" }; 
  }

  highlightLine(line) {
    if (line.trim().startsWith("#") || line.trim().startsWith("//")) return html`<span class="mockup-comment">${line}</span>`;
    if (line.includes("=")) {
      const [left, ...rest] = line.split("=");
      return html`<span class="mockup-key">${left}</span>=<span class="mockup-string">${rest.join("=")}</span>`;
    }
    if (line.includes("'") || line.includes("\"")) {
       return html`<span class="mockup-key">${line}</span>`; // Simple for now
    }
    return html`<span class="mockup-key">${line}</span>`;
  }

  copyCode = async () => {
    await navigator.clipboard.writeText(this.currentSnippet.code);
    this.copied = true;
    window.setTimeout(() => { this.copied = false; }, 2000);
  };

  render() {
    return html`
      <div class="code-block">
        <div class="code-block-header">
          <div class="mockup-tabs">
            ${this.snippets.map((snippet, index) => html`
              <button class="mockup-tab ${index === this.activeTab ? "active" : ""}" type="button" @click=${() => (this.activeTab = index)}>
                ${snippet.filename}
              </button>
            `)}
          </div>
          <button class="code-block-copy" type="button" @click=${this.copyCode}>
            ${this.copied ? "✓ Copiado" : "Copiar"}
          </button>
        </div>
        <pre class="code-block-pre"><code>${this.currentSnippet.code.split("\n").map((line) => html`<div style="white-space: pre;">${this.highlightLine(line)}</div>`)}</code></pre>
      </div>
    `;
  }
}

customElements.define("chabi-code-block", ChabiCodeBlock);
