
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Layout from "@/components/Layout";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend, LineChart, Line } from 'recharts';

const data = [
  { name: 'Ene', impresiones: 4000, clics: 2400, conversion: 400 },
  { name: 'Feb', impresiones: 3000, clics: 1398, conversion: 210 },
  { name: 'Mar', impresiones: 2000, clics: 9800, conversion: 290 },
  { name: 'Abr', impresiones: 2780, clics: 3908, conversion: 500 },
  { name: 'May', impresiones: 1890, clics: 4800, conversion: 380 },
  { name: 'Jun', impresiones: 2390, clics: 3800, conversion: 430 },
  { name: 'Jul', impresiones: 3490, clics: 4300, conversion: 580 },
];

const performanceData = [
  { name: 'Anuncio 1', ctr: 3.4, cpc: 0.56, conversion: 2.1 },
  { name: 'Anuncio 2', ctr: 2.8, cpc: 0.42, conversion: 1.8 },
  { name: 'Anuncio 3', ctr: 4.2, cpc: 0.61, conversion: 3.2 },
  { name: 'Anuncio 4', ctr: 3.1, cpc: 0.48, conversion: 2.5 },
  { name: 'Anuncio 5', ctr: 3.9, cpc: 0.53, conversion: 2.9 },
];

const Metricas = () => {
  return (
    <Layout>
      <div className="flex-1 space-y-6 p-6">
        <h1 className="text-3xl font-bold">Métricas de Rendimiento</h1>
        <p className="text-gray-600 mb-6">Visualiza el rendimiento de tus campañas de anuncios.</p>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Impresiones Totales</CardTitle>
              <CardDescription>En los últimos 30 días</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">128,430</div>
              <p className="text-xs text-green-500">+12.5% respecto al mes anterior</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Clics Totales</CardTitle>
              <CardDescription>En los últimos 30 días</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">4,285</div>
              <p className="text-xs text-green-500">+8.2% respecto al mes anterior</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Conversiones</CardTitle>
              <CardDescription>En los últimos 30 días</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">521</div>
              <p className="text-xs text-green-500">+15.3% respecto al mes anterior</p>
            </CardContent>
          </Card>
        </div>

        <div className="mt-8">
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Rendimiento de la Campaña</CardTitle>
              <CardDescription>Datos de los últimos 7 meses</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorImp" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorClics" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#82ca9d" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Area type="monotone" dataKey="impresiones" stroke="#8884d8" fillOpacity={1} fill="url(#colorImp)" />
                  <Area type="monotone" dataKey="clics" stroke="#82ca9d" fillOpacity={1} fill="url(#colorClics)" />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>CTR vs CPC</CardTitle>
                <CardDescription>Por anuncio</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={performanceData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="ctr" fill="#8884d8" name="CTR (%)" />
                    <Bar dataKey="cpc" fill="#82ca9d" name="CPC ($)" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Tasa de Conversión</CardTitle>
                <CardDescription>Por anuncio</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={performanceData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="conversion" stroke="#ff7300" activeDot={{ r: 8 }} name="Tasa de Conversión (%)" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Metricas;
