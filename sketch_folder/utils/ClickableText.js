class ClickableText{
	
	constructor(text, a, b, radiusCheck, sizeFont){
		this.text = text;
		this.a = a;
		this.b = b;
		this.radiusCheck = radiusCheck;
		this.sizeFont = sizeFont;
	}

	show(){
		
		fill(255);
		strokeWeight(2);
		textSize(this.sizeFont);
		text(this.text, this.a * windowWidth, this.b * windowHeight);

	}

	isOver(){	
		return dist(mouseX, mouseY, this.a * windowWidth, this.b * windowHeight) < this.radiusCheck * windowHeight;
	}

}