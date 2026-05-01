import React from 'react'
import { motion } from 'framer-motion'

/**
 * StatCard — animated number counter card.
 */
export default function StatCard({ icon, label, value, color, index }) {
  return (
    <motion.div
      className="tile tile-third flex flex-col gap-2"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
    >
      <div className="flex items-center justify-between">
        <span className="text-xl" aria-hidden="true">{icon}</span>
        <span
          className="text-xs font-semibold px-2 py-0.5 rounded-full"
          style={{ background: `${color}22`, color }}
        >
          {label}
        </span>
      </div>

      <motion.p
        className="text-3xl font-bold leading-none"
        style={{ color }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: index * 0.1 + 0.3 }}
      >
        {value}
      </motion.p>
    </motion.div>
  )
}
