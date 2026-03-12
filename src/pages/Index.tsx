import { useState, useEffect, useRef } from "react";

const SISTER_NAME = "Sheli";
const AGE = 22;

// ── Replace these src values with real photo URLs or imports ───────────────
const PHOTOS = [
  { src: "/src/assets/images/platform.jpeg", caption: "Platform 9¾", year: "2024" },
  { src: "/src/assets/images/rain.png", caption: "The Chosen One ⚡", year: "2024" },
  { src: "/src/assets/images/maglu-world.jpeg", caption: "Maglu World", year: "2025" },
  { src: "/src/assets/images/ganpati.png", caption: "Ganpati Pooja at Hogwarts", year: "2025" },
  { src: "/src/assets/images/maglu-world-2.jpeg", caption: "Maglu World", year: "2025" },
  { src: "/src/assets/images/maglu-world-3.jpeg", caption: "Maglu World x House Gryffindor 🏆", year: "2025" },
];

// ── Floating magical particles ─────────────────────────────────────────────
function MagicParticles() {
  return (
    <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', overflow: 'hidden', zIndex: 0 }}>
      {Array.from({ length: 30 }).map((_, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            borderRadius: '50%',
            width: `${Math.random() * 4 + 2}px`,
            height: `${Math.random() * 4 + 2}px`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            background: i % 3 === 0 ? '#FFD700' : i % 3 === 1 ? '#C0A060' : '#8B6914',
            boxShadow: `0 0 ${Math.random() * 8 + 4}px currentColor`,
            animationDelay: `${Math.random() * 8}s`,
            animationDuration: `${Math.random() * 6 + 4}s`,
            opacity: Math.random() * 0.7 + 0.3,
            animation: 'mgFloat linear infinite',
          }}
        />
      ))}
    </div>
  );
}

function HogwartsCrest() {
  return (
    <svg viewBox="0 0 120 120" style={{ width: 80, height: 80 }} fill="none">
      <path d="M10 10 L110 10 L110 80 L60 115 L10 80 Z" fill="#1a0a00" stroke="#FFD700" strokeWidth="3"/>
      <path d="M10 10 L60 10 L60 62 L10 62 Z" fill="#740001" stroke="#FFD700" strokeWidth="1"/>
      <path d="M60 10 L110 10 L110 62 L60 62 Z" fill="#0e1a40" stroke="#FFD700" strokeWidth="1"/>
      <path d="M10 62 L60 62 L60 115 L10 80 Z" fill="#ecb939" stroke="#FFD700" strokeWidth="1"/>
      <path d="M60 62 L110 62 L110 80 L60 115 Z" fill="#1a472a" stroke="#FFD700" strokeWidth="1"/>
      <line x1="60" y1="10" x2="60" y2="115" stroke="#FFD700" strokeWidth="2"/>
      <line x1="10" y1="62" x2="110" y2="62" stroke="#FFD700" strokeWidth="2"/>
      <text x="30" y="45" textAnchor="middle" fontSize="18" fill="#FFD700">🦁</text>
      <text x="85" y="45" textAnchor="middle" fontSize="18" fill="#AAC4E0">🦅</text>
      <text x="30" y="90" textAnchor="middle" fontSize="18" fill="#1a0a00">🦡</text>
      <text x="85" y="90" textAnchor="middle" fontSize="18" fill="#2a7a4a">🐍</text>
    </svg>
  );
}

function MagicDivider() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', width: '100%', margin: '16px 0' }}>
      <div style={{ flex: 1, height: '1px', background: 'linear-gradient(to right, transparent, #b8860b, #FFD700)' }}/>
      <span style={{ margin: '0 10px', color: '#FFD700', fontSize: '1.1rem' }}>⚡</span>
      <span style={{ margin: '0 4px', color: '#b8860b', fontSize: '0.7rem' }}>✦</span>
      <span style={{ margin: '0 10px', color: '#FFD700', fontSize: '1.1rem' }}>⚡</span>
      <div style={{ flex: 1, height: '1px', background: 'linear-gradient(to left, transparent, #b8860b, #FFD700)' }}/>
    </div>
  );
}

