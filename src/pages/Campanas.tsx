
import { useState } from "react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { LayoutGrid, ListFilter, PlusCircle, MoreVertical, Edit, Trash2, Play, Pause } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { toast } from "@/hooks/use-toast";

interface Campaign {
  id: number;
  name: string;
  objective: string;
  status: 'active' | 'paused' | 'completed' | 'draft';
  budget: number;
  startDate: string;
  endDate: string;
  impressions: number;
  clicks: number;
  conversions: number;
  audience: string;
}

const sampleCampaigns: Campaign[] = [
  {
    id: 1,
    name: "Promoción Verano",
    objective: "Ventas",
    status: "active",
    budget: 500,
    startDate: "2025-01-15",
    endDate: "2025-02-15",
    impressions: 45000,
    clicks: 3200,
    conversions: 125,
    audience: "18-35 años, interesados en moda"
  },
  {
    id: 2,
    name: "Lanzamiento Producto",
    objective: "Alcance",
    status: "paused",
    budget: 750,
    startDate: "2025-02-01",
    endDate: "2025-03-15",
    impressions: 65000,
    clicks: 5100,
    conversions: 210,
    audience: "25-45 años, profesionales"
  },
  {
    id: 3,
    name: "Descuentos Especiales",
    objective: "Conversiones",
    status: "completed",
    budget: 300,
    startDate: "2025-01-01",
    endDate: "2025-01-31",
    impressions: 32000,
    clicks: 2400,
    conversions: 180,
    audience: "Todos los segmentos"
  },
  {
    id: 4,
    name: "Reengagement",
    objective: "Tráfico",
    status: "draft",
    budget: 250,
    startDate: "2025-03-01",
    endDate: "2025-03-31",
    impressions: 0,
    clicks: 0,
    conversions: 0,
    audience: "Clientes existentes"
  }
];

