/* LINE 앱: 홈(친구) / 톡(대화 목록) / 대화방 */
const LN=A.line;
const lnIni=n=>n.split(' ').pop()[0];
const lnCol=n=>{let h=0;for(const c of n)h=(h*31+c.charCodeAt(0))%360;return `linear-gradient(135deg,hsl(${h} 32% 64%),hsl(${(h+28)%360} 34% 48%))`};
const lnAv=(n,s=38)=>`<div class="lav" style="width:${s}px;height:${s}px;font-size:${Math.round(s*.42)}px;background:${lnCol(n)}">${lnIni(n)}${pfImg(n)}</div>`;
const lnGrp=(g,name)=>`<div class="lgrp">${g.slice(0,4).map(m=>`<i style="background:${lnCol(m)}"></i>`).join('')}${pfImg(name)}</div>`;
const lnTxt=m=>m[1].startsWith('[s]')?'스티커를 보냈습니다.':m[1];
const LI={
 search:'<circle cx="11" cy="11" r="6.500"/><path d="M16 16l5 5"/>',
 add:'<path d="M12 4C7 4 3 7.200 3 11.200c0 2.200 1.200 4.100 3.100 5.400-.2 1.100-.7 2.100-1.500 3 1.600-.1 3-.7 4.100-1.500.8.200 1.600.3 2.300.3 5 0 9-3.200 9-7.200S17 4 12 4z"/><path d="M12 8.500v5M9.500 11h5"/>',
 gear:'<circle cx="12" cy="12" r="3"/><path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.600 5.600l2.100 2.100M16.300 16.300l2.100 2.100M5.600 18.400l2.100-2.100M16.300 7.700l2.100-2.100"/>',
 call:'<path d="M20 15.400c-1.200 0-2.400-.2-3.500-.6a1 1 0 00-1 .2l-1.600 2c-2.800-1.300-5.500-3.900-6.900-6.800l2-1.700c.3-.3.300-.7.200-1-.4-1.100-.6-2.300-.6-3.500 0-.5-.4-1-1-1H4.200C3.600 3 3 3.200 3 4c0 9.300 7.700 17 17 17 .7 0 1-.6 1-1.200v-3.400c0-.5-.4-1-1-1z"/>',
 menu:'<path d="M4 7h16M4 12h16M4 17h16"/>',
 plus:'<circle cx="12" cy="12" r="9"/><path d="M12 8v8M8 12h8"/>',
 photo:'<rect x="3" y="5" width="18" height="14" rx="3"/><circle cx="9" cy="10.500" r="1.800"/><path d="M4 17l5-4.500 4 3.500 3-2.500 4 3.500"/>',
 mic:'<rect x="9" y="3" width="6" height="12" rx="3"/><path d="M5.500 11a6.500 6.500 0 0013 0M12 18v3"/>',
 send:'<path d="M4 12l16-8-6 16-2.500-6.500z"/>',
 smile:'<circle cx="12" cy="12" r="9"/><path d="M8 14c1 2 7 2 8 0"/><circle cx="9" cy="10" r=".7"/><circle cx="15" cy="10" r=".7"/>'
};
const lsvg=k=>`<svg viewBox="0 0 24 24">${LI[k]}</svg>`;
const LTABS=['홈','대화','VOOM','뉴스','월렛'];
const LTI=['<path d="M4 11l8-7 8 7v9H4z"/>','<path d="M12 4C7 4 3 7.200 3 11.200c0 2.200 1.200 4.100 3.100 5.400-.2 1.100-.7 2.100-1.500 3 1.600-.1 3-.7 4.100-1.500.8.200 1.600.3 2.300.3 5 0 9-3.200 9-7.200S17 4 12 4z"/>','<circle cx="12" cy="12" r="9"/><path d="M10 8.500l5 3.500-5 3.500z"/>','<rect x="4" y="4" width="16" height="16" rx="3"/><path d="M8 9h8M8 13h8M8 17h4"/>','<rect x="3" y="6" width="18" height="13" rx="3"/><path d="M3 10h18M16 14.500h2"/>'];

