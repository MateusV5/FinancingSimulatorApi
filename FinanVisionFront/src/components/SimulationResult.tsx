import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { InstallmentTable } from "./InstallmentTable";
import { formatCurrency } from "@/lib/utils";

interface Installment {
  numero: number;
  valor: number;
  juros: number;
  amortizacao: number;
  saldoDevedor: number;
}

interface SimulationResultProps {
  totalPago: number;
  totalJuros: number;
  totalAmortizado: number;
  parcelas: Installment[];
}

export function SimulationResult({
  result,
}: {
  result: SimulationResultProps;
}) {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Pago
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div
              className="text-2xl font-bold text-foreground"
              data-testid="result-total-pago"
            >
              {formatCurrency(result.totalPago)}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total de Juros
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div
              className="text-2xl font-bold text-destructive"
              data-testid="result-total-juros"
            >
              {formatCurrency(result.totalJuros)}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Amortizado
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div
              className="text-2xl font-bold text-primary"
              data-testid="result-total-amortizado"
            >
              {formatCurrency(result.totalAmortizado)}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold tracking-tight">
          Cronograma de Pagamento
        </h3>
        <InstallmentTable installments={result.parcelas} />
      </div>
    </div>
  );
}
