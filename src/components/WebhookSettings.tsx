
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';

interface Webhook {
  id: string;
  webhook_name: string;
  webhook_url: string;
  webhook_type: 'report' | 'alert' | 'notification';
  is_active: boolean;
}

const WebhookSettings = () => {
  const [webhooks, setWebhooks] = useState<Webhook[]>([]);
  const [loading, setLoading] = useState(true);
  const [newWebhook, setNewWebhook] = useState<Partial<Webhook>>({
    webhook_name: '',
    webhook_url: '',
    webhook_type: 'report',
    is_active: true
  });

  const loadWebhooks = async () => {
    try {
      setLoading(true);
      const { data: authData } = await supabase.auth.getUser();
      
      if (!authData?.user) {
        toast({
          title: "Error",
          description: "Debes iniciar sesión para ver tus webhooks.",
          variant: "destructive",
        });
        return;
      }
      
      const { data, error } = await supabase
        .from('n8n_webhooks')
        .select('*')
        .eq('user_id', authData.user.id);
      
      if (error) throw error;
      
      setWebhooks(data || []);
    } catch (error) {
      console.error('Error loading webhooks:', error);
      toast({
        title: "Error",
        description: "No se pudieron cargar los webhooks.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadWebhooks();
  }, []);

  const handleAddWebhook = async () => {
    try {
      if (!newWebhook.webhook_name || !newWebhook.webhook_url) {
        toast({
          title: "Error",
          description: "El nombre y la URL son obligatorios.",
          variant: "destructive",
        });
        return;
      }

      const { data: authData } = await supabase.auth.getUser();
      
      if (!authData?.user) {
        toast({
          title: "Error",
          description: "Debes iniciar sesión para añadir webhooks.",
          variant: "destructive",
        });
        return;
      }
      
      const { error } = await supabase
        .from('n8n_webhooks')
        .insert({
          user_id: authData.user.id,
          webhook_name: newWebhook.webhook_name,
          webhook_url: newWebhook.webhook_url,
          webhook_type: newWebhook.webhook_type || 'report',
          is_active: newWebhook.is_active !== undefined ? newWebhook.is_active : true
        });
      
      if (error) throw error;
      
      toast({
        title: "Webhook añadido",
        description: "El webhook ha sido agregado correctamente.",
      });
      
      // Reset form and reload webhooks
      setNewWebhook({
        webhook_name: '',
        webhook_url: '',
        webhook_type: 'report',
        is_active: true
      });
      await loadWebhooks();
    } catch (error) {
      console.error('Error adding webhook:', error);
      toast({
        title: "Error",
        description: "No se pudo añadir el webhook.",
        variant: "destructive",
      });
    }
  };

  const toggleWebhookStatus = async (id: string, currentStatus: boolean) => {
    try {
      const { error } = await supabase
        .from('n8n_webhooks')
        .update({ is_active: !currentStatus })
        .eq('id', id);
      
      if (error) throw error;
      
      await loadWebhooks();
      
      toast({
        title: "Estado actualizado",
        description: `El webhook ha sido ${!currentStatus ? 'activado' : 'desactivado'}.`,
      });
    } catch (error) {
      console.error('Error toggling webhook status:', error);
      toast({
        title: "Error",
        description: "No se pudo actualizar el estado del webhook.",
        variant: "destructive",
      });
    }
  };

  const deleteWebhook = async (id: string) => {
    try {
      const { error } = await supabase
        .from('n8n_webhooks')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      
      await loadWebhooks();
      
      toast({
        title: "Webhook eliminado",
        description: "El webhook ha sido eliminado correctamente.",
      });
    } catch (error) {
      console.error('Error deleting webhook:', error);
      toast({
        title: "Error",
        description: "No se pudo eliminar el webhook.",
        variant: "destructive",
      });
    }
  };

  const testWebhook = async (url: string) => {
    try {
      await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        mode: 'no-cors',
        body: JSON.stringify({
          timestamp: new Date().toISOString(),
          test: true,
          message: 'This is a test from Seba Generador de Anuncios'
        }),
      });
      
      toast({
        title: "Solicitud enviada",
        description: "La solicitud de prueba ha sido enviada al webhook.",
      });
    } catch (error) {
      console.error('Error testing webhook:', error);
      toast({
        title: "Error",
        description: "No se pudo enviar la solicitud de prueba.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Configuración de Webhooks para N8N</h3>
        <p className="text-sm text-gray-500 mt-1">
          Conecta N8N para automatizar reportes y alertas de rendimiento.
        </p>
      </div>

      <div className="space-y-4 border rounded-md p-4">
        <h4 className="text-md font-medium">Añadir Nuevo Webhook</h4>
        
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="webhook_name">Nombre</Label>
            <Input
              id="webhook_name"
              value={newWebhook.webhook_name}
              onChange={(e) => setNewWebhook({...newWebhook, webhook_name: e.target.value})}
              placeholder="Ejemplo: Reporte Semanal"
            />
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="webhook_url">URL del Webhook</Label>
            <Input
              id="webhook_url"
              value={newWebhook.webhook_url}
              onChange={(e) => setNewWebhook({...newWebhook, webhook_url: e.target.value})}
              placeholder="https://n8n.example.com/webhook/..."
            />
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="webhook_type">Tipo</Label>
            <Select
              value={newWebhook.webhook_type}
              onValueChange={(value: 'report' | 'alert' | 'notification') => 
                setNewWebhook({...newWebhook, webhook_type: value})
              }
            >
              <SelectTrigger id="webhook_type">
                <SelectValue placeholder="Selecciona un tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="report">Reporte</SelectItem>
                <SelectItem value="alert">Alerta</SelectItem>
                <SelectItem value="notification">Notificación</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex items-center space-x-2">
            <Switch
              id="is_active"
              checked={newWebhook.is_active}
              onCheckedChange={(checked) => setNewWebhook({...newWebhook, is_active: checked})}
            />
            <Label htmlFor="is_active">Activo</Label>
          </div>
          
          <Button onClick={handleAddWebhook}>
            Añadir Webhook
          </Button>
        </div>
      </div>

      <div className="border rounded-md p-4">
        <h4 className="text-md font-medium mb-4">Webhooks Configurados</h4>
        
        {loading ? (
          <p>Cargando webhooks...</p>
        ) : webhooks.length === 0 ? (
          <p className="text-sm text-gray-500">No tienes webhooks configurados.</p>
        ) : (
          <div className="space-y-4">
            {webhooks.map((webhook) => (
              <div key={webhook.id} className="p-4 border rounded-md bg-gray-50">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{webhook.webhook_name}</p>
                    <p className="text-sm text-gray-500">{webhook.webhook_url}</p>
                    <div className="flex items-center mt-1">
                      <span className={`inline-block h-2 w-2 rounded-full mr-2 ${webhook.is_active ? 'bg-green-500' : 'bg-gray-300'}`}></span>
                      <span className="text-xs">{webhook.webhook_type} - {webhook.is_active ? 'Activo' : 'Inactivo'}</span>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => testWebhook(webhook.webhook_url)}
                    >
                      Probar
                    </Button>
                    <Button 
                      size="sm" 
                      variant={webhook.is_active ? "destructive" : "default"}
                      onClick={() => toggleWebhookStatus(webhook.id, webhook.is_active)}
                    >
                      {webhook.is_active ? 'Desactivar' : 'Activar'}
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => deleteWebhook(webhook.id)}
                    >
                      Eliminar
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default WebhookSettings;
