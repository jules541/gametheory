import { motion } from 'framer-motion'
import { Handshake, Swords } from 'lucide-react'
import type { Action } from '@/types'

interface PlayerChoiceProps {
  onChoice: (action: Action) => void
  disabled: boolean
  lastChoice: Action | null
}

export function PlayerChoice({ onChoice, disabled, lastChoice }: PlayerChoiceProps) {
  return (
    <div className="flex flex-col items-center gap-4">
      <h3 className="text-sm font-semibold text-text-secondary uppercase tracking-wide">
        Your Move
      </h3>
      <div className="flex gap-4">
        {/* Cooperate button */}
        <motion.button
          onClick={() => onChoice('cooperate')}
          disabled={disabled}
          className={`flex flex-col items-center gap-2 px-6 py-4 rounded-xl font-semibold transition-all ${
            disabled
              ? 'bg-surface-elevated text-text-muted cursor-not-allowed opacity-50'
              : lastChoice === 'cooperate'
              ? 'bg-neon-emerald text-surface-dark shadow-neon-emerald-lg'
              : 'bg-surface-elevated text-neon-emerald border-2 border-neon-emerald hover:bg-neon-emerald/10'
          }`}
          whileHover={disabled ? undefined : { scale: 1.05 }}
          whileTap={disabled ? undefined : { scale: 0.95 }}
        >
          <Handshake className="w-8 h-8" />
          <span>Cooperate</span>
        </motion.button>

        {/* Defect button */}
        <motion.button
          onClick={() => onChoice('defect')}
          disabled={disabled}
          className={`flex flex-col items-center gap-2 px-6 py-4 rounded-xl font-semibold transition-all ${
            disabled
              ? 'bg-surface-elevated text-text-muted cursor-not-allowed opacity-50'
              : lastChoice === 'defect'
              ? 'bg-neon-rose text-surface-dark shadow-neon-rose-lg'
              : 'bg-surface-elevated text-neon-rose border-2 border-neon-rose hover:bg-neon-rose/10'
          }`}
          whileHover={disabled ? undefined : { scale: 1.05 }}
          whileTap={disabled ? undefined : { scale: 0.95 }}
        >
          <Swords className="w-8 h-8" />
          <span>Defect</span>
        </motion.button>
      </div>
    </div>
  )
}
