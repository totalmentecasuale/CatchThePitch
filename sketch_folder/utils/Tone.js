class Tone{

	constructor(){
		this.osc = new p5.Oscillator();
		this.osc.setType('sine');
		this.t1 = 0.2; // attack time in seconds
		this.l1 = 0.95; // attack level 0.0 to 1.0
		this.t2 = 1; // decay time in seconds
		this.l2 = 0; // decay level  0.0 to 1.0
		this.env = new p5.Envelope(this.t1,this.l1,this.t2,this.l2);
	}

	play(note){
		//Given a note, add the octave and play the sound
		let noteTeoria = teoria.note.fromString(note + "3");
		this.osc.start();
		this.osc.freq(noteTeoria.fq());
		this.env = new p5.Envelope(this.t1,this.l1,this.t2,this.l2);
		this.env.play(this.osc);

	}

}
