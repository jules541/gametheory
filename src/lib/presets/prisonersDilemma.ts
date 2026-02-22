import type { GamePreset } from '@/types'

/**
 * The Prisoner's Dilemma - The classic game theory scenario.
 *
 * Story: Two suspects are arrested. Each can either stay silent (cooperate)
 * or betray the other (defect). The payoffs represent years of prison
 * (in the original framing) or points (in this positive-sum version).
 *
 * Key insight: Individual rationality leads to a worse collective outcome.
 * Both players defecting is the Nash Equilibrium, but both cooperating
 * yields higher total payoff.
 */
export const prisonersDilemma: GamePreset = {
  id: 'prisoners-dilemma',
  name: "Prisoner's Dilemma",
  description: 'The classic game of cooperation vs. betrayal',
  matrix: {
    cooperate: {
      cooperate: [3, 3], // Both cooperate: mutual reward
      defect: [0, 5],    // A cooperates, B defects: sucker's payoff vs temptation
    },
    defect: {
      cooperate: [5, 0], // A defects, B cooperates: temptation vs sucker's payoff
      defect: [1, 1],    // Both defect: mutual punishment
    },
  },
  explanation: `Two prisoners are questioned separately. If both stay silent (cooperate),
they each get a light sentence (3 points). If one betrays while the other stays silent,
the betrayer goes free (5 points) while the silent one gets the maximum sentence (0 points).
If both betray (defect), both get moderate sentences (1 point each).

The dilemma: Defecting is individually rational, but mutual defection leaves both
worse off than mutual cooperation.`,
  latexNotation: `\\text{Payoff Matrix:} \\quad
\\begin{bmatrix}
 & C & D \\\\
C & (R, R) & (S, T) \\\\
D & (T, S) & (P, P)
\\end{bmatrix}

\\text{where } T > R > P > S \\text{ (Temptation > Reward > Punishment > Sucker)}

\\text{Values: } T=5, R=3, P=1, S=0

\\text{Nash Equilibrium: } (D, D) \\text{ with payoff } (1, 1)

\\text{Pareto Optimal: } (C, C) \\text{ with payoff } (3, 3)`,
  realWorldExample:
    'Arms races between nations, climate change negotiations, price wars between companies, doping in sports',
  tutorial: [
    {
      title: 'Welcome to the Prisoner\'s Dilemma',
      content: 'You and the bot are two prisoners being interrogated separately. Each round, you must decide whether to stay silent (Cooperate) or betray the other (Defect). Your goal is to maximize your total points.',
    },
    {
      title: 'Understanding the Choices',
      content: 'COOPERATE: Stay silent and protect your partner.\nDEFECT: Betray your partner to the authorities.\n\nThe bot will also make a choice each round without knowing yours.',
    },
    {
      title: 'How Points Work',
      content: 'Both Cooperate: You both get 3 points (mutual reward)\nYou Defect, Bot Cooperates: You get 5, Bot gets 0\nYou Cooperate, Bot Defects: You get 0, Bot gets 5\nBoth Defect: You both get 1 point (mutual punishment)',
    },
    {
      title: 'The Dilemma',
      content: 'Here\'s the catch: Defecting always gives YOU more points regardless of what the bot does. But if BOTH players defect, you both end up worse off than if you had cooperated!',
    },
    {
      title: 'Strategy Tips',
      content: 'Watch what strategy the bot is using (shown in settings). "Tit-for-Tat" copies your previous move. "Always Cooperate" and "Always Defect" are self-explanatory. Adapt your strategy accordingly!',
    },
  ],
}
