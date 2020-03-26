class gameButton {
  constructor(bText, bWidth, posX, posY, id, ord, descr){
    this.bText = bText;
    this.posX = posX;
    this.posY = posY;
    this.bWidth = max(bWidth, width * 0.2);
    this.bHeight = height * 0.09;
    this.id = id;
    this.ord = ord;
    this.butt = createGraphics(this.bWidth, this.bHeight);
    this.popup = new PopUp(descr);
  }

  render(){
    this.butt.position(this.posX - this.bWidth/2, this.posY - this.bHeight/2);
    if(this.isOver()){
      this.popup.show(this.posX, this.posY, this.bWidth);
    }
  }

  update(){
    this.posX = width/2;
    this.posY = lerp(height * 0.15, height, 0.2 * this.ord);
    this.bWidth = max(this.bWidth, width * 0.2);
    this.bHeight = height * 0.09;
    this.butt.size(this.bWidth, this.bHeight);

    this.butt.noStroke();
    this.butt.fill(colCedarChest);
    this.butt.rect(0, 0, this.bWidth, this.bHeight, 30, 30, 30, 30);

    this.butt.fill(colGainsboro);
    this.butt.stroke(colJet);
    this.butt.strokeWeight(2);
    this.butt.textFont(fontGameTime);
    this.butt.textSize(fontsize);
    this.butt.textAlign(CENTER, CENTER);
    this.butt.text(this.bText, this.butt.width/2, this.butt.height/2);
  }

  show(){
    push();
    this.update();
    this.render();
    pop();
  }
  isOver(){
    if(mouseX > this.posX - this.bWidth/2 && mouseX < this.posX + this.bWidth/2 && mouseY > this.posY - this.bHeight/2 && mouseY < this.posY + this.bHeight/2){
        return true;
      }
      return false;
  }
}
