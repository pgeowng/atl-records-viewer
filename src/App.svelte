<script>
  import Papa from 'papaparse'
  import Button from './components/Button.svelte'
  import Indicator from './components/Indicator.svelte'
  import { formatDateDM } from './utils'

  import Dropzone from './blocks/Dropzone.svelte'
  import EventStats from './blocks/EventStats.svelte'
  import WeekView from './blocks/WeekView.svelte'

  // data handling logic
  async function parseFile(file) {
    Papa.parse(file, {
      complete: (result) => {
        table = prepareData(result)
      },
    })
  }

  function prepareData(data) {
    return data.data.slice(1, -1).map((e) => {
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
  }

  let table = []

  // view logic
  let sunday = new Date(2021, 3, 18)
  const DAY = 86400000

  function dayDiff(a, b) {
    return Math.floor((a - b) / DAY)
  }

  $: week = (() => {
    let result = [[], [], [], [], [], [], []]
    table.forEach((e) => {
      const start = dayDiff(e.date, sunday)
      if (0 > start || start >= 7) return

      result[start].push(e)
    })
    return result
  })()

  // selected logic
  let selected = table[0]
  const handleSelect = (e) => {
    selected = e.detail.target
  }

  const setWeek = (shift) => {
    sunday = new Date(
      sunday.getFullYear(),
      sunday.getMonth(),
      sunday.getDate() + shift * 7
    )
  }
</script>

<main>
  <section>
    <Dropzone on:data={({ detail }) => parseFile(detail)} />
  </section>
  {#if table.length > 0}
    <section>
      <WeekView data={week} on:select={handleSelect} {selected} />
    </section>
    <section class="tools">
      <Button on:click={() => setWeek(-1)}
        ><ion-icon name="ios-arrow-back" /></Button
      >
      <Button on:click={() => setWeek(1)}>
        <ion-icon name="ios-arrow-forward" />
      </Button>
      <Indicator minWidth="16ch"
        >{formatDateDM(sunday)} - {formatDateDM(
          new Date(
            sunday.getFullYear(),
            sunday.getMonth(),
            sunday.getDate() + 6
          )
        )}
      </Indicator>
    </section>
    <section>
      <EventStats event={selected} data={table} {week} />
    </section>
  {/if}
</main>

<style>
  .tools {
    display: flex;
    align-items: center;
    gap: 2px;
  }

  section {
    margin-bottom: 8px;
  }
</style>
