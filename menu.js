
document.addEventListener('DOMContentLoaded', function () {
    const scroll = new SmoothScroll('nav a[href*="#"]', {
        speed: 800,
        offset: 16
    });

    let btnMenu = document.getElementById('btn-menu');
    let menu = document.getElementById('menu-mobile');
    let overlay = document.getElementById('overlay-menu');
    const themeToggleDarkIcon = document.getElementById('theme-toggle-dark-icon');
    const themeToggleLightIcon = document.getElementById('theme-toggle-light-icon');
    let galeriaAtiva = null;
    let imagensAtuais = [];

    btnMenu.addEventListener('click', () => {
        menu.classList.toggle('abrir-menu');
        overlay.style.display = menu.classList.contains('abrir-menu') ? 'block' : 'none';
    });

    // Fechar o menu mobile ao clicar no botão "X"
    document.querySelector('.menu-mobile .btn-fechar').addEventListener('click', function () {
        menu.classList.remove('abrir-menu');
        overlay.style.display = 'none';
    });

    document.querySelectorAll('.galeria .btn-fechar, .overlay').forEach(btn => {
        btn.addEventListener('click', function () {
            if (this.classList.contains('btn-fechar')) {
                this.closest('.galeria').style.display = 'none';
            } else {
                const galeriaId = this.getAttribute('data-target');
                abrirGaleria(galeriaId);
            }
        });
    });

    overlay.addEventListener('click', () => {
        if (menu.classList.contains('abrir-menu')) {
            menu.classList.remove('abrir-menu');
            overlay.style.display = 'none';
        }
        if (galeriaAtiva) {
            galeriaAtiva.style.display = 'none';
            galeriaAtiva = null;
        }
    });

    document.querySelectorAll('.overlay').forEach(button => {
        button.addEventListener('click', function () {
            const galeriaId = this.getAttribute('data-target');
            abrirGaleria(galeriaId);
        });
    });

    function abrirGaleria(id) {
        const galeria = document.getElementById(id);
        if (galeria) {
            galeria.style.display = 'block';
            galeriaAtiva = galeria;
            imagensAtuais = Array.from(galeria.querySelectorAll('.miniaturas img')).map(img => img.src);
            atualizarMiniaturaAtiva(0); // Destaca e centraliza a primeira miniatura
            // Adiciona a lógica para definir a primeira imagem grande, se necessário
            const primeiraImagemGrande = imagensAtuais[0];
            galeria.querySelector('#imagemGrande').src = primeiraImagemGrande;
        }
    }

    function atualizarMiniaturaAtiva(indiceAtual) {
        const miniaturas = galeriaAtiva.querySelectorAll('.miniaturas img');
        miniaturas.forEach((img, index) => {
            img.classList.toggle('ativa', index === indiceAtual);
            if (index === indiceAtual) {
                const scrollAmount = img.offsetLeft - img.closest('.miniaturas-container').offsetWidth / 2 + img.offsetWidth / 2;
                img.closest('.miniaturas-container').scrollLeft = scrollAmount;
            }
        });
    }

    // Função para fechar a galeria ativa
    function fecharGaleriaAtiva() {
        if (galeriaAtiva) {
            galeriaAtiva.style.display = 'none';
            galeriaAtiva = null;
            overlay.style.display = 'none';
        }
    }

    // Event listener para tecla Esc
    document.addEventListener('keydown', function (event) {
        if (event.key === "Escape" || event.keyCode === 27) {
            fecharGaleriaAtiva();
        }
    });

    // Revisão do fechamento de galerias
    document.querySelectorAll('.galeria .fechar').forEach(fechar => {
        fechar.addEventListener('click', function () {
            this.parentElement.style.display = 'none';
            if (galeriaAtiva === this.parentElement) {
                galeriaAtiva = null; // Reseta a galeria ativa
            }
        });
    });

    document.querySelectorAll('.navegacao button').forEach(button => {
        button.addEventListener('click', function () {
            const direcao = this.classList.contains('anterior') ? -1 : 1;
            mudarImagem(direcao);
        });
    });

    function mudarImagem(direcao) {
        if (!galeriaAtiva) return;
        const imagemGrande = galeriaAtiva.querySelector('#imagemGrande');
        let indiceAtual = imagensAtuais.indexOf(imagemGrande.src);
        indiceAtual += direcao;
        if (indiceAtual < 0) indiceAtual = imagensAtuais.length - 1;
        else if (indiceAtual >= imagensAtuais.length) indiceAtual = 0;
        imagemGrande.src = imagensAtuais[indiceAtual];
        atualizarMiniaturaAtiva(indiceAtual);
    }

    function destacarMiniatura(indice) {
        const miniaturas = galeriaAtiva.querySelectorAll('.miniaturas img');
        miniaturas.forEach((miniatura, index) => {
            if (index === indice) {
                miniatura.style.opacity = "1";
                miniatura.style.border = "2px solid #B71515"; // destaca a miniatura atual
            } else {
                miniatura.style.opacity = "0.6";
                miniatura.style.border = "none"; // remove o destaque das outras miniaturas
            }
        });
    }

    // Assegure-se de chamar a função `destacarMiniatura` também quando as miniaturas são clicadas diretamente
    document.querySelectorAll('.miniaturas img').forEach(img => {
        img.addEventListener('click', function () {
            const galeria = this.closest('.galeria');
            const selecionada = Array.from(galeria.querySelectorAll('.miniaturas img')).indexOf(this);
            galeria.querySelector('#imagemGrande').src = this.src;
            atualizarMiniaturaAtiva(selecionada);
        });
    });

    // Novo código: inicialize o toggle switch para o tema escuro/cláro.
    const themeSwitch = document.getElementById('theme-switch');
    themeSwitch.addEventListener('change', function () {
        document.body.classList.toggle('dark-theme'); // Alternar classe tema escuro.
        const theme = document.body.classList.contains('dark-theme') ? 'dark' : 'light';
        document.body.setAttribute('data-theme', theme);
        updateThemeIcons(theme); // Atualiza os ícones e logos conforme o tema.
    });

    function toggleTheme() {
        const newTheme = document.body.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        document.body.setAttribute('data-theme', newTheme);
        themeToggleLightIcon.style.display = newTheme === 'dark' ? 'none' : 'block';
        themeToggleDarkIcon.style.display = newTheme === 'dark' ? 'block' : 'none';

        // Atualiza os logos para o tema claro ou escuro
        const headerLogo = document.getElementById('headerLogo');
        const footerLogo = document.getElementById('footerLogo');
        if (newTheme === 'dark') {
            headerLogo.src = 'img/logositemododark.png'; // Caminho do logo para o tema escuro
            footerLogo.src = 'img/logositemododark.png'; // Atualize se necessário
        } else {
            headerLogo.src = 'img/logositemodolight.png'; // Caminho do logo para o tema claro
            footerLogo.src = 'img/logositemodolight.png'; // Atualize se necessário
        }
    }


    // Verifica a preferência do sistema do usuário para o tema escuro/cláro e ajusta o tema do site e o toggle switch conforme necessário.
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches && !themeSwitch.checked) {
        themeSwitch.checked = true;
        document.body.classList.add('dark-theme');
        document.body.setAttribute('data-theme', 'dark');
        updateThemeIcons('dark');
    }

    function formatarTelefone(input) {
        // Remove todos os caracteres que não são dígitos
        var digitos = input.value.replace(/\D/g, '');

        // Formatar o número de telefone com parênteses
        if (digitos.length >= 2) {
            digitos = '(' + digitos.substring(0, 2) + ')' + digitos.substring(2);
        }

        // Atualizar o valor do campo de entrada
        input.value = digitos;
    }

    document.addEventListener("DOMContentLoaded", function () {
        const form = document.getElementById("form");
        const result = document.getElementById("result");
    
        form.onsubmit = function (e) {
            e.preventDefault(); // Garante que o comportamento padrão seja prevenido.
    
            const formData = new FormData(form);
            var object = {};
            formData.forEach((value, key) => {
                object[key] = value;
            });
            var json = JSON.stringify(object);
    
            result.innerHTML = "Por favor, espere um pouco...";
            result.style.display = "block"; // Certifique-se de que a mensagem de resultado seja visível.
    
            fetch("https://api.web3forms.com/submit", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: json
            })
            .then(async (response) => {
                let json = await response.json();
                if (response.status == 200) {
                    result.innerHTML = json.message;
                    result.classList.remove("text-gray-500");
                    result.classList.add("text-green-500");
                } else {
                    console.log(response);
                    result.innerHTML = json.message;
                    result.classList.remove("text-gray-500");
                    result.classList.add("text-red-500");
                }
            })
            .catch((error) => {
                console.log(error);
                result.innerHTML = "Ocorreu um erro!";
            })
            .then(function () {
                form.reset(); // Resetar o formulário após o envio.
                setTimeout(() => {
                    result.style.display = "none"; // Opcional: Esconder a mensagem de resultado após algum tempo.
                }, 5000);
            });
    
            return false; // Outra camada de prevenção para o comportamento padrão.
        };
    });
    
});