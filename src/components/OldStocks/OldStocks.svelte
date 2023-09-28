<script>

  export let title = "Ações Antigas"
  let tableInfo = []
  let maximize = false

  const stocksListHeader = ["Num","Ações", "Quantidade", "Preço Médio", "Valor Total"]



  function sumOfQuantity(stock) {

    const response = tableInfo.reduce( (previous, current) => {
      return current.codigoNegociacao == stock ? previous + current.quantidade : previous 
    }, 0)

    return response
  }

  function totalInvestment(stock) {

    const response = tableInfo.reduce( (previous, current) => {
      return current.codigoNegociacao == stock ? previous + current.valor : previous 
    }, 0)

    const responseFormated = response.toLocaleString('pt-BR', {minimumFractionDigits: 2, maximumFractionDigits: 2})

    return responseFormated

  }

  function averagePrice(stock) {

    const f1 = tableInfo.reduce( (previous, current) => {
      return current.codigoNegociacao == stock ? previous + (current.quantidade * current.preco) : previous 
    }, 0)

    const f2 = sumOfQuantity(stock)

    const response = (f1/f2)
    const responseFormated = response.toLocaleString('pt-BR', {minimumFractionDigits: 2, maximumFractionDigits: 2})

    return responseFormated

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
            <td><input type="text"></td>
            <td><input type="text"></td>
            <td><input type="text"></td>
            <td><input type="text"></td>
          </tr>

          <br>
          <div>
            <button>Adicionar</button>
            <button>Remover</button>
          </div>
          <br>

          <tr class="added-row">
            <td>a</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr class="added-row">
            <td>a</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
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

  .container-old-stocks table tr { 
    display: grid;
    justify-content: center;
    grid-template-columns: minmax(7rem, 10rem) minmax(10rem, 15rem) minmax(10rem, 15rem) minmax(10rem, 15rem) minmax(10rem, 15rem);
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

  .container-old-stocks table tr th {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .container-old-stocks .container-table {
    width: 100%;
    height: 100%;
    display: grid;
    
  }

  .container-table table {
    justify-self: center;
  }
  
  


</style>