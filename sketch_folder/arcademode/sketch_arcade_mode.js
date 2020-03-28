// Progress bar declare
let timeBar;

// Color declare
let colJet, colCedarChest, colDarkVanilla, colGainsboro, colAmazon;
let colorVector;
let fontFakeHope, fontGameTime, fontsize = 45;


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
let wave, env;
let playing = false;

// Lives hearts
let answer, answered;
let livesVector;
let livesNumber, livesLeft;
let fullHeart, emptyHeart;

// Stats
let stats;
let home;
let backHomeButton;
let restartButton;
let gameOver;

//microphone and button to answer
let mic;
let answerButton;
let voiceFreqGraph;
let correctnessText;
let countdown;

// Popups for answer button and intervals
let answerPopUp;
let infoPopUp;

function preload() {
  // Ensure the .ttf or .otf font stored in the assets directory
  // is loaded before setup() and draw() are called
  fontFakeHope = loadFont('../assets/FakeHope.ttf');

  fontGameTime = loadFont("../assets/game_time.ttf");
  // Loading images
  fullHeart = loadImage('../assets/full_heart.png');
  emptyHeart = loadImage('../assets/empty_heart.png');
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
  timeBar = new Bar(10, barPos); // Changed its name to avoid confusion with the ProgressBar class

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

// First root setup
  var selectedNote = rootNotesVector[int(random(rootNotesVector.length))];
  currentRoot  = teoria.note(selectedNote + "3");
  rootText = new ClickableText(flatify(currentRoot.toString(true).toUpperCase()), 0.85, 0.5, 50);
  rootText.show();

// Font setup
  textFont('Noto Sans JP');
  textSize(fontsize);
  textAlign(CENTER, CENTER);

  // Lives setup
  answered = false;
  livesVector = [];
  livesNumber = 4;
  createLivesVector();
  livesLeft = livesVector.length - 1;
  fullHeart.resize(60, 0);
  emptyHeart.resize(60, 0);

  // Stats setup
  stats = new Stats();
  home = new ClickableText("Catch the pitch", 0.5, 0.1, 55, undefined, true, fontFakeHope);
  gameOver = false;
  backHomeButton = undefined;
  restartButton = undefined;
  answerButton = new ClickableText("Tap to answer", 0.5, 0.9, fontsize, undefined, false, fontGameTime);
  countdown = new Countdown(5, 0.5, 0.5, 80);
  countdown.start();

  // PopUp setup
  answerPopUp = new PopUp("Start singing, tap and stop when the answer appears");
  infoPopUp = new PopUp('info');
}


