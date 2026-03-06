import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import heroBg from "@/assets/hero-bg.jpg";
import FloatingParticles from "@/components/FloatingParticles";
import confetti from "canvas-confetti";

const SISTER_NAME = "[Her Name]";
const AGE = 25;

const placeholderPhotos = [
  "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=400&h=400&fit=crop",
];

const funCaptions = [
  "Bachpan ka swag 💅",
  "Drama queen since day 1 🎭",
  "Nautanki level: Expert 😜",
  "Mummy ki favourite (supposedly) 🤫",
  "Selfie game strong 📸",
  "Shaadi ke sapne 💍😂",
];

const HomePage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % placeholderPhotos.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const handleNameClick = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.3 },
      colors: ["#e91e8c", "#f59e0b", "#ef6c00", "#ffd700"],
    });
  };

  return (
    <div className="min-h-screen pt-16 relative overflow-hidden">
      <FloatingParticles />

      {/* Hero Section */}
      <section
        className="relative min-h-[80vh] flex items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: `url(${heroBg})` }}
      >
        <div className="absolute inset-0 bg-foreground/40" />
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <motion.div
            initial={{ scale: 0.3, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", bounce: 0.5, duration: 0.8 }}
          >
            <p className="text-primary-foreground text-lg sm:text-xl mb-2 font-heading animate-shimmer">
              🎉 Aaj ka din hai bohot khaas 🎉
            </p>
            <h1
              className="text-5xl sm:text-7xl md:text-8xl font-heading font-extrabold text-primary-foreground text-3d cursor-pointer leading-tight"
              onClick={handleNameClick}
            >
              Happy Birthday
              <br />
              <span className="text-festive-yellow">{SISTER_NAME}</span> 🎂
            </h1>
          </motion.div>

          <motion.p
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-6 text-xl sm:text-2xl text-primary-foreground/90 font-hindi italic"
          >
            "Umr badal gayi par nautanki wahi purani 😜"
          </motion.p>

          <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-8 inline-block card-desi px-8 py-4 glow-magenta"
          >
            <p className="text-lg font-heading font-bold text-foreground">
              🏆 Survived <span className="text-magenta text-3xl font-extrabold">{AGE}</span> years
            </p>
            <p className="text-muted-foreground text-sm">of mummy ke dhamkiyan 🩴</p>
          </motion.div>
        </div>
      </section>

      {/* Photo Carousel */}
      <section className="py-16 px-4">
        <h2 className="text-4xl font-heading font-bold text-center text-gradient-desi mb-10">
          📸 Yaadon Ka Pitara 📸
        </h2>

        <div className="max-w-lg mx-auto relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 80, rotate: 5 }}
              animate={{ opacity: 1, x: 0, rotate: 0 }}
              exit={{ opacity: 0, x: -80, rotate: -5 }}
              transition={{ duration: 0.5 }}
              className="card-desi p-4"
            >
              <img
                src={placeholderPhotos[currentSlide]}
                alt={`Photo ${currentSlide + 1}`}
                className="w-full h-80 object-cover rounded-xl"
              />
              <p className="mt-3 text-center font-heading text-lg font-semibold text-foreground">
                {funCaptions[currentSlide]}
              </p>
            </motion.div>
          </AnimatePresence>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-6">
            {placeholderPhotos.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentSlide(i)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  i === currentSlide
                    ? "bg-magenta scale-125"
                    : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Fun Stats */}
      <section className="py-12 px-4 bg-gradient-desi">
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { num: AGE, label: "Saal Ki Ho Gayi", emoji: "🎂" },
            { num: "∞", label: "Nautankiyan", emoji: "🎭" },
            { num: "999+", label: "Selfies Leli", emoji: "🤳" },
            { num: "0", label: "Cooking Skills", emoji: "👩‍🍳" },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, type: "spring" }}
              className="text-center p-4 rounded-2xl bg-primary-foreground/10 backdrop-blur-sm"
            >
              <p className="text-3xl">{stat.emoji}</p>
              <p className="text-3xl font-heading font-extrabold text-primary-foreground">
                {stat.num}
              </p>
              <p className="text-primary-foreground/80 text-sm font-medium">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
