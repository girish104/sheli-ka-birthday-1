import gryffindorIcon from "@/assets/harrypotter/gryffindor.svg";

const Footer = () => (
  <footer className="w-full py-6 bg-yellow-50 text-amber-900 flex flex-col items-center gap-2 mt-8">
    <img src={gryffindorIcon} alt="Gryffindor" className="w-8 h-8 mb-2" />
    <span className="font-heading text-lg">Made with magic for Sheli's Birthday</span>
    <span className="text-xs">© {new Date().getFullYear()} Hogwarts Express</span>
  </footer>
);

export default Footer;
