<script>
  import Card from "../../containers/Card/Card.svelte";
  import { listReport, searchReportCodes } from "../../stores/stores";

  let selectComponent = ""
  let infoStocks = {}

  function searchStock() {


    if(selectComponent) {
      const list = $listReport.filter( element => element.codigoNegociacao == selectComponent)

      infoStocks = list.shift()
      
    }

    


  }

</script>

<div>
  <select name="" id="" bind:value={selectComponent}>
    {#each $searchReportCodes as stocks}
      <option value={stocks}>{stocks}</option>
    {/each}
  </select>
  <button on:click={searchStock}>Buscar</button>
</div>



<Card>
  <div class="declaracao-texto">

    CNPJ: {infoStocks.cnpj}
    <br>

    {infoStocks.quantidade} ações de - {infoStocks.produto} , ao custo unitário de R$ (custoUnitario) , em custódia na corretora {infoStocks.instituicao}
  </div>
</Card>