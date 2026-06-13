import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqs = [
  { q: "How much does an internship cost?", a: "All Internsify programs are flat ₹289 regardless of duration or domain." },
  { q: "Is the certificate recognized?", a: "Yes. Each certificate has a unique ID, QR code, and public verification URL recruiters can check." },
  { q: "Can I choose a custom duration?", a: "Yes — pick any duration between 15 and 180 days. Your selected duration prints on the certificate." },
  { q: "What payment methods are supported?", a: "We accept UPI only. Scan the UPI QR, pay ₹289, and upload your payment screenshot — we verify and activate your internship within minutes." },
  { q: "When will I receive my certificate?", a: "Within 2–3 hours of completing all program requirements, sent to your registered email." },
  { q: "Is there a refund policy?", a: "Yes, full refund within 24 hours of payment if you haven't accessed program content." },
];

export function Faq() {
  return (
    <section id="faq" className="py-24">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-brand">FAQ</p>
          <h2 className="mt-3 font-display text-4xl md:text-5xl font-bold">Questions, answered</h2>
        </div>
        <Accordion type="single" collapsible className="mx-auto mt-10 max-w-2xl">
          {faqs.map((f, i) => (
            <AccordionItem key={i} value={`item-${i}`} className="border-border">
              <AccordionTrigger className="text-left font-medium">{f.q}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">{f.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
