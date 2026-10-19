/* 마법소녀본부: 홈(상황판) / 임무 / 지도 / 도감 / MY. 데이터는 js/data/hq.js */
const HQ=A.hq,HQS={tab:0,seg:'wait',coin:HQ.coin,hist:[]};
const hqI={
 home:'<path d="M12 3l2.600 5.400 5.900.8-4.300 4.100 1 5.900L12 16.400 6.800 19.200l1-5.900L3.500 9.200l5.900-.8z"/>',
 task:'<rect x="5" y="3.500" width="14" height="17" rx="3"/><path d="M9 9h6M9 13h6M9 17h3"/>',
 map:'<path d="M12 21s7-6.200 7-11.500A7 7 0 005 9.500C5 14.800 12 21 12 21z"/><circle cx="12" cy="9.500" r="2.500"/>',
 dex:'<path d="M5 4.500A1.500 1.500 0 016.500 3H19v15H6.500A1.500 1.500 0 005 19.500zM5 19.500A1.500 1.500 0 006.500 21H19"/><path d="M10 8l1 2 2 .3-1.500 1.400.4 2L10 12.700 8.100 13.700l.4-2L7 10.300 9 10z"/>',
 my:'<path d="M12 20.500s-7.500-4.600-7.500-10A4.200 4.200 0 0112 8a4.200 4.200 0 017.500 2.500c0 5.400-7.500 10-7.500 10z"/>'
};
const hqTabs=[['home','홈'],['task','임무'],['map','지도'],['dex','도감'],['my','MY']];
const hqGrade=g=>`<i class="hg g-${g[0]=='-'?'x':g[0]=='S'?'s':g[0].toLowerCase()}">${g}</i>`;
const hqWhen=m=>{if(m.when)return m.when;const d=new Date(Date.now()+m.off*864e5),w='일월화수목금토'[d.getDay()];return m.off==0?'오늘 '+m.time:`${d.getMonth()+1}/${d.getDate()}(${w}) ${m.time}`};
const hqAv=n=>lnAv(n,24);
const hqSegs=[['wait','대기'],['run','진행'],['done','완료']];
function hqMissionCard(m,open){
 return `<div class="hm${open?' open':''}" data-hqm="${m.id}"><div class="hm-h">${hqGrade(m.grade)}<div class="hm-t"><b>${m.title}</b><small>${m.place}</small></div><span class="hm-w">${hqWhen(m)}</span></div>
 <div class="hm-b"><div class="hm-team">${m.team.map(n=>`<span title="${n}">${hqAv(n)}</span>`).join('')}<small>${m.team.length==1?m.team[0]:m.team[0]+' 외 '+(m.team.length-1)+'명'}</small></div>
 <p>${m.note}</p><div class="hm-r"><span>✦ 히카리 +${m.reward.hikari}</span><span>● 코인 +${m.reward.coin}</span><span class="hm-id">${m.id}</span></div></div></div>`}
const hqMissionList=s=>{const l=HQ.missions.filter(m=>m.status==s).sort((a,b)=>(a.when?-1:0)-(b.when?-1:0)||(s=='done'?b.off-a.off:a.off-b.off));return l.length?l.map(m=>hqMissionCard(m,false)).join(''):'<div class="hq-empty">해당하는 임무가 없습니다</div>'};

