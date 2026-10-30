import { describe, expect, it } from 'vitest'
import { tracks } from './track'

describe('track catalogue', () => {
  it('contains two tracks', () => {
    expect(tracks).toHaveLength(2)
  })

  it('provides a title, artist, and duration for every track', () => {
    expect(tracks).toEqual([
      { title: 'Rattle and Hum', artist: 'U2', duration: 90 },
      { title: 'Thriller', artist: 'MJ', duration: 80 },
    ])
  })
})
