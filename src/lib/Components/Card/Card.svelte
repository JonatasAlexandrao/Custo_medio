<script>  
  export let title = ""
  export let idName = ""
  let maximize = false
  let open = false
</script>

<div class="card-container" class:-active={maximize} id={idName}>

  {#if title}
    <div class="title">
      <h2>{title}</h2>
      <button on:click={ () => {maximize = !maximize; open = !open} }>Abrir/fechar</button>
    </div>
  {/if}

  <div class="slot">
    {#if open}
      <slot></slot>
    {/if}
    
  </div>
  
</div>

<style>
  .card-container {
    width: 100%;
    max-width: 100rem;
    min-width: 50rem;
    height: 7rem;
    display: grid;

    overflow: hidden;

    padding: 2rem;
    margin-bottom: 1rem;

    border: .2rem solid #a3a3a3;
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

