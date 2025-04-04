
import { useState } from "react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PlusCircle, Download, Trash, Search, Upload, Image as ImageIcon } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface ImageAsset {
  id: number;
  title: string;
  url: string;
  type: 'product' | 'banner' | 'logo' | 'background';
  dimensions: string;
  uploadedAt: string;
  size: string;
}

const sampleImages: ImageAsset[] = [
  {
    id: 1,
    title: "Banner Principal",
    url: "https://images.unsplash.com/photo-1523712999610-f77fbcfc3843",
    type: 'banner',
    dimensions: "1200x628",
    uploadedAt: "2025-04-01",
    size: "256 KB"
  },
  {
    id: 2,
    title: "Producto Destacado",
    url: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
    type: 'product',
    dimensions: "800x800",
    uploadedAt: "2025-03-28",
    size: "184 KB"
  },
  {
    id: 3,
    title: "Logo Empresa",
    url: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9",
    type: 'logo',
    dimensions: "400x400",
    uploadedAt: "2025-03-15",
    size: "48 KB"
  },
  {
    id: 4,
    title: "Fondo Abstracto",
    url: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07",
    type: 'background',
    dimensions: "1920x1080",
    uploadedAt: "2025-03-10",
    size: "312 KB"
  },
  {
    id: 5,
    title: "Promoción Verano",
    url: "https://images.unsplash.com/photo-1473091534298-04dcbce3278c",
    type: 'banner',
    dimensions: "1200x628",
    uploadedAt: "2025-02-20",
    size: "275 KB"
  },
  {
    id: 6,
    title: "Nuevo Lanzamiento",
    url: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7",
    type: 'product',
    dimensions: "800x800",
    uploadedAt: "2025-02-15",
    size: "220 KB"
  }
];

const stockImages = [
  {
    id: 101,
    title: "Paisaje Montañoso",
    url: "https://images.unsplash.com/photo-1469474968028-56623f02e42e",
    type: 'background',
  },
  {
    id: 102,
    title: "Empresarios en Reunión",
    url: "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
    type: 'banner',
  },
  {
    id: 103,
    title: "Tecnología Moderna",
    url: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
    type: 'product',
  },
  {
    id: 104,
    title: "Espacio de Trabajo",
    url: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
    type: 'banner',
  },
];

