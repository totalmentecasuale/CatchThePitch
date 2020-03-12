class ClickableText{

	constructor(text, a, b, radiusCheck, sizeFont){
		this.text = text;
		this.a = a;
		this.b = b;
		this.radiusCheck = radiusCheck;
		this.sizeFont = sizeFont;
	}

	show(){
		push();
		fill(255);
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
		return (mouseX > x - w / 2  && mouseX < x1 + w/2 && mouseY > y - h/2  && mouseY < y1 + h/2 );
	}

	update(text){
		this.text = text;
	}
}
