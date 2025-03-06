import { Link } from "react-router-dom";
import { Home, Ticket, Users, Settings } from "lucide-react";

export function Sidebar() {
  return (
    <aside className="h-screen w-64 bg-gray-100 dark:bg-gray-900 p-4 border-r border-gray-300 dark:border-gray-700 flex flex-col">
      {/* Logo */}
      <div className="flex items-center justify-center mb-6">
        <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100">Help Desk</h1>
      </div>

      {/* Menú */}
      <nav className="flex flex-col space-y-2">
        <SidebarItem to="/" icon={<Home className="w-5 h-5" />} label="Inicio" />
        <SidebarItem to="/tickets" icon={<Ticket className="w-5 h-5" />} label="Tickets" />
        <SidebarItem to="/users" icon={<Users className="w-5 h-5" />} label="Usuarios" />
        <SidebarItem to="/settings" icon={<Settings className="w-5 h-5" />} label="Configuración" />
      </nav>
    </aside>
  );
}

function SidebarItem({ to, icon, label }: { to: string; icon: JSX.Element; label: string }) {
  return (
    <Link
      to={to}
      className="flex items-center gap-3 p-3 rounded-md text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 transition"
    >
      {icon}
      <span>{label}</span>
    </Link>
  );
}
