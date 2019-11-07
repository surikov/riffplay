var C = 0, Cs = 1, D = 2, Ds = 3, E = 4, F = 5, Fs = 6, G = 7, Gs = 8, A = 9, As = 10, B = 11;
var O = 12;
var S1 = O * 1 + E;
var S2 = O * 1 + A;
var S3 = O * 2 + D;
var S4 = O * 2 + G;
var S5 = O * 2 + B;
var S6 = O * 3 + E;
var Strings6 = [S1, S2, S3, S4, S5, S6];
//
var BassDrum = 0; //10
var LowTom = 1; //3
var SnareDrum = 2; //7
var MidTom = 3; //3
var ClosedHiHat = 4; //5
var OpenHiHat = 5; //4
var RideCymbal = 6; //7
var SplashCymbal = 7; //7
//
var DistortionGuitar = 0; //8
var AcousticGuitar = 1; //8
var PercussiveOrgan = 2; //8
var PalmMuteGuitar = 3; //8
var AcousticPiano = 4; //6
var BassGuitar = 5; //11
var StringEnsemble = 6; //6
var SynthBass = 7; //8
//
var chordOrders = [];
var progressions = [];
//
var drumPatterns = [];
var bassPatterns = [];
var pianoPatterns = [];
var cleanGuitarPatterns = [];
var stringPatterns = [];
//
var progressionChords = [];
//
function findBeat(nn, beats) {
    var r = [];
    for (var k = 0; k < beats.length; k++) {
        if (beats[k].step == nn) {
            r.push(beats[k]);
        }
    }
    return r;
}
function addInstrumRiff(toData, duration, chordOrder, progression, pattern, instrument) {
    addRiff(duration, chordOrder, progression, pattern, function (songStep, beat, chord) {
        if (beat.keys.length) {
            for (var i = 0; i < beat.keys.length; i++) {
                var k = beat.keys[i];
                if (k < 0) {
                    k = chord.length + k;
                    if (k < 0)
                        k = -k;
                } else {
                    k = k - 1;
                    if (k >= chord.length) {
                        k = k - chord.length;
                    }
                }
                toData.push({
                    track: instrument,
                    beat: songStep,
                    length: beat.length,
                    shift: 0,
                    pitch: chord[k] + beat.alter
                });
            }
        } else {
            for (var i = 0; i < chord.length; i++) {
                toData.push({
                    track: instrument,
                    beat: songStep,
                    length: beat.length,
                    shift: 0,
                    pitch: chord[i] + beat.alter
                });
            }
        }
    });
}
function addRiff(duration, chordOrder, progression, pattern, onAddBeat) {
    var chordStep = 0;
    var chordIndex = 0;
    var chordLen = chordOrder[chordIndex];
    var chord = progression.steps[chordIndex];
    for (var songStep = 0; songStep < duration; songStep++) {
        var beats = null;
        if (songStep < pattern.attack.duration) {
            var n = songStep % pattern.attack.duration;
            beats = findBeat(n, pattern.attack.beats);
        } else {
            if (songStep >= duration - pattern.decay.duration) {
                var n = songStep % pattern.decay.duration;
                beats = findBeat(n, pattern.decay.beats);
            } else {
                var n = songStep % pattern.suspend.duration;
                beats = findBeat(n, pattern.suspend.beats);
            }
        }
        if (beats) {
            for (var k = 0; k < beats.length; k++) {
                onAddBeat(songStep, beats[k], chord);
            }
        }
        chordStep++;
        if (chordStep >= chordLen) {
            chordIndex++;
            if (chordIndex >= chordOrder.length) {
                chordIndex = 0;
            }
            chordLen = chordOrder[chordIndex];
            chordStep = 0;
            chord = progression.steps[chordIndex];
        }
    }
}
function addInstrumBeats(toData, duration, chordOrder, progression, pattern, instrument) {
    addBeats(duration, chordOrder, progression, pattern, function (songStep, beat, chord) {
        if (beat.keys.length) {
            for (var i = 0; i < beat.keys.length; i++) {
                var k = beat.keys[i];
                if (k < 0) {
                    k = chord.length + k;
                    if (k < 0)
                        k = -k;
                } else {
                    k = k - 1;
                    if (k >= chord.length) {
                        k = k - chord.length;
                    }
                }
                toData.push({
                    track: instrument,
                    beat: songStep,
                    length: beat.length,
                    shift: 0,
                    pitch: chord[k] + beat.alter
                });
            }
        } else {
            for (var i = 0; i < chord.length; i++) {
                toData.push({
                    track: instrument,
                    beat: songStep,
                    length: beat.length,
                    shift: 0,
                    pitch: chord[i] + beat.alter
                });
            }
        }
    });
}
function addBeats(duration, chordOrder, progression, pattern, onAddBeat) {
    var chordStep = 0;
    var chordIndex = 0;
    var chordLen = chordOrder[chordIndex];
    var chord = progression.steps[chordIndex];
    //console.log(chordIndex,chord,progression);
    for (var songStep = 0; songStep < duration; songStep++) {
        var beats = null;
        if (chordStep < pattern.attack.duration) {
            var n = chordStep % pattern.attack.duration;
            beats = findBeat(n, pattern.attack.beats);
        } else {
            if (chordStep >= chordLen - pattern.decay.duration) {
                var n = chordStep % pattern.decay.duration;
                beats = findBeat(n, pattern.decay.beats);
            } else {
                var n = chordStep % pattern.suspend.duration;
                beats = findBeat(n, pattern.suspend.beats);
            }
        }
        if (beats) {
            for (var k = 0; k < beats.length; k++) {
                /*r.push({
                drum: beats[k].drum,
                beat: songStep
                });*/
                //console.log(songStep, beats[k], chord);
                onAddBeat(songStep, beats[k], chord);
            }
        }
        chordStep++;
        if (chordStep >= chordLen) {
            chordIndex++;
            if (chordIndex >= chordOrder.length) {
                chordIndex = 0;
            }
            chordLen = chordOrder[chordIndex];
            chordStep = 0;
            chord = progression.steps[chordIndex];
        }
    }
}

