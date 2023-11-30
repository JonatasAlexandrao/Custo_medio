<script>

  import masc from "../../../functions/masc";

  export let tableHeader = []
  export let filteredList = []

</script>

<table class="table-base table-info -average-price 3">
  <thead>
    <tr>
      {#each tableHeader as columns}
        <th>{columns}</th>
      {/each}
    </tr>
  </thead>
  <tbody>
    {#each filteredList as row}
      {#if row.codigoNegociacao}
        <tr>
          <td>{row.data}</td>
          <td>{row.tipoMovimentacao}</td>
          <td>{row.codigoNegociacao}</td>
          <td>{row.quantidade}</td>
          <td>{masc.realCurrency(row.preco)}</td>
          <td>{masc.realCurrency(row.valor)}</td>
        </tr> 
      {/if}  
    {/each}
    
  </tbody>        
</table>


<style>

  .-average-price {
    width: 100%;
    display: grid; 
    overflow: auto;
    margin-bottom: 2rem;
  }

  .table-info tr {
    display: grid;
    justify-content: center;
    grid-template-columns: 
      minmax(10rem, 14rem) /*Data*/
      minmax(13rem, 13rem) /*Movimentação*/
      minmax(10rem, 12rem) /*Código*/
      minmax(7rem, 10rem)  /*Qtd*/
      minmax(10rem, 15rem) /*Preço*/
      minmax(10rem, 15rem) /*Valor*/
    ;
  }
  
</style>