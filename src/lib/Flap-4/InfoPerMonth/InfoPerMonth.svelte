<script>

  import masc from "$functions/masc";
  import { TOTAL_SALES_MONTH, TOTAL_PROFIT_MONTH, DAY_TRADE_PER_MONTH } from '$store/store'
  import TableRow from "./TableRow/TableRow.svelte";

  const salesMonth = $TOTAL_SALES_MONTH
  const profitMonth = $TOTAL_PROFIT_MONTH
  const profitDayTrade = $DAY_TRADE_PER_MONTH
  const months = [
    "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
  ]
  const tableHeader = [
    "Mes", "Venda Total", "Lucro Total", "Lucro DayTrade"
  ]

</script>

<div class="container-table-base -infoPerMonth">
  
  <table class="table-base">
    <thead>
      <tr>
        {#each tableHeader as columns}
          <th>{columns}</th>
        {/each}
      </tr>
    </thead>
    <tbody>
      {#each months as month, index}
        <tr>
          <TableRow data={month}/>
          <TableRow data={masc.realCurrency(salesMonth[index])}/>
          <TableRow data={masc.realCurrency(profitMonth[index])}/>
          <TableRow data={masc.realCurrency(profitDayTrade[index].totalLucro)}/>
        </tr>
      {/each}
      
    </tbody>        
  </table>

</div>

<style>
  .container-table-base .table-base tr {
    display: grid;
    justify-content: center;  
  }

  .container-table-base.-infoPerMonth .table-base tr{
    grid-template-columns: repeat(4, minmax(10rem, 1fr));
  }
</style>