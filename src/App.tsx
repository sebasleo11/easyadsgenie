
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AssistantProvider } from "@/contexts/AssistantContext";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Metricas from "./pages/Metricas";
import Campanas from "./pages/Campanas";
import Segmentacion from "./pages/Segmentacion";
import Creatividades from "./pages/Creatividades";
import Imagenes from "./pages/Imagenes";
import Optimizacion from "./pages/Optimizacion";
import Preferencias from "./pages/Preferencias";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AssistantProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/metricas" element={<Metricas />} />
            <Route path="/campanas" element={<Campanas />} />
            <Route path="/segmentacion" element={<Segmentacion />} />
            <Route path="/creatividades" element={<Creatividades />} />
            <Route path="/imagenes" element={<Imagenes />} />
            <Route path="/optimizacion" element={<Optimizacion />} />
            <Route path="/preferencias" element={<Preferencias />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AssistantProvider>
  </QueryClientProvider>
);

export default App;
