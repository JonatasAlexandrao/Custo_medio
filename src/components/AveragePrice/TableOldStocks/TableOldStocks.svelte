<script>

  export let arrayOldStocks
  export let calculationInfos

  function removeItem(index) {

    arrayOldStocks.splice(index, 1)
    arrayOldStocks = arrayOldStocks
    calculationInfos()
    
  }

</script>

<table class="table-base -average-price 2">
  <tr class="old-stocks">
    <th>Ano</th>
    <th>Quantidade</th>
    <th>Valor Total</th>
    <th>Preço Médio</th>
    <th></th>
  </tr>
  {#each arrayOldStocks as row, index}
    <tr class="old-stocks">
      {#each row as info}
        <td>{info}</td>
      {/each}
        <td><button on:click={() => removeItem(index)}>[x]</button></td>
    </tr>
  {/each}
  
</table>


<style>

  .-average-price {
    width: 100%;
    display: grid; 
    overflow: auto;
    margin-bottom: 2rem;
  }

  .-average-price .old-stocks {
    display: grid;
    justify-content: center;
    grid-template-columns: 
      minmax(7rem, 10rem) /*Ano*/
      minmax(11rem, 14rem) /*Quantidade*/
      minmax(12rem, 12rem) /*Preco Medio*/
      minmax(14rem, 16rem)  /*Valor Total*/
      minmax(7rem, 10rem)  /*Botao*/
    ;
  }
  .-average-price .old-stocks td {
    padding: 0;
  }


</style>