<script>

  import Card from './containers/Card/Card.svelte';
  import SearchFile from './components/SearchFile/SearchFile.svelte';
  import ReportTable from './components/Tables/ReportTable/ReportTable.svelte';
  import NegotiationsTable from './components/Tables/NegotiationsTable/NegotiationsTable.svelte';
  import BdrTable from './components/Tables/BdrTable/BdrTable.svelte';
  import DividendsTable from './components/Tables/DividendsTable/DividendsTable.svelte';

  import Teste from './components/Teste/Teste.svelte'
  import PrecoMedio from './components/AveragePrice/AveragePrice.svelte';


</script>

<main class="container-main">
  

  <Card title="Selecionar Arquivos"> 
    <SearchFile text="Selecione a Planilha de Relatório Anual da B3" spreadsheet="RelatorioAnual"/>
    <SearchFile text="Selecione a Planilha de Negociações da B3" spreadsheet="Negociacoes"/> 
  </Card>

  <Card title="Tabelas">

    <Card title="Tabela Relatório Anual"> 
      <ReportTable /> 
    </Card>

    <Card title="Tabela Negociações"> 
      <NegotiationsTable />
    </Card>
    
    <Card title="Tabela BDR">
      <BdrTable />
    </Card>

    <Card title="Tabela Dividendos">
      <DividendsTable />
    </Card>

  </Card>

  <Card title = "Preço Médio">
    <PrecoMedio />
  </Card>

  <!-- <Card>
    <Teste/>
  </Card> -->

  
  
 
</main>

<style>
  .container-main {
    width: 100%;
    height: 100%;
  }
</style>