/* Optional GA4 adapter. No network measurement without a configured property
 * and explicit opt-in. Event values are allowlisted; never send search text,
 * collection records, clock settings, arbitrary URL queries, or player IDs.
 * GA4's own cookie identifiers are used only after opt-in. */
(function () {
  'use strict';
  const config=window.HEARTOPIA_ANALYTICS_CONFIG || {}, id=config.measurementId;
  let enabled=false;
  const allowed=new Set(['planner_view','weather_to_fishing','planner_filter','collection_update','share_plan','guide_open','analytics_opt_in']);
  const labels={en:['Optional audience measurement','Allow Google Analytics usage measurement with cookies to improve these guides? Your fishing checklist stays on this device.','Allow','No thanks','Privacy'],ja:['利用状況の計測（任意）','攻略改善のためGoogle AnalyticsによるCookieを使用した計測を許可しますか？釣りリストは端末内に保存します。','許可する','許可しない','プライバシー'],zh:['可选访问统计','是否允许 Google Analytics 使用 Cookie 统计访问，以改进攻略？钓鱼清单仍保存在此设备上。','允许','暂不允许','隐私政策'],ko:['선택적 이용 통계','가이드 개선을 위해 Google Analytics의 쿠키 이용 측정을 허용할까요? 낚시 목록은 기기에만 저장합니다.','허용','허용 안 함','개인정보']};
  const lang=(document.documentElement.lang||'en').slice(0,2),t=labels[lang]||labels.en;
  const store={get(){try{return localStorage.getItem('heartopia-analytics-consent');}catch(_){return null;}},set(v){try{localStorage.setItem('heartopia-analytics-consent',v);}catch(_){}}};
  function start(){
    if(enabled || !/^G-[A-Z0-9]+$/.test(id || '') || navigator.globalPrivacyControl || navigator.doNotTrack==='1')return;
    enabled=true;window.dataLayer=window.dataLayer||[];window.gtag=window.gtag||function(){window.dataLayer.push(arguments);};
    window.gtag('js',new Date());
    const campaign={},query=new URLSearchParams(location.search);
    const permitted={utm_source:['x','reddit','discord','creator'],utm_medium:['social','community','referral'],utm_campaign:['weather_fishing_launch'],utm_content:['ja_weather','ja_fishing','en_weather','en_fishing','creator_feature']};
    for(const [key,values] of Object.entries(permitted)){const value=query.get(key);if(values.includes(value))campaign[key==='utm_campaign'?'campaign_name':key.replace('utm_','campaign_')]=value;}
    window.gtag('config',id,{send_page_view:false,allow_google_signals:false,allow_ad_personalization_signals:false,page_location:location.origin+location.pathname,page_referrer:document.referrer?new URL(document.referrer).origin:'',...campaign});
    window.gtag('event','page_view',{page_location:location.origin+location.pathname,page_title:document.title,page_referrer:document.referrer?new URL(document.referrer).origin:''});
    const script=document.createElement('script');script.async=true;script.src='https://www.googletagmanager.com/gtag/js?id='+id;document.head.appendChild(script);
  }
  window.HeartopiaMetrics={
    track(name,values){
      if(!allowed.has(name))return;
      const params={language:lang,page_path:location.pathname};
      if(values && ['weather','time','level','missing','unlocked','search'].includes(values.control))params.control=values.control;
      document.dispatchEvent(new CustomEvent('heartopia:metric',{detail:{name,params}}));
      if(enabled)window.gtag('event',name,params);
    },
    revoke(){store.set('denied');location.reload();},
    get enabled(){return enabled;}
  };
  document.addEventListener('click',event=>{
    const a=event.target.closest && event.target.closest('a[href]');if(!a)return;
    const target=new URL(a.href,location.href);
    if(document.body.dataset.page==='weather' && target.origin===location.origin && /\/fishing(?:\.html)?$/.test(target.pathname))window.HeartopiaMetrics.track('weather_to_fishing');
  });
  if(!/^G-[A-Z0-9]+$/.test(id || '') || navigator.globalPrivacyControl || navigator.doNotTrack==='1')return;
  if(store.get()==='granted'){start();return;}if(store.get()==='denied')return;
  const panel=document.createElement('section');panel.className='planner-consent';panel.setAttribute('aria-label',t[0]);
  const title=document.createElement('strong');title.textContent=t[0];const text=document.createElement('p');text.textContent=t[1];panel.append(title,text);
  for(const [label,choice] of [[t[2],'granted'],[t[3],'denied']]){const b=document.createElement('button');b.type='button';b.textContent=label;b.addEventListener('click',()=>{store.set(choice);panel.remove();if(choice==='granted'){start();window.HeartopiaMetrics.track('analytics_opt_in');}});panel.append(b);}
  const link=document.createElement('a');link.href=(['en','ja','ko'].includes(lang)?'/'+lang:'')+'/privacy';link.textContent=t[4];panel.append(link);document.body.append(panel);
})();
