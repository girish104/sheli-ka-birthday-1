import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import cakeImg from "@/assets/cake.png";
import FloatingParticles from "@/components/FloatingParticles";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface GuestMessage {
  name: string;
  message: string;
  id: number;
}

const CelebratePage = () => {
  const [cakeCut, setCakeCut] = useState(false);
  const [guestName, setGuestName] = useState("");
  const [guestMsg, setGuestMsg] = useState("");
  const [messages, setMessages] = useState<GuestMessage[]>([
    { id: 1, name: "Bhai", message: "Zyada udna mat, mummy bata dunga 😂" },
    { id: 2, name: "Papa", message: "Beta party ka bill tum dogi na? 🤔" },
    { id: 3, name: "Best Friend", message: "Tu meri wali dress pehenke aana mat! 👗😤" },
  ]);

  const handleCakeCut = () => {
    setCakeCut(true);

    // Epic confetti blast
    const duration = 4000;
    const end = Date.now() + duration;
    const colors = ["#e91e8c", "#f59e0b", "#ef6c00", "#ffd700", "#ff1493"];

    const frame = () => {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors,
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors,
      });
      if (Date.now() < end) requestAnimationFrame(frame);
    };
    frame();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestName.trim() || !guestMsg.trim()) return;
    setMessages((prev) => [
      { id: Date.now(), name: guestName, message: guestMsg },
      ...prev,
    ]);
    setGuestName("");
    setGuestMsg("");
    confetti({ particleCount: 30, spread: 60, origin: { y: 0.8 } });
  };

  return (
    <div className="min-h-screen pt-20 pb-16 relative">
      <FloatingParticles />

      <div className="container mx-auto px-4">
        {/* Cake Section */}
        <motion.div
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl sm:text-5xl font-heading font-extrabold text-gradient-desi">
            🎂 Cake Cutting Time! 🎂
          </h1>
          <p className="text-muted-foreground mt-2 font-hindi text-lg">
            "Pehle cake kaat, phir selfie le 📸"
          </p>
        </motion.div>

        <div className="max-w-md mx-auto text-center mb-16">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={!cakeCut ? handleCakeCut : undefined}
            className={`cursor-pointer relative inline-block ${!cakeCut ? "animate-pulse-glow rounded-full" : ""}`}
          >
            <img
              src={cakeImg}
              alt="Birthday Cake"
              className="w-64 h-64 object-contain mx-auto drop-shadow-2xl"
            />
            {!cakeCut && (
              <motion.p
                animate={{ y: [0, -8, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
                className="mt-4 font-heading text-xl font-bold text-magenta"
              >
                👆 Cake pe click kar ke kaat! 🔪
              </motion.p>
            )}
          </motion.div>

          <AnimatePresence>
            {cakeCut && (
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", bounce: 0.5 }}
                className="mt-6"
              >
                <p className="text-5xl mb-3">🎉🥳🎊</p>
                <h2 className="text-3xl font-heading font-extrabold text-gradient-desi">
                  Happy Birthday Didi! 🎂
                </h2>
                <p className="text-muted-foreground mt-2 font-hindi">
                  "Baar baar din ye aaye, baar baar dil ye gaaye" 🎶
                </p>

                {/* YouTube embed option */}
                <div className="mt-6 card-desi p-4">
                  <p className="font-heading font-semibold mb-3 text-foreground">🎵 Birthday Song 🎵</p>
                  <iframe
                    width="100%"
                    height="200"
                    src="https://www.youtube.com/embed/77dqwMIlo8g?autoplay=0"
                    title="Happy Birthday Song"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="rounded-xl"
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Guestbook */}
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-heading font-bold text-center text-gradient-desi mb-8">
            📝 Birthday Guestbook 📝
          </h2>

          <form onSubmit={handleSubmit} className="card-desi p-6 mb-8">
            <div className="space-y-4">
              <div>
                <label className="font-heading font-semibold text-foreground text-sm">
                  Tera Naam 👤
                </label>
                <Input
                  value={guestName}
                  onChange={(e) => setGuestName(e.target.value)}
                  placeholder="Naam daal re..."
                  className="mt-1 border-primary/30 focus:border-primary"
                />
              </div>
              <div>
                <label className="font-heading font-semibold text-foreground text-sm">
                  Birthday Message 💌
                </label>
                <Textarea
                  value={guestMsg}
                  onChange={(e) => setGuestMsg(e.target.value)}
                  placeholder="Kuch funny likh de yaar..."
                  rows={3}
                  className="mt-1 border-primary/30 focus:border-primary"
                />
              </div>
              <Button type="submit" className="w-full bg-gradient-desi text-primary-foreground font-heading font-bold text-lg hover:opacity-90 transition-opacity">
                Bhej De! 🚀
              </Button>
            </div>
          </form>

          <div className="space-y-4">
            <AnimatePresence>
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 30 }}
                  className="card-desi p-4 hover-bounce"
                >
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">🗣️</span>
                    <div>
                      <p className="font-heading font-bold text-foreground">{msg.name}</p>
                      <p className="text-muted-foreground text-sm mt-1">{msg.message}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CelebratePage;
