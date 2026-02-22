import { motion } from 'framer-motion'
import { PayoffCell } from './PayoffCell'
import { useGame } from '@/context/GameContext'
import type { Action } from '@/types'

const ACTIONS: Action[] = ['cooperate', 'defect']
const ACTION_LABELS: Record<Action, string> = {
  cooperate: 'Cooperate',
  defect: 'Defect',
}

interface PayoffMatrixProps {
  isEditable?: boolean
}

export function PayoffMatrix({ isEditable = true }: PayoffMatrixProps) {
  const { matrix, updatePayoff, nashEquilibria, paretoOptimal } = useGame()

  // Check if a cell is a Nash Equilibrium
  const isNashEquilibrium = (row: Action, col: Action) => {
    return nashEquilibria.some((eq) => eq.row === row && eq.col === col)
  }

  // Check if a cell is Pareto optimal
  const isParetoOptimal = (row: Action, col: Action) => {
    return paretoOptimal.some((po) => po.row === row && po.col === col)
  }

  return (
    <motion.div
      className="inline-block"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Matrix container */}
      <div className="relative">
        {/* Column headers (Player B) */}
        <div className="flex items-end mb-2">
          <div className="w-28" /> {/* Spacer for row labels */}
          <div className="flex gap-2">
            {ACTIONS.map((action) => (
              <div
                key={`col-${action}`}
                className="min-w-[100px] text-center text-sm font-medium text-neon-rose"
              >
                {ACTION_LABELS[action]}
              </div>
            ))}
          </div>
        </div>

        {/* Player B label */}
        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
          <span className="text-sm font-semibold text-neon-rose">
            Player B (Bot)
          </span>
        </div>

        {/* Matrix rows */}
        <div className="flex">
          {/* Row labels (Player A) */}
          <div className="flex flex-col gap-2 mr-2 justify-center">
            {/* Player A label */}
            <div className="absolute -left-20 top-1/2 transform -translate-y-1/2 -rotate-90">
              <span className="text-sm font-semibold text-neon-emerald whitespace-nowrap">
                Player A (You)
              </span>
            </div>

            {ACTIONS.map((action) => (
              <div
                key={`row-${action}`}
                className="h-[100px] flex items-center justify-end pr-2 text-sm font-medium text-neon-emerald"
              >
                {ACTION_LABELS[action]}
              </div>
            ))}
          </div>

          {/* Matrix cells */}
          <div className="grid grid-cols-2 gap-2">
            {ACTIONS.map((rowAction) =>
              ACTIONS.map((colAction) => {
                const payoffs = matrix[rowAction][colAction]
                return (
                  <PayoffCell
                    key={`${rowAction}-${colAction}`}
                    rowAction={rowAction}
                    colAction={colAction}
                    payoffA={payoffs[0]}
                    payoffB={payoffs[1]}
                    isNashEquilibrium={isNashEquilibrium(rowAction, colAction)}
                    isParetoOptimal={isParetoOptimal(rowAction, colAction)}
                    isEditable={isEditable}
                    onPayoffChange={(player, value) =>
                      updatePayoff(rowAction, colAction, player, value)
                    }
                  />
                )
              })
            )}
          </div>
        </div>
      </div>

    </motion.div>
  )
}
