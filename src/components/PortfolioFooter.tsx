import { Github, Linkedin, Twitter, Heart } from "lucide-react";
import MatrixRain from "./MatrixRain";

const links = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

const socials = [
  { icon: Github, href: "#", label: "GitHub" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
  { icon: Twitter, href: "#", label: "Twitter" },
];

const PortfolioFooter = () => {
  return (
    <footer className="border-t border-border px-6 py-12 relative overflow-hidden">
      <MatrixRain />
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
        <div className="text-center md:text-left">
          <p className="font-bold gradient-text text-lg">Sarwan.dev</p>
          <p className="text-xs text-muted-foreground mt-1">
            Built with <Heart size={10} className="inline text-primary" /> by Sarwan · EllowDigital
          </p>
        </div>

        <nav className="flex gap-6">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex gap-3">
          {socials.map(({ icon: Icon, href, label }) => (
            <a key={label} href={href} aria-label={label} className="text-muted-foreground hover:text-primary transition-colors">
              <Icon size={16} />
            </a>
          ))}
        </div>
      </div>
      <div className="text-center mt-8 text-xs text-muted-foreground relative z-10">
        © {new Date().getFullYear()} Sarwan. All rights reserved.
      </div>
    </footer>
  );
};

export default PortfolioFooter;
