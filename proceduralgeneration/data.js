
var chordPitchesDatat = [
	{ name: '', pitches: [4, 7] },
	{ name: '5', pitches: [7, 12] },
	{ name: '6', pitches: [4, 7, 9] },
	{ name: '69', pitches: [4, 7, 9, 14] },
	{ name: '6add9', pitches: [4, 7, 9, 14] },
	{ name: '6sus4', pitches: [5, 9] },
	{ name: '7', pitches: [4, 7, 10] },
	{ name: '7sus4', pitches: [5, 7, 10] },
	{ name: '7b5', pitches: [4, 6, 10] },
	{ name: '7-5', pitches: [4, 6, 10] },
	{ name: '7#9', pitches: [4, 7, 10, 15] },
	{ name: '7+9', pitches: [4, 7, 10, 15] },
	{ name: '7b9', pitches: [4, 7, 10, 13] },
	{ name: '9', pitches: [4, 7, 10, 14] },
	{ name: '9#11', pitches: [2, 4, 6, 7, 10] },
	{ name: '9b5', pitches: [4, 6, 10, 14] },
	{ name: '11', pitches: [4, 7, 10, 14, 17] },
	{ name: '13', pitches: [10, 14, 17, 21] },
	{ name: 'add9', pitches: [4, 7, 14] },
	{ name: 'alt', pitches: [4, 6] },
	{ name: 'aug', pitches: [4, 8] },
	{ name: '+', pitches: [4, 8] },
	{ name: 'aug7', pitches: [4, 8, 10] },
	{ name: '+7', pitches: [4, 8, 10] },
	{ name: 'aug9', pitches: [2, 4, 8, 10] },
	{ name: '+9', pitches: [2, 4, 8, 10] },
	{ name: 'dim', pitches: [3, 6] },
	{ name: 'dim7', pitches: [3, 6, 9] },
	{ name: 'm', pitches: [3, 7] },
	{ name: 'm6', pitches: [3, 7, 9] },
	{ name: 'm69', pitches: [3, 7, 9, 14] },
	{ name: 'm6add9', pitches: [3, 7, 9, 14] },
	{ name: 'm7', pitches: [3, 7, 10] },
	{ name: 'm7b5', pitches: [3, 6, 10] },
	{ name: '0', pitches: [3, 6, 10] },
	{ name: 'm9', pitches: [3, 7, 10, 14] },
	{ name: 'm9b5', pitches: [3, 6, 10, 14] },
	{ name: 'm11', pitches: [3, 7, 10, 14, 17] },
	{ name: 'madd9', pitches: [3, 7, 14] },
	{ name: 'maj7', pitches: [4, 7, 11] },
	{ name: 'maj7#5', pitches: [4, 8, 11] },
	{ name: 'maj7b5', pitches: [4, 6, 11] },
	{ name: 'maj9', pitches: [4, 7, 11, 14] },
	{ name: 'maj11', pitches: [2, 4, 5, 7, 11] },
	{ name: 'maj13', pitches: [2, 4, 7, 9, 11] },
	{ name: 'mmaj7', pitches: [3, 7, 11] },
	{ name: 'mmaj7b5', pitches: [3, 6, 11] },
	{ name: 'mmaj9', pitches: [3, 7, 11, 14] },
	{ name: 'mmaj11', pitches: [3, 5, 7, 11] },
	{ name: 'sus2', pitches: [2, 7] },
	{ name: 'sus4', pitches: [5, 7] }
	
];
var chordfretsData = [
	{ name: "A69", pitch: 9, frets: [-1, 0, 4, 4, 2, 2] },
	{ name: "A6", pitch: 9, frets: [-1, 0, 2, 2, 2, 2] },
	{ name: "A11", pitch: 9, frets: [-1, 0, 0, 0, 2, 0] },
	{ name: "A7b9", pitch: 9, frets: [-1, 0, 2, 3, 2, 3] },
	{ name: "A13", pitch: 9, frets: [-1, 0, 2, 0, 2, 2] },
	{ name: "A7#9", pitch: 9, frets: [5, 7, 5, 6, 8, 8] },
	{ name: "A7", pitch: 9, frets: [-1, 0, 2, 0, 2, 0] },
	{ name: "A9", pitch: 9, frets: [5, 4, 2, 0, 0, 0] },
	{ name: "A7b5", pitch: 9, frets: [-1, 0, 1, 2, 2, 3] },
	{ name: "A9b5", pitch: 9, frets: [-1, 0, 1, 4, 2, 3] },
	{ name: "A7sus4", pitch: 9, frets: [-1, 0, 2, 0, 3, 0] },
	{ name: "A9#11", pitch: 9, frets: [-1, 0, 1, 0, 2, 0] },
	{ name: "Aadd9", pitch: 9, frets: [-1, 0, 2, 4, 2, 0] },
	{ name: "Aaug", pitch: 9, frets: [-1, 0, 3, 2, 2, 1] },
	{ name: "Aaug9", pitch: 9, frets: [-1, 0, 3, 4, 2, 3] },
	{ name: "Aalt", pitch: 9, frets: [-1, 0, 1, 2, 2, -1] },
	{ name: "Aaug7", pitch: 9, frets: [-1, 0, 3, 0, 2, 1] },
	{ name: "Am6", pitch: 9, frets: [-1, 0, 2, 2, 1, 2] },
	{ name: "Adim", pitch: 9, frets: [-1, 0, 1, 2, 1, -1] },
	{ name: "Adim7", pitch: 9, frets: [-1, 0, 1, 2, 1, 2] },
	{ name: "Am69", pitch: 9, frets: [-1, 0, 4, 5, 0, 0] },
	{ name: "Am9", pitch: 9, frets: [-1, 0, 2, 4, 1, 3] },
	{ name: "Am11", pitch: 9, frets: [-1, 0, 0, 0, 1, 0] },
	{ name: "Am7b5", pitch: 9, frets: [-1, 0, 1, 0, 1, -1] },
	{ name: "Amadd9", pitch: 9, frets: [-1, 0, 2, 4, 1, 0] },
	{ name: "Am7", pitch: 9, frets: [-1, 0, 2, 0, 1, 0] },
	{ name: "Amaj13", pitch: 9, frets: [-1, 0, 2, 1, 2, 2] },
	{ name: "Amaj11", pitch: 9, frets: [-1, 0, 0, 1, 2, 0] },
	{ name: "Amaj7b5", pitch: 9, frets: [-1, 0, 1, 1, 2, 4] },
	{ name: "Amaj7", pitch: 9, frets: [-1, 0, 2, 1, 2, 0] },
	{ name: "Amaj7#5", pitch: 9, frets: [-1, 0, 3, 1, 2, 1] },
	{ name: "A", pitch: 9, frets: [-1, 0, 2, 2, 2, 0] },
	{ name: "Am", pitch: 9, frets: [-1, 0, 2, 2, 1, 0] },
	{ name: "Amaj9", pitch: 9, frets: [-1, 0, 2, 4, 2, 4] },
	{ name: "Ammaj11", pitch: 9, frets: [-1, 0, 0, 1, 1, 0] },
	{ name: "Ammaj7b5", pitch: 9, frets: [-1, 0, 1, 1, 1, 4] },
	{ name: "Asus2", pitch: 9, frets: [-1, 0, 2, 2, 0, 0] },
	{ name: "Ammaj7", pitch: 9, frets: [-1, 0, 2, 1, 1, 0] },
	{ name: "Ammaj9", pitch: 9, frets: [5, 3, 6, 4, 0, 0] },
	{ name: "Ab11", pitch: 8, frets: [4, 4, 4, 5, 4, 4] },
	{ name: "Asus4", pitch: 9, frets: [-1, 0, 2, 2, 3, 0] },
	{ name: "Ab6", pitch: 8, frets: [-1, 3, 1, 1, 1, 1] },
	{ name: "Ab13", pitch: 8, frets: [4, 1, 3, 1, 1, 2] },
	{ name: "Ab69", pitch: 8, frets: [-1, 1, 1, 1, 1, 1] },
	{ name: "Ab7#9", pitch: 8, frets: [4, 3, 4, 4, 4, 4] },
	{ name: "Ab7b5", pitch: 8, frets: [4, -1, 4, 5, 3, -1] },
	{ name: "Ab7b9", pitch: 8, frets: [-1, 0, 1, 1, 1, 2] },
	{ name: "Ab7", pitch: 8, frets: [-1, -1, 1, 1, 1, 2] },
	{ name: "Ab7sus4", pitch: 8, frets: [-1, -1, 1, 1, 2, 2] },
	{ name: "Ab9#11", pitch: 8, frets: [4, -1, 4, 5, 3, -1] },
	{ name: "Ab9", pitch: 8, frets: [4, 3, 4, 3, 4, -1] },
	{ name: "Abadd9", pitch: 8, frets: [4, 3, -1, 3, 4, -1] },
	{ name: "Abalt", pitch: 8, frets: [-1, -1, 6, 5, 3, 4] },
	{ name: "Ab9b5", pitch: 8, frets: [4, 3, 0, 3, -1, 2] },
	{ name: "Abaug", pitch: 8, frets: [4, 3, 2, 1, 1, -1] },
	{ name: "Abaug7", pitch: 8, frets: [4, -1, 4, 5, 5, 0] },
	{ name: "Abdim", pitch: 8, frets: [4, 2, -1, 4, 3, -1] },
	{ name: "Abaug9", pitch: 8, frets: [2, 1, 2, 1, 1, 2] },
	{ name: "Abdim7", pitch: 8, frets: [-1, -1, 0, 1, 0, 1] },
	{ name: "Abm11", pitch: 8, frets: [4, 2, 4, 3, 2, 2] },
	{ name: "Abm6", pitch: 8, frets: [4, -1, 3, 4, 4, -1] },
	{ name: "Abm69", pitch: 8, frets: [4, -1, 3, 4, 4, 6] },
	{ name: "Abm7", pitch: 8, frets: [4, 6, 4, 4, 4, 4] },
	{ name: "Abm7b5", pitch: 8, frets: [-1, -1, 0, 1, 0, 2] },
	{ name: "Abm9", pitch: 8, frets: [4, 1, 1, 1, 0, 2] },
	{ name: "Abmaj11", pitch: 8, frets: [4, 3, 1, 0, 2, -1] },
	{ name: "Abmadd9", pitch: 8, frets: [4, 2, -1, 3, 4, -1] },
	{ name: "Abmaj13", pitch: 8, frets: [4, 3, 3, 3, 4, 3] },
	{ name: "Abmaj7#5", pitch: 8, frets: [4, 3, 2, 0, 1, 0] },
	{ name: "Ab", pitch: 8, frets: [4, 3, 1, 1, 1, -1] },
	{ name: "Abmaj7b5", pitch: 8, frets: [4, 3, 5, 5, 3, 3] },
	{ name: "Abmaj7", pitch: 8, frets: [4, 6, 5, 5, 4, 4] },
	{ name: "Abmaj9", pitch: 8, frets: [-1, 1, 1, 1, 1, 3] },
	{ name: "Abm", pitch: 8, frets: [4, 6, 6, 4, 4, 4] },
	{ name: "Abmmaj11", pitch: 8, frets: [4, 4, 5, 4, 4, 6] },
	{ name: "Abmmaj7", pitch: 8, frets: [-1, 2, 1, 1, 4, 3] },
	{ name: "Abmmaj9", pitch: 8, frets: [4, -1, 5, 3, 0, 4] },
	{ name: "Abmmaj7b5", pitch: 8, frets: [4, 5, 5, 4, -1, 4] },
	{ name: "Absus4", pitch: 8, frets: [-1, -1, 1, 1, 2, 4] },
	{ name: "Absus2", pitch: 8, frets: [4, -1, -1, 3, 4, 4] },
	{ name: "B11", pitch: 11, frets: [-1, 2, 1, 2, 0, 0] },
	{ name: "B13", pitch: 11, frets: [-1, 2, 1, 2, 4, 4] },
	{ name: "B6", pitch: 11, frets: [-1, 2, 1, 1, 0, -1] },
	{ name: "B69", pitch: 11, frets: [-1, 2, 1, 1, 2, 2] },
	{ name: "B7", pitch: 11, frets: [-1, 2, 1, 2, 0, 2] },
	{ name: "B7#9", pitch: 11, frets: [-1, 2, 1, 2, 3, -1] },
	{ name: "B7b9", pitch: 11, frets: [-1, 2, 1, 2, 1, 2] },
	{ name: "B7b5", pitch: 11, frets: [-1, 2, 1, 2, 0, 1] },
	{ name: "B7sus4", pitch: 11, frets: [-1, 2, 2, 2, 0, 0] },
	{ name: "B9b5", pitch: 11, frets: [-1, 2, 1, 2, 2, 1] },
	{ name: "B9", pitch: 11, frets: [-1, 2, 1, 2, 2, 2] },
	{ name: "Balt", pitch: 11, frets: [-1, 2, 3, 4, 4, -1] },
	{ name: "B9#11", pitch: 11, frets: [-1, 2, 1, 2, 2, 1] },
	{ name: "Badd9", pitch: 11, frets: [-1, 2, 1, -1, 2, 2] },
	{ name: "Baug", pitch: 11, frets: [-1, 2, 1, 0, 0, -1] },
	{ name: "Baug7", pitch: 11, frets: [-1, 2, 1, 2, 0, 3] },
	{ name: "Baug9", pitch: 11, frets: [-1, 2, 1, 2, 2, 3] },
	{ name: "Bdim7", pitch: 11, frets: [-1, 2, 3, 1, 3, 1] },
	{ name: "Bdim", pitch: 11, frets: [-1, 2, 0, -1, 0, 1] },
	{ name: "Bm11", pitch: 11, frets: [-1, 2, 0, 2, 2, 0] },
	{ name: "Bm6", pitch: 11, frets: [2, 2, 0, 1, 0, 2] },
	{ name: "Bm69", pitch: 11, frets: [-1, 2, 0, 1, 2, 2] },
	{ name: "Bm7", pitch: 11, frets: [2, 2, 4, 2, 3, 2] },
	{ name: "Bm7b5", pitch: 11, frets: [-1, 2, 3, 2, 3, -1] },
	{ name: "Bm9", pitch: 11, frets: [-1, 2, 0, 2, 2, 2] },
	{ name: "Bmadd9", pitch: 11, frets: [-1, 5, 4, 4, 2, -1] },
	{ name: "Bmaj11", pitch: 11, frets: [-1, 2, 1, 3, 0, 0] },
	{ name: "Bmaj13", pitch: 11, frets: [-1, 2, 2, 3, 4, 4] },
	{ name: "Bmaj7", pitch: 11, frets: [2, 2, 4, 3, 4, 2] },
	{ name: "Bmaj7#5", pitch: 11, frets: [-1, 2, 1, 3, 0, 3] },
	{ name: "Bmaj9", pitch: 11, frets: [2, 2, 1, 3, 2, -1] },
	{ name: "Bmaj7b5", pitch: 11, frets: [-1, 2, 3, 3, 4, -1] },
	{ name: "B", pitch: 11, frets: [2, 2, 4, 4, 4, 2] },
	{ name: "Bmmaj7", pitch: 11, frets: [-1, 2, 0, 3, 0, 2] },
	{ name: "Bmmaj11", pitch: 11, frets: [-1, 2, 0, 3, 2, 0] },
	{ name: "Bmmaj7b5", pitch: 11, frets: [-1, 2, 3, 3, 3, -1] },
	{ name: "Bmmaj9", pitch: 11, frets: [-1, 2, 0, 3, 2, 2] },
	{ name: "Bsus2", pitch: 11, frets: [2, 2, 4, 4, 2, 2] },
	{ name: "Bsus4", pitch: 11, frets: [2, 2, 4, 4, 5, 2] },
	{ name: "Bm", pitch: 11, frets: [2, 2, 4, 4, 3, 2] },
	{ name: "Bb11", pitch: 10, frets: [-1, 1, 1, 1, 3, 1] },
	{ name: "Bb13", pitch: 10, frets: [-1, 1, 0, 1, 3, 3] },
	{ name: "Bb6", pitch: 10, frets: [-1, 1, 3, 3, 3, 3] },
	{ name: "Bb69", pitch: 10, frets: [-1, 1, 0, 0, 1, 1] },
	{ name: "Bb7", pitch: 10, frets: [-1, 1, 3, 1, 3, 1] },
	{ name: "Bb7#9", pitch: 10, frets: [-1, 1, 0, 1, 2, -1] },
	{ name: "Bb7b5", pitch: 10, frets: [-1, 1, 2, 1, 3, -1] },
	{ name: "Bb9#11", pitch: 10, frets: [-1, 1, 0, 1, 1, 0] },
	{ name: "Bb7sus4", pitch: 10, frets: [-1, 1, 3, 1, 4, 1] },
	{ name: "Bb9", pitch: 10, frets: [-1, 1, 0, 1, 1, 1] },
	{ name: "Bb7b9", pitch: 10, frets: [-1, 1, 0, 1, 0, 1] },
	{ name: "Bb9b5", pitch: 10, frets: [-1, 1, 0, 1, 1, 0] },
	{ name: "Bbadd9", pitch: 10, frets: [-1, 1, 0, 3, 1, 1] },
	{ name: "Bbalt", pitch: 10, frets: [-1, 1, 2, 3, 3, 0] },
	{ name: "Bbaug7", pitch: 10, frets: [-1, 1, 4, 1, 3, 2] },
	{ name: "Bbaug", pitch: 10, frets: [-1, 1, 4, 3, 3, -1] },
	{ name: "Bbaug9", pitch: 10, frets: [-1, 1, 0, 1, 1, 2] },
	{ name: "Bbdim", pitch: 10, frets: [-1, 1, 2, 3, 2, -1] },
	{ name: "Bbm11", pitch: 10, frets: [6, 4, 6, 5, 4, 4] },
	{ name: "Bbm6", pitch: 10, frets: [-1, 1, 3, -1, 2, 3] },
	{ name: "Bbm69", pitch: 10, frets: [6, -1, 5, 6, 6, 8] },
	{ name: "Bbdim7", pitch: 10, frets: [-1, 1, 2, 0, 2, 0] },
	{ name: "Bbm7b5", pitch: 10, frets: [-1, 1, 2, 1, 2, -1] },
	{ name: "Bbm7", pitch: 10, frets: [-1, 1, 3, 1, 2, 1] },
	{ name: "Bbm9", pitch: 10, frets: [-1, -1, 3, 5, 2, 4] },
	{ name: "Bbmadd9", pitch: 10, frets: [-1, 4, 3, 3, 1, -1] },
	{ name: "Bbmaj11", pitch: 10, frets: [-1, 1, 1, 2, 3, 1] },
	{ name: "Bbmaj13", pitch: 10, frets: [-1, 1, 1, 2, 3, 3] },
	{ name: "Bbmaj7#5", pitch: 10, frets: [-1, 1, 0, 2, 3, 2] },
	{ name: "Bbmaj7", pitch: 10, frets: [-1, 1, 3, 2, 3, 1] },
	{ name: "Bb", pitch: 10, frets: [-1, 1, 3, 3, 3, 1] },
	{ name: "Bbmaj7b5", pitch: 10, frets: [-1, 1, 2, 2, 3, -1] },
	{ name: "Bbm", pitch: 10, frets: [-1, 1, 3, 3, 2, 1] },
	{ name: "Bbmmaj11", pitch: 10, frets: [-1, 1, 1, 2, 2, 1] },
	{ name: "Bbmmaj7", pitch: 10, frets: [-1, 1, 3, 2, 2, 1] },
	{ name: "Bbmaj9", pitch: 10, frets: [1, 1, 0, 2, 1, -1] },
	{ name: "Bbmmaj7b5", pitch: 10, frets: [-1, 1, 2, 2, 2, 0] },
	{ name: "Bbmmaj9", pitch: 10, frets: [6, 4, -1, 5, 6, 5] },
	{ name: "Bbsus4", pitch: 10, frets: [-1, 1, 3, 3, 4, 1] },
	{ name: "Bbsus2", pitch: 10, frets: [1, 1, 3, 3, 1, 1] },
	{ name: "C13", pitch: 0, frets: [-1, 3, 2, 3, 5, 5] },
	{ name: "C11", pitch: 0, frets: [-1, 3, 2, 3, 1, 1] },
	{ name: "C6", pitch: 0, frets: [-1, 3, 2, 2, 1, 0] },
	{ name: "C69", pitch: 0, frets: [-1, 3, 2, 2, 3, 3] },
	{ name: "C7", pitch: 0, frets: [-1, 3, 2, 3, 1, 0] },
	{ name: "C7b5", pitch: 0, frets: [-1, -1, 2, 3, 1, 2] },
	{ name: "C7#9", pitch: 0, frets: [-1, 3, 2, 3, 4, -1] },
	{ name: "C7b9", pitch: 0, frets: [-1, 3, 2, 3, 2, 3] },
	{ name: "C7sus4", pitch: 0, frets: [-1, 3, 3, 3, 1, 1] },
	{ name: "C9b5", pitch: 0, frets: [-1, 3, 2, 3, 3, 2] },
	{ name: "C9#11", pitch: 0, frets: [-1, 3, 2, 3, 3, 2] },
	{ name: "C9", pitch: 0, frets: [3, 3, 2, 3, 3, 3] },
	{ name: "Cadd9", pitch: 0, frets: [-1, 3, 2, 0, 3, 0] },
	{ name: "Calt", pitch: 0, frets: [-1, 3, 2, 5, 5, 2] },
	{ name: "Caug", pitch: 0, frets: [-1, 3, 2, 1, 1, -1] },
	{ name: "Caug9", pitch: 0, frets: [-1, 3, 2, 3, 3, 4] },
	{ name: "Cdim", pitch: 0, frets: [-1, 3, 1, -1, 1, 2] },
	{ name: "Caug7", pitch: 0, frets: [-1, 3, 2, 3, -1, 4] },
	{ name: "Cdim7", pitch: 0, frets: [-1, -1, 1, 2, 1, 2] },
	{ name: "Cm11", pitch: 0, frets: [-1, 3, 1, 3, 3, 1] },
	{ name: "Cm6", pitch: 0, frets: [-1, 3, 1, 2, 1, 3] },
	{ name: "Cm7", pitch: 0, frets: [-1, 3, 1, 3, 4, -1] },
	{ name: "Cm69", pitch: 0, frets: [-1, 3, 1, 2, 3, 3] },
	{ name: "Cm9", pitch: 0, frets: [-1, 3, 1, 3, 3, 3] },
	{ name: "Cm7b5", pitch: 0, frets: [-1, 3, 4, 3, 4, -1] },
	{ name: "Cmadd9", pitch: 0, frets: [-1, 3, 1, 0, 3, 3] },
	{ name: "Cmaj11", pitch: 0, frets: [-1, 3, 2, 0, 0, 1] },
	{ name: "Cmaj13", pitch: 0, frets: [-1, 3, 2, 2, 0, 1] },
	{ name: "Cmaj7#5", pitch: 0, frets: [-1, 3, 2, 1, 0, 0] },
	{ name: "Cmaj7", pitch: 0, frets: [3, 3, 2, 0, 0, 0] },
	{ name: "Cmaj9", pitch: 0, frets: [-1, 3, 0, 0, 0, 0] },
	{ name: "C", pitch: 0, frets: [-1, 3, 2, 0, 1, 0] },
	{ name: "Cm", pitch: 0, frets: [-1, 3, 1, 0, 1, 3] },
	{ name: "Cmaj7b5", pitch: 0, frets: [-1, 3, 2, 4, 0, 2] },
	{ name: "Cmmaj11", pitch: 0, frets: [-1, 3, 1, 0, 0, 1] },
	{ name: "Cmmaj7b5", pitch: 0, frets: [-1, 3, -1, 4, 4, 2] },
	{ name: "Cmmaj7", pitch: 0, frets: [-1, 3, 1, 0, 0, -1] },
	{ name: "Cmmaj9", pitch: 0, frets: [-1, 3, 1, 4, 3, -1] },
	{ name: "Csus2", pitch: 0, frets: [-1, 3, 0, 0, 1, 3] },
	{ name: "Csus4", pitch: 0, frets: [-1, 3, 3, 0, 1, 1] },
	{ name: "C#11", pitch: 1, frets: [-1, 4, 3, 0, 0, 4] },
	{ name: "C#6", pitch: 1, frets: [-1, 4, 3, 3, 2, -1] },
	{ name: "C#13", pitch: 1, frets: [-1, 4, 3, 3, 0, 2] },
	{ name: "C#7#9", pitch: 1, frets: [-1, 4, 3, 4, 2, 0] },
	{ name: "C#69", pitch: 1, frets: [-1, 4, 1, 3, 2, 1] },
	{ name: "C#7", pitch: 1, frets: [-1, 4, 3, 4, 2, -1] },
	{ name: "C#7b9", pitch: 1, frets: [-1, 4, 3, 4, 3, 4] },
	{ name: "C#7sus4", pitch: 1, frets: [-1, 4, 4, 4, 2, 2] },
	{ name: "C#7b5", pitch: 1, frets: [-1, 4, 3, 0, 0, 1] },
	{ name: "C#9#11", pitch: 1, frets: [-1, 3, 2, 0, 0, 3] },
	{ name: "C#9", pitch: 1, frets: [4, 4, 3, 4, 4, 4] },
	{ name: "C#alt", pitch: 1, frets: [-1, 4, 3, 0, 2, 1] },
	{ name: "C#add9", pitch: 1, frets: [-1, 4, 3, 1, 4, 1] },
	{ name: "C#9b5", pitch: 1, frets: [-1, 4, 3, 4, 4, 3] },
	{ name: "C#aug", pitch: 1, frets: [-1, 4, 4, 4, 2, 2] },
	{ name: "C#aug7", pitch: 1, frets: [-1, 4, 3, 2, 0, 1] },
	{ name: "C#dim", pitch: 1, frets: [-1, 4, 2, -1, 2, 3] },
	{ name: "C#aug9", pitch: 1, frets: [-1, 4, 3, 4, 4, 5] },
	{ name: "C#dim7", pitch: 1, frets: [-1, -1, 2, 3, 2, 3] },
	{ name: "C#m11", pitch: 1, frets: [-1, 4, 2, 4, 2, 2] },
	{ name: "C#m6", pitch: 1, frets: [-1, 4, 2, 3, 2, 4] },
	{ name: "C#m7", pitch: 1, frets: [-1, 4, 6, 4, 5, 4] },
	{ name: "C#m7b5", pitch: 1, frets: [-1, 4, 5, 4, 5, -1] },
	{ name: "C#m69", pitch: 1, frets: [-1, 4, 1, 3, 2, 0] },
	{ name: "C#m9", pitch: 1, frets: [-1, 4, 2, 4, 4, 4] },
	{ name: "C#madd9", pitch: 1, frets: [-1, 4, 2, 1, 4, -1] },
	{ name: "C#maj11", pitch: 1, frets: [-1, 4, 3, 5, 2, 2] },
	{ name: "C#maj7#5", pitch: 1, frets: [1, 4, 3, 2, 1, 1] },
	{ name: "C#maj13", pitch: 1, frets: [-1, 4, 1, 3, 1, 1] },
	{ name: "C#maj7", pitch: 1, frets: [-1, 4, 3, 1, 1, 1] },
	{ name: "C#maj7b5", pitch: 1, frets: [-1, 4, 3, 5, 6, 3] },
	{ name: "C#maj9", pitch: 1, frets: [-1, 4, 1, 1, 1, 1] },
	{ name: "C#m", pitch: 1, frets: [-1, 4, 2, 1, 2, -1] },
	{ name: "C#mmaj11", pitch: 1, frets: [-1, 4, 2, 5, 4, 2] },
	{ name: "C#", pitch: 1, frets: [-1, 4, 3, 1, 2, 1] },
	{ name: "C#mmaj7", pitch: 1, frets: [-1, 4, 2, 1, 1, -1] },
	{ name: "C#mmaj7b5", pitch: 1, frets: [-1, 4, 2, 0, 1, 0] },
	{ name: "C#mmaj9", pitch: 1, frets: [-1, 4, 1, 1, 1, 0] },
	{ name: "C#sus2", pitch: 1, frets: [4, 4, 6, 6, 4, 4] },
	{ name: "C#sus4", pitch: 1, frets: [-1, 4, 4, 1, 2, -1] },
	{ name: "D6sus4", pitch: 2, frets: [-1, -1, 0, 2, 0, 3] },
	{ name: "D11", pitch: 2, frets: [-1, -1, 0, 0, 1, 2] },
	{ name: "D69", pitch: 2, frets: [-1, 5, 4, 2, 0, 0] },
	{ name: "D13", pitch: 2, frets: [-1, -1, 0, 4, 1, 2] },
	{ name: "D7#9", pitch: 2, frets: [-1, 5, 4, 5, 6, -1] },
	{ name: "D7b5", pitch: 2, frets: [-1, -1, 0, 1, 1, 2] },
	{ name: "D6", pitch: 2, frets: [-1, -1, 0, 2, 0, 2] },
	{ name: "D7", pitch: 2, frets: [-1, -1, 0, 2, 1, 2] },
	{ name: "D7b9", pitch: 2, frets: [-1, -1, 0, 5, 4, 2] },
	{ name: "D7sus4", pitch: 2, frets: [-1, -1, 0, 2, 1, 3] },
	{ name: "D9", pitch: 2, frets: [5, 5, 4, 5, 5, 5] },
	{ name: "D9#11", pitch: 2, frets: [-1, -1, 0, 1, 1, 2] },
	{ name: "D9b5", pitch: 2, frets: [-1, 5, 4, 5, 5, 4] },
	{ name: "Dadd9", pitch: 2, frets: [-1, 5, 4, 2, 5, 2] },
	{ name: "Dalt", pitch: 2, frets: [-1, -1, 0, 1, 3, 2] },
	{ name: "Daug7", pitch: 2, frets: [-1, -1, 0, 3, 1, 2] },
	{ name: "Daug", pitch: 2, frets: [-1, -1, 0, 3, 3, 2] },
	{ name: "Daug9", pitch: 2, frets: [-1, 5, 4, 5, 5, 6] },
	{ name: "Ddim", pitch: 2, frets: [-1, -1, 0, 1, -1, 1] },
	{ name: "Ddim7", pitch: 2, frets: [-1, -1, 0, 1, 0, 1] },
	{ name: "Dm6", pitch: 2, frets: [-1, -1, 0, 2, 0, 1] },
	{ name: "Dm11", pitch: 2, frets: [-1, -1, 0, 0, 1, 1] },
	{ name: "Dm69", pitch: 2, frets: [-1, 5, 3, 2, 0, 0] },
	{ name: "Dm7", pitch: 2, frets: [-1, -1, 0, 2, 1, 1] },
	{ name: "Dm7b5", pitch: 2, frets: [-1, -1, 0, 1, 1, 1] },
	{ name: "Dmadd9", pitch: 2, frets: [-1, 5, 3, 2, 3, 0] },
	{ name: "Dm9", pitch: 2, frets: [1, 0, 0, 2, 1, 0] },
	{ name: "Dmaj11", pitch: 2, frets: [-1, -1, 0, 0, 2, 2] },
	{ name: "Dmaj13", pitch: 2, frets: [-1, -1, 0, 4, 2, 2] },
	{ name: "Dmaj7#5", pitch: 2, frets: [-1, -1, 0, 3, 2, 2] },
	{ name: "Dm", pitch: 2, frets: [-1, -1, 0, 2, 3, 1] },
	{ name: "Dmaj7b5", pitch: 2, frets: [-1, -1, 0, 1, 2, 2] },
	{ name: "Dmaj7", pitch: 2, frets: [-1, -1, 0, 2, 2, 2] },
	{ name: "D", pitch: 2, frets: [-1, -1, 0, 2, 3, 2] },
	{ name: "Dmaj9", pitch: 2, frets: [-1, 5, 2, 2, 2, 2] },
	{ name: "Dmmaj11", pitch: 2, frets: [-1, -1, 0, 0, 2, 1] },
	{ name: "Dsus4", pitch: 2, frets: [-1, -1, 0, 2, 3, 3] },
	{ name: "Dmmaj7", pitch: 2, frets: [-1, -1, 0, 2, 2, 1] },
	{ name: "Dmmaj7b5", pitch: 2, frets: [-1, -1, 0, 1, 2, 1] },
	{ name: "Dmmaj9", pitch: 2, frets: [-1, 5, 3, 6, 5, 0] },
	{ name: "Dsus2", pitch: 2, frets: [-1, -1, 0, 2, 3, 0] },
	{ name: "Dsus6", pitch: 2, frets: [-1, -1, 0, 0, 0, 3] },
	{ name: "E13", pitch: 4, frets: [0, 2, 0, 1, 2, 0] },
	{ name: "E6", pitch: 4, frets: [0, 2, 2, 1, 2, 0] },
	{ name: "E11", pitch: 4, frets: [0, 0, 0, 1, 0, 0] },
	{ name: "E69", pitch: 4, frets: [0, 2, 2, 1, 2, 2] },
	{ name: "E7#9", pitch: 4, frets: [0, 2, 0, 1, 0, 3] },
	{ name: "E7", pitch: 4, frets: [0, 2, 0, 1, 0, 0] },
	{ name: "E7b9", pitch: 4, frets: [0, 2, 0, 1, 0, 1] },
	{ name: "E7b5", pitch: 4, frets: [0, 1, 0, 1, 3, 0] },
	{ name: "E7sus4", pitch: 4, frets: [0, 2, 0, 2, 0, 0] },
	{ name: "E9#11", pitch: 4, frets: [0, 1, 0, 1, 0, 0] },
	{ name: "E9b5", pitch: 4, frets: [0, 1, 2, 1, 3, 2] },
	{ name: "Eadd9", pitch: 4, frets: [0, 2, 2, 1, 0, 2] },
	{ name: "Ealt", pitch: 4, frets: [0, 1, 2, 1, -1, -1] },
	{ name: "E9", pitch: 4, frets: [0, 2, 0, 1, 0, 2] },
	{ name: "Eaug7", pitch: 4, frets: [0, 3, 0, 1, 1, 0] },
	{ name: "Eaug", pitch: 4, frets: [0, 3, 2, 1, 1, 0] },
	{ name: "Eaug9", pitch: 4, frets: [0, 3, 0, 1, 3, 2] },
	{ name: "Em11", pitch: 4, frets: [0, 0, 0, 0, 0, 2] },
	{ name: "Edim", pitch: 4, frets: [-1, -1, 2, 3, -1, 3] },
	{ name: "Edim7", pitch: 4, frets: [0, 1, 2, 0, 2, 0] },
	{ name: "Em6", pitch: 4, frets: [0, 2, 2, 0, 2, 0] },
	{ name: "Em69", pitch: 4, frets: [0, 2, 2, 0, 2, 2] },
	{ name: "Em7", pitch: 4, frets: [0, 2, 0, 0, 0, 0] },
	{ name: "Em9", pitch: 4, frets: [0, 2, 0, 0, 0, 2] },
	{ name: "Em7b5", pitch: 4, frets: [0, 1, 2, 3, 3, 3] },
	{ name: "Emadd9", pitch: 4, frets: [-1, -1, 3, 1, 1, 3] },
	{ name: "Emaj13", pitch: 4, frets: [0, 2, 1, 1, 2, 2] },
	{ name: "Emaj11", pitch: 4, frets: [0, 0, 1, 1, 0, 0] },
	{ name: "Emaj7", pitch: 4, frets: [0, 2, 1, 1, 0, 0] },
	{ name: "Emaj7#5", pitch: 4, frets: [0, 3, 2, 1, 4, 4] },
	{ name: "Emaj7b5", pitch: 4, frets: [0, 1, 1, 1, 4, 0] },
	{ name: "Emaj9", pitch: 4, frets: [0, 2, 1, 1, 0, 2] },
	{ name: "E", pitch: 4, frets: [0, 2, 2, 1, 0, 0] },
	{ name: "Emmaj11", pitch: 4, frets: [0, 0, 1, 0, 0, 2] },
	{ name: "Em", pitch: 4, frets: [0, 2, 2, 0, 0, 0] },
	{ name: "Emmaj7", pitch: 4, frets: [0, 2, 1, 0, 0, 0] },
	{ name: "Emmaj7b5", pitch: 4, frets: [0, 1, 1, 0, -1, 0] },
	{ name: "Esus2", pitch: 4, frets: [2, 2, 2, 4, 5, 2] },
	{ name: "Esus4", pitch: 4, frets: [0, 2, 2, 2, 0, 0] },
	{ name: "Eb13", pitch: 3, frets: [-1, 6, 5, 6, 8, 8] },
	{ name: "Emmaj9", pitch: 4, frets: [0, 2, 1, 0, 0, 2] },
	{ name: "Eb11", pitch: 3, frets: [1, 1, 1, 1, 2, 3] },
	{ name: "Eb6", pitch: 3, frets: [-1, -1, 1, 3, 1, 3] },
	{ name: "Eb69", pitch: 3, frets: [-1, -1, 1, 0, 1, 1] },
	{ name: "Eb7", pitch: 3, frets: [-1, -1, 1, 3, 2, 3] },
	{ name: "Eb7#9", pitch: 3, frets: [-1, -1, 1, 0, 2, 2] },
	{ name: "Eb7b5", pitch: 3, frets: [-1, -1, 1, 2, 2, 3] },
	{ name: "Eb7b9", pitch: 3, frets: [-1, -1, 1, 0, 2, 0] },
	{ name: "Eb7sus4", pitch: 3, frets: [-1, -1, 1, 3, 2, 4] },
	{ name: "Eb9", pitch: 3, frets: [-1, -1, 1, 0, 2, 1] },
	{ name: "Eb9b5", pitch: 3, frets: [-1, 6, 5, 6, 6, 5] },
	{ name: "Eb9#11", pitch: 3, frets: [-1, -1, 1, 2, 2, 3] },
	{ name: "Ebadd9", pitch: 3, frets: [-1, 6, 5, 3, 6, 3] },
	{ name: "Ebalt", pitch: 3, frets: [-1, -1, 1, 2, 4, 3] },
	{ name: "Ebaug", pitch: 3, frets: [-1, -1, 5, 4, 4, 3] },
	{ name: "Ebaug9", pitch: 3, frets: [3, 4, 3, 4, 4, 3] },
	{ name: "Ebaug7", pitch: 3, frets: [-1, -1, 1, 4, 2, 3] },
	{ name: "Ebdim", pitch: 3, frets: [-1, -1, 1, 2, -1, 2] },
	{ name: "Ebdim7", pitch: 3, frets: [-1, -1, 1, 2, 1, 2] },
	{ name: "Ebm11", pitch: 3, frets: [-1, -1, 1, 1, 2, 2] },
	{ name: "Ebm69", pitch: 3, frets: [2, -1, 1, 3, 1, 1] },
	{ name: "Ebm7", pitch: 3, frets: [-1, -1, 1, 3, 2, 2] },
	{ name: "Ebm6", pitch: 3, frets: [-1, 1, 1, 3, 1, 2] },
	{ name: "Ebm7b5", pitch: 3, frets: [-1, -1, 1, 2, 2, 2] },
	{ name: "Ebm9", pitch: 3, frets: [-1, 6, 4, 6, 6, 6] },
	{ name: "Ebmadd9", pitch: 3, frets: [-1, -1, 4, 3, 4, 1] },
	{ name: "Ebmaj11", pitch: 3, frets: [-1, -1, 1, 1, 3, 3] },
	{ name: "Ebmaj13", pitch: 3, frets: [-1, 3, 1, 0, 3, -1] },
	{ name: "Ebmaj7#5", pitch: 3, frets: [3, 6, 5, 4, 3, 3] },
	{ name: "Ebmaj7", pitch: 3, frets: [-1, 1, 1, 3, 3, 3] },
	{ name: "Ebmaj9", pitch: 3, frets: [-1, 6, 3, 3, 3, 3] },
	{ name: "Ebm", pitch: 3, frets: [-1, -1, 1, 3, 4, 2] },
	{ name: "Ebmaj7b5", pitch: 3, frets: [-1, -1, 1, 2, 3, 3] },
	{ name: "Ebmmaj11", pitch: 3, frets: [-1, 1, 1, 1, 3, 2] },
	{ name: "Eb", pitch: 3, frets: [-1, -1, 1, 3, 4, 3] },
	{ name: "Ebmmaj7", pitch: 3, frets: [-1, -1, 1, 3, 3, 2] },
	{ name: "Ebmmaj7b5", pitch: 3, frets: [-1, -1, 1, 2, 3, 2] },
	{ name: "Ebsus2", pitch: 3, frets: [1, 1, 1, 3, 4, 1] },
	{ name: "Ebmmaj9", pitch: 3, frets: [-1, 6, 4, 7, 6, -1] },
	{ name: "F13", pitch: 5, frets: [1, 3, 1, 2, 3, 1] },
	{ name: "Ebsus4", pitch: 3, frets: [-1, -1, 1, 3, 4, 4] },
	{ name: "F6", pitch: 5, frets: [1, -1, 3, 2, 3, 1] },
	{ name: "F11", pitch: 5, frets: [1, 1, 1, 2, 1, 1] },
	{ name: "F69", pitch: 5, frets: [1, 0, 0, 0, 1, 1] },
	{ name: "F7b5", pitch: 5, frets: [1, 0, 1, 2, 0, 1] },
	{ name: "F7#9", pitch: 5, frets: [1, 3, 1, 2, 1, 4] },
	{ name: "F7", pitch: 5, frets: [1, 3, 1, 2, 1, 1] },
	{ name: "F7sus4", pitch: 5, frets: [1, 3, 1, 3, 1, 1] },
	{ name: "F7b9", pitch: 5, frets: [1, 3, 1, 2, 1, 2] },
	{ name: "F9#11", pitch: 5, frets: [1, 0, 1, 0, 0, 1] },
	{ name: "F9b5", pitch: 5, frets: [1, 0, 1, 0, 0, 1] },
	{ name: "Falt", pitch: 5, frets: [1, 2, 3, 2, 0, -1] },
	{ name: "Fadd9", pitch: 5, frets: [-1, -1, 3, 2, 1, 3] },
	{ name: "Faug7", pitch: 5, frets: [1, 0, 1, 2, 2, -1] },
	{ name: "Faug9", pitch: 5, frets: [1, 0, 1, 0, 2, 1] },
	{ name: "Faug", pitch: 5, frets: [-1, -1, 3, 2, 2, 1] },
	{ name: "Fdim", pitch: 5, frets: [-1, -1, 3, 4, -1, 4] },
	{ name: "Fdim7", pitch: 5, frets: [1, -1, 0, 1, 0, 1] },
	{ name: "F9", pitch: 5, frets: [1, 3, 1, 2, 1, 3] },
	{ name: "Fm11", pitch: 5, frets: [1, 1, 1, 1, 1, 3] },
	{ name: "Fm69", pitch: 5, frets: [1, 3, 3, 1, 3, 3] },
	{ name: "Fm6", pitch: 5, frets: [1, -1, 0, 1, 1, 1] },
	{ name: "Fm7", pitch: 5, frets: [1, 3, 1, 1, 1, 1] },
	{ name: "Fm7b5", pitch: 5, frets: [1, -1, 1, 1, 0, -1] },
	{ name: "Fmaj11", pitch: 5, frets: [1, 1, 2, 2, 1, 1] },
	{ name: "Fm9", pitch: 5, frets: [1, 3, 1, 1, 1, 3] },
	{ name: "Fmadd9", pitch: 5, frets: [-1, -1, 3, 1, 1, 3] },
	{ name: "Fmaj13", pitch: 5, frets: [1, 0, 0, 0, 1, 0] },
	{ name: "Fmaj7#5", pitch: 5, frets: [1, 0, 2, 2, 2, 0] },
	{ name: "Fmaj7", pitch: 5, frets: [-1, -1, 3, 2, 1, 0] },
	{ name: "Fmaj7b5", pitch: 5, frets: [1, 0, 2, 2, 0, 0] },
	{ name: "Fmaj9", pitch: 5, frets: [1, 0, 2, 0, 1, 0] },
	{ name: "Fmmaj11", pitch: 5, frets: [1, 1, 2, 1, 1, 3] },
	{ name: "F", pitch: 5, frets: [1, 3, 3, 2, 1, 1] },
	{ name: "Fm", pitch: 5, frets: [1, 3, 3, 1, 1, 1] },
	{ name: "Fmmaj7", pitch: 5, frets: [1, 3, 2, 1, 1, 1] },
	{ name: "Fmmaj7b5", pitch: 5, frets: [1, 2, 2, 1, 0, 0] },
	{ name: "F#11", pitch: 6, frets: [2, 1, 2, 1, 0, 0] },
	{ name: "Fmmaj9", pitch: 5, frets: [1, 3, 2, 1, 1, 3] },
	{ name: "Fsus2", pitch: 5, frets: [1, 3, 3, -1, 1, 3] },
	{ name: "F#6", pitch: 6, frets: [2, -1, 1, 3, 2, -1] },
	{ name: "F#13", pitch: 6, frets: [2, 2, 1, 3, 0, 0] },
	{ name: "Fsus4", pitch: 5, frets: [1, 3, 3, 3, 1, 1] },
	{ name: "F#69", pitch: 6, frets: [2, 1, 1, 1, 2, 2] },
	{ name: "F#7#9", pitch: 6, frets: [2, 1, 2, 2, 2, 2] },
	{ name: "F#7", pitch: 6, frets: [2, 4, 2, 3, 2, 2] },
	{ name: "F#7b9", pitch: 6, frets: [2, 1, 2, 0, 2, 0] },
	{ name: "F#7sus4", pitch: 6, frets: [2, 4, 2, 4, 2, 2] },
	{ name: "F#9#11", pitch: 6, frets: [2, 1, 2, 1, 1, 2] },
	{ name: "F#7b5", pitch: 6, frets: [2, -1, 2, 3, 1, -1] },
	{ name: "F#aug", pitch: 6, frets: [-1, -1, 4, 3, 3, 2] },
	{ name: "F#add9", pitch: 6, frets: [2, 1, -1, 1, 2, 2] },
	{ name: "F#9", pitch: 6, frets: [2, 4, 2, 3, 2, 4] },
	{ name: "F#9b5", pitch: 6, frets: [2, 1, 2, 1, 1, 2] },
	{ name: "F#alt", pitch: 6, frets: [-1, -1, 4, 3, 1, 2] },
	{ name: "F#aug7", pitch: 6, frets: [2, -1, 2, 3, 3, -1] },
	{ name: "F#aug9", pitch: 6, frets: [2, 1, 2, 1, 3, 0] },
	{ name: "F#dim7", pitch: 6, frets: [2, -1, 1, 2, 1, -1] },
	{ name: "F#dim", pitch: 6, frets: [2, 0, -1, 2, 1, -1] },
	{ name: "F#m6", pitch: 6, frets: [2, -1, 1, 2, 2, 2] },
	{ name: "F#m11", pitch: 6, frets: [2, 0, 2, 1, 0, 0] },
	{ name: "F#m69", pitch: 6, frets: [2, 0, 1, 1, 2, 2] },
	{ name: "F#m7b5", pitch: 6, frets: [2, 0, 2, 2, 1, 0] },
	{ name: "F#madd9", pitch: 6, frets: [-1, -1, 4, 2, 2, 4] },
	{ name: "F#m9", pitch: 6, frets: [2, 0, 2, 1, 2, 0] },
	{ name: "F#m7", pitch: 6, frets: [2, 4, 2, 2, 2, 2] },
	{ name: "F#maj13", pitch: 6, frets: [2, 1, 1, 1, 2, 1] },
	{ name: "F#maj11", pitch: 6, frets: [2, 2, 3, 3, 2, 2] },
	{ name: "F#maj7#5", pitch: 6, frets: [2, -1, 3, 3, 3, -1] },
	{ name: "F#maj7b5", pitch: 6, frets: [2, 1, 3, 3, 1, 1] },
	{ name: "F#maj7", pitch: 6, frets: [2, 4, 3, 3, 2, 2] },
	{ name: "F#maj9", pitch: 6, frets: [2, 1, 3, 1, 2, 1] },
	{ name: "F#", pitch: 6, frets: [2, 4, 4, 3, 2, 2] },
	{ name: "F#mmaj11", pitch: 6, frets: [2, 2, 3, 2, 2, 4] },
	{ name: "F#m", pitch: 6, frets: [2, 4, 4, 2, 2, 2] },
	{ name: "F#mmaj7b5", pitch: 6, frets: [2, 3, 3, 2, -1, 2] },
	{ name: "F#mmaj7", pitch: 6, frets: [2, 4, 3, 2, 2, 2] },
	{ name: "F#sus2", pitch: 6, frets: [2, -1, -1, 1, 2, 2] },
	{ name: "F#sus4", pitch: 6, frets: [2, 4, 4, 4, 2, 2] },
	{ name: "F#mmaj9", pitch: 6, frets: [2, 0, 3, 1, 2, 1] },
	{ name: "G13", pitch: 7, frets: [3, 0, 2, 0, 0, 1] },
	{ name: "G11", pitch: 7, frets: [3, 2, 0, 0, 1, 1] },
	{ name: "G6", pitch: 7, frets: [3, 2, 0, 0, 0, 0] },
	{ name: "G69", pitch: 7, frets: [3, 0, 0, 0, 0, 0] },
	{ name: "G7#9", pitch: 7, frets: [3, 2, 0, 3, 0, 1] },
	{ name: "G7b9", pitch: 7, frets: [3, 2, 0, 1, 3, 1] },
	{ name: "G7", pitch: 7, frets: [3, 2, 0, 0, 0, 1] },
	{ name: "G7b5", pitch: 7, frets: [3, -1, 3, 4, 2, -1] },
	{ name: "G7sus4", pitch: 7, frets: [3, 3, 0, 0, 1, 1] },
	{ name: "G9#11", pitch: 7, frets: [3, 2, 3, 2, 2, 3] },
	{ name: "G9", pitch: 7, frets: [3, 0, 0, 0, 0, 1] },
	{ name: "G9b5", pitch: 7, frets: [3, 2, 3, 2, 2, 3] },
	{ name: "Galt", pitch: 7, frets: [3, 2, -1, 0, 2, 3] },
	{ name: "Gaug", pitch: 7, frets: [3, 2, 1, 0, 0, -1] },
	{ name: "Gadd9", pitch: 7, frets: [3, 0, 0, 2, 0, 3] },
	{ name: "Gaug7", pitch: 7, frets: [3, 2, 1, 0, 0, 1] },
	{ name: "Gaug9", pitch: 7, frets: [3, 0, 1, 0, 0, 1] },
	{ name: "Gm11", pitch: 7, frets: [3, -1, 3, 3, 1, -1] },
	{ name: "Gdim", pitch: 7, frets: [3, 1, -1, 3, 2, -1] },
	{ name: "Gm6", pitch: 7, frets: [3, -1, 2, 3, 3, 3] },
	{ name: "Gm7", pitch: 7, frets: [3, 5, 3, 3, 3, 3] },
	{ name: "Gm69", pitch: 7, frets: [3, 1, 0, 2, 3, 0] },
	{ name: "Gm7b5", pitch: 7, frets: [3, -1, -1, 3, 2, 1] },
	{ name: "Gm9", pitch: 7, frets: [3, 0, 0, 3, 3, 1] },
	{ name: "Gdim7", pitch: 7, frets: [3, 1, -1, 3, 2, 0] },
	{ name: "Gmaj11", pitch: 7, frets: [3, 2, 0, 0, 1, 2] },
	{ name: "Gmadd9", pitch: 7, frets: [3, 1, 0, 2, 3, 3] },
	{ name: "Gmaj13", pitch: 7, frets: [3, 2, 2, 2, 3, 2] },
	{ name: "Gmaj7b5", pitch: 7, frets: [3, 2, 4, 4, 2, 2] },
	{ name: "Gmaj7", pitch: 7, frets: [3, 2, 0, 0, 0, 2] },
	{ name: "Gmaj7#5", pitch: 7, frets: [-1, -1, 1, 0, 0, 2] },
	{ name: "Gm", pitch: 7, frets: [3, 1, 0, 0, 3, 3] },
	{ name: "Gmmaj11", pitch: 7, frets: [3, 3, 4, 3, 3, 5] },
	{ name: "G", pitch: 7, frets: [3, 2, 0, 0, 0, 3] },
	{ name: "Gmaj9", pitch: 7, frets: [3, 0, 0, 0, 0, 2] },
	{ name: "Gmmaj7b5", pitch: 7, frets: [3, 4, 4, 3, -1, 3] },
	{ name: "Gmmaj7", pitch: 7, frets: [3, 1, 0, 0, 3, 2] },
	{ name: "Gsus2", pitch: 7, frets: [3, 0, 0, 0, 3, 3] },
	{ name: "Gmmaj9", pitch: 7, frets: [3, 0, 0, 3, 3, 2] },
	{ name: "Gsus4", pitch: 7, frets: [3, 3, 0, 0, 1, 3] }
];
let prlist = [
	
	//{ category: 'test', name: '', chords: 'F-Am-G-D' }
	 { category: 'sad', name: '', chords: 'Fmaj7-A' }
	,{ category: 'major', name: '', chords: 'C-D-E-F-G-A-B' }
	,{ category: 'sad', name: '', chords: 'Am-C-Dm-Em' }
	,{ category: 'sad', name: '', chords: 'F-Em-Am-G-Am' }
	,{ category: 'sad', name: '', chords: 'Am-G-F-E7' }
	,{ category: 'sad', name: '', chords: 'E-G-A-G' }
	,{ category: 'sad', name: '', chords: 'C-E-Am7-F' }
,{ category: 'sad', name: '', chords: 'G-C-D-Em' }
	 ,{ category: 'sad', name: '', chords: 'Bm-A-G-F#' }
	, { category: 'sad', name: '', chords: 'Em-G-C-Am' }
	, { category: 'sad', name: '', chords: 'Am-C-D-Am-C-Am' }
	
	, { category: 'sad', name: '', chords: 'Em-B-G-Em' }
	, { category: 'sad', name: '', chords: 'Am-F-C-G' }
	, { category: 'sad', name: '', chords: 'Am-Dm-Fm-C' }
	, { category: 'sad', name: '', chords: 'C-Am-Dm-G' }
	, { category: 'sad', name: '', chords: 'Am-F-Em-Am' }
	, { category: 'sad', name: '', chords: 'Am-E-Em-D-Dm-Am-Adim-E' }
	, { category: 'sad', name: '', chords: 'Am-B-Gm' }
	, { category: 'sad', name: '', chords: 'F-Em7-Am-G' }
	, { category: 'sad', name: '', chords: 'Am-G-Dm-F-G-Am' }
	, { category: 'sad', name: '', chords: 'Am-F7-G-Em-F-G' }
	, { category: 'sad', name: '', chords: 'Dm-F-Am-G' }
	, { category: 'sad', name: '', chords: 'Am-G-C-F-E-E7' }
	, { category: 'sad', name: '', chords: 'Am-Dsus4-Dm-F-G-Dm7' }
	, { category: 'sad', name: '', chords: 'Am7-F7-G-Em7' }
	, { category: 'sad', name: '', chords: 'C-Am-F-G' }
	,{ category: 'sad', name: '', chords: 'Am-D7-E7-Am' }
	//
	,{ category: 'jazz', name: '', chords: 'Am-F7-D7-E7' }
	, { category: 'jazz', name: '', chords: 'Cm7-Ab7-G7' }
	, { category: 'jazz', name: '', chords: 'D7-G7-C7-F7' }
	, { category: 'jazz', name: '', chords: 'Cmaj7-C7-Fmaj7-Fm7-Em7-A7-Dm7-G7-Cmaj7' }
	, { category: 'jazz', name: '', chords: 'Cmaj7-Gm7-C7-Fmaj7' }
	, { category: 'jazz', name: '', chords: 'Cmaj7-D7-Dm7-G7-Cmaj7' }
	, { category: 'jazz', name: '', chords: 'Dm7-G7-Cmaj7' }
	, { category: 'jazz', name: '', chords: 'Cmaj7-Cm7-F7' }
	, { category: 'jazz', name: '', chords: 'Cmaj7-Am7-Dm7-G7-Em7-A7-Dm7-G7' }
	, { category: 'jazz', name: '', chords: 'Dm7-G7-Cmaj7-C6' }
	, { category: 'jazz', name: '', chords: 'C-D7-F-C' }
	, { category: 'jazz', name: '', chords: 'C-F-G-G7' }
	, { category: 'jazz', name: '', chords: 'C-Am-E-G' }
	, { category: 'jazz', name: '', chords: 'C-Gm-Dm' }
	, { category: 'jazz', name: '', chords: 'Am-G-D' }
	//
	, { category: 'blues', name: '', chords: 'Am-G-D-F' }
	, { category: 'epic', name: '', chords: 'C-G-Am-Em-F-C-F-G' }
	, { category: 'epic', name: '', chords: 'C-G-Am-F' }
	, { category: 'nice', name: '', chords: 'Am-Dm-F-G' }
	, { category: 'nice', name: '', chords: 'Am-G-Em-F' }
	, { category: 'nice', name: '', chords: 'F-Am-G' }
	, { category: 'nice', name: '', chords: 'Am-G-Dm7' }
	, { category: 'nice', name: '', chords: 'Dm-Am-C-G' }
	, { category: 'nice', name: '', chords: 'Am-Em-G-Dm' }
	, { category: 'nice', name: '', chords: 'C-F-G-Am' }
	, { category: 'nice', name: '', chords: 'Am7-Em7-Dsus4-Dm7' }
	//
	,{ category: 'major', name: '', chords: 'G-C-F-C' }
	,{ category: 'major', name: '', chords: 'F-G-Am-Em' }
	, { category: 'major', name: '', chords: 'C-Dm-Am7-F-G-C' }
	, { category: 'major', name: '', chords: 'C-Am-F' }
	, { category: 'major', name: '', chords: 'D-A-C-G' }
	,{ category: 'major', name: '', chords: 'C-F-G-F' }
	, { category: 'major', name: '', chords: 'C-Dm-F-G' }
	, { category: 'major', name: '', chords: 'F-Am-G-D' }
	, { category: 'major', name: '', chords: 'C-G-F-G-C' }
	, { category: 'major', name: '', chords: 'C-Am-Em-F' }
	, { category: 'major', name: '', chords: 'G-C-D' }
	, { category: 'major', name: '', chords: 'G-D-Em-C' }
	, { category: 'major', name: '', chords: 'Am-D-G' }
	, { category: 'major', name: '', chords: 'C-F-C-G' }
	, { category: 'major', name: '', chords: 'D-A-Bm-F#m-G-D-G-A' }
	, { category: 'major', name: '', chords: 'A-E-F#m-D-A-E' }
,{ category: 'major', name: '', chords: 'C-F-Dm-G' }
,{ category: 'major', name: '', chords: 'C-F-G' }
];
/*
function repeatChords(list, progression, chords, nums) {
	var row = [];
	for (let i = 0; i < nums.length; i++) {
		row.push(chords[nums[i]]);
	}
	list.push({ category: progression.category, name: progression.name, chords: row });
}*/
//let prgrsnData = [];
//for (var i = 0; i < prlist.length; i++) {
//	var p = prlist[i];
	//console.log(i,p);
	/*var arr = p.chords.split('-');
	if (arr.length == 2) {
		repeatChords(prgrsnData, p, arr, [0, 0, 0, 0, 1, 1, 1, 1]);
		repeatChords(prgrsnData, p, arr, [0, 0, 0, 0, 0, 0, 1, 1]);
	}
	if (arr.length == 3) {
		repeatChords(prgrsnData, p, arr, [0, 0, 0, 0, 1, 1, 2, 2]);
		repeatChords(prgrsnData, p, arr, [0, 0, 1, 1, 2, 2, 2, 2]);
		repeatChords(prgrsnData, p, arr, [0, 1, 2, 2, 2, 2, 2, 2]);
	}
	if (arr.length == 4) {
		repeatChords(prgrsnData, p, arr, [0, 0, 1, 1, 2, 2, 3, 3]);
		repeatChords(prgrsnData, p, arr, [0, 1, 2, 2, 3, 3, 3, 3]);
		repeatChords(prgrsnData, p, arr, [0, 0, 0, 0, 1, 2, 3, 3]);
		repeatChords(prgrsnData, p, arr, [0, 0, 1, 1, 1, 1, 1, 1, 2, 2, 3, 3, 3, 3, 3, 3]);
	}
	if (arr.length == 5) {
		repeatChords(prgrsnData, p, arr, [0, 0, 1, 2, 3, 3, 4, 4]);
		repeatChords(prgrsnData, p, arr, [0, 1, 2, 2, 3, 3, 4, 4]);
		repeatChords(prgrsnData, p, arr, [0, 1, 2, 2, 3, 3, 3, 4]);
		repeatChords(prgrsnData, p, arr, [0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 4, 4]);
	}
	if (arr.length == 6) {
		repeatChords(prgrsnData, p, arr, [0, 0, 1, 2, 3, 3, 4, 5]);
		repeatChords(prgrsnData, p, arr, [0, 1, 2, 2, 3, 4, 5, 5]);
		repeatChords(prgrsnData, p, arr, [0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5]);
		repeatChords(prgrsnData, p, arr, [0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5]);
		repeatChords(prgrsnData, p, arr, [0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 3, 3, 4, 4, 5, 5]);
	}
	if (arr.length == 7) {
		repeatChords(prgrsnData, p, arr, [0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 6, 6]);
		repeatChords(prgrsnData, p, arr, [0, 0, 0, 0, 1, 1, 1, 1, 3, 3, 4, 4, 5, 5, 6, 6]);

	}
	if (arr.length == 8) {
		repeatChords(prgrsnData, p, arr, [0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7]);
		repeatChords(prgrsnData, p, arr, [0, 0, 0, 1, 2, 2, 2, 3, 4, 4, 4, 5, 6, 6, 6, 7]);
	}
	if (arr.length == 9) {
		repeatChords(prgrsnData, p, arr, [0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 8]);
		repeatChords(prgrsnData, p, arr, [0, 0, 0, 1, 2, 2, 2, 3, 4, 4, 5, 5, 6, 6, 7, 8]);
	}*/
	//console.log(arr);
	/*var chordsProg = [];
	if (arr.length == 3) {
		chordsProg.push(arr[0]);
		chordsProg.push(arr[0]);
		chordsProg.push(arr[0]);
		chordsProg.push(arr[0]);
		chordsProg.push(arr[1]);
		chordsProg.push(arr[1]);
		chordsProg.push(arr[2]);
		chordsProg.push(arr[2]);
	}
	if (arr.length == 4) {
		chordsProg.push(arr[0]);
		chordsProg.push(arr[0]);
		chordsProg.push(arr[1]);
		chordsProg.push(arr[1]);
		chordsProg.push(arr[2]);
		chordsProg.push(arr[2]);
		chordsProg.push(arr[3]);
		chordsProg.push(arr[3]);
	}
	if (arr.length == 5) {
		chordsProg.push(arr[0]);
		chordsProg.push(arr[0]);
		chordsProg.push(arr[1]);
		chordsProg.push(arr[1]);
		chordsProg.push(arr[2]);
		chordsProg.push(arr[2]);
		chordsProg.push(arr[3]);
		chordsProg.push(arr[4]);
	}
	if (arr.length == 6) {
		chordsProg.push(arr[0]);
		chordsProg.push(arr[0]);
		chordsProg.push(arr[1]);
		chordsProg.push(arr[2]);
		chordsProg.push(arr[3]);
		chordsProg.push(arr[3]);
		chordsProg.push(arr[4]);
		chordsProg.push(arr[5]);
	}
	if (arr.length == 7) {
		chordsProg.push(arr[0]);
		chordsProg.push(arr[1]);
		chordsProg.push(arr[2]);
		chordsProg.push(arr[3]);
		chordsProg.push(arr[4]);
		chordsProg.push(arr[5]);
		chordsProg.push(arr[6]);
		chordsProg.push(arr[6]);
	}
	if (arr.length == 8) {
		chordsProg.push(arr[0]);
		chordsProg.push(arr[1]);
		chordsProg.push(arr[2]);
		chordsProg.push(arr[3]);
		chordsProg.push(arr[4]);
		chordsProg.push(arr[5]);
		chordsProg.push(arr[6]);
		chordsProg.push(arr[7]);
	}
	prgrsnData.push({ category: p.category, name: p.name, chords: chordsProg });
	*/
