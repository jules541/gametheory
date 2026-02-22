import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Info } from 'lucide-react'

interface TooltipProps {
  content: string
  className?: string
}

export function Tooltip({ content, className = '' }: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false)

  return (
    <div className={`relative inline-block ${className}`}>
      <button
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
        onFocus={() => setIsVisible(true)}
        onBlur={() => setIsVisible(false)}
        className="p-1 text-text-muted hover:text-text-secondary transition-colors rounded-full hover:bg-surface-hover"
        aria-label="More information"
      >
        <Info className="w-3.5 h-3.5" />
      </button>

      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 5 }}
            transition={{ duration: 0.15 }}
            className="absolute z-50 left-1/2 -translate-x-1/2 bottom-full mb-2 w-64 p-3 bg-surface-dark border border-surface-hover rounded-lg shadow-xl"
          >
            <p className="text-xs text-text-secondary leading-relaxed">
              {content}
            </p>
            {/* Arrow */}
            <div className="absolute left-1/2 -translate-x-1/2 top-full w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-surface-hover" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
