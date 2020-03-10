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
		textSize(this.sizeFont);
		text(this.text, this.a * windowWidth, this.b * windowHeight);

	}

	isOver(){
		let x_m = map(mouseX, 0, windowWidth, -windowWidth*0.5, windowWidth*0.5);
		let y_m = map(mouseY, 0, windowHeight, -windowHeight*0.5, windowHeight*0.5);	
		return dist(x_m, y_m, this.a * windowWidth, this.b * windowHeight) < this.radiusCheck * windowHeight;
	}

}