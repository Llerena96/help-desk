import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { Overview } from "./overview"
import { RecentTickets } from "./recent-tickets"
import { TicketForm } from "./ticket-form-service"
import { TicketList } from "./ticket-list"
import { Reports } from "./reports"
import { History } from "./history"
import { MainNav } from "./main-nav"
import { UserNav } from "./user-nav"
import { TicketFormIncident } from "./ticket-form-incident"

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="flex min-h-screen flex-col">
      <div className="border-b">
        <div className="flex h-16 items-center px-4">
          <MainNav className="mx-6" />
          {/* <div className="ml-auto flex items-center space-x-4">
            <UserNav />
          </div> */}
        </div>
      </div>
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Mesa de Ayuda</h2>
        </div>
        <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="flex space-x-2 border-b">
            <TabsTrigger value="overview" className="data-[state=active]:bg-blue-500 data-[state=active]:text-white px-4 py-2 rounded-md">
              Resumen
            </TabsTrigger>
            <TabsTrigger value="new" className="data-[state=active]:bg-blue-500 data-[state=active]:text-white px-4 py-2 rounded-md">
              Nuevo Ticket
            </TabsTrigger>
            <TabsTrigger value="incident" className="data-[state=active]:bg-blue-500 data-[state=active]:text-white px-4 py-2 rounded-md">
              Incidente
            </TabsTrigger>
            <TabsTrigger value="reports" className="data-[state=active]:bg-blue-500 data-[state=active]:text-white px-4 py-2 rounded-md">
              Reportes
            </TabsTrigger>
            <TabsTrigger value="history" className="data-[state=active]:bg-blue-500 data-[state=active]:text-white px-4 py-2 rounded-md">
              Historial
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <Overview />
            <RecentTickets />
          </TabsContent>
          <TabsContent value="tickets">
            <TicketList />
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
          <TabsContent value="history">
            <History />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}