const fs=require('fs');const path=require('path');const assert=require('node:assert/strict');const {spawn}=require('child_process');const net=require('net');
const root=path.resolve(__dirname,'..');
const {chromium}=require('/opt/data/projects/Segment.C-window-author/node_modules/@playwright/test');
const result={cases:[],desktop:[],limits:['Safe-area 34px is CSS simulation, not physical-device validation.','No dialer, submissions or external embeds exercised.']};
(async()=>{
 const child=spawn(process.execPath,['-e',`const next=require('${root}/node_modules/next');const app=next({dev:false,dir:'${root}'});app.prepare().then(()=>{require('http').createServer(app.getRequestHandler()).listen(0,'127.0.0.1',function(){console.log('PORT:'+this.address().port)})})`],{cwd:root,detached:true,stdio:['ignore','pipe','pipe']});
 let port;let logs='';child.stderr.on('data',b=>logs+=b);
 try{
 port=await new Promise((resolve,reject)=>{let out='';child.stdout.on('data',b=>{out+=b;const m=out.match(/PORT:(\d+)/);if(m)resolve(Number(m[1]))});child.on('exit',()=>reject(Error(logs)));setTimeout(()=>reject(Error('server timeout')),30000).unref()});
 result.port=port;const origin='http://127.0.0.1:'+port;
 const browser=await chromium.launch({executablePath:'/opt/hermes/tools/chromium-1208/chrome-linux64/chrome',headless:true,args:['--no-sandbox']});
 try{
 const context=await browser.newContext();
 await context.route('**/*',route=>{const r=route.request();if(!r.url().startsWith(origin)||!['GET','HEAD'].includes(r.method()))return route.abort();return route.continue()});
 const page=await context.newPage();page.on('dialog',d=>d.dismiss());
 const dock=page.getByRole('navigation',{name:'Actions rapides',exact:true});
 for(const width of [320,390,768,1023,1024,1440])for(const route of ['/','/portes','/contact','/mentions-legales']){
  await page.setViewportSize({width,height:800});await page.goto(origin+route);await page.waitForLoadState('networkidle');
  assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true,'horizontal overflow');
  if(width<1024){
   await dock.waitFor({state:'visible'});const links=dock.locator('a');assert.equal(await links.count(),2);assert.equal(await links.nth(0).textContent(),'Devis');assert.equal((await links.nth(1).textContent()).trim(),'Téléphone');
   assert.ok(await links.nth(1).evaluate(a=>/^tel:\+\d+$/.test(a.getAttribute('href'))));
   for(const ratio of [0,.5,1]){await page.evaluate(r=>scrollTo({top:(document.documentElement.scrollHeight-innerHeight)*r,behavior:'instant'}),ratio);const b=await dock.boundingBox();assert.ok(Math.abs(b.y+b.height-800)<1);assert.ok(Math.abs(b.height-80)<1);for(const a of await links.all()){const r=await a.boundingBox();assert.ok(r.height>=48);assert.ok(r.width>0)}}
   const last=page.locator('footer a').last();const box=await last.boundingBox();const db=await dock.boundingBox();assert.ok(box.y+box.height<=db.y+1,'footer link clear of dock');
  }else {assert.equal(await dock.isVisible(),false);assert.equal(await page.evaluate(()=>getComputedStyle(document.body).paddingBottom),'0px');}
  result.cases.push({width,route,passed:true});
 }
 // Desktop compare original authenticated Header rendered in the same production stylesheet.
 const Module=require('module');const swc=require(root+'/node_modules/next/dist/build/swc');const React=require(root+'/node_modules/react');const {renderToStaticMarkup}=require(root+'/node_modules/react-dom/server');
 const resolve=Module._resolveFilename;Module._resolveFilename=function(id,...args){return resolve.call(this,id.startsWith('@/')?path.join(root,id.slice(2)):id,...args)};
 for(const ext of ['.ts','.tsx'])require.extensions[ext]=(m,f)=>m._compile(swc.transformSync(fs.readFileSync(f,'utf8'),{filename:f,module:{type:'commonjs'},jsc:{parser:{syntax:'typescript',tsx:f.endsWith('.tsx')},transform:{react:{runtime:'automatic'}},target:'es2020'}}).code,f);
 const baseline=JSON.parse(fs.readFileSync(root+'/tests/fixtures/mobile-actions-baseline.json'));const m=new Module(root+'/components/Header.baseline.tsx',module);m.filename=root+'/components/Header.baseline.tsx';m.paths=Module._nodeModulePaths(root+'/components');m._compile(swc.transformSync(baseline['components/Header.tsx'],{filename:m.filename,module:{type:'commonjs'},jsc:{parser:{syntax:'typescript',tsx:true},transform:{react:{runtime:'automatic'}},target:'es2020'}}).code,m.filename);
 const html=renderToStaticMarkup(React.createElement(m.exports.Header));
 for(const width of [1024,1440]){
 await page.setViewportSize({width,height:800});await page.goto(origin+'/');await page.waitForLoadState('networkidle');
 const measure=()=>{const h=document.querySelector('header');return [h,...h.querySelectorAll('a,button,nav')].map(e=>{const b=e.getBoundingClientRect(),s=getComputedStyle(e);return {x:b.x,y:b.y,w:b.width,h:b.height,display:s.display,font:s.font,color:s.color,padding:s.padding,gap:s.gap}})};
 const current=await page.evaluate(measure);await page.evaluate(html=>{document.querySelector('header').outerHTML=html},html);const original=await page.evaluate(measure);assert.deepEqual(current,original);result.desktop.push({width,geometryAndStylesEqual:true});
 }
 for (const landscapeWidth of [320,768]) {
 await page.setViewportSize({width:landscapeWidth,height:320});await page.goto(origin+'/');await page.getByRole('button',{name:'Menu',exact:true}).click();const menu=page.getByRole('navigation',{name:'Navigation mobile',exact:true});
 await menu.waitFor({state:'visible'});const total=await menu.locator('a').count();assert.equal(total,require(root+'/lib/site.ts').nav.length);for(let i=0;i<total;i++){await page.keyboard.press('Tab');const ok=await page.evaluate(()=>{const e=document.activeElement,b=e.getBoundingClientRect(),m=document.querySelector('#menu-mobile').getBoundingClientRect();return e.tagName==='A'&&b.top>=m.top-1&&b.bottom<=m.bottom+1});assert.ok(ok,'all menu links keyboard-visible in short landscape')}
 (result.landscape ||= []).push({width:landscapeWidth,height:320,keyboardLinks:total});
 await page.getByRole('button',{name:'Fermer',exact:true}).click();
 }
 await dock.getByRole('link',{name:'Devis',exact:true}).click();await page.waitForURL('**/contact');const heading=await page.locator('h1').boundingBox();const header=await page.locator('header').boundingBox();assert.ok(heading.y>=header.y+header.height-1);result.devisNavigation=true;
 await page.setViewportSize({width:390,height:800});await page.goto(origin+'/');
 await page.addStyleTag({content:'@media(max-width:1023px){body{padding-bottom:calc(80px + 34px)!important}nav[aria-label="Actions rapides"]{padding-bottom:calc(15px + 34px)!important}#menu-mobile{max-height:calc(100dvh - 76px - 80px - 34px)!important}}'});
 const sb=await dock.boundingBox();assert.equal(sb.height,114);await page.evaluate(()=>scrollTo({top:document.documentElement.scrollHeight,behavior:'instant'}));const lb=await page.locator('footer a').last().boundingBox();assert.ok(lb.y+lb.height<=sb.y+1);result.safeAreaSimulation={inset:34,dockHeight:114,footerClear:true};
 }finally{await browser.close()}
 }finally{try{process.kill(-child.pid,'SIGTERM')}catch{}await new Promise(r=>setTimeout(r,800));if(port){result.portClosed=await new Promise(resolve=>{const s=net.connect(port,'127.0.0.1');s.on('connect',()=>{s.destroy();resolve(false)});s.on('error',()=>resolve(true))});assert.ok(result.portClosed)}fs.writeFileSync('/opt/data/cache/randretsa-browser-results.json',JSON.stringify(result,null,2));}
 console.log(JSON.stringify(result));
})().catch(e=>{console.error(e.message);process.exitCode=1});
