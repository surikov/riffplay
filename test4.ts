
//let bassPattern={duration:2,beats:[{"beat":0,"pitch":9,"track":5,"length":4,"shift":0},{"beat":4,"pitch":4,"track":5,"length":4,"shift":0},{"beat":8,"pitch":9,"track":5,"length":2,"shift":0},{"beat":10,"pitch":4,"track":5,"length":2,"shift":0},{"beat":14,"pitch":7,"track":5,"length":2,"shift":0},{"beat":12,"pitch":6,"track":5,"length":2,"shift":0}]};
//
let beat1start:DrumPattern ={duration:2,beats:[{"beat":0,"drum":0},{"beat":0,"drum":7}]};
let beat1body:DrumPattern ={duration:16,beats:[{"beat":0,"drum":0},{"beat":0,"drum":5},{"beat":12,"drum":5},{"beat":4,"drum":2},{"beat":4,"drum":5},{"beat":8,"drum":0},{"beat":10,"drum":0},{"beat":12,"drum":2},{"beat":8,"drum":5}]};
let beat1end:DrumPattern={duration:8,beats:[{"beat":1,"drum":1},{"beat":2,"drum":1},{"beat":3,"drum":1},{"beat":0,"drum":0},{"beat":4,"drum":2},{"beat":6,"drum":3},{"beat":5,"drum":3},{"beat":7,"drum":3},{"beat":4,"drum":0},{"beat":0,"drum":5},{"beat":4,"drum":5},{"beat":6,"drum":5}]};

let bass={duration:32,chordName:'Am',beats:[{"beat":0,"pitch":9,"track":5,"shift":0,"length":4},{"beat":6,"pitch":9,"track":5,"shift":0,"length":4},{"beat":16,"pitch":9,"track":5,"shift":0,"length":4},{"beat":22,"pitch":9,"track":5,"shift":0,"length":4},{"beat":10,"pitch":12,"track":5,"shift":0,"length":2},{"beat":12,"pitch":14,"track":5,"shift":0,"length":2},{"beat":26,"pitch":16,"track":5,"shift":0,"length":2},{"beat":28,"pitch":14,"track":5,"shift":0,"length":2},{"beat":30,"pitch":12,"track":5,"shift":0,"length":2},{"beat":14,"pitch":12,"track":5,"shift":0,"length":2}]};

let beatEmpty:DrumPattern={duration:0,beats:[]};
let insEmpty:InsPattern={duration:0,chordName:'',beats:[]};

let strumBody:InsPattern={duration:16,chordName:'Em',beats:[
	{"beat":0,"pitch":4,"track":1,"shift":0,"length":4}
	,{"beat":6,"pitch":4,"track":1,"shift":0,"length":4}
	,{"beat":12,"pitch":4,"track":1,"shift":0,"length":2}
	
	,{"beat":0,"pitch":11,"track":1,"shift":0,"length":4}
	,{"beat":6,"pitch":11,"track":1,"shift":0,"length":4}
	,{"beat":12,"pitch":11,"track":1,"shift":0,"length":2}
	
	,{"beat":0,"pitch":16,"track":1,"shift":0,"length":4}
	,{"beat":4,"pitch":16,"track":1,"shift":0,"length":2}
	,{"beat":6,"pitch":16,"track":1,"shift":0,"length":4}
	,{"beat":10,"pitch":16,"track":1,"shift":0,"length":2}
	,{"beat":12,"pitch":16,"track":1,"shift":0,"length":2}
	,{"beat":14,"pitch":16,"track":1,"shift":0,"length":2}
	
	,{"beat":0,"pitch":19,"track":1,"shift":0,"length":4}
	,{"beat":4,"pitch":19,"track":1,"shift":0,"length":2}
	,{"beat":6,"pitch":19,"track":1,"shift":0,"length":4}
	,{"beat":10,"pitch":19,"track":1,"shift":0,"length":2}
	,{"beat":12,"pitch":19,"track":1,"shift":0,"length":2}
	,{"beat":14,"pitch":19,"track":1,"shift":0,"length":2}
	
	,{"beat":0,"pitch":23,"track":1,"shift":0,"length":4}
	,{"beat":4,"pitch":23,"track":1,"shift":0,"length":2}
	,{"beat":6,"pitch":23,"track":1,"shift":0,"length":4}
	,{"beat":10,"pitch":23,"track":1,"shift":0,"length":2}
	,{"beat":12,"pitch":23,"track":1,"shift":0,"length":2}
	,{"beat":14,"pitch":23,"track":1,"shift":0,"length":2}
	
	,{"beat":0,"pitch":28,"track":1,"shift":0,"length":4}
	,{"beat":4,"pitch":28,"track":1,"shift":0,"length":2}
	,{"beat":6,"pitch":28,"track":1,"shift":0,"length":4}
	,{"beat":10,"pitch":28,"track":1,"shift":0,"length":2}
	,{"beat":12,"pitch":28,"track":1,"shift":0,"length":2}
	,{"beat":14,"pitch":28,"track":1,"shift":0,"length":2}
	]};
