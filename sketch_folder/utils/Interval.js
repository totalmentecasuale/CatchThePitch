  class Interval{
  
  constructor(text, position){
    this.text = text;
    this.pos = position.copy();
    this.initPos = position.copy();
    this.vel = createVector();
    this.acc = createVector();
    this.selected = false;
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
  
  render(){
    push();
    fill(255);
    noStroke();
    text(this.text,this.pos.x,this.pos.y);  
    pop();
  }
  
  run(center){
    this.initPos = center.copy();
    this.move();
    this.render();
  }

  isOver(){
    let x_m = map(mouseX, 0, windowWidth, -windowWidth*0.5, windowWidth*0.5);
    let y_m = map(mouseY, 0, windowHeight, -windowHeight*0.5, windowHeight*0.5);
    var x = this.pos.x;
    var y = this.pos.y;
    var w = textWidth(this.text);
    var h = textAscent();
    var x1 = x + textWidth(this.text) / 2;
    var y1 = y + textAscent() / 2;
    return (x_m > x - w / 2  && x_m < x1 && y_m > y - h/2  && y_m < y1);
  }
  
}
