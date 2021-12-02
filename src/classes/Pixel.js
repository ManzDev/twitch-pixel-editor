const TRANSPARENT_COLOR = "#00000000";

export class Pixel {
  constructor(initialColor) {
    const color = initialColor ?? TRANSPARENT_COLOR;

    this.element = document.createElement("div");
    this.element.addEventListener("click", () => this.setPrimaryColor());
    this.element.addEventListener("contextmenu", (ev) => this.setSecondaryColor(ev));
    this.setColor(color);
  }

  setPrimaryColor() {
    const primaryColor = localStorage.getItem("primaryColor");
    this.setColor(primaryColor);
  }

  setSecondaryColor(ev) {
    ev.preventDefault();
    const secondaryColor = localStorage.getItem("secondaryColor");
    this.setColor(secondaryColor);
  }

  setColor(color) {
    this.color = color;
    this.element.style.background = color;
  }
}
