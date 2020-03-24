class Tone{

	constructor(){
		this.osc = new p5.Oscillator();
		this.osc.setType('sine');
		this.t1 = 0.25; // attack time in seconds
		this.l1 = 0.7; // attack level 0.0 to 1.0
		this.t2 = 1; // decay time in seconds
		this.l2 = 0; // decay level  0.0 to 1.0
		this.env = new p5.Envelope(this.t1,this.l1,this.t2,this.l2);
		this.started = false;
	}

	play(note){
		//Given a note, add the octave and play the sound
		let noteTeoria = teoria.note.fromString(note + "3");
		this.osc.freq(noteTeoria.fq());
		if(!this.started){
			this.osc.start();
			this.started = true;
		}
		this.env.play(this.osc);

	}

}