let strumEnd:InsPattern={duration:8,chordName:'Em',beats:[
	{"beat":0,"pitch":4,"track":1,"shift":0,"length":4}
	,{"beat":0,"pitch":11,"track":1,"shift":0,"length":4}
	,{"beat":0,"pitch":16,"track":1,"shift":0,"length":4}
	,{"beat":0,"pitch":19,"track":1,"shift":0,"length":4}
	,{"beat":0,"pitch":23,"track":1,"shift":0,"length":4}
	,{"beat":0,"pitch":28,"track":1,"shift":0,"length":4}
	,{"beat":4,"pitch":4,"track":1,"shift":0,"length":4}
	,{"beat":4,"pitch":11,"track":1,"shift":0,"length":4}
	,{"beat":4,"pitch":16,"track":1,"shift":0,"length":4}
	,{"beat":4,"pitch":19,"track":1,"shift":0,"length":4}
	,{"beat":4,"pitch":23,"track":1,"shift":0,"length":4}
	,{"beat":4,"pitch":28,"track":1,"shift":0,"length":4}
	]};
let strumStart:InsPattern={duration:10,chordName:'Em',beats:[
	{"beat":0,"pitch":4,"track":1,"shift":0,"length":10}
	,{"beat":0,"pitch":11,"track":1,"shift":0,"length":10}
	,{"beat":0,"pitch":16,"track":1,"shift":0,"length":10}
	,{"beat":0,"pitch":19,"track":1,"shift":0,"length":10}
	,{"beat":0,"pitch":23,"track":1,"shift":0,"length":10}
	,{"beat":0,"pitch":28,"track":1,"shift":0,"length":10}
	]};
function test4() {
    console.log('test4');
    let tempo = 140;
	let progression:ChordSegment[]=[{chord: 'Am',duration: 16},{chord: 'Em',duration: 16},{chord: 'Am',duration: 32}
									,{chord: 'C',duration: 16},{chord: 'G',duration: 16},{chord: 'C',duration: 32}
									,{chord: 'Dm',duration: 32},{chord: 'Am',duration: 32},{chord: 'Em',duration: 32},{chord: 'Am',duration: 16},{chord: 'Am7',duration: 16}
									];
	let d63: DrumBeat[]=fillDrums(beat1start,beat1body,beat1end,0,63);
	let d127: DrumBeat[]=fillDrums(beat1start,beat1body,beat1end,64,127);
	let d191: DrumBeat[]=fillDrums(beat1start,beat1body,beat1end,128,191);
	let d255: DrumBeat[]=fillDrums(beat1start,beat1body,beat1end,192,255);
	let drumData: DrumBeat[]=d63.concat(d127.concat(d191.concat(d255)));
	let insData: InsBeat[]=fillGuitar(strumStart,strumBody,strumEnd,0,progressionLen(progression)-1,progression,1,convertPitchByChord);
    var insVolumes = [7, 5, 4, 7, 4, 7, 3, 7];//dist,accguit,percorg,palm,piano,bass,string,synth
    var drumVolumes = [4, 4, 6, 4, 6, 6, 6, 6];//bass,low,snare,mid,closed,open,ride,splash
    var eqVolumes = [13, 12, 12, 10, 8, 9, 13, 14, 9, 12];
    let url = (window as any).encodeRiffURL(tempo, drumData, insData, drumVolumes, insVolumes, eqVolumes);
    window.open(url);
}
document.getElementById('test4').onclick = test4;

