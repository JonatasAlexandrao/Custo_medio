<script>
  
  export let tableInfo = []
  $: stockList = createStocksList(tableInfo)

  let tableHeader = ["Data", "Movimentação", "Mercado", "Instituição", "Código", "Qtd", "Preço", "Valor", "CNPJ", "Nome no Pregão"]

  let textToSearch = ""
  let infoStocks = {
    cnpj: "",
    codigoNegociacao: "",
    instituicao: "",
    mercado: "",
    nomePregao: "",
    precoMedio: "",
    quantidadeTotal: ""
  }
  let selectComponent
  let declarationText 

  let quantity = "00"
  let averagePrice = "00,00"
  let totalInvestment = "00,00"

  function searchForStocks() {
    if (selectComponent.value) {
      textToSearch = selectComponent.value
      searchForStockInfo()
      quantity = sumOfQuantity(textToSearch)
      averagePrice = calcTotalInvestment(textToSearch)
      totalInvestment = calcAveragePrice(textToSearch)
    }
  }

  function createStocksList(table) {

    const list = table.map( el => { return el.codigoNegociacao })
    const stocksListInfo = [ ...new Set(list)]
    return stocksListInfo

  }

  function sumOfQuantity(stocks) {

    const response = tableInfo.reduce( (previous, current) => {
      return current.codigoNegociacao == stocks ? previous + current.quantidade : previous 
    }, 0)

    return response
  }

  function calcTotalInvestment(stocks) {

    const response = tableInfo.reduce( (previous, current) => {
      return current.codigoNegociacao == stocks ? previous + current.valor : previous 
    }, 0)

    return realCurrenc(response)

  }

  function calcAveragePrice(stocks) {

    const f1 = tableInfo.reduce( (previous, current) => {
      return current.codigoNegociacao == stocks ? previous + (current.quantidade * current.preco) : previous 
    }, 0)

    const f2 = sumOfQuantity(stocks)

    const response = (f1/f2)

    return realCurrenc(response)

  }

  function searchForStockInfo() {
    const info = tableInfo.find( item => item.codigoNegociacao == textToSearch)

    infoStocks = {
      cnpj: info.cnpj,
      codigoNegociacao: info.codigoNegociacao,
      instituicao: info.instituicao,
      mercado:info.mercado,
      nomePregao: info.nomePregao,
      precoMedio: calcAveragePrice(info.codigoNegociacao),
      quantidadeTotal: sumOfQuantity(info.codigoNegociacao)
    }

    console.log("infoAcao", infoStocks)
  }

  function realCurrenc(num) {
    const response = num.toLocaleString('pt-BR', {minimumFractionDigits: 2, maximumFractionDigits: 2})

    return response
  }

  function copyText(text="") {
    if(text) { 
      navigator.clipboard.writeText(text)
    }
  }



</script>

<div>
  <!-- <input type="text" name="" id="" bind:value={textToSearch}> -->
  <select name="" id="" bind:this={selectComponent}>
    {#each stockList as stocks}
      <option value={stocks}>{stocks}</option>
    {/each}
  </select>
  <button on:click={searchForStocks}>Buscar</button>

  <div class="container-search-stocks container-table">
    <table class="-table-base">
      <thead>
        <tr>
          {#each tableHeader as columns}
            <th>{columns}</th>
          {/each}
        </tr>
      </thead>
      <tbody>
        {#each tableInfo as rows}
          {#if rows.codigoNegociacao == textToSearch}
            <tr>
              <td>{rows.data}</td>
              <td>{rows.tipoMovimentacao}</td>
              <td>{rows.mercado}</td>
              <td>{rows.instituicao}</td>
              <td>{rows.codigoNegociacao}</td>
              <td>{rows.quantidade}</td>
              <td>{realCurrenc(rows.preco)}</td>
              <td>{realCurrenc(rows.valor)}</td>
              <td>{rows.cnpj}</td>
              <td>{rows.nomePregao}</td>
            </tr>     
          {/if}
        {/each}
      </tbody>        
    </table>    
 

    <table class="calculations-table">
      <thead>
        <tr>
          <th>Quantidade</th>
          <th>Preço Médio</th>
          <th>Valor Total</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td on:click={() => copyText(quantity)}>{quantity}</td>
          <td on:click={() => copyText(averagePrice)}>{averagePrice}</td>
          <td on:click={() => copyText(totalInvestment)}>{totalInvestment}</td>
        </tr>
      </tbody>
    </table>
  </div>
  

  <div class="declaration-text">
    <p bind:this={declarationText}>
      {quantity} ações -- {textToSearch} -- de {infoStocks.nomePregao}, ao custo unitário de R$ {averagePrice}, em custódia na corretora {infoStocks.instituicao}.
    </p>
    <button on:click={()=> copyText(declarationText.innerText)}>Copiar</button>
  </div>

  

</div>

<style>
  .container-search-stocks {
    overflow: auto;
    margin-bottom: 2rem;

    
  }

  .container-table {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    gap: 2rem;
    justify-content: center;
  }

  .calculations-table {
    margin-bottom: 2rem;
  }
  .declaration-text {
    padding: 2rem;
    border: .2rem solid #a3a3a3;
    border-radius: .2rem;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .declaration-text > p {
    text-align: justify;
    margin-bottom: 1rem;
  }

  .calculations-table {
    width: 100%;
  }

  .calculations-table tbody > tr td {
    cursor: pointer;

  }
  .calculations-table tbody > tr td:hover {
    background-color: rgba(163, 163, 163, .3);
  }

  

</style>