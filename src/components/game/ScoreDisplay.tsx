import { User, Bot } from 'lucide-react'

interface ScoreDisplayProps {
  playerScore: number
  botScore: number
  currentRound: number
  maxRounds: number | null
}

export function ScoreDisplay({
  playerScore,
  botScore,
  currentRound,
  maxRounds,
}: ScoreDisplayProps) {
  const playerWinning = playerScore > botScore
  const botWinning = botScore > playerScore
  const tied = playerScore === botScore

  return (
    <div className="flex flex-col items-center gap-4">
      {/* Round counter */}
      <div className="text-sm text-text-muted">
        Round {currentRound}
        {maxRounds !== null ? ` of ${maxRounds}` : ''}
      </div>

      {/* Score display */}
      <div className="flex items-center gap-8">
        {/* Player score */}
        <div
          className={`flex flex-col items-center gap-2 p-4 rounded-xl ${
            playerWinning
              ? 'bg-neon-emerald/10 border border-neon-emerald'
              : 'bg-surface-elevated'
          }`}
        >
          <User className="w-6 h-6 text-neon-emerald" />
          <span className="text-xs text-text-muted uppercase">You</span>
          <span className="text-3xl font-bold text-neon-emerald">
            {playerScore}
          </span>
        </div>

        {/* VS */}
        <div className="flex flex-col items-center">
          <span className="text-lg font-bold text-text-muted">VS</span>
          {tied && playerScore > 0 && (
            <span className="text-xs text-text-muted">Tied!</span>
          )}
        </div>

        {/* Bot score */}
        <div
          className={`flex flex-col items-center gap-2 p-4 rounded-xl ${
            botWinning
              ? 'bg-neon-rose/10 border border-neon-rose'
              : 'bg-surface-elevated'
          }`}
        >
          <Bot className="w-6 h-6 text-neon-rose" />
          <span className="text-xs text-text-muted uppercase">Bot</span>
          <span className="text-3xl font-bold text-neon-rose">
            {botScore}
          </span>
        </div>
      </div>
    </div>
  )
}
