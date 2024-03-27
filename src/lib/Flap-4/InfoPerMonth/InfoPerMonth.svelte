<script>

  import mask from "$functions/mask";
  import TdData from "$Components/TdData/TdData.svelte";
  import { TOTAL_SALES_MONTH, TOTAL_PROFIT_MONTH, DAY_TRADE_PER_MONTH } from '$store/store'

  const salesMonth = $TOTAL_SALES_MONTH
  const profitMonth = $TOTAL_PROFIT_MONTH
  const profitDayTrade = totalProfit($DAY_TRADE_PER_MONTH) 
  const months = [
    "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
  ]
  const tableHeader = [
    "Mes", "Venda Total", "Lucro Total", "Lucro DayTrade"
  ]

  function totalProfit(datas) {
    let res = ""
    if(datas) {
      res = datas.map((el) => {
        return el.totalLucro
      })
    }
    
    return res
  }

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
          <TdData data={month}/>
          <TdData data={mask.realCurrency(salesMonth[index])}/>
          <TdData data={mask.realCurrency(profitMonth[index])}/>
          <TdData data={mask.realCurrency(profitDayTrade[index])}/>
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