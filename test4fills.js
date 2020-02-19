function renum(n, r) {
    for (var i = 0; i < r.length; i++) {
        if (r[i].original == n) {
            return r[i].to;
        }
    }
    return n;
}
function fillDrums(startPattern, mainPattern, endPattern, first, last /*, nn: number*/) {
    var r = [];
    var fillLength = last - first + 1;
    for (var i = 0; i < fillLength; i++) {
        var stepOfPattern = i % mainPattern.duration;
        var patternInStep = mainPattern;
        if (i < startPattern.duration) {
            patternInStep = startPattern;
            stepOfPattern = i;
        }
        else {
            if (i >= fillLength - endPattern.duration) {
                patternInStep = endPattern;
                stepOfPattern = i - (fillLength - endPattern.duration);
            }
        }
        for (var t = 0; t < patternInStep.beats.length; t++) {
            if (patternInStep.beats[t].beat == stepOfPattern) {
                r.push({
                    beat: i + first,
                    drum: patternInStep.beats[t].drum
                });
            }
        }
    }
    return r;
}
function fillGuitar(startPattern, mainPattern, endPattern, first, last, progression, trackNum
//, repitch: (chordName:string,pitch:number,step:number,progression:ChordSegment[]) => number
, repitch) {
    var result = [];
    var notEnd = true;
    var fillLength = last - first + 1;
    for (var i = 0; i < fillLength; i++) {
        var stepOfPattern = i % mainPattern.duration;
        var patternInStep = mainPattern;
        if (i < startPattern.duration) {
            patternInStep = startPattern;
            stepOfPattern = i;
        }
        else {
            if (i >= fillLength - endPattern.duration) {
                patternInStep = endPattern;
                stepOfPattern = i - (fillLength - endPattern.duration);
                notEnd = false;
            }
            else {
                //
            }
        }
        for (var t = 0; t < patternInStep.beats.length; t++) {
            if (patternInStep.beats[t].beat == stepOfPattern) {
                var len = patternInStep.beats[t].length;
                if (len + stepOfPattern >= patternInStep.duration)
                    len = patternInStep.duration - stepOfPattern;
                if (notEnd) {
                    if (i + len >= fillLength - endPattern.duration) {
                        len = fillLength - endPattern.duration - i;
                    }
                }
                if (len < 1) {
                    len = 1;
                }
                //var pitch = findProgPitchByChord(patternInStep.chordName, patternInStep.beats[t].pitch, i + first, progression);
                //let progressionChordName=findProgChordInStep(i + first,progression);
                //var pitch = repitch(patternInStep.chordName, patternInStep.beats[t].pitch, i + first, progression);
                var progChordName = findProgChordInStep(i + first, progression);
                var pitch = repitch(patternInStep.chordName, patternInStep.beats[t].pitch, progChordName);
                if (pitch > -1) {
                    result.push({
                        track: trackNum,
                        beat: i + first,
                        length: len,
                        shift: patternInStep.beats[t].shift,
                        pitch: pitch
                    });
                }
            }
        }
    }
    return result;
}
