let tärningar = [];
let antalTärningar = 5;
let tSize = 70;
let pSize = 15;
let bNyttSlag;
let bNyttSpel;
let sparaKnappar = [];
let resultatRad = [];
let slag;
let bonusRäkning = [];

function preload() {
  hdbimg = loadImage("HappyDuckBar.jpg");
}

function setup() {
  createCanvas (640, 680);
  background(0,100,0);
  noLoop();

  textAlign(TOP,LEFT);
  textSize(24);
  fill(255);
  text("YATZY La Liga training camp", 275, 45);


  let x, y;

  for (let i = 0; i < antalTärningar; i++){
    x = 275 + (75 * i);
    y = 100;

    tärningar[i] = new tärning(x,y);

    sparaKnappar[i] = createCheckbox("");
    sparaKnappar[i].position(x - 17, y + 40);
    sparaKnappar[i].elt.firstElementChild.disabled = false;
    sparaKnappar[i].elt.firstElementChild.style="width:30px;height:30px;";
  }

  for (let j = 0; j < 18; j++){
    x = 45 + 110;
    y = 25 + (35 * j);
    resultatRad[j] = new resultatRuta(x, y, j);
  }

  bNyttSlag = createButton("Slag 1");
  bNyttSlag.mouseReleased(nyttSlag);
  bNyttSlag.elt.style = "position: absolute; left: 295px; top: 225px; display: block;width:260px;height:50px;font-size: 22px";

  bNyttSpel = createButton("Nytt spel");
  bNyttSpel.mouseReleased(nyttSpel);
  bNyttSpel.elt.style = "position: absolute; left: 360px; top: 350px; display: block;width:130px;height:50px;font-size: 22px";

  text("Sponsored by:", 305, 440);
  image(hdbimg, 285, 450);
  
  nyttSpel();
}

function nyttSlag(e){

  if (slag < 3){
    slag ++;

    for (let i = 0; i < antalTärningar; i++){
      if (slag == 1){
        sparaKnappar[i].elt.firstElementChild.disabled = false;
      }
      if (sparaKnappar[i].checked() == false){
        tÃ¤rningar[i].rulla();
        tÃ¤rningar[i].rita();
      }
    }
    fyllPrel();

    if (slag == 1){
      bNyttSlag.html("Slag 2");
    }else if (slag == 2){
      bNyttSlag.html("Slag 3");
    }else if (slag == 3){
      bNyttSlag.html("Klicka på önskad poäng")
      for (let i = 0; i < antalTärningar; i++){
        sparaKnappar[i].elt.firstElementChild.disabled = true;
      }
    }
  }
  e.preventDefault();
}

function mouseReleased(){

  let rad = resultatTräff();
  if (rad > -1 && slag > 0 && !resultatRad[rad].klar){
      resultatRad[rad].klar = true;
      for (let i=0; i < antalTärningar; i++){
        tärningar[i].prickar = 0;
        tärningar[i].rita();
        sparaKnappar[i].checked(false);
        sparaKnappar[i].elt.firstElementChild.disabled = true;
    }
    let klara = 0;
    for (let j = 0; j < 18; j++){
      if (!resultatRad[j].klar){
        resultatRad[j].resultat = 0;
        if (j < 6){
          resultatRad[j].bonusRÃ¤kning = ((j + 1) * 3) * -1;
        }
      }else{
        klara ++;
      }
      resultatRad[j].rita();
    }
    summera();

    if (klara < 18){
      slag = 0;
      bNyttSlag.html("Slag 1");
    }else{
      bNyttSlag.html("Game Over");
      slag = 3;
    }
  }
}

function summera(){
  let summa = 0;
  let bonusKlar = 0;
  let bonusRÃ¤kningSumma = 0;
  for (let i = 0; i < 6; i++){

    if (resultatRad[i].klar){
      summa = summa + resultatRad[i].resultat;
      bonusKlar ++;
    }
    bonusRÃ¤kningSumma = bonusRÃ¤kningSumma + resultatRad[i].bonusRÃ¤kning;

    resultatRad[6].klar = true;
    resultatRad[6].resultat = summa;
    resultatRad[6].bonusRÃ¤kning = bonusRÃ¤kningSumma;
    resultatRad[6].rita();

    if (bonusKlar == 6){
      if (summa > 62){
        resultatRad[7].resultat = 50;
      }
    }
    resultatRad[7].klar = true;
    resultatRad[7].rita();
  }

  summa = resultatRad[6].resultat + resultatRad[7].resultat;
  for (let j = 8; j < 17; j++){
    summa = summa + resultatRad[j].resultat;
  }
  resultatRad[17].klar = true;
  resultatRad[17].resultat = summa;
  resultatRad[17].rita();
}

function nyttSpel(){
  let texter = ["Ettor", "TvÃ¥or", "Treor", "Fyror", "Femmor", "Sexor",
   "Summa:", "Bonus", "Ett par", "TvÃ¥ par", "Tretal", "Fyrtal",
   "Liten stege", "Stor stege", "KÃ¥k", "Chans", "Yatzy", "Summa:"];

  slag = 0;
  bNyttSlag.html("Slag 1");
  bNyttSlag.show();

  for (let i = 0; i < antalTärningar; i++){
    tärningar[i].prickar = 0;
    tärningar[i].rita();
    sparaKnappar[i].checked(false);
    sparaKnappar[i].elt.firstElementChild.disabled = true;
  }

  for (let j = 0; j < 18; j++){
    let y = 25 + (35 * j);
    stroke(0);
    if (j == 6 || j == 7 || j == 17){
      fill(200);
    }else{
      fill(255);
    }
    rect(25, y, 130, 35);
    noStroke();
    fill(0);
    textAlign(LEFT);
    textSize(20);
    text(texter[j], 30 , y + 25);

    if (j < 6){
      resultatRad[j].bonusRÃ¤kning = ((j + 1) * 3) * -1;
    }
    if (j == 6){
      resultatRad[j].bonusRÃ¤kning = -63;
    }

    resultatRad[j].resultat = 0;
    resultatRad[j].klar = false;
    resultatRad[j].rita();
   }
}
