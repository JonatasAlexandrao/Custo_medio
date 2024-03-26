
<script>

  import { NEGOTIATION } from '$store/store'
  import formatInfo from "$functions/formatInfo";
  import masc from "$functions/masc";
  import SelectBox from '$Components/SelectBox/SelectBox.svelte';
  export let negotiationInfo
  export let ListNegotiationCodes
  
  let tableHeader = ["Posição", "Data", "Movimentação", "Instituição", "Código", "Qtd", "Preço", "Valor"]
  
  let tableHeaderAdd = ["Pos.", "Código", "Qtd", "Preço", "Valor"]
  
  let select_filterMovimentacao
  let select_filterData
  let select_filterCodigo
  let select_typeEntry

  let options_Movimentacao = [
    {value: "", text: ""},
    {value: "Compra", text: "Compra"},
    {value: "Venda", text: "Venda"}
  ]
  let options_Codes = createOptionsCodes()

  let options_Data = [
    {value: "", text: ""},
    {value: "01", text: "1 - Janeiro"},
    {value: "02", text: "2 - Fevereiro"},
    {value: "03", text: "3 - Março"},
    {value: "04", text: "4 - Abril"},
    {value: "05", text: "5 - Maio"},
    {value: "06", text: "6 - Junho"},
    {value: "07", text: "7 - Julho"},
    {value: "08", text: "8 - Agosto"},
    {value: "09", text: "9 - Setembro"},
    {value: "10", text: "10 - Outubro"},
    {value: "11", text: "11 - Novembro"},
    {value: "12", text: "12 - Dezembro"},
    
  ]

  
  
  let filteredNegotiationInfo = negotiationInfo
  
  $:  txtPosition = select_typeEntry == "Ano Anterior" ? 0 : ""
  $:  txtCode = select_filterCodigo 
  let txtQtd = ""
  $:  txtPrice = select_typeEntry == "Bonificação" ? 0 : ""
  let txtValue = ""
  let txtInstitution = ""
  
  $:  hasPosition = txtPosition === "" ? true : false
  $:  hasCode = txtCode === "" ? true : false
  $:  hasQtd = txtQtd === "" ? true : false
  $:  hasPrice = txtPrice === "" ? true : false
  $:  hasValue = txtValue === "" ? true : false
  
  $: important = [hasPosition, hasCode, hasQtd, hasPrice, hasValue]
  
  let inputPrice
  let inputPosition
  
  function createOptionsCodes() {
    let newList = [{ value: "", text: "" }]

    ListNegotiationCodes.forEach(element => {
      newList.push({ value: element, text: element })
    });

    return newList
  }
  
  function filterInfo() {
    
    console.log("testeeee", select_filterMovimentacao)
    let list = negotiationInfo
  
    if(select_filterMovimentacao) {
      list = negotiationInfo.filter(elem => elem.tipoMovimentacao === select_filterMovimentacao)
    }
  
    if(select_filterData) {
      list = list.filter(elem => elem.mes === select_filterData)
    }
  
    if(select_filterCodigo) {
      list = list.filter(elem => elem.codigoNegociacao === select_filterCodigo || elem.codigoNegociacao === select_filterCodigo + "F")
    }
  
    filteredNegotiationInfo = list
  
  }
  
  
  function cleanFilters() {
  
    txtQtd = ""
    txtPrice = ""
    txtValue = ""
    txtPosition = 0
  
    inputPrice.disabled = false
    inputPosition.disabled = true
  
    select_filterMovimentacao = ""
    select_filterCodigo = ""
    select_filterData = ""
    select_typeEntry = "Ano Anterior"
  
    filterInfo()
  
  }
  
  const allFilled = () => {
    let isValid = false
    if (select_typeEntry) console.log("Selecione o Tipo")
    else if (txtPosition) console.log("Digite a Posição")
    else if (txtCode) console.log("Digite o Codigo da Ação")
    else if (txtQtd) console.log("Digite a Quantidade")
    else if (txtPrice) console.log("Digite o Preço")
    else if (txtValue) console.log("Digite o Valor Total")
    else isValid = true
  
    return isValid
  }
  
  function addNewEntry() {
  
    const qtd = parseInt(txtQtd)
    const price = txtPrice ? parseFloat(txtPrice.replace(",", ".")) : 0
    const value = parseFloat(txtValue.replace(",", "."))
    let position = txtPosition
  
    function add() {
      const newData = {    
        posicao: position,
        dia: "",
        mes: "",
        ano: "",
        data: "",
        codigoNegociacao: txtCode,
        instituicao: txtInstitution,
        mercado: "",
        prazoVencimento: "",
        preco: price,
        quantidade: qtd,
        tipoMovimentacao: select_typeEntry,
        valor: value
      }
    
      let data = $NEGOTIATION
    
      data.push(newData)
      let dataOrganized = formatInfo.sortListByPosition(data)
      NEGOTIATION.set(dataOrganized)
  
      cleanFilters()
    }
  
  
    if(allFilled()) {
      const list = $NEGOTIATION.filter((elem) => { 
        const codeEqual = elem.codigoNegociacao == txtCode || elem.codigoNegociacao == txtCode + "F"
        return codeEqual ? elem : "" 
      }) 
    
  
      const lastYear = select_typeEntry == "Ano Anterior"
      const bonus = select_typeEntry == "Bonificação"
      
      if(lastYear) {
        const lowestPosition = list.reduce((pos, elem) => {
          return pos < elem.posicao ? pos : elem.posicao
        }, list[0].posicao)
  
        position = lowestPosition - 0.01
        add()
      }
      else if(bonus) {
  
        const positionExiste = list.reduce((pos, elem) => {
          elem.posicao == position ? pos = true : ""
          return pos
        }, false)
  
        if(positionExiste) {
          position = parseFloat(position)
          position = position + 0.01
          add()
        }
        else{
          console.log("Posição não existe")
        }
             
      }
  
  
    }
    else {
      console.log("Preencha todos os campos")
    }
    
  }
  
  function sumValue() {
    let price = txtPrice
    if(txtPrice){
      price = txtPrice.replace(",", ".")
    }
  
    txtValue = txtQtd * price
  
    txtValue = parseFloat(txtValue)
    txtValue = txtValue.toFixed(2)
    txtValue = txtValue.replace(".", ",")
  }
  
  function isInteger(num) {
     return num % 1 === 0 ? num : num.toFixed(2)
  }
  
  function optionSelected() {
    const lastYear = select_typeEntry == "Ano Anterior"
    const bonus = select_typeEntry == "Bonificação"
  
    if(bonus) {
      inputPrice.disabled = true
      inputPosition.disabled = false
      txtPrice = 0
      txtPosition = ""
      sumValue()
  
    }
    else if(lastYear) {
      inputPrice.disabled = false
      inputPosition.disabled = true
      txtPosition = 0
      txtPrice = ""
      sumValue()
  
    }
  }
  
  
