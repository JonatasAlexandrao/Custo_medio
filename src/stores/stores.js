import { derived, readable, writable } from "svelte/store";

export const listNegotiations = writable([])

export const listReport = writable([])
export const listBDR = writable([])
export const listDividends = writable([])

export const reportCodes = writable([])

export const searchReportCodes = derived(listReport, ($listReport) => {
  let list = []
  $listReport.forEach(element => {
    list.push(element.codigoNegociacao)
  });

  return list
})