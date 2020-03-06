let progBar;
function centerCanvas() {
  var x = (windowWidth - width) / 2;
  var y = (windowHeight - height) / 2;
  cnv.position(x, y);
}
function setup(){
  cnv = createCanvas(windowWidth, windowHeight);
  centerCanvas();
  //Prog bar
  var barPos = createVector(width/2, height * 0.18);
  progBar = new Bar(10000, barPos);
}

function draw(){
  progBar.run();
}
