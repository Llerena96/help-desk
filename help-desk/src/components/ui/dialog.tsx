import { ReactNode } from "react"
import { X } from "lucide-react"
import { motion } from "framer-motion"

interface DialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  children: ReactNode
}

export function Dialog({ open, onOpenChange, children }: DialogProps) {
  if (!open) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white rounded-2xl shadow-lg p-6 max-w-lg w-full relative"
      >
        <button
          className="absolute top-2 right-2 p-1 rounded-full hover:bg-gray-200"
          onClick={() => onOpenChange(false)}
        >
          <X size={20} />
        </button>
        {children}
      </motion.div>
    </div>
  )
}

export function DialogContent({ children }: { children: ReactNode }) {
  return <div className="mt-4">{children}</div>
}

export function DialogHeader({ children }: { children: ReactNode }) {
  return <div className="text-lg font-semibold">{children}</div>
}

export function DialogTitle({ children }: { children: ReactNode }) {
  return <h2 className="text-xl font-bold">{children}</h2>
}