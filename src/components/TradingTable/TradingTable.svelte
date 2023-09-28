
<script>
  
  export let tableInfo = []
  let title = "Tabela Completa"
  let maximize = false

  let tableHeader = ["Data", "Movimentação", "Mercado", "Instituição", "Código", "Qtd", "Preço", "Valor", "CNPJ", "Nome no Pregão"]

  function realCurrency(num) {
    const response = num.toLocaleString('pt-BR', {minimumFractionDigits: 2, maximumFractionDigits: 2})

    return response
  }


  
</script>


<div class="trading-table-title">
  <h2>{title}</h2>
  <button on:click={ () => maximize = !maximize }>Abrir/fechar</button>
</div>

<div class="container-table" class:-active={maximize}>

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
        <tr>
          <td>{rows.data}</td>
          <td>{rows.tipoMovimentacao}</td>
          <td>{rows.mercado}</td>
          <td>{rows.instituicao}</td>
          <td>{rows.codigoNegociacao}</td>
          <td>{rows.quantidade}</td>
          <td>{realCurrency(rows.preco)}</td>
          <td>{realCurrency(rows.valor)}</td>
          <td>{rows.cnpj}</td>
          <td>{rows.nomePregao}</td>
        </tr>   
      {/each}
    </tbody>        
  </table>

</div>

<style>

  .trading-table-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
    width: 100%;
  }
  .container-table {
    width: 100%;
    height: 0;
    display: grid;

    overflow: hidden;
    
  }

  .container-table.-active {
    height: auto;
    overflow: auto;
  }

  .container-table .table-base {
    justify-self: center;
  }

  .container-table .table-base tr {
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
 
</style>

