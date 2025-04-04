
import { useState } from "react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PlusCircle, Users, Save, Target } from "lucide-react";
import { toast } from "@/hooks/use-toast";

// Sample interest categories
const interestCategories = [
  { id: 1, name: 'Tecnología', subcategories: ['Smartphones', 'Laptops', 'Gadgets', 'Software'] },
  { id: 2, name: 'Moda', subcategories: ['Ropa casual', 'Calzado', 'Accesorios', 'Lujo'] },
  { id: 3, name: 'Deportes', subcategories: ['Fútbol', 'Baloncesto', 'Tenis', 'Fitness'] },
  { id: 4, name: 'Viajes', subcategories: ['Playa', 'Montaña', 'Ciudades', 'Aventura'] },
  { id: 5, name: 'Gastronomía', subcategories: ['Restaurantes', 'Cocina', 'Vinos', 'Repostería'] },
];

interface Audience {
  id: number;
  name: string;
  ageRange: [number, number];
  gender: string;
  locations: string[];
  interests: string[];
  behaviors: string[];
  reachEstimate: number;
}

const initialAudiences: Audience[] = [
  {
    id: 1,
    name: "Jóvenes Tecnológicos",
    ageRange: [18, 34],
    gender: "Todos",
    locations: ["Madrid", "Barcelona", "Valencia"],
    interests: ["Smartphones", "Gadgets", "Software"],
    behaviors: ["Compradores online frecuentes", "Early adopters"],
    reachEstimate: 450000
  },
  {
    id: 2,
    name: "Profesionales Activos",
    ageRange: [30, 55],
    gender: "Todos",
    locations: ["Toda España"],
    interests: ["Negocios", "Finanzas", "Tecnología"],
    behaviors: ["Viajeros frecuentes", "Compradores de alta gama"],
    reachEstimate: 780000
  },
  {
    id: 3,
    name: "Padres Jóvenes",
    ageRange: [25, 40],
    gender: "Todos",
    locations: ["Áreas urbanas", "Suburbios"],
    interests: ["Crianza", "Educación", "Hogar"],
    behaviors: ["Compradores de productos infantiles"],
    reachEstimate: 320000
  }
];

