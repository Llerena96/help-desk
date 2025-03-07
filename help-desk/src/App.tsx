import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./components/dashboard";
import { Reports } from "./components/reports";
import { Settings } from "./components/Settings";
import { TicketList } from "./components/ticket-list";
import { TicketDetailIncident } from "./components/ticketDetailIncident";
import { TicketDetailService } from "./components/ticketDetailService";
import { LoginForm } from "./components/login";
import { ThemeProvider } from "./components/theme-provider";
import { Sidebar } from "./components/ui/Sidebar"; // Importa el Sidebar
import { UserNav } from "./components/user-nav"; // Importa la navbar de usuario
import { UserProfile } from "./components/UserProfile";
import { useState } from "react";

function App() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  return (
    <ThemeProvider>
      <Router>
        <div className="flex min-h-screen bg-background text-foreground">
          {/* Sidebar de navegación */}
          <Sidebar isSidebarOpen={isSidebarOpen} setSidebarOpen={setSidebarOpen} />

          <div className="flex flex-col flex-1">
            {/* Navbar */}
            <header className="border-b border-gray-300 dark:border-gray-700 flex justify-end">
              <UserNav />
            </header>

            {/* Contenido Principal */}
            <main className={`flex-1 transition-all duration-300 ${isSidebarOpen ? 'lg:pl-60' : 'lg:pl-20'}`}>
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/tickets/:ticketId" element={<TicketDetailIncident />} />
                <Route path="/ticket_service/:ticketId" element={<TicketDetailService />} />
                <Route path="/tickets" element={<TicketList />} />
                <Route path="/reports" element={<Reports />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/viewUser" element={<UserProfile />} />
                <Route path="/login" element={<LoginForm />} />
              </Routes>
            </main>
          </div>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
