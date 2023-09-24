<script>
  
  import readXlsxFile from 'read-excel-file'
  import Card from './containers/Card/Card.svelte';
  import Table from './components/TradingTable/TradingTable.svelte';
  import StoksListTable from './components/StocksListTable/StocksListTable.svelte';
  import SearchStocks from './components/SearchStocks/SearchStocks.svelte';


  let input
  let file

  let tableInfo = []
  

  function formatInfo(data) {

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

  function readFile(event) {

    clearTable()
    file = event.target.files[0]
    let array = []

    if(file) {
      readXlsxFile(file).then((rows) => {array = rows })
      .then(() => {
        formatInfo(array)
        tableInfo = tableInfo
      }) 
    }

  }

  function clearTable() {
    tableInfo = []
  }


</script>

<main class="container-main">
  <h1>Teste de Planilha!</h1>

  <div class="search-file">
    <label for=""> Escolha um arquivo de planilha e clique em OK. </label>
    <div>

      <input type="file" on:change={readFile} bind:this={input}> 
      <!-- <button on:click={isActive}>OK</button> -->
    </div>
    
  </div>
  
  <Card>
    <Table tableInfo={tableInfo} />
  </Card>

  <Card>
    <StoksListTable tableInfo={tableInfo} />
  </Card>

  <Card>
    <SearchStocks tableInfo={tableInfo}/>
  </Card>
</main>

<style>
  .container-main {
    width: 100%;
    height: 100%;
  }

  .container-main > h1 {
    width: 100%;
    text-align: center;
    margin-bottom: 3rem;
  }

  .search-file {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 1rem;
    margin-bottom: 1rem;

    border: 2px solid #fff;
    border-radius: .5rem;
    background-color: #2f2f2f;

    font-size: 2rem;
  }
  .search-file > label {
    margin-bottom: .5rem;
  }


</style>