const p=function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))r(o);new MutationObserver(o=>{for(const s of o)if(s.type==="childList")for(const i of s.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&r(i)}).observe(document,{childList:!0,subtree:!0});function t(o){const s={};return o.integrity&&(s.integrity=o.integrity),o.referrerpolicy&&(s.referrerPolicy=o.referrerpolicy),o.crossorigin==="use-credentials"?s.credentials="include":o.crossorigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function r(o){if(o.ep)return;o.ep=!0;const s=t(o);fetch(o.href,s)}};p();class a extends HTMLElement{constructor(){super();this.attachShadow({mode:"open"})}static get styles(){return`
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
    `}connectedCallback(){this.render()}render(){this.shadowRoot.innerHTML=`
    <style>${a.styles}</style>
    <div class="tools">
      <div class="title"></div>
      <div class="pencil tool"></div>
    </div>`}}customElements.define("editor-tools",a);const u="#00000000";class y{constructor(e){const t=e!=null?e:u;this.element=document.createElement("div"),this.element.addEventListener("click",()=>this.setPrimaryColor()),this.element.addEventListener("contextmenu",r=>this.setSecondaryColor(r)),this.setColor(t)}setPrimaryColor(){const e=localStorage.getItem("primaryColor");this.setColor(e)}setSecondaryColor(e){e.preventDefault();const t=localStorage.getItem("secondaryColor");this.setColor(t)}setColor(e){this.color=e,this.element.style.background=e}}const m=18,g=18,C=20;class n extends HTMLElement{constructor(){super();this.init(),this.attachShadow({mode:"open"})}init(){this.data=[],this.setPixelSize(C),this.setSize(m,g);for(let e=0;e<this.height;e++){const t=[];for(let r=0;r<this.width;r++)t.push(new y);this.data.push(t)}}static get styles(){return`
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
    `}setSize(e,t){this.width=e,this.height=t,this.style.setProperty("--width",`${e}px`),this.style.setProperty("--height",`${t}px`)}setPixelSize(e){this.pixelSize=e,this.style.setProperty("--pixel-size",e)}connectedCallback(){this.render(),this.redrawCanvas()}redrawCanvas(){const e=document.createDocumentFragment();for(let t=0;t<this.height;t++)for(let r=0;r<this.width;r++){const o=this.data[t][r].element;e.appendChild(o)}this.shadowRoot.querySelector(".canvas").appendChild(e)}render(){this.shadowRoot.innerHTML=`
    <style>${n.styles}</style>
    <div class="canvas"></div>`}}customElements.define("editor-canvas",n);class l extends HTMLElement{constructor(){super();this.attachShadow({mode:"open"})}static get styles(){return`
      :host {
        background: conic-gradient(#888 25%, #999 25% 50%, #888 50% 75%, #999 75% 100%);
      }

      .color {
        width: 15px;
        height: 15px;
      }
    `}connectedCallback(){var t;this.color=(t=this.getAttribute("color"))!=null?t:"#000000",this.render();const e=this.shadowRoot.querySelector(".color");e.addEventListener("click",r=>this.setPrimaryColor(this.color)),e.addEventListener("contextmenu",r=>{r.preventDefault(),this.setSecondaryColor(this.color)})}setPrimaryColor(e){localStorage.setItem("primaryColor",e);const t=new CustomEvent("SET_PRIMARY_COLOR",{detail:e,bubbles:!0,composed:!0});this.dispatchEvent(t)}setSecondaryColor(e){localStorage.setItem("secondaryColor",e);const t=new CustomEvent("SET_SECONDARY_COLOR",{detail:e,bubbles:!0,composed:!0});this.dispatchEvent(t)}render(){this.shadowRoot.innerHTML=`
    <style>${l.styles}</style>
    <div class="color" style="background: ${this.color}"></div>`}}customElements.define("palette-color",l);const v=["#000000","#993300","#333300","#003300","#003366","#000080","#333399","#333333","#800000","#FF6600","#808000","#008000","#339966","#33CCCC","#3366FF","#800080","#969696","#FF00FF","#FFCC00","#FFFF00","#00FF00","#00FFFF","#993366","#C0C0C0","#FF99CC","#FFCC99","#FFFF99","#CCFFCC","#CCFFFF","#99CCFF","#99CCFF","#FFFFFF","#7349A1","#00000000"];class c extends HTMLElement{constructor(){super();this.init(),this.attachShadow({mode:"open"})}init(){}static get styles(){return`
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
    `}get primaryColor(){var e;return(e=localStorage.getItem("primaryColor"))!=null?e:"#000000"}set primaryColor(e){localStorage.setItem("primaryColor",e),this.primary.value=e}get secondaryColor(){var e;return(e=localStorage.getItem("secondaryColor"))!=null?e:"#ffffff"}set secondaryColor(e){localStorage.setItem("secondaryColor",e),this.secondary.value=e}connectedCallback(){this.render(),this.primary=this.shadowRoot.querySelector(".primary"),this.secondary=this.shadowRoot.querySelector(".secondary"),this.primary.addEventListener("change",e=>this.primaryColor=e.target.value),this.secondary.addEventListener("change",e=>this.secondaryColor=e.target.value),this.addEventListener("SET_PRIMARY_COLOR",e=>this.primaryColor=e.detail),this.addEventListener("SET_SECONDARY_COLOR",e=>this.secondaryColor=e.detail)}render(){this.shadowRoot.innerHTML=`
    <style>${c.styles}</style>
    <div class="primary-colors">
      <input class="primary" type="color" value="${this.primaryColor}">
      <input class="secondary" type="color" value="${this.secondaryColor}">
    </div>
    <div class="palette">
      ${v.map(e=>`<palette-color color="${e}"></palette-color>`).join("")}
    </div>
    `}}customElements.define("editor-palette",c);class d extends HTMLElement{constructor(){super();this.attachShadow({mode:"open"})}static get styles(){return`
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
    `}connectedCallback(){this.render()}render(){this.shadowRoot.innerHTML=`
    <style>${d.styles}</style>
    <div class="app">
      <editor-tools></editor-tools>
      <editor-canvas></editor-canvas>
      <editor-palette></editor-palette>
    </div>`}}customElements.define("editor-app",d);
