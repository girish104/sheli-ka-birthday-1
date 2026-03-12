import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import FloatingParticles from "@/components/FloatingParticles";

const roasts = [
  { caption: "Expecto Patronum bolti hai, par client ke saamne Dementor hi aa jaata hai 🪄😩", emoji: "🧙‍♀️", house: "ravenclaw", houseColor: "#0e1a40", accent: "#b9832e" },
  { caption: "Hogwarts letter ka wait khatam, ab ICAI ka result ka wait shuru ⏳📉", emoji: "✉️", house: "gryffindor", houseColor: "#740001", accent: "#D4AF37" },
  { caption: "Polyjuice Potion laga ke bhi confident nahi dikhti audit ke time 💼🧪", emoji: "🧪", house: "slytherin", houseColor: "#1a472a", accent: "#8a9a8a" },
  { caption: "Snape bolta: 'I see no difference' jab padhti ho ya reels dekhti hoo 📱😂", emoji: "🧑‍🏫", house: "slytherin", houseColor: "#1a472a", accent: "#8a9a8a" },
  { caption: "Gryffindor wali bravery articleship join karte waqt, ab Ravenclaw wali overthinking har din 🦁→🦅", emoji: "🦁", house: "gryffindor", houseColor: "#740001", accent: "#D4AF37" },
  { caption: "9¾ platform miss kar diya toh bura laga, par agar group-1 clear nahi hua toh zindagi khatam 😭🚂", emoji: "🚂", house: "hufflepuff", houseColor: "#c9a227", accent: "#c9a227" },
  { caption: "Avada Kedavra se zyada dard ICAI ka rejection letter deta hai 💚📜", emoji: "📜", house: "slytherin", houseColor: "#1a472a", accent: "#8a9a8a" },
  { caption: "Butterbeer peene ka sapna, reality mein black coffee + 3 amendments ☕📚", emoji: "☕", house: "hufflepuff", houseColor: "#c9a227", accent: "#c9a227" },
  { caption: "Quidditch tryouts nahi diye, par har revision ke time full anxiety flying broom jaisa feel 🧹😵‍💫", emoji: "🧹", house: "ravenclaw", houseColor: "#0e1a40", accent: "#b9832e" },
  { caption: "Muggle world mein bhi 'beta CA ban ja' sun-sun ke Voldemort se zyada irritating lagta hai ab 😤🪄", emoji: "🪄", house: "gryffindor", houseColor: "#740001", accent: "#D4AF37" },
];

const houseNames: Record<string, string> = {
  gryffindor: "GRYFFINDOR",
  slytherin: "SLYTHERIN",
  ravenclaw: "RAVENCLAW",
  hufflepuff: "HUFFLEPUFF",
};

