console.log('r2.01');
var GenRiff = /** @class */ (function () {
    function GenRiff() {
        this.progressions = [];
        this.drumsDefs = [
            { category: '', name: 'simpledance', start: { len16: 8 * 2, encoded: '0011011180448144' }, end: { len16: 8 * 2, encoded: '001101f980448144' } },
            { category: '', name: 'rock3 half slow', start: { len16: 8 * 4, encoded: '004101400241034441014301c011c111c211c311' }, end: { len16: 8 * 2, encoded: '0041010441d1c011c111' } },
            { category: '', name: 'bigroom', start: { len16: 8 * 2, encoded: '00110111201121114010411080448144' }, end: { len16: 8 * 2, encoded: '00110111201121114010411180518155' } },
            { category: '', name: 'bigroom2', start: { len16: 8 * 2, encoded: '001101152011211540104110a044a144' }, end: { len16: 8 * 2, encoded: '001101f5201121f54010a044a144' } },
            { category: '', name: 'simpleride', start: { len16: 8 * 2, encoded: '0001010140104110c055c155' }, end: { len16: 8 * 2, encoded: '0089011040104165c055c105e110' } },
            { category: '', name: 'simplerock2', start: { len16: 8 * 2, encoded: '0001010540104110a011a111' }, end: { len16: 8 * 2, encoded: '0089010440104175a011a111' } },
            { category: '', name: 'rock1-', start: { len16: 8 * 4, encoded: '000501040245034440104110421043108015815582158355a040a240' }, end: { len16: 8 * 2, encoded: '0005011121404010410f61208055' } },
            { category: '', name: 'hard rock', start: { len16: 8 * 4, encoded: '00050105020503454010411042104310c055c155c255c355' }, end: { len16: 8 * 2, encoded: '0005010c21c0401060406133c014' } },
            { category: '', name: 'rock2', start: { len16: 8 * 2, encoded: '0001014540904110a011a111' }, end: { len16: 8 * 2, encoded: '000101112120401041cca011a101' } },
            { category: '', name: 'rap', start: { len16: 8 * 2, encoded: '008101454010411080558155' }, end: { len16: 8 * 2, encoded: '00810105401041d080558104a101c150' } },
            { category: '', name: 'prodigy', start: { len16: 8 * 2, encoded: '000501444090411280fe81fea001a101' }, end: { len16: 8 * 2, encoded: '0005010521404090419080fe81aea001a151' } },
            { category: '', name: 'alatriplet', start: { len16: 8 * 2, encoded: '008901494010411080cc811ca001a141c050' }, end: { len16: 8 * 2, encoded: '008901994010412280cca001a111c050' } },
            { category: '', name: 'funk1+', start: { len16: 8 * 4, encoded: '000101250205030440b0419242b04392805d8153825d8353a104a304' }, end: { len16: 8 * 2, encoded: '000521404090411b61248055' } },
            { category: '', name: 'simpledance2', start: { len16: 8 * 2, encoded: '0011011120402104401041106002a044a144' }, end: { len16: 8 * 2, encoded: '0011011120402155401060026155a044a144' } },
            { category: '', name: 'punk tom', start: { len16: 8 * 4, encoded: '000101050201030504010505060107052054215522552355245525552655275540104110421043184410451046104730e001' }, end: { len16: 8 * 2, encoded: '00110111205421556080614ce001' } },
            { category: '', name: 'punk speed', start: { len16: 8 * 2, encoded: '0031012940444144c055c155' }, end: { len16: 8 * 2, encoded: '0033010921a0404441146140c055c115' } },
            { category: '', name: 'power metal', start: { len16: 8 * 4, encoded: '00440144024603464011411142114311a010a111a211a311e001' }, end: { len16: 8 * 2, encoded: '00820108405d4157e041' } }
        ];
        this.bassDefs = [
            { category: '', name: 'octave1', chord: 'Am', len16: 8 * 4, encoded: '0050209400250215400450209400650215400850209400a50215400c50209400e50215401050209401250215401450209401650215401850209401a50215401c50109401d50115401e50109401f5011540' },
            { category: '', name: 'octave2', chord: 'Am', len16: 8 * 2, encoded: '0050109400150209400250115400350215400450109400550209400650115400750215400850109400950209400a50115400b50215400c50109400d50209400e50115400f5021540' },
            { category: '', name: 'octave3 off', chord: 'Am', len16: 8 * 8, encoded: '0250209400650209400a50109400b50109400e50209401250209401650209401a50109401b5010c401e50209402250209402650209402a50109402b50109402e5020940325010940335010c403650209403a50109403b5010c403e5020940' },
            { category: '', name: 'octave4 terc', chord: 'Bm', len16: 8 * 2, encoded: '005020b40025021740045020b40065020e40085020b400a50217400c5020b400e5021240' },
            { category: '', name: 'tonic1', chord: 'Am', len16: 8 * 4, encoded: '0050209400250209400450209400650209400850209400a50209400c50209400e5020940105020940125020940145020940165020940185020c401a50209401c5020c401e5020940' },
            { category: '', name: 'tonik2', chord: 'Am', len16: 8 * 2, encoded: '005020940025020940045020940065020c400850209400a50209400c50209400e5020740' },
            { category: '', name: 'rich1', chord: 'Am', len16: 8 * 8, encoded: '0050409400650209400850204400c50209401050409401650209401850204401c5020940205040940265020940285020c402a50209402c5020e402e5021040305040940365020940385020c403a50209403c50210403e5020940' },
            { category: '', name: 'rich2', chord: 'Am', len16: 8 * 2, encoded: '005040940045020c40075010940085010c400a50110400c50209400e5020940' },
            { category: '', name: 'rich3 kvint', chord: 'Am', len16: 8 * 4, encoded: '0050409400450404400850409400c50404401050409401450404401850209401a50204401c50205401e5020740' },
            { category: '', name: 'rich4?', chord: 'F', len16: 8 * 4, encoded: '0050205400250205400450209400650205400a50205400c50209400e5020c40105020940125020c401450209401650205401a50205401c50209401e5020540' },
            { category: '', name: 'rich5', chord: 'Am', len16: 8 * 2, encoded: '005040940045020c400650410400a50209400c5040c40' },
            { category: '', name: 'rich5', chord: 'Am', len16: 8 * 2, encoded: '005020940025020940045020940065021040085040c400c50209400e5020740' },
            { category: '', name: 'rich6', chord: 'Am', len16: 8 * 2, encoded: '0050209400250209400450205400650207400850209400a50209400c50205400e5020740' },
            { category: '', name: 'rich7 disco', chord: 'Am', len16: 8 * 8, encoded: '0050409400450204400650207400850409400c50204400e50207401050409401450204401650207401850409401c50204401e50209402050409402450204402650205402850409402c50204402e50205403050409403450204403650205403850409403c50204403e5020940' },
            { category: '', name: 'route66', chord: 'A', len16: 8 * 2, encoded: '005020940025020940045020d40065020d400850210400a50210400c50212400e5021040' }
        ];
        this.progressionsList = [
            //{ category: 'test', name: '', chords: 'A#-A#' },
            { category: 'test-------------------------', name: '', chords: 'C-Bb7-Abmaj7-F' }
            //
            ,
            { category: 'sad', name: '', chords: 'Fmaj7-A' }
            //,{ category: 'major', name: '', chords: 'C-D-E-F-G-A-B' }
            ,
            { category: 'sad', name: '', chords: 'Am-C-Dm-Em' },
            { category: 'sad', name: '', chords: 'F-Em-Am-G-Am' },
            { category: 'sad', name: '', chords: 'Am-G-F-E7' },
            { category: 'sad', name: '', chords: 'E-G-A-G' },
            { category: 'sad', name: '', chords: 'C-E-Am7-F' },
            { category: 'sad', name: '', chords: 'G-C-D-Em' },
            { category: 'sad', name: '', chords: 'Bm-A-G-F#' },
            { category: 'sad', name: '', chords: 'Em-G-C-Am' },
            { category: 'sad', name: '', chords: 'Am-C-D-Am-C-Am' },
            { category: 'sad', name: '', chords: 'Em-D-C-B' },
            { category: 'sad', name: '', chords: 'Em-B-G-Em' },
            { category: 'sad', name: '', chords: 'Am-F-C-G' },
            { category: 'sad', name: '', chords: 'Am-Dm-Fm-C' },
            { category: 'sad', name: '', chords: 'C-Am-Dm-G' },
            { category: 'sad', name: '', chords: 'Am-F-Em-Am' },
            { category: 'sad', name: '', chords: 'Am-E-Em-D-Dm-Am-Adim-E' },
            { category: 'sad', name: '', chords: 'Am-B-Gm' },
            { category: 'sad', name: '', chords: 'F-Em7-Am-G' },
            { category: 'sad', name: '', chords: 'Am-G-Dm-F-G-Am' },
            { category: 'sad', name: '', chords: 'Am-F7-G-Em-F-G' },
            { category: 'sad', name: '', chords: 'Dm-F-Am-G' },
            { category: 'sad', name: '', chords: 'Am-G-C-F-E-E7' },
            { category: 'sad', name: '', chords: 'Am-Dsus4-Dm-F-G-Dm7' },
            { category: 'sad', name: '', chords: 'Am7-F7-G-Em7' },
            { category: 'sad', name: '', chords: 'C-Am-F-G' },
            { category: 'sad', name: '', chords: 'Am-D7-E7-Am' },
            { category: 'test', name: '', chords: 'Em-D-C-D' },
            { category: 'jazz', name: '', chords: 'Am-F7-D7-E7' },
            { category: 'jazz', name: '', chords: 'Cm7-Ab7-G7' },
            { category: 'jazz', name: '', chords: 'D7-G7-C7-F7' },
            { category: 'jazz', name: '', chords: 'Cmaj7-C7-Fmaj7-Fm7-Em7-A7-Dm7-G7-Cmaj7' },
            { category: 'jazz', name: '', chords: 'Cmaj7-Gm7-C7-Fmaj7' },
            { category: 'jazz', name: '', chords: 'Cmaj7-D7-Dm7-G7-Cmaj7' },
            { category: 'jazz', name: '', chords: 'Dm7-G7-Cmaj7' },
            { category: 'jazz', name: '', chords: 'Cmaj7-Cm7-F7' },
            { category: 'jazz', name: '', chords: 'Cmaj7-Am7-Dm7-G7-Em7-A7-Dm7-G7' },
            { category: 'jazz', name: '', chords: 'Dm7-G7-Cmaj7-C6' },
            { category: 'jazz', name: '', chords: 'C-D7-F-C' },
            { category: 'jazz', name: '', chords: 'C-F-G-G7' },
            { category: 'jazz', name: '', chords: 'C-Am-E-G' },
            { category: 'jazz', name: '', chords: 'C-Gm-Dm' },
            { category: 'jazz', name: '', chords: 'Am-G-D' },
            { category: 'wanderwall', name: '', chords: 'Em-G-Dsus4-A7sus4' }
            //, { category: 'blus', name: '', chords: '-' }
            ,
            { category: 'blues', name: '', chords: 'Am-G-D-F' },
            { category: 'epic', name: '', chords: 'C-G-Am-Em-F-C-F-G' },
            { category: 'epic', name: '', chords: 'C-G-Am-F' },
            { category: 'nice', name: '', chords: 'Am-Dm-F-G' },
            { category: 'nice', name: '', chords: 'Am-G-Em-F' },
            { category: 'nice', name: '', chords: 'F-Am-G' },
            { category: 'nice', name: '', chords: 'Am-G-Dm7' },
            { category: 'nice', name: '', chords: 'Dm-Am-C-G' },
            { category: 'nice', name: '', chords: 'Am-Em-G-Dm' },
            { category: 'nice', name: '', chords: 'C-F-G-Am' },
            { category: 'nice', name: '', chords: 'Am7-Em7-Dsus4-Dm7' },
            { category: 'major', name: '', chords: 'G-C-D-C' },
            { category: 'major', name: '', chords: 'G-C-F-C' },
            { category: 'major', name: '', chords: 'F-G-Am-Em' },
            { category: 'major', name: '', chords: 'C-Dm-Am7-F-G-C' },
            { category: 'major', name: '', chords: 'C-Am-F' },
            { category: 'major', name: '', chords: 'D-A-C-G' },
            { category: 'major', name: '', chords: 'C-F-G-F' },
            { category: 'major', name: '', chords: 'C-Dm-F-G' },
            { category: 'major', name: '', chords: 'F-Am-G-D' },
            { category: 'major', name: '', chords: 'C-G-F-G-C' },
            { category: 'major', name: '', chords: 'C-Am-Em-F' },
            { category: 'major', name: '', chords: 'G-C-D' },
            { category: 'major', name: '', chords: 'G-D-Em-C' },
            { category: 'major', name: '', chords: 'Am-D-G' },
            { category: 'major', name: '', chords: 'C-F-C-G' },
            { category: 'major', name: '', chords: 'D-A-Bm-F#m-G-D-G-A' },
            { category: 'major', name: '', chords: 'A-E-F#m-D-A-E' },
            { category: 'major', name: '', chords: 'C-F-Dm-G' },
            { category: 'major', name: '', chords: 'C-F-G' },
            { category: 'major', name: '', chords: 'G-Em-C-D' },
            { category: 'major', name: '', chords: 'G-D-Em-Bm-C-G-C-D' },
            { category: 'major', name: '', chords: 'D-C-G-D' }
        ];
    }
    GenRiff.prototype.repeatChords = function (chords, sub) {
        var row = [];
        var nums = [];
        //var seed = Math.random();
        if (chords.length == 2) {
            if (sub < 0.5)
                nums = nums = [0, 0, 0, 0, 1, 1, 1, 1];
            else
                nums = [0, 0, 1, 1, 0, 0, 1, 1];
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
                nums = [0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3];
        }
        if (chords.length == 5) {
            if (sub < 0.5)
                nums = [0, 0, 1, 1, 2, 2, 3, 4];
            else
                nums = [0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 4, 4];
        }
        if (chords.length == 6) {
            if (sub < 0.5)
                nums = [0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5];
            else
                nums = [0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5];
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
    };
    GenRiff.prototype.initProgressions = function () {
        if (this.progressions.length > 0) {
            //
        }
        else {
            for (var i = 0; i < this.progressionsList.length; i++) {
                //allprogressions
                var chordRow = this.progressionsList[i];
                var arr = chordRow.chords.split('-');
                var chords = this.repeatChords(arr, 0);
                var progression = { category: chordRow.category, name: chordRow.name, chords: chords };
                this.progressions.push(progression);
                chords = this.repeatChords(arr, 1);
                progression = { category: chordRow.category, name: chordRow.name, chords: chords };
                this.progressions.push(progression);
            }
        }
    };
    GenRiff.prototype.generateDrums = function (progression, drumIndex) {
        var pattern = this.drumsDefs[drumIndex];
        var b = [];
        for (var i = 0; i < pattern.start.encoded.length / 4; i++) {
            var key = parseInt(pattern.start.encoded.substring(i * 4, i * 4 + 2), 16);
            var data = parseInt(pattern.start.encoded.substring(i * 4 + 2, i * 4 + 4), 16);
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
        for (var i = 0; i < pattern.end.encoded.length / 4; i++) {
            var key = parseInt(pattern.end.encoded.substring(i * 4, i * 4 + 2), 16);
            var data = parseInt(pattern.end.encoded.substring(i * 4 + 2, i * 4 + 4), 16);
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
        for (var i_1 = 0; i_1 < progression.chords.length * 8; i_1++) {
            if (i_1 < progression.chords.length * 8 - pattern.end.len16) {
                for (var k = 0; k < startbeatdrum.length; k++) {
                    if (startbeatdrum[k].beat == step) {
                        beats.push({ drum: startbeatdrum[k].drum, beat: i_1 });
                    }
                }
                step++;
                if (step >= pattern.start.len16) {
                    step = 0;
                }
            }
            else {
                var r = i_1 - (progression.chords.length * 8 - pattern.end.len16);
                for (var k = 0; k < endbeatdrum.length; k++) {
                    if (endbeatdrum[k].beat == r) {
                        beats.push({ drum: endbeatdrum[k].drum, beat: i_1 });
                    }
                }
            }
        }
        return beats;
    };
    GenRiff.prototype.generateBassLine = function (progression, bassIndex) {
        var b = [];
        return b;
    };
    GenRiff.prototype.generateTracks = function (progression, bassIndex, padIndex, padPluck, riffIndex, melodyIndex) {
        var toneSteps = [];
        //let pattern: DrumPatternDefinition = this.drumsDefs[drumIndex];
        return toneSteps;
    };
    return GenRiff;
}());
