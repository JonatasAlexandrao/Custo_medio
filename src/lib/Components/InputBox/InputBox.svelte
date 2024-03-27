<script>

  import mask from "$functions/mask";

  export let typeMask =""
  export let disabled = false
  export let value = 0
  export let className = ""
  
  function inputMask(type, text) {
    if(type === "num") {
      text = mask.inputNum(text)
    }
    else if(type === "currency") {
      text = mask.inputRealCurrency(text)
    }
    value = text
  }

</script>

<input type="text" 
  class={className}
  bind:value={value} 
  disabled={disabled}
  on:input={inputMask(typeMask, value)}
>


<style>
  input { width: 100%; }
</style>