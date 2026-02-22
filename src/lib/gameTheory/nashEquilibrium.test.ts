import { describe, it, expect } from 'vitest'
import { findNashEquilibria, isNashEquilibrium } from './nashEquilibrium'
import type { PayoffMatrix } from '@/types'

describe('Nash Equilibrium Detection', () => {
  describe('Prisoner\'s Dilemma', () => {
    const prisonersDilemma: PayoffMatrix = {
      cooperate: {
        cooperate: [3, 3],
        defect: [0, 5],
      },
      defect: {
        cooperate: [5, 0],
        defect: [1, 1],
      },
    }

    it('should find single Nash Equilibrium at (Defect, Defect)', () => {
      const equilibria = findNashEquilibria(prisonersDilemma)
      expect(equilibria).toHaveLength(1)
      expect(equilibria[0]).toEqual({ row: 'defect', col: 'defect' })
    })

    it('should correctly identify Nash Equilibrium cell', () => {
      expect(isNashEquilibrium(prisonersDilemma, 'defect', 'defect')).toBe(true)
      expect(isNashEquilibrium(prisonersDilemma, 'cooperate', 'cooperate')).toBe(false)
      expect(isNashEquilibrium(prisonersDilemma, 'cooperate', 'defect')).toBe(false)
      expect(isNashEquilibrium(prisonersDilemma, 'defect', 'cooperate')).toBe(false)
    })
  })

  describe('Stag Hunt', () => {
    const stagHunt: PayoffMatrix = {
      cooperate: {
        cooperate: [4, 4],
        defect: [0, 3],
      },
      defect: {
        cooperate: [3, 0],
        defect: [2, 2],
      },
    }

    it('should find two Nash Equilibria', () => {
      const equilibria = findNashEquilibria(stagHunt)
      expect(equilibria).toHaveLength(2)
      expect(equilibria).toContainEqual({ row: 'cooperate', col: 'cooperate' })
      expect(equilibria).toContainEqual({ row: 'defect', col: 'defect' })
    })
  })

  describe('Battle of the Sexes', () => {
    const battleOfSexes: PayoffMatrix = {
      cooperate: {
        cooperate: [3, 2],
        defect: [0, 0],
      },
      defect: {
        cooperate: [0, 0],
        defect: [2, 3],
      },
    }

    it('should find two Nash Equilibria on the diagonal', () => {
      const equilibria = findNashEquilibria(battleOfSexes)
      expect(equilibria).toHaveLength(2)
      expect(equilibria).toContainEqual({ row: 'cooperate', col: 'cooperate' })
      expect(equilibria).toContainEqual({ row: 'defect', col: 'defect' })
    })
  })

  describe('No Nash Equilibrium', () => {
    const matching_pennies: PayoffMatrix = {
      cooperate: {
        cooperate: [1, -1],
        defect: [-1, 1],
      },
      defect: {
        cooperate: [-1, 1],
        defect: [1, -1],
      },
    }

    it('should find no pure strategy Nash Equilibrium', () => {
      const equilibria = findNashEquilibria(matching_pennies)
      expect(equilibria).toHaveLength(0)
    })
  })
})
