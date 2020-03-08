let zenIntervalTextTypes = "Choose the intervals for this drill";
let zenIntervalTextRoots = "Choose the root notes";
let font;
let fontsize1 = 50;
let fontsize2 = 30;
let fp;
let colJet;
let cnv;

function preload() {
  // Ensure the .ttf or .otf font stored in the assets directory
  // is loaded before setup() and draw() are called
  font = loadFont('../assets/game_time.ttf');
}

function setup(){
  cnv = createCanvas(windowWidth, windowHeight);
  textFont(font);
  textSize(fontsize1);
  textAlign(CENTER, CENTER);
  colJet = color(50, 41, 47); // Dark Brown
  background(colJet);
  fp = new FilterPage();
}


function draw() {
  fill(colJet);
  rect(0,0,windowWidth, windowHeight);
  fp.render();
}

function mouseClicked(){
   
  fp.update();
  
  return false;
}