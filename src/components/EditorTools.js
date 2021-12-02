class EditorTools extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  static get styles() {
    return /* css */`
      :host {
        display: block;
        width: 50px;
        height: 50px;
        background: #444;
      }

      .title {
        width: 100%;
        height: 25px;
        background:
          url(https://manz.dev/manz-logo.png),
          linear-gradient(to bottom, #884ced, #ec1cce);
        background-repeat: no-repeat;
        background-size: 50%, 100%;
        background-position: top 3px center, center;
      }

      .tool {
        width: 25px;
        height: 25px;
        background: #888;
        background-image: url(images/pencil.svg);
        background-size: 70%;
        background-repeat: no-repeat;
        background-position: center;
        cursor: pointer;
      }
    `;
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.shadowRoot.innerHTML = /* html */`
    <style>${EditorTools.styles}</style>
    <div class="tools">
      <div class="title"></div>
      <div class="pencil tool"></div>
    </div>`;
  }
}

customElements.define("editor-tools", EditorTools);
