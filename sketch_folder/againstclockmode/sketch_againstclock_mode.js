// Progress bar declare
let timeBar;

// Color declare
let colJet, colCedarChest, colDarkVanilla, colGainsboro, colAmazon;
let colorVector;
let fontFakeHope, fontsize = 45;
let fontGameTime;


//Number of answer shown
let steps;
let checkBox;

//Radius of circle of intervals
let radius;
//Interval selector object
let is;
//Intervals to be shown
let intervalsVector = ['M3', 'm3', 'm6', 'M6', 'P4', 'P5', 'm7', 'P8','P1', 'M7'];
let rootNotesVector = ['C', 'D', 'E', 'F', 'G',
  'A', 'B', 'Db', 'bb', 'Gb', 'Ab', 'Bb'];
let currentRoot, rootText, currentInterval;
let wave;
let playing = false;

// Stats
let stats;

let dead;

let backHomeButton;
let restartButton;

//microphone and button to answer
let mic;
let answerButton;
let voiceFreqGraph;
let correctnessText;

let home;

let countdown;

function preload() {
  // Ensure the .ttf or .otf font stored in the assets directory
  // is loaded before setup() and draw() are called
  fontFakeHope = loadFont("../assets/FakeHope.ttf");
  fontGameTime = loadFont("../assets/game_time.ttf");
}

function centerCanvas() {
  var x = (windowWidth - width) / 2;
  var y = (windowHeight - height) / 2;
  cnv.position(x, y);
}

function setup(){
  cnv = createCanvas(windowWidth, windowHeight);
  centerCanvas();
  radius = windowHeight * 0.15;
  mic = new Microphone();
  
  //Prog bar
  var barPos = createVector(windowWidth/2, windowHeight * 0.15);
  timeBar = new Bar(120, barPos); // Changed its name to avoid confusion with the ProgressBar class

  // Color setup
  //Alt color
  colJet = color(50, 41, 47); // Dark Brown
  colCedarChest = color(192, 87, 70); // Dark Red/Orange
  colDarkVanilla = color(220, 204, 163); // Nice Yellow
  colGainsboro = color(220, 225, 233); // Panna
  colAmazon = color(65, 123, 90); // Green
  colorVector = [colJet, colCedarChest, colDarkVanilla, colGainsboro, colAmazon];

  steps = 15;
  checkBox = new ProgressBar(steps);

  // Sound
  wave = new Tone();

  // Intervals setup
  is = new IntervalSelector(intervalsVector);
  is.newInterval();

  // First root setup
  var selectedNote = rootNotesVector[int(random(rootNotesVector.length))];
  currentRoot  = teoria.note(selectedNote + "3");
  rootText = new ClickableText(currentRoot.toString(true).toUpperCase(), 0.9, 0.5, 50, flatify(currentRoot.toString(true).toUpperCase()));
  rootText.show();

  // Font setup
  textFont('Noto Sans JP');
  textSize(fontsize);
  textAlign(CENTER, CENTER);

  // Stats setup
  stats = new Stats();

  //death trigger
  dead = false;

  answerButton = new ClickableText("Tap to answer", 0.5, 0.9, fontsize, undefined, false, fontGameTime);
  home = new ClickableText("Catch the pitch", 0.5, 0.1, 55, undefined, true);
  countdown = new Countdown(5, 0.5, 0.5, 80);
  countdown.start();

}


function draw(){
  background(colJet);
  if(!dead){
    if(timeBar.isOver() && timeBar.started){
      death();
    }else{
      generalRender(); // Renders everything, po esse na cazzata
    }
  }else{
    let res = stats.retrieve();
    let dataStats = new ClickableText("You answered " + res[0] + " times correctly\n" + 
                                      "on a total of " + res[1] + " questions", 0.5, 0.3, fontsize, undefined,false, fontGameTime);
    dataStats.show();
    backHomeButton.show();
    restartButton.show();
  }
}

function mouseClicked(){
  if(countdown == undefined){

    if((backHomeButton != undefined && backHomeButton.isOver()) || home.isOver()){
      location.href='../index.html';
    }else if(restartButton != undefined && restartButton.isOver()){
      restart();
    }else if(answerButton != undefined && answerButton.isOver()){ // if the answer button is clicked, start the acquisition of sound
      mic.record();
      voiceFreqGraph = new VoiceGraph();
    }else if(rootText.isOver()){
      wave.play(currentRoot.toString(true));
    }  
  }
  return false;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  is.updateDispVariables();
}

function newQuestion(answer, answerNote){
  //update the stats with the answer
  stats.update(answer);
  answered = true;

  //update the progress bar
  checkBox.newAnswer(answer, answerNote.note, is.intervals[is.lastSelected].text);
  //create a new root
  var selectedNote = rootNotesVector[int(random(rootNotesVector.length))]
  currentRoot = teoria.note(selectedNote + "3");
  //create new interval
  let index = int((random(intervalsVector.length) * 50) % intervalsVector.length);
  is.selectInterval(index);
  rootText.update(flatify(currentRoot.toString(true).toUpperCase()));

  //play the new root note and after the play reset the microphone's state
  wave.play(currentRoot.toString(true));

}

