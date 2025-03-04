import { BrowserRouter as Router } from "react-router-dom"
import Dashboard from "./components/dashboard"

function App() {
  return (
    <Router>
      <main className="min-h-screen bg-background text-foreground">
        <Dashboard />
      </main>
    </Router>
  )
}

export default App

