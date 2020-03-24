class Bar{
  constructor(timeLeft, loc){
    this.timeLeft = timeLeft * 1000;
    this.endTime = this.getTime() + this.timeLeft;
    this.maxTime = this.timeLeft;
    this.position = loc.copy();
    this.center = loc.copy();
    this.wholeLength = windowWidth * 0.2;
    this.currentLength = this.wholeLength;
    this.started = false;
    //Color
    this.blueBello = color(53, 69, 158);
    this.redWarn = color(230, 80, 80);
    this.lastColor = this.blueBello;
    this.angle = 0;
  }

  update(){
    if(!this.started){
      this.endTime = this.getTime() + this.timeLeft;
      this.maxTime = this.timeLeft;
    }else{
      this.timeLeft = this.endTime - this.getTime();
    }
    //console.log(this.timeLeft)
    this.currentLength = map(this.timeLeft, this.maxTime, 0, this.wholeLength, 0);
    //console.log(this.currentLength)
    
  }

  render(){

    this.updateDispVariables();
    
    stroke(255);
    strokeWeight(10);
    //Whole bar
    var x = this.center.x - this.wholeLength/2;
    var y = this.center.y
    line(x, y, x + this.wholeLength, y);
    //Current time bar
    if(this.getTime() <= this.endTime){
      if(this.currentLength < this.wholeLength * 0.3 && this.started){ // 10% of total time
        let f = map(this.currentLength, 0, this.wholeLength * 0.3, 50, 10);
        let rf = (cos(radians(this.angle)) + 1) / 2;
        let bf = (-cos(radians(this.angle)) + 1) / 2;
        this.lastColor = color((rf * red(this.redWarn))+ (bf * red(this.blueBello)),
                               (rf * green(this.redWarn)) + (bf * green(this.blueBello)), 
                               (rf * blue(this.redWarn)) + (bf * blue(this.blueBello)));
        this.angle+=f;
      }
      stroke(this.lastColor);
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
      return false;
    } else {
      return true;
    }
  }

  updateDispVariables(){
    this.center = createVector(windowWidth/2, windowHeight * 0.15);
    let temp = this.wholeLength;
    this.wholeLength = windowWidth * 0.2;
    this.currentLength = map(this.currentLength, 0, temp, 0, this.wholeLength);
  }

  start(){
    this.started = true;
  }
}
