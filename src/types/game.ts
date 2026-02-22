// Player actions in the game
export type Action = 'cooperate' | 'defect'

// A single round result
export interface RoundResult {
  round: number
  playerAction: Action
  botAction: Action
  playerPayoff: number
  botPayoff: number
}

// Game state
export interface GameState {
  rounds: RoundResult[]
  currentRound: number
  playerScore: number
  botScore: number
  isGameOver: boolean
  maxRounds: number | null // null means unlimited
}

// Player identification
export type Player = 'A' | 'B'

// Round configuration options
export type RoundOption = 5 | 10 | 20 | 'unlimited'
