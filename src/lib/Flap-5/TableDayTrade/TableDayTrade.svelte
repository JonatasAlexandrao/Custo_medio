<script>

  import StockBox from './StockBox/StockBox.svelte';
  import { DAY_TRADE } from '$store/store'
  
  let filteredTable = $DAY_TRADE

</script>


<div class="container-table-base">

  {#each filteredTable as stock}
    <StockBox stock={stock} />
  {/each}

</div>

