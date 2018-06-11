function tärning(x, y){
  this.x = x;
  this.y = y;
  this.prickar = 0;
  this.sparad = false;

  this.rulla = function(){
    this.prickar = floor(random(1,7));
  }

  this.rita = function(){
    r = 25;
    a = r - 5;
    fill(255);
    noStroke();
    //rectMode(CENTER);
    rect(this.x - (tSize/2), this.y-r, tSize, r*2);
    rect(this.x - r, this.y - (tSize/2), r*2, tSize);
    arc(this.x-r, this.y+r, tSize-(r*2), tSize-(r*2), HALF_PI, PI);
    arc(this.x-r, this.y-r, tSize-(r*2), tSize-(r*2), PI, -HALF_PI);
    arc(this.x+r, this.y-r, tSize-(r*2), tSize-(r*2), -HALF_PI, 0);
    arc(this.x+r, this.y+r, tSize-(r*2), tSize-(r*2), 0, HALF_PI);

    if (this.prickar > 0){
      fill(0);
      stroke(0);

      if (this.prickar == 1 || this.prickar == 3 || this.prickar == 5){
        // Rita prick i mitten
        ellipse(this.x, this.y, pSize, pSize);
      }
      if (this.prickar == 2 || this.prickar == 3 || this.prickar == 4 || this.prickar == 5 || this.prickar == 6){
        // Rita prick uppe till vänster
        ellipse(this.x - a, this.y - a, pSize, pSize);
      }
      if (this.prickar == 4 || this.prickar == 5 || this.prickar == 6){
        // Rita prick uppe till höger och nere till vänster
        ellipse(this.x + a, this.y - a, pSize, pSize);
        ellipse(this.x - a, this.y + a, pSize, pSize);
      }
      if (this.prickar == 2 || this.prickar == 3 || this.prickar == 4 || this.prickar == 4 || this.prickar == 5 || this.prickar == 6){
        // Rita prick nere till höger
        ellipse(this.x + a, this.y + a, pSize, pSize);
      }
      if ( this.prickar == 6){
        // Rita prick mitten till vänster och höger
        ellipse(this.x - a, this.y, pSize, pSize);
        ellipse(this.x + a, this.y, pSize, pSize);
      }
    }
  }
}
