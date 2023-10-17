<script>  
  export let title = ""
</script>

<div class="card-container">
  {#if title}
    <h2>{title}</h2>
  {/if}

  <slot></slot>
</div>

<style>
  .card-container {
    width: 100%;
    height: 100%;

    padding: 2rem;
    margin-bottom: 1rem;

    border: .2rem solid #fff;
    border-radius: .5rem;
    box-shadow: .5rem .5rem .5rem .3rem rgba(0, 0, 0, 0.2);
    background-color: #2f2f2f;
  }

  .card-container > h2 {
    width: 100%;
    text-align: center;
    margin-bottom: 3rem;
  }


</style>

