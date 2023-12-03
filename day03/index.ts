import { file } from 'bun'

const input = {
  s: await file('input').text(),
  get parse() {
    return this.s.split('\n').map((x) => x.split('') )
  },
  starPositions(){
    return this.parse.map((row, y) => row.map((col, x) => col.match(/\W/) && col != "." ? {x,y,numberObjects:[]} as SpecialChar : null).filter((x) => x !== null)).flat()
  },

  numberObjects() {
    const numberObjects: numberObjects[] = [];
    for (let y = 0; y < this.parse.length; y++) {
      const line = this.parse[y];
      let number = "";
      let xSpan = [];
      for (let x = 0; x < line.length; x++) {
        const char = line[x];
        if (char.match(/\d/)) {
          number += char;
          xSpan.push(x);
          if(x ===  line.length - 1) {
            console.log(number)
            numberObjects.push({number: parseInt(number), xSpan, y, matched: false})
          }
        } else if (number.length > 0) {
          numberObjects.push({number: parseInt(number), xSpan, y, matched: false})
          number = "";
          xSpan = [];
        }
      }
    }
    return numberObjects;
  },

  surroundingSpan(x:number, y:number){
    const surroundingSpan = [];
    for (let i = 0; i < 3; i++) {
      surroundingSpan.push([x-1+i, y-1]);
      surroundingSpan.push([x-1+i, y+1]);
    }
    surroundingSpan.push([x-1, y]);
    surroundingSpan.push([x+1, y]);
    return surroundingSpan;
  },
}

interface SpecialChar {
  x: number,
  y: number,
  numberObjects: numberObjects[]
}

interface numberObjects{
  number:number,
  xSpan:number[],
  y: number
  matched: boolean
}

export const day ={
  part1: () => part1(),
  part2: () => part2(),
}

const part1: any = () => {
  let sum = 0;
  const inputNumberObjects = input.numberObjects();
  input.starPositions().forEach((starPosition) => {
    const surroundingSpan = input.surroundingSpan(starPosition!.x, starPosition!.y);

    surroundingSpan.forEach((surroundingPosition) => {
      inputNumberObjects.forEach((numberObject) => {
        if (numberObject.xSpan.includes(surroundingPosition[0]) && numberObject.y === surroundingPosition[1] && !numberObject.matched) {
          sum += numberObject.number;
          numberObject.matched = true;
        }});
      });
    })
  return sum;
}

const part2 : any = () => {
  let sum = 0;
  const inputNumberObjects = input.numberObjects();
  const starPositions = input.starPositions();
  starPositions.forEach((starPosition) => {
    const surroundingSpan = input.surroundingSpan(starPosition!.x, starPosition!.y);

    surroundingSpan.forEach((surroundingPosition) => {
      inputNumberObjects.forEach((numberObject) => {
        if (numberObject.xSpan.includes(surroundingPosition[0]) && numberObject.y === surroundingPosition[1]) {
          if(!starPosition?.numberObjects.find((no) =>no === numberObject)) {
            starPosition!.numberObjects.push(numberObject);
          }}

      });
    })
  });
    return starPositions.filter((starPosition) => starPosition!.numberObjects.length ===2).map((starPosition) => starPosition!.numberObjects[0].number*starPosition!.numberObjects[1].number).reduce((a,b) => a+b);

}

process.env.part === 'part1' && console.log(day.part1())
process.env.part === 'part2' && console.log(day.part2())





