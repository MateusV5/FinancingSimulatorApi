import { useState } from "react";
import { Link, useLocation } from "wouter";
import { useAuth } from "@/context/AuthContext";
import { api } from "@/services/api";
import { useToast } from "@/hooks/use-toast";
import { SimulationForm, SimulationInput } from "@/components/SimulationForm";
import { SimulationResult } from "@/components/SimulationResult";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calculator, Save, AlertCircle, TrendingUp, Landmark, PiggyBank, ShieldCheck, ArrowRight, Building2, Sparkles } from "lucide-react";

export function Home() {
  const { isAuthenticated } = useAuth();
  const { toast } = useToast();
  const [, setLocation] = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [lastInput, setLastInput] = useState<SimulationInput | null>(null);
  const [isSimulationFocused, setIsSimulationFocused] = useState(false);
  const [showAuthPrompt, setShowAuthPrompt] = useState(false);

  const handleGoToSimulation = () => {
    const element = document.getElementById("nova-simulacao");
    if (!element) return;

    element.scrollIntoView({ behavior: "smooth", block: "center" });
    setIsSimulationFocused(true);
    window.setTimeout(() => setIsSimulationFocused(false), 1400);
  };

  const handleSimulate = async (data: SimulationInput) => {
    if (!isAuthenticated) {
      setShowAuthPrompt(true);
      toast({
        variant: "destructive",
        title: "Acesso restrito",
        description: "Faça login ou crie uma conta para realizar a simulação.",
      });
      return;
    }

    setShowAuthPrompt(false);
    setIsLoading(true);
    setResult(null);
    setLastInput(data);
    try {
      const response = await api.post("/api/Simulacao", data);
      setResult(response.data);
    } catch (error: any) {
      toast({ variant: "destructive", title: "Erro na simulação", description: error.message });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    if (!lastInput) return;
    setIsSaving(true);
    try {
      await api.post("/api/Simulacao/salvar", lastInput);
      toast({ title: "Simulação salva", description: "Sua simulação foi salva com sucesso no histórico." });
      setLocation("/historico");
    } catch (error: any) {
      toast({ variant: "destructive", title: "Erro ao salvar", description: error.message });
    } finally {
      setIsSaving(false);
    }
  };

  const highlights = [
    { icon: TrendingUp, title: "Comparação estratégica", text: "Veja SAC e PRICE em paralelo e escolha a estrutura ideal para o seu patrimônio." },
    { icon: PiggyBank, title: "Planejamento de alto padrão", text: "Entenda o custo real do crédito, o impacto das parcelas e a melhor forma de estruturar a compra." },
    { icon: ShieldCheck, title: "Decisão segura", text: "Acompanhe cada detalhe com clareza para investir com confiança e controle financeiro." },
  ];

  return (
    <div className="mx-auto max-w-6xl space-y-8 px-4 py-8 sm:py-10">
      <section className="premium-panel dark-grid overflow-hidden rounded-[32px] border border-white/10 bg-[radial-gradient(circle_at_top_left,_rgba(16,185,129,0.18),_transparent_30%),linear-gradient(135deg,#07131a_0%,#0d1e2b_35%,#081821_100%)] p-6 shadow-[0_35px_90px_-30px_rgba(16,185,129,0.35)] sm:p-8 lg:p-10">
        <div className="grid items-center gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-7">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-500/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.24em] text-emerald-200">
              <Sparkles className="h-3.5 w-3.5" />
              Financiamento sob medida
            </div>

            <div className="space-y-4">
              <h1 className="max-w-xl text-4xl font-black tracking-[-0.04em] text-white sm:text-5xl lg:text-[3.5rem]">
                O caminho mais refinado para adquirir seu imóvel.
              </h1>
              <p className="max-w-xl text-lg leading-8 text-slate-300">
                Simule com sofisticação, compare estruturas de pagamento e tome decisões inteligentes com base em números reais.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Button
                size="lg"
                onClick={handleGoToSimulation}
                className="rounded-full bg-gradient-to-r from-emerald-400 to-teal-300 px-6 text-slate-950 shadow-[0_16px_45px_-18px_rgba(52,211,153,0.9)] hover:brightness-110"
              >
                Fazer simulação
              </Button>
              <Link href="/login">
                <Button variant="outline" size="lg" className="rounded-full border-white/10 bg-white/5 px-6 text-white hover:bg-white/10">
                  Entrar
                </Button>
              </Link>
            </div>

            <div className="flex flex-wrap items-center gap-3 text-sm text-slate-300">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2">
                <Calculator className="h-4 w-4 text-emerald-300" />
                Simulação inteligente
              </div>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2">
                <Landmark className="h-4 w-4 text-emerald-300" />
                Estratégia imobiliária
              </div>
            </div>
          </div>

          <div className="rounded-[28px] border border-emerald-400/20 bg-[linear-gradient(145deg,rgba(15,23,42,0.95),rgba(9,27,34,0.9))] p-5 text-white shadow-[0_30px_80px_-30px_rgba(52,211,153,0.55)]">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <div className="text-[10px] uppercase tracking-[0.2em] text-emerald-300">Resumo</div>
                  <div className="mt-2 text-2xl font-bold">Estrutura sugerida</div>
                </div>
                <div className="rounded-full bg-emerald-500/15 p-2 text-emerald-300">
                  <TrendingUp className="h-5 w-5" />
                </div>
              </div>

              <div className="space-y-4">
                <div className="rounded-2xl bg-slate-800/60 p-3">
                  <div className="text-xs text-slate-300">Valor do imóvel</div>
                  <div className="mt-1 text-2xl font-black">R$ 500.000</div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-2xl bg-slate-800/60 p-3">
                    <div className="text-xs text-slate-300">Entrada</div>
                    <div className="mt-1 text-lg font-semibold">R$ 100.000</div>
                  </div>
                  <div className="rounded-2xl bg-slate-800/60 p-3">
                    <div className="text-xs text-slate-300">Perfil</div>
                    <div className="mt-1 text-lg font-semibold">Conservador</div>
                  </div>
                </div>

                <div className="rounded-2xl border border-emerald-400/20 bg-emerald-500/10 p-3">
                  <div className="flex items-center justify-between text-sm text-emerald-100">
                    <span>Parcela estimada</span>
                    <span className="inline-flex items-center gap-1 font-medium">
                      SAC <ArrowRight className="h-3.5 w-3.5" />
                    </span>
                  </div>
                  <div className="mt-2 text-3xl font-black text-white">R$ 3.220</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {highlights.map(({ icon: Icon, title, text }) => (
          <Card key={title} className="border-white/10 bg-slate-900/80 text-white shadow-[0_18px_40px_-28px_rgba(16,185,129,0.4)]">
            <CardHeader className="pb-3">
              <div className="mb-2 flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-300">
                <Icon className="h-5 w-5" />
              </div>
              <CardTitle className="text-xl font-bold text-white">{title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-6 text-slate-300">{text}</p>
            </CardContent>
          </Card>
        ))}
      </section>

      <Card id="nova-simulacao" className={`${isSimulationFocused ? "border-emerald-400/60 shadow-[0_0_0_1px_rgba(52,211,153,0.35),0_24px_90px_-40px_rgba(16,185,129,0.6)]" : "border-white/10"} scroll-mt-28 bg-slate-900/80 text-white shadow-[0_24px_90px_-40px_rgba(16,185,129,0.3)] transition-all duration-500`}>
        {showAuthPrompt && !isAuthenticated && (
          <div className="border-b border-emerald-500/20 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-100">
            É necessário entrar com uma conta para simular. {" "}
            <Link href="/cadastro" className="font-semibold underline underline-offset-2">
              Criar conta
            </Link>
            {" ou "}
            <Link href="/login" className="font-semibold underline underline-offset-2">
              fazer login
            </Link>
            .
          </div>
        )}
        <CardHeader className="gap-2">
          <CardTitle className="text-2xl font-bold text-white">Nova simulação</CardTitle>
          <CardDescription className="text-slate-300">Preencha os dados para visualizar o cronograma e comparar os impactos do seu financiamento.</CardDescription>
        </CardHeader>
        <CardContent>
          <SimulationForm onSubmit={handleSimulate} isLoading={isLoading} isAuthenticated={isAuthenticated} />
        </CardContent>
      </Card>

      {result && (
        <div className="space-y-6" id="resultado-simulacao">
          <div className="flex flex-col justify-between gap-4 border-b border-white/10 pb-4 sm:flex-row sm:items-center">
            <div>
              <h2 className="text-3xl font-black tracking-tight text-white">Resultado da simulação</h2>
              <p className="text-slate-300">Sistema {lastInput?.tipoFinanciamento}</p>
            </div>

            {isAuthenticated ? (
              <Button onClick={handleSave} disabled={isSaving} className="gap-2 rounded-full bg-gradient-to-r from-emerald-400 to-teal-300 px-5 text-slate-950 shadow-[0_16px_45px_-18px_rgba(52,211,153,0.9)]" data-testid="btn-salvar">
                <Save className="h-4 w-4" />
                {isSaving ? "Salvando..." : "Salvar simulação"}
              </Button>
            ) : (
              <div className="flex max-w-lg items-start gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-300">
                <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-emerald-300" />
                <div>
                  <span className="font-medium text-white">Faça login ou crie uma conta</span> para salvar esta simulação.
                  <div className="mt-1">
                    <Link href="/login" className="font-medium text-emerald-300 hover:underline">Entrar</Link>
                    {" ou "}
                    <Link href="/cadastro" className="font-medium text-emerald-300 hover:underline">Criar conta</Link>
                  </div>
                </div>
              </div>
            )}
          </div>

          <SimulationResult result={result} />
        </div>
      )}
    </div>
  );
}
