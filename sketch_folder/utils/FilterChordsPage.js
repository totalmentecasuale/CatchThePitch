class FilterChordsPage{
  
  constructor(){ 
    //coordinates of all modes button 
    this.x_all_modes = 0.5;
    this.y_all_modes = 0.8;

    //chords types
    this.chordsList = [];
    
    //coordinates of all chord types button
    this.x_all_chords = 0.5;
    this.y_all_chords = 0.35;

    //radius
    this.radius = windowHeight*0.05;

    //radius to check click for modes
    this.radiusCheckModes = windowHeight * 0.02;
    //radius to check click for chord types
    this.radiusCheckChords = windowHeight * 0.02;

    //offset between filter values in case of triangular layout
    this.offset = windowHeight * 0.15;
    
    //modes
    this.modes = [];

    this.frameToDisappear = 30;
    this.frameToDisappearInit = 30;
    this.opac = 255;
    this.dissolving = false;

    //initializing modes
    let triOffset = modesList.length > 3 ? this.offset : 0;
    let xOffset = windowWidth * 0.8 / modesList.length / 2;

    for(let i = 0; i < modesList.length; i++){
      let x = map(i, 0, modesList.length, windowWidth * 0.1, windowWidth - windowWidth * 0.1) ;
      this.modes.push(new FilterCell(modesList[i][0], x + xOffset, windowHeight * 0.55 + (i % 2) * triOffset, modesList[i][2]));
    }

    //initializing chord types
    triOffset = chordsList.length > 3 ? this.offset : 0;
    xOffset = windowWidth * 0.8 / chordsList.length / 2;


    for(let i = 0; i < chordsList.length; i++){
      let x = map(i, 0, chordsList.length, windowWidth * 0.1, windowWidth - windowWidth * 0.1) ;
      this.chordsList.push(new FilterCell(chordsList[i][0], x + xOffset, windowHeight * 0.2 + (i % 2) * triOffset, chordsList[i][2]));
    }

    this.all_chords = false;
    this.all_modes = false;
    this.t = 0;
    this.tGrow = true;

    this.allChordButton = new ClickableText("All", this.x_all_chords, this.y_all_chords, fontsize1, undefined, false, fontGameTime);
    this.allModesButton = new ClickableText("All", this.x_all_modes, this.y_all_modes, fontsize1, undefined, false, fontGameTime);
    this.nextPhaseButton = new ClickableText("Go", this.x_all_modes, this.y_all_modes * 1.2, fontsize1, undefined, true);
    this.firstSetFilter = new ClickableText(zenChordTextTypes, 0.5,0.08,fontsize1, undefined, true);
    this.secondSetFilter = new ClickableText(zenChordTextModes, 0.5,0.45,fontsize1, undefined, true);
  }
  
  render(){

    //if dissolving update the opac 
    if(this.dissolving && this.frameToDisappear > 0){
      this.frameToDisappear--;
      this.opac = map(this.frameToDisappear, 0, this.frameToDisappearInit, 0, 255);
    }
    //if still visible, render it
    if(!this.invisible()){

      this.firstSetFilter.show(this.opac);
      
      //show chord types
      this.showChords();

      //Show the first title for modes
      this.secondSetFilter.show(this.opac);
      //show modes
      this.showModes();
      
      //show all for chord types
      this.allChordButton.show(this.opac);
      //show all for modes
      this.allModesButton.show(this.opac);
      if(this.checkMinimumFilterSelected()){
        //show go for next phase
        this.nextPhaseButton.show(this.opac);
      }else{
        this.nextPhaseButton.show(0);
      }
    }else{ // page is totally dissolved, next phase
      phase = 2;
    }
    
  }
  
  showChords(){
    //show all the chord types
    for(let i = 0; i < this.chordsList.length; i++){
      this.chordsList[i].show(this.opac);
    }
  }
  
  showModes(){
    //show all the modes
    for(let i = 0; i < this.modes.length; i++){
      this.modes[i].show(this.opac);
    }
  }
  
  update(){
    //check if the click has been executed on a element of the filter page

    //modes
    for(let i = 0; i < this.modes.length; i++){
      if(this.modes[i].isOver() && !this.dissolving){
        console.log(this.modes[i].text + " clicked");
        this.modes[i].selected();
      }
    }
    
    //chord types
    for(let i = 0; i < this.chordsList.length; i++){
      if(this.chordsList[i].isOver() && !this.dissolving){
        console.log(this.chordsList[i].text + " clicked");
        this.chordsList[i].selected();
      }
    }
    
    //all chord types
    if(this.allChordButton.isOver() && !this.dissolving){  
      console.log("all_chords clicked");

      this.all_chords = !this.all_chords;
      for(let i = 0; i < this.chordsList.length; i++){
        this.chordsList[i].checked = this.all_chords;
      }
    }
    
    //all modes
    if(this.allModesButton.isOver() && !this.dissolving){ 
      console.log("all_modes clicked");
 
      this.all_modes = !this.all_modes;
      for(let i = 0; i < this.modes.length; i++){
        this.modes[i].checked = this.all_modes;
      }
    }  

    //go
    if(this.nextPhaseButton.isOver() && !this.dissolving){ 
      console.log("dissolve clicked");
      this.dissolve();
    } 
  }

  updateDispVariables(){

    this.x_all_modes = windowWidth/2;
    this.y_all_modes = windowHeight * 0.8;
    this.x_all_chords = windowWidth / 2;
    this.y_all_chords = windowHeight / 2 * 0.7;
    this.radius = windowHeight*0.05;
    this.radiusCheckModes = windowHeight * 0.02;
    this.radiusCheckChords = windowHeight * 0.02;
    this.offset = windowHeight * 0.15;
    let tmp = [];
    let triOffset = this.modes.length > 3 ? this.offset : 0;
    let xOffset = windowWidth * 0.8 / this.modes.length / 2;

    for(let i = 0; i < this.modes.length; i++){
      let x = map(i, 0, this.modes.length, windowWidth * 0.1, windowWidth * 0.9) ;
      let mode = new FilterCell(this.modes[i].text, x + xOffset, windowHeight * 0.55 + (i % 2) * triOffset, this.modes[i].filler);
      mode.checked = this.modes[i].checked;
      tmp.push(mode);
    }

    this.modes = tmp;

    tmp = [];
    triOffset = this.chordsList.length > 3 ? this.offset : 0;
    xOffset = windowWidth * 0.8 / this.chordsList.length / 2;

    for(let i = 0; i < this.chordsList.length; i++){
      let x = map(i, 0, this.chordsList.length, windowWidth * 0.1, windowWidth * 0.9) ;
      let chord = new FilterCell(this.chordsList[i].text, x + xOffset, windowHeight * 0.2 + (i % 2) * triOffset, this.chordsList[i].filler);
      chord.checked = this.chordsList[i].checked;
      tmp.push(chord);
    }

    this.chordsList = tmp;
  }

  dissolve(){
    this.dissolving = true;
  }

  invisible(){
    return this.dissolving && this.frameToDisappear <=0;
  }

  checkMinimumFilterSelected(){
    let arrOK1 = false, arrOK2 = false;

    for(let i = 0; i < this.modes.length; i++){
      arrOK1 = arrOK1 || this.modes[i].checked;
      if(arrOK1){
        break;
      }
    }

    for(let i = 0; i < this.chordsList.length; i++){
      arrOK2 = arrOK2 || this.chordsList[i].checked;
      if(arrOK2){
        break;
      } 
    }

    return arrOK1 && arrOK2;
  }
  
}
