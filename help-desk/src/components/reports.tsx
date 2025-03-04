import { Link } from "react-router-dom"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs"

export function Reports() {
  return (
    <Tabs defaultValue="summary" className="space-y-4">
      <TabsList>
        <TabsTrigger value="summary">Resumen</TabsTrigger>
        <TabsTrigger value="performance">Rendimiento</TabsTrigger>
        <TabsTrigger value="categories">Categorías</TabsTrigger>
        <TabsTrigger value="agents">Agentes</TabsTrigger>
      </TabsList>

      <TabsContent value="summary" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Resumen de Tickets</CardTitle>
            <CardDescription>Visión general del estado de los tickets en el sistema.</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px] flex items-center justify-center">
            <div className="text-center">
              <p className="text-muted-foreground">Gráfico de resumen de tickets</p>
              <p className="text-xs text-muted-foreground mt-2">
                (Aquí se mostraría un gráfico con la distribución de tickets por estado)
              </p>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="performance" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Rendimiento</CardTitle>
            <CardDescription>Métricas de rendimiento del equipo de soporte.</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px] flex items-center justify-center">
            <div className="text-center">
              <p className="text-muted-foreground">Gráfico de tiempo de resolución</p>
              <p className="text-xs text-muted-foreground mt-2">
                (Aquí se mostraría un gráfico con los tiempos de resolución por categoría)
              </p>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="categories" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Categorías</CardTitle>
            <CardDescription>Distribución de tickets por categoría.</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px] flex items-center justify-center">
            <div className="text-center">
              <p className="text-muted-foreground">Gráfico de categorías</p>
              <p className="text-xs text-muted-foreground mt-2">
                (Aquí se mostraría un gráfico con la distribución de tickets por categoría)
              </p>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="agents" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Agentes</CardTitle>
            <CardDescription>Rendimiento de los agentes de soporte.</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px] flex items-center justify-center">
            <div className="text-center">
              <p className="text-muted-foreground">Gráfico de rendimiento de agentes</p>
              <p className="text-xs text-muted-foreground mt-2">
                (Aquí se mostraría un gráfico con el rendimiento de cada agente)
              </p>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}

