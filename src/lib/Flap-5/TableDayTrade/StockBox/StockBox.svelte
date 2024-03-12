<script>

  import masc from "$functions/masc";

  export let stock

  const tableHeaderCode = ["Tipo", "Preço", "Qtd", "Total"]
  let disable = true
  $: buttonText = disable ? "+" : "-"

  const handleClick = () => disable = !disable

</script>


<div class="-daytrade-table">
  <div class="table-title-daytrade">
    <span>{stock.codigo}</span>
    <span>{stock.data}</span>
    <span class="price"> Lucro: {masc.realCurrency(stock.lucro)} </span>
    <button class="btn-On-Off" on:click={handleClick}>{buttonText}</button>
  </div>
  
  <table class="table-base" class:-disable={disable}>
    
    <thead>
      <tr>
        {#each tableHeaderCode as columns}
          <th>{columns}</th>
        {/each}
      </tr>
    </thead>
  
    <tbody>
      <tr>          
        <td>{stock.dados[0].tipoMovimentacao}</td>
        <td>{masc.realCurrency(stock.dados[0].preco)}</td>
        <td>{stock.dados[0].quantidade}</td>
        <td>{masc.realCurrency(stock.dados[0].valor)}</td>  
      </tr>
  
      <tr>
        <td>{stock.dados[1].tipoMovimentacao}</td>
        <td>{masc.realCurrency(stock.dados[1].preco)}</td>
        <td>{stock.dados[1].quantidade}</td>
        <td>{masc.realCurrency(stock.dados[1].valor)}</td>
      </tr>
  
    </tbody>        
  </table>
</div>



<style>
  .table-title-daytrade {
    width: 100%;
    height: 3.5rem;

    display: grid;
    grid-template-columns: 1fr 1fr 2fr 4rem;
    justify-items: center;
    align-items: center;
    margin-bottom: .5rem;
    gap: 1rem;

    border: .2rem solid #a3a3a3;
    background-color: rgb(3, 64, 57);
  }
  

  .table-title-daytrade .btn-On-Off {
    width: 100%;
    height: 100%;

    display: grid;
    justify-content: center;
    align-content: center;

  }

  .table-base tr {
    display: grid;
    justify-content: center;  
  }

  .-daytrade-table .table-base tr{
    grid-template-columns: 
      minmax(10rem, 14rem) /*1 Posicao*/
      minmax(10rem, 14rem) /*1 Posicao*/
      minmax(10rem, 14rem) /*1 Posicao*/
      minmax(10rem, 14rem) /*1 Posicao*/
    ;
  }

  .-daytrade-table .table-base {
    display: block;
    margin-bottom: 1rem;
  }
  .-daytrade-table .table-base.-disable {
    display: none;
  }
</style>