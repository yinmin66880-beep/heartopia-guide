const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
const code=fs.readFileSync(require('node:path').join(__dirname,'../assets/js/analytics.js'),'utf8');
function boot(id='',consent=null,privacy={}){
 const appended=[],panels=[],events=[],store=new Map(consent?[['heartopia-analytics-consent',consent]]:[]);
 function element(tag){return {tag,children:[],listeners:{},setAttribute(){},append(...items){this.children.push(...items);},addEventListener(name,fn){this.listeners[name]=fn;},remove(){}};}
 const context={URL,URLSearchParams,Set,Date,navigator:privacy,location:{origin:'https://heartopiaguide.net',pathname:'/en/fishing',search:'?q=private-text&weather=rain&utm_source=reddit&utm_medium=community&utm_campaign=weather_fishing_launch',reload(){}},localStorage:{getItem:k=>store.get(k)||null,setItem:(k,v)=>store.set(k,v)},CustomEvent:class{constructor(name,options){this.type=name;this.detail=options.detail;}},document:{documentElement:{lang:'en'},body:{dataset:{page:'fishing'},append:p=>panels.push(p)},head:{appendChild:e=>appended.push(e)},title:'Fishing',referrer:'https://example.org/private?q=secret',createElement:element,dispatchEvent:e=>events.push(e),addEventListener(){}},window:{HEARTOPIA_ANALYTICS_CONFIG:{measurementId:id}}};
 vm.runInNewContext(code,context);return {context,appended,panels,events,store};
}
test('unconfigured and declined analytics never load a tracker',()=>{
 assert.equal(boot().appended.length,0);
 assert.equal(boot('G-TEST123','denied').appended.length,0);
 assert.equal(boot('G-TEST123','granted',{globalPrivacyControl:true}).appended.length,0);
 assert.equal(boot('G-TEST123','granted',{doNotTrack:'1'}).appended.length,0);
});
test('configured property requires an explicit opt-in',()=>{
 const app=boot('G-TEST123');assert.equal(app.appended.length,0);assert.equal(app.panels.length,1);
 const allow=app.panels[0].children.find(x=>x.textContent==='Allow');allow.listeners.click();
 assert.equal(app.appended.length,1);assert.equal(app.store.get('heartopia-analytics-consent'),'granted');
 const calls=app.context.window.dataLayer.map(args=>Array.from(args));
 const config=calls.find(call=>call[0]==='config')[2];
 assert.equal(config.page_location,'https://heartopiaguide.net/en/fishing');
 assert.equal(config.page_referrer,'https://example.org');
 assert.equal(config.campaign_source,'reddit');assert.equal(config.campaign_name,'weather_fishing_launch');
 assert.equal(JSON.stringify(calls).includes('private-text'),false);
});
test('measurement events exclude free text and collection contents',()=>{
 const app=boot('G-TEST123','granted');
 app.context.window.HeartopiaMetrics.track('planner_filter',{control:'search',query:'my-private-query',caught:['koi']});
 app.context.window.HeartopiaMetrics.track('unknown_event',{control:'weather'});
 const events=app.context.window.dataLayer.map(args=>Array.from(args)).filter(call=>call[0]==='event');
 assert.equal(events.at(-1)[1],'planner_filter');
 assert.deepEqual(JSON.parse(JSON.stringify(events.at(-1)[2])),{language:'en',page_path:'/en/fishing',control:'search'});
 assert.equal(events.some(call=>call[1]==='unknown_event'),false);
});
