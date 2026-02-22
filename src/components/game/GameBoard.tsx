import { motion } from 'framer-motion'
import { RotateCcw, Settings, Shuffle, Eye, EyeOff } from 'lucide-react'
import { useGame } from '@/context/GameContext'
import { PlayerChoice } from './PlayerChoice'
import { ScoreDisplay } from './ScoreDisplay'
import { RoundHistory } from './RoundHistory'
import { BOT_CONFIGS } from '@/types/bot'
import type { RoundOption, BotStrategy } from '@/types'

const ROUND_OPTIONS: { value: RoundOption; label: string }[] = [
  { value: 5, label: '5' },
  { value: 10, label: '10' },
  { value: 20, label: '20' },
  { value: 'unlimited', label: '∞' },
]

export function GameBoard() {
  const {
    gameState,
    playRound,
    resetGame,
    botStrategy,
    setBotStrategy,
    lastBotReasoning,
    roundOption,
    setRoundOption,
    mysteryMode,
    toggleMysteryMode,
  } = useGame()

  // In mystery mode, only show strategy after game is over
  const showStrategy = !mysteryMode || gameState.isGameOver

  const lastPlayerChoice =
    gameState.rounds.length > 0
      ? gameState.rounds[gameState.rounds.length - 1].playerAction
      : null

  return (
    <div className="space-y-6">
      {/* Game Settings */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-surface-elevated rounded-xl">
        {/* Bot Strategy */}
        <div className="flex items-center gap-3">
          <Settings className="w-4 h-4 text-text-muted" />
          {mysteryMode ? (
            <div className="flex items-center gap-2 px-3 py-1.5 bg-surface-dark border border-surface-hover rounded-lg">
              {showStrategy ? (
                <span className="text-sm text-neon-emerald font-medium">
                  {BOT_CONFIGS[botStrategy].name}
                </span>
              ) : (
                <>
                  <Shuffle className="w-4 h-4 text-amber-400" />
                  <span className="text-sm text-amber-400 font-medium">Mystery Bot</span>
                </>
              )}
            </div>
          ) : (
            <select
              value={botStrategy}
              onChange={(e) => {
                setBotStrategy(e.target.value as BotStrategy)
                resetGame()
              }}
              className="bg-surface-dark text-text-primary border border-surface-hover rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-neon-emerald"
            >
              {Object.values(BOT_CONFIGS).map((config) => (
                <option key={config.strategy} value={config.strategy}>
                  {config.name}
                </option>
              ))}
            </select>
          )}

          {/* Mystery Mode Toggle */}
          <motion.button
            onClick={toggleMysteryMode}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              mysteryMode
                ? 'bg-amber-400/20 text-amber-400 border border-amber-400'
                : 'bg-surface-dark text-text-muted hover:text-text-primary border border-surface-hover'
            }`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            title={mysteryMode ? 'Disable mystery mode' : 'Enable mystery mode'}
          >
            {mysteryMode ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
            Mystery
          </motion.button>
        </div>

        {/* Round Configuration */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-text-muted">Rounds:</span>
          <div className="flex gap-1">
            {ROUND_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                onClick={() => setRoundOption(opt.value)}
                className={`px-3 py-1 text-xs rounded-lg transition-colors ${
                  roundOption === opt.value
                    ? 'bg-neon-emerald/20 text-neon-emerald border border-neon-emerald'
                    : 'bg-surface-dark text-text-muted hover:text-text-primary'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* Reset Button */}
        <motion.button
          onClick={resetGame}
          className="flex items-center gap-2 px-3 py-1.5 text-sm text-text-secondary hover:text-text-primary transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <RotateCcw className="w-4 h-4" />
          Reset
        </motion.button>
      </div>

      {/* Score Display */}
      <ScoreDisplay
        playerScore={gameState.playerScore}
        botScore={gameState.botScore}
        currentRound={gameState.currentRound}
        maxRounds={gameState.maxRounds}
      />

      {/* Player Choice */}
      <PlayerChoice
        onChoice={playRound}
        disabled={gameState.isGameOver}
        lastChoice={lastPlayerChoice}
      />

      {/* Game Over Message */}
      {gameState.isGameOver && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center p-4 bg-surface-elevated rounded-xl"
        >
          <h3 className="text-lg font-bold mb-2">
            {gameState.playerScore > gameState.botScore
              ? '🎉 You Win!'
              : gameState.playerScore < gameState.botScore
              ? '🤖 Bot Wins!'
              : "🤝 It's a Tie!"}
          </h3>
          <p className="text-text-muted text-sm mb-3">
            Final Score: You {gameState.playerScore} - {gameState.botScore} Bot
          </p>

          {/* Mystery Mode Reveal */}
          {mysteryMode && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className="mb-4 p-3 bg-amber-400/10 border border-amber-400/30 rounded-lg"
            >
              <p className="text-sm">
                <span className="text-amber-400 font-semibold">Strategy Revealed: </span>
                <span className="text-neon-emerald font-medium">{BOT_CONFIGS[botStrategy].name}</span>
              </p>
              <p className="text-xs text-text-muted mt-1">
                {BOT_CONFIGS[botStrategy].description}
              </p>
            </motion.div>
          )}

          <motion.button
            onClick={resetGame}
            className="px-4 py-2 bg-neon-emerald text-surface-dark rounded-lg font-medium"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Play Again
          </motion.button>
        </motion.div>
      )}

      {/* Bot Reasoning - hidden in mystery mode until game over */}
      {lastBotReasoning && !gameState.isGameOver && !mysteryMode && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="p-3 bg-neon-rose/10 border border-neon-rose/30 rounded-lg"
        >
          <p className="text-sm text-text-secondary">
            <span className="font-semibold text-neon-rose">Bot says: </span>
            {lastBotReasoning}
          </p>
        </motion.div>
      )}

      {/* Mystery mode hint */}
      {mysteryMode && !gameState.isGameOver && gameState.rounds.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="p-3 bg-amber-400/10 border border-amber-400/30 rounded-lg"
        >
          <p className="text-sm text-text-secondary">
            <span className="font-semibold text-amber-400">Mystery Mode: </span>
            Can you figure out the bot's strategy from its moves?
          </p>
        </motion.div>
      )}

      {/* Round History */}
      <RoundHistory rounds={gameState.rounds} />
    </div>
  )
}
