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
      
      <div class="card">
      <div class="flipdiv">
            <div class="card__face card__face--front"></div>
            <div class="card__face card__face--back">
              <svg class="icon icon-${this._icon}">
                <use xlink:href="./icons/symbol-defs.svg#icon-${this._icon}"></use>
              </svg>
            </div>   
            </div>  
            </div> 
        `
    );
    return document.querySelector(".card:last-child");
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
  flipBack = () => {
    setTimeout(() => {
      this._ref.classList.remove("flipped");
      this._flipped = false;
    }, 1000);
  };
  block = () => {
    setTimeout(() => {
      this._ref.style.opacity = 0.6;
      this._ref.style.cursor = "not-allowed";
    }, 1300);
  };
}
