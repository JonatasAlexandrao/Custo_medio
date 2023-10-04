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
  let maximize = false

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


  <div class="search-stocks-title">
    <div>
      <select name="" id="" bind:this={selectComponent}>
        {#each stockList as stocks}
          <option value={stocks}>{stocks}</option>
        {/each}
      </select>
      <button on:click={searchForStocks}>Pesquisar</button>
    </div>
    
    <button on:click={()=> maximize = !maximize}>Abrir/Fechar</button>
  </div>

  <div class="container-search-stocks" class:-active={maximize}>
    <div class="container-table">
      <table class="table-base">
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
    </div>

    <div class="calculations-table">
      <table >
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
  .search-stocks-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
    width: 100%;
  }


  .container-search-stocks {
    width: 100%;
    height: 0;
    display: grid;
    gap: 2rem;

    overflow: hidden;
  }

  .container-search-stocks.-active {
    height: auto;
  }

  .container-table {
    width: 100%;
    height: 100%;
    display: grid;
    overflow: auto;
  }

  .container-table .table-base {
    justify-self: center;
  }

  .container-table .table-base tr{
    display: grid;
    justify-content: center;
    grid-template-columns: 
      minmax(10rem, 14rem) /*Data*/
      minmax(13rem, 13rem) /*Movimentação*/
      /*minmax(10rem, 12rem) /*Mercado*/
      minmax(11rem, 20rem) /*Instituição*/
      minmax(10rem, 12rem) /*Código*/
      minmax(7rem, 10rem)  /*Qtd*/
      minmax(10rem, 15rem) /*Preço*/
      minmax(10rem, 15rem) /*Valor*/
      minmax(15rem, 15rem) /*cnpj*/
      /*minmax(18rem, 25rem) /*Nome no Pregão*/
    ;
  }

  .container-table .table-base tr td {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .container-table .table-base tr:hover {
    background-color: rgba(163, 163, 163, .3);
  }

  .container-table .table-base tr td:nth-child(4),
  .table-base tr td:nth-child(9) {
    font-size: 1.2rem;
  }

  .container-table .table-base tr th:nth-child(3),
  .container-table .table-base tr td:nth-child(3),
  .container-table .table-base tr th:nth-child(10),
  .container-table .table-base tr td:nth-child(10) {
    display: none;
  }

  .calculations-table {
    width: 100%;
  }

  .calculations-table table {
    width: 100%;
  }

  .calculations-table table tr {
    display: grid;
    justify-content: center;
    grid-template-columns: 
      minmax(12rem, 25rem) /*Quantidade*/
      minmax(12rem, 25rem) /*Preço Médio*/
      minmax(12rem, 25rem) /*Valor Total*/
    ;
  }

  .calculations-table tbody tr td {
    cursor: pointer;
    font-size: 2rem;
    font-weight: 700;
  }
  .calculations-table tbody tr td:hover {
    background-color: rgba(163, 163, 163, .3);
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



  

  

</style>