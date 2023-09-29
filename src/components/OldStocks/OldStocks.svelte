<script>

  export let title = "Ações Antigas"
  let tableInfo = []
  let maximize = false

  let acoesInput = ""
  let quantidadeInput = ""
  let precoMedioInput = ""
  let valorTotalInput = ""

  let listOldStocks = [{
    acoes: "",
    quantidade: "",
    precoMedio: "",
    valorTotal: ""
  }]


  const stocksListHeader = ["","Ações", "Quantidade", "Preço Médio", "Valor Total"]



  function addStocksClick() {

    const repeatedItem = listOldStocks.find(item => {
      return item.acoes == acoesInput
    })

    const hasContent = acoesInput ? true : false
    const uniqueItem = !repeatedItem ? true : false

    

    if(hasContent) {
      if(uniqueItem) {
        listOldStocks = [...listOldStocks, {
          acoes: acoesInput,
          quantidade: quantidadeInput,
          precoMedio: precoMedioInput,
          valorTotal: valorTotalInput
        }]

        acoesInput = ""
      }
    }

    
    console.log("listOldStocks", uniqueItem)
  }

  function selectedRow(item) {
    console.log("item", item)
    console.log("row", item.target.parentElement.id)
    console.log("inputRadio", item.target.parentElement.cells[0].firstChild)


    const row = item.target.parentElement
    const rowID = item.target.parentElement.id
    const inputRadio = item.target.parentElement.cells[0].firstChild

    inputRadio.checked = !inputRadio.checked
  

  }

</script>

<div class="old-stocks-title">
  <h2>{title}</h2>
  <button on:click={ () => maximize = !maximize }>Abrir/Fechar</button>
</div>

<div class="container-old-stocks" class:-active={maximize}>
  
  <div class="container-table">
    <table>
      <thead>
        <tr>
          {#each stocksListHeader as columns}
            <th>{columns}</th>
          {/each}
        </tr>
      </thead>
      <tbody>
          <tr class="input-row">
            <td></td>
            <td><input type="text" bind:value={acoesInput}></td>
            <td><input type="text" bind:value={quantidadeInput}></td>
            <td><input type="text" bind:value={precoMedioInput}></td>
            <td><input type="text" bind:value={valorTotalInput}></td>
          </tr>

          <br>
          <div>
            <button on:click={addStocksClick}>Adicionar</button>
            <button>Remover</button>
          </div>
          <br>

          {#each listOldStocks as data}
            <tr class="added-row" on:click={selectedRow} id={"row" + data.acoes}>
              <td><input type="radio" name="listOldStocks" id={data.acoes}></td>
              <td>{data.acoes}</td>
              <td>{data.quantidade}</td>
              <td>{data.precoMedio}</td>
              <td>{data.valorTotal}</td>
            </tr>
          {/each}

      </tbody>
    </table>
  </div>
    
</div>

<style>
  .old-stocks-title {
    display: flex;
    justify-content: space-between;
    margin-bottom: 1rem;
  }
  

  .container-old-stocks { 
    width: 100%;
    height: 0;
    display: grid;

    overflow: hidden;
  }

  .container-old-stocks.-active { 
    height: auto;
    overflow: auto;
  }

  .container-old-stocks .container-table {
    width: 100%;
    height: 100%;
    display: grid;
    
  }

  .container-table table {
    justify-self: center;
  }

  .container-old-stocks table tr { 
    display: grid;
    justify-content: center;
    grid-template-columns: minmax(7rem, 10rem) minmax(10rem, 15rem) minmax(10rem, 15rem) minmax(10rem, 15rem) minmax(10rem, 15rem);
  }

  .container-old-stocks table tr th {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .container-old-stocks table .input-row td {
    padding: .2rem;
  }

  .container-old-stocks table tr td input {
    width: 100%;
    height: 100%;
    background-color: rgba(227, 230, 229, 0.2);
    border-radius: 0;
  }
  
  .container-old-stocks table tr td input:focus {
    outline: rgb(226, 226, 226) .2rem solid;
  }
  

  .container-old-stocks table .added-row:hover {
    background-color: rgba(163, 163, 163, .3);
  }

  .container-table table .added-row td {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .container-table table .added-row td input{
    width: 70%;
    height: 70%;
    box-shadow: none;
  }

  .container-old-stocks table .added-row td input:focus {
    outline-style: none;
  }
  
  


</style>