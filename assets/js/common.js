/* 心动小镇攻略手账 · 全站公共脚本 v0.4 */
const $ = s => document.querySelector(s);
const $$ = s => [...document.querySelectorAll(s)];
const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

function ensureToast(){
  let t = $('#toast');
  if(!t){
    t = document.createElement('div');
    t.className = 'toast';
    t.id = 'toast';
    t.textContent = '已复制到剪贴板 ✓';
    document.body.appendChild(t);
  }
  return t;
}

async function copyText(text, msg){
  try{
    await navigator.clipboard.writeText(text);
  }catch(err){
    const ta = document.createElement('textarea');
    ta.value = text;
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    ta.remove();
  }
  const t = ensureToast();
  if(msg) t.textContent = msg;
  t.classList.add('show');
  setTimeout(()=>t.classList.remove('show'), 1800);
}

/* 导航当前页高亮 */
(function(){
  const page = document.body.dataset.page;
  if(!page) return;
  $$('.nav-links a').forEach(a => a.classList.toggle('active', a.dataset.page === page));
})();

/* 滚动入场动画 */
(function(){
  const io = new IntersectionObserver(entries=>{
    entries.forEach(en=>{
      if(en.isIntersecting){
        en.target.classList.add('in');
        io.unobserve(en.target);
      }
    });
  },{threshold:.08});
  $$('.reveal').forEach(el=>io.observe(el));
})();
