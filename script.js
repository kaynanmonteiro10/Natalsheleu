// Detectar mobile PRIMEIRO (antes de usar em qualquer lugar)
const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent) || window.innerWidth <= 768;

// Contador Regressivo para o Natal
function updateCountdown() {
    const christmas = new Date('December 25, 2025 00:00:00').getTime();
    const now = new Date().getTime();
    const distance = christmas - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById('days').textContent = String(days).padStart(2, '0');
    document.getElementById('hours').textContent = String(hours).padStart(2, '0');
    document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
    document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');

    if (distance < 0) {
        clearInterval(countdownInterval);
        document.getElementById('countdown').innerHTML = '<h3 style="color: #ff69b4;">🎄 Feliz Natal, meu amor! 🎄</h3>';
    }
}

// Atualizar a cada segundo
const countdownInterval = setInterval(updateCountdown, 1000);
updateCountdown();

// Árvore de Natal Interativa
const stars = document.querySelectorAll('.star');
const messageDisplay = document.getElementById('messageDisplay');

stars.forEach(star => {
    star.addEventListener('click', function() {
        const message = this.getAttribute('data-message');
        
        // Animação de clique
        this.style.transform = 'rotate(720deg) scale(1.5)';
        setTimeout(() => {
            this.style.transform = '';
        }, 600);

        // Mostrar mensagem
        messageDisplay.textContent = message;
        messageDisplay.classList.add('show');
        
        // Efeito de brilho
        messageDisplay.style.animation = 'none';
        setTimeout(() => {
            messageDisplay.style.animation = 'fadeIn 0.5s ease';
        }, 10);
    });
});

// Efeito de rolagem suave
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Animação de entrada dos elementos (simplificada no mobile)
const observerOptions = {
    threshold: isMobile ? 0.05 : 0.1,
    rootMargin: isMobile ? '0px 0px 0px 0px' : '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target); // Parar de observar após animar
        }
    });
}, observerOptions);

// Aplicar animação de entrada a todas as seções
document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = isMobile ? 'translateY(20px)' : 'translateY(50px)';
    section.style.transition = isMobile ? 'opacity 0.5s ease, transform 0.5s ease' : 'opacity 0.8s ease, transform 0.8s ease';
    observer.observe(section);
});

// Efeito de partículas de coração (opcional)
function createHeart() {
    const heart = document.createElement('div');
    heart.innerHTML = '❤️';
    heart.style.position = 'fixed';
    heart.style.left = Math.random() * 100 + '%';
    heart.style.bottom = '-50px';
    heart.style.fontSize = (Math.random() * 20 + 10) + 'px';
    heart.style.opacity = '0.7';
    heart.style.pointerEvents = 'none';
    heart.style.zIndex = '9998';
    heart.style.transition = 'all 3s ease-out';
    
    document.body.appendChild(heart);
    
    setTimeout(() => {
        heart.style.bottom = '100vh';
        heart.style.opacity = '0';
    }, 100);
    
    setTimeout(() => {
        heart.remove();
    }, 3100);
}

// Criar corações periodicamente (a cada 5 segundos para melhor performance)
setInterval(createHeart, 5000);

// Envelope com senha
const envelopeWrapper = document.getElementById('envelopeWrapper');
const passwordBox = document.getElementById('passwordBox');
const letterContent = document.getElementById('letterContent');
const passwordInput = document.getElementById('passwordInput');
const openButton = document.getElementById('openEnvelope');
const closeButton = document.getElementById('closeLetter');
const errorMessage = document.getElementById('errorMessage');

function openEnvelope() {
    const password = passwordInput.value;
    
    if (password === '12062025') {
        // Esconde envelope e caixa de senha
        envelopeWrapper.classList.add('fade-out');
        passwordBox.classList.add('fade-out');
        
        setTimeout(() => {
            envelopeWrapper.style.display = 'none';
            passwordBox.style.display = 'none';
            letterContent.style.display = 'block';
            letterContent.classList.add('reveal');
            passwordInput.value = ''; // Limpa o campo
        }, 600);
    } else {
        errorMessage.style.display = 'block';
        passwordInput.classList.add('shake');
        
        setTimeout(() => {
            passwordInput.classList.remove('shake');
            errorMessage.style.display = 'none';
        }, 2000);
    }
}

function closeLetter() {
    letterContent.classList.remove('reveal');
    letterContent.classList.add('fade-out');
    
    setTimeout(() => {
        letterContent.style.display = 'none';
        letterContent.classList.remove('fade-out');
        envelopeWrapper.style.display = 'block';
        passwordBox.style.display = 'block';
        envelopeWrapper.classList.remove('fade-out');
        passwordBox.classList.remove('fade-out');
        envelopeWrapper.classList.add('reveal');
        passwordBox.classList.add('reveal');
    }, 600);
}

