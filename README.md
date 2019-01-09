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

See live example https://surikov.github.io/riffplay/test.html

### Tempo

tempo is 80-240

### Drums

			0.Bass drum
			1.Low Tom
			2.Snare drum
			3.Mid Tom
			4.Closed Hi-hat
			5.Open Hi-hat
			6.Ride Cymbal
			7.Splash Cymbal

### Track

			0.Distortion guitar
			1.Acoustic guitar
			2.Percussive Organ
			3.PalmMute guitar
			4.Acoustic Piano
			5.Bass guitar
			6.String Ensemble
			7.Synth Bass
