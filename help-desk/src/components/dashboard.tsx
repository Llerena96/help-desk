import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { Overview } from "./overview"
import { RecentTickets } from "./recent-tickets"
import { TicketForm } from "./ticket-form-service"
import { Reports } from "./reports"
<<<<<<< Updated upstream:help-desk/src/components/dashboard.tsx
import { TicketFormIncident } from "./ticket-form-incident"
import { useTheme } from "./theme-provider"
=======
import { TicketFormIncident } from "./ticketFormIncident"
>>>>>>> Stashed changes:help-desk/src/components/dashboard.jsx

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("overview")
  return (
    <div className="parent">
       
      <div className="div2 pr-10 pl-5 pt-10">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight"></h2>
        </div>
        <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="flex space-x-2 border-b mb-7 pb-7">
            <TabsTrigger value="overview" className="tab-trigger">
              Resumen
            </TabsTrigger>
            <TabsTrigger value="new" className="tab-trigger">
              Nuevo Ticket
            </TabsTrigger>
            <TabsTrigger value="incident" className="tab-trigger">
              Incidente
            </TabsTrigger>
            <TabsTrigger value="reports" className="tab-trigger">
              Reportes
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <Overview />
            <RecentTickets />
          </TabsContent>
          <TabsContent value="new">
            <Card>
              <CardHeader>
                <CardTitle>Crear Nuevo Ticket</CardTitle>
                <CardDescription>Complete el formulario para crear un nuevo ticket de soporte.</CardDescription>
              </CardHeader>
              <CardContent>
                <TicketForm />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="incident">
            <Card>
              <CardHeader>
                <CardTitle>Crear Nuevo Incidente</CardTitle>
                <CardDescription>Complete el formulario para crear un nuevo incidente de soporte.</CardDescription>
              </CardHeader>
              <CardContent>
                <TicketFormIncident />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="reports">
            <Reports />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}