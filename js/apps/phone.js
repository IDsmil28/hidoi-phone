/* 전화 앱: 통화 기록 / 연락처 / 키패드 / 상세 (iOS 26 스타일)
   내용은 js/data/phone.js 에서 고칩니다 */
const PH=A.phone,CT=Object.fromEntries(PH.contacts.map(c=>[c.id,c]));
const phIni=n=>{const w=n.trim().split(/\s+/);return w.length>1?w[0][0]+w[1][0]:(w[0].length<=2?w[0]:w[0].slice(0,2))};
const SIL='<svg viewBox="0 0 24 24"><circle cx="12" cy="8" r="4.500"/><path d="M3.500 21.500c.5-5 4-7 8.500-7s8 2 8.500 7z"/></svg>';
const ARin='<svg viewBox="0 0 24 24"><path d="M17 7L7 17M7 17h8.500M7 17V8.500"/></svg>';
const ARout='<svg viewBox="0 0 24 24"><path d="M7 17L17 7M17 7H8.500M17 7v8.500"/></svg>';
const phKey=c=>c.who||c.num;
const phName=k=>CT[k]?CT[k].name:k;
const phSid=k=>String(k).replace(/[^A-Za-z0-9]/g,'_');
const phAv=(k,cls='')=>`<div class="av ${cls}">${CT[k]?phIni(CT[k].name)+pfImg(CT[k].name):SIL}</div>`;
function phTs(c){if(c.m!=null)return Date.now()-c.m*60000;const [h,mi]=c.t.split(':').map(Number),b=new Date();b.setHours(h,mi,0,0);return b.getTime()-c.d*864e5}
const phCalls=PH.calls.map(c=>Object.assign({},c,{k:phKey(c),ts:phTs(c)})).sort((a,b)=>b.ts-a.ts);
function phWhen(ts,full){
 const d=new Date(ts),n=new Date(),sd=x=>{const t=new Date(x);t.setHours(0,0,0,0);return t.getTime()};
 const diff=Math.round((sd(n)-sd(d))/864e5),hm=String(d.getHours()).padStart(2,'0')+':'+String(d.getMinutes()).padStart(2,'0');
 if(full)return (diff==0?'오늘':diff==1?'어제':`${d.getFullYear()}. ${d.getMonth()+1}. ${d.getDate()}.`)+' '+hm;
 return diff==0?hm:diff==1?'어제':diff<7?'일월화수목금토'[d.getDay()]+'요일':`${d.getFullYear()}. ${d.getMonth()+1}. ${d.getDate()}.`}
const phDur=s=>s>=3600?`${Math.floor(s/3600)}시간 ${Math.floor(s%3600/60)}분`:s>=60?`${Math.floor(s/60)}분 ${s%60}초`:`${s}초`;
const KIND={in:'수신 통화',out:'발신 통화',missed:'부재중 전화'};
const arrow=d=>d=='out'?ARout:ARin;
const CHO=['ㄱ','ㄱ','ㄴ','ㄷ','ㄷ','ㄹ','ㅁ','ㅂ','ㅂ','ㅅ','ㅅ','ㅇ','ㅈ','ㅈ','ㅊ','ㅋ','ㅌ','ㅍ','ㅎ'];
const cho=s=>{const c=s.charCodeAt(0)-0xAC00;return c>=0&&c<11172?CHO[Math.floor(c/588)]:(/[A-Za-z]/.test(s[0])?s[0].toUpperCase():'#')};
const IDX=['ㄱ','ㄴ','ㄷ','ㄹ','ㅁ','ㅂ','ㅅ','ㅇ','ㅈ','ㅊ','ㅋ','ㅌ','ㅍ','ㅎ','#'];
const PHT=['<circle cx="12" cy="12" r="8.500"/><path d="M12 7.500V12l3 2"/>','<circle cx="12" cy="12" r="9"/><circle cx="12" cy="10" r="3"/><path d="M6.500 18.500c1.500-3 9.500-3 11 0"/>','<circle cx="6.500" cy="5.500" r="1.400"/><circle cx="12" cy="5.500" r="1.400"/><circle cx="17.500" cy="5.500" r="1.400"/><circle cx="6.500" cy="11" r="1.400"/><circle cx="12" cy="11" r="1.400"/><circle cx="17.500" cy="11" r="1.400"/><circle cx="6.500" cy="16.500" r="1.400"/><circle cx="12" cy="16.500" r="1.400"/><circle cx="17.500" cy="16.500" r="1.400"/><circle cx="12" cy="21" r="1.400"/>'];
const FILT='<svg viewBox="0 0 24 24"><path d="M4 7h16M7 12h10M10 17h4"/></svg>';
const HS=`<svg viewBox="0 0 24 24">${HANDSET}</svg>`;

