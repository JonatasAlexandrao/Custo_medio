<script>
  
  import readXlsxFile from 'read-excel-file'
  import { list } from '../../stores/stores';

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
    $list = tableInfo

    console.log('$list', $list)

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



<div class="search-file">
  <label for=""> Escolha um arquivo de planilha e clique em OK. </label>
  <div> <input type="file" on:change={readFile} bind:this={input}> </div>

  <div class="teste">
    {$list}
  </div>
  
</div>


<style>
  
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

  .teste {
    width: 100%;
    height: 100%;
    background-color: rgba(0, 100, 0, .5);
  }


</style>