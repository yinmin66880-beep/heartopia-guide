const test=require('node:test');
const assert=require('node:assert/strict');
const core=require('../assets/js/planner-core.js');

test('source date is stable across device zones and rolls over in UTC+8',()=>{
 assert.equal(core.clock('2026-10-17T15:59:59Z',480).date,'2026-10-17');
 assert.equal(core.clock('2026-10-17T16:00:00Z',480).date,'2026-10-18');
 assert.equal(core.clock('2026-10-17T16:00:00Z',-300).time,'11:00');
 assert.equal(core.clock('2026-10-17T23:00:00Z',330).date,'2026-10-18');
});
test('missing and ambiguous weather stays unknown',()=>{
 assert.equal(core.forecast({},'2026-10-17',12).type,null);
 assert.equal(core.forecast({'2026-10-17':{phases:[{t:'rain'},{t:'rainbow'}]}},'2026-10-17',12).type,null);
 assert.equal(core.forecast({'2026-10-17':{phases:[{t:'rain',s:18,e:6}]}},'2026-10-17',20).type,null);
});
test('timed weather respects start/end without inventing missing slots',()=>{
 const days={'2026-10-17':{phases:[{t:'rain',s:12,e:18}]}};
 assert.equal(core.forecast(days,'2026-10-17',11.99).type,null);
 assert.equal(core.forecast(days,'2026-10-17',12).type,'rain');
 assert.equal(core.forecast(days,'2026-10-17',18).type,null);
 assert.equal(core.forecast(days,'2026-10-17',17).ends,18);
});
test('explicit baseline and day-only reports retain their source precision',()=>{
 const days={a:{phases:[{t:'sunny'},{t:'rain',s:12,e:18}]},b:{phases:[{t:'rain'}]}};
 assert.equal(core.forecast(days,'a',10).type,'sunny');
 assert.equal(core.forecast(days,'b',10).reason,'day-only');
 assert.equal(core.forecast(days,'b',10).ends,null);
});
test('collection and codex filters work without assigning invented unlock levels',()=>{
 const fish={id:'minnow',name:'Minnow',loc:'River',note:'',times:['all'],weathers:['rain'],minLevel:null};
 const state={weather:'rain',period:'night',level:1,caught:{},unlocked:{}};
 assert.equal(core.match(fish,state),true);
 assert.equal(core.match(fish,{...state,weather:null}),false);
 assert.equal(core.match(fish,{...state,weather:null,browseAll:true}),true);
 assert.equal(core.match(fish,{...state,onlyUnlocked:true}),false);
 assert.equal(core.match(fish,{...state,onlyUnlocked:true,unlocked:{minnow:true}}),true);
 assert.equal(core.match(fish,{...state,onlyMissing:true,caught:{minnow:true}}),false);
 assert.equal(core.match({...fish,minLevel:5},state),false);
 assert.equal(core.match(fish,{...state,query:'river'}),true);
});
