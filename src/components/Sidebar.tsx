
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
import { Link, useLocation } from "react-router-dom";

interface SidebarProps {
  className?: string;
}

const Sidebar = ({ className }: SidebarProps) => {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <div className={cn("pb-12 w-64 bg-white border-r hidden md:block", className)}>
      <div className="space-y-4 py-4">
        <div className="px-4 py-2">
          <h2 className="mb-2 px-2 text-lg font-semibold tracking-tight">
            Panel Principal
          </h2>
          <div className="space-y-1">
            <Button 
              variant={currentPath === "/" ? "secondary" : "ghost"} 
              className="w-full justify-start"
              asChild
            >
              <Link to="/">
                <LayoutDashboard className="mr-2 h-4 w-4" />
                Dashboard
              </Link>
            </Button>
            <Button 
              variant={currentPath === "/metricas" ? "secondary" : "ghost"} 
              className="w-full justify-start"
              asChild
            >
              <Link to="/metricas">
                <BarChartBig className="mr-2 h-4 w-4" />
                Métricas
              </Link>
            </Button>
          </div>
        </div>
        <div className="px-4 py-2">
          <h2 className="mb-2 px-2 text-lg font-semibold tracking-tight">
            Anuncios
          </h2>
          <div className="space-y-1">
            <Button 
              variant={currentPath === "/campanas" ? "secondary" : "ghost"} 
              className="w-full justify-start"
              asChild
            >
              <Link to="/campanas">
                <TrendingUp className="mr-2 h-4 w-4" />
                Campañas
              </Link>
            </Button>
            <Button 
              variant={currentPath === "/segmentacion" ? "secondary" : "ghost"} 
              className="w-full justify-start"
              asChild
            >
              <Link to="/segmentacion">
                <Target className="mr-2 h-4 w-4" />
                Segmentación
              </Link>
            </Button>
            <Button 
              variant={currentPath === "/creatividades" ? "secondary" : "ghost"} 
              className="w-full justify-start"
              asChild
            >
              <Link to="/creatividades">
                <MessageSquare className="mr-2 h-4 w-4" />
                Creatividades
              </Link>
            </Button>
            <Button 
              variant={currentPath === "/imagenes" ? "secondary" : "ghost"} 
              className="w-full justify-start"
              asChild
            >
              <Link to="/imagenes">
                <Image className="mr-2 h-4 w-4" />
                Imágenes
              </Link>
            </Button>
            <Button 
              variant={currentPath === "/optimizacion" ? "secondary" : "ghost"} 
              className="w-full justify-start"
              asChild
            >
              <Link to="/optimizacion">
                <ThumbsUp className="mr-2 h-4 w-4" />
                Optimización
              </Link>
            </Button>
          </div>
        </div>
        <div className="px-4 py-2">
          <h2 className="mb-2 px-2 text-lg font-semibold tracking-tight">
            Configuración
          </h2>
          <div className="space-y-1">
            <Button 
              variant={currentPath === "/preferencias" ? "secondary" : "ghost"} 
              className="w-full justify-start"
              asChild
            >
              <Link to="/preferencias">
                <Settings className="mr-2 h-4 w-4" />
                Preferencias
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
