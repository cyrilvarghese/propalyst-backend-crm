"use client"

import { motion, animate } from "motion/react"
import CardImageVerticalNoPadding from "@/app/test/components/cards/card-image-vertical-no-padding"
import { MOCK_LISTINGS } from "@/data/mock-listings"
import { useEffect } from "react"

interface ResultsViewProps {
  resultCount?: number
}

export default function ResultsView({ resultCount = 10 }: ResultsViewProps) {
  // Get the listings to display, limited by resultCount
  const listingsToShow = MOCK_LISTINGS.slice(0, resultCount)

  // Scroll to results title when component mounts with a delay and custom scroll speed
  useEffect(() => {
    const timer = setTimeout(() => {
      const titleElement = document.getElementById("results-view-title")
      if (titleElement) {
        const targetPosition = titleElement.getBoundingClientRect().top + window.scrollY - window.innerHeight / 2
          + titleElement.offsetHeight / 2 + 300

        // Use Framer Motion's animate function for smooth, controlled scrolling
        animate(window.scrollY, targetPosition, {
          duration: 1, // 1.5 seconds for slower scroll
          ease: "easeInOut",
          onUpdate: (latest) => {
            window.scrollTo(0, latest)
          }
        })
      }
    }, 500)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div>
      <motion.p
        id="results-view-title"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.6,
          ease: "easeOut"
        }}
        className="text-2xl pt-8 pb-8 text-center "
      >
        Here are some results for your search ...
      </motion.p>

      <motion.div
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              staggerChildren: 0.2,
              delayChildren: 0.3,
            },
          },
        }}
        className="flex flex-row flex-wrap items-center justify-center p-8 w-full gap-4"
      >
        {listingsToShow.map((listing) => (
          <motion.div
            key={listing.id}
            variants={{
              hidden: { opacity: 0, y: 50 },
              visible: {
                opacity: 1,
                y: 0,
                transition: {
                  type: "spring",
                  stiffness: 100,
                  damping: 10,
                },
              },
            }}
          >
            <CardImageVerticalNoPadding listing={listing} />
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}
