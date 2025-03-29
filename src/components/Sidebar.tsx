
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { 
  LayoutDashboard, 
  TrendingUp, 
  BarChartBig, 
  Settings, 
  Target, 
  MessageSquare, 
  Image,
  ThumbsUp
} from "lucide-react";

interface SidebarProps {
  className?: string;
}

const Sidebar = ({ className }: SidebarProps) => {
  return (
    <div className={cn("pb-12 w-64 bg-white border-r hidden md:block", className)}>
      <div className="space-y-4 py-4">
        <div className="px-4 py-2">
          <h2 className="mb-2 px-2 text-lg font-semibold tracking-tight">
            Panel Principal
          </h2>
          <div className="space-y-1">
            <Button variant="secondary" className="w-full justify-start">
              <LayoutDashboard className="mr-2 h-4 w-4" />
              Dashboard
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <BarChartBig className="mr-2 h-4 w-4" />
              Métricas
            </Button>
          </div>
        </div>
        <div className="px-4 py-2">
          <h2 className="mb-2 px-2 text-lg font-semibold tracking-tight">
            Anuncios
          </h2>
          <div className="space-y-1">
            <Button variant="ghost" className="w-full justify-start">
              <TrendingUp className="mr-2 h-4 w-4" />
              Campañas
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <Target className="mr-2 h-4 w-4" />
              Segmentación
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <MessageSquare className="mr-2 h-4 w-4" />
              Creatividades
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <Image className="mr-2 h-4 w-4" />
              Imágenes
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <ThumbsUp className="mr-2 h-4 w-4" />
              Optimización
            </Button>
          </div>
        </div>
        <div className="px-4 py-2">
          <h2 className="mb-2 px-2 text-lg font-semibold tracking-tight">
            Configuración
          </h2>
          <div className="space-y-1">
            <Button variant="ghost" className="w-full justify-start">
              <Settings className="mr-2 h-4 w-4" />
              Preferencias
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
