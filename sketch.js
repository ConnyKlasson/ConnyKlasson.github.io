let tärningar = [];
let antalTärningar = 5;
let tSize = 70;
let pSize = 15;
let bNyttSlag;
let bHallofFame;
let bNyttSpel;
let bSkicka;
let iNamn;
let iHallofFame;
let sparaKnappar = [];
let resultatRad = [];
let slag;
let highScoreList = [];
let hallofFameList = [];
let fbData;
let fbRef;
let statistk = [];

function preload() {
  hdbimg = loadImage("HappyDuckBar.png");
  bordimg = loadImage("bord.png");
  dicesimg = loadImage("dices.png");
}

function setup() {
  createCanvas (640, 750);
  background(bordimg);
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
    sparaKnappar[i].position(x - 17, y + 45);
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
  bNyttSlag.elt.style = "position: absolute; left: 267px; top: 225px; display: block;width:320px;height:50px;font-size: 22px";

  iNamn = createInput("Namn");
  iNamn.elt.style = "position: absolute; left: 230px; top: 225px; display: block;width:160px;height:44px;font-size: 22px";

  bSkicka = createButton("Skicka");
  bSkicka.mouseReleased(skickaFB);
  bSkicka.elt.style = "position: absolute; left: 425px; top: 225px; display: block;width:160px;height:50px;font-size: 22px";
  
  bHallofFame = createButton("Hall of fame");
  bHallofFame.mouseReleased(hallofFame);
  bHallofFame.elt.style = "position: absolute; left: 400px; top: 605px; display: block;width:200px;height:50px;font-size: 22px";

  bNyttSpel = createButton("Nytt spel");
  bNyttSpel.mouseReleased(nyttSpel);
  bNyttSpel.elt.style = "position: absolute; left: 400px; top: 675px; display: block;width:200px;height:50px;font-size: 22px";

  textAlign(CENTER);
  text("Powered by:", 500, 355);
  image(hdbimg, 400, 385);
  image(dicesimg  25, 665);

  let config = {
    apiKey: "AIzaSyBbyL-ScLILVW_1Etzv63hjH9P_QmWvVQ0",
    authDomain: "yatzy-high-score.firebaseapp.com",
    databaseURL: "https://yatzy-high-score.firebaseio.com",
    projectId: "yatzy-high-score",
    storageBucket: "yatzy-high-score.appspot.com",
    messagingSenderId: "634897849519"
  };
  firebase.initializeApp(config);

  fbData = firebase.database();
  fbRef = fbData.ref('Scores');

  fbRef.on('value', gotData, errData);
  
  hallofFamelist = [
    {Namn: "CarinaM", Poäng: 332},
    {Namn: "Emina", Poäng: 330},
    {Namn: "Conny", Poäng: 319},
    {Namn: "Kia :-)", Poäng: 313},
    {Namn: "LB", Poäng: 310},
    {Namn: "AB", Poäng: 300},
    {Namn: "Gunnar", Poäng: 267},
    {Namn: "Ulrika", Poäng: 261}
  ];

  nyttSpel();
  ritaStatistik();
}

function ritaStatistik(){
  fill(255);
  rect(25, 709, 355, 35);
  fill(0);
  textAlign(CENTER);
  /*
  for (let i = 0; i < highScoreList.length; i++){
    fill(0);
    textAlign(LEFT);
    text(highScoreList[i].Namn, 235, 400 + (27 * i));
    textAlign(RIGHT);
    text(highScoreList[i].Poäng, 370, 400 + (27 * i));
    if (i == 9){break;}
  }
  */
}

function ritaTioiTopp(){
  bHallofFame.html("Hall of fame");
  fill(255);
  rect(230, 370, 150, 285);
  rect(235, 330, 140, 30);
  fill(0);
  textAlign(CENTER);
  text("Tio i topp:", 300, 353);
  
  for (let i = 0; i < highScoreList.length; i++){
    fill(0);
    textAlign(LEFT);
    text(highScoreList[i].Namn, 235, 400 + (27 * i));
    textAlign(RIGHT);
    text(highScoreList[i].Poäng, 370, 400 + (27 * i));
    if (i == 9){break;}
  }
}