const Campanas = () => {
  const [campaigns, setCampaigns] = useState<Campaign[]>(sampleCampaigns);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showNewCampaignDialog, setShowNewCampaignDialog] = useState(false);
  const [newCampaign, setNewCampaign] = useState({
    name: '',
    objective: '',
    budget: '',
    startDate: '',
    endDate: '',
    audience: ''
  });

  const getStatusColor = (status: Campaign['status']) => {
    switch(status) {
      case 'active': return 'bg-green-500';
      case 'paused': return 'bg-yellow-500';
      case 'completed': return 'bg-blue-500';
      case 'draft': return 'bg-gray-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusLabel = (status: Campaign['status']) => {
    switch(status) {
      case 'active': return 'Activa';
      case 'paused': return 'Pausada';
      case 'completed': return 'Completada';
      case 'draft': return 'Borrador';
      default: return 'Desconocido';
    }
  };

  const handleCreateCampaign = () => {
    const newId = Math.max(...campaigns.map(c => c.id)) + 1;
    const campaign: Campaign = {
      id: newId,
      name: newCampaign.name,
      objective: newCampaign.objective,
      status: 'draft',
      budget: parseFloat(newCampaign.budget) || 0,
      startDate: newCampaign.startDate,
      endDate: newCampaign.endDate,
      impressions: 0,
      clicks: 0,
      conversions: 0,
      audience: newCampaign.audience
    };
    
    setCampaigns([...campaigns, campaign]);
    setShowNewCampaignDialog(false);
    toast({
      title: "Campaña creada",
      description: `La campaña "${campaign.name}" ha sido creada exitosamente.`,
    });
    
    // Reset form
    setNewCampaign({
      name: '',
      objective: '',
      budget: '',
      startDate: '',
      endDate: '',
      audience: ''
    });
  };

  const toggleCampaignStatus = (id: number) => {
    setCampaigns(campaigns.map(campaign => {
      if (campaign.id === id) {
        const newStatus = campaign.status === 'active' ? 'paused' : 'active';
        toast({
          title: `Campaña ${newStatus === 'active' ? 'activada' : 'pausada'}`,
          description: `La campaña "${campaign.name}" ha sido ${newStatus === 'active' ? 'activada' : 'pausada'}.`,
        });
        return {...campaign, status: newStatus};
      }
      return campaign;
    }));
  };

  const deleteCampaign = (id: number) => {
    const campaignToDelete = campaigns.find(c => c.id === id);
    setCampaigns(campaigns.filter(campaign => campaign.id !== id));
    toast({
      title: "Campaña eliminada",
      description: `La campaña "${campaignToDelete?.name}" ha sido eliminada.`,
      variant: "destructive"
    });
  };

  return (
    <Layout>
      <div className="flex-1 space-y-6 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Campañas</h1>
            <p className="text-gray-600">Gestiona tus campañas publicitarias</p>
          </div>
          <div className="flex items-center space-x-2">
            <Dialog open={showNewCampaignDialog} onOpenChange={setShowNewCampaignDialog}>
              <DialogTrigger asChild>
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <PlusCircle className="mr-2 h-4 w-4" /> Nueva Campaña
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Crear Nueva Campaña</DialogTitle>
                  <DialogDescription>
                    Completa los detalles para crear una nueva campaña publicitaria.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="name">Nombre de la Campaña</Label>
                    <Input 
                      id="name" 
                      value={newCampaign.name} 
                      onChange={(e) => setNewCampaign({...newCampaign, name: e.target.value})}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="objective">Objetivo</Label>
                    <Select 
                      onValueChange={(value) => setNewCampaign({...newCampaign, objective: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona un objetivo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Ventas">Ventas</SelectItem>
                        <SelectItem value="Tráfico">Tráfico</SelectItem>
                        <SelectItem value="Alcance">Alcance</SelectItem>
                        <SelectItem value="Conversiones">Conversiones</SelectItem>
                        <SelectItem value="Reconocimiento">Reconocimiento</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="budget">Presupuesto (USD)</Label>
                    <Input 
                      id="budget" 
                      type="number" 
                      value={newCampaign.budget} 
                      onChange={(e) => setNewCampaign({...newCampaign, budget: e.target.value})}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="startDate">Fecha de Inicio</Label>
                      <Input 
                        id="startDate" 
                        type="date" 
                        value={newCampaign.startDate} 
                        onChange={(e) => setNewCampaign({...newCampaign, startDate: e.target.value})}
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="endDate">Fecha de Fin</Label>
                      <Input 
                        id="endDate" 
                        type="date" 
                        value={newCampaign.endDate} 
                        onChange={(e) => setNewCampaign({...newCampaign, endDate: e.target.value})}
                      />
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="audience">Audiencia</Label>
                    <Textarea 
                      id="audience" 
                      value={newCampaign.audience} 
                      onChange={(e) => setNewCampaign({...newCampaign, audience: e.target.value})}
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setShowNewCampaignDialog(false)}>Cancelar</Button>
                  <Button onClick={handleCreateCampaign}>Crear Campaña</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
            <div className="flex border rounded-md">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'outline'}
                className={`rounded-r-none ${viewMode === 'grid' ? 'bg-blue-600 hover:bg-blue-700' : ''}`}
                onClick={() => setViewMode('grid')}
              >
                <LayoutGrid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'outline'}
                className={`rounded-l-none ${viewMode === 'list' ? 'bg-blue-600 hover:bg-blue-700' : ''}`}
                onClick={() => setViewMode('list')}
              >
                <ListFilter className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
        
        {viewMode === 'grid' ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {campaigns.map((campaign) => (
              <Card key={campaign.id} className="overflow-hidden">
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-lg font-medium">{campaign.name}</CardTitle>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => toggleCampaignStatus(campaign.id)}>
                          {campaign.status === 'active' ? (
                            <>
                              <Pause className="mr-2 h-4 w-4" />
                              <span>Pausar</span>
                            </>
                          ) : (
                            <>
                              <Play className="mr-2 h-4 w-4" />
                              <span>Activar</span>
                            </>
                          )}
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="mr-2 h-4 w-4" />
                          <span>Editar</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => deleteCampaign(campaign.id)}>
                          <Trash2 className="mr-2 h-4 w-4" />
                          <span>Eliminar</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  <Badge className={`${getStatusColor(campaign.status)} text-white`}>
                    {getStatusLabel(campaign.status)}
                  </Badge>
                </CardHeader>
                <CardContent className="pb-2">
                  <div className="grid gap-1">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Objetivo:</span>
                      <span className="font-medium">{campaign.objective}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Presupuesto:</span>
                      <span className="font-medium">${campaign.budget}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Duración:</span>
                      <span className="font-medium">
                        {campaign.startDate} - {campaign.endDate}
                      </span>
                    </div>
                    <div className="mt-2 text-sm text-gray-500">
                      <span>Audiencia: </span>
                      <span className="text-gray-700">{campaign.audience}</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="border-t pt-4 flex justify-between">
                  <div className="text-center">
                    <p className="text-xs text-gray-500">Impresiones</p>
                    <p className="font-semibold">{campaign.impressions.toLocaleString()}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-gray-500">Clics</p>
                    <p className="font-semibold">{campaign.clicks.toLocaleString()}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-gray-500">Conversiones</p>
                    <p className="font-semibold">{campaign.conversions.toLocaleString()}</p>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <div className="border rounded-md">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Campaña</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Objetivo</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Presupuesto</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rendimiento</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {campaigns.map((campaign) => (
                  <tr key={campaign.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-medium text-gray-900">{campaign.name}</div>
                      <div className="text-xs text-gray-500">{campaign.startDate} - {campaign.endDate}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {campaign.objective}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge className={`${getStatusColor(campaign.status)} text-white`}>
                        {getStatusLabel(campaign.status)}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      ${campaign.budget}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm">
                        <span className="mr-2">{campaign.impressions.toLocaleString()} impresiones</span>
                        <span className="mr-2">{campaign.clicks.toLocaleString()} clics</span>
                        <span>{campaign.conversions.toLocaleString()} conv.</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={() => toggleCampaignStatus(campaign.id)}>
                            {campaign.status === 'active' ? (
                              <>
                                <Pause className="mr-2 h-4 w-4" />
                                <span>Pausar</span>
                              </>
                            ) : (
                              <>
                                <Play className="mr-2 h-4 w-4" />
                                <span>Activar</span>
                              </>
                            )}
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Edit className="mr-2 h-4 w-4" />
                            <span>Editar</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => deleteCampaign(campaign.id)}>
                            <Trash2 className="mr-2 h-4 w-4" />
                            <span>Eliminar</span>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Campanas;
