<script>
  export let data = ""

  let disable = true

  function copyText(text) {
    console.log("text",text)
    
    navigator.clipboard.writeText(text)
    disable = false
    setTimeout(() => {
      disable = true
    }, 1000)
  }

</script>

<td on:click={copyText(data)}>
  {data}
  <span class="alert-box" class:-disable={disable}> Copiado! </span>
</td> 




<style>
  td { 
    position: relative;
    cursor: pointer;
   }

  .alert-box {
    width: 100%;
    position: absolute;

    padding: .5rem;
    background-color: dimgray;
    z-index: 9999;
  }

  .alert-box.-disable {
    display: none;
  }
</style>