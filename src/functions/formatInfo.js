



const formatInfo = {

  report: (data) => {
    let list = []
    data.forEach(element => {
      list.push({
        produto: element[0], 
        instituicao: element[1],
        conta: element[2],
        codigoNegociacao: element[3],
        cnpj: element[4],
        codigoISIN: element[5],
        tipo: element[6],
        escriturador: element[7],
        quantidade: element[8],
        quantidadeDisponivel: element[9],
        quantidadeIndisponivel: element[10],
        motivo: element[11],
        preçoFechamento: element[12],
        valorAtualizado: element[13]
        
      })
    });  
    list.shift()
    return list
  },

  negotiations: (data) => {
    let list = []
    data.forEach(element => {
      list.push({
        data: element[0], 
        tipoMovimentacao: element[1],
        mercado: element[2],
        prazoVencimento: element[3],
        instituicao: element[4],
        codigoNegociacao: element[5],
        quantidade: element[6],
        preco: element[7],
        valor: element[8]
      })
    });
    list.shift()
    return list
  },

  bdr: (data) => {
    let list = []
    data.forEach(element => {
      list.push({
        produto: element[0],
        instituicao: element[1],
        conta: element[2],
        codigoNegociacao: element[3],
        codigoISIN: element[4],
        tipo: element[5],
        escriturador: element[6],
        quantidade: element[7],
        quantidadeDisponivel: element[8],
        quantidadeIndisponivel: element[9],
        motivo: element[10],
        preçoFechamento: element[11],
        valorAtualizado: element[12]
        
      })
    });

    list.shift()
    return list
  },

  dividends: (data) => {
    let list = []
    data.forEach(element => {   
      list.push({
        produto: element[0],
        tipoEvento: element[1],
        valorLiquido: element[2]
      })
    });
    list.shift()
    return list
  }
}

export default formatInfo