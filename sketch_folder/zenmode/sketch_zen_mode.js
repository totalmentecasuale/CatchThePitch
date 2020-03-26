
//Descriptions of the filters
let zenIntervalTextTypes = "Choose one or more groups of intervals for this drill";
let zenIntervalTextRoots = "Choose one or more root notes";
let zenChordTextTypes = "Choose one or more groups of type of chords for this drill";
let zenChordTextModes = "Choose one or more modes";


let colJet, colCedarChest, colDarkVanilla, colGainsboro, colAmazon;

//Font sizes
let fontsize1 = 45;
let fontsize2 = 33;
let fontFakeHope;
let fontGameTime;


//Filter page
let fp;

let cnv;

let chordImg, intervalImg;

//Filters : a single filter must include at least two arguments [text, active (true/false)]
//A greater number of arguments is useful to secondary information and it will be place in the
//field "filler" of a clickable text

//The set of intervals available
let intervalsSet = [[['P4', 'P5', 'M6', 'm6'], false, 0, 0],
                    [['m7', 'M7', 'P8'], false, 0, 0], 
                    [['P1','m3','M3'], false, 0, 0]];

//The set of root notes (Do not change the order)
let rootsList = ['A', 'D', 'G', 'C', 'F', 'Bb', 'Eb', 'Ab', 'Db', 'Gb', 'B', 'E'];

//The set of modes (Do not change the order)
let modesList = [[['Lydian'], false, 0],[['Ionian'], false, 1], [['Mixolydian'], false, 2],
                  [['Dorian'], false, 3], [['Aeolian'], false, 4], [['Phrygian'], false, 5], [['Locrian'], false, 6]];

//The set of possible types of chords
let chordsList = [[['Triads'],false, [['P1','P1','P1'],['M3','m3','m3'],['m3','M3','m3']]], 
                  [['7th Chords'], false, [['P1','P1','P1'],['M3','m3','m3'],['m3','M3','m3'], ['M3', 'm3','M3']]]];

//the state of the setup (-1 = chord/interval, 0 = choice of the filters, 1,2 = zen mode play)
let phase = -1;

//Radius of circle of intervals
let radius;
//Interval selector object
let is;

//Coords for netx interval
let x_currentRoot;
let y_currentRoot;
let rootText;

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

//Coords for netx mode
let x_next_mode;
let y_next_mode;
let nextModeText;

//Coords for next type of chords
let x_next_chordType;
let y_next_chordType;
let nextChordTypeText;

//Coords for next type of chords
let x_next_chord;
let y_next_chord;
let nextChordText;


//Coords for next type of chords
let x_chord;
let y_chord;

//Oscillator
let wave;
let playing = false;

//Number of answer shown
let steps;
//the answer cells
let checkBox;

let mic;
let answerButton;
let voiceFreqGraph;
let correctnessText;

// Popups for answer button and intervals
let answerPopUp;
let infoPopUp;

function preload(){
  fontFakeHope = loadFont("../assets/FakeHope.ttf");
  fontGameTime = loadFont("../assets/game_time.ttf");
  chordImg = createImg("../assets/gif_pacman_chord.gif");
  intervalImg = createImg("../assets/gif_pacman_int.gif");
}


function centerCanvas() {
  var x = (windowWidth - width) / 2;
  var y = (windowHeight - height) / 2;
  cnv.position(x, y);
}

function setup(){
  cnv = createCanvas(windowWidth, windowHeight);
  centerCanvas();
  colCedarChest = color(192, 87, 70); // Dark Red/Orange
  colDarkVanilla = color(220, 204, 163); // Nice Yellow
  colGainsboro = color(220, 225, 233); // Panna
  colAmazon = color(65, 123, 90); // Green

  textFont('Noto Sans JP');
  textSize(fontsize1);
  textAlign(CENTER, CENTER);
  radius = windowHeight * 0.15;
  colJet = color(50, 41, 47); // Dark Brown
  background(colJet);
  x_next_interval = 0.9;
  y_next_interval = 0.8;
  x_next_root = 0.9;
  y_next_root = 0.6;
  x_currentRoot = 0.9;
  y_currentRoot = 0.4;
  x_chord = 0.9;
  y_chord = 0.25;
  x_chordsTrain = 0.25;
  y_chordsTrain = 0.3;
  x_intTrain = 0.75;
  y_intTrain = 0.3;
  x_next_mode = 0.9;
  y_next_mode = 0.9;
  x_next_chordType = 0.9;
  y_next_chordType = 0.75;
  x_next_chord = 0.9;
  y_next_chord = 0.6;
  wave = new Tone();
  mic = new Microphone();
  answerButton = new ClickableText("Tap to answer", 0.5, 0.9, fontsize1, undefined, false, fontGameTime);

  imageMode(CENTER);

  // PopUp setup
  answerPopUp = new PopUp("Start singing, tap and stop when the answer appears");
  infoPopUp = new PopUp('info');
}