function phRows(list){
 /* 같은 사람 + 같은 종류가 연달아 있으면 (n)으로 묶음 */
 const g=[];list.forEach(c=>{const p=g[g.length-1];if(p&&p.k==c.k&&p.dir==c.dir)p.n++;else g.push(Object.assign({n:1},c))});
 return g.map(c=>`<div class="crow" data-pd="${c.k}">${phAv(c.k)}<div class="cb"><div style="min-width:0"><div class="cn${c.dir=='missed'?' m':''}">${phName(c.k)}${c.n>1?` (${c.n})`:''}</div><div class="cs">${arrow(c.dir)}${CT[c.k]?'휴대전화':'일본'}</div></div><div class="cr"><span class="ct">${phWhen(c.ts)}</span><span class="callb" data-dial>${HS}</span></div></div></div>`).join('')}

function phDetail(k){
 const logs=phCalls.filter(c=>c.k==k),num=CT[k]?CT[k].num:k,id='p-pd-'+phSid(k);
 const ACT=[['메시지','<path d="M12 4C7 4 3 7.200 3 11.200c0 2.200 1.200 4.100 3.100 5.400-.2 1.100-.7 2.100-1.500 3 1.600-.1 3-.7 4.100-1.500.8.200 1.600.3 2.300.3 5 0 9-3.200 9-7.200S17 4 12 4z"/>'],['통화',HANDSET],['영상 통화','<rect x="3" y="7" width="12" height="10" rx="2.500"/><path d="M15 11l6-3v8l-6-3"/>'],['메일','<rect x="3" y="6" width="18" height="12" rx="2.500"/><path d="M4 8l8 6 8-6"/>']];
 return `<div class="page gray right" id="${id}">${nav(backBtn('뒤로',id),gb('편집'))}<div class="scroll"><div class="cd">${phAv(k)}<h2>${phName(k)}</h2></div><div class="acts">${ACT.map(a=>`<div data-noop><svg viewBox="0 0 24 24">${a[1]}</svg>${a[0]}</div>`).join('')}</div><div class="card"><div class="kv"><small>${CT[k]?'휴대전화':'일본'}</small><b>${num}</b></div></div>${logs.length?`<div class="card">${logs.map(l=>`<div class="lg"><div><b class="${l.dir=='missed'?'m':''}">${arrow(l.dir)}${KIND[l.dir]}</b><small>${phWhen(l.ts,true)}</small></div><span>${l.s?phDur(l.s):''}</span></div>`).join('')}</div>`:''}</div></div>`}