function lnChat(c){
 const g=!!c.group,M=c.msgs;let h='',pd=null;
 M.forEach((m,j)=>{
  const [w,t,d,tm]=m,p=M[j-1],n=M[j+1];
  if(d!==pd){h+=`<div class="lsys">${fullDate(d)}</div>`;pd=d}
  if(w=='sys'){h+=`<div class="lsys">${t}</div>`;return}
  const first=!p||p[0]!=w||p[2]!=d,last=!n||n[0]!=w||n[3]!=tm||n[2]!=d;
  const body=t.startsWith('[s]')?`<div class="lstk">${t.slice(3)}</div>`:`<div class="lbub">${t}</div>`;
  if(w=='me')h+=`<div class="lrow me${first?' first':''}">${last?`<div class="lmeta">${m[4]?'':'읽음'+(g?' '+Math.max(1,c.group.length-1):'')+'<br>'}${t24(tm)}</div>`:''}${body}</div>`;
  else h+=`<div class="lrow you${first?' first':''}">${first?lnAv(w):'<div class="lav sp"></div>'}<div class="lcol">${g&&first?`<div class="lname">${w}</div>`:''}<div class="lline">${body}${last?`<div class="lmeta">${t24(tm)}</div>`:''}</div></div></div>`;
 });
 return h}

const lnBy=id=>LN.chats.find(c=>c.id==id);
const lnRows=()=>LN.chats.map(c=>{const m=c.msgs[c.msgs.length-1];
 return `<div class="lcrow" data-lchat="${c.id}">${c.group?lnGrp(c.group,c.name):lnAv(c.name,48)}<div class="lcb"><div class="lct"><b>${c.name}${c.group?`<span> ${c.group.length+1}</span>`:''}</b><i>${shortWhen(m[2],t24(m[3]))}</i></div><div class="lcm"><p>${m[0]=='me'?'':(c.group?m[0]+': ':'')}${lnTxt(m)}</p>${c.unread?`<em>${c.unread}</em>`:''}</div></div></div>`}).join('');
function pageLine(){
 const unread=sumUn(LN.chats);
 const srch=`<div class="lsrch">${lsvg('search')}검색</div>`;
 const homeV=`<div class="lview" id="ln-home" style="display:none"><div class="lnav"><span class="lt">홈</span><span class="lic">${lsvg('search')}${lsvg('gear')}</span></div><div class="scroll lsc">${srch}<div class="lprof">${lnAv(CHAR.name,56)}<div><b>${CHAR.name}</b></div></div><div class="lfh">친구 ${LN.friends.length}</div>${LN.friends.map(f=>`<div class="lfr">${lnAv(f.n,44)}<div><b>${f.n}</b>${f.s?`<small>${f.s}</small>`:''}</div></div>`).join('')}</div></div>`;
 const talkV=`<div class="lview" id="ln-talk"><div class="lnav"><span class="lt">대화</span><span class="lic">${lsvg('search')}${lsvg('add')}${lsvg('gear')}</span></div><div class="scroll lsc">${srch}<div id="ln-rows">${lnRows()}</div></div></div>`;
 const tabs=`<div class="ltabs">${LTABS.map((t,i)=>`<div class="${i==1?'on':''}" data-ltab="${i}"><svg viewBox="0 0 24 24">${LTI[i]}</svg>${t}${i==1?`<em class="lbadge" id="ln-badge"${unread?'':' style="display:none"'}>${unread}</em>`:''}</div>`).join('')}</div>`;
 const chats=LN.chats.map(c=>`<div class="page right" id="p-lchat${c.id}"><div class="lh"><span class="lback" data-back="p-lchat${c.id}">${bc}<em class="bn"${unread?'':' style="display:none"'}>${unread}</em></span><div class="ltitle"><span>${c.name}</span>${c.group?`<small>${c.group.length+1}</small>`:''}</div><span class="lic">${lsvg('search')}${lsvg('call')}${lsvg('menu')}</span></div><div class="lbody">${lnChat(c)}</div><div class="linbar">${lsvg('plus')}${lsvg('photo')}<div class="lfield"><input class="lin" data-ci="${c.id}" autocomplete="off" enterkeyhint="send">${lsvg('smile')}</div><span class="lmic">${lsvg('mic')}</span><span class="lsnd" data-lsend="${c.id}">${lsvg('send')}</span></div></div>`).join('');
 return `<div class="page" id="p-line">${homeV}${talkV}${tabs}</div>`+chats}
