
<script>
  
  export let tableInfo = []
  $: keys = tableInfo.length ? Object.keys(tableInfo[0]) : []

  let tableHeader = ["Data", "Movimentação", "Mercado", "Instituição", "Código", "Qtd", "Preço", "Valor", "CNPJ", "Nome no Pregão"]

  function realCurrenc(num) {
    const response = num.toLocaleString('pt-BR', {minimumFractionDigits: 2, maximumFractionDigits: 2})

    return response
  }
  
</script>




<div class="container-table">
    <table class="-table-base">
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
            <td>{realCurrenc(rows.preco)}</td>
            <td>{realCurrenc(rows.valor)}</td>
            <td>{rows.cnpj}</td>
            <td>{rows.nomePregao}</td>
          </tr>   
        {/each}
      </tbody>        
    </table>

</div>

<style>
  .container-table {
    overflow: auto;
  }
 
</style>

