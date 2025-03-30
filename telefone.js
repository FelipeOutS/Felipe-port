function formatarTelefone(input) {
    let digits = input.value.replace(/\D/g, '');
    digits = digits.substring(0, 11); // Garante no máximo 11 dígitos

    let formattedNumber = '';
    if (digits.length >= 2) {
      formattedNumber += `(${digits.substring(0, 2)})`; // DDD entre parênteses
      if (digits.length > 2) {
        formattedNumber += ` ${digits.substring(2, 7)}`; // Primeira parte do número
      }
      if (digits.length > 7) {
        formattedNumber += `-${digits.substring(7)}`; // Segunda parte do número após o traço
      }
    } else {
      formattedNumber = digits; // Menos de 2 dígitos, apenas mostra os números digitados
    }

    input.value = formattedNumber; // Atualiza o valor do input
  }
  