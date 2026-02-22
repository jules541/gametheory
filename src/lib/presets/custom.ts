import type { GamePreset } from '@/types'

/**
 * Custom Game - A blank template for user-defined payoffs.
 */
export const customGame: GamePreset = {
  id: 'custom',
  name: 'Custom Game',
  description: 'Create your own payoff matrix',
  matrix: {
    cooperate: {
      cooperate: [0, 0],
      defect: [0, 0],
    },
    defect: {
      cooperate: [0, 0],
      defect: [0, 0],
    },
  },
  explanation: `Design your own game by editing the payoff values in the matrix.
Click on any number to change it and explore how different payoff structures
create different strategic situations.

Try creating:
• A zero-sum game (payoffs sum to the same value in each cell)
• A pure coordination game (both players want the same outcome)
• A game with multiple Nash Equilibria`,
  latexNotation: `\\text{General 2×2 Game:}

\\begin{bmatrix}
 & C & D \\\\
C & (a_{CC}, b_{CC}) & (a_{CD}, b_{CD}) \\\\
D & (a_{DC}, b_{DC}) & (a_{DD}, b_{DD})
\\end{bmatrix}

\\text{where } a_{ij} \\text{ is Player A's payoff and } b_{ij} \\text{ is Player B's payoff}

\\text{Nash Equilibrium condition:}
U_i(s_i^*, s_{-i}^*) \\geq U_i(s_i, s_{-i}^*) \\text{ for all players } i`,
  realWorldExample:
    'Any strategic interaction you want to model! Business decisions, personal relationships, resource allocation, etc.',
  tutorial: [
    {
      title: 'Welcome to Custom Game',
      content: 'Create your own game theory scenario! You can edit the payoff matrix to explore different strategic situations. Each round, choose between Cooperate or Defect.',
    },
    {
      title: 'Editing the Matrix',
      content: 'Click on any number in the payoff matrix to change it. The first number in each pair is YOUR payoff, the second is the BOT\'s payoff. Experiment with different values!',
    },
    {
      title: 'Understanding Payoffs',
      content: 'Each cell shows (Your Points, Bot Points) for that combination of choices. Higher numbers are better. The Analysis Panel will automatically calculate Nash Equilibria and other properties.',
    },
    {
      title: 'Game Ideas to Try',
      content: 'Zero-Sum Game: Make payoffs add to 0 in each cell (e.g., (3,-3))\nPure Coordination: Same payoffs for both players\nChicken Game: High penalty for both defecting',
    },
    {
      title: 'Playing Your Game',
      content: 'Once you\'ve set up the matrix, play against the bot! Choose Cooperate or Defect each round. Watch how different payoff structures change optimal strategies and outcomes.',
    },
  ],
}
