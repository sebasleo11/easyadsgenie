
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Wand2, Image, Type, MousePointerClick, Sparkles } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const AdGenerator = () => {
  const [adType, setAdType] = useState("image");
  const [preview, setPreview] = useState(false);
  const [headline, setHeadline] = useState("");
  const [description, setDescription] = useState("");
  const [cta, setCta] = useState("Comprar ahora");

  const generateAd = () => {
    setHeadline("Descubre la solución perfecta para tu negocio");
    setDescription(
      "Aumenta tus ventas con nuestro sistema inteligente. ¡Resultados garantizados o te devolvemos tu dinero!"
    );
    setCta("Comenzar ahora");
    setPreview(true);
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Generador de Anuncios</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Wand2 className="mr-2 h-5 w-5 text-brand-blue" />
                Crea tu anuncio
              </CardTitle>
              <CardDescription>
                Personaliza tu anuncio o usa nuestro asistente de IA para generar textos e imágenes optimizados.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="basic" className="space-y-4">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="basic">Básico</TabsTrigger>
                  <TabsTrigger value="creative">Creatividad</TabsTrigger>
                  <TabsTrigger value="settings">Configuración</TabsTrigger>
                </TabsList>

                <TabsContent value="basic" className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="adType">Tipo de anuncio</Label>
                    <RadioGroup
                      defaultValue="image"
                      className="grid grid-cols-1 md:grid-cols-3 gap-4"
                      onValueChange={setAdType}
                    >
                      <div className="flex flex-col items-center space-y-2 border rounded-md p-4">
                        <RadioGroupItem value="image" id="image" className="sr-only" />
                        <Label
                          htmlFor="image"
                          className={`cursor-pointer flex flex-col items-center ${
                            adType === "image" ? "text-brand-blue" : ""
                          }`}
                        >
                          <Image className="h-8 w-8 mb-2" />
                          <span className="font-medium">Imagen</span>
                          <span className="text-xs text-gray-500">Anuncio con una imagen</span>
                        </Label>
                      </div>
                      <div className="flex flex-col items-center space-y-2 border rounded-md p-4">
                        <RadioGroupItem value="carousel" id="carousel" className="sr-only" />
                        <Label
                          htmlFor="carousel"
                          className={`cursor-pointer flex flex-col items-center ${
                            adType === "carousel" ? "text-brand-blue" : ""
                          }`}
                        >
                          <Image className="h-8 w-8 mb-2" />
                          <span className="font-medium">Carrusel</span>
                          <span className="text-xs text-gray-500">Múltiples imágenes deslizables</span>
                        </Label>
                      </div>
                      <div className="flex flex-col items-center space-y-2 border rounded-md p-4">
                        <RadioGroupItem value="video" id="video" className="sr-only" />
                        <Label
                          htmlFor="video"
                          className={`cursor-pointer flex flex-col items-center ${
                            adType === "video" ? "text-brand-blue" : ""
                          }`}
                        >
                          <Image className="h-8 w-8 mb-2" />
                          <span className="font-medium">Video</span>
                          <span className="text-xs text-gray-500">Anuncio con video</span>
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="headline">Título principal</Label>
                      <Button variant="ghost" size="sm" className="h-8 text-brand-blue" onClick={() => setHeadline("")}>
                        Limpiar
                      </Button>
                    </div>
                    <div className="flex gap-2">
                      <Input
                        id="headline"
                        value={headline}
                        onChange={(e) => setHeadline(e.target.value)}
                        placeholder="Ej: Descubre la solución perfecta para tu negocio"
                        className="flex-1"
                      />
                      <Button variant="outline" size="icon" className="h-10 w-10 shrink-0">
                        <Sparkles className="h-4 w-4 text-brand-blue" />
                      </Button>
                    </div>
                    <p className="text-xs text-gray-500">
                      Máximo 40 caracteres. Actual: {headline.length}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="description">Descripción</Label>
                      <Button variant="ghost" size="sm" className="h-8 text-brand-blue" onClick={() => setDescription("")}>
                        Limpiar
                      </Button>
                    </div>
                    <div className="flex gap-2">
                      <Textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Describe tu producto o servicio de manera atractiva"
                        className="flex-1"
                        rows={3}
                      />
                      <Button variant="outline" size="icon" className="h-10 w-10 shrink-0 self-start">
                        <Sparkles className="h-4 w-4 text-brand-blue" />
                      </Button>
                    </div>
                    <p className="text-xs text-gray-500">
                      Máximo 125 caracteres. Actual: {description.length}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="cta">Botón de llamada a la acción</Label>
                    <Select value={cta} onValueChange={setCta}>
                      <SelectTrigger id="cta">
                        <SelectValue placeholder="Selecciona un CTA" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Comprar ahora">Comprar ahora</SelectItem>
                        <SelectItem value="Saber más">Saber más</SelectItem>
                        <SelectItem value="Registrarse">Registrarse</SelectItem>
                        <SelectItem value="Reservar">Reservar</SelectItem>
                        <SelectItem value="Contactar">Contactar</SelectItem>
                        <SelectItem value="Descargar">Descargar</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </TabsContent>

                <TabsContent value="creative" className="space-y-4">
                  <div className="space-y-4">
                    <div className="border rounded-lg p-4">
                      <h3 className="font-medium mb-2 flex items-center">
                        <Type className="mr-2 h-4 w-4 text-brand-blue" />
                        Asistente de texto
                      </h3>
                      <p className="text-sm text-gray-600 mb-3">
                        Genera textos persuasivos para tus anuncios con nuestra IA.
                      </p>
                      <div className="space-y-3">
                        <Select defaultValue="engagement">
                          <SelectTrigger>
                            <SelectValue placeholder="Selecciona un tono" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="professional">Profesional</SelectItem>
                            <SelectItem value="casual">Casual y cercano</SelectItem>
                            <SelectItem value="premium">Premium y exclusivo</SelectItem>
                            <SelectItem value="engagement">Alto impacto</SelectItem>
                            <SelectItem value="educational">Educativo</SelectItem>
                          </SelectContent>
                        </Select>
                        <Button className="w-full bg-brand-blue hover:bg-brand-darkBlue">
                          <Sparkles className="mr-2 h-4 w-4" /> Generar textos
                        </Button>
                      </div>
                    </div>

                    <div className="border rounded-lg p-4">
                      <h3 className="font-medium mb-2 flex items-center">
                        <Image className="mr-2 h-4 w-4 text-brand-blue" />
                        Creador de imágenes
                      </h3>
                      <p className="text-sm text-gray-600 mb-3">
                        Crea imágenes optimizadas para tus anuncios o sube tus propias imágenes.
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <Button variant="outline" className="h-auto py-2 px-4">
                          <Image className="mr-2 h-4 w-4" />
                          Subir imagen
                        </Button>
                        <Button className="h-auto py-2 px-4 bg-brand-blue hover:bg-brand-darkBlue">
                          <Sparkles className="mr-2 h-4 w-4" />
                          Generar imagen
                        </Button>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="settings" className="space-y-4">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="link">URL de destino</Label>
                      <Input
                        id="link"
                        placeholder="https://tu-sitio-web.com/pagina-de-destino"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="pixel">Píxel de Facebook</Label>
                      <Select defaultValue="default">
                        <SelectTrigger id="pixel">
                          <SelectValue placeholder="Selecciona un píxel" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="default">Píxel principal</SelectItem>
                          <SelectItem value="add">+ Crear nuevo píxel</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="format">Ubicación del anuncio</Label>
                      <Select defaultValue="feed">
                        <SelectTrigger id="format">
                          <SelectValue placeholder="Selecciona el formato" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="feed">Feed de Facebook</SelectItem>
                          <SelectItem value="stories">Stories</SelectItem>
                          <SelectItem value="reels">Reels</SelectItem>
                          <SelectItem value="multiple">Múltiples ubicaciones</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>

              <div className="mt-6 flex justify-between">
                <Button variant="outline">Guardar borrador</Button>
                <Button onClick={generateAd} className="bg-brand-blue hover:bg-brand-darkBlue">
                  <Wand2 className="mr-2 h-4 w-4" />
                  Generar anuncio
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <MousePointerClick className="mr-2 h-5 w-5 text-brand-blue" />
                Vista previa
              </CardTitle>
              <CardDescription>
                Así se verá tu anuncio en el feed de Facebook
              </CardDescription>
            </CardHeader>
            <CardContent>
              {preview ? (
                <div className="border rounded-lg overflow-hidden">
                  <div className="p-3 border-b flex items-center space-x-2">
                    <div className="w-10 h-10 rounded-full bg-gray-200"></div>
                    <div>
                      <p className="font-medium text-sm">Nombre de tu negocio</p>
                      <p className="text-xs text-gray-500">Publicidad</p>
                    </div>
                  </div>
                  <div className="aspect-video bg-gray-100 flex items-center justify-center">
                    <span className="text-gray-400 text-sm">Vista previa de la imagen</span>
                  </div>
                  <div className="p-3">
                    <h3 className="font-bold text-base mb-1">{headline}</h3>
                    <p className="text-sm mb-3">{description}</p>
                    <div className="flex justify-center">
                      <div className="w-full px-4 py-2 bg-brand-blue text-white text-center text-sm font-medium rounded">
                        {cta}
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="h-80 border rounded-lg flex items-center justify-center">
                  <div className="text-center p-4">
                    <Image className="h-10 w-10 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-500">
                      Completa el formulario y haz clic en Generar anuncio para ver la vista previa
                    </p>
                  </div>
                </div>
              )}

              <div className="mt-4 space-y-2">
                <Button variant="outline" className="w-full">
                  Ver en otras ubicaciones
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdGenerator;
