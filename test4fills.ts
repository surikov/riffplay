function renum(n: number, r: NumReplacement[]): number {
	for (let i = 0; i < r.length; i++) {
		if (r[i].original == n) {
			return r[i].to;
		}
	}
	return n;
}
function fillDrums(startPattern: DrumPattern, mainPattern: DrumPattern, endPattern: DrumPattern, first: number, last: number /*, nn: number*/): DrumBeat[]{
	let r: DrumBeat[] = [];
	let fillLength = last - first + 1;
	for (let i = 0; i < fillLength; i++) {
		let stepOfPattern = i % mainPattern.duration;
		let patternInStep: DrumPattern = mainPattern;
		if (i < startPattern.duration) {
			patternInStep = startPattern;
			stepOfPattern = i;
		} else {
			if (i >= fillLength - endPattern.duration) {
				patternInStep = endPattern;
				stepOfPattern = i - (fillLength - endPattern.duration);
			}
		}
		for (let t = 0; t < patternInStep.beats.length; t++) {
			if (patternInStep.beats[t].beat == stepOfPattern) {
				r.push({
					beat: i + first,
					drum: patternInStep.beats[t].drum
				});
			}
		}
	}
	return r;
}
function fillGuitar(startPattern: InsPattern, mainPattern: InsPattern, endPattern: InsPattern
		, first: number, last: number
		, progression: ChordSegment[], trackNum
		//, repitch: (chordName:string,pitch:number,step:number,progression:ChordSegment[]) => number
		, repitch: (fromChordName:string,pitch:number,toChordName) => number
		): InsBeat[]{
	let result: InsBeat[] = [];
	let notEnd: boolean = true;
	let fillLength = last - first + 1;
	for (let i = 0; i < fillLength; i++) {
		let stepOfPattern = i % mainPattern.duration;
		let patternInStep: InsPattern = mainPattern;
		if (i < startPattern.duration) {
			patternInStep = startPattern;
			stepOfPattern = i;
		} else {
			if (i >= fillLength - endPattern.duration) {
				patternInStep = endPattern;
				stepOfPattern = i - (fillLength - endPattern.duration);
				notEnd = false;
			} else {
				//
			}
		}
		for (let t = 0; t < patternInStep.beats.length; t++) {
			if (patternInStep.beats[t].beat == stepOfPattern) {
				var len = patternInStep.beats[t].length;
				if (len + stepOfPattern >= patternInStep.duration)
					len = patternInStep.duration - stepOfPattern;
				if (notEnd) {
					if (i + len >= fillLength - endPattern.duration) {
						len = fillLength - endPattern.duration - i
					}
				}
				if (len < 1) {
					len = 1;
				}
				//var pitch = findProgPitchByChord(patternInStep.chordName, patternInStep.beats[t].pitch, i + first, progression);
				//let progressionChordName=findProgChordInStep(i + first,progression);
				//var pitch = repitch(patternInStep.chordName, patternInStep.beats[t].pitch, i + first, progression);
				let progChordName=findProgChordInStep(i + first,progression);
				var pitch = repitch(patternInStep.chordName, patternInStep.beats[t].pitch, progChordName);
				if (pitch > -1) {
					result.push({
						track: trackNum,
						beat: i + first,
						length: len,
						shift: patternInStep.beats[t].shift,
						pitch: pitch
					});
				}

			}
		}
	}
	return result;
}

