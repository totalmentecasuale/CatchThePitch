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
  fontGameTime = loadFont('../assets/game_time.ttf');
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
  colJet = color(50, 41, 47); // Dark Brown
  colCedarChest = color(192, 87, 70); // Dark Red/Orange
  colDarkVanilla = color(220, 204, 163); // Nice Yellow
  colGainsboro = color(220, 225, 233); // Panna
  colAmazon = color(65, 123, 90); // Green
  colorVector = [colJet, colCedarChest, colDarkVanilla, colGainsboro, colAmazon];
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
  var bSize = 0;
  var buttonNames = ["Against the Clock", "Arcade Mode", "Zen Mode", "About"];
  buttonNames.forEach((item) => {

      if(textWidth(item) > bSize){
        bSize = textWidth(item);

    }
  });

  bAtc = new gameButton(buttonNames[0], bSize, width/2, bHeight, 'bAtc', 1);
  bHeight = lerp(height * 0.15, height, 0.4);
  bArcade = new gameButton(buttonNames[1], bSize, width/2, bHeight, 'bArcade', 2);
  bHeight = lerp(height * 0.15, height, 0.6);
  bZen = new gameButton(buttonNames[2], bSize, width/2, bHeight, 'bZen', 3);
  bHeight = lerp(height * 0.15, height, 0.8);
  bAbout = new gameButton(buttonNames[3], bSize, width/2, bHeight, 'bAbout', 4);
  //------------------

  // //Prog bar
  // var barPos = createVector(width/2, height * 0.18);
  // progBar = new Bar(10000, barPos);
}

function draw() {

  background(colorVector[0]);
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
    setTimeout(function(){location.href='../index_arcade_mode.html';}, 1000);
    return false;
  }

  if(bZen.isOver()){
    ps.explodePS();
    return false;
  }

  if(bAbout.isOver()){
    ps.explodePS();
    setTimeout(function(){location.href='../index_bar.html';}, 1000);
    return false;
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  ps = new ParticleSystem();
  ps.createPS();
}
