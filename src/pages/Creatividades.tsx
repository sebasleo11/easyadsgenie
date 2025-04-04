
import { useState } from "react";
import Layout from "@/components/Layout";
import SebaBot from "@/components/SebaBot";

const Creatividades = () => {
  const [botDismissed, setBotDismissed] = useState(false);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-6">
        <h1 className="text-3xl font-bold mb-6">Creatividades</h1>
        
        <p className="mb-4">Esta es la página de Creatividades donde puedes gestionar los textos e imágenes para tus anuncios.</p>
        
        <div className="bg-gray-100 p-6 rounded-lg mb-6">
          <h2 className="text-xl font-semibold mb-2">Zona de trabajo</h2>
          <p>Aquí puedes comenzar a crear tus creatividades para anuncios.</p>
        </div>
        
        {!botDismissed && (
          <SebaBot
            category="creative"
            triggerPoint="creative_selection"
            onClose={() => setBotDismissed(true)}
          />
        )}
      </div>
    </Layout>
  );
};

export default Creatividades;
