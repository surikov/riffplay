function renum(n: number, r: NumReplacement[]): number {
	for (let i = 0; i < r.length; i++) {
		if (r[i].original == n) {
			return r[i].to;
		}
	}
	return n;
}
function fillDrums(startPattern: DrumPattern, mainPattern: DrumPattern, endPattern: DrumPattern, nn: number): DrumBeat[]{
	let r: DrumBeat[] = [];
	for (let i = 0; i < nn; i++) {
		let k = i % mainPattern.duration;
		let p: DrumPattern = mainPattern;
		if (i < startPattern.duration) {
			p = startPattern;
			k = i;
		} else {
			if (i >= nn - endPattern.duration) {
				p = endPattern;
				k = i - (nn - endPattern.duration);
			}
		}
		for (let t = 0; t < p.beats.length; t++) {
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
