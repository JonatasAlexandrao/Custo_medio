
<script>

  import { negotiationsCodes, NEGOTIATION, LIST_Report_PRODUTO, listReport } from "../../stores/stores";
  import masc from "../../functions/masc";

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

  //-------------------------

  let code
  let averagePrice
  let quantityTotal
  let valueTotal


  function searchStock() {

    $NEGOTIATION.forEach(element => {
      if(element.codigo == selectComponent) {
        arrayOldStocks = element.acoesAntigas
      } 
    });

    $NEGOTIATION.forEach(element => {
      if(element.codigo == selectComponent) {
        filteredData = element.dados

        code = element.codigo
        averagePrice = element.precoMedio
        quantityTotal = element.quantidadeTotal
        valueTotal = element.valorTotal

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

    let quantity = 0
    let value = 0
    let finalAveragePrice = 0

    let oldQuantity = 0
    let oldValue = 0
    let oldAveragePrice = 0


    if(arrayOldStocks) {

      arrayOldStocks.forEach(element => {
        
        if(element[1]) { oldQuantity = oldQuantity + parseInt(element[1]) }

        if(element[2]) {
          let newElem = element[2].replace(".", "")
          newElem = newElem.replace(".", "")
          newElem = parseFloat(newElem.replace(",", "."))
          oldValue = oldValue + newElem

        }

        if(element[1] && element[2]){
          oldAveragePrice = oldValue / oldQuantity
        }
        
      });

    }


    quantity = oldQuantity
    value = oldValue
    finalAveragePrice = oldAveragePrice


    filteredData.forEach(elem => {
      if(elem.tipoMovimentacao === "Compra"){
        quantity = quantity + elem.quantidade
        value = value + elem.valor
        finalAveragePrice = value / quantity
      }
      else if(elem.tipoMovimentacao === "Venda"){
        quantity = quantity - elem.quantidade

        // Calcular preço médio pós-venda
        const totalPartial =  elem.quantidade * finalAveragePrice
        value = value - totalPartial
        finalAveragePrice = value / quantity
      } 
    });

    textSumOfQuantity = quantity
    textSumOfTotal = value
    textAveragePrice = finalAveragePrice



    pegarDadosAcoesAntigas()

    if(textSumOfQuantity <= 0) {
      textSumOfTotal = 0
    }
    if(textSumOfQuantity <= 0) {
      textAveragePrice = 0
    }


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