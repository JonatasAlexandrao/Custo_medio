
<script>

  import { negotiationsCodes, listNegotiations, NEGOTIATION } from "../../stores/stores";
  import masc from "../../functions/masc";

  let selectComponent = ""
  let tableHeader = ["Data", "Movimentação", "Código", "Qtd", "Preço", "Valor"]
  let filteredList = []

  function searchStock() {
    
    let list
    $NEGOTIATION.forEach(element => {
      if(element.codigo == selectComponent) {
        list = element
        filteredList = element.dados
      } 
    });
    console.log("aaa",filteredList)
    let dt = new Date(filteredList[0].data)
    
    console.log("teste",dt)
    sumQuantity()
    averagePrice()
  }

  function sumQuantity() {
    
    const res = filteredList.reduce( (prev, elem) => {

    if(elem.tipoMovimentacao === "Compra"){
      return prev + elem.quantidade
    }
    else {
      return prev
    }

    }, 0)

    console.log("qtd", res)
    return res
    
  }

  function sumValue() {

    const res = filteredList.reduce( (prev, elem) => {

    if(elem.tipoMovimentacao === "Compra"){
      return prev + elem.valor
    }
    else {
      return prev
    }

    }, 0)

    console.log("res", res)

  }

  function averagePrice() {

    let res = filteredList.reduce( (prev, elem) => {

    if(elem.tipoMovimentacao === "Compra"){
      return prev + (elem.valor)
    }
    else if(elem.tipoMovimentacao === "Venda") {
      return -(prev + (elem.valor))
    }
    else {
      return prev
    }

    }, 0)

    res = (res/ sumQuantity())

    console.log("preço médio", res)

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
  <table class="table-base">
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

  <div>
    <label for="">Quantidade Total:</label>
    <input type="text" name="" id="">

    <label for="">Preço Médio:</label>
    <input type="text" name="" id="">

    <label for="">Valor Total:</label>
    <input type="text" name="" id="">
  </div>

 
</div>


<style>

  .trading-table-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
    width: 100%;
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

  
  /* ========== Exceções ============*/



 
</style>