//}
/*
var p=prgrsnData[165];
console.log(p)
prgrsnData.unshift(p);*/
//console.log(prgrsnData);
/*
let prgrsnData = [
	{ category: 'nice', name: '2', chords: ['C', 'C', 'C', 'C', 'C', 'C', 'C', 'C', 'F', 'F', 'F', 'F', 'F', 'F', 'G', 'Am'] }
	, { category: 'nice', name: '?', chords: ['Am', 'E7', 'Am', 'Am', 'C', 'G', 'C', 'C', 'Dm', 'Dm', 'Am', 'Am', 'E7', 'E7', 'E7', 'E7', 'E7', 'E7', 'E7', 'E7'] }
	, { category: 'nice', name: '?', chords: ['Am', 'E7', 'Am', 'Am', 'C', 'G', 'C', 'C', 'Dm', 'Dm', 'Am', 'Am', 'E7', 'E7', 'Am', 'Am'] }
	, { category: 'nice', name: '1', chords: ['Am7', 'Em7', 'Dsus4', 'Dm7'] }
	, { category: 'nice', name: '2', chords: ['C', 'F', 'G', 'Am'] }
	, { category: 'nice', name: '3', chords: ['Dm7', 'G7', 'Cmaj7', 'Cmaj7'] }
];*/
let soloDefData=[
	{
		category: '', name: 'mechty', chord: 'Am', len16: 8 * 0
		, encoded: ''
	}
	,{
		category: '', name: 'mechty', chord: 'Am', len16: 8 * 8
		, encoded: '0000415400430415400800213400a30215400c00213400e30215401000415401430415401800213401a30215401c00213401e00211402000415402430415402800213402a30215402c00213402e30215403000415403430111403500310403830211403a30211403c30213403e3021540'
	}
];
let bassDefData = [
	{
		category: '', name: 'mechty', chord: 'Am', len16: 8 * 8
		, encoded: '0050409400650209400850204400c50209401050409401650209401850204401c5020940205040940265020940285020c402a50209402c5020e402e5021040305040940365020940385020c403a50209403c50210403e5020940'
	}
	,
	{
		category: '', name: 'tgdm', chord: 'Am', len16: 8 * 8
		, encoded: '005010940025010940045010940065010c400750109400850109400a50109400c50109400e5020940105010940125010940145010940165011040175010c401850109401a50109401c5020c401e5020940205020940245020c402850209402a50209402c5010c402d50110402e5020940305020940325020940345020c403650109403750109403850209403a5020c403c50209403e5020940'
	}
	,
	{
		category: '', name: 'tgdm', chord: 'Cm', len16: 8 * 4
		, encoded: '005020c40025010c40035020c40055020c40075011040085020c400a5020c400c5020c400e5021040105020c40125010c40135021040155021340175011040185020c401a5020c401c5020c401e5021040'
	}
	,
	{
		category: '', name: 'octa3', chord: 'Bm', len16: 8 * 2
		, encoded: '005020b40025021740045020b40065020e40085020b400a50217400c5020b400e5021240'
	}
	,{
		category: '', name: 'short', chord: 'Am', len16: 8 * 2
		, encoded: '005040940045020c40075010940085010c400a50110400c50209400e5020940'
	}
	,{
		category: '', name: 'kvint', chord: 'Am', len16: 8 * 4
		, encoded: '0050409400450404400850409400c50404401050409401450404401850209401a50204401c50205401e5020740'
	}
	//
	,{
		category: '', name: '', chord: 'Am', len16: 8 * 8
		, encoded: '005020940025020940045020c400650409400a50209400c5020c400e5020940105020e40125021040145020c401650409401a50209401c5020c401e5020940205020c40225021040245020c402650409402a50209402c5020c402e5020940305020c40325020940345020c403650409403a50209403c5020c403e5020940'
	}, {
		category: '', name: '', chord: 'C', len16: 8 * 2
		, encoded: '005040c400450210400650213400a5020c400c5021040'
	}, {
		category: '', name: '', chord: 'Am', len16: 8 * 2
		, encoded: '005020940025020940045020940065020c400850209400a50209400c50209400e5020740'
	}
];
let melodydefsData = [
{
		category: '', name: ''
		, chord: 'E'
		, start: {
			len16: 0
			, encoded: ''
		}
		, end: {
			len16: 0
			, encoded: ''
		}
	}
	, {
		category: '', name: ''
		, chord: 'E'
		, start: {
			len16: 8 * 4

			, encoded: '0000210400230210400430210400630210400800214400a30210400c30210400e30210401000214401200210401400217401600210401800214401a30210401c30210401e3021040'
		}
		, end: {
			len16: 8 * 2
			//, chord: 'C'
			, encoded: '0000210400230210400400214400630210400800217400a30210400c00214400e0021740'
		}
	}
];
let strumDefsData = [
	{
		category: '', name: 'mechty'
		, start: 'V---V.A-V.A-V-A.'
		, end: ''
	}
	,
	{
		category: '', name: ''
		, start: ''
		, end: 'V-'
	}
	,{
		category: '', name: ''
		, start: 'VA--............V-A-X...........X---X-..........'
		, end: 'V-'
	}
	////////////////////////////////
	, {
		category: '', name: ''
		, start: 'V---A-V---A-V-A-'
		, end: ''
	}
	////////////////////////////////
	, {
		category: '', name: ''
		, start: 'V---A-V---A-V-A-'
		, end: 'X...X...'
	}, {
		category: '', name: ''
		, start: 'VV------------------------------'
		, end: 'A-'
	}
];
let rhythmDefsData = [
	{
		category: '', name: 'empty'
		, start: ''
		, end: ''
	}
	,
	{
		category: '', name: ''
		, start: '2--2--2--2--2--2'
		, end: '2.2.'
	}
	, {
		category: '', name: ''
		, start: '1---..1---..1-1-'
		, end: '.1111111'
	}
];
let beatsDefsData = [
	
	{ category: '', name: 'simpledance2', start: { len16: 8 * 2, encoded: '0011011120402104401041106002a044a144' }, end: { len16: 8*2, encoded: '0011011120402155401060026155a044a144' } }
	,{ category: '', name: 'simpledance', start: { len16: 8 * 2, encoded: '0011011180448144' }, end: { len16: 8*2, encoded: '001101f980448144' } }
	//,{ category: '', name: 'axel', start: { len16: 8 * 2, encoded: '0063014e4011411180ff81ffc1f8' }, end: { len16: 0, encoded: '' } }
	, { category: '', name: 'alatriplet', start: { len16: 8 * 2, encoded: '008901494010411080cc811ca001a141c050' }, end: { len16: 8*2, encoded: '008901994010412280cca001a111c050' } }
	,{ category: '', name: 'bigroom2', start: { len16: 8 * 2, encoded: '001101152011211540104110a044a144' }, end: { len16: 8*2, encoded: '001101f5201121f54010a044a144' } }
	,{ category: '', name: 'bigroom', start: { len16: 8 * 2, encoded: '00110111201121114010411080448144' }, end: { len16: 8*2, encoded: '00110111201121114010411180518155' } }
	,{ category: '', name: 'rap', start: { len16: 8 * 2, encoded: '008101454010411080558155' }, end: { len16: 8*2, encoded: '00810105401041d080558104a101c150' } }
	,{ category: '', name: 'prodigy', start: { len16: 8 * 2, encoded: '000501444090411280fe81fea001a101' }, end: { len16: 8*2, encoded: '0005010521404090419080fe81aea001a151' } }
	,{ category: '', name: 'simpleride', start: { len16: 8 * 2, encoded: '0001010140104110c055c155' }, end: { len16: 8*2, encoded: '0089011040104165c055c105e110' } }
	,{ category: '', name: 'simplerock2', start: { len16: 8 * 2, encoded: '0001010540104110a011a111' }, end: { len16: 8 * 2, encoded: '0089010440104175a011a111' } }
	,{ category: '', name: 'hard rock', start: { len16: 8 * 4, encoded: '00050105020503454010411042104310c055c155c255c355' }, end: { len16: 8*2, encoded: '0005010c21c0401060406133c014' } }
	,{ category: '', name: 'power metal', start: { len16: 8 * 4, encoded: '00440144024603464011411142114311a010a111a211a311e001' }, end: { len16: 8*2, encoded: '00820108405d4157e041' } }
	,{ category: '', name: 'punk speed', start: { len16: 8 * 2, encoded: '0031012940444144c055c155' }, end: { len16: 8*2, encoded: '0033010921a0404441146140c055c115' } }
	,{ category: '', name: 'punk tom', start: { len16: 8 * 4, encoded: '000101050201030504010505060107052054215522552355245525552655275540104110421043184410451046104730e001' }, end: { len16: 8*2, encoded: '00110111205421556080614ce001' } }
	,{ category: '', name: 'funk1+', start: { len16: 8 * 4, encoded: '000101250205030440b0419242b04392805d8153825d8353a104a304' }, end: { len16: 8*2, encoded: '000521404090411b61248055' } }
	,{ category: '', name: 'rock2', start: { len16: 8 *2, encoded: '0001014540904110a011a111' }, end: { len16: 8*2, encoded: '000101112120401041cca011a101' } }
	,{ category: '', name: 'rock1-', start: { len16: 8 * 4, encoded: '000501040245034440104110421043108015815582158355a040a240' }, end: { len16: 8*2, encoded: '0005011121404010410f61208055' } }
	,{ category: '', name: 'rock3 half slow', start: { len16: 8 *4, encoded: '004101400241034441014301c011c111c211c311' }, end: { len16: 8*2, encoded: '0041010441d1c011c111' } }	
];
bassDefs = bassDefData;
soloDefs = soloDefData;
beatsDefs = beatsDefsData;
rhythmDefs = rhythmDefsData;
strumDefs = strumDefsData;
melodyDefs = melodydefsData;
chordPitchesList = chordPitchesDatat;
fretPitchesList = chordfretsData;
progressionsList = prlist;
//https://surikov.github.io/RiffShareAndroid/app/src/main/assets/load.html?riff=78-76444757-44646666-0d0c0c0a08090d0e090c--000020c40023020c40040021040063020c400800213400a3020c400c00210400e0021340-000000000000000000000000-000000000000000000000000
parsChanged();
