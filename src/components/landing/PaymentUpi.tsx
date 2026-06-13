import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload, QrCode, CheckCircle2, Copy, ImageIcon, X, Loader2, LogIn } from "lucide-react";
import { toast } from "sonner";
import upiQr from "@/assets/upi-qr.jpeg.asset.json";
import { supabase } from "@/integrations/supabase/client";
import { useSession } from "@/hooks/use-session";
import { Link } from "@tanstack/react-router";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const UPI_ID= "saraswattaraun9528-1@okaxis ";
const AMOUNT = 289;

const DOMAINS = [
  "Full Stack Development","Frontend Development","Backend Development","Cyber Security","Ethical Hacking",
  "Artificial Intelligence","Machine Learning","Data Science","Cloud Computing","DevOps","Software Testing",
  "UI/UX Design","Mobile App Development","Blockchain","IoT","Mechanical Engineering","Civil Engineering",
  "Electrical Engineering","Electronics & Communication","Automobile Engineering","Aerospace Engineering",
  "Chemical Engineering","Biotechnology","Mechatronics",
];

export function PaymentUpi() {
  const { user, loading: authLoading } = useSession();
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [txnId, setTxnId] = useState("");
  const [domain, setDomain] = useState<string>("Full Stack Development");
  const [duration, setDuration] = useState<string>("30");
  const [fullName, setFullName] = useState("");
  const [college, setCollege] = useState("");
  const [phone, setPhone] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!user) return;
    supabase.from("profiles").select("full_name,college,phone").eq("id", user.id).maybeSingle()
      .then(({ data }) => {
        if (data?.full_name) setFullName(data.full_name);
        if (data?.college) setCollege(data.college);
        if (data?.phone) setPhone(data.phone);
      });
  }, [user]);

  const upiLink = `upi://pay?pa=${UPI_ID}&pn=Internsify&am=${AMOUNT}&cu=INR&tn=Internship%20Fee`;

  const onPick = (f: File | undefined | null) => {
    if (!f) return;
    if (!f.type.startsWith("image/")) return toast.error("Please upload an image (PNG/JPG).");
    if (f.size > 5 * 1024 * 1024) return toast.error("Image must be under 5MB.");
    setFile(f);
    setPreview(URL.createObjectURL(f));
  };

  const clearFile = () => {
    setFile(null);
    if (preview) URL.revokeObjectURL(preview);
    setPreview(null);
    if (inputRef.current) inputRef.current.value = "";
  };

  const copyUpi = async () => {
    await navigator.clipboard.writeText(UPI_ID);
    toast.success("UPI ID copied");
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return toast.error("Please sign in first");
    if (!file) return toast.error("Upload your payment screenshot");
    if (!txnId.trim()) return toast.error("Enter your UPI transaction ID");
    if (!fullName.trim()) return toast.error("Enter your full name");

    setSubmitting(true);
    try {
      const ext = file.name.split(".").pop() || "jpg";
      const path = `${user.id}/${Date.now()}.${ext}`;
      const { error: upErr } = await supabase.storage.from("payment-proofs").upload(path, file, { contentType: file.type });
      if (upErr) throw upErr;
      const { data: pub } = supabase.storage.from("payment-proofs").getPublicUrl(path);

      const { error: insErr } = await (supabase as any).from("payment_submissions").insert({
        full_name: fullName,
        email: user.email!,
        college_name: college || null,
        course_domain:domain,
        utr_number:txnId,
        screenshot_url: pub.publicUrl,
      });
      if (insErr) throw insErr;

      // best-effort profile sync
      await supabase.from("profiles").upsert({
        id: user.id, full_name: fullName, college: college || null, phone: phone || null, email: user.email,
      });

      toast.success("Payment proof submitted! We'll verify and email you shortly.");
      clearFile();
      setTxnId("");
    } catch (err: any) {
      toast.error(err.message || "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="payment" className="py-24 bg-muted/40">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-brand">Payment</p>
          <h2 className="mt-3 font-display text-4xl md:text-5xl font-bold">
            Pay <span className="text-gradient">₹289 via UPI</span>
          </h2>
          <p className="mt-4 text-muted-foreground">
            Scan the QR or pay to our UPI ID, then upload your screenshot. We verify in minutes and email your certificate ID.
          </p>
        </div>

        <div className="mx-auto mt-14 grid max-w-5xl gap-6 lg:grid-cols-2">
          <div className="relative overflow-hidden rounded-3xl border border-border bg-card p-8 shadow-soft">
            <div className="absolute -right-16 -top-16 h-44 w-44 rounded-full bg-brand-gradient opacity-10 blur-3xl" />
            <div className="flex items-center gap-2 text-sm font-semibold text-brand">
              <QrCode className="h-4 w-4" /> Scan to pay
            </div>
            <div className="mt-6 flex flex-col items-center">
              <div className="rounded-2xl bg-white p-4 shadow-glow">
                <img src={upiQr.url} alt="Internsify UPI QR — IDBI Bank" width={260} height={260} className="block h-[260px] w-[260px] object-contain" />
              </div>
              <div className="mt-4 font-display text-3xl font-bold">₹{AMOUNT}</div>
              <div className="mt-1 text-xs text-muted-foreground">GPay · PhonePe · Paytm · BHIM</div>
              <a href={upiLink} className="mt-3 text-xs text-brand hover:underline sm:hidden">Open in UPI app →</a>
            </div>
            <div className="mt-6 rounded-xl border border-border bg-background p-3 flex items-center justify-between">
              <div className="min-w-0">
                <div className="text-[10px] uppercase tracking-wider text-muted-foreground">UPI ID</div>
                <div className="truncate font-mono text-sm">{UPI_ID}</div>
              </div>
              <Button type="button" size="sm" variant="outline" onClick={copyUpi}><Copy className="h-3.5 w-3.5" /> Copy</Button>
            </div>
          </div>

          {!authLoading && !user ? (
            <div className="rounded-3xl border border-border bg-card p-8 shadow-soft flex flex-col items-center justify-center text-center">
              <LogIn className="h-10 w-10 text-brand" />
              <h3 className="mt-4 font-display text-xl font-semibold">Sign in to enroll</h3>
              <p className="mt-2 text-sm text-muted-foreground">Create a free account so we can link your payment, issue your certificate and track progress.</p>
              <Link to="/auth"><Button className="mt-6 bg-brand-gradient text-white">Sign in / Create account</Button></Link>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="relative overflow-hidden rounded-3xl border border-border bg-card p-8 shadow-soft">
              <div className="flex items-center gap-2 text-sm font-semibold text-brand">
                <Upload className="h-4 w-4" /> Enrollment & payment proof
              </div>

              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <div>
                  <Label>Domain</Label>
                  <Select value={domain} onValueChange={setDomain}>
                    <SelectTrigger className="mt-1.5"><SelectValue /></SelectTrigger>
                    <SelectContent className="max-h-72">
                      {DOMAINS.map((d) => <SelectItem key={d} value={d}>{d}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Duration (days)</Label>
                  <Select value={duration} onValueChange={setDuration}>
                    <SelectTrigger className="mt-1.5"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {[15, 30, 45, 60, 90, 120, 180].map((d) => <SelectItem key={d} value={String(d)}>{d} days</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="fn">Full name (on certificate)</Label>
                  <Input id="fn" value={fullName} onChange={(e) => setFullName(e.target.value)} className="mt-1.5" required />
                </div>
                <div>
                  <Label htmlFor="ph">Phone</Label>
                  <Input id="ph" value={phone} onChange={(e) => setPhone(e.target.value)} className="mt-1.5" />
                </div>
                <div className="sm:col-span-2">
                  <Label htmlFor="cl">College</Label>
                  <Input id="cl" value={college} onChange={(e) => setCollege(e.target.value)} className="mt-1.5" />
                </div>
              </div>

              <input ref={inputRef} type="file" accept="image/png,image/jpeg,image/webp" className="sr-only" onChange={(e) => onPick(e.target.files?.[0])} />
              {!preview ? (
                <button type="button" onClick={() => inputRef.current?.click()} className="mt-4 flex w-full flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-border bg-background py-8 text-sm text-muted-foreground transition hover:border-brand/50 hover:text-foreground">
                  <ImageIcon className="h-7 w-7 text-brand" />
                  <span className="font-medium">Upload payment screenshot</span>
                  <span className="text-xs">PNG / JPG · up to 5MB</span>
                </button>
              ) : (
                <div className="mt-4 relative overflow-hidden rounded-2xl border border-border">
                  <img src={preview} alt="Payment screenshot" className="block max-h-48 w-full object-contain bg-background" />
                  <button type="button" onClick={clearFile} className="absolute right-2 top-2 grid h-8 w-8 place-items-center rounded-full bg-background/90 shadow-soft" aria-label="Remove"><X className="h-4 w-4" /></button>
                  <div className="absolute bottom-2 left-2 flex items-center gap-1.5 rounded-full bg-brand-gradient px-2.5 py-1 text-[11px] font-semibold text-white"><CheckCircle2 className="h-3.5 w-3.5" /> Ready</div>
                </div>
              )}

              <div className="mt-3">
                <Label htmlFor="txn">UPI transaction / reference ID</Label>
                <Input id="txn" placeholder="e.g. 4187XXXXXXXX" value={txnId} onChange={(e) => setTxnId(e.target.value)} className="mt-1.5" required />
              </div>

              <Button type="submit" size="lg" disabled={submitting} className="mt-6 w-full bg-brand-gradient text-white hover:opacity-90 shadow-soft h-12">
                {submitting ? <><Loader2 className="h-4 w-4 animate-spin" /> Submitting…</> : "Submit payment proof"}
              </Button>
              <p className="mt-3 text-center text-xs text-muted-foreground">We verify manually and issue your certificate ID within minutes.</p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
