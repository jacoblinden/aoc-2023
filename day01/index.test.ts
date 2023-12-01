import { describe, expect, test } from 'bun:test'
import { day} from './index.ts'

describe('Bun Tests Examples', () => {

  test('Part 1', () => {
    expect(day.part1()).toBe(142)
  })
      test('Part 2', () => {
      expect(day.part2()).toBe(281)
    })
  })
