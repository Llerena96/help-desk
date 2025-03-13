"use client"

import { useState } from "react"

export default function UserNav() {
  const [isOpen, setIsOpen] = useState(false)
  const user = {
    name: "John Doe",
    email: "john.doe@example.com",
    avatar: "https://github.com/shadcn.png",
  }

  return (
    <div className="relative">
      <button
        className="flex items-center gap-2 rounded-full border p-1 hover:bg-accent"
        onClick={() => setIsOpen(!isOpen)}
      >
        <img src={user.avatar || "/placeholder.svg"} alt={user.name} className="h-8 w-8 rounded-full" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 rounded-md border bg-popover p-2 text-popover-foreground shadow-md">
          <div className="flex items-center gap-2 p-2">
            <img src={user.avatar || "/placeholder.svg"} alt={user.name} className="h-10 w-10 rounded-full" />
            <div>
              <p className="text-sm font-medium">{user.name}</p>
              <p className="text-xs text-muted-foreground">{user.email}</p>
            </div>
          </div>
          <div className="border-t my-1"></div>
          <button
            className="w-full rounded-md p-2 text-left text-sm hover:bg-accent"
            onClick={() => {
              // Handle profile click
            }}
          >
            Profile
          </button>
          <button
            className="w-full rounded-md p-2 text-left text-sm hover:bg-accent"
            onClick={() => {
              // Handle settings click
            }}
          >
            Settings
          </button>
          <div className="border-t my-1"></div>
          <button
            className="w-full rounded-md p-2 text-left text-sm text-red-500 hover:bg-accent"
            onClick={() => {
              // Handle logout
              window.location.reload()
            }}
          >
            Logout
          </button>
        </div>
      )}
    </div>
  )
}

