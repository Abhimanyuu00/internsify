import { Button } from "@/components/ui/button";
import { GraduationCap, LayoutDashboard, ShieldCheck } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { useSession, useIsAdmin } from "@/hooks/use-session";

export function Navbar() {
  const { user } = useSession();
  const isAdmin = useIsAdmin(user?.id);

  return (
    <header className="fixed top-0 inset-x-0 z-50 border-b border-white/10 backdrop-blur-xl bg-background/40">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2 font-display font-bold text-lg text-foreground">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-brand-gradient shadow-glow">
            <GraduationCap className="h-4 w-4 text-white" />
          </span>
          Internsify
        </Link>
        <nav className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
          <a href="#programs" className="hover:text-foreground transition">Programs</a>
          <a href="#how" className="hover:text-foreground transition">How it works</a>
          <a href="#certificate" className="hover:text-foreground transition">Certificate</a>
          <a href="#faq" className="hover:text-foreground transition">FAQ</a>
          <a href="#verify" className="hover:text-foreground transition">Verify</a>
        </nav>
        <div className="flex items-center gap-2">
          {user ? (
            <>
              {isAdmin && (
                <Link to="/admin" className="hidden sm:inline-flex">
                  <Button variant="ghost" size="sm"><ShieldCheck className="h-4 w-4" /> Admin</Button>
                </Link>
              )}
              <Link to="/dashboard">
                <Button size="sm" className="bg-brand-gradient text-white hover:opacity-90 shadow-soft">
                  <LayoutDashboard className="h-4 w-4" /> Dashboard
                </Button>
              </Link>
            </>
          ) : (
            <>
              <Link to="/auth" className="hidden sm:inline-flex">
                <Button variant="ghost" size="sm">Sign in</Button>
              </Link>
              <a href="#payment">
                <Button size="sm" className="bg-brand-gradient text-white hover:opacity-90 shadow-soft">
                  Start Internship
                </Button>
              </a>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
