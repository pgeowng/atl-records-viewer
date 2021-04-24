<script>
  import { formatTime, per } from '../utils.js'
  import { createEventDispatcher } from 'svelte'
  const dispatcher = createEventDispatcher()

  export let data
  export let selected

  // week = [[new Date(2021, 3, 18, 23, 0, 0), new Date(2021, 3, 18, 23, 59, 59)]]

  // for (let i = 0; i < 24 * 60; i++) {
  //   if (i % 8 !== 0) continue
  //   week.push([
  //     new Date(2021, 3, 18, Math.floor(i / 60), i % 60),
  //     new Date(2021, 3, 18, Math.floor(i / 60), i % 60, 59),
  //     '',
  //     'some',
  //   ])
  // }

  // position
  const DAY_S = 86400
  const gap = 2 / 300

  const hourScale = (hour) => {
    return +hour / DAY_S
  }

  const inset = (event) => {
    const left = per(hourScale(event.startTime))
    const width = per(Math.max(hourScale(event.duration) - gap, 0))

    return `left: ${left}; width: ${width};`
  }

  let width = 0
  const elementWidth = (event) => {
    const width = Math.max(hourScale(event.duration) - gap, 0)
    return width
  }

  // colors
  // java's hashcode by https://werxltd.com/wp/2010/05/13/javascript-implementation-of-javas-string-hashcode-method/
  const hashCode = (str) => {
    let hash = 0
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i)
      hash = (hash << 5) - hash + char
      hash |= 0
    }
    return hash
  }
</script>

<div class="week-view" bind:clientWidth={width}>
  <div class="inner">
    {#each data as events}
      <div class="day">
        {#each events as event}
          <div
            class="event"
            style="{inset(event)} --hue: {hashCode(event.name) % 360};"
            class:event--selected={event === selected}
            on:mouseenter={() => dispatcher('select', { target: event })}
            data-end={formatTime(event.startTime + event.duration)}
          >
            {#if width * elementWidth(event) > 40}
              <span class="event__text">
                {event.name.split(' ')[0]}
              </span>
            {/if}
          </div>
        {/each}
      </div>
    {/each}
  </div>
</div>

<style>
  .week-view {
    padding: 10px;
    border: 1px solid;
    padding: 10px;
  }

  .inner {
    height: 100%;
    display: flex;
    flex-direction: column;
    gap: 5px;
  }

  .day {
    position: relative;
    min-height: 25px;
  }

  .event {
    --hue: 0;
    --base-l: 55%;
    --start-l: 60%;
    --end-l: 50%;

    font-family: inherit;
    position: absolute;
    background-color: hsl(var(--hue), 71%, var(--end-l));
    background: linear-gradient(
      90deg,
      hsl(var(--hue), 71%, var(--start-l)) 0%,
      hsl(var(--hue), 71%, var(--end-l)) 100%
    );
    height: 100%;

    border-radius: 4px;
    border-left: 1px solid hsl(var(--hue), 71%, var(--start-l));
    border-right: 2px solid hsl(var(--hue), 71%, var(--end-l));

    overflow: hidden;
    white-space: nowrap;

    font-size: 16px;

    display: flex;
    justify-content: left;
    align-items: center;

    transition: 100ms box-shadow;
    user-select: none;
  }

  .event--selected {
    box-shadow: 0 0 0 2px hsla(var(--hue), 71%, var(--base-l), 0.5);
  }

  .event__text {
    padding-left: 2px;
    border-radius: 4px;
    padding: 2px;
    line-height: 1.2;
    background-color: #0002;
  }
</style>
