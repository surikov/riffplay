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
type StrumDefinition = {
	category: string
	, name: string
	, start: string
	, end: string
};
//
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
let strumdefs: StrumDefinition[] = [
	{
		category: '', name: ''
		, start: 'VV------------------------------'
		, end: 'A-'
	}, {
		category: '', name: ''
		, start: 'V---A-V---A-V-A-'
		, end: 'X...X...V-A-V-A-'
	}
];
let beatsdefs: BeatDefinition[] = [
	{
		category: '', name: ''
		, start: { len16: 8 * 2, encoded: '0001010540104110a011a111' }
		, end: { len16: 8 * 2, encoded: '0089010440104175a011a111' }
	}
];

let chordPitches: ChordPitches[] = [];
let chordfrets: FretKeys[] = [];
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
function composeViola(chords: string[], chordPitches: ChordPitches[]): InsBeat[] {
	let beats: InsBeat[] = [];
	let nn = 0;
	for (let i = 0; i < chords.length; i++) {
		let chord = chords[i];
		let pitches = pianoKeysByName(chord, chordPitches);
		for (let k = 0; k < pitches.length; k++) {
			let pitch = pitches[k];

			beats.push({
				track: 6,
				beat: nn,
				length: 8,
				shift: 0,
				pitch: pitches[k]
			});

		}
		nn = nn + 8;
	}
	return beats;
}
function composeGuitar(chords: string[], strums: StrumDefinition): InsBeat[] {
	let beats: InsBeat[] = [];
	/*let chordDuration: { chord: string, len16: number }[] = [];
	let curChord = '';
	for (let i = 0; i < chords.length; i++) {
		//console.log(i,chords[i],curChord,chordDuration);
		if (chords[i] == curChord) {
			chordDuration[chordDuration.length - 1].len16 = chordDuration[chordDuration.length - 1].len16 + 8;
		} else {
			curChord = chords[i];
			chordDuration.push({ chord: curChord, len16: 8 });
		}
	}
	var strumStep=0;
	var progressStep=0;
	for(let i=0;i<chordDuration.length;i++){
		var a=composeGuitar2('',strums);
	}*/
	var part = [];
	let curChord = '';

	for (let i = 0; i < chords.length; i++) {
		//console.log(i,curChord,chords[i]);
		if (chords[i] == curChord) {
			part.push(chords[i]);
		} else {
			if (part.length > 0) {
				//console.log(':',part.length,curChord,part);
				addPartGuitar((i-part.length) * 8, part[0], part.length * 8, strums,beats);
			}
			part = [];
			curChord = chords[i];
			part.push(chords[i]);

		}
	}
	//console.log(':',part.length,curChord,part);
	addPartGuitar((chords.length-part.length) * 8, part[0], part.length * 8, strums,beats);
	return beats;
}
function addPartGuitar(stepshift: number, chordCurrent: string, len16: number, strums: StrumDefinition,beats: InsBeat[]) {
	//console.log(step, chord, len16);
	let step = 0;
	var durationStrum: { nn: number, strumKind: string, len16: number, chord: string }[] = [];
	for (let i = 0; i < len16; i++) {
		if (i < len16 - strums.end.length) {
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
						beat: stepshift+b.nn,
						length: b.len16,
						shift: 0,
						pitch: pitches[k]
					});
				}
			}
		}
	}
}
/*
function composeGuitar2(chords: string[], strums: StrumDefinition): InsBeat[] {
	let step = 0;
	var chordCurrent = '';
	var durationStrum: { nn: number, strumKind: string, len16: number, chord: string }[] = [];
	for (let i = 0; i < chords.length * 8; i++) {
		if (i < chords.length * 8 - strums.end.length) {
			var chordName = chords[Math.floor(i / 8)];
			if (chordCurrent != chordName) {
				step = 0;
				chordCurrent = chordName;
			}
			//let pitches: number[] = findChordPitches(chordCurrent, chordfrets);
			//console.log(i, step, chords[Math.floor(i / 8)],strums.start.substr(step,1),pitches);
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
			var r = i - (chords.length * 8 - strums.end.length);
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
	let beats: InsBeat[] = [];
	for (let i = 0; i < durationStrum.length; i++) {
		let b = durationStrum[i];
		let pitches: number[] = findChordPitches(b.chord, chordfrets);
		for (let k = 0; k < pitches.length; k++) {
			if (!(b.strumKind == 'A' && k == 0)) {
				if (!(b.strumKind == 'V' && k == pitches.length - 1)) {
					beats.push({
						track: 1,
						beat: b.nn,
						length: b.len16,
						shift: 0,
						pitch: pitches[k]
					});
				}
			}
		}
	}
	//console.log(durationStrum, beats);
	return beats;
}*/
let prgrsn: Progression[] = [];
function composeURL() {
	let progression: Progression = prgrsn[0];
	let tempo = 120;
	let drumData: DrumBeat[] = beatFill(progression.chords, beatsdefs[0]);
	let gitData: InsBeat[] = composeGuitar(progression.chords, strumdefs[0]);
	let viData: InsBeat[] = composeViola(progression.chords, chordPitches);
	var drumVolumes = [4, 4, 6, 4, 6, 6, 6, 6];
	var insVolumes = [7, 6, 4, 7, 4, 7, 5, 7];
	var eqVolumes = [13, 12, 12, 10, 8, 9, 13, 14, 9, 12];
	let url = (window as any).encodeRiffURL(tempo, drumData, gitData.concat(viData), drumVolumes, insVolumes, eqVolumes);
	window.open(url);
}
//
function initApp() {
	console.log('initApp');
	console.log(chordPitches, chordPitches);
	composeURL();
}
document.getElementById('proceduralgeneration').onclick = initApp;
console.log('proceduralgeneration v1.01');


