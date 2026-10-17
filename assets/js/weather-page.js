(function () {
  'use strict';
  const core=window.HeartopiaPlanner, plan=window.HEARTOPIA_WEATHER_PLAN, wx=window.HEARTOPIA_WEATHER;
  if(!core || !plan) return;
  const lang=(document.documentElement.lang || 'en').slice(0,2), locale=['en','ja','ko'].includes(lang)?lang:'zh';
  const copy={
    en:{unknown:'Not yet confirmed',known:'Community calendar record',pending:'Awaiting a dated source',scope:'Source: TapTap community calendar · UTC+8. Other game regions are not independently verified by this feed.',source:'Source calendar updated',fetched:'Daily feed generated',local:'Your local clock',feed:'Calendar clock',nohours:'Time window not published. Confirm the current weather in-game.',empty:'No upcoming dates have been confirmed. Missing dates remain unknown.',fish:'Plan fishing with these conditions',next:'Next confirmed date',all:'Show the fishing planner',past:'This is a dated archive; check the in-game forecast.',tip:'Check your in-game Watch forecast before choosing weather-limited fish.'},
    ja:{unknown:'未確認',known:'コミュニティ確認記録',pending:'日付付き情報を待っています',scope:'情報源：TapTapコミュニティ・UTC+8基準。ほかのゲーム地域との一致は独立検証していません。',source:'元カレンダー更新日',fetched:'デイリー情報生成日時',local:'端末の現地時刻',feed:'情報源の時刻',nohours:'時間帯は未掲載です。現在の天気はゲーム内で確認してください。',empty:'これ以降の確認済み日程はありません。記録のない日は未確認です。',fish:'この条件で釣りの予定を立てる',next:'次の確認済み日程',all:'釣りプランナーを開く',past:'日付付きの過去記録です。ゲーム内予報を確認してください。',tip:'天気限定の魚を探す前に、ゲーム内の時計・天気予報を確認してください。'},
    zh:{unknown:'待确认',known:'社区日历已记录',pending:'等待带日期的可靠来源',scope:'来源：TapTap 社区日历 · UTC+8；此信息源尚未独立验证其他游戏区服。',source:'来源日历更新',fetched:'每日数据生成时间',local:'你的本地时间',feed:'信息源时间',nohours:'未公布具体时段，请在游戏内确认当前天气。',empty:'暂无后续已确认日期；缺少记录的日期保持未知。',fish:'按这些条件规划钓鱼',next:'下个已确认日期',all:'打开钓鱼规划器',past:'这是带日期的归档，请核对游戏内预报。',tip:'寻找天气限定鱼前，请先确认游戏内手表天气。'},
    ko:{unknown:'미확인',known:'커뮤니티 달력 기록',pending:'날짜가 명시된 정보 대기 중',scope:'정보 출처: TapTap 커뮤니티 · UTC+8. 다른 게임 지역과의 일치는 별도로 검증하지 않았습니다.',source:'원본 달력 갱신일',fetched:'일일 정보 생성 시각',local:'기기 현지 시각',feed:'정보 기준 시각',nohours:'시간대가 공개되지 않았습니다. 현재 날씨는 게임에서 확인하세요.',empty:'이후 확인된 일정이 없습니다. 기록이 없는 날짜는 미확인입니다.',fish:'이 조건으로 낚시 계획 세우기',next:'다음 확인된 날짜',all:'낚시 플래너 열기',past:'날짜가 명시된 과거 기록입니다. 게임 내 예보를 확인하세요.',tip:'날씨 한정 물고기를 찾기 전에 게임 내 시계의 예보를 확인하세요.'}
  }[locale];
  const $=selector=>document.querySelector(selector), esc=value=>String(value||'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  function render(){
    const now=new Date(), feed=core.clock(now,480), daily=window.HEARTOPIA_DAILY;
    const entry=wx && wx.days && wx.days[feed.date];
    const condition=core.forecast(plan.days,feed.date,feed.hour+feed.minute/60);
    $('#todayDate').textContent=feed.date+' · UTC+8';
    $('#statusText').textContent=entry?copy.known:copy.unknown;
    $('#statusPill').className='status-pill '+(entry?'ok':'warn');
    $('#statusMeta').textContent=copy.source+': '+(plan.updated||'—')+' · '+copy.fetched+': '+(daily && daily.generatedAt || plan.generatedAt || '—')+' (UTC+8)';
    $('#srcLinks').innerHTML=plan.sourceUrl && /^https:\/\/www\.taptap\.cn\//.test(plan.sourceUrl)?'<a href="'+esc(plan.sourceUrl)+'" target="_blank" rel="noopener">TapTap ↗</a>':'';
    $('#heroUpdated').textContent=copy.feed+': '+feed.date+' '+feed.time+' (UTC+8) · '+copy.local+': '+now.toLocaleString(document.documentElement.lang);
    $('#wxIcon').textContent=entry && entry.icon || '❔';
    $('#wxLabel').textContent=entry && entry.label || copy.unknown;
    $('#wxDetail').textContent=entry && entry.note || copy.nohours;
    $('#wxTip').textContent=copy.tip;
    let scope=$('#weatherScope');
    if(!scope){scope=document.createElement('p');scope.id='weatherScope';scope.className='planner-scope';$('#statusBar').after(scope);}
    scope.textContent=copy.scope;
    const ahead=wx && wx.days?Object.keys(wx.days).filter(day=>day>=feed.date).sort():[];
    $('#wxCal').innerHTML=ahead.length?ahead.slice(0,14).map(day=>{
      const value=wx.days[day], raw=plan.days[day], phases=raw && raw.phases || [];
      const types=[...new Set(phases.map(p=>p.t))], weather=types.length===1 && ['sunny','rain','rainbow','snow'].includes(types[0])?types[0]:'';
      return '<a class="wx-cell'+(day===feed.date?' today':'')+'" href="fishing?clock=source'+(weather?'&weather='+weather:'')+'#now" aria-label="'+esc(day+' '+value.label+' · '+copy.fish)+'"><span class="wx-week">UTC+8</span><div class="wx-date">'+day+'</div><span class="wx-icon">'+esc(value.icon)+'</span><div class="wx-label">'+esc(value.label)+'</div><div class="wx-note">'+esc(value.note || copy.nohours)+'</div><div class="wx-fish">🎣 '+copy.fish+' →</div></a>';
    }).join(''):'<p class="planner-empty">'+copy.empty+'</p>';
    const next=ahead.find(day=>day>feed.date), nextBox=$('#wxNext');
    nextBox.style.display=next?'':'none';if(next)nextBox.textContent=copy.next+': '+next+' '+wx.days[next].label+' (UTC+8)';
    document.querySelectorAll('a[data-weather-plan]').forEach(a=>{a.href='fishing?clock=source'+(condition.type?'&weather='+condition.type:'')+'#now';});
    const snapshot=$('#weatherSnapshot');if(snapshot)snapshot.hidden=true;
  }
  render();setInterval(render,30000);
})();
