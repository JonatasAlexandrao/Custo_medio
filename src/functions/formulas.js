

const formulas = {

  sumOfQuantity: (filteredList, old) => {

    let totalQtdOld = 0
    if(old) {
      totalQtdOld = old.reduce((prev, elem) => {

        if(elem[1])
          return prev + parseInt(elem[1])
        else
          return prev
        
      },0)
    }

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

      return (totalQtdOld + res)

  },

  sumOfTotal: (filteredList, old) => {

    let totalSumOld = 0
    if(old) {
      totalSumOld = old.reduce((prev, elem) => {

        if(elem[2])
          return prev + parseFloat(elem[2].replace(",", "."))
        else
          return prev
        
      },0)
    }

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

      return (totalSumOld + res)

  },

  averagePrice: (sumQtd, sumTotal) => {
    return sumTotal / sumQtd
  }
  
}

export default formulas