/* ---- 지도: 도쿄 약식 지도 (위도/경도를 화면 좌표로 변환) ---- */
const hqX=lon=>(lon-139.58)/.34*340+10, hqY=lat=>(35.80-lat)/.24*400+20;
const hqP=a=>a.map(([lon,lat])=>hqX(lon).toFixed(1)+','+hqY(lat).toFixed(1)).join(' ');
function hqMap(){
 const bay=[[139.755,35.54],[139.762,35.585],[139.775,35.612],[139.795,35.640],[139.835,35.650],[139.88,35.645],[139.925,35.62],[139.925,35.54]];
 const sumida=[[139.745,35.80],[139.775,35.762],[139.80,35.735],[139.805,35.705],[139.795,35.675],[139.785,35.645]];
 const yama=[[139.767,35.681],[139.771,35.692],[139.777,35.714],[139.771,35.728],[139.739,35.733],[139.711,35.730],[139.700,35.690],[139.702,35.658],[139.738,35.628],[139.767,35.681]];
 const chuo=[[139.767,35.681],[139.73,35.693],[139.700,35.690],[139.66,35.703],[139.60,35.70]];
 const lab=[['이케부쿠로',139.711,35.742],['신주쿠',139.690,35.680],['시부야',139.686,35.650],['도쿄역',139.775,35.672],['우에노',139.783,35.722],['시나가와',139.742,35.614],['오다이바',139.783,35.616],['아키하바라',139.781,35.695]];
 const hq=[139.737,35.672];
 let s=`<svg viewBox="0 0 360 440" class="hq-svg" role="img" aria-label="도쿄도 약식 지도"><defs><pattern id="hqg" width="30" height="30" patternUnits="userSpaceOnUse"><path d="M30 0H0V30" fill="none" stroke="rgba(120,100,200,.12)"/></pattern></defs>
 <rect width="360" height="440" fill="#eae7fb"/><rect width="360" height="440" fill="url(#hqg)"/>
 <polygon points="${hqP(bay)}" fill="#bfd9f5"/><polyline points="${hqP(sumida)}" fill="none" stroke="#bfd9f5" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>
 <polyline points="${hqP(chuo)}" fill="none" stroke="#f4a860" stroke-width="2.4" stroke-linecap="round" opacity=".8"/>
 <polyline points="${hqP(yama)}" fill="none" stroke="#7bc96f" stroke-width="3" stroke-linejoin="round" opacity=".9"/>
 <rect x="${hqX(139.745)}" y="${hqY(35.690)}" width="22" height="16" rx="5" fill="#cfe9c8" stroke="#a9d4a0"/>`;
 lab.forEach(l=>s+=`<text x="${hqX(l[1])}" y="${hqY(l[2])}" class="hq-lb">${l[0]}</text>`);
 s+=`<g transform="translate(${hqX(hq[0])},${hqY(hq[1])})"><circle r="11" fill="#fff" stroke="#c77dff" stroke-width="2"/><path d="M0-7l2 4.500 5 .6-3.600 3.400.9 5L0 4 -4.300 6.500l.9-5L-7 -1.900l5-.6z" fill="#c77dff"/></g>`;
 HQ.enemies.forEach(e=>{const x=hqX(e.lon),y=hqY(e.lat),c=e.state=='소멸'?'#b9b4cc':e.state=='미확인'?'#2b1d4a':e.state=='교전'?'#8b5cf6':e.state=='추적'?'#f59e0b':'#ff4f8b';
  s+=`<g class="hq-en${e.state=='소멸'?' off':''}" data-hqe="${e.id}" transform="translate(${x},${y})">${e.state=='소멸'?'':`<circle class="pl" r="9" fill="${c}"/>`}<circle r="7" fill="${c}" stroke="#fff" stroke-width="2"/><text y="3.200" text-anchor="middle" class="hq-g">${e.grade[0]=='S'?'S':e.grade[0]}</text></g>`});
 return s+'</svg>'}
function hqEnemyCard(id){const e=HQ.enemies.find(x=>x.id==id);if(!e)return '';
 return `<div class="hq-ec"><div class="hq-ecd">${hqGrade(e.grade)}<div><b>${e.name}</b><small>${e.place}</small></div><span class="hq-st st-${e.state}">${e.state}</span></div><small class="hq-id">${e.id} · 반응 좌표 ${e.lat.toFixed(3)}N ${e.lon.toFixed(3)}E</small></div>`}

