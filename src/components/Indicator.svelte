<script>
  export let minWidth
</script>

<span style={minWidth != null ? 'min-width:' + minWidth : ''}><slot /></span>

<style>
  span {
    display: inline-flex;
    align-items: center;
    justify-content: center;

    background-color: var(--accent-3);
    color: #333;
    border-radius: 4px;

    padding: 0.25em;
    text-align: center;
    font-size: 1em;

    transition: 50ms background-color;
  }

  span:hover {
    background-color: var(--accent-2);
  }
</style>
