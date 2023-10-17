<script>
  import Card from "../../containers/Card/Card.svelte";
  import { listReport, searchReportCodes } from "../../stores/stores";
  import masc from "../../functions/masc";

  let selectComponent = ""
  let infoStocks = {}
  let divDeclaration
  $: inputCnpjFormated = masc.cnpj(infoStocks.cnpj)

  function searchStock() {

    if(selectComponent) {
      const list = $listReport.filter( element => element.codigoNegociacao == selectComponent)

      infoStocks = list.shift()
      
    }

  }

  function copyText(text="") {
    if(text) { 
      navigator.clipboard.writeText(text)
    }
  }

</script>

<div class="containerSelectStock">
  <select name="" id="selectStock" bind:value={selectComponent}>
    {#each $searchReportCodes as stocks}
      <option value={stocks}>{stocks}</option>
    {/each}
  </select>
  <button on:click={searchStock}>Buscar</button>
</div>



<Card>

  <div class="container-cnpj">
    <input type="text" bind:value={inputCnpjFormated} disabled>
    
    <button on:click={()=> copyText(inputCnpjFormated)}>Copiar</button>
  </div>

  <div class="declaration-text" bind:this={divDeclaration}>

    {infoStocks.quantidade} ações de - {infoStocks.produto} , ao custo unitário de R$ (custoUnitario) , em custódia na corretora {infoStocks.instituicao}

    <button on:click={()=> copyText(divDeclaration.innerText)}>Copiar</button>
  </div>

</Card>

<style>

  .containerSelectStock {
    display: flex;
    gap: 1rem;
    margin-bottom: 2rem;
  }

  .containerSelectStock #selectStock {
    width: 15rem;
    font-size: 1.8rem;
    padding: .3rem;
  }



  .container-cnpj {
    width: 100%;
    display: flex;
    gap: 1rem;
    margin-bottom: 2rem;
  }

  .declaration-text { 
    width: 100%;

    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    padding: 2rem;

    text-align: justify;
    border: .1rem solid #fff;
    border-radius: .5rem;

    background-color: rgba(0, 0, 0, 0.05);
  }

  .declaration-text > button {
    width: 10rem;
  }

</style>