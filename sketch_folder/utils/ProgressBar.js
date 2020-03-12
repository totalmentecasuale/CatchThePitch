class ProgressBar{

  //count is the number of answer - 1 to be shown (1 is always the current question)
  constructor(count){
    this.steps = count;
    //the array of answers
    this.cells = [];
    //the status of the answers
    this.statusCells = [];
    for(let i = 0; i < this.steps; i++){
      //new answer with an offset i, far away from the other answers by windowHeight * 0.7 / this.steps
      this.cells.push(new StepBar(i, windowHeight * 0.7 / this.steps, this.steps));
      //the initial status is 0 (corresponds to question)
      this.statusCells[i] = 0;
    }
    this.cells.reverse();
    //activate the first one
    this.cells[0].active = true;
  }

  show(){
    //show all the answers
   for(let i = 0; i < this.cells.length; i++){
    this.cells[i].show();
   }
  }

  newAnswer(status, root, interval){
    console.log(interval + ' in Answer');
   let answerIdx = 0;
   let answers = [];

   // for all the answers

   for(let i = 0; i < this.cells.length; i++){
     // find the one active and with status 0
     if(this.cells[i].active && this.cells[i].status == 0){
        //save the index
       answerIdx = i;
       //update the status
       this.statusCells[i] = status;
       answers.push(new ClickableText(flatify(root.toString(true).toUpperCase())  + " " + interval, 0.2, this.cells[i].y / windowHeight, 0, 24));
     }else{
      //get the related answer
      answers.push(this.cells[i].answer);
     }

   }


   // if it's full, slice it and add a new answer with initial status
   if(answerIdx == this.cells.length - 1){
    this.statusCells = this.statusCells.slice(1, this.statusCells.length);
    answers = answers.slice(1,answers.length);
    this.statusCells[answerIdx] = 0;
    answers[answerIdx] = undefined;
   }else{
    // activate the next one
    this.cells[answerIdx + 1].active = true;
   }

    //the answers are updated respect to the new statusList
    for(let i = 0; i < this.cells.length; i++){
        let answer = answers[i];
        this.cells[i].changeStatus(this.statusCells[i], answer);
    }

  }


}
