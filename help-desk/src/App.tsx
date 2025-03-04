import { BrowserRouter as Router } from "react-router-dom"
import Dashboard from "./components/dashboard"
import { ThemeProvider } from "../components/theme-provider"
import { ThemeToggle } from "../components/theme-toggle"
function App() {
  return (
    <ThemeProvider defaultTheme="light">
    <Router>
      <main className="min-h-screen bg-background text-foreground">
        <ThemeToggle />
        <Dashboard />
      </main>
    </Router>
    </ThemeProvider>
  )
}

export default App