const Imagenes = () => {
  const [images, setImages] = useState<ImageAsset[]>(sampleImages);
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState<string>("all");
  const [newImage, setNewImage] = useState({
    title: "",
    url: "",
    type: "banner" as const
  });
  
  const filteredImages = images.filter(image => {
    const matchesSearch = image.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === "all" || image.type === filterType;
    return matchesSearch && matchesType;
  });

  const handleDeleteImage = (id: number) => {
    const imageToDelete = images.find(img => img.id === id);
    setImages(images.filter(image => image.id !== id));
    toast({
      title: "Imagen eliminada",
      description: `La imagen "${imageToDelete?.title}" ha sido eliminada.`,
      variant: "destructive"
    });
  };

  const handleAddImage = () => {
    if (!newImage.title || !newImage.url) {
      toast({
        title: "Error en el formulario",
        description: "Por favor completa todos los campos requeridos.",
        variant: "destructive"
      });
      return;
    }
    
    const today = new Date().toISOString().split('T')[0];
    const id = Math.max(0, ...images.map(img => img.id)) + 1;
    
    // In a real app, you would upload the file and get dimensions, size, etc.
    const newImageAsset: ImageAsset = {
      id,
      title: newImage.title,
      url: newImage.url,
      type: newImage.type,
      dimensions: "800x600", // Placeholder
      uploadedAt: today,
      size: "200 KB" // Placeholder
    };
    
    setImages([...images, newImageAsset]);
    setIsUploadDialogOpen(false);
    toast({
      title: "Imagen añadida",
      description: "La imagen ha sido añadida a tu biblioteca.",
    });
    
    // Reset form
    setNewImage({
      title: "",
      url: "",
      type: "banner"
    });
  };

  const addStockImage = (stockImage: typeof stockImages[0]) => {
    const today = new Date().toISOString().split('T')[0];
    const id = Math.max(0, ...images.map(img => img.id)) + 1;
    
    const newImageAsset: ImageAsset = {
      id,
      title: stockImage.title,
      url: stockImage.url,
      type: stockImage.type,
      dimensions: "1200x800", // Placeholder
      uploadedAt: today,
      size: "250 KB" // Placeholder
    };
    
    setImages([...images, newImageAsset]);
    toast({
      title: "Imagen de stock añadida",
      description: "La imagen ha sido añadida a tu biblioteca.",
    });
  };

  return (
    <Layout>
      <div className="flex-1 space-y-6 p-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Biblioteca de Imágenes</h1>
            <p className="text-gray-600">Gestiona las imágenes para tus campañas publicitarias</p>
          </div>
          
          <Dialog open={isUploadDialogOpen} onOpenChange={setIsUploadDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <PlusCircle className="mr-2 h-4 w-4" /> Subir Imagen
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Subir Nueva Imagen</DialogTitle>
                <DialogDescription>
                  Añade una nueva imagen a tu biblioteca para usar en tus anuncios.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="title">Título de la Imagen</Label>
                  <Input
                    id="title"
                    value={newImage.title}
                    onChange={(e) => setNewImage({ ...newImage, title: e.target.value })}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="type">Tipo de Imagen</Label>
                  <Select
                    defaultValue={newImage.type}
                    onValueChange={(value) => setNewImage({ ...newImage, type: value as any })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona un tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="banner">Banner</SelectItem>
                      <SelectItem value="product">Producto</SelectItem>
                      <SelectItem value="logo">Logo</SelectItem>
                      <SelectItem value="background">Fondo</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="url">URL de la Imagen</Label>
                  <Input
                    id="url"
                    value={newImage.url}
                    onChange={(e) => setNewImage({ ...newImage, url: e.target.value })}
                    placeholder="https://ejemplo.com/imagen.jpg"
                  />
                  <p className="text-xs text-gray-500">
                    Ingresa la URL de una imagen existente o usa el botón de subir archivo.
                  </p>
                </div>
                <div className="flex items-center justify-center p-4 border-2 border-dashed rounded-md">
                  <div className="text-center">
                    <Upload className="mx-auto h-12 w-12 text-gray-400" />
                    <p className="mt-2 text-sm text-gray-500">
                      Arrastra y suelta archivos aquí o
                    </p>
                    <Button variant="outline" size="sm" className="mt-2">
                      Seleccionar Archivo
                    </Button>
                    <p className="mt-1 text-xs text-gray-500">
                      PNG, JPG or GIF hasta 5MB
                    </p>
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsUploadDialogOpen(false)}>
                  Cancelar
                </Button>
                <Button onClick={handleAddImage}>Añadir Imagen</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
        
        <div className="flex flex-col md:flex-row gap-4">
          <div className="md:w-2/3">
            <div className="flex items-center space-x-2 mb-4">
              <div className="flex-1 relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  placeholder="Buscar imágenes..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Select defaultValue="all" onValueChange={setFilterType}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filtrar por tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos los tipos</SelectItem>
                  <SelectItem value="banner">Banners</SelectItem>
                  <SelectItem value="product">Productos</SelectItem>
                  <SelectItem value="logo">Logos</SelectItem>
                  <SelectItem value="background">Fondos</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredImages.length > 0 ? (
                filteredImages.map((image) => (
                  <Card key={image.id} className="overflow-hidden">
                    <div className="aspect-[4/3] relative">
                      <img
                        src={image.url}
                        alt={image.title}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <CardContent className="p-3">
                      <div className="mb-2">
                        <div className="font-medium truncate">{image.title}</div>
                        <div className="flex justify-between items-center text-xs text-gray-500">
                          <span>{image.dimensions}</span>
                          <span>{image.size}</span>
                        </div>
                      </div>
                      <div className="flex items-center text-xs">
                        <span className="bg-gray-100 text-gray-800 rounded px-2 py-1">
                          {image.type === 'banner' && 'Banner'}
                          {image.type === 'product' && 'Producto'}
                          {image.type === 'logo' && 'Logo'}
                          {image.type === 'background' && 'Fondo'}
                        </span>
                        <span className="ml-2 text-gray-500">{image.uploadedAt}</span>
                      </div>
                    </CardContent>
                    <CardFooter className="p-2 flex justify-end space-x-2 border-t">
                      <Button variant="ghost" size="sm">
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteImage(image.id)}
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                    </CardFooter>
                  </Card>
                ))
              ) : (
                <div className="col-span-3 flex items-center justify-center p-8 bg-gray-50 rounded-lg">
                  <div className="text-center">
                    <ImageIcon className="mx-auto h-12 w-12 text-gray-400" />
                    <h3 className="mt-2 text-sm font-medium text-gray-900">No se encontraron imágenes</h3>
                    <p className="mt-1 text-sm text-gray-500">
                      Intenta cambiar tu búsqueda o filtros.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          <div className="md:w-1/3">
            <Tabs defaultValue="stock">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="stock">Imágenes de Stock</TabsTrigger>
                <TabsTrigger value="uploaded">Recién Subidas</TabsTrigger>
              </TabsList>
              <TabsContent value="stock" className="space-y-4 mt-2">
                <div className="p-4 rounded-lg bg-gray-50">
                  <h3 className="font-medium mb-2">Imágenes de Stock Premium</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Explora nuestra colección de imágenes de alta calidad para usar en tus anuncios.
                  </p>
                  <div className="grid gap-4">
                    {stockImages.map((image) => (
                      <div key={image.id} className="flex overflow-hidden rounded-md border bg-white">
                        <div className="w-24 h-16 relative">
                          <img 
                            src={image.url} 
                            alt={image.title} 
                            className="object-cover w-full h-full"
                          />
                        </div>
                        <div className="p-3 flex flex-col justify-between flex-1">
                          <div className="text-sm font-medium truncate">{image.title}</div>
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="self-end" 
                            onClick={() => addStockImage(image)}
                          >
                            Usar
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <Button className="w-full" variant="outline">
                  Ver más imágenes de stock
                </Button>
              </TabsContent>
              <TabsContent value="uploaded" className="space-y-4 mt-2">
                <div className="p-4 rounded-lg bg-gray-50">
                  <h3 className="font-medium mb-2">Imágenes Recientes</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Las últimas imágenes que has subido a tu biblioteca.
                  </p>
                  <div className="grid gap-3">
                    {images.slice(0, 5).map((image) => (
                      <div key={image.id} className="flex items-center space-x-3 p-2 rounded hover:bg-gray-100">
                        <div className="w-12 h-12 relative">
                          <img 
                            src={image.url} 
                            alt={image.title} 
                            className="object-cover w-full h-full rounded"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate">{image.title}</p>
                          <p className="text-xs text-gray-500">{image.uploadedAt}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>
            </Tabs>
            
            <Card className="mt-6">
              <CardContent className="p-4">
                <h3 className="font-medium mb-2">Dimensiones Recomendadas</h3>
                <div className="space-y-3 text-sm">
                  <div>
                    <p className="font-medium">Banner para Facebook</p>
                    <p className="text-gray-600">1200 x 628 píxeles</p>
                  </div>
                  <div>
                    <p className="font-medium">Imagen de Producto</p>
                    <p className="text-gray-600">1080 x 1080 píxeles</p>
                  </div>
                  <div>
                    <p className="font-medium">Cabecera de Perfil</p>
                    <p className="text-gray-600">851 x 315 píxeles</p>
                  </div>
                  <div>
                    <p className="font-medium">Historia de Instagram</p>
                    <p className="text-gray-600">1080 x 1920 píxeles</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Imagenes;
