console.log('1.0.2');

function encodeRiffURL(tempo, storeDrums, storeTracks, drumVolumes, insVolumes, eqVolume) {
	var pad0 = function (value, size) {
		for (var i = value.length; i < size; i++) {
			value = '0' + value;
		}
		return value;
	};
	var txt = '';
	txt = tempo.toString(16);
	var tracks = '';
	if(!(insVolumes)){
		insVolumes=[7,7,7,7,7,7,7,7];
	}
	for (var i = 0; i < 8; i++) {
		//tracks = tracks + Math.round(7).toString(16);
		tracks = tracks + Math.round(insVolumes[i]).toString(16);
	}
	txt = txt + '-' + tracks;
	var drums = '';
	if(!(drumVolumes)){
		drumVolumes=[6,6,6,6,6,6,6,6];
	}
	for (var i = 0; i < 8; i++) {
		//drums = drums + Math.round(6).toString(16);
		drums = drums + Math.round(drumVolumes[i]).toString(16);
	}
	txt = txt + '-' + drums;
	if(!(eqVolume)){
		eqVolume=[10,10,10,10,10,10,10,10,10,10];
	}
	var equalizer = '';
	for (var i = 0; i < 10; i++) {
		//equalizer = equalizer + pad0(Math.round(10).toString(16), 2);
		equalizer = equalizer + pad0(Math.round(eqVolume[i]).toString(16), 2);
	}
	txt = txt + '-' + equalizer;
	var drumData = "";
	for (var di = 0; di < 8; di++) {
		for (var bi = 0; bi < 32; bi++) {
			var part = [];
			for (var i = 0; i < storeDrums.length; i++) {
				var drum = storeDrums[i].drum;
				var beat = storeDrums[i].beat;
				if (drum == di && beat >= bi * 8 && beat < (bi + 1) * 8) {
					part.push(beat - bi * 8);
				}
			}
			if (part.length > 0) {
				var key = di << 5 | bi;
				var data = 0;
				for (var t = 0; t < part.length; t++) {
					data = data | (1 << part[t]);
				}
				drumData = drumData + pad0(key.toString(16), 2) + pad0(data.toString(16), 2);
			}
		}
	}
	txt = txt + '-' + drumData;
	var pitchData = '';
	for (var bi = 0; bi < 256; bi++) {
		var data = '';
		for (var i = 0; i < storeTracks.length; i++) {
			var beat = storeTracks[i].beat;
			var length = storeTracks[i].length;
			var pitch = storeTracks[i].pitch;
			var shift = 64 + storeTracks[i].shift;
			var track = storeTracks[i].track;
			if (beat == bi) {
				var nd = pad0(beat.toString(16), 2) + track.toString(16) + pad0(length.toString(16), 2) + pad0(pitch.toString(16), 2) + pad0(shift.toString(16), 2);
				pitchData = pitchData + nd;
			}
		}
	}
	txt = txt + '-' + pitchData;
	var playerURL = 'https://surikov.github.io/RiffShareAndroid/app/src/main/assets/load.html?riff=';
	console.log(playerURL + txt);
	return playerURL + txt;
}
if (typeof module === 'object' && module.exports) {
	module.exports = encodeRiffURL;
}
if (typeof window !== 'undefined') {
	window.encodeRiffURL = encodeRiffURL;
}