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
                    pitches.push(-1);
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
var beatsdefs = [
    { category: '', name: '', len16: 16 * 2, encoded: '00010105020f03054010411042104310a011a111a211a311' },
    { category: '', name: '', len16: 16, encoded: '0001010540104110a011a111' }
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
function beat16(measureCount) {
    var encoded = beatsdefs[0].encoded;
    var len16 = beatsdefs[0].len16;
    var cnt = encoded.length / 4;
    var beatdrum = [];
    for (var i = 0; i < cnt; i++) {
        var key = parseInt(encoded.substring(i * 4, i * 4 + 2), 16);
        var data = parseInt(encoded.substring(i * 4 + 2, i * 4 + 4), 16);
        var drum = key >> 5;
        var i32 = key & parseInt('11111', 2);
        //var nn = i32 * 8 + parseDrumStep(data);
        //console.log(i, drum, nn);
        //beatdrum.push({ drum: drum, beat: nn });
        if ((data | parseInt('00000001', 2)) == data)
            beatdrum.push({ drum: drum, beat: i32 * 8 + 0 });
        if ((data | parseInt('00000010', 2)) == data)
            beatdrum.push({ drum: drum, beat: i32 * 8 + 1 });
        if ((data | parseInt('00000100', 2)) == data)
            beatdrum.push({ drum: drum, beat: i32 * 8 + 2 });
        if ((data | parseInt('00001000', 2)) == data)
            beatdrum.push({ drum: drum, beat: i32 * 8 + 3 });
        if ((data | parseInt('00010000', 2)) == data)
            beatdrum.push({ drum: drum, beat: i32 * 8 + 4 });
        if ((data | parseInt('00100000', 2)) == data)
            beatdrum.push({ drum: drum, beat: i32 * 8 + 5 });
        if ((data | parseInt('01000000', 2)) == data)
            beatdrum.push({ drum: drum, beat: i32 * 8 + 6 });
        if ((data | parseInt('10000000', 2)) == data)
            beatdrum.push({ drum: drum, beat: i32 * 8 + 7 });
    }
    console.log(len16, beatdrum);
    var n = 0;
    var beats = [];
    for (var i_1 = 0; i_1 < measureCount * 16; i_1++) {
        /*beats.push({ drum: 0, beat: i * 16 + 0 });
        beats.push({ drum: 2, beat: i * 16 + 4 });
        beats.push({ drum: 0, beat: i * 16 + 8 });
        beats.push({ drum: 2, beat: i * 16 + 12 });*/
        for (var k = 0; k < beatdrum.length; k++) {
            if (beatdrum[k].beat == n) {
                beats.push({ drum: beatdrum[k].drum, beat: i_1 });
            }
        }
        n++;
        if (n >= len16)
            n = 0;
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
                length: 16,
                shift: 0,
                pitch: pitches[k]
            });
        }
        nn = nn + 16;
    }
    return beats;
}
function composeGuitar(chords) {
    var beats = [];
    var nn = 0;
    for (var i = 0; i < chords.length; i++) {
        var chord = chords[i];
        var pitches = findChordPitches(chord, chordfrets);
        for (var k = 0; k < pitches.length; k++) {
            var pitch = pitches[k];
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
var prgrsn = [];
function composeURL() {
    var progression = prgrsn[0];
    var tempo = 120;
    var drumData = beat16(progression.chords.length);
    var gitData = composeGuitar(progression.chords);
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
