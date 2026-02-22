import { motion, AnimatePresence } from 'framer-motion'
import { X, BookOpen, Lightbulb, GraduationCap } from 'lucide-react'
import { useGame } from '@/context/GameContext'
import { LatexBlock } from './LatexBlock'

export function LearningSidebar() {
  const { isLearningPanelOpen, toggleLearningPanel, currentPreset } = useGame()

  return (
    <>
      {/* Toggle Button */}
      <motion.button
        onClick={toggleLearningPanel}
        className={`fixed right-4 top-20 z-40 p-3 rounded-full shadow-lg transition-colors ${
          isLearningPanelOpen
            ? 'bg-neon-emerald text-surface-dark'
            : 'bg-surface-elevated text-text-primary hover:bg-surface-hover'
        }`}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        title="Toggle Learning Mode"
      >
        <BookOpen className="w-5 h-5" />
      </motion.button>

      {/* Sidebar */}
      <AnimatePresence>
        {isLearningPanelOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-40 lg:hidden"
              onClick={toggleLearningPanel}
            />

            {/* Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 h-full w-full max-w-md bg-surface-dark border-l border-surface-hover z-50 overflow-y-auto"
            >
              {/* Header */}
              <div className="sticky top-0 bg-surface-dark border-b border-surface-hover p-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <GraduationCap className="w-5 h-5 text-neon-emerald" />
                  <h2 className="text-lg font-bold text-text-primary">
                    Learning Mode
                  </h2>
                </div>
                <button
                  onClick={toggleLearningPanel}
                  className="p-2 text-text-muted hover:text-text-primary transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Content */}
              <div className="p-4 space-y-6">
                {/* Current Game */}
                <section>
                  <h3 className="flex items-center gap-2 text-sm font-semibold text-neon-emerald mb-3">
                    <Lightbulb className="w-4 h-4" />
                    {currentPreset.name}
                  </h3>
                  <p className="text-sm text-text-secondary leading-relaxed whitespace-pre-line">
                    {currentPreset.explanation}
                  </p>
                </section>

                {/* Mathematical Notation */}
                <section>
                  <h3 className="text-sm font-semibold text-text-primary mb-3">
                    Mathematical Notation
                  </h3>
                  <div className="bg-surface-elevated p-4 rounded-lg overflow-x-auto">
                    <LatexBlock
                      latex={currentPreset.latexNotation}
                      displayMode={true}
                      className="text-text-primary"
                    />
                  </div>
                </section>

                {/* Real World Examples */}
                <section>
                  <h3 className="text-sm font-semibold text-text-primary mb-3">
                    Real World Examples
                  </h3>
                  <p className="text-sm text-text-secondary">
                    {currentPreset.realWorldExample}
                  </p>
                </section>

                {/* Key Concepts */}
                <section>
                  <h3 className="text-sm font-semibold text-text-primary mb-3">
                    Key Concepts
                  </h3>
                  <div className="space-y-4">
                    {/* Nash Equilibrium */}
                    <div className="bg-surface-elevated p-3 rounded-lg">
                      <h4 className="text-sm font-medium text-neon-emerald mb-2">
                        Nash Equilibrium
                      </h4>
                      <p className="text-xs text-text-secondary mb-2">
                        A state where no player can benefit by changing their
                        strategy while others keep theirs unchanged.
                      </p>
                      <div className="text-xs">
                        <LatexBlock
                          latex="U_i(s_i^*, s_{-i}^*) \geq U_i(s_i, s_{-i}^*) \text{ for all } s_i"
                          className="text-text-muted"
                        />
                      </div>
                    </div>

                    {/* Dominant Strategy */}
                    <div className="bg-surface-elevated p-3 rounded-lg">
                      <h4 className="text-sm font-medium text-amber-400 mb-2">
                        Dominant Strategy
                      </h4>
                      <p className="text-xs text-text-secondary mb-2">
                        A strategy that yields a higher payoff than any other,
                        regardless of opponent's choice.
                      </p>
                      <div className="text-xs">
                        <LatexBlock
                          latex="U_i(s_i^*, s_{-i}) > U_i(s_i, s_{-i}) \text{ for all } s_{-i}"
                          className="text-text-muted"
                        />
                      </div>
                    </div>

                    {/* Pareto Optimality */}
                    <div className="bg-surface-elevated p-3 rounded-lg">
                      <h4 className="text-sm font-medium text-purple-400 mb-2">
                        Pareto Optimality
                      </h4>
                      <p className="text-xs text-text-secondary">
                        An outcome is Pareto optimal if no player can be made
                        better off without making another worse off.
                      </p>
                    </div>

                    {/* Social Welfare */}
                    <div className="bg-surface-elevated p-3 rounded-lg">
                      <h4 className="text-sm font-medium text-blue-400 mb-2">
                        Social Welfare
                      </h4>
                      <p className="text-xs text-text-secondary mb-2">
                        The sum of all players' payoffs, measuring total
                        efficiency of an outcome.
                      </p>
                      <div className="text-xs">
                        <LatexBlock
                          latex="SW = \sum_{i} U_i(s)"
                          className="text-text-muted"
                        />
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
