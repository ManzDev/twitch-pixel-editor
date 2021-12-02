import { Pixel } from "../classes/Pixel.js";

const WIDTH = 18;
const HEIGHT = 18;
const PIXEL_SIZE = 20;

class EditorCanvas extends HTMLElement {
  constructor() {
    super();
    this.init();
    this.attachShadow({ mode: "open" });
  }

  init() {
    this.data = [];
    this.setPixelSize(PIXEL_SIZE);
    this.setSize(WIDTH, HEIGHT);
    for (let y = 0; y < this.height; y++) {
      const row = [];
      for (let x = 0; x < this.width; x++) {
        row.push(new Pixel());
      }
      this.data.push(row);
    }
  }

  static get styles() {
    return /* css */`
      :host {
        width: calc(var(--width) * var(--pixel-size));
        height: calc(var(--height) * var(--pixel-size));
        display: block;
        background: #444;
      }

      .canvas {
        display: flex;
        flex-wrap: wrap;
        background-image: conic-gradient(#888 25%, #999 25% 50%, #888 50% 75%, #999 75% 100%);
        background-size: calc(1px * var(--pixel-size)) calc(1px * var(--pixel-size));
        cursor: pointer;
      }

      .canvas div {
        width: calc(1px * var(--pixel-size));
        height: calc(1px * var(--pixel-size));
        border: 1px solid #000;
        border-left: 0;
        border-top: 0;
        box-sizing: border-box;
      }
    `;
  }

  setSize(width, height) {
    this.width = width;
    this.height = height;
    this.style.setProperty("--width", `${width}px`);
    this.style.setProperty("--height", `${height}px`);
  }

  setPixelSize(size) {
    this.pixelSize = size;
    this.style.setProperty("--pixel-size", size);
  }

  connectedCallback() {
    this.render();
    this.redrawCanvas();
  }

  redrawCanvas() {
    const fragment = document.createDocumentFragment();
    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        const element = this.data[y][x].element;
        fragment.appendChild(element);
      }
    }
    this.shadowRoot.querySelector(".canvas").appendChild(fragment);
  }

  render() {
    this.shadowRoot.innerHTML = /* html */`
    <style>${EditorCanvas.styles}</style>
    <div class="canvas"></div>`;
  }
}

customElements.define("editor-canvas", EditorCanvas);
