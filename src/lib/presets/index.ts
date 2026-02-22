import type { GamePreset, PresetId } from '@/types'
import { prisonersDilemma } from './prisonersDilemma'
import { stagHunt } from './stagHunt'
import { battleOfSexes } from './battleOfSexes'
import { customGame } from './custom'

// Export individual presets
export { prisonersDilemma, stagHunt, battleOfSexes, customGame }

// All presets as an array for iteration
export const allPresets: GamePreset[] = [
  prisonersDilemma,
  stagHunt,
  battleOfSexes,
  customGame,
]

// Presets as a lookup map
export const presetMap: Record<PresetId, GamePreset> = {
  'prisoners-dilemma': prisonersDilemma,
  'stag-hunt': stagHunt,
  'battle-of-sexes': battleOfSexes,
  'custom': customGame,
}

// Get a preset by ID
export function getPreset(id: PresetId): GamePreset {
  return presetMap[id]
}

// Get the default preset
export function getDefaultPreset(): GamePreset {
  return prisonersDilemma
}
