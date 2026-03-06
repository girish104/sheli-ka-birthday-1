import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Cake, PartyPopper, MessageCircleHeart } from "lucide-react";

const navItems = [
  { path: "/", label: "🏠 Home", icon: PartyPopper },
  { path: "/roasts", label: "🔥 Roasts", icon: MessageCircleHeart },
  { path: "/celebrate", label: "🎂 Celebrate", icon: Cake },
];

const Navbar = () => {
  const location = useLocation();

  return (
    <motion.nav
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", bounce: 0.4 }}
      className="fixed top-0 left-0 right-0 z-50 bg-gradient-desi shadow-lg"
    >
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="font-heading text-xl font-bold text-primary-foreground">
          🎉 Birthday Bash
        </Link>
        <div className="flex gap-1 sm:gap-3">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`px-3 py-2 rounded-full text-sm font-semibold transition-all duration-300 font-heading ${
                location.pathname === item.path
                  ? "bg-primary-foreground text-primary scale-105"
                  : "text-primary-foreground hover:bg-primary-foreground/20"
              }`}
            >
              <span className="hidden sm:inline">{item.label}</span>
              <span className="sm:hidden">
                <item.icon className="w-5 h-5" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
