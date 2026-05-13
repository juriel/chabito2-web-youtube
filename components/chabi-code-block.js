import { LitElement, html, css } from "https://cdn.jsdelivr.net/gh/lit/dist@3/core/lit-core.min.js";

export class ChabiCodeBlock extends LitElement {
  static properties = { copied: { type: Boolean }, activeTab: { type: Number }, snippets: { attribute: false } };
  static styles = css`
    .wrap { overflow: hidden; border-radius: var(--radius-lg); border: 1px solid var(--color-border-dark); background: var(--color-code-bg); color: var(--color-text-dark); box-shadow: var(--shadow-card); }
    .topbar, .tabs { display: flex; align-items: center; }
    .topbar { justify-content: space-between; gap: 1rem; padding: 0.9rem 1rem 0; }
    .tabs { gap: 0.5rem; flex-wrap: wrap; }
    .tab { border: 0; padding: 0.5rem 0.8rem; border-radius: 12px; background: transparent; color: var(--color-text-dark-muted); }
    .tab.active { background: var(--color-code-tab-active); color: var(--color-text-dark); }
    .copy-btn { border: 1px solid var(--color-border-dark); background: rgba(255, 255, 255, 0.04); color: var(--color-text-dark); padding: 0.45rem 0.8rem; border-radius: 999px; }
    pre { margin: 0; overflow-x: auto; padding: 1rem; font-size: 0.9rem; line-height: 1.65; }
    .line { display: block; white-space: pre; }
    .token-comment { color: var(--color-code-comment); }
    .token-keyword { color: var(--color-code-keyword); }
    .token-string { color: var(--color-code-string); }
    .token-value { color: var(--color-code-value); }
  `;
  constructor() { super(); this.copied = false; this.activeTab = 0; this.snippets = []; }
  createRenderRoot() { return this; }
  set data(value) { this.snippets = value; this.requestUpdate(); }
  get currentSnippet() { return this.snippets[this.activeTab] || { code: "", filename: "snippet" }; }
  highlightLine(line) {
    if (line.trim().startsWith("#")) return html`<span class="token-comment">${line}</span>`;
    if (line.includes("=")) {
      const [left, ...rest] = line.split("=");
      return html`<span class="token-keyword">${left}</span>=<span class="token-string">${rest.join("=")}</span>`;
    }
    if (line.startsWith("curl") || line.startsWith("git ") || line.startsWith("npm ") || line.startsWith("bun ") || line.startsWith("yarn ")) {
      return html`<span class="token-keyword">${line}</span>`;
    }
    return html`<span class="token-value">${line}</span>`;
  }
  copyCode = async () => {
    await navigator.clipboard.writeText(this.currentSnippet.code);
    this.copied = true;
    window.setTimeout(() => { this.copied = false; }, 2000);
  };
  render() {
    return html`<div class="wrap">
      <div class="topbar">
        <div class="tabs">${this.snippets.map((snippet, index) => html`<button class="tab ${index === this.activeTab ? "active" : ""}" type="button" @click=${() => (this.activeTab = index)}>${snippet.filename}</button>`)}</div>
        <button class="copy-btn" type="button" @click=${this.copyCode}>${this.copied ? "✓ Copiado" : "Copiar"}</button>
      </div>
      <pre><code>${this.currentSnippet.code.split("\n").map((line) => html`<span class="line">${this.highlightLine(line)}</span>`)}</code></pre>
    </div>`;
  }
}

customElements.define("chabi-code-block", ChabiCodeBlock);
