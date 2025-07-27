import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Suspense, lazy } from "react";
import ErrorBoundary from "@/components/ErrorBoundary";
import WhatsAppButton from "@/components/WhatsAppButton";
import ChatbotImproved from "@/components/ChatbotImproved";
import { useAnalytics } from "./hooks/use-analytics";
import { CartProvider } from "./contexts/CartContext";

// Lazy load pages for better performance
const Home = lazy(() => import("@/pages/Home"));
const ProductDetail = lazy(() => import("@/pages/ProductDetail"));
const TratamientosFaciales = lazy(() => import("@/pages/TratamientosFaciales"));
const TratamientoDetail = lazy(() => import("@/pages/TratamientoDetail"));
const Micropigmentacion = lazy(() => import("@/pages/Micropigmentacion"));
const EliminacionVello = lazy(() => import("@/pages/EliminacionVello"));
const TratamientosCorporales = lazy(() => import("@/pages/TratamientosCorporales"));
const OtrosTratamientos = lazy(() => import("@/pages/OtrosTratamientos"));
const NotFound = lazy(() => import("@/pages/not-found"));

// Loading component
const LoadingSpinner = () => (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-neutral via-white to-neutral">
    <div className="text-center">
      <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary mx-auto mb-4"></div>
      <p className="text-textLight font-medium">Cargando...</p>
    </div>
  </div>
);

function Router() {
  // Track page views when routes change
  useAnalytics();
  
  return (
    <ErrorBoundary>
      <Suspense fallback={<LoadingSpinner />}>
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
      </Suspense>
    </ErrorBoundary>
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
          <ChatbotImproved />
        </TooltipProvider>
      </CartProvider>
    </QueryClientProvider>
  );
}

export default App;
