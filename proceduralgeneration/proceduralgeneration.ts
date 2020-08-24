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
let progressionsList: Progression[] = [];
let melodyDefs: MelodyDefinition[] = [];
let bassDefs: BassDefinition[] = [];
let strumDefs: StrumDefinition[] = [];
let rhythmDefs: RhythmDefinition[] = [];
let beatsDefs: BeatDefinition[] = [];

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
type RhythmDefinition = {
	category: string
	, name: string
	, start: string
	, end: string
};
type StrumDefinition = {
	category: string
	, name: string
	, start: string
	, end: string
};
type BassDefinition = {
	category: string
	, name: string
	, chord: string
	, len16: number
	, encoded: string
};
type MelodyDefinition = {
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
function pianoKeysByName(chordName: string, chordPitches: ChordPitches[]): number[] {
	let r: number[] = [];
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
	root = root + 24;
	if (chordName.substr(1, 1) == 'b') {
		root--;
		if (root < 0)
			root = root - 12;
		start++;
	}
	r.push(root);
	let chordKind = chordName.substr(start);
	for (var i = 0; i < chordPitches.length; i++) {
		if (chordPitches[i].name == chordKind) {
			for (var p = 0; p < chordPitches[i].pitches.length; p++) {
				r.push(root + chordPitches[i].pitches[p]);
			}
			break;
		}
	}
	return r;
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
		if (i < chords.length * 8 - beatDefinition.end.len16) {
			var chordName = chords[Math.floor(i / 8)];
			if (chordCurrent != chordName) {
				step = 0;
				chordCurrent = chordName;
			}
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
}
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
function morphPitch(pitch: number, fromMode: number[], toMode: number[],needRepitch:boolean): number {
	let base = (pitch + 12 - fromMode[0]) % 12;
	let step = 0;
	for (let i = 0; i < fromMode.length; i++) {
		if (fromMode[i] > base + fromMode[0]) {
			break;
		}
		step = i;
	}
	//let toneDiff=toMode[0]-fromMode[0];
	//let stepDiff=toMode[step]-fromMode[step]
	//let morphed = pitch + (toMode[0] - fromMode[0]) + ((fromMode[step]-fromMode[0]) - (toMode[step]-toMode[0]));
	if (toMode[0] >= 4) pitch = pitch - 12;//E
	//let morphed = repitch(pitch + (toMode[step] - fromMode[step]));
	let morphed =12+ pitch + (toMode[step] - fromMode[step]);
	if(needRepitch){
		//morphed= repitch(morphed);
	}
	if(morphed<0)morphed=morphed+12;
	if(morphed>=120)morphed=morphed-12;
	//console.log(pitch, morphed, base, step, toMode, fromMode);
	return morphed;
}
function repitch(pitch: number): number {
	while (pitch < 4) {
		pitch = pitch + 12;
	}
	return pitch;
}
function addMelody(at: number, to: InsBeat[], current: ChordDuration, melody: MelodyDefinition) {
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
						, pitch: morphPitch(note.pitch, fromMode, toMode,false)
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
						, pitch: morphPitch(note.pitch, fromMode, toMode,false)
					});
				}
			}
		}
	}
}
function composeMelody(chords: string[], melody: MelodyDefinition): InsBeat[] {
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
function composeBass(chords: string[], bass: BassDefinition): InsBeat[] {
	let beats: InsBeat[] = [];
	
	//console.log(toMode);
	let fromMode: number[] = findModePitches(bass.chord);
	let line: InsBeat[] = parseMelody(bass.encoded);
	let step = 0;
	for (let ch = 0; ch < chords.length; ch++) {
		let curChord = chords[ch];
		let toMode: number[] = findModePitches(curChord);
		for (let s = 0; s < 8; s++) {
			for(let k=0;k<line.length;k++){
				if(line[k].beat==step){
					beats.push({
						track: line[k].track
						, beat: ch*8+s
						, length: line[k].length
						, shift: line[k].shift
						, pitch: morphPitch(line[k].pitch, fromMode, toMode,true)
					});
				}
			}
			step++;
			if (step >= bass.len16) {
				step = 0;
			}
		}
	}
	return beats;
}

function composePianoRhythm(chords: string[], rhythm: RhythmDefinition, chordPitches: ChordPitches[]): InsBeat[] {
	let beats: InsBeat[] = [];
	var part = [];
	let curChord = '';
	for (let i = 0; i < chords.length; i++) {
		if (chords[i] == curChord) {
			part.push(chords[i]);
		} else {
			if (part.length > 0) {
				addPartRhythm((i - part.length) * 8, part[0], part.length * 8, rhythm, beats, chordPitches);
			}
			part = [];
			curChord = chords[i];
			part.push(chords[i]);

		}
	}
	addPartRhythm((chords.length - part.length) * 8, part[0], part.length * 8, rhythm, beats, chordPitches);
	return beats;
}
function addPartRhythm(stepshift: number, chordCurrent: string, len16: number, rhythm: StrumDefinition, beats: InsBeat[], chordPitches: ChordPitches[]) {
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
						if (durationStrum[durationStrum.length - 1].strumKind != 'X') {
							durationStrum[durationStrum.length - 1].len16++;
						}
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
		let b = durationStrum[i];
		let pitches = pianoKeysByName(b.chord, chordPitches);
		//let pitches: number[] = findChordPitches(b.chord, chordfrets);
		for (let k = 0; k < pitches.length; k++) {
			//if (!(b.strumKind == 'A' && k == 0)) {
			//if (!(b.strumKind == 'V' && k == pitches.length - 1)) {
			beats.push({
				track: 4,
				beat: stepshift + b.nn,
				length: b.len16,
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
		for (let k = 0; k < pitches.length; k++) {
			if (!(b.strumKind == 'A' && k == 0)) {
				if (!(b.strumKind == 'V' && k == pitches.length - 1)) {
					beats.push({
						track: 1,
						beat: stepshift + b.nn,
						length: b.len16,
						shift: 0,
						pitch: pitches[k]
					});
				}
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

function composeURL(chordPitches: ChordPitches[], chordfrets: FretKeys[]) {
	let prognum=Math.floor(progressionsList.length*Math.random());
	let progression: Progression = progressionsList[prognum];
	let tempo = 120;
	let drumData: DrumBeat[] = beatFill(progression.chords, beatsDefs[0]);
	//let gitStrumData: InsBeat[] = composeGuitarStrum(progression.chords, strumDefs[0],chordfrets);
	//let pianoRhythmData: InsBeat[] = composePianoRhythm(progression.chords, rhythmDefs[0],chordPitches);
	//let melodyData: InsBeat[] = composeMelody(progression.chords, melodyDefs[0]);
	//let viData: InsBeat[] = composeViola(progression.chords, chordPitches);
	let tracksData: InsBeat[] = [];
	if (strumDefs[0].start.length) {
		let t: InsBeat[] = composeGuitarStrum(progression.chords, strumDefs[0], chordfrets);
		tracksData = tracksData.concat(t);
	}
	if (rhythmDefs[0].start.length) {
		let t: InsBeat[] = composePianoRhythm(progression.chords, rhythmDefs[0], chordPitches);
		tracksData = tracksData.concat(t);
	}
	if (melodyDefs[0].start.len16) {
		let t: InsBeat[] = composeMelody(progression.chords, melodyDefs[0]);
		tracksData = tracksData.concat(t);
	}
	if (bassDefs[0].len16) {
		let t: InsBeat[] = composeBass(progression.chords, bassDefs[0]);
		tracksData = tracksData.concat(t);
	}

	//console.log(parseMelody(melodydefs[0].start.encoded));

	var drumVolumes = [4, 4, 6, 4, 6, 3, 6, 6];
	var insVolumes = [7, 3, 4, 7, 4, 7, 5, 7];
	var eqVolumes = [13, 12, 12, 10, 8, 9, 13, 14, 9, 12];
	//let url = (window as any).encodeRiffURL(tempo, drumData, gitStrumData.concat(viData.concat(pianoRhythmData.concat(melodyData))), drumVolumes, insVolumes, eqVolumes);
	let url = (window as any).encodeRiffURL(tempo, drumData, tracksData, drumVolumes, insVolumes, eqVolumes);
	window.open(url);
}
//
function initApp() {
	console.log('initApp');
	//console.log(chordPitches, chordPitches);
	composeURL(chordPitchesList, fretPitchesList);
}
document.getElementById('proceduralgeneration').onclick = initApp;
console.log('proceduralgeneration v1.01');


