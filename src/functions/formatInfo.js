
import mask from "$functions/mask";

function formatNegotiations2(array) {
  let list = []
  array.forEach(element => {
    list.push(element.codigoNegociacao)
  });


  list = [ ... new Set (list)]
  //ordem alfabetica
  list = list.sort(Intl.Collator().compare)
  
  const uniqList = [ ... new Set (list)]

  let newList = []

  uniqList.forEach(code => {
  newList.push({
      codigo: code,
      precoMedio: 0,
      quantidadeTotal: 0,
      valorTotal: 0,
      acoesAntigas: [],
      dados: []
    })
  });


  array.forEach((data) => {
    newList.forEach(el => {
      if(data.codigoNegociacao == el.codigo) {
        el.dados.push(data)
      }
    });
  });

  /*array.forEach(el => {
    el.data = mask.formatDate(el.data)
  })*/
  

  //return formatNegotiations3(newList) 
  return newList
}

function joinEqualCodes(array) {
  let list = array

  const newList = list.filter(element => {
    let test = true
    const codeNoF = element.codigo.replace(/.$/, '');

    if(element.codigo.substr(-1) == "F"){
      
      list.forEach(elem => {
        if(elem.codigo === codeNoF) {     
          elem.dados = [...elem.dados, ... element.dados]
          test = false
        }
      })

      element.codigo = element.codigo.slice(0, -1)
      
    } 
    return test

  })

  return newList
}


function sortCodeListByPosition(array) {
    
  let list = array

  list.forEach(element => {
    element.dados = element.dados.sort((a, b) => a.posicao - b.posicao)
  });

  return list
}




const formatInfo = {

  sortListByPosition: (array) => {
    
    const list = array.sort((a, b) => a.posicao - b.posicao)
  
    return list
  },

  report: (data) => {
    let list = []
    data.forEach(element => {
      if (element[3]) {
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
      }     
    });  
    list.shift()
    return list
  },

  negotiations: (data) => {

    let list = []
    let array = data
    array.shift()
    array.reverse()
    
    array.forEach((element, index) => {  

      if (element[5]) {

        let data = element[0].toString()

        let [day, month, year] = [...data.split("/")]

        list.push({
          posicao: index+1,
          dia:day,
          mes:month,
          ano:year, 
          data: data,
          tipoMovimentacao: element[1],
          mercado: element[2],
          prazoVencimento: element[3],
          instituicao: element[4],
          codigoNegociacao: element[5],
          quantidade: element[6],
          preco: element[7],
          valor: element[8]
        })
      } 
    });

    list = formatInfo.sortListByPosition(list)

    return list
  },

  negotiationsByCode: (array) => {
    let list = []
    array.forEach(element => {
      list.push(element.codigoNegociacao)
    });
  
  
    list = [ ... new Set (list)]
    //ordem alfabetica
    list = list.sort(Intl.Collator().compare)
    
    const uniqList = [ ... new Set (list)]
  
    let newList = []
  
    uniqList.forEach(code => {
    newList.push({
        codigo: code,
        precoMedio: 0,
        quantidadeTotal: 0,
        valorTotal: 0,
        acoesAntigas: [],
        dados: []
      })
    });
  
    
  
    array.forEach((data) => {
      const dataAndMore = {
        ...data, 
        quantidadeParcial:0,
        precoMedioParcial: 0, 
        valorTotalParcial: 0,
        lucroTransacao: 0
      }
      newList.forEach(el => {
        if(data.codigoNegociacao == el.codigo) {
          el.dados.push(dataAndMore)
        }
        
      });
    });
  
    newList = joinEqualCodes(newList)
    newList = sortCodeListByPosition(newList)

    return newList

  },

  bdr: (data) => {
    let list = []
    data.forEach(element => {
      if (element[3]) {
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
      }
    });

    list.shift()
    return list
  },

  dividends: (data) => {
    let list = []
    data.forEach(element => {  
      if(element[0]){
        list.push({
          produto: element[0],
          tipoEvento: element[1],
          valorLiquido: element[2]
        })
      } 
      
    });
    list.shift()
    return list
  }
}

export default formatInfo