import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { GraduationCap, ShieldCheck, ArrowLeft, CheckCircle2, XCircle, ExternalLink, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import { useIsAdmin } from "@/hooks/use-session";

type Row = {
  id: string;
  user_id: string;
  full_name: string;
  email: string;
  college: string | null;
  phone: string | null;
  domain: string;
  duration_days: number;
  txn_id: string;
  screenshot_url: string;
  status: "pending" | "approved" | "rejected";
  certificate_id: string | null;
  created_at: string;
};

export const Route = createFileRoute("/_authenticated/admin")({
  head: () => ({ meta: [{ title: "Admin — Internsify" }] }),
  component: Admin,
});

function generateCertId() {
  const yr = new Date().getFullYear();
  const rand = Math.random().toString(36).slice(2, 8).toUpperCase();
  return `INS-${yr}-${rand}`;
}

function Admin() {
  const navigate = useNavigate();
  const [userId, setUserId] = useState<string>();
  const isAdmin = useIsAdmin(userId);
  const [rows, setRows] = useState<Row[]>([]);
  const [filter, setFilter] = useState<"pending" | "approved" | "rejected" | "all">("pending");
  const [busy, setBusy] = useState<string | null>(null);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUserId(data.user?.id));
  }, []);

  useEffect(() => {
    if (!userId) return;
    setChecked(true);
  }, [userId]);

  const load = async () => {
    let q = supabase.from("enrollments").select("*").order("created_at", { ascending: false });
    if (filter !== "all") q = q.eq("status", filter);
    const { data } = await q;
    setRows((data ?? []) as Row[]);
  };

  useEffect(() => { if (isAdmin) load(); }, [isAdmin, filter]);

  const approve = async (r: Row) => {
    setBusy(r.id);
    const certId = r.certificate_id || generateCertId();
    const { error } = await supabase
      .from("enrollments")
      .update({ status: "approved", certificate_id: certId, certificate_issued_at: new Date().toISOString() })
      .eq("id", r.id);
    setBusy(null);
    if (error) return toast.error(error.message);
    toast.success(`Approved & certificate ${certId} issued`);
    load();
  };

  const reject = async (r: Row) => {
    setBusy(r.id);
    const { error } = await supabase
      .from("enrollments")
      .update({ status: "rejected", admin_notes: "Payment could not be verified." })
      .eq("id", r.id);
    setBusy(null);
    if (error) return toast.error(error.message);
    toast.message("Marked as rejected");
    load();
  };

  if (checked && !isAdmin) {
    return (
      <main className="min-h-screen grid place-items-center px-4">
        <div className="max-w-md text-center">
          <ShieldCheck className="h-12 w-12 mx-auto text-muted-foreground" />
          <h1 className="mt-4 font-display text-2xl font-bold">Admins only</h1>
          <p className="mt-2 text-muted-foreground">
            Your account doesn't have admin access. Ask an existing admin to add you.
          </p>
          <Link to="/dashboard"><Button className="mt-6" variant="outline"><ArrowLeft className="h-4 w-4" /> Back to dashboard</Button></Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background">
      <header className="border-b border-border bg-card/50 backdrop-blur-xl sticky top-0 z-40">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 font-display font-bold">
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-brand-gradient shadow-glow">
              <GraduationCap className="h-4 w-4 text-white" />
            </span>
            Internsify <span className="text-xs text-brand ml-1">Admin</span>
          </Link>
          <Link to="/dashboard"><Button variant="ghost" size="sm"><ArrowLeft className="h-4 w-4" /> Dashboard</Button></Link>
        </div>
      </header>

      <div className="container mx-auto px-4 py-10">
        <h1 className="font-display text-3xl font-bold">Payment verification queue</h1>
        <p className="mt-1 text-muted-foreground">Review payment screenshots and approve to auto-issue certificates.</p>

        <div className="mt-6 flex flex-wrap gap-2">
          {(["pending", "approved", "rejected", "all"] as const).map((f) => (
            <Button key={f} size="sm" variant={filter === f ? "default" : "outline"} onClick={() => setFilter(f)} className={filter === f ? "bg-brand-gradient text-white" : ""}>
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </Button>
          ))}
        </div>

        <div className="mt-6 rounded-2xl border border-border bg-card overflow-hidden">
          {rows.length === 0 ? (
            <div className="p-12 text-center text-muted-foreground">No enrollments in this view.</div>
          ) : (
            <div className="divide-y divide-border">
              {rows.map((r) => (
                <div key={r.id} className="p-5 grid gap-4 md:grid-cols-[160px_1fr_auto] items-start">
                  <a href={r.screenshot_url} target="_blank" rel="noreferrer" className="block">
                    <img src={r.screenshot_url} alt="Payment screenshot" className="h-32 w-full md:w-40 rounded-lg border border-border object-cover bg-muted" />
                  </a>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-semibold">{r.full_name}</h3>
                      <StatusBadge status={r.status} />
                      {r.certificate_id && <code className="text-xs bg-muted px-2 py-0.5 rounded">{r.certificate_id}</code>}
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground">{r.email} {r.phone && `• ${r.phone}`} {r.college && `• ${r.college}`}</p>
                    <p className="mt-1 text-sm"><span className="font-medium">{r.domain}</span> • {r.duration_days} days</p>
                    <p className="mt-1 text-xs text-muted-foreground">Txn: <code>{r.txn_id}</code> • {new Date(r.created_at).toLocaleString()}</p>
                    <a href={r.screenshot_url} target="_blank" rel="noreferrer" className="mt-2 inline-flex items-center gap-1 text-xs text-brand hover:underline">
                      Open screenshot <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>
                  {r.status === "pending" && (
                    <div className="flex md:flex-col gap-2">
                      <Button size="sm" disabled={busy === r.id} onClick={() => approve(r)} className="bg-emerald-600 hover:bg-emerald-700 text-white">
                        {busy === r.id ? <Loader2 className="h-4 w-4 animate-spin" /> : <CheckCircle2 className="h-4 w-4" />} Approve
                      </Button>
                      <Button size="sm" variant="outline" disabled={busy === r.id} onClick={() => reject(r)}>
                        <XCircle className="h-4 w-4" /> Reject
                      </Button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <Toaster richColors position="top-center" />
    </main>
  );
}

function StatusBadge({ status }: { status: string }) {
  if (status === "approved") return <Badge className="bg-emerald-500/15 text-emerald-600 border-emerald-500/30 hover:bg-emerald-500/15">Approved</Badge>;
  if (status === "rejected") return <Badge className="bg-red-500/15 text-red-600 border-red-500/30 hover:bg-red-500/15">Rejected</Badge>;
  return <Badge className="bg-amber-500/15 text-amber-600 border-amber-500/30 hover:bg-amber-500/15">Pending</Badge>;
}
