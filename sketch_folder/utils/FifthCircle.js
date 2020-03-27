class FifthCircle{

  constructor(activeGrades, activeModes){
    this.maj_col = color(220,72,72,255);
    this.min_col = color(70,80,200);
    this.dim_col = color(97,201,52,255);
    this.radius = 0.2;
    this.chordList = [];
    //the active modes to use
    this.modes = activeModes;
    //the set of intervals to cover
    this.setOfIntervals = activeGrades;
    //the current type of chords selected
    this.type = this.setOfIntervals[floor(random() * this.setOfIntervals.length)];
    //the current mode selected
    this.idx_mode = this.modes[floor(random() * this.modes.length)];
    //the chord selected from the circle of fifth of the current mode and root
    this.chord;
    //the last interval to consider during the answering process 
    this.lastIntervalChord;

    //create the note at specific distance from the circle
    this.notes = rootsList;
    let offset = 2 * PI / 12;
    for(let i = 0; i < this.notes.length; i++){
      let comp_x = (this.radius * windowHeight * 1.3) * cos(offset * -i);
      let comp_y = (this.radius * windowHeight * 1.3) * sin(offset * -i);
      let state = DIS;
      this.chordList.push(new Chord(this.notes[i], comp_x, comp_y, state, colJet));
    }

  }

  render(){ 

    this.updateDispVariables();

    push();
    fill(255);
    textSize(28);
    //show the current mode and current root selected
    text(this.idx_mode.text + " " + rootText.dispText, 0.5 * windowWidth, 0.18 * windowHeight);
    pop();
    noFill();
    strokeWeight(2.5);
    stroke(255);
    circle(windowWidth * 0.5, windowHeight * 0.5, this.radius * windowHeight);

    this.updateStatus();
    for(let i = 0; i < this.chordList.length; i++){        
        this.chordList[i].run();
    }
  }

  updateDispVariables(){
    let offset = 2 * PI / 12;
    for(let i = 0; i < this.notes.length; i++){
      let comp_x = (this.radius * windowHeight * 1.3) * cos(offset * -i);
      let comp_y = (this.radius * windowHeight * 1.3) * sin(offset * -i);
      let state = DIS;
      this.chordList[i].pos = createVector(comp_x,comp_y);
      this.chordList[i].initPos = createVector(comp_x,comp_y);
    }
  }

  updateStatus(){

    // consider the circle of fifth as a circular buffer.
    // THE ORDER OF THE INPUT ARE FUNDAMENTAL FOR THIS ALGORITHM
    // the information about the mode and the current root index inside the rootsList is the starting point to count
    // first the major chords, then the minor chords and the diminished chord.

    //indicate the number of chords already placed
    let index = 0;

    let offsetMode = this.idx_mode.filler;
    let offsetRoot = this.searchRoot();

    for(let i = (offsetMode + offsetRoot) % this.chordList.length; 
                i > (offsetMode + offsetRoot) % this.chordList.length - this.chordList.length; 
                i--){
      let x = i;
      if(i < 0){ // circular index
        x = this.chordList.length + i;
      }   
 

      if(index == offsetMode){ // if the index is the same, it's the root!
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
    }while(oldIndex >= 0 && newIndex == oldIndex && this.modes.length > 1);
    this.idx_mode = this.modes[newIndex];

  }

  newChordType(){
    //select a new chord type respect to the previous one, if available
    let newIndex;
    let oldIndex = this.setOfIntervals.indexOf(this.type);
    do{
      newIndex = floor(random(1) * this.setOfIntervals.length);
    }while(oldIndex >= 0 && newIndex == oldIndex && this.setOfIntervals.length > 1);

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
    }while(this.chord != undefined && this.chord.text == newChord.text && activeChords.length > 1);
    this.chord = newChord;
    this.lastIntervalChord = this.type.filler[0][0];
    this.searchAndActivateChord();

  }

  searchAndActivateChord(){

    for(let i = 0; i < this.chordList.length; i++){
      //two chords have to change state, the new one(enabling) and the current one(disabling)
      if(this.chordList[i].selected || this.chord == this.chordList[i]){
        this.chordList[i].toggleSelect();
      }
    }
  }

  //search the root from the array comparing it to the actual root of the context
  searchRoot(){
    for(let i = 0; i < this.notes.length; i++){
      if(this.notes[i].toUpperCase() === rootText.text){
        return i;
      }
    }
    return -1;
  }

  updateLastIntervalChord(answersBar){
  
    //interval type is like [type, active true/false, [[[],[],[]],[[],[],[]],....]]
    //it's an array where the last cell of the first level is related to intervals composing a 
    //specific chord (major, minor, diminished). For each note composing the chord selected,
    //an interval is defined respect to previous note. To know the distance from the current root
    //and the correct interval, intervals related to the grade of the chords must be summed into one
    let offset = 0;
    if(this.chord != undefined){
      if(this.chord.status == MINOR){
        offset = 1;
      }else if(this.chord.status == DIM){
        offset = 2;
      }
    }

    let tempInterval;
    let indexFiller = this.searchFirstDisabledAnswer(answersBar);
    if(indexFiller >= 0){
      let rootChord = teoria.note(this.chord.text + "3");
      let destNote = rootChord;
      for(let i = 1; i <= indexFiller; i++){

        let newInterval = this.type.filler[i][offset]
        destNote = destNote.interval(newInterval);
      }

      let intervalToBeAnswered = this.type.filler[indexFiller][offset];
      
      tempInterval = teoria.interval(rootChord, destNote);
      
      this.lastIntervalChord = tempInterval;
    }
  }

  //returns the index of the step bar active with no answer and state disabled, if it not exists, it returns -1
  searchFirstDisabledAnswer(answersBar){
    for(let i = 0; i < answersBar.cells.length; i++){
      if(answersBar.cells[i].answer == undefined){
        return i;
      }
    }
    return -1;
  }
}