function ritaHallofFame(){
  bHallofFame.html("Tio i top");
  fill(255);
  rect(230, 370, 150, 285);
  rect(235, 330, 140, 30);
  fill(0);
  textAlign(CENTER);
  text("Hall of fame:", 300, 353);
  
  for (let i = 0; i < hallofFamelist.length; i++){
    fill(0);
    textAlign(LEFT);
    text(hallofFamelist[i].Namn, 235, 400 + (27 * i));
    textAlign(RIGHT);
    text(hallofFamelist[i].Poäng, 370, 400 + (27 * i));
    if (i == 9){break;}
  }
}

function skickaFB(){
  let data = {Name:iNamn.value(), Point:resultatRad[17].resultat};
  //console.log("SkickFB", data.Name, data.Point);
  fbRef.push(data);
  bNyttSlag.show();
  iNamn.hide();
  bSkicka.hide();
}

function gotData(data){
  //console.log("gotData");
  let scores = data.val();
  let keys = Object.keys(scores);

  for (let i = 0; i < keys.length; i++){
    let k = keys[i];
    //console.log(i, "gotData1", scores[k].Name, scores[k].Point);
    highScoreList[i] = {Namn:scores[k].Name, Poäng:scores[k].Point};
    //console.log(i, "gotData2", highScoreList[i]);
  }

  sortHS();

  ritaTioiTopp();
}

function errData(err){
  console.log(err);
}

function sortHS(){
  //console.log("sortHS");
  let swapped;
  let tempP;
   for (let i = 0; i < highScoreList.length -1; i++){
     swapped = false;
     for (let j = 0; j < highScoreList.length -1; j++){
       if (highScoreList[j].Poäng < highScoreList[j+1].Poäng){
         tempP = highScoreList[j];
         highScoreList[j] = highScoreList[j+1];
         highScoreList[j+1] = tempP;
         swapped = true;
       }
     }
     if(!swapped){
       break;
     }
   }
}

function hallofFame(e){
  //console.log("Hall of Fame!");
  
  if (bHallofFame.html() == "Hall of fame"){
    ritaHallofFame();
  }else{
    ritaTioiTopp();
  }
  e.preventDefault();
}

function nyttSlag(e){

  if (slag < 3){
    slag ++;

    for (let i = 0; i < antalTärningar; i++){
      if (slag == 1){
        sparaKnappar[i].elt.firstElementChild.disabled = false;
      }
      if (sparaKnappar[i].checked() == false){
        tärningar[i].rulla();
        tärningar[i].rita(i);
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
      kollaHS();
    }
  }
}

function kollaHS(){
  if (resultatRad[17].resultat > highScoreList[9].Poäng){
    //console.log(resultatRad[17].resultat, highScoreList[9].Poäng);
    iNamn.show();
    bSkicka.show();
    bNyttSlag.hide();
  }
}

function summera(){
  let summa = 0;
  let bonusKlar = 0;
  blurbSumma = 0;
  blurbIndex = -1;
  
  for (let i = 0; i < 6; i++){
    if (resultatRad[i].klar){
      summa = summa + resultatRad[i].resultat;
      blurbSumma = blurbSumma + resultatRad[i].blurb;
      blurbIndex = i;
      bonusKlar ++;
    }
    resultatRad[i].blurb = 0;
    resultatRad[i].rita();
   
    resultatRad[6].klar = true;
    resultatRad[6].resultat = summa;
    resultatRad[6].rita();

    if (bonusKlar == 6){
      if (summa > 62){
        resultatRad[7].resultat = 50;
      }
    }
    resultatRad[7].klar = true;
    resultatRad[7].rita();
  }
  if (blurbIndex > -1){
    resultatRad[blurbIndex].blurb = blurbSumma;
    if ( bonusKlar < 6){
      resultatRad[blurbIndex].rita();
    }
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
  let texter = ["Ettor", "Tvåor", "Treor", "Fyror", "Femmor", "Sexor",
   "Summa:", "Bonus", "Ett par", "Två par", "Tretal", "Fyrtal",
   "Liten stege", "Stor stege", "Kåk", "Chans", "Yatzy", "Summa:"];

  blurbSumma = 0;
  blurbIndex = -1;
  slag = 0;
  bNyttSlag.show();
  bNyttSlag.html("Slag 1");
  iNamn.hide();
  bSkicka.hide();

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
      resultatRad[j].blurb = 0;
    }

    resultatRad[j].resultat = 0;
    resultatRad[j].klar = false;
    resultatRad[j].rita();
   }
}
