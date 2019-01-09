# riffplay

Play user defined sequence.

Example page

```
<html>
	<head>
		<script src="https://surikov.github.io/riffplay/riffexchange.js"></script>
	</head>
	<body>
		<h1>test</h1>
		<p><a id='linktest' href='#'>click</a>
		<script>
			var tempo = '120';
			var drums = [{"drum":0,"beat":0}, {"drum":5,"beat":0}
						,{"drum":2,"beat":4}, {"drum":5,"beat":4}
						,{"drum":0,"beat":8}, {"drum":5,"beat":8}
						,{"drum":2,"beat":12},{"drum":5,"beat":12}
						];
			var notes = [{"track":5,"beat":0 ,"length":2,"shift":0,"pitch":9}
						,{"track":5,"beat":4 ,"length":2,"shift":0,"pitch":4}
						,{"track":5,"beat":8 ,"length":2,"shift":0,"pitch":9}
						,{"track":5,"beat":12,"length":2,"shift":0,"pitch":4}
						];
			var songlink = encodeRiffURL(tempo,drums,notes);
			document.getElementById('linktest').onclick=function(){
				console.log(songlink);
				window.open(songlink);
			};
		</script>
	</body>
</html>
```

## Live example

See live example [https://surikov.github.io/riffplay/test.html](https://surikov.github.io/riffplay/test.html)

## How to use

Main function

```
var songlink = encodeRiffURL(tempo,drums,notes);
```

Parameters:

- tempo - BPM
- drums - array of drum notes
  - drum - id of drum (see below)
  - beat - step in 16th's
- notes - array of instrument notes
  - track - id of instrument (see below)
  - beat - step in 16th's
  - length - duration in 16th's
  - shift - pitch slide in halftones
  - pitch - note pitch
  
Return

URL with encoded playable melody. Use this URL as a link.

Example - https://surikov.github.io/RiffShareAndroid/app/src/main/assets/load.html?riff=120-77777777-66666666-0a0a0a0a0a0a0a0a0a0a-0001010140104110a011a111-0050209400450204400850209400c5020440

### Tempo

tempo is 80-240

### Drum IDs

			0.Bass drum
			1.Low Tom
			2.Snare drum
			3.Mid Tom
			4.Closed Hi-hat
			5.Open Hi-hat
			6.Ride Cymbal
			7.Splash Cymbal

### Instrument IDs

			0.Distortion guitar
			1.Acoustic guitar
			2.Percussive Organ
			3.PalmMute guitar
			4.Acoustic Piano
			5.Bass guitar
			6.String Ensemble
			7.Synth Bass
