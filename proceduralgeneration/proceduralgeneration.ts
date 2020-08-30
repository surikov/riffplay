let C = 0, Cs = 1, D = 2, Ds = 3, E = 4, F = 5, Fs = 6, G = 7, Gs = 8, A = 9, As = 10, B = 11;
let O = 12;
let S1 = O * 1 + E;
let S2 = O * 1 + A;
let S3 = O * 2 + D;
let S4 = O * 2 + G;
let S5 = O * 2 + B;
let S6 = O * 3 + E;
let Strings6 = [S1, S2, S3, S4, S5, S6];
//
let BassDrum = 0; //10
let LowTom = 1; //3
let SnareDrum = 2; //7
let MidTom = 3; //3
let ClosedHiHat = 4; //5
let OpenHiHat = 5; //4
let RideCymbal = 6; //7
let SplashCymbal = 7; //7
//
let DistortionGuitar = 0; //8
let AcousticGuitar = 1; //8
let PercussiveOrgan = 2; //8
let PalmMuteGuitar = 3; //8
let AcousticPiano = 4; //6
let BassGuitar = 5; //11
let StringEnsemble = 6; //6
let SynthBass = 7; //8
//
let scaleModeIonian = 'Ionian';//majorC
let scaleModeDorian = 'Dorian';//minorDVI+
let scaleModePhrygian = 'Phrygian';//minorEII-
let scaleModeLydian = 'Lydian';//majorFIV+
let scaleModeMixolydian = 'Mixolydian';//majorGVII-
let scaleModeAeolian = 'Aeolian';//minorA
//
let scaleModeLocrian = 'Locrian'//minorHII-V-;
//
let chordPitchesList: ChordPitches[] = [];
let fretPitchesList: FretKeys[] = [];
//let progressionsList2: ChordRow[] = [];
let chordRiffDefs: ChordRiffDefinition[] = [];
let bassDefs: FullLineDefinition[] = [];
let fullRiffDefs: FullLineDefinition[] = [];
let strumDefs: StrumDefinition[] = [];
let pianoChordDefs: PianoRhythmDefinition[] = [];
let drumsDefs: BeatDefinition[] = [];
let allprogressions: Progression[] = [];

