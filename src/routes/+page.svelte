
<script>

  import readXlsxFile from 'read-excel-file'

  import Card from '$Components/Card/Card.svelte';
  import GeneralTable from '$lib/Flap-2/GeneralTable/GeneralTable.svelte';
  import TableByCode from '../lib/Flap-3/TableByCode/TableByCode.svelte';
  import InfoPerMonth from '../lib/Flap-4/InfoPerMonth/InfoPerMonth.svelte';

  import formatInfo from '$functions/formatInfo';
  import { NEGOTIATION, NEGOTIATION_BY_CODE, ListNegotiationCodes } from '$store/store'
  import TableDayTrade from '../lib/Flap-5/TableDayTrade/TableDayTrade.svelte';
  

  let text = "Selecione a Planilha de Negociações da B3"
  let input
  let file

  function readFile(event) {
    //clearTable("Negociacoes")
    file = event.target.files[0]
    let array = []

    if(file) {
      readXlsxFile(file).then((rows) => {array = rows })
      .then(() => {
        NEGOTIATION.set(formatInfo.negotiations(array))
      })
    }
  }

  function click() {
    console.log("$NEGOTIATION", $NEGOTIATION)
    //console.log("$NEGOTIATION_BY_CODE", $NEGOTIATION_BY_CODE)
    //console.log("ListNegotiationCodes", $ListNegotiationCodes)

  }

  
</script>


<Card title="Buscar Planilha" idName="flap-1">

  <div class="search-file">

    <label for="spreadsheet"> {text} </label>
    <div> 
      <input type="file" on:change={readFile} bind:this={input} id="spreadsheet">
      <button on:click={click}>OK</button>
    </div>
    
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






