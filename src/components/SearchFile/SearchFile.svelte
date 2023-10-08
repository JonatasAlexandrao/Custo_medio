<script>
  
  import readXlsxFile from 'read-excel-file'
  import { listReport, listNegotiations, listBDR, listDividends } from '../../stores/stores';

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
          formatInfo(array, "Report")
          $listReport = $listReport
        }) 

        readXlsxFile(file, { sheet: 2}).then((rows) => {array = rows })
        .then(() => {
          if(array){
            formatInfo(array, "BDR")
            $listBDR = $listBDR
          }
        }) 

        readXlsxFile(file, { sheet: 3}).then((rows) => {array = rows })
        .then(() => {
          if(array){
            formatInfo(array, "Dividends")
            $listDividends = $listDividends
          }
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
          formatInfo(array, "Negotiations")
          $listNegotiations = $listNegotiations
        }) 
      }
    }

    

  }

  function formatInfo(data, sheet) {

    if(sheet === "Report") {
      data.forEach(element => {
      $listReport.push({
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
    $listReport.shift()
    }
    
    else if (sheet === "Negotiations") {
      data.forEach(element => {
      $listNegotiations.push({
        data: element[0], 
        tipoMovimentacao: element[1],
        mercado: element[2],
        prazoVencimento: element[3],
        instituicao: element[4],
        codigoNegociacao: element[5],
        quantidade: element[6],
        preco: element[7],
        valor: element[8]
      })
    });
    $listNegotiations.shift()
    }

    else if (sheet === "BDR") {
      data.forEach(element => {
      console.log("element", element)

      $listBDR.push({
        
      })
      
      
    });
    $listBDR.shift()
    }

    else if (sheet === "Dividends") {
      data.forEach(element => {
      $listDividends.push({
        
      })
    });
    $listDividends.shift()
    }


    console.log("RelatorioAnual", $listReport)
    console.log("Negociacoes", $listNegotiations)
    console.log("BDR", $listBDR)
    console.log("Dividends", $listDividends)

    

  }

  function clearTable() {
    
    if(spreadsheet === "RelatorioAnual") {
      $listReport = []
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