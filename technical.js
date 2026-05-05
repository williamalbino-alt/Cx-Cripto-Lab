// Modo notruno 
// Seleção dos elementos do DOM
const body = document.body;
const topLogo = document.getElementById("topLogo");
const footerLogo = document.getElementById("footerLogo");
const themeIcon = document.getElementById("theme-icon");

// Função para alternar o tema
function toggleTheme() {
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

// Função para atualizar os logos
function updateLogos() {
  if (topLogo && footerLogo) {
    if (body.classList.contains("dark")) {
      topLogo.src = "images/logo_dark.webp";
      footerLogo.src = "images/logo_dark.webp";
    } else {
      topLogo.src = "images/logo.webp";
      footerLogo.src = "images/logo.webp";
    }
  }
}

// Configuração inicial do tema
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
updateLogos();

// Adicionar o evento de clique ao ícone de tema
themeIcon.addEventListener("click", toggleTheme);


// scripts/technical.js

document.addEventListener('DOMContentLoaded', () => {
    // Referências ao DOM
    const glossarySearch = document.getElementById('glossary-search');
    const glossaryList = document.getElementById('glossary-list');
    const toggleGlossaryBtn = document.getElementById('toggle-glossary');
    const videoPlayerFrame = document.getElementById('video-player-frame');
    const mainVideoTitle = document.getElementById('main-video-title');
    const thumbnails = document.querySelectorAll('.thumbnail');
    const prevButton = document.querySelector('.carousel-control.prev');
    const nextButton = document.querySelector('.carousel-control.next');
    const carouselInner = document.querySelector('.carousel-inner');
    const body = document.body;
    let currentIndex = 0;
  
    // ===== SOLUÇÃO AGRESSIVA PARA CONTROLE DE SCROLL =====
    
    // 1. Impedir scroll imediatamente
    window.scrollTo(0, 0);
    document.body.style.overflow = 'hidden'; // Impede qualquer scroll
    
    // 2. Função para forçar a posição no topo
    const forceScrollTop = () => {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'instant' // Comportamento instantâneo para ser mais agressivo
      });
    };
    
    // 3. Aplicar scroll forçado em vários eventos
    forceScrollTop();
    window.addEventListener('scroll', forceScrollTop);
    window.addEventListener('resize', forceScrollTop);
    
    // 4. Utilizar um intervalo mais agressivo durante os primeiros segundos
    const scrollInterval = setInterval(forceScrollTop, 10); // Intervalo mais frequente
    
    // 5. Liberar o scroll após um tempo suficiente
    setTimeout(() => {
      clearInterval(scrollInterval);
      window.removeEventListener('scroll', forceScrollTop);
      window.removeEventListener('resize', forceScrollTop);
      document.body.style.overflow = ''; // Restaura o scroll normal
      
      // Monitor adicional por segurança
      const finalCheck = setTimeout(() => {
        forceScrollTop();
        window.removeEventListener('scroll', forceScrollTop);
      }, 500);
    }, 1500); // Tempo maior para garantir que a página está completamente carregada
    
    // ===== FIM DA SOLUÇÃO DE SCROLL =====
  
    // Adicionar estilo para controlar a exibição do conteúdo do glossário
    const style = document.createElement('style');
    style.textContent = `
      .glossary-content {
        display: none;
      }
      .glossary-item.active .glossary-content {
        display: block !important;
      }
      .fa-chevron-up {
        transform: rotate(180deg);
        transition: transform 0.3s;
      }
    `;
    document.head.appendChild(style);
    
    // Implementar a funcionalidade de clique usando uma abordagem baseada em classes
    document.querySelectorAll('.glossary-item').forEach(item => {
      const header = item.querySelector('.glossary-header');
      header.addEventListener('click', function() {
        // Toggle a classe active no item do glossário
        item.classList.toggle('active');
        
        // Atualizar o ícone
        const icon = this.querySelector('.fa-chevron-down, .fa-chevron-up');
        if (item.classList.contains('active')) {
          icon.classList.remove('fa-chevron-down');
          icon.classList.add('fa-chevron-up');
        } else {
          icon.classList.remove('fa-chevron-up');
          icon.classList.add('fa-chevron-down');
        }
      });
    });
  
    // Video Carousel - Versão Otimizada
if (videoPlayerFrame && mainVideoTitle && thumbnails.length > 0) {
  let currentMainVideo = {
    id: 'jtLl7beWud0',
    type: 'maxresdefault',
    title: 'Cómo crear un SMART CONTRACT con SOLIDITY'
  };

  const loadThumbnail = (element, videoId, type) => {
    const img = element.querySelector('img');
    const fallback = () => {
      img.src = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
      element.dataset.thumbnailType = 'hqdefault';
    };
    
    img.src = `https://img.youtube.com/vi/${videoId}/${type}.jpg`;
    img.onerror = type === 'maxresdefault' ? fallback : null;
  };

  const swapVideos = (clickedThumbnail) => {
    // Dados do vídeo clicado
    const newVideo = {
      id: clickedThumbnail.dataset.video,
      type: clickedThumbnail.dataset.thumbnailType,
      title: clickedThumbnail.dataset.title
    };

    // Atualizar player principal
    videoPlayerFrame.src = `https://www.youtube.com/embed/${newVideo.id}?autoplay=1`;
    mainVideoTitle.textContent = newVideo.title;

    // Atualizar miniatura clicada com os dados antigos
    clickedThumbnail.dataset.video = currentMainVideo.id;
    clickedThumbnail.dataset.title = currentMainVideo.title;
    clickedThumbnail.dataset.thumbnailType = currentMainVideo.type;
    clickedThumbnail.querySelector('.thumbnail-caption').textContent = currentMainVideo.title;
    
    // Carregar nova miniatura com verificação de erro
    loadThumbnail(clickedThumbnail, currentMainVideo.id, currentMainVideo.type);

    // Atualizar registro do vídeo principal
    currentMainVideo = newVideo;
  };

  // Inicializar miniaturas
  thumbnails.forEach(thumbnail => {
    const initialType = thumbnail.querySelector('img').src.includes('hqdefault') 
                      ? 'hqdefault' 
                      : 'maxresdefault';
    thumbnail.dataset.thumbnailType = initialType;

    thumbnail.addEventListener('click', () => swapVideos(thumbnail));
  });

  // Controles do carrossel (mantido igual)
  const itemsPerPage = 3;
  const totalItems = thumbnails.length;
  const maxIndex = Math.ceil(totalItems / itemsPerPage) - 1;

  prevButton.addEventListener('click', () => {
    if (currentIndex > 0) {
      currentIndex--;
      carouselInner.style.transform = `translateX(-${currentIndex * 33.33}%)`;
    }
  });

  nextButton.addEventListener('click', () => {
    if (currentIndex < maxIndex) {
      currentIndex++;
      carouselInner.style.transform = `translateX(-${currentIndex * 33.33}%)`;
    }
  });
}
  
    // Toggle Glossary 
    if (toggleGlossaryBtn && glossaryList) {
      toggleGlossaryBtn.addEventListener('click', () => {
        glossaryList.classList.toggle('expanded');
        toggleGlossaryBtn.classList.toggle('expanded');
        
        // Atualiza o texto do botão
        if (glossaryList.classList.contains('expanded')) {
          toggleGlossaryBtn.textContent = 'Ver menos';
          // Mostrar itens ocultos
          document.querySelectorAll('.hidden-glossary-item').forEach(item => {
            item.style.display = 'block';
          });
        } else {
          toggleGlossaryBtn.textContent = 'Ver más';
          // Ocultar itens marcados como ocultos
          document.querySelectorAll('.hidden-glossary-item').forEach(item => {
            item.style.display = 'none';
          });
        }
        
        toggleGlossaryBtn.innerHTML += ' <i class="fas fa-chevron-down"></i>';
      });
    }
  
    // Configuração inicial: ocultar itens .hidden-glossary-item
    document.querySelectorAll('.hidden-glossary-item').forEach(item => {
      item.style.display = 'none';
    });
  
    // Glossary Search - com correção para manter "Ver mais/menos" funcionando
    if (glossarySearch) {
      glossarySearch.addEventListener('input', function(e) {
        const searchTerm = e.target.value.toLowerCase().trim();
        const items = document.querySelectorAll('#glossary-list li');
        let hiddenItemsVisible = false;
        let visibleItemsCount = 0;
  
        items.forEach(item => {
          const text = item.textContent.toLowerCase();
          const matches = text.includes(searchTerm);
          
          if (searchTerm === '') {
            // Se a busca estiver vazia, restaura o comportamento original
            if (item.classList.contains('hidden-glossary-item')) {
              // Se o item é um dos escondidos e a lista não está expandida
              item.style.display = glossaryList.classList.contains('expanded') ? 'block' : 'none';
            } else {
              // Se o item é um dos visíveis por padrão
              item.style.display = 'block';
            }
          } else {
            // Durante a busca, mostra ou esconde baseado no termo
            item.style.display = matches ? 'block' : 'none';
            
            if (matches) {
              visibleItemsCount++;
              // Verifica se algum item oculto está visível
              if (item.classList.contains('hidden-glossary-item')) {
                hiddenItemsVisible = true;
              }
            }
          }
        });
  
        // Atualiza o botão "Ver mais/menos" conforme necessário
        if (toggleGlossaryBtn) {
          if (searchTerm === '') {
            // Restaura o botão para seu estado normal
            toggleGlossaryBtn.style.display = 'block';
            toggleGlossaryBtn.textContent = glossaryList.classList.contains('expanded') ? 'Ver menos' : 'Ver más';
            toggleGlossaryBtn.innerHTML += ' <i class="fas fa-chevron-down"></i>';
          } else {
            // Durante a busca
            toggleGlossaryBtn.style.display = 'block';
            
            if (hiddenItemsVisible) {
              // Se itens ocultos estão visíveis, mostrar "Ver menos"
              toggleGlossaryBtn.textContent = 'Ver menos';
              glossaryList.classList.add('expanded');
              toggleGlossaryBtn.classList.add('expanded');
            } else {
              // Se nenhum item oculto está visível
              toggleGlossaryBtn.textContent = 'Ver más';
              glossaryList.classList.remove('expanded');
              toggleGlossaryBtn.classList.remove('expanded');
            }
            
            toggleGlossaryBtn.innerHTML += ' <i class="fas fa-chevron-down"></i>';
          }
        }
      });
    }
  
    // Carregar o tema salvo
    if (localStorage.getItem('theme') === 'dark') {
      body.classList.remove('light');
      body.classList.add('dark');
    } else {
      body.classList.remove('dark');
      body.classList.add('light');
    }
  });
  // Adicionar funcionalidade para os itens técnicos
  document.addEventListener('DOMContentLoaded', () => {
    // Selecionar todos os itens técnicos
    const technicalItems = document.querySelectorAll('.technical-item');
    
    // Adicionar estilo para controlar a exibição do conteúdo técnico
    const style = document.createElement('style');
    style.textContent = `
      .technical-content {
        display: none;
        padding: 15px;
        margin-top: 10px;
        border-radius: 5px;
        background-color: rgba(255, 255, 255, 0.1);
      }
      .technical-item.active .technical-content {
        display: block !important;
      }
      .technical-item.active .arrow-icon {
        transform: rotate(180deg);
        transition: transform 0.3s;
      }
    `;
    document.head.appendChild(style);
    
    // Adicionar evento de clique para cada item técnico
    technicalItems.forEach(item => {
      const toggle = item.querySelector('.technical-toggle');
      
      toggle.addEventListener('click', function() {
        // Toggle a classe active no item técnico
        item.classList.toggle('active');
        
        // Atualizar o ícone de seta
        const arrowIcon = this.querySelector('.arrow-icon');
        if (arrowIcon) {
          // A transformação CSS já está sendo aplicada via classe active
        }
      });
    });
  });