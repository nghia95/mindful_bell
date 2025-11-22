chrome.runtime.onMessage.addListener((msg) => {
  if (msg.type === 'PLAY_BELL') {
    playBell(msg.volume);
  }
});

async function playBell(volume = 1.0) {
  try {
    const url = chrome.runtime.getURL('bell.mp3');
    console.log('Attempting to play:', url);

    // Try AudioContext which is often more reliable for timing and policy
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    const ctx = new AudioContext();

    const response = await fetch(url);
    const arrayBuffer = await response.arrayBuffer();
    const audioBuffer = await ctx.decodeAudioData(arrayBuffer);

    const source = ctx.createBufferSource();
    source.buffer = audioBuffer;

    const gainNode = ctx.createGain();
    gainNode.gain.value = volume;

    source.connect(gainNode);
    gainNode.connect(ctx.destination);

    source.start(0);
    console.log('Audio started via AudioContext');

  } catch (error) {
    console.error('AudioContext failed, trying HTML5 Audio:', error);
    // Fallback to HTML5 Audio
    try {
      const audio = new Audio(chrome.runtime.getURL('bell.mp3'));
      audio.volume = volume;
      await audio.play();
      console.log('Audio started via HTML5 Audio');
    } catch (e) {
      console.error('HTML5 Audio also failed:', e.name, e.message);
    }
  }
}
