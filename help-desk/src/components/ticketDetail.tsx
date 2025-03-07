import { useParams } from "react-router-dom";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { tickets } from "./ticket-list";
import { Textarea } from "./ui/textarea";
import { Input } from "./ui/input";
import { useState } from "react";
import { CornerDownLeft, Save, RefreshCw, MessageSquareText } from "lucide-react";

export function TicketDetail() {
  const { ticketId } = useParams<{ ticketId: string }>();
  const ticket = tickets.find((ticket) => ticket.id === ticketId);

  if (!ticket) {
    return (
      <div className="text-center text-gray-900 dark:text-gray-300">
        <p>Ticket no encontrado</p>
      </div>
    );
  }

  const [formData, setFormData] = useState({
    title: ticket.title,
    description: ticket.description,
  });

  const [headerTitle, setHeaderTitle] = useState(ticket.title);
  const [resolution, setResolution] = useState("");
  const [completionCode, setCompletionCode] = useState("");
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    setHeaderTitle(formData.title);
    // Aquí puedes agregar la lógica para guardar los datos en la base de datos
  };

  const addComment = () => {
    if (newComment.trim() !== "") {
      setComments([...comments, { text: newComment, date: new Date().toLocaleString() }]);
      setNewComment("");
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Encabezado con colores corregidos */}
      <div className="flex m-0">
        <div className="bg-yellow-500 text-white p-3 font-semibold w-56">
          SOLICITUD DE SOPORTE TI
        </div>
        <div className="bg-gray-100 text-gray-900 p-3 flex-1">
          {ticket.id}: {headerTitle}
        </div>
      </div>

      {/* Botones de acción */}
      <div className="flex items-center justify-between p-3 bg-transparent border-lg">
        <Button className="flex items-center gap-2 px-3 py-1 border rounded-lg dark:text-white hover:bg-blue-900">
          <CornerDownLeft /> Atrás
        </Button>

        <div className="flex items-center space-x-4 text-gray-600">
          <Button className="dark:text-white hover:text-blue-900" onClick={handleSave}>
            <Save /> Guardar
          </Button>
          <Button className="dark:text-white hover:text-blue-900">
            <Save /> Guardar y cerrar
          </Button>
          <Button className="dark:text-white hover:text-blue-900">
            <RefreshCw /> Actualizar
          </Button>
          <Button className="dark:text-white hover:text-blue-900">
            <MessageSquareText /> Comentarios
          </Button>
        </div>
      </div>

      {/* Detalles del Ticket con edición */}
      <Card>
        <CardContent>
          <label className="block text-sm font-medium text-white">Título</label>
          <Input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full border rounded-lg p-2 mt-1"
          />

          <label className="block text-sm font-medium text-white mt-3">Descripción</label>
          <Textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full border rounded-lg p-2 mt-1"
            rows={4}
          />

          <p><strong>Prioridad:</strong> {ticket.priority}</p>
          <p><strong>Estado:</strong> {ticket.status}</p>
          <p><strong>Fecha de Creación:</strong> {ticket.createdAt}</p>
        </CardContent>
      </Card>

      {/* Más detalles */}
      <Card>
        <CardContent>
          <h3 className="text-lg font-semibold">Detalles</h3>
          <p><strong>Sitio:</strong> {ticket.site}</p>
          <p><strong>ID del Componente:</strong> {ticket.componentId}</p>
          <p><strong>Fecha de Inicio:</strong> {ticket.startDate}</p>
          <p><strong>Fecha de Resolución:</strong> {ticket.resolutionDate}</p>
          <p><strong>Fecha de Cierre:</strong> {ticket.closeDate}</p>
        </CardContent>
      </Card>

      {/* Resolución */}
      <Card>
        <CardContent>
          <h3 className="text-lg font-semibold">Resolución</h3>
          <Textarea
            placeholder="Describe la resolución..."
            value={resolution}
            onChange={(e) => setResolution(e.target.value)}
          />
          <Input
            className="mt-2"
            placeholder="Código de finalización"
            value={completionCode}
            onChange={(e) => setCompletionCode(e.target.value)}
          />
          <Button className="mt-2">Guardar Resolución</Button>
        </CardContent>
      </Card>

      {/* Comentarios */}
      <Card>
        <CardContent>
          <h3 className="text-lg font-semibold">Conversaciones</h3>
          <div className="space-y-2">
            {comments.map((comment, index) => (
              <p key={index} className="border p-2 rounded-md">
                {comment.text} <small className="block text-gray-500">{comment.date}</small>
              </p>
            ))}
          </div>
          <Textarea
            className="mt-2"
            placeholder="Añadir comentario..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <Button className="mt-2" onClick={addComment}>
            Enviar
          </Button>
        </CardContent>
      </Card>

      {/* Historial */}
      <Card>
        <CardContent>
          <h3 className="text-lg font-semibold">Historial de Cambios</h3>
          <ul className="list-disc pl-5">
            {ticket.history?.map((change, index) => (
              <li key={index}>
                {change.date} - {change.action}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
