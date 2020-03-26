class PopUp{
  constructor(text){
    this.maxWidth = windowWidth * 0.15;
    this.text = text;
    this.wrappedText;
    this.rowNumber = 1;
  }

  show(x, y, bWidth, vShift){
    push();

    textFont('Noto Sans JP');
    textSize(24);
    textLeading(20);
    textAlign(CENTER, CENTER)
    this.update();
    var hOffset = 25;
    var hShift = bWidth * 0.1;
    var vOffset = 20;
    var popX = x + bWidth + hShift;
    var popY = y;
    // x += bWidth + hShift;
    if(popX > windowWidth - bWidth/2){
      popX -= 2 * bWidth;
      popX -= hShift;
    }

    if(arguments[3] != undefined){
      popX = x;
      popY = y - (textAscent() * this.rowNumber + vShift);
    }
    // Drawing rectangle
    push();
    noFill();
    stroke(colAmazon);
    fill(colCedarChest);
    strokeWeight(3);
    rectMode(CENTER);
    rect(popX, popY, this.maxWidth + hOffset, textAscent() * this.rowNumber + vOffset, 20);
    pop();

    // Putting text in rectangle
    fill(colGainsboro);
    text(this.wrappedText, popX, popY + 3);
    pop();
  }

  update(updatedText){
    this.maxWidth = windowWidth * 0.18;
    this.wrappedText = this.wrapText(this.text);
    if(arguments.length > 0){
      this.wrappedText = this.wrapText(updatedText);
    }
  }

  wrapText(t){
    let wrapped = '';
    let words = t.split(' ');
    var currentRow = words[0];
    var currentWidth = textWidth(currentRow);

    for(var i = 1; i < words.length; i++){
      if(currentWidth + (textWidth(words[i] + ' ')) < this.maxWidth){
        var temp = ' ' + words[i];
        currentRow += temp;
      } else {
        currentRow += '\n';
        wrapped += currentRow;
        currentRow = words[i];

      }
      currentWidth = textWidth(currentRow);
    }
    wrapped += currentRow;

    this.rowNumber = (wrapped.match(/\n/g) || []).length + 1;  // Saves number of rows

    return wrapped;
  }
}
