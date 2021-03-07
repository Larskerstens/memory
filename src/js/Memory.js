import Card from "./Card";

export default class Memory {
  constructor(lvl = 1) {
    this._allIcons = [];
    this._lvl = lvl;
    //this._username = username;
    this._first = null;
    this._second = null;
    //this._turned = 0;
    this._ref = this.init();
    //this.init();
    this.fetchIcons();
    this.setUpEvents();
    /* if (localStorage.getItem("local")) {
      const persistedData = JSON.parse(localStorage.getItem("local"));
      this._lvl = persistedData.lvl;
      this._allIcons = persistedData.icons;
      this.init();
      //...
    } else {
      this.fetchIcons();
    } */
  }
  /* saveToPersist() {
    localStorage.setItem(
      "local",
      JSON.stringify({
        lvl: this._level,
        icons: this._allIcons,
      })
    );
  } */
  fetchIcons() {
    fetch("../../icons/selection.json")
      .then((response) => response.json())
      .then((data) => {
        this._allIcons = data.icons.map((el) => el.properties.name);
        this.startLevel();
      })
      .catch((error) => console.log(error));
  }
  init() {
    //initiele html opbouwen (<div id="grid"></div>)
    document
      .querySelector(".memory")
      .insertAdjacentHTML("afterbegin", `<div class="scene"></div>`);
    return document.querySelector(".scene");
  }
  startLevel = () => {
    // op basis van levelnr
    //     1 => 2unieke => 4
    // 2 => 4unieke => 8
    // 3 => 8unieke => 16
    const aantalkaarten = this._lvl * 2;
    //random aantal iconen (helft van het lvl)
    const kaart = this._allIcons
      .sort(() => 0.41 - Math.random())
      .slice(0, aantalkaarten);
    //door elkaar gooien
    const allekaarten = this.shuffle([...kaart, ...kaart]);
    //const shuffeld = shuffle(allekaarten);
    //x aantal Card plaatsen in #grid
    allekaarten.map((e) => {
      new Card(this._ref, e);
    });
  };

  shuffle = (array) => {
    //how to shuffle array
    // https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
    let count = array.length,
      randomnumber,
      temp;
    while (count) {
      randomnumber = (Math.random() * count--) | 0;
      temp = array[count];
      array[count] = array[randomnumber];
      array[randomnumber] = temp;
    }
    return array;
  };
  setUpEvents() {
    window.addEventListener("flipped", (e) => {
      if (!this._first) {
        this._first = e.detail;
      } else {
        this._second = e.detail;
        this.checkCards();
      }
    });
  }
  cardReset() {
    this._first = null;
    this._second = null;
  }
  checkCards() {
    if (this._first._icon === this._second._icon) {
      this._first.block();
      this._second.block();
      this.cardReset();
      //this._turned++;
      //if (this._turned === Math.pow(2, this._lvl));
    } else {
      this._first.flipBack();
      this._second.flipBack();
      this.cardReset();
    }
  }
}
