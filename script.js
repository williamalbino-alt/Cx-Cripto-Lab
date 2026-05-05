function countAnimation(targetNumber, elementId) {
    var currentNumber = 0;
    var increment = Math.ceil(targetNumber / 250);
    var intervalTime = 20;
  
    var interval = setInterval(function () {
      currentNumber += increment;
      if (currentNumber >= targetNumber) {
        clearInterval(interval);
        currentNumber = targetNumber;
      }
      document.getElementById(elementId).textContent = currentNumber.toLocaleString() + '+';
    }, intervalTime);
  }
  
  countAnimation(100000, 'count1');
  countAnimation(150, 'count2');
  
  document.addEventListener("DOMContentLoaded", function () {
    console.log("DOM carregado. Iniciando configuração...");
  
    const body = document.body;
    const topLogo = document.getElementById("topLogo");
    const footerLogo = document.getElementById("footerLogo");
    const themeIcon = document.getElementById("theme-icon");
  
    // Verifica se os elementos existem
    if (!themeIcon) {
      console.error("Erro: #theme-icon não encontrado no DOM!");
      return;
    }
    if (!topLogo || !footerLogo) {
      console.warn("Aviso: Um ou mais logos não foram encontrados!");
    }
  
    console.log("Elemento #theme-icon encontrado:", themeIcon);
  
    // Remove elementos obsoletos
    const oldCheckbox = document.querySelector("#hide_checkbox");
    if (oldCheckbox) oldCheckbox.remove();
  
    const toggleModeBtn = document.getElementById("toggleMode");
    if (toggleModeBtn) toggleModeBtn.remove();
  
    // Define o tema inicial: light por padrão
    let savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      body.classList.add("dark");
      body.classList.remove("light");
      themeIcon.src = "images/sun.png";
      themeIcon.alt = "Modo Claro";
    } else {
      body.classList.add("light");
      body.classList.remove("dark");
      themeIcon.src = "images/moon.png";
      themeIcon.alt = "Modo Escuro";
    }
  
    // Função para alternar o tema
    function toggleTheme() {
      console.log("Clicou no ícone de tema!");
      if (body.classList.contains("dark")) {
        body.classList.remove("dark");
        body.classList.add("light");
        themeIcon.src = "images/moon.png";
        themeIcon.alt = "Modo Escuro";
        localStorage.setItem("theme", "light");
      } else {
        body.classList.remove("light");
        body.classList.add("dark");
        themeIcon.src = "images/sun.png";
        themeIcon.alt = "Modo Claro";
        localStorage.setItem("theme", "dark");
      }
      updateLogos();
    }
  
    // Remove eventos anteriores (segurança) e adiciona o evento de clique
    themeIcon.removeEventListener("click", toggleTheme); // Evita duplicação
    themeIcon.addEventListener("click", toggleTheme);
    console.log("Evento de clique adicionado ao #theme-icon");
  
    // Função para atualizar os logos
    function updateLogos() {
      if (body.classList.contains("dark")) {
        topLogo.src = "images/logo_dark.webp";
        footerLogo.src = "images/logo_dark.webp";
      } else {
        topLogo.src = "images/logo.webp";
        footerLogo.src = "images/logo.webp";
      }
    }
  
    // Atualiza os logos ao carregar
    updateLogos();
  
    // Observador para mudanças no tema
    const observer = new MutationObserver(() => {
      updateLogos();
    });
    observer.observe(body, { attributes: true, attributeFilter: ["class"] });
  
    // Lógica do carrossel (só para index.html)
    const carousel = document.querySelector(".carousel");
    if (carousel) {
      const inner = carousel.querySelector(".carousel-inner");
      const items = inner.querySelectorAll(".carousel-item");
      const indicatorsContainer = carousel.querySelector(".carousel-indicators");
      const totalItems = items.length;
      const itemsPerPage = 2;
      const totalPages = Math.ceil(totalItems / itemsPerPage);
  
      for (let i = 0; i < totalPages; i++) {
        const indicator = document.createElement("span");
        indicator.classList.add("indicator");
        if (i === 0) indicator.classList.add("active");
        indicatorsContainer.appendChild(indicator);
      }
  
      const indicators = indicatorsContainer.querySelectorAll(".indicator");
      let currentIndex = 0;
  
      function updateCarousel() {
        const pageIndex = Math.floor(currentIndex / itemsPerPage);
        inner.style.transform = `translateX(-${pageIndex * 100}%)`;
        indicators.forEach((indicator, index) => {
          indicator.classList.toggle("active", index === pageIndex);
        });
      }
  
      carousel.querySelector(".prev").addEventListener("click", () => {
        currentIndex -= itemsPerPage;
        if (currentIndex < 0) {
          currentIndex = (totalPages - 1) * itemsPerPage;
        }
        updateCarousel();
      });
  
      carousel.querySelector(".next").addEventListener("click", () => {
        currentIndex += itemsPerPage;
        if (currentIndex >= totalItems) {
          currentIndex = 0;
        }
        updateCarousel();
      });
  
      indicators.forEach((indicator, index) => {
        indicator.addEventListener("click", () => {
          currentIndex = index * itemsPerPage;
          updateCarousel();
        });
      });
  
      updateCarousel();
    }
  });
  // Script de pagina DeFi
    // script.js
