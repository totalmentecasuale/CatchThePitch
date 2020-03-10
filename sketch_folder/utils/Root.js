class Root{
  
  constructor(value, x, y){
    this.text = value;
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
    
    fill(this.col);
    textSize(fontsize2);
    text(this.text, this.x, this.y);
  }
  
}
