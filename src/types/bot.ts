import type { Action, RoundResult } from './game'

// Available bot strategies
export type BotStrategy = 'always_cooperate' | 'always_defect' | 'tit_for_tat'

// Bot configuration
export interface BotConfig {
  name: string
  strategy: BotStrategy
  description: string
  icon: string // Lucide icon name
}

// Bot decision with reasoning
export interface BotDecision {
  action: Action
  reasoning: string
}

// Strategy function type
export type StrategyFunction = (history: RoundResult[]) => Action

// Bot strategy definitions
export const BOT_CONFIGS: Record<BotStrategy, BotConfig> = {
  always_cooperate: {
    name: 'Always Cooperate',
    strategy: 'always_cooperate',
    description: 'Always chooses to cooperate, regardless of opponent actions.',
    icon: 'Heart',
  },
  always_defect: {
    name: 'Always Defect',
    strategy: 'always_defect',
    description: 'Always chooses to defect for maximum personal gain.',
    icon: 'Sword',
  },
  tit_for_tat: {
    name: 'Tit-for-Tat',
    strategy: 'tit_for_tat',
    description: 'Starts by cooperating, then mirrors opponent\'s previous move.',
    icon: 'RefreshCw',
  },
}
