// Configuração dos Módulos
const courseModules = [
    {
        id: 'modulo-1',
        title: 'Fundamentos de Blockchain y Criptomonedas',
        description: 'Conceptos básicos de blockchain, criptomonedas y tecnologías relacionadas',
        videos: [
            { id: '8rUGRdOi3XM', title: '¿Qué es el blockchain?', duration: '5:42' },
            { id: 'rpIuhCgpJwQ', title: '¿Qué son las criptomonedas?', duration: '4:11' },
            { id: '3zP-VAJZQfQ', title: '¿Qué es Criptografía?', duration: '7:21' },
            { id: 'U-qeq1iV3UE', title: 'TIPOS de CADENAS de BLOQUES: BTC, ERC20, BEP20, TRC20', duration: '21:18' },
            { id: 'EVTNLiPQZ-s', title: '¿Qué es PoW, PoS y PoI?', duration: '8:18' },
            { id: 'GjOs_W3wilc', title: 'CÓMO FUNCIONA LA MINERÍA DE CRIPTOMONEDAS', duration: '6:24' },
            { id: 'nL7-3l7U7uU', title: 'Cómo Minar Criptomonedas Con Cualquier Ordenador', duration: '15:56' }
        ]
    },
    {
        id: 'modulo-2',
        title: 'Tecnología y Desarrollo en Blockchain',
        description: 'Aspectos técnicos y de desarrollo en blockchain',
        videos: [
            { id: 'Y8cpvreU9D0', title: '¿Qué son los Smart Contracts?', duration: '5:55' },
            { id: 'jtLl7beWud0', title: 'Cómo crear un SMART CONTRACT con SOLIDITY', duration: '13:50' },
            { id: 'WWn67-tY2PU', title: '¿Qué es el gas?', duration: '5:29' }
        ]
    },
    {
        id: 'modulo-3',
        title: 'Web3 y DeFi',
        description: 'Explorando la Web3 y las finanzas descentralizadas (DeFi)',
        videos: [
            { id: 'Yh4eiMH6nIQ', title: '¿Qué es la web3?', duration: '7:56' },
            { id: 'CtP7STtGbYk', title: 'Introducción a DeFi', duration: '5:19' },
            { id: 'SY5YlK4msck', title: '¿Qué es DeFi?', duration: '13:27' },
            { id: 'Me1ZliVElI4', title: '¿Qué son las DEX?', duration: '8:04' },
            { id: 'Oz998DbT6u8', title: 'Guía Completa de Uniswap para Iniciantes', duration: '21:33' },
            { id: 'EEMhUWA-JA0', title: 'Cómo Pedir Préstamos en Aave', duration: '9:40' },
            { id: 'CcIZFNKdefc', title: 'Liquidity Pools - Qué son y cómo funcionan', duration: '8:44' },
            { id: '-LPc0SwkeFw', title: 'Yield Farming Básico', duration: '3:59' },
            { id: '5CFDCTo0bLI', title: 'Qué es un NFT', duration: '3:03' },         // Novo
            { id: 'x4Aglp7ue5k', title: 'Que son los juegos blockchain', duration: '8:18' },  // Novo
            { id: 'QLlB4-ZXZXw', title: 'Ejemplos de Juegos Cripto', duration: '12:08' }      // Novo
        ]
    }
];

// Estado do Curso
let currentState = {
    activeModule: 0,
    activeVideo: 0,
    totalVideos: courseModules.reduce((acc, mod) => acc + mod.videos.length, 0)
};

// Inicialização
function initCourse() {
    renderModules();
    updateCourseStats();
    updateVideoPlayer();
    setupEventListeners();
}

function capitalizeTitle(title) {
    return title.toLowerCase().replace(/\b\w/g, char => char.toUpperCase());
}

// Renderização dos Módulos
function renderModules() {
    const container = document.getElementById('modules-container');
    
    courseModules.forEach((module, modIndex) => {
        const moduleHTML = `
            <div class="module-card ${modIndex === 0 ? 'active' : ''}" data-module="${modIndex}">
                <div class="module-header">
                    <h3>${module.title}</h3>
                    <i class="fas fa-chevron-down module-toggle"></i> <!-- Todas setas para baixo -->
                </div>
                <p>${module.description}</p>
                <div class="module-videos" style="display: none;"> <!-- Todos colapsados -->
                    ${module.videos.map((video, vidIndex) => `
                        <div class="video-item ${modIndex === 0 && vidIndex === 0 ? 'active' : ''}"
                             data-module="${modIndex}"
                             data-video="${vidIndex}">
                            <i class="fas fa-play-circle"></i>
                            ${capitalizeTitle(video.title)}
                            <span class="video-duration">${video.duration}</span>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
        container.insertAdjacentHTML('beforeend', moduleHTML);
    });
    
    // Adicionar listener para expandir/colapsar ao clicar no cabeçalho do módulo
    document.querySelectorAll('.module-header').forEach(header => {
        header.addEventListener('click', () => {
            const moduleCard = header.closest('.module-card');
            const videosList = moduleCard.querySelector('.module-videos');
            const toggle = header.querySelector('.module-toggle');
            videosList.style.display = videosList.style.display === 'none' ? 'block' : 'none';
            toggle.classList.toggle('fa-chevron-down');
            toggle.classList.toggle('fa-chevron-up');
        });
    });
}

