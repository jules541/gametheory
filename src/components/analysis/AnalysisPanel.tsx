import { motion } from 'framer-motion'
import { Target, TrendingUp, Crown, Scale } from 'lucide-react'
import { useGame } from '@/context/GameContext'
import { Tooltip } from '@/components/ui'

const TOOLTIPS = {
  nash: "A Nash Equilibrium is an outcome where neither player can improve their score by changing their choice alone. It's a stable state — even if it's not the best outcome for everyone.",
  dominant: "A dominant strategy is a choice that gives you a better payoff regardless of what your opponent does. If one exists, it's always your best move.",
  welfare: "Social Welfare measures the total combined payoff for all players. The best outcome maximizes the sum of everyone's points — what's best for society as a whole.",
  pareto: "An outcome is Pareto Optimal if you can't make one player better off without making another worse off. These are the 'efficient' outcomes with no wasted potential.",
}

export function AnalysisPanel() {
  const {
    nashEquilibria,
    dominantStrategyA,
    dominantStrategyB,
    socialWelfare,
    paretoOptimal,
  } = useGame()

  // Find max social welfare
  let maxWelfare = -Infinity
  let maxWelfareKey = ''
  socialWelfare.forEach((value, key) => {
    if (value > maxWelfare) {
      maxWelfare = value
      maxWelfareKey = key
    }
  })

  const formatAction = (action: string) =>
    action === 'cooperate' ? 'Cooperate' : 'Defect'

  const formatPosition = (pos: { row: string; col: string }) =>
    `(${formatAction(pos.row)}, ${formatAction(pos.col)})`

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-semibold text-text-secondary uppercase tracking-wide">
        Analysis
      </h3>

      <div className="grid gap-3">
        {/* Nash Equilibria */}
        <motion.div
          className="p-3 bg-surface-elevated rounded-lg"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="flex items-center gap-2 mb-2">
            <Target className="w-4 h-4 text-neon-emerald" />
            <span className="text-sm font-medium text-text-primary">
              Nash Equilibrium
            </span>
            <Tooltip content={TOOLTIPS.nash} />
          </div>
          <div className="text-xs text-text-secondary">
            {nashEquilibria.length === 0 ? (
              <span className="text-text-muted">No pure strategy Nash Equilibrium</span>
            ) : (
              nashEquilibria.map((eq, i) => (
                <span key={i} className="inline-block mr-2">
                  <span className="text-neon-emerald">{formatPosition(eq)}</span>
                  {i < nashEquilibria.length - 1 && ', '}
                </span>
              ))
            )}
          </div>
        </motion.div>

        {/* Dominant Strategies */}
        <motion.div
          className="p-3 bg-surface-elevated rounded-lg"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center gap-2 mb-2">
            <Crown className="w-4 h-4 text-amber-400" />
            <span className="text-sm font-medium text-text-primary">
              Dominant Strategies
            </span>
            <Tooltip content={TOOLTIPS.dominant} />
          </div>
          <div className="text-xs text-text-secondary space-y-1">
            <div>
              <span className="text-neon-emerald">Player A:</span>{' '}
              {dominantStrategyA ? (
                <span className="text-amber-400">{formatAction(dominantStrategyA)}</span>
              ) : (
                <span className="text-text-muted">None</span>
              )}
            </div>
            <div>
              <span className="text-neon-rose">Player B:</span>{' '}
              {dominantStrategyB ? (
                <span className="text-amber-400">{formatAction(dominantStrategyB)}</span>
              ) : (
                <span className="text-text-muted">None</span>
              )}
            </div>
          </div>
        </motion.div>

        {/* Social Welfare */}
        <motion.div
          className="p-3 bg-surface-elevated rounded-lg"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-4 h-4 text-blue-400" />
            <span className="text-sm font-medium text-text-primary">
              Social Welfare
            </span>
            <Tooltip content={TOOLTIPS.welfare} />
          </div>
          <div className="text-xs text-text-secondary">
            <span>Best outcome: </span>
            <span className="text-blue-400">
              {maxWelfareKey.replace('-', ', ')} = {maxWelfare}
            </span>
          </div>
        </motion.div>

        {/* Pareto Optimal */}
        <motion.div
          className="p-3 bg-surface-elevated rounded-lg"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="flex items-center gap-2 mb-2">
            <Scale className="w-4 h-4 text-purple-400" />
            <span className="text-sm font-medium text-text-primary">
              Pareto Optimal
            </span>
            <Tooltip content={TOOLTIPS.pareto} />
          </div>
          <div className="text-xs text-text-secondary">
            {paretoOptimal.map((po, i) => (
              <span key={i} className="inline-block mr-2">
                <span className="text-purple-400">{formatPosition(po)}</span>
                {i < paretoOptimal.length - 1 && ', '}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
