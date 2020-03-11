let zenIntervalTextTypes = "Choose one or more groups of intervals for this drill";
let zenIntervalTextRoots = "Choose one or more root notes";
let fontsize1 = 34;
let fontsize2 = 28;
let fp;
let colJet;
let cnv;
let intervalsSet = [[['P4', 'P5', 'M6', 'm6'], false, 0, 0],
                    [['m7', 'M7', 'P8'], false, 0, 0], [['Unison','m3','M3'], false, 0, 0]];
let rootsList = [];
let phase = 0;

//Radius of circle of intervals
let radius;
//Interval selector object
let is;

//Coords for netx interval
let x_next_currentRoot;
let y_next_currentRoot;
//Cuurent root 
let currentRoot;
// active intervals
let activeIntervals;

//Coords for netx root
let x_next_root;
let y_next_root;
let nextRootText;

//Coords for netx interval
let x_next_interval;
let y_next_interval;
let nextIntervalText;

let home;



//Checl radius for click in clickable texts
let radiusNextButtons;

//Oscillator
let wave;
let playing = false;

//Number of answer shown
let steps;
let checkBox;


function centerCanvas() {
  var x = (windowWidth - width) / 2;
  var y = (windowHeight - height) / 2;
  cnv.position(x, y);
}

function setup(){
  cnv = createCanvas(windowWidth, windowHeight);
  centerCanvas();
  textFont("fontGameTime");
  textSize(fontsize1);
  textAlign(CENTER, CENTER);
  radius = windowHeight * 0.15;
  colJet = color(50, 41, 47); // Dark Brown
  background(colJet);
  fp = new FilterPage();
  radiusNextButtons = 0.06;
  x_next_interval = 0.9;
  y_next_interval = 0.8;
  x_next_root = 0.9;
  y_next_root = 0.6;
  x_next_currentRoot = 0.9;
  y_next_currentRoot = 0.4;
  wave = new Tone();
  steps = 15;
}


function draw() { 
  background(colJet);
  
  if(phase == 1){

    if(is == undefined){
      activeIntervals = [];
      nextRootText = new ClickableText("Change root", x_next_root, y_next_root,radiusNextButtons, fontsize1);
      nextIntervalText = new ClickableText("Change interval", x_next_interval, y_next_interval,radiusNextButtons, fontsize1)
      intervalsSet.forEach(function(element){
        if(element[1]){
          element[0].forEach(interval => activeIntervals.push(interval));
        }     
      });

      let activeRoots = [];

      rootsList.forEach(function(element){
        if(element.checked){
          activeRoots.push(element);
        }     
      });

      rootsList = activeRoots;

      if(activeIntervals.length > 0){
        home = new ClickableText("Catch the pitch", 0.5, 0.1, radiusNextButtons * 3, fontsize1);
        is = new IntervalSelector(activeIntervals);
        is.newInterval();
        newRoot();
        checkBox = new ProgressBar(steps);
      }
    }else{
      is.render();

      nextRootText.show();
      nextIntervalText.show();
      currentRoot.show();
      checkBox.show();
      home.show();
    }
  }else if(!fp.invisible()){
    fp.render();
  }
}

function mouseClicked(){
  if(!fp.invisible()){
    fp.update();
  }

  if(home != undefined && home.isOver()){
      location.href='../index.html';
  }else if(nextRootText != undefined && nextRootText.isOver()){
    newRoot();
    console.log("nextRootText clicked");
  }else if(nextIntervalText != undefined && nextIntervalText.isOver()){
    is.newInterval();
    console.log("nextIntervalText clicked");
  }else if(currentRoot != undefined && currentRoot.isOver()){
    wave.play(currentRoot.text);
  }else if(is != undefined){
    if(!is.checkIntervalsClicked() && checkBox != undefined){
      checkBox.newAnswer(int(random(1,2.99999)), currentRoot.text, is.intervals[is.lastSelected].text);
      is.newInterval();
    }
  }

  return false;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  if(!fp.invisible()){
    fp.updateDispVariables();
  }
  
  if(is != undefined){
    is.updateDispVariables();
  }
}

function newRoot(){
  let curr_index = -1;
  
  if(currentRoot != undefined){
    curr_index = rootsList.indexOf(currentRoot.text);
  }
  
  let newIndex;

  do{
    newIndex = floor(random(1) * rootsList.length);
    currentRoot = new ClickableText(rootsList[newIndex].text, x_next_currentRoot, y_next_currentRoot, radiusNextButtons, fontsize1);
  }while(curr_index >= 0 && newIndex == curr_index);  
  
  wave.play(currentRoot.text);
}