class Bar{
  constructor(timeLeft, loc){
    this.timeLeft = timeLeft * 1000;
    this.endTime = this.getTime() + timeLeft;
    this.maxTime = timeLeft;
    this.position = loc;
    this.center = createVector(loc.x, loc.y);
    this.wholeLength = width * 0.2;
    this.currentLength = this.wholeLength;
    //Color
    this.blueBello = color(53, 69, 158);
  }

  update(){
    this.timeLeft = this.endTime - this.getTime();
    //console.log(this.timeLeft)
    this.currentLength = map(this.timeLeft, this.maxTime, 0, this.wholeLength, 0);
    //console.log(this.currentLength)
  }

  render(){
    stroke(255);
    strokeWeight(10);
    //Whole bar
    var x = this.center.x - this.wholeLength/2;
    var y = this.center.y
    line(x, y, x + this.wholeLength, y);
    //Current time bar
    if(this.getTime() <= this.endTime){
      stroke(this.blueBello);
    }
    line(x, y, x + this.currentLength, y);
  }

  run(){
    push();
    if(this.getTime() < this.endTime){
      this.update();
    }
    this.render();
    pop();
    return this.isOver();
  }

  getTime(){
    var d = new Date();
    return d.getTime();
  }

  isOver(){
    if(this.getTime() < this.endTime){
      return true;
    } else {
      return false;
    }
  }
}
