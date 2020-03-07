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
let radius = 150;
//Interval selector object
let is;
//Intervals to be shown
let intervalsToShow = ['M3', 'm3', 'm6', 'M6', 'P4', 'P5', 'm7', 'P8','Unison', 'M7'];


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
  //Prog bar
  var barPos = createVector(windowWidth/2, windowHeight * 0.15);
  progBar = new Bar(2000, barPos);

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
  let index = int((random(intervalsToShow.length) * 50) % intervalsToShow.length);
  is.selectInterval(index);

  textFont(fontFakeHope);
  textSize(fontsize);
  textAlign(CENTER, CENTER);
}

function draw(){
  background(colJet);
  progBar.run();
  checkBox.show();

  if(progBar.isOver()){
    var barPos = createVector(windowWidth/2, windowHeight * 0.15);
    progBar = new Bar(2000, barPos);
    checkBox.newAnswer(int(random(1,2.99999)));  
    let index = int((random(intervalsToShow.length) * 50) % intervalsToShow.length);
    is.selectInterval(index);
  }

  is.render();

}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
