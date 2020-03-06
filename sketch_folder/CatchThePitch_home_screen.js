//check his for buttons:
//  http://www.sojamo.de/libraries/controlP5/examples/controllers/ControlP5button/ControlP5button.pde


let cnv, butt;
//Font variables -------
let fontLCD, fontFakeHope, fontsize = 40, fontSizeTitle = 55;
//----------------------
//Color variables-------
let aquamarine, standardCol, darkPink, pink, lightPink, darkGreen, green, lightGreen, darkBlue;
let colJet, colCedarChest, colDarkVanilla, colGainsboro, colAmazon;
let colorVector;
var t, tGrow;
//Particle system-------
var ps;
let explode;
//----------------------
//Button variables------
var bATC, bArcade, bZen, bAbout;
//----------------------
//bAr
// let progBar;

function preload() {
  // Ensure the .ttf or .otf font stored in the assets directory
  // is loaded before setup() and draw() are called
  fontLCD = loadFont('../assets/lcd.ttf');
  fontFakeHope = loadFont('../assets/FakeHope.ttf');
}
function centerCanvas() {
  var x = (windowWidth - width) / 2;
  var y = (windowHeight - height) / 2;
  cnv.position(x, y);
}

function setup() {
  cnv = createCanvas(windowWidth, windowHeight);
  centerCanvas();
  //Color setup------
  aquamarine = color(97, 176, 179);
  standardCol = color(51, 94, 129);
  darkPink = color(163, 55, 141);
  pink = color(202, 97, 166);
  lightPink = color(216, 153, 196);
  darkGreen = color(5, 100, 138);
  green = color(11, 152, 181);
  lightGreen = color(147, 190, 208);
  darkBlue = color(38, 42, 98);
  t = 0;
  tGrow = true;
  //-----------------
  //Particle system setup
  ps = new ParticleSystem();
  ps.createPS();
  explode = false;
  //-----------------
  //  Font setup
  textFont(fontFakeHope);
  textSize(fontSizeTitle);
  textAlign(CENTER, CENTER);
  //-----------------

  //Initialize buttons
  var bHeight = lerp(height * 0.15, height, 0.2);
  bAtc = new gameButton("Against the Clock", width/2, bHeight, 'bAtc');
  bHeight = lerp(height * 0.15, height, 0.4);
  bArcade = new gameButton("Arcade Mode", width/2, bHeight, 'bArcade');
  bHeight = lerp(height * 0.15, height, 0.6);
  bZen = new gameButton("Zen Mode", width/2, bHeight, 'bZen');
  bHeight = lerp(height * 0.15, height, 0.8);
  bAbout = new gameButton("About", width/2, bHeight, 'bAbout');
  //------------------

  // //Prog bar
  // var barPos = createVector(width/2, height * 0.18);
  // progBar = new Bar(10000, barPos);
}

function draw() {

  var bg_col = color(24);
  background(bg_col);
  //-- AM --------------
  ps.runPS();
  //---------------------------
  //---------------------------
  //Title Text-----------------
  if(t == 255){tGrow = false;}
  if(t <= 150){tGrow = true;}
  if(tGrow){t++;}else{t--;}
  var titleCol = color(t, t - 50, t);
  fill(titleCol);
  text('Catch the Pitch', width/2, height * 0.1);
  //---------------------------
  //Button show----------------
  bAtc.show();
  bArcade.show();
  bZen.show();
  bAbout.show();
  //--------------------------
  // progBar.run();

}

function mouseClicked(){
  if(bAtc.isOver()){
    ps.explodePS();
    return false;
  }

  if(bArcade.isOver()){
    ps.explodePS();
    return false;
  }

  if(bZen.isOver()){
    ps.explodePS();
    return false;
  }

  if(bAbout.isOver()){
    location.href='../index_bar.html';
    ps.explodePS();
    return false;
  }
}
