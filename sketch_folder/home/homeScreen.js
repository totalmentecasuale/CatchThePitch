class gameButton {
  constructor(bText, bWidth, posX, posY, id, ord, descr){
    this.bText = bText;
    this.posX = posX;
    this.posY = posY;
    this.bWidth = max(bWidth, width * 0.2);
    this.bHeight = height * 0.09;
    this.id = id;
    this.ord = ord;
    this.popup = new PopUp(descr);
  }

  render(){
    if(this.isOver()){
      this.popup.show(this.posX, this.posY, this.bWidth);
    }
  }

  update(){

    push();
    this.posX = width/2;
    this.posY = lerp(height * 0.15, height, 0.2 * this.ord);
    this.bWidth = max(this.bWidth, width * 0.2);
    this.bHeight = height * 0.09;

    noStroke();
    fill(colCedarChest);
    rect(this.posX - this.bWidth/2, this.posY - this.bHeight/2, this.bWidth, this.bHeight, 30, 30, 30, 30);

    fill(colGainsboro);
    stroke(colJet);
    strokeWeight(2);
    textFont(fontGameTime);
    textSize(fontsize);
    textAlign(CENTER, CENTER);
    text(this.bText, this.posX, this.posY);
    pop();
  }

  show(){
    this.update();
    this.render();

  }
  isOver(){
    if(mouseX > this.posX - this.bWidth/2 && mouseX < this.posX + this.bWidth/2 && mouseY > this.posY - this.bHeight/2 && mouseY < this.posY + this.bHeight/2){
        return true;
      }
      return false;
  }
}
