import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CalendarDays, Percent, Timer, Eye } from "lucide-react";
import { Link } from "wouter";
import { formatCurrency, formatPercent, formatDate } from "@/lib/utils";

interface HistoryItem {
  id: number;
  valorImovel: number;
  valorEntrada: number;
  prazoMeses: number;
  taxaJuros: number;
  sistemaAmortizacao: string;
  dataCriacao: string;
}

export function HistoryCard({ item }: { item: HistoryItem }) {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-3 flex flex-row items-center justify-between">
        <div className="space-y-1">
          <CardTitle className="text-lg">
            {formatCurrency(item.valorImovel)}
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Entrada: {formatCurrency(item.valorEntrada)}
          </p>
        </div>
        <Badge
          variant={item.sistemaAmortizacao === "SAC" ? "default" : "secondary"}
        >
          {item.sistemaAmortizacao}
        </Badge>
      </CardHeader>
      <CardContent className="pb-4">
        <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Percent className="h-4 w-4" />
            <span>{formatPercent(item.taxaJuros)} a.m.</span>
          </div>
          <div className="flex items-center gap-2">
            <Timer className="h-4 w-4" />
            <span>{item.prazoMeses} meses</span>
          </div>
          <div className="flex items-center gap-2 col-span-2">
            <CalendarDays className="h-4 w-4" />
            <span>Simulado em {formatDate(item.dataCriacao)}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="pt-0">
        <Link href={`/simulacao/${item.id}`} className="w-full">
          <Button
            variant="outline"
            className="w-full group"
            data-testid={`btn-ver-detalhes-${item.id}`}
          >
            <Eye className="h-4 w-4 mr-2 group-hover:text-primary transition-colors" />
            Ver detalhes
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
