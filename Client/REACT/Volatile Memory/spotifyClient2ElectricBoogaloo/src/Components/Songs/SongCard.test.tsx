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

    const heading = screen.getByRole('heading')
    const paragraphs = screen.getAllByText((_, element) => element?.tagName === 'P')

    expect(heading.textContent).toContain(track.title)
    expect(paragraphs[0].textContent).toContain(track.artist)
    expect(paragraphs[1].textContent).toContain(String(track.duration))
    expect(paragraphs[2].textContent).toContain(String(reproduccions))
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

    const heading = screen.getByRole('heading')
    const paragraphs = screen.getAllByText((_, element) => element?.tagName === 'P')

    expect(heading.textContent).toContain(title)
    expect(paragraphs[0].textContent).toContain(artist)
    expect(paragraphs[1].textContent).toContain(String(duration))
    expect(paragraphs[2].textContent).toContain(String(plays))
  })
})
