import { Link, useLocation } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

export function UserNav() {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((path) => path);

  return (
    <div className="flex items-center justify-between w-full p-4 bg-gray-100 dark:bg-gray-800 rounded-md shadow-md">
      {/* Breadcrumbs dinámicos */}
      <div className="breadcrumbs text-sm text-gray-700 dark:text-gray-300">
        <ul className="flex space-x-2">
          <li>
            <Link to="/" className="hover:underline">Home</Link>
          </li>
          {pathnames.map((path, index) => {
            const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;
            const isLast = index === pathnames.length - 1;
            return (
              <li key={routeTo}>
                {isLast ? (
                  <span className="text-gray-500 dark:text-gray-400">{formatBreadcrumb(path)}</span>
                ) : (
                  <Link to={routeTo} className="hover:underline">
                    {formatBreadcrumb(path)}
                  </Link>
                )}
              </li>
            );
          })}
        </ul>
      </div>

      {/* User Dropdown */}
      <div className="flex items-center gap-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar className="h-8 w-8 cursor-pointer">
              <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Avatar" />
              <AvatarFallback className="flex items-center justify-center w-full h-full">
                <span className="text-sm font-medium text-center">US</span>
              </AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>

          <DropdownMenuContent className="w-56 p-4 bg-white dark:bg-gray-700 border border-gray-200 rounded-md shadow-lg z-50" align="end" forceMount>
            <DropdownMenuLabel className="dark:text-white font-normal text-gray-800 mb-2">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">Usuario</p>
                <p className="text-xs leading-none text-muted-foreground">usuario@ejemplo.com</p>
              </div>
            </DropdownMenuLabel>

            <DropdownMenuSeparator className="border-t border-gray-200" />

            <DropdownMenuGroup>
              <DropdownMenuItem>
                <Link to="/viewUser" className="text-sm text-gray-700 dark:text-white hover:text-blue-600 hover:bg-gray-100 rounded-md p-2 transition-all">
                  Ver usuario
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link to="/editUser" className="dark:text-white text-sm text-gray-700 hover:text-blue-600 hover:bg-gray-100 rounded-md p-2 transition-all">
                  Modificar usuario
                </Link>
              </DropdownMenuItem>
            </DropdownMenuGroup>

            <DropdownMenuSeparator className="border-t border-gray-200" />

            <DropdownMenuItem>
              <Link to="/login" className="text-sm text-red-600 hover:text-white hover:bg-red-600 rounded-md p-2 transition-all">
                Cerrar sesión
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}

// Función para formatear los breadcrumbs (convierte "mi-carpeta" en "Mi Carpeta")
function formatBreadcrumb(text) {
  return text.replace(/-/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());
}
