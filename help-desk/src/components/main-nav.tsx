import { Link } from "react-router-dom"

interface MainNavProps {
  className?: string
}

export function MainNav({ className, ...props }: MainNavProps) {
  return (
    <nav className={`flex items-center space-x-4 lg:space-x-6 ${className}`} {...props}>
      <Link to="/" className="text-sm font-medium transition-colors hover:text-primary">
        Inicio
      </Link>
      <Link to="/tickets" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
        Tickets
      </Link>
      <Link to="/reports" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
        Reportes
      </Link>
      <Link to="/settings" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
        Configuración
      </Link>
    </nav>
  )
}

