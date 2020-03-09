class FilterPage{
  
  constructor(){  
    this.x_all_roots = windowWidth/2;
    this.y_all_roots = windowHeight * 0.8;
    
    this.x_all_intervals = windowWidth / 2;
    this.y_all_intervals = windowHeight / 2 * 0.7;
    this.radius = windowHeight*0.05;
    this.radiusCheckRoot = windowHeight * 0.02;
    this.radiusCheckIntervals = windowHeight * 0.15;
    this.offset = windowHeight * 0.15;
    this.roots = ['A', 'D', 'G', 'C', 'F', 'Bb', 'Eb', 'Ab', 'Db', 'Gb', 'B', 'E'];
    this.frameToDisappear = 80;
    this.frameToDisappearInit = 80;
    this.opac = 255;
    this.dissolving = false;

    for(let i = 0; i < this.roots.length; i++){
      let x = map(i, 0, this.roots.length, 0 , windowWidth - windowWidth * 0.2) ;
      rootsList.push(new Root(this.roots[i], x + windowWidth * 0.15, windowHeight * 0.55 + (i % 2) * this.offset));
    }

    this.all_intervals = false;
    this.all_roots = false;
    this.t = 0;
    this.tGrow = true;
  }
  
  render(){

    if(this.dissolving && this.frameToDisappear > 0){
      this.frameToDisappear--;
      this.opac = map(this.frameToDisappear, 0, this.frameToDisappearInit, 0, 255);
    }

    if(!this.invisible()){
      //this.updateDispVariables();
      noStroke();
      textSize(fontsize1);
      if(this.t == 255){this.tGrow = false;}
      if(this.t <= 150){this.tGrow = true;}
      if(this.tGrow){this.t++;}else{this.t--;}
      var titleCol = color(this.t, this.t - 50, this.t, this.opac);
      fill(titleCol);
      text(zenIntervalTextTypes, windowWidth / 2, windowHeight * 0.05);
      this.showIntervals();
      textSize(fontsize1);
      fill(titleCol);
      text(zenIntervalTextRoots, windowWidth / 2, windowHeight / 2 * 0.9 );
      this.showRoots();
      
      textSize(fontsize1);
      fill(255, this.opac);
      text("All", this.x_all_intervals, this.y_all_intervals);
      textSize(fontsize1);
      fill(255, this.opac);
      text("All", this.x_all_roots, this.y_all_roots);

      textSize(fontsize1);
      fill(255, this.opac);
      text("GO", this.x_all_roots, windowHeight * 0.94);
    }else{
      phase++;
    }
    
  }
  
  showIntervals(){
  
    for(let i = 0; i < intervalsSet.length; i++){
      let x = map(i, 0, intervalsSet.length, 0 , windowWidth) + windowWidth / 2 / intervalsSet.length;
      let angle = TWO_PI / intervalsSet[i][0].length;
      intervalsSet[i][2] = x;
      intervalsSet[i][3] = windowHeight * 0.1;
      let a = intervalsSet[i][0].length == 3 ? -PI/2 : 0;
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
    for(let i = 0; i < rootsList.length; i++){
      rootsList[i].show(this.opac);
      noFill();
      strokeWeight(2.5);
      stroke(120,this.opac);
      circle(rootsList[i].x, rootsList[i].y, this.radiusCheckRoot * 1.3 );
      noStroke();
    }
  }
  
  update(){
    let x = mouseX;
    let y = mouseY;
    for(let i = 0; i < rootsList.length; i++){
      if(dist(x, y, rootsList[i].x,rootsList[i].y) < this.radiusCheckRoot && !this.dissolving){
        console.log(rootsList[i].text + " clicked");
        rootsList[i].selected();
      }
    }
    
    for(let i = 0; i < intervalsSet.length; i++){
      if(dist(x, y, intervalsSet[i][2],intervalsSet[i][3]) < this.radiusCheckIntervals && !this.dissolving){
        console.log(intervalsSet[i][0] + " clicked");
        intervalsSet[i][1] = !intervalsSet[i][1];
      }
    }
    
    if(dist(x, y, this.x_all_intervals, this.y_all_intervals) < this.radiusCheckRoot && !this.dissolving){  
      console.log("all_intervals clicked");

      this.all_intervals = !this.all_intervals;
      for(let i = 0; i < intervalsSet.length; i++){
        intervalsSet[i][1] = this.all_intervals;
      }
    }
    
    if(dist(x, y, this.x_all_roots, this.y_all_roots) < this.radiusCheckRoot && !this.dissolving){ 
      console.log("all_roots clicked");
 
      this.all_roots = !this.all_roots;
      for(let i = 0; i < rootsList.length; i++){
        rootsList[i].checked = this.all_roots;
      }
    }  

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
    for(let i = 0; i < this.roots.length; i++){
      let x = map(i, 0, this.roots.length, 0 , windowWidth - windowWidth * 0.2) ;
      let r = new Root(this.roots[i], x + windowWidth * 0.15, windowHeight * 0.66 + (i % 2) * this.offset);
      r.checked = this.all_roots;
      r.checked = rootsList[i].checked;
      tmp.push(r);

    }
    rootsList = tmp;
  }

  dissolve(){
    this.dissolving = true;
  }

  invisible(){
    return this.dissolving && this.frameToDisappear <=0;
  }
  
}
