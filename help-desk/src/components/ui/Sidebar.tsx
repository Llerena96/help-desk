import { Link } from "react-router-dom";
import { Home, Ticket, Users, Settings, Menu, X } from "lucide-react";
import { useState } from "react";

export function Sidebar() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      {/* Botón de hamburguesa flotante en todas las pantallas */}
      <button
        className="absolute top-4 left-4 z-[10000] p-2 bg-gray-700 text-white rounded-md"
        onClick={toggleSidebar}
      >
        {isSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Sidebar con efecto responsive */}
      <aside
        className={`absolute lg:relative top-0 left-0 h-screen ${
          isSidebarOpen ? "w-64" : "w-20"
        }  p-4 border-r border-gray-300 dark:bg-gray-500 dark:text-white dark:border-gray-100 flex flex-col transition-all duration-300 z-[9999]`}
      >
        {/* Logo */}
        <div className="flex items-center justify-between mb-6">
          <h1
            className={`text-xl font-bold transition-all ${
              isSidebarOpen ? "opacity-100" : "opacity-0 hidden"
            }`}
          >
          
          </h1>
        </div>

        {/* Menú */}
        <nav className="flex flex-col space-y-2 mt-5 ">
          <SidebarItem to="/" icon={<Home className=" dark:text-white w-5 h-5" />} label="Inicio" isSidebarOpen={isSidebarOpen} />
          <SidebarItem to="/tickets" icon={<Ticket className="w-5 h-5" />} label="Tickets" isSidebarOpen={isSidebarOpen} />
          <SidebarItem to="/users" icon={<Users className="w-5 h-5" />} label="Usuarios" isSidebarOpen={isSidebarOpen} />
          <SidebarItem to="/settings" icon={<Settings className="w-5 h-5" />} label="Configuración" isSidebarOpen={isSidebarOpen} />
        </nav>
      </aside>

      {/* Fondo oscuro cuando el menú está abierto en móviles */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 lg:hidden"
          onClick={toggleSidebar}
        ></div>
      )}
    </>
  );
}

function SidebarItem({
  to,
  icon,
  label,
  isSidebarOpen,
}: {
  to: string;
  icon: JSX.Element;
  label: string;
  isSidebarOpen: boolean;
}) {
  return (
    <Link
      to={to}
      className="flex items-center gap-3 p-3 rounded-md text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 transition"
    >
      {icon}
      <span className={`transition-all ${isSidebarOpen ? "opacity-100" : "opacity-0 hidden"}`}>
        {label}
      </span>
    </Link>
  );
}
