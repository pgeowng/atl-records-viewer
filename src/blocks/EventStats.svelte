<script>
  import { formatTime, formatTimeSimple, formatDate, per } from '../utils.js'
  export let data
  export let week
  export let event

  const HOURS_40 = 40 * 3600
  const HOURS_100 = 100 * 3600
  const HOURS_DAY = 24 * 3600
  const HOURS_WEEK = 7 * 24 * 3600

  let dayTime = 0
  let weekTime = 0
  let allTime = 0
  $: if (event != null) {
    weekTime = 0
    for (let i = 0; i < week.length; i++) {
      const events = week[i]
      for (let j = 0; j < events.length; j++) {
        const curr = events[j]
        if (curr.name === event.name) {
          weekTime += curr.duration
        }
      }
    }

    allTime = 0
    for (let i = 0; i < data.length; i++) {
      const curr = data[i]
      if (curr.name === event.name) {
        allTime += curr.duration
      }
    }

    dayTime = 0
    const dayInfo = week[event.date.getDay()]
    for (let i = 0; i < dayInfo.length; i++) {
      const curr = data[i]
      if (curr.name === event.name) dayTime += curr.duration
    }
  }
</script>

{#if event != null}
  <div class="stats">
    <table>
      <tr>
        <td>Name</td>
        <td>{event.name}</td>
      </tr>
      <tr>
        <td>Date</td>
        <td>{formatDate(event.date)}</td>
      </tr>
      <tr><td>Start Time</td><td>{formatTime(event.startTime)}</td></tr>
      <tr>
        <td>End Time</td>
        <td>{formatTime(event.endTime)}</td></tr
      >
      <tr>
        <td>Duration</td>
        <td>{formatTime(event.duration)}</td></tr
      >
      <tr>
        <td>Over week</td>
        <td>{formatTime(weekTime)}</td>
      </tr>
      <tr><td>All time</td><td>{formatTimeSimple(allTime)}</td></tr>
      <tr>
        <td>day%</td>
        <td>{per(dayTime / HOURS_DAY)}</td>
      </tr>
      <tr>
        <td>week 40h%</td>
        <td>{per(weekTime / HOURS_40)}</td>
      </tr>
      <tr>
        <td>week 100h%</td>
        <td>{per(weekTime / HOURS_100)}</td>
      </tr>
      <tr>
        <td>week%</td>
        <td>{per(weekTime / HOURS_WEEK)}</td>
      </tr>
      <tr>
        <td>Description</td>
        <td>
          {#if event.description != ''}
            {@html event.description.trim().split('\n').join('<br>')}
          {:else}
            N/A
          {/if}
        </td>
      </tr>
    </table>
  </div>
{/if}

<style>
  tr {
    height: 25px;
  }

  tr :first-child {
    min-width: 12ch;
  }
  td {
    line-height: 1.1;
    vertical-align: top;
  }
</style>
