var riffplay = require('riffplay');
var tempo = '120';
var drums = [{"drum": 0,"beat": 0}, {"drum": 5,"beat": 0}
		, {"drum": 2,"beat": 4}, {"drum": 5,"beat": 4}
		, {"drum": 0,"beat": 8}, {"drum": 5,"beat": 8}
		, {"drum": 2,"beat": 12}, {"drum": 5,"beat": 12}];
var notes = [{"track": 5,"beat": 0,"length": 2,"shift": 0,"pitch": 9}
		, {"track": 5,"beat": 4,"length": 2,"shift": 0,"pitch": 4}
		, {"track": 5,"beat": 8,"length": 2,"shift": 0,"pitch": 9}
		, {"track": 5,"beat": 12,"length": 2,"shift": 0,"pitch": 4}];
var songlink = riffplay(tempo, drums, notes);
console.log(songlink);
