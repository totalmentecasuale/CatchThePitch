
//Descriptions of the filters
let zenIntervalTextTypes = "Choose one or more groups of intervals for this drill";
let zenIntervalTextRoots = "Choose one or more root notes";
let zenChordTextTypes = "Choose one or more groups of type of chords for this drill";
let zenChordTextModes = "Choose one or more modes";

//Font sizes
let fontsize1 = 34;
let fontsize2 = 28;

//Filter page
let fp;
//Background color
let colJet;

let cnv;

//Filters : a single filter must include at least two arguments [text, active (true/false)]
//A greater number of arguments is useful to secondary information and it will be place in the
//field "filler" of a clickable text

//The set of intervals available
let intervalsSet = [[['P4', 'P5', 'M6', 'm6'], false, 0, 0],
                    [['m7', 'M7', 'P8'], false, 0, 0], [['PU','m3','M3'], false, 0, 0]];

//The set of root notes (Do not change the order)
let rootsList = ['A', 'D', 'G', 'C', 'F', 'Bb', 'Eb', 'Ab', 'Db', 'Gb', 'B', 'E'];

//The set of modes (Do not change the order)
let modesList = [[['Lydian'], false, 0],[['Ionian'], false, 1], [['Mixolydian'], false, 2],
                  [['Dorian'], false, 3], [['Aeolian'], false, 4], [['Phrygian'], false, 5], [['Locrian'], false, 6]];

//The set of possible types of chords
let chordsList = [[['Triads'],false, [1,3,5]], [['7th Chords'], false, [1,3,5,7]]];

//the state of the setup (-1 = chord/interval, 0 = choice of the filters, 1,2 = zen mode play)
let phase = -1;

//Radius of circle of intervals
let radius;
//Interval selector object
let is;

//Coords for netx interval
let x_next_currentRoot;
let y_next_currentRoot;

// current index current root in rootList
let curr_index = -1;

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

//the home text (redirect to homepage)
let home;

//the circle of fifths
let cf;
const MAJOR = 0;
const MINOR = 1;
const DIM = 2;
const DIS = -1;

//Coords for netx interval
let x_chordsTrain;
let y_chordsTrain;
let chordTrain;

//Coords for netx interval
let x_intTrain;
let y_intTrain;
let intTrain;


//Checl radius for click in clickable texts
let radiusNextButtons;

//Oscillator
let wave;
let playing = false;

//Number of answer shown
let steps;
//the answer cells
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
  radiusNextButtons = 0.06;
  x_next_interval = 0.9;
  y_next_interval = 0.8;
  x_next_root = 0.9;
  y_next_root = 0.6;
  x_next_currentRoot = 0.9;
  y_next_currentRoot = 0.4;
  x_chordsTrain = 0.25;
  y_chordsTrain = 0.5;
  x_intTrain = 0.75;
  y_intTrain = 0.5;
  wave = new Tone();
  steps = 15;
}


function draw() {
  background(colJet);

  //If type of zen mode phase
  if(phase == -1){
    if(chordTrain == undefined){
      chordTrain = new ClickableText("Chord based training", x_chordsTrain, y_chordsTrain, radiusNextButtons, 30);
    }

    if(intTrain == undefined){
      intTrain = new ClickableText("Interval based training", x_intTrain, y_intTrain, radiusNextButtons, 30);
    }

    //shows the two buttons for the type of drill (chord/interval)
    chordTrain.show();
    intTrain.show();

  }else if(phase == 1){ // Interval drill

    if(is == undefined){//if first run of the branch, setup interval drill

      //the intervals the user selected
      activeIntervals = [];
      nextRootText = new ClickableText("Change root", x_next_root, y_next_root,radiusNextButtons, fontsize1);
      nextIntervalText = new ClickableText("Change interval", x_next_interval, y_next_interval,radiusNextButtons, fontsize1)

      //take only the active ones
      intervalsSet.forEach(function(element){
        if(element[1]){
          element[0].forEach(interval => activeIntervals.push(interval));
        }
      });

      //At least one set of intervals must be selected
      if(activeIntervals.length > 0){
        //create the home button to homepage
        home = new ClickableText("Catch the pitch", 0.5, 0.1, radiusNextButtons * 3, fontsize1);
        //create the circle of intervals
        is = new IntervalSelector(activeIntervals);
        //initialize the first interval
        is.newInterval();
        //initialize the root of reference
        newRoot();
        //create the answers bar
        checkBox = new ProgressBar(steps);
      }
    }else{ //the page has already been initialized

      //show the circle of intervals
      is.render();

      //show the change root button
      nextRootText.show();
      //show the change interval button
      nextIntervalText.show();
      //show the current root
      currentRoot.show();
      //show the answers bar
      checkBox.show();
      //show the homepage button
      home.show();
    }
  }else if(phase == 2){ // chords drill
    if(cf == undefined){ //first run of the branch, setup chord drill

      //the active set of type of chords
      let activeSetGrades = [];

      //take only the active ones
      fp.chordsList.forEach(function(element){
        if(element.checked){
          activeSetGrades.push(element);
        }
      });

      //the active modes
      let activeModes = [];

      //take only the active ones
      fp.modes.forEach(function(element){
        if(element.checked){
          activeModes.push(element);
        }
      });

      //if there's type of chords to be shown
      if(activeSetGrades.length > 0){
        //create homepage button
        home = new ClickableText("Catch the pitch", 0.5, 0.1, radiusNextButtons * 3, fontsize1);
        //define a new root among all possible notes
        newRandomRoot();
        //create circle of fifth
        cf = new FifthCircle(activeSetGrades, activeModes);
        //create the answers bar, passing the active type of chords selected
        checkBox = new ProgressBar(cf.type.filler.length);
      }
    }else{ //the page has already been initialized

      //show the circle of fifth
      cf.render();
      //show the current root
      currentRoot.show();
      //show the answer box
      checkBox.show();
      //show the homepage button
      home.show();
    }
  }else if(!fp.invisible()){ // if the phase is 0 and fp is not invisible, show the page of filters
    fp.render();
  }
}

