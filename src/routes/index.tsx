import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/landing/Navbar";
import { Hero } from "@/components/landing/Hero";
import { Programs } from "@/components/landing/Programs";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { Certificate } from "@/components/landing/Certificate";
import { Testimonials } from "@/components/landing/Testimonials";
import { Faq } from "@/components/landing/Faq";
import { CtaVerify } from "@/components/landing/CtaVerify";
import { PaymentUpi } from "@/components/landing/PaymentUpi";
import { Footer } from "@/components/landing/Footer";
import { ChatWidget } from "@/components/ChatWidget";
import { Toaster } from "@/components/ui/sonner";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Internsify — Industry-Ready Online Internships with Verified Certificates" },
      { name: "description", content: "Choose from 50+ internship domains, learn online, and earn a verified certificate. Flat ₹289. Trusted by 25,000+ students." },
      { property: "og:title", content: "Internsify — Online Internships & Verified Certificates" },
      { property: "og:description", content: "50+ internship domains. Verified certificate. Flat ₹289. Built for students across India." },
      { property: "og:type", content: "website" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Programs />
      <HowItWorks />
      <Certificate />
      <PaymentUpi />
      <Testimonials />
      <CtaVerify />
      <Faq />
      <Footer />
      <Toaster richColors position="top-center" />
      <ChatWidget />
    </main>
  );
}
