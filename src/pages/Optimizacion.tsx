
import { useState } from "react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ThumbsUp, TrendingUp, Users, Target, BarChart, ArrowUp, ArrowDown, Play, Settings, Info, AlertCircle } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart as RBarChart, Bar } from "recharts";
import { toast } from "@/hooks/use-toast";

interface Optimization {
  id: number;
  title: string;
  description: string;
  status: 'pending' | 'applied' | 'rejected';
  impact: 'high' | 'medium' | 'low';
  date: string;
  category: 'targeting' | 'creative' | 'budget' | 'schedule';
}

interface TestResult {
  id: number;
  name: string;
  status: 'running' | 'completed' | 'scheduled';
  startDate: string;
  endDate: string;
  variations: number;
  winner?: string;
  metrics: {
    name: string;
    variant: string;
    value: number;
    change: number;
  }[];
}

const sampleOptimizations: Optimization[] = [
  {
    id: 1,
    title: "Ajustar segmentación por edad",
    description: "Enfocar el público objetivo en rango de 25-45 años para aumentar la tasa de conversión.",
    status: 'pending',
    impact: 'high',
    date: "2025-04-03",
    category: 'targeting'
  },
  {
    id: 2,
    title: "Cambiar imagen principal",
    description: "Sustituir la imagen actual por una con personas usando el producto que ha mostrado mejor rendimiento.",
    status: 'applied',
    impact: 'medium',
    date: "2025-03-30",
    category: 'creative'
  },
  {
    id: 3,
    title: "Incrementar presupuesto campaña eventos",
    description: "Aumentar un 15% el presupuesto en la campaña de promoción de eventos que está mostrando buenos resultados.",
    status: 'applied',
    impact: 'high',
    date: "2025-03-25",
    category: 'budget'
  },
  {
    id: 4,
    title: "Programar anuncios en horas pico",
    description: "Optimizar la programación de anuncios para mostrarlos principalmente entre 18:00 y 22:00 hrs.",
    status: 'pending',
    impact: 'medium',
    date: "2025-04-02",
    category: 'schedule'
  },
  {
    id: 5,
    title: "Refinar palabras clave",
    description: "Eliminar palabras clave con bajo rendimiento y añadir nuevas basadas en el análisis de búsquedas.",
    status: 'rejected',
    impact: 'low',
    date: "2025-03-20",
    category: 'targeting'
  }
];

const sampleTestResults: TestResult[] = [
  {
    id: 1,
    name: "Test A/B de Imágenes",
    status: 'completed',
    startDate: "2025-03-15",
    endDate: "2025-03-29",
    variations: 3,
    winner: "Variante B",
    metrics: [
      { name: "CTR", variant: "Variante A", value: 1.8, change: 0 },
      { name: "CTR", variant: "Variante B", value: 2.7, change: 50 },
      { name: "CTR", variant: "Variante C", value: 2.2, change: 22.2 },
      { name: "Conversiones", variant: "Variante A", value: 45, change: 0 },
      { name: "Conversiones", variant: "Variante B", value: 68, change: 51.1 },
      { name: "Conversiones", variant: "Variante C", value: 52, change: 15.6 }
    ]
  },
  {
    id: 2,
    name: "Test de Titulares",
    status: 'running',
    startDate: "2025-03-28",
    endDate: "2025-04-11",
    variations: 2,
    metrics: [
      { name: "CTR", variant: "Original", value: 2.1, change: 0 },
      { name: "CTR", variant: "Nuevo", value: 2.3, change: 9.5 },
      { name: "Conversiones", variant: "Original", value: 32, change: 0 },
      { name: "Conversiones", variant: "Nuevo", value: 37, change: 15.6 }
    ]
  },
  {
    id: 3,
    name: "Test de Segmentación",
    status: 'scheduled',
    startDate: "2025-04-10",
    endDate: "2025-04-24",
    variations: 2,
    metrics: []
  }
];

