import type { PayoffMatrix, Action } from '@/types'

const ACTIONS: Action[] = ['cooperate', 'defect']

/**
 * Find dominant strategy for a player.
 *
 * A dominant strategy is one that yields a higher payoff regardless of
 * what the opponent does. In other words, it's the best choice no matter
 * what the other player chooses.
 *
 * Formally: Strategy s_i* is dominant if for all s_i != s_i* and all s_{-i}:
 *   U_i(s_i*, s_{-i}) > U_i(s_i, s_{-i})
 *
 * @param matrix - The payoff matrix
 * @param player - 'A' (row player) or 'B' (column player)
 * @returns The dominant strategy, or null if none exists
 */
export function findDominantStrategy(
  matrix: PayoffMatrix,
  player: 'A' | 'B'
): Action | null {
  for (const candidateAction of ACTIONS) {
    if (isDominantStrategy(matrix, player, candidateAction)) {
      return candidateAction
    }
  }
  return null
}

/**
 * Check if a specific action is a dominant strategy for a player.
 */
export function isDominantStrategy(
  matrix: PayoffMatrix,
  player: 'A' | 'B',
  action: Action
): boolean {
  const otherAction: Action = action === 'cooperate' ? 'defect' : 'cooperate'

  // Check if this action yields higher payoff regardless of opponent's choice
  for (const opponentAction of ACTIONS) {
    const candidatePayoff = getPlayerPayoff(matrix, player, action, opponentAction)
    const otherPayoff = getPlayerPayoff(matrix, player, otherAction, opponentAction)

    // If the candidate action is not strictly better, it's not dominant
    if (candidatePayoff <= otherPayoff) {
      return false
    }
  }

  return true
}

/**
 * Check if the game has a dominant strategy equilibrium.
 * A dominant strategy equilibrium exists when both players have dominant strategies.
 */
export function hasDominantStrategyEquilibrium(matrix: PayoffMatrix): boolean {
  const dominantA = findDominantStrategy(matrix, 'A')
  const dominantB = findDominantStrategy(matrix, 'B')
  return dominantA !== null && dominantB !== null
}

/**
 * Helper function to get a player's payoff from the matrix.
 */
function getPlayerPayoff(
  matrix: PayoffMatrix,
  player: 'A' | 'B',
  playerAAction: Action,
  playerBAction: Action
): number {
  const payoffs = matrix[playerAAction][playerBAction]
  return player === 'A' ? payoffs[0] : payoffs[1]
}
