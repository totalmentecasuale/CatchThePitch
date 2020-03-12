class FilterChordsPage{
  
  constructor(){ 
    //coordinates of all modes button 
    this.x_all_modes = windowWidth/2;
    this.y_all_modes = windowHeight * 0.8;

    //chords types
    this.chordsList = [];
    
    //coordinates of all chord types button
    this.x_all_chords = windowWidth / 2;
    this.y_all_chords = windowHeight / 2 * 0.7;

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
  }
  
  render(){

    //if dissolving update the opac 
    if(this.dissolving && this.frameToDisappear > 0){
      this.frameToDisappear--;
      this.opac = map(this.frameToDisappear, 0, this.frameToDisappearInit, 0, 255);
    }
    //if still visible, render it
    if(!this.invisible()){
      noStroke();
      textSize(fontsize1);
      if(this.t == 255){this.tGrow = false;}
      if(this.t <= 150){this.tGrow = true;}
      if(this.tGrow){this.t++;}else{this.t--;}
      //Show the first title for chord types
      var titleCol = color(this.t, this.t - 50, this.t, this.opac);
      fill(titleCol);
      text(zenChordTextTypes, windowWidth * 0.5, windowHeight * 0.05);
      //show chord types
      this.showChords();

      //Show the first title for modes
      textSize(fontsize1);
      fill(titleCol);
      text(zenChordTextModes, windowWidth * 0.5, windowHeight * 0.45 );
      //show modes
      this.showModes();
      
      //show all for chord types
      textSize(fontsize1);
      fill(255, this.opac);
      text("All", this.x_all_chords, this.y_all_chords);
      //show all for modes
      textSize(fontsize1);
      fill(255, this.opac);
      text("All", this.x_all_modes, this.y_all_modes);
      
      //show go for next phase
      textSize(fontsize1);
      fill(255, this.opac);
      text("GO", this.x_all_modes, windowHeight * 0.94);
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
    let x = mouseX;
    let y = mouseY;

    //check if the click has been executed on a element of the filter page

    //modes
    for(let i = 0; i < this.modes.length; i++){
      if(dist(x, y, this.modes[i].x,this.modes[i].y) < this.radiusCheckModes && !this.dissolving){
        console.log(this.modes[i].text + " clicked");
        this.modes[i].selected();
      }
    }
    
    //chord types
    for(let i = 0; i < this.chordsList.length; i++){
      if(dist(x, y, this.chordsList[i].x,this.chordsList[i].y) < this.radiusCheckChords && !this.dissolving){
        console.log(this.chordsList[i].text + " clicked");
        this.chordsList[i].selected();
      }
    }
    
    //all chord types
    if(dist(x, y, this.x_all_chords, this.y_all_chords) < this.radiusCheckChords && !this.dissolving){  
      console.log("all_chords clicked");

      this.all_chords = !this.all_chords;
      for(let i = 0; i < this.chordsList.length; i++){
        this.chordsList[i].checked = this.all_chords;
      }
    }
    
    //all modes
    if(dist(x, y, this.x_all_modes, this.y_all_modes) < this.radiusCheckModes && !this.dissolving){ 
      console.log("all_modes clicked");
 
      this.all_modes = !this.all_modes;
      for(let i = 0; i < this.modes.length; i++){
        this.modes[i].checked = this.all_modes;
      }
    }  

    //go
    if(dist(x, y, this.x_all_modes, windowHeight * 0.94) < this.radiusCheckModes && !this.dissolving){ 
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
  
}
