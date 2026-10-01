import { z } from "zod";
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
import { Loader2 } from "lucide-react";

const simulationSchema = z
  .object({
    valorImovel: z.coerce
      .number()
      .min(0.01, "Valor do imóvel deve ser maior que 0"),
    valorEntrada: z.coerce
      .number()
      .min(0, "Valor da entrada não pode ser negativo"),
    taxaJuros: z.coerce
      .number()
      .min(0.01, "Taxa deve ser no mínimo 0.01%")
      .max(15, "Taxa máxima permitida é 15%"),
    prazoFinanciamento: z.coerce
      .number()
      .int()
      .min(1, "Prazo mínimo é 1 mês")
      .max(420, "Prazo máximo é 420 meses"),
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

export function SimulationForm({
  onSubmit,
  isLoading,
  defaultValues,
}: SimulationFormProps) {
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

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="valorImovel"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Valor do Imóvel (R$)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    step="0.01"
                    placeholder="Ex: 500000.00"
                    data-testid="input-valor-imovel"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="valorEntrada"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Valor de Entrada (R$)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    step="0.01"
                    placeholder="Ex: 100000.00"
                    data-testid="input-valor-entrada"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="taxaJuros"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Taxa de Juros (% ao mês)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    step="0.01"
                    placeholder="Ex: 0.8"
                    data-testid="input-taxa-juros"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="prazoFinanciamento"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Prazo (meses)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Ex: 360"
                    data-testid="input-prazo"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="tipoFinanciamento"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Sistema de Amortização</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger data-testid="select-tipo">
                      <SelectValue placeholder="Selecione o sistema" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="SAC">
                      SAC (Sistema de Amortização Constante)
                    </SelectItem>
                    <SelectItem value="PRICE">
                      Tabela Price (Parcelas Fixas)
                    </SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button
          type="submit"
          className="w-full"
          disabled={isLoading}
          data-testid="button-simulate"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Simulando...
            </>
          ) : (
            "Simular Financiamento"
          )}
        </Button>
      </form>
    </Form>
  );
}
