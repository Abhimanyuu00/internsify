import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { GraduationCap, CheckCircle2, XCircle, Loader2, Award, Calendar, User } from "lucide-react";

export const Route = createFileRoute("/verify/$id")({
  head: ({ params }) => ({
    meta: [
      { title: `Verify ${params.id} — Internsify` },
      { name: "description", content: `Verify Internsify certificate ${params.id}.` },
    ],
  }),
  component: Verify,
});

type Cert = {
  full_name: string;
  domain: string;
  duration_days: number;
  certificate_id: string;
  certificate_issued_at: string;
};

function Verify() {
  const { id } = Route.useParams();
  const [data, setData] = useState<Cert | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const { data } = await supabase
        .from("enrollments")
        .select("full_name,domain,duration_days,certificate_id,certificate_issued_at")
        .eq("certificate_id", id)
        .eq("status", "approved")
        .maybeSingle();
      setData(data as Cert | null);
      setLoading(false);
    })();
  }, [id]);

  return (
    <main className="min-h-screen bg-hero text-white">
      <header className="border-b border-white/10">
        <div className="container mx-auto px-4 h-16 flex items-center">
          <Link to="/" className="flex items-center gap-2 font-display font-bold">
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-brand-gradient shadow-glow">
              <GraduationCap className="h-4 w-4 text-white" />
            </span>
            Internsify
          </Link>
        </div>
      </header>

      <div className="container mx-auto px-4 py-16 max-w-2xl">
        <p className="text-sm font-semibold uppercase tracking-wider text-brand-glow">Verification</p>
        <h1 className="mt-2 font-display text-4xl font-bold">Certificate {id}</h1>

        <div className="mt-8 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 shadow-glow">
          {loading ? (
            <div className="flex items-center gap-2 text-white/70"><Loader2 className="h-5 w-5 animate-spin" /> Verifying…</div>
          ) : data ? (
            <div>
              <div className="flex items-center gap-2 text-emerald-400 font-semibold">
                <CheckCircle2 className="h-5 w-5" /> Verified authentic
              </div>
              <div className="mt-6 grid gap-4">
                <Field icon={User} label="Issued to" value={data.full_name} />
                <Field icon={Award} label="Internship domain" value={data.domain} />
                <Field icon={Calendar} label="Duration" value={`${data.duration_days} days`} />
                <Field icon={Calendar} label="Issued on" value={new Date(data.certificate_issued_at).toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" })} />
                <Field icon={Award} label="Certificate ID" value={data.certificate_id} />
              </div>
              <p className="mt-8 text-xs text-white/50">
                This certificate is registered in Internsify's verification database. Any tampered or unregistered ID will not match this record.
              </p>
            </div>
          ) : (
            <div>
              <div className="flex items-center gap-2 text-red-400 font-semibold">
                <XCircle className="h-5 w-5" /> Not found
              </div>
              <p className="mt-3 text-white/70">
                We couldn't find an approved certificate with ID <code className="bg-white/10 rounded px-1">{id}</code>. Double-check the ID printed on the certificate.
              </p>
            </div>
          )}
        </div>

        <Link to="/"><Button variant="outline" className="mt-8 bg-white/5 border-white/20 text-white hover:bg-white/10">← Back to Internsify</Button></Link>
      </div>
    </main>
  );
}

function Field({ icon: Icon, label, value }: { icon: any; label: string; value: string }) {
  return (
    <div className="flex items-start gap-3">
      <span className="grid h-9 w-9 place-items-center rounded-lg bg-brand-gradient shadow-soft shrink-0">
        <Icon className="h-4 w-4 text-white" />
      </span>
      <div>
        <div className="text-xs uppercase tracking-wider text-white/50">{label}</div>
        <div className="font-medium">{value}</div>
      </div>
    </div>
  );
}
