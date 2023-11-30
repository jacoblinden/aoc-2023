import { file } from 'bun'

const input = {
  s: await file('input.txt').text(),
  get parse() {
    return this.s.split('\n').map((x) => Number(x))
  },
}

export const day ={
  part1: () => part1(),
  part2: () => part2(),
}

const part1: any = () => {
  return input.parse[0];
}

const part2 : any = () => {
  return input.parse[1];
}

process.env.part === 'part1' && console.log(day.part1())
process.env.part === 'part2' && console.log(day.part2())



