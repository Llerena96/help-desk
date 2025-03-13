"use client"

import { useState } from "react"
import MainNav from "./main-nav"
import UserNav from "./user-nav"

export default function Reports() {
  const [dateRange, setDateRange] = useState("last30Days")
  const [reportType, setReportType] = useState("ticketVolume")

  const handleDateRangeChange = (e) => {
    setDateRange(e.target.value)
  }

  const handleReportTypeChange = (e) => {
    setReportType(e.target.value)
  }

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
          <h1 className="text-2xl font-bold">Reports</h1>
          <p className="text-muted-foreground">Generate and view reports for your help desk activities</p>
        </div>

        <div className="mb-6 grid gap-4 md:grid-cols-2">
          <div>
            <label htmlFor="reportType" className="block text-sm font-medium text-gray-700">
              Report Type
            </label>
            <select
              id="reportType"
              value={reportType}
              onChange={handleReportTypeChange}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
            >
              <option value="ticketVolume">Ticket Volume</option>
              <option value="resolutionTime">Resolution Time</option>
              <option value="satisfactionScore">Satisfaction Score</option>
              <option value="agentPerformance">Agent Performance</option>
              <option value="categoryDistribution">Category Distribution</option>
            </select>
          </div>

          <div>
            <label htmlFor="dateRange" className="block text-sm font-medium text-gray-700">
              Date Range
            </label>
            <select
              id="dateRange"
              value={dateRange}
              onChange={handleDateRangeChange}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
            >
              <option value="last7Days">Last 7 Days</option>
              <option value="last30Days">Last 30 Days</option>
              <option value="last90Days">Last 90 Days</option>
              <option value="lastYear">Last Year</option>
              <option value="custom">Custom Range</option>
            </select>
          </div>
        </div>

        <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
          <div className="p-6">
            <h3 className="text-lg font-medium">
              {reportType === "ticketVolume" && "Ticket Volume Report"}
              {reportType === "resolutionTime" && "Resolution Time Report"}
              {reportType === "satisfactionScore" && "Satisfaction Score Report"}
              {reportType === "agentPerformance" && "Agent Performance Report"}
              {reportType === "categoryDistribution" && "Category Distribution Report"}
            </h3>
            <div className="mt-4 h-[400px] rounded-md border bg-gray-100 flex items-center justify-center">
              <span className="text-muted-foreground">Chart placeholder for {reportType}</span>
            </div>
          </div>
        </div>

        <div className="mt-6 rounded-lg border bg-card text-card-foreground shadow-sm">
          <div className="p-6">
            <h3 className="text-lg font-medium">Report Data</h3>
            <div className="mt-4 overflow-hidden rounded-md border">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-muted/50">
                    <th className="whitespace-nowrap px-4 py-2 text-left font-medium">Date</th>
                    <th className="whitespace-nowrap px-4 py-2 text-left font-medium">Value</th>
                    <th className="whitespace-nowrap px-4 py-2 text-left font-medium">Change</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t hover:bg-muted/50">
                    <td className="whitespace-nowrap px-4 py-2">Jan 2023</td>
                    <td className="px-4 py-2">245</td>
                    <td className="px-4 py-2 text-green-600">+12%</td>
                  </tr>
                  <tr className="border-t hover:bg-muted/50">
                    <td className="whitespace-nowrap px-4 py-2">Feb 2023</td>
                    <td className="px-4 py-2">285</td>
                    <td className="px-4 py-2 text-green-600">+16%</td>
                  </tr>
                  <tr className="border-t hover:bg-muted/50">
                    <td className="whitespace-nowrap px-4 py-2">Mar 2023</td>
                    <td className="px-4 py-2">265</td>
                    <td className="px-4 py-2 text-red-600">-7%</td>
                  </tr>
                  <tr className="border-t hover:bg-muted/50">
                    <td className="whitespace-nowrap px-4 py-2">Apr 2023</td>
                    <td className="px-4 py-2">290</td>
                    <td className="px-4 py-2 text-green-600">+9%</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="mt-4 flex justify-end">
              <button className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                Export Report
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

