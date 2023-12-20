

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


    //return res < 1 ? total : (total + res)
    return (total + res)
    

  },

  sumOfTotal: (filteredList, old) => {

    let total = 0
    if(old) {
      total = old.reduce((prev, elem) => {

        if(elem[2]) {
          let newElem = parseFloat(elem[2].replace(".", ""))
          newElem = parseFloat(elem[2].replace(",", "."))
          return prev + newElem
        }
        else {
          return prev
        }
          
        
      },0)
    }

    const res = filteredList.reduce( (prev, elem) => {

      if(elem.tipoMovimentacao === "Compra"){
        return prev + elem.valor
      }
      /*else if(elem.tipoMovimentacao === "Venda"){
        return prev - elem.valor
      }*/
      else {
       return prev
      }
    }, 0)


    return (total + res)

  },

  averagePrice: (sumQtd, sumTotal) => {
    console.log("sumTotal", sumTotal)
    console.log("sumQtd", sumQtd)
    return sumTotal / sumQtd
  }
  
}

export default formulas