class Particle{
  constructor(start, amp){
    this.loc = start;
    this.amp = amp;
    this.accel = createVector(0,0);
    this.vel = createVector(0,0);
    this.explode = false;
    this.lifespan = random(100);
    this.xSin = 0;
  }

  update(){
    this.loc.y = height * 0.56 + sin(this.xSin + this.loc.x / 10) * this.amp;
    this.xSin += map(mouseX, 0, width, 0.06, 0.4);
    if(this.explode){
      var explodeDest = createVector(random(2*width), random(1.5*height));
      this.accel = explodeDest.sub(this.loc);
      this.accel.limit(10);
      this.vel.add(this.accel);
      this.loc.add(this.vel);
      this.lifespan -= 1;

    }
  }

  render(){
    stroke(255);
    if(this.explode){
      stroke(color(random(255), random(255), random(255)));
    }
    strokeWeight(2);
    point(this.loc.x, this.loc.y);
  }

  run(){
    this.update();
    //this.render();
  }

  isDead(){
    if(this.lifespan <= 0){
      return true;
    }
    return false;
  }
}
