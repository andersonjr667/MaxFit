document.addEventListener('DOMContentLoaded', function() {
  // Carregar header e footer
  const loadComponents = async () => {
    try {
      const headerResponse = await fetch('header.html');
      const footerResponse = await fetch('footer.html');
      
      document.getElementById('header-placeholder').innerHTML = await headerResponse.text();
      document.getElementById('footer-placeholder').innerHTML = await footerResponse.text();
    } catch (error) {
      console.error('Erro ao carregar componentes:', error);
    }
  };

  // Observador de interseção para animações
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, {
    threshold: 0.1
  });

  // Aplicar observador em todas as seções
  document.querySelectorAll('section').forEach((section) => {
    observer.observe(section);
  });

  // Scroll suave para links de navegação
  document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      document.querySelector(targetId).scrollIntoView({
        behavior: 'smooth'
      });
    });
  });

  // Envio do formulário de contato
  document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const formData = {
      name: document.getElementById('name').value,
      email: document.getElementById('email').value,
      message: document.getElementById('message').value
    };

    fetch('/submit_form', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
    .then(response => response.json())
    .then(data => {
      alert(data.message); // Exibe uma mensagem de sucesso
    })
    .catch((error) => {
      console.error('Erro:', error);
    });
  });

  // Inicializar
  loadComponents();
});