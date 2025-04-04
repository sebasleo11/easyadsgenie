
import { useState } from 'react';
import { useAssistant, AssistantMode, AssistantTone } from '@/contexts/AssistantContext';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Save } from 'lucide-react';

const BotSettings = () => {
  const { isEnabled, mode, tone, updatePreferences } = useAssistant();
  const [localEnabled, setLocalEnabled] = useState(isEnabled);
  const [localMode, setLocalMode] = useState<AssistantMode>(mode);
  const [localTone, setLocalTone] = useState<AssistantTone>(tone);
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    await updatePreferences({
      assistant_enabled: localEnabled,
      assistant_mode: localMode,
      assistant_tone: localTone,
    });
    setSaving(false);
  };

  const exampleMessages = {
    formal: {
      basic: "Bienvenido a la segmentación de audiencia. Vamos a definir paso a paso a quién irá dirigido su anuncio.",
      advanced: "Bienvenido a la segmentación avanzada. Analizaremos variables demográficas, psicográficas y comportamentales para optimizar su alcance."
    },
    casual: {
      basic: "¡Hola! Vamos a definir juntos quién verá tu anuncio. Es más fácil de lo que parece.",
      advanced: "¡Hola! Vamos a trabajar con criterios avanzados de segmentación. Verás que con estos ajustes conseguiremos mejores resultados."
    },
    motivational: {
      basic: "¡Es momento de encontrar a tu audiencia ideal! Con una buena segmentación, multiplicarás el impacto de tu mensaje.",
      advanced: "¡Es hora de llevar tu segmentación al siguiente nivel! Estos ajustes avanzados serán clave para maximizar el impacto y ROI de tu campaña."
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-medium">Activar Asistente Virtual</h3>
          <p className="text-sm text-gray-500">Habilita o deshabilita el asistente virtual en toda la aplicación</p>
        </div>
        <Switch 
          checked={localEnabled} 
          onCheckedChange={setLocalEnabled}
        />
      </div>
      
      <div className="space-y-3">
        <Label htmlFor="assistant-mode">Modo del Asistente</Label>
        <Select 
          value={localMode} 
          onValueChange={(value: AssistantMode) => setLocalMode(value)}
          disabled={!localEnabled}
        >
          <SelectTrigger id="assistant-mode">
            <SelectValue placeholder="Selecciona un modo" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="basic">
              <div className="font-medium">Básico</div>
              <div className="text-sm text-muted-foreground">Instrucciones paso a paso con lenguaje claro</div>
            </SelectItem>
            <SelectItem value="advanced">
              <div className="font-medium">Avanzado</div>
              <div className="text-sm text-muted-foreground">Estrategias más complejas y consejos prácticos</div>
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="space-y-3">
        <Label htmlFor="assistant-tone">Tono del Asistente</Label>
        <Select 
          value={localTone} 
          onValueChange={(value: AssistantTone) => setLocalTone(value)}
          disabled={!localEnabled}
        >
          <SelectTrigger id="assistant-tone">
            <SelectValue placeholder="Selecciona un tono" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="formal">
              <div className="font-medium">Formal</div>
              <div className="text-sm text-muted-foreground">Lenguaje profesional y preciso</div>
            </SelectItem>
            <SelectItem value="casual">
              <div className="font-medium">Casual</div>
              <div className="text-sm text-muted-foreground">Conversacional y amigable</div>
            </SelectItem>
            <SelectItem value="motivational">
              <div className="font-medium">Motivador</div>
              <div className="text-sm text-muted-foreground">Inspirador y entusiasta</div>
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div>
        <Label>Ejemplo de Mensaje</Label>
        <Card className="mt-2">
          <CardContent className="p-4 text-sm">
            {exampleMessages[localTone][localMode]}
          </CardContent>
        </Card>
      </div>

      <Button 
        onClick={handleSave} 
        disabled={saving || !localEnabled}
        className="w-full"
      >
        <Save className="mr-2 h-4 w-4" />
        {saving ? "Guardando..." : "Guardar Configuración"}
      </Button>
    </div>
  );
};

export default BotSettings;
