
<script>

  import masc from "$functions/masc";
  import TdData from "$Components/TdData/TdData.svelte";
  import FixErros from "./FixErrors/FixErros.svelte";

  export let negotiationByCode
  export let ListNegotiationCodes
  $: listCode = ListNegotiationCodes ? createListCode(negotiationByCode) : ""

  let filteredTable = negotiationByCode
  let select_filterCodigo
  let select_filterQtd
  let declarationText

  let quantidade = 0
  let valorTotal = 0
  let precoMedio = 0
  let codigoAcao = ""
  let instituicao = ""

  let tableHeaderCode = [ "Código", "Qtd", "Preço Médio", "Valor" ]

  let activeFixErrors = false

  function createListCode(list) {

    let arrayCode = []

    list.forEach(elem => {
      if(elem.quantidadeTotal > 0) {
        arrayCode.push(elem.codigo)
      }
    })

    return arrayCode
  }

  function getSelectedCodeInfo(array) {
    quantidade = array[0].quantidadeTotal
    valorTotal = array[0].valorTotal
    precoMedio = array[0].precoMedio
    codigoAcao = array[0].codigo
    instituicao = array[0].instituicao
    

  }

  function filterInfo() {
    let list = negotiationByCode

    if(select_filterCodigo) {
      list = list.filter(elem => elem.codigo === select_filterCodigo)
      
      getSelectedCodeInfo(list)     
    }

    if(select_filterQtd) {
      if(select_filterQtd === "true") {
        list = list.filter(elem => elem.quantidadeTotal > 0)
      }
      else if (select_filterQtd === "zero") {
        list = list.filter(elem => elem.quantidadeTotal == 0)
      }
      else if (select_filterQtd === "negative") {
        list = list.filter(elem => elem.quantidadeTotal < 0)
      }
      
    }

    filteredTable = list
  }

  function cleanFilters() {
    createListCode(ListNegotiationCodes)
    select_filterCodigo = ""
    select_filterQtd = ""
    filterInfo()

  }

  function copyText(text) {
    console.log("copyText", text)
    if(text) { 
      navigator.clipboard.writeText(text)
    }
  }


</script>
{#if activeFixErrors} 
  <FixErros listByCodes={negotiationByCode} tableHeaderCode={tableHeaderCode} bind:activeFixErrors={activeFixErrors}/>
{/if}

<div class="container-filter-settings">
  <span class="filter-codigo">
    <label for="filterCodigo">Código</label>
    <select name="" id="filterCodigo" bind:value={select_filterCodigo} on:change={filterInfo}>
      <option value=""></option>
      {#each listCode as codes}
        <option value="{codes}">{codes}</option>
      {/each}
    </select>
  </span>
  
  <span class="filter-quantidade">
    <label for="filterQuantidade">Quantidade</label>
    <select name="" id="filterQuantidade" bind:value={select_filterQtd} on:change={filterInfo}>
      <option value=""></option>
      <option value="true">Verdadeiro</option>
      <option value="zero">Falso</option>
      <option value="negative">Negativo</option>
    </select>
  </span>

  <div>
    <button class="btn" on:click={cleanFilters}>Limpar</button>
    <button class="btn -error" on:click={() => {activeFixErrors=!activeFixErrors}}>Corrigir Erros</button>
  </div>

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
      {#each filteredTable as stock}
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

{#if select_filterCodigo}
  <div class="declaration-text">
    <p bind:this={declarationText}>
      {quantidade} ações -- {codigoAcao}, ao custo unitário de R$ {precoMedio}, em custódia na corretora {instituicao}.
    </p>
    <button on:click={()=> copyText(declarationText.innerText)}>Copiar</button>
  </div>
{/if}



<style>

  .container-filter-settings {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(3, minmax(5rem, 15rem));
    margin-bottom: 1rem;
    justify-content: center;
    
  }

  .container-filter-settings span {
    height: 100%;
    border: .2rem solid #a3a3a3;
    border-collapse: collapse;

    padding: .5rem 1rem;
    
    display: flex;
    flex-direction: column;
   
  }
  .container-filter-settings .btn {
    width: 100%;
    margin: 0 1rem .5rem 1rem;
  }
  
  .container-table-base .table-base tr {
    display: grid;
    justify-content: center;  
  }

  .container-table-base .table-base tr td {
    cursor: pointer;
  }

  .container-table-base.-codes-table .table-base tr{
    grid-template-columns: 
      minmax(10rem, 14rem) /*1 Posicao*/
      minmax(10rem, 14rem) /*1 Posicao*/
      minmax(10rem, 14rem) /*1 Posicao*/
      minmax(10rem, 14rem) /*1 Posicao*/
    ;
  }

  .declaration-text {
    
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    border: .2rem solid #a3a3a3;
    border-radius: .2rem;

    margin-top: 1rem;
    padding: 2rem;
    
  }

  .declaration-text > p {
    text-align: justify;
    margin-bottom: 1rem;
  }

  /* ========== Exceções ============*/
  

</style>