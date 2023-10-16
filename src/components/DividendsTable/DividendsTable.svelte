
<script>
  import { listDividends } from '../../stores/stores';
  import masc  from '../../functions/masc' 

  export let title = ""
  let maximize = false

  let tableHeader = ["Código", "Tipo", "Valor"]

</script>


<div class="trading-table-title">
  <h2>{title}</h2>
  <button on:click={ () => maximize = !maximize }>Abrir/fechar</button>
</div>

<div class="container-table-base" class:-active={maximize}>

  <table class="table-base">
    <thead>
      <tr>
        {#each tableHeader as columns}
          <th>{columns}</th>
        {/each}
      </tr>
    </thead>
    <tbody>
      {#each $listDividends as row}
        {#if row.produto}
          <tr>
            <td>{row.produto}</td>
            <td>{row.tipoEvento}</td>
            <td>{masc.realCurrency(row.valorLiquido)}</td>
          </tr> 
        {/if}  
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

  .container-table-base .table-base tr {
    display: grid;
    justify-content: center;
    grid-template-columns: 
      minmax(18rem, 35rem) /*Produto*/
      minmax(13rem, 20rem) /*Tipo Evento*/
      minmax(10rem, 12rem) /*Valor Liquido*/

    ;
  }

  
  /* ========== Exceções ============*/
  .table-base tr td:nth-child(5) {
    font-size: 1.2rem;
  }

  /*.container-table-base .table-base tr th:nth-child(3),
  .container-table-base .table-base tr td:nth-child(3),
  .container-table-base .table-base tr th:nth-child(4),
  .container-table-base .table-base tr td:nth-child(4) {
    display: none;
  }*/
 
</style>

