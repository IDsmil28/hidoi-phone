/* 공통 조각: 아이콘, 버튼, 상단 바, 날짜/시간 도구 */
const bc='<svg viewBox="0 0 12 20"><path d="M10 2L2 10l8 8" fill="none" stroke="currentColor" stroke-width="2.800" stroke-linecap="round" stroke-linejoin="round"/></svg>';
const chev='<svg width="8" height="13" viewBox="0 0 8 13"><path d="M1.500 1.500l5 5-5 5" fill="none" stroke="#c4c4c7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
const sq='<svg viewBox="0 0 24 24"><path d="M12 4H6a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2v-6"/><path d="M18.500 2.500a2.100 2.100 0 013 3L12 15l-4 1 1-4z"/></svg>';
const share='<svg viewBox="0 0 24 24"><path d="M12 15V3M8 7l4-4 4 4M6 11H5a1 1 0 00-1 1v8a1 1 0 001 1h14a1 1 0 001-1v-8a1 1 0 00-1-1h-1"/></svg>';
const more='<svg viewBox="0 0 24 24"><circle cx="5.500" cy="12" r="1.300" fill="currentColor"/><circle cx="12" cy="12" r="1.300" fill="currentColor"/><circle cx="18.500" cy="12" r="1.300" fill="currentColor"/></svg>';
const mag='<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.500" stroke-linecap="round"><circle cx="10.500" cy="10.500" r="6.500"/><path d="M16 16l5 5"/></svg>';
const magB='<svg viewBox="0 0 24 24"><circle cx="10.500" cy="10.500" r="6.500"/><path d="M16 16l5 5"/></svg>';
const HANDSET='<path d="M20 15.400c-1.200 0-2.400-.2-3.500-.6a1 1 0 00-1 .2l-1.600 2c-2.800-1.300-5.500-3.900-6.900-6.800l2-1.700c.3-.3.300-.7.200-1-.4-1.100-.6-2.300-.6-3.500 0-.5-.4-1-1-1H4.200C3.600 3 3 3.200 3 4c0 9.300 7.700 17 17 17 .7 0 1-.6 1-1.200v-3.400c0-.5-.4-1-1-1z"/>';
/* 버튼: gb('편집') 알약, gb(아이콘,'round') 동그란 버튼 */
const gb=(h,c='',a='')=>`<span class="gb ${c}" ${a}>${h}</span>`;
const nav=(l,r,c='')=>`<div class="nav ${c}">${l}<span class="nr">${r}</span></div>`;
const backBtn=(t,id,cls='')=>`<span class="gb round back ${cls}" data-back="${id}" aria-label="${t}">${bc}</span>`;
const show=id=>{const el=document.getElementById(id);el.classList.remove('right');const c=el.querySelector('.chat,.lbody');if(c)c.scrollTop=1e5};

/* 날짜/시간 도구 (n = 며칠 전) */
const DAY=n=>new Date(Date.now()-n*864e5);
const WK=n=>'일월화수목금토'[DAY(n).getDay()]+'요일';
const shortWhen=(d,t)=>d==0?t:d==1?'어제':d<7?WK(d):`${DAY(d).getMonth()+1}/${DAY(d).getDate()}`;
const fullDate=n=>{const x=DAY(n);return `${x.getFullYear()}.${String(x.getMonth()+1).padStart(2,'0')}.${String(x.getDate()).padStart(2,'0')} ${WK(n)}`};
/* '오후 6:20' → '18:20' (폰이 24시간제) */
const t24=s=>{const m=/(오전|오후)\s*(\d+):(\d+)/.exec(s||'');if(!m)return s;let h=+m[2]%12;if(m[1]=='오후')h+=12;return String(h).padStart(2,'0')+':'+m[3]};
/* 지금 시각을 '오후 6:20' 형식으로 */
const nowLabel=()=>{const d=new Date();let h=d.getHours();const ap=h<12?'오전':'오후';h=h%12||12;return ap+' '+h+':'+String(d.getMinutes()).padStart(2,'0')};
/* 프로필 사진: 파일이 있으면 글자 위에 덮어 보여줌 (png → jpg → jpeg → webp 순으로 찾음) */
const PF_EXT=['png','jpg','jpeg','webp'];
const pfImg=n=>{const f=CHAR.profiles&&CHAR.profiles[n];return f?`<img class="pf" src="img/profiles/${f}.png" data-pf="${f}" data-e="0" alt="" draggable="false" onerror="pfErr(this)">`:''};
function pfErr(i){const k=+i.dataset.e+1;if(k>=PF_EXT.length){i.remove();return}i.dataset.e=k;i.src='img/profiles/'+i.dataset.pf+'.'+PF_EXT[k]}
