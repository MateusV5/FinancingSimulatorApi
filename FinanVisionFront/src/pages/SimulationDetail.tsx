import { useState, useEffect } from "react";
import { Link } from "wouter";
import { api } from "@/services/api";
import { useToast } from "@/hooks/use-toast";
import { SimulationResult } from "@/components/SimulationResult";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Home, FileText, AlertCircle } from "lucide-react";

export function SimulationDetail({ id }: { id: string }) {
  const { toast } = useToast();
  const [result, setResult] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchSimulationDetail();
  }, [id]);

  const fetchSimulationDetail = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const apiResponse = await api.get(`/api/Simulacao/${id}`);

      console.log("Resposta da API:", apiResponse);

      if (!apiResponse.success) {
        throw new Error(apiResponse.message || "Erro ao carregar simulação.");
      }

      setResult(apiResponse.data);
    } catch (error: any) {
      const message =
        error.message || "Erro ao carregar detalhes da simulação.";
      setError(message);

      toast({
        variant: "destructive",
        title: "Erro ao carregar detalhes",
        description: message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error || !result) {
    return (
      <div className="container mx-auto px-4 py-16 max-w-2xl text-center">
        <div className="bg-destructive/10 text-destructive p-4 rounded-full inline-flex mb-4">
          <AlertCircle className="h-8 w-8" />
        </div>
        <h2 className="text-2xl font-bold tracking-tight mb-2">
          Simulação não encontrada
        </h2>
        <p className="text-muted-foreground mb-8">
          {error ||
            "A simulação solicitada não existe ou você não tem permissão para acessá-la."}
        </p>
        <Link href="/historico">
          <Button variant="outline">Voltar ao histórico</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
          <Link
            href="/historico"
            className="hover:text-foreground transition-colors flex items-center"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Histórico
          </Link>
          <span>/</span>
          <span className="text-foreground font-medium">
            Detalhes da Simulação
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Link href="/historico">
            <Button variant="outline" size="sm">
              Histórico
            </Button>
          </Link>
          <Link href="/">
            <Button size="sm">
              <Home className="h-4 w-4 mr-1.5" />
              Nova Simulação
            </Button>
          </Link>
        </div>
      </div>

      <div className="flex items-center gap-3 border-b pb-4">
        <FileText className="h-8 w-8 text-primary" />
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Detalhes do Financiamento
          </h1>
          <p className="text-muted-foreground">
            Resultado recalculado com base na simulação salva.
          </p>
        </div>
      </div>

      <SimulationResult result={result} />
    </div>
  );
}