//
type InsBeat = {
	track: number,
	beat: number,
	length: number,
	shift: number,
	pitch: number
};
type DrumBeat = {
	drum: number,
	beat: number
};
type ChordPitches = {
	name: string,
	pitches: number[]
};
type FretKeys = {
	pitch: number;
	name: string;
	frets: number[];
}
type Progression = {
	category: string, name: string, chords: string[]
};
type ChordRow = {
	category: string, name: string, chords: string
};
type ChordDuration = {
	chord: string, len16: number
};
type BeatDefinition = {
	category: string
	, name: string
	, start: {
		len16: number
		, encoded: string
	}
	, end: {
		len16: number
		, encoded: string
	}
};
type PianoRhythmDefinition = {
	category: string
	, name: string
	, start: string
	, end: string
	, track: number
};
type StrumDefinition = {
	category: string
	, name: string
	, start: string
	, end: string
};
type FullLineDefinition = {
	category: string
	, name: string
	, chord: string
	, len16: number
	, encoded: string
};
type ChordRiffDefinition = {
	category: string
	, name: string
	, chord: string
	, start: {
		len16: number

		, encoded: string
	}
	, end: {
		len16: number

		, encoded: string
	}
};
//
let scaleModes: ChordPitches[] = [
	{ name: scaleModeIonian, pitches: [2, 2, 1, 2, 2, 2, 1] }
	, { name: scaleModeDorian, pitches: [2, 1, 2, 2, 2, 1, 2] }
	, { name: scaleModePhrygian, pitches: [1, 2, 2, 2, 1, 2, 2] }
	, { name: scaleModeLydian, pitches: [2, 2, 2, 1, 2, 2, 1] }
	, { name: scaleModeMixolydian, pitches: [2, 2, 1, 2, 2, 1, 2] }
	, { name: scaleModeAeolian, pitches: [2, 1, 2, 2, 1, 2, 2] }
	, { name: scaleModeLocrian, pitches: [1, 2, 2, 1, 2, 2, 2] }
];
function findScaleMode(name: string): number[] {
	if (name == scaleModeIonian) return scaleModes[0].pitches;
	if (name == scaleModeDorian) return scaleModes[1].pitches;
	if (name == scaleModePhrygian) return scaleModes[2].pitches;
	if (name == scaleModeLydian) return scaleModes[3].pitches;
	if (name == scaleModeMixolydian) return scaleModes[4].pitches;
	if (name == scaleModeAeolian) return scaleModes[5].pitches;
	if (name == scaleModeLocrian) return scaleModes[6].pitches;
	return [];
}
function findModePitches(chordName: string): number[] {
	let nameLen = 1;
	let steps: number[] = [];
	let root = -1;
	let a = chordName.substr(0, 1);
	if (a == 'C') {
		root = 0;
	}
	if (a == 'D') {
		root = 2;
	}
	if (a == 'E') {
		root = 4;
	}
	if (a == 'F') {
		root = 5;
	}
	if (a == 'G') {
		root = 7;
	}
	if (a == 'A') {
		root = 9;
	}
	if (a == 'B') {
		root = 11;
	}
	if (chordName.substr(1, 1) == '#') {
		root++;
		nameLen++;
	} else {
		if (chordName.substr(1, 1) == 'b') {
			root--;
			nameLen++;
			if (root < 0) {
				root = root + 12;
			}
		}
	}
	if ((chordName.substr(1, 1) == 'b') || (chordName.substr(1, 1) == '#')) {
		nameLen = 2;
	}
	if (chordName.substr(nameLen, 1) == 'm' && (chordName.substr(nameLen, 3) != 'maj')) {
		steps = findScaleMode(scaleModeAeolian);
	} else {
		steps = findScaleMode(scaleModeIonian);
	}
	let pitches: number[] = [root];
	pitches.push(pitches[pitches.length - 1] + steps[0]);
	pitches.push(pitches[pitches.length - 1] + steps[1]);
	pitches.push(pitches[pitches.length - 1] + steps[2]);
	pitches.push(pitches[pitches.length - 1] + steps[3]);
	pitches.push(pitches[pitches.length - 1] + steps[4]);
	pitches.push(pitches[pitches.length - 1] + steps[5]);
	return pitches;
}
function findFretKeysByName(name: string, chordfrets: FretKeys[]): FretKeys | null {
	for (let i = 0; i < chordfrets.length; i++) {
		let cf = chordfrets[i];
		if (cf.name == name) {
			return cf;
		}
	}
	return null;
}
function findChordPitches(chordName: String, frets: FretKeys[]): number[] {
	for (var i = 0; i < frets.length; i++) {
		if (frets[i].name == chordName) {
			var s: number[] = frets[i].frets;
			let pitches: number[] = [];
			for (var k = 0; k < Strings6.length; k++) {
				if (s[k] < 0) {
					//pitches.push(-1);
				} else {
					pitches.push(Strings6[k] + s[k] - 12);
				}
			}
			return pitches;
		}
	}
	return [-1, -1, -1, -1, -1, -1]
}
function pianoKeysByName(chordName: string, chordPitches: ChordPitches[], trans: number): number[] {
	let retarr: number[] = [];
	let a = chordName.substr(0, 1);
	let start = 1;
	let root = -1;
	if (a == 'C') {
		root = 0;
	}
	if (a == 'D') {
		root = 2;
	}
	if (a == 'E') {
		root = 4;
	}
	if (a == 'F') {
		root = 5;
	}
	if (a == 'G') {
		root = 7;
	}
	if (a == 'A') {
		root = 9;
	}
	if (a == 'B') {
		root = 11;
	}
	if (chordName.substr(1, 1) == '#') {
		root++;
		start++;
	}
	//root = root + 24;
	if (chordName.substr(1, 1) == 'b') {
		root--;
		start++;
	}
	root = root + trans;
	if (root < 0) root = root + 12;
	if (root >= 120) root = root - 12;
	retarr.push(root);
	let chordKind = chordName.substr(start);
	for (var i = 0; i < chordPitches.length; i++) {
		if (chordPitches[i].name == chordKind) {
			for (var p = 0; p < chordPitches[i].pitches.length; p++) {
				retarr.push(root + chordPitches[i].pitches[p]);
			}
			break;
		}
	}
	return retarr;
}
//



