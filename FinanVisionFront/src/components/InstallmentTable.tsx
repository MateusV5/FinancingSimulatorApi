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
    <div className="rounded-md border bg-white overflow-hidden">
      <Table>
        <TableHeader className="bg-muted/50">
          <TableRow>
            <TableHead className="w-[100px] text-center">Nº</TableHead>
            <TableHead className="text-right">Parcela</TableHead>
            <TableHead className="text-right">Juros</TableHead>
            <TableHead className="text-right">Amortização</TableHead>
            <TableHead className="text-right">Saldo Devedor</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {installments.map((inst) => (
            <TableRow key={inst.numero}>
              <TableCell className="text-center font-medium text-muted-foreground">
                {inst.numero}
              </TableCell>
              <TableCell className="text-right font-medium">
                {formatCurrency(inst.valor)}
              </TableCell>
              <TableCell className="text-right text-muted-foreground">
                {formatCurrency(inst.juros)}
              </TableCell>
              <TableCell className="text-right text-muted-foreground">
                {formatCurrency(inst.amortizacao)}
              </TableCell>
              <TableCell className="text-right">
                {formatCurrency(inst.saldoDevedor)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
