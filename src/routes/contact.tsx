import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Mail, Phone, MapPin, Instagram, Twitter, Send, Check } from "lucide-react";
import ctaBg from "@/assets/cta-bg.jpg";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Prabhas Pasupuleti" },
      { name: "description", content: "Get in touch with Prabhas Pasupuleti to start a video editing project — brand films, social ads, motion graphics." },
      { property: "og:title", content: "Contact — Prabhas Pasupuleti" },
      { property: "og:description", content: "Let's craft your next cinematic edit together." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", project: "", message: "" });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="relative bg-cinema pt-32 pb-24 overflow-hidden">
      <div className="pointer-events-none absolute inset-0 opacity-40">
        <img src={ctaBg} alt="" className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/60 to-background" />
      </div>

      <div className="relative max-w-6xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto">
          <div className="text-xs uppercase tracking-[0.2em] text-primary">Contact</div>
          <h1 className="mt-3 font-display text-4xl md:text-6xl font-semibold tracking-tight">
            Let&apos;s build your <span className="text-gradient-accent italic">next cut</span>.
          </h1>
          <p className="mt-4 text-muted-foreground">
            Available for commercial, social, and long-form editing projects worldwide. Reply within 24 hours.
          </p>
        </div>

        <div className="mt-14 grid gap-8 lg:grid-cols-[1fr_1.3fr]">
          {/* Contact info */}
          <div className="space-y-4">
            {[
              { icon: Mail, label: "Email", value: "prabhaspasupuleti@gmail.com", href: "mailto:prabhaspasupuleti@gmail.com" },
              { icon: Phone, label: "Phone", value: "+91 87121 65611", href: "tel:+918712165611" },
              { icon: MapPin, label: "Location", value: "Hyderabad, India" },
              { icon: Instagram, label: "Instagram", value: "@prabhas.pasupuleti", href: "https://instagram.com/prabhas.pasupuleti" },
              { icon: Twitter, label: "X (Twitter)", value: "@prabhasnaidu30", href: "https://x.com/prabhasnaidu30" },
            ].map((c) => {
              const Inner = (
                <div className="flex items-center gap-4 rounded-2xl border border-border/50 bg-surface/50 backdrop-blur p-4 hover:border-primary/40 transition">
                  <div className="h-11 w-11 rounded-xl bg-gradient-to-br from-primary/20 to-ember/20 border border-primary/20 flex items-center justify-center">
                    <c.icon className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">{c.label}</div>
                    <div className="text-sm font-medium">{c.value}</div>
                  </div>
                </div>
              );
              return c.href ? (
                <a key={c.label} href={c.href} target={c.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer">
                  {Inner}
                </a>
              ) : (
                <div key={c.label}>{Inner}</div>
              );
            })}
          </div>

          {/* Form */}
          <form
            onSubmit={submit}
            className="rounded-3xl border border-border/50 bg-surface/60 backdrop-blur p-6 md:p-8 space-y-5 shadow-cinema"
          >
            {sent ? (
              <div className="text-center py-16">
                <div className="mx-auto h-14 w-14 rounded-full bg-primary/15 border border-primary/30 flex items-center justify-center glow-teal">
                  <Check className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mt-6 font-display text-2xl font-semibold">Message received.</h3>
                <p className="mt-2 text-muted-foreground">I&apos;ll get back to you within 24 hours.</p>
              </div>
            ) : (
              <>
                <div className="grid md:grid-cols-2 gap-5">
                  <Field label="Your name">
                    <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={inputCls} placeholder="Jane Doe" />
                  </Field>
                  <Field label="Email">
                    <input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className={inputCls} placeholder="jane@studio.com" />
                  </Field>
                </div>
                <Field label="Project type">
                  <select value={form.project} onChange={(e) => setForm({ ...form, project: e.target.value })} className={inputCls} required>
                    <option value="">Choose one…</option>
                    <option>Brand Commercial</option>
                    <option>Social Media Ad</option>
                    <option>Corporate / Founders</option>
                    <option>Product Video</option>
                    <option>YouTube Editing</option>
                    <option>Motion Graphics</option>
                  </select>
                </Field>
                <Field label="Tell me about your project">
                  <textarea required rows={5} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className={`${inputCls} resize-none`} placeholder="Timelines, deliverables, references…" />
                </Field>
                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-primary to-ember py-3.5 text-sm font-semibold text-primary-foreground hover:opacity-95 transition"
                >
                  Send message <Send className="h-4 w-4" />
                </button>
              </>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

const inputCls =
  "w-full rounded-xl border border-border/60 bg-background/60 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/60 focus:ring-2 focus:ring-primary/20 transition";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <div className="mb-1.5 text-xs uppercase tracking-[0.15em] text-muted-foreground">{label}</div>
      {children}
    </label>
  );
}