document.querySelectorAll('.video-card').forEach(card => {
  const iframe = card.querySelector('iframe');
  const originalSize = {
    width: iframe.style.width,
    height: iframe.style.height
  };

  // Click para expandir
  card.addEventListener('click', () => {
    card.classList.toggle('expanded');
    
    if (card.classList.contains('expanded')) {
      iframe.src += "&autoplay=1";
      document.body.style.overflow = 'hidden';
    } else {
      iframe.src = iframe.src.replace("&autoplay=1", "");
      document.body.style.overflow = '';
    }
  });

  // Fechar ao clicar fora
  document.addEventListener('click', (e) => {
    if (!card.contains(e.target) && card.classList.contains('expanded')) {
      card.classList.remove('expanded');
      document.body.style.overflow = '';
    }
  });
});

  // Carrousel Defi
  class VideoCarousel {
    constructor(selector) {
      this.carousel = document.querySelector(selector);
      this.currentVideo = {
        id: 'SY5YlK4msck',
        title: '¿Que es DiFi?',
        thumbnail: 'https://img.youtube.com/vi/SY5YlK4msck/maxresdefault.jpg',
        start: 31
      };
      this.initialize();
      this.setupSwapListener();
    }

  initialize() {
    this.cacheElements();
    this.setupEventListeners();
    this.createIndicators();
    this.updateCarousel();
    this.preloadVideos();
  }

  cacheElements() {
    this.inner = this.carousel.querySelector('.carousel-inner');
    this.originalItems = Array.from(this.inner.querySelectorAll('.thumbnail'));
    this.cloneItems();
    this.indicatorsContainer = this.carousel.querySelector('.carousel-indicators');
    this.videoPlayerFrame = document.getElementById('video-player-frame');
    this.totalItems = this.originalItems.length;
    this.itemsPerPage = 3;
    this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
    this.currentPage = 0;
  }

  cloneItems() {
    const clones = this.originalItems.slice(0, this.itemsPerPage).map(item => {
      const clone = item.cloneNode(true);
      clone.classList.add('clone');
      return clone;
    });
    clones.forEach(clone => this.inner.appendChild(clone));
  }

  setupEventListeners() {
    this.carousel.querySelector('.prev').addEventListener('click', () => this.navigate(-1));
    this.carousel.querySelector('.next').addEventListener('click', () => this.navigate(1));
    
    this.inner.addEventListener('click', (e) => {
      const thumbnail = e.target.closest('.thumbnail');
      if (thumbnail) this.handleThumbnailClick(thumbnail);
    });
  }

  createIndicators() {
    this.indicatorsContainer.innerHTML = Array.from(
      { length: this.totalPages },
      (_, i) => `<span class="indicator ${i === 0 ? 'active' : ''}" data-page="${i}"></span>`
    ).join('');
    
    this.indicatorsContainer.querySelectorAll('.indicator').forEach(indicator => {
      indicator.addEventListener('click', (e) => {
        this.currentPage = parseInt(e.target.dataset.page);
        this.updateCarousel();
      });
    });
  }

  navigate(direction) {
    this.currentPage = (this.currentPage + direction + this.totalPages) % this.totalPages;
    
    if (direction === 1 && this.currentPage === 0) {
      this.inner.style.transition = 'none';
      this.inner.style.transform = `translateX(-${this.totalPages * 100}%)`;
      
      requestAnimationFrame(() => {
        this.inner.style.transition = 'transform 0.5s ease-in-out';
        this.currentPage = 0;
        this.updateCarousel();
      });
    } else {
      this.updateCarousel();
    }
  }

  updateCarousel() {
    const offset = -this.currentPage * 100;
    this.inner.style.transform = `translateX(${offset}%)`;
    
    this.indicatorsContainer.querySelectorAll('.indicator').forEach((indicator, index) => {
      indicator.classList.toggle('active', index === this.currentPage);
    });
  }

  async handleThumbnailClick(thumbnail) {
    try {
      const oldVideo = { ...this.currentVideo };
      
      const newVideo = {
        id: thumbnail.dataset.video,
        title: thumbnail.dataset.title,
        thumbnail: thumbnail.querySelector('img').src,
        start: thumbnail.dataset.start || 0
      };

      this.updateVideoPlayer(newVideo);
      this.updateThumbnail(thumbnail, oldVideo);
      
      this.currentVideo = newVideo;

      thumbnail.classList.add('active');
      setTimeout(() => thumbnail.classList.remove('active'), 500);
      
      await this.preloadNextVideo();
      
    } catch (error) {
      console.error('Error loading video:', error);
      this.showErrorFeedback(thumbnail);
    }
  }

  updateVideoPlayer({ id, title, start }) {
    const newSrc = `https://www.youtube.com/embed/${id}?start=${start}&autoplay=1`;
    this.videoPlayerFrame.src = newSrc;
    
    const mainTitle = document.getElementById('main-video-title');
    if (mainTitle) mainTitle.textContent = title;
  }

  updateThumbnail(thumbnail, { id, title, thumbnail: oldThumbnail }) {
    thumbnail.dataset.video = id;
    thumbnail.dataset.title = title;
    
    const img = thumbnail.querySelector('img');
    const caption = thumbnail.querySelector('.thumbnail-caption');
    
    img.src = oldThumbnail;
    caption.textContent = title;
  }

  async preloadNextVideo() {
    const nextIndex = (this.currentPage + 1) % this.totalItems;
    const nextVideo = this.originalItems[nextIndex];
    if (nextVideo) {
      const img = new Image();
      img.src = `https://img.youtube.com/vi/${nextVideo.dataset.video}/maxresdefault.jpg`;
      await img.decode();
    }
  }

  showErrorFeedback(thumbnail) {
    thumbnail.classList.add('error');
    setTimeout(() => thumbnail.classList.remove('error'), 2000);
  }

  preloadVideos() {
    this.originalItems.forEach(item => {
      const img = new Image();
      img.src = `https://img.youtube.com/vi/${item.dataset.video}/maxresdefault.jpg`;
    });
  }
}

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
  new VideoCarousel('.carousel');
  
  const videoPlayer = document.getElementById('video-player-frame');
  videoPlayer.addEventListener('error', () => {
    videoPlayer.parentElement.innerHTML = `
      <div class="video-error">
        <p>⚠️ Error al cargar el video</p>
        <button class="retry-btn">Reintentar</button>
      </div>
    `;
  });
});

