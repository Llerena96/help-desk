"use client"

import { useState } from "react"
import MainNav from "./main-nav"
import UserNav from "./user-nav"

export default function Overview() {
  const [stats, setStats] = useState({
    totalTickets: 245,
    resolvedTickets: 182,
    avgResponseTime: "3.2 hours",
    avgResolutionTime: "1.5 days",
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
        <div className="mb-6">
          <h1 className="text-2xl font-bold">System Overview</h1>
          <p className="text-muted-foreground">Key metrics and performance indicators for your help desk</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-lg border bg-card p-4 text-card-foreground shadow-sm">
            <div className="flex flex-row items-center justify-between space-y-0 pb-2">
              <h3 className="text-sm font-medium tracking-tight">Total Tickets</h3>
            </div>
            <div className="text-2xl font-bold">{stats.totalTickets}</div>
          </div>
          <div className="rounded-lg border bg-card p-4 text-card-foreground shadow-sm">
            <div className="flex flex-row items-center justify-between space-y-0 pb-2">
              <h3 className="text-sm font-medium tracking-tight">Resolved Tickets</h3>
            </div>
            <div className="text-2xl font-bold">{stats.resolvedTickets}</div>
          </div>
          <div className="rounded-lg border bg-card p-4 text-card-foreground shadow-sm">
            <div className="flex flex-row items-center justify-between space-y-0 pb-2">
              <h3 className="text-sm font-medium tracking-tight">Avg. Response Time</h3>
            </div>
            <div className="text-2xl font-bold">{stats.avgResponseTime}</div>
          </div>
          <div className="rounded-lg border bg-card p-4 text-card-foreground shadow-sm">
            <div className="flex flex-row items-center justify-between space-y-0 pb-2">
              <h3 className="text-sm font-medium tracking-tight">Avg. Resolution Time</h3>
            </div>
            <div className="text-2xl font-bold">{stats.avgResolutionTime}</div>
          </div>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
            <div className="p-6">
              <h3 className="text-lg font-medium">Ticket Volume</h3>
              <div className="mt-4 h-[300px] rounded-md border bg-gray-100 flex items-center justify-center">
                <span className="text-muted-foreground">Chart placeholder</span>
              </div>
            </div>
          </div>
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
            <div className="p-6">
              <h3 className="text-lg font-medium">Resolution Rate</h3>
              <div className="mt-4 h-[300px] rounded-md border bg-gray-100 flex items-center justify-center">
                <span className="text-muted-foreground">Chart placeholder</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

