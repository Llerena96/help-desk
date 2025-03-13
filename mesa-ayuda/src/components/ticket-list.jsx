"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import MainNav from "./main-nav"
import UserNav from "./user-nav"

export default function TicketList() {
  const [tickets, setTickets] = useState([
    {
      id: "INC-1001",
      title: "Cannot access email",
      status: "Open",
      priority: "High",
      created: "2 hours ago",
      assignee: "Jane Smith",
      type: "incident",
    },
    {
      id: "SRV-2002",
      title: "New laptop request",
      status: "Pending",
      priority: "Medium",
      created: "1 day ago",
      assignee: "Mike Johnson",
      type: "service",
    },
    {
      id: "INC-1002",
      title: "Printer not working",
      status: "In Progress",
      priority: "Low",
      created: "3 hours ago",
      assignee: "Sarah Williams",
      type: "incident",
    },
    {
      id: "SRV-2003",
      title: "Software installation",
      status: "Resolved",
      priority: "Medium",
      created: "2 days ago",
      assignee: "Tom Brown",
      type: "service",
    },
    {
      id: "INC-1003",
      title: "Network connectivity issues",
      status: "Open",
      priority: "Critical",
      created: "30 minutes ago",
      assignee: "Unassigned",
      type: "incident",
    },
  ])

  const [filter, setFilter] = useState({
    status: "",
    priority: "",
    type: "",
  })

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
      case "Critical":
        return "bg-purple-100 text-purple-800"
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

  const filteredTickets = tickets.filter((ticket) => {
    return (
      (filter.status === "" || ticket.status === filter.status) &&
      (filter.priority === "" || ticket.priority === filter.priority) &&
      (filter.type === "" || ticket.type === filter.type)
    )
  })

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-10 border-b bg-background">
        <div className="flex h-16 items-center px-4">
          <MainNav className="mx-6" />
          <div className="ml-auto flex items-center space-x-4">
            <UserNav />
          </div>
        </div>
      </header>
      <main className="flex-1 p-4 md:p-6">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Tickets</h1>
            <p className="text-muted-foreground">Manage and track all support tickets</p>
          </div>
          <div className="flex space-x-2">
            <Link
              to="/new-incident"
              className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              New Incident
            </Link>
            <Link
              to="/new-service"
              className="rounded-md bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
            >
              New Service Request
            </Link>
          </div>
        </div>

        <div className="mb-6 grid gap-4 md:grid-cols-3">
          <div>
            <label htmlFor="statusFilter" className="block text-sm font-medium text-gray-700">
              Status
            </label>
            <select
              id="statusFilter"
              value={filter.status}
              onChange={(e) => setFilter({ ...filter, status: e.target.value })}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
            >
              <option value="">All Statuses</option>
              <option value="Open">Open</option>
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Resolved">Resolved</option>
            </select>
          </div>

          <div>
            <label htmlFor="priorityFilter" className="block text-sm font-medium text-gray-700">
              Priority
            </label>
            <select
              id="priorityFilter"
              value={filter.priority}
              onChange={(e) => setFilter({ ...filter, priority: e.target.value })}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
            >
              <option value="">All Priorities</option>
              <option value="Critical">Critical</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>

          <div>
            <label htmlFor="typeFilter" className="block text-sm font-medium text-gray-700">
              Type
            </label>
            <select
              id="typeFilter"
              value={filter.type}
              onChange={(e) => setFilter({ ...filter, type: e.target.value })}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
            >
              <option value="">All Types</option>
              <option value="incident">Incident</option>
              <option value="service">Service Request</option>
            </select>
          </div>
        </div>

        <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
          <div className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-muted/50">
                    <th className="whitespace-nowrap px-4 py-3 text-left font-medium">ID</th>
                    <th className="whitespace-nowrap px-4 py-3 text-left font-medium">Title</th>
                    <th className="whitespace-nowrap px-4 py-3 text-left font-medium">Status</th>
                    <th className="whitespace-nowrap px-4 py-3 text-left font-medium">Priority</th>
                    <th className="whitespace-nowrap px-4 py-3 text-left font-medium">Assignee</th>
                    <th className="whitespace-nowrap px-4 py-3 text-left font-medium">Created</th>
                    <th className="whitespace-nowrap px-4 py-3 text-left font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTickets.map((ticket) => (
                    <tr key={ticket.id} className="border-t hover:bg-muted/50">
                      <td className="whitespace-nowrap px-4 py-3 font-medium">
                        <Link to={`/${ticket.type}/${ticket.id}`} className="text-blue-600 hover:underline">
                          {ticket.id}
                        </Link>
                      </td>
                      <td className="px-4 py-3">{ticket.title}</td>
                      <td className="px-4 py-3">
                        <span
                          className={`inline-block rounded-full px-2 py-1 text-xs font-medium ${getStatusColor(ticket.status)}`}
                        >
                          {ticket.status}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`inline-block rounded-full px-2 py-1 text-xs font-medium ${getPriorityColor(ticket.priority)}`}
                        >
                          {ticket.priority}
                        </span>
                      </td>
                      <td className="px-4 py-3">{ticket.assignee}</td>
                      <td className="whitespace-nowrap px-4 py-3 text-muted-foreground">{ticket.created}</td>
                      <td className="whitespace-nowrap px-4 py-3">
                        <div className="flex space-x-2">
                          <button className="rounded-md bg-blue-100 px-2 py-1 text-xs font-medium text-blue-700 hover:bg-blue-200">
                            Edit
                          </button>
                          <button className="rounded-md bg-red-100 px-2 py-1 text-xs font-medium text-red-700 hover:bg-red-200">
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

