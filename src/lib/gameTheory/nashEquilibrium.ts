import type { PayoffMatrix, EquilibriumPosition, Action } from '@/types'

const ACTIONS: Action[] = ['cooperate', 'defect']

/**
 * Find Nash Equilibria in a 2x2 payoff matrix using the best response method.
 *
 * A Nash Equilibrium exists when:
 * 1. Player A's strategy is the best response to Player B's strategy
 * 2. Player B's strategy is the best response to Player A's strategy
 *
 * In mathematical notation: U_i(s_i*, s_{-i}*) >= U_i(s_i, s_{-i}*) for all players i
 */
export function findNashEquilibria(matrix: PayoffMatrix): EquilibriumPosition[] {
  const equilibria: EquilibriumPosition[] = []

  for (const rowAction of ACTIONS) {
    for (const colAction of ACTIONS) {
      if (isNashEquilibrium(matrix, rowAction, colAction)) {
        equilibria.push({ row: rowAction, col: colAction })
      }
    }
  }

  return equilibria
}

/**
 * Check if a specific cell is a Nash Equilibrium.
 *
 * For a cell (row, col) to be a Nash Equilibrium:
 * - Player A's payoff must be >= all other payoffs in the same column (best response to B's choice)
 * - Player B's payoff must be >= all other payoffs in the same row (best response to A's choice)
 */
export function isNashEquilibrium(
  matrix: PayoffMatrix,
  rowAction: Action,
  colAction: Action
): boolean {
  const currentPayoff = matrix[rowAction][colAction]

  // Check if this is Player A's best response (compare within the same column)
  const otherRowAction: Action = rowAction === 'cooperate' ? 'defect' : 'cooperate'
  const isABestResponse = currentPayoff[0] >= matrix[otherRowAction][colAction][0]

  // Check if this is Player B's best response (compare within the same row)
  const otherColAction: Action = colAction === 'cooperate' ? 'defect' : 'cooperate'
  const isBBestResponse = currentPayoff[1] >= matrix[rowAction][otherColAction][1]

  return isABestResponse && isBBestResponse
}

/**
 * Get the payoff for a specific cell.
 */
export function getPayoff(
  matrix: PayoffMatrix,
  rowAction: Action,
  colAction: Action
): [number, number] {
  return matrix[rowAction][colAction]
}
