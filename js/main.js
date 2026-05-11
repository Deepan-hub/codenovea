// === Mobile Nav ===
const hamburger = document.getElementById('hamburger');
const nav = document.getElementById('nav');

if (hamburger && nav) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    nav.classList.toggle('open');
    document.body.style.overflow = nav.classList.contains('open') ? 'hidden' : '';
  });
}

document.querySelectorAll('.nav a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    nav.classList.remove('open');
    document.body.style.overflow = '';
  });
});

// === Scroll Progress Bar ===
const scrollProgress = document.getElementById('scrollProgress');
window.addEventListener('scroll', () => {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
  if (scrollProgress) scrollProgress.style.width = progress + '%';
});

// === Back to Top ===
const backToTop = document.getElementById('backToTop');
if (backToTop) {
  window.addEventListener('scroll', () => {
    backToTop.classList.toggle('visible', window.scrollY > 500);
  });
  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// === Active Nav Link on Scroll ===
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav a');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const top = section.offsetTop - 120;
    if (window.scrollY >= top) current = section.getAttribute('id');
  });
  navLinks.forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === '#' + current);
  });
});

// === Scroll Reveal Animation ===
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      if (entry.target.classList.contains('reveal-stagger')) {
        const children = entry.target.children;
        [...children].forEach((child, i) => {
          setTimeout(() => child.classList.add('visible'), i * 80);
        });
      }
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale, .reveal-stagger').forEach(el => {
  revealObserver.observe(el);
});

// === Contact Form (Web3Forms) ===
const form = document.getElementById('contactForm');
if (form) {
  form.addEventListener('submit', e => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    const original = btn.textContent;
    btn.textContent = 'Sending...';
    btn.disabled = true;

    const data = new FormData(form);

    fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      body: data
    })
    .then(res => res.json())
    .then(res => {
      if (res.success) {
        showToast('Thank you! Your message was sent successfully. I will get back to you soon.');
        form.reset();
      } else {
        showToast('Something went wrong. Please email me directly at supportcodenova@gmail.com');
      }
    })
    .catch(() => {
      showToast('Something went wrong. Please email me directly at supportcodenova@gmail.com');
    })
    .finally(() => {
      btn.textContent = original;
      btn.disabled = false;
    });
  });
}

function showToast(msg) {
  const existing = document.querySelector('.toast');
  if (existing) existing.remove();
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = msg;
  document.body.appendChild(toast);
  requestAnimationFrame(() => toast.classList.add('show'));
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 400);
  }, 5000);
}

// === Modal ===
const projects = {
  thumbforge: {
    title: 'AI Thumbnail Generator Web App using React',
    desc: 'Built a web application that generates AI-powered thumbnails. Features a clean modern UI with responsive design. Built using React and JavaScript with API integration.',
    price: '$80 - $150',
    duration: '1-7 days',
    industry: 'Technology',
    category: 'Website Development',
    url: 'https://aithumbforge.netlify.app/',
    images: ['1_Home_page.png', '3_Generate_Page.png', '7_Pricing_Page.png']
  },
  portfolio: {
    title: 'Responsive Developer Portfolio Website using React',
    desc: 'Built a fully responsive personal portfolio website with modern dark theme, smooth animations and contact form using React and CSS.',
    price: '$80 - $150',
    duration: '1-2 days',
    industry: 'Technology',
    category: 'Website Development',
    url: 'https://codenovea.netlify.app/',
    images: ['portfolio-home.png', 'portfilo.png', 'service.png', 'About.png', 'contact.png']
  },
  royalfoods: {
    title: 'Royal Foods – Luxury Restaurant Website',
    desc: 'Built a premium restaurant website featuring interactive menu with category filters, table reservation system, chef profiles, customer testimonials, photo gallery and Google Maps integration.',
    price: '$200 - $500',
    duration: '1-2 weeks',
    industry: 'Food & Dining',
    category: 'Website Development',
    url: 'https://demoroyalfoods.netlify.app/',
    images: ['1.png', '2.png', '3.png', 'resever.png']
  }
};

function openModal(key) {
  const p = projects[key];
  if (!p) return;
  document.getElementById('modalTitle').textContent = p.title;
  document.getElementById('modalDesc').textContent = p.desc;
  document.getElementById('modalPrice').textContent = p.price;
  document.getElementById('modalDuration').textContent = p.duration;
  document.getElementById('modalIndustry').textContent = p.industry;
  const imgContainer = document.getElementById('modalImages');
  imgContainer.innerHTML = p.images.map(src => `<img src="${src}" alt="project screenshot" loading="lazy"/>`).join('');
  const viewBtn = document.getElementById('modalViewBtn');
  if (p.url) {
    viewBtn.href = p.url;
    viewBtn.style.display = 'flex';
  } else {
    viewBtn.style.display = 'none';
  }
  document.getElementById('modalOverlay').classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  document.getElementById('modalOverlay').classList.remove('active');
  document.body.style.overflow = '';
}

