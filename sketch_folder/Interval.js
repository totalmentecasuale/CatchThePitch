class Interval{
  
  constructor(text, value, type, position){
    this.text = text;
    this.value = value;
    this.type = type;
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
    fill(255);
    noStroke();
    text(this.text,this.pos.x,this.pos.y);  
  }
  
  run(center){
    this.initPos = center.copy();
    this.move();
    this.render();
  }

  isOver(radius){
    let x_m = map(mouseX, 0, windowWidth, -windowWidth*0.5, windowWidth*0.5);
    let y_m = map(mouseY, 0, windowHeight, -windowHeight*0.5, windowHeight*0.5);
    return this.pos.dist(createVector(x_m, y_m)) < radius && !this.selected;
  }
  
}
