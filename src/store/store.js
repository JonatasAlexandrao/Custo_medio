import { writable, derived } from "svelte/store";

import formulas from "$functions/formulas";
import formatInfo from '$functions/formatInfo';


export const NEGOTIATION = writable([])
//export const NEGOTIATION_BY_CODE = writable([])

export const NEGOTIATION_BY_CODE = derived (NEGOTIATION, ($NEGOTIATION) => {
  
  const array = formatInfo.negotiationsByCode($NEGOTIATION)
  const result = formulas.calcAveragePrice(array)

  return result

})


export const ListNegotiationCodes = derived(NEGOTIATION_BY_CODE, ($NEGOTIATION_BY_CODE) => {

  let list = $NEGOTIATION_BY_CODE
  
  let listCode = list.map((elem) => {
    return elem.codigo
  })

  let removedF = listCode.map((code) => {
    return code.substr(-1) === "F" ? code.substr(0, code.length-1) : code
  })

  let readyList = [...new Set(removedF)]

  return readyList

})

export const DAY_TRADE = derived (NEGOTIATION, ($NEGOTIATION) => {
  
  const result = formulas.infoDayTrade($NEGOTIATION)

  return result

})

export const DAY_TRADE_PER_MONTH = derived (DAY_TRADE, ($DAY_TRADE) => { 
  const result = formulas.dayTradePerMonth($DAY_TRADE)
  return result
})

export const TOTAL_SALES_MONTH = derived (NEGOTIATION, ($NEGOTIATION) => {
  const result = formulas.totalSalesMonth($NEGOTIATION)
  return result
})

export const TOTAL_PROFIT_MONTH = derived (NEGOTIATION_BY_CODE, ($NEGOTIATION_BY_CODE) => {
  const result = formulas.totalProfitMonth($NEGOTIATION_BY_CODE)
  return result
})

