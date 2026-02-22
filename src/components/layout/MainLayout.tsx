import { motion } from 'framer-motion'
import { HelpCircle } from 'lucide-react'
import { Header } from './Header'
import { PresetSelector } from '@/components/presets'
import { GameBoard } from '@/components/game'
import { AnalysisPanel } from '@/components/analysis'
import { LearningSidebar, TutorialModal } from '@/components/learning'
import { useGame } from '@/context/GameContext'

export function MainLayout() {
  const { openTutorial } = useGame()

  return (
    <div className="min-h-screen bg-surface-dark">
      <Header />

      <main className="container mx-auto px-4 py-8">
        {/* Preset Selector & How to Play */}
        <section className="mb-8">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <PresetSelector />
            <motion.button
              onClick={openTutorial}
              className="flex items-center gap-2 px-4 py-2 bg-neon-emerald/20 text-neon-emerald border border-neon-emerald rounded-lg font-medium hover:bg-neon-emerald/30 transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <HelpCircle className="w-5 h-5" />
              How to Play
            </motion.button>
          </div>
        </section>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Game Board */}
          <div className="lg:col-span-2 space-y-8">
            {/* Game Board */}
            <section className="bg-surface-elevated/50 rounded-2xl p-6">
              <GameBoard />
            </section>
          </div>

          {/* Right Column - Analysis */}
          <div className="space-y-6">
            <div className="sticky top-24">
              <AnalysisPanel />
            </div>
          </div>
        </div>
      </main>

      {/* Learning Sidebar */}
      <LearningSidebar />

      {/* Tutorial Modal */}
      <TutorialModal />

      {/* Footer */}
      <footer className="border-t border-surface-hover py-6 mt-12">
        <div className="container mx-auto px-4 text-center text-sm text-text-muted">
          <p>
            Built for learning game theory concepts.{' '}
            <span className="text-neon-emerald">Cooperate</span> wisely!
          </p>
        </div>
      </footer>
    </div>
  )
}
