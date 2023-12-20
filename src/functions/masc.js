
const masc = {

  realCurrency : (text) => {
    if(text) {
 
      text = text.toString()
      text = text.replace(",", ".")
      text = parseFloat(text)

      let formatted = text.toLocaleString('pt-BR', {
        currency: 'BRL',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      })

      return formatted

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
   
    let newValue = text;

    if(newValue == '') { newValue = '0,00' }

    newValue = newValue.replace(/\D/g, ""); // Remove todos os não dígitos

    if(newValue.length == 2) { newValue = newValue.replace(/(\d{2}$)/g, '00,'+'$1') }

    newValue = newValue.replace(/(\d+)(\d{2})$/, "$1,$2"); // Adiciona a parte de centavos

    if(newValue.length == 5) { 
      newValue = newValue.replace(/(00,)(\d{2}$)/g, '0,'+'$2')
      newValue = newValue.replace(/(0)(\d{1})(,)(\d{2}$)/g, '$2'+'$3'+'$4')
    }

    newValue = newValue.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1."); // Adiciona pontos a cada três dígitos
    
    return newValue

  },

  inputNum : (value) => {

    let num
    num = value.replace(/[^0-9]/g, '')
    num = num.replace(/(0)(\d)/g, '$2')
    return num

  }


}

export default masc 