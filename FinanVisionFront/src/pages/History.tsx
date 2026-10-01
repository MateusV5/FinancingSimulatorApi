import { useState, useEffect } from "react";
import { Link } from "wouter";
import { api } from "@/services/api";
import { useToast } from "@/hooks/use-toast";
import { HistoryCard } from "@/components/HistoryCard";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { Button } from "@/components/ui/button";
import { Calculator, LayoutGrid } from "lucide-react";

export function History() {
  const { toast } = useToast();
  const [history, setHistory] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const response = await api.get("/api/Simulacao/historico");
      setHistory(response.data || []);
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Erro ao carregar histórico",
        description: error.message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <LayoutGrid className="h-7 w-7 text-primary" />
            Seu Histórico
          </h1>
          <p className="text-muted-foreground mt-1">Consulte as simulações que você salvou anteriormente.</p>
        </div>
        <Link href="/">
          <Button data-testid="btn-nova-simulacao">
            <Calculator className="h-4 w-4 mr-2" />
            Nova Simulação
          </Button>
        </Link>
      </div>

      {history.length === 0 ? (
        <div className="bg-muted/50 rounded-lg border border-dashed border-border p-12 text-center">
          <div className="mx-auto w-16 h-16 bg-background rounded-full flex items-center justify-center shadow-sm mb-4">
            <Calculator className="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 className="text-xl font-semibold mb-2 text-foreground">Você ainda não possui simulações salvas.</h3>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto">
            Faça uma simulação de financiamento imobiliário e clique em salvar para que ela apareça aqui.
          </p>
          <Link href="/">
            <Button variant="outline">Ir para Simulação</Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {history.map((item) => (
            <HistoryCard key={item.id} item={item} />
          ))}
        </div>
      )}
    </div>
  );
}
