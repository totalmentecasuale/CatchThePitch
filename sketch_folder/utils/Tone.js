class Tone{
	
	constructor(){
		this.osc = new p5.Oscillator();	
		this.osc.setType('sine');
		this.t1 = 0.1; // attack time in seconds
		this.l1 = 0.7; // attack level 0.0 to 1.0
		this.t2 = 1; // decay time in seconds
		this.l2 = 0.1; // decay level  0.0 to 1.0
		this.env = new p5.Envelope(this.t1,this.l1,this.t2,this.l2);
	}

	play(note){
		let noteTeoria = teoria.note.fromString(note + "4");

		this.osc.start();
		this.osc.freq(noteTeoria.fq());
		this.env.play(this.osc);	
	}
}