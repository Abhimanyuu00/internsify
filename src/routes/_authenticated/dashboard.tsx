import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Award, ClipboardList, GraduationCap, LogOut, ShieldCheck, Sparkles, Clock, CheckCircle2, XCircle } from "lucide-react";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import { useIsAdmin } from "@/hooks/use-session";

export const Route = createFileRoute("/_authenticated/dashboard")({
  head: () => ({ meta: [{ title: "Dashboard — Internsify" }] }),
  component: Dashboard,
});

function Dashboard() {
  const navigate = useNavigate();
  const [enrollments, setEnrollments] = useState<any[]>([]);
  const [profile, setProfile] = useState<any>(null);
  const [userId, setUserId] = useState<string>();
  const isAdmin = useIsAdmin(userId);

  useEffect(() => {
    (async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      setUserId(user.id);

      // Database types strictness ko bypass kiya taaki 0 errors aayein
      const [{ data: enr }, { data: prof }] = await Promise.all([
        (supabase.from("payment_submissions" as any) as any).select("*").eq("email", user.email).order("created_at", { ascending: false }),
        (supabase.from("profiles" as any) as any).select("full_name,email").eq("id", user.id).maybeSingle(),
      ]);
      
      setEnrollments(enr ?? []);
      setProfile(prof);
    })();
  }, []);

  const signOut = async () => {
    await supabase.auth.signOut();
    toast.success("Signed out");
    navigate({ to: "/" });
  };

  // PREMIUM BUILT-IN AUTOMATIC CERTIFICATE GENERATOR
  const generateAutomaticCertificate = (fullName: string, domain: string, dateStr: string, txnId: string) => {
    try {
      toast.info("Generating your certificate...");
      const canvas = document.createElement("canvas");
      canvas.width = 1920;
      canvas.height = 1080;
      const ctx = canvas.getContext("2d");

      if (!ctx) return;

      // Dark theme background
      ctx.fillStyle = "#111318";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Borders
      ctx.strokeStyle = "#8B5CF6"; 
      ctx.lineWidth = 20;
      ctx.strokeRect(40, 40, canvas.width - 80, canvas.height - 80);

      ctx.strokeStyle = "#D97706";
      ctx.lineWidth = 4;
      ctx.strokeRect(65, 65, canvas.width - 130, canvas.height - 130);

      // Header Text
      ctx.fillStyle = "#A78BFA";
      ctx.font = "bold 35px sans-serif";
      ctx.textAlign = "center";
      ctx.font="italic bold 36px 'Brush Script MT','Comic Sans MS', cursive"; ctx.fillStyle = "#E5E7EB"; ctx.fillText("abhimanyu", canvas.width - 150,850);

      // Main Title
      ctx.fillStyle = "#F59E0B"; 
      ctx.font = "bold 75px sans-serif";
      ctx.fillText("Certificate of Completion", canvas.width / 2, 290);

      ctx.fillStyle = "#9CA3AF";
      ctx.font = "italic 30px sans-serif";
      ctx.fillText("This is proudly presented to", canvas.width / 2, 400);

      // Dynamic Student Name
      ctx.fillStyle = "#FFFFFF";
      ctx.font = "bold 85px sans-serif";
      ctx.fillText(fullName || "Student", canvas.width / 2, 520);

      // Course dynamic text
      ctx.fillStyle = "#9CA3AF";
      ctx.font = "32px sans-serif";
      const domainName = domain || "Internship";
      ctx.fillText("has successfully completed the " + domainName + " Internship", canvas.width / 2, 630);
      ctx.fillText("with outstanding performance and dedication.", canvas.width / 2, 680);

      // Metadata (Bottom Left)
      ctx.textAlign = "left";
      ctx.fillStyle = "#6B7280";
      ctx.font = "24px monospace";
      const cleanTxn = txnId ? txnId.substring(0, 8).toUpperCase() : "VERIFIED";
      ctx.fillText("ID: INS-" + cleanTxn, 150, 880);
      ctx.fillText("Issued: " + new Date(dateStr).toLocaleDateString(), 150, 920);

      // Verification Badge (Bottom Right)
      ctx.textAlign = "right";
      ctx.fillStyle = "#10B981"; 
      ctx.font = "bold 28px sans-serif";
      ctx.fillText("✓ VERIFIED STATUS", canvas.width - 150, 880);
      ctx.fillStyle = "#6B7280";
      ctx.font = "22px sans-serif";
      ctx.fillText("Authorized Signatory", canvas.width - 150, 920);

      // Instant Download Trigger
      const image = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      const cleanName = fullName ? fullName.replace(/\s+/g, "_") : "Student";
      link.download = cleanName + "_Certificate.png";
      link.href = image;
      link.click();
      toast.success("Certificate downloaded successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to generate certificate.");
    }
  };

  const approved = enrollments.filter((e: any) => e.status === "verified").length;
  const pending = enrollments.filter((e: any) => e.status === "pending").length;

  return (
    <main className="min-h-screen bg-background">
      <header className="border-b border-border bg-card/50 backdrop-blur-xl sticky top-0 z-40">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 font-display font-bold">
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-brand-gradient shadow-glow">
              <GraduationCap className="h-4 w-4 text-white" />
            </span>
            Internsify
          </Link>
          <div className="flex items-center gap-2">
            {isAdmin && (
              <Link to="/admin">
                <Button variant="outline" size="sm"><ShieldCheck className="h-4 w-4" /> Admin</Button>
              </Link>
            )}
            <Button variant="ghost" size="sm" onClick={signOut}><LogOut className="h-4 w-4" /> Sign out</Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-10">
        <div className="mb-10">
          <p className="text-sm text-brand font-semibold uppercase tracking-wider">Dashboard</p>
          <h1 className="mt-2 font-display text-4xl font-bold">Hi {profile?.full_name || "there"} 👋</h1>
          <p className="mt-2 text-muted-foreground">Track your internships and download verified certificates.</p>
        </div>

        <div className="grid gap-4 sm:grid-cols-3 mb-10">
          <StatCard icon={ClipboardList} label="Total enrollments" value={enrollments.length} />
          <StatCard icon={Clock} label="Pending verification" value={pending} />
          <StatCard icon={Award} label="Certificates earned" value={approved} />
        </div>

        <div className="rounded-2xl border border-border bg-card overflow-hidden">
          <div className="p-6 border-b border-border flex items-center justify-between">
            <h2 className="font-display text-xl font-semibold">My internships</h2>
            <Link to="/" hash="payment"><Button size="sm" className="bg-brand-gradient text-white"><Sparkles className="h-4 w-4" /> Enroll in another</Button></Link>
          </div>

          {enrollments.length === 0 ? (
            <div className="p-12 text-center text-muted-foreground">
              <ClipboardList className="h-12 w-12 mx-auto opacity-30 mb-3" />
              <p>No enrollments yet. Pick a domain and start your internship!</p>
              <Link to="/"><Button className="mt-4 bg-brand-gradient text-white">Browse programs</Button></Link>
            </div>
          ) : (
            <div className="divide-y divide-border">
              {enrollments.map((e: any) => (
                <div key={e.id} className="p-6 flex flex-wrap items-start gap-4 justify-between">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-semibold">{e.course_domain || "Internship"}</h3>
                      <StatusBadge status={e.status || "pending"} />
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Txn ID: {e.txn_id || "N/A"} • {e.created_at ? new Date(e.created_at).toLocaleDateString() : ""}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    {e.status === "verified" && (
                      <Button 
                        size="sm" 
                        className="bg-brand-gradient text-white"
                        onClick={() => generateAutomaticCertificate(profile?.full_name || e.full_name || "Student", e.course_domain || "Internship", e.created_at, e.txn_id || "VERIFIED")}
                      >
                        <Award className="h-4 w-4" /> Download Certificate
                      </Button>
                    )}
                  </div>
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

function StatCard({ icon: Icon, label, value }: { icon: any; label: string; value: number }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-6">
      <Icon className="h-6 w-6 text-brand" />
      <div className="mt-3 font-display text-3xl font-bold">{value}</div>
      <div className="mt-1 text-sm text-muted-foreground">{label}</div>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  if (status === "verified") return <Badge className="bg-emerald-500/15 text-emerald-600 border-emerald-500/30 hover:bg-emerald-500/15"><CheckCircle2 className="h-3 w-3" /> Approved</Badge>;
  if (status === "rejected") return <Badge className="bg-red-500/15 text-red-600 border-red-500/30 hover:bg-red-500/15"><XCircle className="h-3 w-3" /> Rejected</Badge>;
  return <Badge className="bg-amber-500/15 text-amber-600 border-amber-500/30 hover:bg-amber-500/15"><Clock className="h-3 w-3" /> Pending</Badge>;
}