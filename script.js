// Animated Hero Background (Particles)
const canvas = document.getElementById('hero-bg');
const ctx = canvas.getContext('2d');
let particles = [];
const colors = ['#00FFFF', '#FFFF00', '#4B0082'];
const PARTICLE_COUNT = 60;

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = document.querySelector('.home-section').offsetHeight;
}

function randomBetween(a, b) {
  return a + Math.random() * (b - a);
}

function createParticles() {
  particles = [];
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    particles.push({
      x: randomBetween(0, canvas.width),
      y: randomBetween(0, canvas.height),
      r: randomBetween(2, 6),
      color: colors[Math.floor(Math.random() * colors.length)],
      dx: randomBetween(-1.2, 1.2),
      dy: randomBetween(-1.2, 1.2),
      alpha: randomBetween(0.5, 1)
    });
  }
}

function drawParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let p of particles) {
    ctx.save();
    ctx.globalAlpha = p.alpha;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, 2 * Math.PI);
    ctx.fillStyle = p.color;
    ctx.shadowColor = p.color;
    ctx.shadowBlur = 16;
    ctx.fill();
    ctx.restore();
    // Move
    p.x += p.dx;
    p.y += p.dy;
    // Bounce
    if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
    if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
  }
}

function animateParticles() {
  drawParticles();
  requestAnimationFrame(animateParticles);
}

window.addEventListener('resize', () => {
  resizeCanvas();
  createParticles();
});

resizeCanvas();
createParticles();
animateParticles();

// Navbar Scroll Effect
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 40) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// Smooth Scrolling for Navbar Links
const navLinks = document.querySelectorAll('nav .nav-links a');
navLinks.forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault();
    const targetUrl = this.href;
    rocket.classList.add('fly');
    setTimeout(() => {
      rocket.classList.remove('fly');
      rocket.classList.add('explode');
      setTimeout(() => {
        window.location.href = targetUrl;
      }, 500); // Wait for explosion animation
    }, 1000); // Wait for fly animation
  });
});

// Scroll-triggered Animations for About Timeline
const timelineItems = document.querySelectorAll('.timeline-item');
function revealTimelineItems() {
  const trigger = window.innerHeight * 0.85;
  timelineItems.forEach(item => {
    const rect = item.getBoundingClientRect();
    if (rect.top < trigger) {
      item.classList.add('visible');
    }
  });
}
window.addEventListener('scroll', revealTimelineItems);
window.addEventListener('load', revealTimelineItems);

// Animated Form Interactions
const formGroups = document.querySelectorAll('.form-group input, .form-group textarea');
formGroups.forEach(input => {
  input.addEventListener('focus', function() {
    this.parentNode.classList.add('focused');
  });
  input.addEventListener('blur', function() {
    this.parentNode.classList.remove('focused');
  });
});

// Prevent default form submission (demo only)
document.querySelector('.contact-form').addEventListener('submit', function(e) {
  e.preventDefault();
  const btn = this.querySelector('.submit-btn');
  btn.textContent = 'Sent!';
  btn.style.background = 'var(--neon-yellow)';
  btn.style.color = 'var(--dark-purple)';
  setTimeout(() => {
    btn.textContent = 'Send Message';
    btn.style.background = '';
    btn.style.color = '';
  }, 2000);
});

// Testimonial Slider for Home Page
const testimonials = document.querySelectorAll('.testimonial');
const prevBtn = document.querySelector('.testimonial-prev');
const nextBtn = document.querySelector('.testimonial-next');
let testimonialIndex = 0;

function showTestimonial(idx) {
  testimonials.forEach((t, i) => {
    t.classList.toggle('active', i === idx);
  });
}
if (testimonials.length) {
  showTestimonial(testimonialIndex);
  prevBtn.addEventListener('click', () => {
    testimonialIndex = (testimonialIndex - 1 + testimonials.length) % testimonials.length;
    showTestimonial(testimonialIndex);
  });
  nextBtn.addEventListener('click', () => {
    testimonialIndex = (testimonialIndex + 1) % testimonials.length;
    showTestimonial(testimonialIndex);
  });
}

document.addEventListener('mousemove', function(e) {
  const elements = document.querySelectorAll('.tilt');
  elements.forEach(element => {
    const rect = element.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const deltaX = (x - centerX) / centerX;
    const deltaY = (y - centerY) / centerY;
    const rotateX = deltaY * 10;
    const rotateY = deltaX * -10;
    element.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  });
}); 