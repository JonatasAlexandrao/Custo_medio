
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

  function searchStock() {
    let list

    $NEGOTIATION.forEach(element => {
      if(element.codigo == selectComponent) {
        list = element
        filteredList = element.dados

        instituicao = filteredList[0].instituicao
      } 

    });
   
    textSumOfQuantity = formulas.sumOfQuantity(filteredList)
    textSumOfTotal = formulas.sumOfTotal(filteredList)
    textAveragePrice = formulas.averagePrice(filteredList)


  }

  function copyText(text="") {
    if(text) { 
      navigator.clipboard.writeText(text)
    }



    console.log("$LIST_Report_PRODUTO", $LIST_Report_PRODUTO)


    $LIST_Report_PRODUTO.forEach(element => {
      let codeSelected = selectComponent.replace(/F$/, '')
      if(element.codigo == codeSelected){
        nomePregao = element.produto
      }

      
    })
    
    

    


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

  .container-table-base .table-base tr {
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