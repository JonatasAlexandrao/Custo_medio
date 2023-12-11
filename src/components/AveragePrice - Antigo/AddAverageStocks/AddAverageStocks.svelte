
<script>

  import formulas from "../../../functions/formulas";
  import masc from "../../../functions/masc";
  import { NEGOTIATION } from "../../../stores/stores";
  import TableOldStocks from "../TableOldStocks/TableOldStocks.svelte";
  
  export let selectComponent
  $: disabledInput = selectComponent ? false : true
  //$: !disabledInput ? initiation() : ""


  let inputYearOld
  let inputQtd
  let inputTotalValue

  let arrayOldStocks = []

  let stockInfoSelect = {
    acoesAntigas : [],
    codigo : "",
    dados : [],
    precoMedio : 0,
    quantidadeTotal : 0,
    valorTotal : 0
  }
  let oldStocksFiltered = []

  let averagePrice = 0
  $: stockInfoSelect.precoMedio = averagePrice
  let sumOfTotal = 0
  $: stockInfoSelect.valorTotal = sumOfTotal
  let sumOfQuantity = 0
  $: stockInfoSelect.quantidadeTotal = sumOfQuantity
  let datasFiltered = []
 



  function initiation() {
    $NEGOTIATION.forEach(element => {
      if(element.codigo == selectComponent) {
        stockInfoSelect = element

        averagePrice = element.precoMedio
        sumOfQuantity = element.quantidadeTotal
        sumOfTotal = element.valorTotal

        datasFiltered = element.dados
      } 
    });
  }

  function testandoooo() {
    $NEGOTIATION.forEach(element => {
      if(element.codigo == selectComponent) {
        stockInfoSelect = element
        oldStocksFiltered = element.acoesAntigas  
        console.log("element",element)   
      } 
    })
  }
 
  


  function onInput() {

  }

  function addOldStocks() {

    const qtdValid = inputQtd.value > 0
    const totalValid = (inputTotalValue.value).replace(",", ".") > 0

    if(qtdValid && totalValid) {

      const qtd = parseFloat(inputQtd.value.replace(",", "."))
      let total = parseFloat(inputTotalValue.value.replace(",", "."))

      const averagePrice = (formulas.averagePrice(qtd, total)).toString().replace(".", ",")

      const infos = [inputYearOld.value, inputQtd.value, inputTotalValue.value, masc.realCurrency(averagePrice) ]

      arrayOldStocks = [... arrayOldStocks, infos]

      $NEGOTIATION.forEach(element => {
        if(element.codigo == selectComponent) {
          element.acoesAntigas = arrayOldStocks
        } 

      });

      calculationInfos()
      clearInputs()
      
      console.log("----====",$NEGOTIATION)
      //const teste = $NEGOTIATION
      //$NEGOTIATION = teste
      testandoooo()
    }
    
  }

  function calculationInfos() {

    console.log("222222", datasFiltered, arrayOldStocks)
    
    sumOfQuantity = formulas.sumOfQuantity(datasFiltered, arrayOldStocks)
    sumOfTotal = formulas.sumOfTotal(datasFiltered, arrayOldStocks)
    averagePrice = formulas.averagePrice(sumOfQuantity, sumOfTotal)

    console.log("aQUII", averagePrice, sumOfTotal, sumOfQuantity)
    console.log("datasFiltered", datasFiltered)
    console.log("stockInfoSelect", stockInfoSelect)

    
  }

  function clearInputs() {
    inputYearOld.value = "2022"
    inputQtd.value = "0"
    inputTotalValue.value = "0,00"
  }

</script>


<table class="table-base -average-price 1">
  <tr class="old-stocks">
    <th>Ano</th>
    <th>Quantidade</th>
    <th>Valor Total</th>
    <th></th>
  </tr>
  <tr class="old-stocks">
    <td><input type="number" bind:this={inputYearOld} value={2022} disabled={disabledInput}></td>
    
    <td><input type="text" on:input={onInput} bind:this={inputQtd} value={0} disabled={disabledInput}></td>

    <td>
      <input type="text" on:input={onInput} bind:this={inputTotalValue} value={"0,00"} disabled={disabledInput}>
    </td>
    
    <td><button on:click={addOldStocks}>+</button></td>
  </tr>
</table>

<TableOldStocks selectComponent={selectComponent} calculationInfos={calculationInfos} oldStocksFiltered={oldStocksFiltered} stockInfoSelect={stockInfoSelect}/>


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
      minmax(14rem, 16rem)  /*Valor Total*/
      minmax(7rem, 10rem)  /*Botao*/
    ;
  }
  .-average-price .old-stocks td {
    padding: 0;
  }
  .-average-price .old-stocks td > input {
    width: 100%;
    height: 100%;
    text-align: center;
  }

</style>