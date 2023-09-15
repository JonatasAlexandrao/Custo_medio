
<script>
  export let tableHeader = []
  export let tableInfo = []
</script>




<div class="container-table">
  <h1>{tableInfo}</h1>

    <table>
     <thead>
      <tr>
        {#each tableHeader as cell}
          <th>{cell}</th>
        {/each}
      </tr>
     </thead>
     <tbody>
      {#each tableInfo as cell}
          <tr>
            <td>{cell.data}</td>
            <td>{cell.tipoMovimentacao}</td>
            <td>{cell.mercado}</td>
            <td>{cell.instituicao}</td>
            <td>{cell.codigoNegociacao}</td>
            <td>{cell.quantidade}</td>
            <td>{cell.preco}</td>
            <td>{cell.valor}</td>
            <td>{cell.cnpj}</td>
            <td>{cell.nomePregao}</td>
          </tr>
        {/each}
     </tbody>        
    </table>

</div>

