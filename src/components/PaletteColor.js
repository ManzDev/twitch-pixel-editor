class PaletteColor extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  static get styles() {
    return /* css */`
      :host {
        background: conic-gradient(#888 25%, #999 25% 50%, #888 50% 75%, #999 75% 100%);
      }

      .color {
        width: 15px;
        height: 15px;
      }
    `;
  }

  connectedCallback() {
    this.color = this.getAttribute("color") ?? "#000000";
    this.render();
    const element = this.shadowRoot.querySelector(".color");

    element.addEventListener("click", (ev) => this.setPrimaryColor(this.color));
    element.addEventListener("contextmenu", (ev) => {
      ev.preventDefault();
      this.setSecondaryColor(this.color);
    });
  }

  setPrimaryColor(color) {
    localStorage.setItem("primaryColor", color);
    const event = new CustomEvent("SET_PRIMARY_COLOR", { detail: color, bubbles: true, composed: true });
    this.dispatchEvent(event);
  }

  setSecondaryColor(color) {
    localStorage.setItem("secondaryColor", color);
    const event = new CustomEvent("SET_SECONDARY_COLOR", { detail: color, bubbles: true, composed: true });
    this.dispatchEvent(event);
  }

  render() {
    this.shadowRoot.innerHTML = /* html */`
    <style>${PaletteColor.styles}</style>
    <div class="color" style="background: ${this.color}"></div>`;
  }
}

customElements.define("palette-color", PaletteColor);
