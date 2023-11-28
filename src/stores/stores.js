import { derived, readable, writable } from "svelte/store";
import masc from "../functions/masc";

export const listNegotiations = writable([])

export const listReport = writable([])
export const listBDR = writable([])
export const listDividends = writable([])

export const reportCodes = writable([])

export const annualReportCodes = derived(listReport, ($listReport) => {
  let list = []
  $listReport.forEach(element => {
    list.push(element.codigoNegociacao)
  });

  return list
})

export const negotiationsCodes = derived(listNegotiations, ($listNegotiations) => {
  let list = []
  $listNegotiations.forEach(element => {
    list.push(element.codigoNegociacao)
  });

  const uniqList = [ ... new Set (list)]

  return uniqList
})



export const NEGOTIATION = derived(listNegotiations, ($listNegotiations) => {
  let list = []
  $listNegotiations.forEach(element => {
    list.push(element.codigoNegociacao)
  });

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

  

  $listNegotiations.forEach((data) => {
    newList.forEach(el => {
      if(data.codigoNegociacao == el.codigo) {
        el.dados.push(data)
      }
    });
  });

  $listNegotiations.forEach(el => {
    el.data = masc.formatDate(el.data)
  })


  return newList
})

export const LIST_Report_PRODUTO = derived( listReport, ($listReport) => {

    let array = []

    $listReport.forEach(el => {
      array.push({
          "codigo": el.codigoNegociacao , "produto": el.produto
        })
    })

    return array
})



