// Progress bar declare
let progBar;

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
let intervalsToShow = ['M3', 'm3', 'm6', 'M6', 'P4', 'P5', 'm7', 'P8','Unison', 'M7'];

let wave;
let playing = false;


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
  progBar = new Bar(2, barPos);

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
  checkBox.newAnswer(int(random(1,2.99999)));  


  is = new IntervalSelector(intervalsToShow);
  is.newInterval();

  textFont(fontFakeHope);
  textSize(fontsize);
  textAlign(CENTER, CENTER);
  wave = new p5.Oscillator();
  wave.setType('sine');
  wave.start();
  wave.amp(0.5);
  wave.freq(440);
  playing = true;
  setTimeout(stopRootNotePlay, 1000);
}

function draw(){
  background(colJet);

  if(progBar.isOver() && progBar.started && !playing){
    wave.start();
    wave.amp(0.5);
    wave.freq(440);
    playing = true;
    setTimeout(stopRootNotePlay, 1000);
  }else if(!playing){
    progBar.start();
  }

  progBar.run();
  checkBox.show();

  is.render();

}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  is.updateDispVariables();
}

function stopRootNotePlay(){
  wave.stop();
  playing = false;
  newQuestion();
}

function newQuestion(){
  var barPos = createVector(windowWidth/2, windowHeight * 0.15);
  progBar = new Bar(2, barPos);
  checkBox.newAnswer(int(random(1,2.99999)), "da fare",is.intervals[is.lastSelected].text,0,24);  
  let index = int((random(intervalsToShow.length) * 50) % intervalsToShow.length);
  is.selectInterval(index);
}
