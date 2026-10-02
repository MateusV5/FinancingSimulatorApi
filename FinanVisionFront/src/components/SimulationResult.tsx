import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { InstallmentTable } from "./InstallmentTable";
import { formatCurrency } from "@/lib/utils";
import { ArrowDownCircle, ArrowUpCircle, Wallet, TrendingUp } from "lucide-react";

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
  const stats = [
    {
      title: "Total pago",
      value: formatCurrency(result.totalPago),
      color: "from-emerald-500/15 to-emerald-500/5",
      icon: ArrowUpCircle,
      textColor: "text-emerald-300",
      testId: "result-total-pago",
    },
    {
      title: "Total de juros",
      value: formatCurrency(result.totalJuros),
      color: "from-amber-500/15 to-amber-500/5",
      icon: TrendingUp,
      textColor: "text-amber-300",
      testId: "result-total-juros",
    },
    {
      title: "Total amortizado",
      value: formatCurrency(result.totalAmortizado),
      color: "from-sky-500/15 to-sky-500/5",
      icon: Wallet,
      textColor: "text-sky-300",
      testId: "result-total-amortizado",
    },
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {stats.map(({ title, value, color, icon: Icon, textColor, testId }) => (
          <Card
            key={title}
            className={`overflow-hidden border border-white/10 bg-gradient-to-br ${color} text-white shadow-[0_18px_40px_-30px_rgba(16,185,129,0.38)]`}
          >
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-slate-300">{title}</CardTitle>
                <div className="rounded-xl bg-slate-950/60 p-2 shadow-sm">
                  <Icon className={`h-4 w-4 ${textColor}`} />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-black tracking-tight ${textColor}`} data-testid={testId}>
                {value}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-black tracking-tight text-white">Cronograma de pagamento</h3>
          <div className="flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-emerald-300">
            <ArrowDownCircle className="h-3.5 w-3.5" />
            Fluxo de caixa
          </div>
        </div>
        <InstallmentTable installments={result.parcelas} />
      </div>
    </div>
  );
}
