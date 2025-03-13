import { Link } from "react-router-dom";

export function MainNav({ className, ...props }) {
  return (
    <nav className={`flex items-center space-x-4 lg:space-x-6 ${className}`} {...props}>
      <Link to="/" className="text-sm font-medium transition-colors hover:text-primary">
        Inicio
      </Link>
      <Link to="/tickets" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
        Tickets
      </Link>
      <Link to="/settings" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
        Configuración
      </Link>
    </nav>
  );
}
