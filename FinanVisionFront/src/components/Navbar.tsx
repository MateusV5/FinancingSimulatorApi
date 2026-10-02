import { Link } from "wouter";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Landmark, History, LogIn, LogOut, UserPlus } from "lucide-react";

export function Navbar() {
  const { isAuthenticated, logout } = useAuth();

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/70 backdrop-blur-xl">
      <nav className="container mx-auto flex h-20 max-w-6xl items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-3 transition-opacity hover:opacity-90" data-testid="nav-logo">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-600 text-slate-950 shadow-lg shadow-emerald-500/20">
            <Landmark className="h-5 w-5" />
          </div>
          <div className="leading-none">
            <div className="text-lg font-black tracking-tight text-white">FinanVision</div>
            <div className="text-[10px] font-medium uppercase tracking-[0.22em] text-slate-400">Financeira</div>
          </div>
        </Link>

        <div className="flex items-center gap-2 sm:gap-3">
          <Link href="/" className="rounded-full px-3 py-2 text-sm font-medium text-slate-300 transition-colors hover:bg-white/5 hover:text-white" data-testid="nav-home">
            Simulação
          </Link>

          {isAuthenticated ? (
            <>
              <Link href="/historico" className="flex items-center gap-2 rounded-full px-3 py-2 text-sm font-medium text-slate-300 transition-colors hover:bg-white/5 hover:text-white" data-testid="nav-history">
                <History className="h-4 w-4" />
                Histórico
              </Link>
              <Button variant="ghost" size="sm" onClick={logout} className="rounded-full text-slate-300 hover:bg-red-500/10 hover:text-red-300" data-testid="nav-logout">
                <LogOut className="mr-1.5 h-4 w-4" />
                Sair
              </Button>
            </>
          ) : (
            <>
              <Link href="/login" data-testid="nav-login">
                <Button variant="outline" size="sm" className="rounded-full border-white/10 bg-white/5 text-slate-100 hover:bg-white/10">
                  <LogIn className="mr-1.5 h-4 w-4" />
                  Entrar
                </Button>
              </Link>
              <Link href="/cadastro" data-testid="nav-register">
                <Button size="sm" className="rounded-full bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/20 hover:bg-emerald-400">
                  <UserPlus className="mr-1.5 h-4 w-4" />
                  Criar conta
                </Button>
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
