import type { Action } from './game'

// Payoff tuple: [Player A payoff, Player B payoff]
export type PayoffTuple = [number, number]

// 2x2 Payoff Matrix structure
// Rows: Player A's actions (Cooperate, Defect)
// Columns: Player B's actions (Cooperate, Defect)
export interface PayoffMatrix {
  // [Player A Action][Player B Action] -> [A's payoff, B's payoff]
  cooperate: {
    cooperate: PayoffTuple // Both cooperate
    defect: PayoffTuple    // A cooperates, B defects
  }
  defect: {
    cooperate: PayoffTuple // A defects, B cooperates
    defect: PayoffTuple    // Both defect
  }
}

// Matrix cell for UI representation
export interface MatrixCell {
  rowAction: Action
  colAction: Action
  payoffA: number
  payoffB: number
  isNashEquilibrium: boolean
  isDominantForA: boolean
  isDominantForB: boolean
}

// Equilibrium position
export interface EquilibriumPosition {
  row: Action
  col: Action
}

// Analysis results
export interface MatrixAnalysis {
  nashEquilibria: EquilibriumPosition[]
  dominantStrategyA: Action | null
  dominantStrategyB: Action | null
  paretoOptimal: EquilibriumPosition[]
  socialWelfare: Map<string, number>
}
