import Papa from 'papaparse'
import { writable } from 'svelte/store'

const defaultValue = []
const names = ['Sleep', 'Work', 'Gaming']
const now = new Date()

const lorem = 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo aliquid, nesciunt at assumenda, illum velit ipsum quidem ullam rem quis labore perferendis dolore, obcaecati iusto. Magni debitis ratione distinctio laborum corporis hic fugiat facilis! Perspiciatis, pariatur. Ut, ducimus laudantium inventore quidem corporis, reiciendis vero quis aliquam expedita tempora vel cum sed quasi veritatis laboriosam, aperiam quibusdam ex excepturi perferendis? Accusantium similique sunt velit! Libero repudiandae consequuntur voluptatum id repellat excepturi!'.split(
  ' '
)
const randDesc = () =>
  lorem.slice(0, Math.floor(Math.random() * lorem.length)).join(' ')

const randIntRange = (from, to) =>
  Math.floor(Math.random() * (to - from + 1)) + from

// sleep
for (let i = 0; i < 9; i++) {
  const startTime = 72000 + randIntRange(-500, 500)
  const middleTime = 23 * 3600 + 59 * 60 + 59
  const endTime = 5 * 3600 + randIntRange(-500, 500)

  defaultValue.push({
    name: 'Sleep',
    date: new Date(
      `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate() - i}`
    ),
    startTime,
    endTime: middleTime,
    duration: middleTime - startTime,
    description: randDesc(),
  })
  defaultValue.push({
    name: 'Sleep',
    date: new Date(
      `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate() - i + 1}`
    ),
    startTime: 0,
    endTime: endTime,
    duration: endTime,
    description: randDesc(),
  })
}

// work
for (let i = 0; i < 9; i++) {
  if (Math.random() > 0.7) continue
  const duration = 6 * 3600 + randIntRange(-250, 250)
  const startTime = 11 * 3600 + randIntRange(-250, 250)
  defaultValue.push({
    name: 'Work',
    date: new Date(now.getFullYear(), now.getMonth(), now.getDate() - i),
    startTime,
    endTime: startTime + duration,
    duration,
    description: randDesc(),
  })
}

for (let i = 0; i < 9; i++) {
  const duration = 3 * 3600 + randIntRange(-100, 300)
  const startTime = 6 * 3600 + randIntRange(-700, 700)
  defaultValue.push({
    name: 'Gaming',
    date: new Date(now.getFullYear(), now.getMonth(), now.getDate() - i),
    startTime,
    endTime: startTime + duration,
    duration,
    description: randDesc(),
  })
}

function createStore() {
  const { subscribe, set, update } = writable(defaultValue)

  async function loadFile(file) {
    Papa.parse(file, {
      complete: (result) => prepareData(result),
    })
  }

  function prepareData(data) {
    set(
      data.data.slice(1, -1).map((e) => {
        const result = {}
        result.name = e[3]
        result.description = e[5]

        const startDate = new Date(e[0])
        const endDate = new Date(e[1])

        result.date = new Date(
          `${startDate.getFullYear()}-${
            startDate.getMonth() + 1
          }-${startDate.getDate()}`
        )

        result.startTime =
          startDate.getHours() * 3600 +
          startDate.getMinutes() * 60 +
          startDate.getSeconds()

        result.endTime =
          endDate.getHours() * 3600 +
          endDate.getMinutes() * 60 +
          endDate.getSeconds()

        const t = e[2].split(':')
        result.duration =
          parseInt(t[0]) * 3600 + parseInt(t[1]) * 60 + parseInt(t[2])
        return result
      })
    )
  }

  return {
    subscribe,
    loadFile,
  }
}

export const data = createStore()
