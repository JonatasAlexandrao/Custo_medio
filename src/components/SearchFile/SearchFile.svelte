<script>
  
  import readXlsxFile from 'read-excel-file'
  import { list } from '../../stores/stores';
  import { listNegotiations } from '../../stores/stores';

  export let text = ""
  export let spreadsheet = ""

  let input
  let file
  


  function readFile(event) {

    if(spreadsheet === "RelatorioAnual") {
      clearTable()
      file = event.target.files[0]
      let array = []

      if(file) {
        readXlsxFile(file).then((rows) => {array = rows })
        .then(() => {
          formatInfo(array)
          $list = $list
        }) 
      }
    }
    else if (spreadsheet === "Negociacoes") {
      clearTable()
      file = event.target.files[0]
      let array = []

      if(file) {
        readXlsxFile(file).then((rows) => {array = rows })
        .then(() => {
          formatInfo(array)
          $listNegotiations = $listNegotiations
        }) 
      }
    }

    

  }

  function formatInfo(data) {

    if(spreadsheet === "RelatorioAnual") {
      data.forEach(element => {
      $list.push({
        produto: element[0], 
        instituicao: element[1],
        conta: element[2],
        codigoNegociacao: element[3],
        cnpj: element[4],
        codigoISIN: element[5],
        tipo: element[6],
        escriturador: element[7],
        quantidade: element[8],
        quantidadeDisponivel: element[9],
        quantidadeIndisponivel: element[10],
        motivo: element[11],
        preçoFechamento: element[12],
        valorAtualizado: element[13]
        
      })
    });  
    $list.shift()
    }
    
    else if (spreadsheet === "Negociacoes") {
      console.log("aqui")
    }


    console.log("RelatorioAnual", $list)
    console.log("Negociacoes", $listNegotiations)

    

  }

  function clearTable() {
    
    if(spreadsheet === "RelatorioAnual") {
      $list = []
    }
    else if (spreadsheet === "Negociacoes") {
      $listNegotiations = []
    }
  }


</script>



<div class="search-file">
  <label for=""> {text} </label>
  <div> <input type="file" on:change={readFile} bind:this={input}> </div>
  
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
    font-size: 1.8rem;
  }

</style>