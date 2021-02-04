export default class Card {
  constructor(holder, icon) {
    this._holder = holder;
    this._icon = icon;
    this._flippedEvent = new CustomEvent("flipped", { detail: this });
    this._ref = this.init();
    this._isFlipped = false;
    this.setUpEvents();
  }
  init() {
    this._holder.insertAdjacentHTML(
      "beforeend",
      `
      <div class="scene">
      <div class="card">
            <div class="card__face card__face--front"></div>
            <div class="card__face card__face--back">
              <svg class="icon icon-${this._icon}">
                <use xlink:href="./icons/symbol-defs.svg#icon-${this._icon}"></use>
              </svg>
            </div>    
            </div> 
        `
    );
    return this._holder.querySelector(".scene:last-child .card:last-child");
  }
  setUpEvents() {
    this._ref.onclick = this.flip;
  }
  flip = () => {
    if (!this._isFlipped) {
      this._ref.classList.add("flipped");
      this._isFlipped = true;
      dispatchEvent(this._flippedEvent);
    }
  };
  block = () => {
    window.addEventListener("flipped", (e) => {
      this._ref.classList.add("block");
    });
  };
}
