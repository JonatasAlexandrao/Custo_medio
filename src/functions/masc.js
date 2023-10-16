
const masc = {

  realCurrency : (text) => {
    if(text) {
      return text.toLocaleString('pt-BR', {minimumFractionDigits: 2, maximumFractionDigits: 2})
    }
    else {
      return "Error"
    }
  },

  cnpj : (text) => {
    if(text) {
      return text.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1.$2.$3/$4-$5")
    }
    else {
      return "Error"
    }
  },

  separateCode : (text) => {
    if(text) {
      return text.replace()
    }
    else {
      return "Error"
    }
  }

}


export default masc 