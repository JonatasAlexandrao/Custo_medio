import { derived, readable, writable } from "svelte/store";

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

  return newList
})

