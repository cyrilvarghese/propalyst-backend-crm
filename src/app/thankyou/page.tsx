"use client"

import { useEffect, useState } from "react"
import { motion } from "motion/react"
import { Check, Phone } from "lucide-react"

interface CallbackDateTime {
  date: string
  time: string
}

export default function ThankYouPage() {
  const [callbackDateTime, setCallbackDateTime] = useState<CallbackDateTime | null>(null)
  const [displayDateTime, setDisplayDateTime] = useState<string>("")

  useEffect(() => {
    // Retrieve callback datetime from sessionStorage
    const storedDateTime = sessionStorage.getItem("callbackDateTime")
    if (storedDateTime) {
      const dateTime = JSON.parse(storedDateTime)
      setCallbackDateTime(dateTime)

      // Format the date and time for display
      const date = new Date(dateTime.date)
      const formattedDate = date.toLocaleDateString("en-IN", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      })
      const formattedTime = dateTime.time

      setDisplayDateTime(`${formattedDate} at ${formattedTime}`)
    }
  }, [])

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md space-y-8 text-center"
      >
        {/* Success Animation */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="flex justify-center"
        >
          <div className="w-20 h-20 flex items-center justify-center bg-green-600/20 rounded-full">
            <Check className="w-10 h-10 text-green-600" />
          </div>
        </motion.div>

        {/* Main Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="space-y-4"
        >
          <h1 className="text-3xl font-bold text-foreground">Thank You!</h1>
          <p className="text-lg text-muted-foreground">
            We've received your callback request
          </p>
        </motion.div>

        {/* Callback DateTime Display */}
        {displayDateTime && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-primary/10 border border-primary/20 rounded-lg p-4 space-y-3"
          >
            <div className="flex items-center justify-center gap-2 text-primary">
              <Phone className="w-5 h-5" />
              <p className="font-semibold">Callback Scheduled</p>
            </div>
            <p className="text-sm font-medium text-foreground">{displayDateTime}</p>
          </motion.div>
        )}

        {/* Final Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="space-y-3 pt-4"
        >
          <p className="text-sm text-muted-foreground leading-relaxed">
            Thank you for talking to us. We'll call you at your scheduled time to discuss the perfect property for you.
          </p>
          <p className="text-sm font-medium text-foreground">
            Talk to you soon! 🏡
          </p>
        </motion.div>
      </motion.div>
    </div>
  )
}
