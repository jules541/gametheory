import { describe, it, expect } from 'vitest'
import { getBotAction } from './strategies'
import type { RoundResult } from '@/types'

describe('Bot Strategies', () => {
  describe('Always Cooperate', () => {
    it('should always return cooperate regardless of history', () => {
      expect(getBotAction('always_cooperate', [])).toBe('cooperate')
      expect(getBotAction('always_cooperate', [
        { round: 1, playerAction: 'defect', botAction: 'cooperate', playerPayoff: 5, botPayoff: 0 }
      ])).toBe('cooperate')
    })
  })

  describe('Always Defect', () => {
    it('should always return defect regardless of history', () => {
      expect(getBotAction('always_defect', [])).toBe('defect')
      expect(getBotAction('always_defect', [
        { round: 1, playerAction: 'cooperate', botAction: 'defect', playerPayoff: 0, botPayoff: 5 }
      ])).toBe('defect')
    })
  })

  describe('Tit-for-Tat', () => {
    it('should cooperate on first move', () => {
      expect(getBotAction('tit_for_tat', [])).toBe('cooperate')
    })

    it('should mirror player\'s last move', () => {
      const historyWithCooperation: RoundResult[] = [
        { round: 1, playerAction: 'cooperate', botAction: 'cooperate', playerPayoff: 3, botPayoff: 3 }
      ]
      expect(getBotAction('tit_for_tat', historyWithCooperation)).toBe('cooperate')

      const historyWithDefection: RoundResult[] = [
        { round: 1, playerAction: 'defect', botAction: 'cooperate', playerPayoff: 5, botPayoff: 0 }
      ]
      expect(getBotAction('tit_for_tat', historyWithDefection)).toBe('defect')
    })

    it('should alternate if player alternates', () => {
      const history: RoundResult[] = [
        { round: 1, playerAction: 'cooperate', botAction: 'cooperate', playerPayoff: 3, botPayoff: 3 },
        { round: 2, playerAction: 'defect', botAction: 'cooperate', playerPayoff: 5, botPayoff: 0 },
        { round: 3, playerAction: 'cooperate', botAction: 'defect', playerPayoff: 0, botPayoff: 5 },
      ]
      expect(getBotAction('tit_for_tat', history)).toBe('cooperate')
    })

    it('should forgive after opponent returns to cooperation', () => {
      const history: RoundResult[] = [
        { round: 1, playerAction: 'cooperate', botAction: 'cooperate', playerPayoff: 3, botPayoff: 3 },
        { round: 2, playerAction: 'defect', botAction: 'cooperate', playerPayoff: 5, botPayoff: 0 },
        { round: 3, playerAction: 'defect', botAction: 'defect', playerPayoff: 1, botPayoff: 1 },
        { round: 4, playerAction: 'cooperate', botAction: 'defect', playerPayoff: 0, botPayoff: 5 },
      ]
      expect(getBotAction('tit_for_tat', history)).toBe('cooperate')
    })
  })
})
