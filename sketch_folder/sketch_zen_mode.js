let zenIntervalTextTypes = "Choose one or more groups of intervals for this drill";
let zenIntervalTextRoots = "Choose one or more root notes";
let font;
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

let currentRoot;
let rootText;
let activeIntervals;

let x_next_root;
let y_next_root;
let nextRootText;

let x_next_interval;
let y_next_interval;
let nextIntervalText;

let radiusNextButtons;



function preload() {
  // Ensure the .ttf or .otf font stored in the assets directory
  // is loaded before setup() and draw() are called
  font = loadFont('../assets/game_time.ttf');
}

function centerCanvas() {
  var x = (windowWidth - width) / 2;
  var y = (windowHeight - height) / 2;
  cnv.position(x, y);
}

function setup(){
  cnv = createCanvas(windowWidth, windowHeight);
  centerCanvas();
  textFont(font);
  textSize(fontsize1);
  textAlign(CENTER, CENTER);
  radius = windowHeight * 0.15;
  colJet = color(50, 41, 47); // Dark Brown
  background(colJet);
  fp = new FilterPage();
  radiusNextButtons = 0.06;
  x_next_interval = 0.35;
  y_next_interval = 0.4;
  x_next_root = 0.35;
  y_next_root = 0.2;
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
        is = new IntervalSelector(activeIntervals);
        newRoot();
      }
    }else{
      is.render();

      nextRootText.show();
      nextIntervalText.show();


      fill(255);
      textSize(fontsize1);
      text(currentRoot.text, windowWidth/2 * 0.7, -windowHeight*0.15);




    }
  }else if(!fp.invisible()){
    fp.render();
  }

}

function mouseClicked(){
  if(!fp.invisible()){
    fp.update();
  }

  if(nextRootText != undefined && nextRootText.isOver()){
    newRoot();
    console.log("nextRootText clicked");

  }else if(nextIntervalText != undefined && nextIntervalText.isOver()){
    is.newInterval();
    console.log("nextIntervalText clicked");
  }else if(is != undefined){
    is.checkIntervalsClicked();
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
    curr_index = rootsList.indexOf(currentRoot);
  }
  let newIndex;
  do{
    newIndex = floor(random(1) * rootsList.length);
    currentRoot = rootsList[newIndex];
  }while(curr_index >= 0 && newIndex == curr_index);
}
