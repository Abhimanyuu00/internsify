import { Button } from "@/components/ui/button";
import { CheckCircle2, QrCode, ShieldCheck } from "lucide-react";

export function Certificate() {
  return (
    <section id="certificate" className="relative py-24 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-brand">Verified Certificate</p>
            <h2 className="mt-3 font-display text-4xl md:text-5xl font-bold">
              A certificate <span className="text-gradient">recruiters actually trust</span>
            </h2>
            <p className="mt-4 text-muted-foreground max-w-lg">
              Every certificate carries a unique ID, QR verification link and digital signature.
              Anyone can verify authenticity on our public verification page.
            </p>
            <ul className="mt-6 space-y-3 text-sm">
              {[
                "Unique Certificate ID & QR Code",
                "Public verification URL",
                "Custom internship duration (15–180 days)",
                "Auto-delivered to your inbox in hours",
              ].map((t) => (
                <li key={t} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 text-brand" />
                  <span>{t}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8 flex gap-3">
              <Button className="bg-brand-gradient text-white hover:opacity-90 shadow-soft">Enroll now</Button>
              <Button variant="outline">Verify a certificate</Button>
            </div>
          </div>

          {/* CSS-rendered certificate mockup */}
          <div className="relative animate-float">
            <div className="absolute -inset-6 rounded-3xl bg-brand-gradient opacity-30 blur-3xl" />
            <div className="relative aspect-[1.4/1] rounded-2xl border border-white/10 bg-[oklch(0.16_0.05_265)] p-8 text-white shadow-glow">
              <div className="absolute inset-3 rounded-xl border border-amber-300/40" />
              <div className="relative flex h-full flex-col">
                <div className="text-center">
                  <div className="text-[10px] tracking-[0.3em] text-amber-300/80">INTERNSIFY</div>
                  <div className="mt-3 font-display text-2xl font-bold text-amber-200">Certificate of Completion</div>
                  <div className="mx-auto mt-2 h-px w-24 bg-amber-300/40" />
                </div>
                <div className="mt-6 text-center text-xs text-white/60">This is to certify that</div>
                <div className="mt-1 text-center font-display text-2xl font-semibold">Aarav Sharma</div>
                <div className="mt-3 text-center text-xs text-white/60 max-w-sm mx-auto">
                  has successfully completed the <span className="text-white">Full Stack Development</span> internship of <span className="text-white">60 days</span> duration.
                </div>
                <div className="mt-auto flex items-end justify-between text-[10px] text-white/70">
                  <div>
                    <div className="font-semibold text-white/90">ID: INS-2K26-8421</div>
                    <div>Issued: 06 Jun 2026</div>
                  </div>
                  <div className="grid h-12 w-12 place-items-center rounded bg-white/10">
                    <QrCode className="h-7 w-7 text-amber-200" />
                  </div>
                  <div className="text-right">
                    <div className="italic text-amber-200">Internsify</div>
                    <div>Authorized Signatory</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute -right-4 -top-4 flex items-center gap-1.5 rounded-full bg-brand-gradient px-3 py-1.5 text-xs font-semibold text-white shadow-soft">
              <ShieldCheck className="h-3.5 w-3.5" /> Verified
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
