/* ============================================================
   COMPONENTS.JS — Erin Mahon Portfolio
   Injects shared nav and footer into every page.
   To update nav or footer: edit THIS FILE only.
   ============================================================ */

(function () {

  /* ----------------------------------------------------------
     Detect path depth so links resolve correctly from any page.
     Root pages (index.html, work.html, etc.) → prefix = ""
     Case study pages (case-studies/*.html)   → prefix = "../"
  ---------------------------------------------------------- */
  const depth = window.location.pathname.split('/').filter(Boolean);
  // If the last folder segment is "case-studies" we're one level deep
  const prefix = depth.includes('case-studies') ? '../' : '';

  // Absolute base for assets (works from any page depth)
  const assetBase = '/erinmahonportfolio/assets/';

  /* ----------------------------------------------------------
     Determine active nav link based on current page
  ---------------------------------------------------------- */
  const path = window.location.pathname;
  function isActive(href) {
    if (href === 'index.html') return path.endsWith('/') || path.endsWith('index.html');
    return path.includes(href.replace('../', ''));
  }
  function navLink(href, label) {
    const active = isActive(href) ? ' nav__link--active' : '';
    return `<li><a href="${prefix}${href}" class="nav__link${active}">${label}</a></li>`;
  }

  /* ----------------------------------------------------------
     NAV HTML
  ---------------------------------------------------------- */
  const navHTML = `
<nav class="nav" role="navigation" aria-label="Main navigation">
  <div class="nav__inner page-wrapper">
    <a href="${prefix}index.html" class="nav__logo" aria-label="Erin Mahon home">
      <img
        src="${assetBase}logo.svg"
        alt="EM icon mark"
        class="nav__logo-img"
      />
      <span class="nav__logo-name">Erin Mahon</span>
    </a>
    <button class="nav__toggle" aria-label="Toggle menu" aria-expanded="false">
      <span></span><span></span><span></span>
    </button>
    <ul class="nav__links" role="list">
      ${navLink('index.html',   'Home')}
      ${navLink('work.html',    'Projects')}
      ${navLink('about.html',   'About')}
      ${navLink('process.html', 'Process')}
      ${navLink('contact.html', 'Contact')}
    </ul>
  </div>
</nav>`;

  /* ----------------------------------------------------------
     FOOTER HTML
  ---------------------------------------------------------- */
  const footerHTML = `
<footer class="footer">
  <div class="footer__inner">

    <!-- Brand -->
    <div class="footer__brand">
      <a href="${prefix}index.html" class="footer__logo">
        <img src="${assetBase}logo-footer.svg" alt="EM icon mark" class="footer__logo-img" />
        <span class="footer__logo-name">Erin Mahon</span>
      </a>
      <p class="footer__tagline">Product Designer</p>
    </div>

    <!-- Navigate -->
    <div>
      <p class="footer__col-label">Navigate</p>
      <nav class="footer__nav" aria-label="Footer navigation">
        <a href="${prefix}index.html"   class="footer__link">Home</a>
        <a href="${prefix}work.html"    class="footer__link">Projects</a>
        <a href="${prefix}about.html"   class="footer__link">About</a>
        <a href="${prefix}process.html" class="footer__link">Process</a>
        <a href="${prefix}contact.html" class="footer__link">Contact</a>
      </nav>
    </div>

    <!-- Location -->
    <div>
      <p class="footer__col-label">Location</p>
      <div class="footer__text">
        <span>Charleston, SC</span>
      </div>
    </div>

    <!-- Contact -->
    <div>
      <p class="footer__col-label">Contact</p>
      <div class="footer__text">
        <a href="mailto:emahonux@gmail.com" class="footer__link">emahonux@gmail.com</a>
        <span>(203) 482-0166</span>
        <a href="https://substack.com/@erinmahon1" target="_blank" rel="noopener" class="footer__link footer__link--external">Substack <i class="ph ph-arrow-square-out" aria-hidden="true"></i></a>
        <a href="https://drive.google.com/file/d/114j7N9Djo3wzvWJrzw8mImS6576LUo3C/view?usp=sharing" target="_blank" rel="noopener" class="footer__link footer__link--external">Résumé <i class="ph ph-arrow-square-out" aria-hidden="true"></i></a>
      </div>
    </div>

  </div>

  <!-- Copyright bar — full width below the 4-col grid -->
  <div class="footer__bottom">
    <p class="footer__copy">© 2025 Erin Mahon. All rights reserved.</p>
    <p class="footer__bottom-right">Product Designer · Charleston, SC</p>
  </div>
</footer>`;

  /* ----------------------------------------------------------
     INJECT — insert nav before <main> or as first child of body,
     append footer as last child of body.
  ---------------------------------------------------------- */
  // Nav
  const navTarget = document.createElement('div');
  navTarget.innerHTML = navHTML;
  document.body.insertBefore(navTarget.firstElementChild, document.body.firstElementChild);

  // Footer
  const footerTarget = document.createElement('div');
  footerTarget.innerHTML = footerHTML;
  document.body.appendChild(footerTarget.firstElementChild);

  /* ----------------------------------------------------------
     MOBILE TOGGLE — one place, works everywhere
  ---------------------------------------------------------- */
  const toggle = document.querySelector('.nav__toggle');
  const links  = document.querySelector('.nav__links');
  if (toggle && links) {
    toggle.addEventListener('click', () => {
      const open = links.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', String(open));
    });
    // Close menu on nav link click (mobile)
    links.querySelectorAll('.nav__link').forEach(link => {
      link.addEventListener('click', () => {
        links.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

})();
