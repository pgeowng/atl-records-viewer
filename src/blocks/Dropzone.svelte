<script>
  import { createEventDispatcher } from 'svelte'
  const dispatcher = createEventDispatcher()

  function handleDrop(e) {
    e.preventDefault()
    if (e.dataTransfer.items) {
      for (let i = 0; i < e.dataTransfer.items.length; i++) {
        if (e.dataTransfer.items[i].kind === 'file') {
          const file = e.dataTransfer.items[i].getAsFile()
          dispatcher('data', file)
        }
      }
    } else {
      for (let i = 0; i < e.dataTransfer.files.length; i++) {
        const file = e.dataTransfer.files[i]
        dispatcher('data', file)
      }
    }
  }

  function handleDragOver() {}
</script>

<div
  class="dropzone"
  on:drop|preventDefault={handleDrop}
  on:dragover|preventDefault={handleDragOver}
>
  <p>Drag .csv file from Awesome Time Logger App...</p>
</div>

<style>
  .dropzone {
    border: 2px dashed #ddd;

    height: 100px;

    padding: 20px;
    text-align: center;

    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
