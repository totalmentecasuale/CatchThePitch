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
    this.statsText = new ClickableText(this.statsString, 0.85, 0.14, 24);
    // Score
    this.score = 0;
    this.scoreString = 'Score: ' + int(this.score);
    this.scoreText = new ClickableText(this.scoreString, 0.85, 0.15, 45, undefined, false, fontFakeHope);
    this.currStreak = 0;
    this.currFibo = 1;
    this.prevFibo = 1;
  }

  render(){
    this.statsText.show();
  }

  updateScore(){
    this.scoreString = 'Score: ' + int(this.score);
    if(this.prevFibo > 1){
      this.scoreString += '\n Mult: ' + this.prevFibo + 'x';
    }
    this.scoreText.update(this.scoreString);
    this.scoreText.show();
  }

  update(answer, timeLeft, precision){ // Updates the string and the text shown,
    // must be called with the outcome of the answer (correct/wrong)
    this.killStreak(answer, timeLeft / 1000, precision);
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

  killStreak(answer, timeLeft, precision){
    if(answer == 2){ // Wrong answer: resets all streak counter and multiplier
      this.currStreak = 0;
      this.currFibo = 1;
      this.prevFibo = 1;

      return false;
    } // This is what happens if the answer is correct
    var error = 100 - precision;
    error = map(error, 0, 100, 0, 30);
    this.currStreak ++;
    var tempScore = 30 - error;
    if(this.currStreak == this.currFibo){
      var temp = this.currFibo;
      this.currFibo += this.prevFibo;
      this.prevFibo = temp;
      this.currStreak = 0;
    }
    tempScore *= this.prevFibo;
    tempScore += timeLeft * 3;
    console.log('score ' + tempScore, 'timebonus ', (timeLeft * 3), 'mult ' + this.prevFibo);
    this.score += tempScore;
  }

  retrieve(){ // Allows retrieval of stats from caller
    var statsVector = [this.correct, this.total, int(this.score)];
    return statsVector;
  }
}
