class StepBar{
   
  
  constructor(offset, step, total,header=windowHeight * 0.3){
   this.x = windowWidth*0.05;
   this.y = header + step / 2 + step*offset;
   this.total = total;
   this.idx = offset;
   this.radius = windowHeight * 0.02;
   this.status = 0;
   this.active = false;
   this.col = colJet;
   this.answer;
  }
  
  show(){ 
    this.updateDispVariables();
    
    if(this.active){ // if showing

      push();
      translate(this.x, this.y);

      // start Change color process
      let r = red(this.col);
      let g = green(this.col);
      let b = blue(this.col);
      let alpha = 255;
      
      noStroke();
      let r1,g1,b1;
      let ratioChangeColor = 8;
      let statusColor = color(215);
      if(this.status == 1){
        statusColor = color(97,201,52,255);
      }else if(this.status == 2){
        statusColor = color(240,72,72,255);
      }

      r1 = red(statusColor);
      g1 = green(statusColor);
      b1 = blue(statusColor);

      if(abs(r1-r) > 0){
        if(abs(r1 - r) < 2){
          r+=(r1-r)/ abs(r1-r);
        }else{
          r+= (r1-r) / ratioChangeColor;
        }
      }

      if(abs(g1-g) > 0){
        if(abs(g1 - g) < 2){
          g+=(g1-g)/ abs(g1-g);
        }else{
          g+= (g1-g) / ratioChangeColor;
        }
      }

      if(abs(b1-b) > 0){
        if(abs(b1 - b) < 2){
          b+=(b1-b)/ abs(b1-b);
        }else{
          b+= (b1-b) / ratioChangeColor;
        }
      }

      //end Change color process

      this.col = color(r,g,b,alpha);
      fill(this.col);
      circle(0,0,this.radius);

      pop();

      if(this.answer != undefined){ // if the answer related to this stepBar is available, show it
        
        this.answer.show(); 
      }
    } 

  }
  
  changeStatus(newStatus, answer){
    this.status = newStatus; 
    if(answer != undefined){
      answer.a = this.x/windowWidth * 3;
      answer.b = this.y/windowHeight;
    }
    this.answer = answer;
  }

  updateDispVariables(){
    let step = (windowHeight * 0.7 / this.total);
    this.x = windowWidth*0.05;
    this.y = windowHeight * 0.3 / 2 + step / 2 + step*this.idx;
    this.radius = windowHeight * 0.02;
  }
}
