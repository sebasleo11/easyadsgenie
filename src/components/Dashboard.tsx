
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PlusCircle, TrendingUp, LineChart, BarChart, PieChart, Target, Users, Eye } from "lucide-react";

interface DashboardProps {
  userData: any;
}

const Dashboard = ({ userData }: DashboardProps) => {
  const campaignRecommendations = [
    {
      id: 1,
      title: "Campaña de Reconocimiento de Marca",
      description: "Ideal para aumentar la visibilidad y dar a conocer tu negocio a nuevas audiencias.",
      objective: "awareness",
      recommended: userData?.businessGoal === "awareness",
    },
    {
      id: 2,
      title: "Campaña de Generación de Tráfico",
      description: "Diseñada para atraer visitantes cualificados a tu sitio web o página de destino.",
      objective: "traffic",
      recommended: userData?.businessGoal === "traffic",
    },
    {
      id: 3,
      title: "Campaña de Generación de Leads",
      description: "Enfocada en obtener información de contacto de clientes potenciales interesados.",
      objective: "leads",
      recommended: userData?.businessGoal === "leads",
    },
    {
      id: 4,
      title: "Campaña de Conversiones",
      description: "Optimizada para maximizar las ventas y conversiones en tu tienda online.",
      objective: "sales",
      recommended: userData?.businessGoal === "sales",
    },
  ];

  const [selectedTab, setSelectedTab] = useState("overview");

  return (
    <div className="flex-1 space-y-6 p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">¡Bienvenido a EasyAdsGenie!</h1>
        <Button className="bg-brand-blue hover:bg-brand-darkBlue">
          <PlusCircle className="mr-2 h-4 w-4" /> Nueva Campaña
        </Button>
      </div>

      <Tabs defaultValue="overview" className="space-y-4" onValueChange={setSelectedTab}>
        <TabsList>
          <TabsTrigger value="overview">Resumen</TabsTrigger>
          <TabsTrigger value="recommendations">Recomendaciones</TabsTrigger>
          <TabsTrigger value="audienceInsights">Audiencia</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card className="card-hover">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Impresiones</CardTitle>
                <Eye className="h-4 w-4 text-brand-blue" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">0</div>
                <p className="text-xs text-gray-500">
                  Comienza tu primera campaña
                </p>
              </CardContent>
            </Card>
            <Card className="card-hover">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Clics</CardTitle>
                <TrendingUp className="h-4 w-4 text-brand-blue" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">0</div>
                <p className="text-xs text-gray-500">
                  Comienza tu primera campaña
                </p>
              </CardContent>
            </Card>
            <Card className="card-hover">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Conversiones</CardTitle>
                <BarChart className="h-4 w-4 text-brand-blue" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">0</div>
                <p className="text-xs text-gray-500">
                  Comienza tu primera campaña
                </p>
              </CardContent>
            </Card>
            <Card className="card-hover">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">CTR</CardTitle>
                <PieChart className="h-4 w-4 text-brand-blue" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">0%</div>
                <p className="text-xs text-gray-500">
                  Comienza tu primera campaña
                </p>
              </CardContent>
            </Card>
          </div>

          <Card className="card-hover">
            <CardHeader>
              <CardTitle>Próximos pasos</CardTitle>
              <CardDescription>
                Sigue estos pasos para configurar tu primera campaña efectiva.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full border bg-brand-blue text-white">
                    1
                  </div>
                  <div>
                    <h4 className="font-semibold">Elige un tipo de campaña recomendado</h4>
                    <p className="text-sm text-gray-500">
                      Basado en tu perfil, te sugerimos la mejor estrategia para alcanzar tus objetivos.
                    </p>
                    <Button variant="link" className="px-0 text-brand-blue" onClick={() => setSelectedTab("recommendations")}>
                      Ver recomendaciones
                    </Button>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full border bg-gray-200 text-gray-700">
                    2
                  </div>
                  <div>
                    <h4 className="font-semibold">Conecta tu cuenta de Facebook Ads</h4>
                    <p className="text-sm text-gray-500">
                      Vincula tu cuenta para poder publicar y gestionar tus anuncios desde aquí.
                    </p>
                    <Button variant="link" className="px-0 text-gray-500">
                      Conectar cuenta
                    </Button>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full border bg-gray-200 text-gray-700">
                    3
                  </div>
                  <div>
                    <h4 className="font-semibold">Crea tu primer anuncio</h4>
                    <p className="text-sm text-gray-500">
                      Utiliza nuestro asistente para crear anuncios optimizados en minutos.
                    </p>
                    <Button variant="link" className="px-0 text-gray-500">
                      Crear anuncio
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="recommendations" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Campañas recomendadas</CardTitle>
              <CardDescription>
                Basado en la información que proporcionaste, hemos seleccionado estas campañas que mejor se adaptan a tus objetivos.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {campaignRecommendations.map((campaign) => (
                <div
                  key={campaign.id}
                  className={`rounded-lg border p-4 ${
                    campaign.recommended ? "bg-blue-50 border-brand-blue" : ""
                  }`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-lg flex items-center">
                      {campaign.title}
                      {campaign.recommended && (
                        <span className="ml-2 px-2 py-0.5 text-xs rounded-full bg-brand-blue text-white">
                          Recomendado
                        </span>
                      )}
                    </h3>
                  </div>
                  <p className="text-gray-600 mb-4">{campaign.description}</p>
                  <div className="flex justify-end">
                    <Button className={campaign.recommended ? "bg-brand-blue hover:bg-brand-darkBlue" : "bg-gray-200 text-gray-800 hover:bg-gray-300"}>
                      {campaign.recommended ? "Seleccionar" : "Ver detalles"}
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="audienceInsights" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Target className="mr-2 h-5 w-5 text-brand-blue" />
                Tu audiencia ideal
              </CardTitle>
              <CardDescription>
                Basado en tu perfil, hemos identificado el segmento de audiencia más adecuado para tu negocio.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-medium text-brand-gray mb-2">Datos demográficos</h3>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm">Edad:</span>
                          <span className="font-medium">{userData?.targetAudience?.ageRange || "No definido"}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">Género:</span>
                          <span className="font-medium">
                            {userData?.targetAudience?.gender === "male"
                              ? "Hombres"
                              : userData?.targetAudience?.gender === "female"
                              ? "Mujeres"
                              : "Todos"}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">Ubicación:</span>
                          <span className="font-medium">{userData?.targetAudience?.location || "No definido"}</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-medium text-brand-gray mb-2">Intereses principales</h3>
                      <div className="flex flex-wrap gap-2">
                        {userData?.targetAudience?.interests
                          ? userData.targetAudience.interests
                              .split(",")
                              .map((interest: string, index: number) => (
                                <span
                                  key={index}
                                  className="px-2 py-1 bg-blue-100 text-brand-blue rounded-full text-xs"
                                >
                                  {interest.trim()}
                                </span>
                              ))
                          : "No definido"}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h3 className="font-medium text-brand-gray mb-2">Audiencias similares recomendadas</h3>
                      <ul className="space-y-2">
                        <li className="flex items-center">
                          <Users className="h-4 w-4 mr-2 text-brand-blue" />
                          <span>Interesados en productos similares</span>
                        </li>
                        <li className="flex items-center">
                          <Users className="h-4 w-4 mr-2 text-brand-blue" />
                          <span>Compradores recientes en tu categoría</span>
                        </li>
                        <li className="flex items-center">
                          <Users className="h-4 w-4 mr-2 text-brand-blue" />
                          <span>Seguidores de marcas competidoras</span>
                        </li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="font-medium text-brand-gray mb-2">Próximos pasos</h3>
                      <p className="text-sm text-gray-600 mb-3">
                        Para mejorar la precisión de tu segmentación, considera estas acciones:
                      </p>
                      <Button className="w-full bg-brand-blue hover:bg-brand-darkBlue">
                        Refinar mi audiencia
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Dashboard;
