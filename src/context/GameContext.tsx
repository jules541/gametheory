import {
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo,
  type ReactNode,
} from 'react'
import type {
  PayoffMatrix,
  GamePreset,
  GameState,
  Action,
  BotStrategy,
  RoundResult,
  EquilibriumPosition,
  RoundOption,
} from '@/types'
import { getDefaultPreset } from '@/lib/presets'
import { findNashEquilibria } from '@/lib/gameTheory/nashEquilibrium'
import { findDominantStrategy } from '@/lib/gameTheory/dominantStrategy'
import {
  calculateSocialWelfare,
  findParetoOptimal,
} from '@/lib/gameTheory/socialWelfare'
import { getBotDecision } from '@/lib/gameTheory/strategies'

// Initial game state
const createInitialGameState = (maxRounds: number | null): GameState => ({
  rounds: [],
  currentRound: 1,
  playerScore: 0,
  botScore: 0,
  isGameOver: false,
  maxRounds,
})

// Context value interface
interface GameContextValue {
  // Matrix state
  matrix: PayoffMatrix
  setMatrix: (matrix: PayoffMatrix) => void
  updatePayoff: (
    rowAction: Action,
    colAction: Action,
    player: 'A' | 'B',
    value: number
  ) => void

  // Preset state
  currentPreset: GamePreset
  setPreset: (preset: GamePreset) => void

  // Game state
  gameState: GameState
  playRound: (playerAction: Action) => void
  resetGame: () => void

  // Round configuration
  roundOption: RoundOption
  setRoundOption: (option: RoundOption) => void

  // Bot state
  botStrategy: BotStrategy
  setBotStrategy: (strategy: BotStrategy) => void
  lastBotReasoning: string
  mysteryMode: boolean
  toggleMysteryMode: () => void

  // Analysis state (derived)
  nashEquilibria: EquilibriumPosition[]
  dominantStrategyA: Action | null
  dominantStrategyB: Action | null
  socialWelfare: Map<string, number>
  paretoOptimal: EquilibriumPosition[]

  // UI state
  isLearningPanelOpen: boolean
  toggleLearningPanel: () => void
  isTutorialOpen: boolean
  openTutorial: () => void
  closeTutorial: () => void
}

// Create context
const GameContext = createContext<GameContextValue | null>(null)

