//check his for buttons:
//  http://www.sojamo.de/libraries/controlP5/examples/controllers/ControlP5button/ControlP5button.pde


let cnv, butt;
//Font variables -------
let fontLCD, fontFakeHope, fontGameTime;
let fontsize = 40, fontSizeTitle = 55;
//----------------------
//Color variables-------
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


function preload(){
  fontFakeHope = loadFont("../assets/FakeHope.ttf");
  fontGameTime = loadFont("../assets/game_time.ttf");
  fontLCD = loadFont("../assets/lcd.ttf");
}
function centerCanvas() {
  var x = (windowWidth - width) / 2;
  var y = (windowHeight - height) / 2;
  cnv.position(x, y);
}

function setup() {
  cnv = createCanvas(windowWidth, windowHeight);
  centerCanvas();
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
  var buttonDescr = ["Score as many points as you can in two minutes", "You lose a life for every mistake you make, time is not your enemy here",
    "Take as much time as you want practising intervals or chords in this mode",
    "Behind the scenes of the creation of this game"
  ];
  buttonNames.forEach((item) => {
      if(textWidth(item) > bSize){
        bSize = textWidth(item);
      }
  });
  bSize += 20;
  bAtc = new gameButton(buttonNames[0], bSize, width/2, bHeight, 'bAtc', 1, buttonDescr[0]);
  bHeight = lerp(height * 0.15, height, 0.4);
  bArcade = new gameButton(buttonNames[1], bSize, width/2, bHeight, 'bArcade', 2, buttonDescr[1]);
  bHeight = lerp(height * 0.15, height, 0.6);
  bZen = new gameButton(buttonNames[2], bSize, width/2, bHeight, 'bZen', 3, buttonDescr[2]);
  bHeight = lerp(height * 0.15, height, 0.8);
  bAbout = new gameButton(buttonNames[3], bSize, width/2, bHeight, 'bAbout', 4, buttonDescr[3]);
}

function draw() {

  background(colorVector[0]);
  //-- AM --------------
  ps.runPS();
  //---------------------------

  //Title Text-----------------
  if(t >= 255){tGrow = false;}
  if(t <= 150){tGrow = true;}
  if(tGrow){t+=2;}else{t-=2;}
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
    console.log('pressed the', bAtc.bText, 'button');
    setTimeout(function(){location.href='../index_againstclock_mode.html';}, 1000);
    ps.explodePS();
  }

  if(bArcade.isOver()){
    console.log('pressed the', bArcade.bText, 'button');
    ps.explodePS();
    setTimeout(function(){location.href='../index_arcade_mode.html';}, 1000);
  }

  if(bZen.isOver()){
    console.log('pressed the', bZen.bText, 'button');
    ps.explodePS();
    setTimeout(function(){location.href='../index_zen_mode.html';}, 1000);
  }

  if(bAbout.isOver()){
    console.log('pressed the', bAbout.bText, 'button');
    ps.explodePS();
    setTimeout(function(){location.href='https://github.com/totalmentecasuale/CatchThePitch/blob/master/README.md';}, 1000);
  }

  return false;

}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  ps = new ParticleSystem();
  ps.createPS();
}
