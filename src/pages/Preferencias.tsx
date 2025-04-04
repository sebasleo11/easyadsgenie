
import { useState } from "react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Settings, User, Bell, Shield, CreditCard, Save, Facebook, Instagram, Linkedin, Globe } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const Preferencias = () => {
  const [userProfile, setUserProfile] = useState({
    name: "Juan Pérez",
    email: "juan.perez@ejemplo.com",
    company: "Mi Empresa S.L.",
    phone: "+34 612 345 678",
    website: "www.miempresa.es",
    timeZone: "Europe/Madrid"
  });
  
  const [notificationSettings, setNotificationSettings] = useState({
    emailCampaignUpdates: true,
    emailPerformanceReports: true,
    emailOptimizationSuggestions: true,
    emailBillingAlerts: true,
    pushCampaignUpdates: true,
    pushPerformanceReports: false,
    pushOptimizationSuggestions: true
  });
  
  const [apiSettings, setApiSettings] = useState({
    facebookConnected: true,
    instagramConnected: true,
    linkedinConnected: false
  });
  
  const [securitySettings, setSecuritySettings] = useState({
    twoFactorAuth: false,
    loginNotifications: true,
    apiAccessNotifications: true
  });

  const handleProfileUpdate = () => {
    toast({
      title: "Perfil actualizado",
      description: "Tus datos de perfil han sido actualizados correctamente.",
    });
  };

  const handleNotificationUpdate = () => {
    toast({
      title: "Preferencias de notificaciones actualizadas",
      description: "Tus preferencias de notificaciones han sido actualizadas.",
    });
  };

  const handleApiUpdate = () => {
    toast({
      title: "Conexiones API actualizadas",
      description: "Tus conexiones con plataformas externas han sido actualizadas.",
    });
  };

  const handleSecurityUpdate = () => {
    toast({
      title: "Configuración de seguridad actualizada",
      description: "Tu configuración de seguridad ha sido actualizada.",
    });
  };

  const connectLinkedIn = () => {
    setApiSettings({...apiSettings, linkedinConnected: true});
    toast({
      title: "LinkedIn conectado",
      description: "Tu cuenta ha sido conectada con LinkedIn.",
    });
  };

  return (
    <Layout>
      <div className="flex-1 space-y-6 p-6">
        <h1 className="text-3xl font-bold">Preferencias</h1>
        <p className="text-gray-600 mb-6">Personaliza tu experiencia en Seba Generador de Anuncios</p>
        
        <Tabs defaultValue="profile">
          <TabsList className="mb-6">
            <TabsTrigger value="profile" className="flex gap-2">
              <User className="h-4 w-4" />
              Perfil
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex gap-2">
              <Bell className="h-4 w-4" />
              Notificaciones
            </TabsTrigger>
            <TabsTrigger value="api" className="flex gap-2">
              <Globe className="h-4 w-4" />
              Conexiones API
            </TabsTrigger>
            <TabsTrigger value="security" className="flex gap-2">
              <Shield className="h-4 w-4" />
              Seguridad
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle>Perfil de Usuario</CardTitle>
                <CardDescription>Gestiona la información de tu cuenta</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="space-y-2 flex-1">
                    <Label htmlFor="name">Nombre completo</Label>
                    <Input 
                      id="name" 
                      value={userProfile.name} 
                      onChange={(e) => setUserProfile({...userProfile, name: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2 flex-1">
                    <Label htmlFor="email">Correo electrónico</Label>
                    <Input 
                      id="email" 
                      type="email" 
                      value={userProfile.email} 
                      onChange={(e) => setUserProfile({...userProfile, email: e.target.value})}
                    />
                  </div>
                </div>
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="space-y-2 flex-1">
                    <Label htmlFor="company">Empresa</Label>
                    <Input 
                      id="company" 
                      value={userProfile.company} 
                      onChange={(e) => setUserProfile({...userProfile, company: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2 flex-1">
                    <Label htmlFor="phone">Teléfono</Label>
                    <Input 
                      id="phone" 
                      value={userProfile.phone} 
                      onChange={(e) => setUserProfile({...userProfile, phone: e.target.value})}
                    />
                  </div>
                </div>
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="space-y-2 flex-1">
                    <Label htmlFor="website">Sitio web</Label>
                    <Input 
                      id="website" 
                      value={userProfile.website} 
                      onChange={(e) => setUserProfile({...userProfile, website: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2 flex-1">
                    <Label htmlFor="timezone">Zona horaria</Label>
                    <Select 
                      defaultValue={userProfile.timeZone}
                      onValueChange={(value) => setUserProfile({...userProfile, timeZone: value})}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona una zona horaria" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Europe/Madrid">Europa/Madrid (GMT+1)</SelectItem>
                        <SelectItem value="Europe/London">Europa/Londres (GMT+0)</SelectItem>
                        <SelectItem value="America/New_York">América/Nueva York (GMT-5)</SelectItem>
                        <SelectItem value="America/Los_Angeles">América/Los Ángeles (GMT-8)</SelectItem>
                        <SelectItem value="Asia/Tokyo">Asia/Tokio (GMT+9)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bio">Descripción de la empresa</Label>
                  <Textarea 
                    id="bio" 
                    placeholder="Escribe una breve descripción sobre tu empresa"
                    rows={4}
                  />
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline">Cancelar</Button>
                <Button onClick={handleProfileUpdate}>Guardar Cambios</Button>
              </CardFooter>
            </Card>
            
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Facturación</CardTitle>
                <CardDescription>Gestiona tus métodos de pago y facturación</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4 py-3 border rounded-lg px-4">
                    <CreditCard className="h-6 w-6 text-gray-400" />
                    <div>
                      <p className="font-medium">VISA terminada en 4242</p>
                      <p className="text-sm text-gray-500">Expira 12/2026</p>
                    </div>
                    <div className="ml-auto">
                      <Button variant="ghost" size="sm">Cambiar</Button>
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-sm font-medium mb-2">Plan actual</p>
                    <div className="flex items-center justify-between bg-gray-50 rounded-lg p-4">
                      <div>
                        <p className="font-medium">Plan Profesional</p>
                        <p className="text-sm text-gray-600">€59/mes, facturación mensual</p>
                      </div>
                      <Button variant="outline" size="sm">Cambiar Plan</Button>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between pt-2">
                    <div>
                      <p className="font-medium">Facturación automática</p>
                      <p className="text-sm text-gray-500">Factura generada y cargo automático al inicio de cada mes</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">Ver Historial de Facturación</Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle>Preferencias de Notificaciones</CardTitle>
                <CardDescription>Configura cómo quieres recibir notificaciones</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium mb-4">Notificaciones por Correo Electrónico</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Actualizaciones de Campañas</p>
                          <p className="text-sm text-gray-500">Recibe notificaciones cuando tus campañas cambien de estado</p>
                        </div>
                        <Switch 
                          checked={notificationSettings.emailCampaignUpdates}
                          onCheckedChange={(checked) => setNotificationSettings({
                            ...notificationSettings,
                            emailCampaignUpdates: checked
                          })}
                        />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Informes de Rendimiento</p>
                          <p className="text-sm text-gray-500">Informes semanales sobre el rendimiento de tus anuncios</p>
                        </div>
                        <Switch 
                          checked={notificationSettings.emailPerformanceReports}
                          onCheckedChange={(checked) => setNotificationSettings({
                            ...notificationSettings,
                            emailPerformanceReports: checked
                          })}
                        />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Sugerencias de Optimización</p>
                          <p className="text-sm text-gray-500">Consejos para mejorar el rendimiento de tus anuncios</p>
                        </div>
                        <Switch 
                          checked={notificationSettings.emailOptimizationSuggestions}
                          onCheckedChange={(checked) => setNotificationSettings({
                            ...notificationSettings,
                            emailOptimizationSuggestions: checked
                          })}
                        />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Alertas de Facturación</p>
                          <p className="text-sm text-gray-500">Recordatorios de pago y notificaciones de facturación</p>
                        </div>
                        <Switch 
                          checked={notificationSettings.emailBillingAlerts}
                          onCheckedChange={(checked) => setNotificationSettings({
                            ...notificationSettings,
                            emailBillingAlerts: checked
                          })}
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t">
                    <h3 className="text-lg font-medium mb-4">Notificaciones Push</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Actualizaciones de Campañas</p>
                          <p className="text-sm text-gray-500">Notificaciones en tiempo real sobre tus campañas</p>
                        </div>
                        <Switch 
                          checked={notificationSettings.pushCampaignUpdates}
                          onCheckedChange={(checked) => setNotificationSettings({
                            ...notificationSettings,
                            pushCampaignUpdates: checked
                          })}
                        />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Informes de Rendimiento</p>
                          <p className="text-sm text-gray-500">Alertas cuando haya cambios significativos en el rendimiento</p>
                        </div>
                        <Switch 
                          checked={notificationSettings.pushPerformanceReports}
                          onCheckedChange={(checked) => setNotificationSettings({
                            ...notificationSettings,
                            pushPerformanceReports: checked
                          })}
                        />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Sugerencias de Optimización</p>
                          <p className="text-sm text-gray-500">Notificaciones de oportunidades de mejora importantes</p>
                        </div>
                        <Switch 
                          checked={notificationSettings.pushOptimizationSuggestions}
                          onCheckedChange={(checked) => setNotificationSettings({
                            ...notificationSettings,
                            pushOptimizationSuggestions: checked
                          })}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button onClick={handleNotificationUpdate}>
                  <Save className="mr-2 h-4 w-4" />
                  Guardar Preferencias
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="api">
            <Card>
              <CardHeader>
                <CardTitle>Conexiones de API</CardTitle>
                <CardDescription>Conecta tus cuentas en redes sociales para gestionar tus anuncios</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="flex items-center space-x-4 py-4 border-b">
                    <div className="p-2 rounded-full bg-blue-100">
                      <Facebook className="h-6 w-6 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">Facebook Ads</p>
                      <p className="text-sm text-gray-500">
                        {apiSettings.facebookConnected ? 
                          "Conectado - Última sincronización: hace 2 horas" :
                          "No conectado"}
                      </p>
                    </div>
                    <div>
                      {apiSettings.facebookConnected ? (
                        <Button variant="outline" onClick={() => setApiSettings({...apiSettings, facebookConnected: false})}>
                          Desconectar
                        </Button>
                      ) : (
                        <Button onClick={() => setApiSettings({...apiSettings, facebookConnected: true})}>
                          Conectar
                        </Button>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4 py-4 border-b">
                    <div className="p-2 rounded-full bg-pink-100">
                      <Instagram className="h-6 w-6 text-pink-600" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">Instagram Ads</p>
                      <p className="text-sm text-gray-500">
                        {apiSettings.instagramConnected ? 
                          "Conectado - Última sincronización: hace 3 horas" :
                          "No conectado"}
                      </p>
                    </div>
                    <div>
                      {apiSettings.instagramConnected ? (
                        <Button variant="outline" onClick={() => setApiSettings({...apiSettings, instagramConnected: false})}>
                          Desconectar
                        </Button>
                      ) : (
                        <Button onClick={() => setApiSettings({...apiSettings, instagramConnected: true})}>
                          Conectar
                        </Button>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4 py-4">
                    <div className="p-2 rounded-full bg-blue-100">
                      <Linkedin className="h-6 w-6 text-blue-800" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">LinkedIn Ads</p>
                      <p className="text-sm text-gray-500">
                        {apiSettings.linkedinConnected ? 
                          "Conectado - Última sincronización: hace 1 hora" :
                          "No conectado"}
                      </p>
                    </div>
                    <div>
                      {apiSettings.linkedinConnected ? (
                        <Button variant="outline" onClick={() => setApiSettings({...apiSettings, linkedinConnected: false})}>
                          Desconectar
                        </Button>
                      ) : (
                        <Button onClick={connectLinkedIn}>
                          Conectar
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline">Sincronizar Todas</Button>
                <Button onClick={handleApiUpdate}>
                  <Save className="mr-2 h-4 w-4" />
                  Guardar Conexiones
                </Button>
              </CardFooter>
            </Card>
            
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>API Keys</CardTitle>
                <CardDescription>Gestiona tus claves API para integraciones personalizadas</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="flex items-center justify-between py-3 border-b">
                    <div>
                      <p className="font-medium">Clave API Principal</p>
                      <p className="text-sm text-gray-500">Creada: 10/03/2025</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Input value="sk_****************************************" className="w-60" readOnly />
                      <Button variant="outline" size="sm">Ver</Button>
                      <Button variant="outline" size="sm">Copiar</Button>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between py-3">
                    <div>
                      <p className="font-medium">Clave API de Desarrollo</p>
                      <p className="text-sm text-gray-500">Creada: 25/03/2025</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Input value="sk_dev_**********************************" className="w-60" readOnly />
                      <Button variant="outline" size="sm">Ver</Button>
                      <Button variant="outline" size="sm">Copiar</Button>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">
                  Generar Nueva Clave API
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="security">
            <Card>
              <CardHeader>
                <CardTitle>Configuración de Seguridad</CardTitle>
                <CardDescription>Gestiona la seguridad de tu cuenta</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium mb-4">Autenticación</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Autenticación de dos factores</p>
                          <p className="text-sm text-gray-500">Añade una capa extra de seguridad a tu cuenta</p>
                        </div>
                        <Switch 
                          checked={securitySettings.twoFactorAuth}
                          onCheckedChange={(checked) => setSecuritySettings({
                            ...securitySettings,
                            twoFactorAuth: checked
                          })}
                        />
                      </div>
                      
                      <div className="pt-2">
                        <Button variant="outline" className="w-full" disabled={securitySettings.twoFactorAuth}>
                          Configurar autenticación de dos factores
                        </Button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t">
                    <h3 className="text-lg font-medium mb-4">Contraseña</h3>
                    <div className="grid gap-4">
                      <div className="grid gap-2">
                        <Label htmlFor="current-password">Contraseña actual</Label>
                        <Input id="current-password" type="password" />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="new-password">Nueva contraseña</Label>
                        <Input id="new-password" type="password" />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="confirm-password">Confirmar nueva contraseña</Label>
                        <Input id="confirm-password" type="password" />
                      </div>
                      <Button className="w-full mt-2">Cambiar Contraseña</Button>
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t">
                    <h3 className="text-lg font-medium mb-4">Alertas de Seguridad</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Notificaciones de inicio de sesión</p>
                          <p className="text-sm text-gray-500">Recibe alertas cuando se inicie sesión desde un nuevo dispositivo</p>
                        </div>
                        <Switch 
                          checked={securitySettings.loginNotifications}
                          onCheckedChange={(checked) => setSecuritySettings({
                            ...securitySettings,
                            loginNotifications: checked
                          })}
                        />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Notificaciones de acceso a API</p>
                          <p className="text-sm text-gray-500">Recibe alertas cuando haya accesos anómalos a la API</p>
                        </div>
                        <Switch 
                          checked={securitySettings.apiAccessNotifications}
                          onCheckedChange={(checked) => setSecuritySettings({
                            ...securitySettings,
                            apiAccessNotifications: checked
                          })}
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t">
                    <h3 className="text-lg font-medium mb-4">Sesiones Activas</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between py-2 px-3 bg-green-50 rounded-md">
                        <div>
                          <p className="font-medium">Este dispositivo</p>
                          <p className="text-xs text-gray-500">Windows 10 • Chrome • Madrid, España</p>
                        </div>
                        <p className="text-xs text-green-600">Activo ahora</p>
                      </div>
                      
                      <div className="flex items-center justify-between py-2 px-3 rounded-md">
                        <div>
                          <p className="font-medium">iPhone 13</p>
                          <p className="text-xs text-gray-500">iOS 17 • Safari • Madrid, España</p>
                        </div>
                        <div className="flex items-center">
                          <p className="text-xs text-gray-500 mr-3">Hace 2 horas</p>
                          <Button variant="ghost" size="sm" className="h-8 px-2">Cerrar</Button>
                        </div>
                      </div>
                    </div>
                    
                    <Button variant="outline" className="w-full mt-4">
                      Cerrar todas las sesiones
                    </Button>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button onClick={handleSecurityUpdate}>
                  <Save className="mr-2 h-4 w-4" />
                  Guardar Configuración
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Preferencias;
