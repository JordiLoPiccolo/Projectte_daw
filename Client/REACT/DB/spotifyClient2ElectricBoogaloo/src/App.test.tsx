import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import App from './App'
import { day, month, year } from './Components/data'

afterEach(() => {
  cleanup()
  vi.restoreAllMocks()
})

describe('App', () => {
  it('displays the date, a selected track, and its play count', () => {
    vi.spyOn(Math, 'random')
      .mockReturnValueOnce(0)
      .mockReturnValueOnce(0.5)

    render(<App />)

    expect(screen.getByText(`Data:${day}-${month}-${year};`)).toBeTruthy()
    expect(screen.getByRole('heading', { name: 'Títol: Rattle and Hum' })).toBeTruthy()
    expect(screen.getByText('Artista: U2')).toBeTruthy()
    expect(screen.getByText('Total Reproduccions: 14000')).toBeTruthy()
  })

  it.each([
    [0, 0, 'Rattle and Hum', 'U2', 0],
    [0, 0.25, 'Rattle and Hum', 'U2', 7000],
    [0.999999, 0.25, 'Thriller', 'MJ', 4000],
    [0.999999, 0.999999, 'Thriller', 'MJ', 15999],
  ])(
    'selects and displays the expected track when random values are %s and %s',
    (selectionValue, playsValue, title, artist, plays) => {
      vi.spyOn(Math, 'random')
        .mockReturnValueOnce(selectionValue)
        .mockReturnValueOnce(playsValue)

      render(<App />)

      expect(screen.getByRole('heading', { name: `Títol: ${title}` })).toBeTruthy()
      expect(screen.getByText(`Artista: ${artist}`)).toBeTruthy()
      expect(screen.getByText(`Total Reproduccions: ${plays}`)).toBeTruthy()
      expect(screen.getByText(`Data:${day}-${month}-${year};`)).toBeTruthy()
    },
  )
})
