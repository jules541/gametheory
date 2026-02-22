import type { GamePreset } from '@/types'

/**
 * Battle of the Sexes - A coordination game with conflicting preferences.
 *
 * Story: Two people want to spend time together but prefer different activities.
 * They must coordinate on the same activity, but each prefers a different one.
 *
 * Key insight: There are two Nash Equilibria, but players prefer different ones.
 * This creates a coordination problem about fairness and negotiation.
 */
export const battleOfSexes: GamePreset = {
  id: 'battle-of-sexes',
  name: 'Battle of the Sexes',
  description: 'A coordination game with conflicting preferences',
  matrix: {
    cooperate: {
      cooperate: [3, 2], // Both go to Opera (A's preference)
      defect: [0, 0],    // Miscoordination: A at Opera, B at Football
    },
    defect: {
      cooperate: [0, 0], // Miscoordination: A at Football, B at Opera
      defect: [2, 3],    // Both go to Football (B's preference)
    },
  },
  explanation: `Two people want to spend time together but prefer different activities.
Player A prefers Opera (3 points) while Player B prefers Football (3 points).
However, being together is more important than the activity—being alone at
either venue yields 0 points.

Both (Opera, Opera) and (Football, Football) are Nash Equilibria, but
Player A prefers the first and Player B prefers the second.`,
  latexNotation: `\\text{Two Pure Strategy Nash Equilibria:}

(Opera, Opera): \\text{Payoffs } (3, 2) \\text{ — Player A's preferred outcome}
(Football, Football): \\text{Payoffs } (2, 3) \\text{ — Player B's preferred outcome}

\\text{Payoff Matrix:} \\quad
\\begin{bmatrix}
 & Opera & Football \\\\
Opera & (3, 2) & (0, 0) \\\\
Football & (0, 0) & (2, 3)
\\end{bmatrix}

\\text{Also has a mixed strategy NE: } p_A = 3/5, p_B = 2/5`,
  realWorldExample:
    'Business negotiations, technology standards (VHS vs Betamax), political compromises, relationship decisions',
  tutorial: [
    {
      title: 'Welcome to Battle of the Sexes',
      content: 'You and the bot want to spend time together, but you prefer different activities. Each round, choose between Opera (Cooperate) or Football (Defect). The goal is to coordinate!',
    },
    {
      title: 'Understanding the Choices',
      content: 'COOPERATE (Opera): Your preferred activity — you get 3 points if the bot joins you.\nDEFECT (Football): The bot\'s preferred activity — the bot gets 3 points if you join them.',
    },
    {
      title: 'How Points Work',
      content: 'Both choose Opera: You get 3, Bot gets 2 (your preference wins)\nBoth choose Football: You get 2, Bot gets 3 (bot\'s preference wins)\nMiscoordination: You BOTH get 0 points (being apart is the worst!)',
    },
    {
      title: 'The Coordination Problem',
      content: 'Both going to Opera and both going to Football are stable outcomes! The challenge is agreeing on WHICH one. You prefer Opera (3 points), but the bot prefers Football (3 points).',
    },
    {
      title: 'Strategy Tips',
      content: 'Watch for patterns in the bot\'s choices. If the bot always picks the same option, match it to avoid getting 0! Sometimes taking turns or compromising leads to better total outcomes than always fighting for your preference.',
    },
  ],
}
