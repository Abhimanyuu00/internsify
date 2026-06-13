import { GraduationCap } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border bg-muted/30 py-12">
      <div className="container mx-auto px-4">
        <div className="grid gap-10 md:grid-cols-4">
          <div>
            <a href="#" className="flex items-center gap-2 font-display font-bold text-foreground">
              <span className="grid h-8 w-8 place-items-center rounded-lg bg-brand-gradient shadow-soft">
                <GraduationCap className="h-4 w-4 text-white" />
              </span>
              Internsify
            </a>
            <p className="mt-4 text-sm text-muted-foreground max-w-xs">
              Industry-ready online internships with verified certificates for students across India.
            </p>
          </div>
          {[
            { h: "Platform", l: ["Programs", "How it works", "Certificate", "Verify"] },
            { h: "Company", l: ["About", "Blog", "Contact", "Careers"] },
            { h: "Legal", l: ["Terms", "Privacy", "Refund Policy", "Contact"] },
          ].map((c) => (
            <div key={c.h}>
              <div className="font-semibold text-sm">{c.h}</div>
              <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                {c.l.map((i) => <li key={i}><a href="#" className="hover:text-foreground transition">{i}</a></li>)}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 border-t border-border pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
          <div>© {new Date().getFullYear()} Internsify. All rights reserved.</div>
          <div>Made with care in India 🇮🇳</div>
        </div>
      </div>
    </footer>
  );
}
