"use client"

import { useState } from "react"
import { Link } from "react-router-dom"

export default function RecentTickets() {
  const [tickets, setTickets] = useState([
    {
      id: "INC-1001",
      title: "Cannot access email",
      status: "Open",
      priority: "High",
      created: "2 hours ago",
      type: "incident",
    },
    {
      id: "SRV-2002",
      title: "New laptop request",
      status: "Pending",
      priority: "Medium",
      created: "1 day ago",
      type: "service",
    },
    {
      id: "INC-1002",
      title: "Printer not working",
      status: "In Progress",
      priority: "Low",
      created: "3 hours ago",
      type: "incident",
    },
    {
      id: "SRV-2003",
      title: "Software installation",
      status: "Resolved",
      priority: "Medium",
      created: "2 days ago",
      type: "service",
    },
  ])

  const getStatusColor = (status) => {
    switch (status) {
      case "Open":
        return "bg-red-100 text-red-800"
      case "Pending":
        return "bg-yellow-100 text-yellow-800"
      case "In Progress":
        return "bg-blue-100 text-blue-800"
      case "Resolved":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "High":
        return "bg-red-100 text-red-800"
      case "Medium":
        return "bg-yellow-100 text-yellow-800"
      case "Low":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="mt-4 overflow-hidden rounded-md border">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-muted/50">
            <th className="whitespace-nowrap px-4 py-2 text-left font-medium">ID</th>
            <th className="whitespace-nowrap px-4 py-2 text-left font-medium">Title</th>
            <th className="whitespace-nowrap px-4 py-2 text-left font-medium">Status</th>
            <th className="whitespace-nowrap px-4 py-2 text-left font-medium">Priority</th>
            <th className="whitespace-nowrap px-4 py-2 text-left font-medium">Created</th>
          </tr>
        </thead>
        <tbody>
          {tickets.map((ticket) => (
            <tr key={ticket.id} className="border-t hover:bg-muted/50">
              <td className="whitespace-nowrap px-4 py-2 font-medium">
                <Link to={`/${ticket.type}/${ticket.id}`} className="text-blue-600 hover:underline">
                  {ticket.id}
                </Link>
              </td>
              <td className="px-4 py-2">{ticket.title}</td>
              <td className="px-4 py-2">
                <span
                  className={`inline-block rounded-full px-2 py-1 text-xs font-medium ${getStatusColor(ticket.status)}`}
                >
                  {ticket.status}
                </span>
              </td>
              <td className="px-4 py-2">
                <span
                  className={`inline-block rounded-full px-2 py-1 text-xs font-medium ${getPriorityColor(ticket.priority)}`}
                >
                  {ticket.priority}
                </span>
              </td>
              <td className="whitespace-nowrap px-4 py-2 text-muted-foreground">{ticket.created}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

