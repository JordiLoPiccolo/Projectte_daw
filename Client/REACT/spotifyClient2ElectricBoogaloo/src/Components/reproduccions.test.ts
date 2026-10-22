import { afterEach, describe, expect, it, vi } from 'vitest'
import { ObtenirReproduccions } from './reproduccions'
import type { Track } from '../Model/Track'

const track: Track = {
  title: 'Thriller',
  artist: 'MJ',
  duration: 80,
}

afterEach(() => {
  vi.restoreAllMocks()
})

describe('ObtenirReproduccions', () => {
  it('returns zero when the random value is zero', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0)

    expect(ObtenirReproduccions(track)).toBe(0)
  })

  it('keeps the result below the title length multiplied by 2000', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0.999999999)

    expect(ObtenirReproduccions(track)).toBe(track.title.length * 2000 - 1)
  })

  it.each([
    ['A', 0, 0],
    ['A', 0.25, 500],
    ['A', 0.5, 1000],
    ['A', 0.999, 1998],
    ['AB', 0.25, 1000],
    ['AB', 0.5, 2000],
    ['ABC', 0.1, 600],
    ['ABC', 0.75, 4500],
    ['Thriller', 0.1, 1600],
    ['', 0.99, 0],
  ])('returns the expected count for title "%s" and random value %s', (title, randomValue, expected) => {
    vi.spyOn(Math, 'random').mockReturnValue(randomValue)

    expect(ObtenirReproduccions({ ...track, title })).toBe(expected)
  })
})
