function toggleLanguage() {
    const currentLang = localStorage.getItem('language') === 'pt-BR' ? 'pt-BR' : 'en';
    const newLang = currentLang === 'pt-BR' ? 'en' : 'pt-BR';
    
    localStorage.setItem('language', newLang);
    updateLangButton(newLang);
    
    const currentUrl = window.location.pathname;
    
    if (currentUrl.includes('-pt-BR.html')) {
        const newUrl = currentUrl.replace('-pt-BR.html', '-en.html');
        window.location.href = newUrl;
    } else if (currentUrl.includes('-en.html')) {
        const newUrl = currentUrl.replace('-en.html', '-pt-BR.html');
        window.location.href = newUrl;
    }
}

function updateLangButton(lang) {
    const btn = document.getElementById('lang-btn');
    if (btn) {
        btn.textContent = lang === 'pt-BR' ? 'EN' : 'PT-BR';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const lang = localStorage.getItem('language') || 'pt-BR';
    updateLangButton(lang);
    setupAnchorLinks();
    addCopyButtonToCodeBlocks();
});

function setupAnchorLinks() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#' && document.querySelector(href)) {
                e.preventDefault();
                const target = document.querySelector(href);
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
}

function addCopyButtonToCodeBlocks() {
    document.querySelectorAll('.post-body pre').forEach(pre => {
        const code = pre.querySelector('code');
        const button = document.createElement('button');
        button.textContent = '📋 Copy';
        button.className = 'copy-btn';
        button.style.cssText = `
            position: absolute;
            top: 0.5rem;
            right: 0.5rem;
            padding: 0.4rem 0.8rem;
            background-color: var(--bg-light);
            color: var(--link-color);
            border: none;
            border-radius: 3px;
            cursor: pointer;
            font-size: 0.8rem;
        `;
        
        button.addEventListener('click', () => {
            navigator.clipboard.writeText(code.textContent);
            button.textContent = '✅ Copied!';
            setTimeout(() => {
                button.textContent = '📋 Copy';
            }, 2000);
        });
        
        pre.style.position = 'relative';
        pre.appendChild(button);
    });
}

document.addEventListener('DOMContentLoaded', addCopyButtonToCodeBlocks);
