function resultatRuta(x, y, rad){
  this.x = x;
  this.y = y;
  this.höjd = 35;
  this.bredd = 50;
  this.resultat = 0;
  let resultatText;
  this.klar = false;
  this.blurb;

  this.rita = function(){
    stroke(0);
    if (rad == 6 || rad == 7 || rad == 17){
      fill(200);
    }else{
      fill(255);
    }
    rect(this.x, this.y, this.bredd, this.höjd);
    
    //console.log('rad : ', rad);

    if (rad < 7){
      noStroke();
      fill(255);
      if (rad == 6){
        fill(200);
      }
      rect(this.x-45, this.y+1, this.bredd-5, this.höjd-2);
      textSize(20);
      textAlign(RIGHT);
      
      fill(0);
      if (this.blurb < 0){
        fill(255, 0, 0);
      }
      
      text(this.blurb, this.x-5, this.y + 27);
      
    }

    if (this.klar){
      fill(0);
      textSize(22);
    }else{
      textSize(20);
      fill(255, 0, 0);
    }
    noStroke();
    textAlign(RIGHT);
    if (this.resultat == 0){
      resultatText = "";
      if (this.klar){
        resultatText = "---";
      }
      if (rad == 6 || rad == 17){
        resultatText = 0;
      }
      if (rad == 7){
        resultatText = "";
      }
    }else{
      resultatText = this.resultat;
    }
    text(resultatText, this.x + 42, this.y + 27);
  }
}

