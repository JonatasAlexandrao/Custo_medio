<script>

  import Card from './containers/Card/Card.svelte';
  import SearchFile from './components/SearchFile/SearchFile.svelte';
  import ReportTable from './components/ReportTable/ReportTable.svelte';
  import NegotiationsTable from './components/NegotiationsTable/NegotiationsTable.svelte';
  import BdrTable from './components/BdrTable/BdrTable.svelte';
  import DividendsTable from './components/DividendsTable/DividendsTable.svelte';

  import Teste from './components/Teste/Teste.svelte'


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
    <NegotiationsTable title="Tabela Negociações"/>
  </Card>
  
  <Card>
    <BdrTable title="Tabela BDR"/>
  </Card>

  <Card>
    <DividendsTable title="Tabela Dividendos"/>
  </Card>

  <Card>
    <Teste/>
  </Card>

  
  
 
</main>

<style>
  .container-main {
    width: 100%;
    height: 100%;
  }
</style>