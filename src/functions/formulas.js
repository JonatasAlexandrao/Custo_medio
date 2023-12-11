

const formulas = {

  sumOfQuantity: (filteredList, old) => {

    let total = 0
    if(old) {
      total = old.reduce((prev, elem) => {

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

    if(total < 0 && res < 0) {
      return 0
    }
    else if(total < 0) {
      return res
    }
    else if(res < 0) {
      return total
    }
    else {
      const resFinal = (total + res)
      if(resFinal) {
        return resFinal
      }
      else {
        return 0
      }
    }



      //return (totalQtdOld + res)

  },

  sumOfTotal: (filteredList, old) => {

    let total = 0
    if(old) {
      total = old.reduce((prev, elem) => {

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

    if(total < 0 && res < 0) {
      return 0
    }
    else if(total < 0) {
      return res
    }
    else if(res < 0) {
      return total
    }
    else {
      return (total + res)
    }
     

  },

  averagePrice: (sumQtd, sumTotal) => {
    return sumTotal / sumQtd
  }
  
}

export default formulas