/* 알림 배너(화면 위에서 내려옴) + 시간 경과 알림 + 잠금화면 알림 추가 */
const NF=A.notify,icoOf=k=>k=='cal'?'calendar':k;
const banner=document.createElement('div');banner.id='banner';phone.appendChild(banner);
let bTimer=null,bCur=null;

function notifHTML(n,w){return `<div class="ni">${iconEl(icoOf(n.k))}</div><div class="nt"><div class="nh"><b>${n.t}</b><span>${w}</span></div><div class="nb">${n.b}</div></div>`}
function hideBanner(){banner.classList.remove('show');bCur=null;clearTimeout(bTimer)}
function showBanner(n){bCur=n;banner.innerHTML=`<div class="notif">${notifHTML(n,'지금')}</div>`;banner.classList.add('show');clearTimeout(bTimer);bTimer=setTimeout(hideBanner,4500)}
/* 잠금화면 알림 목록 맨 위에 추가 */
function lockNotif(n){const d=document.createElement('div');d.className='notif';d.dataset.nk=n.k;d.dataset.ref=n.ref||'';d.dataset.cn=n.cn||'';d.innerHTML=notifHTML(n,'지금');$('#nstack').prepend(d)}

/* 알림을 눌렀을 때: 잠금 해제 → 앱 열기 → 해당 대화방/화면으로 이동 */
function openFromNotif(k,ref){
 const wasLocked=isLocked();if(wasLocked)unlock();
 const el=document.querySelector(`#grid .app[data-k="${k}"] .icon,#grid .app[data-k="${k}"] .wbox,#dock .app[data-k="${k}"] .icon`);
 setTimeout(()=>{openApp(k,el||home);
  if(k=='line'){const c=A.line.chats.find(x=>x.name==ref);if(c){show('p-lchat'+c.id);lnRead(c.id)}}
  if(k=='msg'){const c=C.find(x=>x.name==ref);if(c){show('p-chat'+c.id);msgRead(c.id)}}
 },wasLocked?380:0)}
banner.addEventListener('click',()=>{if(!bCur)return;const n=bCur;hideBanner();UN.notifOff(n.ref);openFromNotif(n.k,n.cn)});
/* 배너를 위로 밀면 치움 */
let by=null;banner.addEventListener('pointerdown',e=>{by=e.clientY});
addEventListener('pointerup',e=>{if(by!==null&&by-e.clientY>18&&bCur){hideBanner();banner.dataset.sw=1;setTimeout(()=>delete banner.dataset.sw,50)}by=null});
banner.addEventListener('click',e=>{if(banner.dataset.sw)e.stopImmediatePropagation()},true);

function deliver(it){
 let n=null;
 if(it.app=='line'){const seen=lnReceive(it.from,it.text,it.chat);if(seen)return;const g=!!it.chat;
  n={k:'line',t:it.chat||it.from,b:(g?it.from+': ':'')+it.text,cn:it.chat||it.from,ref:'line:'+(it.chat||it.from)}}
 else if(it.app=='msg'){const seen=msgReceive(it.from,it.text);if(seen)return;n={k:'msg',t:it.from,b:it.text,cn:it.from,ref:'msg:'+it.from}}
 else if(it.app=='cal'){const ev=(A.calendar.events.filter(e=>e.off===it.off)||[])[it.pick||0];
  n={k:'cal',t:'캘린더',b:ev?`${ev.title} · ${ev.start?ev.start+' 시작':'오늘'}`:(it.body||'일정이 곧 시작됩니다'),cn:'',ref:'cal'}}
 else if(it.app=='hq'){if(it.mission&&A.hq&&A.hq.missions)A.hq.missions.unshift(it.mission);
  n={k:'hq',t:it.title,b:it.body,cn:'',ref:'hq'}}
 if(!n)return;
 n.k=n.k=='cal'?'calendar':n.k;
 UN.paint();
 lockNotif(n);            /* 잠금화면 알림 목록에는 항상 쌓임 */
 if(!isLocked())showBanner(n)}
NF.timeline.forEach(it=>setTimeout(()=>deliver(it),it.after*1000));
