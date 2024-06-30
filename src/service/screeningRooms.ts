import type { IScreeningRoom } from './interface'

export const getScreeningRooms = (): Promise<IScreeningRoom[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const data = getMockData()
      resolve(data)
    }, 1000)
  })
}

const getMockData = (len: number = 4) => {
  return Array.from({ length: len }).map((item, i) => {
    const randomData = getRandomSeats(seats, 5)
    return {
      seats,
      id: i + 1,
      selected: [randomData[0], randomData[1]],
      purchased: [randomData[2], randomData[3]],
      occupied: [randomData[4]],
    }
  })
}

const getRandomSeats = (arr: any[], num: number) => {
  const result = []
  for (let i = 0; i < num; i++) {
    const randomIndex = Math.floor(Math.random() * arr.length)
    result.push(arr[randomIndex])
  }
  return result
}

const seats = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'].flatMap((item) => {
  return Array.from({ length: 4 }).map((v, i) => {
    return `${item}${i + 1}`
  })
})
