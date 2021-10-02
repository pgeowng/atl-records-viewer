<script>
  const now = new Date()
  export let value = `${now.getFullYear()}-${('0' + (now.getMonth() + 1)).slice(
    -2
  )}-${('0' + now.getDate()).slice(-2)}`
  $: console.log(value)
</script>

<input type="date" bind:value />

<style>
  input {
    background-color: var(--accent-3);

    border: none;
    border-radius: 4px;

    font-family: inherit;
    font-size: 1.1em;

    padding: 0.25em;
    min-width: 15ch;
    line-height: 1.1;

    outline: none;
  }

  input:hover,
  input:focus {
    background-color: var(--accent-2);
  }
</style>
