import { motion, AnimatePresence } from 'framer-motion'
import { Handshake, Swords, ArrowRight } from 'lucide-react'
import type { RoundResult, Action } from '@/types'

interface RoundHistoryProps {
  rounds: RoundResult[]
  maxVisible?: number
}

const ActionIcon = ({ action }: { action: Action }) => {
  return action === 'cooperate' ? (
    <Handshake className="w-4 h-4 text-neon-emerald" />
  ) : (
    <Swords className="w-4 h-4 text-neon-rose" />
  )
}

export function RoundHistory({ rounds, maxVisible = 5 }: RoundHistoryProps) {
  const visibleRounds = rounds.slice(-maxVisible).reverse()

  if (rounds.length === 0) {
    return (
      <div className="text-center text-text-muted text-sm py-4">
        No rounds played yet. Make your first move!
      </div>
    )
  }

  return (
    <div className="space-y-3">
      <h3 className="text-sm font-semibold text-text-secondary uppercase tracking-wide">
        History
      </h3>
      <div className="space-y-2 max-h-48 overflow-y-auto">
        <AnimatePresence mode="popLayout">
          {visibleRounds.map((round) => (
            <motion.div
              key={round.round}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="flex items-center justify-between p-2 bg-surface-elevated rounded-lg text-sm"
            >
              <span className="text-text-muted w-12">R{round.round}</span>

              {/* Actions */}
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  <ActionIcon action={round.playerAction} />
                  <span className="text-xs text-text-muted">You</span>
                </div>
                <ArrowRight className="w-3 h-3 text-text-muted" />
                <div className="flex items-center gap-1">
                  <span className="text-xs text-text-muted">Bot</span>
                  <ActionIcon action={round.botAction} />
                </div>
              </div>

              {/* Payoffs */}
              <div className="flex items-center gap-2 font-mono text-xs">
                <span
                  className={
                    round.playerPayoff > round.botPayoff
                      ? 'text-neon-emerald'
                      : round.playerPayoff < round.botPayoff
                      ? 'text-neon-rose'
                      : 'text-text-secondary'
                  }
                >
                  +{round.playerPayoff}
                </span>
                <span className="text-text-muted">/</span>
                <span
                  className={
                    round.botPayoff > round.playerPayoff
                      ? 'text-neon-rose'
                      : round.botPayoff < round.playerPayoff
                      ? 'text-neon-emerald'
                      : 'text-text-secondary'
                  }
                >
                  +{round.botPayoff}
                </span>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      {rounds.length > maxVisible && (
        <p className="text-xs text-text-muted text-center">
          Showing last {maxVisible} of {rounds.length} rounds
        </p>
      )}
    </div>
  )
}