// Simulador Defi
function simularSwap() {
  const inputToken = document.getElementById("inputToken").value;
  const outputToken = document.getElementById("outputToken").value;
  const swapAmount = parseFloat(document.getElementById("swapAmount").value);

  if (isNaN(swapAmount) || swapAmount <= 0) {
    document.getElementById("simulatorResult").innerHTML = "Por favor, ingrese una cantidad válida.";
    return;
  }

  const prices = { ETH: 3000, USDC: 1, DAI: 1 };
  const inputValue = swapAmount * prices[inputToken];
  const outputAmount = inputValue / prices[outputToken];
  const fee = outputAmount * 0.003;

  document.getElementById("simulatorResult").innerHTML = `
    <p>Cantidad recibida: ${(outputAmount - fee).toFixed(2)} ${outputToken}</p>
    <p>Tarifa de transacción: ${fee.toFixed(2)} ${outputToken}</p>
    <p>Impacto en el precio: 0.1% (simulado)</p>
  `;
  document.getElementById("simulatorResult").classList.add('show');
}

// Accordion DeFi
document.querySelectorAll('.defi-accordion-item').forEach(item => {
  const toggle = item.querySelector('.defi-toggle');
  
  toggle.addEventListener('click', () => {
    const isActive = item.classList.contains('active');
    document.querySelectorAll('.defi-accordion-item').forEach(el => el.classList.remove('active'));
    if (!isActive) item.classList.add('active');
  });
});
//Script da pagina de jogos 
document.addEventListener('DOMContentLoaded', () => {
  // Evento SEPARADO para botões iframe
  document.querySelectorAll('.game-btn[data-action="iframe"]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const jogo = btn.closest('.game-card').dataset.game;
      abrirJogo(jogo);
    });
  });

  // Evento SEPARADO para botões new-tab
  document.querySelectorAll('.game-btn[data-action="new-tab"]').forEach(btn => {
    btn.addEventListener('click', function(e) {
      e.stopPropagation();
      e.preventDefault();
      
      const jogo = this.closest('.game-card').dataset.game;
      let gameUrl = '';
      
      switch(jogo) {
        case 'quiz': gameUrl = 'quiz/index.html'; break;
        case 'memoria': gameUrl = 'memoria/index.html'; break;
        case 'blockchain': gameUrl = 'https://blockchaindemo.io/'; break;
        case 'cryptozombies': gameUrl = 'https://cryptozombies.io/es/lesson/1'; break;
      }
      
      if(gameUrl) window.open(gameUrl, '_blank');
    });
  });
});

