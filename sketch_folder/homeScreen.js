class gameButton {
  constructor(bText, posX, posY, id){
    this.bText = bText;
    this.posX = posX;
    this.posY = posY;
    this.bWidth = width * 0.25;
    this.bHeight = height * 0.1;
    this.id = id;
    this.butt = createGraphics(this.bWidth, this.bHeight);
  }
  
  render(){
    //edit with graphics-----------------
    imageMode(CENTER);
    image(this.butt, this.posX, this.posY);
    
    //-----------------------------------
    
    //fill(standardCol);
    //rectMode(CENTER);
    //noStroke();
    ////edit
    ////var button = createButton(this.bText);
    ////button.position(this.posX, this.posY);
    ////button.mousePressed(console.log(this.bText));
    ////--- end edit
    //rect(this.posX, this.posY, this.bWidth, this.bHeight, 0, 20, 20, 20);
    //fill(aquamarine);
    //var textPosX = this.posX;
    //var textPosY = this.posY - 5;
    ////textAlign(CENTER, CENTER);
    //text(this.bText, textPosX, textPosY);
    
    //fill(standardCol);
  }
  
  update(){
    //Just in case we want them to move aside
    this.posX = this.posX;
    this.posY = this.posY;
    //edit with p5.Graphics-------------
    //this.butt.background(21);
    this.butt.noStroke();
    this.butt.fill(pink);
    this.butt.rect(0, 0, this.bWidth, this.bHeight, 0, 20, 20, 20);
    this.butt.fill(250);
    this.butt.textFont(fontFakeHope);
    this.butt.textSize(fontsize);
    this.butt.textAlign(CENTER, CENTER);
    this.butt.text(this.bText, this.butt.width/2, this.butt.height/2);
    var divName = "."+this.id;
    var curDiv = selectAll("#",this.id);
    //curDiv.position(this.posX, this.posY);
    this.butt.parent(this.id);
    
    
    //-----------------------------------
  }
  
  show(){
    this.update();
    this.render();
  }
  isOver(){
    if(mouseX > this.posX - this.bWidth/2 && mouseX < this.posX + this.bWidth/2 && mouseY > this.posY - this.bHeight/2 && mouseY < this.posY + this.bHeight/2){
        console.log('pressed the', this.bText, 'button');
        return true;
      }
      return false;
  }
}
