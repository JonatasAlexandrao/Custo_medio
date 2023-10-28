<script>  
  export let title = ""
  let maximize = false
</script>

<div class="card-container" class:-active={maximize}>

  {#if title}
    <div class="title">
      <h2>{title}</h2>
      <button on:click={ () => maximize = !maximize }>Abrir/fechar</button>
    </div>
  {/if}

  <div class="slot">
    <slot></slot>
  </div>
  
</div>

<style>
  .card-container {
    width: 100%;
    height: 7rem;
    display: grid;

    overflow: hidden;

    padding: 2rem;
    margin-bottom: 1rem;

    border: .2rem solid #fff;
    border-radius: .5rem;
    box-shadow: .5rem .5rem .5rem .3rem rgba(0, 0, 0, 0.2);
    background-color: #2f2f2f;
  }

  .card-container.-active {
    height: auto;
    overflow: auto;
  }

  .card-container .title {
    display: flex;
    justify-content: space-between;
    margin-bottom: 2rem;
    width: 100%;

    /*display: grid;
    grid-template-columns: auto auto;*/
  }

  .card-container .title > h2 {
    width: 100%;
    height: 100%;
    
    display: flex;
    align-items: center;
    
    margin: 0;
  }


  .card-container .slot {
    width: 100%;
    overflow: hidden;
  }

</style>

