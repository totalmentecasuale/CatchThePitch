class VoiceGraph{
	
	constructor(){
		this.data = [];
		this.a = 0.5;
		this.b = 0.8;
		this.opac = 0;
		this.runsToOpacMax = 15;
		this.w = 0.35;
		this.h = 0.2;
	}

	show(){
		push();
		fill(colJet)
		translate(this.a * windowWidth, this.b * windowHeight);
		strokeWeight(2);
		stroke(200, 80, 180,this.opac);
		beginShape();
		for (var i = 0; i < this.data.length; i++) {
			var w = map(i, 0, this.data.length, 0, - this.w/2 * windowWidth);
			var h = map(this.data[i], -1, 1, this.h * windowHeight, 0);
			curveVertex(w, h);
		}
		endShape();
		beginShape();
		for (var i = 0; i < this.data.length; i++) {
			var w = map(i, 0, this.data.length, 0, this.w/2 * windowWidth);
			var h = map(this.data[i], -1, 1, this.h * windowHeight, 0);
			curveVertex(w, h);
		}
		endShape();
		pop();
		let increment = 255 / this.runsToOpacMax;
		this.opac = constrain(this.opac + increment, 0, 255);
	}

	setData(data){
		this.data = data;
	}


}