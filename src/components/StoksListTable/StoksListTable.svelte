
<script>

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




<div class="container-table">
  <!-- <label for="">{acoesList()}</label> -->
  <button on:click={acoesList}>aaaaaa</button>
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

