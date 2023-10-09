<script>
  
  import readXlsxFile from 'read-excel-file'
  import { listReport, listNegotiations, listBDR, listDividends } from '../../stores/stores';
  import formatInfo from '../../functions/formatInfo';

  export let text = ""
  export let spreadsheet = ""

  let input
  let file

  function readFile(event) {

    if(spreadsheet === "RelatorioAnual") {
      clearTable("RelatorioAnual")
      
      file = event.target.files[0]
      let array = []

      if(file) {
        readXlsxFile(file).then((rows) => {array = rows })
        .then(() => {
          $listReport = formatInfo.report(array)
        }) 

        readXlsxFile(file, { sheet: 2}).then((rows) => {array = rows })
        .then(() => {
          if(array){
            $listBDR = formatInfo.bdr(array)
          }
        }) 

        readXlsxFile(file, { sheet: 3}).then((rows) => {array = rows })
        .then(() => {
          if(array){
            $listDividends = formatInfo.dividends(array)
          }
        })
      }
    }

    else if (spreadsheet === "Negociacoes") {
      clearTable("Negociacoes")
      file = event.target.files[0]
      let array = []

      if(file) {
        readXlsxFile(file).then((rows) => {array = rows })
        .then(() => {
          $listNegotiations = formatInfo.negotiations(array)
        }) 
      }
    }

  }

  

  function clearTable(table) {
    
    if(table === "RelatorioAnual") {
      $listReport = []
    }
    else if (table === "Negociacoes") {
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