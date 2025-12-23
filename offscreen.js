let currentAudioContext = null;
let currentSource = null;

chrome.runtime.onMessage.addListener((msg) => {
  if (msg.type === 'PLAY_BELL') {
    playBell(msg.volume, msg.bellSounds);
  } else if (msg.type === 'STOP_BELL') {
    stopBell();
  }
});

function stopBell() {
  try {
    if (currentSource) {
      currentSource.stop();
      currentSource = null;
    }
    if (currentAudioContext) {
      currentAudioContext.close();
      currentAudioContext = null;
    }
    console.log('Audio stopped');
  } catch (error) {
    console.error('Error stopping audio:', error);
  }
}

async function playBell(volume = 1.0, bellSounds = 3) {
  try {
    // Stop any currently playing audio first
    stopBell();

    // Determine which sound file to use based on bellSounds setting
    const soundFile = `${bellSounds}_sound_bell.mp3`;
    const url = chrome.runtime.getURL(soundFile);
    console.log('Attempting to play:', url);

    // Try AudioContext which is often more reliable for timing and policy
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    currentAudioContext = new AudioContext();

    const response = await fetch(url);
    const arrayBuffer = await response.arrayBuffer();
    const audioBuffer = await currentAudioContext.decodeAudioData(arrayBuffer);

    currentSource = currentAudioContext.createBufferSource();
    currentSource.buffer = audioBuffer;

    const gainNode = currentAudioContext.createGain();
    gainNode.gain.value = volume;

    currentSource.connect(gainNode);
    gainNode.connect(currentAudioContext.destination);

    currentSource.start(0);
    console.log(`Audio started via AudioContext: ${soundFile}`);

    // Clean up references when audio ends
    currentSource.onended = () => {
      currentSource = null;
      if (currentAudioContext) {
        currentAudioContext.close();
        currentAudioContext = null;
      }
    };

  } catch (error) {
    console.error('AudioContext failed, trying HTML5 Audio:', error);
    // Fallback to HTML5 Audio
    try {
      const soundFile = `${bellSounds}_sound_bell.mp3`;
      const audio = new Audio(chrome.runtime.getURL(soundFile));
      audio.volume = volume;
      await audio.play();
      console.log(`Audio started via HTML5 Audio: ${soundFile}`);
    } catch (e) {
      console.error('HTML5 Audio also failed:', e.name, e.message);
    }
  }
}
