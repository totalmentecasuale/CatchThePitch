class FilterCell{
  
  constructor(value, x, y, filler){
    this.text = value;
    this.filler = filler;
    this.col = color(255);
    this.x = x;
    this.y = y;
    this.checked = false; 
  }
  
  selected(){
      this.checked = !this.checked;
  }
  
  show(opac){
    if(this.checked){
      this.col = color(12, 171, 235, opac); 
    }else{
      this.col = color(255, opac);
    }
    push();
    fill(this.col);
    textSize(fontsize2);
    text(this.text, this.x, this.y);
    pop();
  }


  isOver(){
    var w = textWidth(this.text);
    var h = textAscent();
    var x1 = this.x + w / 2;
    var y1 = this.y + h / 2;
    var x2 = this.x - w / 2;
    var y2 = this.y - h / 2;
    return (mouseX > x2  && mouseX < x1 && mouseY > y2  && mouseY < y1);
  }
  
}
