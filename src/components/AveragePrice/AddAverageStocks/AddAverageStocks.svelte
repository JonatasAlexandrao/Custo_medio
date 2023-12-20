
<script>

  import formulas from "../../../functions/formulas";
  import masc from "../../../functions/masc";
  import { NEGOTIATION } from "../../../stores/stores";

  export let calculationInfos 
  export let selectComponent
  $: disabledInput = selectComponent ? false : true

  // ===== INPUTS =====
  let inputYearOld
  let inputQtd
  let inputTotalValue
 
  function onInput() {
    inputQtd.value = masc.inputNum(inputQtd.value)
    inputTotalValue.value = masc.inputRealCurrency(inputTotalValue.value)
  }

  function clearInputs() {
    inputYearOld.value = "2022"
    inputQtd.value = "0"
    inputTotalValue.value = "0,00"
  }

  function addOldStocks() {

    let total = inputTotalValue.value
    total = (inputTotalValue.value).replace(".", "")
    total = total.replace(",", ".")

    const qtdValid = inputQtd.value > 0
    const totalValid = total > 0

    if(qtdValid && totalValid) {
      const qtd = parseFloat(inputQtd.value.replace(",", "."))

      const averagePrice = (formulas.averagePrice(qtd, total)).toString().replace(".", ",")

      console.log("---averagePrice---", averagePrice)

      const infos = [ inputYearOld.value, inputQtd.value, inputTotalValue.value, masc.realCurrency(averagePrice) ]

      
      $NEGOTIATION.forEach(element => {
        if(element.codigo == selectComponent) {
          element.acoesAntigas = [...element.acoesAntigas, infos]
        }      
      });

    }
    
      calculationInfos()
      clearInputs()

      console.log("AQUI----->>>", $NEGOTIATION)

  }

  function focusEnd(input) {
    if(input){
      const len = input.value.length
      input.setSelectionRange(len, len)
    } 
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
    
    <td><input type="text" on:input={onInput} bind:this={inputQtd} value={0} disabled={disabledInput} on:click={()=>focusEnd(inputQtd)}></td>

    <td>
      <input type="text" on:input={onInput} bind:this={inputTotalValue} value={"0,00"} disabled={disabledInput} on:click={()=>focusEnd(inputTotalValue)}>
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