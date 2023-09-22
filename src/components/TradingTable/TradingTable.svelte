
<script>
  
  export let tableInfo = []
  $: keys = tableInfo.length ? Object.keys(tableInfo[0]) : []

  let tableHeader = ["Data", "Movimentação", "Mercado", "Instituição", "Código", "Qtd", "Preço", "Valor", "CNPJ", "Nome no Pregão"]

  
</script>




<div class="container-table">
    <table>
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
            {#each keys as key}
              <td>{rows[key]}</td>
            {/each}
          </tr>
        {/each}
     </tbody>        
    </table>

</div>

<style>
  .container-table {
    overflow: auto;
  }
  .container-table > table tr {
    display: grid;
    justify-content: center;

    grid-template-columns: minmax(10rem, 10% ) minmax(11rem, 10% ) minmax(10rem, 10% ) minmax(14rem, 14% ) minmax(10rem, 10% ) minmax(10rem, 10% ) minmax(10rem, 10% ) minmax(12rem, 12% ) minmax(15rem, 14%);
  }

  .container-table > table tr th {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .container-table > table td {
    align-items: center;
    text-align: center;

    display: flex;
    align-items: center;
    justify-content: center;
  }

  .container-table > table th:nth-child(2) {
    font-size: 1.3rem;
  }

  
  .container-table > table td:nth-child(3),
  .container-table > table td:nth-child(4),
  .container-table > table td:nth-child(9) {
    font-size: 1.4rem;
  }
   .container-table > table td:nth-child(10),
  .container-table > table th:nth-child(10) {
    display: none;
  } 
</style>

