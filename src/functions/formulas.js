

const formulas = {

  sumOfQuantity: (filteredList) => {

    const res = filteredList.reduce( (prev, elem) => {

      if(elem.tipoMovimentacao === "Compra"){
        return prev + elem.quantidade
      }
      else if(elem.tipoMovimentacao === "Venda"){
        return prev - elem.quantidade
      }
      else {
       return prev
      }
      }, 0)

      return res

  },

  sumOfTotal: (filteredList) => {

    const res = filteredList.reduce( (prev, elem) => {

      if(elem.tipoMovimentacao === "Compra"){
        return prev + elem.valor
      }
      else if(elem.tipoMovimentacao === "Venda"){
        return prev - elem.valor
      }
      else {
       return prev
      }
      }, 0)

      return res

  },

  averagePrice: (filteredList) => {

    const qtd = formulas.sumOfQuantity(filteredList)
    const total = formulas.sumOfTotal(filteredList)

    const res = total / qtd

    return res

  }
  
}

export default formulas