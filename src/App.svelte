<script>
  import Button from './components/Button.svelte'
  import Indicator from './components/Indicator.svelte'
  import { formatDateDM } from './utils'

  import Dropzone from './blocks/Dropzone.svelte'
  import EventStats from './blocks/EventStats.svelte'
  import WeekView from './blocks/WeekView.svelte'
  import Histogram from './blocks/Histogram.svelte'

  import { data } from './stores/data.js'

  // data handling logic

  // view logic
  let sunday = new Date(2021, 3, 18)
  const DAY = 86400000

  function dayDiff(a, b) {
    return Math.floor((a - b) / DAY)
  }

  $: week = (() => {
    let result = [[], [], [], [], [], [], []]
    $data.forEach((e) => {
      const start = dayDiff(e.date, sunday)
      if (0 > start || start >= 7) return

      result[start].push(e)
    })
    return result
  })()

  // selected logic
  let selected = $data[0]
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
    <Dropzone on:data={({ detail }) => data.loadFile(detail)} />
  </section>
  {#if $data.length > 0}
    <section>
      <WeekView data={week} on:select={handleSelect} {selected} />
    </section>
    <section>
      <Histogram />
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
      <EventStats event={selected} data={$data} {week} />
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