// Provider component
export function GameProvider({ children }: { children: ReactNode }) {
  // Core state
  const defaultPreset = getDefaultPreset()
  const [currentPreset, setCurrentPreset] = useState<GamePreset>(defaultPreset)
  const [matrix, setMatrixState] = useState<PayoffMatrix>(defaultPreset.matrix)
  const [botStrategy, setBotStrategy] = useState<BotStrategy>('tit_for_tat')
  const [roundOption, setRoundOption] = useState<RoundOption>(10)
  const [gameState, setGameState] = useState<GameState>(() =>
    createInitialGameState(10)
  )
  const [lastBotReasoning, setLastBotReasoning] = useState('')
  const [isLearningPanelOpen, setIsLearningPanelOpen] = useState(false)
  const [isTutorialOpen, setIsTutorialOpen] = useState(false)
  const [mysteryMode, setMysteryMode] = useState(false)

  // Helper to get random bot strategy
  const getRandomStrategy = (): BotStrategy => {
    const strategies: BotStrategy[] = ['always_cooperate', 'always_defect', 'tit_for_tat']
    return strategies[Math.floor(Math.random() * strategies.length)]
  }

  // Set matrix and potentially update to custom preset
  const setMatrix = useCallback((newMatrix: PayoffMatrix) => {
    setMatrixState(newMatrix)
  }, [])

  // Update a single payoff value
  const updatePayoff = useCallback(
    (rowAction: Action, colAction: Action, player: 'A' | 'B', value: number) => {
      setMatrixState((prev) => {
        const newMatrix = { ...prev }
        const currentPayoff = [...prev[rowAction][colAction]] as [number, number]
        currentPayoff[player === 'A' ? 0 : 1] = value
        newMatrix[rowAction] = {
          ...newMatrix[rowAction],
          [colAction]: currentPayoff,
        }
        return newMatrix
      })
    },
    []
  )

  // Set preset and update matrix
  const setPreset = useCallback((preset: GamePreset) => {
    setCurrentPreset(preset)
    setMatrixState(preset.matrix)
  }, [])

  // Play a round against the bot
  const playRound = useCallback(
    (playerAction: Action) => {
      if (gameState.isGameOver) return

      // Get bot's decision
      const botDecision = getBotDecision(botStrategy, gameState.rounds)
      setLastBotReasoning(botDecision.reasoning)

      // Calculate payoffs
      const payoffs = matrix[playerAction][botDecision.action]
      const playerPayoff = payoffs[0]
      const botPayoff = payoffs[1]

      // Create round result
      const roundResult: RoundResult = {
        round: gameState.currentRound,
        playerAction,
        botAction: botDecision.action,
        playerPayoff,
        botPayoff,
      }

      // Update game state
      setGameState((prev) => {
        const newRounds = [...prev.rounds, roundResult]
        const newPlayerScore = prev.playerScore + playerPayoff
        const newBotScore = prev.botScore + botPayoff
        const isGameOver =
          prev.maxRounds !== null && newRounds.length >= prev.maxRounds

        return {
          rounds: newRounds,
          currentRound: prev.currentRound + 1,
          playerScore: newPlayerScore,
          botScore: newBotScore,
          isGameOver,
          maxRounds: prev.maxRounds,
        }
      })
    },
    [gameState, botStrategy, matrix]
  )

  // Reset game
  const resetGame = useCallback(() => {
    const maxRounds = roundOption === 'unlimited' ? null : roundOption
    setGameState(createInitialGameState(maxRounds))
    setLastBotReasoning('')
    // If in mystery mode, randomize strategy on reset
    if (mysteryMode) {
      setBotStrategy(getRandomStrategy())
    }
  }, [roundOption, mysteryMode])

  // Handle round option change
  const handleRoundOptionChange = useCallback((option: RoundOption) => {
    setRoundOption(option)
    const maxRounds = option === 'unlimited' ? null : option
    setGameState(createInitialGameState(maxRounds))
    setLastBotReasoning('')
  }, [])

  // Toggle learning panel
  const toggleLearningPanel = useCallback(() => {
    setIsLearningPanelOpen((prev) => !prev)
  }, [])

  // Tutorial modal controls
  const openTutorial = useCallback(() => {
    setIsTutorialOpen(true)
  }, [])

  const closeTutorial = useCallback(() => {
    setIsTutorialOpen(false)
  }, [])

  // Toggle mystery mode and randomize strategy
  const toggleMysteryMode = useCallback(() => {
    setMysteryMode((prev) => {
      if (!prev) {
        // Entering mystery mode - randomize strategy and reset game
        setBotStrategy(getRandomStrategy())
        const maxRounds = roundOption === 'unlimited' ? null : roundOption
        setGameState(createInitialGameState(maxRounds))
        setLastBotReasoning('')
      }
      return !prev
    })
  }, [roundOption])

  // Derived analysis values (memoized for performance)
  const nashEquilibria = useMemo(() => findNashEquilibria(matrix), [matrix])
  const dominantStrategyA = useMemo(
    () => findDominantStrategy(matrix, 'A'),
    [matrix]
  )
  const dominantStrategyB = useMemo(
    () => findDominantStrategy(matrix, 'B'),
    [matrix]
  )
  const socialWelfare = useMemo(() => calculateSocialWelfare(matrix), [matrix])
  const paretoOptimal = useMemo(() => findParetoOptimal(matrix), [matrix])

  // Context value
  const value: GameContextValue = {
    matrix,
    setMatrix,
    updatePayoff,
    currentPreset,
    setPreset,
    gameState,
    playRound,
    resetGame,
    roundOption,
    setRoundOption: handleRoundOptionChange,
    botStrategy,
    setBotStrategy,
    lastBotReasoning,
    mysteryMode,
    toggleMysteryMode,
    nashEquilibria,
    dominantStrategyA,
    dominantStrategyB,
    socialWelfare,
    paretoOptimal,
    isLearningPanelOpen,
    toggleLearningPanel,
    isTutorialOpen,
    openTutorial,
    closeTutorial,
  }

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>
}

// Hook to use game context
export function useGame() {
  const context = useContext(GameContext)
  if (!context) {
    throw new Error('useGame must be used within a GameProvider')
  }
  return context
}
