import { motion } from "framer-motion";

type House = "gryffindor" | "ravenclaw" | "hufflepuff" | "slytherin";

interface HouseDividerProps {
  house: House;
}

const houseData: Record<House, { icon: string; colors: [string, string] }> = {
  gryffindor: { icon: "🦁", colors: ["hsl(0, 70%, 45%)", "hsl(43, 96%, 56%)"] },
  ravenclaw: { icon: "🦅", colors: ["hsl(220, 60%, 40%)", "hsl(38, 50%, 65%)"] },
  hufflepuff: { icon: "🦡", colors: ["hsl(43, 96%, 56%)", "hsl(30, 30%, 25%)"] },
  slytherin: { icon: "🐍", colors: ["hsl(140, 50%, 35%)", "hsl(0, 0%, 75%)"] },
};

const HouseDivider = ({ house }: HouseDividerProps) => {
  const { icon, colors } = houseData[house];

  return (
    <motion.div
      initial={{ opacity: 0, scaleX: 0 }}
      whileInView={{ opacity: 1, scaleX: 1 }}
      viewport={{ once: true }}
      className="flex items-center gap-4 my-8 mx-auto max-w-xl px-4"
    >
      <div
        className="flex-1 h-[2px]"
        style={{ background: `linear-gradient(to right, transparent, ${colors[0]})` }}
      />
      <div
        className="w-12 h-12 rounded-full flex items-center justify-center text-2xl border-2 gold-foil-accent"
        style={{ borderColor: colors[1], background: `${colors[0]}22` }}
      >
        {icon}
      </div>
      <div
        className="flex-1 h-[2px]"
        style={{ background: `linear-gradient(to left, transparent, ${colors[0]})` }}
      />
    </motion.div>
  );
};

export default HouseDivider;