function StatCard({ emoji, label, value, color }: { emoji: string; label: string; value: string; color: string }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        borderRadius: '12px', padding: '16px', textAlign: 'center',
        border: `1px solid ${color}55`, background: 'rgba(250,248,243,0.7)',
        boxShadow: hovered ? `0 0 20px ${color}55` : `0 0 12px ${color}33`,
        transform: hovered ? 'scale(1.05)' : 'scale(1)',
        transition: 'all 0.3s ease', cursor: 'default', position: 'relative',
      }}
    >
      <div style={{ fontSize: '1.8rem', marginBottom: '8px' }}>{emoji}</div>
      <div style={{ color, fontFamily: "'Cinzel', serif", fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.05em', marginBottom: '4px' }}>{value}</div>
      <div style={{ color: '#6b5a4a', fontFamily: "'Crimson Text', serif", fontSize: '0.75rem' }}>{label}</div>
    </div>
  );
}

// ── Quidditch Photo Scroll ─────────────────────────────────────────────────
function QuidditchPhotoScroll() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<number | null>(null);
  const [dragStart, setDragStart] = useState<number | null>(null);
  const [scrollStart, setScrollStart] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const animRef = useRef<number>();

  // Auto scroll
  useEffect(() => {
    const track = trackRef.current;
    if (!track || isDragging || active !== null) return;
    let pos = track.scrollLeft;
    const tick = () => {
      pos += 0.7;
      if (pos >= track.scrollWidth / 2) pos = 0;
      track.scrollLeft = pos;
      animRef.current = requestAnimationFrame(tick);
    };
    animRef.current = requestAnimationFrame(tick);
    return () => { if (animRef.current) cancelAnimationFrame(animRef.current); };
  }, [isDragging, active]);

  const onMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart(e.pageX);
    setScrollStart(trackRef.current?.scrollLeft ?? 0);
  };
  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || dragStart === null) return;
    trackRef.current!.scrollLeft = scrollStart - (e.pageX - dragStart);
  };
  const onMouseUp = () => setIsDragging(false);

  const allPhotos = [...PHOTOS, ...PHOTOS]; // duplicate for infinite feel

  return (
    <div style={{ position: 'relative', width: '100%' }}>
      {/* Title */}
      <div style={{ textAlign: 'center', marginBottom: '20px', padding: '0 16px' }}>
        <p style={{ fontFamily: "'Cinzel', serif", fontSize: '0.55rem', letterSpacing: '0.3em', color: '#4a3a20', marginBottom: '6px' }}>
          THE PENSIEVE REVEALS
        </p>
        <h2 style={{
          fontFamily: "'Cinzel', serif", fontSize: '1.4rem', fontWeight: 900, marginBottom: '4px',
          background: 'linear-gradient(90deg, #8B6914, #FFD700, #C0A060, #FFD700, #8B6914)',
          backgroundSize: '200% auto',
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
          animation: 'mgShimmer 4s linear infinite',
        }}>
          🧹 Hogwarts Memory Reel 🧹
        </h2>
        <p style={{ fontFamily: "'Crimson Text', serif", fontStyle: 'italic', color: '#6a5a40', fontSize: '0.85rem' }}>
          Drag to fly · Click a photo to summon
        </p>
      </div>

      {/* Top broom rail */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '0 20px', marginBottom: '6px' }}>
        <div style={{ flex: 1, height: '2px', background: 'linear-gradient(90deg, transparent, #8B6914 20%, #FFD700 50%, #8B6914 80%, transparent)', borderRadius: '2px' }}/>
        <span style={{ fontSize: '1.2rem' }}>🧹</span>
        <div style={{ flex: 1, height: '2px', background: 'linear-gradient(90deg, transparent, #8B6914 20%, #FFD700 50%, #8B6914 80%, transparent)', borderRadius: '2px' }}/>
      </div>

      {/* Scroll viewport */}
      <div style={{ position: 'relative' }}>
        {/* Edge fades */}
        <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '70px', zIndex: 2, pointerEvents: 'none', background: 'linear-gradient(to right, #ffffff, transparent)' }}/>
        <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: '70px', zIndex: 2, pointerEvents: 'none', background: 'linear-gradient(to left, #ffffff, transparent)' }}/>

        <div
          ref={trackRef}
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={onMouseUp}
          onMouseLeave={onMouseUp}
          style={{
            display: 'flex', gap: '14px',
            overflowX: 'auto', padding: '16px 80px 24px',
            scrollbarWidth: 'none', msOverflowStyle: 'none',
            cursor: isDragging ? 'grabbing' : 'grab',
            userSelect: 'none', WebkitUserSelect: 'none',
          }}
        >
          {allPhotos.map((photo, i) => {
            const realIdx = i % PHOTOS.length;
            const isActive = active === realIdx;
            const tilt = (i % 5 - 2) * 1.8;
            return (
              <div
                key={i}
                onClick={() => setActive(isActive ? null : realIdx)}
                style={{
                  flexShrink: 0,
                  width: isActive ? '210px' : '150px',
                  transition: 'all 0.4s cubic-bezier(0.34,1.56,0.64,1)',
                  transform: isActive ? 'translateY(-18px) rotate(0deg)' : `rotate(${tilt}deg)`,
                  position: 'relative',
                  zIndex: isActive ? 10 : 1,
                  cursor: 'pointer',
                }}
              >
                {/* Hanging pin */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '0px' }}>
                  <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#8B6914', border: '1px solid rgba(139,105,20,0.4)', marginBottom: '0' }}/>
                  <div style={{ width: '1px', height: '12px', background: 'linear-gradient(to bottom, rgba(139,105,20,0.4), rgba(139,105,20,0.1))' }}/>
                </div>

                {/* Polaroid */}
                <div style={{
                  background: '#ffffff',
                  border: `1px solid ${isActive ? 'rgba(139,105,20,0.35)' : 'rgba(139,105,20,0.15)'}`,
                  borderRadius: '6px',
                  padding: '7px 7px 28px',
                  boxShadow: isActive
                    ? '0 8px 16px rgba(0,0,0,0.06), 0 0 12px rgba(139,105,20,0.1)'
                    : '0 2px 8px rgba(0,0,0,0.04), 0 0 4px rgba(139,105,20,0.05)',
                  transition: 'box-shadow 0.4s ease, border-color 0.4s ease',
                }}>
                  {/* Top shimmer strip */}
                  <div style={{ height: '1px', background: 'linear-gradient(90deg, transparent, rgba(139,105,20,0.35), transparent)', marginBottom: '7px' }}/>

                  {/* Image */}
                  <div style={{ borderRadius: '3px', overflow: 'hidden', position: 'relative' }}>
                    <img
                      src={photo.src}
                      alt={photo.caption}
                      draggable={false}
                      style={{
                        width: '100%',
                        height: isActive ? '190px' : '140px',
                        objectFit: 'cover',
                        display: 'block',
                        transition: 'height 0.4s ease, filter 0.3s ease',
                        filter: isActive ? 'brightness(1) saturate(1)' : 'brightness(0.95) saturate(0.95)',
                      }}
                    />
                    {isActive && (
                      <div style={{ position: 'absolute', top: '6px', right: '6px', fontSize: '1rem', animation: 'mgSnitch 1.5s ease-in-out infinite' }}>✨</div>
                    )}
                  </div>

                  {/* Caption */}
                  <div style={{ padding: '7px 3px 0', textAlign: 'center' }}>
                    <p style={{
                      fontFamily: "'Crimson Text', serif", fontStyle: 'italic',
                      fontSize: isActive ? '0.82rem' : '0.68rem',
                      color: isActive ? '#8B6914' : '#7a6a50',
                      lineHeight: 1.3, transition: 'all 0.3s ease',
                      whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
                    }}>{photo.caption}</p>
                    <p style={{ fontFamily: "'Cinzel', serif", fontSize: '0.5rem', color: '#b8a080', letterSpacing: '0.15em', marginTop: '3px' }}>{photo.year}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom rail */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '0 20px', marginTop: '2px' }}>
        <div style={{ flex: 1, height: '1px', background: 'linear-gradient(90deg, transparent, rgba(139,105,20,0.3), transparent)' }}/>
        <span style={{ fontFamily: "'Cinzel', serif", fontSize: '0.5rem', color: '#3a2a10', letterSpacing: '0.2em' }}>MEMORY GALLERY</span>
        <div style={{ flex: 1, height: '1px', background: 'linear-gradient(90deg, transparent, rgba(139,105,20,0.3), transparent)' }}/>
      </div>

      {/* ── Lightbox with Prev / Next navigation ── */}
      {active !== null && (
        <div
          onClick={() => setActive(null)}
          style={{
            position: 'fixed', inset: 0, zIndex: 200,
            background: 'rgba(10,8,4,0.75)', backdropFilter: 'blur(10px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            animation: 'mgFadeIn 0.2s ease',
          }}
        >
          <div
            onClick={e => e.stopPropagation()}
            style={{
              background: 'linear-gradient(145deg, #faf8f3, #f5f2eb)',
              border: '1px solid rgba(139,105,20,0.4)',
              borderRadius: '14px', padding: '16px 16px 28px',
              maxWidth: '380px', width: '90%',
              boxShadow: '0 0 60px rgba(139,105,20,0.18), 0 40px 80px rgba(0,0,0,0.2)',
              position: 'relative',
              animation: 'mgPopIn 0.3s cubic-bezier(0.34,1.56,0.64,1)',
            }}
          >
            {/* Close button */}
            <button
              onClick={() => setActive(null)}
              style={{
                position: 'absolute', top: '10px', right: '12px',
                background: 'none', border: '1px solid rgba(139,105,20,0.3)',
                borderRadius: '50%', width: '28px', height: '28px',
                color: '#8B6914', fontFamily: "'Cinzel', serif",
                fontSize: '0.7rem', cursor: 'pointer', transition: 'all 0.2s',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}
              onMouseEnter={e => (e.currentTarget.style.transform = 'rotate(90deg)')}
              onMouseLeave={e => (e.currentTarget.style.transform = 'rotate(0deg)')}
            >✕</button>

            {/* Top shimmer */}
            <div style={{ height: '1px', background: 'linear-gradient(90deg, transparent, rgba(139,105,20,0.5), transparent)', marginBottom: '12px' }}/>

            {/* Counter badge */}
            <div style={{ textAlign: 'center', marginBottom: '12px' }}>
              <span style={{
                display: 'inline-block', padding: '3px 14px', borderRadius: '20px',
                border: '1px solid rgba(139,105,20,0.35)', background: 'rgba(255,215,0,0.06)',
                fontFamily: "'Cinzel', serif", fontSize: '0.55rem',
                color: '#8B6914', letterSpacing: '0.18em',
              }}>
                🏰 MEMORY {active + 1} OF {PHOTOS.length}
              </span>
            </div>

            {/* Image */}
            <div style={{ borderRadius: '8px', overflow: 'hidden', position: 'relative' }}>
              <img
                src={PHOTOS[active].src}
                alt={PHOTOS[active].caption}
                style={{ width: '100%', display: 'block', borderRadius: '8px' }}
              />
              <div style={{ position: 'absolute', top: '8px', right: '8px', fontSize: '1rem', animation: 'mgSnitch 1.5s ease-in-out infinite' }}>✨</div>
            </div>

            {/* Caption */}
            <div style={{ textAlign: 'center', marginTop: '14px', marginBottom: '18px' }}>
              <p style={{ fontFamily: "'Crimson Text', serif", fontStyle: 'italic', fontSize: '1.1rem', color: '#8B6914' }}>
                {PHOTOS[active].caption}
              </p>
              <p style={{ fontFamily: "'Cinzel', serif", fontSize: '0.5rem', color: '#b8a080', letterSpacing: '0.2em', marginTop: '5px' }}>
                {PHOTOS[active].year}
              </p>
            </div>

            {/* Divider */}
            <div style={{ height: '1px', background: 'linear-gradient(90deg, transparent, rgba(139,105,20,0.3), transparent)', marginBottom: '16px' }}/>

            {/* Prev / Next */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px' }}>
              <button
                onClick={() => setActive((active - 1 + PHOTOS.length) % PHOTOS.length)}
                style={{
                  background: 'none', border: '1px solid rgba(139,105,20,0.3)',
                  borderRadius: '8px', padding: '6px 18px',
                  fontFamily: "'Cinzel', serif", fontSize: '0.6rem',
                  letterSpacing: '0.1em', color: '#8B6914', cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={e => { (e.currentTarget.style.background = 'rgba(139,105,20,0.1)'); (e.currentTarget.style.transform = 'scale(1.05)'); }}
                onMouseLeave={e => { (e.currentTarget.style.background = 'none'); (e.currentTarget.style.transform = 'scale(1)'); }}
              >← PREV</button>

              <span style={{ fontFamily: "'Cinzel', serif", fontSize: '0.55rem', color: 'rgba(139,105,20,0.45)', letterSpacing: '0.15em' }}>
                {active + 1} / {PHOTOS.length}
              </span>

              <button
                onClick={() => setActive((active + 1) % PHOTOS.length)}
                style={{
                  background: 'none', border: '1px solid rgba(139,105,20,0.3)',
                  borderRadius: '8px', padding: '6px 18px',
                  fontFamily: "'Cinzel', serif", fontSize: '0.6rem',
                  letterSpacing: '0.1em', color: '#8B6914', cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={e => { (e.currentTarget.style.background = 'rgba(139,105,20,0.1)'); (e.currentTarget.style.transform = 'scale(1.05)'); }}
                onMouseLeave={e => { (e.currentTarget.style.background = 'none'); (e.currentTarget.style.transform = 'scale(1)'); }}
              >NEXT →</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ── Main Page ──────────────────────────────────────────────────────────────
function HomePage() {
  const [sparkles, setSparkles] = useState<{ id: number; x: number; y: number }[]>([]);
  const [showQuote, setShowQuote] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowQuote(true), 800);
    return () => clearTimeout(timer);
  }, []);

  const handleWandClick = (e: React.MouseEvent) => {
    const newSparkle = { id: Date.now(), x: e.clientX, y: e.clientY };
    setSparkles(prev => [...prev, newSparkle]);
    setTimeout(() => setSparkles(prev => prev.filter(s => s.id !== newSparkle.id)), 1000);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700;900&family=Crimson+Text:ital,wght@0,400;0,600;1,400&display=swap');
        * { box-sizing: border-box; }

        @keyframes mgFloat {
          0%, 100% { transform: translateY(0) rotate(0deg); opacity: 0.7; }
          50% { transform: translateY(-20px) rotate(180deg); opacity: 1; }
        }
        @keyframes mgShimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        @keyframes mgGlowPulse {
          0%, 100% { box-shadow: 0 0 8px rgba(139,105,20,0.08), 0 0 16px rgba(184,134,11,0.05), inset 0 0 15px rgba(0,0,0,0.02); }
          50% { box-shadow: 0 0 12px rgba(139,105,20,0.12), 0 0 24px rgba(184,134,11,0.08), inset 0 0 15px rgba(0,0,0,0.03); }
        }
        @keyframes mgTextGlow {
          0%, 100% { text-shadow: 0 0 4px rgba(139,105,20,0.3); }
          50% { text-shadow: 0 0 8px rgba(139,105,20,0.5); }
        }
        @keyframes mgSparkle {
          0% { transform: scale(0) rotate(0deg); opacity: 1; }
          100% { transform: scale(2) rotate(180deg); opacity: 0; }
        }
        @keyframes mgReveal {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes mgCandle {
          0%, 100% { opacity: 0.9; transform: scaleY(1); }
          25% { opacity: 1; transform: scaleY(1.05); }
          75% { opacity: 0.8; transform: scaleY(0.97); }
        }
        @keyframes mgSnitch {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-5px) rotate(20deg); }
        }
        @keyframes mgFadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes mgPopIn {
          from { transform: scale(0.8); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }

        .mg-shimmer-text {
          background: linear-gradient(90deg, #8B6914, #C0A060, #8B6914);
          background-size: 300% auto;
          -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
          animation: mgShimmer 8s linear infinite;
        }
        .mg-card-glow { animation: mgGlowPulse 3s ease-in-out infinite; }
        .mg-title-glow { animation: mgTextGlow 3s ease-in-out infinite; color: #8B6914; }
        .mg-reveal { animation: mgReveal 0.8s ease-out forwards; }
        .mg-candle { animation: mgCandle 0.8s ease-in-out infinite; }
        .mg-sparkle { animation: mgSparkle 0.8s ease-out forwards; }

        div::-webkit-scrollbar { display: none; }
      `}</style>

      {/* Click sparkles */}
      {sparkles.map(s => (
        <div key={s.id} className="mg-sparkle" style={{
          position: 'fixed', left: s.x - 12, top: s.y - 12,
          pointerEvents: 'none', zIndex: 50, fontSize: '1.5rem',
        }}>✨</div>
      ))}

      <div
        onClick={handleWandClick}
        style={{
          minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center',
          padding: '40px 16px', position: 'relative',
          background: `
            radial-gradient(ellipse at 20% 20%, #f5e6d3 0%, transparent 50%),
            radial-gradient(ellipse at 80% 80%, #faf8f3 0%, transparent 50%),
            radial-gradient(ellipse at 50% 50%, #fbf9f4 0%, transparent 80%),
            #ffffff`,
          backgroundImage: `
            repeating-linear-gradient(0deg, transparent, transparent 30px, rgba(139,105,20,0.03) 30px, rgba(139,105,20,0.03) 31px),
            repeating-linear-gradient(90deg, transparent, transparent 30px, rgba(139,105,20,0.03) 30px, rgba(139,105,20,0.03) 31px)`,
        }}
      >
        <MagicParticles />

        {/* Candles */}
        {[{ side: 'left', left: 24 }, { side: 'right', right: 24 }].map(({ side, ...pos }) => (
          <div key={side} style={{ position: 'fixed', top: 0, display: 'flex', gap: '32px', pointerEvents: 'none', ...pos }}>
            {[0,1,2].map(i => (
              <div key={i} className="mg-candle" style={{ fontSize: '1.4rem', animationDelay: `${i*0.3 + (side === 'right' ? 0.5 : 0)}s`, opacity: 0.6 }}>🕯️</div>
            ))}
          </div>
        ))}

        {/* ── Main Card ── */}
        <div
          className="mg-card-glow"
          style={{
            position: 'relative', width: '100%', maxWidth: '860px',
            borderRadius: '18px', padding: '32px', zIndex: 10,
            background: 'linear-gradient(160deg, rgba(250,248,243,0.98) 0%, rgba(245,242,235,0.99) 100%)',
            border: '1px solid rgba(139,105,20,0.3)',
            fontFamily: "'Crimson Text', serif",
            overflow: 'hidden',
          }}
        >
          {/* Corner ornaments */}
          {[
            { top: 8, left: 8, borderWidth: '2px 0 0 2px' },
            { top: 8, right: 8, borderWidth: '2px 2px 0 0' },
            { bottom: 8, left: 8, borderWidth: '0 0 2px 2px' },
            { bottom: 8, right: 8, borderWidth: '0 2px 2px 0' },
          ].map((s, i) => (
            <div key={i} style={{ position: 'absolute', width: 50, height: 50, borderColor: 'rgba(139,105,20,0.4)', borderStyle: 'solid', ...s }}/>
          ))}
          {/* Inner house glows */}
          <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(ellipse at 0% 0%, rgba(116,0,1,0.12) 0%, transparent 40%), radial-gradient(ellipse at 100% 100%, rgba(26,71,42,0.1) 0%, transparent 40%), radial-gradient(ellipse at 100% 0%, rgba(14,26,64,0.12) 0%, transparent 40%)`, pointerEvents: 'none' }}/>

          {/* Header */}
          <div className="mg-reveal" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '24px' }}>
            <div style={{ position: 'relative', marginBottom: '16px' }}>
              <div style={{ position: 'absolute', inset: 0, borderRadius: '50%', filter: 'blur(20px)', background: 'radial-gradient(circle, #FFD70044 0%, transparent 70%)' }}/>
              <HogwartsCrest />
            </div>
            <p style={{ fontFamily: "'Cinzel', serif", fontSize: '0.62rem', letterSpacing: '0.3em', color: '#8B6914', marginBottom: '8px' }}>THE WIZARDING WORLD CELEBRATES</p>
            <h1 className="mg-shimmer-text" style={{ fontFamily: "'Cinzel', serif", fontSize: 'clamp(2.4rem,8vw,3.4rem)', fontWeight: 900, lineHeight: 1.1 }}>
              {SISTER_NAME}'s
            </h1>
            <h2 className="mg-title-glow" style={{ fontFamily: "'Cinzel', serif", fontSize: 'clamp(1.4rem,5vw,2rem)', fontWeight: 700, marginTop: '4px' }}>
              Magical Birthday
            </h2>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '8px' }}>
              <span style={{ color: '#8B6914' }}>⚡</span>
              <span style={{ fontFamily: "'Cinzel', serif", fontSize: '0.78rem', color: '#C0A060' }}>Year {AGE} — Hermione Granger Energy, Ron Weasley Bank Account</span>
              <span style={{ color: '#8B6914' }}>⚡</span>
            </div>
          </div>

          <MagicDivider />

          {/* House badges */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', margin: '20px 0' }}>
            {[
              { house: 'Gryffindor', color: '#740001', icon: '🦁', trait: 'Attempt' },
              { house: 'Hufflepuff', color: '#ecb939', icon: '🦡', trait: 'Attempt' },
              { house: 'Ravenclaw', color: '#0e1a40', icon: '🦅', trait: 'Exempt' },
              { house: 'Slytherin', color: '#1a472a', icon: '🐍', trait: 'Big4' },
            ].map(({ house, color, icon, trait }) => (
              <div key={house}
                style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '8px 12px', borderRadius: '8px', minWidth: '56px', border: `1px solid ${color}66`, background: `${color}22`, transition: 'transform 0.3s ease', cursor: 'default' }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.transform = 'scale(1.12)'}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.transform = 'scale(1)'}
              >
                <span style={{ fontSize: '1.2rem' }}>{icon}</span>
                <span style={{ color, fontFamily: "'Cinzel', serif", fontSize: '0.6rem', fontWeight: 700, marginTop: '4px' }}>{trait}</span>
              </div>
            ))}
          </div>

          <MagicDivider />

          {/* Stats */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px', margin: '24px 0' }}>
            <StatCard emoji="🎂" label="Years of Magic" value={`${AGE}`} color="#FFD700" />
            <StatCard emoji="🧙‍♀️" label="Spell Power" value="Infinite Audit" color="#9B59B6" />
            <StatCard emoji="🚞" label="Quests Completed" value="999+ Client Meet" color="#3498DB" />
            <StatCard emoji="🍜" label="Culinary Magic" value="Maggie at 2 AM" color="#E74C3C" />          
          </div>

          <MagicDivider />

          {/* Quote */}
          <div style={{ opacity: showQuote ? 1 : 0, transform: showQuote ? 'translateY(0)' : 'translateY(16px)', transition: 'opacity 1s ease, transform 1s ease', textAlign: 'center', padding: '0 16px', marginTop: '16px' }}>
            <div style={{ position: 'relative', padding: '20px', borderRadius: '12px', background: 'rgba(255,215,0,0.04)', border: '1px solid rgba(255,215,0,0.15)' }}>
              <span style={{ position: 'absolute', top: '-14px', left: '50%', transform: 'translateX(-50%)', color: '#b8860b', fontSize: '2.5rem', lineHeight: 1 }}>"</span>
              <p style={{ fontFamily: "'Crimson Text', serif", fontStyle: 'italic', fontSize: '1.1rem', color: '#D4B896', lineHeight: 1.6 }}>
                Happiness can be found, even in the darkest of times, if one only remembers to turn on the light.
              </p>
              <p style={{ fontFamily: "'Cinzel', serif", fontSize: '0.6rem', color: '#8B6914', letterSpacing: '0.15em', marginTop: '12px' }}>— CA ALBUS DUMBLEDORE</p>
            </div>
          </div>
          <p style={{ textAlign: 'center', fontSize: '0.7rem', color: '#4a3a20', fontFamily: "'Crimson Text', serif", marginTop: '20px' }}>✨ Click anywhere to cast sparkles</p>
        </div>

        {/* ── Quidditch Photo Scroll Section ── */}
        <div style={{ width: '100%', maxWidth: '900px', marginTop: '48px', zIndex: 10, position: 'relative' }}>
          <div style={{
            background: '#ffffff',
            border: '1px solid rgba(139,105,20,0.15)',
            borderRadius: '18px',
            padding: '28px 0 24px',
            position: 'relative', overflow: 'hidden',
            boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
          }}>
            {/* Corner house glows inside scroll card */}
            <div style={{ position: 'absolute', top: 0, left: 0, width: '100px', height: '100px', background: 'radial-gradient(circle, rgba(116,0,1,0.04) 0%, transparent 70%)', pointerEvents: 'none' }}/>
            <div style={{ position: 'absolute', top: 0, right: 0, width: '100px', height: '100px', background: 'radial-gradient(circle, rgba(14,26,64,0.04) 0%, transparent 70%)', pointerEvents: 'none' }}/>
            <div style={{ position: 'absolute', bottom: 0, left: 0, width: '100px', height: '100px', background: 'radial-gradient(circle, rgba(201,162,39,0.02) 0%, transparent 70%)', pointerEvents: 'none' }}/>
            <div style={{ position: 'absolute', bottom: 0, right: 0, width: '100px', height: '100px', background: 'radial-gradient(circle, rgba(26,71,42,0.03) 0%, transparent 70%)', pointerEvents: 'none' }}/>
            <QuidditchPhotoScroll />
          </div>
        </div>

        {/* Footer */}
        <div style={{ marginTop: '32px', textAlign: 'center', zIndex: 10 }}>
          <p style={{ fontFamily: "'Cinzel', serif", fontSize: '0.58rem', color: '#3a2a10', letterSpacing: '0.15em' }}>
            HOGWARTS SCHOOL OF WITCHCRAFT & WIZARDRY ·
          </p>
        </div>
      </div>
    </>
  );
}

export default HomePage;