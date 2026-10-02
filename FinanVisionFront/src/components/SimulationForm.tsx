import { z } from "zod";
import { Link } from "wouter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Loader2, Landmark, Percent, WalletCards } from "lucide-react";
import { useState } from "react";

const formatCurrencyLive = (value: string) => {
  const digits = value.replace(/\D/g, "");
  if (!digits) return "";

  if (digits.length <= 2) {
    return digits;
  }

  const integer = digits.slice(0, -2);
  const decimal = digits.slice(-2);

  return `${Number(integer).toLocaleString("pt-BR")},${decimal}`;
};

const formatPercentLive = (value: string) => {
  const digits = value.replace(/\D/g, "");
  if (!digits) return "";

  if (digits.length <= 2) {
    return digits;
  }

  const integer = digits.slice(0, -2);
  const decimal = digits.slice(-2);

  return `${Number(integer).toLocaleString("pt-BR")},${decimal}`;
};

const formatBrazilianNumber = (value: number | string) => {
  if (value === null || value === undefined || value === "") return "";

  const normalized =
    typeof value === "string"
      ? value.replace(/\./g, "").replace(",", ".")
      : String(value);
  const number = Number(normalized);

  if (!Number.isFinite(number)) return "";

  return new Intl.NumberFormat("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(number);
};

const parseBrazilianNumber = (value: string) => {
  if (value === "") return 0;

  const normalized = value
    .replace(/[^0-9,.-]/g, "")
    .replace(/\./g, "")
    .replace(",", ".");

  const parsed = Number(normalized);
  return Number.isFinite(parsed) ? parsed : 0;
};

const formatPercent = (value: number | string) => {
  if (value === null || value === undefined || value === "") return "";
  const number = typeof value === "string" ? Number(value.replace(",", ".")) : Number(value);
  if (!Number.isFinite(number)) return "";
  return new Intl.NumberFormat("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(number);
};

const simulationSchema = z
  .object({
    valorImovel: z.coerce.number().min(0.01, "Valor do imóvel deve ser maior que 0"),
    valorEntrada: z.coerce.number().min(0, "Valor da entrada não pode ser negativo"),
    taxaJuros: z.coerce.number().min(0.01, "Taxa deve ser no mínimo 0.01%").max(15, "Taxa máxima permitida é 15%"),
    prazoFinanciamento: z.coerce.number().int().min(1, "Prazo mínimo é 1 mês").max(420, "Prazo máximo é 420 meses"),
    tipoFinanciamento: z.enum(["SAC", "PRICE"], {
      required_error: "Selecione o tipo de amortização",
    }),
  })
  .refine((data) => data.valorEntrada < data.valorImovel, {
    message: "O valor da entrada deve ser menor que o valor do imóvel",
    path: ["valorEntrada"],
  });

export type SimulationInput = z.infer<typeof simulationSchema>;

interface SimulationFormProps {
  onSubmit: (data: SimulationInput) => void;
  isLoading: boolean;
  defaultValues?: Partial<SimulationInput>;
}

export function SimulationForm({ onSubmit, isLoading, defaultValues }: SimulationFormProps) {
  const form = useForm<SimulationInput>({
    resolver: zodResolver(simulationSchema),
    defaultValues: {
      valorImovel: defaultValues?.valorImovel || 0,
      valorEntrada: defaultValues?.valorEntrada || 0,
      taxaJuros: defaultValues?.taxaJuros || 0,
      prazoFinanciamento: defaultValues?.prazoFinanciamento || 0,
      tipoFinanciamento: defaultValues?.tipoFinanciamento || "SAC",
    },
  });

  const [valorImovelDisplay, setValorImovelDisplay] = useState("");
  const [valorEntradaDisplay, setValorEntradaDisplay] = useState("");
  const [taxaJurosDisplay, setTaxaJurosDisplay] = useState("");

  const handleCurrencyInput = (value: string, onChange: (value: number) => void, setDisplay: (value: string) => void) => {
    const masked = formatCurrencyLive(value);
    setDisplay(masked);
    onChange(parseBrazilianNumber(masked));
  };

  const handlePercentInput = (value: string, onChange: (value: number) => void, setDisplay: (value: string) => void) => {
    const masked = formatPercentLive(value);
    setDisplay(masked);
    onChange(parseBrazilianNumber(masked));
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <FormField
            control={form.control}
            name="valorImovel"
            render={({ field }) => (
              <FormItem className="rounded-2xl border border-white/10 bg-slate-950/60 p-3 shadow-sm">
                <div className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-300">
                  <Landmark className="h-4 w-4 text-emerald-300" />
                  Valor do imóvel
                </div>
                <div className="relative">
                  <span className="pointer-events-none absolute left-0 top-1/2 -translate-y-1/2 pl-0 text-base font-semibold text-emerald-300">R$</span>
                  <FormControl>
                    <Input
                      type="text"
                      inputMode="decimal"
                      placeholder="Ex: 500.000,00"
                      data-testid="input-valor-imovel"
                      value={valorImovelDisplay || (field.value ? formatBrazilianNumber(field.value) : "")}
                      onChange={(event) => {
                        handleCurrencyInput(event.target.value, field.onChange, setValorImovelDisplay);
                      }}
                      className="border-0 bg-transparent pl-8 pr-0 text-lg font-semibold text-white shadow-none placeholder:text-slate-500 focus-visible:ring-0"
                    />
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="valorEntrada"
            render={({ field }) => (
              <FormItem className="rounded-2xl border border-white/10 bg-slate-950/60 p-3 shadow-sm">
                <div className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-300">
                  <WalletCards className="h-4 w-4 text-emerald-300" />
                  Entrada
                </div>
                <div className="relative">
                  <span className="pointer-events-none absolute left-0 top-1/2 -translate-y-1/2 pl-0 text-base font-semibold text-emerald-300">R$</span>
                  <FormControl>
                    <Input
                      type="text"
                      inputMode="decimal"
                      placeholder="Ex: 100.000,00"
                      data-testid="input-valor-entrada"
                      value={valorEntradaDisplay || (field.value ? formatBrazilianNumber(field.value) : "")}
                      onChange={(event) => {
                        handleCurrencyInput(event.target.value, field.onChange, setValorEntradaDisplay);
                      }}
                      className="border-0 bg-transparent pl-8 pr-0 text-lg font-semibold text-white shadow-none placeholder:text-slate-500 focus-visible:ring-0"
                    />
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="taxaJuros"
            render={({ field }) => (
              <FormItem className="rounded-2xl border border-white/10 bg-slate-950/60 p-3 shadow-sm">
                <div className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-300">
                  <Percent className="h-4 w-4 text-emerald-300" />
                  Taxa de juros
                </div>
                <div className="relative">
                  <FormControl>
                    <Input
                      type="text"
                      inputMode="decimal"
                      placeholder="Ex: 0,80"
                      data-testid="input-taxa-juros"
                      value={taxaJurosDisplay || (field.value ? formatPercent(field.value) : "")}
                      onChange={(event) => {
                        handlePercentInput(event.target.value, field.onChange, setTaxaJurosDisplay);
                      }}
                      className="border-0 bg-transparent pr-10 text-lg font-semibold text-white shadow-none placeholder:text-slate-500 focus-visible:ring-0"
                    />
                  </FormControl>
                  <span className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 pr-0 text-base font-semibold text-emerald-300">%</span>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="prazoFinanciamento"
            render={({ field }) => (
              <FormItem className="rounded-2xl border border-white/10 bg-slate-950/60 p-3 shadow-sm">
                <div className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-300">
                  <Landmark className="h-4 w-4 text-emerald-300" />
                  Prazo
                </div>
                <div className="relative">
                  <FormControl>
                    <Input
                      type="text"
                      inputMode="numeric"
                      placeholder="Ex: 360"
                      data-testid="input-prazo"
                      value={field.value ? String(field.value) : ""}
                      onChange={(event) => {
                        const nextValue = event.target.value.replace(/\D/g, "");
                        field.onChange(nextValue === "" ? 0 : Number(nextValue));
                      }}
                      className="border-0 bg-transparent pr-14 text-lg font-semibold text-white shadow-none placeholder:text-slate-500 focus-visible:ring-0"
                    />
                  </FormControl>
                  <span className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 pr-0 text-base font-semibold text-emerald-300">meses</span>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="md:col-span-2">
            <FormField
              control={form.control}
              name="tipoFinanciamento"
              render={({ field }) => (
                <FormItem className="rounded-2xl border border-white/10 bg-slate-950/60 p-3 shadow-sm">
                  <FormLabel className="mb-2 block text-sm font-medium text-slate-300">Sistema de amortização</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger data-testid="select-tipo" className="h-12 border-0 bg-transparent px-0 text-lg font-semibold text-white shadow-none focus:ring-0">
                        <SelectValue placeholder="Selecione o sistema" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="SAC">SAC (Sistema de Amortização Constante)</SelectItem>
                      <SelectItem value="PRICE">Tabela Price (Parcelas Fixas)</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <Button
          type="submit"
          className="w-full rounded-full bg-emerald-500 px-6 py-5 text-base font-semibold text-slate-950 shadow-lg shadow-emerald-500/20 hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-60"
          disabled={isLoading}
          data-testid="button-simulate"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Simulando...
            </>
          ) : (
            "Simular financiamento"
          )}
        </Button>
      </form>
    </Form>
  );
}
