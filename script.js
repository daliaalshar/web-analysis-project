/* ============================================
   King Fahad National Library — script.js
   ============================================ */

document.addEventListener('DOMContentLoaded', function () {

  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const isRegisterPage = currentPage === 'register.html';

  /* ── Register Page Logic ── */
  if (isRegisterPage) {

    // إذا مسجّل مسبقاً روح للموقع مباشرة
    if (localStorage.getItem('isRegistered') === 'true') {
      window.location.replace('index.html');
      return;
    }

    const form       = document.getElementById('registerForm');
    const messageBox = document.getElementById('messageBox');
    const submitBtn  = document.getElementById('submitBtn');

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      const name    = document.getElementById('name').value.trim();
      const email   = document.getElementById('email').value.trim();
      const address = document.getElementById('address').value.trim();
      const phone   = document.getElementById('phone').value.trim();

      if (!name || name.length < 3) {
        showMsg(messageBox, 'Please enter your full name (at least 3 characters).', 'error'); return;
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        showMsg(messageBox, 'Please enter a valid email address.', 'error'); return;
      }
      if (!address || address.length < 2) {
        showMsg(messageBox, 'Please enter your address.', 'error'); return;
      }
      if (!/^(05\d{8}|(\+?966)(5\d{8}))$/.test(phone.replace(/\s/g, ''))) {
        showMsg(messageBox, 'Please enter a valid Saudi phone number (e.g. 05xxxxxxxx).', 'error'); return;
      }

      // حفظ التسجيل
      localStorage.setItem('isRegistered', 'true');
      localStorage.setItem('userName', name);
      localStorage.setItem('userEmail', email);

      showMsg(messageBox, '✓ Welcome, ' + name + '! Taking you to the library...', 'success');
      submitBtn.disabled = true;
      submitBtn.textContent = 'Redirecting...';

      setTimeout(function () {
        window.location.href = 'index.html';
      }, 1800);
    });

    return; // توقف هنا، ما تكمل باقي الكود
  }

  /* ── Page Protection (باقي الصفحات) ── */
  if (localStorage.getItem('isRegistered') !== 'true') {
    window.location.href = 'register.html';
    return;
  }

  /* ── Active Nav Link ── */
  document.querySelectorAll('nav a').forEach(link => {
    if (link.getAttribute('href') === currentPage) {
      link.style.color = 'var(--gold-light, #e8c97a)';
      link.style.borderBottom = '2px solid var(--gold, #c9a84c)';
      link.style.paddingBottom = '10px';
    }
  });

  /* ── Welcome Message on index.html ── */
  if (currentPage === 'index.html' || currentPage === '') {
    const userName = localStorage.getItem('userName');
    if (userName) {
      const titleCenter = document.querySelector('.title-center');
      if (titleCenter) {
        const welcome = document.createElement('p');
        welcome.textContent = 'Welcome, ' + userName;
        welcome.style.cssText = 'font-size:0.8rem; color:rgba(232,201,122,0.7); margin-top:4px; letter-spacing:0.5px;';
        titleCenter.appendChild(welcome);
      }
    }
  }

  /* ── Logout Button ── */
  const nav = document.querySelector('nav b');
  if (nav) {
    const logoutBtn = document.createElement('a');
    logoutBtn.href = '#';
    logoutBtn.textContent = 'Logout';
    logoutBtn.style.cssText = 'color:rgba(239,154,154,0.8); margin-left:4px;';
    logoutBtn.addEventListener('click', function (e) {
      e.preventDefault();
      logOut();
    });
    nav.appendChild(logoutBtn);
  }

  /* ── Scroll Reveal ── */
  const mainEl = document.querySelector('main');
  if (mainEl) {
    Array.from(mainEl.children).forEach(function (el, i) {
      el.style.opacity = '0';
      el.style.transform = 'translateY(16px)';
      el.style.transition = 'opacity 0.45s ease, transform 0.45s ease';
      el.style.transitionDelay = (i * 60) + 'ms';
      setTimeout(function () {
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
      }, 80 + i * 60);
    });
  }

  /* ── Header Scroll Shadow ── */
  const header = document.querySelector('header');
  if (header) {
    window.addEventListener('scroll', function () {
      header.style.boxShadow = window.scrollY > 10
        ? '0 4px 20px rgba(13,27,42,0.35)'
        : '0 6px 24px rgba(13,27,42,0.15)';
    }, { passive: true });
  }

  /* ── Contact Form (index.html) ── */
  const form = document.getElementById('contactForm');
  const messageBox = document.getElementById('messageBox');

  if (form && messageBox) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      const name    = document.getElementById('name')?.value.trim();
      const email   = document.getElementById('email')?.value.trim();
      const address = document.getElementById('address')?.value.trim();
      const phone   = document.getElementById('phone')?.value.trim();

      if (!name || name.length < 3) {
        showMsg(messageBox, 'Please enter your full name (at least 3 characters).', 'error'); return;
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        showMsg(messageBox, 'Please enter a valid email address.', 'error'); return;
      }
      if (!address || address.length < 2) {
        showMsg(messageBox, 'Please enter your address.', 'error'); return;
      }
      if (!/^(05\d{8}|(\+?966)(5\d{8}))$/.test(phone.replace(/\s/g, ''))) {
        showMsg(messageBox, 'Please enter a valid Saudi phone number.', 'error'); return;
      }

      showMsg(messageBox, '✓ Form submitted successfully! Thank you, ' + name + '.', 'success');
      form.reset();
    });
  }

  /* ── Input Focus Animation ── */
  document.querySelectorAll('.form-group input').forEach(function (input) {
    const label = input.previousElementSibling;
    input.addEventListener('focus', function () { if (label) label.style.color = 'var(--gold, #c9a84c)'; });
    input.addEventListener('blur',  function () { if (label) label.style.color = ''; });
  });

  /* ── Back to Top ── */
  const backBtn = document.createElement('button');
  backBtn.innerHTML = '&#8679;';
  backBtn.setAttribute('aria-label', 'Back to top');
  backBtn.style.cssText = [
    'position:fixed; bottom:32px; right:32px;',
    'width:44px; height:44px; border-radius:50%;',
    'background:var(--navy,#0d1b2a); color:var(--gold-light,#e8c97a);',
    'border:2px solid var(--gold,#c9a84c); font-size:1.4rem; cursor:pointer;',
    'box-shadow:0 4px 14px rgba(13,27,42,0.25);',
    'opacity:0; pointer-events:none;',
    'transition:opacity 0.3s ease, transform 0.3s ease;',
    'z-index:999; display:flex; align-items:center; justify-content:center;'
  ].join('');
  document.body.appendChild(backBtn);

  window.addEventListener('scroll', function () {
    var show = window.scrollY > 300;
    backBtn.style.opacity = show ? '1' : '0';
    backBtn.style.pointerEvents = show ? 'auto' : 'none';
  }, { passive: true });

  backBtn.addEventListener('click', function () { window.scrollTo({ top: 0, behavior: 'smooth' }); });
  backBtn.addEventListener('mouseenter', function () {
    backBtn.style.transform = 'translateY(-3px)';
    backBtn.style.background = 'var(--gold,#c9a84c)';
    backBtn.style.color = 'var(--navy,#0d1b2a)';
  });
  backBtn.addEventListener('mouseleave', function () {
    backBtn.style.transform = 'translateY(0)';
    backBtn.style.background = 'var(--navy,#0d1b2a)';
    backBtn.style.color = 'var(--gold-light,#e8c97a)';
  });

});