registerApp('line',pageLine,{theme:'light'});
/* 읽지 않은 숫자(탭 배지, 뒤로 가기 옆 숫자, 대화 목록)를 다시 그림 */
function lnPaint(){const n=sumUn(LN.chats),b=$('#ln-badge');if(b){b.textContent=n;b.style.display=n?'':'none'}
 document.querySelectorAll('.lback .bn').forEach(e=>{e.textContent=n;e.style.display=n?'':'none'});
 const r=$('#ln-rows');if(r)r.innerHTML=lnRows()}
/* 대화방을 열면 읽음 처리 */
function lnRead(id){const c=lnBy(id);if(!c)return;c.unread=0;lnPaint();UN.paint();UN.notifOff('line:'+c.name)}
const lnTop=c=>{LN.chats.splice(LN.chats.indexOf(c),1);LN.chats.unshift(c)};
function lnSend(i){const inp=document.querySelector(`.lin[data-ci="${i}"]`);if(!inp)return;const t=inp.value.trim();if(!t)return;
 const c=lnBy(i),m=['me',t,0,nowLabel(),1];c.msgs.push(m);lnTop(c);inp.value='';inp.closest('.linbar').classList.remove('has');
 const b=$('#p-lchat'+i+' .lbody');b.innerHTML=lnChat(c);b.scrollTop=1e5;lnPaint();
 setTimeout(()=>{m[4]=0;const pg=document.getElementById('p-lchat'+i);if(pg){const bb=pg.querySelector('.lbody'),st=bb.scrollTop;bb.innerHTML=lnChat(c);bb.scrollTop=st}},1800)}
/* 새 메시지가 도착함 (알림 기능에서 호출). from = 보낸 사람, chat = 대화방 이름(생략하면 보낸 사람 이름) */
function lnReceive(from,text,chat){const c=LN.chats.find(x=>x.name==(chat||from));if(!c)return false;const i=c.id;c.msgs.push([from,text,0,nowLabel()]);lnTop(c);
 const pg=document.getElementById('p-lchat'+i),seen=!!pg&&!pg.classList.contains('right')&&cur=='line';
 if(pg){const b=pg.querySelector('.lbody');b.innerHTML=lnChat(c);if(seen)b.scrollTop=1e5}
 if(!seen)c.unread=(c.unread||0)+1;lnPaint();return seen}
document.addEventListener('click',e=>{
 const t=e.target.closest('[data-ltab]');
 if(t){const i=+t.dataset.ltab;if(i>1)return;document.querySelectorAll('[data-ltab]').forEach(x=>x.classList.toggle('on',x===t));$('#ln-home').style.display=i==0?'':'none';$('#ln-talk').style.display=i==1?'':'none';return}
 const s=e.target.closest('[data-lsend]');if(s){lnSend(+s.dataset.lsend);return}
 const c=e.target.closest('[data-lchat]');if(c){const i=+c.dataset.lchat;show('p-lchat'+i);lnRead(i)}});
document.addEventListener('input',e=>{if(e.target.classList.contains('lin'))e.target.closest('.linbar').classList.toggle('has',!!e.target.value.trim())});
document.addEventListener('keydown',e=>{if(e.key=='Enter'&&e.target.classList.contains('lin')){e.preventDefault();lnSend(+e.target.dataset.ci)}});
