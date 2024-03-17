
<script>

  export let containerClass = ""
  export let forId = ""
  export let textLabel = ""
  export let selectValue
  export let filterInfo
  export let options = ""

</script>

<span class={containerClass}>
  <label for={forId}>{textLabel}</label>
  <select id={forId} bind:value={selectValue} on:change={filterInfo}>
    {#if options}   
      {#each options as option}   
        <option value={option.value}>{option.text}</option>
      {/each}
    {/if}
  </select>
</span>




<style>

  span {
    border: .2rem solid #a3a3a3;
    border-collapse: collapse;

    padding: .5rem 1rem;
    
    display: flex;
    flex-direction: column;
  }

</style>