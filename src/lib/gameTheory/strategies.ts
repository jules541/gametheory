import type { Action, RoundResult, BotStrategy, BotDecision } from '@/types'

/**
 * Bot strategy implementations for the iterated game.
 */
export const strategies: Record<BotStrategy, (history: RoundResult[]) => Action> = {
  /**
   * Always Cooperate: Simple strategy that always cooperates.
   * Vulnerable to exploitation but encourages cooperation.
   */
  always_cooperate: (): Action => {
    return 'cooperate'
  },

  /**
   * Always Defect: Simple strategy that always defects.
   * Maximizes individual gain but prevents mutual cooperation.
   */
  always_defect: (): Action => {
    return 'defect'
  },

  /**
   * Tit-for-Tat: The winning strategy from Axelrod's tournament.
   *
   * Properties:
   * - Nice: Cooperates on the first move
   * - Retaliatory: Punishes defection immediately
   * - Forgiving: Returns to cooperation if opponent cooperates
   * - Clear: Simple to understand
   *
   * Based on Anatol Rapoport's winning strategy.
   */
  tit_for_tat: (history: RoundResult[]): Action => {
    // First move: cooperate (be nice)
    if (history.length === 0) {
      return 'cooperate'
    }

    // Mirror opponent's last move
    const lastRound = history[history.length - 1]
    return lastRound.playerAction // Bot mirrors what player did last
  },
}

/**
 * Get the bot's next action based on its strategy.
 */
export function getBotAction(strategy: BotStrategy, history: RoundResult[]): Action {
  return strategies[strategy](history)
}

/**
 * Get a human-readable explanation for the bot's decision.
 */
export function getBotDecision(
  strategy: BotStrategy,
  history: RoundResult[]
): BotDecision {
  const action = getBotAction(strategy, history)
  const reasoning = getBotReasoning(strategy, history, action)
  return { action, reasoning }
}

/**
 * Get reasoning explanation for the bot's decision.
 */
function getBotReasoning(
  strategy: BotStrategy,
  history: RoundResult[],
  action: Action
): string {
  switch (strategy) {
    case 'always_cooperate':
      return 'I always choose to cooperate, seeking mutual benefit regardless of past outcomes.'

    case 'always_defect':
      return 'I always choose to defect, maximizing my personal payoff.'

    case 'tit_for_tat':
      if (history.length === 0) {
        return 'I start by cooperating to establish trust and encourage mutual cooperation.'
      }
      const lastMove = history[history.length - 1].playerAction
      return `You ${lastMove === 'cooperate' ? 'cooperated' : 'defected'} last round, so I'm ${action === 'cooperate' ? 'cooperating' : 'defecting'} in response.`
  }
}
