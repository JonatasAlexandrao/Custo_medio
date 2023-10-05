<script>

  import { list } from './stores/stores';
  import { listNegotiations } from './stores/stores';

  import Card from './containers/Card/Card.svelte';
  import SearchFile from './components/SearchFile/SearchFile.svelte';
  import ReportTable from './components/ReportTable/ReportTable.svelte';


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
    <!-- <ReportTable title="Tabela Negociações" tableInfo={$listNegotiations}/>  -->
  </Card>

  
  
 
</main>

<style>
  .container-main {
    width: 100%;
    height: 100%;
  }

  .teste {
    width: 100%;
    height: 100%;
    background-color: rgba(255, 255, 255, 0.5);
  }

</style>