
const translations = {
    'pt-BR': {
        'nav.posts': 'Posts',
        'nav.about': 'Sobre',
        'author.name': 'lusca0x01',
        'author.bio': 'Threat Researcher and Maker',
        'author.location': 'Fortaleza, Ceará, Brasil',
        'footer.text': '©2026 lusca0x01 Blog. Todos os direitos reservados.',
        'posts.recent': 'Posts Recentes',
        'minute.read': 'minutos de leitura',
        'about.title': 'Sobre Este Blog',
        'about.me.title': 'Sobre Mim',
        'about.me.intro': 'Meu nome é Lucas Wagner Fernandes, mas utilizo o nick lusca0x01. Sou muito interessado em segurança ofensiva, principalmente engenharia reversa, desenvolvimento de exploits e análise de malware. Atualmente trabalho como desenvolvedor de software no DefendaMe, uma plataforma focada em IA aplicada à análise forense e perícia digital.',
        'about.me.focus': 'Meus interesses incluem OS internals, exploit development, análise de malware e estar atualizado com as últimas tendências e vulnerabilidades de segurança.',
        'about.blog.title': 'Sobre o Blog',
        'about.blog.intro': 'Este blog é um espaço pessoal onde compartilho artigos sobre tópicos de segurança e possivelmente write-ups de desafios de CTF.',
        'about.blog.goals': 'Objetivos',
        'about.blog.goal1': 'Documentar o que aprendo',
        'about.blog.goal2': 'Compartilhar conhecimento que possa ajudar outros',
        'about.blog.goal3': 'Construir uma referência para meu futuro',
        'about.back': 'Voltar ao Início',
        'page.notfound': 'Página Não Encontrada',
        'page.notfound.desc': 'Desculpe, a página que você está procurando não existe ou foi movida.',
        'pagination.previous': 'Anterior',
        'pagination.next': 'Próximo',
    },
    'en': {
        'nav.posts': 'Posts',
        'nav.about': 'About',
        'author.name': 'lusca0x01',
        'author.bio': 'Threat Researcher and Maker',
        'author.location': 'Fortaleza, Ceará, Brazil',
        'footer.text': '©2026 lusca0x01 Blog. All rights reserved.',
        'posts.recent': 'Recent Posts',
        'minute.read': 'minutes read',
        'about.title': 'About This Blog',
        'about.me.title': 'About Me',
        'about.me.intro': 'My name is Lucas Wagner Fernandes but I use the nickname lusca0x01 and I am very interested in offensive security, especially reverse engineering, exploit development, and malware analysis. But I currently work as a software developer at DefendaMe, a platform focused on AI applied to forensic analysis and digital forensics.',
        'about.me.focus': 'My interests include OS internals, exploit development, malware analysis, and staying updated with the latest security trends and vulnerabilities.',
        'about.blog.title': 'About the Blog',
        'about.blog.intro': 'This blog is a personal space where I share articles on security topics and possibly write-ups of CTF challenges.',
        'about.blog.goals': 'Goals',
        'about.blog.goal1': 'Document what I learn',
        'about.blog.goal2': 'Share knowledge that might help others',
        'about.blog.goal3': 'Build a reference for future self',
        'about.back': 'Back to Home',
        'page.notfound': 'Page Not Found',
        'page.notfound.desc': 'Sorry, the page you are looking for does not exist or has been moved.',
        'pagination.previous': 'Previous',
        'pagination.next': 'Next',
    }
};

const posts = {
    'pt-BR': [
        {
            id: 1,
            title: 'Como "Hookar" Funções: Guia Completo de Function Hooking',
            date: '20 de maio de 2026',
            readtime: '12',
            excerpt: 'Function Hooking é uma técnica poderosa para interceptar, monitorar e redirecionar chamadas de funções em tempo de execução. Conheça Detour Hooking, Pattern Scanning e muito mais.',
            url: 'posts/how-to-hook-functions/how-to-hook-functions-pt-BR.html'
        },
    ],
    'en': [
        {
            id: 1,
            title: 'How to Hook Functions: Complete Function Hooking Guide',
            date: 'May 20, 2026',
            readtime: '12',
            excerpt: 'Function Hooking is a powerful technique to intercept, monitor, and redirect function calls at runtime. Learn about Detour Hooking, Pattern Scanning, and more.',
            url: 'posts/how-to-hook-functions/how-to-hook-functions-en.html'
        },
    ]
};

