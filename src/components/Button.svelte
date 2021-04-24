<script>
</script>

<button type="button" on:click><slot /></button>

<style>
  /* css reset from https://moderncss.dev/css-button-styling-guide/ */
  button {
    border: none;
    background-color: transparent;
    font-family: inherit;
    padding: 0;
    cursor: pointer;

    display: inline-flex;
    align-items: center;
    justify-content: center;

    background-color: var(--accent-1);
    color: #333;
    border-radius: 4px;
    /* box-shadow: 0 3px 1px rgba(0, 0, 0, 0.18); */

    padding: 0.25em 0.25em;
    /* min-width: 10ch; */
    /* min-height: 44px; */

    text-align: center;
    line-height: 1.1;

    font-size: 1.125em;

    transition: 50ms background-color;
  }

  button:hover {
    background-color: var(--accent-2);
  }

  button:active {
    background-color: var(--accent-3);
  }

  @media screen and (-ms-high-contrast: active) {
    button {
      border: 2px solid currentcolor;
    }
  }
</style>
