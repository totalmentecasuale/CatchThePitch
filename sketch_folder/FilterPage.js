class FilterPage{
  
  constructor(){  
    this.x_all_roots = windowWidth/2;
    this.y_all_roots = windowHeight - windowHeight * 0.08;
    
    this.x_all_intervals = windowWidth / 2;
    this.y_all_intervals = windowHeight / 2 - windowHeight * 0.13;
    this.radius = windowHeight*0.05;
    this.radiusCheckRoot = windowHeight * 0.02;
    this.radiusCheckIntervals = windowHeight * 0.15;
    this.offset = windowHeight * 0.15;
    this.rootsList = [];
    this.roots = ['A', 'D', 'G', 'C', 'F', 'Bb', 'Eb', 'Ab', 'Db', 'Gb', 'B', 'E'];

    for(let i = 0; i < this.roots.length; i++){
      let x = map(i, 0, this.roots.length, 0 , windowWidth - windowWidth * 0.2) ;
      this.rootsList.push(new Root(this.roots[i], x + windowWidth * 0.15, windowHeight * 0.66 + (i % 2) * this.offset));
    }

    this.intervalsSet = [[['PU','m3','M3'], false, 0, 0],
                    [['P4', 'P5', 'M6', 'm6'], false, 0, 0],
                    [['m7', 'M7', 'P8'], false, 0, 0]];
    this.all_intervals = false;
    this.all_roots = false;
    this.t = 0;
    this.tGrow = true;
  }
  
  render(){

    this.updateDispVariables();
    
    textSize(fontsize1);
    if(this.t == 255){this.tGrow = false;}
    if(this.t <= 150){this.tGrow = true;}
    if(this.tGrow){this.t++;}else{this.t--;}
    var titleCol = color(this.t, this.t - 50, this.t);
    fill(titleCol);
    text(zenIntervalTextTypes, windowWidth / 2, windowHeight * 0.05);
    this.showIntervals();
    textSize(fontsize1);
    fill(titleCol);
    text(zenIntervalTextRoots, windowWidth / 2, windowHeight / 2);
    this.showRoots();
    
    textSize(fontsize1);
    fill(255);
    text("All", this.x_all_intervals, this.y_all_intervals);
    textSize(fontsize1);
    fill(255);
    text("All", this.x_all_roots, this.y_all_roots);
    
  }
  
  showIntervals(){
  
    for(let i = 0; i < this.intervalsSet.length; i++){
      let x = map(i, 0, this.intervalsSet.length, 0 , windowWidth) + windowWidth / 2 / this.intervalsSet.length;
      let angle = TWO_PI / this.intervalsSet[i][0].length;
      this.intervalsSet[i][2] = x;
      this.intervalsSet[i][3] = windowHeight * 0.1;
      let a = this.intervalsSet[i][0].length == 3 ? -PI/2 : 0;
      for (let j = 0; a < TWO_PI; a += angle, j++) {
        let text_x = x + cos(a) * this.radius;
        let text_y = windowHeight * 0.22 + sin(a) * this.radius;
        
        //noFill();
        //stroke(255, 40);
        //strokeWeight(1);
        //circle(x, -height / 2 + 300, radiusCheckIntervals);
        if(this.intervalsSet[i][1]){
          fill(240, 164, 65);
        }else{
          fill(255);
        }
        textSize(fontsize2);
        text(this.intervalsSet[i][0][j], text_x, text_y);
      }
    }
  
  }
  
  showRoots(){
    for(let i = 0; i < this.rootsList.length; i++){
      this.rootsList[i].show();
    }
  }
  
  update(){
    let x = mouseX;
    let y = mouseY;
    for(let i = 0; i < this.rootsList.length; i++){
      if(dist(x, y, this.rootsList[i].x,this.rootsList[i].y) < this.radiusCheckRoot){
        console.log(this.rootsList[i].text + " clicked");
        this.rootsList[i].selected();
      }
    }
    
    for(let i = 0; i < this.intervalsSet.length; i++){
      if(dist(x, y, this.intervalsSet[i][2],this.intervalsSet[i][3]) < this.radiusCheckIntervals){
        console.log(this.intervalsSet[i][0] + " clicked");
        this.intervalsSet[i][1] = !this.intervalsSet[i][1];
      }
    }
    
    if(dist(x, y, this.x_all_intervals, this.y_all_intervals) < this.radiusCheckRoot){  
      console.log("all_intervals clicked");

      this.all_intervals = !this.all_intervals;
      for(let i = 0; i < this.intervalsSet.length; i++){
        this.intervalsSet[i][1] = this.all_intervals;
      }
    }
    
    if(dist(x, y, this.x_all_roots, this.y_all_roots) < this.radiusCheckRoot){ 
      console.log("all_roots clicked");
 
      this.all_roots = !this.all_roots;
      for(let i = 0; i < this.rootsList.length; i++){
        this.rootsList[i].checked = this.all_roots;
      }
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
    this.rootsList = [];
    for(let i = 0; i < this.roots.length; i++){
      let x = map(i, 0, this.roots.length, 0 , windowWidth - windowWidth * 0.2) ;
      let r = new Root(this.roots[i], x + windowWidth * 0.15, windowHeight * 0.66 + (i % 2) * this.offset);
      r.checked = this.all_roots;
      this.rootsList.push(r);

    }

  }
  
}
