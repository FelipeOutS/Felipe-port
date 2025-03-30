document.addEventListener('DOMContentLoaded', function () {
    const scroll = new SmoothScroll('nav a[href*="#"]', {
        speed: 800,
        offset: 16
    });

    let btnMenu = document.getElementById('btn-menu');
    let menu = document.getElementById('menu-mobile');
    let overlay = document.getElementById('overlay-menu');
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

});