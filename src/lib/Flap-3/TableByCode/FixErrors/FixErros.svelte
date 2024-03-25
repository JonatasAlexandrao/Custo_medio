<script>
  import { NEGOTIATION } from '$store/store'
  import formatInfo from "$functions/formatInfo";
  import masc from "$functions/masc";

  export let listByCodes = []
  export let activeFixErrors = true
  let tableHeaderCode = ["Código", "Qtd em Negativo", "Qtd", "Preço Médio", "Valor"]
 
  $: listNegativeCodes = listByCodes ? createListNegativeCodes() : []

  let tableInfo = []
  //let position = 0

  function createListNegativeCodes() {
    return listByCodes.filter((elem) => elem.quantidadeTotal < 0 )
  }

  function populateDataArray() {
    let addArray = []
    const numRows = listNegativeCodes.length
    const row = tableInfo.children

    for (let index = 0; index < numRows; index++) {

      const column = row[index].children

      const newData = {    
        posicao: -1,
        dia: "",
        mes: "",
        ano: "",
        data: "",
        codigoNegociacao: column[0].firstChild.value,
        instituicao: "",
        mercado: "",
        prazoVencimento: "",
        preco: column[3].firstChild.value,
        quantidade: column[2].firstChild.value,
        tipoMovimentacao: "Ano Anterior",
        valor: column[4].firstChild.value
      }
      addArray.push(newData)

    }
    return addArray
  }

  function closeButton() {   
    activeFixErrors = !activeFixErrors
  }

  function saveButton() {
    
    let dataArray = populateDataArray()
    let data = $NEGOTIATION

    dataArray.forEach(newData => {

      const validCode = newData.codigoNegociacao != ""
      const validQuantity = newData.quantidade > 0
      const validPrice = newData.preco > 0
      const validValue = newData.valor > 0

      const okCanSave = validCode && validQuantity && validPrice && validValue

      let list = data.filter(elem => {
        const codeEqual = elem.codigoNegociacao == newData.codigoNegociacao || elem.codigoNegociacao == newData.codigoNegociacao + "F"

        return codeEqual ? elem : ""
      })

      const lowestPosition = list.reduce((pos, elem) => {
        return pos < elem.posicao ? pos : elem.posicao
      }, list[0].posicao)

       newData.posicao = lowestPosition - 0.01


      if(okCanSave) {
        data.push(newData)
        const dataOrganized = formatInfo.sortListByPosition(data)
        NEGOTIATION.set(dataOrganized)
      }

    });

  }

</script>


<div class="container-background">
  

  <div class="container-table-base -codes-table">
    <button on:click={closeButton} class="btn-close">X</button>

    <h2>Corrigir todos os valores Negativos</h2>

    <table class="table-base">
      <thead>
        <tr>
          {#each tableHeaderCode as columns}
            <th>{columns}</th>
          {/each}
        </tr>
      </thead>
      <tbody bind:this={tableInfo}>
        {#each listNegativeCodes as stock, index}
        <tr>
          <td><input type="text" value={stock.codigo} disabled></td>
          <td><input type="text" value={stock.quantidadeTotal} disabled></td>
          <td><input type="text" value=0></td>
          <td><input type="text" value=0></td>
          <td><input type="text" value=0></td>
        </tr>
        {/each}
          

      </tbody>        
    </table>

    <div class="container-save">
      <span>Salvar todos os valores?</span>
      <button class="btn-save" on:click={saveButton}>Salvar</button>
    </div>

  </div>
</div>

<style>
  .container-background {
    display: grid; 
    justify-content: center;
    align-items: start;
    
    width: 100%;
    height: 100%;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 99998;
    padding: 4rem 2rem;
    background-color: rgba(0, 0, 0, .5);
  }

  .container-table-base.-codes-table {
    max-width: 100rem;
    min-width: 50rem;

    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    /* width: 80%; */
    border: .2rem solid #a3a3a3;
    border-radius: .5rem;
    background-color: #2f2f2f;
    padding: 8rem 4rem;

    overflow-y: hidden;
  }

  .container-table-base .table-base {
    margin: 2rem 0;
  }

  .container-table-base .table-base tr {
    display: grid;
    justify-content: center;
  }

  .container-table-base.-codes-table .table-base tr{
    grid-template-columns: 
      minmax(10rem, 14rem) /*1 Posicao*/
      minmax(10rem, 14rem) /*1 Posicao*/
      minmax(10rem, 14rem) /*1 Posicao*/
      minmax(10rem, 14rem) /*1 Posicao*/
      minmax(10rem, 14rem) /*1 Posicao*/
    ;
  }

  .btn-close {
    width: 6rem;
    height: 4rem;
    position: absolute;
    top: 0;
    right: 0;

    z-index: 99998;
  }

  td {
    padding: .3rem 0;
  }

  input {
    width: 100%;
  }

  .container-save {
    width: 100%;
    display: grid;
    justify-content: center;
    align-items: center;
    grid-template-columns: 2fr 1fr;

    border: .1rem solid #a3a3a3;
    border-radius: .5rem;

    padding: 1.5rem;

  }

  .container-save .btn-save {
    height: 4rem;
    background-color: rgba(1, 94, 1, 0.8);
  }

</style>