const performanceData = [
  { date: '2025-03-01', ctr: 1.2, cpc: 0.45, conversions: 28 },
  { date: '2025-03-08', ctr: 1.3, cpc: 0.44, conversions: 32 },
  { date: '2025-03-15', ctr: 1.5, cpc: 0.42, conversions: 38 },
  { date: '2025-03-22', ctr: 1.4, cpc: 0.40, conversions: 35 },
  { date: '2025-03-29', ctr: 1.8, cpc: 0.38, conversions: 45 },
  { date: '2025-04-01', ctr: 2.1, cpc: 0.36, conversions: 52 },
];

const Optimizacion = () => {
  const [optimizations, setOptimizations] = useState<Optimization[]>(sampleOptimizations);
  const [testResults, setTestResults] = useState<TestResult[]>(sampleTestResults);
  const [filter, setFilter] = useState<string>("all");
  const [selectedTest, setSelectedTest] = useState<TestResult | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isNewTestOpen, setIsNewTestOpen] = useState(false);
  const [newTest, setNewTest] = useState({
    name: "",
    variations: "2",
    startDate: "",
    endDate: "",
    description: ""
  });

  const filteredOptimizations = optimizations.filter(optimization => {
    if (filter === "all") return true;
    return optimization.status === filter;
  });

  const getStatusBadge = (status: Optimization['status']) => {
    switch(status) {
      case 'pending':
        return <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">Pendiente</Badge>;
      case 'applied':
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Aplicada</Badge>;
      case 'rejected':
        return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">Rechazada</Badge>;
      default:
        return null;
    }
  };

  const getImpactBadge = (impact: Optimization['impact']) => {
    switch(impact) {
      case 'high':
        return <Badge className="bg-blue-600">Alto</Badge>;
      case 'medium':
        return <Badge className="bg-blue-400">Medio</Badge>;
      case 'low':
        return <Badge className="bg-blue-300">Bajo</Badge>;
      default:
        return null;
    }
  };

  const getCategoryIcon = (category: Optimization['category']) => {
    switch(category) {
      case 'targeting':
        return <Target className="h-5 w-5" />;
      case 'creative':
        return <ThumbsUp className="h-5 w-5" />;
      case 'budget':
        return <TrendingUp className="h-5 w-5" />;
      case 'schedule':
        return <BarChart className="h-5 w-5" />;
      default:
        return null;
    }
  };
  
  const handleOptimizationAction = (id: number, action: 'apply' | 'reject') => {
    setOptimizations(optimizations.map(opt => {
      if (opt.id === id) {
        const newStatus = action === 'apply' ? 'applied' : 'rejected';
        toast({
          title: action === 'apply' ? "Optimización aplicada" : "Optimización rechazada",
          description: `La optimización "${opt.title}" ha sido ${action === 'apply' ? 'aplicada' : 'rechazada'}.`,
          variant: action === 'apply' ? "default" : "destructive"
        });
        return { ...opt, status: newStatus };
      }
      return opt;
    }));
  };

  const handleCreateTest = () => {
    const id = Math.max(0, ...testResults.map(t => t.id)) + 1;
    
    const newTestResult: TestResult = {
      id,
      name: newTest.name,
      status: 'scheduled',
      startDate: newTest.startDate,
      endDate: newTest.endDate,
      variations: parseInt(newTest.variations || "2"),
      metrics: []
    };
    
    setTestResults([...testResults, newTestResult]);
    setIsNewTestOpen(false);
    toast({
      title: "Test creado",
      description: `El test "${newTestResult.name}" ha sido programado correctamente.`,
    });
    
    // Reset form
    setNewTest({
      name: "",
      variations: "2",
      startDate: "",
      endDate: "",
      description: ""
    });
  };

  const getChangeColor = (change: number) => {
    if (change > 0) return "text-green-600";
    if (change < 0) return "text-red-600";
    return "text-gray-600";
  };

  const getChangeIcon = (change: number) => {
    if (change > 0) return <ArrowUp className="h-3 w-3 text-green-600" />;
    if (change < 0) return <ArrowDown className="h-3 w-3 text-red-600" />;
    return null;
  };

  return (
    <Layout>
      <div className="flex-1 space-y-6 p-6">
        <h1 className="text-3xl font-bold">Optimización</h1>
        <p className="text-gray-600 mb-6">Mejora el rendimiento de tus campañas publicitarias</p>
        
        <Tabs defaultValue="recommendations">
          <TabsList>
            <TabsTrigger value="recommendations">Recomendaciones</TabsTrigger>
            <TabsTrigger value="testing">Testing A/B</TabsTrigger>
            <TabsTrigger value="performance">Rendimiento</TabsTrigger>
          </TabsList>
          
          <TabsContent value="recommendations" className="space-y-6 mt-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <h2 className="text-xl font-medium">Recomendaciones de Optimización</h2>
                <div className="flex items-center gap-2 bg-blue-50 text-blue-800 px-3 py-1 rounded-full text-xs">
                  <Info className="h-3.5 w-3.5" />
                  <span>Basadas en IA</span>
                </div>
              </div>
              
              <Select defaultValue="all" onValueChange={setFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filtrar por estado" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos los estados</SelectItem>
                  <SelectItem value="pending">Pendientes</SelectItem>
                  <SelectItem value="applied">Aplicadas</SelectItem>
                  <SelectItem value="rejected">Rechazadas</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredOptimizations.map((optimization) => (
                <Card key={optimization.id}>
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-center mb-2">
                      <div className="p-2 rounded-full bg-blue-50">
                        {getCategoryIcon(optimization.category)}
                      </div>
                      {getStatusBadge(optimization.status)}
                    </div>
                    <CardTitle className="text-lg">{optimization.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="pb-4">
                    <p className="text-sm text-gray-600">{optimization.description}</p>
                    <div className="mt-4 flex items-center justify-between">
                      <div>
                        <p className="text-xs text-gray-500">Impacto esperado</p>
                        <div className="mt-1">{getImpactBadge(optimization.impact)}</div>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Fecha</p>
                        <p className="text-sm font-medium">{optimization.date}</p>
                      </div>
                    </div>
                  </CardContent>
                  {optimization.status === 'pending' && (
                    <CardFooter className="pt-2 border-t">
                      <div className="flex gap-3 w-full">
                        <Button 
                          variant="outline" 
                          className="flex-1"
                          onClick={() => handleOptimizationAction(optimization.id, 'reject')}
                        >
                          Rechazar
                        </Button>
                        <Button 
                          className="flex-1 bg-blue-600 hover:bg-blue-700"
                          onClick={() => handleOptimizationAction(optimization.id, 'apply')}
                        >
                          Aplicar
                        </Button>
                      </div>
                    </CardFooter>
                  )}
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="testing" className="mt-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-medium">Tests A/B</h2>
              <Dialog open={isNewTestOpen} onOpenChange={setIsNewTestOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    + Nuevo Test A/B
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Crear Nuevo Test A/B</DialogTitle>
                    <DialogDescription>
                      Configura un nuevo test A/B para optimizar tus anuncios.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <Label htmlFor="name">Nombre del Test</Label>
                      <Input 
                        id="name" 
                        value={newTest.name}
                        onChange={(e) => setNewTest({...newTest, name: e.target.value})}
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="variations">Número de Variantes</Label>
                      <Select 
                        defaultValue={newTest.variations}
                        onValueChange={(value) => setNewTest({...newTest, variations: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecciona número de variantes" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="2">2 variantes</SelectItem>
                          <SelectItem value="3">3 variantes</SelectItem>
                          <SelectItem value="4">4 variantes</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="grid gap-2">
                        <Label htmlFor="startDate">Fecha de Inicio</Label>
                        <Input 
                          id="startDate" 
                          type="date"
                          value={newTest.startDate}
                          onChange={(e) => setNewTest({...newTest, startDate: e.target.value})}
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="endDate">Fecha de Fin</Label>
                        <Input 
                          id="endDate" 
                          type="date"
                          value={newTest.endDate}
                          onChange={(e) => setNewTest({...newTest, endDate: e.target.value})}
                        />
                      </div>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="description">Descripción</Label>
                      <Input 
                        id="description"
                        value={newTest.description}
                        onChange={(e) => setNewTest({...newTest, description: e.target.value})}
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setIsNewTestOpen(false)}>Cancelar</Button>
                    <Button onClick={handleCreateTest}>Crear Test</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
            
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {testResults.map((test) => (
                <Card key={test.id} className={test.status === 'scheduled' ? 'border-dashed' : ''}>
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-center mb-2">
                      <Badge className={
                        test.status === 'completed' ? 'bg-green-600' : 
                        test.status === 'running' ? 'bg-blue-600' : 
                        'bg-gray-500'
                      }>
                        {test.status === 'completed' ? 'Completado' : 
                         test.status === 'running' ? 'En ejecución' : 
                         'Programado'}
                      </Badge>
                      <span className="text-sm text-gray-500">{test.variations} variantes</span>
                    </div>
                    <CardTitle className="text-lg">{test.name}</CardTitle>
                    <CardDescription>
                      {test.startDate} - {test.endDate}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pb-4">
                    {test.status === 'completed' && (
                      <div className="py-2 px-3 bg-green-50 text-green-800 rounded-md flex items-center">
                        <div className="p-1 bg-green-100 rounded-full mr-2">
                          <ThumbsUp className="h-4 w-4" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">Ganador: {test.winner}</p>
                          <p className="text-xs">+51% mejora en conversiones</p>
                        </div>
                      </div>
                    )}
                    
                    {test.status === 'running' && (
                      <div className="space-y-3">
                        <div className="flex justify-between items-center text-sm">
                          <span>Original</span>
                          <span className="font-medium">2.1% CTR</span>
                        </div>
                        <div className="flex justify-between items-center text-sm">
                          <span className="flex items-center">
                            Nuevo
                            <Badge className="ml-2 bg-green-100 text-green-800 hover:bg-green-100">Liderando</Badge>
                          </span>
                          <span className="font-medium text-green-600">2.3% CTR (+9.5%)</span>
                        </div>
                        <div className="pt-2">
                          <p className="text-xs text-gray-500">Progreso</p>
                          <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                            <div className="bg-blue-600 h-2 rounded-full" style={{ width: '65%' }}></div>
                          </div>
                          <p className="text-xs text-gray-500 mt-1 text-right">65% completado</p>
                        </div>
                      </div>
                    )}
                    
                    {test.status === 'scheduled' && (
                      <div className="py-6 flex flex-col items-center justify-center text-gray-500">
                        <AlertCircle className="h-8 w-8 mb-2" />
                        <p className="text-sm text-center">Test programado para iniciar el {test.startDate}</p>
                      </div>
                    )}
                  </CardContent>
                  <CardFooter className="pt-2 border-t">
                    <Button 
                      variant="outline" 
                      className="w-full"
                      onClick={() => {
                        setSelectedTest(test);
                        setIsDialogOpen(true);
                      }}
                    >
                      {test.status === 'completed' ? 'Ver Resultados' : 
                       test.status === 'running' ? 'Ver Detalles' : 
                       'Configurar'}
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
            
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogContent className="max-w-4xl">
                {selectedTest && (
                  <>
                    <DialogHeader>
                      <DialogTitle>{selectedTest.name}</DialogTitle>
                      <DialogDescription>
                        {selectedTest.startDate} - {selectedTest.endDate}
                      </DialogDescription>
                    </DialogHeader>
                    
                    {selectedTest.status === 'completed' && (
                      <div className="py-4">
                        <div className="flex items-center justify-between mb-4">
                          <div>
                            <Badge className="bg-green-600">Completado</Badge>
                            <h3 className="text-lg font-medium mt-2">Resultados del Test</h3>
                          </div>
                          <div className="py-2 px-3 bg-green-50 text-green-800 rounded-md">
                            <p className="text-sm font-medium">Ganador: {selectedTest.winner}</p>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-6 mb-6">
                          <Card>
                            <CardHeader className="pb-2">
                              <CardTitle className="text-base">CTR por Variante</CardTitle>
                            </CardHeader>
                            <CardContent className="pt-0 h-[200px]">
                              <ResponsiveContainer width="100%" height="100%">
                                <RBarChart data={selectedTest.metrics.filter(m => m.name === "CTR")}>
                                  <CartesianGrid strokeDasharray="3 3" />
                                  <XAxis dataKey="variant" />
                                  <YAxis />
                                  <Tooltip />
                                  <Bar dataKey="value" fill="#8884d8" name="CTR (%)" />
                                </RBarChart>
                              </ResponsiveContainer>
                            </CardContent>
                          </Card>
                          
                          <Card>
                            <CardHeader className="pb-2">
                              <CardTitle className="text-base">Conversiones por Variante</CardTitle>
                            </CardHeader>
                            <CardContent className="pt-0 h-[200px]">
                              <ResponsiveContainer width="100%" height="100%">
                                <RBarChart data={selectedTest.metrics.filter(m => m.name === "Conversiones")}>
                                  <CartesianGrid strokeDasharray="3 3" />
                                  <XAxis dataKey="variant" />
                                  <YAxis />
                                  <Tooltip />
                                  <Bar dataKey="value" fill="#82ca9d" name="Conversiones" />
                                </RBarChart>
                              </ResponsiveContainer>
                            </CardContent>
                          </Card>
                        </div>
                        
                        <div>
                          <h4 className="font-medium mb-3">Métricas Detalladas</h4>
                          <table className="w-full border-collapse">
                            <thead className="bg-gray-50">
                              <tr>
                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Métrica</th>
                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Variante</th>
                                <th className="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Valor</th>
                                <th className="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Cambio</th>
                              </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                              {selectedTest.metrics.map((metric, idx) => (
                                <tr key={idx}>
                                  <td className="px-4 py-3 whitespace-nowrap text-sm">{metric.name}</td>
                                  <td className="px-4 py-3 whitespace-nowrap text-sm">
                                    {metric.variant === selectedTest.winner && (
                                      <Badge className="bg-green-100 text-green-800 hover:bg-green-100 mr-2">
                                        Ganador
                                      </Badge>
                                    )}
                                    {metric.variant}
                                  </td>
                                  <td className="px-4 py-3 whitespace-nowrap text-sm text-right font-medium">
                                    {metric.name === "CTR" ? `${metric.value}%` : metric.value}
                                  </td>
                                  <td className="px-4 py-3 whitespace-nowrap text-sm text-right">
                                    <div className="flex items-center justify-end">
                                      {metric.change !== 0 && getChangeIcon(metric.change)}
                                      <span className={`${getChangeColor(metric.change)} ml-1`}>
                                        {metric.change > 0 && '+'}
                                        {metric.change}%
                                      </span>
                                    </div>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                        
                        <div className="flex justify-end mt-6">
                          <Button className="bg-blue-600 hover:bg-blue-700">
                            Aplicar Ganador a Campaña
                          </Button>
                        </div>
                      </div>
                    )}
                    
                    {selectedTest.status === 'running' && (
                      <div className="py-4">
                        <div className="flex items-center justify-between mb-4">
                          <div>
                            <Badge className="bg-blue-600">En ejecución</Badge>
                            <h3 className="text-lg font-medium mt-2">Estado Actual</h3>
                          </div>
                          <Button size="sm">
                            <Pause className="h-4 w-4 mr-2" />
                            Pausar Test
                          </Button>
                        </div>
                        
                        <div className="mb-6">
                          <p className="text-sm font-medium mb-2">Progreso</p>
                          <div className="w-full bg-gray-200 rounded-full h-3">
                            <div className="bg-blue-600 h-3 rounded-full" style={{ width: '65%' }}></div>
                          </div>
                          <div className="flex justify-between text-xs text-gray-500 mt-1">
                            <span>Iniciado: {selectedTest.startDate}</span>
                            <span>9 días restantes</span>
                            <span>Finaliza: {selectedTest.endDate}</span>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-6 mb-6">
                          <Card>
                            <CardHeader className="pb-2">
                              <CardTitle className="text-base">CTR por Variante</CardTitle>
                            </CardHeader>
                            <CardContent className="pt-0 h-[200px]">
                              <ResponsiveContainer width="100%" height="100%">
                                <RBarChart data={selectedTest.metrics.filter(m => m.name === "CTR")}>
                                  <CartesianGrid strokeDasharray="3 3" />
                                  <XAxis dataKey="variant" />
                                  <YAxis />
                                  <Tooltip />
                                  <Bar dataKey="value" fill="#8884d8" name="CTR (%)" />
                                </RBarChart>
                              </ResponsiveContainer>
                            </CardContent>
                          </Card>
                          
                          <Card>
                            <CardHeader className="pb-2">
                              <CardTitle className="text-base">Conversiones por Variante</CardTitle>
                            </CardHeader>
                            <CardContent className="pt-0 h-[200px]">
                              <ResponsiveContainer width="100%" height="100%">
                                <RBarChart data={selectedTest.metrics.filter(m => m.name === "Conversiones")}>
                                  <CartesianGrid strokeDasharray="3 3" />
                                  <XAxis dataKey="variant" />
                                  <YAxis />
                                  <Tooltip />
                                  <Bar dataKey="value" fill="#82ca9d" name="Conversiones" />
                                </RBarChart>
                              </ResponsiveContainer>
                            </CardContent>
                          </Card>
                        </div>
                        
                        <div>
                          <h4 className="font-medium mb-3">Resultados Preliminares</h4>
                          <p className="text-sm text-gray-600 mb-3">
                            Los resultados son preliminares y pueden cambiar a medida que se recopilan más datos.
                          </p>
                          
                          <table className="w-full border-collapse">
                            <thead className="bg-gray-50">
                              <tr>
                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Métrica</th>
                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Variante</th>
                                <th className="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Valor</th>
                                <th className="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Cambio</th>
                              </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                              {selectedTest.metrics.map((metric, idx) => (
                                <tr key={idx}>
                                  <td className="px-4 py-3 whitespace-nowrap text-sm">{metric.name}</td>
                                  <td className="px-4 py-3 whitespace-nowrap text-sm">
                                    {(metric.name === "CTR" && metric.variant === "Nuevo") ||
                                     (metric.name === "Conversiones" && metric.variant === "Nuevo") ? (
                                      <Badge className="bg-green-100 text-green-800 hover:bg-green-100 mr-2">
                                        Liderando
                                      </Badge>
                                    ) : null}
                                    {metric.variant}
                                  </td>
                                  <td className="px-4 py-3 whitespace-nowrap text-sm text-right font-medium">
                                    {metric.name === "CTR" ? `${metric.value}%` : metric.value}
                                  </td>
                                  <td className="px-4 py-3 whitespace-nowrap text-sm text-right">
                                    <div className="flex items-center justify-end">
                                      {metric.change !== 0 && getChangeIcon(metric.change)}
                                      <span className={`${getChangeColor(metric.change)} ml-1`}>
                                        {metric.change > 0 && '+'}
                                        {metric.change}%
                                      </span>
                                    </div>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    )}
                    
                    {selectedTest.status === 'scheduled' && (
                      <div className="py-4">
                        <div className="flex items-center justify-between mb-4">
                          <div>
                            <Badge className="bg-gray-500">Programado</Badge>
                            <h3 className="text-lg font-medium mt-2">Configuración del Test</h3>
                          </div>
                          <Button variant="outline" size="sm">
                            <Settings className="h-4 w-4 mr-2" />
                            Editar
                          </Button>
                        </div>
                        
                        <div className="grid gap-6 mb-6">
                          <div className="grid grid-cols-2 gap-6">
                            <div>
                              <p className="text-sm font-medium mb-1">Fecha de Inicio</p>
                              <p className="text-lg">{selectedTest.startDate}</p>
                            </div>
                            <div>
                              <p className="text-sm font-medium mb-1">Fecha de Finalización</p>
                              <p className="text-lg">{selectedTest.endDate}</p>
                            </div>
                          </div>
                          
                          <div>
                            <p className="text-sm font-medium mb-1">Número de Variantes</p>
                            <p className="text-lg">{selectedTest.variations}</p>
                          </div>
                          
                          <div>
                            <p className="text-sm font-medium mb-1">Métricas a Evaluar</p>
                            <div className="flex gap-2 mt-1">
                              <Badge variant="outline">CTR</Badge>
                              <Badge variant="outline">Conversiones</Badge>
                              <Badge variant="outline">CPC</Badge>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex justify-end">
                          <Button className="bg-blue-600 hover:bg-blue-700">
                            <Play className="h-4 w-4 mr-2" />
                            Iniciar Ahora
                          </Button>
                        </div>
                      </div>
                    )}
                  </>
                )}
              </DialogContent>
            </Dialog>
          </TabsContent>
          
          <TabsContent value="performance" className="mt-6">
            <div className="grid gap-6 md:grid-cols-3 mb-8">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">CTR Promedio</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">2.1%</div>
                  <div className="flex items-center text-xs text-green-600">
                    <ArrowUp className="mr-1 h-3 w-3" />
                    <span>+16.7% vs. mes anterior</span>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">CPC Promedio</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">$0.36</div>
                  <div className="flex items-center text-xs text-green-600">
                    <ArrowDown className="mr-1 h-3 w-3" />
                    <span>-10.0% vs. mes anterior</span>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Conversiones</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">52</div>
                  <div className="flex items-center text-xs text-green-600">
                    <ArrowUp className="mr-1 h-3 w-3" />
                    <span>+15.6% vs. mes anterior</span>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Tendencia de Rendimiento</CardTitle>
                <CardDescription>Últimos 30 días</CardDescription>
              </CardHeader>
              <CardContent className="h-[350px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={performanceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <Tooltip />
                    <Legend />
                    <Line 
                      yAxisId="left"
                      type="monotone" 
                      dataKey="ctr" 
                      stroke="#8884d8" 
                      activeDot={{ r: 8 }} 
                      name="CTR (%)"
                    />
                    <Line 
                      yAxisId="left"
                      type="monotone" 
                      dataKey="cpc" 
                      stroke="#82ca9d" 
                      name="CPC ($)"
                    />
                    <Line 
                      yAxisId="right"
                      type="monotone" 
                      dataKey="conversions" 
                      stroke="#ff7300" 
                      name="Conversiones"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            
            <div className="grid gap-6 lg:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Optimización Automática</CardTitle>
                  <CardDescription>Permite que la IA optimice automáticamente tus campañas</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Optimización de Presupuesto</p>
                        <p className="text-sm text-gray-600">Ajusta automáticamente el presupuesto entre campañas basado en rendimiento</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Optimización de Horario</p>
                        <p className="text-sm text-gray-600">Programa anuncios cuando tu audiencia está más activa</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Ajuste de Pujas</p>
                        <p className="text-sm text-gray-600">Ajusta automáticamente las pujas para maximizar conversiones</p>
                      </div>
                      <Switch />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Rotación de Anuncios</p>
                        <p className="text-sm text-gray-600">Muestra los anuncios con mejor rendimiento con mayor frecuencia</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Acciones Recomendadas</CardTitle>
                  <CardDescription>Acciones sugeridas basadas en el análisis de rendimiento</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="flex items-start">
                      <div className="p-2 rounded-full bg-blue-50 mr-3">
                        <Users className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium">Expandir audiencia</p>
                        <p className="text-sm text-gray-600 mb-2">Tu campaña "Promoción Verano" tiene potencial para alcanzar a más usuarios.</p>
                        <Button size="sm" variant="outline">Expandir Ahora</Button>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="p-2 rounded-full bg-blue-50 mr-3">
                        <TrendingUp className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium">Incrementar presupuesto</p>
                        <p className="text-sm text-gray-600 mb-2">La campaña "Lanzamiento Producto" está teniendo buenos resultados.</p>
                        <Button size="sm" variant="outline">Ajustar Presupuesto</Button>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="p-2 rounded-full bg-blue-50 mr-3">
                        <BarChart className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium">Pausar anuncios de bajo rendimiento</p>
                        <p className="text-sm text-gray-600 mb-2">Hay 3 anuncios con CTR por debajo del promedio de campaña.</p>
                        <Button size="sm" variant="outline">Revisar Anuncios</Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Optimizacion;
