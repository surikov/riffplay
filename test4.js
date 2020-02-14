//
//
function fillDrums(startPattern, mainPattern, endPattern, nn) {
    //let nn = progressionLen(progression);
    var r = [];
    for (var i = 0; i < nn; i++) {
        var k = i % mainPattern.duration;
        var p = mainPattern;
        if (i < startPattern.duration) {
            p = startPattern;
            k = i;
        }
        else {
            if (i >= nn - endPattern.duration) {
                p = endPattern;
                k = i - (nn - endPattern.duration);
            }
        }
        for (var t = 0; t < p.beats.length; t++) {
            if (p.beats[t].beat == k) {
                r.push({
                    beat: i,
                    drum: p.beats[t].drum
                });
            }
        }
    }
    return r;
}
//function findPitch(pitch:number,step:number,progression:ChordSegment[],pitchReplacement:NumReplacement[]):number{
function findPitch(chordName, pitch, step, progression) {
    var progChordName = findChord(step, progression);
    //let pianoKeys=pianoKeysByName(chordName);
    var progChordKeys = chordKeysByName(progChordName, chordfrets);
    var chordKeys = chordKeysByName(chordName, chordfrets);
    var string = -1;
    for (var i = 0; i < chordKeys.length; i++) {
        if (chordKeys[i] == pitch) {
            string = i;
            break;
        }
    }
    var progPitch = -1;
    if (string >= 0) {
        progPitch = progChordKeys[string];
    }
    //console.log(step,progChordName,pitch,chordName,chordKeys,string,progPitch);
    //let string=
    //console.log(step,pitch,progChordName,progChordKeys,chordName,chordKeys);
    //var p=renum(pitch,pitchReplacement);
    //var p=pitch;
    return progPitch;
}
function fillGuitar(startPattern, mainPattern, endPattern, first, last, progression, trackNum) {
    var r = [];
    var notEnd = true;
    var nn = last - first + 1;
    //console.log(mainPattern.chordName,findChordPitches(mainPattern.chordName,chordfrets));
    for (var i = 0; i < nn; i++) {
        var k = i % mainPattern.duration;
        var p = mainPattern;
        if (i < startPattern.duration) {
            p = startPattern;
            k = i;
            //console.log(k,r,'start');
        }
        else {
            if (i >= nn - endPattern.duration) {
                p = endPattern;
                k = i - (nn - endPattern.duration);
                notEnd = false;
                //console.log(k,r,'end');
            }
            else {
                //console.log(k,r,'main');
            }
        }
        for (var t = 0; t < p.beats.length; t++) {
            if (p.beats[t].beat == k) {
                var len = p.beats[t].length;
                if (len + k >= p.duration)
                    len = p.duration - k;
                if (notEnd) {
                    if (i + len >= nn - endPattern.duration) {
                        len = nn - endPattern.duration - i;
                    }
                }
                if (len < 1)
                    len = 1;
                //console.log(p.beats[t]);
                var pitch = findPitch(p.chordName, p.beats[t].pitch, i + first, progression);
                if (pitch >= 0) {
                    r.push({
                        track: trackNum,
                        beat: i + first,
                        length: len,
                        shift: p.beats[t].shift,
                        pitch: pitch //findPitch(p.chordName,p.beats[t].pitch,i+first,progression)
                    });
                }
            }
        }
    }
    return r;
}
//
var beat1start = { duration: 2, beats: [{ "beat": 0, "drum": 0 }, { "beat": 0, "drum": 7 }] };
var beat1body = { duration: 16, beats: [{ "beat": 0, "drum": 0 }, { "beat": 0, "drum": 5 }, { "beat": 12, "drum": 5 }, { "beat": 4, "drum": 2 }, { "beat": 4, "drum": 5 }, { "beat": 8, "drum": 0 }, { "beat": 10, "drum": 0 }, { "beat": 12, "drum": 2 }, { "beat": 8, "drum": 5 }] };
var beat1end = { duration: 8, beats: [{ "beat": 1, "drum": 1 }, { "beat": 2, "drum": 1 }, { "beat": 3, "drum": 1 }, { "beat": 0, "drum": 0 }, { "beat": 4, "drum": 2 }, { "beat": 6, "drum": 3 }, { "beat": 5, "drum": 3 }, { "beat": 7, "drum": 3 }, { "beat": 4, "drum": 0 }, { "beat": 0, "drum": 5 }, { "beat": 4, "drum": 5 }, { "beat": 6, "drum": 5 }] };
var bass = { duration: 32, chordName: 'Am', beats: [{ "beat": 0, "pitch": 9, "track": 5, "shift": 0, "length": 4 }, { "beat": 6, "pitch": 9, "track": 5, "shift": 0, "length": 4 }, { "beat": 16, "pitch": 9, "track": 5, "shift": 0, "length": 4 }, { "beat": 22, "pitch": 9, "track": 5, "shift": 0, "length": 4 }, { "beat": 10, "pitch": 12, "track": 5, "shift": 0, "length": 2 }, { "beat": 12, "pitch": 14, "track": 5, "shift": 0, "length": 2 }, { "beat": 26, "pitch": 16, "track": 5, "shift": 0, "length": 2 }, { "beat": 28, "pitch": 14, "track": 5, "shift": 0, "length": 2 }, { "beat": 30, "pitch": 12, "track": 5, "shift": 0, "length": 2 }, { "beat": 14, "pitch": 12, "track": 5, "shift": 0, "length": 2 }] };
var beatEmpty = { duration: 0, beats: [] };
var insEmpty = { duration: 0, chordName: '', beats: [] };
var strumStart = { duration: 0, chordName: '', beats: [{ "beat": 0, "pitch": 11, "track": 2, "shift": 0, "length": 2 }, { "beat": 0, "pitch": 18, "track": 2, "length": 2, "shift": 0 }] };
//let strumBody:InsPattern={duration:16,chordName:'Em',beats:[
/*beat":0,"pitch":4,"track":1,"shift":0,"length":4}
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
,{"beat":10,"pitch":23,"track":1,"shift":0,"length":2}
,{"beat":12,"pitch":23,"track":1,"shift":0,"length":2},{"beat":14,"pitch":23,"track":1,"shift":0,"length":2},{"beat":6,"pitch":23,"track":1,"shift":0,"length":4},{"beat":4,"pitch":28,"track":1,"shift":0,"length":2},{"beat":10,"pitch":28,"track":1,"shift":0,"length":2},{"beat":14,"pitch":28,"track":1,"shift":0,"length":2},{"beat":0,"pitch":28,"track":1,"length":4,"shift":0},{"beat":6,"pitch":28,"track":1,"length":4,"shift":0},{"beat":12,"pitch":28,"track":1,"length":2,"shift":0},{"beat":14,"pitch":11,"track":1,"length":2,"shift":0},{"beat":10,"pitch":11,"track":1,"length":2,"shift":0},{"beat":4,"pitch":11,"track":1,"length":2,"shift":0}]};
*/
var strumBody = { duration: 16, chordName: 'Em', beats: [
        { "beat": 0, "pitch": 4, "track": 1, "shift": 0, "length": 4 },
        { "beat": 6, "pitch": 4, "track": 1, "shift": 0, "length": 4 },
        { "beat": 12, "pitch": 4, "track": 1, "shift": 0, "length": 2 },
        { "beat": 0, "pitch": 11, "track": 1, "shift": 0, "length": 4 },
        { "beat": 6, "pitch": 11, "track": 1, "shift": 0, "length": 4 },
        { "beat": 12, "pitch": 11, "track": 1, "shift": 0, "length": 2 },
        { "beat": 0, "pitch": 16, "track": 1, "shift": 0, "length": 4 },
        { "beat": 4, "pitch": 16, "track": 1, "shift": 0, "length": 2 },
        { "beat": 6, "pitch": 16, "track": 1, "shift": 0, "length": 4 },
        { "beat": 10, "pitch": 16, "track": 1, "shift": 0, "length": 2 },
        { "beat": 12, "pitch": 16, "track": 1, "shift": 0, "length": 2 },
        { "beat": 14, "pitch": 16, "track": 1, "shift": 0, "length": 2 },
        { "beat": 0, "pitch": 19, "track": 1, "shift": 0, "length": 4 },
        { "beat": 4, "pitch": 19, "track": 1, "shift": 0, "length": 2 },
        { "beat": 6, "pitch": 19, "track": 1, "shift": 0, "length": 4 },
        { "beat": 10, "pitch": 19, "track": 1, "shift": 0, "length": 2 },
        { "beat": 12, "pitch": 19, "track": 1, "shift": 0, "length": 2 },
        { "beat": 14, "pitch": 19, "track": 1, "shift": 0, "length": 2 },
        { "beat": 0, "pitch": 23, "track": 1, "shift": 0, "length": 4 },
        { "beat": 4, "pitch": 23, "track": 1, "shift": 0, "length": 2 },
        { "beat": 6, "pitch": 23, "track": 1, "shift": 0, "length": 4 },
        { "beat": 10, "pitch": 23, "track": 1, "shift": 0, "length": 2 },
        { "beat": 12, "pitch": 23, "track": 1, "shift": 0, "length": 2 },
        { "beat": 14, "pitch": 23, "track": 1, "shift": 0, "length": 2 },
        { "beat": 0, "pitch": 28, "track": 1, "shift": 0, "length": 4 },
        { "beat": 4, "pitch": 28, "track": 1, "shift": 0, "length": 2 },
        { "beat": 6, "pitch": 28, "track": 1, "shift": 0, "length": 4 },
        { "beat": 10, "pitch": 28, "track": 1, "shift": 0, "length": 2 },
        { "beat": 12, "pitch": 28, "track": 1, "shift": 0, "length": 2 },
        { "beat": 14, "pitch": 28, "track": 1, "shift": 0, "length": 2 }
    ] };
