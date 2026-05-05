const filterButtons = document.querySelectorAll('.filter-btn');
const glossaryCards = document.querySelectorAll('.glossary-card');

  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Remove a classe "active" de todos os botões
      filterButtons.forEach(btn => btn.classList.remove('active'));
      // Adiciona a classe "active" ao botão clicado
      button.classList.add('active');

      // Obtém a categoria do botão clicado
      const category = button.getAttribute('data-category');

      // Filtra os cards
      glossaryCards.forEach(card => {
        if (category === 'all' || card.getAttribute('data-category') === category) {
          card.style.display = 'block'; // Mostra o card
        } else {
          card.style.display = 'none'; // Oculta o card
        }
      });
    });
  });
  // Adicione este script
// Modifique o JavaScript do accordion
document.querySelectorAll('.accordion-header').forEach(button => {
    button.addEventListener('click', () => {
      const item = button.parentElement;
      const content = item.querySelector('.accordion-content');
      
      if(item.classList.contains('active')) {
        content.style.maxHeight = '0';
        item.classList.remove('active');
      } else {
        content.style.maxHeight = content.scrollHeight + 'px';
        item.classList.add('active');
      }
      
      // Fecha outros accordions
      document.querySelectorAll('.accordion-item').forEach(otherItem => {
        if(otherItem !== item) {
          otherItem.classList.remove('active');
          otherItem.querySelector('.accordion-content').style.maxHeight = '0';
        }
      });
    });
  });
  // Adicione este script
  document.querySelector('.simulate-hack')?.addEventListener('click', () => {
    const checks = document.querySelectorAll('.check-item input:checked');
    const result = document.querySelector('.hack-result');
    const accordionContent = result.closest('.accordion-content');
    
    let securityScore = checks.length * 25; // 4 itens, cada um vale 25%
    let message = '';
    
    if (securityScore < 25) {
      message = '⚠️ ¡Alto riesgo! Protocolo vulnerable a exploits';
    } else if (securityScore < 50) {
      message = '🛡️ Riesgo moderado. Revisa cuidadosamente';
    } else if (securityScore < 75) {
      message = '✅ Seguridad aceptable, pero podría mejorar.';
    } else {
      message = '✅ Seguridad sólida. Buenas prácticas aplicadas';
    }
    
    result.textContent = `Puntuación de seguridad: ${securityScore}% - ${message}`;
    result.classList.add('visible');
    
    // Expande o acordeão para mostrar o resultado
    accordionContent.style.maxHeight = accordionContent.scrollHeight + 'px';
  });