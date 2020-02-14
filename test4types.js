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
