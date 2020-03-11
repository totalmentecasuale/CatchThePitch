class ProgressBar{
  
  
  constructor(steps){
    this.steps = steps;
    this.cells = [];
    this.statusCells = [];
    for(let i = 0; i < this.steps; i++){
     this.cells.push(new StepBar(i, windowHeight * 0.7 / this.steps));
     this.statusCells[i] = 0;
    }
    this.cells.reverse();
    this.cells[0].active = true;
  }
  
  show(){
   for(let i = 0; i < this.cells.length; i++){
    this.cells[i].show();
   }
  }
  
  newAnswer(status, root, interval){
   let answerIdx = 0; 
   let answers = [];
   let fullAnswers = false;
   for(let i = 0; i < this.cells.length; i++){
     if(this.cells[i].active && this.cells[i].status == 0){
       answerIdx = i;
       this.statusCells[i] = status;
       answers.push(new ClickableText(root + " " + interval, 0.2, this.cells[i].y / windowHeight, 0, 24));
     }else{
      answers.push(this.cells[i].answer);
      fullAnswers = fullAnswers && this.cells[i].answer != undefined;
     }

   }  

   let full = false;
   //Se progress bar è piena, scorri
   if(answerIdx == this.cells.length - 1){
      full = true;
      this.statusCells = this.statusCells.slice(1, this.statusCells.length);
      answers = answers.slice(1,answers.length);
      this.statusCells[answerIdx] = 0;
      answers[answerIdx] = undefined;
   }else{
       this.cells[answerIdx + 1].active = true;
   }

  for(let i = 0; i < this.cells.length; i++){
      let answer = answers[i];
      this.cells[i].changeStatus(this.statusCells[i], answer);//this.cells[i].answer);
  }
  if(full){
    this.cells[answerIdx].answer = undefined;
  }
   
  }
}
