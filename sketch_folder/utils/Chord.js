class Chord {
  constructor(value, x, y, status, col) {
    this.text = value;
    this.pos = createVector(x,y);
    this.initPos = createVector(x,y);
    this.vel = createVector();
    this.acc = createVector();
    this.selected = false;
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
    text(this.text,this.pos.x + windowWidth * 0.5, this.pos.y + windowHeight * 0.5);
    if(this.root){
      noFill();
      strokeWeight(2.5);
      stroke(255, 100);
      circle(this.pos.x + windowWidth * 0.5, this.pos.y + windowHeight * 0.5, windowHeight * 0.03);
      noStroke();
    }
  }

  updatePosition(){
    this.vel.add(this.acc);
    this.acc.mult(0);
    this.pos.add(this.vel);
  }
  
  applyForce(steer){
    this.acc.add(steer);  
  }
  
  toggleSelect(){
    this.selected = !this.selected;
  }
  
  
  move(){
    let maxVel = 10;
    let maxF = 1.5;
    let desired;
    if(this.selected){  
      desired = createVector().sub(this.pos);

    }else{
      let temp = this.initPos.copy();
      desired = temp.sub(this.pos);
    }
    
    if(desired.mag() < 5){
      let tmp = desired.copy();
       desired.sub(tmp.mult(0.1)); 
    }else{
      desired.normalize();
      desired.mult(maxVel);
    }
    let steer = desired.sub(this.vel);
    steer.limit(maxF);
    this.applyForce(steer);
    this.updatePosition();
  }
  
  run(){
    this.move();
    this.render();
  }
}
