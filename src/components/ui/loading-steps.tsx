"use client"

import { motion, AnimatePresence } from "motion/react"
import { Spinner } from "./spinner"
import { Check } from "lucide-react"

export type LoadingStep = {
    id: string
    text: string
    completedText?: string // Text to show when complete
    status: "pending" | "loading" | "complete"
}

type LoadingStepsProps = {
    steps: LoadingStep[]
}

export default function     LoadingSteps({ steps }: LoadingStepsProps) {
    return (
        <div className="flex flex-col items-start pl-4 p-6 space-y-3 gap-2">
            <AnimatePresence mode="popLayout">
                {steps.map((step) => (
                    <motion.div
                        key={step.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        transition={{ duration: 0.5 }}
                        className="flex items-center gap-3"
                    >
                        {/* Icon */}
                        <div className="flex-shrink-0">
                            {step.status === "loading" && (
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ type: "spring", stiffness: 200 }}
                                >
                                    <Spinner className="size-4" />
                                </motion.div>
                            )}
                            {step.status === "complete" && (
                                <motion.div
                                    initial={{ scale: 1 }}
                                    animate={{ scale: 1.1 }}
                                    transition={{ type: "spring", stiffness: 200 }}
                                >
                                    <div className="size-5 rounded-full bg-gradient-primary flex items-center justify-center">
                                        <Check className="size-3 m-1 text-white" strokeWidth={3} />
                                    </div>
                                </motion.div>
                            )}
                            {step.status === "pending" && (
                                <div className="size-4 rounded-full border-2 border-muted" />
                            )}
                        </div>

                        {/* Text */}
                        <span
                            className={`text-sm font-medium transition-colors duration-300 ${step.status === "loading"
                                ? "text-shimmer"
                                : step.status === "complete"
                                    ? "text-foreground"
                                    : "text-muted-foreground"
                                }`}
                        >
                            {step.status === "complete" && step.completedText
                                ? step.completedText
                                : step.text}
                        </span>
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>
    )
}
