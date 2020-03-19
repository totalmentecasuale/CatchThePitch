class Microphone{
	

	constructor(){
		//the source	
		this.in = new p5.AudioIn();
		this.in.start();
		//the threshold for analysis
		this.centerClipThreshold = 0.0;
		//lowpass filter at 1khz
		this.filter = new p5.LowPass();
		this.filter.freq(1000);
		//connecting the input to the lowpass filter
		this.in.disconnect();
		this.in.connect(this.filter);
		this.filter.disconnect();
		//fft to analyze the spectrum information (1024 samples long)
		this.fft = new p5.FFT();
		this.fft.setInput(this.filter);

		//the buffer to store and analyze audio information
		this.bufferFundFrequencies = [];
		//length in number of windows of the recording process
		this.maxSize = 48;
		//the state of recording
		this.recording = false;
		this.minBuffLen = 10;
		this.maxAcceptableVariance = 10;
		this.corrBuff =[];
	}

	//if the state is abling the recoring, it pushes data information related to the audio, if full it make the answer
	getAnswerFreq(){
		if(this.bufferFundFrequencies.length == this.maxSize && this.recording){
			let varBuffer;
			this.recording = false;
			do{
				//if it's not the first time
				if(varBuffer != undefined){
					//remove both max and mix value to decrement the value of variance
					let maxValue = max(this.bufferFundFrequencies);
					let minValue = min(this.bufferFundFrequencies);
					this.bufferFundFrequencies = this.bufferFundFrequencies.filter(function(e){return e != maxValue && e != minValue;});
				}else{
					//remove negative values
					this.bufferFundFrequencies = this.bufferFundFrequencies.filter(function(e){ return e > 0;});
				}
				varBuffer = this.varianceFreq();
				console.log(varBuffer)

				//Go in loop till variance is acceptable or the number of samples is still guaranteed
			}while(varBuffer > this.maxAcceptableVariance && this.bufferFundFrequencies.length > this.minBuffLen);
			return this.averageFreq();
		}else if (this.recording){
			this.bufferFundFrequencies.push(this.getAutocorrelationFreq());
		}

		return -1;
	}

	record(){
		this.recording = true;
	}

	varianceFreq(){
		let sumSqrd = 0;
		let count = this.bufferFundFrequencies.length;

		this.bufferFundFrequencies.forEach(function(e){
			sumSqrd+=pow(e,2);
		});

		return (sumSqrd / count) - pow(this.averageFreq(), 2);
	}

	averageFreq(){
		let sum = 0;
		let count = this.bufferFundFrequencies.length;

		this.bufferFundFrequencies.forEach(function(e){
			sum+=e;
		});

		return sum / count;
	}

	resetBuffer(){
		this.bufferFundFrequencies = [];
		this.corrBuff = [];
	}

/**
 *  Pitch Detection using Auto Correlation.
 *  
 *  Auto correlation multiplies each sample in a buffer by all
 *  of the other samples. This emphasizes the fundamental
 *  frequency.
 *
 *  Running the signal through a low pass filter prior to
 *  autocorrelation helps bring out the fundamental frequency.
 *  
 *  The visualization is a correlogram, which plots
 *  the autocorrelations.
 *
 *  We calculate the pitch by counting the number of samples
 *  between peaks.
 *  
 *  Example by Jason Sigal and Golan Levin.
 */


	getAutocorrelationFreq() {
		let timeDomain = this.fft.waveform(1024, 'float32');
		this.corrBuff = this.autoCorrelate(timeDomain);
		return this.findFrequency(this.corrBuff);
		// var freq = this.findFrequency(corrBuff);
		// let t = new ClickableText('Fundamental Frequency: ' + (freq.toString() + '000').slice(0, 5) + 'Hz', 0.5, 0.9, 24); 
		// t.show();
		// return freq;
	}



	// accepts a timeDomainBuffer and multiplies every value
	autoCorrelate(timeDomainBuffer) {
	  
	  var nSamples = timeDomainBuffer.length;

	  // pre-normalize the input buffer
	  timeDomainBuffer = this.normalize(timeDomainBuffer);

	  // zero out any values below the centerClipThreshold
	  timeDomainBuffer = this.centerClip(timeDomainBuffer);
	
	  var autoCorrBuffer = [];
	  for (var lag = 0; lag < nSamples; lag++){
	    var sum = 0; 
	    for (var index = 0; index < nSamples-lag; index++){
	      var indexLagged = index+lag;
	      var sound1 = timeDomainBuffer[index];
	      var sound2 = timeDomainBuffer[indexLagged];
	      var product = sound1 * sound2;
	      sum += product;
	    }

	    // average to a value between -1 and 1
	    autoCorrBuffer[lag] = sum/nSamples;
	  }

	  // normalize the output buffer
	  autoCorrBuffer = this.normalize(autoCorrBuffer);

	  return autoCorrBuffer;
	}


	// Find the biggest value in a buffer, set that value to 1.0,
	// and scale every other value by the same amount.
	normalize(buffer) {
	  var biggestVal = 0;
	  var nSamples = buffer.length;
	  for (var index = 0; index < nSamples; index++){
	    if (abs(buffer[index]) > biggestVal){
	      biggestVal = abs(buffer[index]);
	    }
	  }
	  for (var index = 0; index < nSamples; index++){

	    // divide each sample of the buffer by the biggest val
	    buffer[index] /= biggestVal;
	  }
	  return buffer;
	}

	// Accepts a buffer of samples, and sets any samples whose
	// amplitude is below the centerClipThreshold to zero.
	// This factors them out of the autocorrelation.
	centerClip(buffer) {
	  var nSamples = buffer.length;

	  if (this.centerClipThreshold > 0.0) {
	    for (var i = 0; i < nSamples; i++) {
	      var val = buffer[i];
	      buffer[i] = (Math.abs(val) > this.centerClipThreshold) ? val : 0;
	    }
	  }
	  return buffer;
	}

	// Calculate the fundamental frequency of a buffer
	// by finding the peaks, and counting the distance
	// between peaks in samples, and converting that
	// number of samples to a frequency value.
	findFrequency(autocorr) {

	  var nSamples = autocorr.length;
	  var valOfLargestPeakSoFar = 0;
	  var indexOfLargestPeakSoFar = -1;

	  for (var index = 1; index < nSamples; index++){
	    var valL = autocorr[index-1];
	    var valC = autocorr[index];
	    var valR = autocorr[index+1];

	    var bIsPeak = ((valL < valC) && (valR < valC));
	    if (bIsPeak){
	      if (valC > valOfLargestPeakSoFar){
	        valOfLargestPeakSoFar = valC;
	        indexOfLargestPeakSoFar = index;
	      }
	    }
	  }
	  
	  var distanceToNextLargestPeak = indexOfLargestPeakSoFar - 0;

	  // convert sample count to frequency
	  var fundamentalFrequency = sampleRate() / distanceToNextLargestPeak;
	  return fundamentalFrequency;
	}

}