import { motion } from "framer-motion";
import FloatingParticles from "@/components/FloatingParticles";
import HouseDivider from "@/components/HouseDivider";

const roasts = [
  {
    caption: "Class mein topper thi, ab Instagram pe topper 📱",
    emoji: "🏆",
    color: "from-magenta to-saffron",
  },
  {
    caption: "Shaadi ke liye age perfect, par ladka reject 💔😂",
    emoji: "💍",
    color: "from-saffron to-gold",
  },
  {
    caption: "Paisa kharchne mein PhD 🛍️",
    emoji: "💸",
    color: "from-magenta to-magenta-glow",
  },
  {
    caption: "Diet start karungi Monday se... har Monday se 🍕",
    emoji: "🍔",
    color: "from-saffron to-magenta",
  },
  {
    caption: "Jitni der phone pe, utni der pooja mein bhi kar le 📿",
    emoji: "📱",
    color: "from-gold to-saffron",
  },
  {
    caption: "Bathroom mein 2 ghante, ready phir bhi nahi 💄",
    emoji: "🪞",
    color: "from-magenta-glow to-magenta",
  },
  {
    caption: "Mummy se ladai, 5 min baad: Mummy khaana kya hai? 🥘",
    emoji: "👩‍🍳",
    color: "from-saffron to-gold",
  },
  {
    caption: "Bhai ki har cheez chahiye, apni koi share nahi karegi 😤",
    emoji: "🤺",
    color: "from-magenta to-saffron",
  },
  {
    caption: "Feelings express karne mein Shakespeare, kaam karne mein sust 😴",
    emoji: "📝",
    color: "from-gold to-magenta",
  },
  {
    caption: "Papa ki pari, mummy ki headache 👑",
    emoji: "👸",
    color: "from-magenta-glow to-gold",
  },
];

const RoastsPage = () => {
  return (
    <div className="min-h-screen pt-20 pb-16 relative parchment-overlay">
      <FloatingParticles />

      <div className="container mx-auto px-4">
        <motion.div
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl sm:text-5xl font-heading font-extrabold text-gradient-desi">
            🔥 Roast & Memories 🔥
          </h1>
          <p className="text-muted-foreground mt-2 font-hindi text-lg">
            "Pyaar se, par savage tarike se 😈"
          </p>
        </motion.div>

        <HouseDivider house="ravenclaw" />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {roasts.map((roast, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40, rotate: i % 2 === 0 ? -2 : 2 }}
              whileInView={{ opacity: 1, y: 0, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, type: "spring", bounce: 0.3 }}
              whileHover={{ scale: 1.05, rotate: -1 }}
              className="card-desi p-6 cursor-pointer group lumos-hover">
            >
              <div
                className={`w-16 h-16 rounded-full bg-gradient-to-br ${roast.color} flex items-center justify-center text-3xl mx-auto mb-4 group-hover:animate-wiggle`}
              >
                {roast.emoji}
              </div>
              <p className="text-center font-heading text-lg font-bold text-foreground leading-snug">
                {roast.caption}
              </p>
              <div className="mt-3 text-center">
                <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold">
                  #{i + 1} Savage Moment
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-16 card-desi max-w-xl mx-auto p-8"
        >
          <p className="text-5xl mb-4">❤️</p>
          <p className="font-heading text-xl font-bold text-foreground">
            Par end mein, tu sabse best hai! 🥹
          </p>
          <p className="text-muted-foreground mt-2 font-hindi">
            "Roast toh karna padta hai, love toh hai hi unconditional 💕"
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default RoastsPage;
