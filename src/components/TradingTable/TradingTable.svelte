
<script>
  export let className = ""
  export let tableHeader = []
  export let tableInfo = []
  $: keys = tableInfo.length ? Object.keys(tableInfo[0]) : []

  
</script>




<div class={className}>
    <table>
     <thead>
      <tr>
        {#each tableHeader as columns}
          <th>{columns}</th>
        {/each}
      </tr>
     </thead>
     <tbody>
      {#each tableInfo as rows}
          <tr>
            {#each keys as key}
              <td>{rows[key]}</td>
            {/each}
          </tr>
        {/each}
     </tbody>        
    </table>

</div>

