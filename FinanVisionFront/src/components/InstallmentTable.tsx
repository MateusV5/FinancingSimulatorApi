import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatCurrency } from "@/lib/utils";

interface Installment {
  numero: number;
  valor: number;
  juros: number;
  amortizacao: number;
  saldoDevedor: number;
}

interface InstallmentTableProps {
  installments: Installment[];
}

export function InstallmentTable({ installments }: InstallmentTableProps) {
  return (
    <div className="overflow-hidden rounded-[20px] border border-white/10 bg-slate-950/60 shadow-[0_18px_40px_-30px_rgba(16,185,129,0.25)]">
      <Table>
        <TableHeader className="bg-slate-900/80">
          <TableRow>
            <TableHead className="w-[90px] text-center text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400">
              Nº
            </TableHead>
            <TableHead className="text-right text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400">
              Parcela
            </TableHead>
            <TableHead className="text-right text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400">
              Juros
            </TableHead>
            <TableHead className="text-right text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400">
              Amortização
            </TableHead>
            <TableHead className="text-right text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400">
              Saldo devedor
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {installments.map((inst) => (
            <TableRow
              key={inst.numero}
              className="border-t border-white/10 hover:bg-white/5"
            >
              <TableCell className="text-center font-semibold text-slate-400">
                {inst.numero}
              </TableCell>
              <TableCell className="text-right font-semibold text-white">
                {formatCurrency(inst.valor)}
              </TableCell>
              <TableCell className="text-right text-slate-300">
                {formatCurrency(inst.juros)}
              </TableCell>
              <TableCell className="text-right text-slate-300">
                {formatCurrency(inst.amortizacao)}
              </TableCell>
              <TableCell className="text-right font-medium text-slate-100">
                {formatCurrency(inst.saldoDevedor)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
