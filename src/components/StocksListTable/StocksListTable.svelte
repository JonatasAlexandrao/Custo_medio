
<script>

  export let title = "Tabela das Ações"
  export let tableInfo = []
  $: table = tableInfo
  export let stocksListInfo = []
  const stocksListHeader = ["Num","Ações", "Quantidade", "Preço Médio", "Valor Total"]


  function acoesList() {

    let list = table.map( el => { return el.codigoNegociacao })
    stocksListInfo = [ ...new Set(list)]

  }

  function sumOfQuantity(acao) {

    const response = tableInfo.reduce( (previous, current) => {
      return current.codigoNegociacao == acao ? previous + current.quantidade : previous 
    }, 0)

    return response
  }

  function totalInvestment(acao) {

    const response = tableInfo.reduce( (previous, current) => {
      return current.codigoNegociacao == acao ? previous + current.valor : previous 
    }, 0)

    return parseFloat(response.toFixed(2))

  }

  function averagePrice(acao) {

    const f1 = tableInfo.reduce( (previous, current) => {
      return current.codigoNegociacao == acao ? previous + (current.quantidade * current.preco) : previous 
    }, 0)

    const f2 = sumOfQuantity(acao)

    const response = (f1/f2)

    return parseFloat(response.toFixed(2))

  }

</script>




<div class="container-stocks-list-table">
  <div class="title">
    <h2>{title}</h2>
    <button on:click={acoesList}>Ativar</button>
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

