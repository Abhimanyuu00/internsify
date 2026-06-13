import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";

export function CtaVerify() {
  const [certId, setCertId] = useState("");
  const navigate = useNavigate();

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const id = certId.trim();
    if (!id) return toast.error("Please enter a certificate ID");
    navigate({ to: "/verify/$id", params: { id } });
  };

  return (
    <section id="verify" className="py-24">
      <div className="container mx-auto px-4">
        <div className="relative overflow-hidden rounded-3xl bg-hero p-10 md:p-16 text-white shadow-glow">
          <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-brand-gradient opacity-40 blur-3xl" />
          <div className="absolute -left-10 bottom-0 h-60 w-60 rounded-full bg-brand-glow opacity-20 blur-3xl" />
          <div className="relative grid gap-10 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-brand-glow">Verify a certificate</p>
              <h2 className="mt-3 font-display text-4xl md:text-5xl font-bold">Authenticate any Internsify certificate</h2>
              <p className="mt-4 text-white/70 max-w-md">
                Enter the certificate ID printed on the document to instantly verify its authenticity and details.
              </p>
            </div>
            <form className="space-y-3" onSubmit={onSubmit}>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/50" />
                <Input
                  value={certId}
                  onChange={(e) => setCertId(e.target.value)}
                  placeholder="Certificate ID (e.g. INS-2026-A1B2C3)"
                  className="h-12 pl-10 bg-white/10 border-white/15 text-white placeholder:text-white/50"
                />
              </div>
              <Button type="submit" size="lg" className="w-full bg-brand-gradient text-white hover:opacity-90 h-12">
                Verify certificate
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
