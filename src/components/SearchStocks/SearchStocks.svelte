<script>
  
  export let tableInfo = []
  $: stockList = createStocksList(tableInfo)

  let tableHeader = ["Data", "Movimentação", "Mercado", "Instituição", "Código", "Qtd", "Preço", "Valor", "CNPJ", "Nome no Pregão"]

  let textToSearch = ""
  //$: filterTable = textToSearch
  let infoStocks = {
    cnpj: "",
    codigoNegociacao: "",
    instituicao: "",
    mercado: "",
    nomePregao: "",
    precoMedio: 0,
    quantidadeTotal: ""
  }
  //let stocksListInfo = []
  let selectComponent 

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

  function totalInvestment(stocks) {

    const response = tableInfo.reduce( (previous, current) => {
      return current.codigoNegociacao == stocks ? previous + current.valor : previous 
    }, 0)

    return parseFloat(response.toFixed(2))

  }

  function averagePrice(stocks) {

    const f1 = tableInfo.reduce( (previous, current) => {
      return current.codigoNegociacao == stocks ? previous + (current.quantidade * current.preco) : previous 
    }, 0)

    const f2 = sumOfQuantity(stocks)

    const response = (f1/f2)

    return parseFloat(response.toFixed(2))

  }

  function searchForStockInfo() {
    const info = tableInfo.find( item => item.codigoNegociacao == textToSearch)

    infoStocks = {
      cnpj: info.cnpj,
      codigoNegociacao: info.codigoNegociacao,
      instituicao: info.instituicao,
      mercado:info.mercado,
      nomePregao: info.nomePregao,
      precoMedio: averagePrice(info.codigoNegociacao),
      quantidadeTotal: sumOfQuantity(info.codigoNegociacao)
    }

    console.log("infoAcao", infoStocks)
  }


  function searchForStocks() {
    if (selectComponent.value) {
      textToSearch = selectComponent.value
      searchForStockInfo()
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

  <div class="container-search-stocks">
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
          {#if rows.codigoNegociacao == textToSearch}
            <tr>
              <td>{rows.data}</td>
              <td>{rows.tipoMovimentacao}</td>
              <td>{rows.mercado}</td>
              <td>{rows.instituicao}</td>
              <td>{rows.codigoNegociacao}</td>
              <td>{rows.quantidade}</td>
              <td>{rows.preco}</td>
              <td>{rows.valor}</td>
              <td>{rows.cnpj}</td>
              <td>{rows.nomePregao}</td>
            </tr>     
          {/if}
        {/each}
      </tbody>        
    </table>
    <br>
    <table>
      <thead>
        <tr>
          <th>Quantidade</th>
          <th>Preço Médio</th>
          <th>Valor Total</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{sumOfQuantity(textToSearch)}</td>
          <td>{averagePrice(textToSearch)}</td>
          <td>{totalInvestment(textToSearch)}</td>
        </tr>
      </tbody>
    </table>

    <div class="declaracao-texto">
      {sumOfQuantity(textToSearch)} ações -- {textToSearch} -- de {infoStocks.nomePregao}, sendo que 10 ações são de bonificações em 2022, ao custo unitário de R$ {averagePrice(textToSearch)} , em custódia na corretora {infoStocks.instituicao}
    </div>

  </div>

</div>