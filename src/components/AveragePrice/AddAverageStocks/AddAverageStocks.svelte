
<script>

  import formulas from "../../../functions/formulas";
  import masc from "../../../functions/masc";
  import { NEGOTIATION } from "../../../stores/stores";

  export let selectComponent


  let inputYearOld
  let inputQtd
  let inputTotalValue

  let arrayOldStocks = []


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

      console.log("---->$NEGOTIATION", $NEGOTIATION)

      }
  }

  function calculationInfos() {
    /*textSumOfQuantity = formulas.sumOfQuantity(filteredList, arrayOldStocks)

    textSumOfTotal = formulas.sumOfTotal(filteredList, arrayOldStocks)

    textAveragePrice = formulas.averagePrice(textSumOfQuantity, textSumOfTotal)*/
  }

  function clearInputs() {
    inputYearOld.value = "2022"
    inputQtd.value = "0"
    inputTotalValue.value = "0,00"
  }

</script>



<table class="table-base -average-price 1">
  <tr class="old-stocks">
    <th>Ano 11</th>
    <th>Quantidade</th>
    <th>Valor Total</th>
    <th></th>
  </tr>
  <tr class="old-stocks">
    <td><input type="number" bind:this={inputYearOld} value={2022}></td>
    
    <td><input type="text" on:input={onInput} bind:this={inputQtd} value={0}></td>

    <td>
      <input type="text" on:input={onInput} bind:this={inputTotalValue} value={"0,00"}>
    </td>
    
    <td><button on:click={addOldStocks}>+</button></td>
  </tr>
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