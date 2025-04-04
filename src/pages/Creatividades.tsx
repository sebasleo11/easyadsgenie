
import { useState } from "react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { MessageSquare, Image, Pencil, Copy, Trash, PlusCircle, Wand2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface CopyTemplate {
  id: number;
  title: string;
  headline: string;
  description: string;
  callToAction: string;
  type: 'product' | 'promotion' | 'brand';
}

interface CreativeAsset {
  id: number;
  title: string;
  type: 'text' | 'image';
  content: string;
  createdAt: string;
}

const sampleCopyTemplates: CopyTemplate[] = [
  {
    id: 1,
    title: "Descuento Especial",
    headline: "¡{DESCUENTO}% de descuento en todo {PRODUCTO}!",
    description: "No te pierdas esta oferta por tiempo limitado. Ahorra {DESCUENTO}% en nuestra selección de {PRODUCTO}. La oferta termina {FECHA}.",
    callToAction: "Comprar Ahora",
    type: 'promotion'
  },
  {
    id: 2,
    title: "Lanzamiento de Producto",
    headline: "Presentando el nuevo {PRODUCTO}",
    description: "Descubre el nuevo {PRODUCTO}, con características innovadoras como {CARACTERISTICA_1} y {CARACTERISTICA_2}. Mejora tu experiencia hoy mismo.",
    callToAction: "Descubrir Más",
    type: 'product'
  },
  {
    id: 3,
    title: "Testimonio de Cliente",
    headline: "{PRODUCTO}: Cambiando la vida de nuestros clientes",
    description: "\"{TESTIMONIO}\" - {NOMBRE_CLIENTE}, {UBICACION}",
    callToAction: "Ver Historias",
    type: 'brand'
  },
  {
    id: 4,
    title: "Evento Especial",
    headline: "Únete a nosotros para {EVENTO}",
    description: "Te invitamos a {EVENTO} el {FECHA} en {UBICACION}. No te pierdas esta oportunidad única de {BENEFICIO}.",
    callToAction: "Reservar Lugar",
    type: 'promotion'
  }
];

const sampleCreativeAssets: CreativeAsset[] = [
  {
    id: 1,
    title: "Oferta Primavera 2025",
    type: 'text',
    content: "¡25% de descuento en toda nuestra colección de primavera! Renueva tu estilo con los mejores precios. Oferta válida hasta agotar existencias.",
    createdAt: "2025-04-02"
  },
  {
    id: 2,
    title: "Banner Promocional - Verano",
    type: 'image',
    content: "https://images.unsplash.com/photo-1523712999610-f77fbcfc3843?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    createdAt: "2025-04-01"
  },
  {
    id: 3,
    title: "Nueva Colección 2025",
    type: 'text',
    content: "Descubre nuestra nueva colección exclusiva. Prendas de alta calidad diseñadas para el confort y la elegancia que buscas. ¡Encuentra tu estilo único!",
    createdAt: "2025-03-28"
  },
  {
    id: 4,
    title: "Banner Principal - Promoción",
    type: 'image',
    content: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    createdAt: "2025-03-25"
  },
];

