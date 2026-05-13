import { LitElement, html, css } from "https://cdn.jsdelivr.net/gh/lit/dist@3/core/lit-core.min.js";

export class ChabiFooter extends LitElement {
  createRenderRoot() { return this; }
  render() {
    return html`
      <footer>
        <div class="container footer-grid">
          <div class="footer-brand">
            <div class="footer-brand-row"><img src="./assets/logo.svg" alt="Logo de Chabi" /><span>Chabi</span></div>
            <p>La plataforma open source líder para crear agentes de WhatsApp inteligentes y escalables.</p>
          </div>
          <div class="footer-columns">
            <div>
              <h4 class="footer-h4">Producto</h4>
              <div class="footer-links"><a href="index.html">Inicio</a><a href="install.html">Instalación</a><a href="docs.html">Documentación</a></div>
            </div>
            <div>
              <h4 class="footer-h4">Recursos</h4>
              <div class="footer-links"><a href="https://github.com/juriel/chabito2" target="_blank" rel="noreferrer">GitHub</a><a href="docs.html#api-rest">API REST</a><a href="docs.html#variables">Variables de entorno</a></div>
            </div>
            <div>
              <h4 class="footer-h4">Comunidad</h4>
              <div class="footer-links"><a href="https://github.com/juriel/chabito2/issues" target="_blank" rel="noreferrer">Issues</a><a href="https://github.com/juriel/chabito2/discussions" target="_blank" rel="noreferrer">Discusiones</a><a href="https://github.com/juriel/chabito2/blob/main/LICENSE" target="_blank" rel="noreferrer">Licencia MIT</a></div>
            </div>
          </div>
        </div>
        <div class="container footer-footnote">
          <span>© 2025 Chabi Project. Código abierto bajo licencia MIT.</span>
          <div class="footer-links" style="flex-direction: row; gap: 1.5rem;">
            <a href="#">Privacidad</a>
            <a href="#">Términos</a>
          </div>
        </div>
      </footer>
    `;
  }
}

customElements.define("chabi-footer", ChabiFooter);
