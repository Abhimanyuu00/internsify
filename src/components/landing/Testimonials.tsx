import { Star } from "lucide-react";

const items = [
  { name: "Priya Nair", role: "CSE, NIT Trichy", quote: "The Full Stack internship gave me real projects to put on my resume. Got shortlisted at 3 companies." },
  { name: "Rahul Verma", role: "ECE, VIT Vellore", quote: "Loved the flexibility — finished my 45-day internship around college. Certificate looks legit." },
  { name: "Sneha Iyer", role: "IT, SRM", quote: "₹289 felt unreal for the quality. Mentors actually reviewed my project submission." },
];

export function Testimonials() {
  return (
    <section className="py-24 bg-muted/40">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-brand">Loved by students</p>
          <h2 className="mt-3 font-display text-4xl md:text-5xl font-bold">Stories from real interns</h2>
        </div>
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {items.map((t) => (
            <figure key={t.name} className="rounded-2xl border border-border bg-card p-6 shadow-soft">
              <div className="flex gap-0.5 text-amber-400">
                {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-4 w-4 fill-current" />)}
              </div>
              <blockquote className="mt-4 text-sm leading-relaxed text-foreground">"{t.quote}"</blockquote>
              <figcaption className="mt-5 flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-full bg-brand-gradient font-semibold text-white">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <div className="text-sm font-semibold">{t.name}</div>
                  <div className="text-xs text-muted-foreground">{t.role}</div>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
