class Chord {
  constructor(value, x, y, status, col) {
    this.x = x;
    this.y = y;
    this.text = value;
    this.status = status; 
    this.colText = col;
    this.root = false;
  }
  
  changeColor(){
    let r = red(this.colText);
    let g = green(this.colText);
    let b = blue(this.colText);
    let alpha = 255;
    
    let r1,g1,b1;
    let ratioChangeColor = 16;
    let statusColor = colJet;
    if(this.status == MAJOR){
      statusColor = cf.maj_col;
    }else if(this.status == MINOR){
      statusColor = cf.min_col;
    }else if(this.status == DIM){
      statusColor = cf.dim_col;
    }

    r1 = red(statusColor);
    g1 = green(statusColor);
    b1 = blue(statusColor);

    if(abs(r1-r) > 0){
      if(abs(r1 - r) < 2){
        r+=(r1-r)/ abs(r1-r);
      }else{
        r+= (r1-r) / ratioChangeColor;
      }
    }

    if(abs(g1-g) > 0){
      if(abs(g1 - g) < 2){
        g+=(g1-g)/ abs(g1-g);
      }else{
        g+= (g1-g) / ratioChangeColor;
      }
    }

    if(abs(b1-b) > 0){
      if(abs(b1 - b) < 2){
        b+=(b1-b)/ abs(b1-b);
      }else{
        b+= (b1-b) / ratioChangeColor;
      }
    }

    this.colText = color(r,g,b,alpha);

  }

  render(){
    noStroke();
    fill(this.colText);
    text(this.text,this.x + windowWidth * 0.5, this.y + windowHeight * 0.5);
    if(this.root){
      noFill();
      strokeWeight(2.5);
      stroke(255, 100);
      circle(this.x + windowWidth * 0.5, this.y + windowHeight * 0.5, windowHeight * 0.03);
      noStroke();
    }
  }
}
