document.addEventListener('DOMContentLoaded', (event) => {
    const target = document.getElementById('typing-animation');
    const text = "TRANSFORMANDO IDEIAS EM REALIDADE DIGITAL";
    const typingSpeed = 150; // Velocidade em milissegundos
    let index = 0;
  
    // Inicializa o cursor de digitação
    const cursorSpan = document.createElement('span');
    cursorSpan.classList.add('typing-cursor');
    target.appendChild(cursorSpan);
  
    const typeLetter = () => {
      if (index < text.length) {
        cursorSpan.insertAdjacentText('beforebegin', text[index]);
        index++;
        setTimeout(typeLetter, typingSpeed);
      }
    };
  
    setTimeout(typeLetter, typingSpeed);
  });
  