class IntervalSelector{

  constructor(intervals) {
    this.intervals = [];
    this.lastSelected = -1;
    this.radius = windowHeight * 0.2;
    let offset = 2 * PI / intervals.length;
    this.dist = radius * 0.3;

    //create the correct position around the circle to show the intervals passed as argument to the constructor
    for(let i = 0; i < intervals.length; i++){
      let comp_x = (this.radius + this.dist) * cos(offset * -i);
      let comp_y = (this.radius + this.dist) * sin(offset * -i);
      this.intervals.push(new Interval(intervals[i], createVector(comp_x, comp_y)));
    }
  }

  render() {
    push();
    translate(windowWidth/2, windowHeight/2);
    noFill();
    strokeWeight(5.0);
    stroke(255);
    circle(0, 0, this.radius);

    let offset = 2 * PI / this.intervals.length;

    //we update the original position to not call the update inside interval (can be modified)
    for(let i = 0; i < this.intervals.length; i++){
      let comp_x = (this.radius + this.dist) * cos(offset * -i);
      let comp_y = (this.radius + this.dist) * sin(offset * -i);
      this.intervals[i].run(createVector(comp_x, comp_y));
    }
    pop();
  }

  selectInterval(index){
    //the interval to be selected
    let selInt = this.intervals[index];
    //select the interval
    if(!selInt.selected){
     selInt.toggleSelect();
    }
    if(this.lastSelected >= 0 && this.lastSelected !== index){ //if there was already one selected interval, update it
      let prevSelInt = this.intervals[this.lastSelected];
      prevSelInt.toggleSelect();
    }
    //update the new index of the last selected
    this.lastSelected = index;
  }

  updateDispVariables(){
    this.radius = windowHeight * 0.2;
    this.dist = this.radius * 0.3;
  }

  newInterval(){
    //update the new interval selecting a different one from the current one
    let index;
    do{
      index = int((random(this.intervals.length) * 50) % this.intervals.length);
    }while(this.lastSelected >= 0 && index == this.lastSelected);

    this.selectInterval(index);
  }

  checkIntervalsClicked(){
    //check if the mouse clicked one of the intervals showing in the circle
    let clicked;
    for(let i = 0; i < this.intervals.length; i++){
      if(this.intervals[i].isOver(this.dist)){
        this.selectInterval(i);
        return true;
      }
    }
    return false;

  }

}
