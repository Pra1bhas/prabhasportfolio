import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X, Film } from "lucide-react";

const links = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/works", label: "Works" },
  { to: "/toolkit", label: "Toolkit" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteNav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? "backdrop-blur-xl bg-background/70 border-b border-border/50"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        <Link to="/" className="flex items-center gap-2 group">
          <span className="relative flex h-9 w-9 items-center justify-center rounded-lg bg-cinema border border-primary/30">
            <Film className="h-4 w-4 text-primary" />
            <span className="absolute inset-0 rounded-lg bg-primary/10 blur-md opacity-0 group-hover:opacity-100 transition" />
          </span>
          <div className="leading-tight">
            <div className="font-display font-semibold text-sm tracking-wide">Prabhas</div>
            <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              Video Editor
            </div>
          </div>
        </Link>

        <div className="hidden md:flex items-center gap-1 rounded-full border border-border/50 bg-surface/40 backdrop-blur px-2 py-1">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="px-4 py-1.5 text-sm text-muted-foreground rounded-full transition hover:text-foreground data-[status=active]:text-primary-foreground data-[status=active]:bg-primary/90"
              activeOptions={{ exact: true }}
            >
              {l.label}
            </Link>
          ))}
        </div>

        <Link
          to="/contact"
          className="hidden md:inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-primary-foreground bg-gradient-to-r from-primary to-ember hover:opacity-90 transition"
        >
          Let&apos;s Talk
        </Link>

        <button
          className="md:hidden text-foreground p-2"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {open && (
        <div className="md:hidden border-t border-border/40 bg-background/95 backdrop-blur-xl">
          <div className="flex flex-col p-4 gap-1">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="px-4 py-3 text-sm rounded-lg hover:bg-surface data-[status=active]:text-primary"
                activeOptions={{ exact: true }}
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
