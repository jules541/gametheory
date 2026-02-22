import type { PayoffMatrix } from './matrix'

// Tutorial step for game instructions
export interface TutorialStep {
  title: string
  content: string
}

// Game preset definition
export interface GamePreset {
  id: string
  name: string
  description: string
  matrix: PayoffMatrix
  explanation: string
  latexNotation: string
  realWorldExample: string
  tutorial: TutorialStep[]
}

// Preset IDs
export type PresetId =
  | 'prisoners-dilemma'
  | 'stag-hunt'
  | 'battle-of-sexes'
  | 'custom'
