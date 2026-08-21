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
  const assetBase = '/assets/';

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
        src="${assetBase}logo-footer.svg"
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
      </a>
      <p class="footer__logo-name">Erin Mahon</p>
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

/* ----------------------------------------------------------
   VIDEO EMBED
   Reusable across any case study. Drop a container anywhere
   in the page and it becomes a responsive, inline 16:9 player
   on load — no click required:

     <div class="video-embed"
          data-video-embed="https://www.loom.com/share/XXXX"
          data-video-title="Case Study — Walkthrough"></div>

   data-video-embed accepts a normal share link from Loom,
   YouTube, Vimeo, or Google Drive/Docs — it's normalized into
   an embeddable URL automatically.
---------------------------------------------------------- */
(function () {
  var style = document.createElement('style');
  style.textContent = [
    '.video-embed{position:relative;width:100%;aspect-ratio:16/9;background:var(--slate-500,#161616);border-radius:var(--radius-lg,22px);overflow:hidden;box-shadow:var(--shadow-lg,0 8px 16px rgba(0,0,0,.12),0 20px 40px rgba(0,0,0,.18));}',
    '.video-embed iframe{position:absolute;inset:0;width:100%;height:100%;border:0;}'
  ].join('');
  document.head.appendChild(style);

  // Turn a normal share link into an embeddable iframe URL.
  function toEmbedUrl(raw) {
    try {
      var url = new URL(raw);
      var host = url.hostname.replace(/^www\./, '');

      if (host === 'youtu.be') {
        return 'https://www.youtube.com/embed/' + url.pathname.slice(1);
      }
      if (host.indexOf('youtube.com') !== -1) {
        if (url.pathname === '/watch') {
          return 'https://www.youtube.com/embed/' + url.searchParams.get('v');
        }
        if (url.pathname.indexOf('/shorts/') === 0) {
          return 'https://www.youtube.com/embed/' + url.pathname.split('/shorts/')[1];
        }
        return raw; // already an /embed/ url or unrecognized youtube path
      }
      if (host === 'vimeo.com') {
        var id = url.pathname.split('/').filter(Boolean).pop();
        return 'https://player.vimeo.com/video/' + id;
      }
      if (host === 'docs.google.com' || host === 'drive.google.com') {
        // Matches both docs.google.com/videos/d/{ID}/... and drive.google.com/file/d/{ID}/...
        var match = url.pathname.match(/\/d\/([^/]+)/);
        if (match) return 'https://drive.google.com/file/d/' + match[1] + '/preview';
        return raw;
      }
      if (host.indexOf('loom.com') !== -1) {
        return raw.replace('/share/', '/embed/');
      }
      return raw;
    } catch (e) {
      return raw;
    }
  }

  document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.video-embed[data-video-embed]').forEach(function (host) {
      var iframe = document.createElement('iframe');
      iframe.src = toEmbedUrl(host.getAttribute('data-video-embed'));
      iframe.title = host.getAttribute('data-video-title') || 'Video walkthrough';
      iframe.loading = 'lazy';
      iframe.allow = 'autoplay; fullscreen; picture-in-picture';
      iframe.allowFullscreen = true;
      host.appendChild(iframe);
    });
  });
})();

/* ----------------------------------------------------------
   PAGE LOADER
   Only appears if the page takes longer than 350ms to load.
   Logo spins, then fades out once the page is ready.
---------------------------------------------------------- */
(function () {
  var THRESHOLD = 350;
  var shown = false;
  var ready = false;
  var loader = null;

  // Inject loader styles
  var style = document.createElement('style');
  style.textContent = [
    '@keyframes em-spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}',
    '.em-loader{position:fixed;inset:0;background:var(--cream-200,#f7efed);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:20px;z-index:9999;opacity:1;transition:opacity 0.5s ease,transform 0.5s cubic-bezier(0.22,1,0.36,1);}',
    '.em-loader.em-out{opacity:0;transform:scale(0.96);pointer-events:none;}',
    '.em-loader-ring{width:72px;height:72px;border-radius:50%;border:2px solid transparent;border-top-color:var(--rose-400,#d4919c);border-right-color:var(--rose-200,#f0cdd2);animation:em-spin 1s linear infinite;position:absolute;}',
    '.em-loader-wrap{width:72px;height:72px;position:relative;display:flex;align-items:center;justify-content:center;}',
    '.em-loader-logo{width:42px;height:42px;object-fit:contain;}',
    '.em-loader-name{font-family:var(--font-ui,"DM Mono",monospace);font-size:11px;letter-spacing:0.14em;text-transform:uppercase;color:var(--slate-200,#9191a0);}'
  ].join('');
  document.head.appendChild(style);

  // Build loader element
  function buildLoader() {
    loader = document.createElement('div');
    loader.className = 'em-loader';
    loader.setAttribute('aria-hidden', 'true');
    loader.innerHTML =
      '<div class="em-loader-wrap">' +
        '<div class="em-loader-ring"></div>' +
        '<img class="em-loader-logo" src="/assets/logoloader.svg" alt="" />' +
      '</div>' +
      '<span class="em-loader-name">Worth the wait.</span>';
    document.body.appendChild(loader);
    shown = true;
  }

  function dismiss() {
    if (!shown || !loader) return;
    loader.classList.add('em-out');
    setTimeout(function () {
      if (loader && loader.parentNode) loader.parentNode.removeChild(loader);
    }, 520);
  }

  // Only show loader if page hasn't finished within threshold
  var threshold = setTimeout(function () {
    if (!ready) buildLoader();
  }, THRESHOLD);

  window.addEventListener('load', function () {
    ready = true;
    clearTimeout(threshold);
    if (shown) {
      // Give it a beat so it doesn't flash instantly
      setTimeout(dismiss, 400);
    }
  });
})();
