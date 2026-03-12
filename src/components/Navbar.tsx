import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import gryffindorIcon from "@/assets/harrypotter/gryffindor.svg";
import slytherinIcon from "@/assets/harrypotter/slytherin.svg";
import ravenclawIcon from "@/assets/harrypotter/ravenclaw.svg";

const navItems = [
  {
    path: "/",
    label: "Gryffindor Home",
    icon: gryffindorIcon,
    houseColor: "#740001",
    houseGlow: "rgba(116,0,1,0.6)",
    accent: "#D4AF37",
  },
  {
    path: "/roasts",
    label: "Slytherin Roasts",
    icon: slytherinIcon,
    houseColor: "#1a472a",
    houseGlow: "rgba(26,71,42,0.6)",
    accent: "#8a9a8a",
  },
  {
    path: "/celebrate",
    label: "Ravenclaw Celebrate",
    icon: ravenclawIcon,
    houseColor: "#0e1a40",
    houseGlow: "rgba(14,26,64,0.6)",
    accent: "#b9832e",
  },
];

const Navbar = () => {
  const location = useLocation();

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700;900&family=Crimson+Text:ital,wght@0,400;0,600;1,400&display=swap');

        .navbar-bg {
          background: linear-gradient(180deg, #f5f2eb 0%, #faf8f3 100%);
          border-bottom: 1px solid rgba(139,105,20, 0.2);
          box-shadow:
            0 1px 0 rgba(139,105,20,0.08),
            0 4px 30px rgba(0,0,0,0.06),
            0 0 60px rgba(139,105,20,0.03);
        }

        .navbar-bg::before {
          content: '';
          position: absolute;
          inset: 0;
          background: repeating-linear-gradient(
            90deg,
            transparent,
            transparent 80px,
            rgba(139,105,20,0.02) 80px,
            rgba(139,105,20,0.02) 81px
          );
          pointer-events: none;
        }

        @keyframes gold-shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }

        @keyframes nav-glow-pulse {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 1; }
        }

        @keyframes wand-tip {
          0%, 100% { box-shadow: 0 0 6px #8B6914, 0 0 12px rgba(139,105,20,0.4); }
          50% { box-shadow: 0 0 10px #8B6914, 0 0 20px rgba(139,105,20,0.6), 0 0 30px rgba(139,105,20,0.2); }
        }

        .brand-shimmer {
          background: linear-gradient(90deg, #8B6914, #C0A060, #8B6914);
          background-size: 300% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: gold-shimmer 8s linear infinite;
        }

        .nav-link {
          position: relative;
          font-family: 'Cinzel', serif;
          font-size: 0.7rem;
          letter-spacing: 0.06em;
          color: #8B6914;
          padding: 6px 14px;
          border-radius: 6px;
          border: 1px solid transparent;
          transition: all 0.25s ease;
          white-space: nowrap;
          overflow: hidden;
        }

        .nav-link::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 6px;
          opacity: 0;
          transition: opacity 0.25s ease;
        }

        .nav-link:hover {
          color: #5a4a30;
          border-color: rgba(139,105,20,0.3);
          background: rgba(139,105,20,0.08);
        }

        .nav-link.active {
          color: #5a4a30;
          border-color: rgba(139,105,20,0.5);
          background: rgba(139,105,20,0.12);
        }

        .nav-link.active::after {
          content: '';
          position: absolute;
          bottom: 0; left: 50%; transform: translateX(-50%);
          width: 30%; height: 1px;
          background: #8B6914;
          box-shadow: 0 0 6px rgba(139,105,20,0.4);
        }

        .house-dot {
          width: 6px; height: 6px;
          border-radius: 50%;
          flex-shrink: 0;
          animation: nav-glow-pulse 2s ease-in-out infinite;
        }

        .wand-tip {
          width: 5px; height: 5px;
          border-radius: 50%;
          background: #8B6914;
          animation: wand-tip 2s ease-in-out infinite;
          flex-shrink: 0;
        }

        .gold-divider {
          width: 1px;
          height: 16px;
          background: linear-gradient(to bottom, transparent, rgba(139,105,20,0.3), transparent);
        }

        .lightning-bolt {
          font-size: 0.65rem;
          color: #8B6914;
          opacity: 0.7;
          animation: nav-glow-pulse 1.8s ease-in-out infinite;
        }
      `}</style>

      <motion.nav
        initial={{ y: -70, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", bounce: 0.25, duration: 0.7 }}
        className="navbar-bg fixed top-0 left-0 right-0 z-50 relative"
      >
        <div className="container mx-auto px-4 py-2.5 flex items-center justify-between gap-4">

          {/* Brand */}
          <Link to="/" className="flex items-center gap-2.5 flex-shrink-0 group">
            {/* Animated wand tip indicator */}
            <div className="wand-tip" />
            <div className="flex flex-col leading-none">
              <span
                className="brand-shimmer font-black tracking-wide"
                style={{ fontFamily: "'Cinzel', serif", fontSize: '0.85rem' }}
              >
                Magical Birthday
              </span>
              <span
                className="text-gold-dark tracking-widest"
                style={{ fontFamily: "'Cinzel', serif", fontSize: '0.55rem', color: '#b8a080', letterSpacing: '0.2em' }}
              >
                HOGWARTS · {new Date().getFullYear()}
              </span>
            </div>
          </Link>

          {/* Decorative center element */}
          <div className="hidden sm:flex items-center gap-2 flex-shrink-0">
            <div className="gold-divider" />
            <span className="lightning-bolt">⚡</span>
            <span style={{ color: 'rgba(139,105,20,0.2)', fontSize: '0.6rem' }}>✦</span>
            <span className="lightning-bolt">⚡</span>
            <div className="gold-divider" />
          </div>

          {/* Nav items */}
          <div className="flex items-center gap-1">
            {navItems.map((item, i) => {
              const isActive = location.pathname === item.path;
              return (
                <div key={item.path} className="flex items-center gap-1">
                  {i > 0 && <div className="gold-divider hidden sm:block" />}
                  <Link
                    to={item.path}
                    className={`nav-link flex items-center gap-2 ${isActive ? "active" : ""}`}
                  >
                    {/* House color dot */}
                    <div
                      className="house-dot"
                      style={{
                        background: item.houseColor,
                        boxShadow: isActive ? `0 0 6px ${item.houseGlow}` : 'none',
                        animationDelay: `${i * 0.4}s`,
                      }}
                    />
                    {/* House icon */}
                    <img
                      src={item.icon}
                      alt={item.label}
                      className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0"
                      style={{
                        filter: isActive
                          ? `drop-shadow(0 0 4px ${item.accent})`
                          : 'grayscale(40%) brightness(0.7)',
                        transition: 'filter 0.25s ease',
                      }}
                    />
                    {/* Label — hide on mobile for the non-active items */}
                    <span className={`${isActive ? 'inline' : 'hidden sm:inline'}`}>
                      {item.label}
                    </span>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom edge glow line */}
        <div
          style={{
            position: 'absolute',
            bottom: 0, left: '10%', right: '10%',
            height: '1px',
            background: 'linear-gradient(90deg, transparent, rgba(139,105,20,0.3), rgba(139,105,20,0.5), rgba(139,105,20,0.3), transparent)',
            filter: 'blur(0.5px)',
          }}
        />
      </motion.nav>
    </>
  );
};

export default Navbar;