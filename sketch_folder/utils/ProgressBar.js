class ProgressBar{
  
  
  constructor(steps){
    this.steps = steps;
    this.cells = [];
    this.statusCells = [];
    for(let i = 0; i < this.steps; i++){
     this.cells[i] = new StepBar(i, windowHeight * 0.7 / this.steps);
     this.statusCells[i] = 0;
    }
    this.cells.reverse();
  }
  
  show(){
   for(let i = 0; i < steps; i++){
    this.cells[i].show();
   }
  }
  
  newAnswer(status){
   let answerIdx = 0; 
   for(let i = 0; i < this.cells.length; i++){
     if(this.cells[i].active && this.cells[i].status == 0){
       answerIdx = i;
       this.statusCells[i] = status;
     }
   }  
   
   //Se progress bar è piena, scorri
   if(answerIdx == this.cells.length - 1){
       this.statusCells = this.statusCells.slice(1, this.statusCells.length);
       this.statusCells[this.cells.length - 1] = 0;
   }else{
       this.cells[answerIdx + 1].active = true;
   }
   
   for(let i = 0; i < this.statusCells.length; i++){
      this.cells[i].status = this.statusCells[i];
   }
   
  }
}