/*
function parseDrumStep(data: number) {
	if ((data | parseInt('00000001', 2)) == data) return 0;
	if ((data | parseInt('00000010', 2)) == data) return 1;
	if ((data | parseInt('00000100', 2)) == data) return 2;
	if ((data | parseInt('00001000', 2)) == data) return 3;
	if ((data | parseInt('00010000', 2)) == data) return 4;
	if ((data | parseInt('00100000', 2)) == data) return 5;
	if ((data | parseInt('01000000', 2)) == data) return 6;
	return 7;
}*/
function beatFill(chords: string[], beatDefinition: BeatDefinition): DrumBeat[] {
	//let encodedstart = beatDefinition.start.encoded
	//let len16 = beatDefinition.start.len16;
	//var cnt = encodedstart.length / 4;
	var b: DrumBeat[] = [];
	for (var i = 0; i < beatDefinition.start.encoded.length / 4; i++) {
		var key = parseInt(beatDefinition.start.encoded.substring(i * 4, i * 4 + 2), 16);
		var data = parseInt(beatDefinition.start.encoded.substring(i * 4 + 2, i * 4 + 4), 16);
		var drum = key >> 5;
		var i32 = key & parseInt('11111', 2);
		if ((data | parseInt('00000001', 2)) == data) b.push({ drum: drum, beat: i32 * 8 + 0 });
		if ((data | parseInt('00000010', 2)) == data) b.push({ drum: drum, beat: i32 * 8 + 1 });
		if ((data | parseInt('00000100', 2)) == data) b.push({ drum: drum, beat: i32 * 8 + 2 });
		if ((data | parseInt('00001000', 2)) == data) b.push({ drum: drum, beat: i32 * 8 + 3 });
		if ((data | parseInt('00010000', 2)) == data) b.push({ drum: drum, beat: i32 * 8 + 4 });
		if ((data | parseInt('00100000', 2)) == data) b.push({ drum: drum, beat: i32 * 8 + 5 });
		if ((data | parseInt('01000000', 2)) == data) b.push({ drum: drum, beat: i32 * 8 + 6 });
		if ((data | parseInt('10000000', 2)) == data) b.push({ drum: drum, beat: i32 * 8 + 7 });
	}
	var startbeatdrum: DrumBeat[] = b;
	b = [];
	for (var i = 0; i < beatDefinition.end.encoded.length / 4; i++) {
		var key = parseInt(beatDefinition.end.encoded.substring(i * 4, i * 4 + 2), 16);
		var data = parseInt(beatDefinition.end.encoded.substring(i * 4 + 2, i * 4 + 4), 16);
		var drum = key >> 5;
		var i32 = key & parseInt('11111', 2);
		if ((data | parseInt('00000001', 2)) == data) b.push({ drum: drum, beat: i32 * 8 + 0 });
		if ((data | parseInt('00000010', 2)) == data) b.push({ drum: drum, beat: i32 * 8 + 1 });
		if ((data | parseInt('00000100', 2)) == data) b.push({ drum: drum, beat: i32 * 8 + 2 });
		if ((data | parseInt('00001000', 2)) == data) b.push({ drum: drum, beat: i32 * 8 + 3 });
		if ((data | parseInt('00010000', 2)) == data) b.push({ drum: drum, beat: i32 * 8 + 4 });
		if ((data | parseInt('00100000', 2)) == data) b.push({ drum: drum, beat: i32 * 8 + 5 });
		if ((data | parseInt('01000000', 2)) == data) b.push({ drum: drum, beat: i32 * 8 + 6 });
		if ((data | parseInt('10000000', 2)) == data) b.push({ drum: drum, beat: i32 * 8 + 7 });
	}
	var endbeatdrum: DrumBeat[] = b;
	let step = 0;
	let beats: DrumBeat[] = [];
	var chordCurrent = '';
	for (let i = 0; i < chords.length * 8; i++) {
		//console.log(step);
		if (i < chords.length * 8 - beatDefinition.end.len16) {
			/*var chordName = chords[Math.floor(i / 8)];
			if (chordCurrent != chordName) {
				step = 0;
				chordCurrent = chordName;
			}*/
			//console.log(i, step, chords[Math.floor(i / 8)]);
			for (let k = 0; k < startbeatdrum.length; k++) {
				if (startbeatdrum[k].beat == step) {
					beats.push({ drum: startbeatdrum[k].drum, beat: i });
				}
			}
			step++;
			if (step >= beatDefinition.start.len16) { step = 0; }
		} else {
			var r = i - (chords.length * 8 - beatDefinition.end.len16);
			for (let k = 0; k < endbeatdrum.length; k++) {
				if (endbeatdrum[k].beat == r) {
					beats.push({ drum: endbeatdrum[k].drum, beat: i });
				}
			}
		}
	}
	return beats;
}
/*
function addViola(at: number, to: InsBeat[], current: ChordDuration, chordPitches: ChordPitches[]) {
	let pitches = pianoKeysByName(current.chord, chordPitches);
	for (let k = 0; k < pitches.length; k++) {
		to.push({
			track: 6,
			beat: at,
			length: current.len16,
			shift: 0,
			pitch: pitches[k]
		});
	}
}
function composeViola(chords: string[], chordPitches: ChordPitches[]): InsBeat[] {
	let beats: InsBeat[] = [];
	let durations: ChordDuration[] = chordDurations(chords);
	let nn = 0;
	for (let i = 0; i < durations.length; i++) {
		let current: ChordDuration = durations[i];
		addViola(nn, beats, current, chordPitches);
		nn = nn + current.len16;
	}
	return beats;
}*/
function chordDurations(chords: string[]): ChordDuration[] {
	let durations: { len16: number, chord: string }[] = [];
	let curChord = '';
	for (let i = 0; i < chords.length; i++) {
		if (chords[i] == curChord) {
			if (durations.length > 0) {
				durations[durations.length - 1].len16 = durations[durations.length - 1].len16 + 8;
			}
		} else {
			durations.push({ len16: 8, chord: chords[i] });
			curChord = chords[i];
		}
	}
	return durations;

}
function morphPitch(pitch: number, fromMode: number[], toMode: number[], needRepitch: boolean): number {

	let base = (pitch + 12 - fromMode[0]) % 12;
	let octave = Math.floor((pitch - toMode[0]) / 12);
	let step = 0;
	//let shift = 0;
	for (let i = 0; i < fromMode.length; i++) {
		if (fromMode[i] > base + fromMode[0]) {
			break;
		}
		step = i;
		//shift=fromMode[i] - base + fromMode[0];
	}
	//let toneDiff=toMode[0]-fromMode[0];
	//let stepDiff=toMode[step]-fromMode[step]
	//let morphed = pitch + (toMode[0] - fromMode[0]) + ((fromMode[step]-fromMode[0]) - (toMode[step]-toMode[0]));
	//if (toMode[0] >= 4) pitch = pitch - 12;//E
	//let morphed = repitch(pitch + (toMode[step] - fromMode[step]));
	//let morphed = 12 + pitch + (toMode[step] - fromMode[step]);
	//let morphed = 12 *octave + toMode[step];
	let morphed = pitch + (toMode[step] - fromMode[step]);
	//console.log(base, step,':',pitch,  fromMode,'=>', morphed, toMode);
	//if (toMode[0] < 4) morphed = morphed + 12;
	//let morphed = pitch+(toMode[step] - fromMode[step]);
	//if(fromMode[0]<toMode[0]){

	//}
	if (needRepitch) {
		morphed = repitch(toMode[0], morphed);
	}
	if (morphed < 0) morphed = morphed + 12;
	if (morphed >= 120) morphed = morphed - 12;
	//console.log(base, step,':',pitch,  fromMode,'=>', morphed, toMode);
	return morphed;
}
function repitch(to: number, pitch: number): number {
	/*while (pitch < 4) {
		pitch = pitch + 12;
	}*/
	//if(to<4)pitch = pitch + 12;
	//pitch = pitch + 12;
	//if (to <= 4) pitch = pitch + 12;//E
	//if(to<4)pitch = pitch + 12;
	pitch = pitch + 12;
	if (to >= 4) pitch = pitch - 12;
	if (pitch < 4) pitch = pitch + 12;
	//console.log(pitch);
	return pitch;
}
function addMelody(at: number, to: InsBeat[], current: ChordDuration, melody: ChordRiffDefinition) {
	//console.log(current.chord,melody.start.chord);
	let toMode: number[] = findModePitches(current.chord);
	//console.log(toMode);
	let fromMode: number[] = findModePitches(melody.chord);
	let start: InsBeat[] = parseMelody(melody.start.encoded);
	let end: InsBeat[] = parseMelody(melody.end.encoded);
	let step = 0;
	for (let i = 0; i < current.len16; i++) {
		if ((i < current.len16 - melody.end.len16) || (melody.end.len16 >= current.len16)) {
			for (let k = 0; k < start.length; k++) {
				let note = start[k];
				if (note.beat == step) {
					let len16 = note.length;
					if (note.beat + len16 >= start.length) {
						len16 = start.length - note.beat;
					}
					to.push({
						track: note.track
						, beat: at + i
						, length: note.length
						, shift: note.shift
						, pitch: morphPitch(note.pitch, fromMode, toMode, false)
					});
				}
			}
			step++;
			if (step >= melody.start.len16) {
				step = 0;
			}
		} else {
			for (let k = 0; k < end.length; k++) {
				let note = end[k];
				if (note.beat == i - (current.len16 - melody.end.len16)) {
					let len16 = note.length;
					if (note.beat + len16 >= end.length) {
						len16 = end.length - note.beat;
					}
					to.push({
						track: note.track
						, beat: at + i
						, length: note.length
						, shift: note.shift
						, pitch: morphPitch(note.pitch, fromMode, toMode, false)
					});
				}
			}
		}
	}
}
function composeChordRiffs(chords: string[], melody: ChordRiffDefinition): InsBeat[] {
	let beats: InsBeat[] = [];
	let durations: ChordDuration[] = chordDurations(chords);
	let nn = 0;
	for (let i = 0; i < durations.length; i++) {
		let current: ChordDuration = durations[i];
		addMelody(nn, beats, current, melody);
		nn = nn + current.len16;
	}
	//console.log(beats);
	return beats;
}
function composeFullLine(chords: string[], fullLine: FullLineDefinition, needRepitch: boolean): InsBeat[] {
	let beats: InsBeat[] = [];

	//console.log(toMode);
	let fromMode: number[] = findModePitches(fullLine.chord);
	let line: InsBeat[] = parseMelody(fullLine.encoded);
	//console.log(line);
	let step = 0;
	for (let ch = 0; ch < chords.length; ch++) {
		let curChord = chords[ch];
		let toMode: number[] = findModePitches(curChord);
		for (let s = 0; s < 8; s++) {
			for (let k = 0; k < line.length; k++) {
				if (line[k].beat == step) {
					beats.push({
						track: line[k].track
						, beat: ch * 8 + s
						, length: line[k].length
						, shift: line[k].shift
						, pitch: morphPitch(line[k].pitch, fromMode, toMode, needRepitch)
					});
				}
			}
			step++;
			if (step >= fullLine.len16) {
				step = 0;
			}
		}
	}
	//console.log(beats);
	return beats;
}