</script>
  
    <div class="container-filter-settings">

      <SelectBox 
        containerClass="filter-data"
        forId="filterData"
        textLabel="Data"
        bind:selectValue = {select_filterData}
        filterInfo = {filterInfo}
        options = {options_Data}
      />
      
      <SelectBox 
        containerClass="filter-movimentacao"
        forId="filterMovimentacao"
        textLabel="Movimentação"
        bind:selectValue = {select_filterMovimentacao}
        filterInfo = {filterInfo}
        options = {options_Movimentacao}
      />

      <SelectBox 
        containerClass="filter-codigo"
        forId="filterCodigo"
        textLabel="Código"
        bind:selectValue = {select_filterCodigo}
        filterInfo = {filterInfo}
        options = {options_Codes}
      />
    
      <button class="btn-clean-filters" on:click={cleanFilters}>Limpar</button>
    </div>
  
    <div class="container-add-table-entry">
      <table class="table-base">
        <thead>
          <tr>
            {#each tableHeaderAdd as columns}
              <th>{columns}</th>
            {/each}
          </tr>
        </thead>
        <tbody>
          <tr class="container-inputs">
            <td class:-important={important[0]}>
              <input type="text" bind:value={txtPosition} bind:this={inputPosition} disabled>
            </td>
            <td class:-important={important[1]}>
              <input type="text" value={txtCode} disabled>
            </td>
            <td class:-important={important[2]}>
              <input type="text" bind:value={txtQtd} on:input={sumValue}>
            </td>
            <td class:-important={important[3]}>
              <input type="text" bind:value={txtPrice} on:input={sumValue} bind:this={inputPrice}>
            </td>
            <td class:-important={important[4]}>
              <input type="text" bind:value={txtValue} on:input={sumValue}>
            </td>
          </tr>
        </tbody>        
      </table>
      <div class="add-entry">
        <span>
          <label for="typeEntry">Tipo:</label>
          <select name="" id="typeEntry" bind:value={select_typeEntry} on:change={optionSelected}>
            <option value="Ano Anterior">Ano Anterior</option>
            <option value="Bonificação">Bonificação</option>
          </select>
        </span>
        
        <button on:click={addNewEntry}>Adicionar</button>
      </div>
    </div>
  
    <div class="container-table-base -negotiation">
    
      <table class="table-base">
        <thead>
          <tr>
            {#each tableHeader as columns}
              <th>{columns}</th>
            {/each}
          </tr>
        </thead>
        <tbody>
          {#each filteredNegotiationInfo as data}
            <tr>
              <td>{isInteger(data.posicao)}</td> 
              <td>{data.data}</td> 
              <td>{data.tipoMovimentacao}</td> 
              <td>{data.instituicao}</td> 
              <td>{data.codigoNegociacao}</td> 
              <td>{data.quantidade}</td> 
              <td>{masc.realCurrency(data.preco)}</td> 
              <td>{masc.realCurrency(data.valor)}</td>
            </tr>
            {/each}
          
        </tbody>        
      </table>
    
    </div>
  
  
  <style>
  
    .container-filter-settings {
      display: grid;
      grid-template-columns: repeat(3, minmax(5rem, 15rem)) minmax(3rem, 10rem);
      margin-bottom: 1rem;
      justify-content: center;
      
    }
  
    .container-filter-settings .btn-clean-filters {
      margin: 1rem 1rem;
    }
  
    /*---------------------------------*/
  
    .container-add-table-entry {
      display: flex;
      flex-direction: column;
      width: 100%;
      border: .2rem solid #a3a3a3 ;
  
      overflow: auto;
      padding: .5rem;
      margin-bottom: 1rem;
    }
  
    .container-add-table-entry .table-base {
      border: none;
    }
    .container-add-table-entry .table-base tr{
      display: grid;
      justify-content: center;  
  
      grid-template-columns: 
        minmax(5rem, 14rem) /*1 posição*/
        minmax(8rem, 13rem) /*3 Codigo*/
        minmax(7rem, 13rem) /*4 Quantidade*/
        minmax(10rem, 13rem) /*5 Preco*/
        minmax(11rem, 15rem) /*6 Valor*/
      ;
    }
  
    .container-add-table-entry .table-base tr:hover {
      background-color: rgba(163, 163, 163, 0);
    }
  
    .container-add-table-entry .table-base .container-inputs td {
      padding: 0;
    }
  
    .container-add-table-entry .table-base .container-inputs td.-important {
      border: .3rem solid #05fbff;
    }
    
    .container-add-table-entry .table-base .container-inputs input {
      width: 100%;
      border-radius: 0;
      background-color: rgba(163, 163, 163, .2);
    }
  
    .container-add-table-entry .table-base .container-inputs input:focus {
      background-color:rgba(42, 42, 42, 0.8);
    }
  
    
  
    .container-add-table-entry > .add-entry {
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 3rem;
      padding: .3rem;
  
    }
  
    .container-add-table-entry > .add-entry span {
      display: flex;
      justify-content: center;
      align-items: center;
     
    }
  
    .container-add-table-entry > .add-entry span > label{
      padding-right: 2rem;
    }
  
    #typeAdd {
      padding: .2rem .5rem;
    }
  
    #typeAdd option {
      padding: .5rem;
    }
  
    /*---------------------------------*/
  
    .container-table-base .table-base tr {
      display: grid;
      justify-content: center;  
    }
  
    /* ========== Negociacoes ============*/
    .container-table-base.-negotiation .table-base tr{
      grid-template-columns: 
        minmax(7rem, 7rem) /*1 Posicao*/
        minmax(10rem, 14rem) /*5 data*/
        minmax(10rem, 12rem) /*6 Movimentacao*/
        minmax(14rem, 20rem) /*9 Instituicao*/
        minmax(9rem, 13rem) /*10 Codigo*/
        minmax(9rem, 13rem) /*11 Quantidade*/
        minmax(10rem, 13rem) /*12 Preco*/
        minmax(11rem, 15rem) /*13 Valor*/
      ;
    }
  
    .container-table-base.-negotiation {
      max-height: 70vh;
      margin-bottom: 1rem;
    }
  
  
    
    /* ========== Exceções ============*/
    .-negotiation .table-base tr th:nth-child(1),
    .-negotiation .table-base tr th:nth-child(3),
    .-negotiation .table-base tr td:nth-child(4) {
      font-size: 1.2rem;
    }
   
   
  </style>