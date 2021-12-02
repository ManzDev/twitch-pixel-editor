import "./PaletteColor.js";

const PALETTE = [
  "#000000", "#993300", "#333300", "#003300", "#003366", "#000080", "#333399",
  "#333333", "#800000", "#FF6600", "#808000", "#008000", "#339966", "#33CCCC",
  "#3366FF", "#800080", "#969696", "#FF00FF", "#FFCC00", "#FFFF00", "#00FF00",
  "#00FFFF", "#993366", "#C0C0C0", "#FF99CC", "#FFCC99", "#FFFF99", "#CCFFCC",
  "#CCFFFF", "#99CCFF", "#99CCFF", "#FFFFFF", "#7349A1", "#00000000"
];

class EditorPalette extends HTMLElement {
  constructor() {
    super();
    this.init();
    this.attachShadow({ mode: "open" });
  }

  init() {
    // this.primaryColor = "#0000ff";
    // this.secondaryColor = "#ff0000";
  }

  static get styles() {
    return /* css */`
      :host {
        display: grid;
        grid-template-columns: 50px 1fr;
        grid-template-rows: 1fr;
        align-items: center;
        width: 325px;
        height: 45px;
        background: #555;
      }

      .primary-colors {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
      }

      input {
        border: 0;
        padding: 0;
        margin: 0;
        width: 25px;
        background: none;
      }

      .primary,
      .secondary {
        position: absolute;
        top: 2px;
        left: 6px;
        cursor: pointer;
      }

      .primary {
        z-index: 5;
      }

      .secondary {
        transform: translate(12px, 12px);
      }

      .palette {
        display: flex;
        flex-wrap: wrap;
        width: 255px;
        height: 30px;
        border: 1px solid #000;
        cursor: pointer;
      }
    `;
  }

  get primaryColor() {
    return localStorage.getItem("primaryColor") ?? "#000000";
  }

  set primaryColor(color) {
    localStorage.setItem("primaryColor", color);
    this.primary.value = color;
  }

  get secondaryColor() {
    return localStorage.getItem("secondaryColor") ?? "#ffffff";
  }

  set secondaryColor(color) {
    localStorage.setItem("secondaryColor", color);
    this.secondary.value = color;
  }

  connectedCallback() {
    this.render();
    this.primary = this.shadowRoot.querySelector(".primary");
    this.secondary = this.shadowRoot.querySelector(".secondary");

    this.primary.addEventListener("change", ev => (this.primaryColor = ev.target.value));
    this.secondary.addEventListener("change", ev => (this.secondaryColor = ev.target.value));
    this.addEventListener("SET_PRIMARY_COLOR", ev => (this.primaryColor = ev.detail));
    this.addEventListener("SET_SECONDARY_COLOR", ev => (this.secondaryColor = ev.detail));
  }

  render() {
    this.shadowRoot.innerHTML = /* html */`
    <style>${EditorPalette.styles}</style>
    <div class="primary-colors">
      <input class="primary" type="color" value="${this.primaryColor}">
      <input class="secondary" type="color" value="${this.secondaryColor}">
    </div>
    <div class="palette">
      ${PALETTE.map(color => /* html */`<palette-color color="${color}"></palette-color>`).join("")}
    </div>
    `;
  }
}

customElements.define("editor-palette", EditorPalette);
