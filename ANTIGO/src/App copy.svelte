<script>

  import readXlsxFile from 'read-excel-file'
  import Card from './containers/Card/Card.svelte';
  import TabelaTeste from './components/StoksListTable/StoksListTable.svelte';

  let input
  let file 
  let active = false

  let cabecalho = []
  
  let tableInfo = []

  let total = 0

  let totalCompra = 0
  let totalVenda = 0
  let acoes = []

  let inputProcurar
  let textInputProcurar
  let infoAcao = {
      cnpj: "",
      codigoNegociacao: "",
      instituicao: "",
      mercado: "",
      nomePregao: "",
      precoMedio:  0,
      quantidadeTotal: 0
    } 




  function isActive() { active = !active }

  function procurar() {
    textInputProcurar = inputProcurar.value
    const info = tableInfo.find( item => item.codigoNegociacao == "AGRO3F")

    infoAcao = {
      cnpj: info.cnpj,
      codigoNegociacao: info.codigoNegociacao,
      instituicao: info.instituicao,
      mercado:info.mercado,
      nomePregao: info.nomePregao,
      precoMedio: averagePrice(info.codigoNegociacao),
      quantidadeTotal: sumOfQuantity(info.codigoNegociacao)
    }

    console.log("infoAcao", infoAcao)
  }
  
  function readFile(event) {
    file = event.target.files[0]
    let array = []

    readXlsxFile(file).then((rows) => {array = rows })
    .then(() => {
      formatInfo(array)
      //totalSun(tableInfo)
      calcCompra(tableInfo)
      acoesList(tableInfo)
      tableInfo = tableInfo

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

    let list = info.map( el => { return el.codigoNegociacao })
    acoes = [ ...new Set(list)]
    console.log(acoes)

  }

  function sumOfQuantity(acao) {

    const response = tableInfo.reduce( (previous, current) => {
      return current.codigoNegociacao == acao ? previous + current.quantidade : previous 
    }, 0)

    return response
  }

  function totalInvestment(acao) {

    const response = tableInfo.reduce( (previous, current) => {
      return current.codigoNegociacao == acao ? previous + current.valor : previous 
    }, 0)

    return parseFloat(response.toFixed(2))

  }

  function averagePrice(acao) {

    const f1 = tableInfo.reduce( (previous, current) => {
      return current.codigoNegociacao == acao ? previous + (current.quantidade * current.preco) : previous 
    }, 0)

    const f2 = sumOfQuantity(acao)

    const response = (f1/f2)

    return parseFloat(response.toFixed(2))

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
  
  <Card title="Tabela de Negociações"><TabelaTeste tableHeader={cabecalho} tableInfo={tableInfo} /></Card>

  <hr/><hr>
  
  <div>
    Quantidade de Compras: {totalCompra} <br>
    Quantidade de Vendas: {totalVenda} <br>
    Ações: {acoes}
  </div>

  <hr/><hr>

  <div class="table-acoes">
    <table>
      <thead>
        <tr>
          <th>Ação:</th>
          <th>Quantidade</th>
          <th>Preço Médio</th>
          <th>Valor Total</th>
        </tr>
      </thead>
      <tbody>
        {#each acoes as acao}
          <tr>
            <td>{acao}</td>
            <td>{sumOfQuantity(acao)}</td>
            <td>{averagePrice(acao)}</td>
            <td>{totalInvestment(acao)}</td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>

  <hr><hr>

  <input type="text" class="procurar" bind:this={inputProcurar}>
  <button on:click={procurar}>{textInputProcurar}</button>
  <div class="summary-acoes">

    
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
            {#if cell.codigoNegociacao == textInputProcurar}
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
            {/if} 
          {/each}
          <tr>
            <td>Total:</td>
            <td>{sumOfQuantity(textInputProcurar)}</td>
          </tr>
          <tr>
            <td>Preço Médio:</td>
            <td>{averagePrice(textInputProcurar)}</td>
          </tr>
        </tbody>        
      </table>
    

    <div class="declaracao-texto">
      {sumOfQuantity(textInputProcurar)} ações -- {textInputProcurar} -- de {infoAcao.nomePregao} , sendo que 10 ações são de bonificações em 2022, ao custo unitário de R$ {averagePrice(textInputProcurar)} , em custódia na corretora {infoAcao.instituicao}
    </div>



  </div>


  <footer>
    Criado por Jônatas Alexandrão
  </footer>


  <Card><TabelaTeste tableHeader={cabecalho} tableInfo={tableInfo}/></Card>

  

</main>

<style>
  .container-main {
    width: 100%;
    height: 100%;
    /* display: grid;
    grid-template-rows: 10% 20% 70%;
    grid-template-columns: 100%;

    justify-content: center;
    align-items: center; */

    display: flex;
    flex-direction: column;
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

  .summary-acoes {
    width: 100%;
    height: 100%;
  }

  .declaracao-texto {
    width: 100%;
    height: 100%;
    border: 2px solid #e2e2e2;
    padding: 2rem;
    margin-top: 2rem;
  }


 
</style>