/* ---- 화면 ---- */
function hqEvents(){return A.calendar.events.filter(e=>e.cal=='마법소녀'&&e.off>=0).sort((a,b)=>a.off-b.off||(a.start||'').localeCompare(b.start||'')).slice(0,4)}
const hqDate=off=>{const d=new Date(Date.now()+off*864e5);return off==0?'오늘':off==1?'내일':`${d.getMonth()+1}/${d.getDate()}`};
function hqHome(){
 const wait=HQ.missions.filter(m=>m.status=='wait').slice(0,2),act=HQ.enemies.filter(e=>e.state!='소멸').length;
 return `<div class="hq-hero"><div class="hq-spark">✦</div><small>現生累代 統合管制室</small><h2>${HQ.cycle}</h2><p>싸워라. 그대들은 그 뭐시냐… 마법소녀다.</p></div>
 <div class="hq-grid"><div class="hq-st2"><small>경보 단계</small><div class="hq-dots">${[1,2,3,4,5].map(i=>`<i class="${i<=HQ.alert?'on':''}"></i>`).join('')}</div><b>경계</b></div>
 <div class="hq-st2"><small>도쿄도 쟈쿠무 반응</small><div class="hq-big" id="hq-act">${act}</div><b>건 활성</b></div></div>
 <div class="hq-card"><div class="hq-ch"><b>에너지 균형</b><small>지난주 대비 야미 +4.2%</small></div><div class="hq-bar"><i style="width:58%"></i><em style="width:42%"></em></div><div class="hq-bl"><span>빛(光) 58%</span><span>어둠(闇) 42%</span></div></div>
 <div class="hq-sec"><b>대기 임무</b><span data-hqt="1">전체 보기 ›</span></div>${wait.map(m=>hqMissionCard(m,false)).join('')}
 <div class="hq-sec"><b>주요 일정</b></div><div class="hq-card hq-ev">${hqEvents().map(e=>`<div><span class="d">${hqDate(e.off)}</span><b>${e.title}</b><small>${e.start?e.start+(e.end?'–'+e.end:''):'종일'}</small></div>`).join('')||'<div class="hq-empty">예정된 일정이 없습니다</div>'}</div>
 <div class="hq-sec"><b>본부 공지</b></div><div class="hq-card hq-nt">${HQ.notices.map(n=>`<p>${n}</p>`).join('')}</div>`}
const hqTask=()=>`<div class="hq-seg">${hqSegs.map(([k,t])=>`<span class="${HQS.seg==k?'on':''}" data-hqs="${k}">${t} ${HQ.missions.filter(m=>m.status==k).length}</span>`).join('')}</div><div id="hq-ml">${hqMissionList(HQS.seg)}</div>`;
const hqMapV=()=>`<div class="hq-mapw">${hqMap()}</div><div id="hq-ei" class="hq-ei">${hqEnemyCard(HQ.enemies[0].id)}</div><div class="hq-leg"><span><i style="background:#ff4f8b"></i>출현</span><span><i style="background:#8b5cf6"></i>교전</span><span><i style="background:#f59e0b"></i>추적</span><span><i style="background:#2b1d4a"></i>미확인</span><span><i style="background:#b9b4cc"></i>소멸</span></div>
 <div class="hq-sec"><b>반응 목록</b></div><div class="hq-card hq-el">${HQ.enemies.map(e=>`<div data-hqe="${e.id}">${hqGrade(e.grade)}<b>${e.name}</b><small>${e.place}</small><span class="hq-st st-${e.state}">${e.state}</span></div>`).join('')}</div>`;
const hqDex=()=>HQ.dex.map(c=>`<div class="hq-sec"><b>${c.cat}</b></div><div class="hq-card hq-dx">${c.items.map(i=>`<div class="dx" data-hqd><div class="dx-h"><b>${i.t}</b><svg viewBox="0 0 12 8"><path d="M1 1.500l5 5 5-5" fill="none" stroke="currentColor" stroke-width="1.800" stroke-linecap="round"/></svg></div><p>${i.b}</p></div>`).join('')}</div>`).join('');
const hqMy=()=>`<div class="hq-me"><div class="hq-ava">${lnAv(CHAR.name,64)}</div><div><b>${CHAR.name}</b><small>${HQ.rank} · ${HQ.team}</small></div></div>
 <div class="hq-card"><div class="hq-ch"><b>소원까지</b><small>${HQ.progress}%</small></div><div class="hq-bar pk"><i style="width:${HQ.progress}%"></i></div><small class="hq-mu">목표 히카리 에너지 달성 후 소원 신청 가능 (20세 미만)</small></div>
 <div class="hq-card hq-coin"><div><small>보유 코인</small><b id="hq-coin">${HQS.coin.toLocaleString()}</b></div><button data-gacha>가챠 돌리기 · ${HQ.gacha.cost}</button></div>
 <div class="hq-card" id="hq-gr"><div class="hq-ch"><b>가챠 결과</b></div>${HQS.hist.length?HQS.hist.map(h=>`<div class="hq-gh"><span class="t${h.t}">${h.tier}</span><b>${h.item}</b></div>`).join(''):'<div class="hq-empty">아직 돌린 기록이 없습니다</div>'}</div>`;
