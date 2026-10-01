import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import { ProtectedRoute } from "@/components/ProtectedRoute";

import { Home } from "@/pages/Home";
import { Login } from "@/pages/Login";
import { Register } from "@/pages/Register";
import { History } from "@/pages/History";
import { SimulationDetail } from "@/pages/SimulationDetail";
import { Navbar } from "@/components/Navbar";

const queryClient = new QueryClient();

function Router() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1">
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/cadastro" component={Register} />
          
          <Route path="/historico">
            {() => <ProtectedRoute component={History} />}
          </Route>
          
          <Route path="/simulacao/:id">
            {(params) => <ProtectedRoute component={SimulationDetail} id={params.id} />}
          </Route>

          <Route component={NotFound} />
        </Switch>
      </main>
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
