class FilterIntervalPage{
  
  constructor(){  
    //coordinates of all buttons for roots
    this.x_all_roots = windowWidth/2;
    this.y_all_roots = windowHeight * 0.8;

    //coordinates of all buttons for intervals
    this.x_all_intervals = windowWidth / 2;
    this.y_all_intervals = windowHeight / 2 * 0.7;

    //radius
    this.radius = windowHeight*0.05;

    //radius for click in roots
    this.radiusCheckRoot = windowHeight * 0.02;

    //radius for click in intervals
    this.radiusCheckIntervals = windowHeight * 0.15;

    //offset of height when displaying text in a triangular way
    this.offset = windowHeight * 0.15;

    //the roots
    this.roots = [];

    this.frameToDisappear = 80;
    this.frameToDisappearInit = 80;
    this.opac = 255;
    this.dissolving = false;


    //initializing the roots 
    let triOffset = rootsList.length > 3 ? this.offset : 0;
    let xOffset = (windowWidth * 0.8 / rootsList.length) / 2;
    for(let i = 0; i < rootsList.length; i++){
      let x = map(i, 0, rootsList.length, windowWidth * 0.1, windowWidth * 0.9) ;
      this.roots.push(new FilterCell(rootsList[i], x + xOffset, windowHeight * 0.55 + (i % 2) * triOffset));
    }

    this.all_intervals = false;
    this.all_roots = false;
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
      //Show the first title for intervals
      var titleCol = color(this.t, this.t - 50, this.t, this.opac);
      fill(titleCol);
      text(zenIntervalTextTypes, windowWidth / 2, windowHeight * 0.05);
      //show the intervals
      this.showIntervals();

      //Show the second title for roots
      textSize(fontsize1);
      fill(titleCol);
      text(zenIntervalTextRoots, windowWidth / 2, windowHeight / 2 * 0.9 );
      //show the roots
      this.showRoots();
      
      //Show "all" for intervals
      textSize(fontsize1);
      fill(255, this.opac);
      text("All", this.x_all_intervals, this.y_all_intervals);
      //Show "all" for roots
      textSize(fontsize1);
      fill(255, this.opac);
      text("All", this.x_all_roots, this.y_all_roots);

      //Show "Go" to next phase
      textSize(fontsize1);
      fill(255, this.opac);
      text("GO", this.x_all_roots, windowHeight * 0.94);
    }else{//the filters are set and the page dissolved totally, next phase starts
      phase = 1;
    }
    
  }
  
  showIntervals(){
  
    for(let i = 0; i < intervalsSet.length; i++){
      //find the right x related to the length of the array
      let x = map(i, 0, intervalsSet.length, 0 , windowWidth) + windowWidth / 2 / intervalsSet.length;

      //calculate the angle needed
      let angle = TWO_PI / intervalsSet[i][0].length;
      intervalsSet[i][2] = x;
      intervalsSet[i][3] = windowHeight * 0.1;
      let a = intervalsSet[i][0].length == 3 ? -PI/2 : 0;
      //create the text around the circle
      for (let j = 0; a < TWO_PI; a += angle, j++) {
        let text_x = x + cos(a) * this.radius;
        let text_y = windowHeight * 0.22 + sin(a) * this.radius;

        if(intervalsSet[i][1]){
          fill(240, 164, 65, this.opac);
        }else{
          fill(255, this.opac);
        }
        textSize(fontsize2);
        text(intervalsSet[i][0][j], text_x, text_y);
      }
      noFill();
      strokeWeight(2.5);
      stroke(120, this.opac);
      circle(x, windowHeight * 0.22, this.radiusCheckIntervals * 0.1 );
      noStroke();
    }
  
  }
  
  showRoots(){

    //show all the roots and circle them
    for(let i = 0; i < this.roots.length; i++){
      this.roots[i].show(this.opac);
      noFill();
      strokeWeight(2.5);
      stroke(120,this.opac);
      circle(this.roots[i].x, this.roots[i].y, this.radiusCheckRoot * 1.3 );
      noStroke();
    }
  }
  
  update(){
    let x = mouseX;
    let y = mouseY;

    //check if the click of the mouse has been executed on one of the buttons defined in the filter page

    //Roots buttons
    for(let i = 0; i < this.roots.length; i++){
      if(dist(x, y, this.roots[i].x,this.roots[i].y) < this.radiusCheckRoot && !this.dissolving){
        console.log(this.roots[i].text + " clicked");
        this.roots[i].selected();
      }
    }
    
    //Intervals buttons
    for(let i = 0; i < intervalsSet.length; i++){
      if(dist(x, y, intervalsSet[i][2],intervalsSet[i][3]) < this.radiusCheckIntervals && !this.dissolving){
        console.log(intervalsSet[i][0] + " clicked");
        intervalsSet[i][1] = !intervalsSet[i][1];
      }
    }
    
    //all interval button
    if(dist(x, y, this.x_all_intervals, this.y_all_intervals) < this.radiusCheckRoot && !this.dissolving){  
      console.log("all_intervals clicked");

      this.all_intervals = !this.all_intervals;
      for(let i = 0; i < intervalsSet.length; i++){
        intervalsSet[i][1] = this.all_intervals;
      }
    }
    

    //all roots button
    if(dist(x, y, this.x_all_roots, this.y_all_roots) < this.radiusCheckRoot && !this.dissolving){ 
      console.log("all_roots clicked");
 
      this.all_roots = !this.all_roots;
      for(let i = 0; i < this.roots.length; i++){
        this.roots[i].checked = this.all_roots;
      }
    }  

    //go button 
    if(dist(x, y, this.x_all_roots, windowHeight * 0.94) < this.radiusCheckRoot && !this.dissolving){ 
      console.log("dissolve clicked");
      this.dissolve();
    } 
  }

  updateDispVariables(){

    this.x_all_roots = windowWidth/2;
    this.y_all_roots = windowHeight - windowHeight * 0.08;
    
    this.x_all_intervals = windowWidth / 2;
    this.y_all_intervals = windowHeight / 2 - windowHeight * 0.13;
    this.radius = windowHeight*0.05;
    this.radiusCheckRoot = windowHeight * 0.02;
    this.radiusCheckIntervals = windowHeight * 0.15;
    this.offset = windowHeight * 0.15;
    let tmp = [];
    let triOffset = this.roots.length > 3 ? this.offset : 0;
    let xOffset = (windowWidth / 0.8 % this.roots.length) / 2;
    for(let i = 0; i < this.roots.length; i++){
      let x = map(i, 0, this.roots.length, windowWidth * 0.1, windowWidth * 0.9) ;
      let r = new FilterCell(this.roots[i].text, x + xOffset, windowHeight * 0.55 + (i % 2) * triOffset);
      r.checked = rootsList[i].checked;
      tmp.push(r);

    }
    this.roots = tmp;
  }

  dissolve(){
    this.dissolving = true;
  }

  invisible(){
    return this.dissolving && this.frameToDisappear <=0;
  }
  
}