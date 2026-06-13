import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { GraduationCap, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";

export const Route = createFileRoute("/auth")({
  head: () => ({ meta: [{ title: "Sign in — Internsify" }] }),
  component: AuthPage,
});

function AuthPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");

  const signIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) return toast.error(error.message);
    toast.success("Welcome back!");
    navigate({ to: "/dashboard" });
  };

  const signUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim()) return toast.error("Please enter your full name");
    setLoading(true);
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/dashboard`,
        data: { full_name: fullName },
      },
    });
    setLoading(false);
    if (error) return toast.error(error.message);
    toast.success("Account created! You can sign in now.");
  };

  return (
    <main className="min-h-screen grid place-items-center bg-hero px-4 py-12">
      <div className="absolute inset-0 -z-10 bg-hero" />
      <div className="w-full max-w-md">
        <Link to="/" className="mb-8 flex items-center gap-2 justify-center font-display font-bold text-white text-xl">
          <span className="grid h-9 w-9 place-items-center rounded-lg bg-brand-gradient shadow-glow">
            <GraduationCap className="h-5 w-5 text-white" />
          </span>
          Internsify
        </Link>

        <div className="rounded-3xl border border-white/10 bg-card/90 backdrop-blur-xl p-8 shadow-glow">
          <Tabs defaultValue="signin" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="signin">Sign in</TabsTrigger>
              <TabsTrigger value="signup">Create account</TabsTrigger>
            </TabsList>

            <TabsContent value="signin">
              <form onSubmit={signIn} className="space-y-4">
                <h1 className="font-display text-2xl font-bold">Welcome back</h1>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1.5" />
                </div>
                <div>
                  <Label htmlFor="password">Password</Label>
                  <Input id="password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} className="mt-1.5" />
                </div>
                <Button disabled={loading} type="submit" className="w-full h-11 bg-brand-gradient text-white">
                  {loading && <Loader2 className="h-4 w-4 animate-spin" />} Sign in
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="signup">
              <form onSubmit={signUp} className="space-y-4">
                <h1 className="font-display text-2xl font-bold">Create your account</h1>
                <div>
                  <Label htmlFor="name">Full name</Label>
                  <Input id="name" required value={fullName} onChange={(e) => setFullName(e.target.value)} className="mt-1.5" />
                </div>
                <div>
                  <Label htmlFor="email2">Email</Label>
                  <Input id="email2" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1.5" />
                </div>
                <div>
                  <Label htmlFor="password2">Password</Label>
                  <Input id="password2" type="password" required minLength={6} value={password} onChange={(e) => setPassword(e.target.value)} className="mt-1.5" />
                </div>
                <Button disabled={loading} type="submit" className="w-full h-11 bg-brand-gradient text-white">
                  {loading && <Loader2 className="h-4 w-4 animate-spin" />} Create account
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </div>

        <p className="mt-6 text-center text-sm text-white/60">
          <Link to="/" className="hover:text-white">← Back to home</Link>
        </p>
      </div>
      <Toaster richColors position="top-center" />
    </main>
  );
}
