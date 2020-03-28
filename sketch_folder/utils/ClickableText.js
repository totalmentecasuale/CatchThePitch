class ClickableText{

	constructor(text, a, b, sizeFont, displayValue = undefined, isHomepageButton = false, fontCustom = undefined){
		//reference value
		this.text = text;
		this.a = a;
		this.b = b;
		this.sizeFont = sizeFont;
		this.customFont = fontCustom;
		//the actual displayed value
		this.dispText = displayValue ? displayValue : text;
		this.opac = 255;
		this.isHomepage = isHomepageButton;
		this.t = 0;
		this.tGrow = true;
	}

	show(opac = undefined){
		if(opac > -1){
			this.opac = opac;
		}
		if(!this.isHomepage){
			push();
			fill(255, this.opac);
			strokeWeight(2);
			if(this.customFont != undefined){
				textFont(this.customFont);
			}else{
				textFont('Noto Sans JP');	
			}	
			textSize(this.sizeFont);
			text(this.dispText, this.a * windowWidth, this.b * windowHeight);
			pop();
		}else{
			push();
			if(this.t >= 255){this.tGrow = false;}
			if(this.t <= 150){this.tGrow = true;}
			if(this.tGrow){this.t+=2;}else{this.t-=2;}
			var titleCol = color(this.t, this.t - 50, this.t, this.opac)
			fill(titleCol);
			textFont(fontFakeHope);
  			textSize(this.sizeFont);;
			text(this.dispText, this.a * windowWidth, this.b * windowHeight);
			pop();
		}
	}

	isOver(){
		var x = this.a * windowWidth;
		var y = this.b * windowHeight;
		var w = textWidth(this.dispText);
		var h = textAscent();
		var x1 = x + textWidth(this.dispText) / 2;
		var y1 = y + textAscent() / 2;
		return (mouseX > x - w / 2  && mouseX < x1 && mouseY > y - h/2  && mouseY < y1) && this.opac == 255;
	}

	update(text){
		this.dispText = text;
	}
}
