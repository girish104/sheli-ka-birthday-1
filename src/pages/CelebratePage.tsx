import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import cakeImg from "@/assets/cake.png";
import FloatingParticles from "@/components/FloatingParticles";

interface GuestMessage {
  name: string;
  message: string;
  id: number;
}

// ── Preload the cake image as soon as this module is parsed ────────────────
const preloadCake = new Image();
preloadCake.src = cakeImg;

const CelebratePage = () => {
  const [cakeCut, setCakeCut] = useState(false);
  const [cakeLoaded, setCakeLoaded] = useState(false);
  const [messages] = useState<GuestMessage[]>([
    { id: 1, name: "Bhai", message: "Avada Kedavra!! Happy Birthday" },
    { id: 2, name: "Mummy", message: "Happy Birthday Sheli ❤️" },
    { id: 3, name: "Friend #1", message: "Tu meri wali dress pehenke aana mat! 👗😤" },
  ]);

  const isBirthdayToday = () => {
    const today = new Date();
    return today.getMonth() === 2 && today.getDate() === 12;
  };

  const handleCakeCut = () => {
    setCakeCut(true);
    const duration = 4500;
    const end = Date.now() + duration;
    const colors = ["#FFD700", "#740001", "#1a472a", "#0e1a40", "#c9a227", "#D4AF37", "#b9832e"];
    const frame = () => {
      confetti({ particleCount: 4, angle: 60, spread: 55, origin: { x: 0 }, colors });
      confetti({ particleCount: 4, angle: 120, spread: 55, origin: { x: 1 }, colors });
      if (Date.now() < end) requestAnimationFrame(frame);
    };
    frame();
    setTimeout(() => {
      confetti({
        particleCount: 80, spread: 360, startVelocity: 22,
        gravity: 0.3, ticks: 120, origin: { x: 0.5, y: 0.4 },
        colors, shapes: ["star"], scalar: 1.4,
      });
    }, 600);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700;900&family=Crimson+Text:ital,wght@0,400;0,600;1,400;1,600&display=swap');

        .celebrate-bg {
          min-height: 100vh;
          padding-top: 96px;
          padding-bottom: 80px;
          background:
            radial-gradient(ellipse at 20% 10%, rgba(139,105,20,0.06) 0%, transparent 40%),
            radial-gradient(ellipse at 80% 90%, rgba(200,150,100,0.08) 0%, transparent 40%),
            radial-gradient(ellipse at 50% 50%, #fbf9f4 0%, transparent 80%),
            #ffffff;
          position: relative;
          overflow: hidden;
        }

        .celebrate-bg::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image:
            repeating-linear-gradient(0deg, transparent, transparent 60px, rgba(139,105,20,0.01) 60px, rgba(139,105,20,0.01) 61px),
            repeating-linear-gradient(90deg, transparent, transparent 60px, rgba(139,105,20,0.01) 60px, rgba(139,105,20,0.01) 61px);
          pointer-events: none;
        }

        @keyframes gold-shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        @keyframes candle-flicker {
          0%, 100% { opacity: 1; transform: scaleY(1) scaleX(1); }
          25% { opacity: 0.9; transform: scaleY(1.06) scaleX(0.95); }
          75% { opacity: 0.8; transform: scaleY(0.96) scaleX(1.04); }
        }
        @keyframes cake-glow {
          0%, 100% { filter: drop-shadow(0 0 15px rgba(201,162,39,0.3)) drop-shadow(0 0 30px rgba(116,0,1,0.15)); }
          50% { filter: drop-shadow(0 0 25px rgba(201,162,39,0.55)) drop-shadow(0 0 50px rgba(116,0,1,0.25)); }
        }
        @keyframes pulse-ring {
          0% { transform: scale(0.95); opacity: 0.7; }
          70% { transform: scale(1.1); opacity: 0; }
          100% { transform: scale(1.1); opacity: 0; }
        }
        @keyframes reveal-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes card-glow {
          0%, 100% { box-shadow: 0 0 20px rgba(139,105,20,0.08), 0 8px 40px rgba(0,0,0,0.08); }
          50% { box-shadow: 0 0 35px rgba(139,105,20,0.15), 0 8px 50px rgba(0,0,0,0.12); }
        }
        /* Skeleton shimmer for cake placeholder */
        @keyframes skeletonShimmer {
          0% { background-position: -480px 0; }
          100% { background-position: 480px 0; }
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
        .candle-flame {
          width: 10px; height: 18px;
          border-radius: 50% 50% 30% 30%;
          background: linear-gradient(to top, #FFD700, #FFA500, rgba(255,100,0,0.6));
          box-shadow: 0 0 8px #FFD700, 0 0 16px rgba(255,165,0,0.5);
          animation: candle-flicker 0.7s ease-in-out infinite;
        }
        .cake-wrapper { position: relative; display: inline-block; }
        .cake-wrapper img { animation: cake-glow 2.5s ease-in-out infinite; }
        .pulse-ring {
          position: absolute; inset: -10px; border-radius: 50%;
          border: 2px solid rgba(139,105,20,0.4);
          animation: pulse-ring 2s ease-out infinite;
          pointer-events: none;
        }
        /* Cake skeleton placeholder */
        .cake-skeleton {
          width: 240px; height: 240px; border-radius: 12px;
          background: linear-gradient(90deg, #f0ebe0 25%, #faf6ee 50%, #f0ebe0 75%);
          background-size: 480px 100%;
          animation: skeletonShimmer 1.4s ease-in-out infinite;
          display: flex; align-items: center; justify-content: center;
        }
        .dark-card {
          background: linear-gradient(145deg, rgba(250,248,243,0.97) 0%, rgba(245,242,235,0.99) 100%);
          border: 1px solid rgba(139,105,20,0.15);
          border-radius: 16px;
          position: relative; overflow: hidden;
          animation: card-glow 3.5s ease-in-out infinite;
        }
        .dark-card::before {
          content: ''; position: absolute; top: 0; left: 0; right: 0; height: 1px;
          background: linear-gradient(90deg, transparent, rgba(139,105,20,0.4), transparent);
        }
        .dark-card .corner { position: absolute; width: 18px; height: 18px; border-color: rgba(139,105,20,0.2); border-style: solid; }
        .dark-card .c-tl { top: 8px; left: 8px; border-width: 1px 0 0 1px; }
        .dark-card .c-tr { top: 8px; right: 8px; border-width: 1px 1px 0 0; }
        .dark-card .c-bl { bottom: 8px; left: 8px; border-width: 0 0 1px 1px; }
        .dark-card .c-br { bottom: 8px; right: 8px; border-width: 0 1px 1px 0; }
        .message-card {
          background: rgba(250,248,243,0.8);
          border: 1px solid rgba(139,105,20,0.15);
          border-radius: 12px; padding: 16px;
          transition: border-color 0.25s ease;
        }
        .message-card:hover { border-color: rgba(139,105,20,0.35); }
        .divider-magic { display: flex; align-items: center; gap: 12px; margin: 40px 0; }
        .divider-magic::before, .divider-magic::after {
          content: ''; flex: 1; height: 1px;
          background: linear-gradient(90deg, transparent, rgba(139,105,20,0.3), transparent);
        }
        .celebration-reveal { animation: reveal-up 0.6s ease-out forwards; }
        .click-hint { font-family: 'Cinzel', serif; font-size: 0.8rem; color: #c9a227; letter-spacing: 0.08em; }
      `}</style>

      <div className="celebrate-bg">
        <FloatingParticles />

        <div className="container mx-auto px-4 relative z-10">

          {/* Header */}
          <motion.div
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7 }}
            className="text-center mb-10"
          >
            <p style={{ fontFamily: "'Cinzel', serif", fontSize: '0.65rem', letterSpacing: '0.3em', color: '#4a3a20', marginBottom: '8px' }}>
              HOGWARTS GREAT HALL CEREMONY
            </p>
            <h1 className="shimmer-title text-4xl sm:text-5xl font-black mb-3">
              🎂 Cake Cutting Time! 🎂
            </h1>
            <p style={{ fontFamily: "'Crimson Text', serif", fontSize: '1.1rem', color: '#9a8060', fontStyle: 'italic' }}>
              "Pehle cake kaat, phir audit 📸"
            </p>
          </motion.div>

          {/* Cake Section */}
          <div className="max-w-md mx-auto text-center mb-16">
            {!isBirthdayToday() && (
              <div style={{ padding: '16px', marginBottom: '16px', background: 'rgba(139,105,20,0.1)', border: '1px solid rgba(139,105,20,0.3)', borderRadius: '12px', textAlign: 'center' }}>
                <p style={{ fontFamily: "'Cinzel', serif", fontSize: '0.9rem', color: '#8B6914', fontWeight: 700 }}>🎂 Birthday is on March 12th! 🎂</p>
                <p style={{ fontFamily: "'Crimson Text', serif", fontSize: '0.85rem', color: '#9a8060', marginTop: '6px' }}>Come back on that day to cut the cake!</p>
              </div>
            )}

            <motion.div
              whileHover={!cakeCut && isBirthdayToday() ? { scale: 1.04 } : {}}
              whileTap={!cakeCut && isBirthdayToday() ? { scale: 0.97 } : {}}
              onClick={!cakeCut && isBirthdayToday() ? handleCakeCut : undefined}
              style={{
                cursor: !cakeCut && isBirthdayToday() ? 'pointer' : 'default',
                display: 'inline-block', position: 'relative',
                opacity: isBirthdayToday() ? 1 : 0.6,
              }}
            >
              {/* Candles */}
              {!cakeCut && (
                <div style={{ display: 'flex', justifyContent: 'center', gap: '24px', marginBottom: '8px' }}>
                  {[0, 1, 2].map(i => (
                    <div key={i} className="candle-flame" style={{ animationDelay: `${i * 0.22}s` }} />
                  ))}
                </div>
              )}

              <div className="cake-wrapper">
                {!cakeCut && <div className="pulse-ring" />}

                {/* ── Skeleton shown until image loads ── */}
                {!cakeLoaded && (
                  <div className="cake-skeleton">
                    <span style={{ fontSize: '2.5rem', opacity: 0.25 }}>🎂</span>
                  </div>
                )}

                {/* ── Cake image: eager + fetchpriority high ── */}
                <img
                  src={cakeImg}
                  alt="Birthday Cake"
                  loading="eager"
                  decoding="sync"
                  fetchPriority="high"
                  onLoad={() => setCakeLoaded(true)}
                  style={{
                    width: 240, height: 240,
                    objectFit: 'contain',
                    display: cakeLoaded ? 'block' : 'none', // hide until loaded, skeleton shows instead
                  }}
                />
              </div>

              {!cakeCut && cakeLoaded && (
                <motion.p
                  animate={{ y: [0, -7, 0] }}
                  transition={{ repeat: Infinity, duration: 1.6 }}
                  className="click-hint mt-4"
                >
                  ⚡ Cake pe click karke kaat! 🔪
                </motion.p>
              )}
            </motion.div>

            <AnimatePresence>
              {cakeCut && (
                <motion.div
                  initial={{ scale: 0.6, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring", bounce: 0.45 }}
                  className="mt-8 celebration-reveal"
                >
                  <div style={{ fontSize: '2.5rem', marginBottom: '12px' }}>🎉🥳🎊</div>
                  <h2 className="shimmer-title text-3xl font-black mb-2">Happy Birthday!</h2>
                  <p style={{ fontFamily: "'Crimson Text', serif", fontStyle: 'italic', color: '#9a8060' }}>
                    "Baar baar din ye aaye, baar baar dil ye gaaye" 🎶
                  </p>
                  <iframe
                    width="0" height="0"
                    src="https://www.youtube.com/embed/nAw2ooeubSQ?autoplay=1&controls=0&modestbranding=1"
                    title="Birthday Song"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    style={{ display: 'none' }}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Divider */}
          <div className="divider-magic">
            <span style={{ color: '#FFD700' }}>⚡</span>
            <span style={{ fontFamily: "'Cinzel', serif", fontSize: '0.6rem', color: '#4a3a20', letterSpacing: '0.2em' }}>BIRTHDAY GUESTBOOK</span>
            <span style={{ color: '#FFD700' }}>⚡</span>
          </div>

          {/* Messages */}
          <div className="max-w-2xl mx-auto">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <AnimatePresence>
                {messages.map((msg, i) => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ delay: i * 0.05 }}
                    className="message-card"
                  >
                    <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                      <div style={{
                        width: 36, height: 36, borderRadius: '50%', flexShrink: 0,
                        background: 'rgba(116,0,1,0.3)',
                        border: '1px solid rgba(255,215,0,0.2)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: '1rem',
                      }}>🗣️</div>
                      <div>
                        <p style={{ fontFamily: "'Cinzel', serif", fontSize: '0.75rem', color: '#D4AF37', fontWeight: 700, marginBottom: '4px' }}>
                          {msg.name}
                        </p>
                        <p style={{ fontFamily: "'Crimson Text', serif", color: '#9a8060', fontSize: '0.95rem' }}>
                          {msg.message}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>

        </div>
      </div>
    </>
  );
};

export default CelebratePage;