const Segmentacion = () => {
  const [audiences, setAudiences] = useState<Audience[]>(initialAudiences);
  const [isCreatingAudience, setIsCreatingAudience] = useState(false);
  const [currentTab, setCurrentTab] = useState("demographics");
  const [newAudience, setNewAudience] = useState<Partial<Audience>>({
    name: "",
    ageRange: [25, 45],
    gender: "Todos",
    locations: [],
    interests: [],
    behaviors: []
  });
  
  // Form values
  const [ageRange, setAgeRange] = useState<[number, number]>([25, 45]);
  const [locationInput, setLocationInput] = useState("");
  const [interestInput, setInterestInput] = useState("");
  const [behaviorInput, setBehaviorInput] = useState("");
  
  const handleAddLocation = () => {
    if (locationInput && !newAudience.locations?.includes(locationInput)) {
      setNewAudience({
        ...newAudience,
        locations: [...(newAudience.locations || []), locationInput]
      });
      setLocationInput("");
    }
  };

  const handleAddInterest = () => {
    if (interestInput && !newAudience.interests?.includes(interestInput)) {
      setNewAudience({
        ...newAudience,
        interests: [...(newAudience.interests || []), interestInput]
      });
      setInterestInput("");
    }
  };

  const handleAddBehavior = () => {
    if (behaviorInput && !newAudience.behaviors?.includes(behaviorInput)) {
      setNewAudience({
        ...newAudience,
        behaviors: [...(newAudience.behaviors || []), behaviorInput]
      });
      setBehaviorInput("");
    }
  };

  const handleRemoveLocation = (location: string) => {
    setNewAudience({
      ...newAudience,
      locations: newAudience.locations?.filter(l => l !== location)
    });
  };

  const handleRemoveInterest = (interest: string) => {
    setNewAudience({
      ...newAudience,
      interests: newAudience.interests?.filter(i => i !== interest)
    });
  };

  const handleRemoveBehavior = (behavior: string) => {
    setNewAudience({
      ...newAudience,
      behaviors: newAudience.behaviors?.filter(b => b !== behavior)
    });
  };

  const handleSaveAudience = () => {
    const id = Math.max(0, ...audiences.map(a => a.id)) + 1;
    const reachEstimate = Math.floor(Math.random() * 800000) + 200000;
    
    const completeAudience: Audience = {
      id,
      name: newAudience.name || `Audiencia ${id}`,
      ageRange: newAudience.ageRange || [25, 45],
      gender: newAudience.gender || "Todos",
      locations: newAudience.locations || [],
      interests: newAudience.interests || [],
      behaviors: newAudience.behaviors || [],
      reachEstimate
    };
    
    setAudiences([...audiences, completeAudience]);
    setIsCreatingAudience(false);
    toast({
      title: "Audiencia guardada",
      description: `La audiencia "${completeAudience.name}" ha sido creada con éxito.`,
    });

    // Reset form
    setNewAudience({
      name: "",
      ageRange: [25, 45],
      gender: "Todos",
      locations: [],
      interests: [],
      behaviors: []
    });
    setAgeRange([25, 45]);
  };

  const handleAgeRangeChange = (values: number[]) => {
    setAgeRange([values[0], values[1]]);
    setNewAudience({
      ...newAudience,
      ageRange: [values[0], values[1]] as [number, number]
    });
  };

  return (
    <Layout>
      <div className="flex-1 space-y-6 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Segmentación de Audiencia</h1>
            <p className="text-gray-600">Define audiencias objetivo para tus campañas publicitarias</p>
          </div>
          <Button onClick={() => setIsCreatingAudience(true)} className="bg-blue-600 hover:bg-blue-700">
            <PlusCircle className="mr-2 h-4 w-4" /> Nueva Audiencia
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {audiences.map((audience) => (
            <Card key={audience.id}>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>{audience.name}</CardTitle>
                  <Users className="h-5 w-5 text-gray-400" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex flex-col">
                    <span className="text-sm text-gray-500">Edad</span>
                    <span className="font-medium">{audience.ageRange[0]} - {audience.ageRange[1]} años</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm text-gray-500">Género</span>
                    <span className="font-medium">{audience.gender}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm text-gray-500">Ubicaciones</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {audience.locations.map((location) => (
                        <Badge key={location} variant="outline">{location}</Badge>
                      ))}
                      {audience.locations.length === 0 && <span className="text-gray-400 text-sm">Sin ubicaciones específicas</span>}
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm text-gray-500">Intereses</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {audience.interests.map((interest) => (
                        <Badge key={interest} variant="outline">{interest}</Badge>
                      ))}
                      {audience.interests.length === 0 && <span className="text-gray-400 text-sm">Sin intereses específicos</span>}
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between border-t pt-4">
                <div>
                  <p className="text-sm text-gray-500">Alcance estimado</p>
                  <p className="font-medium">{audience.reachEstimate.toLocaleString()} personas</p>
                </div>
                <Button variant="outline">Aplicar a Campaña</Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <Dialog open={isCreatingAudience} onOpenChange={setIsCreatingAudience}>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>Crear Nueva Audiencia</DialogTitle>
              <DialogDescription>
                Define los criterios para segmentar tu audiencia objetivo.
              </DialogDescription>
            </DialogHeader>
            
            <div className="py-4">
              <div className="mb-5">
                <Label htmlFor="audience-name">Nombre de la Audiencia</Label>
                <Input 
                  id="audience-name" 
                  value={newAudience.name || ''}
                  onChange={(e) => setNewAudience({...newAudience, name: e.target.value})} 
                  className="mt-1"
                  placeholder="Ej: Jóvenes Profesionales Urbanos"
                />
              </div>
              
              <Tabs defaultValue="demographics" onValueChange={setCurrentTab} className="mt-6">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="demographics">Demografía</TabsTrigger>
                  <TabsTrigger value="interests">Intereses</TabsTrigger>
                  <TabsTrigger value="behaviors">Comportamientos</TabsTrigger>
                </TabsList>
                
                <TabsContent value="demographics" className="space-y-4 mt-4">
                  <div>
                    <Label>Rango de Edad</Label>
                    <div className="flex items-center mt-1">
                      <span className="mr-4 text-sm">{ageRange[0]} años</span>
                      <Slider 
                        value={ageRange} 
                        min={13} 
                        max={65} 
                        step={1} 
                        onValueChange={handleAgeRangeChange}
                        className="flex-1"
                      />
                      <span className="ml-4 text-sm">{ageRange[1]} años</span>
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <Label htmlFor="gender">Género</Label>
                    <Select 
                      defaultValue={newAudience.gender} 
                      onValueChange={(value) => setNewAudience({...newAudience, gender: value})}>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Selecciona un género" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Todos">Todos</SelectItem>
                        <SelectItem value="Hombre">Hombre</SelectItem>
                        <SelectItem value="Mujer">Mujer</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="mt-4">
                    <Label htmlFor="location">Ubicación</Label>
                    <div className="flex mt-1">
                      <Input 
                        value={locationInput} 
                        onChange={(e) => setLocationInput(e.target.value)} 
                        placeholder="Ej: Madrid" 
                        className="flex-1"
                      />
                      <Button onClick={handleAddLocation} className="ml-2">Agregar</Button>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {newAudience.locations?.map((location) => (
                        <Badge key={location} variant="secondary" className="px-2 py-1 flex items-center gap-1">
                          {location}
                          <button 
                            onClick={() => handleRemoveLocation(location)} 
                            className="text-gray-600 hover:text-gray-900 ml-1"
                          >
                            ×
                          </button>
                        </Badge>
                      ))}
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="interests" className="mt-4">
                  <div className="grid gap-4">
                    <div>
                      <Label htmlFor="interest">Intereses</Label>
                      <div className="flex mt-1">
                        <Input 
                          value={interestInput}
                          onChange={(e) => setInterestInput(e.target.value)}
                          placeholder="Ej: Tecnología"
                          className="flex-1"
                        />
                        <Button onClick={handleAddInterest} className="ml-2">Agregar</Button>
                      </div>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {newAudience.interests?.map((interest) => (
                          <Badge key={interest} variant="secondary" className="px-2 py-1 flex items-center gap-1">
                            {interest}
                            <button 
                              onClick={() => handleRemoveInterest(interest)} 
                              className="text-gray-600 hover:text-gray-900 ml-1"
                            >
                              ×
                            </button>
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div className="mt-4">
                      <Label>Categorías Sugeridas</Label>
                      <div className="grid md:grid-cols-2 gap-3 mt-2">
                        {interestCategories.map(category => (
                          <Card key={category.id}>
                            <CardHeader className="py-3">
                              <CardTitle className="text-base">{category.name}</CardTitle>
                            </CardHeader>
                            <CardContent className="py-2">
                              <div className="flex flex-wrap gap-2">
                                {category.subcategories.map(subcategory => (
                                  <Badge 
                                    key={subcategory} 
                                    variant="outline"
                                    className="cursor-pointer hover:bg-blue-50"
                                    onClick={() => {
                                      if (!newAudience.interests?.includes(subcategory)) {
                                        setNewAudience({
                                          ...newAudience,
                                          interests: [...(newAudience.interests || []), subcategory]
                                        });
                                      }
                                    }}
                                  >
                                    {subcategory}
                                  </Badge>
                                ))}
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="behaviors" className="mt-4">
                  <div>
                    <Label htmlFor="behavior">Comportamientos</Label>
                    <div className="flex mt-1">
                      <Input 
                        value={behaviorInput}
                        onChange={(e) => setBehaviorInput(e.target.value)}
                        placeholder="Ej: Compradores online frecuentes"
                        className="flex-1"
                      />
                      <Button onClick={handleAddBehavior} className="ml-2">Agregar</Button>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {newAudience.behaviors?.map((behavior) => (
                        <Badge key={behavior} variant="secondary" className="px-2 py-1 flex items-center gap-1">
                          {behavior}
                          <button 
                            onClick={() => handleRemoveBehavior(behavior)} 
                            className="text-gray-600 hover:text-gray-900 ml-1"
                          >
                            ×
                          </button>
                        </Badge>
                      ))}
                    </div>
                    
                    <div className="mt-6 space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Compradores online frecuentes</Label>
                          <p className="text-xs text-gray-500">Usuarios que hacen compras online al menos una vez por semana</p>
                        </div>
                        <Switch onCheckedChange={(checked) => {
                          if (checked && !newAudience.behaviors?.includes("Compradores online frecuentes")) {
                            setNewAudience({
                              ...newAudience,
                              behaviors: [...(newAudience.behaviors || []), "Compradores online frecuentes"]
                            });
                          } else if (!checked) {
                            handleRemoveBehavior("Compradores online frecuentes");
                          }
                        }} />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Viajeros frecuentes</Label>
                          <p className="text-xs text-gray-500">Usuarios que realizan viajes regularmente</p>
                        </div>
                        <Switch onCheckedChange={(checked) => {
                          if (checked && !newAudience.behaviors?.includes("Viajeros frecuentes")) {
                            setNewAudience({
                              ...newAudience,
                              behaviors: [...(newAudience.behaviors || []), "Viajeros frecuentes"]
                            });
                          } else if (!checked) {
                            handleRemoveBehavior("Viajeros frecuentes");
                          }
                        }} />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Early adopters</Label>
                          <p className="text-xs text-gray-500">Usuarios que adoptan nuevas tecnologías rápidamente</p>
                        </div>
                        <Switch onCheckedChange={(checked) => {
                          if (checked && !newAudience.behaviors?.includes("Early adopters")) {
                            setNewAudience({
                              ...newAudience,
                              behaviors: [...(newAudience.behaviors || []), "Early adopters"]
                            });
                          } else if (!checked) {
                            handleRemoveBehavior("Early adopters");
                          }
                        }} />
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
            
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsCreatingAudience(false)}>Cancelar</Button>
              <Button onClick={handleSaveAudience} className="bg-blue-600 hover:bg-blue-700">
                <Save className="mr-2 h-4 w-4" /> Guardar Audiencia
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </Layout>
  );
};

export default Segmentacion;
