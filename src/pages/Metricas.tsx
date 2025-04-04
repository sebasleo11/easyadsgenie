
import { useState } from "react";
import Layout from "@/components/Layout";
import SebaBot from "@/components/SebaBot";

const Metricas = () => {
  const [botDismissed, setBotDismissed] = useState(false);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-6">
        <h1 className="text-3xl font-bold mb-6">Métricas y Análisis</h1>
        
        <p className="mb-4">Aquí podrás visualizar el rendimiento de tus campañas publicitarias y obtener insights valiosos sobre tu audiencia.</p>
        
        <div className="bg-gray-100 p-6 rounded-lg mb-6">
          <h2 className="text-xl font-semibold mb-2">Panel de métricas</h2>
          <p>Visualiza el rendimiento de tus campañas activas.</p>
        </div>
        
        {!botDismissed && (
          <SebaBot
            category="metrics"
            triggerPoint="dashboard_overview"
            onClose={() => setBotDismissed(true)}
          />
        )}
      </div>
    </Layout>
  );
};

export default Metricas;
