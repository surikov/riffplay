let scaleModeIonian='Ionian';
let scaleModeDorian='Dorian';
let scaleModePhrygian='Phrygian';
let scaleModeLydian='Lydian';
let scaleModeMixolydian='Mixolydian';
let scaleModeAeolian='Aeolian';
let scaleModeLocrian='Locrian';

let chordPitches:ChordPitches[]=[
	{name:'',pitches:[4,7]}
	,{name:'5',pitches:[7,12]}
	,{name:'6',pitches:[4,7,9]}
	,{name:'69',pitches:[4,7,9,14]},{name:'6add9',pitches:[4,7,9,14]}
	,{name:'6sus4',pitches:[5,9]}
	,{name:'7',pitches:[4,7,10]}
	,{name:'7sus4',pitches:[5,7,10]}
	,{name:'7b5',pitches:[4,6,10]},{name:'7-5',pitches:[4,6,10]}
	,{name:'7#9',pitches:[4,7,10,15]},{name:'7+9',pitches:[4,7,10,15]}
	,{name:'7b9',pitches:[4,7,10,13]}
	,{name:'9',pitches:[4,7,10,14]}
	,{name:'9#11',pitches:[2,4,6,7,10]}
	,{name:'9b5',pitches:[4,6,10,14]}
	,{name:'11',pitches:[4,7,10,14,17]}
	,{name:'13',pitches:[10,14,17,21]}
	,{name:'add9',pitches:[4,7,14]}
	,{name:'alt',pitches:[4,6]}
	,{name:'aug',pitches:[4,8]},{name:'+',pitches:[4,8]}
	,{name:'aug7',pitches:[4,8,10]},{name:'+7',pitches:[4,8,10]}
	,{name:'aug9',pitches:[2,4,8,10]},{name:'+9',pitches:[2,4,8,10]}
	,{name:'dim',pitches:[3,6]}
	,{name:'dim7',pitches:[3,6,9]}
	,{name:'m',pitches:[3,7]}
	,{name:'m6',pitches:[3,7,9]}
	,{name:'m69',pitches:[3,7,9,14]},{name:'m6add9',pitches:[3,7,9,14]}
	,{name:'m7',pitches:[3,7,10]}
	,{name:'m7b5',pitches:[3,6,10]},{name:'0',pitches:[3,6,10]}
	,{name:'m9',pitches:[3,7,10,14]}
	,{name:'m9b5',pitches:[3,6,10,14]}
	,{name:'m11',pitches:[3,7,10,14,17]}
	,{name:'madd9',pitches:[3,7,14]}
	,{name:'maj7',pitches:[4,7,11]}
	,{name:'maj7#5',pitches:[4,8,11]}
	,{name:'maj7b5',pitches:[4,6,11]}
	,{name:'maj9',pitches:[4,7,11,14]}
	,{name:'maj11',pitches:[2,4,5,7,11]}
	,{name:'maj13',pitches:[2,4,7,9,11]}
	,{name:'mmaj7',pitches:[3,7,11]}
	,{name:'mmaj7b5',pitches:[3,6,11]}
	,{name:'mmaj9',pitches:[3,7,11,14]}
	,{name:'mmaj11',pitches:[3,5,7,11]}
	,{name:'sus2',pitches:[2,7]}
	,{name:'sus4',pitches:[5,7]}
];
let scaleModes:ChordPitches[] =[
	{name:scaleModeIonian		,pitches:[2,2,1,2,2,2,1]}
	,{name:scaleModeDorian		,pitches:[2,1,2,2,2,1,2]}
	,{name:scaleModePhrygian	,pitches:[1,2,2,2,1,2,2]}
	,{name:scaleModeLydian		,pitches:[2,2,2,1,2,2,1]}
	,{name:scaleModeMixolydian	,pitches:[2,2,1,2,2,1,2]}
	,{name:scaleModeAeolian		,pitches:[2,1,2,2,1,2,2]}
	,{name:scaleModeLocrian		,pitches:[1,2,2,1,2,2,2]}
];
function findScaleMode(name:string):number[]{
	if(name==scaleModeIonian)return scaleModes[0].pitches;
	if(name==scaleModeDorian)return scaleModes[1].pitches;
	if(name==scaleModePhrygian)return scaleModes[2].pitches;
	if(name==scaleModeLydian)return scaleModes[3].pitches;
	if(name==scaleModeMixolydian)return scaleModes[4].pitches;
	if(name==scaleModeAeolian)return scaleModes[5].pitches;
	if(name==scaleModeLocrian)return scaleModes[6].pitches;
	return [];
}
function pitch2scaleStep(scaleName:string,root:number,pitch:number):number{
	let pitches=findScaleMode(scaleName);
	let baseRoot=root%12;
	let basePitch=(pitch-root)%12;
	let curPitch=0;
	for(let i=0;i<pitches.length;i++){
		if(basePitch<=curPitch){
			return i;
		}
		curPitch=curPitch+pitches[i];
	}
	return -1;
}
function convertPitchByChord(fromChordName:string,pitch:number,toChordName):number{
	let string=pitch2string(pitch,fromChordName, chordfrets);
	if(string>-1){
		//let progChordName=findProgChordInStep(step,progression);
		let progChordKeys=chordKeysByName(toChordName,chordfrets);
		return progChordKeys[string];
	}
	return -1;
}
