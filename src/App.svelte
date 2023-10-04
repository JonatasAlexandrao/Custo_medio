<script>

  import Card from './containers/Card/Card.svelte';
  import SearchFile from './components/SearchFile/SearchFile.svelte';


  import { list } from './stores/stores';
  $list = ["333", "444"]


</script>

<main class="container-main">
  

  <Card title="Teste de Planilha!"> 
    <SearchFile/>
  </Card>


  <div class="teste">
    {$list}
  </div>
  
 
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