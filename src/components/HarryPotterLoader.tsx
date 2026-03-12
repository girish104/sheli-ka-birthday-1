import { useState, useEffect, useRef } from "react";

const HarryPotterLoader = () => {
  const [loading, setLoading] = useState(true);
  const [musicStarted, setMusicStarted] = useState(false);
  const audioCtxRef = useRef(null);

  // ── Harry Potter "Hedwig's Theme" – main motif ──────────────────────────
  // Each entry: [note_in_semitones_from_C4, duration_in_seconds]
  // Using relative semitones so it's easy to transpose
  const melody = [
    // Bar 1
    [0, 0.375], [-1, 0.1875], [5, 0.1875],
    [4, 0.375], [0, 0.1875], [-3, 0.1875],
    [-5, 0.375], [-3, 0.1875], [0, 0.1875],
    // Bar 2
    [2, 0.5625], [3, 0.1875],
    [2, 0.375], [0, 0.1875], [-1, 0.1875],
    [3, 0.375], [2, 0.1875], [-1, 0.1875],
    // Bar 3
    [0, 0.75],
    [0, 0.375], [-1, 0.1875], [5, 0.1875],
    // Bar 4
    [4, 0.375], [0, 0.1875], [-3, 0.1875],
    [-5, 0.375], [-8, 0.1875], [-3, 0.1875],
    // Bar 5
    [2, 0.5625], [3, 0.1875],
    [2, 0.375], [-5, 0.1875], [-4, 0.1875],
    [-6, 0.75],
  ];

  function semitoneToHz(semitone) {
    // C4 = 261.63 Hz, each semitone = *2^(1/12)
    return 261.63 * Math.pow(2, semitone / 12);
  }

  function playMelody(ctx) {
    const masterGain = ctx.createGain();
    masterGain.gain.setValueAtTime(0.18, ctx.currentTime);
    masterGain.connect(ctx.destination);

    // Soft reverb via convolver
    const convolver = ctx.createConvolver();
    const bufferSize = ctx.sampleRate * 2;
    const impulse = ctx.createBuffer(2, bufferSize, ctx.sampleRate);
    for (let c = 0; c < 2; c++) {
      const d = impulse.getChannelData(c);
      for (let i = 0; i < bufferSize; i++) {
        d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / bufferSize, 3);
      }
    }
    convolver.buffer = impulse;
    const reverbGain = ctx.createGain();
    reverbGain.gain.setValueAtTime(0.35, ctx.currentTime);
    masterGain.connect(convolver);
    convolver.connect(reverbGain);
    reverbGain.connect(ctx.destination);

    let t = ctx.currentTime + 0.1;

    const playNote = (semitone, duration) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "triangle";
      osc.frequency.setValueAtTime(semitoneToHz(semitone), t);

      // Gentle vibrato
      const vibrato = ctx.createOscillator();
      const vibratoGain = ctx.createGain();
      vibrato.frequency.setValueAtTime(5.5, t);
      vibratoGain.gain.setValueAtTime(3, t);
      vibrato.connect(vibratoGain);
      vibratoGain.connect(osc.frequency);

      gain.gain.setValueAtTime(0, t);
      gain.gain.linearRampToValueAtTime(0.7, t + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.4, t + duration * 0.6);
      gain.gain.exponentialRampToValueAtTime(0.001, t + duration);

      osc.connect(gain);
      gain.connect(masterGain);

      osc.start(t);
      vibrato.start(t);
      osc.stop(t + duration + 0.05);
      vibrato.stop(t + duration + 0.05);

      t += duration;
    };

    // Loop the melody twice
    for (let loop = 0; loop < 2; loop++) {
      melody.forEach(([semitone, dur]) => playNote(semitone, dur));
    }
  }

  const startExperience = () => {
    if (musicStarted) return;
    setMusicStarted(true);

    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      audioCtxRef.current = ctx;
      if (ctx.state === "suspended") {
        ctx.resume().then(() => playMelody(ctx));
      } else {
        playMelody(ctx);
      }
    } catch (e) {
      console.warn("Audio not supported", e);
    }

    setTimeout(() => setLoading(false), 3200);
  };

  useEffect(() => {
    return () => {
      if (audioCtxRef.current) audioCtxRef.current.close();
    };
  }, []);

  if (!loading) return null;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700;900&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }

        .hp-overlay {
          position: fixed;
          inset: 0;
          background: radial-gradient(ellipse at 50% 60%, #0d001a 0%, #03000a 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 9999;
          cursor: pointer;
          transition: opacity 0.6s ease;
        }

        .hp-overlay.fade-out {
          opacity: 0;
          pointer-events: none;
        }

        /* Floating particles */
        .hp-particles {
          position: absolute;
          inset: 0;
          overflow: hidden;
          pointer-events: none;
        }

        .hp-particle {
          position: absolute;
          border-radius: 50%;
          background: #FFD700;
          opacity: 0;
          animation: floatUp var(--dur) ease-in infinite;
          animation-delay: var(--delay);
          width: var(--size);
          height: var(--size);
          left: var(--x);
          box-shadow: 0 0 6px 2px rgba(255,215,0,0.5);
        }

        @keyframes floatUp {
          0%   { opacity: 0; transform: translateY(0) scale(0); }
          20%  { opacity: 0.9; transform: translateY(-30px) scale(1); }
          80%  { opacity: 0.6; }
          100% { opacity: 0; transform: translateY(-120px) scale(0.3); }
        }

        /* Magic ring */
        .hp-ring {
          position: absolute;
          border-radius: 50%;
          border: 1.5px solid rgba(212,175,55,0.25);
          animation: spinRing var(--speed) linear infinite;
          animation-direction: var(--dir);
        }

        @keyframes spinRing {
          from { transform: translate(-50%,-50%) rotate(0deg); }
          to   { transform: translate(-50%,-50%) rotate(360deg); }
        }

        /* Content */
        .hp-content {
          position: relative;
          text-align: center;
          z-index: 2;
          animation: appear 1s cubic-bezier(0.34,1.56,0.64,1) forwards;
        }

        @keyframes appear {
          from { opacity: 0; transform: translateY(30px) scale(0.95); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }

        /* Wand */
        .hp-wand-wrap {
          position: relative;
          display: inline-flex;
          flex-direction: column;
          align-items: center;
          margin-bottom: 28px;
        }

        .hp-wand-tip {
          width: 10px;
          height: 10px;
          background: radial-gradient(circle, #fff 0%, #FFD700 50%, transparent 100%);
          border-radius: 50%;
          box-shadow: 0 0 20px 6px rgba(255,215,0,0.9), 0 0 40px 12px rgba(255,165,0,0.5);
          animation: tipPulse 1.6s ease-in-out infinite;
          margin-bottom: 2px;
        }

        @keyframes tipPulse {
          0%,100% { transform: scale(1);   box-shadow: 0 0 20px 6px rgba(255,215,0,0.9), 0 0 40px 12px rgba(255,165,0,0.5); }
          50%     { transform: scale(1.3); box-shadow: 0 0 28px 10px rgba(255,215,0,1),  0 0 60px 20px rgba(255,165,0,0.7); }
        }

        .hp-wand-body {
          width: 4px;
          height: 90px;
          background: linear-gradient(to bottom, #D4AF37 0%, #8B6914 40%, #5C3D11 100%);
          border-radius: 0 0 4px 4px;
          box-shadow: 0 0 12px rgba(212,175,55,0.4);
        }

        /* Title */
        .hp-title {
          font-family: 'Cinzel', serif;
          font-size: clamp(1.8rem, 5vw, 3rem);
          font-weight: 900;
          letter-spacing: 0.08em;
          background: linear-gradient(90deg, #c8970a, #FFD700, #ffe680, #FFD700, #c8970a);
          background-size: 300% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: shimmer 3s linear infinite;
          margin-bottom: 8px;
          text-shadow: none;
        }

        @keyframes shimmer {
          from { background-position: 0% center; }
          to   { background-position: 300% center; }
        }

        .hp-sub {
          font-family: 'Cinzel', serif;
          font-size: 0.7rem;
          color: #b8943a;
          letter-spacing: 0.25em;
          margin-bottom: 28px;
          animation: breathe 2.5s ease-in-out infinite;
        }

        @keyframes breathe {
          0%,100% { opacity: 0.6; }
          50%      { opacity: 1; }
        }

        /* Click prompt */
        .hp-click-prompt {
          font-family: 'Cinzel', serif;
          font-size: 0.85rem;
          color: #FFD700;
          letter-spacing: 0.2em;
          padding: 10px 24px;
          border: 1px solid rgba(255,215,0,0.4);
          border-radius: 30px;
          background: rgba(255,215,0,0.05);
          cursor: pointer;
          transition: all 0.3s ease;
          animation: glow 2s ease-in-out infinite;
          display: inline-block;
        }

        .hp-click-prompt:hover {
          background: rgba(255,215,0,0.12);
          border-color: rgba(255,215,0,0.8);
          box-shadow: 0 0 20px rgba(255,215,0,0.3);
        }

        @keyframes glow {
          0%,100% { box-shadow: 0 0 6px rgba(255,215,0,0.2); }
          50%      { box-shadow: 0 0 18px rgba(255,215,0,0.5); }
        }

        /* After clicked: dots loader */
        .hp-dots {
          display: flex;
          justify-content: center;
          gap: 8px;
          margin-top: 4px;
        }

        .hp-dot {
          width: 8px; height: 8px;
          border-radius: 50%;
          background: #FFD700;
          box-shadow: 0 0 6px rgba(255,215,0,0.8);
          animation: dotBounce 1.4s infinite ease-in-out;
        }
        .hp-dot:nth-child(1) { animation-delay: -0.32s; }
        .hp-dot:nth-child(2) { animation-delay: -0.16s; }
        .hp-dot:nth-child(3) { animation-delay: 0s; }

        @keyframes dotBounce {
          0%,80%,100% { transform: scale(0); opacity: 0.4; }
          40%          { transform: scale(1); opacity: 1; }
        }
      `}</style>

      <div
        className={`hp-overlay${!loading ? " fade-out" : ""}`}
        onClick={startExperience}
      >
        {/* Ambient particles */}
        <div className="hp-particles">
          {Array.from({ length: 30 }).map((_, i) => (
            <div
              key={i}
              className="hp-particle"
              style={{
                "--x": `${Math.random() * 100}%`,
                "--size": `${Math.random() * 4 + 2}px`,
                "--dur": `${Math.random() * 3 + 2}s`,
                "--delay": `${Math.random() * 4}s`,
              }}
            />
          ))}
        </div>

        {/* Spinning rings */}
        {[160, 240, 330].map((size, i) => (
          <div
            key={i}
            className="hp-ring"
            style={{
              width: size,
              height: size,
              top: "50%",
              left: "50%",
              "--speed": `${8 + i * 4}s`,
              "--dir": i % 2 === 0 ? "normal" : "reverse",
            }}
          />
        ))}

        {/* Main content */}
        <div className="hp-content">
          <div className="hp-wand-wrap">
            <div className="hp-wand-tip" />
            <div className="hp-wand-body" />
          </div>

          <h1 className="hp-title">Magical Birthday</h1>
          <p className="hp-sub">✦ A MAGICAL SURPRISE AWAITS ✦</p>

          {!musicStarted ? (
            <div className="hp-click-prompt">
              ✨ Tap to Begin the Magic ✨
            </div>
          ) : (
            <div className="hp-dots">
              <div className="hp-dot" />
              <div className="hp-dot" />
              <div className="hp-dot" />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default HarryPotterLoader;