function composePianoRhythm(chords: string[], rhythm: PianoRhythmDefinition, chordPitches: ChordPitches[], track: number): InsBeat[] {
	let beats: InsBeat[] = [];
	var part = [];
	let curChord = '';
	for (let i = 0; i < chords.length; i++) {
		if (chords[i] == curChord) {
			part.push(chords[i]);
		} else {
			if (part.length > 0) {
				addPartRhythm((i - part.length) * 8, part[0], part.length * 8, rhythm, beats, chordPitches, track);
			}
			part = [];
			curChord = chords[i];
			part.push(chords[i]);

		}
	}
	addPartRhythm((chords.length - part.length) * 8, part[0], part.length * 8, rhythm, beats, chordPitches, track);
	return beats;
}
function addPartRhythm(stepshift: number, chordCurrent: string, len16: number, rhythm: StrumDefinition, tobeats: InsBeat[], chordPitches: ChordPitches[], track: number) {
	//console.log(step, chord, len16);
	let step = 0;
	var durationStrum: { nn: number, strumKind: string, len16: number, chord: string }[] = [];
	for (let i = 0; i < len16; i++) {
		if ((i < len16 - rhythm.end.length) || (rhythm.end.length >= len16)) {
			let strumKind = rhythm.start.substr(step, 1);
			if (strumKind == '.') {
				//
			} else {
				if (strumKind == '-') {
					if (durationStrum.length) {
						//if (durationStrum[durationStrum.length - 1].strumKind != 'X') {
						durationStrum[durationStrum.length - 1].len16++;
						//}
					}
				} else {
					durationStrum.push({ nn: i, strumKind: strumKind, len16: 1, chord: chordCurrent });
				}
			}
			step++;
			if (step >= rhythm.start.length) {
				step = 0;
			}
		} else {
			var r = i - (len16 - rhythm.end.length);
			let strumKind = rhythm.end.substr(r, 1);
			if (strumKind == '.') {
				//
			} else {
				if (strumKind == '-') {
					if (durationStrum.length) {

						durationStrum[durationStrum.length - 1].len16++;

					}
				} else {
					durationStrum.push({ nn: i, strumKind: strumKind, len16: 1, chord: chordCurrent });
				}
			}

		}
	}
	for (let i = 0; i < durationStrum.length; i++) {
		let strike = durationStrum[i];
		let trans = 12 * Number(strike.strumKind);
		let pitches = pianoKeysByName(strike.chord, chordPitches, trans);
		//let pitches: number[] = findChordPitches(b.chord, chordfrets);
		for (let k = 0; k < pitches.length; k++) {
			//if (!(b.strumKind == 'A' && k == 0)) {
			//if (!(b.strumKind == 'V' && k == pitches.length - 1)) {
			tobeats.push({
				track: track,
				beat: stepshift + strike.nn,
				length: strike.len16,
				shift: 0,
				pitch: pitches[k]
			});
			//}
			//}
		}
	}
}
function composeGuitarStrum(chords: string[], strums: StrumDefinition, chordFrets: FretKeys[]): InsBeat[] {
	let beats: InsBeat[] = [];

	var part = [];
	let curChord = '';

	for (let i = 0; i < chords.length; i++) {
		//console.log(i,curChord,chords[i]);
		if (chords[i] == curChord) {
			part.push(chords[i]);
		} else {
			if (part.length > 0) {
				//console.log(':',part.length,curChord,part);
				addPartGuitar((i - part.length) * 8, part[0], part.length * 8, strums, beats, chordFrets);
			}
			part = [];
			curChord = chords[i];
			part.push(chords[i]);

		}
	}
	//console.log(':',part.length,curChord,part);
	addPartGuitar((chords.length - part.length) * 8, part[0], part.length * 8, strums, beats, chordFrets);
	return beats;
}
function addPartGuitar(stepshift: number, chordCurrent: string, len16: number, strums: StrumDefinition, beats: InsBeat[], chordfrets: FretKeys[]) {
	//console.log(step, chord, len16);
	let step = 0;
	var durationStrum: { nn: number, strumKind: string, len16: number, chord: string }[] = [];
	for (let i = 0; i < len16; i++) {
		//if (i < len16 - strums.end.length) {
		if ((i < len16 - strums.end.length) || (strums.end.length >= len16)) {
			let strumKind = strums.start.substr(step, 1);
			if (strumKind == '.') {
				//
			} else {
				if (strumKind == '-') {
					if (durationStrum.length) {
						if (durationStrum[durationStrum.length - 1].strumKind != 'X') {
							durationStrum[durationStrum.length - 1].len16++;
						}
					}
				} else {
					durationStrum.push({ nn: i, strumKind: strumKind, len16: 1, chord: chordCurrent });
				}
			}
			step++;
			if (step >= strums.start.length) {
				step = 0;
			}
		} else {
			var r = i - (len16 - strums.end.length);
			let strumKind = strums.end.substr(r, 1);
			if (strumKind == '.') {
				//
			} else {
				if (strumKind == '-') {
					if (durationStrum.length) {
						if (durationStrum[durationStrum.length - 1].strumKind != 'X') {
							durationStrum[durationStrum.length - 1].len16++;
						}
					}
				} else {
					durationStrum.push({ nn: i, strumKind: strumKind, len16: 1, chord: chordCurrent });
				}
			}

		}
	}
	for (let i = 0; i < durationStrum.length; i++) {
		let b = durationStrum[i];
		let pitches: number[] = findChordPitches(b.chord, chordfrets);
		//console.log(b.chord,pitches);
		for (let k = 0; k < pitches.length; k++) {
			if (
				(b.strumKind == 'A' && k > 0)
				|| (b.strumKind == 'V' && k < pitches.length - 1)
				|| (b.strumKind == 'X' && k >2)
			) {
				//if (!(b.strumKind == 'A' && k == 0)) {
				//if (pitches[k] > -1 && (!(b.strumKind == 'V' && k == pitches.length - 1))) {
				beats.push({
					track: 1,
					beat: stepshift + b.nn,
					length: b.len16,
					shift: 0,
					pitch: pitches[k]
				});
				//}
			}
		}
	}
}
function parseMelody(encoded: string): InsBeat[] {
	//console.log(encoded);
	let beats: InsBeat[] = [];
	let cnt = encoded.length / 9;
	for (var i = 0; i < cnt; i++) {
		beats.push({
			track: parseInt(encoded.substring(i * 9 + 2, i * 9 + 2 + 1), 16)
			, beat: parseInt(encoded.substring(i * 9, i * 9 + 2), 16)
			, length: parseInt(encoded.substring(i * 9 + 3, i * 9 + 3 + 2), 16)
			, shift: parseInt(encoded.substring(i * 9 + 7, i * 9 + 7 + 2), 16) - 64
			, pitch: parseInt(encoded.substring(i * 9 + 5, i * 9 + 5 + 2), 16)
		});
	}
	return beats;
}
function existsdDrum(drums: DrumBeat[], single: DrumBeat): boolean {
	for (var i = 0; i < drums.length; i++) {
		var d: DrumBeat = drums[i];
		if (d.beat == single.beat && d.drum == single.drum) {
			return true;
		}
	}
	return false;
}
function existsIns(instrs: InsBeat[], single: InsBeat): boolean {
	for (var i = 0; i < instrs.length; i++) {
		var a: InsBeat = instrs[i];
		if (a.beat == single.beat && a.pitch == single.pitch && a.track == single.track) {
			return true;
		}
	}
	return false;
}
function stripDrums(drums: DrumBeat[]): DrumBeat[] {
	let r: DrumBeat[] = [];
	for (var i = 0; i < drums.length; i++) {
		var single: DrumBeat = drums[i];
		//console.log(single);
		if (!existsdDrum(r, single)) {
			r.push(single);
		} else {
			console.log('skip');
		}
	}
	//console.log(r,drums);
	return r;
}
function repeatChords(chords: string[], sub: number): string[] {
	var row: string[] = [];
	var nums: number[] = [];
	//var seed = Math.random();
	if (chords.length == 2) {
		if (sub < 0.5) nums = nums = [0, 0, 0, 0, 1, 1, 1, 1];
		else nums = [0, 0, 1, 1, 0, 0, 1, 1];
	}
	if (chords.length == 3) {
		if (sub < 0.5) nums = [0, 0, 0, 0, 1, 1, 2, 2];
		else nums = [0, 0, 1, 1, 2, 2, 2, 2];
	}
	if (chords.length == 4) {
		if (sub < 0.5) nums = [0, 0, 1, 1, 2, 2, 3, 3];
		else nums = [0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3];
	}
	if (chords.length == 5) {
		if (sub < 0.5) nums = [0, 0, 1, 1, 2, 2, 3, 4];
		else nums = [0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 4, 4];
	}
	if (chords.length == 6) {
		if (sub < 0.5) nums = [0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5];
		else nums = [0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5];
	}
	if (chords.length == 7) {
		if (sub < 0.5) nums = [0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 6, 6];
		else nums = [0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6];
	}
	if (chords.length == 8) {
		if (sub < 0.5) nums = [0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7];
		else nums = [0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7];
	}
	if (chords.length == 9) {
		if (sub < 0.5) nums = [0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 8];
		else nums = [0, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8];
	}
	for (let i = 0; i < nums.length; i++) {
		row.push(chords[nums[i]]);
	}
	return row;
}
function stripTracks(instrs: InsBeat[]): InsBeat[] {
	let r: InsBeat[] = [];
	for (var i = 0; i < instrs.length; i++) {
		var single: InsBeat = instrs[i];
		if (!existsIns(r, single)) {
			r.push(single);
		}
	}
	return r;
}
function replaceTracks(instrs: InsBeat[], from: number, to: number): void {
	let r: InsBeat[] = [];
	for (var i = 0; i < instrs.length; i++) {
		var single: InsBeat = instrs[i];
		if (single.track == from) {
			single.track = to;
		}
	}
}
function composeURL(chordPitches: ChordPitches[], chordfrets: FretKeys[]) {
	//let prognum = Math.floor(progressionsList.length * Math.random());
	let nn = Number((document.getElementById('sliderProgression') as any).value);
	let prognum = '' + (Math.floor(allprogressions.length * nn / 1000));
	//prognum=0;
	let progression: Progression = allprogressions[prognum];
	//let chordRow: ChordRow = progressionsList[prognum];
	//var arr: string[] = chordRow.chords.split('-');
	//var chords: string[] = repeatChords(arr);
	//let progression: Progression = { category: chordRow.category, name: chordRow.name, chords: chords };
	//console.log(progression);

	//let drumseed = Math.floor(beatsDefs.length * Math.random());
	nn = Number((document.getElementById('sliderDrum') as any).value);
	let drumseed = '' + (Math.floor(drumsDefs.length * nn / 1000));
	let drumData: DrumBeat[] = beatFill(progression.chords, drumsDefs[drumseed]);
	//let gitStrumData: InsBeat[] = composeGuitarStrum(progression.chords, strumDefs[0],chordfrets);
	//let pianoRhythmData: InsBeat[] = composePianoRhythm(progression.chords, rhythmDefs[0],chordPitches);
	//let melodyData: InsBeat[] = composeMelody(progression.chords, melodyDefs[0]);
	//let viData: InsBeat[] = composeViola(progression.chords, chordPitches);
	nn = Number((document.getElementById('sliderStrum') as any).value);
	let strumseed = Math.floor(strumDefs.length * nn / 1000);
	nn = Number((document.getElementById('sliderBass') as any).value);
	let bassseed = Math.floor(bassDefs.length * nn / 1000);
	nn = Number((document.getElementById('sliderRhythm') as any).value);
	let rhythmseed = Math.floor(pianoChordDefs.length * nn / 1000);
	nn = Number((document.getElementById('sliderSolo') as any).value);
	let soloseed = Math.floor(fullRiffDefs.length * nn / 1000);
	nn = Number((document.getElementById('sliderMelody') as any).value);
	let melodyseed = Math.floor(chordRiffDefs.length * nn / 1000);
	//nn = Number((document.getElementById('sliderTempo') as any).value);
	//let temposeed = Math.floor(3*nn/1000);
	let tempo = 120;
	//if(temposeed==0)tempo = 100;
	//if(temposeed==2)tempo = 140;
	let tracksData: InsBeat[] = [];
	if (strumDefs[strumseed].start.length) {
		let t: InsBeat[] = composeGuitarStrum(progression.chords, strumDefs[strumseed], chordfrets);
		//console.log(t);
		tracksData = tracksData.concat(t);
	}
	if (pianoChordDefs[rhythmseed].start.length) {
		let t: InsBeat[] = composePianoRhythm(progression.chords, pianoChordDefs[rhythmseed], chordPitches, pianoChordDefs[rhythmseed].track);
		tracksData = tracksData.concat(t);
	}
	if (chordRiffDefs[melodyseed].start.len16) {
		let t: InsBeat[] = composeChordRiffs(progression.chords, chordRiffDefs[melodyseed]);
		tracksData = tracksData.concat(t);
	}
	if (bassDefs[bassseed].len16) {
		let t: InsBeat[] = composeFullLine(progression.chords, bassDefs[bassseed], true);
		//replaceTracks(t,5,7);
		tracksData = tracksData.concat(t);
	}
	if (fullRiffDefs[soloseed].len16) {
		let t: InsBeat[] = composeFullLine(progression.chords, fullRiffDefs[soloseed], false);
		//replaceTracks(t,5,7);
		tracksData = tracksData.concat(t);
	}

	//console.log(parseMelody(melodydefs[0].start.encoded));

	var drumVolumes = [4, 4, 6, 4, 6, 3, 6, 4];
	var insVolumes = [3, 3, 4, 3, 4, 7, 5, 7];
	insVolumes[DistortionGuitar] = 3;
	insVolumes[AcousticGuitar] = 4;
	insVolumes[PercussiveOrgan] = 3;
	insVolumes[PalmMuteGuitar] = 3;
	insVolumes[AcousticPiano] = 7;
	insVolumes[BassGuitar] = 5;
	insVolumes[StringEnsemble] = 3;
	insVolumes[SynthBass] = 6;
	var eqVolumes = [13, 12, 12, 10, 8, 9, 13, 14, 9, 12];
	//let url = (window as any).encodeRiffURL(tempo, drumData, gitStrumData.concat(viData.concat(pianoRhythmData.concat(melodyData))), drumVolumes, insVolumes, eqVolumes);

	drumData = stripDrums(drumData);
	tracksData = stripTracks(tracksData);
	let url = (window as any).encodeRiffURL(tempo, drumData, tracksData, drumVolumes, insVolumes, eqVolumes);
	window.open(url);
}
//
function initApp() {
	console.log('initApp');
	//console.log(chordPitches, chordPitches);
	composeURL(chordPitchesList, fretPitchesList);
}
function parsChanged() {
	//console.log('drum',(document.getElementById('sliderDrum') as any).value);
	//console.log('bass',(document.getElementById('sliderBass') as any).value);
	let nn: number = Number((document.getElementById('sliderDrum') as any).value);
	(document.getElementById('infoDrum') as any).innerHTML = '' + (Math.floor(drumsDefs.length * nn / 1000))
		+ ': ' + drumsDefs[(Math.floor(drumsDefs.length * nn / 1000))].name
		;
	nn = Number((document.getElementById('sliderBass') as any).value);
	(document.getElementById('infoBass') as any).innerHTML = '' + (Math.floor(bassDefs.length * nn / 1000))
		+ ': ' + bassDefs[(Math.floor(bassDefs.length * nn / 1000))].name
		;
	nn = Number((document.getElementById('sliderProgression') as any).value);
	(document.getElementById('infoProgression') as any).innerHTML = '' + (Math.floor(allprogressions.length * nn / 1000))
		+ ': ' + allprogressions[(Math.floor(allprogressions.length * nn / 1000))].category
		+ ': ' + allprogressions[(Math.floor(allprogressions.length * nn / 1000))].chords
		;
	nn = Number((document.getElementById('sliderStrum') as any).value);
	(document.getElementById('infoStrum') as any).innerHTML = '' + (Math.floor(strumDefs.length * nn / 1000))
		+ ': ' + strumDefs[(Math.floor(strumDefs.length * nn / 1000))].name
		;
	nn = Number((document.getElementById('sliderRhythm') as any).value);
	(document.getElementById('infoRhythm') as any).innerHTML = '' + (Math.floor(pianoChordDefs.length * nn / 1000))
		+ ': ' + pianoChordDefs[(Math.floor(pianoChordDefs.length * nn / 1000))].name
		;
	nn = Number((document.getElementById('sliderSolo') as any).value);
	(document.getElementById('infoSolo') as any).innerHTML = '' + (Math.floor(fullRiffDefs.length * nn / 1000))
		+ ': ' + fullRiffDefs[(Math.floor(fullRiffDefs.length * nn / 1000))].name
		;
	nn = Number((document.getElementById('sliderMelody') as any).value);
	(document.getElementById('infoMelody') as any).innerHTML = '' + (Math.floor(chordRiffDefs.length * nn / 1000))
		+ ': ' + chordRiffDefs[(Math.floor(chordRiffDefs.length * nn / 1000))].name
		;
	//nn = Number((document.getElementById('sliderTempo') as any).value);
	//(document.getElementById('infoTempo') as any).innerHTML = '' + (Math.floor(3*nn/1000));
}

document.getElementById('proceduralgeneration').onclick = initApp;
(document.getElementById('sliderDrum') as any).value = 0;//Math.floor(Math.random() * 1000);
(document.getElementById('sliderBass') as any).value = 0;//Math.floor(Math.random() * 1000);
(document.getElementById('sliderProgression') as any).value = 0;//Math.floor(Math.random() * 1000);
(document.getElementById('sliderStrum') as any).value = 0;//Math.floor(Math.random() * 1000);
(document.getElementById('sliderRhythm') as any).value = 0;//Math.floor(Math.random() * 1000);
(document.getElementById('sliderSolo') as any).value = 0;//Math.floor(Math.random() * 1000);
(document.getElementById('sliderMelody') as any).value = 0;//Math.floor(Math.random() * 1000);
//(document.getElementById('sliderTempo') as any).value = Math.floor(Math.random() * 1000);

console.log('proceduralgeneration v1.02');


