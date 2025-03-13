import { useState } from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Dashboard from "./components/dashboard"
import Login from "./components/login"
import Reports from "./components/reports"
import Overview from "./components/overview"
import TicketList from "./components/ticket-list"
import TicketFormIncident from "./components/ticket-form-incident"
import TicketFormService from "./components/ticket-form-service"
import { TicketDetailIncident } from "./components/ticketDetailIncident"
import TicketDetailService from "./components/ticketDetailService"
import { ThemeProvider } from "./components/theme-provider"

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  if (!isLoggedIn) {
    return <Login onLogin={() => setIsLoggedIn(true)} />
  }

  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <Router>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/overview" element={<Overview />} />
          <Route path="/tickets" element={<TicketList />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/new-incident" element={<TicketFormIncident />} />
          <Route path="/new-service" element={<TicketFormService />} />
          <Route path="/incident/:id" element={<TicketDetailIncident />} />
          <Route path="/service/:id" element={<TicketDetailService />} />
        </Routes>
      </Router>
    </ThemeProvider>
  )
}

export default App

