var Audio = function () {

	var AudioContext = AudioContext || webkitAudioContext;
	var audioContext = new AudioContext();
	var audio;

	var analyser = audioContext.createAnalyser();
	analyser.fftSize = 128;
	analyser.smoothingTimeConstant = .75;
	var frequencyData = new Uint8Array( analyser.fftSize );
	analyser.connect( audioContext.destination );

	var spectrumData = new Uint8Array( frequencyData.length * 1 * 4 );

	var spectrumTexture = new THREE.DataTexture( spectrumData, frequencyData.length, 1, THREE.RGBAFormat );
	spectrumTexture.minFilter = THREE.NearestFilter;
	spectrumTexture.magFilter = THREE.NearestFilter;
	spectrumTexture.needsUpdate = true;

	function init() {

		audio = document.createElement( 'audio' );

		audio.controls = true;
		audio.className = 'player';
		audio.style.display = 'none';
		document.body.appendChild( audio );

		audio.addEventListener( 'canplay', onAudioReady );

		audio.src = 'assets/track.mp3';
	
		function onAudioReady() {

			audio.removeEventListener( 'canplay', onAudioReady );
			audio.pause();

			var audioSource = audioContext.createMediaElementSource( audio );
			audioSource.connect( analyser );

			audio.play();

		}

	}

	function update() {

		analyser.getByteFrequencyData( frequencyData );
		var p = 0;
		var pf = 0;
		for( var pf = 0; pf < frequencyData.length; pf++ ) {
			f = frequencyData[ pf ];
			spectrumData[ p ] = Math.random() * 255;//255 * f;
			p += 4;

		}
		spectrumTexture.needsUpdate = true;

	}

	return {
		init: init,
		update: update,
		getSpectrumTexture: function() { return spectrumTexture; }
	};

};
