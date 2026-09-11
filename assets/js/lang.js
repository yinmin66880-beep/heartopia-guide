/* 心动小镇攻略手账 · 语言切换器 v1.0
 * 在所有页面的导航栏渲染语言菜单；页面按目录区分语言：
 *   zh = 站点根目录，en/ja/ko = /en/ 等子目录（同一页面文件名）
 * 新增语言：在 LOCALES 里登记一条即可，无需改任何页面。
 */
(function () {
  const LOCALES = [
    { code: 'zh', label: '简体中文', short: '中' },
    { code: 'en', label: 'English', short: 'EN' },
    { code: 'ja', label: '日本語', short: 'JA' },
    { code: 'ko', label: '한국어', short: 'KO' }
  ];

  const navInner = document.querySelector('.nav-inner');
  if (!navInner || LOCALES.length < 2) return;

  const htmlLang = (document.documentElement.lang || 'zh').toLowerCase();
  const cur = LOCALES.some(l => l.code === htmlLang.slice(0, 2))
    ? htmlLang.slice(0, 2)
    : (htmlLang.startsWith('zh') ? 'zh' : 'en');

  // 当前页面文件名（zh 页在根目录，其他语言页在子目录，文件名一致）
  const file = (location.pathname.split('/').pop() || 'index.html');
  const inSub = /^\/(en|ja|ko)(\/|$)/i.test(location.pathname);
  const query = location.search || '';

  function targetUrl(code) {
    if (code === cur) return null;
    if (code === 'zh') {
      return (inSub ? '../' : '') + file + query;
    }
    return (inSub ? '../' : '') + code + '/' + file + query;
  }

  const wrap = document.createElement('div');
  wrap.className = 'lang-switch';
  wrap.id = 'langSwitch';

  const curLoc = LOCALES.find(l => l.code === cur) || LOCALES[0];
  const btn = document.createElement('button');
  btn.className = 'lang-btn';
  btn.type = 'button';
  btn.setAttribute('aria-haspopup', 'true');
  btn.setAttribute('aria-expanded', 'false');
  btn.title = 'Language / 语言';
  btn.innerHTML = '<span class="globe">🌐</span><span class="cur">' + curLoc.short + '</span>';

  const menu = document.createElement('div');
  menu.className = 'lang-menu';
  LOCALES.forEach(l => {
    const a = document.createElement('a');
    a.href = targetUrl(l.code) || location.href;
    a.hreflang = l.code === 'zh' ? 'zh-CN' : l.code;
    a.textContent = l.label;
    if (l.code === cur) a.className = 'on';
    menu.appendChild(a);
  });

  wrap.appendChild(btn);
  wrap.appendChild(menu);
  navInner.appendChild(wrap);

  btn.addEventListener('click', e => {
    e.stopPropagation();
    const open = wrap.classList.toggle('open');
    btn.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
  document.addEventListener('click', () => {
    wrap.classList.remove('open');
    btn.setAttribute('aria-expanded', 'false');
  });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') wrap.classList.remove('open');
  });
})();
