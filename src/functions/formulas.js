
function filterMonth(database, month) {
  const result = database.filter(elem => parseInt(elem.mes) === month)
  return result
}

function filterSale(database) {

  const result = database.filter(elem => elem.tipoMovimentacao === "Venda")
  return result
}


function dayTradeProfitCalc(database) {

  database.forEach(element => {


    const sellFirst = element.dados[0].tipoMovimentacao === "Venda"

    let qtd0 = element.dados[0].quantidade
    let qtd1 = element.dados[1].quantidade

    const preco0 = element.dados[0].preco
    const preco1 = element.dados[1].preco

    qtd0 < qtd1 ? qtd1 = qtd0 : qtd0 = qtd1

    const valor0 = qtd0 * preco0
    const valor1 = qtd1 * preco1

    if(sellFirst) {
      element.lucro = valor0 - valor1

      element.posicaoCompra = element.dados[1].posicao
      element.posicaoVenda = element.dados[0].posicao
      element.valorVenda = valor0
    }
    else {
      element.lucro = valor1 - valor0
      
      element.posicaoCompra = element.dados[0].posicao
      element.posicaoVenda = element.dados[1].posicao
      element.valorVenda = valor1
    }

  });
}


/*----------------------------------------*/ 


const formulas = {

  calcAveragePrice: (infoArray) => {
  
    infoArray.forEach(stockInfo => {
  
      let quantidadeParcial = 0
      let precoMedioParcial = 0
      let valorTotalParcial = 0
      let lucroTransacao = 0
      
      stockInfo.dados.forEach((linha, index) => {
  
  
        let valorTotal = linha.valor 
        let qtd = linha.quantidade
  
        const buy = linha.tipoMovimentacao === "Compra" || linha.tipoMovimentacao === "Ano Anterior" || linha.tipoMovimentacao === "Bonificação"
        const sell = linha.tipoMovimentacao === "Venda"
  
  
        if(buy) {
          quantidadeParcial = quantidadeParcial + qtd
  
          valorTotalParcial = valorTotalParcial + valorTotal
          
          precoMedioParcial = valorTotalParcial / quantidadeParcial
  
          lucroTransacao = 0
        }
        else if(sell){
          quantidadeParcial = quantidadeParcial - qtd
  
          if(stockInfo.dados[index-1]) {
            const parteEquivalenteVenda = stockInfo.dados[index-1].precoMedioParcial * qtd
  
            valorTotalParcial = valorTotalParcial - parteEquivalenteVenda
  
            precoMedioParcial = valorTotalParcial / quantidadeParcial
  
            lucroTransacao = valorTotal - parteEquivalenteVenda
  
            
          }
          else {
            valorTotalParcial = -999999
            precoMedioParcial = -999999
          }
  
          if(quantidadeParcial <= 0){
            valorTotalParcial = 0
            precoMedioParcial = 0
          }
  
        }
  
        linha.quantidadeParcial = quantidadeParcial, linha.precoMedioParcial = precoMedioParcial, linha.valorTotalParcial = valorTotalParcial,
        linha.lucroTransacao = lucroTransacao
      
      })
  
      const length = stockInfo.dados.length
      const finalInfo = stockInfo.dados[length-1]
  
      stockInfo.precoMedio = finalInfo.precoMedioParcial
      stockInfo.quantidadeTotal = finalInfo.quantidadeParcial
      stockInfo.valorTotal = finalInfo.valorTotalParcial
      stockInfo.instituicao = finalInfo.instituicao
  
    })

    return infoArray
  
  },
  
  infoDayTrade: (database) => {
  
    let result = []
  
    for (let index = 1; index <= 12; index++) {
  
  
      const perMonth = filterMonth(database, index)
  
      perMonth.forEach((info, index, arr) => {
  
        const indexExiste = index+1 <= arr.length-1
        
        if(indexExiste) {
    
          const equalDays = info.dia === arr[index+1].dia
          const buyAndSell = info.tipoMovimentacao!= arr[index+1].tipoMovimentacao
          const equalCodeNegotiation = info.codigoNegociacao === arr[index+1].codigoNegociacao
  
          
          if(equalDays && buyAndSell && equalCodeNegotiation) {
  
            result.push({
              posicaoCompra: "",
              posicaoVenda: "",
              codigo: info.codigoNegociacao,
              dia: info.dia,
              mes: info.mes,
              ano: info.ano,
              data: info.data,
              lucro: 0,
              dados: [info, arr[index+1]],
              valorVenda: 0
            })
          }
           
        }
      });
  
    }
  
    dayTradeProfitCalc(result)
  
    return result
  },
  
  dayTradePerMonth: (database) => {
  
    let result = []
    
    if(database != ""){
  
      for (let index = 1; index <= 12; index++) {
  
        const perMonth = filterMonth(database, index)
  
        let totalSales = perMonth.reduce((prev, elem) => { return prev + elem.valorVenda },0)
  
        let totalProfit = perMonth.reduce((prev, elem) => { return prev + elem.lucro },0)
  
        result.push({
          totalLucro: totalProfit,
          totalVenda: totalSales
        })
        
      }
  
    }
  
    return result
  
  },
  
  totalSalesMonth: (database) => {
    let result = []
    let formattedResult = []
  
    if(database != "") {
      
      for (let index = 1; index <= 12; index++) {
        
        const perMonth = filterMonth(database, index)
  
        const perSale = filterSale(perMonth)
  
        result.push(perSale.reduce((prev, elem) => {
          let value = elem.valor
          
          return prev + value
        },0)) 
        
      }
  
      const arrayDayTrade = formulas.infoDayTrade(database)
      const arrayDayTradePerMonth = formulas.dayTradePerMonth(arrayDayTrade)
      
      formattedResult = result.map((elem, index) => {
        const res = elem - arrayDayTradePerMonth[index].totalVenda
  
        return res
      })
      
    }
  
    return formattedResult
  
  },
  
  totalProfitMonth: (database) => {
  
    //let result = []
    let pricePerMonth = []
  
  
    for (let index = 1; index <= 12; index++) {
      const result = database.reduce((elemPrev, element) => {
        //const index = [1,2,3,4,5,6,7,8,9,10,11,12]
        const month = filterMonth(element.dados, index)
    
        const perMonthPrice = month.reduce((prev, elem) => {
          return prev + elem.lucroTransacao
        },0);
  
        return elemPrev + perMonthPrice
        
      },0)
  
  
      pricePerMonth.push(result)
    }
  
    
  
  
    console.log("pricePerMonth",pricePerMonth)
    
    
    //console.log("result", result)
  
  
  
    return pricePerMonth
  }
  
}









export default formulas