
<script>

  import readXlsxFile from 'read-excel-file'

  import { NEGOTIATION, NEGOTIATION_BY_CODE, ListNegotiationCodes } from '$store/store'

  import Card from '$Components/Card/Card.svelte';
  import GeneralTable from '$lib/Flap-2/GeneralTable/GeneralTable.svelte';
  import TableByCode from '../lib/Flap-3/TableByCode/TableByCode.svelte';
  import InfoPerMonth from '../lib/Flap-4/InfoPerMonth/InfoPerMonth.svelte';
  import TableDayTrade from '../lib/Flap-5/TableDayTrade/TableDayTrade.svelte';
  import formatInfo from '$functions/formatInfo';
  

  let text = "Selecione a Planilha de Negociações da B3"
  let input
  let file

  function readFile(event) {
    file = event.target.files[0]
    let array = []

    if(file) {
      readXlsxFile(file).then((rows) => {array = rows })
      .then(() => {
        NEGOTIATION.set(formatInfo.negotiations(array))
      })
    }
  }
  
</script>

<div class="container-tags">
  <Card title="Buscar Planilha" idName="flap-1">
  
    <div class="search-file">
  
      <label for="spreadsheet"> {text} </label>
      <input type="file" on:change={readFile} bind:this={input} id="spreadsheet">
      
    </div>
  
  </Card>
  
  <Card title="Tabela de Geral" idName="flap-2">
    <GeneralTable negotiationInfo={$NEGOTIATION} ListNegotiationCodes={$ListNegotiationCodes}/>
  </Card>
  
  <Card title="Tabela por Codigo" idName="flap-3">
    <TableByCode negotiationByCode={$NEGOTIATION_BY_CODE} ListNegotiationCodes={$ListNegotiationCodes}/>
  </Card>
  
  <Card title="Informações por mês" idName="flap-4">
    <InfoPerMonth negotiationInfo={$NEGOTIATION} />
  </Card>
  
  <Card title="Tabela DayTrade" idName="flap-5">
    <TableDayTrade />
  </Card>
</div>

<style>
  .search-file input{
    width: 90%;
  }

  .container-tags {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    
  }
</style>






