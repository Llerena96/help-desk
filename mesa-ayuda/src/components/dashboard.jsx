"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import MainNav from "./main-nav"
import UserNav from "./user-nav"
import RecentTickets from "./recent-tickets"

export default function Dashboard() {
  const [stats, setStats] = useState({
    openTickets: 12,
    pendingTickets: 5,
    resolvedTickets: 23,
    totalTickets: 40,
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
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-lg border bg-card p-4 text-card-foreground shadow-sm">
            <div className="flex flex-row items-center justify-between space-y-0 pb-2">
              <h3 className="text-sm font-medium tracking-tight">Open Tickets</h3>
            </div>
            <div className="text-2xl font-bold">{stats.openTickets}</div>
          </div>
          <div className="rounded-lg border bg-card p-4 text-card-foreground shadow-sm">
            <div className="flex flex-row items-center justify-between space-y-0 pb-2">
              <h3 className="text-sm font-medium tracking-tight">Pending Tickets</h3>
            </div>
            <div className="text-2xl font-bold">{stats.pendingTickets}</div>
          </div>
          <div className="rounded-lg border bg-card p-4 text-card-foreground shadow-sm">
            <div className="flex flex-row items-center justify-between space-y-0 pb-2">
              <h3 className="text-sm font-medium tracking-tight">Resolved Tickets</h3>
            </div>
            <div className="text-2xl font-bold">{stats.resolvedTickets}</div>
          </div>
          <div className="rounded-lg border bg-card p-4 text-card-foreground shadow-sm">
            <div className="flex flex-row items-center justify-between space-y-0 pb-2">
              <h3 className="text-sm font-medium tracking-tight">Total Tickets</h3>
            </div>
            <div className="text-2xl font-bold">{stats.totalTickets}</div>
          </div>
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <div className="col-span-4 rounded-lg border bg-card text-card-foreground shadow-sm">
            <div className="p-6">
              <h3 className="text-lg font-medium">Recent Tickets</h3>
              <RecentTickets />
              <div className="mt-4 flex justify-end">
                <Link to="/tickets" className="text-sm text-blue-500 hover:text-blue-700">
                  View all tickets →
                </Link>
              </div>
            </div>
          </div>
          <div className="col-span-3 rounded-lg border bg-card text-card-foreground shadow-sm">
            <div className="p-6">
              <h3 className="text-lg font-medium">Quick Actions</h3>
              <div className="mt-4 grid gap-3">
                <Link
                  to="/new-incident"
                  className="flex items-center rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
                >
                  Create Incident Ticket
                </Link>
                <Link
                  to="/new-service"
                  className="flex items-center rounded-md bg-green-500 px-4 py-2 text-white hover:bg-green-600"
                >
                  Create Service Request
                </Link>
                <Link
                  to="/reports"
                  className="flex items-center rounded-md bg-purple-500 px-4 py-2 text-white hover:bg-purple-600"
                >
                  View Reports
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

