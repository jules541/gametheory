import { motion } from 'framer-motion'
import { Gamepad2, Github } from 'lucide-react'

export function Header() {
  return (
    <header className="sticky top-0 z-30 bg-surface-dark/80 backdrop-blur-md border-b border-surface-hover">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <motion.div
          className="flex items-center gap-3"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <div className="p-2 bg-neon-emerald/20 rounded-lg">
            <Gamepad2 className="w-6 h-6 text-neon-emerald" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-text-primary">
              Game Theory Sandbox
            </h1>
            <p className="text-xs text-text-muted">
              Learn through interactive simulations
            </p>
          </div>
        </motion.div>

        {/* Links */}
        <motion.div
          className="flex items-center gap-4"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 text-text-muted hover:text-text-primary transition-colors"
            title="View on GitHub"
          >
            <Github className="w-5 h-5" />
          </a>
        </motion.div>
      </div>
    </header>
  )
}
