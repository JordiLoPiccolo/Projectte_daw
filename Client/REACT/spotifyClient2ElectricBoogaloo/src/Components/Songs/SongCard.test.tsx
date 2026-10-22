import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'
import { tracks } from '../../Data/track/track'
import SongCard from './SongCard'

afterEach(cleanup)

describe('SongCard', () => {
  it.each(tracks)('displays every catalogue track: "$title"', (track) => {
    const reproduccions = 1234

    render(
      <SongCard
        trackInfo={{
          ...track,
          reproduccions,
        }}
      />,
    )

    expect(screen.getByRole('heading', { name: `Títol: ${track.title}` })).toBeTruthy()
    expect(screen.getByText(`Artista: ${track.artist}`)).toBeTruthy()
    expect(screen.getByText(`Duració: ${track.duration}`)).toBeTruthy()
    expect(screen.getByText(`Total Reproduccions: ${reproduccions}`)).toBeTruthy()
  })

  it.each([
    ['First Song', 'Artist One', 0, 0],
    ['Song 2', 'Artist Two', 180, 1],
    ['Track Three', 'The Band', 215, 42],
    ['Quiet Night', 'Singer', 240, 999],
    ['Live!', 'Group X', 111, 1200],
    ['Cafe', 'Solo Artist', 199, 55000],
    ['A-B-C', 'Various Artists', 1, 123456],
    ['Instrumental', 'Composer', 600, 10],
    ['Encore', 'Artist & Freieiends', 222, 9999],
    ['Shit', 'DJ Example', 90, 2000000],
  ])('renders title, artist, duration, and plays for "%s"', (title, artist, duration, plays) => {
    render(
      <SongCard
        trackInfo={{
          title,
          artist,
          duration,
          reproduccions: plays,
        }}
      />,
    )

    expect(screen.getByRole('heading', { name: `Títol: ${title}` })).toBeTruthy()
    expect(screen.getByText(`Artista: ${artist}`)).toBeTruthy()
    expect(screen.getByText(`Duració: ${duration}`)).toBeTruthy()
    expect(screen.getByText(`Total Reproduccions: ${plays}`)).toBeTruthy()
  })
})
