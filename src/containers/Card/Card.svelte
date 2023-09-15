<script>

  export let title = "Lista de Ações"
  
</script>

<div class="card-container">
  <h2>{title}</h2>

  <slot></slot>
  
</div>

<style>
  .card-container {
    width: 100%;
    height: 100%;
    border: 2px solid #fff;
    border-radius: .5rem;
    padding: 2rem;
    box-shadow: .5rem .5rem .5rem .3rem rgba(0, 0, 0, 0.2);
    background-color: #2f2f2f;
  }
</style>

