
<script>
  import { list } from '../../stores/stores';

  export let title = ""
  let maximize = false

  let tableHeader = ["Produto", "Instituição", "Conta", "Código", "CNPJ", "codigoISIN", "Tipo", "Escriturador", "Quantidade", "quantidadeDisponivel",  "quantidadeIndisponivel", "motivo", "preçoFechamento", "valorAtualizado"]

  function realCurrency(num) {
    if(num) {
      return num.toLocaleString('pt-BR', {minimumFractionDigits: 2, maximumFractionDigits: 2})
    }
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
      {#each $list as row}
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

          <td>{realCurrency(row.preçoFechamento)}</td>
          <td>{realCurrency(row.valorAtualizado)}</td>
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
      /*minmax(10rem, 14rem) /*Produto*/
      minmax(13rem, 13rem) /*Instituição*/
      minmax(10rem, 12rem) /*Conta*/
      minmax(11rem, 20rem) /*Codigo*/
      minmax(10rem, 12rem) /*CNPJ*/
      /*minmax(7rem, 10rem)  /*codigo ISIN*/
      /*minmax(10rem, 15rem) /*Tipo*/
      /*minmax(10rem, 15rem) /*Escriturador*/
      minmax(15rem, 15rem) /*Quantidade*/
      /*minmax(18rem, 25rem) /*Qtd Disponivel*/
      /*minmax(18rem, 25rem) /*Qtd Indisponivel*/
      /*minmax(18rem, 25rem) /*Motivo*/
      minmax(18rem, 25rem) /*Preço fechamento*/
      minmax(18rem, 25rem) /*Valor Atualizado*/
    ;
  }

  .container-table .table-base tr:hover {
    background-color: rgba(163, 163, 163, .3);
  }

  .container-table .table-base tr td:nth-child(4),
  .table-base tr td:nth-child(9) {
    font-size: 1.2rem;
  }

  .container-table .table-base tr th:nth-child(1),
  .container-table .table-base tr td:nth-child(1),
  .container-table .table-base tr th:nth-child(6),
  .container-table .table-base tr td:nth-child(6),
  .container-table .table-base tr th:nth-child(7),
  .container-table .table-base tr td:nth-child(7),
  .container-table .table-base tr th:nth-child(8),
  .container-table .table-base tr td:nth-child(8),
  .container-table .table-base tr th:nth-child(10),
  .container-table .table-base tr td:nth-child(10),
  .container-table .table-base tr th:nth-child(11),
  .container-table .table-base tr td:nth-child(11),
  .container-table .table-base tr th:nth-child(12),
  .container-table .table-base tr td:nth-child(12) {
    display: none;
  }
 
</style>

