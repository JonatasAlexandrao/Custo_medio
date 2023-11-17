
const masc = {

  realCurrency : (text) => {
    if(text) {
      return text.toLocaleString('pt-BR', {minimumFractionDigits: 2, maximumFractionDigits: 2})
    }
    else {
      console.log("Erro mascara realCurrency")
      return ""
    }
  },

  cnpj : (text) => {
    if(text) {
      return text.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1.$2.$3/$4-$5")
    }
    else {
      console.log("Erro mascara cnpj")
      return ""
    }
  },

  separateCode : (text) => {
    if(text) {
      return text.replace()
    }
    else {
      console.log("Erro mascara separateCode")
      return ""
    }
  },

  formatDate : (date) => {
    const testeDate = new Date(date)
    let isDate = !isNaN(testeDate.getTime())
    let newDate = date

    if(isDate) {
      newDate = date.toLocaleDateString('pt-BR', {timeZone: 'UTC'})
    }

    return newDate
  }


}

export default masc 