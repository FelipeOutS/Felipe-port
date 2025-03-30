document.addEventListener('DOMContentLoaded', () => {
    const themeSwitch = document.getElementById('theme-switch');
    const headerLogo = document.getElementById('headerLogo');
    const footerLogo = document.getElementById('footerLogo');

    // Atualiza os ícones do tema, logos e atributos.
    const updateTheme = (isDark) => {
        document.body.setAttribute('data-theme', isDark ? 'dark' : 'light');
        headerLogo.src = isDark ? 'https://github.com/FelipeOut/imgport/blob/main/logositemododark.png?raw=true' : 'https://github.com/FelipeOut/imgport/blob/main/logositemodolight.png?raw=true';
        footerLogo.src = isDark ? 'https://github.com/FelipeOut/imgport/blob/main/logositemododark.png?raw=true' : 'https://github.com/FelipeOut/imgport/blob/main/logositemodolight.png?raw=true';
    };

    // Evento de alternância do tema
    themeSwitch.addEventListener('change', () => {
        const isDark = themeSwitch.checked;
        updateTheme(isDark);
    });

    // Verifica a preferência do sistema ao carregar a página
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (prefersDarkScheme && !themeSwitch.checked) {
        themeSwitch.checked = true;
        updateTheme(true);
    } else {
        updateTheme(themeSwitch.checked);
    }
});