function mouseClicked(){
  if(fp != undefined && !fp.invisible()){ //if the page of filter is showing and it's not invisible
    fp.update();
  }

  if(chordTrain != undefined && chordTrain.isOver()){ // if the type of drill is showing and the text is clicked
    //filter page is initialized as a filterChordsPage
    fp = new FilterChordsPage();
    //next phase
    phase = 0;
  }

  if(intTrain != undefined && intTrain.isOver()){ // if the type of drill is showing and the text is clicked
    //filter page is initialized as a filterIntervalPage
    fp = new FilterIntervalPage();
    //next phase
    phase = 0;
  }

  if(home != undefined && home.isOver()){ // if the homepage button is defined and is pressed, go yo homepage
      location.href='../index.html';
  }else if(nextRootText != undefined && nextRootText.isOver()){ // if there's a nextroot button and it's pressed, change root
    newRoot();
    console.log("nextRootText clicked");
  }else if(nextIntervalText != undefined && nextIntervalText.isOver()){ // if there's a next interval button and it's pressed, change interval
    is.newInterval();
    console.log("nextIntervalText clicked");
  }else if(currentRoot != undefined && currentRoot.isOver()){ // if the current root is showing and it's pressed, the oscillator play the tone related to the note
    wave.play(currentRoot.text);
  }else if(is != undefined){ // if the interval selector is active
    if(!is.checkIntervalsClicked() && checkBox != undefined){ // check if there's NO button clicked, simulates a new answer and change the interval
      checkBox.newAnswer(int(random(1,2.99999)), currentRoot.text, is.intervals[is.lastSelected].text);
      is.newInterval();
    }
  }else if(cf != undefined){// if the circle of fifth is showing, create a new random root, a new mode and a new answer
    newRandomRoot();
    cf.newMode();
    checkBox.newAnswer(int(random(1,2.99999)),currentRoot.text, cf.idx_mode.text);
  }

  return false;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  if(fp != undefined && !fp.invisible()){ // if showing
    fp.updateDispVariables();
  }

  if(is != undefined){ // if showing
    is.updateDispVariables();
  }
}

function newRoot(){

  let newIndex;

  //get a random new root FROM THE FILTERS OF INTERVALS until (the current index is different respect the previous one AND the previous one is available)
  do{
    newIndex = floor(random(1) * fp.roots.length);
    currentRoot = new ClickableText(fp.roots[newIndex].text, x_next_currentRoot, y_next_currentRoot, radiusNextButtons, fontsize1);
  }while(curr_index >= 0 && newIndex == curr_index);

  curr_index = newIndex;

  wave.play(currentRoot.text);
}

function newRandomRoot(){

  let newIndex;

  //get a random new root FROM THE 12 NOTES until (the current index is different respect the previous one AND the previous one is available)
  do{
    newIndex = floor(random(1) * rootsList.length);
    currentRoot = new ClickableText(rootsList[newIndex], x_next_currentRoot, y_next_currentRoot, radiusNextButtons, fontsize1);
  }while(curr_index >= 0 && newIndex == curr_index);

  curr_index = newIndex;

  wave.play(currentRoot.text);
}

function flatify(s){
   if ((s[1] == 'b' || s[1] == 'B') && s.length > 1) {
     var newS = s[0] + '♭' + s.substr(2);
     return newS;
   }
   return s;
 }