function pagePhone(){
 const keys=[...new Set([...PH.contacts.map(c=>c.id),...phCalls.map(c=>c.k)])];
 const sorted=[...PH.contacts].sort((a,b)=>a.name.localeCompare(b.name,'ko'));
 let sec='',last='';
 sorted.forEach(c=>{const ch=cho(c.name);if(ch!=last){sec+=`<div class="sech" id="sec-${ch}">${ch}</div>`;last=ch}sec+=`<div class="ctr" data-pd="${c.id}"><div>${c.name}</div></div>`});
 const have=new Set(sorted.map(c=>cho(c.name)));
 const calls=`<div class="pview on" id="pv-calls"><div class="nav">${gb('편집','','data-noop')}<span class="nr">${gb(FILT,'round','id="phfilt"')}</span></div><div class="ntitle">통화</div><div class="scroll"><div id="l-all">${phRows(phCalls)}</div><div id="l-mis" style="display:none">${phRows(phCalls.filter(c=>c.dir=='missed'))}</div></div></div>`;
 const cont=`<div class="pview" id="pv-contacts"><div class="nav"><span></span><span class="nr">${gb(more,'round','data-noop')}</span></div><div class="scroll"><div class="big">연락처</div><div class="sbar">${mag}검색</div><div class="mycard" data-pd="__me">${phAv('__me')}<div><b>${CHAR.name}</b><small>내 카드</small></div></div>${sec}</div><div class="cidx">${IDX.map(x=>`<span data-idx="${x}" style="${have.has(x)?'':'opacity:.35'}">${x}</span>`).join('')}</div></div>`;
 const KEYS=[['1',''],['2','ABC'],['3','DEF'],['4','GHI'],['5','JKL'],['6','MNO'],['7','PQRS'],['8','TUV'],['9','WXYZ'],['*',''],['0','+'],['#','']];
 const pad=`<div class="pview" id="pv-keypad"><div class="kdisp" id="kdisp"><span id="knum"></span><small id="kname"></small></div><div class="kpad">${KEYS.map(k=>`<div class="kk" data-k="${k[0]}"><b>${k[0]}</b><small>${k[1]}</small></div>`).join('')}<div class="kk sp"></div><div class="kk call" data-noop><svg viewBox="0 0 24 24">${HANDSET}</svg></div><div class="kk del" id="kdel" style="visibility:hidden"><svg viewBox="0 0 24 24"><path d="M9 5h10a2 2 0 012 2v10a2 2 0 01-2 2H9l-6-7z"/><path d="M12.500 9.500l5 5M17.500 9.500l-5 5"/></svg></div></div></div>`;
 const tabs=`<div class="ftabs"><div class="ftp">${['통화','연락처','키패드'].map((t,i)=>`<div class="${i?'':'on'}" data-ptab="${i}"><svg viewBox="0 0 24 24">${PHT[i]}</svg>${t}</div>`).join('')}</div>${gb(magB,'round','data-noop')}</div>`;
 return `<div class="page" id="p-phone">${calls}${cont}${pad}${tabs}</div>`+keys.map(phDetail).join('')+phDetail('__me').replace(/<div class="card"><div class="kv">.*?<\/div><\/div>/,'')}
registerApp('phone',pagePhone,{onOpen(){UN.phoneSeen=true;UN.paint()}});
CT.__me={id:'__me',name:CHAR.name,num:''};

(function(){
 let num='';
 const view=i=>{$$('#p-phone .pview').forEach((v,j)=>v.classList.toggle('on',i==j));$$('[data-ptab]').forEach(t=>t.classList.toggle('on',+t.dataset.ptab==i))};
 const upd=()=>{const n=$('#knum');if(!n)return;n.textContent=num;const c=PH.contacts.find(x=>x.num.replace(/-/g,'')==num.replace(/-/g,''));$('#kname').textContent=c?c.name:'';$('#kdel').style.visibility=num?'visible':'hidden'};
 document.addEventListener('click',e=>{
  const t=e.target.closest('[data-ptab]');if(t)return view(+t.dataset.ptab);
  if(e.target.closest('#phfilt')){const f=$('#phfilt'),on=f.classList.toggle('on');f.classList.toggle('y',false);$('#l-all').style.display=on?'none':'';$('#l-mis').style.display=on?'':'none';return}
  if(e.target.closest('[data-dial],[data-noop]')){const el=e.target.closest('[data-dial],[data-noop]');shake(el);return}
  const k=e.target.closest('.kk[data-k]');if(k){if(num.length<14)num+=k.dataset.k;upd();return}
  if(e.target.closest('#kdel')){num=num.slice(0,-1);upd();return}
  const x=e.target.closest('[data-idx]');if(x){const el=document.getElementById('sec-'+x.dataset.idx);if(el)$('#pv-contacts .scroll').scrollTo({top:el.offsetTop-96,behavior:'smooth'});return}
  const p=e.target.closest('[data-pd]');if(p&&p.closest('#p-phone'))show('p-pd-'+phSid(p.dataset.pd))});
})();
