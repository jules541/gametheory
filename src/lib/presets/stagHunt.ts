import type { GamePreset } from '@/types'

/**
 * The Stag Hunt - A coordination game about trust and risk.
 *
 * Story: Two hunters can either hunt a stag together (high reward but
 * requires cooperation) or hunt hares individually (lower but guaranteed reward).
 *
 * Key insight: Unlike the Prisoner's Dilemma, mutual cooperation IS a Nash
 * Equilibrium here. The question is whether players will trust each other
 * enough to coordinate on the better outcome.
 */
export const stagHunt: GamePreset = {
  id: 'stag-hunt',
  name: 'Stag Hunt',
  description: 'A coordination game about trust and risk',
  matrix: {
    cooperate: {
      cooperate: [4, 4], // Both hunt stag: high reward for coordination
      defect: [0, 3],    // A hunts stag alone, B catches hare
    },
    defect: {
      cooperate: [3, 0], // A catches hare, B hunts stag alone
      defect: [2, 2],    // Both hunt hares: safe but lower reward
    },
  },
  explanation: `Two hunters must decide whether to hunt a stag together or hunt hares
individually. Hunting the stag requires both hunters to cooperate—if one goes for
hares instead, the stag escapes and the lone stag hunter gets nothing.

Unlike the Prisoner's Dilemma, mutual cooperation (stag, stag) is a Nash Equilibrium!
But so is mutual defection (hare, hare). The challenge is coordinating on the
better equilibrium despite the risk.`,
  latexNotation: `\\text{Two Nash Equilibria:}

(Stag, Stag): \\text{Payoff-dominant equilibrium with } (4, 4)
(Hare, Hare): \\text{Risk-dominant equilibrium with } (2, 2)

\\text{Payoff Matrix:} \\quad
\\begin{bmatrix}
 & Stag & Hare \\\\
Stag & (4, 4) & (0, 3) \\\\
Hare & (3, 0) & (2, 2)
\\end{bmatrix}

\\text{Social dilemma: Which equilibrium will players coordinate on?}`,
  realWorldExample:
    'International climate agreements, team projects, technology standardization, social contracts',
  tutorial: [
    {
      title: 'Welcome to the Stag Hunt',
      content: 'You and the bot are hunters in the forest. Each round, you decide whether to hunt a stag together (Cooperate) or catch hares alone (Defect). Your goal is to maximize your total points.',
    },
    {
      title: 'Understanding the Choices',
      content: 'COOPERATE (Hunt Stag): Team up to catch the big prize, but you need the bot to cooperate too!\nDEFECT (Hunt Hare): Catch small game alone — safe but less rewarding.',
    },
    {
      title: 'How Points Work',
      content: 'Both Hunt Stag: You both get 4 points (best outcome!)\nYou Hunt Stag alone: You get 0, Bot gets 3\nYou Hunt Hare, Bot hunts Stag: You get 3, Bot gets 0\nBoth Hunt Hare: You both get 2 points (safe but lower)',
    },
    {
      title: 'The Trust Challenge',
      content: 'Unlike the Prisoner\'s Dilemma, mutual cooperation IS stable here! The question is: do you trust the bot to cooperate? If you both hunt stag, neither wants to switch. But hunting hare is the "safe" choice if you\'re unsure.',
    },
    {
      title: 'Strategy Tips',
      content: 'This game is about building trust. If the bot cooperates, you should too! Check the bot\'s strategy in settings. "Tit-for-Tat" rewards cooperation, so start by cooperating and see if trust develops.',
    },
  ],
}
