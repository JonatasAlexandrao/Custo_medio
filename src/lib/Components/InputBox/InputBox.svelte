<script>

  import mask from "$functions/mask";

  export let typeMask =""
  export let disabled = false
  export let value = 0
  export let className = ""

  let fontSize = "16px"
  let input
  
  function inputMask(type, text) {
    if(type === "num") {
      text = mask.inputNum(text)
    }
    else if(type === "currency") {
      text = mask.inputRealCurrency(text)
    }
    value = text
    textSize()
  }

  function textSize() {

    if(value.length > 11) {
      fontSize = "10px"
    }
    else if(value.length > 9) {
      fontSize = "12px"
    }
    else if(value.length > 7) {
      fontSize = "14px"
    }
    else if(value.length > 0) {
      fontSize = "16px"
    }
 
  }

</script>

<input type="text" 
  class={className}
  style="font-size: {fontSize}"
  bind:value={value} 
  disabled={disabled}
  on:input={inputMask(typeMask, value)}
  bind:this={input}
>


<style>
  input { 
    width: 100%;
    height: 100%;
    font-size: var(--font-size);
  }
</style>