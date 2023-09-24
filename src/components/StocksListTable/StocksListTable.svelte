
<script>

  export let title = "Tabela das Ações"
  export let tableInfo = []
  $: table = tableInfo
  let stocksListInfo = []
  const stocksListHeader = ["Num","Ações", "Quantidade", "Preço Médio", "Valor Total"]


  function stocksList() {

    let list = table.map( el => { return el.codigoNegociacao })
    stocksListInfo = [ ...new Set(list)]

  }

  function sumOfQuantity(stock) {

    const response = tableInfo.reduce( (previous, current) => {
      return current.codigoNegociacao == stock ? previous + current.quantidade : previous 
    }, 0)

    return response
  }

  function totalInvestment(stock) {

    const response = tableInfo.reduce( (previous, current) => {
      return current.codigoNegociacao == stock ? previous + current.valor : previous 
    }, 0)

    const responseFormated = response.toLocaleString('pt-BR', {minimumFractionDigits: 2, maximumFractionDigits: 2})

    return responseFormated

  }

  function averagePrice(stock) {

    const f1 = tableInfo.reduce( (previous, current) => {
      return current.codigoNegociacao == stock ? previous + (current.quantidade * current.preco) : previous 
    }, 0)

    const f2 = sumOfQuantity(stock)

    const response = (f1/f2)
    const responseFormated = response.toLocaleString('pt-BR', {minimumFractionDigits: 2, maximumFractionDigits: 2})

    return responseFormated

  }

</script>




<div class="container-stocks-list-table">
  <div class="title">
    <h2>{title}</h2>
    <button on:click={stocksList}>Ativar</button>
  </div>
    <table>
      <thead>
        <tr>
          {#each stocksListHeader as columns}
            <th>{columns}</th>
          {/each}
        </tr>
      </thead>
      <tbody>
        {#each stocksListInfo as stocks, index}
          <tr>
            <td>{index+1}</td>
            <td>{stocks}</td>
            <td>{sumOfQuantity(stocks)}</td>
            <td>{averagePrice(stocks)}</td>
            <td>{totalInvestment(stocks)}</td>
          </tr>
        {/each}
      </tbody>
    </table>

</div>

<style>
  .title {
    display: flex;
    justify-content: space-between;
    margin-bottom: 1rem;
  }

  .container-stocks-list-table { overflow: auto; }

  .container-stocks-list-table > table tr { 
    display: grid;
    justify-content: center;
    grid-template-columns: minmax(7rem, 10rem) minmax(10rem, 15rem) minmax(10rem, 15rem) minmax(10rem, 15rem) minmax(10rem, 15rem);
  }

  .container-stocks-list-table > table tr th {
    display: flex;
    justify-content: center;
    align-items: center;
  }


</style>