function draw(){
  background(colJet);
  if(!gameOver){
    if(timeBar.isOver() && timeBar.started){
      answered = false;
    }
    generalRender(); // Renders everything, po esse na cazzata
  }else{
    backHomeButton.show();
    restartButton.show();
    let statsVec = stats.retrieve();
    let dataStat = new ClickableText("Your score is " + statsVec[2] + "\n" +
                                     "You answered correctly to " + statsVec[0] + " question\n" +
                                     "on a total of " + statsVec[1], 0.5, 0.3, fontsize, undefined, false, fontGameTime);
    dataStat.show();
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  is.updateDispVariables();
}

function mouseClicked(){
  if(countdown == undefined){
    if(rootText != undefined && rootText.isOver()){
      wave.play(currentRoot.toString(true));
    }else if(backHomeButton != undefined && backHomeButton.isOver() || home.isOver()){
      location.href='../index.html';
    }else if(restartButton != undefined && restartButton.isOver()){
      restart();
      rootText = new ClickableText(currentRoot.toString(true).toUpperCase(), 0.9, 0.5, 50, flatify(currentRoot.toString(true).toUpperCase()));
      backHomeButton = undefined;
      restartButton = undefined;
    }else if(answerButton != undefined && answerButton.isOver()){ // if the answer button is clicked, start the acquisition of sound
      mic.record();
      voiceFreqGraph = new VoiceGraph();
    }
  }

  return false;
}

function newQuestion(answer, answerNote, precision){
  stats.update(answer, timeBar.timeLeft, precision);
  var barPos = createVector(windowWidth/2, windowHeight * 0.15);
  timeBar = new Bar(10, barPos);
  answered = true;
  if(answer == 2){
    removeLife();
  }

  checkBox.newAnswer(answer, answerNote.note, is.intervals[is.lastSelected].text);
  var selectedNote = rootNotesVector[int(random(rootNotesVector.length))]
  currentRoot = teoria.note(selectedNote + "3");
  let index = int((random(intervalsVector.length) * 50) % intervalsVector.length);
  is.selectInterval(index);
  rootText = new ClickableText(currentRoot.toString(true).toUpperCase(), 0.85, 0.5, 50, flatify(currentRoot.toString(true).toUpperCase()));

  answered = false;
  if(!gameOver){
    wave.play(currentRoot.toString(true));
    setTimeout(function() {startBar();}, wave.t2 * 1000);
  }
}

function createLivesVector(){
  for(var i = 0; i < livesNumber; i++){
    livesVector.push(true);
  }
}
function lives(){
  var hX = width * 0.8;
  var hY = height * 0.875;
  for(var i = 0; i < livesVector.length; i++){
    hX = width * 0.75 + fullHeart.width * (i + 1);
    if(livesVector[i]){
      image(fullHeart, hX, hY);
    } else {
      image(emptyHeart, hX, hY);
    }
  }
}

function removeLife(){
      livesVector[livesLeft] = false;
      livesLeft--;
      if(livesLeft == -1){
        lives();
        gameOver = true;
        backHomeButton = new ClickableText("Back to home", 0.65, 0.5, fontsize, undefined, false, fontGameTime);
        restartButton = new ClickableText("Restart", 0.35, 0.5, fontsize, undefined, false, fontGameTime);
        rootText = undefined;
        answerButton = undefined;
        correctnessText = undefined;
        voiceFreqGraph = undefined;
      }
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
    correctnessText.opac = constrain(correctnessText.opac - 1.5, 0, 255);
  }else{
    correctnessText = undefined;
  }

  home.show();
  stats.updateScore(); // Shows current score
  lives(); // Shows live counter
  timeBar.run(); // Makes time go tik tok
  checkBox.show(); // Shows answers on the left
  is.render(); // Shows interval selector
  rootText.show();

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
    let precision = 0.00;
    if(answer == 1){
      precision = map(abs(fundNote.cents), 0, 50, 100, 0);
      textToShow = "Correct! Precision is " + precision.toFixed(2) + "%";
      if(precision < 85){
        textToShow = textToShow + "\n(" + fundNote.cents.toFixed(2) + " cents)";
      }
    }else if(answer == 2){
      textToShow = "Wrong! \nYou just sang a " + flatify(fundNote.note.toString(true).toUpperCase()) + "\n(" +fundFreq.toFixed(2) + " Hz)";
    }
    correctnessText = new ClickableText(textToShow, 0.1, 0.9, fontsize*0.5);
    //update the current question and create a new one
    newQuestion(answer, fundNote, precision);
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
    is.newInterval();
    wave.play(currentRoot.toString(true));
    setTimeout(function() {startBar();}, wave.t2 * 1000);
  }

  // Showing Popups
  if(answerButton != undefined && answerButton.isOver() && countdown == undefined){
    var x = answerButton.a * windowWidth;
    var y = answerButton.b * windowHeight;
    var w = textWidth(answerButton.text);
    answerPopUp.show(x, y, w + 5);
  }

  if(rootText.isOver()  && countdown == undefined){
    var x = windowWidth * rootText.a;
    var y = windowHeight * rootText.b;
    var w = windowWidth * 0.1;
    // infoPopUp = new PopUp();
    infoPopUp = new PopUp('Current base note, click to play it again');
    infoPopUp.show(x, y, w, 30);
  }
  for (var i = 0; i < is.intervals.length  && countdown == undefined; i++) {
    var x = windowWidth * rootText.a;
    var y = windowHeight * rootText.b;
    var w = windowWidth * 0.1;
    if (is.intervals[i].isOver(is.dist)){
      infoPopUp = new PopUp(intervalExpander(is.intervals[i].text));
      infoPopUp.show(x, y, w, 50);
    }
  }

}

function restart(){
  mic.resetBuffer();

  radius = windowHeight * 0.15;
  //Prog bar
  var barPos = createVector(windowWidth/2, windowHeight * 0.15);
  timeBar = new Bar(10, barPos); // Changed its name to avoid confusion with the ProgressBar class
  checkBox = new ProgressBar(steps);

   // Intervals setup
  is = new IntervalSelector(intervalsVector);

// First root setup
  var selectedNote = rootNotesVector[int(random(rootNotesVector.length))];
  currentRoot  = teoria.note(selectedNote + "3");
  rootText = new ClickableText(currentRoot.toString(true).toUpperCase(), 0.9, 0.5, 50, flatify(currentRoot.toString(true).toUpperCase()));
  rootText.show();

// Font setup
  textFont('Noto Sans JP');
  textSize(fontsize);
  textAlign(CENTER, CENTER);

  // Lives setup
  answered = false;
  livesVector = [];
  livesNumber = 4;
  createLivesVector();
  livesLeft = livesVector.length - 1;
  fullHeart.resize(60, 0);
  emptyHeart.resize(60, 0);

  // Stats setup
  stats = new Stats();
  home = new ClickableText("Catch the pitch", 0.5, 0.1, 55, undefined, true, fontFakeHope);
  gameOver = false;
  backHomeButton = undefined;
  restartButton = undefined;
  answerButton = new ClickableText("Tap to answer", 0.5, 0.9, fontsize, undefined, false, fontGameTime);
  countdown = new Countdown(5, 0.5, 0.5, 80);
  countdown.start();
}

function intervalExpander(interval){
  var expanded = '';
  if(interval.charAt(0) == 'P'){
    expanded += 'Perfect';
  } else if (interval.charAt(0) == 'm') {
    expanded += 'Minor';
  } else if (interval.charAt(0) == 'M') {
    expanded += 'Major';
  }

  expanded += ' ';

  if(interval.charAt(1) == '1'){
    expanded += 'Unison';
  } else if(interval.charAt(1) == '2'){
    expanded += '2nd';
  } else if(interval.charAt(1) == '3'){
    expanded += '3rd';
  } else {
    expanded += interval.charAt(1) + 'th';
  }

  return expanded;
}
