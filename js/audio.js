// Web Audio API Synthesizer & Speech Synthesis

let audioCtx = null;

function getAudioContext() {
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

export function playSound(type) {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const soundTones = {
      ok: [
        [660, 0],
        [990, 0.08]
      ],
      bad: [
        [200, 0],
        [150, 0.1]
      ],
      win: [
        [523, 0],
        [659, 0.12],
        [784, 0.24],
        [1046, 0.36]
      ],
      tap: [
        [880, 0]
      ]
    };

    const tones = soundTones[type];
    if (!tones) return;

    for (const [freq, delay] of tones) {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = type === 'bad' ? 'sawtooth' : 'triangle';
      osc.frequency.value = freq;

      const startTime = ctx.currentTime + delay;
      gain.gain.setValueAtTime(0.18, startTime);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.18);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(startTime);
      osc.stop(startTime + 0.2);
    }
  } catch (err) {
    console.warn('Audio playback error:', err);
  }
}

// Speak Chinese text aloud
export function speakChinese(text) {
  if (!window.speechSynthesis) return;
  try {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'zh-CN';
    utterance.rate = 0.9;
    window.speechSynthesis.speak(utterance);
  } catch (e) {
    // Ignore speech errors gracefully
  }
}