var strumEnd = { duration: 0, chordName: '', beats: [{ "beat": 0, "pitch": 13, "track": 3, "shift": 0, "length": 2 }, { "beat": 2, "pitch": 13, "track": 3, "shift": 0, "length": 2 },
        { "beat": 0, "pitch": 20, "track": 3, "length": 2, "shift": 0 }, { "beat": 2, "pitch": 20, "track": 3, "length": 2, "shift": 0 }] };
function test4() {
    console.log('test4');
    var tempo = 140;
    var progression = [{ chord: 'Am', duration: 16 }, { chord: 'Em', duration: 16 }, { chord: 'Am', duration: 32 },
        { chord: 'C', duration: 16 }, { chord: 'G', duration: 16 }, { chord: 'C', duration: 32 },
        { chord: 'Dm', duration: 32 }, { chord: 'Am', duration: 32 }, { chord: 'Em', duration: 32 }, { chord: 'Am', duration: 16 }, { chord: 'Am7', duration: 16 }
    ];
    var drumData = fillDrums(beat1start, beat1body, beat1end, progressionLen(progression));
    var insData = fillGuitar(insEmpty, strumBody, insEmpty, 0, 256 - 1, progression, 1);
    var insVolumes = [7, 5, 4, 7, 4, 7, 3, 7]; //dist,accguit,percorg,palm,piano,bass,string,synth
    var drumVolumes = [4, 4, 6, 4, 6, 6, 6, 6]; //bass,low,snare,mid,closed,open,ride,splash
    var eqVolumes = [13, 12, 12, 10, 8, 9, 13, 14, 9, 12];
    var url = window.encodeRiffURL(tempo, drumData, insData, drumVolumes, insVolumes, eqVolumes);
    window.open(url);
}
document.getElementById('test4').onclick = test4;
