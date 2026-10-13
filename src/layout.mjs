import { escapeHtml, icon } from './ui.mjs';

function navigation(file, suffix = '') {
  const current = (name) => file === name ? ' aria-current="page"' : '';
  const sellerCurrent = ['seller.html', 'advantages.html'].includes(file) ? ' active-parent' : '';
  return `<ul class="nav-list">
    <li><a href="index.html"${current('index.html')}>Басты бет</a></li>
    <li class="nav-parent${sellerCurrent}"><a href="seller.html"${current('seller.html')}>Сатушыға <span class="nav-chevron" aria-hidden="true">⌄</span></a>
      <ul class="dropdown" aria-label="Сатушыға арналған бөлімдер${suffix}">
        <li><a href="seller.html#advantages">Артықшылықтар ${icon('arrow')}</a></li>
        <li><a href="advantages.html#paid-services"${current('advantages.html')}>Ақылы қызметтер ${icon('arrow')}</a></li>
        <li><a href="seller.html#faq">Сұрақ-жауап ${icon('arrow')}</a></li>
      </ul>
    </li>
    <li class="nav-parent"><a href="buyer.html"${current('buyer.html')}>Сатып алушыға <span class="nav-chevron" aria-hidden="true">⌄</span></a>
      <ul class="dropdown" aria-label="Сатып алушыға арналған бөлімдер${suffix}">
        <li><a href="buyer.html#advantages">Артықшылықтар ${icon('arrow')}</a></li>
        <li><a href="buyer.html#faq">Сұрақ-жауап ${icon('arrow')}</a></li>
      </ul>
    </li>
  </ul>`;
}
export function layout(page, config) {
  const absolute = (file) => `${config.baseUrl.replace(/\/$/, '')}/${file}`;
  const title = `${page.title} — Ainalym`;
  return `<!doctype html>
<html lang="kk">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${escapeHtml(title)}</title>
  <meta name="description" content="${escapeHtml(page.description)}">
  <meta name="theme-color" content="#f7f3ea">
  <meta name="robots" content="index,follow">
  <link rel="canonical" href="${absolute(page.file)}">
  <meta property="og:type" content="website">
  <meta property="og:locale" content="kk_KZ">
  <meta property="og:site_name" content="Ainalym">
  <meta property="og:title" content="${escapeHtml(title)}">
  <meta property="og:description" content="${escapeHtml(page.description)}">
  <meta property="og:url" content="${absolute(page.file)}">
  <meta property="og:image" content="${absolute('media-files/og.png')}">
  <meta property="og:image:alt" content="Ainalym — заттарға жаңа өмір">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta name="twitter:card" content="summary_large_image">
  <link rel="icon" type="image/svg+xml" href="media-files/favicon.svg">
  <link rel="stylesheet" href="assets/styles.css">
  <script src="assets/config.js" defer></script>
  <script src="assets/app.js" defer></script>
</head>
<body>
  <a class="skip-link" href="#main">Негізгі мазмұнға өту</a>
  <header class="site-header">
    <div class="container header-inner">
      <a class="brand" href="index.html" aria-label="Ainalym — басты бет"><span class="brand-symbol">${icon('loop')}</span><span>Ainalym<span class="brand-dot">.</span></span></a>
      <nav class="desktop-nav" aria-label="Негізгі навигация">${navigation(page.file)}</nav>
      <div class="header-actions"><a class="button button-small" data-action="view" data-type="secondary" href="${escapeHtml(config.links.view)}">Қарау</a><a class="button button-small" data-action="publish" data-type="primary" href="${escapeHtml(config.links.publish)}">Жариялау <span aria-hidden="true">↗</span></a></div>
      <details class="mobile-navigation"><summary aria-label="Навигация мәзірі"><span></span><span></span><span></span></summary><nav aria-label="Мобильді навигация">${navigation(page.file, ' (мобильді)')}<a class="mobile-contact" href="contacts.html">Байланыс</a></nav></details>
    </div>
  </header>
  <main id="main">${page.body}</main>
  <footer class="site-footer">
    <div class="container footer-top">
      <div class="footer-brand"><a class="brand" href="index.html"><span class="brand-symbol">${icon('loop')}</span><span>Ainalym<span class="brand-dot">.</span></span></a><p>Біреуге артық.<br>Біреуге қажет.</p><span class="footer-caption">Заттардың әңгімесі жалғассын.</span></div>
      <nav aria-label="Сатушыға футер навигациясы"><h2>Сатушыға</h2><a href="seller.html">Қалай жариялаймын?</a><a href="seller.html#advantages">Артықшылықтар</a><a href="advantages.html">Ақылы қызметтер</a><a href="seller.html#faq">Сұрақ-жауап</a></nav>
      <nav aria-label="Сатып алушыға футер навигациясы"><h2>Сатып алушыға</h2><a href="buyer.html">Қалай сатып аламын?</a><a href="buyer.html#advantages">Артықшылықтар</a><a href="buyer.html#faq">Сұрақ-жауап</a></nav>
      <nav aria-label="Жоба туралы футер навигациясы"><h2>Ainalym туралы</h2><a href="index.html#about">Біздің идеямыз</a><a href="contacts.html">Байланыс</a><a href="policy.html">Құпиялылық саясаты</a><a href="index.html">Басты бет</a></nav>
    </div>
    <div class="container footer-bottom"><span>© 2026 Ainalym. Оқу жобасы.</span><span>Аз тұтыну. Көп мүмкіндік. ${icon('heart')}</span><a href="#main">Жоғарыға ↑</a></div>
  </footer>
</body>
</html>`;
}
