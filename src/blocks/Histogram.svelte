<script>
  import Button from '../components/Button.svelte'
  import DatePicker from '../components/DatePicker.svelte'
  // import Indicator from '../compon'
  import { data } from '../stores/data.js'
  import { dayEq, weekEq, monthEq, yearEq } from '../utils.js'

  export let selectedDay
  const rangeDict = {
    day: {
      cmp: (d1, d2) => dayEq(d1, d2) && monthEq(d1, d2) && yearEq(d1, d2),
      label: 'Day',
    },
    week: {
      cmp: (d1, d2) => weekEq(d1, d2) && yearEq(d1, d2),
      label: 'Week',
    },
    month: {
      cmp: (d1, d2) => monthEq(d1, d2) && yearEq(d1, d2),
      label: 'Month',
    },
    year: {
      cmp: yearEq,
      label: 'Year',
    },
  }
  let rangeType = 'day'

  let totalDuration = 0
  $: categories = (() => {
    totalDuration = 0
    const curr = new Date(selectedDay)
    const store = {}
    for (let i = 0; i < $data.length; i++) {
      const entry = $data[i]
      if (rangeDict[rangeType].cmp(curr, entry.date)) {
        if (store[entry.name] == null) store[entry.name] = 0
        store[entry.name] += entry.duration
        totalDuration += entry.duration
      }
    }
    const result = Object.entries(store)
    result.sort(([_1, a], [_2, b]) => b - a)
    return result
  })()
</script>

<div class="histogram">
  <div>
    {#each Object.entries(rangeDict) as [key, { label }]}
      <Button selected={rangeType === key} on:click={() => (rangeType = key)}
        >{label}</Button
      >
    {/each}
    <DatePicker bind:value={selectedDay} />
  </div>
  <div class="inner">
    {#each categories as [name, duration]}
      <h1>{name} - {duration} - {duration / totalDuration}</h1>
    {/each}
  </div>
</div>
