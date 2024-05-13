import { CommitsPerWeek } from '@entities/repository/model'
import { Activity } from 'react-activity-calendar'

const day = 24 * 60 * 60

export const formatData = (data: CommitsPerWeek[]) => {
  const formattedData: Activity[] = []

  data.forEach((item) => {
    for (let i = 0; i < 7; i++) {
      const date = new Date((item.week + i * day) * 1000)
      const dateString = date.toISOString().split('T')[0]

      let level = 1

      if (item.days[i] === 0) {
        level = 0
      } else if (item.days[i] < 3) {
        level = 1
      } else if (item.days[i] < 5) {
        level = 2
      } else if (item.days[i] < 8) {
        level = 3
      } else if (item.days[i] < 12) {
        level = 4
      } else {
        level = 5
      }

      formattedData.push({
        date: dateString,
        count: item.days[i],
        level: level,
      })
    }
  })

  return formattedData
}
