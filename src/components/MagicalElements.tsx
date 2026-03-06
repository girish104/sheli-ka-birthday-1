import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface MagicalItem {
  id: number;
  type: "snitch" | "spark" | "candle" | "patronus";
  left: number;
  top: number;
  delay: number;
  size: number;
}

const snitchPath = (
  <svg viewBox="0 0 40 40" fill="none" className="w-full h-full">
    <circle cx="20" cy="20" r="6" fill="hsl(43, 96%, 56%)" />
    <ellipse cx="20" cy="20" rx="6" ry="5.5" fill="hsl(43, 96%, 66%)" opacity="0.6" />
    {/* Wings */}
    <path d="M14 18 Q6 10 4 16 Q6 14 14 20Z" fill="hsl(43, 96%, 76%)" opacity="0.7" />
    <path d="M26 18 Q34 10 36 16 Q34 14 26 20Z" fill="hsl(43, 96%, 76%)" opacity="0.7" />
    <circle cx="18" cy="18" r="1.5" fill="hsl(43, 100%, 80%)" opacity="0.8" />
  </svg>
);

const patronusSilhouette = (
  <svg viewBox="0 0 40 40" fill="none" className="w-full h-full" opacity="0.3">
    {/* Deer silhouette */}
    <path
      d="M12 34 L14 24 L16 22 L15 16 L18 12 L20 8 L22 12 L25 16 L24 22 L26 24 L28 34 M15 16 L12 10 L13 8 M25 16 L28 10 L27 8"
      stroke="hsl(200, 80%, 75%)"
      strokeWidth="1.5"
      strokeLinecap="round"
      fill="none"
    />
  </svg>
);

const MagicalElements = () => {
  const [items, setItems] = useState<MagicalItem[]>([]);

  useEffect(() => {
    const elements: MagicalItem[] = [];
    // 4 snitches
    for (let i = 0; i < 4; i++) {
      elements.push({
        id: i,
        type: "snitch",
        left: 10 + Math.random() * 80,
        top: 10 + Math.random() * 80,
        delay: Math.random() * 4,
        size: 20 + Math.random() * 12,
      });
    }
    // 6 sparks
    for (let i = 4; i < 10; i++) {
      elements.push({
        id: i,
        type: "spark",
        left: Math.random() * 100,
        top: Math.random() * 100,
        delay: Math.random() * 3,
        size: 4 + Math.random() * 6,
      });
    }
    // 3 floating candles (corners)
    for (let i = 10; i < 13; i++) {
      elements.push({
        id: i,
        type: "candle",
        left: i === 10 ? 3 : i === 11 ? 95 : 50,
        top: i === 12 ? 5 : 15 + Math.random() * 30,
        delay: Math.random() * 2,
        size: 28 + Math.random() * 10,
      });
    }
    // 2 patronus
    for (let i = 13; i < 15; i++) {
      elements.push({
        id: i,
        type: "patronus",
        left: 20 + Math.random() * 60,
        top: 30 + Math.random() * 50,
        delay: Math.random() * 5,
        size: 30 + Math.random() * 15,
      });
    }
    setItems(elements);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[1] overflow-hidden">
      {items.map((item) => {
        if (item.type === "snitch") {
          return (
            <motion.div
              key={item.id}
              className="absolute"
              style={{ left: `${item.left}%`, top: `${item.top}%`, width: item.size, height: item.size }}
              animate={{
                x: [0, 30, -20, 15, 0],
                y: [0, -25, 10, -15, 0],
                rotate: [0, 10, -10, 5, 0],
              }}
              transition={{ duration: 6 + item.delay, repeat: Infinity, ease: "easeInOut" }}
            >
              <div className="golden-glow-dot">{snitchPath}</div>
            </motion.div>
          );
        }
        if (item.type === "spark") {
          return (
            <motion.div
              key={item.id}
              className="absolute rounded-full"
              style={{
                left: `${item.left}%`,
                top: `${item.top}%`,
                width: item.size,
                height: item.size,
                background: `radial-gradient(circle, hsl(43, 96%, 76%) 0%, transparent 70%)`,
              }}
              animate={{ opacity: [0, 1, 0], scale: [0.5, 1.2, 0.5] }}
              transition={{ duration: 1.5 + item.delay, repeat: Infinity, ease: "easeInOut" }}
            />
          );
        }
        if (item.type === "candle") {
          return (
            <motion.div
              key={item.id}
              className="absolute flex flex-col items-center"
              style={{ left: `${item.left}%`, top: `${item.top}%` }}
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3 + item.delay, repeat: Infinity, ease: "easeInOut" }}
            >
              <div className="candle-flame" style={{ width: 6, height: 10 }} />
              <div
                className="rounded-sm opacity-50"
                style={{
                  width: 4,
                  height: item.size,
                  background: "linear-gradient(to bottom, hsl(45, 80%, 80%), hsl(45, 60%, 65%))",
                }}
              />
            </motion.div>
          );
        }
        if (item.type === "patronus") {
          return (
            <motion.div
              key={item.id}
              className="absolute"
              style={{ left: `${item.left}%`, top: `${item.top}%`, width: item.size, height: item.size }}
              animate={{ opacity: [0.1, 0.3, 0.1], x: [0, 20, 0] }}
              transition={{ duration: 8 + item.delay, repeat: Infinity, ease: "easeInOut" }}
            >
              <div className="patronus-glow">{patronusSilhouette}</div>
            </motion.div>
          );
        }
        return null;
      })}
    </div>
  );
};

export default MagicalElements;
