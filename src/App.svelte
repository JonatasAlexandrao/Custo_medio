<script>

  import Card from './containers/Card/Card.svelte';
  import SearchFile from './components/SearchFile/SearchFile.svelte';
  import ReportTable from './components/ReportTable/ReportTable.svelte';
  import TradingTable from './components/TradingTable/TradingTable.svelte';


</script>

<main class="container-main">
  

  <Card title="Selecionar Arquivos"> 
    <SearchFile text="Selecione a Planilha de Relatório Anual da B3" spreadsheet="RelatorioAnual"/>
    <SearchFile text="Selecione a Planilha de Negociações da B3" spreadsheet="Negociacoes"/> 
  </Card>

  <Card> 
    <ReportTable title="Tabela Relatório Anual"/> 
  </Card>

  <Card> 
    <TradingTable title="Tabela Negociações"/>
  </Card>

  
  
 
</main>

<style>
  .container-main {
    width: 100%;
    height: 100%;
  }
</style>