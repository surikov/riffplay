function progressionLen(progression) {
    var c = 0;
    for (var i = 0; i < progression.length; i++) {
        c = c + progression[i].duration;
    }
    return c;
}
function findChord(step, progression) {
    var cu = 0;
    for (var i = 0; i < progression.length; i++) {
        cu = cu + progression[i].duration;
        if (step < cu) {
            return progression[i].chord;
        }
    }
    return '';
}
var progressionChords = [
    ['Am', 'B', 'Gm'],
    ['Am', 'D6sus4', 'Dm', 'F', 'G', 'Dm7'],
    ['Am', 'D9', 'Fm', 'C'],
    ['Am', 'Dm', 'Em', 'E7'],
    ['Am', 'Dm', 'F', 'G'],
    ['Am', 'E', 'Em', 'D', 'Dm', 'Am', 'Adim', 'E'],
    ['Am', 'Em', 'Am', 'Am', 'C', 'G', 'C', 'C', 'Dm', 'Am', 'Em', 'Am'],
    ['Am', 'Em', 'G', 'Dm'],
    ['Am', 'F', 'C', 'G'],
    ['Am', 'F', 'C', 'G'],
    ['Am', 'F7', 'G', 'Em', 'F', 'G'],
    ['Am', 'G', 'C', 'F', 'E', 'E7'],
    ['Am', 'G', 'D'],
    ['Am', 'G', 'Dm', 'F', 'G', 'Am'],
    ['Am', 'G', 'Dm7'],
    ['Am', 'G', 'Em', 'F'],
    ['Am', 'G', 'F', 'E'],
    ['Am7', 'Dm7', 'G7', 'Cm7'],
    ['Am7', 'Em7', 'D6sus4', 'Dm7'],
    ['Am7', 'F7', 'G', 'Em7'],
    ['Asus2', 'E', 'B', 'G'],
    ['Bm', 'A', 'E'],
    ['Bm', 'A', 'G', 'F#'],
    ['C', 'A', 'D', 'G'],
    ['C', 'Am', 'Dm', 'G'],
    ['C', 'Am', 'E', 'G'],
    ['C', 'Am', 'Em', 'F'],
    ['C', 'Am', 'F', 'G'],
    ['C', 'Am', 'F'],
    ['C', 'Am', 'Fm', 'G'],
    ['C', 'D', 'Am', 'F'],
    ['C', 'D7', 'F', 'C'],
    ['C', 'D7', 'Fm', 'C'],
    ['C', 'D7', 'G7', 'C'],
    ['C', 'Dm', 'Am7', 'F', 'G', 'C'],
    ['C', 'Dm', 'F', 'G'],
    ['C', 'E', 'A', 'F'],
    ['C', 'E', 'Am', 'F'],
    ['C', 'F', 'Am', 'F'],
    ['C', 'F', 'G', 'Am'],
    ['C', 'F', 'G', 'C'],
    ['C', 'F', 'G', 'F'],
    ['C', 'F', 'G', 'G7'],
    ['C', 'G', 'Am', 'Em', 'F', 'C', 'F', 'G'],
    ['C', 'G', 'Am', 'F'],
    ['C', 'G', 'Bm', 'F'],
    ['C', 'G', 'F', 'G', 'C'],
    ['C', 'G', 'F', 'G'],
    ['C', 'Gm', 'Dm'],
    ['C7', 'F', 'Fm', 'C'],
    ['Cmaj7', 'Am7', 'Dm7', 'G7', 'Em7', 'A7', 'Dm7', 'G7'],
    ['Cmaj7', 'D7', 'Dm7', 'G7', 'Cmaj7'],
    ['Cmaj7', 'Gm7', 'C7', 'G7', 'Fmaj7'],
    ['D', 'A', 'C', 'G'],
    ['D', 'Am7', 'G'],
    ['D7', 'G7', 'C7', 'F7'],
    ['Dm', 'Am', 'C', 'G'],
    ['Dm', 'F', 'Am', 'G'],
    ['Dm', 'F', 'C'],
    ['Dm7', 'G7', 'Cmaj7', 'C6'],
    ['E', 'A', 'B'],
    ['E', 'B', 'C#m', 'Abm', 'A'],
    ['Em', 'D', 'C', 'B7'],
    ['Em', 'G', 'C', 'Am'],
    ['Em', 'G', 'D', 'C', 'A'],
    ['Em', 'G', 'D', 'C'],
    ['F#m7', 'B7', 'E', 'A'],
    ['F', 'Am', 'G', 'D'],
    ['F', 'Am', 'G'],
    ['F', 'Bb', 'C'],
    ['F', 'C', 'G', 'Am'],
    ['F', 'Em', 'Am', 'G', 'Am'],
    ['F', 'Em7', 'Am', 'G'],
    ['F', 'G', 'Am'],
    ['G', 'Am', 'F', 'C'],
    ['G', 'Am', 'F'],
    ['G', 'D', 'Em', 'Bm', 'C', 'G', 'C', 'D'],
    ['G', 'D', 'Em', 'C'],
    ['G7', 'C', 'C9', 'Dm7', 'C'],
];
