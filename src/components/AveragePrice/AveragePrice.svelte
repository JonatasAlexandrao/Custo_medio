
<script>

  import { negotiationsCodes, NEGOTIATION, LIST_Report_PRODUTO, listReport } from "../../stores/stores";
  import masc from "../../functions/masc";
  import formulas from "../../functions/formulas"

  import TableOldStocks from "./TableOldStocks/TableOldStocks.svelte";
  import AddAverageStocks from "./AddAverageStocks/AddAverageStocks.svelte";
  import TableAverageStocks from "./TableAverageStocks/TableAverageStocks.svelte";

  let selectComponent = ""

  let tableHeader = ["Data", "Movimentação", "Código", "Qtd", "Preço", "Valor"]
  let filteredData = []

  let textSumOfQuantity = 0
  let textSumOfTotal = 0
  let textAveragePrice = 0

  let declarationText
  let nomePregao = ""
  let instituicao = ""

  let oldStocksFiltered
  let arrayOldStocks = []


  function searchStock() {

    $NEGOTIATION.forEach(element => {
      if(element.codigo == selectComponent) {
        arrayOldStocks = element.acoesAntigas
      } 
    });

    $NEGOTIATION.forEach(element => {
      if(element.codigo == selectComponent) {
        filteredData = element.dados
        instituicao = filteredData[0].instituicao
      } 
    });

    $LIST_Report_PRODUTO.forEach(element => {
      let codeSelected = selectComponent.replace(/F$/, '')
      if(element.codigo == codeSelected){
        nomePregao = element.produto
      }
    })
   
  }

  function copyText(text="") {
    if(text) { 
      navigator.clipboard.writeText(text)
    }
  }

  function calculationInfos() {

    searchStock()

    console.log("----->>>1111111",filteredData)
    console.log("----->>>2222222",arrayOldStocks)  

    textSumOfQuantity = formulas.sumOfQuantity(filteredData, arrayOldStocks)

    textSumOfTotal = formulas.sumOfTotal(filteredData, arrayOldStocks)

    textAveragePrice = formulas.averagePrice(textSumOfQuantity, textSumOfTotal)

    $NEGOTIATION.forEach(element => {
      if(element.codigo == selectComponent) {
        element.quantidadeTotal = textSumOfQuantity
        element.valorTotal = textSumOfTotal
        element.precoMedio = textAveragePrice
      } 
    })

    pegarDadosAcoesAntigas()

    if(textSumOfQuantity <= 0) {
      textSumOfTotal = 0
    }
    if(textSumOfQuantity <= 0) {
      textAveragePrice = 0
    }


  }

  function calculationInfos222() {
    searchStock()


    let qtdTotalOld = 0
    if(arrayOldStocks) {
      qtdTotalOld = arrayOldStocks.reduce((prev, elem) => {

        if(elem[1])
          return prev + parseInt(elem[1])
        else
          return prev
        
      },0)
    }

    const qtdTotal = filteredData.reduce( (prev, elem) => {

    if(elem.tipoMovimentacao === "Compra"){
      return prev + elem.quantidade
    }
    else if(elem.tipoMovimentacao === "Venda"){
      return prev - elem.quantidade
    }
    else {
      return prev
    }
    }, 0)

    let valueTotalOld = 0
    if(arrayOldStocks) {
      valueTotalOld = arrayOldStocks.reduce((prev, elem) => {

        if(elem[2]) {
          let newElem = parseFloat(elem[2].replace(".", ""))
          newElem = parseFloat(elem[2].replace(",", "."))
          return prev + newElem
        }
        else {
          return prev
        }
          
        
      },0)
    }

    const valueTotal = filteredData.reduce( (prev, elem) => {

    if(elem.tipoMovimentacao === "Compra"){
      return prev + elem.valor
    }
    /*else if(elem.tipoMovimentacao === "Venda"){
      return prev - elem.valor
    }*/
    else {
      return prev
    }
    }, 0)

    


    pegarDadosAcoesAntigas()

    /*if(textSumOfQuantity <= 0) {
      textSumOfTotal = 0
    }
    if(textSumOfQuantity <= 0) {
      textAveragePrice = 0
    }*/


  }

  function pegarDadosAcoesAntigas() {
    $NEGOTIATION.forEach(element => {
      if(element.codigo == selectComponent) {
        oldStocksFiltered = element.acoesAntigas
      } 
    })
  }
    
</script>


<div class="containerSelectStock">
  <label for=""> Selecione uma Ação: </label>
  <select name="" id="selectStock" bind:value={selectComponent} on:change={calculationInfos}>
    {#each $negotiationsCodes as stocks}
      <option value={stocks}>{stocks}</option>
    {/each}
  </select>
</div>

<div class="container-table-base">

  <AddAverageStocks selectComponent={selectComponent} calculationInfos={calculationInfos}/>


  <TableOldStocks oldStocksFiltered={oldStocksFiltered} calculationInfos={calculationInfos} />

  <TableAverageStocks filteredData={filteredData} tableHeader={tableHeader}/>

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
        R$ {masc.realCurrency(textSumOfTotal)}
      </div>
    </div>

    <div class="center">
      <label for="">Preço Médio:</label>
      <div class="text-box">
        R$ {masc.realCurrency(textAveragePrice)}
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
    flex-direction: column;
    /*justify-items: center;*/
    gap: .5rem;

    margin-bottom: 2rem;
  }

  .containerSelectStock #selectStock {
    min-width: 8rem;
    max-width: 18rem;
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