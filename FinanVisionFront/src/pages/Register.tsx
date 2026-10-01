import { useState } from "react";
import { Link, useLocation } from "wouter";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { api } from "@/services/api";
import { useToast } from "@/hooks/use-toast";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Building2 } from "lucide-react";

const registerSchema = z.object({
  nome: z.string().min(3, "O nome deve ter no mínimo 3 caracteres").max(100, "Máximo 100 caracteres"),
  email: z.string().email("E-mail inválido"),
  senha: z.string().min(6, "A senha deve ter no mínimo 6 caracteres").max(100, "Máximo 100 caracteres"),
});

type RegisterInput = z.infer<typeof registerSchema>;

export function Register() {
  const { toast } = useToast();
  const [, setLocation] = useLocation();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
    defaultValues: { nome: "", email: "", senha: "" },
  });

  const onSubmit = async (data: RegisterInput) => {
    setIsLoading(true);
    try {
      await api.post("/api/Usuarios", data);
      toast({
        title: "Conta criada com sucesso",
        description: "Faça login para continuar.",
      });
      setLocation("/login");
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Erro ao criar conta",
        description: error.message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-xl shadow-black/5">
        <CardHeader className="space-y-3 text-center">
          <div className="flex justify-center mb-2">
            <div className="bg-primary text-primary-foreground p-3 rounded-xl inline-flex">
              <Building2 className="h-6 w-6" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold tracking-tight">Criar Conta</CardTitle>
          <CardDescription>
            Cadastre-se para salvar e comparar suas simulações de financiamento.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="nome"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome completo</FormLabel>
                    <FormControl>
                      <Input placeholder="Seu nome" data-testid="input-nome" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>E-mail</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="seu@email.com" data-testid="input-email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="senha"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Senha</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="••••••••" data-testid="input-senha" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" disabled={isLoading} data-testid="button-register">
                {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Cadastrar"}
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex justify-center border-t p-4">
          <p className="text-sm text-muted-foreground">
            Já tem uma conta?{" "}
            <Link href="/login" className="text-primary hover:underline font-medium" data-testid="link-login">
              Entrar
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
