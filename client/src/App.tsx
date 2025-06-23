import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import ProductDetail from "@/pages/ProductDetail";
import TratamientosFaciales from "@/pages/TratamientosFaciales";
import TratamientoDetail from "@/pages/TratamientoDetail";
import Micropigmentacion from "@/pages/Micropigmentacion";
import EliminacionVello from "@/pages/EliminacionVello";
import TratamientosCorporales from "@/pages/TratamientosCorporales";
import OtrosTratamientos from "@/pages/OtrosTratamientos";
import WhatsAppButton from "@/components/WhatsAppButton";
import Chatbot from "@/components/Chatbot";
import { useAnalytics } from "./hooks/use-analytics";
import { CartProvider } from "./contexts/CartContext";

function Router() {
  // Track page views when routes change
  useAnalytics();
  
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/productos/:id" component={ProductDetail} />
      <Route path="/tratamientos-faciales" component={TratamientosFaciales} />
      <Route path="/tratamiento-facial/:id" component={TratamientoDetail} />
      <Route path="/micropigmentacion" component={Micropigmentacion} />
      <Route path="/eliminacion-vello" component={EliminacionVello} />
      <Route path="/tratamientos-corporales" component={TratamientosCorporales} />
      <Route path="/otros-tratamientos" component={OtrosTratamientos} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <CartProvider>
        <TooltipProvider>
          <Router />
          <Toaster />
          <WhatsAppButton />
          <Chatbot />
        </TooltipProvider>
      </CartProvider>
    </QueryClientProvider>
  );
}

export default App;