function addDrums(duration, chordOrder, progression, pattern, onAddBeat) {
    for (var songStep = 0; songStep < duration; songStep++) {
        var beats = null;
        if (songStep < pattern.start.duration) {
            var n = songStep % pattern.start.duration;
            beats = findBeat(n, pattern.start.beats);
        } else {
            if (songStep >= duration - pattern.end.duration) {
                var n = songStep % pattern.end.duration;
                beats = findBeat(n, pattern.end.beats);
            } else {
                var n = songStep % pattern.body.duration;
                beats = findBeat(n, pattern.body.beats);
            }
        }
        if (beats) {
            for (var k = 0; k < beats.length; k++) {
                onAddBeat(songStep, beats[k]); //, chord);
            }
        }
    }
}
function findNext(insData, start, ins) {
    for (var i = 0; i < insData.length; i++) {
        if (insData[i].beat > start && insData[i].track == ins) {
            return insData[i].beat;
        }
    }
    return 0;
}
function fillGaps(duration, insData) {
    for (var i = 0; i < insData.length; i++) {
        if (insData[i].length == 0) {
            var nxt = findNext(insData, insData[i].beat, insData[i].track);
            if (nxt == 0) {
                insData[i].length = duration - insData[i].beat;
            } else {
                insData[i].length = nxt - insData[i].beat;
            }
        }
        if (insData[i].pitch < 0) {
            insData[i].pitch = insData[i].pitch + 12;
        }
        if (insData[i].pitch < 0) {
            insData[i].pitch = insData[i].pitch + 12;
        }
    }
}
function chrodKeysByName(chordName) {
    for (var i = 0; i < chordfrets.length; i++) {
        if (chordfrets[i].name == chordName) {
            return chordfrets[i].frets;
        }
    }
    return null;
}
function chordKeys(name) {
    //console.log(name);
    var keys = [];
    var stringCh = chrodKeysByName(name);
    console.log(name, stringCh);
    //var k = chrodKeysByName(name)[0];
    var k = stringCh[0];
    for (var i = 0; i < k.length; i++) {
        if (k[i] >= 0) {
            keys.push(Strings6[i] + k[i] - O);
        }
    }
    return keys;
}
function chordProgression(chords) {
    var prog = [];
    for (var i = 0; i < chords.length; i++) {
        prog.push(chordKeys(chords[i]));
    }
    return prog;
}

function pianoKeys(name) {
    var keys = [];
    var k = pianoKeysByName(name);
    for (var i = 0; i < k.length; i++) {
        if (k[i] >= 0) {
            keys.push(k[i]);
        }
    }

    return keys;
}
function pianoProgression(chords) {
    var prog = [];
    for (var i = 0; i < chords.length; i++) {
        prog.push(pianoKeys(chords[i]));
    }
    return prog;
}
function pianoKeysByName(chordName) {
    var r = [];
    var a = chordName.substr(0, 1);
    var start = 1;
    var root = -1;
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
    var chordKind = chordName.substr(start);
    //console.log(chordName,chordKind);
    if (chordKind == '' || chordKind == '4' || chordKind == '6') {
        r.push(root + 4);
        r.push(root + 7);
    }
    if (chordKind == '6') {
        r.push(root + 4);
        r.push(root + 7);
        r.push(root + 9);
    }
    if (chordKind == '7' || chordKind == '74' || chordKind == '76') {
        r.push(root + 4);
        r.push(root + 7);
        r.push(root + 10);
    }
    if (chordKind == 'aug' || chordKind == 'aug4' || chordKind == 'aug6') {
        r.push(root + 4);
        r.push(root + 8);
    }
    if (chordKind == 'm' || chordKind == 'm4' || chordKind == 'm6') {
        r.push(root + 3);
        r.push(root + 7);
    }
    if (chordKind == 'm6') {
        r.push(root + 3);
        r.push(root + 7);
        r.push(root + 9);
    }
    if (chordKind == 'm7' || chordKind == 'm74' || chordKind == 'm76') {
        r.push(root + 3);
        r.push(root + 7);
        r.push(root + 10);
    }
    if (chordKind == 'dim' || chordKind == 'dim4' || chordKind == 'dim6') {
        r.push(root + 3);
        r.push(root + 6);
    }
    if (chordKind == 'dim7') {
        r.push(root + 3);
        r.push(root + 6);
        r.push(root + 9);
    }
    if (chordKind == '7b5') {
        r.push(root + 3);
        r.push(root + 6);
        r.push(root + 10);
    }
    if (chordKind == 'sus2' || chordKind == 'sus24' || chordKind == 'sus26') {
        r.push(root + 2);
        r.push(root + 7);
    }
    if (chordKind == 'sus4' || chordKind == 'sus44' || chordKind == 'sus46') {
        r.push(root + 5);
        r.push(root + 7);
    }
    if (chordKind == '9') {
        r.push(root + 4);
        r.push(root + 7);
        r.push(root + 14);
    }
    if (chordKind == '6sus4') {
        r.push(root + 5);
        r.push(root + 9);
    }

    return r;
}
/*
progressions.push({
label: 'Cinema Remix - Skrillex (F#min_VI-i-III-VII)',
start: O * 3 + Fs,
steps: [[14, 21, 26, 29], [12, 24, 28, 31], [5, 21, 24, 29], [10, 22, 26, 29], [9, 25, 28, 33], [14, 21, 26, 29], [12, 24, 28, 31], [5, 21, 24, 29], [10, 22, 26, 29], [12, 24, 28, 31]]
});*/
progressionChords.push(['C', 'D7', 'G7', 'C']);
progressionChords.push(['C7', 'F', 'Fm', 'C']);
progressionChords.push(['C', 'D7', 'Fm', 'C']);
progressionChords.push(['Am', 'D9', 'Fm', 'C']);
progressionChords.push(['Bm', 'A', 'E']);
progressionChords.push(['Em', 'D', 'C', 'B7']);
progressionChords.push(['Em', 'G', 'D', 'C']);
progressionChords.push(['Bm', 'A', 'G', 'F#']);
progressionChords.push(['Em', 'G', 'C', 'Am']);
//https://blog.landr.com/emotional-chord-progressions

