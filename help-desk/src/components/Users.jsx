import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button.jsx";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select.jsx";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table.jsx";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../components/ui/dialog.jsx";
import { Switch } from "../components/ui/switch.jsx";

const users = [
  { id: 1, name: "Juan Pérez", email: "juan@example.com", status: "Activo" },
  { id: 2, name: "María López", email: "maria@example.com", status: "Inactivo" },
  { id: 3, name: "Carlos Ruiz", email: "carlos@example.com", status: "Vacaciones" },
  { id: 4, name: "Ana Torres", email: "ana@example.com", status: "Incapacidad" },
];

const statuses = ["Todos", "Activo", "Inactivo", "Vacaciones", "Incapacidad"];

export const Users = () => {
  const [selectedStatus, setSelectedStatus] = useState("Todos");
  const [selectedUser, setSelectedUser] = useState(null);
  const [viewMode, setViewMode] = useState("table");

  const filteredUsers = selectedStatus === "Todos" ? users : users.filter(user => user.status === selectedStatus);

  return (
    <div className="parent mt-10">
      <div className="div2 pr-10 pl-5 pt-10"> 
    <Card className="pr-10 pl-5 pt-10 shadow-xl">
      <CardHeader>
        <CardTitle className="text-xl font-bold">Gestión de Usuarios</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap justify-between items-center mb-4 gap-2">
          <Select onValueChange={setSelectedStatus}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Filtrar por estado" />
            </SelectTrigger>
            <SelectContent className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 shadow-lg">
              {statuses.map(status => (
                <SelectItem key={status} value={status}>{status}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <div className="flex space-x-2">
            <Button className={`btn ${viewMode === "table" ? "btn-primary" : "btn btn-soft"}`} onClick={() => setViewMode("table")}>
              Tabla
            </Button>
            <Button className={`btn ${viewMode === "cards" ? "btn-primary" : "btn btn-soft"}`} onClick={() => setViewMode("cards")}>
              Tarjetas
            </Button>
          </div>
          <Dialog>
            <Button className="btn btn-secondary">Configurar Grupos Resolutores</Button>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Configurar Grupos Resolutores</DialogTitle>
              </DialogHeader>
              <div>
                <p>Habilitar notificaciones:</p>
                <Switch />
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {viewMode === "table" ? (
          <div className="overflow-x-auto">
            <Table className="table w-full">
              <TableHeader>
                <TableRow>
                  <TableHead>Nombre</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead>Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map(user => (
                  <TableRow key={user.id} className="hover">
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.status}</TableCell>
                    <TableCell>
                      <Dialog>
                        <Button className="btn btn-outline" onClick={() => setSelectedUser(user)}>Ver Perfil</Button>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Perfil de {selectedUser?.name}</DialogTitle>
                          </DialogHeader>
                          <p>Email: {selectedUser?.email}</p>
                          <p>Estado: {selectedUser?.status}</p>
                        </DialogContent>
                      </Dialog>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredUsers.map(user => (
              <Card key={user.id} className="p-4 shadow-md bg-base-100 border border-gray-200 rounded-lg">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold">{user.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">Email: {user.email}</p>
                  <p className="text-gray-600">Estado: {user.status}</p>
                  <Dialog>
                    <Button className="btn btn-outline w-full mt-2" onClick={() => setSelectedUser(user)}>Ver Perfil</Button>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Perfil de {selectedUser?.name}</DialogTitle>
                      </DialogHeader>
                      <p>Email: {selectedUser?.email}</p>
                      <p>Estado: {selectedUser?.status}</p>
                    </DialogContent>
                  </Dialog>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
    </div>
    </div>
  );
}