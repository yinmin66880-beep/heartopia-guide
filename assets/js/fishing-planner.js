(function () {
  'use strict';
  const core=window.HeartopiaPlanner, data=window.HEARTOPIA_FISH || [];
  if(!core || !document.querySelector('#catchPlanner'))return;
  const lang=(document.documentElement.lang||'en').slice(0,2),locale=['en','ja','ko'].includes(lang)?lang:'zh';
  const labels={
    en:{periods:['Morning','Afternoon','Evening','Night','All day'],weather:['Sunny','Rainy','Rainbow','Snowy'],unknown:'Choose observed weather',unconfirmed:'Forecast not confirmed for this time. Choose the weather shown in-game.',forecast:'Calendar-based suggestion; confirm current weather in-game.',manual:'Using your observed weather.',source:'Calendar source UTC+8',custom:'My server clock',clock:'Server clock',device:'Your local clock',count:'catalog matches',empty:'No catalog entries match these filters. Try another condition or clear your search. This is a partial community catalog, not a complete game encyclopedia.',observed:'Weather and exact unlock requirements must be checked in your in-game codex.',level:'Unlock level unverified',unlocked:'Unlocked in my codex',caught:'Caught',saved:'Checklist saved on this device.',nosave:'Browser storage unavailable; changes last for this page visit.',reset:'Checklist cleared.',copied:'Plan link copied. Checklist and level are not shared.',time:'Time block',automatic:'Follow server clock',unknownhours:'No exact end time published.',window:'Published weather window ends',dayonly:'A daily forecast is available; its exact time window is not published.',onlyunlocked:'Only my unlocked fish',missing:'Only missing fish',catalog:'Partial guide catalog',updated:'Calendar updated'},
    ja:{periods:['朝','午後','夕方','深夜','終日'],weather:['晴れ','雨','虹','雪'],unknown:'ゲーム内の天気を選択',unconfirmed:'この時間帯の予報は未確認です。ゲーム内の天気を選んでください。',forecast:'カレンダーに基づく候補です。現在の天気はゲーム内で確認してください。',manual:'入力した観測天気を使用中。',source:'情報源カレンダー UTC+8',custom:'自分のサーバー時刻',clock:'サーバー時刻',device:'端末の現地時刻',count:'件の候補',empty:'この条件に合う登録はありません。条件や検索語を変更してください。これはコミュニティの部分的なデータで、全魚種の図鑑ではありません。',observed:'天気と正確な解放条件はゲーム内図鑑で確認してください。',level:'解放レベル未確認',unlocked:'自分の図鑑で解放済み',caught:'釣った',saved:'チェックリストをこの端末に保存しました。',nosave:'ブラウザに保存できないため、このページを開いている間だけ保持します。',reset:'チェックリストを消去しました。',copied:'予定のリンクをコピーしました。チェックリストやレベルは共有されません。',time:'時間区分',automatic:'サーバー時刻に合わせる',unknownhours:'正確な終了時刻は未掲載です。',window:'掲載された天気時間帯の終了',dayonly:'日単位の予報がありますが、正確な時間帯は未掲載です。',onlyunlocked:'自分の解放済みのみ',missing:'未収集のみ',catalog:'ガイドの部分的な登録データ',updated:'カレンダー更新日'},
    zh:{periods:['上午','下午','傍晚','深夜','全天'],weather:['晴','雨','彩虹','雪'],unknown:'选择游戏内实际天气',unconfirmed:'该时段预报尚未确认，请选择游戏内看到的天气。',forecast:'基于日历的参考匹配，请在游戏内核对当前天气。',manual:'正在使用你观察到的天气。',source:'来源日历 UTC+8',custom:'我的区服时钟',clock:'区服时间',device:'你的本地时间',count:'条图鉴匹配',empty:'现有记录中没有匹配项。可修改条件或清空搜索。这是部分社区资料，不代表游戏完整图鉴。',observed:'天气及精确解锁条件请以游戏内图鉴为准。',level:'解锁等级尚未验证',unlocked:'我的图鉴已解锁',caught:'已钓到',saved:'清单已保存到此设备。',nosave:'浏览器无法保存；变更仅在本次页面访问期间保留。',reset:'清单已清空。',copied:'已复制规划链接，不包含你的清单或等级。',time:'规划时段',automatic:'跟随区服时钟',unknownhours:'来源未公布精确结束时间。',window:'已公布天气时段结束',dayonly:'已有当日天气类型，但未公布精确时间段。',onlyunlocked:'只看我已解锁的鱼',missing:'只看尚未收集',catalog:'部分攻略资料',updated:'日历更新日'},
    ko:{periods:['오전','오후','저녁','심야','종일'],weather:['맑음','비','무지개','눈'],unknown:'게임 내 관측 날씨 선택',unconfirmed:'이 시간대 예보는 미확인입니다. 게임에서 보이는 날씨를 선택하세요.',forecast:'달력 기반 후보입니다. 현재 날씨는 게임에서 확인하세요.',manual:'직접 관측한 날씨를 사용 중입니다.',source:'출처 달력 UTC+8',custom:'내 서버 시계',clock:'서버 시각',device:'기기 현지 시각',count:'개 등록 항목 일치',empty:'일치하는 등록 항목이 없습니다. 조건이나 검색어를 바꿔 보세요. 전체 게임 도감이 아닌 일부 커뮤니티 자료입니다.',observed:'날씨와 정확한 해제 조건은 게임 내 도감에서 확인하세요.',level:'해제 레벨 미확인',unlocked:'내 도감에서 해제됨',caught:'수집함',saved:'목록을 이 기기에 저장했습니다.',nosave:'브라우저 저장소를 사용할 수 없습니다. 이 페이지 방문 중에만 유지됩니다.',reset:'목록을 지웠습니다.',copied:'계획 링크를 복사했습니다. 목록과 레벨은 공유되지 않습니다.',time:'시간 구간',automatic:'서버 시계 따르기',unknownhours:'정확한 종료 시각 미공개.',window:'공개된 날씨 시간대 종료',dayonly:'당일 예보는 있지만 정확한 시간대는 미공개입니다.',onlyunlocked:'내 해제 항목만',missing:'미수집 항목만',catalog:'일부 가이드 자료',updated:'달력 갱신일'}
  };
  const copy=labels[locale], keys=['morning','afternoon','evening','night','all'], weatherKeys=['sunny','rain','rainbow','snow'];
  const rawPeriods={en:['Morning','Afternoon','Evening','Night','All day'],ja:['朝','昼','夜','深夜','終日'],zh:['清晨','午后','夜晚','深夜','全天'],ko:['아침','오후','저녁','심야','종일']};
  const rawWeather={en:['Sunny','Rainy','Rainbow','Snowy'],ja:['晴れ','雨','虹','雪'],zh:['晴','雨','彩虹','雪'],ko:['맑음','비','무지개','눈']};
  const $=s=>document.querySelector(s), esc=s=>String(s==null?'':s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  let storageAvailable=true,saved={};
  try{saved=JSON.parse(localStorage.getItem('heartopia-catch-planner-v1')||'{}')||{};}catch(_){storageAvailable=false;}
  const safeRecord=v=>v && typeof v==='object' && !Array.isArray(v)?v:{};
  const ids=window.HEARTOPIA_FISH_IDS || [];
  const normalized=data.map((fish,i)=>({...fish,id:ids[i]||'catalog-'+i,times:fish.times.map(t=>keys[rawPeriods[locale].indexOf(t)]).filter(Boolean),weathers:fish.weathers.map(t=>weatherKeys[rawWeather[locale].indexOf(t)]).filter(Boolean),minLevel:Number.isInteger(fish.minLevel)?fish.minLevel:null}));
  const query=new URLSearchParams(location.search);
  const state={weather:weatherKeys.includes(query.get('weather'))?query.get('weather'):null,period:keys.slice(0,4).includes(query.get('period'))?query.get('period'):null,mode:query.get('clock')==='custom'?'custom':query.get('clock')==='source'?'source':saved.mode==='custom'?'custom':'source',offset:480,auto:!keys.slice(0,4).includes(query.get('period')),query:'',level:Math.max(1,Number(saved.level)||1),onlyMissing:false,onlyUnlocked:false,caught:safeRecord(saved.caught),unlocked:safeRecord(saved.unlocked)};
  const offset=query.has('offset')?Number(query.get('offset')):Number(saved.offset);
  if(Number.isFinite(offset) && offset>=-720 && offset<=840 && offset%15===0)state.offset=offset;
  let observed=!!state.weather;
  function track(name,values){if(window.HeartopiaMetrics)window.HeartopiaMetrics.track(name,values);}
  function save(){
    try{localStorage.setItem('heartopia-catch-planner-v1',JSON.stringify({mode:state.mode,offset:state.offset,level:state.level,caught:state.caught,unlocked:state.unlocked}));$('#plannerStatus').textContent=copy.saved;}
    catch(_){storageAvailable=false;$('#plannerStatus').textContent=copy.nosave;}
  }
  function card(fish){
    const time=fish.times.map(t=>copy.periods[keys.indexOf(t)]).join(' / ');
    const weather=fish.weathers.map(t=>copy.weather[weatherKeys.indexOf(t)]).join(' / ');
    return '<article class="fish-card"><div class="fish-top"><span class="emo" aria-hidden="true">'+esc(fish.emoji)+'</span><h3 class="name">'+esc(fish.name)+'</h3></div><div class="fish-tags"><span class="tag loc">📍 '+esc(fish.loc)+'</span><span class="tag time">'+esc(time)+'</span><span class="tag">'+esc(weather)+'</span></div><p class="planner-note">'+copy.level+'</p><div class="fish-progress"><label><input type="checkbox" data-kind="unlocked" data-fish="'+esc(fish.id)+'"'+(state.unlocked[fish.id]?' checked':'')+'> '+copy.unlocked+'</label><label><input type="checkbox" data-kind="caught" data-fish="'+esc(fish.id)+'"'+(state.caught[fish.id]?' checked':'')+'> '+copy.caught+'</label></div></article>';
  }
  function render(){
    const now=new Date(),current=core.clock(now,state.mode==='source'?480:state.offset);
    if(state.auto)state.period=core.period(current.hour);
    let forecast={type:null,reason:'missing'};
    const plan=window.HEARTOPIA_WEATHER_PLAN;
    if(state.mode==='source' && plan)forecast=core.forecast(plan.days,current.date,current.hour+current.minute/60);
    if(!observed)state.weather=weatherKeys.includes(forecast.type)?forecast.type:null;
    $('#plannerClock').textContent=copy.clock+': '+current.date+' '+current.time+' · UTC'+((state.mode==='source'?480:state.offset)>=0?'+':'')+((state.mode==='source'?480:state.offset)/60)+' · '+copy.device+': '+now.toLocaleTimeString(document.documentElement.lang,{hour:'2-digit',minute:'2-digit'});
    $('#plannerWeather').value=state.weather||'';$('#plannerPeriod').value=state.auto?'auto':state.period;
    $('#plannerOffsetRow').hidden=state.mode==='source';
    $('#plannerCondition').textContent=observed?copy.manual:state.weather?copy.forecast+' '+(forecast.reason==='day-only'?copy.dayonly:forecast.ends!=null?copy.window+': '+String(forecast.ends).padStart(2,'0')+':00 (UTC+8)':copy.unknownhours):copy.unconfirmed;
    $('#plannerScope').textContent=copy.observed+' '+(plan?copy.updated+': '+plan.updated+' · UTC+8. ':'');
    const list=normalized.filter(f=>core.match(f,state));
    $('#plannerCount').textContent=list.length+' '+copy.count+' · '+Object.keys(state.caught).filter(k=>state.caught[k]).length+'/'+data.length+' '+copy.caught;
    const active=document.activeElement,focusId=active && active.dataset && active.dataset.fish,focusKind=active && active.dataset && active.dataset.kind;
    $('#plannerResults').innerHTML=list.length?list.map(card).join(''):'<p class="planner-empty">'+(state.weather||state.browseAll?copy.empty:copy.unconfirmed)+'</p>';
    if(focusId && focusKind){const control=Array.from($('#plannerResults').querySelectorAll('input')).find(el=>el.dataset.fish===focusId && el.dataset.kind===focusKind);if(control)control.focus();}
  }
  $('#plannerMode').value=state.mode;$('#plannerOffset').value=state.offset/60;$('#plannerLevel').value=state.level;
  $('#plannerMode').addEventListener('change',e=>{state.mode=e.target.value;observed=false;save();render();track('planner_filter',{control:'time'});});
  function updateOffset(e){const n=Number(e.target.value);if(e.target.value===''||!Number.isFinite(n)||n< -12||n>14||n*4%1!==0)return;state.offset=n*60;save();render();}
  $('#plannerOffset').addEventListener('input',updateOffset);
  $('#plannerOffset').addEventListener('change',updateOffset);
  $('#plannerPeriod').addEventListener('change',e=>{state.auto=e.target.value==='auto';if(!state.auto)state.period=e.target.value;render();track('planner_filter',{control:'time'});});
  $('#plannerWeather').addEventListener('change',e=>{state.weather=weatherKeys.includes(e.target.value)?e.target.value:null;observed=!!state.weather;render();track('planner_filter',{control:'weather'});});
  $('#plannerLevel').addEventListener('change',e=>{state.level=Math.max(1,Math.min(99,Math.floor(Number(e.target.value)||1)));e.target.value=state.level;save();render();track('planner_filter',{control:'level'});});
  $('#plannerSearch').addEventListener('input',e=>{state.query=e.target.value;render();});
  $('#plannerSearch').addEventListener('blur',()=>{if(state.query.trim())track('planner_filter',{control:'search'});});
  $('#plannerMissing').addEventListener('change',e=>{state.onlyMissing=e.target.checked;render();track('planner_filter',{control:'missing'});});
  $('#plannerUnlocked').addEventListener('change',e=>{state.onlyUnlocked=e.target.checked;render();track('planner_filter',{control:'unlocked'});});
  $('#plannerBrowseAll').addEventListener('change',e=>{state.browseAll=e.target.checked;render();});
  $('#plannerResults').addEventListener('change',e=>{const input=e.target;if(!['caught','unlocked'].includes(input.dataset.kind)||!ids.includes(input.dataset.fish))return;if(input.checked)state[input.dataset.kind][input.dataset.fish]=true;else delete state[input.dataset.kind][input.dataset.fish];save();render();track('collection_update');});
  $('#plannerClear').addEventListener('click',()=>{state.caught={};state.unlocked={};save();render();$('#plannerStatus').textContent=copy.reset;});
  $('#plannerShare').addEventListener('click',async()=>{
    const url=new URL(location.origin+location.pathname);url.searchParams.set('clock',state.mode);if(state.weather)url.searchParams.set('weather',state.weather);if(!state.auto)url.searchParams.set('period',state.period);if(state.mode==='custom')url.searchParams.set('offset',state.offset);url.hash='now';
    try{await navigator.clipboard.writeText(url.href);$('#plannerStatus').textContent=copy.copied;}
    catch(_){const box=$('#plannerShareUrl');box.hidden=false;box.value=url.href;box.focus();box.select();$('#plannerStatus').textContent=url.href;}
    track('share_plan');
  });
  if(!storageAvailable)$('#plannerStatus').textContent=copy.nosave;
  render();track('planner_view');setInterval(()=>{if(!document.querySelector('#plannerResults input:focus'))render();},30000);
})();