function pageHQ(){
 const jst=new Date().toLocaleTimeString('ja-JP',{timeZone:'Asia/Tokyo',hour:'2-digit',minute:'2-digit',hour12:false}),nw=HQ.missions.filter(m=>m.status=='wait').length;
 return `<div class="page hq" id="p-hq"><div class="hq-top"><div><span class="hq-logo">✦</span><b>마법소녀본부</b></div><small>JST ${jst}</small></div>
 <div class="scroll hq-sc"><div class="hq-pg on" id="hq-t0">${hqHome()}</div><div class="hq-pg" id="hq-t1">${hqTask()}</div><div class="hq-pg" id="hq-t2">${hqMapV()}</div><div class="hq-pg" id="hq-t3">${hqDex()}</div><div class="hq-pg" id="hq-t4">${hqMy()}</div></div>
 <div class="hq-tabs">${hqTabs.map((t,i)=>`<div class="${i==HQS.tab?'on':''}" data-hqt="${i}"><svg viewBox="0 0 24 24">${hqI[t[0]]}</svg>${t[1]}${i==1&&nw?`<em>${nw}</em>`:''}</div>`).join('')}</div></div>`}
registerApp('hq',pageHQ,{theme:'light',onOpen(){HQS.tab=0}});

function hqGo(i){HQS.tab=i;document.querySelectorAll('.hq-pg').forEach((e,k)=>e.classList.toggle('on',k==i));document.querySelectorAll('.hq-tabs [data-hqt]').forEach((e,k)=>e.classList.toggle('on',k==i));const sc=$('.hq-sc');if(sc)sc.scrollTop=0}
function hqRoll(){const g=HQ.gacha;if(HQS.coin<g.cost){return}HQS.coin-=g.cost;let r=Math.random(),k=0;for(;k<g.tiers.length-1;k++){if(r<g.tiers[k].p)break;r-=g.tiers[k].p}
 const t=g.tiers[k],it=t.items[Math.floor(Math.random()*t.items.length)];HQS.hist.unshift({t:k,tier:t.n,item:it});HQS.hist=HQS.hist.slice(0,12);
 $('#hq-t4').innerHTML=hqMy();const b=$('#hq-t4 .hq-gh');if(b)b.classList.add('new')}
document.addEventListener('click',e=>{const h=e.target.closest('.hq');if(!h)return;
 const t=e.target.closest('[data-hqt]');if(t){hqGo(+t.dataset.hqt);return}
 const s=e.target.closest('[data-hqs]');if(s){HQS.seg=s.dataset.hqs;$('#hq-t1').innerHTML=hqTask();return}
 const m=e.target.closest('[data-hqm]');if(m){m.classList.toggle('open');return}
 const d=e.target.closest('[data-hqd]');if(d){d.classList.toggle('open');return}
 const en=e.target.closest('[data-hqe]');if(en){$('#hq-ei').innerHTML=hqEnemyCard(en.dataset.hqe);document.querySelectorAll('.hq-en').forEach(x=>x.classList.toggle('sel',x.dataset.hqe==en.dataset.hqe));if(!en.closest('svg'))$('.hq-sc').scrollTo({top:0,behavior:'smooth'});return}
 if(e.target.closest('[data-gacha]'))hqRoll()});
