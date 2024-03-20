<script>
  import TdData from "$Components/TdData/TdData.svelte";
  import masc from "$functions/masc";

  export let listByCodes = []
  export let tableHeaderCode = []
  export let activeFixErrors = true
 
  $: listNegativeCodes = listByCodes ? createListNegativeCodes() : []

  function createListNegativeCodes() {
    return listByCodes.filter((elem) => elem.quantidadeTotal < 0 )
  }

  function handleClick() {
    console.log(listNegativeCodes)
    activeFixErrors = !activeFixErrors
  }

</script>


<div class="container-background">
  <button on:click={handleClick}>aaaa</button>
</div>

<div class="container-table-base -codes-table">

  <table class="table-base">
    <thead>
      <tr>
        {#each tableHeaderCode as columns}
          <th>{columns}</th>
        {/each}
      </tr>
    </thead>
    <tbody>
      {#each listNegativeCodes as stock}
      <tr>
        <TdData data={stock.codigo}/>
        <TdData data={stock.quantidadeTotal}/>
        <TdData data={masc.realCurrency(stock.precoMedio)}/>
        <TdData data={masc.realCurrency(stock.valorTotal)}/>
      </tr>
      {/each}
        

    </tbody>        
  </table>

</div>

<style>
.container-background {
  
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 99999;
  background-color: rgba(0, 0, 0, .5);
}

</style>