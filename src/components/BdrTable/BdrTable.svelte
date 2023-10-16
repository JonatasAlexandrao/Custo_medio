
<script>
  import { listBDR } from '../../stores/stores';
  import masc  from '../../functions/masc' 

  export let title = ""
  let maximize = false

  let tableHeader = ["Código", "produto", "Instituicao", "Conta", "codigoISIN", "tipo", "Escriturador", "Qtd.", "quantidadeDisponivel", "quantidadeIndisponivel", "motivo", "preçoFechamento", "valorAtualizado"]

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
          <tr>
            <td>{row.codigoNegociacao}</td>
            <td>{row.produto}</td>
            <td>{row.instituicao}</td>
            <td>{row.conta}</td>           
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
      minmax(13rem, 14rem) /*Codigo Negociação*/
      /*minmax(10rem, 14rem) /*Produto*/
      minmax(14rem, 18rem) /*Instituição*/
      minmax(10rem, 12rem) /*Conta*/
      /*minmax(10rem, 12rem) /*CNPJ*/
      minmax(12rem, 18rem) /*Escriturador*/
      minmax(12rem, 14rem) /*Qtd*/
      /*minmax(10rem, 12rem) /*Codigo ISIN*/
      /*minmax(7rem, 10rem)  /**/
      /*minmax(10rem, 15rem) /*Qtd Disponivel*/
      /*minmax(10rem, 15rem) /*Qtd Indisponivel*/
      /*minmax(10rem, 15rem) /*Motivo*/
      /*minmax(10rem, 15rem) /*Preço Fechamento*/
      /*minmax(10rem, 15rem) /*Valor Atualizado*/
    ;
  }

  
  /* ========== Exceções ============*/
  .table-base tr td:nth-child(3),
  .table-base tr td:nth-child(7) {
    font-size: 1.2rem;
  }

  .container-table-base .table-base tr th:nth-child(2),
  .container-table-base .table-base tr td:nth-child(2),
  .container-table-base .table-base tr th:nth-child(5),
  .container-table-base .table-base tr td:nth-child(5),
  .container-table-base .table-base tr th:nth-child(6),
  .container-table-base .table-base tr td:nth-child(6),
  .container-table-base .table-base tr th:nth-child(9),
  .container-table-base .table-base tr td:nth-child(9),
  .container-table-base .table-base tr th:nth-child(10),
  .container-table-base .table-base tr td:nth-child(10),
  .container-table-base .table-base tr th:nth-child(11),
  .container-table-base .table-base tr td:nth-child(11),
  .container-table-base .table-base tr th:nth-child(12),
  .container-table-base .table-base tr td:nth-child(12),
  .container-table-base .table-base tr th:nth-child(13),
  .container-table-base .table-base tr td:nth-child(13)
  {
    display: none;
  }
 
</style>

