(function () {
  'use strict';

  var PRODUCTS = [
    {
      id: 'lominii',
      name: 'Lominii Search',
      logoHtml: '<i class="fa-solid fa-magnifying-glass"></i>',
      logoClass: 'product-logo--cyan',
      tagline: 'Privacy-first search for the community',
      url: 'https://lominii-search-beta.onrender.com'
    },
    {
      id: 'himate',
      name: 'Himate Messenger',
      logoHtml: '<i class="fa-solid fa-globe"></i>',
      logoClass: 'product-logo--cyan',
      tagline: 'Connection without extraction',
      url: 'https://hi-mate-messenger-apiv1-0-0-1frontr.onrender.com'
    },
    {
      id: 'accodite',
      name: 'Accodite',
      logoHtml: '<i class="fa-solid fa-brain"></i>',
      logoClass: 'product-logo--cyan',
      tagline: 'Collaborative AI workspace with team rooms and in-browser codespace',
      url: 'https://accodite1.onrender.com'
    },
    {
      id: 'shopnearme',
      name: 'Shop Near Me',
      logoHtml: '<span class="pin-wrap"><i class="fa-solid fa-location-pin"></i><i class="fa-solid fa-circle"></i></span><span class="three-dots"><span></span><span></span><span></span></span>',
      logoClass: 'product-logo--shop',
      tagline: 'Local commerce, real opportunity',
      url: 'https://shop-near-me-apiv1-0-0-1b.onrender.com'
    },
    {
      id: 'reccord',
      name: 'Reccord DB',
      logoHtml: '<i class="fa-solid fa-book-open"></i>',
      logoClass: 'product-logo--cyan',
      tagline: 'The data backbone for community-scale applications',
      url: 'https://reccord-db-apiv1-0-0-1q.onrender.com'
    }
  ];

  function renderProducts() {
    var grid = document.getElementById('productGrid');
    if (!grid) return;
    grid.innerHTML = PRODUCTS.map(function (p) {
      return '' +
        '<a class="product-card" href="' + p.url + '" target="_blank" rel="noopener noreferrer">' +
          '<div class="product-logo ' + p.logoClass + '">' + p.logoHtml + '</div>' +
          '<div class="product-body">' +
            '<div class="product-header">' +
              '<h3>' + p.name + '</h3>' +
              '<span class="badge">LIVE</span>' +
            '</div>' +
            '<p class="product-tagline">' + p.tagline + '</p>' +
            '<span class="product-visit">Visit \u2192</span>' +
          '</div>' +
        '</a>';
    }).join('');
  }

  function initStickyHeader() {
    var header = document.getElementById('siteHeader');
    if (!header) return;
    function onScroll() {
      if (window.scrollY > 40) header.classList.add('scrolled');
      else header.classList.remove('scrolled');
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(function (link) {
      link.addEventListener('click', function (e) {
        var id = link.getAttribute('href');
        if (!id || id === '#') return;
        var target = document.querySelector(id);
        if (!target) return;
        e.preventDefault();
        var top = target.getBoundingClientRect().top + window.scrollY - 80;
        window.scrollTo({ top: top, behavior: 'smooth' });
        var nav = document.getElementById('navLinks');
        if (nav) nav.classList.remove('open');
      });
    });
  }

  function initActiveNav() {
    var sections = ['home', 'founder', 'products', 'mission', 'contact'];
    var links = {};
    sections.forEach(function (id) {
      var link = document.querySelector('.nav-link[href="#' + id + '"]');
      if (link) links[id] = link;
    });
    function update() {
      var scrollPos = window.scrollY + 120;
      var current = 'home';
      sections.forEach(function (id) {
        var el = document.getElementById(id);
        if (el && el.offsetTop <= scrollPos) current = id;
      });
      Object.keys(links).forEach(function (id) {
        if (id === current) links[id].classList.add('active');
        else links[id].classList.remove('active');
      });
    }
    window.addEventListener('scroll', update, { passive: true });
    update();
  }

  function initMobileMenu() {
    var btn = document.getElementById('hamburger');
    var nav = document.getElementById('navLinks');
    if (!btn || !nav) return;
    btn.addEventListener('click', function () {
      nav.classList.toggle('open');
    });
  }

  function initReveal() {
    var els = document.querySelectorAll('.reveal');
    if (!('IntersectionObserver' in window)) {
      els.forEach(function (el) { el.classList.add('visible'); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    els.forEach(function (el) { io.observe(el); });
  }

  function showToast(msg) {
    var toast = document.getElementById('toast');
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.add('show');
    clearTimeout(showToast._t);
    showToast._t = setTimeout(function () {
      toast.classList.remove('show');
    }, 2200);
  }

  function initCopyEmail() {
    var btn = document.getElementById('copyEmail');
    if (!btn) return;
    btn.addEventListener('click', function () {
      var email = 'idrisdfirst@gmail.com';
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(email).then(function () {
          showToast('Email copied');
        }).catch(function () {
          fallbackCopy(email);
        });
      } else {
        fallbackCopy(email);
      }
    });
    function fallbackCopy(text) {
      var ta = document.createElement('textarea');
      ta.value = text;
      ta.setAttribute('readonly', '');
      ta.style.position = 'absolute';
      ta.style.left = '-9999px';
      document.body.appendChild(ta);
      ta.select();
      try {
        document.execCommand('copy');
        showToast('Email copied');
      } catch (e) {
        showToast('Copy failed');
      }
      document.body.removeChild(ta);
    }
  }

  function initYear() {
    var y = document.getElementById('year');
    if (y) y.textContent = String(new Date().getFullYear());
  }

  document.addEventListener('DOMContentLoaded', function () {
    renderProducts();
    initStickyHeader();
    initSmoothScroll();
    initActiveNav();
    initMobileMenu();
    initReveal();
    initCopyEmail();
    initYear();
  });
})();