console.log('r2.01');
type ToneStep = { track: number, beat: number, length: number, shift: number, pitch: number };
type DrumPatternDefinition = { category: string, name: string, start: { len16: number, encoded: string }, end: { len16: number, encoded: string } };
type DrumStep = { drum: number, beat: number };
type Progression816 = { category: string, name: string, chords: string[] };
type ProgDescr = { category: string, name: string, chords: string };

type PlayInfo = { tempo: number, drumData: DrumStep[], tracksData: ToneStep[], drumVolumes: number[], insVolumes: number[], eqVolumes: number[] };
type ChordPitches = { name: string, pitches: number[] };
type FretKeys = { pitch: number, name: string, frets: number[] }
type PianoPatternDefinition = { category: string, name: string, piano: string, track: number };
type MelodyPatternDefinition = { category: string, name: string, chord: string, len16: number, encoded: string };
type StrumPatternDefinition = { category: string, name: string, strum: string };

declare function WebAudioFontPlayer(): void;
declare function WebAudioFontChannel(audioContext: AudioContext): void;
declare function WebAudioFontReverberator(audioContext: AudioContext): void;


class GenRiff {
	audioContext: AudioContext;
	player: any | null = null;
	onAir: boolean = false;
	//tempo: number = 120;
	playInfo: PlayInfo = null;
	nextWhen: number = 0;
	sentWhen: number = 0;
	nextBeat: number = 0;
	tickerStep: number = 0;
	tickerDelay: number = 0;
	//sentBeat:number=0;
	selectedProgression: Progression816 = null;
	progressions: Progression816[] = [];
	C = 0; Cs = 1; D = 2; Ds = 3; E = 4; F = 5; Fs = 6; G = 7; Gs = 8; A = 9; As = 10; B = 11;
	O = 12;
	S1 = this.O * 1 + this.E;
	S2 = this.O * 1 + this.A;
	S3 = this.O * 2 + this.D;
	S4 = this.O * 2 + this.G;
	S5 = this.O * 2 + this.B;
	S6 = this.O * 3 + this.E;
	Strings6 = [this.S1, this.S2, this.S3, this.S4, this.S5, this.S6];
	//
	BassDrum = 0; //10
	LowTom = 1; //3
	SnareDrum = 2; //7
	MidTom = 3; //3
	ClosedHiHat = 4; //5
	OpenHiHat = 5; //4
	RideCymbal = 6; //7
	SplashCymbal = 7; //7
	//
	DistortionGuitar = 0; //8
	AcousticGuitar = 1; //8
	PercussiveOrgan = 2; //8
	PalmMuteGuitar = 3; //8
	AcousticPiano = 4; //6
	BassGuitar = 5; //11
	StringEnsemble = 6; //6
	SynthBass = 7; //8
	scaleModeIonian = 'Ionian';//majorC
	scaleModeDorian = 'Dorian';//minorDVI+
	scaleModePhrygian = 'Phrygian';//minorEII-
	scaleModeLydian = 'Lydian';//majorFIV+
	scaleModeMixolydian = 'Mixolydian';//majorGVII-
	scaleModeAeolian = 'Aeolian';//minorA
	scaleModeLocrian = 'Locrian'//minorHII-V-;
	scaleModes: ChordPitches[] = [
		{ name: this.scaleModeIonian, pitches: [2, 2, 1, 2, 2, 2, 1] }
		, { name: this.scaleModeDorian, pitches: [2, 1, 2, 2, 2, 1, 2] }
		, { name: this.scaleModePhrygian, pitches: [1, 2, 2, 2, 1, 2, 2] }
		, { name: this.scaleModeLydian, pitches: [2, 2, 2, 1, 2, 2, 1] }
		, { name: this.scaleModeMixolydian, pitches: [2, 2, 1, 2, 2, 1, 2] }
		, { name: this.scaleModeAeolian, pitches: [2, 1, 2, 2, 1, 2, 2] }
		, { name: this.scaleModeLocrian, pitches: [1, 2, 2, 1, 2, 2, 2] }
	];
	drumsDefs: DrumPatternDefinition[] = [
		{ category: '', name: 'simpledance', start: { len16: 8 * 2, encoded: '0011011180448144' }, end: { len16: 8 * 2, encoded: '001101f980448144' } }
		, { category: '', name: 'bigroom', start: { len16: 8 * 2, encoded: '00110111201121114010411080448144' }, end: { len16: 8 * 2, encoded: '00110111201121114010411180518155' } }
		, { category: '', name: 'bigroom2', start: { len16: 8 * 2, encoded: '001101152011211540104110a044a144' }, end: { len16: 8 * 2, encoded: '001101f5201121f54010a044a144' } }
		, { category: '', name: 'simpledance2', start: { len16: 8 * 2, encoded: '0011011120402104401041106002a044a144' }, end: { len16: 8 * 2, encoded: '0011011120402155401060026155a044a144' } }

		, { category: '', name: 'rock3 half slow', start: { len16: 8 * 4, encoded: '004101400241034441014301c011c111c211c311' }, end: { len16: 8 * 2, encoded: '0041010441d1c011c111' } }
		, { category: '', name: 'rock1-', start: { len16: 8 * 4, encoded: '000501040245034440104110421043108015815582158355a040a240' }, end: { len16: 8 * 2, encoded: '0005011121404010410f61208055' } }
		, { category: '', name: 'alatriplet', start: { len16: 8 * 2, encoded: '008901494010411080cc811ca001a141c050' }, end: { len16: 8 * 2, encoded: '008901994010412280cca001a111c050' } }
		, { category: '', name: 'rap', start: { len16: 8 * 2, encoded: '008101454010411080558155' }, end: { len16: 8 * 2, encoded: '00810105401041d080558104a101c150' } }
		, { category: '', name: 'prodigy', start: { len16: 8 * 2, encoded: '000501444090411280fe81fea001a101' }, end: { len16: 8 * 2, encoded: '0005010521404090419080fe81aea001a151' } }
		, { category: '', name: 'funk1+', start: { len16: 8 * 4, encoded: '000101250205030440b0419242b04392805d8153825d8353a104a304' }, end: { len16: 8 * 2, encoded: '000521404090411b61248055' } }

		, { category: '', name: 'simpleride', start: { len16: 8 * 2, encoded: '0001010140104110c055c155' }, end: { len16: 8 * 2, encoded: '0089011040104165c055c105e110' } }
		, { category: '', name: 'simplerock2', start: { len16: 8 * 2, encoded: '0001010540104110a011a111' }, end: { len16: 8 * 2, encoded: '0089010440104175a011a111' } }
		, { category: '', name: 'hard rock', start: { len16: 8 * 4, encoded: '00050105020503454010411042104310c055c155c255c355' }, end: { len16: 8 * 2, encoded: '0005010c21c0401060406133c014' } }
		, { category: '', name: 'rock2', start: { len16: 8 * 2, encoded: '0001014540904110a011a111' }, end: { len16: 8 * 2, encoded: '000101112120401041cca011a101' } }
		, { category: '', name: 'punk tom', start: { len16: 8 * 4, encoded: '000101050201030504010505060107052054215522552355245525552655275540104110421043184410451046104730e001' }, end: { len16: 8 * 2, encoded: '00110111205421556080614ce001' } }
		, { category: '', name: 'punk speed', start: { len16: 8 * 2, encoded: '0031012940444144c055c155' }, end: { len16: 8 * 2, encoded: '0033010921a0404441146140c055c115' } }
		, { category: '', name: 'power metal', start: { len16: 8 * 4, encoded: '00440144024603464011411142114311a010a111a211a311e001' }, end: { len16: 8 * 2, encoded: '00820108405d4157e041' } }
	];
	bassDefs: MelodyPatternDefinition[] = [
		{ category: '', name: 'octave1', chord: 'Am', len16: 8 * 4, encoded: '0050209400250215400450209400650215400850209400a50215400c50209400e50215401050209401250215401450209401650215401850209401a50215401c50109401d50115401e50109401f5011540' }
		, { category: '', name: 'octave2', chord: 'Am', len16: 8 * 2, encoded: '0050109400150209400250115400350215400450109400550209400650115400750215400850109400950209400a50115400b50215400c50109400d50209400e50115400f5021540' }
		, { category: '', name: 'octaveII', chord: 'Am', len16: 8 * 4, encoded: '0050209400250115400450209400650115400850209400a50115400c50209400e50115401050209401250115401450209401650115401850209401a50115401c50109401d50104401e50109401f5011040' }
		, { category: '', name: 'strange', chord: 'Am', len16: 8 * 2, encoded: '0050209400250115400350115400450209400650115400750115400850209400a50115400b50115400c50209400e50115400f5011040' }
		, { category: '', name: 'octave32 off', chord: 'Am', len16: 8 * 2, encoded: '0050109400250209400450109400650209400850109400a50209400c50109400e5010c400f5010940' }

		, { category: '', name: 'octave3 off', chord: 'Am', len16: 8 * 8, encoded: '0250209400650209400a50109400b50109400e50209401250209401650209401a50109401b5010c401e50209402250209402650209402a50109402b50109402e5020940325010940335010c403650209403a50109403b5010c403e5020940' }
		, { category: '', name: 'octave4 terc', chord: 'Bm', len16: 8 * 2, encoded: '005020b40025021740045020b40065020e40085020b400a50217400c5020b400e5021240' }
		, { category: '', name: 'tonic1', chord: 'Am', len16: 8 * 4, encoded: '0050209400250209400450209400650209400850209400a50209400c50209400e5020940105020940125020940145020940165020940185020c401a50209401c5020c401e5020940' }
		, { category: '', name: 'tonik2', chord: 'Am', len16: 8 * 2, encoded: '005020940025020940045020940065020c400850209400a50209400c50209400e5020740' }
		, { category: '', name: 'manuchao', chord: 'Am', len16: 8 * 2, encoded: '005040940045020c400650209400850210400a5020e400c5041040' }

		, { category: '', name: 'rich1', chord: 'Am', len16: 8 * 8, encoded: '0050409400650209400850204400c50209401050409401650209401850204401c5020940205040940265020940285020c402a50209402c5020e402e5021040305040940365020940385020c403a50209403c50210403e5020940' }
		, { category: '', name: 'rich2', chord: 'Am', len16: 8 * 2, encoded: '005040940045020c40075010940085010c400a50110400c50209400e5020940' }
		, { category: '', name: 'rich3 kvint', chord: 'Am', len16: 8 * 4, encoded: '0050409400450404400850409400c50404401050409401450404401850209401a50204401c50205401e5020740' }
		, { category: '', name: 'rich4?', chord: 'F', len16: 8 * 4, encoded: '0050205400250205400450209400650205400a50205400c50209400e5020c40105020940125020c401450209401650205401a50205401c50209401e5020540' }
		, { category: '', name: 'rich5', chord: 'Am', len16: 8 * 2, encoded: '005040940045020c400650410400a50209400c5040c40' }
		, { category: '', name: 'rich5', chord: 'Am', len16: 8 * 2, encoded: '005020940025020940045020940065021040085040c400c50209400e5020740' }
		, { category: '', name: 'rich6', chord: 'Am', len16: 8 * 2, encoded: '0050209400250209400450205400650207400850209400a50209400c50205400e5020740' }
		, { category: '', name: 'rich7 disco', chord: 'Am', len16: 8 * 8, encoded: '0050409400450204400650207400850409400c50204400e50207401050409401450204401650207401850409401c50204401e50209402050409402450204402650205402850409402c50204402e50205403050409403450204403650205403850409403c50204403e5020940' }
		, { category: '', name: 'route66', chord: 'A', len16: 8 * 2, encoded: '005020940025020940045020d40065020d400850210400a50210400c50212400e5021040' }
	];
	strumDefs: StrumPatternDefinition[] = [
		{ category: '', name: 'accent1', strum: 'VAX...........A-VAX...........A-VAX...........A-VAX.V-V-V-V-V-A-' }
		, { category: '', name: 'accent2', strum: 'V-V-V-..A-A-....' }
		, { category: '', name: 'litlebig', strum: 'V---V---V-XAV---' }
		, { category: '', name: 'strum4', strum: 'V...V...V...V-A-' }
		, { category: '', name: 'strum1', strum: 'V---V.A-V.A-V-A.' }
		, { category: '', name: 'strum2', strum: 'V---A-V---A-V-A-' }
		, { category: '', name: 'strum3', strum: 'V-X-X-A---V-A-V-' }
		, { category: '', name: 'strum5', strum: 'V---V-A---V-A---' }
		//, { category: '', name: 'accent2', strum: 'V---A-V---A-V-A-' }
		//, { category: '', name: 'disco strum', strum: 'VAVX..V-' }

		//, { category: '', name: 'wanderwall', strum: 'V-V-V.VAVAV-V-VAVAV-V-VA-A-AVAVA' }
		//, { category: '', name: 'wanderwall2', strum: 'V-V-X.VAVAX-X-VAVAV-V-VA-A-AVAVA' }


	];
	pianoDefsData: PianoPatternDefinition[] = [
		{ category: '', name: 'route66', piano: '..2-----2-2-......2-----2-2-......2-----2-2-......2---2-..2-..2-', track: 4 }
		, { category: '', name: 'slade', piano: '2-..2-..2-..2-1-', track: 4 }
		, { category: '', name: 'chicago', piano: '2-..2-..2--2--2-..2-.2-.2-.2-.2-', track: 4 }
		, { category: '', name: 'sandstorm', piano: '2-22-22-2-22-221', track: 4 }
		, { category: '', name: 'abba', piano: '.2..2-.2-.2--...', track: 4 }
		, { category: '', name: 'bronskibit', piano: '2-..1-2-..1-2-..', track: 4 }
	];
	overdriveDefsData: MelodyPatternDefinition[] = [
		{ category: '', name: 'long', chord: 'Am', len16: 8 * 8, encoded: '0000c15400000c1c400c30215400e30215401000c15401000c1c401c30215401e30215402000c15402000c1c402c30215402e3021540300021540300021c40323021540343021540360021540360021c403830215403a30215403c00215403c0021c403e3021540' }

		, { category: '', name: 'kickstart2', chord: 'Am', len16: 8 * 8, encoded: '0000e15400000e1c400e30210401000e1c401001010401e00221401e00215401e0021c40200021540200022140200021c40223021540240021c40240022140263021540280021c402800221402a30215402c30215402e3021540303021540323021540340021c40340022140363021540380021c403800221403a00410403a0041c403e3021340' }
		//, { category: '', name: 'gypsyroad', chord: 'Am', len16: 8 * 4, encoded: '000021840020021740043021540060041540060041c400a30215400c00415400c0041c40100021340120021540140021740160041c401600415401a30215401c0041c401c0041540' }
		, { category: '', name: 'sadbutrue', chord: 'Am', len16: 8 * 16, encoded: '000061540000061c400630215400830215400a00215400a0021c400c30215400e3021540100061540100061c401630215401830215401a30218401c30218401e00218401e0021c40200061540200061c402630215402830215402a00215402a0021c402c30215402e3021540300061540300061c403630215403830215403a30218403c30218403e00218403e0021c40400061540400061c404630215404830215404a00215404c30215404e3021540500061540500061c405630215405830215405a30218405c30218405e00218405e0021c40600061540600061c406630215406830215406a30218406c30218406e3021840700061840700061c407630215407830215407a30215407c30215407e00215407e0021c40' }
		, { category: '', name: 'kickstart 1', chord: 'Am', len16: 8 * 4, encoded: '000041540000041c40040021540040021c400630215400830215400a30215400c00215400c0021c400e3021540103021540123021540140021540140021c401630215401830215401a00410401a00415401e00213401e0021a40' }

		, { category: '', name: 'gypsyroad2', chord: 'Am', len16: 8 * 4, encoded: '000021c40020021840043021540060041540060041c400a30215400c00415400c0041c40100021040120021540140021840160041c401600415401a30215401c0041c401c0041540' }
		, { category: '', name: 'volya', chord: 'Am', len16: 8 * 8, encoded: '000021540000021c400230215400430215400630215400830215400a30215400c00218400c0021f400e0021c400e0022340100021540100021c401230215401430215401630215401830215401a30215401c00210401c00217401e00211401e0021840200021540200021c402230215402430215402630215402830215402a30215402c00218402c0021f402e0021c402e0022340300021540300021c40323021540343021540360021540360021c403830215403a00215403a0021c403c30215403e0021c403e0022340' }

	];
	pianoStrumOverDefsData: (StrumPatternDefinition | PianoPatternDefinition | MelodyPatternDefinition)[]
		= [{ category: '', name: '', strum: '' }];
	padDefsData2: PianoPatternDefinition[] = [
		{ category: '', name: 'empty', piano: '', track: 4 }
		, { category: '', name: 'long string1', piano: '2-------------------------------', track: 6 }
		, { category: '', name: 'long string2', piano: '1-------2-----------------------', track: 6 }
		, { category: '', name: 'long string3', piano: '2-------1-------2---------------', track: 6 }
		, { category: '', name: 'long string4', piano: '2-----------------------1-------', track: 6 }
		, { category: '', name: 'long string5', piano: '2-------1-------', track: 6 }
		, { category: '', name: 'long string6', piano: '1-------2-------', track: 6 }
		, { category: '', name: 'long organ1', piano: '2-------------------------------', track: 2 }

		, { category: '', name: 'long organ2', piano: '1-------2-----------------------', track: 2 }

		, { category: '', name: 'long organ3', piano: '2-------1-------2---------------', track: 2 }

		, { category: '', name: 'long organ4', piano: '2-----------------------1-------', track: 2 }

		, { category: '', name: 'long organ5', piano: '2-------1-------', track: 2 }

		, { category: '', name: 'long organ6', piano: '1-------2-------', track: 2 }
	];
	melodyDefsData2: MelodyPatternDefinition[] = [
		{ category: '', name: 'laser dance', chord: 'Cm', len16: 8 * 2, encoded: '007010c40017021340037010c40047021140067010c40077020f40097010c400a70213400c70211400e7021340' }
		, { category: '', name: 'living video', chord: 'Am', len16: 8 * 4, encoded: '0070421400470221400670223400870228400a70321400e70423401270221401470223401670224401870228401a70224401c70323401e7022140' }
		, { category: '', name: 'disco', chord: 'Cm', len16: 8 * 8, encoded: '007041f40047041b40087041b400c7021a400e70218401070818401c70213401e7021640207041b402470418402870418402c7021b402e70213403070813403c7020f403e7021340' }
		//, { category: '', name: 'kickstart 1', chord: 'Am', len16: 8 * 4, encoded: '000041540000041c40040021540040021c400630215400830215400a30215400c00215400c0021c400e3021540103021540123021540140021540140021c401630215401830215401a00410401a00415401e00213401e0021a40' }
		//, { category: '', name: 'kickstart2', chord: 'Am', len16: 8 * 8, encoded: '0000e15400000e1c400e30210401000e1c401001010401e00221401e00215401e0021c40200021540200022140200021c40223021540240021c40240022140263021540280021c402800221402a30215402c30215402e3021540303021540323021540340021c40340022140363021540380021c403800221403a00410403a0041c403e3021340' }
		//, { category: '', name: 'sadbutrue', chord: 'Am', len16: 8 * 16, encoded: '000061540000061c400630215400830215400a00215400a0021c400c30215400e3021540100061540100061c401630215401830215401a30218401c30218401e00218401e0021c40200061540200061c402630215402830215402a00215402a0021c402c30215402e3021540300061540300061c403630215403830215403a30218403c30218403e00218403e0021c40400061540400061c404630215404830215404a00215404c30215404e3021540500061540500061c405630215405830215405a30218405c30218405e00218405e0021c40600061540600061c406630215406830215406a30218406c30218406e3021840700061840700061c407630215407830215407a30215407c30215407e00215407e0021c40' }
		//, { category: '', name: 'gypsyroad', chord: 'Am', len16: 8 * 4, encoded: '000021840020021740043021540060041540060041c400a30215400c00415400c0041c40100021340120021540140021740160041c401600415401a30215401c0041c401c0041540' }
		//, { category: '', name: 'gypsyroad2', chord: 'Am', len16: 8 * 4, encoded: '000021c40020021840043021540060041540060041c400a30215400c00415400c0041c40100021040120021540140021840160041c401600415401a30215401c0041c401c0041540' }
		//, { category: '', name: 'long', chord: 'Am', len16: 8 * 8, encoded: '0000c15400000c1c400c30215400e30215401000c15401000c1c401c30215401e30215402000c15402000c1c402c30215402e3021540300021540300021c40323021540343021540360021540360021c403830215403a30215403c00215403c0021c403e3021540' }
		, { category: '', name: 'cgerry', chord: 'C', len16: 8 * 8, encoded: '107011a40127011a40147011d40167011d40187011c401a7011c401b70118401d70118401f7011840207011a40227011a40247011d40267011d40287011c402a7011c402b70118402d70118402f7011840' }
		, { category: '', name: 'abba', chord: 'C', len16: 8 * 8, encoded: '2b70124402c70324402f7012340307032140337011f403470c1f40' }
		, { category: '', name: 'fable', chord: 'Am', len16: 8 * 16, encoded: '002041c40042021a40062041c400a2061840102041c40142021a40162041c401a2061840202041c40242021a40262041c402a20618403820218403a2021a403c2021c403e20221404020418404820218404a2021a404c2021c404e20621405820217405a20218405c2021a405e20621406e2021c407020218407220615407820418407c2041c40' }
	];
	padMelodyDefsData: (PianoPatternDefinition | MelodyPatternDefinition)[] = [];
	chordfretsData: FretKeys[] = [
		{ name: "A#", pitch: 9, frets: [-1, 1, 3, 3, 3, 1] },
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
	chordPitchesData: ChordPitches[] = [
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
	progressionsList: ProgDescr[] = [
		//{ category: 'test', name: '', chords: 'A#-A#' },

		{ category: 'test-------------------------', name: '', chords: 'C-Bb7-Abmaj7-F' }

		//
		, { category: 'sad', name: '', chords: 'Fmaj7-A' }
		//,{ category: 'major', name: '', chords: 'C-D-E-F-G-A-B' }
		, { category: 'sad', name: '', chords: 'Am-C-Dm-Em' }
		, { category: 'sad', name: '', chords: 'F-Em-Am-G-Am' }
		, { category: 'sad', name: '', chords: 'Am-G-F-E7' }
		, { category: 'sad', name: '', chords: 'E-G-A-G' }
		, { category: 'sad', name: '', chords: 'C-E-Am7-F' }
		, { category: 'sad', name: '', chords: 'G-C-D-Em' }
		, { category: 'sad', name: '', chords: 'Bm-A-G-F#' }
		, { category: 'sad', name: '', chords: 'Em-G-C-Am' }
		, { category: 'sad', name: '', chords: 'Am-C-D-Am-C-Am' }
		, { category: 'sad', name: '', chords: 'Em-D-C-B' }
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
		, { category: 'sad', name: '', chords: 'Am-D7-E7-Am' }
		, { category: 'test', name: '', chords: 'Em-D-C-D' }
		, { category: 'jazz', name: '', chords: 'Am-F7-D7-E7' }
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
		, { category: 'wanderwall', name: '', chords: 'Em-G-Dsus4-A7sus4' }
		//, { category: 'blus', name: '', chords: '-' }
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
		, { category: 'major', name: '', chords: 'G-C-D-C' }
		, { category: 'major', name: '', chords: 'G-C-F-C' }
		, { category: 'major', name: '', chords: 'F-G-Am-Em' }
		, { category: 'major', name: '', chords: 'C-Dm-Am7-F-G-C' }
		, { category: 'major', name: '', chords: 'C-Am-F' }
		, { category: 'major', name: '', chords: 'D-A-C-G' }
		, { category: 'major', name: '', chords: 'C-F-G-F' }
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
		, { category: 'major', name: '', chords: 'C-F-Dm-G' }
		, { category: 'major', name: '', chords: 'C-F-G' }
		, { category: 'major', name: '', chords: 'G-Em-C-D' }
		, { category: 'major', name: '', chords: 'G-D-Em-Bm-C-G-C-D' }
		, { category: 'major', name: '', chords: 'D-C-G-D' }
	];
	parseMelody(encoded: string): ToneStep[] {
		//console.log(encoded);
		let beats: ToneStep[] = [];
		let cnt = encoded.length / 9;
		for (var i = 0; i < cnt; i++) {
			beats.push({
				track: parseInt(encoded.substring(i * 9 + 2, i * 9 + 2 + 1), 16)
				, beat: parseInt(encoded.substring(i * 9, i * 9 + 2), 16)
				, length: parseInt(encoded.substring(i * 9 + 3, i * 9 + 3 + 2), 16)
				, shift: parseInt(encoded.substring(i * 9 + 7, i * 9 + 7 + 2), 16) - 64
				, pitch: parseInt(encoded.substring(i * 9 + 5, i * 9 + 5 + 2), 16)
			});
		}
		return beats;
	}
	findChordPitches(chordName: String): number[] {
		for (var i = 0; i < this.chordfretsData.length; i++) {
			if (this.chordfretsData[i].name == chordName) {
				var s: number[] = this.chordfretsData[i].frets;
				let pitches: number[] = [];
				for (var k = 0; k < this.Strings6.length; k++) {
					if (s[k] < 0) {
						//pitches.push(-1);
					} else {
						pitches.push(this.Strings6[k] + s[k] - 12);
					}
				}
				return pitches;
			}
		}
		return [-1, -1, -1, -1, -1, -1]
	}
	repeatChords(chords: string[], sub: number): string[] {
		var row: string[] = [];
		var nums: number[] = [];
		//var seed = Math.random();
		if (chords.length == 2) {
			if (sub < 0.5) nums = nums = [0, 0, 0, 0, 1, 1, 1, 1];
			else nums = [0, 0, 1, 1, 0, 0, 1, 1];
		}
		if (chords.length == 3) {
			if (sub < 0.5) nums = [0, 0, 0, 0, 1, 1, 2, 2];
			else nums = [0, 0, 1, 1, 2, 2, 2, 2];
		}
		if (chords.length == 4) {
			if (sub < 0.5) nums = [0, 0, 1, 1, 2, 2, 3, 3];
			else nums = [0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3];
		}
		if (chords.length == 5) {
			if (sub < 0.5) nums = [0, 0, 1, 1, 2, 2, 3, 4];
			else nums = [0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 4, 4];
		}
		if (chords.length == 6) {
			if (sub < 0.5) nums = [0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5];
			else nums = [0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5];
		}
		if (chords.length == 7) {
			if (sub < 0.5) nums = [0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 6, 6];
			else nums = [0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6];
		}
		if (chords.length == 8) {
			if (sub < 0.5) nums = [0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7];
			else nums = [0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 7];
		}
		if (chords.length == 9) {
			if (sub < 0.5) nums = [0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 8];
			else nums = [0, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8];
		}
		for (let i = 0; i < nums.length; i++) {
			row.push(chords[nums[i]]);
		}
		return row;
	}
	morphPitch(pitch: number, fromMode: number[], toMode: number[], needRepitch: boolean): number {
		let base = (pitch + 12 - fromMode[0]) % 12;
		let step = 0;
		for (let i = 0; i < fromMode.length; i++) {
			if (fromMode[i] > base + fromMode[0]) {
				break;
			}
			step = i;
		}
		let morphed = pitch + (toMode[step] - fromMode[step]);
		if (needRepitch) {
			morphed = this.repitch(toMode[0], morphed);
		}
		if (morphed < 0) morphed = morphed + 12;
		if (morphed >= 120) morphed = morphed - 12;
		return morphed;
	}
	repitch(to: number, pitch: number): number {
		pitch = pitch + 12;
		if (to >= 4) pitch = pitch - 12;
		if (pitch < 4) pitch = pitch + 12;
		return pitch;
	}
	findScaleMode(name: string): number[] {
		if (name == this.scaleModeIonian) return this.scaleModes[0].pitches;
		if (name == this.scaleModeDorian) return this.scaleModes[1].pitches;
		if (name == this.scaleModePhrygian) return this.scaleModes[2].pitches;
		if (name == this.scaleModeLydian) return this.scaleModes[3].pitches;
		if (name == this.scaleModeMixolydian) return this.scaleModes[4].pitches;
		if (name == this.scaleModeAeolian) return this.scaleModes[5].pitches;
		if (name == this.scaleModeLocrian) return this.scaleModes[6].pitches;
		return [];
	}
	findModePitches(chordName: string): number[] {
		let nameLen = 1;
		let steps: number[] = [];
		let root = -1;
		let a = chordName.substr(0, 1);
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
			nameLen++;
		} else {
			if (chordName.substr(1, 1) == 'b') {
				root--;
				nameLen++;
				if (root < 0) {
					root = root + 12;
				}
			}
		}
		if ((chordName.substr(1, 1) == 'b') || (chordName.substr(1, 1) == '#')) {
			nameLen = 2;
		}
		if (chordName.substr(nameLen, 1) == 'm' && (chordName.substr(nameLen, 3) != 'maj')) {
			steps = this.findScaleMode(this.scaleModeAeolian);
		} else {
			steps = this.findScaleMode(this.scaleModeIonian);
		}
		let pitches: number[] = [root];
		pitches.push(pitches[pitches.length - 1] + steps[0]);
		pitches.push(pitches[pitches.length - 1] + steps[1]);
		pitches.push(pitches[pitches.length - 1] + steps[2]);
		pitches.push(pitches[pitches.length - 1] + steps[3]);
		pitches.push(pitches[pitches.length - 1] + steps[4]);
		pitches.push(pitches[pitches.length - 1] + steps[5]);
		return pitches;
	}
	pianoKeysByName(chordName: string, trans: number): number[] {
		let retarr: number[] = [];
		let a = chordName.substr(0, 1);
		let start = 1;
		let root = -1;
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
		//root = root + 24;
		if (chordName.substr(1, 1) == 'b') {
			root--;
			start++;
		}
		root = root + trans;
		if (root < 0) root = root + 12;
		if (root >= 120) root = root - 12;
		retarr.push(root);
		let chordKind = chordName.substr(start);
		for (var i = 0; i < this.chordPitchesData.length; i++) {
			if (this.chordPitchesData[i].name == chordKind) {
				for (var p = 0; p < this.chordPitchesData[i].pitches.length; p++) {
					retarr.push(root + this.chordPitchesData[i].pitches[p]);
				}
				break;
			}
		}
		return retarr;
	}
	constructor() {
		for (var i = 0; i < this.progressionsList.length; i++) {
			//allprogressions
			let chordRow = this.progressionsList[i];
			var arr: string[] = chordRow.chords.split('-');
			var chords: string[] = this.repeatChords(arr, 0);
			let progression: Progression816 = { category: chordRow.category, name: chordRow.category + ': ' + chords, chords: chords };
			this.progressions.push(progression);
			chords = this.repeatChords(arr, 1);
			progression = { category: chordRow.category, name: chordRow.category + ': ' + chords, chords: chords };
			this.progressions.push(progression);
			//console.log(i,progression);
		}
		for (let i = 0; i < this.pianoDefsData.length; i++) {
			this.pianoStrumOverDefsData.push(this.pianoDefsData[i]);
		}
		for (let i = 0; i < this.strumDefs.length; i++) {
			this.pianoStrumOverDefsData.push(this.strumDefs[i]);
		}
		for (let i = 0; i < this.overdriveDefsData.length; i++) {
			this.pianoStrumOverDefsData.push(this.overdriveDefsData[i]);
		}
		for (let i = 0; i < this.padDefsData2.length; i++) {
			this.padMelodyDefsData.push(this.padDefsData2[i]);
		}
		for (let i = 0; i < this.melodyDefsData2.length; i++) {
			this.padMelodyDefsData.push(this.melodyDefsData2[i]);
		}

		//console.log(this.rhythmDefsData);
	}

	generateDrums(progression: Progression816, pattern: DrumPatternDefinition): DrumStep[] {
		//let pattern: DrumPatternDefinition = this.drumsDefs[drumIndex];
		var b: DrumStep[] = [];
		for (var i = 0; i < pattern.start.encoded.length / 4; i++) {
			var key = parseInt(pattern.start.encoded.substring(i * 4, i * 4 + 2), 16);
			var data = parseInt(pattern.start.encoded.substring(i * 4 + 2, i * 4 + 4), 16);
			var drum = key >> 5;
			var i32 = key & parseInt('11111', 2);
			if ((data | parseInt('00000001', 2)) == data) b.push({ drum: drum, beat: i32 * 8 + 0 });
			if ((data | parseInt('00000010', 2)) == data) b.push({ drum: drum, beat: i32 * 8 + 1 });
			if ((data | parseInt('00000100', 2)) == data) b.push({ drum: drum, beat: i32 * 8 + 2 });
			if ((data | parseInt('00001000', 2)) == data) b.push({ drum: drum, beat: i32 * 8 + 3 });
			if ((data | parseInt('00010000', 2)) == data) b.push({ drum: drum, beat: i32 * 8 + 4 });
			if ((data | parseInt('00100000', 2)) == data) b.push({ drum: drum, beat: i32 * 8 + 5 });
			if ((data | parseInt('01000000', 2)) == data) b.push({ drum: drum, beat: i32 * 8 + 6 });
			if ((data | parseInt('10000000', 2)) == data) b.push({ drum: drum, beat: i32 * 8 + 7 });
		}
		var startbeatdrum: DrumStep[] = b;
		b = [];
		for (var i = 0; i < pattern.end.encoded.length / 4; i++) {
			var key = parseInt(pattern.end.encoded.substring(i * 4, i * 4 + 2), 16);
			var data = parseInt(pattern.end.encoded.substring(i * 4 + 2, i * 4 + 4), 16);
			var drum = key >> 5;
			var i32 = key & parseInt('11111', 2);
			if ((data | parseInt('00000001', 2)) == data) b.push({ drum: drum, beat: i32 * 8 + 0 });
			if ((data | parseInt('00000010', 2)) == data) b.push({ drum: drum, beat: i32 * 8 + 1 });
			if ((data | parseInt('00000100', 2)) == data) b.push({ drum: drum, beat: i32 * 8 + 2 });
			if ((data | parseInt('00001000', 2)) == data) b.push({ drum: drum, beat: i32 * 8 + 3 });
			if ((data | parseInt('00010000', 2)) == data) b.push({ drum: drum, beat: i32 * 8 + 4 });
			if ((data | parseInt('00100000', 2)) == data) b.push({ drum: drum, beat: i32 * 8 + 5 });
			if ((data | parseInt('01000000', 2)) == data) b.push({ drum: drum, beat: i32 * 8 + 6 });
			if ((data | parseInt('10000000', 2)) == data) b.push({ drum: drum, beat: i32 * 8 + 7 });
		}
		var endbeatdrum: DrumStep[] = b;
		let step = 0;
		let beats: DrumStep[] = [];
		for (let i = 0; i < progression.chords.length * 8; i++) {
			if (i < progression.chords.length * 8 - pattern.end.len16) {
				for (let k = 0; k < startbeatdrum.length; k++) {
					if (startbeatdrum[k].beat == step) {
						beats.push({ drum: startbeatdrum[k].drum, beat: i });
					}
				}
				step++;
				if (step >= pattern.start.len16) { step = 0; }
			} else {
				var r = i - (progression.chords.length * 8 - pattern.end.len16);
				for (let k = 0; k < endbeatdrum.length; k++) {
					if (endbeatdrum[k].beat == r) {
						beats.push({ drum: endbeatdrum[k].drum, beat: i });
					}
				}
			}
		}
		return beats;
	}

	composeGuitarStrums(chords: string[], rhythm: StrumPatternDefinition): ToneStep[] {
		let beats: ToneStep[] = [];
		if (rhythm.strum) {
			let step = 0;
			var durationStrum: { nn: number, strumKind: string, len16: number, chord: string }[] = [];
			for (let i = 0; i < chords.length; i++) {
				for (let k = 0; k < 8; k++) {
					let strumKind = rhythm.strum.substr(step, 1);
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
							durationStrum.push({ nn: i * 8 + k, strumKind: strumKind, len16: 1, chord: chords[i] });
						}
					}
					step++;
					if (step >= rhythm.strum.length) {
						step = 0;
					}
				}
			}
			for (let i = 0; i < durationStrum.length; i++) {
				let strike = durationStrum[i];
				let trans = 12 * Number(strike.strumKind);
				//let pitches = pianoKeysByName(strike.chord, chordPitches, trans);
				let pitches: number[] = this.findChordPitches(strike.chord);
				//console.log(i,strike);
				for (let k = 0; k < pitches.length; k++) {
					if (
						(strike.strumKind == 'A' && k > 0)
						|| (strike.strumKind == 'V' && k < pitches.length - 1)
						|| (strike.strumKind == 'X' && k > 2)
					) {
						beats.push({
							track: 1,
							beat: strike.nn,
							length: strike.len16,
							shift: 0,
							pitch: pitches[k]
						});
					}
				}
			}
		}
		return beats;
	}

	composePianoBeat(chords: string[], rhythm: PianoPatternDefinition): ToneStep[] {
		let beats: ToneStep[] = [];
		if (rhythm.piano) {
			let step = 0;
			var durationStrum: { nn: number, strumKind: string, len16: number, chord: string }[] = [];
			var preChord = '';
			for (let i = 0; i < chords.length; i++) {
				for (let k = 0; k < 8; k++) {
					let strumKind = rhythm.piano.substr(step, 1);
					if (strumKind == '.') {
						//
					} else {
						if (strumKind == '-') {
							if (durationStrum.length) {
								if (preChord == chords[i]) {
									durationStrum[durationStrum.length - 1].len16++;
								} else {
									durationStrum.push({ nn: i * 8 + k, strumKind: durationStrum[durationStrum.length - 1].strumKind, len16: 1, chord: chords[i] });
								}
							}
						} else {
							durationStrum.push({ nn: i * 8 + k, strumKind: strumKind, len16: 1, chord: chords[i] });
						}
					}
					step++;
					if (step >= rhythm.piano.length) {
						step = 0;
					}
					preChord = chords[i];
				}
			}
			for (let i = 0; i < durationStrum.length; i++) {
				let strike = durationStrum[i];
				let trans = 12 * Number(strike.strumKind);
				let pitches = this.pianoKeysByName(strike.chord, trans);
				//console.log(i,strike);
				for (let k = 0; k < pitches.length; k++) {
					beats.push({
						track: rhythm.track,
						beat: strike.nn,
						length: strike.len16,
						shift: 0,
						pitch: pitches[k]
					});
				}
			}
		}
		return beats;
	}

	composeFullLine(chords: string[], pattern: MelodyPatternDefinition, needRepitch: boolean): ToneStep[] {
		let beats: ToneStep[] = [];
		if (pattern.len16) {
			//console.log(toMode);
			let fromMode: number[] = this.findModePitches(pattern.chord);
			let line: ToneStep[] = this.parseMelody(pattern.encoded);
			//console.log(line);
			let step = 0;
			for (let ch = 0; ch < chords.length; ch++) {
				let curChord = chords[ch];
				let toMode: number[] = this.findModePitches(curChord);
				for (let s = 0; s < 8; s++) {
					for (let k = 0; k < line.length; k++) {
						if (line[k].beat == step) {
							beats.push({
								track: line[k].track
								, beat: ch * 8 + s
								, length: line[k].length
								, shift: line[k].shift
								, pitch: this.morphPitch(line[k].pitch, fromMode, toMode, needRepitch)
							});
						}
					}
					step++;
					if (step >= pattern.len16) {
						step = 0;
					}
				}
			}
			//console.log(beats);
		}
		return beats;
	}
	composePadMelody(chords: string[], pattern: MelodyPatternDefinition | PianoPatternDefinition): ToneStep[] {
		let p: PianoPatternDefinition = pattern as PianoPatternDefinition;
		if (p.piano) {
			return this.composePianoBeat(chords, p);
		} else {
			let m: MelodyPatternDefinition = pattern as MelodyPatternDefinition;
			return this.composeFullLine(chords, m, false);
		}
	}
	composeRhythm(chords: string[], pattern: MelodyPatternDefinition | PianoPatternDefinition | StrumPatternDefinition): ToneStep[] {
		let p: PianoPatternDefinition = pattern as PianoPatternDefinition;
		if (p.piano) {
			return this.composePianoBeat(chords, p);
		} else {
			let m: MelodyPatternDefinition = pattern as MelodyPatternDefinition;
			if (m.encoded) {
				return this.composeFullLine(chords, m, false);
			} else {
				let s: StrumPatternDefinition = pattern as StrumPatternDefinition;
				return this.composeGuitarStrums(chords, s);

			}
		}
	}
	/*generateBassLine(progression: Progression816, pattern: MelodyPatternDefinition): ToneStep[] {
		var b: ToneStep[] = [];
		return b;
	}*/
	/*generateTracks(progression: Progression816, bassIndex: number, padIndex: number, padPluck: number, riffIndex: number, melodyIndex: number): ToneStep[] {
		let toneSteps: ToneStep[] = [];
		//let pattern: DrumPatternDefinition = this.drumsDefs[drumIndex];
		return toneSteps;
	}*/
	existsdDrum(drums: DrumStep[], single: DrumStep): boolean {
		for (var i = 0; i < drums.length; i++) {
			var d: DrumStep = drums[i];
			if (d.beat == single.beat && d.drum == single.drum) {
				return true;
			}
		}
		return false;
	}
	existsIns(instrs: ToneStep[], single: ToneStep): boolean {
		for (var i = 0; i < instrs.length; i++) {
			var a: ToneStep = instrs[i];
			if (a.beat == single.beat && a.pitch == single.pitch && a.track == single.track) {
				return true;
			}
		}
		return false;
	}
	stripTracks(instrs: ToneStep[]): ToneStep[] {
		let r: ToneStep[] = [];
		for (var i = 0; i < instrs.length; i++) {
			var single: ToneStep = instrs[i];
			if (!this.existsIns(r, single)) {
				r.push(single);
			}
		}
		return r;
	}
	replaceTracks(instrs: ToneStep[], from: number, to: number): void {
		let r: ToneStep[] = [];
		for (var i = 0; i < instrs.length; i++) {
			var single: ToneStep = instrs[i];
			if (single.track == from) {
				single.track = to;
			}
		}
	}
	stripDrums(drums: DrumStep[]): DrumStep[] {
		let r: DrumStep[] = [];
		for (var i = 0; i < drums.length; i++) {
			var single: DrumStep = drums[i];
			//console.log(single);
			if (!this.existsdDrum(r, single)) {
				r.push(single);
			} else {
				console.log('skip');
			}
		}
		//console.log(r,drums);
		return r;
	}
	generateAll(_progressionN: number, _drumN: number, _bassN: number, _rhythmN: number, _padN: number): PlayInfo {
		//console.log('generateAll', _progressionN, _drumN, _bassN, _rhythmN, _padN);
		let progressionN = Math.floor(this.progressions.length * _progressionN / 1000);
		let drumN = Math.floor(this.drumsDefs.length * _drumN / 1000);
		let bassN = Math.floor(this.bassDefs.length * _bassN / 1000);
		let rhythmN = Math.floor(this.pianoStrumOverDefsData.length * _rhythmN / 1000);
		let padN = Math.floor(this.padMelodyDefsData.length * _padN / 1000);
		//console.log(progressionN, drumN, bassN, rhythmN, padN);
		this.selectedProgression = this.progressions[progressionN];
		let tempo = 130;
		var drumVolumes = [5, 4, 6, 4, 6, 3, 6, 4];
		var insVolumes = [3, 3, 4, 3, 4, 7, 5, 7];
		insVolumes[this.DistortionGuitar] = 4;
		insVolumes[this.AcousticGuitar] = 5;
		insVolumes[this.PercussiveOrgan] = 5;
		insVolumes[this.PalmMuteGuitar] = 4;
		insVolumes[this.AcousticPiano] = 6;
		insVolumes[this.BassGuitar] = 6;
		insVolumes[this.StringEnsemble] = 4;
		insVolumes[this.SynthBass] = 6;
		var eqVolumes = [12, 12, 10, 8, 11, 9, 13, 14, 9, 12];
		//this.initProgressions();
		let prog = this.progressions[progressionN];

		let drumPat: DrumPatternDefinition = this.drumsDefs[drumN];
		let drumData: DrumStep[] = this.generateDrums(prog, drumPat);
		drumData = this.stripDrums(drumData);

		let tracksData: ToneStep[] = [];

		let bassPattern: MelodyPatternDefinition = this.bassDefs[bassN];
		tracksData = tracksData.concat(this.composeFullLine(prog.chords, bassPattern, true));

		let rhythm = this.composeRhythm(prog.chords, this.pianoStrumOverDefsData[rhythmN]);
		tracksData = tracksData.concat(rhythm);

		let pad = this.padMelodyDefsData[padN];

		tracksData = tracksData.concat(this.composePadMelody(prog.chords, pad));
		//tracksData = tracksData.concat(this.composePianoBeat(prog.chords, pad));


		//let melody: MelodyPatternDefinition = this.melodyDefsData[melodyN];
		//tracksData = tracksData.concat(this.composeFullLine(prog.chords, melody, false));
		/*
		let strumPattern: StrumPatternDefinition = this.strumDefs[4];
		tracksData = tracksData.concat(this.composeGuitarStrums(prog.chords, strumPattern));
		let pianoPattern: PianoPatternDefinition = this.pianoDefsData[3];
		tracksData = tracksData.concat(this.composePianoBeat(prog.chords, pianoPattern, this.AcousticPiano));
		*/

		tracksData = this.stripTracks(tracksData);
		//let url = (window as any).encodeRiffURL(tempo, drumData, tracksData, drumVolumes, insVolumes, eqVolumes);
		//window.open(url);
		//return url;
		let r: PlayInfo = {
			tempo: tempo, drumData: drumData, tracksData: tracksData, drumVolumes: drumVolumes, insVolumes: insVolumes, eqVolumes: eqVolumes
		};
		return r;
	}
	generate(progressionN: number, drumN: number, bassN: number, rhythmN: number, padN: number): string {
		let r: PlayInfo = this.generateAll(progressionN, drumN, bassN, rhythmN, padN);
		let url = (window as any).encodeRiffURL(r.tempo, r.drumData, r.tracksData, r.drumVolumes, r.insVolumes, r.eqVolumes);

		return url;
	}
	master: any;
	reverberator: any;
	analyser: AnalyserNode;
	drumInfo = [{
		sound: (window as any)._drum_35_0_Chaos_sf2_file,
		pitch: 36, //36
		title: 'Кик',
		id: 0,
		volumeRatio: 0.95,
		length: 0.3
		, audioNode: null
	}, {
		sound: (window as any)._drum_41_26_JCLive_sf2_file,
		pitch: 41, //43
		title: 'Большой том',
		id: 1,
		volumeRatio: 0.5,
		length: 0.3
		, audioNode: null
	}, {
		sound: (window as any)._drum_38_22_FluidR3_GM_sf2_file,
		pitch: 38, //40
		title: 'Рабочий',
		id: 2,
		volumeRatio: 1.0,
		length: 0.3
		, audioNode: null
	}, {
		sound: (window as any)._drum_45_26_JCLive_sf2_file,
		pitch: 45, //47,48,50
		title: 'Малый том',
		id: 3,
		volumeRatio: 0.75,
		length: 0.3
		, audioNode: null
	}, {
		sound: (window as any)._drum_42_26_JCLive_sf2_file,
		pitch: 42, //44
		title: 'Закрытый хет',
		id: 4,
		volumeRatio: 0.5,
		length: 0.5
		, audioNode: null
	}, {
		sound: (window as any)._drum_46_26_JCLive_sf2_file,
		pitch: 46, //
		title: 'Открытый хет',
		id: 5,
		volumeRatio: 0.5,
		length: 0.5
		, audioNode: null
	}, {
		sound: (window as any)._drum_51_26_JCLive_sf2_file,
		pitch: 51, //rest
		title: 'Райд',
		id: 6,
		volumeRatio: 0.3,
		length: 1
		, audioNode: null
	}, {
		sound: (window as any)._drum_49_26_JCLive_sf2_file,
		pitch: 49, //
		title: 'Сплеш',
		id: 7,
		volumeRatio: 0.3,
		length: 2
		, audioNode: null
	}];
	trackInfo = [{
		color: 'rgb(255,127,77)',
		shadow: 'rgba(255,127,77,0.4)',
		//color: 'rgba(255,204,187,1)',
		//shadow: 'rgba(255,204,187,0.4)',
		title: 'Синтезатор',
		order: 2,
		sound: (window as any)._tone_0390_GeneralUserGS_sf2_file,
		volume: 70,//sureNumeric(readObjectFromlocalStorage('track7'), 0, 70, 100),
		nn: 7,
		octave: 3,
		inChordDelay: 0.01,
		volumeRatio: 0.5
		, audioNode: null
	}, {
		color: 'rgb(178,178,0)',
		shadow: 'rgba(178,178,0,0.4)',
		//color: 'rgba(204,153,0,1)',
		//shadow: 'rgba(204,153,0,0.4)',
		title: 'Струнные',
		order: 1,
		sound: (window as any)._tone_0490_Chaos_sf2_file,
		volume: 70,//sureNumeric(readObjectFromlocalStorage('track6'), 0, 70, 100),
		nn: 6,
		octave: 3,
		inChordDelay: 0,
		volumeRatio: 0.3
		, audioNode: null
	}, {
		color: 'rgb(140,0,64)',
		shadow: 'rgba(140,0,64,0.4)',
		//color: 'rgba(204,0,204,1)',
		//shadow: 'rgba(204,0,204,0.4)',
		title: 'Бас-гитара',
		order: 5,
		sound: (window as any)._tone_0340_Aspirin_sf2_file,
		volume: 70,//sureNumeric(readObjectFromlocalStorage('track5'), 0, 70, 100),
		nn: 5,
		octave: 2,
		inChordDelay: 0.01,
		volumeRatio: 0.75
		, audioNode: null
	}, {
		color: 'rgb(0,127,255)',
		shadow: 'rgba(0,127,255,0.4)',
		//color: 'rgba(00,153,255,1)',
		//shadow: 'rgba(00,153,255,0.4)',
		title: 'Пианино',
		order: 3,
		sound: (window as any)._tone_0001_FluidR3_GM_sf2_file,
		volume: 70,//sureNumeric(readObjectFromlocalStorage('track4'), 0, 70, 100),
		nn: 4,
		octave: 3,
		inChordDelay: 0,
		volumeRatio: 0.5
		, audioNode: null
	}, {
		color: 'rgb(140,35,0)',
		shadow: 'rgba(140,35,0,0.4)',
		//color: 'rgba(153,51,0,1)',
		//shadow: 'rgba(153,51,0,0.4)',
		title: 'Мьют-дисторшн',
		order: 4,
		sound: (window as any)._tone_0280_LesPaul_sf2_file,
		volume: 70,//sureNumeric(readObjectFromlocalStorage('track3'), 0, 70, 100),
		nn: 3,
		octave: 3,
		inChordDelay: 0,
		volumeRatio: 1.0
		, audioNode: null
	}, {
		color: 'rgb(35,51,255)',
		shadow: 'rgba(35,51,255,0.4)',
		//color: 'rgba(51,51,255,1)',
		//shadow: 'rgba(51,51,255,0.4)',
		title: 'Синт. орган',
		order: 0,
		inChordDelay: 0,
		sound: (window as any)._tone_0170_SBLive_sf2,
		//sound: _tone_0170_JCLive_sf2_file,
		volume: 70,//sureNumeric(readObjectFromlocalStorage('track2'), 0, 70, 100),
		nn: 2,
		octave: 4,
		volumeRatio: 0.7
		, audioNode: null
	}, {
		color: 'rgb(45,178,0)',
		shadow: 'rgba(45,178,0,0.4)',
		//color: 'rgba(0,153,0,1)',
		//shadow: 'rgba(0,153,0,0.4)',
		title: 'Аккуст. гитара',
		order: 6,
		sound: (window as any)._tone_0250_Chaos_sf2_file,
		volume: 70,//sureNumeric(readObjectFromlocalStorage('track1'), 0, 70, 100),
		nn: 1,
		octave: 3,
		inChordDelay: 0.01,
		volumeRatio: 0.5
		, audioNode: null
	}, {
		color: 'rgb(255,0,0)',
		shadow: 'rgba(255,0,0,0.4)',
		//color: 'rgba(255,0,0,1)',
		//shadow: 'rgba(255,0,0,0.4)',
		title: 'Гитара-дисторшн',
		order: 7,
		sound: (window as any)._tone_0300_LesPaul_sf2_file,
		volume: 70,//sureNumeric(readObjectFromlocalStorage('track0'), 0, 70, 100),
		nn: 0,
		octave: 3,
		inChordDelay: 0.01,
		volumeRatio: 0.7
		, audioNode: null
	}

	];

	sendNextBeats(when: number, startBeat: number, endBeat: number) {
		//console.log(when, startBeat, endBeat);
		this.sentWhen = when;
		//this.sentBeat = startBeat;
		var N = 4 * 60 / this.playInfo.tempo;
		var beatLen = 1 / 16 * N;
		for (var i = 0; i < this.playInfo.drumData.length; i++) {
			var hit: DrumStep = this.playInfo.drumData[i];
			if (hit.beat >= startBeat && hit.beat <= endBeat) {
				let drumchannel = this.drumInfo[hit.drum];
				var zones = drumchannel.sound;
				//if (channel.info && window[channel.info.variable]) {
				//zones = window[channel.info.variable];
				//console.log(channel.sound,channel.info,channel.info.variable,zones);
				//}
				var r = 1.0 - Math.random() * 0.2;
				//this.player.queueWaveTable(this.audioContext, channel.audioNode, channel.sound, when + beatLen * (hit.beat - startBeat), channel.pitch, channel.length, r * channel.volumeRatio);
				this.player.queueWaveTable(this.audioContext, drumchannel.audioNode, zones, when + beatLen * (hit.beat - startBeat), drumchannel.pitch, drumchannel.length, r * drumchannel.volumeRatio);
			}
		}
		var notes: ToneStep[] = [];
		for (var i = 0; i < this.playInfo.tracksData.length; i++) {
			var note: ToneStep = this.playInfo.tracksData[i];
			if (note.beat >= startBeat && note.beat <= endBeat) {
				notes.push(note);
			}
		}
		notes.sort(function (n1, n2) {
			var r = 1000 * (n1.beat - n2.beat) + 100000 * (n1.track - n2.track);
			if (n1.beat == n2.beat) {
				r = r + (n1.pitch - n2.pitch);
			}
			return r;
		});
		var currentBeat = -1;
		var currentTrack = -1;
		var inChordCount = 0;
		for (var i = 0; i < notes.length; i++) {
			var note = notes[i];
			if (note.beat != currentBeat || note.track != currentTrack) {
				currentBeat = note.beat;
				currentTrack = note.track;
				inChordCount = 0;
			}
			var tonechannel = this.trackInfo[7 - note.track];
			var zones = tonechannel.sound;
			//if (tonechannel.info && window[channel.info.variable]) {
			//zones = window[channel.info.variable];
			//console.log(channel.sound,channel.info,channel.info.variable,zones);
			//}
			var shift = [{
				when: note.length * beatLen,
				pitch: note.shift + tonechannel.octave * 12 + note.pitch
			}];
			var r = 0.6 - Math.random() * 0.2;
			//this.player.queueWaveTable(this.audioContext, channel.audioNode, channel.sound, when + beatLen * (note.beat - startBeat) + inChordCount * channel.inChordDelay, channel.octave * 12 + note.pitch, 0.075 + note.length * beatLen, r * channel.volumeRatio, shift);
			this.player.queueWaveTable(this.audioContext, tonechannel.audioNode, zones, when + beatLen * (note.beat - startBeat) + inChordCount * tonechannel.inChordDelay, tonechannel.octave * 12 + note.pitch, 0.075 + note.length * beatLen, r * tonechannel.volumeRatio, shift);
			inChordCount++;
		}
	}
	tick() {
		//console.log(this);
		if (this.onAir) {
			var beat16duration = (4 * 60 / this.playInfo.tempo) / 16;

			var pieceLen16 = this.selectedProgression.chords.length * 8;
			//console.log(pieceLen16,this.selectedProgression);
			var t = this.audioContext.currentTime;
			if (this.nextWhen < t) {
				this.nextWhen = t;
			}
			while (this.sentWhen < t + beat16duration) {
				this.sendNextBeats(this.nextWhen, this.nextBeat, this.nextBeat);
				this.nextWhen = this.sentWhen + beat16duration;
				this.nextBeat = this.nextBeat + 1;
				if (this.nextBeat >= pieceLen16) {
					this.nextBeat = 0;
				}
			}
			//var wait = 0.5 * 1000 * (this.nextWhen - t); //this.audioContext.currentTime);
			this.tickerStep++;
			if (this.tickerStep >= this.tickerDelay) {
				this.tickerStep = 0;
			}
			this.updateAnalyzer();
		}
		window.requestAnimationFrame(this.tick.bind(this));
	}
	barGroups: any;
	preArray: Uint8Array;
	updateAnalyzer() {
		var bufferLength = this.analyser.frequencyBinCount;
		if (!(this.preArray)) this.preArray = new Uint8Array(bufferLength);
		var dataArray = new Uint8Array(bufferLength);
		this.analyser.getByteTimeDomainData(dataArray);
		//console.log(bufferLength,dataArray);*/
		//this.canvasContext.fillStyle = 'green'; 
		//this.canvasContext.fillRect(10, 10, 100, 100);
		var barcount=20;
		for (var i = 0; i < barcount; i++) {
			var rr = this.barGroups.children[i];
			var idx = Math.floor(i * bufferLength / barcount);
			var newValue = Math.floor(dataArray[idx]);
			var oldValue = Math.floor(1 * this.preArray[idx]);
			if (newValue != oldValue) {
				rr.setAttribute("height", '' + (oldValue /20) + "px");
			}
			this.preArray[idx] = (newValue + oldValue) / 2;
		}
	}
	//startTicks(){
	//setInterval(()=>{startTicks}, 100);
	//window.requestAnimationFrame(this.tick.bind(this));
	//}

	initAudio() {
		if (this.player) {
			//console.log('skip initAudio');
		} else {
			//let canvas = document.getElementById('canvasBars') as any; 
			//this.canvasContext = canvas.getContext('2d');
			this.barGroups = document.getElementById('barGroups');
			this.audioContext = new AudioContext();
			this.player = new WebAudioFontPlayer();
			this.analyser = this.audioContext.createAnalyser();
			this.analyser.fftSize = 256;
			//this.analyser.smoothingTimeConstant = 0.99;
			//this.analyser.fftSize = 2048;
			//console.log(this.player);
			this.master = new WebAudioFontChannel(this.audioContext);
			this.reverberator = new WebAudioFontReverberator(this.audioContext);
			//this.reverberator.output.connect(this.audioContext.destination);
			this.reverberator.output.connect(this.audioContext.destination);
			this.reverberator.output.connect(this.analyser);

			this.master.output.connect(this.reverberator.input);
			for (var i = 0; i < 8; i++) {
				this.trackInfo[i].audioNode = this.audioContext.createGain();
				this.trackInfo[i].audioNode.connect(this.master.input);
				this.drumInfo[i].audioNode = this.audioContext.createGain();
				this.drumInfo[i].audioNode.connect(this.master.input);
			}
			for (var i = 0; i < this.drumInfo.length; i++) {
				this.player.adjustPreset(this.audioContext, this.drumInfo[i].sound);
			}
			for (var i = 0; i < this.trackInfo.length; i++) {
				this.player.adjustPreset(this.audioContext, this.trackInfo[i].sound);
			}
			//this.startTicks();
			/*
			var drumVolumes = [4, 4, 6, 4, 6, 3, 6, 4];
			var insVolumes = [3, 3, 4, 3, 4, 7, 5, 7];

			insVolumes[this.DistortionGuitar] = 3;
			insVolumes[this.AcousticGuitar] = 4;
			insVolumes[this.PercussiveOrgan] = 3;
			insVolumes[this.PalmMuteGuitar] = 3;
			insVolumes[this.AcousticPiano] = 4;
			insVolumes[this.BassGuitar] = 5;
			insVolumes[this.StringEnsemble] = 3;
			insVolumes[this.SynthBass] = 6;
			var eqVolumes = [13, 12, 12, 10, 8, 9, 13, 14, 9, 12];
			*/
			/*
			this.master.band32.gain.setValueAtTime(13-10, 0);//-40+40
			this.master.band64.gain.setValueAtTime(12 - 10, 0);
			this.master.band128.gain.setValueAtTime(12 - 10, 0);
			this.master.band256.gain.setValueAtTime(10 - 10, 0);
			this.master.band512.gain.setValueAtTime(8 - 10, 0);
			this.master.band1k.gain.setValueAtTime(9 - 10, 0);
			this.master.band2k.gain.setValueAtTime(13 - 10, 0);
			this.master.band4k.gain.setValueAtTime(14 - 10, 0);
			this.master.band8k.gain.setValueAtTime(9 - 10, 0);
			this.master.band16k.gain.setValueAtTime(12 - 10, 0);
			//
			this.trackInfo[7 - this.SynthBass].audioNode.gain.setValueAtTime(7 / 10, 0);
			this.trackInfo[7 - this.StringEnsemble].audioNode.gain.setValueAtTime(3 / 10, 0);
			this.trackInfo[7 - this.BassGuitar].audioNode.gain.setValueAtTime(5 / 10, 0);
			this.trackInfo[7 - this.AcousticPiano].audioNode.gain.setValueAtTime(6 / 10, 0);
			this.trackInfo[7 - this.PalmMuteGuitar].audioNode.gain.setValueAtTime(3 / 10, 0);
			this.trackInfo[7 - this.PercussiveOrgan].audioNode.gain.setValueAtTime(3 / 10, 0);
			this.trackInfo[7 - this.AcousticGuitar].audioNode.gain.setValueAtTime(4 / 10, 0);
			this.trackInfo[7 - this.DistortionGuitar].audioNode.gain.setValueAtTime(3 / 10, 0);
			//
			this.drumInfo[this.BassDrum].audioNode.gain.setValueAtTime(4 / 10, 0);
			this.drumInfo[this.LowTom].audioNode.gain.setValueAtTime(4 / 10, 0);
			this.drumInfo[this.SnareDrum].audioNode.gain.setValueAtTime(6 / 10, 0);
			this.drumInfo[this.MidTom].audioNode.gain.setValueAtTime(4 / 10, 0);
			this.drumInfo[this.ClosedHiHat].audioNode.gain.setValueAtTime(6 / 10, 0);
			this.drumInfo[this.OpenHiHat].audioNode.gain.setValueAtTime(3 / 10, 0);
			this.drumInfo[this.RideCymbal].audioNode.gain.setValueAtTime(6 / 10, 0);
			this.drumInfo[this.SplashCymbal].audioNode.gain.setValueAtTime(4 / 10, 0);
			//
			*/
			//console.log(this.reverberator);
			this.reverberator.output.threshold.setValueAtTime(-24, 0.0001);
			this.reverberator.output.knee.setValueAtTime(30, 0.0001);
			this.reverberator.output.ratio.setValueAtTime(12, 0.0001);
			this.reverberator.output.attack.setValueAtTime(0.003, 0.0001);
			this.reverberator.output.release.setValueAtTime(0.25, 0.0001);

		}
	}
	startPlay(progressionN: number, drumN: number, bassN: number, rhythmN: number, padN: number) {

		//console.log('startPlay');
		if (this.onAir) {
			//
		} else {
			//this.initAudio();
			this.playInfo = this.generateAll(progressionN, drumN, bassN, rhythmN, padN);
			this.nextWhen = this.audioContext.currentTime + 0.1;
			this.nextBeat = 0;
			//console.log('equalizer',this.playInfo.eqVolumes);
			this.master.band32.gain.setValueAtTime(this.playInfo.eqVolumes[0] - 10, 0);//-40+40
			this.master.band64.gain.setValueAtTime(this.playInfo.eqVolumes[1] - 10, 0);
			this.master.band128.gain.setValueAtTime(this.playInfo.eqVolumes[2] - 10, 0);
			this.master.band256.gain.setValueAtTime(this.playInfo.eqVolumes[3] - 10, 0);
			this.master.band512.gain.setValueAtTime(this.playInfo.eqVolumes[4] - 10, 0);
			this.master.band1k.gain.setValueAtTime(this.playInfo.eqVolumes[5] - 10, 0);
			this.master.band2k.gain.setValueAtTime(this.playInfo.eqVolumes[6] - 10, 0);
			this.master.band4k.gain.setValueAtTime(this.playInfo.eqVolumes[7] - 10, 0);
			this.master.band8k.gain.setValueAtTime(this.playInfo.eqVolumes[8] - 10, 0);
			this.master.band16k.gain.setValueAtTime(this.playInfo.eqVolumes[9] - 10, 0);
			this.trackInfo[this.SynthBass].audioNode.gain.setValueAtTime(this.playInfo.insVolumes[0] / 10, 0);
			this.trackInfo[this.StringEnsemble].audioNode.gain.setValueAtTime(this.playInfo.insVolumes[1] / 10, 0);
			this.trackInfo[this.BassGuitar].audioNode.gain.setValueAtTime(this.playInfo.insVolumes[2] / 10, 0);
			this.trackInfo[this.AcousticPiano].audioNode.gain.setValueAtTime(this.playInfo.insVolumes[3] / 10, 0);
			this.trackInfo[this.PalmMuteGuitar].audioNode.gain.setValueAtTime(this.playInfo.insVolumes[4] / 10, 0);
			this.trackInfo[this.PercussiveOrgan].audioNode.gain.setValueAtTime(this.playInfo.insVolumes[5] / 10, 0);
			this.trackInfo[this.AcousticGuitar].audioNode.gain.setValueAtTime(this.playInfo.insVolumes[6] / 10, 0);
			this.trackInfo[this.DistortionGuitar].audioNode.gain.setValueAtTime(this.playInfo.insVolumes[7] / 10, 0);
			this.drumInfo[this.BassDrum].audioNode.gain.setValueAtTime(this.playInfo.drumVolumes[0] / 10, 0);
			this.drumInfo[this.LowTom].audioNode.gain.setValueAtTime(this.playInfo.drumVolumes[1] / 10, 0);
			this.drumInfo[this.SnareDrum].audioNode.gain.setValueAtTime(this.playInfo.drumVolumes[2] / 10, 0);
			this.drumInfo[this.MidTom].audioNode.gain.setValueAtTime(this.playInfo.drumVolumes[3] / 10, 0);
			this.drumInfo[this.ClosedHiHat].audioNode.gain.setValueAtTime(this.playInfo.drumVolumes[4] / 10, 0);
			this.drumInfo[this.OpenHiHat].audioNode.gain.setValueAtTime(this.playInfo.drumVolumes[5] / 10, 0);
			this.drumInfo[this.RideCymbal].audioNode.gain.setValueAtTime(this.playInfo.drumVolumes[6] / 10, 0);
			this.drumInfo[this.SplashCymbal].audioNode.gain.setValueAtTime(this.playInfo.drumVolumes[7] / 10, 0);
			window.requestAnimationFrame(this.tick.bind(this));
			this.onAir = true;
		}
	}
	pausePlay() {
		//console.log('pausePlay');
		if (this.onAir) {
			this.onAir = false;
			this.player.cancelQueue(this.audioContext);
		} else {
			this.onAir = true;
		}
	}
}
