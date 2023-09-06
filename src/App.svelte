<script>

  import readXlsxFile from 'read-excel-file'

  let input
  let file 
  let active = false

  let cabecalho = []
  let tableInfo = []
  let total = 0

  let totalCompra = 0
  let totalVenda = 0
  let acoes

  function isActive() { active = !active }
  
  function readFile(event) {
    file = event.target.files[0]
    let array = []

    readXlsxFile(file).then((rows) => {array = rows })
    .then(() => {
      formatInfo(array)
      //totalSun(tableInfo)
      calcCompra(tableInfo)
      acoesList(tableInfo)
    })

  }


  function formatInfo(data) {
    cabecalho = data[0]

    data.forEach(element => {
      tableInfo.push({
          data: element[0], 
          tipoMovimentacao: element[1],
          mercado: element[2],
          instituicao: element[3],
          codigoNegociacao: element[4],
          quantidade: element[5],
          preco: element[6],
          valor: element[7],
          cnpj: element[8],
          nomePregao: element[9]
        })
    });
    
    tableInfo.shift()
    console.log('tableInfo', tableInfo)

  }

  /*function totalSun(infos) { 
    total = infos.reduce( (prevVal, elem) => prevVal + elem.salario, 0 )
    console.log(total)
  }*/

  function calcCompra(info){
    const response = info.filter((compra) => compra.tipoMovimentacao == 'Compra')
    totalCompra = response.length
  }

  function calcVenda(info){
    const response = info.filter((venda) => venda.tipoMovimentacao == 'Venda')
    totalVenda = response.length
  }

  function acoesList(info) {


   /* let acoesUnicas = new Map() 

    info.forEach( acao => {
      if (!acoesUnicas.has(acao.codigoNegociacao)) {
        acoesUnicas.set(acao.codigoNegociacao, acao)
      } 
    })

    console.log("acoesUnicas", acoesUnicas)
    */
   let teste = info.map( el => {
    
    return el.codigoNegociacao
   })

   console.log('codigoNegociacao', teste)

   let teste2 = [ ...new Set(teste)]

   console.log('codigoNegociacao2', teste2)
   

  }



</script>

<main class="container-main">

  <h1>Teste de Planilha!</h1>

  <div class="search-file">
    <label for=""> Escolha um arquivo de planilha e clique em OK. </label>
    <div>
      <input type="file" on:change={readFile} bind:this={input}> 
      <button on:click={isActive}>OK</button>
    </div>
    
  </div>
  
  <div class="container-table">
    {#if active}
      <table>
       <thead>
        <tr>
          {#each cabecalho as cell}
            <th>{cell}</th>
          {/each}
        </tr>
       </thead>
       <tbody>
        {#each tableInfo as cell}
            <tr>
              <td>{cell.data}</td>
              <td>{cell.tipoMovimentacao}</td>
              <td>{cell.mercado}</td>
              <td>{cell.instituicao}</td>
              <td>{cell.codigoNegociacao}</td>
              <td>{cell.quantidade}</td>
              <td>{cell.preco}</td>
              <td>{cell.valor}</td>
              <td>{cell.cnpj}</td>
              <td>{cell.nomePregao}</td>
            </tr>
          {/each}
       </tbody>

       <tfoot>
        <tr>
          <td>Total</td>
          <td>R$ {total}</td>
        </tr>
       </tfoot>
        
      </table>
    {/if}
  </div>

  <div>
    Quantidade de Compras: {totalCompra} <br>
    Quantidade de Vendas: {totalVenda} <br>
    Instituições:
  </div>

  

</main>

<style>
  .container-main {
    width: 100%;
    height: 90vh;
    display: grid;
    grid-template-rows: 10% 20% 70%;
    grid-template-columns: 100%;

    justify-content: center;
    align-items: center;

    margin: 0 5rem;
  }

  .container-main > h1 {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .container-main > .search-file {
    width: 100%;
    height: 100%;
    display: grid;
    /* grid-template-rows: 40% 60%; */
    justify-content: center;
    align-items: flex-end;
  }

  .container-main > .search-file > div {
    width: 100%;
    height: 100%;
  
    display: grid;
    grid-template-columns: auto 6rem;
    gap: .2rem;
    align-items: center;
    

  }

  .container-main > .search-file > div > input {
    align-self: center;
    height: 5rem;
    padding: 1.2rem;
  }
  .container-main > .search-file > div > button {
    height: 5rem;
  }

  .container-table {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 2rem;
    overflow: auto;
  }

  .container-table > table {
    width: 100%;
    height: 100%;
    display: block;
    overflow: auto;
  }

  .container-table > table,
  .container-table > table th,
  .container-table > table td {
    border: .1rem solid #a3a3a3;
    border-collapse: collapse;
    
  }

  .container-table > table th,
  .container-table > table td {
    padding: .5rem .8rem;
  }

  .container-table > table th {
    background-color: rgb(14, 74, 58);
  }
  


 
</style>
