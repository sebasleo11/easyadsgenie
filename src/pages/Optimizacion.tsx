import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Copy, Edit, Trash, CheckCircle, XCircle, Pause } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";

const Optimizations = () => {
  const data = [
    {
      id: "1",
      name: "A/B Test de Títulos",
      description: "Prueba diferentes títulos para mejorar el CTR.",
      status: "activo",
      impact: "alto",
      confidence: "media",
    },
    {
      id: "2",
      name: "Optimización de Segmentación",
      description: "Ajusta la segmentación para alcanzar una audiencia más relevante.",
      status: "pausado",
      impact: "medio",
      confidence: "alta",
    },
    {
      id: "3",
      name: "Mejora de Creatividades",
      description: "Actualiza las creatividades con diseños más atractivos.",
      status: "completado",
      impact: "alto",
      confidence: "alta",
    },
  ];

  return (
    <Layout>
      <div className="container mx-auto py-10">
        <Card>
          <CardHeader>
            <CardTitle>Optimizaciones</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableCaption>Lista de optimizaciones en curso.</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">ID</TableHead>
                  <TableHead>Nombre</TableHead>
                  <TableHead>Descripción</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead>Impacto</TableHead>
                  <TableHead>Confianza</TableHead>
                  <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell className="font-medium">{row.id}</TableCell>
                    <TableCell>{row.name}</TableCell>
                    <TableCell>{row.description}</TableCell>
                    <TableCell>
                      {row.status === "activo" && (
                        <Badge variant="outline">
                          Activo
                        </Badge>
                      )}
                      {row.status === "pausado" && (
                        <Badge variant="secondary">
                          Pausado
                        </Badge>
                      )}
                      {row.status === "completado" && (
                        <Badge>
                          Completado
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell>{row.impact}</TableCell>
                    <TableCell>{row.confidence}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Abrir menú</span>
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                          <DropdownMenuItem>
                            <Copy className="mr-2 h-4 w-4" />
                            Copiar
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Edit className="mr-2 h-4 w-4" />
                            Editar
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Pause className="mr-2 h-4 w-4" />
                            Pausar
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive focus:bg-destructive/20">
                            <Trash className="mr-2 h-4 w-4" />
                            Eliminar
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Optimizations;
