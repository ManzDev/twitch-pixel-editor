import "./EditorTools.js";
import "./EditorCanvas.js";
import "./EditorPalette.js";

class EditorApp extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  static get styles() {
    return /* css */`
      :host {
        display: flex;
        width: 800px;
        height: 600px;
        background: black;
      }

      .app {
        display: flex;
        justify-content: space-between;
      }
    `;
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.shadowRoot.innerHTML = /* html */`
    <style>${EditorApp.styles}</style>
    <div class="app">
      <editor-tools></editor-tools>
      <editor-canvas></editor-canvas>
      <editor-palette></editor-palette>
    </div>`;
  }
}

customElements.define("editor-app", EditorApp);