document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

// === Start a Project - Floating Labels ===
document.querySelectorAll('#projectForm .pf-field input, #projectForm .pf-field select, #projectForm .pf-field textarea').forEach(field => {
  const updateLabel = () => {
    if (field.value && field.value !== '') {
      field.setAttribute('data-filled', '');
    } else {
      field.removeAttribute('data-filled');
    }
  };
  field.addEventListener('input', updateLabel);
  field.addEventListener('change', updateLabel);
  updateLabel();
});

// === Start a Project - Form Submit ===
const projectForm = document.getElementById('projectForm');
const successEl = document.getElementById('projectFormSuccess');
const successMsg = document.getElementById('successMessage');

if (projectForm) {
  projectForm.addEventListener('submit', e => {
    e.preventDefault();
    const btn = projectForm.querySelector('.btn-project-submit');
    const original = btn.textContent;
    btn.textContent = 'Sending...';
    btn.disabled = true;

    const formData = new FormData(projectForm);
    const name = formData.get('Full Name') || 'there';

    fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      body: formData
    })
    .then(res => res.json())
    .then(res => {
      if (res.success) {
        successMsg.textContent = `Thanks ${name}! I'll be in touch within 1-3 hours.`;
        projectForm.style.display = 'none';
        successEl.classList.add('active');
      } else {
        showToast('Something went wrong. Please try again or email me at supportcodenova@gmail.com');
        btn.textContent = original;
        btn.disabled = false;
      }
    })
    .catch(() => {
      showToast('Something went wrong. Please try again or email me at supportcodenova@gmail.com');
      btn.textContent = original;
      btn.disabled = false;
    });
  });
}

// === Budget USD→INR Converter ===
(function(){
  var input = document.getElementById('pf-budget');
  var usdEl = document.getElementById('pf-conv-usd');
  var inrEl = document.getElementById('pf-conv-inr');
  if(!input || !usdEl || !inrEl) return;

  function formatUSD(n){
    return '$ ' + Number(n).toLocaleString('en-US',{maximumFractionDigits:0});
  }
  function formatINR(n){
    return '₹ ' + Number(n).toLocaleString('en-IN',{maximumFractionDigits:0});
  }

  function update(){
    var val = parseFloat(input.value);
    if(!val || val <= 0){
      usdEl.textContent = '$ USD: —';
      inrEl.textContent = '₹ INR: —';
      return;
    }
    var inr = Math.round(val * 83);
    usdEl.textContent = '$ USD: ' + formatUSD(val);
    inrEl.textContent = '₹ INR: ' + formatINR(inr);
  }

  input.addEventListener('input', update);
})();

