import { file } from 'bun'

const input = {
  s: await file('input').text(),
  get parse() {
    return this.s.split('\n');
  },

  get numbers() {
    const regex = /\d+/g;
    return this.parse.map((x) => x.match(regex)).map((list) => list?.reduce((a, b) => a + b));
  },

  get numbersWithLetterConversion() {
    const Map: { [key: string]: string } = { 
      one: 'one1one', 
      two: 'two2two', 
      three: 'three3three', 
      four: 'four4four', 
      five: 'five5five', 
      six: 'six6six', 
      seven: 'seven7seven', 
      eight: 'eight8eight', 
      nine: 'nine9nine', 
      zero: 'zero0zero' 
    };
    return this.parse
    .map((x) => x.replace(/(zero|one|two|three|four|five|six|seven|eight|nine)/g, (matched) => Map[matched]))
    .map((x) => x.match(/\d+/g))
    .map((list) => list?.reduce((a, b) => a + b))
  },

  get firstAndLast() :string[] { 
    return this.numbers.map(extractNums);
  },

  get firstAndLastLetters() :string[]{ 
    return this.numbersWithLetterConversion.map(extractNums); ;
  }
}


const extractNums: any = (number? :string) => {
  if(number === undefined) return 0;
  if(number.length === 0) throw new Error('number is empty');
  if(number.length === 1) return number + number;
  return number[0] + number[number.length - 1];
}

export const day ={
  part1: () => part1(),
  part2: () => part2(),
}

const part2: any = () => {
  return input.firstAndLastLetters.map((x: string) => parseInt(x)).reduce((a, b) => a + b);
}

const part1: any = () => {
  return input.firstAndLast.map((x: string) => parseInt(x)).reduce((a, b) => a + b);
}
56324