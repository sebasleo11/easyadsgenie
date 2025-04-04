
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { AlertCircle, Plus, Trash } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

type WebhookType = 'report' | 'alert' | 'notification';

interface Webhook {
  id: string;
  webhook_name: string;
  webhook_url: string;
  webhook_type: WebhookType;
  is_active: boolean;
}

const WebhookSettings = () => {
  const [webhooks, setWebhooks] = useState<Webhook[]>([]);
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);
  const [newWebhook, setNewWebhook] = useState({
    webhook_name: '',
    webhook_url: '',
    webhook_type: 'report' as WebhookType,
  });

  useEffect(() => {
    fetchWebhooks();
  }, []);

  const fetchWebhooks = async () => {
    try {
      const { data: authData } = await supabase.auth.getUser();
      if (!authData?.user) {
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from('n8n_webhooks')
        .select('*')
        .eq('user_id', authData.user.id);

      if (error) throw error;

      setWebhooks(data || []);
    } catch (error) {
      console.error('Error fetching webhooks:', error);
      toast({
        title: "Error",
        description: "No se pudieron cargar los webhooks.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAddWebhook = async () => {
    // Simple validation
    if (!newWebhook.webhook_name.trim() || !newWebhook.webhook_url.trim()) {
      toast({
        title: "Error",
        description: "El nombre y la URL del webhook son obligatorios.",
        variant: "destructive",
      });
      return;
    }

    try {
      setAdding(true);
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
          webhook_type: newWebhook.webhook_type,
          is_active: true,
        });

      if (error) throw error;

      toast({
        title: "Webhook añadido",
        description: "El webhook ha sido añadido correctamente.",
      });

      // Reset form and refresh list
      setNewWebhook({
        webhook_name: '',
        webhook_url: '',
        webhook_type: 'report',
      });
      fetchWebhooks();
    } catch (error) {
      console.error('Error adding webhook:', error);
      toast({
        title: "Error",
        description: "No se pudo añadir el webhook. Inténtalo de nuevo.",
        variant: "destructive",
      });
    } finally {
      setAdding(false);
    }
  };

  const toggleWebhookStatus = async (id: string, currentStatus: boolean) => {
    try {
      const { error } = await supabase
        .from('n8n_webhooks')
        .update({ is_active: !currentStatus })
        .eq('id', id);

      if (error) throw error;

      // Update local state
      setWebhooks(webhooks.map(webhook => 
        webhook.id === id ? { ...webhook, is_active: !currentStatus } : webhook
      ));

      toast({
        title: "Estado actualizado",
        description: `Webhook ${!currentStatus ? 'activado' : 'desactivado'}.`,
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

      // Update local state
      setWebhooks(webhooks.filter(webhook => webhook.id !== id));

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

  const webhookTypeLabels = {
    report: "Informes periódicos",
    alert: "Alertas de rendimiento",
    notification: "Notificaciones"
  };

  return (
    <div className="space-y-6">
      <Alert className="mb-4">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Integración con N8N</AlertTitle>
        <AlertDescription>
          Configura webhooks para enviar automáticamente datos a tus flujos de trabajo en N8N.
          Puedes crear diferentes webhooks para distintos tipos de notificaciones.
        </AlertDescription>
      </Alert>

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Tus Webhooks</h3>
        
        {loading ? (
          <p className="text-sm text-gray-500">Cargando webhooks...</p>
        ) : webhooks.length === 0 ? (
          <p className="text-sm text-gray-500">No tienes webhooks configurados. Añade uno nuevo para comenzar.</p>
        ) : (
          <div className="space-y-3">
            {webhooks.map((webhook) => (
              <div 
                key={webhook.id} 
                className={`p-3 border rounded-md flex items-center justify-between ${webhook.is_active ? 'bg-white' : 'bg-gray-50'}`}
              >
                <div className="space-y-1">
                  <p className="font-medium">{webhook.webhook_name}</p>
                  <p className="text-xs text-gray-500 truncate max-w-xs">{webhook.webhook_url}</p>
                  <span className="inline-block px-2 py-0.5 text-xs rounded-full bg-primary/10 text-primary">
                    {webhookTypeLabels[webhook.webhook_type]}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="flex items-center space-x-1">
                    <span className="text-sm text-gray-500">{webhook.is_active ? 'Activo' : 'Inactivo'}</span>
                    <Switch 
                      checked={webhook.is_active} 
                      onCheckedChange={() => toggleWebhookStatus(webhook.id, webhook.is_active)} 
                    />
                  </div>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => deleteWebhook(webhook.id)}
                  >
                    <Trash className="h-4 w-4 text-gray-500" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="space-y-4 pt-4 border-t">
        <h3 className="text-lg font-medium">Añadir nuevo Webhook</h3>
        
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="webhook-name">Nombre del Webhook</Label>
            <Input 
              id="webhook-name" 
              placeholder="Ej: Informe Semanal" 
              value={newWebhook.webhook_name}
              onChange={(e) => setNewWebhook({...newWebhook, webhook_name: e.target.value})}
            />
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="webhook-url">URL del Webhook</Label>
            <Input 
              id="webhook-url" 
              placeholder="https://n8n.example.com/webhook/..." 
              value={newWebhook.webhook_url}
              onChange={(e) => setNewWebhook({...newWebhook, webhook_url: e.target.value})}
            />
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="webhook-type">Tipo de Webhook</Label>
            <Select 
              value={newWebhook.webhook_type} 
              onValueChange={(value: WebhookType) => setNewWebhook({...newWebhook, webhook_type: value})}
            >
              <SelectTrigger id="webhook-type">
                <SelectValue placeholder="Selecciona un tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="report">Informes periódicos</SelectItem>
                <SelectItem value="alert">Alertas de rendimiento</SelectItem>
                <SelectItem value="notification">Notificaciones</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <Button 
            className="w-full" 
            onClick={handleAddWebhook} 
            disabled={adding}
          >
            <Plus className="mr-2 h-4 w-4" />
            {adding ? 'Añadiendo...' : 'Añadir Webhook'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default WebhookSettings;
