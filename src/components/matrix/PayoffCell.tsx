import { useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import type { Action } from '@/types'

interface PayoffCellProps {
  rowAction: Action
  colAction: Action
  payoffA: number
  payoffB: number
  isNashEquilibrium: boolean
  isParetoOptimal: boolean
  isEditable: boolean
  onPayoffChange: (player: 'A' | 'B', value: number) => void
}

export function PayoffCell({
  rowAction,
  colAction,
  payoffA,
  payoffB,
  isNashEquilibrium,
  isParetoOptimal,
  isEditable,
  onPayoffChange,
}: PayoffCellProps) {
  const [editingPlayer, setEditingPlayer] = useState<'A' | 'B' | null>(null)
  const [editValue, setEditValue] = useState('')

  const handleStartEdit = useCallback(
    (player: 'A' | 'B', currentValue: number) => {
      if (!isEditable) return
      setEditingPlayer(player)
      setEditValue(currentValue.toString())
    },
    [isEditable]
  )

  const handleFinishEdit = useCallback(() => {
    if (editingPlayer) {
      const numValue = parseFloat(editValue)
      if (!isNaN(numValue)) {
        onPayoffChange(editingPlayer, numValue)
      }
    }
    setEditingPlayer(null)
    setEditValue('')
  }, [editingPlayer, editValue, onPayoffChange])

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Enter') {
        handleFinishEdit()
      } else if (e.key === 'Escape') {
        setEditingPlayer(null)
        setEditValue('')
      }
    },
    [handleFinishEdit]
  )

  // Determine cell styling based on state
  const getCellClasses = () => {
    const baseClasses =
      'relative flex flex-col items-center justify-center p-4 rounded-lg transition-all duration-300 min-h-[100px] min-w-[100px]'

    if (isNashEquilibrium) {
      return `${baseClasses} bg-surface-elevated border-2 border-neon-emerald shadow-neon-emerald`
    }
    if (isParetoOptimal) {
      return `${baseClasses} bg-surface-elevated border border-neon-emerald-glow/50`
    }
    return `${baseClasses} bg-surface-elevated border border-surface-hover hover:border-text-muted`
  }

  return (
    <motion.div
      className={getCellClasses()}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={isEditable ? { scale: 1.02 } : undefined}
      transition={{ duration: 0.2 }}
      data-row={rowAction}
      data-col={colAction}
    >
      {/* Nash Equilibrium indicator */}
      {isNashEquilibrium && (
        <motion.div
          className="absolute -top-2 -right-2 bg-neon-emerald text-surface-dark text-xs font-bold px-2 py-0.5 rounded-full"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring' }}
        >
          NE
        </motion.div>
      )}

      {/* Payoff values */}
      <div className="flex items-center gap-2 text-lg font-mono">
        <span className="text-text-muted">(</span>

        {/* Player A payoff */}
        {editingPlayer === 'A' ? (
          <input
            type="number"
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            onBlur={handleFinishEdit}
            onKeyDown={handleKeyDown}
            className="w-12 bg-surface-dark text-neon-emerald text-center rounded px-1 py-0.5 outline-none ring-1 ring-neon-emerald"
            autoFocus
          />
        ) : (
          <button
            onClick={() => handleStartEdit('A', payoffA)}
            disabled={!isEditable}
            className={`text-neon-emerald font-semibold ${
              isEditable
                ? 'hover:text-neon-emerald-glow cursor-pointer'
                : 'cursor-default'
            }`}
            title={isEditable ? 'Click to edit Player A payoff' : 'Player A payoff'}
          >
            {payoffA}
          </button>
        )}

        <span className="text-text-muted">,</span>

        {/* Player B payoff */}
        {editingPlayer === 'B' ? (
          <input
            type="number"
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            onBlur={handleFinishEdit}
            onKeyDown={handleKeyDown}
            className="w-12 bg-surface-dark text-neon-rose text-center rounded px-1 py-0.5 outline-none ring-1 ring-neon-rose"
            autoFocus
          />
        ) : (
          <button
            onClick={() => handleStartEdit('B', payoffB)}
            disabled={!isEditable}
            className={`text-neon-rose font-semibold ${
              isEditable
                ? 'hover:text-neon-rose-glow cursor-pointer'
                : 'cursor-default'
            }`}
            title={isEditable ? 'Click to edit Player B payoff' : 'Player B payoff'}
          >
            {payoffB}
          </button>
        )}

        <span className="text-text-muted">)</span>
      </div>

      {/* Cell label */}
      <div className="text-xs text-text-muted mt-2 opacity-60">
        {rowAction === 'cooperate' ? 'C' : 'D'},{' '}
        {colAction === 'cooperate' ? 'C' : 'D'}
      </div>
    </motion.div>
  )
}
