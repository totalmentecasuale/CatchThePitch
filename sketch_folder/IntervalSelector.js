class IntervalSelector{
  
  constructor(intervals) {
    this.intervals = [];
    this.lastSelected = -1; 
    this.radius = windowHeight * 0.2;
    let offset = 2 * PI / intervals.length;
    this.dist = radius * 0.3;
    for(let i = 0; i < intervals.length; i++){
      let comp_x = (this.radius + this.dist) * cos(offset * -i);
      let comp_y = (this.radius + this.dist) * sin(offset * -i);
      this.intervals.push(new Interval(intervals[i], '', '', createVector(comp_x, comp_y)));     
    }
  }

  render() {  
    translate(windowWidth/2, windowHeight/2);
    noFill();
    strokeWeight(5.0);
    stroke(255);
    circle(0, 0, this.radius);
    
    let offset = 2 * PI / this.intervals.length;

    for(let i = 0; i < this.intervals.length; i++){
      let comp_x = (this.radius + this.dist) * cos(offset * -i);
      let comp_y = (this.radius + this.dist) * sin(offset * -i);
      this.intervals[i].run(createVector(comp_x, comp_y));  
    }
  }
  
  selectInterval(index){
    let selInt = this.intervals[index];
    selInt.toggleSelect();
    if(this.lastSelected >= 0){
      let prevSelInt = this.intervals[this.lastSelected];
      prevSelInt.toggleSelect();
    }
    this.lastSelected = index;
  }

  updateDispVariables(){
    this.radius = windowHeight * 0.2;
    this.dist = this.radius * 0.3;
  }

  newInterval(){
    let index;
    do{
      index = int((random(this.intervals.length) * 50) % this.intervals.length);
    }while(this.lastSelected >= 0 && index == this.lastSelected);

    is.selectInterval(index);
  }

  checkIntervalsClicked(){
    let clicked;
    for(let i = 0; i < this.intervals.length; i++){
      if(this.intervals[i].isOver(this.dist)){
        this.selectInterval(i);
        break;
      }
    }

  }

}
