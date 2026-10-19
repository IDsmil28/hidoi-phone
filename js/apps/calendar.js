/* 캘린더 앱 (월 보기). 일정은 js/data/calendar.js */
const CAL=A.calendar;
const calWk=d=>'일월화수목금토'[d.getDay()]+'요일';
function calEvents(y,m){
 const t=new Date();t.setHours(0,0,0,0);
 return CAL.events.map(e=>{let d;if(e.off!=null)d=new Date(t.getTime()+e.off*864e5);else{const [mm,dd]=e.date.split('-').map(Number);d=new Date(y,mm-1,dd)}return Object.assign({},e,{d})})
  .filter(e=>e.d.getFullYear()==y&&e.d.getMonth()==m)}
function calHTML(sel){
 const n=new Date(),y=n.getFullYear(),m=n.getMonth(),today=n.getDate();
 const first=new Date(y,m,1).getDay(),dim=new Date(y,m+1,0).getDate(),prev=new Date(y,m,0).getDate();
 const ev=calEvents(y,m),by={};ev.forEach(e=>{(by[e.d.getDate()]=by[e.d.getDate()]||[]).push(e)});
 let cells='';
 for(let i=0;i<first;i++)cells+=`<div class="cdy od"><b>${prev-first+1+i}</b><span class="dots"></span></div>`;
 for(let d=1;d<=dim;d++){const w=(first+d-1)%7,dots=(by[d]||[]).slice(0,3).map(e=>`<i style="background:${CAL.cals[e.cal]||'#8e8e93'}"></i>`).join('');
  cells+=`<div class="cdy${w==0?' sun':''}${d==today?' td':''}${d==sel?' sl':''}" data-cday="${d}"><b>${d}</b><span class="dots">${dots}</span></div>`}
 const rest=(7-(first+dim)%7)%7;for(let i=1;i<=rest;i++)cells+=`<div class="cdy od"><b>${i}</b><span class="dots"></span></div>`;
 const list=(by[sel]||[]).slice().sort((a,b)=>(a.start||'').localeCompare(b.start||''));
 const sd=new Date(y,m,sel);
 return `<div class="cal-head">${m+1}월<small>${y}</small></div><div class="cal-wk">${[...'일월화수목금토'].map(c=>`<i>${c}</i>`).join('')}</div><div class="cal-g">${cells}</div>
 <div class="cal-day">${m+1}월 ${sel}일 ${calWk(sd)}</div>${list.length?list.map(e=>`<div class="ev"><div class="tm">${e.start?e.start+'<br>'+e.end:'종일'}</div><div class="bar" style="background:${CAL.cals[e.cal]||'#8e8e93'}"></div><div><b>${e.title}</b><small>${e.cal}</small></div></div>`).join(''):'<div class="ev-none">일정 없음</div>'}`}
const CALI=['<circle cx="12" cy="12" r="8.500"/><path d="M12 7.500V12l3 2"/>','<rect x="4" y="5" width="16" height="15" rx="3"/><path d="M4 10h16M8.500 3v4M15.500 3v4"/>','<path d="M4 13l2.500-7h11L20 13v5a1 1 0 01-1 1H5a1 1 0 01-1-1zM4 13h4.500l1 2.500h5l1-2.500H20"/>'];
function pageCalendar(){
 const n=new Date();
 return `<div class="page" id="p-cal">${nav(gb(bc+n.getFullYear(),'back','data-back=""'),gb('<svg viewBox="0 0 24 24"><path d="M12 5v14M5 12h14"/></svg>','round')+gb(magB,'round'))}<div class="scroll" id="cal-body" style="padding-top:104px">${calHTML(n.getDate())}</div><div class="ftabs"><div class="ftp">${['오늘','캘린더','받은 편지함'].map((t,i)=>`<div class="${i==1?'on':''}" data-caltab="${i}"><svg viewBox="0 0 24 24">${CALI[i]}</svg>${t}</div>`).join('')}</div></div></div>`}
registerApp('calendar',pageCalendar);
document.addEventListener('click',e=>{
 const b=$('#cal-body');if(!b)return;
 const d=e.target.closest('[data-cday]');if(d){b.innerHTML=calHTML(+d.dataset.cday);return}
 const t=e.target.closest('[data-caltab]');if(t){if(t.dataset.caltab=='0')b.innerHTML=calHTML(new Date().getDate());else if(t.dataset.caltab=='2')shake(t)}});
