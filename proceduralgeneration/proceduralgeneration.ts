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
	category: string, name: string, len16: number, encoded: string
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
					pitches.push(-1);
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
let beatsdefs: BeatDefinition[] = [
	{ category: '', name: '', len16: 16 * 2, encoded: '00010105020f03054010411042104310a011a111a211a311' }
	, { category: '', name: '', len16: 16, encoded: '0001010540104110a011a111' }
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
function beat16(measureCount: number): DrumBeat[] {
	let encoded = beatsdefs[0].encoded
	let len16 = beatsdefs[0].len16;
	var cnt = encoded.length / 4;
	var beatdrum: DrumBeat[] = [];
	for (var i = 0; i < cnt; i++) {
		var key = parseInt(encoded.substring(i * 4, i * 4 + 2), 16);
		var data = parseInt(encoded.substring(i * 4 + 2, i * 4 + 4), 16);
		var drum = key >> 5;
		var i32 = key & parseInt('11111', 2);
		//var nn = i32 * 8 + parseDrumStep(data);
		//console.log(i, drum, nn);
		//beatdrum.push({ drum: drum, beat: nn });
		if ((data | parseInt('00000001', 2)) == data) beatdrum.push({ drum: drum, beat: i32 * 8 + 0 });
		if ((data | parseInt('00000010', 2)) == data) beatdrum.push({ drum: drum, beat: i32 * 8 + 1 });
		if ((data | parseInt('00000100', 2)) == data) beatdrum.push({ drum: drum, beat: i32 * 8 + 2 });
		if ((data | parseInt('00001000', 2)) == data) beatdrum.push({ drum: drum, beat: i32 * 8 + 3 });
		if ((data | parseInt('00010000', 2)) == data) beatdrum.push({ drum: drum, beat: i32 * 8 + 4 });
		if ((data | parseInt('00100000', 2)) == data) beatdrum.push({ drum: drum, beat: i32 * 8 + 5 });
		if ((data | parseInt('01000000', 2)) == data) beatdrum.push({ drum: drum, beat: i32 * 8 + 6 });
		if ((data | parseInt('10000000', 2)) == data) beatdrum.push({ drum: drum, beat: i32 * 8 + 7 });
	}
	console.log(len16, beatdrum);
	let n = 0;
	let beats: DrumBeat[] = [];
	for (let i = 0; i < measureCount * 16; i++) {
		/*beats.push({ drum: 0, beat: i * 16 + 0 });
		beats.push({ drum: 2, beat: i * 16 + 4 });
		beats.push({ drum: 0, beat: i * 16 + 8 });
		beats.push({ drum: 2, beat: i * 16 + 12 });*/
		for (let k = 0; k < beatdrum.length; k++) {
			if (beatdrum[k].beat == n) {
				beats.push({ drum: beatdrum[k].drum, beat: i });
			}
		}
		n++;
		if (n >= len16) n = 0;
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
				length: 16,
				shift: 0,
				pitch: pitches[k]
			});

		}
		nn = nn + 16;
	}
	return beats;
}
function composeGuitar(chords: string[]): InsBeat[] {
	let beats: InsBeat[] = [];
	let nn = 0;
	for (let i = 0; i < chords.length; i++) {
		let chord = chords[i];
		let pitches = findChordPitches(chord, chordfrets);
		for (let k = 0; k < pitches.length; k++) {
			let pitch = pitches[k];
			if (pitch > -1) {
				beats.push({
					track: 1,
					beat: nn,
					length: 16,
					shift: 0,
					pitch: pitches[k]
				});
			}
		}
		nn = nn + 16;
	}
	return beats;
}
let prgrsn: Progression[] = [];
function composeURL() {
	let progression: Progression = prgrsn[0];
	let tempo = 120;
	let drumData: DrumBeat[] = beat16(progression.chords.length);
	let gitData: InsBeat[] = composeGuitar(progression.chords);
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


