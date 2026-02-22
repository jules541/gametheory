import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronLeft, ChevronRight, HelpCircle } from 'lucide-react'
import { useGame } from '@/context/GameContext'

export function TutorialModal() {
  const { currentPreset, isTutorialOpen, closeTutorial } = useGame()
  const [currentStep, setCurrentStep] = useState(0)

  const tutorial = currentPreset.tutorial
  const totalSteps = tutorial.length
  const step = tutorial[currentStep]

  const goToNext = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      handleClose()
    }
  }

  const goToPrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleClose = () => {
    setCurrentStep(0)
    closeTutorial()
  }

  return (
    <AnimatePresence>
      {isTutorialOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 z-50"
            onClick={handleClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg z-50 p-4"
          >
            <div className="bg-surface-dark border border-surface-hover rounded-2xl shadow-2xl overflow-hidden">
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-surface-hover bg-surface-elevated">
                <div className="flex items-center gap-2">
                  <HelpCircle className="w-5 h-5 text-neon-emerald" />
                  <h2 className="text-lg font-bold text-text-primary">
                    How to Play: {currentPreset.name}
                  </h2>
                </div>
                <button
                  onClick={handleClose}
                  className="p-2 text-text-muted hover:text-text-primary transition-colors rounded-lg hover:bg-surface-hover"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Content */}
              <div className="p-6">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentStep}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.2 }}
                  >
                    <h3 className="text-xl font-semibold text-neon-emerald mb-4">
                      {step.title}
                    </h3>
                    <p className="text-text-secondary leading-relaxed whitespace-pre-line">
                      {step.content}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Progress Dots */}
              <div className="flex justify-center gap-2 pb-4">
                {tutorial.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentStep(index)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      index === currentStep
                        ? 'bg-neon-emerald w-6'
                        : 'bg-surface-hover hover:bg-text-muted'
                    }`}
                  />
                ))}
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between p-4 border-t border-surface-hover bg-surface-elevated">
                <button
                  onClick={goToPrev}
                  disabled={currentStep === 0}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                    currentStep === 0
                      ? 'text-text-muted cursor-not-allowed'
                      : 'text-text-secondary hover:text-text-primary hover:bg-surface-hover'
                  }`}
                >
                  <ChevronLeft className="w-4 h-4" />
                  Back
                </button>

                <span className="text-sm text-text-muted">
                  {currentStep + 1} / {totalSteps}
                </span>

                <motion.button
                  onClick={goToNext}
                  className="flex items-center gap-2 px-4 py-2 bg-neon-emerald text-surface-dark rounded-lg font-medium"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {currentStep === totalSteps - 1 ? "Let's Play!" : 'Next'}
                  {currentStep < totalSteps - 1 && (
                    <ChevronRight className="w-4 h-4" />
                  )}
                </motion.button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
