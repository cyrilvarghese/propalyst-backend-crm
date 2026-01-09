"use client"

import { useState } from "react"
import { motion } from "motion/react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { X, Calendar, Clock } from "lucide-react"

interface CallbackModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (datetime: { date: string; time: string }) => void
}

export function CallbackModal({ isOpen, onClose, onSubmit }: CallbackModalProps) {
  // Calculate default date (24 hours from now)
  const defaultDate = new Date(Date.now() + 24 * 60 * 60 * 1000)
  const defaultDateString = defaultDate.toISOString().split("T")[0]
  const defaultTime = `${String(defaultDate.getHours()).padStart(2, "0")}:${String(defaultDate.getMinutes()).padStart(2, "0")}`

  const [selectedDate, setSelectedDate] = useState(defaultDateString)
  const [selectedTime, setSelectedTime] = useState(defaultTime)

  const handleSubmit = () => {
    onSubmit({
      date: selectedDate,
      time: selectedTime,
    })
    onClose()
  }

  if (!isOpen) return null

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
      >
        <Card className="w-full max-w-md p-6 space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-foreground">Schedule a Callback</h2>
            <button
              onClick={onClose}
              className="p-1 hover:bg-muted rounded-md transition-colors"
            >
              <X className="w-5 h-5 text-muted-foreground" />
            </button>
          </div>

          {/* Description */}
          <p className="text-sm text-muted-foreground">
            Choose a convenient date and time for our team to call you back
          </p>

          {/* Date Input */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground flex items-center gap-2">
              <Calendar className="w-4 h-4 text-primary" />
              Date
            </label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full px-4 py-2 border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          {/* Time Input */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground flex items-center gap-2">
              <Clock className="w-4 h-4 text-primary" />
              Time
            </label>
            <input
              type="time"
              value={selectedTime}
              onChange={(e) => setSelectedTime(e.target.value)}
              className="w-full px-4 py-2 border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-4">
            <Button
              size="lg"
              variant="outline"
              className="flex-1"
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button
              size="lg"
              className="flex-1"
              onClick={handleSubmit}
            >
              Confirm Callback
            </Button>
          </div>
        </Card>
      </motion.div>
    </motion.div>
  )
}
