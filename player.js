class RadioPlayer {
  constructor() {
    this.streamUrl = 'https://uk24freenew.listen2myradio.com/live.mp3?typeportmount=s2_6049_stream_435899669';
    this.player = null;
    this.isPlaying = false;
    this.initializePlayer();
    this.setupEventListeners();
  }

  initializePlayer() {
    this.player = new Howl({
      src: [this.streamUrl],
      html5: true,
      format: ['mp3'],
      volume: 0.8,
      onplay: () => this.updatePlayerState(true),
      onpause: () => this.updatePlayerState(false),
      onstop: () => this.updatePlayerState(false),
      onloaderror: () => this.handleError('Error al cargar el stream'),
      onplayerror: () => this.handleError('Error al reproducir el stream')
    });
  }

  setupEventListeners() {
    const playButton = document.getElementById('playButton');
    const volumeSlider = document.getElementById('volumeSlider');
    
    playButton.addEventListener('click', () => this.togglePlay());
    volumeSlider.addEventListener('input', (e) => {
      this.player.volume(e.target.value / 100);
    });

    // Update status periodically when playing
    setInterval(() => {
      if (this.isPlaying) {
        this.updateStatus('Reproduciendo');
      }
    }, 2000);
  }

  togglePlay() {
    if (this.isPlaying) {
      this.player.pause();
    } else {
      this.player.play();
      this.updateStatus('Reproduciendo');
    }
  }

  updatePlayerState(playing) {
    this.isPlaying = playing;
    const playButton = document.getElementById('playButton');
    playButton.classList.toggle('playing', playing);
    this.updateStatus(playing ? 'Reproduciendo' : 'En pausa');
    
    // Update track info display
    if (playing) {
      document.getElementById('trackTitle').textContent = 'Quinto Nivel Radio';
      document.getElementById('trackArtist').textContent = 'Transmitiendo en vivo';
      document.getElementById('trackDescription').textContent = 'Tu música favorita 24/7';
    }
  }

  updateStatus(message) {
    const statusText = document.getElementById('statusText');
    statusText.textContent = message;
  }

  handleError(message) {
    this.updateStatus('Error: No se puede conectar al stream');
    console.error(message);
    this.isPlaying = false;
    const playButton = document.getElementById('playButton');
    playButton.classList.remove('playing');
  }
}

// Initialize the player when the page loads
window.addEventListener('DOMContentLoaded', () => {
  window.radioPlayer = new RadioPlayer();
});