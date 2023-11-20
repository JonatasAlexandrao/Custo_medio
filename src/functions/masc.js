
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
  },

  inputRealCurrency : (text) => {
    if(text) {
      
      text.replace(/[^0-9]/g, '')
      let num = text
      console.log("num", num)

      if(num == '' || num.length < 3) {
        num = '0,00'
      }

      num = num.replace(/[^0-9]/g, '')

      num = num.replace(',', '')
      num = num.replace('.', '')

      num = num.replace(/(^\d{2}$)/g, '0,'+'$1')
      num = num.replace(/(\d)(\d{2}$)/g, '$1'+','+'$2')
      num = num.replace(/(00,)(\d{2}$)/g, '0,'+'$2')
      num = num.replace(/(0)(\d{1})(,)(\d{2}$)/g, '$2'+'$3'+'$4')
      num = num.replace(/(\d)(\d{3})(,\d{2}$)/g, '$1'+'.'+'$2'+'$3')
    
      return num
    }
    else {
      console.log("Erro mascara realCurrency")
      return ""
    }
  },

  inputNum : (value) => {
    let num
      num = value.replace(/[^0-9]/g, '')
      num = num.replace(/(0)(\d)/g, '$2')
      return num
  }


}

export default masc 