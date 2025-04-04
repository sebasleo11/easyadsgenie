
import { useState } from "react";
import Layout from "@/components/Layout";
import SebaBot from "@/components/SebaBot";

const Optimizacion = () => {
  const [botDismissed, setBotDismissed] = useState(false);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-6">
        <h1 className="text-3xl font-bold mb-6">Optimización</h1>
        
        <p className="mb-4">Esta es la página de Optimización donde puedes mejorar el rendimiento de tus anuncios.</p>
        
        <div className="bg-gray-100 p-6 rounded-lg mb-6">
          <h2 className="text-xl font-semibold mb-2">Revisión final</h2>
          <p>Revisa y optimiza tus anuncios antes de publicarlos para maximizar su rendimiento.</p>
        </div>
        
        {!botDismissed && (
          <SebaBot
            category="optimization"
            triggerPoint="final_review"
            onClose={() => setBotDismissed(true)}
          />
        )}
      </div>
    </Layout>
  );
};

export default Optimizacion;