let currentLanguage = localStorage.getItem('language') || 'pt-BR';

const POSTS_PER_PAGE = 5;
let currentPage = 1;

document.addEventListener('DOMContentLoaded', () => {
    setLanguage(currentLanguage);
    renderPosts();
    updateHTMLLang();
});

function setLanguage(lang) {
    currentLanguage = lang;
    localStorage.setItem('language', lang);
    updateTranslations();
    currentPage = 1;
    renderPosts();
    updateHTMLLang();
    updateLangButton();
}

function toggleLanguage() {
    const newLang = currentLanguage === 'pt-BR' ? 'en' : 'pt-BR';
    setLanguage(newLang);
}

function updateHTMLLang() {
    document.documentElement.lang = currentLanguage;
}

function updateLangButton() {
    const btn = document.getElementById('lang-btn');
    if (btn) {
        btn.textContent = currentLanguage === 'pt-BR' ? 'EN' : 'PT-BR';
    }
}

function updateTranslations() {
    const elements = document.querySelectorAll('[data-i18n]');
    elements.forEach(element => {
        const key = element.getAttribute('data-i18n');
        const text = translations[currentLanguage][key];
        if (text) {
            element.textContent = text;
        }
    });
}

function renderPosts() {
    const container = document.getElementById('posts-container');
    if (!container) return;

    container.innerHTML = '';
    const currentPosts = posts[currentLanguage] || posts['pt-BR'];


    const totalPages = Math.ceil(currentPosts.length / POSTS_PER_PAGE);
    const startIdx = (currentPage - 1) * POSTS_PER_PAGE;
    const endIdx = startIdx + POSTS_PER_PAGE;
    const paginatedPosts = currentPosts.slice(startIdx, endIdx);

    paginatedPosts.forEach((post) => {
        const categoryKey = post.category;
        const categoryText = translations[currentLanguage][categoryKey];
        const minuteText = translations[currentLanguage]['minute.read'];

        const postHTML = `
            <div class="list-item">
                <article class="posts-item">
                    <h2 class="posts-item-title no_toc">
                        <a href="${post.url}">${post.title}</a>
                    </h2>
                    <p class="page-meta">
                        <span class="page-meta-date">
                            <i class="far fa-calendar-alt"></i>
                            ${post.date}
                        </span>
                        <span class="page-meta-sep">|</span>
                        <span class="page-meta-readtime">
                            <i class="far fa-clock"></i>
                            ${post.readtime} ${minuteText}
                        </span>
                    </p>
                    <p class="posts-item-excerpt">${post.excerpt}</p>
                </article>
            </div>
        `;
        container.innerHTML += postHTML;
    });

    renderPagination(totalPages);
}

function renderPagination(totalPages) {
    const paginationContainer = document.getElementById('pagination');
    if (!paginationContainer) return;

    paginationContainer.innerHTML = '';

    const ul = document.createElement('ul');

    const prevText = translations[currentLanguage]['pagination.previous'];
    const nextText = translations[currentLanguage]['pagination.next'];

    if (currentPage > 1) {
        const li = document.createElement('li');
        li.innerHTML = `<a href="#" onclick="goToPage(${currentPage - 1})">← ${prevText}</a>`;
        ul.appendChild(li);
    } else {
        const li = document.createElement('li');
        li.innerHTML = `<span class="disabled">← ${prevText}</span>`;
        ul.appendChild(li);
    }


    for (let i = 1; i <= totalPages; i++) {
        const li = document.createElement('li');
        if (i === currentPage) {
            li.innerHTML = `<span class="current">${i}</span>`;
        } else {
            li.innerHTML = `<a href="#" onclick="goToPage(${i})">${i}</a>`;
        }
        ul.appendChild(li);
    }


    if (currentPage < totalPages) {
        const li = document.createElement('li');
        li.innerHTML = `<a href="#" onclick="goToPage(${currentPage + 1})">${nextText} →</a>`;
        ul.appendChild(li);
    } else {
        const li = document.createElement('li');
        li.innerHTML = `<span class="disabled">${nextText} →</span>`;
        ul.appendChild(li);
    }

    paginationContainer.appendChild(ul);
}


function goToPage(page) {
    currentPage = page;
    renderPosts();
    document.getElementById('posts-container').scrollIntoView({ behavior: 'smooth' });
}


document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        if (this.getAttribute('href') !== '#') {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth' });
            }
        }
    });
});
