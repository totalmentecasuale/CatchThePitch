class FifthCircle{

  constructor(activeGrades, activeModes){
    this.maj_col = color(220,72,72,255);
    this.min_col = color(70,80,200);
    this.dim_col = color(97,201,52,255);
    this.radius = radius;
    this.chordTypes = [];
    //the active modes to use
    this.modes = activeModes;
    //the set of intervals to cover
    this.setOfIntervals = activeGrades;
    //the current type of chords selected
    this.type = this.setOfIntervals[floor(random() * this.setOfIntervals.length)];
    //the current mode selected
    this.idx_mode = this.modes[floor(random() * this.modes.length)];

    //create the note at specific distance from the circle
    this.notes = rootsList;
    let offset = 2 * PI / 12;
    for(let i = 0; i < this.notes.length; i++){
      let comp_x = (this.radius * 1.3) * cos(offset * -i);
      let comp_y = (this.radius * 1.3) * sin(offset * -i);
      let state = DIS;
      this.chordTypes.push(new Chord(this.notes[i], comp_x, comp_y, state, colJet));
    }
  }

  render(){  
    
    //show the current mode and current root selected
    let t = new ClickableText(this.idx_mode.text + " " + currentRoot.text, 0.5, 0.2, 0, 26);
    t.show(); 
    noFill();
    strokeWeight(2.5);
    stroke(255);
    circle(windowWidth * 0.5, windowHeight * 0.5, radius);

    this.updateStatus();
    for(let i = 0; i < this.chordTypes.length; i++){
        
        this.chordTypes[i].render();
      
    }
  }

  updateStatus(){

    //consider the circle of fifth as a circular buffer.
    // THE ORDER OF THE INPUT ARE FUNDAMENTAL FOR THIS ALGORITHM
    // the information about the mode and the current root index inside the rootsList is the starting point to count
    // first the major chords, then the minor chords and the diminished chord.

    //indicate the number of chords already placed
    let index = 0;
    for(let i = (this.idx_mode.filler + rootsList.indexOf(currentRoot.text)) % this.chordTypes.length; 
                i > (this.idx_mode.filler + rootsList.indexOf(currentRoot.text)) % this.chordTypes.length - this.chordTypes.length; 
                i--){
      let x = i;
      if(i < 0){ // circular index
        x = this.chordTypes.length + i;
      }    

      if(index == this.idx_mode.filler){ // if the index is the same, it's the root!
        this.chordTypes[x].root = true;
      }else{
        this.chordTypes[x].root = false;
      }
      
      if(index < 3){ // first three chords are major
        this.chordTypes[x].status = MAJOR;
        index++;
      }else if(index < 6){ // second three chords are minor
        this.chordTypes[x].status = MINOR;
        index++;
      }else if(index == 6){ // last chord is diminished
        this.chordTypes[x].status = DIM;
        index++;
      }else{ // all other chords are disabled
        this.chordTypes[x].status = DIS;
      }
      
      //the chord apply the change of color related to its new status
      this.chordTypes[x].changeColor();
    }  
  }

  newMode(){
    //select a new different mode respect to the previous one, if available
    let newIndex;
    let oldIndex = this.modes.indexOf(this.idx_mode);

    do{
      newIndex = floor(random(1) * this.modes.length);
    }while(oldIndex >= 0 && newIndex == oldIndex);
    this.idx_mode = this.modes[newIndex];

  }

  newChordType(){
    //select a new chord type respect to the previous one, if available
    let newIndex;
    let oldIndex = this.setOfIntervals.indexOf(this.type);

    do{
      newIndex = floor(random(1) * this.modes.length);
    }while(oldIndex >= 0 && newIndex == oldIndex);
    this.type = this.setOfIntervals[newIndex];

  }
}

