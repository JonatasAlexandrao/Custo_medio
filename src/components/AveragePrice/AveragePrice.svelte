
<script>

  import { negotiationsCodes, NEGOTIATION, LIST_Report_PRODUTO, listReport } from "../../stores/stores";
  import masc from "../../functions/masc";
  import formulas from "../../functions/formulas"


  import AddOldStock from "./TableAveragePrice/TableAveragePrice.svelte";
  import TableOldStocks from "./TableOldStocks/TableOldStocks.svelte";

  let selectComponent = ""
  let tableHeader = ["Data", "Movimentação", "Código", "Qtd", "Preço", "Valor"]
  let filteredList = []

  let textSumOfQuantity = 0
  let textSumOfTotal = 0
  let textAveragePrice = 0

  let declarationText
  let nomePregao = ""
  let instituicao = ""

  //add acoes antigas
  let inputYearOld
  let inputQtd
  let inputAveragePrice 
  let inputTotalValue

  let arrayOldStocks = []
  

  function searchStock() {
    let list

    $NEGOTIATION.forEach(element => {
      if(element.codigo == selectComponent) {
        list = element
        filteredList = element.dados

        instituicao = filteredList[0].instituicao
      } 
    });

    $LIST_Report_PRODUTO.forEach(element => {
      let codeSelected = selectComponent.replace(/F$/, '')
      if(element.codigo == codeSelected){
        nomePregao = element.produto
      }
    })
   
    calculationInfos()
  }

  function copyText(text="") {
    if(text) { 
      navigator.clipboard.writeText(text)
    }
  }

  function onInput() {
    inputAveragePrice.value = masc.inputRealCurrency(inputAveragePrice.value)

    inputTotalValue.value = masc.inputRealCurrency(inputTotalValue.value)

    inputQtd.value = masc.inputNum(inputQtd.value)
  }

  function addOldStocks() {

    const qtdValid = inputQtd.value > 0
    const totalValid = (inputTotalValue.value).replace(",", ".") > 0

    if(qtdValid && totalValid) {
      const infos = [inputYearOld.value, inputQtd.value, inputTotalValue.value, inputAveragePrice.value]

      arrayOldStocks = [... arrayOldStocks, infos]

      $NEGOTIATION.forEach(element => {
        if(element.codigo == selectComponent) {
          element.acoesAntigas = arrayOldStocks
        } 
      });

      calculationInfos()

      }
  }


  function calculationInfos() {
    textSumOfQuantity = formulas.sumOfQuantity(filteredList, arrayOldStocks)

    textSumOfTotal = formulas.sumOfTotal(filteredList, arrayOldStocks)

    textAveragePrice = formulas.averagePrice(textSumOfQuantity, textSumOfTotal)
  }

    

</script>


<div class="containerSelectStock">
  <select name="" id="selectStock" bind:value={selectComponent}>
    {#each $negotiationsCodes as stocks}
      <option value={stocks}>{stocks}</option>
    {/each}
  </select>
  <button on:click={searchStock}>Buscar</button>
</div>

<div class="container-table-base">

  <table class="table-base -average-price">
    <tr class="old-stocks">
      <th>Ano</th>
      <th>Quantidade</th>
      <th>Valor Total</th>
      <th>Preço Médio</th>
      <th></th>
    </tr>
    <tr class="old-stocks">
      <td><input type="text" bind:this={inputYearOld} value={""}></td>
      
      <td><input type="text" on:input={onInput} bind:this={inputQtd} value={0}></td>

      <td>
        <input type="text" on:input={onInput} bind:this={inputTotalValue} value={"0,00"}>
      </td>

      <td>
        <input type="text" on:input={onInput} bind:this={inputAveragePrice} value={"0,00"} readonly>
      </td>
      
      <td><button on:click={addOldStocks}>+</button></td>
    </tr>
  </table>

  <TableOldStocks arrayOldStocks={arrayOldStocks} calculationInfos={calculationInfos} />

  <AddOldStock tableHeader={tableHeader} filteredList={filteredList} />

  <div class="container-text-box">
    <div>
      <label for="">Quantidade Total:</label>
      <div class="text-box">
        {textSumOfQuantity}
      </div>
    </div>
    
    <div>
      <label for="">Valor Total:</label>
      <div class="text-box">
        R$ {masc.realCurrency(textAveragePrice)}
      </div>
    </div>

    <div class="center">
      <label for="">Preço Médio:</label>
      <div class="text-box">
        R$ {masc.realCurrency(textSumOfTotal)}
      </div>
    </div>
    
  </div>

  <div class="declaration-text">
    <p bind:this={declarationText}>
      {textSumOfQuantity} ações -- {nomePregao}, ao custo unitário de R$ {masc.realCurrency(textAveragePrice)}, em custódia na corretora {instituicao}
    </p>
    <button on:click={()=> copyText(declarationText.innerText)}>Copiar</button>
  </div>

 
</div>


<style>
  .containerSelectStock {
    width: 100%;
    
    display: flex;
    align-items: center;

    margin-bottom: 2rem;
  }

  .containerSelectStock #selectStock {
    min-width: 10rem;
    border-radius: .3rem;
    padding: .5rem;
    margin-right: 1rem;
  }

  .container-table-base .-average-price {
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
  .-average-price .old-stocks td > input {
    width: 100%;
    height: 100%;
    text-align: center;
  }

  .container-text-box {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-areas: 
      "left right"
      "center center"
    ;
    gap: 1rem;
    justify-content: center;
    align-items: center;
    font-size: 1.8rem;

    margin-bottom: 2rem;
  }

  .container-text-box > div > label {
    padding-left: 1rem;
  }

  .container-text-box .center {
    grid-area: center;
    width: 50%;
    justify-self: center;
  }

  .text-box {
    border-radius: .5rem;
    padding: .7rem 1rem;
    background-color: #0f0f0f98;
  }

  .declaration-text {
    padding: 2rem;
    border: .2rem solid #a3a3a3;
    border-radius: .2rem;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .declaration-text > p {
    text-align: justify;
    margin-bottom: 1rem;
  }

  
  /* ========== Exceções ============*/



 
</style>