function draw() {
  background(colJet);

  //If type of zen mode phase
  if(phase == -1){
    if(chordTrain == undefined){
      chordTrain = new ClickableText("Chord based training", x_chordsTrain, y_chordsTrain, fontsize1, undefined, false, fontGameTime);
    }

    if(intTrain == undefined){
      intTrain = new ClickableText("Interval based training", x_intTrain, y_intTrain, fontsize1, undefined, false, fontGameTime);
    }

    //shows the two buttons for the type of drill (chord/interval)
    chordTrain.show();
    intTrain.show();
    chordImg.size(windowWidth * 0.12,windowWidth * 0.12);
    intervalImg.size(windowWidth * 0.12,windowWidth * 0.12);
    chordImg.position(0.18 * windowWidth, 0.4 * windowHeight);
    intervalImg.position(0.68 * windowWidth, 0.41 * windowHeight);

  }else if(phase == 1){ // Interval drill

    if(is == undefined){//if first run of the branch, setup interval drill

      //the intervals the user selected
      activeIntervals = [];
      nextRootText = new ClickableText("Change root", x_next_root, y_next_root, fontsize2, undefined, false, fontGameTime);
      nextIntervalText = new ClickableText("Change interval", x_next_interval, y_next_interval, fontsize2, undefined, false, fontGameTime)

      //take only the active ones
      intervalsSet.forEach(function(element){
        if(element[1]){
          element[0].forEach(interval => activeIntervals.push(interval));
        }
      });

      //At least one set of intervals must be selected
      if(activeIntervals.length > 0){
        //create the home button to homepage
        home = new ClickableText("Catch the pitch", 0.5, 0.1, 55,undefined, true);
        //create the circle of intervals
        is = new IntervalSelector(activeIntervals);
        //initialize the first interval
        is.newInterval();
        //initialize the root of reference
        newRoot();
        //create the answers bar
        steps = 15;
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
      rootText.show();
      //show the answers bar
      checkBox.show();
      //show the homepage button
      home.show();
      
      if(voiceFreqGraph != undefined){
        answerButton.show(map(voiceFreqGraph.opac, 0, 255, 255, 0));  
      }else if(correctnessText != undefined && correctnessText.opac > 0){
        correctnessText.show();
        if(correctnessText.opac < 80){
          answerButton.show(map(correctnessText.opac, 0, 80, 255, 0));  
        }
      }else{
        answerButton.show(255);
      }

      checkMicAndManageAnswers();
      
      showPopup(is, undefined);

    }
  }else if(phase == 2){ // chords drill
    if(cf == undefined){ //first run of the branch, setup chord drill

      nextModeText = new ClickableText("New mode", x_next_mode, y_next_mode, fontsize2, undefined, false, fontGameTime);
      nextChordTypeText = new ClickableText("New chord type", x_next_chordType, y_next_chordType, fontsize2, undefined, false, fontGameTime);
      nextChordText = new ClickableText("New chord", x_next_chord, y_next_chord, fontsize2, undefined, false, fontGameTime);

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
        home = new ClickableText("Catch the pitch", 0.5, 0.1, 55, undefined, true);
        //define a new root among all possible notes
        newRandomRoot();
        //create circle of fifth
        cf = new FifthCircle(activeSetGrades, activeModes);
        cf.newChord();
        //create the answers bar, passing the active type of chords selected
        steps = cf.type.filler.length;
        checkBox = new ProgressBar(steps, false);
      }
    }else{ //the page has already been initialized

      //show the circle of fifth
      cf.render();
      //show the current root
      rootText.show();
      //show the answer box
      checkBox.show();
      //show the homepage button
      home.show();

      nextModeText.show();
      nextChordTypeText.show();
      nextChordText.show();
      if(voiceFreqGraph != undefined){
        answerButton.show(map(voiceFreqGraph.opac, 0, 255, 255, 0));  
      }else if(correctnessText != undefined && correctnessText.opac > 0){
        correctnessText.show();
        if(correctnessText.opac < 80){
          answerButton.show(map(correctnessText.opac, 0, 80, 255, 0));  
        }
      }else{
        answerButton.show(255);
      }
      checkMicAndManageAnswers();

      showPopup(undefined, cf);

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

    chordImg.remove();
    intervalImg.remove();
  }

  if(intTrain != undefined && intTrain.isOver()){ // if the type of drill is showing and the text is clicked
    //filter page is initialized as a filterIntervalPage
    fp = new FilterIntervalPage();
    //next phase
    phase = 0;
    chordImg.remove();
    intervalImg.remove();
  }

  if(home != undefined && home.isOver()){ // if the homepage button is defined and is pressed, go yo homepage
      location.href='../index.html';
  }else if(nextRootText != undefined && nextRootText.isOver()){ // if there's a nextroot button and it's pressed, change root
    newRoot();
    console.log("nextRootText clicked");
  }else if(nextIntervalText != undefined && nextIntervalText.isOver()){ // if there's a next interval button and it's pressed, change interval
    is.newInterval();
    console.log("nextIntervalText clicked");
  }else if(nextModeText != undefined && nextModeText.isOver()){
    cf.newMode();
    cf.newChord();
    steps = cf.type.filler.length;
    checkBox.reset(steps);
    answerButton = new ClickableText("Tap to answer", 0.5, 0.9, fontsize1, undefined, false, fontGameTime);
    console.log("nextModeText clicked");
  }else if(nextChordText != undefined && nextChordText.isOver()){
    cf.newChord();
    steps = cf.type.filler.length;
    checkBox.reset(steps);
    answerButton = new ClickableText("Tap to answer", 0.5, 0.9, fontsize1, undefined, false, fontGameTime);
    console.log("nextChordText clicked");
  }else if(nextChordTypeText != undefined && nextChordTypeText.isOver()){
    cf.newChordType();
    steps = cf.type.filler.length;
    checkBox.reset(steps);
    answerButton = new ClickableText("Tap to answer", 0.5, 0.9, fontsize1, undefined, false, fontGameTime);
    console.log("nextChordTypeText clicked");
  }else if(rootText != undefined && rootText.isOver()){ // if the current root is showing and it's pressed, the oscillator play the tone related to the note
    wave.play(currentRoot.toString(true));
  }else if((is != undefined && !is.checkIntervalsClicked() && checkBox != undefined) || cf != undefined){
    if(answerButton != undefined && answerButton.isOver()){//if the answer button is clicked, start recording data from microphone
      if(checkBox.allAnswersFull()){
        checkBox.reset(steps);
        answerButton = new ClickableText("Tap to answer", 0.5, 0.9, fontsize1, undefined, false, fontGameTime);
      }else{
        mic.record();
        voiceFreqGraph = new VoiceGraph();
      }

    } 
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
  let activeRoots = [];
  fp.roots.forEach(function(e){
    if(e.checked){
      activeRoots.push(e);
    }
  });
  //get a random new root FROM THE FILTERS OF INTERVALS until (the current index is different respect the previous one AND the previous one is available)
  do{
    newIndex = floor(random(1) * activeRoots.length);
    currentRoot = teoria.note(activeRoots[newIndex].text + "3");
    rootText = new ClickableText(currentRoot.toString(true).toUpperCase(), 
                                  x_currentRoot, y_currentRoot, fontsize1, 
                                  flatify(currentRoot.toString(true).toUpperCase()), false);
  }while(curr_index >= 0 && newIndex == curr_index && activeRoots.length > 1);

  curr_index = newIndex;

  wave.play(currentRoot.toString(true));
}

function newRandomRoot(){

  let newIndex;

  //get a random new root FROM THE 12 NOTES until (the current index is different respect the previous one AND the previous one is available)
  do{
    newIndex = floor(random(1) * rootsList.length);
    currentRoot = teoria.note(rootsList[newIndex] + "3");
    rootText = new ClickableText(currentRoot.toString(true).toUpperCase(), 
                                  x_currentRoot, y_currentRoot, 
                                  fontsize1, flatify(currentRoot.toString(true).toUpperCase()), false);
  }while(curr_index >= 0 && newIndex == curr_index && rootsList.length > 1);

  curr_index = newIndex;

  wave.play(currentRoot.toString(true));
}

function flatify(s){
   if ((s[1] == 'b' || s[1] == 'B') && s.length > 1) {
     var newS = s[0] + '♭';
     return newS;
   }
   return s;
 }

 function newQuestion(answer, answerNote){
  if(is != undefined){//interval section
    //we pass the answer, the root, the interval
    checkBox.newAnswer(answer, answerNote, is.intervals[is.lastSelected].text);
    is.newInterval();
  }else if(cf != undefined){//chords section
    //we pass the answer, the root, the mode, the reference to the type of chord, the chord selected from the circle of fifth
    checkBox.newAnswer(answer, answerNote, cf.idx_mode.text, cf.type.filler, cf.chord);
    if(checkBox.allAnswersFull()){//if the progress bar is full, reset the context
      newRandomRoot();
      cf.newMode();
      cf.newChord();
      answerButton = new ClickableText("Reset answers bar", 0.5, 0.9, fontsize1, undefined, false, fontGameTime);
    }
  }
}

function checkMicAndManageAnswers(){
  let fundFreq = mic.getAnswerFreq();
  if(voiceFreqGraph != undefined){
    voiceFreqGraph.setData(mic.corrBuff);
    voiceFreqGraph.show();
  }

  if(correctnessText != undefined && correctnessText.opac > 0){
    correctnessText.opac = constrain(correctnessText.opac - 1.5, 0, 255);
  }else{
    correctnessText = undefined;
  }
  if(fundFreq > 0){
    voiceFreqGraph = undefined;
    let textToShow = "";
    let fundNote = teoria.note.fromFrequency(fundFreq);
    let correctInterval;
    let root;
    if(is != undefined){//inteval section
      correctInterval = teoria.interval(is.intervals[is.lastSelected].text);
      root = currentRoot;
    }else if(cf != undefined){//chord section
      //create a note from the root of the selected chord
      root = teoria.note(cf.chord.text + "3");
      //update the last interval chord information as summation of intervals respect to the answers already given
      cf.updateLastIntervalChord(checkBox);
      correctInterval = cf.lastIntervalChord;
    }

    //calculate interval of provided answer
    let answeredInterval = teoria.interval(root, fundNote.note);
    //compare the intervals' semitones to decide the correctness of the answer
    let answer = correctInterval.semitones() === answeredInterval.semitones() ? 1 : 2;
    if(answer == 1){
      let precision = map(abs(fundNote.cents), 0, 50, 100, 0);
      textToShow = "Correct! Precision is " + precision.toFixed(2) + "%";
      if(precision < 85){
        textToShow = textToShow + "\n(by the way, a bit out of tune: " + fundNote.cents.toFixed(2) + " cents)";
      }
    }else if(answer == 2){
      textToShow = "Wrong! You just sang a " + flatify(fundNote.note.toString(true).toUpperCase()) + " (" +fundFreq.toFixed(2) + " Hz)"; 
    }
    correctnessText = new ClickableText(textToShow, 0.5, 0.9, fontsize1);
    //console.log(answer, answeredInterval.toString(), answeredInterval.semitones(), correctInterval.toString(), correctInterval.semitones())
    //update the current question and provide a new question
    newQuestion(answer, fundNote.note);
    mic.resetBuffer();
  }
}

function intervalExpander(interval){
  var expanded = '';
  if(interval.charAt(0) == 'P'){
    expanded += 'Perfect';
  } else if (interval.charAt(0) == 'm') {
    expanded += 'Minor';
  } else if (interval.charAt(0) == 'M') {
    expanded += 'Major';
  }

  expanded += ' ';

  if(interval.charAt(1) == '1'){
    expanded += 'Unison';
  } else if(interval.charAt(1) == '2'){
    expanded += '2nd';
  } else if(interval.charAt(1) == '3'){
    expanded += '3rd';
  } else {
    expanded += interval.charAt(1) + 'th';
  }

  return expanded;
}

function chordExpander(chord){
  var expanded = chord.text + " ";
  if(chord.status === MAJOR){
    expanded += 'Major';
  } else if (chord.status === MINOR) {
    expanded += 'Minor';
  } else if (chord.status === DIM) {
    expanded += 'Diminished';
  }

  return expanded;
}

function showPopup(intSel = undefined, modSel = undefined){
    // Showing Popups
  if(answerButton != undefined && answerButton.isOver()){
    push();
    textSize(fontsize1);
    var x = answerButton.a * windowWidth;
    var y = answerButton.b * windowHeight;
    var w = textWidth(answerButton.text);
    pop();
    answerPopUp.show(x, y, w + 5);
  }

  if(rootText.isOver()){
    var x = windowWidth * rootText.a;
    var y = windowHeight * rootText.b;
    var w = windowWidth * 0.1;
    // infoPopUp = new PopUp();
    infoPopUp = new PopUp('Current base note, click to play it again');
    infoPopUp.show(x, y, w, 30);
  }
  if(intSel != undefined){
    for (var i = 0; i < intSel.intervals.length; i++) {
      var x = windowWidth * rootText.a;
      var y = windowHeight * rootText.b;
      var w = windowWidth * 0.1;
      if (intSel.intervals[i].isOver()){
        infoPopUp = new PopUp(intervalExpander(intSel.intervals[i].text));
        infoPopUp.show(x, y, w, 50);
      }
    }

    if(nextRootText != undefined && nextRootText.isOver()){
      push();
      textSize(fontsize2);
      var x = nextRootText.a * windowWidth;
      var y = nextRootText.b * windowHeight;
      infoPopUp = new PopUp('Click to change the root');
      var w = textWidth(infoPopUp.text);
      pop();
      infoPopUp.show(x, y, w, 30);

    }

    if(nextIntervalText != undefined && nextIntervalText.isOver()){
      push();
      textSize(fontsize2);
      var x = nextIntervalText.a * windowWidth;
      var y = nextIntervalText.b * windowHeight;
      infoPopUp = new PopUp('Click to change the interval or click on the interval itself');
      var w = textWidth(infoPopUp.text);
      pop();
      infoPopUp.show(x, y, w, 30);
    }

  }

  if(modSel != undefined){
    for (var i = 0; i < modSel.chordList.length; i++) {
      var x = windowWidth * rootText.a;
      var y = windowHeight * rootText.b;
      var w = windowWidth * 0.1;
      if (modSel.chordList[i].isOver()){
        infoPopUp = new PopUp(chordExpander(modSel.chordList[i]));
        infoPopUp.show(x, y, w, 50);
      }
    }

    if(nextModeText != undefined && nextModeText.isOver()){
      push();
      textSize(fontsize2);
      var x = nextModeText.a * windowWidth;
      var y = nextModeText.b * windowHeight;
      infoPopUp = new PopUp('Click to change the mode');
      var w = textWidth(infoPopUp.text);
      pop();
      infoPopUp.show(x, y, w, 30);
    }

    if(nextChordText != undefined && nextChordText.isOver()){
      push();
      textSize(fontsize2);
      var x = nextChordText.a * windowWidth;
      var y = nextChordText.b * windowHeight;
      infoPopUp = new PopUp('Click to change the chord');
      var w = textWidth(infoPopUp.text);
      pop();
      infoPopUp.show(x, y, w, 30);
    }

    if(nextChordTypeText != undefined && nextChordTypeText.isOver()){
      push();
      textSize(fontsize2);
      var x = nextChordTypeText.a * windowWidth;
      var y = nextChordTypeText.b * windowHeight;
      infoPopUp = new PopUp('Click to change the type of chord');
      var w = textWidth(infoPopUp.text);
      pop();
      infoPopUp.show(x, y, w, 30);
    }
  }

}
