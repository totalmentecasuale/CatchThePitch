class ClickableText{

	constructor(text, a, b, sizeFont){
		this.text = text;
		this.a = a;
		this.b = b;
		this.sizeFont = sizeFont;
	}

	show(opac = 255){
		push();
		fill(255, opac);
		strokeWeight(2);
		textSize(this.sizeFont);
		text(this.text, this.a * windowWidth, this.b * windowHeight);
		this.isOver();
		pop();
	}

	isOver(){
		var x = this.a * windowWidth;
		var y = this.b * windowHeight;
		var w = textWidth(this.text);
		var h = textAscent();
		var x1 = x + textWidth(this.text) / 2;
		var y1 = y + textAscent() / 2;
		return (mouseX > x - w / 2  && mouseX < x1 && mouseY > y - h/2  && mouseY < y1);
	}

	update(text){
		this.text = text;
	}
}
