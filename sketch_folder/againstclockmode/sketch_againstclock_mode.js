// Progress bar declare
let timeBar;

// Color declare
let colJet, colCedarChest, colDarkVanilla, colGainsboro, colAmazon;
let colorVector;
let fontFakeHope, fontsize = 45;


//Number of answer shown
let steps;
let checkBox;

//Radius of circle of intervals
let radius;
//Interval selector object
let is;
//Intervals to be shown
let intervalsVector = ['M3', 'm3', 'm6', 'M6', 'P4', 'P5', 'm7', 'P8','PU', 'M7'];
let rootNotesVector = ['C4', 'D4', 'E4', 'F4', 'G4',
  'A4', 'B4', 'Db4', 'bb4', 'Gb4', 'Ab4', 'Bb4'];
let currentRoot, rootText, currentInterval;
let wave;
let playing = false;

// Stats
let stats;

let dead;

let backHomeButton;
let restartButton;

function preload() {
  // Ensure the .ttf or .otf font stored in the assets directory
  // is loaded before setup() and draw() are called
  fontFakeHope = loadFont('../assets/game_time.ttf');
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

  //Prog bar
  var barPos = createVector(windowWidth/2, windowHeight * 0.15);
  timeBar = new Bar(12, barPos); // Changed its name to avoid confusion with the ProgressBar class

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
  currentRoot  = teoria.note(selectedNote);
  rootText = new ClickableText(flatify(currentRoot.toString(true).toUpperCase()), 0.9, 0.5, 50);
  rootText.show();

  wave.play(currentRoot.toString(true));
  setTimeout(function() {startBar();}, wave.t2 * 1000);
// Font setup
  textFont('Noto Sans JP');
  textSize(fontsize);
  textAlign(CENTER, CENTER);

  // Stats setup
  stats = new Stats();

  //death trigger
  dead = false;
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
    backHomeButton.show();
    restartButton.show();
  }
}

function mouseClicked(){
  if(backHomeButton != undefined && backHomeButton.isOver()){
    location.href='../index.html';
  }else if(restartButton != undefined && restartButton.isOver()){
    restart();
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  is.updateDispVariables();
}

function newQuestion(){
  checkBox.newAnswer(answer, currentRoot, is.intervals[is.lastSelected].text);
  var selectedNote = rootNotesVector[int(random(rootNotesVector.length))]
  currentRoot = teoria.note(selectedNote);
  let index = int((random(intervalsVector.length) * 50) % intervalsVector.length);
  is.selectInterval(index);
  rootText.update(flatify(currentRoot.toString(true).toUpperCase()));

  wave.play(currentRoot.toString(true));
  setTimeout(function() {startBar();}, wave.t2 * 1000);
}


function keyPressed(){
  switch (key) { // Manually answer to questions
    case 'z': // Correct answer
      answered = true;
      answer = 1;
      stats.update(answer);
      newQuestion();
      break;
    case 'x': // Wrong answer
      answer = 2;
      answered = true;
      stats.update(answer);
      newQuestion();
        break;
    default:
      answer = 2;
  }
}

function flatify(s){ //Changes every b in flat, needs impprovement
   if ((s[1] == 'b' || s[1] == 'B') && s.length > 1) {
     var newS = s[0] + '♭' + s.substr(2);
     return newS;
   }
   return s;
 }

 function startBar(){
   timeBar.start();
 }

function generalRender(){ // Non so se è una buona idea
  stats.render(); // Shows stats text (top right)
  timeBar.run(); // Makes time go tik tok
  checkBox.show(); // Shows answers on the left
  is.render(); // Shows interval selector
  rootText.show();
}

function death(){ // Triggers death event
  alert('You\'re dead bitch');
  var statsVec = stats.retrieve();
  alert('Correct: '+statsVec[0]+' Total: '+statsVec[1]);
  dead = true;
  backHomeButton = new ClickableText("Back to home", 0.65, 0.5, fontsize);
  restartButton = new ClickableText("Restart", 0.35, 0.5, fontsize);
}

function restart(){

  //Prog bar
  var barPos = createVector(windowWidth/2, windowHeight * 0.15);
  timeBar = new Bar(12, barPos); // Changed its name to avoid confusion with the ProgressBar class

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
  currentRoot  = teoria.note(selectedNote);
  rootText = new ClickableText(flatify(currentRoot.toString(true).toUpperCase()), 0.9, 0.5, 50);
  rootText.show();

  wave.play(currentRoot.toString(true));
  setTimeout(function() {startBar();}, wave.t2 * 1000);
// Font setup
  textFont('Noto Sans JP');
  textSize(fontsize);
  textAlign(CENTER, CENTER);

  // Stats setup
  stats = new Stats();

  dead = false;
  backHomeButton = undefined;
  restartButton = undefined;
}
