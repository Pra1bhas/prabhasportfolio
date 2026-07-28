import { Link } from "@tanstack/react-router";
import { Instagram, Twitter, Mail, Phone, MapPin } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="border-t border-border/50 bg-background/60">
      <div className="max-w-7xl mx-auto px-6 py-12 grid gap-10 md:grid-cols-3">
        <div>
          <div className="font-display text-lg font-semibold">Prabhas Pasupuleti</div>
          <p className="text-sm text-muted-foreground mt-2 max-w-xs">
            Creative video editor crafting cinematic stories for brands and creators worldwide.
          </p>
        </div>
        <div className="text-sm space-y-2 text-muted-foreground">
          <div className="flex items-center gap-2"><MapPin className="h-4 w-4 text-primary" /> Hyderabad, India</div>
          <a href="mailto:prabhaspasupuleti@gmail.com" className="flex items-center gap-2 hover:text-foreground"><Mail className="h-4 w-4 text-primary" /> prabhaspasupuleti@gmail.com</a>
          <a href="tel:+918712165611" className="flex items-center gap-2 hover:text-foreground"><Phone className="h-4 w-4 text-primary" /> +91 87121 65611</a>
        </div>
        <div className="flex md:justify-end items-start gap-3">
          <a href="https://instagram.com/prabhas.pasupuleti" target="_blank" rel="noreferrer" aria-label="Instagram" className="h-10 w-10 grid place-items-center rounded-full border border-border/60 hover:border-primary hover:text-primary transition">
            <Instagram className="h-4 w-4" />
          </a>
          <a href="https://x.com/prabhasnaidu30" target="_blank" rel="noreferrer" aria-label="X" className="h-10 w-10 grid place-items-center rounded-full border border-border/60 hover:border-primary hover:text-primary transition">
            <Twitter className="h-4 w-4" />
          </a>
        </div>
      </div>
      <div className="border-t border-border/40 py-5 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} Prabhas Pasupuleti · <Link to="/contact" className="hover:text-primary">Start a project</Link>
      </div>
    </footer>
  );
}