/* ── Helper: Show Message ── */
function showMsg(box, text, type) {
  box.textContent = text;
  box.className = type;
  box.style.display = 'block';
  if (type === 'error') {
    setTimeout(function () { box.style.display = 'none'; box.className = ''; }, 5000);
  }
}

document.getElementById('quickContact').addEventListener('submit', function(e) {
  e.preventDefault();
  var name = document.getElementById('cName').value.trim();
  var msg  = document.getElementById('cMsg').value.trim();
  var box  = document.getElementById('contactMsg');
  if (!name || !msg) {
    box.textContent = 'Please fill in all fields.';
    box.className = 'error';
    box.style.display = 'block';
    return;
  }
  box.textContent = '✓ Thank you, ' + name + '! Your message has been sent.';
  box.className = 'success';
  box.style.display = 'block';
  this.reset();
});

/* ── Accordion ── */
function toggleAcc(btn) {
  var item = btn.parentElement;
  var isOpen = item.classList.contains('active');
  document.querySelectorAll('.acc-item').forEach(function(i) { i.classList.remove('active'); i.querySelector('.acc-btn span').textContent = '+'; });
  if (!isOpen) { item.classList.add('active'); btn.querySelector('span').textContent = '−'; }
}

/* ── Logout ── */
function logOut() {
  localStorage.removeItem('isRegistered');
  localStorage.removeItem('userName');
  localStorage.removeItem('userEmail');
  window.location.href = 'register.html';
}