// Restante do código mantido igual
function abrirJogo(jogo) {
  const modal = document.querySelector('.game-modal');
  const modalContent = document.querySelector('.modal-content');
  modalContent.innerHTML = '';

  const closeBtn = document.createElement('span');
  closeBtn.classList.add('close-btn');
  closeBtn.textContent = '×';
  closeBtn.addEventListener('click', cerrarJuego);
  modalContent.appendChild(closeBtn);

  const gameContainer = document.createElement('div');
  gameContainer.classList.add('game-iframe-container');
  modalContent.appendChild(gameContainer);

  modal.style.display = 'block';
  modal.classList.add('active');

  switch (jogo) {
    case 'quiz':
      gameContainer.innerHTML = `<iframe src="quiz/index.html" style="width:100%; height:100%; border:none;" allowfullscreen></iframe>`;
      break;
    case 'blockchain':
      gameContainer.innerHTML = `<iframe src="https://blockchaindemo.io/" style="width:100%; height:100%; border:none;" allowfullscreen></iframe>`;
      break;
    case 'cryptozombies':
      gameContainer.innerHTML = `<iframe src="https://cryptozombies.io/es/lesson/1" style="width:100%; height:100%; border:none;" allowfullscreen></iframe>`;
      break;
    case 'memoria':
      gameContainer.innerHTML = `<iframe src="memoria/index.html" style="width:100%; height:100%; border:none;" allowfullscreen></iframe>`;
      break;
  }
}

// Função para fechar o modal (mantida igual)
function cerrarJuego() {
  const modal = document.querySelector('.game-modal');
  modal.classList.remove('active');
  setTimeout(() => {
    modal.style.display = 'none';
    const modalContent = document.querySelector('.modal-content');
    modalContent.innerHTML = '';
  }, 300);
}
// parte jogos JS 
document.addEventListener('DOMContentLoaded', function() {
  // Toggle do conteúdo das curiosidades (seu código atual)
  document.querySelector('.curiosidades-toggle').addEventListener('click', function() {
    this.querySelector('.fa-chevron-down').classList.toggle('rotate');
    document.querySelector('.curiosidades-content').classList.toggle('active');
  });

  // Funcionalidade do modal
  const modal = document.getElementById('videoModal');
  const iframe = document.getElementById('modalIframe');
  const closeBtn = document.querySelector('.close');

  // Ao clicar em um vídeo
  document.querySelectorAll('.video-container').forEach(container => {
    container.addEventListener('click', function() {
      const videoUrl = this.getAttribute('data-video');
      iframe.src = videoUrl; // Define a URL do iframe no modal
      modal.style.display = 'block'; // Exibe o modal
    });
  });

  // Fechar o modal ao clicar no "X"
  closeBtn.addEventListener('click', function() {
    modal.style.display = 'none';
    iframe.src = ''; // Limpa o iframe para parar o vídeo
  });

  // Fechar o modal ao clicar fora dele
  window.addEventListener('click', function(event) {
    if (event.target === modal) {
      modal.style.display = 'none';
      iframe.src = ''; // Limpa o iframe
    }
  });
});