const Creatividades = () => {
  const [copyTemplates, setCopyTemplates] = useState<CopyTemplate[]>(sampleCopyTemplates);
  const [creativeAssets, setCreativeAssets] = useState<CreativeAsset[]>(sampleCreativeAssets);
  const [isNewTemplateOpen, setIsNewTemplateOpen] = useState(false);
  const [isNewAssetOpen, setIsNewAssetOpen] = useState(false);
  const [newTemplate, setNewTemplate] = useState<Partial<CopyTemplate>>({
    title: "",
    headline: "",
    description: "",
    callToAction: "",
    type: 'promotion'
  });
  const [newAsset, setNewAsset] = useState<Partial<CreativeAsset>>({
    title: "",
    type: 'text',
    content: ""
  });

  const handleCreateTemplate = () => {
    const id = Math.max(0, ...copyTemplates.map(t => t.id)) + 1;
    const template: CopyTemplate = {
      id,
      title: newTemplate.title || `Plantilla ${id}`,
      headline: newTemplate.headline || "",
      description: newTemplate.description || "",
      callToAction: newTemplate.callToAction || "",
      type: newTemplate.type || 'promotion'
    };
    
    setCopyTemplates([...copyTemplates, template]);
    setIsNewTemplateOpen(false);
    toast({
      title: "Plantilla creada",
      description: "Tu plantilla de texto ha sido creada exitosamente.",
    });
    
    // Reset form
    setNewTemplate({
      title: "",
      headline: "",
      description: "",
      callToAction: "",
      type: 'promotion'
    });
  };

  const handleCreateAsset = () => {
    const id = Math.max(0, ...creativeAssets.map(a => a.id)) + 1;
    const today = new Date().toISOString().split('T')[0];
    
    const asset: CreativeAsset = {
      id,
      title: newAsset.title || `Activo ${id}`,
      type: newAsset.type || 'text',
      content: newAsset.content || "",
      createdAt: today
    };
    
    setCreativeAssets([...creativeAssets, asset]);
    setIsNewAssetOpen(false);
    toast({
      title: "Activo creativo añadido",
      description: "Tu activo creativo ha sido añadido exitosamente.",
    });
    
    // Reset form
    setNewAsset({
      title: "",
      type: 'text',
      content: ""
    });
  };

  const handleDeleteTemplate = (id: number) => {
    const templateToDelete = copyTemplates.find(t => t.id === id);
    setCopyTemplates(copyTemplates.filter(template => template.id !== id));
    toast({
      title: "Plantilla eliminada",
      description: `La plantilla "${templateToDelete?.title}" ha sido eliminada.`,
      variant: "destructive"
    });
  };

  const handleDeleteAsset = (id: number) => {
    const assetToDelete = creativeAssets.find(a => a.id === id);
    setCreativeAssets(creativeAssets.filter(asset => asset.id !== id));
    toast({
      title: "Activo eliminado",
      description: `El activo creativo "${assetToDelete?.title}" ha sido eliminado.`,
      variant: "destructive"
    });
  };

  const handleCopyTemplate = (template: CopyTemplate) => {
    // Copy to clipboard
    const textToCopy = `Título: ${template.headline}\n\nDescripción: ${template.description}\n\nCTA: ${template.callToAction}`;
    navigator.clipboard.writeText(textToCopy);
    
    toast({
      title: "Copiado al portapapeles",
      description: "El contenido de la plantilla ha sido copiado.",
    });
  };

  return (
    <Layout>
      <div className="flex-1 space-y-6 p-6">
        <h1 className="text-3xl font-bold">Creatividades</h1>
        <p className="text-gray-600 mb-6">Gestiona tus plantillas publicitarias y activos creativos</p>
        
        <Tabs defaultValue="templates" className="w-full">
          <div className="flex justify-between items-center mb-4">
            <TabsList>
              <TabsTrigger value="templates">Plantillas de Texto</TabsTrigger>
              <TabsTrigger value="assets">Activos Creativos</TabsTrigger>
            </TabsList>
            
            {/* Dynamic button based on active tab */}
            <Dialog open={isNewTemplateOpen} onOpenChange={setIsNewTemplateOpen}>
              <DialogTrigger asChild>
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <PlusCircle className="mr-2 h-4 w-4" /> Nueva Plantilla
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Crear Nueva Plantilla</DialogTitle>
                  <DialogDescription>
                    Crea una plantilla para tus anuncios. Usa {"{VARIABLE}"} para indicar campos variables.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="title">Nombre de la Plantilla</Label>
                    <Input 
                      id="title" 
                      value={newTemplate.title} 
                      onChange={(e) => setNewTemplate({...newTemplate, title: e.target.value})}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="type">Tipo de Plantilla</Label>
                    <Select 
                      defaultValue={newTemplate.type} 
                      onValueChange={(value) => setNewTemplate({...newTemplate, type: value as any})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona un tipo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="promotion">Promoción</SelectItem>
                        <SelectItem value="product">Producto</SelectItem>
                        <SelectItem value="brand">Marca</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="headline">Título del Anuncio</Label>
                    <Input 
                      id="headline" 
                      value={newTemplate.headline} 
                      onChange={(e) => setNewTemplate({...newTemplate, headline: e.target.value})}
                      placeholder="Ej: ¡{DESCUENTO}% de descuento en {PRODUCTO}!"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="description">Descripción del Anuncio</Label>
                    <Textarea 
                      id="description" 
                      value={newTemplate.description} 
                      onChange={(e) => setNewTemplate({...newTemplate, description: e.target.value})}
                      placeholder="Ej: Aprovecha esta oferta por tiempo limitado en {PRODUCTO}. Válido hasta el {FECHA}."
                      rows={3}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="callToAction">Llamada a la Acción</Label>
                    <Input 
                      id="callToAction" 
                      value={newTemplate.callToAction} 
                      onChange={(e) => setNewTemplate({...newTemplate, callToAction: e.target.value})}
                      placeholder="Ej: Comprar Ahora"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsNewTemplateOpen(false)}>Cancelar</Button>
                  <Button onClick={handleCreateTemplate}>Crear Plantilla</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
            
            <Dialog open={isNewAssetOpen} onOpenChange={setIsNewAssetOpen}>
              <DialogTrigger asChild>
                <Button className="hidden data-[state=active]:block bg-blue-600 hover:bg-blue-700">
                  <PlusCircle className="mr-2 h-4 w-4" /> Nuevo Activo
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Añadir Activo Creativo</DialogTitle>
                  <DialogDescription>
                    Añade texto o imágenes para usar en tus anuncios.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="assetTitle">Título del Activo</Label>
                    <Input 
                      id="assetTitle" 
                      value={newAsset.title} 
                      onChange={(e) => setNewAsset({...newAsset, title: e.target.value})}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="assetType">Tipo de Activo</Label>
                    <Select 
                      defaultValue={newAsset.type} 
                      onValueChange={(value) => setNewAsset({...newAsset, type: value as any})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona un tipo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="text">Texto</SelectItem>
                        <SelectItem value="image">Imagen</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  {newAsset.type === 'text' ? (
                    <div className="grid gap-2">
                      <Label htmlFor="textContent">Contenido</Label>
                      <Textarea 
                        id="textContent" 
                        value={newAsset.content} 
                        onChange={(e) => setNewAsset({...newAsset, content: e.target.value})}
                        rows={4}
                      />
                    </div>
                  ) : (
                    <div className="grid gap-2">
                      <Label htmlFor="imageUrl">URL de la Imagen</Label>
                      <Input 
                        id="imageUrl" 
                        value={newAsset.content} 
                        onChange={(e) => setNewAsset({...newAsset, content: e.target.value})}
                        placeholder="https://ejemplo.com/imagen.jpg"
                      />
                      <p className="text-xs text-gray-500">Ingresa la URL de una imagen existente</p>
                    </div>
                  )}
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsNewAssetOpen(false)}>Cancelar</Button>
                  <Button onClick={handleCreateAsset}>Añadir Activo</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          <TabsContent value="templates" className="space-y-4">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {copyTemplates.map((template) => (
                <Card key={template.id}>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-lg">{template.title}</CardTitle>
                      <span className="text-xs px-2 py-1 rounded bg-gray-100">
                        {template.type === 'promotion' && 'Promoción'}
                        {template.type === 'product' && 'Producto'}
                        {template.type === 'brand' && 'Marca'}
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <p className="text-xs text-gray-500">Título</p>
                        <p className="text-sm font-medium">{template.headline}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Descripción</p>
                        <p className="text-sm">{template.description}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">CTA</p>
                        <p className="text-sm font-medium">{template.callToAction}</p>
                      </div>
                      <div className="flex justify-end space-x-2">
                        <Button variant="ghost" size="sm" onClick={() => handleCopyTemplate(template)}>
                          <Copy className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => handleDeleteTemplate(template.id)}>
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <Card className="mt-8 border-dashed border-2 p-4">
              <div className="flex flex-col items-center justify-center p-6 text-center">
                <Wand2 className="h-10 w-10 text-gray-400 mb-4" />
                <h3 className="text-lg font-medium mb-2">Generación Asistida por IA</h3>
                <p className="text-gray-500 mb-4">
                  Deja que la IA te ayude a crear texto persuasivo para tus anuncios basado en tu producto y público objetivo.
                </p>
                <Button>Generar con IA</Button>
              </div>
            </Card>
          </TabsContent>
          
          <TabsContent value="assets" className="space-y-4">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {creativeAssets.map((asset) => (
                <Card key={asset.id}>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-lg">{asset.title}</CardTitle>
                      <div className="flex items-center">
                        {asset.type === 'text' ? (
                          <MessageSquare className="h-4 w-4 text-gray-400 mr-1" />
                        ) : (
                          <Image className="h-4 w-4 text-gray-400 mr-1" />
                        )}
                        <span className="text-xs">
                          {asset.type === 'text' ? 'Texto' : 'Imagen'}
                        </span>
                      </div>
                    </div>
                    <p className="text-xs text-gray-500">Creado el {asset.createdAt}</p>
                  </CardHeader>
                  <CardContent>
                    {asset.type === 'text' ? (
                      <div className="p-3 bg-gray-50 rounded-md text-sm">
                        {asset.content}
                      </div>
                    ) : (
                      <div className="relative aspect-video overflow-hidden rounded-md">
                        <img
                          src={asset.content}
                          alt={asset.title}
                          className="object-cover w-full h-full"
                        />
                      </div>
                    )}
                    <div className="flex justify-end space-x-2 mt-4">
                      <Button variant="ghost" size="sm" onClick={() => {
                        navigator.clipboard.writeText(asset.content);
                        toast({
                          title: "Copiado al portapapeles",
                          description: asset.type === 'text' ? "Texto copiado con éxito." : "URL de imagen copiada con éxito.",
                        });
                      }}>
                        <Copy className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => handleDeleteAsset(asset.id)}>
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Creatividades;
