console.log('generate v1.02');
document.getElementById('linktest').onclick = function () {
    var songlink = composeLink();
    //console.log(songlink);
    window.open(songlink);
};


function composeLink() {
    var duration = 64;
    var tempo = '120';
    var nn = Math.round(Math.random() * (progressionChords.length - 1));
	 var kindSeed = Math.random();
	 var stringKindSeed = Math.random();
	  var stringSeed = Math.round(Math.random() * (stringPatterns.length - 1));
    var drumSeed = Math.round(Math.random() * (drumPatterns.length - 1));
    //drumSeed=8;
    var bassSeed = Math.round(Math.random() * (bassPatterns.length - 1));
    //bassSeed = 1;
	 var cleanGuitarSeed = Math.round(Math.random() * (cleanGuitarPatterns.length - 1));
	 //cleanGuitarSeed=0;
	var pianoSeed = Math.round(Math.random() * (pianoPatterns.length - 1));
	//var pianoSeed=8;
    var chordSeed = Math.random();
	var guitPianoSeed = Math.random();
    //nn=progressionChords.length-1;
    //nn=25;
    //nn=16;
	//nn=0;
	//pianoSeed=0;
	//kindSeed=1;
    var pp = progressionChords[nn];
    var chordOrder = [16, 16, 16, 16];
    if (pp.length == 3) {
        if (chordSeed < 1 / 2) {
            chordOrder = [16, 16, 32];
        } else {
            chordOrder = [32, 16, 16];
        }
    }
    if (pp.length == 4) {
        if (chordSeed < 1 / 4) {
            chordOrder = [16, 16, 16, 16];
        } else {
            if (chordSeed < 2 / 4) {
                chordOrder = [16, 8, 8, 32];
            } else {
                if (chordSeed < 3 / 4) {
                    chordOrder = [32, 16, 8, 8];
                } else {
                    chordOrder = [12, 20, 12, 20];
                }
            }
        }
    }
    if (pp.length == 5) {
        
		if (chordSeed < 1 / 2) {
            chordOrder = [32, 32, 32, 16, 16];
        } else {
            chordOrder = [32, 16, 32, 16, 32];
        }
    }
    if (pp.length == 6) {
        if (chordSeed < 1 / 2) {
            chordOrder = [32, 16, 16, 32, 16, 16];
        } else {
            chordOrder = [16, 16, 32, 16, 16, 32];
        }
    }
    if (pp.length == 8) {
        chordOrder = [16, 16, 16, 16, 16, 16, 16, 16];
    }
    if (pp.length == 12) {
        chordOrder = [8, 8, 16, 8, 8, 16, 8, 8, 16, 8, 8, 16];
    }
    duration = 0;
    for (var i = 0; i < chordOrder.length; i++) {
        duration = duration + chordOrder[i];
    }
    console.log('seed ' + nn + '-' + Math.floor(chordSeed * 100) + '-' + drumSeed + '-' + bassSeed + '-' + pianoSeed);
    var drumData = [];
	//console.log(pp,chordProgression);
    var progressionGuitar = {
        steps: chordProgression(pp)
    };
    var progressionPiano = {
        steps: pianoProgression(pp)
    };
    addDrums(duration, chordOrder, progressionPiano, drumPatterns[drumSeed], function (songStep, beat) {
        drumData.push({
            drum: beat.drum,
            beat: songStep
        });
    });
    var insData = [];
	//addInstrumRiff(insData, duration, chordOrder, progressionPiano, pianoPatterns[pianoSeed], AcousticPiano);
	if(kindSeed>1/2){
		if(guitPianoSeed>1/2){
			addInstrumRiff(insData, duration, chordOrder, progressionPiano, pianoPatterns[pianoSeed], AcousticPiano);
		}else{
			addInstrumRiff(insData, duration, chordOrder, progressionPiano, pianoPatterns[pianoSeed], PercussiveOrgan);
		}
	}else{
		addInstrumBeats(insData, duration, chordOrder, progressionGuitar, cleanGuitarPatterns[cleanGuitarSeed], AcousticGuitar);
		if(stringKindSeed>1/2){
			addInstrumBeats(insData, duration, chordOrder, progressionPiano, stringPatterns[stringSeed], StringEnsemble);
		}else{
			addInstrumBeats(insData, duration, chordOrder, progressionPiano, stringPatterns[stringSeed], PercussiveOrgan);
		}
	}
	addInstrumRiff(insData, duration, chordOrder, progressionGuitar, bassPatterns[bassSeed], BassGuitar);
    fillGaps(duration, insData);

    //addLink(tempo, drumData, insData);
	var insVolumes=[7,5,4,7,4,7,3,7];//dist,accguit,percorg,palm,piano,bass,string,synth
	var drumVolumes=[7,4,6,4,6,6,6,6];//bass,low,snare,mid,closed,open,ride,splash
	var eqVolumes=[13,12,12,10,8,9,13,14,9,12];
    return encodeRiffURL(tempo, drumData, insData,drumVolumes,insVolumes,eqVolumes);
}
