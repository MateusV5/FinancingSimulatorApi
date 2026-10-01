import { useState } from "react";
import { Link, useLocation } from "wouter";
import { useAuth } from "@/context/AuthContext";
import { api } from "@/services/api";
import { useToast } from "@/hooks/use-toast";
import { SimulationForm, SimulationInput } from "@/components/SimulationForm";
import { SimulationResult } from "@/components/SimulationResult";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calculator, Save, AlertCircle } from "lucide-react";

export function Home() {
  const { isAuthenticated } = useAuth();
  const { toast } = useToast();
  const [, setLocation] = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [lastInput, setLastInput] = useState<SimulationInput | null>(null);

  const handleSimulate = async (data: SimulationInput) => {
    setIsLoading(true);
    setResult(null);
    setLastInput(data);
    try {
      const response = await api.post("/api/Simulacao", data);
      setResult(response.data);
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Erro na simulação",
        description: error.message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    if (!lastInput) return;
    setIsSaving(true);
    try {
      await api.post("/api/Simulacao/salvar", lastInput);
      toast({
        title: "Simulação salva",
        description: "Sua simulação foi salva com sucesso no histórico.",
      });
      setLocation("/historico");
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Erro ao salvar",
        description: error.message,
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl space-y-12">
      <div className="text-center max-w-2xl mx-auto space-y-4">
        <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-2xl mb-4">
          <Calculator className="h-8 w-8 text-primary" />
        </div>
        <h1 className="text-4xl font-bold tracking-tight text-foreground">Planeje seu futuro com precisão.</h1>
        <p className="text-lg text-muted-foreground">
          Simule seu financiamento imobiliário e compare os sistemas SAC e PRICE. 
          Resultados transparentes para a sua melhor decisão financeira.
        </p>
      </div>

      <Card className="border-border shadow-lg shadow-black/5">
        <CardHeader>
          <CardTitle>Nova Simulação</CardTitle>
          <CardDescription>Preencha os dados abaixo para gerar o cronograma de pagamento.</CardDescription>
        </CardHeader>
        <CardContent>
          <SimulationForm onSubmit={handleSimulate} isLoading={isLoading} />
        </CardContent>
      </Card>

      {result && (
        <div className="space-y-6" id="resultado-simulacao">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b">
            <div>
              <h2 className="text-2xl font-bold tracking-tight">Resultado da Simulação</h2>
              <p className="text-muted-foreground">Sistema {lastInput?.tipoFinanciamento}</p>
            </div>
            
            {isAuthenticated ? (
              <Button onClick={handleSave} disabled={isSaving} className="gap-2" data-testid="btn-salvar">
                <Save className="h-4 w-4" />
                {isSaving ? "Salvando..." : "Salvar simulação"}
              </Button>
            ) : (
              <div className="bg-muted px-4 py-3 rounded-lg flex items-start sm:items-center gap-3 text-sm">
                <AlertCircle className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5 sm:mt-0" />
                <div>
                  <span className="text-foreground font-medium">Faça login ou crie uma conta</span> para salvar esta simulação.{" "}
                  <div className="mt-1 sm:mt-0 sm:inline-block">
                    <Link href="/login" className="text-primary hover:underline font-medium">Entrar</Link>
                    {" ou "}
                    <Link href="/cadastro" className="text-primary hover:underline font-medium">Criar conta</Link>
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
