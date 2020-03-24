class ProgressBar{

  //count is the number of answer - 1 to be shown (1 is always the current question)
  constructor(count, additive = true){
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
    this.additive = additive;
    if(!this.additive){
      for(let i = 0; i < this.cells.length; i++){
        this.cells[i].active = true;
      }
    }
  }

  show(){
    //show all the answers
   for(let i = 0; i < this.cells.length; i++){
    this.cells[i].show();
   }
  }

  newAnswer(status, answerFundNote, interval, chordType = undefined, currentChord = undefined){
    console.log(interval + ' in Answer');
    let answerIdx = 0;
    let answers = [];

    // for all the answers
    let found = false;
    let actualCorrectAnswer = currentChord != undefined ? teoria.note(currentChord.text + "3") : currentRoot;
    for(let i = 0; i < this.cells.length; i++){
      // find the one active and with status 0
      if(this.cells[i].active && this.cells[i].status == 0 && !found){
        //save the index
        answerIdx = i;
        //update the status
        this.statusCells[i] = status;
        if(this.additive){
          actualCorrectAnswer = actualCorrectAnswer.interval(interval);
          answers.push(new ClickableText(flatify(answerFundNote.toString(true).toUpperCase()) + 
                                         " (" + flatify(actualCorrectAnswer.toString(true).toUpperCase()) + 
                                         " [" + interval + "-" + 
                                         flatify(currentRoot.toString(true).toUpperCase()) + "])", 0.2, this.cells[i].y / windowHeight, 24));
        }else{
          let offset = 0;
          if(currentChord != undefined){
            if(currentChord.status == MINOR){
              offset = 1;
            }else if(currentChord.status == DIM){
              offset = 2;
            }
          }
          actualCorrectAnswer = actualCorrectAnswer.interval(chordType[i][offset]);
          answers.push(new ClickableText(flatify(answerFundNote.toString(true).toUpperCase()) + 
                                         " (" + flatify(actualCorrectAnswer.toString(true).toUpperCase()) + 
                                         " [" + chordType[i][offset] + "-" + 
                                         flatify(currentRoot.toString(true).toUpperCase()) + "])", 
                                              0.2, this.cells[i].y / windowHeight, 24));
        }
        found = true;
      }else{
        //get the related answer
        answers.push(this.cells[i].answer);
        if(!this.additive){
          let offset = 0;
          if(currentChord != undefined){
            if(currentChord.status == MINOR){
              offset = 1;
            }else if(currentChord.status == DIM){
              offset = 2;
            }
          }
        actualCorrectAnswer = actualCorrectAnswer.interval(chordType[i][offset]);
        }
      }

   }

   let resetNextRound = false;
   // if it's full, slice it and add a new answer with initial status
   if(answerIdx == this.cells.length - 1 && this.additive && found){
    this.statusCells = this.statusCells.slice(1, this.statusCells.length);
    answers = answers.slice(1,answers.length);
    this.statusCells[answerIdx] = 0;
    answers[answerIdx] = undefined;
   }else if(!this.additive && !found){

    for(let i = 0; i < this.statusCells.length; i++){
      this.statusCells[i] = 0;
    }

    for(let i = 0; i < answers.length; i++){
      answers[i] = undefined;
    }
   }else if(found && this.additive){
    // activate the next one
    this.cells[answerIdx + 1].active = true;
   }

    //the answers are updated respect to the new statusList
    for(let i = 0; i < this.cells.length; i++){
        let answer = answers[i];
        this.cells[i].changeStatus(this.statusCells[i], answer);
    }


  }

  allAnswersFull(){
    let full = true;

    for(let i = 0; i < this.cells.length; i++){
      full = full & this.cells[i].answer != undefined;
    }

    return full;

  }

  reset(count){
    this.steps = count;
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
    if(!this.additive){
      for(let i = 0; i < this.cells.length; i++){
        this.cells[i].active = true;
      }
    }
  }


}
