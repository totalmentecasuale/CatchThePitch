class Countdown{
	
	constructor(seconds, a, b, fontSize, endText){
		this.len = seconds;
		this.a = a;
		this.b = b;
		this.size = fontSize;
		this.started = false;
		this.endTime;
		this.startTime; 
		this.endText = endText;
	}

	start(){
		this.started = true;
		this.startTime = this.getTimeMillis();
		this.endTime = this.startTime + this.len  * 1000;
		
	}

	render(){
		if(this.started){
			let passedTimeText = (this.getTimeMillis() - this.startTime);
			push();
			let f = map(passedTimeText % 1000, 0, 1000, 4, 0.5);
			textSize(this.size * f);
			noStroke();
			fill(255);
			text(this.len - int(floor(passedTimeText/1000)), this.a * windowWidth, this.b * windowHeight);
			pop();
		}
	}

	getTimeMillis(){
		let d = new Date();
		return d.getTime();
	}

	isOver(){
		return ceil(this.endTime - this.getTimeMillis()) / 1000 < 0;
	}

}