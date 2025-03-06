
import { Link } from "react-router-dom";
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

  return (
    <div className="flex items-center justify-center gap-4 ml-auto">

      {/* Avatar y Dropdown Menu del Usuario */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar className="h-8 w-8">
            <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Avatar" />
            <AvatarFallback className="flex items-center justify-center w-full h-full">
              <span className="text-sm font-medium text-center">US</span>
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          className="w-56 p-4 bg-white border border-gray-200 rounded-md shadow-lg z-50"
          align="end"
          forceMount
        >
          <DropdownMenuLabel className="font-normal text-gray-800 mb-2">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">Usuario</p>
              <p className="text-xs leading-none text-muted-foreground">usuario@ejemplo.com</p>
            </div>
          </DropdownMenuLabel>

          <DropdownMenuSeparator className="border-t border-gray-200" />

          <DropdownMenuGroup>
            <DropdownMenuItem>
              <Link to="/viewUser" className="text-sm text-gray-700 hover:text-blue-600 hover:bg-gray-100 rounded-md p-2 transition-all">
                Ver usuario
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link to="/editUser" className="text-sm text-gray-700 hover:text-blue-600 hover:bg-gray-100 rounded-md p-2 transition-all">
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
  );
}
