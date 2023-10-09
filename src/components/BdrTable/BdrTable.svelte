
<script>
  import { listBDR } from '../../stores/stores';
  import masc  from '../../functions/masc' 

  export let title = ""
  let maximize = false

  let tableHeader = ["produto", "instituicao", "conta", "codigoNegociacao" , "cnpj", "codigoISIN", "tipo", "escriturador", "quantidade", "quantidadeDisponivel", "quantidadeIndisponivel", "motivo", "preçoFechamento", "valorAtualizado"]

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
      {#each $listBDR as row}
        {#if row.codigoNegociacao}
          <tr>
            <td>{row.produto}</td>
            <td>{row.instituicao}</td>
            <td>{row.conta}</td>
            <td>{row.codigoNegociacao}</td>
            <td>{row.cnpj}</td>
            <td>{row.codigoISIN}</td>
            <td>{row.tipo}</td>
            <td>{row.escriturador}</td>

            <td>{row.quantidade}</td>
            <td>{row.quantidadeDisponivel}</td>
            <td>{row.quantidadeIndisponivel}</td>
            <td>{row.motivo}</td>
            <td>{row.preçoFechamento}</td>
            <td>{row.valorAtualizado}</td>
            
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
      minmax(10rem, 14rem) /*Data*/
      minmax(13rem, 13rem) /*Movimentação*/
      /*minmax(10rem, 12rem) /*Mercado*/
      /*minmax(10rem, 12rem) /*PrazoVenc*/
      minmax(11rem, 20rem) /*Instituição*/
      minmax(10rem, 12rem) /*Código*/
      minmax(7rem, 10rem)  /*Qtd*/
      minmax(10rem, 15rem) /*Preço*/
      minmax(10rem, 15rem) /*Valor*/
    ;
  }

  
  /* ========== Exceções ============*/
  .table-base tr td:nth-child(5) {
    font-size: 1.2rem;
  }

  .container-table-base .table-base tr th:nth-child(3),
  .container-table-base .table-base tr td:nth-child(3),
  .container-table-base .table-base tr th:nth-child(4),
  .container-table-base .table-base tr td:nth-child(4) {
    display: none;
  }
 
</style>

