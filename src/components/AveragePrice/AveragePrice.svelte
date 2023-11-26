
<script>

  import { negotiationsCodes, NEGOTIATION, LIST_Report_PRODUTO, listReport } from "../../stores/stores";
  import masc from "../../functions/masc";
  import formulas from "../../functions/formulas"

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
  let inputAveragePrice 
  let inputTotalValue

  let valueYearOld = ""
  let valueQtd = ""
  let valueAveragePrice = "0,00"
  let valueTotalValue = "0,00"

  let arrayOldStocks = [["00", "666", "444", "345"]]
  

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
   
    textSumOfQuantity = formulas.sumOfQuantity(filteredList)
    textSumOfTotal = formulas.sumOfTotal(filteredList)
    textAveragePrice = formulas.averagePrice(filteredList)


  }

  function copyText(text="") {
    if(text) { 
      navigator.clipboard.writeText(text)
    }
  }

  function onInput() {
    valueAveragePrice = masc.inputRealCurrency(inputAveragePrice.value)

    valueTotalValue = masc.inputRealCurrency(inputTotalValue.value)
  }

  function addOldStocks() {

    const infos = [valueYearOld, valueQtd, valueAveragePrice, valueTotalValue]


    arrayOldStocks = [... arrayOldStocks, infos]
    console.log("infos: ", arrayOldStocks)

    arrayOldStocks.forEach(element => {
      console.log(element)
    });


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

  <table class="table-base table-inputs -average-price">
    <tr class="old-stocks">
      <th>Ano</th>
      <th>Quantidade</th>
      <th>Preço Médio</th>
      <th>Valor Total</th>
      <th></th>
    </tr>
    <tr class="old-stocks">
      <td><input type="text" bind:value={valueYearOld}></td>
      <td><input type="number" bind:value={valueQtd}></td>
      <td>
        <input type="text" on:input={onInput} bind:this={inputAveragePrice} value={valueAveragePrice}>
      </td>
      <td>
        <input type="text" on:input={onInput} bind:this={inputTotalValue} value={valueTotalValue}>
      </td>
      <td><button on:click={addOldStocks}>+</button></td>
    </tr>
  </table>

  <table class="table-base table-old-stocks -average-price">
    <tr class="old-stocks">
      <th>Ano</th>
      <th>Quantidade</th>
      <th>Preço Médio</th>
      <th>Valor Total</th>
      <th></th>
    </tr>
    {#each arrayOldStocks as row}
      <tr class="old-stocks">
        {#each row as info}
          <td>{info}</td>
        {/each}
      </tr>
    {/each}
    
  </table>

  <table class="table-base table-info -average-price">
    <thead>
      <tr>
        {#each tableHeader as columns}
          <th>{columns}</th>
        {/each}
      </tr>
    </thead>
    <tbody>
      {#each filteredList as row}
        {#if row.codigoNegociacao}
          <tr>
            <td>{row.data}</td>
            <td>{row.tipoMovimentacao}</td>
            <td>{row.codigoNegociacao}</td>
            <td>{row.quantidade}</td>
            <td>{masc.realCurrency(row.preco)}</td>
            <td>{masc.realCurrency(row.valor)}</td>
          </tr> 
        {/if}  
      {/each}
      
    </tbody>        
  </table>

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

  .container-table-base .table-info tr {
    display: grid;
    justify-content: center;
    grid-template-columns: 
      minmax(10rem, 14rem) /*Data*/
      minmax(13rem, 13rem) /*Movimentação*/
      minmax(10rem, 12rem) /*Código*/
      minmax(7rem, 10rem)  /*Qtd*/
      minmax(10rem, 15rem) /*Preço*/
      minmax(10rem, 15rem) /*Valor*/
    ;
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