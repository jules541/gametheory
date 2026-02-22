import { motion } from 'framer-motion'
import { Dices, Users, Heart, Pencil } from 'lucide-react'
import { useGame } from '@/context/GameContext'
import { allPresets } from '@/lib/presets'
import type { PresetId } from '@/types'

const PRESET_ICONS: Record<PresetId, React.ReactNode> = {
  'prisoners-dilemma': <Dices className="w-5 h-5" />,
  'stag-hunt': <Users className="w-5 h-5" />,
  'battle-of-sexes': <Heart className="w-5 h-5" />,
  'custom': <Pencil className="w-5 h-5" />,
}

export function PresetSelector() {
  const { currentPreset, setPreset, resetGame } = useGame()

  const handlePresetChange = (presetId: PresetId) => {
    const preset = allPresets.find((p) => p.id === presetId)
    if (preset) {
      setPreset(preset)
      resetGame()
    }
  }

  return (
    <div className="space-y-3">
      <h3 className="text-sm font-semibold text-text-secondary uppercase tracking-wide">
        Game Scenarios
      </h3>
      <div className="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap">
        {allPresets.map((preset) => {
          const isActive = currentPreset.id === preset.id
          return (
            <motion.button
              key={preset.id}
              onClick={() => handlePresetChange(preset.id as PresetId)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                isActive
                  ? 'bg-neon-emerald/20 text-neon-emerald border border-neon-emerald'
                  : 'bg-surface-elevated text-text-secondary border border-surface-hover hover:border-text-muted hover:text-text-primary'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {PRESET_ICONS[preset.id as PresetId]}
              <span className="hidden sm:inline">{preset.name}</span>
              <span className="sm:hidden">
                {preset.id === 'prisoners-dilemma'
                  ? 'Prisoner'
                  : preset.id === 'stag-hunt'
                  ? 'Stag'
                  : preset.id === 'battle-of-sexes'
                  ? 'Battle'
                  : 'Custom'}
              </span>
            </motion.button>
          )
        })}
      </div>
      <p className="text-xs text-text-muted">{currentPreset.description}</p>
    </div>
  )
}