fyllPrel = function(){
  let prelResultat = [];

  for (let k = 0; k < 18; k++){
    prelResultat[k] = 0;
    if (!resultatRad[k].klar){
      resultatRad[k].resultat = 0;
      //resultatRad[k].rita(true);
      if (k < 6){
        resultatRad[k].blurb = 0;
      }
    }
  }

  for (let i = 0; i < antalTärningar; i++){
    if (tärningar[i].prickar == 1) prelResultat[0]++;
    if (tärningar[i].prickar == 2) prelResultat[1] = prelResultat[1] + 2;
    if (tärningar[i].prickar == 3) prelResultat[2] = prelResultat[2] + 3;
    if (tärningar[i].prickar == 4) prelResultat[3] = prelResultat[3] + 4;
    if (tärningar[i].prickar == 5) prelResultat[4] = prelResultat[4] + 5;
    if (tärningar[i].prickar == 6) prelResultat[5] = prelResultat[5] + 6;
  }

  if (prelResultat[0] > 1) prelResultat[8] = 2;
  if (prelResultat[1] > 2) prelResultat[8] = 4;
  if (prelResultat[2] > 3) prelResultat[8] = 6;
  if (prelResultat[3] > 4) prelResultat[8] = 8;
  if (prelResultat[4] > 5) prelResultat[8] = 10;
  if (prelResultat[5] > 6) prelResultat[8] = 12;

  if (prelResultat[0] > 1 && prelResultat[1] > 2) prelResultat[9] = 6;
  if (prelResultat[0] > 1 && prelResultat[2] > 3) prelResultat[9] = 8;
  if (prelResultat[0] > 1 && prelResultat[3] > 4) prelResultat[9] = 10;
  if (prelResultat[0] > 1 && prelResultat[4] > 5) prelResultat[9] = 12;
  if (prelResultat[0] > 1 && prelResultat[5] > 6) prelResultat[9] = 14;
  if (prelResultat[1] > 2 && prelResultat[2] > 3) prelResultat[9] = 10;
  if (prelResultat[1] > 2 && prelResultat[3] > 4) prelResultat[9] = 12;
  if (prelResultat[1] > 2 && prelResultat[4] > 5) prelResultat[9] = 14;
  if (prelResultat[1] > 2 && prelResultat[5] > 6) prelResultat[9] = 16;
  if (prelResultat[2] > 3 && prelResultat[3] > 4) prelResultat[9] = 14;
  if (prelResultat[2] > 3 && prelResultat[4] > 5) prelResultat[9] = 16;
  if (prelResultat[2] > 3 && prelResultat[5] > 6) prelResultat[9] = 18;
  if (prelResultat[3] > 4 && prelResultat[4] > 5) prelResultat[9] = 18;
  if (prelResultat[3] > 4 && prelResultat[5] > 6) prelResultat[9] = 20;
  if (prelResultat[4] > 5 && prelResultat[5] > 6) prelResultat[9] = 22;

  if (prelResultat[0] > 2) prelResultat[10] = 3;
  if (prelResultat[1] > 4) prelResultat[10] = 6;
  if (prelResultat[2] > 6) prelResultat[10] = 9;
  if (prelResultat[3] > 8) prelResultat[10] = 12;
  if (prelResultat[4] > 10) prelResultat[10] = 15;
  if (prelResultat[5] > 12) prelResultat[10] = 18;

  if (prelResultat[0] > 3) prelResultat[11] = 4;
  if (prelResultat[1] > 6) prelResultat[11] = 8;
  if (prelResultat[2] > 9) prelResultat[11] = 12;
  if (prelResultat[3] > 12) prelResultat[11] = 16;
  if (prelResultat[4] > 15) prelResultat[11] = 20;
  if (prelResultat[5] > 18) prelResultat[11] = 24;

  if ((prelResultat[0]) == 1 && (prelResultat[1]) == 2 && (prelResultat[2]) == 3 && (prelResultat[3]) == 4 && (prelResultat[4]) == 5) prelResultat[12] = 15;
  if ((prelResultat[1]) == 2 && (prelResultat[2]) == 3 && (prelResultat[3]) == 4 && (prelResultat[4]) == 5 && (prelResultat[5]) == 6) prelResultat[13] = 20;

  if (prelResultat[0] > 1 && prelResultat[1] > 4) prelResultat[14] = 8;
  if (prelResultat[0] > 1 && prelResultat[2] > 6) prelResultat[14] = 11;
  if (prelResultat[0] > 1 && prelResultat[3] > 8) prelResultat[14] = 14;
  if (prelResultat[0] > 1 && prelResultat[4] > 10) prelResultat[14] = 17;
  if (prelResultat[0] > 1 && prelResultat[5] > 12) prelResultat[14] = 20;

  if (prelResultat[1] > 2 && prelResultat[0] > 2) prelResultat[14] = 7;
  if (prelResultat[1] > 2 && prelResultat[2] > 6) prelResultat[14] = 13;
  if (prelResultat[1] > 2 && prelResultat[3] > 8) prelResultat[14] = 16;
  if (prelResultat[1] > 2 && prelResultat[4] > 10) prelResultat[14] = 19;
  if (prelResultat[1] > 2 && prelResultat[5] > 12) prelResultat[14] = 22;

  if (prelResultat[2] > 3 && prelResultat[0] > 2) prelResultat[14] = 9;
  if (prelResultat[2] > 3 && prelResultat[1] > 4) prelResultat[14] = 12;
  if (prelResultat[2] > 3 && prelResultat[3] > 8) prelResultat[14] = 18;
  if (prelResultat[2] > 3 && prelResultat[4] > 10) prelResultat[14] = 21;
  if (prelResultat[2] > 3 && prelResultat[5] > 12) prelResultat[14] = 18;

  if (prelResultat[3] > 4 && prelResultat[0] > 2) prelResultat[14] = 11;
  if (prelResultat[3] > 4 && prelResultat[1] > 4) prelResultat[14] = 14;
  if (prelResultat[3] > 4 && prelResultat[2] > 6) prelResultat[14] = 17;
  if (prelResultat[3] > 4 && prelResultat[4] > 10) prelResultat[14] = 23;
  if (prelResultat[3] > 4 && prelResultat[5] > 12) prelResultat[14] = 26;

  if (prelResultat[4] > 5 && prelResultat[0] > 2) prelResultat[14] = 13;
  if (prelResultat[4] > 5 && prelResultat[1] > 4) prelResultat[14] = 16;
  if (prelResultat[4] > 5 && prelResultat[2] > 6) prelResultat[14] = 19;
  if (prelResultat[4] > 5 && prelResultat[3] > 8) prelResultat[14] = 22;
  if (prelResultat[4] > 5 && prelResultat[5] > 12) prelResultat[14] = 28;

  if (prelResultat[5] > 6 && prelResultat[0] > 2) prelResultat[14] = 15;
  if (prelResultat[5] > 6 && prelResultat[1] > 4) prelResultat[14] = 18;
  if (prelResultat[5] > 6 && prelResultat[2] > 6) prelResultat[14] = 21;
  if (prelResultat[5] > 6 && prelResultat[3] > 8) prelResultat[14] = 24;
  if (prelResultat[5] > 6 && prelResultat[4] > 10) prelResultat[14] = 27;

  prelResultat[15] =  prelResultat[0] + prelResultat[1] + prelResultat[2] + prelResultat[3] + prelResultat[4] + prelResultat[5] + prelResultat[6];

  if (prelResultat[0] > 4) prelResultat[16] = 50;
  if (prelResultat[1] > 8) prelResultat[16] = 50;
  if (prelResultat[2] > 12) prelResultat[16] = 50;
  if (prelResultat[3] > 16) prelResultat[16] = 50;
  if (prelResultat[4] > 20) prelResultat[16] = 50;
  if (prelResultat[5] > 24) prelResultat[16] = 50;


  for (j = 0; j < 18; j++){
      if (prelResultat[j] > 0 && !resultatRad[j].klar){
        resultatRad[j].resultat = prelResultat[j];
        resultatRad[j].blurb = resultatRad[j].blurb + prelResultat[j];
        resultatRad[j].rita(true);
      }
  }
}

resultatTräff = function(){
    for (i = 0; i < 17; i++){
      if (mouseX > resultatRad[i].x && mouseX < resultatRad[i].x + resultatRad[i].bredd && mouseY > resultatRad[i].y && mouseY < resultatRad[i].y + resultatRad[i].höjd){
        if (i == 6 || i == 7){
          i = -1;
        }
        return i;
        break;
      }
    }
    return -1;
}
