<script>
  import TdData from "$Components/TdData/TdData.svelte";
  import masc from "$functions/masc";

  export let listByCodes = []
  let tableHeaderCode = ["Código", "Qtd em Negativo", "Qtd", "Preço Médio", "Valor"]
  export let activeFixErrors = true
 
  $: listNegativeCodes = listByCodes ? createListNegativeCodes() : []

  function createListNegativeCodes() {
    return listByCodes.filter((elem) => elem.quantidadeTotal < 0 )
  }

  function closeButton() {
    console.log(listNegativeCodes)
    activeFixErrors = !activeFixErrors
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
      <tbody>
        {#each listNegativeCodes as stock}
        <tr>
          <td>{stock.codigo}</td>
          <td>{stock.quantidadeTotal}</td>
          <td><input type="text"></td>
          <td><input type="text"></td>
          <td><input type="text"></td>

        </tr>
        {/each}
          

      </tbody>        
    </table>

    <div class="container-save">
      <span>Salvar todos os valores?</span>
      <button class="btn-save">Salvar</button>
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