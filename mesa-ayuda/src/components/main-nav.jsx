import { Link } from "react-router-dom"

export default function MainNav({ className }) {
  return (
    <nav className={`flex items-center space-x-4 lg:space-x-6 ${className}`}>
      <Link to="/" className="text-sm font-medium transition-colors hover:text-primary">
        Dashboard
      </Link>
      <Link to="/tickets" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
        Tickets
      </Link>
      <Link to="/overview" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
        Overview
      </Link>
      <Link to="/reports" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
        Reports
      </Link>
    </nav>
  )
}

