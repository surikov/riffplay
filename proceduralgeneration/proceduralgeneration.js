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
function pianoKeysByName(chordName, chordPitches) {
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
    root = root + 24;
    if (chordName.substr(1, 1) == 'b') {
        root--;
        if (root < 0)
            root = root - 12;
        start++;
    }
    r.push(root);
    var chordKind = chordName.substr(start);
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
var strumdefs = [
    {
        category: '', name: '',
        start: 'VV------------------------------',
        end: 'A-'
    }, {
        category: '', name: '',
        start: 'V---A-V---A-V-A-',
        end: 'X...X...V-A-V-A-'
    }
];
var beatsdefs = [
    {
        category: '', name: '',
        start: { len16: 8 * 2, encoded: '0001010540104110a011a111' },
        end: { len16: 8 * 2, encoded: '0089010440104175a011a111' }
    }
];
var chordPitches = [];
var chordfrets = [];
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
        if (i_1 < chords.length * 8 - beatDefinition.end.len16) {
            var chordName = chords[Math.floor(i_1 / 8)];
            if (chordCurrent != chordName) {
                step = 0;
                chordCurrent = chordName;
            }
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
function composeViola(chords, chordPitches) {
    var beats = [];
    var nn = 0;
    for (var i = 0; i < chords.length; i++) {
        var chord = chords[i];
        var pitches = pianoKeysByName(chord, chordPitches);
        for (var k = 0; k < pitches.length; k++) {
            var pitch = pitches[k];
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
function composeGuitar(chords, strums) {
    var beats = [];
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
    var curChord = '';
    for (var i = 0; i < chords.length; i++) {
        //console.log(i,curChord,chords[i]);
        if (chords[i] == curChord) {
            part.push(chords[i]);
        }
        else {
            if (part.length > 0) {
                //console.log(':',part.length,curChord,part);
                addPartGuitar((i - part.length) * 8, part[0], part.length * 8, strums, beats);
            }
            part = [];
            curChord = chords[i];
            part.push(chords[i]);
        }
    }
    //console.log(':',part.length,curChord,part);
    addPartGuitar((chords.length - part.length) * 8, part[0], part.length * 8, strums, beats);
    return beats;
}
function addPartGuitar(stepshift, chordCurrent, len16, strums, beats) {
    //console.log(step, chord, len16);
    var step = 0;
    var durationStrum = [];
    for (var i = 0; i < len16; i++) {
        if (i < len16 - strums.end.length) {
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
var prgrsn = [];
function composeURL() {
    var progression = prgrsn[0];
    var tempo = 120;
    var drumData = beatFill(progression.chords, beatsdefs[0]);
    var gitData = composeGuitar(progression.chords, strumdefs[0]);
    var viData = composeViola(progression.chords, chordPitches);
    var drumVolumes = [4, 4, 6, 4, 6, 6, 6, 6];
    var insVolumes = [7, 6, 4, 7, 4, 7, 5, 7];
    var eqVolumes = [13, 12, 12, 10, 8, 9, 13, 14, 9, 12];
    var url = window.encodeRiffURL(tempo, drumData, gitData.concat(viData), drumVolumes, insVolumes, eqVolumes);
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
