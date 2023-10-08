
<script>
  import { listReport } from '../../stores/stores';
  import masc from '../../functions/masc' 

  export let title = ""
  let maximize = false

  let tableHeader = ["Produto", "Instituição", "Conta", "Código", "CNPJ", "codigoISIN", "Tipo", "Escriturador", "Qtd", "quantidadeDisponivel",  "quantidadeIndisponivel", "motivo", "preçoFechamento", "valorAtualizado"]

</script>


<div class="report-table-title">
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
      {#each $listReport as row}
        {#if row.codigoNegociacao}
        
          <tr>
            <td>{row.produto}</td>
            <td>{row.instituicao}</td>
            <td>{row.conta}</td>
            <td>{row.codigoNegociacao}</td>
            <td>{masc.cnpj(row.cnpj)}</td>
            <td>{row.codigoISIN}</td>
            <td>{row.tipo}</td> 
            <td>{row.escriturador}</td>
            <td>{row.quantidade}</td>

            <td>{row.quantidadeDisponivel}</td> 
            <td>{row.quantidadeIndisponivel}</td>
            <td>{row.motivo}</td>

            <td>{masc.realCurrency(row.preçoFechamento)}</td>
            <td>{masc.realCurrency(row.valorAtualizado)}</td>
          </tr>   
          
        {/if}
      {/each}
    </tbody>        
  </table>

</div>

<style>

  .report-table-title {
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
      /*minmax(10rem, 14rem) /*Produto*/
      minmax(15rem, 20rem) /*Instituição*/
      minmax(10rem, 12rem) /*Conta*/
      minmax(10rem, 12rem) /*Codigo*/
      minmax(17rem, 20rem) /*CNPJ*/
      /*minmax(7rem, 10rem)  /*codigo ISIN*/
      /*minmax(10rem, 15rem) /*Tipo*/
      /*minmax(10rem, 15rem) /*Escriturador*/
      minmax(7rem, 10rem) /*Quantidade*/
      /*minmax(18rem, 25rem) /*Qtd Disponivel*/
      /*minmax(18rem, 25rem) /*Qtd Indisponivel*/
      /*minmax(18rem, 25rem) /*Motivo*/
      /*minmax(10rem, 15rem) /*Preço fechamento*/
      /*minmax(10rem, 15rem) /*Valor Atualizado*/
    ;
  }

  /* ========== Exceções ============*/

  .table-base tr td:nth-child(2) {
    font-size: 1.2rem;
  }

  .container-table-base .table-base tr th:nth-child(1),
  .container-table-base .table-base tr td:nth-child(1),
  .container-table-base .table-base tr th:nth-child(6),
  .container-table-base .table-base tr td:nth-child(6),
  .container-table-base .table-base tr th:nth-child(7),
  .container-table-base .table-base tr td:nth-child(7),
  .container-table-base .table-base tr th:nth-child(8),
  .container-table-base .table-base tr td:nth-child(8),
  .container-table-base .table-base tr th:nth-child(10),
  .container-table-base .table-base tr td:nth-child(10),
  .container-table-base .table-base tr th:nth-child(11),
  .container-table-base .table-base tr td:nth-child(11),
  .container-table-base .table-base tr th:nth-child(12),
  .container-table-base .table-base tr td:nth-child(12),
  .container-table-base .table-base tr th:nth-child(13),
  .container-table-base .table-base tr td:nth-child(13),
  .container-table-base .table-base tr th:nth-child(14),
  .container-table-base .table-base tr td:nth-child(14) {
    display: none;
  }
 
</style>

