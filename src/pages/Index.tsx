
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import OnboardingWizard from "@/components/OnboardingWizard";
import Dashboard from "@/components/Dashboard";
import AdGenerator from "@/components/AdGenerator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useIsMobile } from "@/hooks/use-mobile";

const Index = () => {
  const [onboarded, setOnboarded] = useState(false);
  const [userData, setUserData] = useState(null);
  const isMobile = useIsMobile();
  const navigate = useNavigate();

  const handleOnboardingComplete = (data: any) => {
    setUserData(data);
    setOnboarded(true);
  };

  const handleTabChange = (value: string) => {
    if (value === "adcreator") {
      // This is just to handle the tab navigation within the component
      // The Sidebar now handles actual route navigation
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <div className="flex flex-1">
        {!isMobile && <Sidebar />}
        <div className="flex-1">
          {!onboarded ? (
            <div className="p-6">
              <div className="max-w-4xl mx-auto text-center mb-8">
                <h1 className="text-3xl font-bold mb-4">
                  ¡Bienvenido a Seba Generador de Anuncios!
                </h1>
                <p className="text-lg text-gray-600 mb-6">
                  Configura tu cuenta para empezar a crear anuncios efectivos en Facebook que impulsen tu negocio.
                </p>
              </div>
              <OnboardingWizard onComplete={handleOnboardingComplete} />
            </div>
          ) : (
            <Tabs defaultValue="dashboard" className="w-full" onValueChange={handleTabChange}>
              <div className="border-b">
                <div className="container flex h-14 items-center">
                  <TabsList className="grid w-60 grid-cols-2">
                    <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
                    <TabsTrigger value="adcreator">Crear Anuncio</TabsTrigger>
                  </TabsList>
                </div>
              </div>
              <TabsContent value="dashboard" className="m-0">
                <Dashboard userData={userData} />
              </TabsContent>
              <TabsContent value="adcreator" className="m-0">
                <AdGenerator />
              </TabsContent>
            </Tabs>
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;
