class FifthCircle{

  constructor(activeGrades, activeModes){
    this.maj_col = color(220,72,72,255);
    this.min_col = color(70,80,200);
    this.dim_col = color(97,201,52,255);
    this.radius = windowHeight * 0.2;
    this.chordList = [];
    //the active modes to use
    this.modes = activeModes;
    //the set of intervals to cover
    this.setOfIntervals = activeGrades;
    //the current type of chords selected
    this.type = this.setOfIntervals[floor(random() * this.setOfIntervals.length)];
    //the current mode selected
    this.idx_mode = this.modes[floor(random() * this.modes.length)];
    this.chord;

    //create the note at specific distance from the circle
    this.notes = rootsList;
    let offset = 2 * PI / 12;
    for(let i = 0; i < this.notes.length; i++){
      let comp_x = (this.radius * 1.3) * cos(offset * -i);
      let comp_y = (this.radius * 1.3) * sin(offset * -i);
      let state = DIS;
      this.chordList.push(new Chord(this.notes[i], comp_x, comp_y, state, colJet));
    }

  }

  render(){  
    
    //show the current mode and current root selected
    let t = new ClickableText(this.idx_mode.text + " " + currentRoot.text, 0.5, 0.2, 26);
    t.show(); 
    noFill();
    strokeWeight(2.5);
    stroke(255);
    circle(windowWidth * 0.5, windowHeight * 0.5, this.radius);

    this.updateStatus();
    for(let i = 0; i < this.chordList.length; i++){        
        this.chordList[i].run();
    }
  }

  updateStatus(){

    //consider the circle of fifth as a circular buffer.
    // THE ORDER OF THE INPUT ARE FUNDAMENTAL FOR THIS ALGORITHM
    // the information about the mode and the current root index inside the rootsList is the starting point to count
    // first the major chords, then the minor chords and the diminished chord.

    //indicate the number of chords already placed
    let index = 0;
    for(let i = (this.idx_mode.filler + rootsList.indexOf(currentRoot.text)) % this.chordList.length; 
                i > (this.idx_mode.filler + rootsList.indexOf(currentRoot.text)) % this.chordList.length - this.chordList.length; 
                i--){
      let x = i;
      if(i < 0){ // circular index
        x = this.chordList.length + i;
      }    

      if(index == this.idx_mode.filler){ // if the index is the same, it's the root!
        this.chordList[x].root = true;
      }else{
        this.chordList[x].root = false;
      }
      
      if(index < 3){ // first three chords are major
        this.chordList[x].status = MAJOR;
        index++;
      }else if(index < 6){ // second three chords are minor
        this.chordList[x].status = MINOR;
        index++;
      }else if(index == 6){ // last chord is diminished
        this.chordList[x].status = DIM;
        index++;
      }else{ // all other chords are disabled
        this.chordList[x].status = DIS;
      }
      
      //the chord apply the change of color related to its new status
      this.chordList[x].changeColor();
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
      newIndex = floor(random(1) * this.setOfIntervals.length);
    }while(oldIndex >= 0 && newIndex == oldIndex);

    this.type = this.setOfIntervals[newIndex];
  }

  newChord(){
    this.updateStatus();

    let activeChords = [];
    for(let i = 0; i < this.chordList.length; i++){
      if(this.chordList[i].status != DIS){
        activeChords.push(this.chordList[i]);
      }
    }

    let newChord;
    do{
      newChord = activeChords[floor(random(1) * activeChords.length)];
    }while(this.chord != undefined && this.chord.text == newChord.text);

    this.chord = newChord;

    this.searchAndActivateChord();

  }

  searchAndActivateChord(){

    for(let i = 0; i < this.chordList.length; i++){
      if(this.chordList[i].selected || this.chord == this.chordList[i]){
        this.chordList[i].toggleSelect();
      }
    }
  }
}