openButton.addEventListener('click', openEnvelope);
closeButton.addEventListener('click', closeLetter);
passwordInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        openEnvelope();
    }
});

// Lazy loading de vídeos para melhor performance
const lazyVideos = document.querySelectorAll('.lazy-video');

const videoObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const video = entry.target;
            const source = video.querySelector('source');
            const videoSrc = video.getAttribute('data-src');
            
            if (videoSrc && !source.src) {
                source.src = videoSrc;
                video.load();
                video.classList.add('loaded');
            }
            
            videoObserver.unobserve(video);
        }
    });
}, {
    rootMargin: '100px' // Aumentado para carregar antes
});

lazyVideos.forEach(video => {
    videoObserver.observe(video);
});

// Efeito Parallax otimizado (desabilitado no mobile)
if (!isMobile) {
    let ticking = false;

    function updateParallax() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.hero, .title');
        
        parallaxElements.forEach(element => {
            const speed = 0.5;
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
        
        ticking = false;
    }

    window.addEventListener('scroll', function() {
        if (!ticking) {
            window.requestAnimationFrame(updateParallax);
            ticking = true;
        }
    });
}

// Desabilitar criação de corações no mobile
if (!isMobile) {
    // Criar corações periodicamente (a cada 5 segundos para melhor performance)
    setInterval(createHeart, 5000);
}

// 100 Razões Porque Te Amo
const reasons = [
    "Seu sorriso ilumina meus dias mais escuros ☀️",
    "Você me faz querer ser uma pessoa melhor 🌟",
    "Seu jeito carinhoso me aquece o coração 💕",
    "Você me entende sem eu precisar falar 🤝",
    "Sua risada é minha música favorita 🎵",
    "Você é minha paz em meio ao caos 🕊️",
    "Seu abraço é meu lugar favorito 🏠",
    "Você acredita em mim quando eu não acredito 💪",
    "Seu olhar diz mais que mil palavras 👀",
    "Você me ensina o verdadeiro significado do amor ❤️",
    "Sua presença torna tudo mais bonito 🌈",
    "Você é minha parceira em tudo 🤝",
    "Seu coração puro me inspira 💝",
    "Você me faz rir até nos dias difíceis 😂",
    "Sua força me motiva a seguir em frente 💪",
    "Você é minha melhor amiga e amor da minha vida 👫",
    "Seu jeito único de ser me encanta ✨",
    "Você me aceita com todos os meus defeitos 🤗",
    "Sua bondade torna o mundo melhor 🌍",
    "Você é minha inspiração diária 🌟",
    "Seu amor me completa 💑",
    "Você me faz acreditar em sonhos 💭",
    "Sua inteligência me fascina 🧠",
    "Você é minha certeza em meio às incertezas 🎯",
    "Seu carinho cura minhas feridas 🩹",
    "Você é a resposta das minhas orações 🙏",
    "Sua paciência comigo é admirável ⏰",
    "Você me faz sentir especial todos os dias 👑",
    "Seu apoio incondicional significa tudo 🤝",
    "Você é minha maior motivação 🚀",
    "Sua dedicação me emociona 💪",
    "Você transformou minha vida 🦋",
    "Seu amor é meu porto seguro ⚓",
    "Você é meu presente de Deus 🎁",
    "Sua beleza interior brilha 💫",
    "Você me ensina a amar de verdade 📚",
    "Seu sorriso é a primeira coisa que penso ao acordar 🌅",
    "Você é minha razão de agradecer todos os dias 🙏",
    "Sua confiança em nós me fortalece 💪",
    "Você é meu futuro 🔮",
    "Seu jeito de me olhar derrete meu coração 😍",
    "Você é minha calma na tempestade 🌊",
    "Sua lealdade é incomparável 👑",
    "Você me faz sentir amado 💖",
    "Seu otimismo ilumina meus dias 🌞",
    "Você é minha felicidade 😊",
    "Sua honestidade me conquista 💯",
    "Você é meu exemplo de pessoa 🌟",
    "Seu amor me faz mais forte 💪",
    "Você é minha eternidade ♾️",
    "Seu jeito meigo me desarma 🥰",
    "Você é minha prioridade sempre 🥇",
    "Sua cumplicidade comigo é perfeita 🤝",
    "Você me faz acreditar no amor verdadeiro 💑",
    "Seu perdão me ensina humildade 🙏",
    "Você é minha inspiração para tudo 🎨",
    "Sua presença é meu maior presente 🎁",
    "Você é minha razão de viver 💓",
    "Seu amor me transforma 🦋",
    "Você é meu sonho realizado ✨",
    "Sua doçura adoça minha vida 🍯",
    "Você é minha estrela guia ⭐",
    "Seu carinho é meu combustível 🔋",
    "Você é minha poesia 📝",
    "Sua voz acalma minha alma 🎶",
    "Você é minha verdade 💯",
    "Seu amor me cura 💊",
    "Você é minha luz 💡",
    "Sua fé me inspira 🙏",
    "Você é meu milagre 🌟",
    "Seu beijo é minha salvação 💋",
    "Você é minha canção favorita 🎵",
    "Sua coragem me impressiona 🦁",
    "Você é meu lar 🏡",
    "Seu amor é puro e verdadeiro 💝",
    "Você é minha escolha todos os dias 💍",
    "Sua alegria é contagiante 😄",
    "Você é meu tesouro 💎",
    "Seu amor me ensina a perdoar ❤️‍🩹",
    "Você é minha alma gêmea 👫",
    "Sua energia positiva me contagia ⚡",
    "Você é meu tudo 🌍",
    "Seu amor me libertou 🦅",
    "Você é minha bênção 🙏",
    "Sua simplicidade me encanta 🌸",
    "Você é meu refúgio 🏔️",
    "Seu amor me completa totalmente 🧩",
    "Você é minha rainha 👸",
    "Sua presença ilumina qualquer lugar 💫",
    "Você é meu amor eterno 💕",
    "Seu jeito de amar é único 💖",
    "Você é minha razão de sorrir 😊",
    "Seu amor me faz viver intensamente 🎢",
    "Você é minha certeza de amor verdadeiro 💯",
    "Sua beleza me hipnotiza 😍",
    "Você é meu paraíso 🌴",
    "Seu amor é minha força 💪",
    "Você é minha vida 💓",
    "Simplesmente porque você é você ✨"
];

let usedReasons = [];
const reasonButton = document.getElementById('reasonButton');
const reasonText = document.getElementById('reasonText');
const reasonNumber = document.getElementById('reasonNumber');

reasonButton.addEventListener('click', function() {
    if (usedReasons.length === reasons.length) {
        usedReasons = []; // Reinicia quando todas foram mostradas
    }
    
    let randomReason;
    do {
        randomReason = Math.floor(Math.random() * reasons.length);
    } while (usedReasons.includes(randomReason));
    
    usedReasons.push(randomReason);
    
    reasonText.style.animation = 'none';
    setTimeout(() => {
        reasonText.textContent = reasons[randomReason];
        reasonNumber.textContent = `${usedReasons.length}/${reasons.length}`;
        reasonText.style.animation = 'fadeIn 0.8s ease';
    }, 50);
    
    // Efeito no botão
    this.style.transform = 'scale(0.95)';
    setTimeout(() => {
        this.style.transform = '';
    }, 100);
});

// Sistema de salvamento dos sonhos (localStorage)
function saveDreams(type) {
    let content, key, element;
    
    if (type === 'kaynan') {
        element = document.getElementById('kaynanDreams');
        key = 'kaynanDreams';
    } else if (type === 'sheleu') {
        element = document.getElementById('sheleuDreams');
        key = 'sheleuDreams';
    } else if (type === 'promises') {
        element = document.getElementById('ourPromises');
        key = 'ourPromises';
    }
    
    content = element.value;
    localStorage.setItem(key, content);
    
    // Feedback visual
    const btn = element.nextElementSibling;
    const originalText = btn.textContent;
    btn.textContent = '✅ Salvo!';
    btn.style.background = 'linear-gradient(135deg, #28a745, #20c997)';
    
    setTimeout(() => {
        btn.textContent = originalText;
        btn.style.background = '';
    }, 2000);
}

// Carrega os sonhos salvos ao abrir a página
window.addEventListener('load', function() {
    const kaynanDreams = localStorage.getItem('kaynanDreams');
    const sheleuDreams = localStorage.getItem('sheleuDreams');
    const ourPromises = localStorage.getItem('ourPromises');
    
    if (kaynanDreams) {
        document.getElementById('kaynanDreams').value = kaynanDreams;
    }
    if (sheleuDreams) {
        document.getElementById('sheleuDreams').value = sheleuDreams;
    }
    if (ourPromises) {
        document.getElementById('ourPromises').value = ourPromises;
    }
});

// Log de amor no console (easter egg)
console.log('%c❤️ Feliz Natal, Sheleu! ❤️', 'color: #ff69b4; font-size: 24px; font-weight: bold;');
console.log('%cFeito com muito amor por Kaynan 🎄', 'color: #ffb6c1; font-size: 16px;');
