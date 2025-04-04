
import { useState } from "react";
import Layout from "@/components/Layout";
import SebaBot from "@/components/SebaBot";

const Segmentacion = () => {
  const [botDismissed, setBotDismissed] = useState(false);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-6">
        <h1 className="text-3xl font-bold mb-6">Segmentación</h1>
        
        <p className="mb-4">Esta es la página de Segmentación donde puedes definir la audiencia para tus anuncios.</p>
        
        <div className="bg-gray-100 p-6 rounded-lg mb-6">
          <h2 className="text-xl font-semibold mb-2">Segmentación de audiencia</h2>
          <p>Define quién verá tus anuncios para maximizar su efectividad.</p>
        </div>
        
        {!botDismissed && (
          <SebaBot
            category="segmentation"
            triggerPoint="audience_start"
            onClose={() => setBotDismissed(true)}
          />
        )}
      </div>
    </Layout>
  );
};

export default Segmentacion;
