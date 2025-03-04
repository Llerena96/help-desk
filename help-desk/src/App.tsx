import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./components/dashboard"; // Asegúrate de que el componente 'Dashboard' existe
import { Reports } from "./components/reports";
import { Settings } from "./components/Settings";
// import { TicketList } from "./components/ticket-list";
import { TicketDetail } from "./components/ticketDetail";
import { LoginForm } from "./components/login";



function App() {
  return (
    <Router>
      <main className="min-h-screen bg-background text-foreground">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/tickets/:ticketId" element={<TicketDetail />} /> {/* Ruta para ver detalles del ticket */}
          <Route path="/reports" element={<Reports />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/login" element={<LoginForm />} />
        </Routes>
      </main>
    </Router>
  )
}

export default App

