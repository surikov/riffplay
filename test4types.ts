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
type DrumBeat = {
	drum: number,
	beat: number
};
type InsBeat = {
	track: number,
	beat: number,
	length: number,
	shift: number,
	pitch: number
};
//
type ChordPitches = {
	name: string,
	pitches: number[]
};
type FretKeys = {
	pitch: number;
	name: string;
	frets: number[][];
}
type ChordSegment = {
	chord: string,
	duration: number
};

type DrumPattern = {
	beats: DrumBeat[],
	duration: number
};
type InsPattern = {
	beats: InsBeat[],
	duration: number,
	chordName: string
};
type NumReplacement = {
	original: number,
	to: number
};
function pianoKeysByName(chordName: string): number[]{
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