progressionChords.push(['C', 'D7', 'F', 'C']);
progressionChords.push(['C', 'F', 'G', 'G7']);
progressionChords.push(['C', 'Am', 'E', 'G']);
progressionChords.push(['C', 'Gm', 'Dm']);
progressionChords.push(['Am', 'G', 'D']);
progressionChords.push(['C', 'G', 'Am', 'Em', 'F', 'C', 'F', 'G']);
progressionChords.push(['C', 'G', 'Bm', 'F']);
progressionChords.push(['Asus2', 'E', 'B', 'G']);
progressionChords.push(['E', 'B', 'C#m', 'Abm', 'A']);
progressionChords.push(['F', 'Em', 'Am', 'G', 'Am']);
progressionChords.push(['G7', 'C', 'C9', 'Dm7', 'C']);
progressionChords.push(['F#m7', 'B7', 'E', 'A']);
progressionChords.push(['Am7', 'Dm7', 'G7', 'Cm7']);
progressionChords.push(['Em', 'G', 'D', 'C', 'A']);
progressionChords.push(['Dm', 'F', 'C']);
progressionChords.push(['D', 'Am7', 'G']);
progressionChords.push(['E', 'A', 'B']);
progressionChords.push(['F', 'Bb', 'C']);
//
progressionChords.push(['Am', 'Em', 'Am', 'Am', 'C', 'G', 'C', 'C', 'Dm', 'Am', 'Em', 'Am']);
//https://www.rishamanis.com/uroki-muzyki/krasivye-akkordy-i-garmonii/bystryj-podbor-akkordov/
progressionChords.push(['Am7', 'Em7', 'D6sus4', 'Dm7']);
progressionChords.push(['C', 'F', 'G', 'Am']);
progressionChords.push(['Am', 'Em', 'G', 'Dm']);
progressionChords.push(['Dm', 'Am', 'C', 'G']);
progressionChords.push(['Am', 'G', 'Dm7']);
progressionChords.push(['F', 'Am', 'G']);
progressionChords.push(['Am', 'G', 'Em', 'F']);
progressionChords.push(['Am', 'Dm', 'F', 'G']);
//https://www.rishamanis.com/uroki-muzyki/krasivye-akkordy-i-garmonii/grustnye-akkordy/
progressionChords.push(['Am7', 'F7', 'G', 'Em7']);
progressionChords.push(['Am', 'D6sus4', 'Dm', 'F', 'G', 'Dm7']);
progressionChords.push(['Am', 'G', 'C', 'F', 'E', 'E7']);
progressionChords.push(['Dm', 'F', 'Am', 'G']);
progressionChords.push(['Am', 'F7', 'G', 'Em', 'F', 'G']);
progressionChords.push(['Am', 'G', 'Dm', 'F', 'G', 'Am']);
progressionChords.push(['F', 'Em7', 'Am', 'G']);
progressionChords.push(['Am', 'B', 'Gm']);
progressionChords.push(['Am', 'E', 'Em', 'D', 'Dm', 'Am', 'Adim', 'E']);
//https://www.rishamanis.com/uroki-muzyki/uroki-muzyki/krasivye-akkordy-i-garmonii/magornye-akkordy/
progressionChords.push(['C', 'G', 'F', 'G', 'C']);
progressionChords.push(['C', 'Am', 'Em', 'F']);
progressionChords.push(['F', 'Am', 'G', 'D']);
progressionChords.push(['C', 'Dm', 'F', 'G']);
progressionChords.push(['Am', 'F', 'C', 'G']);
progressionChords.push(['D', 'A', 'C', 'G']);
progressionChords.push(['G', 'Am', 'F']);
progressionChords.push(['C', 'Dm', 'Am7', 'F', 'G', 'C']);
//https://blog.pedalzoo.ru/music-theory/chord-progressions/
progressionChords.push(['C', 'G', 'Am', 'F']); //I-V-VI-IV
progressionChords.push(['C', 'E', 'A', 'F']);
progressionChords.push(['C', 'E', 'Am', 'F']);
progressionChords.push(['C', 'Am', 'F']);
progressionChords.push(['C', 'D', 'Am', 'F']);
progressionChords.push(['C', 'F', 'Am', 'F']);
progressionChords.push(['Am', 'F', 'C', 'G']); //VI-IV-I-V
progressionChords.push(['F', 'C', 'G', 'Am']);
progressionChords.push(['G', 'Am', 'F', 'C']);
progressionChords.push(['C', 'Am', 'F', 'G']); //I-vi-IV-V
progressionChords.push(['C', 'F', 'G', 'C']); //I-IV-V-I
progressionChords.push(['C', 'F', 'G', 'F']);
progressionChords.push(['C', 'G', 'F', 'G']);
progressionChords.push(['Am', 'Dm', 'Em', 'E7']);
progressionChords.push(['F', 'G', 'Am']); //bVI-bVII-i
progressionChords.push(['C', 'A', 'D', 'G']); //I-VI-II-V
//https://proguitarworld.ru/akkordovye-posledovatelnosti/
progressionChords.push(['C', 'Am', 'Fm', 'G']);
progressionChords.push(['C', 'Am', 'Dm', 'G']);
progressionChords.push(['G', 'D', 'Em', 'Bm', 'C', 'G', 'C', 'D']);
progressionChords.push(['G', 'D', 'Em', 'C']);
progressionChords.push(['Am', 'G', 'F', 'E']);
//
drumPatterns.push({
    start: {
        duration: 2,
        beats: [{
                step: 0,
                drum: BassDrum
            }, {
                step: 0,
                drum: OpenHiHat
            }
        ]
    },
    body: {
        duration: 8,
        beats: [{
                step: 0,
                drum: BassDrum
            }, {
                step: 2,
                drum: ClosedHiHat
            }, {
                step: 4,
                drum: BassDrum
            }, {
                step: 4,
                drum: SnareDrum
            }, {
                step: 6,
                drum: ClosedHiHat
            }, {
                step: 7,
                drum: ClosedHiHat
            }
        ]
    },
    end: {
        duration: 4,
        beats: [{
                step: 0,
                drum: BassDrum
            }, {
                step: 1,
                drum: LowTom
            }, {
                step: 2,
                drum: SnareDrum
            }, {
                step: 3,
                drum: MidTom
            }
        ]
    }
});
drumPatterns.push({
    start: {
        duration: 0,
        beats: [
        ]
    },
    body: {
        duration: 16,
        beats: [{
                step: 0,
                drum: OpenHiHat
            }, {
                step: 0,
                drum: BassDrum
            }, {
                step: 2,
                drum: ClosedHiHat
            }, {
                step: 3,
                drum: ClosedHiHat
            }, {
                step: 3,
                drum: BassDrum
            }, {
                step: 4,
                drum: OpenHiHat
            }, {
                step: 4,
                drum: SnareDrum
            }, {
                step: 6,
                drum: ClosedHiHat
            }, {
                step: 7,
                drum: ClosedHiHat
            }, {
                step: 7,
                drum: SnareDrum
            }, {
                step: 8,
                drum: OpenHiHat
            }, {
                step: 8,
                drum: BassDrum
            }, {
                step: 10,
                drum: ClosedHiHat
            }, {
                step: 10,
                drum: BassDrum
            }, {
                step: 11,
                drum: ClosedHiHat
            }, {
                step: 12,
                drum: OpenHiHat
            }, {
                step: 12,
                drum: SnareDrum
            }, {
                step: 14,
                drum: ClosedHiHat
            }, {
                step: 15,
                drum: OpenHiHat
            }
        ]
    },
    end: {
        duration: 8,
        beats: [{
                step: 0,
                drum: OpenHiHat
            }, {
                step: 0,
                drum: SnareDrum
            }, {
                step: 2,
                drum: ClosedHiHat
            }, {
                step: 2,
                drum: BassDrum
            }, {
                step: 3,
                drum: ClosedHiHat
            }, {
                step: 3,
                drum: SnareDrum
            }, {
                step: 4,
                drum: OpenHiHat
            }, {
                step: 4,
                drum: SnareDrum
            }, {
                step: 4,
                drum: SnareDrum
            }, {
                step: 5,
                drum: BassDrum
            }, {
                step: 5,
                drum: SnareDrum
            }, {
                step: 6,
                drum: ClosedHiHat
            }, {
                step: 6,
                drum: SnareDrum
            }, {
                step: 7,
                drum: OpenHiHat
            }, {
                step: 7,
                drum: LowTom
            }
        ]
    }
});
drumPatterns.push({
    start: {
        duration: 1,
        beats: [{
                drum: BassDrum,
                step: 0
            }, {
                drum: SplashCymbal,
                step: 0
            }
        ]
    },
    body: {
        duration: 8,
        beats: [{
                drum: BassDrum,
                step: 0
            }, {
                drum: ClosedHiHat,
                step: 0
            }, {
                drum: ClosedHiHat,
                step: 2
            }, {
                drum: SnareDrum,
                step: 4
            }, {
                drum: ClosedHiHat,
                step: 4
            }, {
                drum: ClosedHiHat,
                step: 6
            }
        ]
    },
    end: {
        duration: 8,
        beats: [{
                drum: BassDrum,
                step: 0
            }, {
                drum: ClosedHiHat,
                step: 0
            }, {
                drum: ClosedHiHat,
                step: 2
            }, {
                drum: SnareDrum,
                step: 2
            }, {
                drum: SnareDrum,
                step: 4
            }, {
                drum: ClosedHiHat,
                step: 4
            }, {
                drum: SnareDrum,
                step: 5
            }, {
                drum: ClosedHiHat,
                step: 6
            }, {
                drum: SnareDrum,
                step: 6
            }
        ]
    }
});
drumPatterns.push({
    start: {
        duration: 1,
        beats: [{
                drum: SplashCymbal,
                step: 0
            }, {
                step: 0,
                drum: BassDrum
            }
        ]
    },
    body: {
        duration: 16,
        beats: [{
                drum: OpenHiHat,
                step: 0
            }, {
                step: 0,
                drum: BassDrum
            }, {
                drum: ClosedHiHat,
                step: 2
            }, {
                drum: ClosedHiHat,
                step: 3
            }, {
                drum: OpenHiHat,
                step: 4
            }, {
                drum: SnareDrum,
                step: 4
            }, {
                drum: ClosedHiHat,
                step: 6
            }, {
                drum: ClosedHiHat,
                step: 7
            }, {
                drum: SnareDrum,
                step: 7
            }, {
                drum: OpenHiHat,
                step: 8
            }, {
                drum: SnareDrum,
                step: 9
            }, {
                drum: ClosedHiHat,
                step: 10
            }, {
                step: 10,
                drum: BassDrum
            }, {
                drum: ClosedHiHat,
                step: 11
            }, {
                drum: OpenHiHat,
                step: 12
            }, {
                drum: SnareDrum,
                step: 12
            }, {
                drum: ClosedHiHat,
                step: 14
            }, {
                step: 14,
                drum: BassDrum
            }, {
                drum: ClosedHiHat,
                step: 15
            }
        ]
    },
    end: {
        duration: 16,
        beats: [{
                drum: OpenHiHat,
                step: 0
            }, {
                step: 0,
                drum: BassDrum
            }, {
                drum: ClosedHiHat,
                step: 2
            }, {
                drum: ClosedHiHat,
                step: 3
            }, {
                drum: OpenHiHat,
                step: 4
            }, {
                drum: SnareDrum,
                step: 4
            }, {
                drum: ClosedHiHat,
                step: 6
            }, {
                step: 6,
                drum: BassDrum
            }, {
                drum: ClosedHiHat,
                step: 7
            }, {
                drum: SnareDrum,
                step: 7
            }, {
                drum: OpenHiHat,
                step: 8
            }, {
                drum: BassDrum,
                step: 9
            }, {
                drum: ClosedHiHat,
                step: 10
            }, {
                step: 10,
                drum: SnareDrum
            }, {
                drum: OpenHiHat,
                step: 12
            }, {
                drum: BassDrum,
                step: 12
            }, {
                drum: SnareDrum,
                step: 13
            }, {
                drum: SnareDrum,
                step: 14
            }, {
                drum: SnareDrum,
                step: 15
            }
        ]
    }
});
drumPatterns.push({
    start: {
        duration: 2,
        beats: [{
                drum: SplashCymbal,
                step: 0
            }, {
                step: 0,
                drum: BassDrum
            }
        ]
    },
    body: {
        duration: 16,
        beats: [{
                drum: ClosedHiHat,
                step: 0
            }, {
                drum: BassDrum,
                step: 0
            }, {
                drum: ClosedHiHat,
                step: 1
            }, {
                drum: OpenHiHat,
                step: 2
            }, {
                drum: LowTom,
                step: 2
            }, {
                drum: ClosedHiHat,
                step: 3
            }, {
                drum: ClosedHiHat,
                step: 4
            }, {
                drum: BassDrum,
                step: 4
            }, {
                drum: SnareDrum,
                step: 4
            }, {
                drum: ClosedHiHat,
                step: 5
            }, {
                drum: OpenHiHat,
                step: 6
            }, {
                drum: ClosedHiHat,
                step: 7
            }, {
                drum: ClosedHiHat,
                step: 8
            }, {
                drum: BassDrum,
                step: 8
            }, {
                drum: ClosedHiHat,
                step: 9
            }, {
                drum: OpenHiHat,
                step: 10
            }, {
                drum: LowTom,
                step: 10
            }, {
                drum: ClosedHiHat,
                step: 11
            }, {
                drum: ClosedHiHat,
                step: 12
            }, {
                drum: BassDrum,
                step: 12
            }, {
                drum: SnareDrum,
                step: 12
            }, {
                drum: ClosedHiHat,
                step: 13
            }, {
                drum: OpenHiHat,
                step: 14
            }, {
                drum: ClosedHiHat,
                step: 15
            }
        ]
    },
    end: {
        duration: 8,
        beats: [{
                drum: ClosedHiHat,
                step: 0
            }, {
                drum: BassDrum,
                step: 0
            }, {
                drum: ClosedHiHat,
                step: 1
            }, {
                drum: OpenHiHat,
                step: 2
            }, {
                drum: LowTom,
                step: 2
            }, {
                drum: BassDrum,
                step: 2
            }, {
                drum: OpenHiHat,
                step: 4
            }, {
                drum: BassDrum,
                step: 4
            }, {
                drum: SnareDrum,
                step: 4
            }, {
                drum: OpenHiHat,
                step: 6
            }, {
                drum: BassDrum,
                step: 6
            }, {
                drum: LowTom,
                step: 6
            }
        ]
    }
});
drumPatterns.push({
    start: {
        duration: 1,
        beats: [{
                drum: SplashCymbal,
                step: 0
            }, {
                step: 0,
                drum: BassDrum
            }
        ]
    },
    body: {
        duration: 16,
        beats: [{
                drum: ClosedHiHat,
                step: 0
            }, {
                drum: BassDrum,
                step: 0
            }, {
                drum: OpenHiHat,
                step: 2
            }, {
                drum: ClosedHiHat,
                step: 4
            }, {
                drum: SnareDrum,
                step: 4
            }, {
                drum: ClosedHiHat,
                step: 5
            }, {
                drum: ClosedHiHat,
                step: 6
            }, {
                drum: BassDrum,
                step: 7
            }, {
                drum: ClosedHiHat,
                step: 8
            }, {
                drum: BassDrum,
                step: 8
            }, {
                drum: ClosedHiHat,
                step: 10
            }, {
                drum: BassDrum,
                step: 10
            }, {
                drum: ClosedHiHat,
                step: 12
            }, {
                drum: SnareDrum,
                step: 12
            }, {
                drum: ClosedHiHat,
                step: 13
            }, {
                drum: ClosedHiHat,
                step: 14
            }, {
                drum: BassDrum,
                step: 14
            }
        ]
    },
    end: {
        duration: 8,
        beats: [{
                drum: ClosedHiHat,
                step: 0
            }, {
                drum: BassDrum,
                step: 0
            }, {
                drum: LowTom,
                step: 1
            }, {
                drum: OpenHiHat,
                step: 2
            }, {
                drum: BassDrum,
                step: 2
            }, {
                drum: LowTom,
                step: 2
            }, {
                drum: OpenHiHat,
                step: 4
            }, {
                drum: SnareDrum,
                step: 4
            }, {
                drum: LowTom,
                step: 5
            }, {
                drum: OpenHiHat,
                step: 6
            }, {
                drum: BassDrum,
                step: 6
            }, {
                drum: LowTom,
                step: 6
            }
        ]
    }
});
drumPatterns.push({
    start: {
        duration: 1,
        beats: [{
                drum: SplashCymbal,
                step: 0
            }, {
                step: 0,
                drum: BassDrum
            }
        ]
    },
    body: {
        duration: 16,
        beats: [
		{drum: BassDrum,step: 0},{drum: BassDrum,step: 3},{drum: BassDrum,step: 5},{drum: BassDrum,step: 8},{drum: BassDrum,step: 9},{drum: BassDrum,step: 11}
		,{drum: SnareDrum,step: 4},{drum: SnareDrum,step: 12}
		,{drum: OpenHiHat,step: 0},{drum: OpenHiHat,step: 4},{drum: OpenHiHat,step: 8},{drum: OpenHiHat,step: 12}
		
        ]
    },
    end: {
        duration: 4,
        beats: [{
                drum: BassDrum,
                step: 0
            }, {
                drum: MidTom,
                step: 1
            }, {
                drum: SnareDrum,
                step: 2
            }, {
                drum: LowTom,
                step: 3
            }
        ]
    }
});
drumPatterns.push({
    start: {
        duration: 1,
        beats: [{
                drum: SplashCymbal,
                step: 0
            }, {
                step: 0,
                drum: BassDrum
            }
        ]
    },
    body: {
        duration: 8,
        beats: [{
                drum: BassDrum,
                step: 0
            }, {
                drum: ClosedHiHat,
                step: 2
            }, {
                drum: BassDrum,
                step: 4
            }, {
                drum: SnareDrum,
                step: 4
            }, {
                drum: ClosedHiHat,
                step: 6
            }
        ]
    },
    end: {
        duration: 4,
        beats: [{
                drum: BassDrum,
                step: 0
            }, {
                drum: SnareDrum,
                step: 0
            }, {
                drum: SnareDrum,
                step: 1
            }, {
                drum: ClosedHiHat,
                step: 2
            }, {
                drum: SnareDrum,
                step: 2
            }
        ]
    }
});
drumPatterns.push({
    start: {
        duration: 1,
        beats: [{
                drum: SplashCymbal,
                step: 0
            }, {
                step: 0,
                drum: BassDrum
            }
        ]
    },
    body: {
        duration: 8,
        beats: [{
                drum: BassDrum,
                step: 0
            }, {
                drum: ClosedHiHat,
                step: 2
            }, {
                drum: BassDrum,
                step: 4
            }, {
                drum: ClosedHiHat,
                step: 6
            }
        ]
    },
    end: {
        duration: 4,
        beats: [{
                drum: BassDrum,
                step: 0
            }, {
                drum: BassDrum,
                step: 1
            }, {
                drum: ClosedHiHat,
                step: 2
            }, {
                drum: BassDrum,
                step: 2
            }, {
                drum: BassDrum,
                step: 3
            }
        ]
    }
});
bassPatterns.push({
    attack: {
        duration: 0,
        beats: [
        ]
    },
    suspend: {
        duration: 16,
        beats: [{
                keys: [1],
                alter: 0,
                length: 2,
                step: 0
            }, {
                keys: [1],
                alter: 0,
                length: 2,
                step: 2
            }, {
                keys: [1],
                alter: 0,
                length: 2,
                step: 6
            }, {
                keys: [1],
                alter: 0,
                length: 2,
                step: 10
            }, {
                keys: [2],
                alter: 0,
                length: 2,
                step: 12
            }, {
                keys: [1],
                alter: 0,
                length: 2,
                step: 14
            }
        ]
    },
    decay: {
        duration: 0,
        beats: []
    }
});
bassPatterns.push({
    attack: {
        duration: 0,
        beats: []
    },
    suspend: {
        duration: 2,
        beats: [{
                keys: [1],
                alter: 0,
                length: 2,
                step: 0
            }
        ]
    },
    decay: {
        duration: 0,
        beats: []
    }
});
bassPatterns.push({
    attack: {
        duration: 0,
        beats: [
        ]
    },
    suspend: {
        duration: 32,
        beats: [{
                keys: [1],
                alter: 0,
                length: 4,
                step: 0
            }, {
                keys: [1],
                alter: 0,
                length: 1,
                step: 6
            }, {
                keys: [1],
                alter: 0,
                length: 4,
                step: 8
            }, {
                keys: [1],
                alter: 0,
                length: 1,
                step: 14
            }, {
                keys: [1],
                alter: 0,
                length: 4,
                step: 16
            }, {
                keys: [1],
                alter: 0,
                length: 1,
                step: 22
            }, {
                keys: [1],
                alter: 0,
                length: 2,
                step: 24
            }, {
                keys: [2],
                alter: 0,
                length: 2,
                step: 26
            }, {
                keys: [1],
                alter: 0,
                length: 2,
                step: 28
            }, {
                keys: [3],
                alter: 0,
                length: 2,
                step: 30
            }
        ]
    },
    decay: {
        duration: 0,
        beats: []
    }
});
bassPatterns.push({
    attack: {
        duration: 0,
        beats: [
        ]
    },
    suspend: {
        duration: 32,
        beats: [{
                keys: [1],
                alter: 0,
                length: 2,
                step: 0
            }, {
                keys: [1],
                alter: 0,
                length: 1,
                step: 3
            }, {
                keys: [1],
                alter: 0,
                length: 2,
                step: 6
            }, {
                keys: [1],
                alter: 0,
                length: 1,
                step: 9
            }, {
                keys: [2],
                alter: -12,
                length: 1,
                step: 10
            }, {
                keys: [3],
                alter: -12,
                length: 1,
                step: 11
            }, {
                keys: [1],
                alter: 0,
                length: 4,
                step: 12
            }, {
                keys: [1],
                alter: 0,
                length: 2,
                step: 16
            }, {
                keys: [1],
                alter: 0,
                length: 1,
                step: 19
            }, {
                keys: [1],
                alter: 0,
                length: 4,
                step: 22
            }, {
                keys: [2],
                alter: -12,
                length: 1,
                step: 26
            }, {
                keys: [2],
                alter: -12,
                length: 1,
                step: 27
            }, {
                keys: [3],
                alter: -12,
                length: 2,
                step: 28
            }, {
                keys: [4],
                alter: -12,
                length: 2,
                step: 30
            }
        ]
    },
    decay: {
        duration: 0,
        beats: []
    }
});
bassPatterns.push({
    attack: {
        duration: 0,
        beats: [
        ]
    },
    suspend: {
        duration: 16,
        beats: [{
                keys: [1],
                alter: 0,
                length: 2,
                step: 0
            }, {
                keys: [1],
                alter: 0,
                length: 1,
                step: 2
            }, {
                keys: [1],
                alter: 0,
                length: 2,
                step: 3
            }, {
                keys: [1],
                alter: 0,
                length: 1,
                step: 5
            }, {
                keys: [1],
                alter: 0,
                length: 1,
                step: 6
            }, {
                keys: [1],
                alter: 0,
                length: 1,
                step: 7
            }, {
                keys: [1],
                alter: 0,
                length: 1,
                step: 8
            }, {
                keys: [1],
                alter: 0,
                length: 2,
                step: 9
            }, {
                keys: [1],
                alter: 0,
                length: 1,
                step: 11
            }, {
                keys: [1],
                alter: 0,
                length: 1,
                step: 12
            }, {
                keys: [1],
                alter: 0,
                length: 1,
                step: 13
            }, {
                keys: [1],
                alter: 0,
                length: 1,
                step: 14
            }, {
                keys: [1],
                alter: 0,
                length: 1,
                step: 15
            }
        ]
    },
    decay: {
        duration: 0,
        beats: []
    }
});
bassPatterns.push({
    attack: {
        duration: 0,
        beats: [
        ]
    },
    suspend: {
        duration: 32,
        beats: [{
                keys: [1],
                alter: 0,
                length: 2,
                step: 0
            }, {
                keys: [1],
                alter: 0,
                length: 4,
                step: 2
            }, {
                keys: [1],
                alter: 0,
                length: 4,
                step: 6
            }, {
                keys: [1],
                alter: 0,
                length: 4,
                step: 10
            }, {
                keys: [1],
                alter: 0,
                length: 2,
                step: 14
            }, {
                keys: [1],
                alter: 0,
                length: 2,
                step: 18
            }, {
                keys: [3],
                alter: -12,
                length: 4,
                step: 22
            }, {
                keys: [4],
                alter: -12,
                length: 4,
                step: 26
            }, {
                keys: [1],
                alter: 0,
                length: 2,
                step: 30
            }
        ]
    },
    decay: {
        duration: 0,
        beats: []
    }
});
bassPatterns.push({
    attack: {
        duration: 0,
        beats: [
        ]
    },
    suspend: {
        duration: 16,
        beats: [{
                keys: [1],
                alter: 0,
                length: 2,
                step: 0
            }, {
                keys: [1],
                alter: 0,
                length: 2,
                step: 2
            }, {
                keys: [2],
                alter: 0,
                length: 1,
                step: 4
            }, {
                keys: [3],
                alter: 0,
                length: 1,
                step: 5
            }, {
                keys: [1],
                alter: 0,
                length: 2,
                step: 6
            }, {
                keys: [3],
                alter: -12,
                length: 2,
                step: 8
            }, {
                keys: [3],
                alter: -12,
                length: 2,
                step: 10
            }, {
                keys: [4],
                alter: -12,
                length: 2,
                step: 12
            }, {
                keys: [4],
                alter: -12,
                length: 2,
                step: 14
            }
        ]
    },
    decay: {
        duration: 0,
        beats: []
    }
});
bassPatterns.push({
    attack: {
        duration: 0,
        beats: [
        ]
    },
    suspend: {
        duration: 16,
        beats: [{
                keys: [1],
                alter: 0,
                length: 3,
                step: 0
            }, {
                keys: [2],
                alter: -12,
                length: 1,
                step: 3
            }, {
                keys: [3],
                alter: -12,
                length: 1,
                step: 4
            }, {
                keys: [4],
                alter: -12,
                length: 1,
                step: 5
            }, {
                keys: [5],
                alter: -12,
                length: 3,
                step: 6
            }, {
                keys: [2],
                alter: 0,
                length: 1,
                step: 9
            }, {
                keys: [3],
                alter: -12,
                length: 3,
                step: 10
            }, {
                keys: [2],
                alter: 0,
                length: 1,
                step: 13
            }, {
                keys: [3],
                alter: -12,
                length: 2,
                step: 14
            }
        ]
    },
    decay: {
        duration: 0,
        beats: []
    }
});
bassPatterns.push({
    attack: {
        duration: 0,
        beats: [
        ]
    },
    suspend: {
        duration: 4,
        beats: [{
                keys: [1],
                alter: 0,
                length: 1,
                step: 0
            }, {
                keys: [1],
                alter: 0,
                length: 1,
                step: 1
            }, {
                keys: [1],
                alter: +12,
                length: 1,
                step: 2
            }, {
                keys: [1],
                alter: +12,
                length: 1,
                step: 3
            }
        ]
    },
    decay: {
        duration: 0,
        beats: []
    }
});
bassPatterns.push({
    attack: {
        duration: 0,
        beats: [
        ]
    },
    suspend: {
        duration: 4,
        beats: [{
                keys: [1],
                alter: 0,
                length: 2,
                step: 0
            }, {
                keys: [1],
                alter: +12,
                length: 2,
                step: 2
            }
        ]
    },
    decay: {
        duration: 0,
        beats: []
    }
});
bassPatterns.push({
    attack: {
        duration: 0,
        beats: [
        ]
    },
    suspend: {
        duration: 16,
        beats: [{
                keys: [1],
                alter: +12,
                length: 1,
                step: 0
            }, {
                keys: [1],
                alter: 0,
                length: 2,
                step: 2
            },{
                keys: [1],
                alter: +12,
                length: 1,
                step: 4
            }, {
                keys: [1],
                alter: 0,
                length: 2,
                step: 6
            },{
                keys: [1],
                alter: +12,
                length: 1,
                step: 8
            }, {
                keys: [1],
                alter: 0,
                length: 2,
                step: 10
            },{
                keys: [1],
                alter: +12,
                length: 1,
                step: 12
            }, {
                keys: [1],
                alter: 0,
                length: 1,
                step: 13
            },{
                keys: [1],
                alter: +12,
                length: 1,
                step: 14
            }, {
                keys: [1],
                alter: 0,
                length: 1,
                step: 15
            }
        ]
    },
    decay: {
        duration: 0,
        beats: []
    }
});
bassPatterns.push({
    attack: {
        duration: 0,
        beats: [
        ]
    },
    suspend: {
        duration: 16,
        beats: [{
                keys: [1],
                alter: 0,
                length: 2,
                step: 0
            }, {
                keys: [3],
                alter: 0,
                length: 2,
                step: 2
            }, {
                keys: [4],
                alter: 0,
                length: 2,
                step: 4
            }, {
                keys: [2],
                alter: 0,
                length: 2,
                step: 6
            }, {
                keys: [3],
                alter: 0,
                length: 2,
                step: 8
            }, {
                keys: [1],
                alter: 0,
                length: 1,
                step: 10
            }, {
                keys: [3],
                alter: 0,
                length: 2,
                step: 11
            }, {
                keys: [1],
                alter: 0,
                length: 1,
                step: 13
            }, {
                keys: [3],
                alter: 0,
                length: 1,
                step: 14
            }, {
                keys: [4],
                alter: 0,
                length: 1,
                step: 15
            }
        ]
    },
    decay: {
        duration: 0,
        beats: []
    }
});
bassPatterns.push({
    attack: {
        duration: 0,
        beats: [
        ]
    },
    suspend: {
        duration: 16,
        beats: [
		{keys: [1],alter: +12,length: 2,step: 0}
		,{keys: [1],alter: +12,length: 3,step: 2}
		,{keys: [2],alter: 0,length: 2,step: 5}
		,{keys: [3],alter: 0,length: 2,step: 7}
		,{keys: [3],alter: 0,length: 2,step: 9}
		,{keys: [1],alter: 0,length: 3,step: 11}
		,{keys: [2],alter: 0,length: 2,step: 14}
        ]
    },
    decay: {
        duration: 0,
        beats: []
    }
});
bassPatterns.push({
    attack: {
        duration: 0,
        beats: [
        ]
    },
    suspend: {
        duration: 16,
        beats: [
		{keys: [1],alter: 0,length: 3,step: 0}
		,{keys: [1],alter: 0,length: 1,step: 3}
		,{keys: [1],alter: 0,length: 5,step: 4}
		,{keys: [2],alter: 0,length: 3,step: 9}
		,{keys: [3],alter: 0,length: 2,step: 12}
		,{keys: [1],alter: 0,length: 2,step: 14}
        ]
    },
    decay: {
        duration: 0,
        beats: []
    }
});
cleanGuitarPatterns.push({
    attack: {
        duration: 0,
        beats: []
    },
    suspend: {
        duration: 16,
        beats: [{
                keys: [],
                alter: 0,
                length: 2,
                step: 0
            }, {
                keys: [],
                alter: 0,
                length: 1,
                step: 2
            }, {
                keys: [],
                alter: 0,
                length: 1,
                step: 15
            }
        ]
    },
    decay: {
        duration: 0,
        beats: []
    }
});
cleanGuitarPatterns.push({
    attack: {
        duration: 0,
        beats: []
    },
    suspend: {
        duration: 8,
        beats: [{
                keys: [],
                alter: 0,
                length: 2,
                step: 0
            }, {
                keys: [-1],
                alter: 0,
                length: 2,
                step: 2
            }, {
                keys: [-2],
                alter: 0,
                length: 3,
                step: 4
            }, {
                keys: [3, 4, 5],
                alter: 0,
                length: 1,
                step: 7
            }
        ]
    },
    decay: {
        duration: 0,
        beats: []
    }
});
cleanGuitarPatterns.push({
    attack: {
        duration: 4,
        beats: [{
                keys: [],
                alter: 0,
                length: 1,
                step: 0
            }, {
                keys: [-2],
                alter: 0,
                length: 1,
                step: 1
            }, {
                keys: [-3],
                alter: 0,
                length: 1,
                step: 2
            }, {
                keys: [-2],
                alter: 0,
                length: 1,
                step: 3
            }
        ]
    },
    suspend: {
        duration: 4,
        beats: [{
                keys: [-1],
                alter: 0,
                length: 1,
                step: 0
            }, {
                keys: [-2],
                alter: 0,
                length: 1,
                step: 1
            }, {
                keys: [-3],
                alter: 0,
                length: 1,
                step: 2
            }, {
                keys: [-2],
                alter: 0,
                length: 1,
                step: 3
            }
        ]
    },
    decay: {
        duration: 0,
        beats: []
    }
});
pianoPatterns.push({
    attack: {
        duration: 0,
        beats: []
    },
    suspend: {
        duration: 32,
        beats: [{
                keys: [],
                alter: 24,
                length: 2,
                step: 0
            }, {
                keys: [],
                alter: 24,
                length: 2,
                step: 4
            }, {
                keys: [],
                alter: 24,
                length: 3,
                step: 8
            }, {
                keys: [],
                alter: 24,
                length: 3,
                step: 11
            }, {
                keys: [],
                alter: 24,
                length: 2,
                step: 14
            }, {
                keys: [],
                alter: 24,
                length: 2,
                step: 18
            }, {
                keys: [],
                alter: 24,
                length: 2,
                step: 21
            }, {
                keys: [],
                alter: 24,
                length: 2,
                step: 24
            }, {
                keys: [],
                alter: 24,
                length: 2,
                step: 27
            }, {
                keys: [],
                alter: 24,
                length: 2,
                step: 30
            }
        ]
    },
    decay: {
        duration: 0,
        beats: []
    }
});
pianoPatterns.push({
    attack: {
        duration: 0,
        beats: []
    },
    suspend: {
        duration: 32,
        beats: [{
                keys: [],
                alter: 24,
                length: 2,
                step: 0
            }, {
                keys: [],
                alter: 24,
                length: 2,
                step: 2
            }, {
                keys: [],
                alter: 24,
                length: 2,
                step: 4
            }, {
                keys: [],
                alter: 24,
                length: 2,
                step: 8
            }, {
                keys: [],
                alter: 24,
                length: 2,
                step: 10
            }, {
                keys: [],
                alter: 24,
                length: 2,
                step: 12
            }, {
                keys: [],
                alter: 24,
                length: 2,
                step: 16
            }, {
                keys: [],
                alter: 24,
                length: 2,
                step: 18
            }, {
                keys: [],
                alter: 24,
                length: 2,
                step: 22
            }, {
                keys: [],
                alter: 24,
                length: 2,
                step: 24
            }, {
                keys: [],
                alter: 24,
                length: 2,
                step: 28
            }
        ]
    },
    decay: {
        duration: 0,
        beats: []
    }
});
pianoPatterns.push({
    attack: {
        duration: 0,
        beats: []
    },
    suspend: {
        duration: 32,
        beats: [{
                keys: [],
                alter: 24,
                length: 2,
                step: 0
            }, {
                keys: [],
                alter: 24,
                length: 2,
                step: 2
            }, {
                keys: [],
                alter: 24,
                length: 2,
                step: 4
            }, {
                keys: [],
                alter: 24,
                length: 2,
                step: 6
            }, {
                keys: [],
                alter: 24,
                length: 2,
                step: 8
            }, {
                keys: [],
                alter: 24,
                length: 2,
                step: 10
            }, {
                keys: [],
                alter: 24,
                length: 1,
                step: 12
            }, {
                keys: [],
                alter: 24,
                length: 3,
                step: 13
            }, {
                keys: [],
                alter: 24,
                length: 2,
                step: 16
            }, {
                keys: [],
                alter: 24,
                length: 2,
                step: 18
            }, {
                keys: [],
                alter: 24,
                length: 2,
                step: 20
            }, {
                keys: [],
                alter: 24,
                length: 2,
                step: 22
            }, {
                keys: [],
                alter: 24,
                length: 1,
                step: 24
            }, {
                keys: [],
                alter: 24,
                length: 3,
                step: 25
            }, {
                keys: [],
                alter: 24,
                length: 4,
                step: 28
            }
        ]
    },
    decay: {
        duration: 0,
        beats: []
    }
});
pianoPatterns.push({
    attack: {
        duration: 0,
        beats: []
    },
    suspend: {
        duration: 16,
        beats: [{
                keys: [],
                alter: 24,
                length: 1,
                step: 0
            }, {
                keys: [],
                alter: 24,
                length: 1,
                step: 2
            }, {
                keys: [],
                alter: 24,
                length: 1,
                step: 4
            }, {
                keys: [],
                alter: 24,
                length: 1,
                step: 5
            }, {
                keys: [],
                alter: 24,
                length: 1,
                step: 6
            }, {
                keys: [],
                alter: 24,
                length: 2,
                step: 8
            }, {
                keys: [],
                alter: 24,
                length: 2,
                step: 10
            }, {
                keys: [],
                alter: 24,
                length: 4,
                step: 12
            }
        ]
    },
    decay: {
        duration: 0,
        beats: []
    }
});