// Atualizações do Player
function updateVideoPlayer() {
    const { activeModule, activeVideo } = currentState;
    
    // Verificar se os índices são válidos
    if (!courseModules[activeModule] || !courseModules[activeModule].videos[activeVideo]) {
        console.error('Módulo ou vídeo inválido:', activeModule, activeVideo);
        return;
    }
    
    const videoData = courseModules[activeModule].videos[activeVideo];
    
    // Atualizar o iframe do vídeo
    const iframe = document.getElementById('video-iframe');
    iframe.src = `https://www.youtube.com/embed/${videoData.id}?rel=0&modestbranding=1`;
    
    // Atualizar o progresso
    const totalVideos = courseModules.reduce((acc, mod) => acc + mod.videos.length, 0);
    const completedVideos = courseModules.slice(0, activeModule).reduce((acc, mod) => acc + mod.videos.length, 0) + activeVideo + 1;
    const progressPercent = (activeModule === 0 && activeVideo === 0) ? 0 : Math.min((completedVideos / totalVideos) * 100, 100);
    document.getElementById('progress').style.width = `${progressPercent}%`;
    document.getElementById('progress-text').textContent = `${Math.round(progressPercent)}% Completo`;
    
    // Controlar visibilidade dos botões
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    
    prevBtn.style.display = (activeModule === 0 && activeVideo === 0) ? 'none' : 'flex';
    const isLastVideo = activeModule === courseModules.length - 1 && activeVideo === courseModules[activeModule].videos.length - 1;
    nextBtn.style.display = isLastVideo ? 'none' : 'flex';
    
    // Atualizar classes ativas
    document.querySelectorAll('.module-card, .video-item').forEach(el => el.classList.remove('active'));
    document.querySelector(`.module-card[data-module="${activeModule}"]`).classList.add('active');
    document.querySelector(`.video-item[data-module="${activeModule}"][data-video="${activeVideo}"]`).classList.add('active');
    
    // Rolar para o módulo ativo
    // Substitua APENAS o trecho de rolagem por isto:
const modulesContainer = document.querySelector('.modules-sidebar');
const activeModuleCard = document.querySelector(`.module-card[data-module="${activeModule}"]`);

if (modulesContainer && activeModuleCard) {
    // Calcula a posição relativa ao container
    const containerTop = modulesContainer.getBoundingClientRect().top;
    const cardTop = activeModuleCard.getBoundingClientRect().top;
    
    // Scroll ajustado (considera paddings e margens)
    const scrollPosition = modulesContainer.scrollTop + (cardTop - containerTop) - 20; // -20 para margem
    modulesContainer.scrollTo({
        top: scrollPosition,
        behavior: 'smooth'
    });
}
}

// Navegação
function navigate(direction) {
    if (direction === 'next') {
        if (currentState.activeVideo < courseModules[currentState.activeModule].videos.length - 1) {
            currentState.activeVideo++;
        } else if (currentState.activeModule < courseModules.length - 1) {
            currentState.activeModule++;
            currentState.activeVideo = 0;
        }
    } else if (direction === 'prev') {
        if (currentState.activeVideo > 0) {
            currentState.activeVideo--;
        } else if (currentState.activeModule > 0) {
            currentState.activeModule--;
            currentState.activeVideo = courseModules[currentState.activeModule].videos.length - 1;
        }
    }
    
    // Expandir automaticamente o módulo do vídeo atual
    document.querySelectorAll('.module-videos').forEach(videos => {
        videos.style.display = 'none'; // Colapsa todos os módulos
    });
    const currentModuleVideos = document.querySelector(`.module-card[data-module="${currentState.activeModule}"] .module-videos`);
    if (currentModuleVideos) {
        currentModuleVideos.style.display = 'block'; // Expande o módulo atual
    }
    
    // Ajustar as setinhas dos módulos
    document.querySelectorAll('.module-toggle').forEach(toggle => {
        toggle.classList.remove('fa-chevron-up');
        toggle.classList.add('fa-chevron-down'); // Todas as setas para baixo
    });
    const currentToggle = document.querySelector(`.module-card[data-module="${currentState.activeModule}"] .module-toggle`);
    if (currentToggle) {
        currentToggle.classList.remove('fa-chevron-down');
        currentToggle.classList.add('fa-chevron-up'); // Seta do módulo atual para cima
    }
    
    updateVideoPlayer(); // Atualiza o player de vídeo
}

// Event Listeners
function setupEventListeners() {
    // Navegação por botões
    document.getElementById('next-btn').addEventListener('click', () => navigate('next'));
    document.getElementById('prev-btn').addEventListener('click', () => navigate('prev'));
    
    // Navegação por cliques nos vídeos
    document.querySelectorAll('.video-item').forEach(item => {
        item.addEventListener('click', () => {
            currentState.activeModule = parseInt(item.dataset.module);
            currentState.activeVideo = parseInt(item.dataset.video);
            updateVideoPlayer();
        });
    });
}

// Status do Curso
function updateCourseStats() {
    document.getElementById('total-modules').textContent = `${courseModules.length} Módulos`;
    document.getElementById('total-videos').textContent = `${currentState.totalVideos} Vídeos`;
}

// Iniciar o curso
document.addEventListener('DOMContentLoaded', initCourse);