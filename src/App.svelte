<script>
  
  import readXlsxFile from 'read-excel-file'
  import Card from './containers/Card/Card.svelte';
  import Table from './components/TradingTable/TradingTable.svelte';
  import StoksListTable from './components/StoksListTable/StoksListTable.svelte';


  let input
  let file

  let tableHeader = []
  let tableInfo = []
  

  function formatInfo(data) {
    tableHeader = data[0]


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
    tableHeader = []
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
  
  <Card title="Tabela de Negociações">
    <Table className="container-table" tableHeader={tableHeader} tableInfo={tableInfo} />
  </Card>

  <Card title="Tabela das Ações">
    <StoksListTable tableInfo={tableInfo} />
  </Card>
</main>