const RoastsPage = () => {
  const [activeRoast, setActiveRoast] = useState<number | null>(null);

  const openPopup = (i: number) => setActiveRoast(i);
  const closePopup = () => setActiveRoast(null);

  const activeData = activeRoast !== null ? roasts[activeRoast] : null;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700;900&family=Crimson+Text:ital,wght@0,400;0,600;1,400;1,600&display=swap');

        .roasts-bg {
          min-height: 100vh;
          padding-top: 96px;
          padding-bottom: 64px;
          background:
            radial-gradient(ellipse at 15% 25%, rgba(139,105,20,0.08) 0%, transparent 45%),
            radial-gradient(ellipse at 85% 70%, rgba(200,150,100,0.06) 0%, transparent 45%),
            radial-gradient(ellipse at 50% 50%, #fbf9f4 0%, transparent 80%),
            #ffffff;
          position: relative;
          overflow: hidden;
        }

        .roasts-bg::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image:
            repeating-linear-gradient(0deg, transparent, transparent 60px, rgba(139,105,20,0.02) 60px, rgba(139,105,20,0.02) 61px),
            repeating-linear-gradient(90deg, transparent, transparent 60px, rgba(139,105,20,0.02) 60px, rgba(139,105,20,0.02) 61px);
          pointer-events: none;
        }

        @keyframes gold-shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }

        @keyframes card-breathe {
          0%, 100% { box-shadow: 0 0 15px rgba(139,105,20,0.08), 0 4px 30px rgba(0,0,0,0.08); }
          50% { box-shadow: 0 0 25px rgba(139,105,20,0.15), 0 4px 40px rgba(0,0,0,0.12); }
        }

        @keyframes popup-glow {
          0%, 100% { box-shadow: 0 0 30px rgba(139,105,20,0.2), 0 25px 60px rgba(0,0,0,0.25); }
          50% { box-shadow: 0 0 50px rgba(139,105,20,0.35), 0 25px 80px rgba(0,0,0,0.3); }
        }

        @keyframes sparkle-rotate {
          0% { transform: rotate(0deg) scale(1); opacity: 0.6; }
          50% { transform: rotate(180deg) scale(1.2); opacity: 1; }
          100% { transform: rotate(360deg) scale(1); opacity: 0.6; }
        }

        @keyframes rune-drift {
          0%, 100% { transform: translateY(0px); opacity: 0.15; }
          50% { transform: translateY(-8px); opacity: 0.3; }
        }

        .shimmer-title {
          background: linear-gradient(90deg, #8B6914, #C0A060, #8B6914);
          background-size: 400% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: gold-shimmer 12s linear infinite;
          font-family: 'Cinzel', serif;
        }

        .roast-card {
          background: linear-gradient(145deg, rgba(250,248,243,0.95) 0%, rgba(245,242,235,0.98) 100%);
          border: 1px solid rgba(139,105,20,0.12);
          border-radius: 14px;
          padding: 24px;
          cursor: pointer;
          position: relative;
          overflow: hidden;
          transition: transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
          animation: card-breathe 4s ease-in-out infinite;
        }

        .roast-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 2px;
          background: linear-gradient(90deg, transparent, var(--house-accent), transparent);
          opacity: 0.6;
        }

        .roast-card:hover {
          transform: translateY(-4px) rotate(-0.5deg);
          border-color: rgba(139,105,20,0.35);
        }

        .roast-card:hover .reveal-hint {
          opacity: 1;
        }

        .roast-card .corner-tl,
        .roast-card .corner-br {
          position: absolute;
          width: 16px; height: 16px;
          border-color: rgba(139,105,20,0.25);
          border-style: solid;
        }
        .roast-card .corner-tl { top: 6px; left: 6px; border-width: 1px 0 0 1px; }
        .roast-card .corner-br { bottom: 6px; right: 6px; border-width: 0 1px 1px 0; }

        .emoji-orb {
          width: 64px; height: 64px;
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          font-size: 28px;
          margin: 0 auto 16px;
          position: relative;
          border: 1px solid var(--house-accent);
        }

        .emoji-orb::after {
          content: '';
          position: absolute;
          inset: -3px;
          border-radius: 50%;
          background: radial-gradient(circle, var(--house-color-alpha) 0%, transparent 70%);
        }

        .spell-tag {
          display: inline-block;
          padding: 3px 12px;
          border-radius: 20px;
          font-size: 0.65rem;
          font-family: 'Cinzel', serif;
          letter-spacing: 0.1em;
          border: 1px solid var(--house-accent);
          color: var(--house-accent);
          background: rgba(255,255,255,0.4);
        }

        .reveal-hint {
          position: absolute;
          bottom: 12px;
          right: 14px;
          font-size: 0.6rem;
          font-family: 'Cinzel', serif;
          letter-spacing: 0.12em;
          color: var(--house-accent);
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .divider-magic {
          display: flex;
          align-items: center;
          gap: 12px;
          margin: 32px 0;
        }
        .divider-magic::before,
        .divider-magic::after {
          content: '';
          flex: 1;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(139,105,20,0.3), transparent);
        }

        /* ── POPUP ── */
        .popup-overlay {
          position: fixed;
          inset: 0;
          background: rgba(10, 8, 4, 0.75);
          backdrop-filter: blur(8px);
          z-index: 1000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px;
        }

        .popup-modal {
          position: relative;
          width: 100%;
          max-width: 460px;
          border-radius: 20px;
          padding: 44px 36px 36px;
          text-align: center;
          overflow: hidden;
          animation: popup-glow 3s ease-in-out infinite;
        }

        .popup-modal::before {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse at 50% 20%, var(--house-color-soft) 0%, transparent 65%);
          pointer-events: none;
        }

        .popup-rune {
          position: absolute;
          font-size: 1.2rem;
          animation: rune-drift 3s ease-in-out infinite;
          pointer-events: none;
          user-select: none;
        }

        .popup-close {
          position: absolute;
          top: 14px; right: 16px;
          background: none;
          border: 1px solid rgba(139,105,20,0.3);
          border-radius: 50%;
          width: 32px; height: 32px;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer;
          font-size: 1rem;
          color: #8B6914;
          transition: all 0.2s ease;
          font-family: 'Cinzel', serif;
        }

        .popup-close:hover {
          background: rgba(139,105,20,0.12);
          border-color: rgba(139,105,20,0.6);
          transform: rotate(90deg);
        }

        .popup-house-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 4px 16px;
          border-radius: 20px;
          border: 1px solid var(--house-accent);
          font-family: 'Cinzel', serif;
          font-size: 0.6rem;
          letter-spacing: 0.2em;
          color: var(--house-accent);
          background: var(--house-color-soft);
          margin-bottom: 20px;
        }

        .popup-emoji-big {
          font-size: 4rem;
          margin-bottom: 20px;
          display: block;
          filter: drop-shadow(0 0 12px rgba(139,105,20,0.4));
        }

        .popup-caption {
          font-family: 'Crimson Text', serif;
          font-size: 1.2rem;
          line-height: 1.7;
          color: #3a2a10;
          margin-bottom: 24px;
          position: relative;
          z-index: 1;
        }

        .popup-sparkle {
          position: absolute;
          animation: sparkle-rotate 4s linear infinite;
          font-size: 1rem;
          pointer-events: none;
        }

        .popup-nav {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 16px;
          margin-top: 8px;
        }

        .popup-nav-btn {
          background: none;
          border: 1px solid rgba(139,105,20,0.3);
          border-radius: 8px;
          padding: 6px 16px;
          font-family: 'Cinzel', serif;
          font-size: 0.65rem;
          letter-spacing: 0.1em;
          color: #8B6914;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .popup-nav-btn:hover {
          background: rgba(139,105,20,0.1);
          border-color: rgba(139,105,20,0.6);
          transform: scale(1.05);
        }

        .popup-counter {
          font-family: 'Cinzel', serif;
          font-size: 0.65rem;
          color: rgba(139,105,20,0.5);
          letter-spacing: 0.15em;
        }
      `}</style>

      <div className="roasts-bg">
        <FloatingParticles />

        <div className="container mx-auto px-4 relative z-10">

          {/* Header */}
          <motion.div
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7 }}
            className="text-center mb-12"
          >
            <p style={{ fontFamily: "'Cinzel', serif", fontSize: '0.7rem', letterSpacing: '0.3em', color: '#4a3a20', marginBottom: '8px' }}>
              SLYTHERIN DUNGEON PRESENTS
            </p>
            <h1 className="shimmer-title text-4xl sm:text-5xl font-black mb-3">
              🔥 Roast Scroll 🔥
            </h1>
            <p style={{ fontFamily: "'Crimson Text', serif", fontSize: '1.1rem', color: '#9a8060', fontStyle: 'italic' }}>
              "Pyaar se, par savage tarike se 😈"
            </p>
          </motion.div>

          {/* Divider */}
          <div className="divider-magic">
            <span style={{ color: '#FFD700', fontSize: '0.8rem' }}>🐍</span>
            <span style={{ color: '#8B6914', fontSize: '0.6rem' }}>✦ SEALED WITH DARK MAGIC ✦</span>
            <span style={{ color: '#FFD700', fontSize: '0.8rem' }}>🐍</span>
          </div>

          {/* Roast Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl mx-auto">
            {roasts.map((roast, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40, rotate: i % 2 === 0 ? -1.5 : 1.5 }}
                whileInView={{ opacity: 1, y: 0, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07, type: "spring", bounce: 0.25 }}
                onClick={() => openPopup(i)}
                className="roast-card"
                style={{
                  '--house-color': roast.houseColor,
                  '--house-color-alpha': `${roast.houseColor}44`,
                  '--house-accent': roast.accent,
                  animationDelay: `${i * 0.3}s`,
                } as React.CSSProperties}
              >
                <div className="corner-tl" />
                <div className="corner-br" />

                <div
                  className="emoji-orb"
                  style={{ background: `${roast.houseColor}22` }}
                >
                  <span>{roast.emoji}</span>
                </div>

                <p style={{
                  fontFamily: "'Crimson Text', serif",
                  fontSize: '1rem',
                  color: '#5a4a30',
                  textAlign: 'center',
                  lineHeight: 1.6,
                  marginBottom: '16px',
                }}>
                  {roast.caption}
                </p>

                <div className="text-center">
                  <span className="spell-tag">#{i + 1} Savage Spell</span>
                </div>

                <span className="reveal-hint">✦ TAP TO REVEAL ✦</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* ── POPUP MODAL ── */}
      <AnimatePresence>
        {activeRoast !== null && activeData && (
          <motion.div
            className="popup-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={closePopup}
          >
            <motion.div
              className="popup-modal"
              initial={{ scale: 0.7, opacity: 0, rotate: -4 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              exit={{ scale: 0.7, opacity: 0, rotate: 4 }}
              transition={{ type: "spring", bounce: 0.35, duration: 0.5 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                background: `linear-gradient(145deg, rgba(252,249,242,0.98) 0%, rgba(245,240,228,0.99) 100%)`,
                border: `1px solid ${activeData.accent}55`,
                '--house-accent': activeData.accent,
                '--house-color-soft': `${activeData.houseColor}18`,
              } as React.CSSProperties}
            >
              {/* Floating runes */}
              <span className="popup-rune" style={{ top: '12%', left: '8%', animationDelay: '0s' }}>⚡</span>
              <span className="popup-rune" style={{ top: '18%', right: '10%', animationDelay: '1s' }}>✨</span>
              <span className="popup-rune" style={{ bottom: '15%', left: '12%', animationDelay: '2s' }}>🌟</span>
              <span className="popup-rune" style={{ bottom: '20%', right: '8%', animationDelay: '0.5s' }}>💫</span>

              {/* Sparkles on corners */}
              <span className="popup-sparkle" style={{ top: 8, right: 48, animationDelay: '1s' }}>✦</span>
              <span className="popup-sparkle" style={{ bottom: 40, left: 16, animationDelay: '2s', fontSize: '0.7rem' }}>✦</span>

              {/* Close button */}
              <button className="popup-close" onClick={closePopup}>✕</button>

              {/* House badge */}
              <div className="popup-house-badge">
                🏰 {houseNames[activeData.house]} · #{activeRoast + 1}
              </div>

              {/* Big emoji */}
              <motion.span
                className="popup-emoji-big"
                initial={{ scale: 0, rotate: -20 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", bounce: 0.5, delay: 0.1 }}
              >
                {activeData.emoji}
              </motion.span>

              {/* Caption */}
              <motion.p
                className="popup-caption"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                {activeData.caption}
              </motion.p>

              {/* Divider line */}
              <div style={{ height: '1px', background: `linear-gradient(90deg, transparent, ${activeData.accent}55, transparent)`, margin: '0 0 20px' }} />

              {/* Nav buttons */}
              <div className="popup-nav">
                <button
                  className="popup-nav-btn"
                  onClick={() => setActiveRoast((activeRoast - 1 + roasts.length) % roasts.length)}
                >
                  ← PREV
                </button>
                <span className="popup-counter">{activeRoast + 1} / {roasts.length}</span>
                <button
                  className="popup-nav-btn"
                  onClick={() => setActiveRoast((activeRoast + 1) % roasts.length)}
                >
                  NEXT →
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default RoastsPage;