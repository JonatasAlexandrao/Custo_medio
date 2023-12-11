<script>

  import { NEGOTIATION } from "../../../stores/stores";

  //export let oldStocksFiltered 
  export let selectComponent = ""
  //$: disabledInput = selectComponent ? true : false
  //$: disabledInput ? initiation() : ""
  export let calculationInfos

  export let stockInfoSelect = {
    acoesAntigas : [],
    codigo : "",
    dados : [],
    precoMedio : 0,
    quantidadeTotal : 0,
    valorTotal : 0
  }

  export let oldStocksFiltered = []
  //$: oldStocksFiltered = $NEGOTIATION ? $NEGOTIATION : []
  

  /*$NEGOTIATION.forEach(element => {
    if(element.codigo == selectComponent) {
      stockInfoSelect = element
      oldStocksFiltered = element.acoesAntigas  
      console.log("element",element)   
    } 
  });*/


    


  function removeItem(index) {

    
    oldStocksFiltered.splice(index, 1)
    oldStocksFiltered = oldStocksFiltered
    calculationInfos()    
  }

  function teste() {
    //initiation()
    console.log("999999", $NEGOTIATION, stockInfoSelect, oldStocksFiltered)
  }

</script>

<table class="table-base -average-price 2">
  <tr class="old-stocks">
    <th on:click={teste}>Ano</th>
    <th>Quantidade</th>
    <th>Valor Total</th>
    <th>Preço Médio</th>
    <th></th>
  </tr>
  {#each oldStocksFiltered as row, index}
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