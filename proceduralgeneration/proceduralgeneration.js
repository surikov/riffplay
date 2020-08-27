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
var scaleModeIonian = 'Ionian'; //majorC
var scaleModeDorian = 'Dorian'; //minorDVI+
var scaleModePhrygian = 'Phrygian'; //minorEII-
var scaleModeLydian = 'Lydian'; //majorFIV+
var scaleModeMixolydian = 'Mixolydian'; //majorGVII-
var scaleModeAeolian = 'Aeolian'; //minorA
//
var scaleModeLocrian = 'Locrian'; //minorHII-V-;
//
var chordPitchesList = [];
var fretPitchesList = [];
//let progressionsList2: ChordRow[] = [];
var melodyDefs = [];
var bassDefs = [];
var soloDefs = [];
var strumDefs = [];
var rhythmDefs = [];
var beatsDefs = [];
var allprogressions = [];
//
var scaleModes = [
    { name: scaleModeIonian, pitches: [2, 2, 1, 2, 2, 2, 1] },
    { name: scaleModeDorian, pitches: [2, 1, 2, 2, 2, 1, 2] },
    { name: scaleModePhrygian, pitches: [1, 2, 2, 2, 1, 2, 2] },
    { name: scaleModeLydian, pitches: [2, 2, 2, 1, 2, 2, 1] },
    { name: scaleModeMixolydian, pitches: [2, 2, 1, 2, 2, 1, 2] },
    { name: scaleModeAeolian, pitches: [2, 1, 2, 2, 1, 2, 2] },
    { name: scaleModeLocrian, pitches: [1, 2, 2, 1, 2, 2, 2] }
];
function findScaleMode(name) {
    if (name == scaleModeIonian)
        return scaleModes[0].pitches;
    if (name == scaleModeDorian)
        return scaleModes[1].pitches;
    if (name == scaleModePhrygian)
        return scaleModes[2].pitches;
    if (name == scaleModeLydian)
        return scaleModes[3].pitches;
    if (name == scaleModeMixolydian)
        return scaleModes[4].pitches;
    if (name == scaleModeAeolian)
        return scaleModes[5].pitches;
    if (name == scaleModeLocrian)
        return scaleModes[6].pitches;
    return [];
}
function findModePitches(chordName) {
    var nameLen = 1;
    var steps = [];
    var root = -1;
    var a = chordName.substr(0, 1);
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
    }
    else {
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
    }
    else {
        steps = findScaleMode(scaleModeIonian);
    }
    var pitches = [root];
    pitches.push(pitches[pitches.length - 1] + steps[0]);
    pitches.push(pitches[pitches.length - 1] + steps[1]);
    pitches.push(pitches[pitches.length - 1] + steps[2]);
    pitches.push(pitches[pitches.length - 1] + steps[3]);
    pitches.push(pitches[pitches.length - 1] + steps[4]);
    pitches.push(pitches[pitches.length - 1] + steps[5]);
    return pitches;
}
function findFretKeysByName(name, chordfrets) {
    for (var i = 0; i < chordfrets.length; i++) {
        var cf = chordfrets[i];
        if (cf.name == name) {
            return cf;
        }
    }
    return null;
}
function findChordPitches(chordName, frets) {
    for (var i = 0; i < frets.length; i++) {
        if (frets[i].name == chordName) {
            var s = frets[i].frets;
            var pitches = [];
            for (var k = 0; k < Strings6.length; k++) {
                if (s[k] < 0) {
                    //pitches.push(-1);
                }
                else {
                    pitches.push(Strings6[k] + s[k] - 12);
                }
            }
            return pitches;
        }
    }
    return [-1, -1, -1, -1, -1, -1];
}
function pianoKeysByName(chordName, chordPitches, trans) {
    var retarr = [];
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
    //root = root + 24;
    if (chordName.substr(1, 1) == 'b') {
        root--;
        start++;
    }
    root = root + trans;
    if (root < 0)
        root = root + 12;
    if (root >= 120)
        root = root - 12;
    retarr.push(root);
    var chordKind = chordName.substr(start);
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
function beatFill(chords, beatDefinition) {
    //let encodedstart = beatDefinition.start.encoded
    //let len16 = beatDefinition.start.len16;
    //var cnt = encodedstart.length / 4;
    var b = [];
    for (var i = 0; i < beatDefinition.start.encoded.length / 4; i++) {
        var key = parseInt(beatDefinition.start.encoded.substring(i * 4, i * 4 + 2), 16);
        var data = parseInt(beatDefinition.start.encoded.substring(i * 4 + 2, i * 4 + 4), 16);
        var drum = key >> 5;
        var i32 = key & parseInt('11111', 2);
        if ((data | parseInt('00000001', 2)) == data)
            b.push({ drum: drum, beat: i32 * 8 + 0 });
        if ((data | parseInt('00000010', 2)) == data)
            b.push({ drum: drum, beat: i32 * 8 + 1 });
        if ((data | parseInt('00000100', 2)) == data)
            b.push({ drum: drum, beat: i32 * 8 + 2 });
        if ((data | parseInt('00001000', 2)) == data)
            b.push({ drum: drum, beat: i32 * 8 + 3 });
        if ((data | parseInt('00010000', 2)) == data)
            b.push({ drum: drum, beat: i32 * 8 + 4 });
        if ((data | parseInt('00100000', 2)) == data)
            b.push({ drum: drum, beat: i32 * 8 + 5 });
        if ((data | parseInt('01000000', 2)) == data)
            b.push({ drum: drum, beat: i32 * 8 + 6 });
        if ((data | parseInt('10000000', 2)) == data)
            b.push({ drum: drum, beat: i32 * 8 + 7 });
    }
    var startbeatdrum = b;
    b = [];
    for (var i = 0; i < beatDefinition.end.encoded.length / 4; i++) {
        var key = parseInt(beatDefinition.end.encoded.substring(i * 4, i * 4 + 2), 16);
        var data = parseInt(beatDefinition.end.encoded.substring(i * 4 + 2, i * 4 + 4), 16);
        var drum = key >> 5;
        var i32 = key & parseInt('11111', 2);
        if ((data | parseInt('00000001', 2)) == data)
            b.push({ drum: drum, beat: i32 * 8 + 0 });
        if ((data | parseInt('00000010', 2)) == data)
            b.push({ drum: drum, beat: i32 * 8 + 1 });
        if ((data | parseInt('00000100', 2)) == data)
            b.push({ drum: drum, beat: i32 * 8 + 2 });
        if ((data | parseInt('00001000', 2)) == data)
            b.push({ drum: drum, beat: i32 * 8 + 3 });
        if ((data | parseInt('00010000', 2)) == data)
            b.push({ drum: drum, beat: i32 * 8 + 4 });
        if ((data | parseInt('00100000', 2)) == data)
            b.push({ drum: drum, beat: i32 * 8 + 5 });
        if ((data | parseInt('01000000', 2)) == data)
            b.push({ drum: drum, beat: i32 * 8 + 6 });
        if ((data | parseInt('10000000', 2)) == data)
            b.push({ drum: drum, beat: i32 * 8 + 7 });
    }
    var endbeatdrum = b;
    var step = 0;
    var beats = [];
    var chordCurrent = '';
    for (var i_1 = 0; i_1 < chords.length * 8; i_1++) {
        //console.log(step);
        if (i_1 < chords.length * 8 - beatDefinition.end.len16) {
            /*var chordName = chords[Math.floor(i / 8)];
            if (chordCurrent != chordName) {
                step = 0;
                chordCurrent = chordName;
            }*/
            //console.log(i, step, chords[Math.floor(i / 8)]);
            for (var k = 0; k < startbeatdrum.length; k++) {
                if (startbeatdrum[k].beat == step) {
                    beats.push({ drum: startbeatdrum[k].drum, beat: i_1 });
                }
            }
            step++;
            if (step >= beatDefinition.start.len16) {
                step = 0;
            }
        }
        else {
            var r = i_1 - (chords.length * 8 - beatDefinition.end.len16);
            for (var k = 0; k < endbeatdrum.length; k++) {
                if (endbeatdrum[k].beat == r) {
                    beats.push({ drum: endbeatdrum[k].drum, beat: i_1 });
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
function chordDurations(chords) {
    var durations = [];
    var curChord = '';
    for (var i = 0; i < chords.length; i++) {
        if (chords[i] == curChord) {
            if (durations.length > 0) {
                durations[durations.length - 1].len16 = durations[durations.length - 1].len16 + 8;
            }
        }
        else {
            durations.push({ len16: 8, chord: chords[i] });
            curChord = chords[i];
        }
    }
    return durations;
}
function morphPitch(pitch, fromMode, toMode, needRepitch) {
    var base = (pitch + 12 - fromMode[0]) % 12;
    var step = 0;
    for (var i = 0; i < fromMode.length; i++) {
        if (fromMode[i] > base + fromMode[0]) {
            break;
        }
        step = i;
    }
    //let toneDiff=toMode[0]-fromMode[0];
    //let stepDiff=toMode[step]-fromMode[step]
    //let morphed = pitch + (toMode[0] - fromMode[0]) + ((fromMode[step]-fromMode[0]) - (toMode[step]-toMode[0]));
    if (toMode[0] >= 4)
        pitch = pitch - 12; //E
    //let morphed = repitch(pitch + (toMode[step] - fromMode[step]));
    var morphed = 12 + pitch + (toMode[step] - fromMode[step]);
    if (needRepitch) {
        morphed = repitch(morphed);
    }
    if (morphed < 0)
        morphed = morphed + 12;
    if (morphed >= 120)
        morphed = morphed - 12;
    //console.log(pitch, morphed, base, step, toMode, fromMode);
    return morphed;
}
function repitch(pitch) {
    while (pitch < 4) {
        pitch = pitch + 12;
    }
    return pitch;
}
function addMelody(at, to, current, melody) {
    //console.log(current.chord,melody.start.chord);
    var toMode = findModePitches(current.chord);
    //console.log(toMode);
    var fromMode = findModePitches(melody.chord);
    var start = parseMelody(melody.start.encoded);
    var end = parseMelody(melody.end.encoded);
    var step = 0;
    for (var i = 0; i < current.len16; i++) {
        if ((i < current.len16 - melody.end.len16) || (melody.end.len16 >= current.len16)) {
            for (var k = 0; k < start.length; k++) {
                var note = start[k];
                if (note.beat == step) {
                    var len16 = note.length;
                    if (note.beat + len16 >= start.length) {
                        len16 = start.length - note.beat;
                    }
                    to.push({
                        track: note.track,
                        beat: at + i,
                        length: note.length,
                        shift: note.shift,
                        pitch: morphPitch(note.pitch, fromMode, toMode, false)
                    });
                }
            }
            step++;
            if (step >= melody.start.len16) {
                step = 0;
            }
        }
        else {
            for (var k = 0; k < end.length; k++) {
                var note = end[k];
                if (note.beat == i - (current.len16 - melody.end.len16)) {
                    var len16 = note.length;
                    if (note.beat + len16 >= end.length) {
                        len16 = end.length - note.beat;
                    }
                    to.push({
                        track: note.track,
                        beat: at + i,
                        length: note.length,
                        shift: note.shift,
                        pitch: morphPitch(note.pitch, fromMode, toMode, false)
                    });
                }
            }
        }
    }
}
function composeChordRiffs(chords, melody) {
    var beats = [];
    var durations = chordDurations(chords);
    var nn = 0;
    for (var i = 0; i < durations.length; i++) {
        var current = durations[i];
        addMelody(nn, beats, current, melody);
        nn = nn + current.len16;
    }
    //console.log(beats);
    return beats;
}
function composeFullLine(chords, bass) {
    var beats = [];
    //console.log(toMode);
    var fromMode = findModePitches(bass.chord);
    var line = parseMelody(bass.encoded);
    var step = 0;
    for (var ch = 0; ch < chords.length; ch++) {
        var curChord = chords[ch];
        var toMode = findModePitches(curChord);
        for (var s = 0; s < 8; s++) {
            for (var k = 0; k < line.length; k++) {
                if (line[k].beat == step) {
                    beats.push({
                        track: line[k].track,
                        beat: ch * 8 + s,
                        length: line[k].length,
                        shift: line[k].shift,
                        pitch: morphPitch(line[k].pitch, fromMode, toMode, true)
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
function composePianoRhythm(chords, rhythm, chordPitches) {
    var beats = [];
    var part = [];
    var curChord = '';
    for (var i = 0; i < chords.length; i++) {
        if (chords[i] == curChord) {
            part.push(chords[i]);
        }
        else {
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
function addPartRhythm(stepshift, chordCurrent, len16, rhythm, tobeats, chordPitches) {
    //console.log(step, chord, len16);
    var step = 0;
    var durationStrum = [];
    for (var i = 0; i < len16; i++) {
        if ((i < len16 - rhythm.end.length) || (rhythm.end.length >= len16)) {
            var strumKind = rhythm.start.substr(step, 1);
            if (strumKind == '.') {
                //
            }
            else {
                if (strumKind == '-') {
                    if (durationStrum.length) {
                        //if (durationStrum[durationStrum.length - 1].strumKind != 'X') {
                        durationStrum[durationStrum.length - 1].len16++;
                        //}
                    }
                }
                else {
                    durationStrum.push({ nn: i, strumKind: strumKind, len16: 1, chord: chordCurrent });
                }
            }
            step++;
            if (step >= rhythm.start.length) {
                step = 0;
            }
        }
        else {
            var r = i - (len16 - rhythm.end.length);
            var strumKind = rhythm.end.substr(r, 1);
            if (strumKind == '.') {
                //
            }
            else {
                if (strumKind == '-') {
                    if (durationStrum.length) {
                        durationStrum[durationStrum.length - 1].len16++;
                    }
                }
                else {
                    durationStrum.push({ nn: i, strumKind: strumKind, len16: 1, chord: chordCurrent });
                }
            }
        }
    }
    for (var i = 0; i < durationStrum.length; i++) {
        var strike = durationStrum[i];
        var trans = 12 * Number(strike.strumKind);
        var pitches = pianoKeysByName(strike.chord, chordPitches, trans);
        //let pitches: number[] = findChordPitches(b.chord, chordfrets);
        for (var k = 0; k < pitches.length; k++) {
            //if (!(b.strumKind == 'A' && k == 0)) {
            //if (!(b.strumKind == 'V' && k == pitches.length - 1)) {
            tobeats.push({
                track: 4,
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
function composeGuitarStrum(chords, strums, chordFrets) {
    var beats = [];
    var part = [];
    var curChord = '';
    for (var i = 0; i < chords.length; i++) {
        //console.log(i,curChord,chords[i]);
        if (chords[i] == curChord) {
            part.push(chords[i]);
        }
        else {
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
function addPartGuitar(stepshift, chordCurrent, len16, strums, beats, chordfrets) {
    //console.log(step, chord, len16);
    var step = 0;
    var durationStrum = [];
    for (var i = 0; i < len16; i++) {
        //if (i < len16 - strums.end.length) {
        if ((i < len16 - strums.end.length) || (strums.end.length >= len16)) {
            var strumKind = strums.start.substr(step, 1);
            if (strumKind == '.') {
                //
            }
            else {
                if (strumKind == '-') {
                    if (durationStrum.length) {
                        if (durationStrum[durationStrum.length - 1].strumKind != 'X') {
                            durationStrum[durationStrum.length - 1].len16++;
                        }
                    }
                }
                else {
                    durationStrum.push({ nn: i, strumKind: strumKind, len16: 1, chord: chordCurrent });
                }
            }
            step++;
            if (step >= strums.start.length) {
                step = 0;
            }
        }
        else {
            var r = i - (len16 - strums.end.length);
            var strumKind = strums.end.substr(r, 1);
            if (strumKind == '.') {
                //
            }
            else {
                if (strumKind == '-') {
                    if (durationStrum.length) {
                        if (durationStrum[durationStrum.length - 1].strumKind != 'X') {
                            durationStrum[durationStrum.length - 1].len16++;
                        }
                    }
                }
                else {
                    durationStrum.push({ nn: i, strumKind: strumKind, len16: 1, chord: chordCurrent });
                }
            }
        }
    }
    for (var i = 0; i < durationStrum.length; i++) {
        var b = durationStrum[i];
        var pitches = findChordPitches(b.chord, chordfrets);
        for (var k = 0; k < pitches.length; k++) {
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
function parseMelody(encoded) {
    //console.log(encoded);
    var beats = [];
    var cnt = encoded.length / 9;
    for (var i = 0; i < cnt; i++) {
        beats.push({
            track: parseInt(encoded.substring(i * 9 + 2, i * 9 + 2 + 1), 16),
            beat: parseInt(encoded.substring(i * 9, i * 9 + 2), 16),
            length: parseInt(encoded.substring(i * 9 + 3, i * 9 + 3 + 2), 16),
            shift: parseInt(encoded.substring(i * 9 + 7, i * 9 + 7 + 2), 16) - 64,
            pitch: parseInt(encoded.substring(i * 9 + 5, i * 9 + 5 + 2), 16)
        });
    }
    return beats;
}
function existsdDrum(drums, single) {
    for (var i = 0; i < drums.length; i++) {
        var d = drums[i];
        if (d.beat == single.beat && d.drum == single.drum) {
            return true;
        }
    }
    return false;
}
function existsIns(instrs, single) {
    for (var i = 0; i < instrs.length; i++) {
        var a = instrs[i];
        if (a.beat == single.beat && a.pitch == single.pitch && a.track == single.track) {
            return true;
        }
    }
    return false;
}
function stripDrums(drums) {
    var r = [];
    for (var i = 0; i < drums.length; i++) {
        var single = drums[i];
        //console.log(single);
        if (!existsdDrum(r, single)) {
            r.push(single);
        }
        else {
            console.log('skip');
        }
    }
    //console.log(r,drums);
    return r;
}
function repeatChords(chords, sub) {
    var row = [];
    var nums = [];
    //var seed = Math.random();
    if (chords.length == 2) {
        if (sub < 0.5)
            nums = nums = [0, 0, 1, 1];
        else
            nums = [0, 0, 0, 0, 1, 1, 1, 1];
    }
    if (chords.length == 3) {
        if (sub < 0.5)
            nums = [0, 0, 0, 0, 1, 1, 2, 2];
        else
            nums = [0, 0, 1, 1, 2, 2, 2, 2];
    }
    if (chords.length == 4) {
        if (sub < 0.5)
            nums = [0, 0, 1, 1, 2, 2, 3, 3];
        else
            nums = [0, 0, 0, 1, 2, 2, 2, 3];
    }
    if (chords.length == 5) {
        if (sub < 0.5)
            nums = [0, 0, 1, 1, 2, 2, 3, 4];
        else
            nums = [0, 1, 2, 2, 3, 3, 4, 4];
    }
    if (chords.length == 6) {
        if (sub < 0.5)
            nums = [0, 0, 1, 1, 2, 3, 4, 5];
        else
            nums = [0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 3, 3, 4, 4, 5, 5];
    }
    if (chords.length == 7) {
        if (sub < 0.5)
            nums = [0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 6, 6];
        else
            nums = [0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6];
    }
    if (chords.length == 8) {
        if (sub < 0.5)
            nums = [0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7];
        else
            nums = [0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 7];
    }
    if (chords.length == 9) {
        if (sub < 0.5)
            nums = [0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 8];
        else
            nums = [0, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8];
    }
    for (var i = 0; i < nums.length; i++) {
        row.push(chords[nums[i]]);
    }
    return row;
}
function stripTracks(instrs) {
    var r = [];
    for (var i = 0; i < instrs.length; i++) {
        var single = instrs[i];
        if (!existsIns(r, single)) {
            r.push(single);
        }
    }
    return r;
}
function replaceTracks(instrs, from, to) {
    var r = [];
    for (var i = 0; i < instrs.length; i++) {
        var single = instrs[i];
        if (single.track == from) {
            single.track = to;
        }
    }
}
function composeURL(chordPitches, chordfrets) {
    //let prognum = Math.floor(progressionsList.length * Math.random());
    var nn = Number(document.getElementById('sliderProgression').value);
    var prognum = '' + (Math.floor(allprogressions.length * nn / 1000));
    //prognum=0;
    var progression = allprogressions[prognum];
    //let chordRow: ChordRow = progressionsList[prognum];
    //var arr: string[] = chordRow.chords.split('-');
    //var chords: string[] = repeatChords(arr);
    //let progression: Progression = { category: chordRow.category, name: chordRow.name, chords: chords };
    //console.log(progression);
    var tempo = 120;
    //let drumseed = Math.floor(beatsDefs.length * Math.random());
    nn = Number(document.getElementById('sliderDrum').value);
    var drumseed = '' + (Math.floor(beatsDefs.length * nn / 1000));
    var drumData = beatFill(progression.chords, beatsDefs[drumseed]);
    //let gitStrumData: InsBeat[] = composeGuitarStrum(progression.chords, strumDefs[0],chordfrets);
    //let pianoRhythmData: InsBeat[] = composePianoRhythm(progression.chords, rhythmDefs[0],chordPitches);
    //let melodyData: InsBeat[] = composeMelody(progression.chords, melodyDefs[0]);
    //let viData: InsBeat[] = composeViola(progression.chords, chordPitches);
    nn = Number(document.getElementById('sliderStrum').value);
    var strumseed = Math.floor(strumDefs.length * nn / 1000);
    nn = Number(document.getElementById('sliderBass').value);
    var bassseed = Math.floor(bassDefs.length * nn / 1000);
    nn = Number(document.getElementById('sliderRhythm').value);
    var rhythmseed = Math.floor(rhythmDefs.length * nn / 1000);
    nn = Number(document.getElementById('sliderSolo').value);
    var soloseed = Math.floor(soloDefs.length * nn / 1000);
    nn = Number(document.getElementById('sliderMelody').value);
    var melodyseed = Math.floor(melodyDefs.length * nn / 1000);
    var tracksData = [];
    if (strumDefs[strumseed].start.length) {
        var t = composeGuitarStrum(progression.chords, strumDefs[strumseed], chordfrets);
        tracksData = tracksData.concat(t);
    }
    if (rhythmDefs[rhythmseed].start.length) {
        var t = composePianoRhythm(progression.chords, rhythmDefs[rhythmseed], chordPitches);
        tracksData = tracksData.concat(t);
    }
    if (melodyDefs[melodyseed].start.len16) {
        var t = composeChordRiffs(progression.chords, melodyDefs[melodyseed]);
        tracksData = tracksData.concat(t);
    }
    if (bassDefs[bassseed].len16) {
        var t = composeFullLine(progression.chords, bassDefs[bassseed]);
        //replaceTracks(t,5,7);
        tracksData = tracksData.concat(t);
    }
    if (soloDefs[soloseed].len16) {
        var t = composeFullLine(progression.chords, soloDefs[soloseed]);
        //replaceTracks(t,5,7);
        tracksData = tracksData.concat(t);
    }
    //console.log(parseMelody(melodydefs[0].start.encoded));
    var drumVolumes = [4, 4, 6, 4, 6, 3, 6, 4];
    var insVolumes = [3, 3, 4, 3, 4, 7, 5, 7];
    var eqVolumes = [13, 12, 12, 10, 8, 9, 13, 14, 9, 12];
    //let url = (window as any).encodeRiffURL(tempo, drumData, gitStrumData.concat(viData.concat(pianoRhythmData.concat(melodyData))), drumVolumes, insVolumes, eqVolumes);
    drumData = stripDrums(drumData);
    tracksData = stripTracks(tracksData);
    var url = window.encodeRiffURL(tempo, drumData, tracksData, drumVolumes, insVolumes, eqVolumes);
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
    var nn = Number(document.getElementById('sliderDrum').value);
    document.getElementById('infoDrum').innerHTML = '' + (Math.floor(beatsDefs.length * nn / 1000));
    nn = Number(document.getElementById('sliderBass').value);
    document.getElementById('infoBass').innerHTML = '' + (Math.floor(bassDefs.length * nn / 1000));
    nn = Number(document.getElementById('sliderProgression').value);
    document.getElementById('infoProgression').innerHTML = '' + (Math.floor(allprogressions.length * nn / 1000));
    nn = Number(document.getElementById('sliderStrum').value);
    document.getElementById('infoStrum').innerHTML = '' + (Math.floor(strumDefs.length * nn / 1000));
    nn = Number(document.getElementById('sliderRhythm').value);
    document.getElementById('infoRhythm').innerHTML = '' + (Math.floor(rhythmDefs.length * nn / 1000));
    nn = Number(document.getElementById('sliderSolo').value);
    document.getElementById('infoSolo').innerHTML = '' + (Math.floor(soloDefs.length * nn / 1000));
    nn = Number(document.getElementById('sliderMelody').value);
    document.getElementById('infoMelody').innerHTML = '' + (Math.floor(melodyDefs.length * nn / 1000));
}
document.getElementById('proceduralgeneration').onclick = initApp;
document.getElementById('sliderDrum').value = Math.floor(Math.random() * 1000);
document.getElementById('sliderBass').value = Math.floor(Math.random() * 1000);
document.getElementById('sliderProgression').value = Math.floor(Math.random() * 1000);
document.getElementById('sliderStrum').value = Math.floor(Math.random() * 1000);
document.getElementById('sliderRhythm').value = Math.floor(Math.random() * 1000);
document.getElementById('sliderSolo').value = Math.floor(Math.random() * 1000);
document.getElementById('sliderMelody').value = Math.floor(Math.random() * 1000);
console.log('proceduralgeneration v1.01');
