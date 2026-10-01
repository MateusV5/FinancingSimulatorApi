import { Link } from "wouter";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Building2, History, LogIn, LogOut, UserPlus } from "lucide-react";

export function Navbar() {
  const { isAuthenticated, logout } = useAuth();

  return (
    <nav className="border-b bg-white">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity" data-testid="nav-logo">
          <div className="bg-primary text-primary-foreground p-1.5 rounded-lg">
            <Building2 className="h-5 w-5" />
          </div>
          <span className="font-bold text-xl tracking-tight text-foreground">FinanVision</span>
        </Link>

        <div className="flex items-center gap-4">
          <Link href="/" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors" data-testid="nav-home">
            Simulação
          </Link>
          
          {isAuthenticated ? (
            <>
              <Link href="/historico" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1.5" data-testid="nav-history">
                <History className="h-4 w-4" />
                Histórico
              </Link>
              <Button variant="ghost" size="sm" onClick={logout} className="text-muted-foreground hover:text-destructive hover:bg-destructive/10" data-testid="nav-logout">
                <LogOut className="h-4 w-4 mr-1.5" />
                Sair
              </Button>
            </>
          ) : (
            <>
              <Link href="/login" data-testid="nav-login">
                <Button variant="ghost" size="sm">
                  <LogIn className="h-4 w-4 mr-1.5" />
                  Entrar
                </Button>
              </Link>
              <Link href="/cadastro" data-testid="nav-register">
                <Button size="sm">
                  <UserPlus className="h-4 w-4 mr-1.5" />
                  Criar conta
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
