/* 메시지: 목록 / 대화 / 보내기 / 새 메시지 수신. 데이터는 js/data/messages.js
   각 대화는 고유 번호 c.id 로 구분 (목록 순서가 바뀌어도 화면 연결이 유지됨) */
const msgBy=id=>C.find(c=>c.id==id);
const isNum=n=>/^[\d-]+$/.test(n);
const stampHTML=(d,t)=>{const x=DAY(d);return `<div class="stamp"><b>${d==0?'오늘':d==1?'어제':d<7?WK(d):(x.getMonth()+1)+'월 '+x.getDate()+'일'}</b> ${t24(t)}</div>`};
function chatHTML(c){const a=c.chat;let h='';
 if(!a.some(x=>x[0]=='day')){const ts=/:/.test(c.time)?'<b>오늘</b> '+t24(c.time):`<b>${c.time}</b>`;h+=`<div class="stamp">${ts}</div>`}
 a.forEach((x,j)=>{if(x[0]=='day'){h+=stampHTML(x[1],x[2]);return}
  if(x[0]=='stamp'){h+=x[1]=='읽음'?'<div class="rd">읽음</div>':`<div class="stamp">${x[1]}</div>`;return}
  const p=a[j-1],n=a[j+1];h+=`<div class="b ${x[0]}${!p||p[0]!=x[0]?' first':''}${!n||n[0]!=x[0]?' tail':''}">${x[1]}</div>`});
 const last=[...a].reverse().find(x=>x[0]=='you'||x[0]=='me');if(last&&last[0]=='me')h+=`<div class="rd">${c.sent?'전달됨':'읽음'}</div>`;return h}
const msgLast=c=>[...c.chat].reverse().find(x=>x[0]=='you'||x[0]=='me')[1].replace(/\n/g,' ');
const msgWhen=c=>{const m=[...c.chat].reverse().find(x=>x[0]=='day');return m?shortWhen(m[1],t24(m[2])):t24(c.time)};
const msgAv=(c,cls='')=>`<div class="av ${cls}">${isNum(c.name)?SIL:c.name[0]}${pfImg(c.name)}</div>`;
const msgRows=()=>C.map(c=>`<div class="row" data-chat="${c.id}"><i class="dot" style="${c.unread?'':'visibility:hidden'}"></i>${msgAv(c)}<div class="rb"><div class="t"><b>${c.name}</b><i>${msgWhen(c)}${chev}</i></div><p>${msgLast(c)}</p></div></div>`).join('');
function pageMsg(){
 const list=`<div class="page" id="p-list">${nav(gb('편집'),gb(sq,'round'))}<div class="scroll"><div class="big">메시지</div><div class="sbar">${mag}검색</div><div id="msg-rows">${msgRows()}</div></div></div>`;
 const chats=C.map(c=>`<div class="page right" id="p-chat${c.id}">${nav(backBtn('메시지','p-chat'+c.id)+`<div class="navc">${msgAv(c,'s')}<div class="nm">${c.name}<svg width="6" height="10" viewBox="0 0 8 13"><path d="M1.500 1.500l5 5-5 5" fill="none" stroke="currentColor" stroke-width="2.200" stroke-linecap="round"/></svg></div></div>`,gb('<svg viewBox="0 0 24 24"><rect x="3" y="7" width="12" height="10" rx="2.500"/><path d="M15 11l6-3v8l-6-3"/></svg>','round'),'tall')}<div class="scroll chat" style="padding:140px 14px 100px">${chatHTML(c)}</div><div class="inbar"><div class="plus"><svg width="16" height="16" viewBox="0 0 16 16" stroke="currentColor" stroke-width="2.200" stroke-linecap="round"><path d="M8 2v12M2 8h12"/></svg></div><div class="field"><input class="min" data-ci="${c.id}" placeholder="iMessage" autocomplete="off" enterkeyhint="send"><svg class="mic" width="16" height="20" viewBox="0 0 16 22" fill="none" stroke="currentColor" stroke-width="1.800" stroke-linecap="round"><rect x="5" y="1" width="6" height="12" rx="3"/><path d="M2 10a6 6 0 0012 0M8 16v4"/></svg><span class="snd" data-send="${c.id}"><svg width="14" height="16" viewBox="0 0 14 16" fill="none" stroke="#fff" stroke-width="2.400" stroke-linecap="round" stroke-linejoin="round"><path d="M7 14V2M2 6.500L7 2l5 4.500"/></svg></span></div></div></div>`).join('');
 return list+chats}
registerApp('msg',pageMsg);
/* 대화를 열면 읽음 처리: 목록의 파란 점, 홈 배지, 잠금화면 알림이 사라짐 */
function msgRead(id){const c=msgBy(id);if(!c)return;c.unread=0;const r=$('#msg-rows');if(r)r.innerHTML=msgRows();UN.paint();UN.notifOff('msg:'+c.name)}
const msgTop=c=>{C.splice(C.indexOf(c),1);C.unshift(c)};
/* 날짜가 바뀌었으면 구분선을 먼저 넣음 */
function msgDay(c){const m=[...c.chat].reverse().find(x=>x[0]=='day');if(!m||m[1]!==0)c.chat.push(['day',0,nowLabel()])}
document.addEventListener('click',e=>{const c=e.target.closest('[data-chat]');if(c){const id=+c.dataset.chat;show('p-chat'+id);msgRead(id);return}
 const s=e.target.closest('[data-send]');if(s)msgSend(+s.dataset.send)});
/* 보내기 (답장은 오지 않음). 보낸 대화는 목록 맨 위로 */
function msgSend(id){const inp=document.querySelector(`.min[data-ci="${id}"]`);if(!inp)return;const t=inp.value.trim();if(!t)return;
 const c=msgBy(id);msgDay(c);c.chat.push(['me',t]);c.time=nowLabel();c.sent=true;msgTop(c);inp.value='';inp.parentNode.classList.remove('has');
 const b=$('#p-chat'+id+' .chat');b.innerHTML=chatHTML(c);b.scrollTop=1e5;const r=$('#msg-rows');if(r)r.innerHTML=msgRows()}
document.addEventListener('input',e=>{if(e.target.classList.contains('min'))e.target.parentNode.classList.toggle('has',!!e.target.value.trim())});
document.addEventListener('keydown',e=>{if(e.key=='Enter'&&e.target.classList.contains('min')){e.preventDefault();msgSend(+e.target.dataset.ci)}});
/* 새 메시지가 도착함 (알림 기능에서 호출). 목록 맨 위로 올라가고, 지금 그 대화를 보고 있으면 true */
function msgReceive(name,text){const c=C.find(x=>x.name==name);if(!c)return false;msgDay(c);c.chat.push(['you',text]);c.time=nowLabel();c.sent=false;
 const pg=document.getElementById('p-chat'+c.id),seen=!!pg&&!pg.classList.contains('right')&&cur=='msg';
 if(pg){const b=pg.querySelector('.chat');b.innerHTML=chatHTML(c);if(seen)b.scrollTop=1e5}
 if(!seen)c.unread=(c.unread||0)+1;msgTop(c);const r=$('#msg-rows');if(r)r.innerHTML=msgRows();return seen}