pianoPatterns.push({
    attack: {
        duration: 0,
        beats: []
    },
    suspend: {
        duration: 16,
        beats: [{
                keys: [],
                alter: 24,
                length: 1,
                step: 0
            }, {
                keys: [],
                alter: 24,
                length: 1,
                step: 4
            }, {
                keys: [],
                alter: 24,
                length: 1,
                step: 8
            }, {
                keys: [],
                alter: 24,
                length: 3,
                step: 9
            }, {
                keys: [],
                alter: 24,
                length: 4,
                step: 12
            }
        ]
    },
    decay: {
        duration: 0,
        beats: []
    }
});
pianoPatterns.push({
    attack: {
        duration: 0,
        beats: []
    },
    suspend: {
        duration: 16,
        beats: [{
                keys: [],
                alter: 24,
                length: 1,
                step: 0
            }, {
                keys: [],
                alter: 24,
                length: 1,
                step: 4
            }, {
                keys: [],
                alter: 24,
                length: 2,
                step: 8
            }, {
                keys: [-2],
                alter: 24,
                length: 2,
                step: 10
            }, {
                keys: [],
                alter: 24,
                length: 2,
                step: 12
             }, {
                keys: [-3],
                alter: 24,
                length: 2,
                step: 14
            }
        ]
    },
    decay: {
        duration: 0,
        beats: []
    }
});
pianoPatterns.push({
    attack: {
        duration: 0,
        beats: []
    },
    suspend: {
        duration: 16,
        beats: [{
                keys: [],
                alter: 24,
                length: 1,
                step: 0
            }, {
                keys: [2],
                alter: 24,
                length: 2,
                step: 2
            }, {
                keys: [],
                alter: 24,
                length: 1,
                step: 4
            }, {
                keys: [],
                alter: 24,
                length: 2,
                step: 8
            }, {
                keys: [-1, -2],
                alter: 24,
                length: 2,
                step: 12
            }
        ]
    },
    decay: {
        duration: 0,
        beats: []
    }
});
pianoPatterns.push({
    attack: {
        duration: 0,
        beats: []
    },
    suspend: {
        duration: 32,
        beats: [{
                keys: [],
                alter: 24,
                length: 2,
                step: 0
            }, {
                keys: [-1],
                alter: 24,
                length: 2,
                step: 2
            }, {
                keys: [],
                alter: 24,
                length: 1,
                step: 4
            }, {
                keys: [-1],
                alter: 24,
                length: 2,
                step: 7
            }, {
                keys: [],
                alter: 24,
                length: 2,
                step: 9
            }, {
                keys: [],
                alter: 24,
                length: 3,
                step: 13
            }, {
                keys: [],
                alter: 24,
                length: 1,
                step: 16
            }, {
                keys: [],
                alter: 24,
                length: 3,
                step: 17
            }, {
                keys: [],
                alter: 24,
                length: 4,
                step: 24
            }, {
                keys: [],
                alter: 24,
                length: 1,
                step: 28
            }
        ]
    },
    decay: {
        duration: 0,
        beats: []
    }
});
pianoPatterns.push({
    attack: {
        duration: 0,
        beats: []
    },
    suspend: {
        duration: 8,
        beats: [{
                keys: [1],
                alter: 24,
                length: 2,
                step: 0
            }, {
                keys: [],
                alter: 24,
                length: 1,
                step: 2
            }, {
                keys: [],
                alter: 24,
                length: 1,
                step: 3
            }, {
                keys: [-1],
                alter: 24,
                length: 2,
                step: 4
            }, {
                keys: [],
                alter: 24,
                length: 1,
                step: 6
            }, {
                keys: [],
                alter: 24,
                length: 1,
                step: 7
            }
        ]
    },
    decay: {
        duration: 0,
        beats: []
    }
});

stringPatterns.push({
    attack: {
        duration: 0,
        beats: []
    },
    suspend: {
        duration: 64,
        beats: [{
                keys: [],
                alter: 24,
                length: 0,
                step: 0
            }
        ]
    },
    decay: {
        duration: 0,
        beats: []
    }
});
/*
stringPatterns.push({
attack: {duration: 0,beats: []},suspend: {duration: 64,beats: [{keys: [1],alter: 24,length: 2,step: 0},{keys: [2],alter: 24,length: 1,step: 1},{keys: [],alter: 24,length: 0,step: 2}
]},decay: {duration: 0,beats: []}
});*/
