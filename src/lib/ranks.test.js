import { describe, it, expect } from 'vitest'
import { getRank, getNextRank, RANKS } from './constants'

describe('Rank Calculations', () => {
  it('should return Rank E for 0 XP', () => {
    const rank = getRank(0)
    expect(rank.name).toBe('E')
  })

  it('should return Rank D when crossing 500 XP', () => {
    const rank = getRank(500)
    expect(rank.name).toBe('D')
  })

  it('should return Rank S for very high XP', () => {
    const rank = getRank(100000)
    expect(rank.name).toBe('S')
  })

  it('should correctly identify the upper bound rank', () => {
    const next = getNextRank(0)
    expect(next.name).toBe('E')
    expect(next.max).toBe(500)
  })

  it('should cap next rank at S for max level', () => {
    const next = getNextRank(15000)
    expect(next.name).toBe('S')
  })
})
