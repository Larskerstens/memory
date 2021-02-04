/* "pencil",
"home",
"quill",
"blog",
"leaf",
"office",
"newspaper",
"eyedropper",
"droplet",
"image",
"camera",
"headphones",
"music",
"play",
"film",
"dice", */

import Card from "./Card";

export default class Memory {
  constructor(lvl = 4) {
    this._allIcons = [];
    this._lvl = lvl;
    //this._username = username;
    //this._first = null;
    //this._second = null;
    //this._selected = ["leaf"];
    this._turned = [];
    this.init();
    this.fetchIcons();
    /* if (localStorage.getItem("local")) {
      const persistedData = JSON.parse(localStorage.getItem("local"));
      this._lvl = persistedData.lvl;
      this._allIcons = persistedData.icons;
      this.init();
      //...
    } else {
      this.fetchIcons();
    } */
    //setUpEvents => luisteren naar flipped eventTypes
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
        this.init();
      })
      .catch((error) => console.log(error));
  }
  init() {
    //initiele html opbouwen (<div id="grid"></div>)
    this.setUpEvents();
    this.startLevel();
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
      new Card(document.querySelector(".memory"), e);
    });

    /* new Card(document.querySelector(".memory"), "home");
    new Card(document.querySelector(".memory"), "pencil");
    new Card(document.querySelector(".memory"), "office");
    new Card(document.querySelector(".memory"), "newspaper"); */

    //op basis van levelNr aantal unieke items uit array halen
    //new Card(".grid", "pencil||home||gear||tree||leaf");

    //allCards.shuffle()
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
      const flippedCard = e.detail;
      //console.log(e.detail);
      console.log(this._turned);
      this._turned.push(flippedCard);
      if (this._turned.length === 2) {
        if (this._turned[0]._icon === this._turned[1]._icon) {
          // match
          this._ref.classList.add("match");
          this._isFlipped = true;
          this._ref.block();
          setInterval(() => {
            this._turned[0];
            this._turned[1];
            this._turned = [];
          }, 1000);
        } else {
          // no match
          this._ref.classList.add("nomatch");
          this._ref.classList.remove("flipped");
          this._isFlipped = false;
          setInterval(() => {
            this._turned[0];
            this._turned[1];
            this._turned = [];
          }, 1000);
        }
      }
    });
  }
}
