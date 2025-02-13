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
      alert(data.message);
    })
    .catch((error) => {
      console.error('Erro:', error);
    });
  });

  // Menu Hamburguer
  document.querySelector('.hamburger').addEventListener('click', function() {
    this.parentElement.classList.toggle('active');
  });

  // Fechar menu ao clicar em um link (mobile)
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      const nav = document.querySelector('nav');
      if (nav.classList.contains('active')) {
        nav.classList.remove('active');
      }
    });
  });

  // Carrossel
  let currentSlide = 0;
  const slides = document.querySelectorAll('.carrossel-item');
  const totalSlides = slides.length;

  function showSlide(n) {
    slides.forEach(slide => slide.classList.remove('active'));
    currentSlide = (n + totalSlides) % totalSlides;
    slides[currentSlide].classList.add('active');
  }

  // Controles do carrossel
  document.querySelector('.next').addEventListener('click', () => showSlide(currentSlide + 1));
  document.querySelector('.prev').addEventListener('click', () => showSlide(currentSlide - 1));

  // Auto-avanço do carrossel
  setInterval(() => showSlide(currentSlide + 1), 5000);

  // Inicializar
  loadComponents();
}); 
