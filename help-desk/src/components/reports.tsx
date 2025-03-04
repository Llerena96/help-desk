import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Button } from "./ui/button";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { PieChart, Pie, Cell, Tooltip as PieTooltip, Legend as PieLegend, ResponsiveContainer as PieResponsiveContainer } from 'recharts';
import { AreaChart, Area, CartesianGrid as AreaCartesianGrid, Tooltip as AreaTooltip, Legend as AreaLegend, XAxis as AreaXAxis, YAxis as AreaYAxis, ResponsiveContainer as AreaResponsiveContainer } from 'recharts';
import { BarChart, Bar, Tooltip as BarTooltip, CartesianGrid as BarCartesianGrid, XAxis as BarXAxis, YAxis as BarYAxis, Legend as BarLegend, ResponsiveContainer as BarResponsiveContainer } from 'recharts';
import { RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Tooltip as RadarTooltip, Legend as RadarLegend, ResponsiveContainer as RadarResponsiveContainer } from 'recharts';

export function Reports() {
  // Estado para controlar el tipo de gráfico seleccionado
  const [chartType, setChartType] = useState<string>('line');

  // Datos para los diferentes gráficos
  const performanceData = [
    { month: "Enero", resolutionTime: 5 },
    { month: "Febrero", resolutionTime: 7 },
    { month: "Marzo", resolutionTime: 23 },
    { month: "Abril", resolutionTime: 6 },
    { month: "Mayo", resolutionTime: 15 },
  ];

  const categoriesData = [
    { name: "Hardware", tickets: 8 },
    { name: "Software", tickets: 12 },
    { name: "Red", tickets: 6 },
    { name: "Accesos", tickets: 4 },
    { name: "Otros", tickets: 2 },
  ];

  const agentsData = [
    { name: "Agente 1", ticketsResolved: 50, quality: 21, speed: 3 },
    { name: "Agente 2", ticketsResolved: 50, quality: 32, speed: 4 },
    { name: "Agente 3", ticketsResolved: 50, quality: 11, speed: 5 },
    { name: "Agente 4", ticketsResolved: 50, quality: 23, speed: 3 },
  ];

  return (
    <div className="space-y-4">
      <Tabs defaultValue="summary space-y-4">
        <TabsList>
          <TabsTrigger value="summary">Resumen</TabsTrigger>
          <TabsTrigger value="performance">Rendimiento</TabsTrigger>
          <TabsTrigger value="categories">Categorías</TabsTrigger>
          <TabsTrigger value="agents">Agentes</TabsTrigger>
        </TabsList>

        <TabsContent value="summary">
          {/* Botones para seleccionar tipo de gráfico */}
          <div className="flex space-x-4 mb-4">
            <Button onClick={() => setChartType('line')}>Línea</Button>
            <Button onClick={() => setChartType('pie')}>Torta</Button>
            <Button onClick={() => setChartType('area')}>Área</Button>
            <Button onClick={() => setChartType('bar')}>Barras</Button>
            <Button onClick={() => setChartType('radar')}>Radar</Button>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Resumen de Tickets</CardTitle>
              <CardDescription>Visión general del estado de los tickets en el sistema.</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px] flex items-center justify-center">
              {/* Renderizar el gráfico según el tipo seleccionado */}
              {chartType === 'line' && (
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={performanceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="resolutionTime" stroke="#82ca9d" activeDot={{ r: 8 }} />
                  </LineChart>
                </ResponsiveContainer>
              )}

              {chartType === 'pie' && (
                <PieResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={categoriesData} dataKey="tickets" nameKey="name" outerRadius={80} fill="#8884d8" label>
                      {categoriesData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#FF5555'][index % 5]} />
                      ))}
                    </Pie>
                    <PieTooltip />
                    <PieLegend />
                  </PieChart>
                </PieResponsiveContainer>
              )}

              {chartType === 'area' && (
                <AreaResponsiveContainer width="100%" height="100%">
                  <AreaChart data={performanceData}>
                    <AreaCartesianGrid strokeDasharray="3 3" />
                    <AreaXAxis dataKey="month" />
                    <AreaYAxis />
                    <AreaTooltip />
                    <AreaLegend />
                    <Area type="monotone" dataKey="resolutionTime" stroke="#82ca9d" fillOpacity={0.3} fill="#82ca9d" />
                  </AreaChart>
                </AreaResponsiveContainer>
              )}

              {chartType === 'bar' && (
                <BarResponsiveContainer width="100%" height="100%">
                  <BarChart data={categoriesData}>
                    <BarCartesianGrid strokeDasharray="3 3" />
                    <BarXAxis dataKey="name" />
                    <BarYAxis />
                    <BarTooltip />
                    <BarLegend />
                    <Bar dataKey="tickets" fill="#8884d8" />
                  </BarChart>
                </BarResponsiveContainer>
              )}

              {chartType === 'radar' && (
                <RadarResponsiveContainer width="100%" height="100%">
                  <RadarChart outerRadius="80%" width={500} height={500} data={agentsData}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="name" />
                    <PolarRadiusAxis />
                    <RadarTooltip />
                    <RadarLegend />
                    <Radar name="Tickets Resueltos" dataKey="ticketsResolved" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                    <Radar name="Calidad" dataKey="quality" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.6} />
                    <Radar name="Velocidad" dataKey="speed" stroke="#ff7300" fill="#ff7300" fillOpacity={0.6} />
                  </RadarChart>
                </RadarResponsiveContainer>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