// === Start a Project - Particle Animation ===
const canvas = document.getElementById('particleCanvas');
if (canvas) {
  const ctx = canvas.getContext('2d');
  let particles = [];
  let animId;

  function resizeCanvas() {
    const rect = canvas.parentElement.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;
  }

  class Particle {
    constructor() { this.reset() }
    reset() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = Math.random() * 2.5 + 0.5;
      this.speedX = (Math.random() - 0.5) * 0.3;
      this.speedY = (Math.random() - 0.5) * 0.3;
      this.opacity = Math.random() * 0.4 + 0.1;
    }
    update() {
      this.x += this.speedX;
      this.y += this.speedY;
      if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) {
        this.reset();
      }
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255,255,255,${this.opacity})`;
      ctx.fill();
    }
  }

  function initParticles() {
    const count = Math.min(40, Math.floor(canvas.width * canvas.height / 8000));
    particles = Array.from({ length: count }, () => new Particle());
  }

  function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => { p.update(); p.draw(); });
    animId = requestAnimationFrame(animateParticles);
  }

  const particleObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        resizeCanvas();
        initParticles();
        animateParticles();
      } else {
        cancelAnimationFrame(animId);
      }
    });
  }, { threshold: 0.1 });

  particleObserver.observe(canvas);

  window.addEventListener('resize', () => {
    if (canvas.parentElement.getBoundingClientRect().width !== canvas.width) {
      resizeCanvas();
      initParticles();
    }
  });
}

// === Portfolio: Slider + Modal ===
(function(){
  const DATA = [
    {key:'thumbforge',img:'1_Home_page.png',title:'AI Thumbnail Generator Web App using React',desc:'Built a web application that generates AI-powered thumbnails. Features a clean modern UI with responsive design. Built using React and JavaScript with API integration.',fullDesc:'Built a full-stack SaaS web application that generates professional YouTube thumbnails using AI. Features include AI-powered image generation, credit-based system, user authentication, saved generations history, and a clean dashboard UI. Built with React.js and JavaScript on the frontend with REST API integration.',tags:['React','JavaScript','API','CSS'],url:'https://thumbforgeai.netlify.app',images:['1_Home_page.png','3_Generate_Page.png','7_Pricing_Page.png']},
    {key:'royalfoods',img:'1.png',title:'Royal Foods – Luxury Restaurant Website',desc:'Built a premium restaurant website featuring interactive menu with category filters, table reservation system, chef profiles, customer testimonials, photo gallery and Google Maps integration.',fullDesc:'Built a premium luxury restaurant website for an Indian dining brand. Features interactive menu with category filters, table reservation system, chef profiles, customer testimonials with star ratings, photo gallery with lightbox, and Google Maps integration. Designed with elegant gold and dark theme.',tags:['HTML','CSS','JavaScript','Responsive'],url:'https://demoroyalfoods.netlify.app',images:['1.png','2.png','3.png','resever.png']},
    {key:'portfolio',img:'portfolio-home.png',title:'CodeNovea – Freelancer Portfolio Website',desc:'Built a fully responsive personal portfolio website with modern dark theme, smooth animations and contact form using React and CSS.',fullDesc:'Built a professional freelancer portfolio website with modern blue gradient design. Features include animated hero section, services showcase, skills display, project portfolio, client testimonials section, and a Start a Project form with Netlify Forms integration for direct client inquiries.',tags:['React','HTML5','CSS3','Responsive'],url:'https://codenovea.netlify.app',images:['portfolio-home.png','portfilo.png','service.png','About.png','contact.png']}
  ];

  /* ---- Mobile slider ---- */
  const sliderGrid = document.getElementById('portfolioGrid');
  const dotsEl = document.getElementById('portfolioDots');
  let sliderIndex = 0, touchStartX = 0, isSliderActive = false;

  function isMobile(){return window.innerWidth <= 768}

  function sliderGo(i){
    const cards = sliderGrid.querySelectorAll('.project-card');
    if(i < 0) i = 0;
    if(i >= cards.length) i = cards.length - 1;
    sliderIndex = i;
    cards[sliderIndex].scrollIntoView({behavior:'smooth',block:'nearest',inline:'start'});
    Array.from(dotsEl.children).forEach((d,j) => d.classList.toggle('active',j===sliderIndex));
  }

  function sliderInit(){
    const cards = sliderGrid.querySelectorAll('.project-card');
    if(!cards.length) return;
    const mobile = isMobile();
    if(mobile && !isSliderActive){
      sliderGrid.addEventListener('touchstart',function(e){touchStartX = e.changedTouches[0].screenX},{passive:true});
      sliderGrid.addEventListener('touchend',function(e){
        const diff = touchStartX - e.changedTouches[0].screenX;
        if(Math.abs(diff) > 40){
          diff > 0 && sliderIndex < cards.length - 1 ? sliderGo(sliderIndex + 1) : diff < 0 && sliderIndex > 0 && sliderGo(sliderIndex - 1);
        }
      },{passive:true});
      dotsEl.innerHTML = '';
      cards.forEach((_,i) => {
        const dot = document.createElement('button');
        dot.className = 'pf-dot' + (i===0?' active':'');
        dot.setAttribute('aria-label','Slide '+(i+1));
        dot.addEventListener('click',function(){sliderGo(i)});
        dotsEl.appendChild(dot);
      });
      dotsEl.style.display = 'flex';
      isSliderActive = true;
    } else if(!mobile && isSliderActive){
      isSliderActive = false;
      dotsEl.style.display = '';
      dotsEl.innerHTML = '';
    }
  }

  if(sliderGrid && dotsEl){
    sliderInit();
    let rt; window.addEventListener('resize',function(){clearTimeout(rt);rt=setTimeout(sliderInit,150)});
  }

  /* ---- Portfolio card clicks ---- */
  if(sliderGrid){
    sliderGrid.querySelectorAll('.project-card').forEach(function(card){
      card.addEventListener('click',function(){
        var key = this.getAttribute('data-key');
        if(key){
          openModal();
          showDetail(key);
        }
      });
    });
  }

  /* ---- Modal ---- */
  const overlay = document.getElementById('allProjectsOverlay');
  const grid = document.getElementById('allProjectsGrid');
  const detail = document.getElementById('allProjectsDetail');
  const closeBtn = document.getElementById('allProjectsClose');
  const trigger = document.getElementById('btnViewAll');
  const dBack = document.getElementById('detailBack');
  const dBackOutline = document.getElementById('detailBackOutline');
  const dImg = document.getElementById('detailImg');
  const dImages = document.getElementById('detailImages');
  const dTitle = document.getElementById('detailTitle');
  const dDesc = document.getElementById('detailDesc');
  const dTags = document.getElementById('detailTags');
  const dLive = document.getElementById('detailLiveBtn');

  function cardHTML(p, clickable){
    return '<div class="project-card' + (clickable ? '' : '') + '"' + (clickable ? ' data-key="' + p.key + '"' : '') + ' style="cursor:' + (clickable ? 'pointer' : 'default') + '">' +
      '<div class="project-card-img">' +
        '<img src="' + p.img + '" alt="' + p.title + '" loading="lazy" onerror="this.parentElement.style.background=\'linear-gradient(135deg,#1a1a2e,#16213e)\'; this.style.display=\'none\'"/>' +
        '<div class="project-card-img-placeholder"></div>' +
      '</div>' +
      '<div class="project-card-body">' +
        '<h3 class="project-card-title">' + p.title + '</h3>' +
        '<p class="project-card-desc">' + p.desc + '</p>' +
        '<div class="project-card-tags">' + p.tags.map(function(t){return '<span class="project-tag">' + t + '</span>'}).join('') + '</div>' +
      '</div>' +
    '</div>';
  }

  function openModal(){
    detail.style.display = '';
    detail.classList.remove('active');
    grid.style.display = '';
    grid.classList.remove('slide-out-left');
    grid.innerHTML = DATA.map(function(p){return cardHTML(p, true)}).join('');
    Array.from(grid.children).forEach(function(card){
      card.addEventListener('click',function(){
        var key = this.getAttribute('data-key');
        showDetail(key);
      });
    });
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function showDetail(key){
    var p = null;
    for(var i = 0; i < DATA.length; i++){if(DATA[i].key === key){p = DATA[i];break}}
    if(!p) return;
    var dImgWrap = document.querySelector('.detail-img-wrap');
    if(dImgWrap) dImgWrap.style.display = 'none';
    dImages.innerHTML = '<div class="detail-images-track" id="detailImagesTrack">' + p.images.map(function(s){return '<img src="' + s + '" alt="" loading="lazy" onerror="this.style.display=\'none\'"/>'}).join('') + '</div>' +
      '<button class="detail-images-btn detail-images-btn-prev" id="detailImgPrev"><i class="fas fa-chevron-left"></i></button>' +
      '<button class="detail-images-btn detail-images-btn-next" id="detailImgNext"><i class="fas fa-chevron-right"></i></button>';
    var track = document.getElementById('detailImagesTrack');
    var imgs = track.querySelectorAll('img');
    var idx = 0;
    function updateSlide(){
      track.style.transform = 'translateX(-' + (idx * 100) + '%)';
    }
    var prevBtn = document.getElementById('detailImgPrev');
    var nextBtn = document.getElementById('detailImgNext');
    if(prevBtn) prevBtn.addEventListener('click', function(){if(idx > 0){idx--;updateSlide()}});
    if(nextBtn) nextBtn.addEventListener('click', function(){if(idx < imgs.length - 1){idx++;updateSlide()}});
    dTitle.textContent = p.title;
    dDesc.textContent = p.fullDesc;
    dTags.innerHTML = p.tags.map(function(t){return '<span class="project-tag">' + t + '</span>'}).join('');
    dLive.href = p.url;
    grid.classList.add('slide-out-left');
    setTimeout(function(){
      grid.style.display = 'none';
      detail.classList.add('active');
    },250);
  }

  function showGrid(){
    detail.classList.remove('active');
    grid.style.display = '';
    grid.classList.remove('slide-out-left');
    var dw = document.querySelector('.detail-img-wrap');
    if(dw) dw.style.display = '';
  }

  function closeModal(){
    overlay.classList.remove('active');
    detail.classList.remove('active');
    grid.style.display = '';
    grid.classList.remove('slide-out-left');
    document.body.style.overflow = '';
  }

  if(trigger) trigger.addEventListener('click', openModal);
  if(closeBtn) closeBtn.addEventListener('click', closeModal);
  if(dBack) dBack.addEventListener('click', showGrid);
  if(dBackOutline) dBackOutline.addEventListener('click', showGrid);
  if(overlay) overlay.addEventListener('click', function(e){if(e.target === overlay) closeModal()});
  document.addEventListener('keydown', function(e){if(e.key === 'Escape' && overlay && overlay.classList.contains('active')) closeModal()});
})();
