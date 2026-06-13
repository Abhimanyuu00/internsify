import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, ShieldCheck, Star } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden pt-32 pb-24 text-white">
      <img
        src={heroBg}
        alt=""
        aria-hidden
        width={1920}
        height={1280}
        className="absolute inset-0 -z-10 h-full w-full object-cover opacity-90"
      />
      <div className="absolute inset-0 -z-10 bg-hero opacity-80" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,transparent,oklch(0.13_0.03_265)_75%)]" />

      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs backdrop-blur">
            <Sparkles className="h-3.5 w-3.5 text-brand-glow" />
            <span className="text-white/80">Trusted by 25,000+ students across India</span>
          </div>

          <h1 className="mt-6 font-display text-5xl sm:text-6xl md:text-7xl font-bold leading-[1.05]">
            Launch your career with{" "}
            <span className="text-gradient">industry-ready</span> online internships
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-white/70">
            Choose from 50+ internship domains, learn at your own pace, and receive a
            verified certificate — starting at just <span className="font-semibold text-white">₹289</span>.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Button size="lg" className="bg-brand-gradient text-white hover:opacity-90 shadow-glow h-12 px-6">
              Start Internship <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline" className="h-12 px-6 border-white/20 bg-white/5 text-white hover:bg-white/10">
              Browse Programs
            </Button>
          </div>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-white/60">
            <div className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-brand-glow" /> Verified Certificate</div>
            <div className="flex items-center gap-2"><Star className="h-4 w-4 text-brand-glow" /> 4.8/5 average rating</div>
            <div className="flex items-center gap-2"><Sparkles className="h-4 w-4 text-brand-glow" /> ISO-aligned curriculum</div>
          </div>
        </div>

        {/* Stats */}
        <div className="mx-auto mt-20 grid max-w-4xl grid-cols-2 gap-4 md:grid-cols-4">
          {[
            { v: "25K+", l: "Students enrolled" },
            { v: "50+", l: "Internship domains" },
            { v: "180+", l: "Partner colleges" },
            { v: "98%", l: "Completion rate" },
          ].map((s) => (
            <div key={s.l} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-5 text-center backdrop-blur">
              <div className="font-display text-3xl font-bold text-white">{s.v}</div>
              <div className="mt-1 text-xs uppercase tracking-wider text-white/60">{s.l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
