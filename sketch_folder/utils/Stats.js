// Dependency: ClickableText.js

class Stats{
  constructor(total){
    // Takes no arguments if the mode doesn't have a finite amount of answers to give
    // otherwise it takes the predefined number of answers
    this.correct = 0;
    this.total = 0;
    this.limited = false;
    if(arguments.length > 0){
      this.total = total;
      this.limited = true;
    }
    this.statsString = 'Correct / Total answers: ' + this.correct + ' / ' + this.total;
    this.statsText = new ClickableText(this.statsString, 0.85, 0.1, 24);
  }

  render(){
    this.statsText.show();
  }

  update(answer){ // Updates the string and the text shown,
    // must be called with the outcome of the answer (correct/wrong)
    if(answer == 1 && this.correct < this.total && this.limited){
      this.correct++;
    }else if(answer == 1 && !this.limited){ 
      this.correct++;
    }
    if(!this.limited){ // Updates total only in case of limited number of questions per drill
        this.total++;
    }
    this.statsString = 'Correct / Total answers: ' + this.correct + ' / ' + this.total;
    this.statsText.update(this.statsString);
  }

  retrieve(){ // Allows retrieval of stats from caller
    var statsVector = [this.correct, this.total];
    return statsVector;
  }
}
