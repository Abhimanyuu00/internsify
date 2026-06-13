import { Compass, CreditCard, BookOpenCheck, Award } from "lucide-react";

const steps = [
  { icon: Compass, title: "Choose your domain", desc: "Pick from 50+ industry internships across tech & engineering." },
  { icon: CreditCard, title: "Pay ₹289 via UPI", desc: "Scan our UPI QR, pay ₹289, and upload your payment screenshot to confirm." },
  { icon: BookOpenCheck, title: "Learn & build", desc: "Video lessons, assignments, MCQs and a capstone project." },
  { icon: Award, title: "Get verified certificate", desc: "Auto-issued PDF certificate, emailed within hours." },
];

export function HowItWorks() {
  return (
    <section id="how" className="relative py-24 bg-muted/40">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-brand">How it works</p>
          <h2 className="mt-3 font-display text-4xl md:text-5xl font-bold">From enroll to certified in 4 steps</h2>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <div key={s.title} className="relative rounded-2xl border border-border bg-card p-6 shadow-soft">
              <div className="absolute -top-4 left-6 grid h-8 w-8 place-items-center rounded-full bg-brand-gradient text-xs font-bold text-white shadow-soft">
                {i + 1}
              </div>
              <s.icon className="h-7 w-7 text-brand" />
              <h3 className="mt-4 font-display text-lg font-semibold">{s.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
