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
let wave, env;
let playing = false;

// Lives hearts
let answer, answered;
let livesVector;
let livesNumber, livesLeft;
let fullHeart, emptyHeart;

// Stats
let stats;

function preload() {
  // Ensure the .ttf or .otf font stored in the assets directory
  // is loaded before setup() and draw() are called
  fontFakeHope = loadFont('../assets/game_time.ttf');

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

  //Prog bar
  var barPos = createVector(windowWidth/2, windowHeight * 0.15);
  timeBar = new Bar(2, barPos); // Changed its name to avoid confusion with the ProgressBar class

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
}


function draw(){
  background(colJet);
  if(timeBar.isOver() && timeBar.started){
    answered = false;
  }
  generalRender(); // Renders everything, po esse na cazzata
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  is.updateDispVariables();
}

function newQuestion(){
  var barPos = createVector(windowWidth/2, windowHeight * 0.15);
  timeBar = new Bar(1, barPos);

  checkBox.newAnswer(answer, currentRoot, is.intervals[is.lastSelected].text);
  var selectedNote = rootNotesVector[int(random(rootNotesVector.length))]
  currentRoot = teoria.note(selectedNote);
  let index = int((random(intervalsVector.length) * 50) % intervalsVector.length);
  is.selectInterval(index);
  rootText.update(flatify(currentRoot.toString(true).toUpperCase()));
  answered = false;

  wave.play(currentRoot.toString(true));
  setTimeout(function() {startBar();}, wave.t2 * 1000);
}

function createLivesVector(){
  for(var i = 0; i < livesNumber; i++){
    livesVector.push(true);
  }
}
function lives(){
  var hX = width * 0.75;
  var hY = height * 0.04;
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
        death();
      }
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
      removeLife();
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

 function death(){ // Triggers death event
   lives();
   alert('You\'re dead bitch');
   var statsVec = stats.retrieve();
   alert('Correct: '+statsVec[0]+' Total: '+statsVec[1]);
 }

function generalRender(){ // Non so se è una buona idea
  stats.render(); // Shows stats text (top right)
  lives(); // Shows live counter
  timeBar.run(); // Makes time go tik tok
  checkBox.show(); // Shows answers on the left
  is.render(); // Shows interval selector
  rootText.show();
}