function flatify(s){ //Changes every b in flat, needs impprovement
   if ((s[1] == 'b' || s[1] == 'B') && s.length > 1) {
     var newS = s[0] + '♭';
     return newS;
   }
   return s;
 }

 function startBar(){
   timeBar.start();
 }

function generalRender(){ // Non so se è una buona idea
  if(voiceFreqGraph != undefined){
    voiceFreqGraph.setData(mic.corrBuff);
    voiceFreqGraph.show();
    answerButton.show(map(voiceFreqGraph.opac, 0, 255, 255, 0));  
  }else{
    answerButton.show(255);
  }
  if(correctnessText != undefined && correctnessText.opac > 0){
    correctnessText.show();
    correctnessText.opac = constrain(correctnessText.opac - 0.5, 0, 255);
  }else{
    correctnessText = undefined;
  }
  stats.render(); // Shows stats text (top right)
  timeBar.run(); // Makes time go tik tok
  checkBox.show(); // Shows answers on the left
  is.render(); // Shows interval selector
  rootText.show();
  home.show();
  //require data from microphone
  let fundFreq = mic.getAnswerFreq();
  if(fundFreq > 0){//if the fundamental frequency is available
    voiceFreqGraph = undefined;
    let textToShow = "";
    let fundNote = teoria.note.fromFrequency(fundFreq);
    //get the interval requested
    let correctInterval = teoria.interval(is.intervals[is.lastSelected].text);
    //calculate the interval from the answer respect the root note
    let answeredInterval = currentRoot.interval(fundNote.note);
    console.log(fundNote.cents, fundNote.note.toString(true).toUpperCase());
    //compare the semitones of both intervals to decide the answer
    let answer = correctInterval.semitones() === answeredInterval.semitones() ? 1 : 2;
    if(answer == 1){
      let precision = map(abs(fundNote.cents), 0, 50, 100, 0);
      textToShow = "Correct! Precision is " + precision.toFixed(2) + "%";
      if(precision < 85){
        textToShow = textToShow + "\n(" + fundNote.cents.toFixed(2) + " cents)";      
      }
    }else if(answer == 2){
      textToShow = "Wrong! \nYou just sang a " + flatify(fundNote.note.toString(true).toUpperCase()) + "\n(" +fundFreq.toFixed(2) + " Hz)"; 
    }
    correctnessText = new ClickableText(textToShow, 0.1, 0.9, fontsize*0.5);
    //update the current question and create a new one
    newQuestion(answer, fundNote);
    mic.resetBuffer();
  }

  if(countdown != undefined && !countdown.isOver()){
    push();
    fill(red(colJet), green(colJet), blue(colJet), 220);
    rect(0,0, windowWidth, windowHeight);
    pop();
    countdown.render();
  }else if(countdown != undefined){
    countdown = undefined;
    wave.play(currentRoot.toString(true));
    setTimeout(function() {startBar();}, wave.t2 * 1000);
  }

}

function death(){ // Triggers death event
  dead = true;
  backHomeButton = new ClickableText("Back to home", 0.65, 0.5, fontsize, undefined, false, fontGameTime);
  restartButton = new ClickableText("Restart", 0.35, 0.5, fontsize, undefined, false, fontGameTime);
}

function restart(){
  //reset the mic
  mic.resetBuffer();
  //Prog bar
  var barPos = createVector(windowWidth/2, windowHeight * 0.15);
  timeBar = new Bar(120, barPos); // Changed its name to avoid confusion with the ProgressBar class

  // Color setup
  //Alt color
  colJet = color(50, 41, 47); // Dark Brown
  colCedarChest = color(192, 87, 70); // Dark Red/Orange
  colDarkVanilla = color(220, 204, 163); // Nice Yellow
  colGainsboro = color(220, 225, 233); // Panna
  colAmazon = color(65, 123, 90); // Green
  colorVector = [colJet, colCedarChest, colDarkVanilla, colGainsboro, colAmazon];

  steps = 15;
  checkBox = new ProgressBar(steps);

   // Intervals setup
  is = new IntervalSelector(intervalsVector);
  is.newInterval();

// First root setup
  var selectedNote = rootNotesVector[int(random(rootNotesVector.length))];
  currentRoot  = teoria.note(selectedNote + "3");
  rootText = new ClickableText(currentRoot.toString(true).toUpperCase(), 0.9, 0.5, 50, flatify(currentRoot.toString(true).toUpperCase()));
  rootText.show();

// Font setup
  textFont('Noto Sans JP');
  textSize(fontsize);
  textAlign(CENTER, CENTER);

  // Stats setup
  stats = new Stats();

  dead = false;
  backHomeButton = undefined;
  restartButton = undefined;
  countdown = new Countdown(5, 0.5, 0.5, 80);
  countdown.start();
}
