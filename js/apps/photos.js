/* 사진 앱 (iOS 26 스타일). 내 사진은 js/data/photos.js 에 파일 이름을 적으면 나타남 */
const PHO=A.photos;
function phoItems(){
 const real=PHO.files.map((f,i)=>{const o=typeof f=='string'?{src:f}:f;const src=/^(https?:|img\/|\/)/.test(o.src)?o.src:'img/photos/'+o.src;return Object.assign({},o,{src,i})});
 if(real.length)return real;
 return Array.from({length:18},(_,i)=>({bg:`linear-gradient(${135+i*20}deg,${PHO.placeholders[i%PHO.placeholders.length]},#111)`,i,ph:true}))}
const phoTile=(it,idx)=>`<div class="pt" data-photo="${idx}" style="${it.bg?'background:'+it.bg:''}">${it.src?`<img src="${it.src}" alt="" loading="lazy" draggable="false" onerror="this.parentNode.style.background='#26262a';this.remove()">`:''}${it.fav?'<svg class="fv" viewBox="0 0 24 24"><path d="M12 20.500s-8.500-5.200-8.500-11A4.800 4.800 0 0112 6.800 4.800 4.800 0 0120.500 9.500c0 5.800-8.500 11-8.500 11z"/></svg>':''}</div>`;
const phoDate=it=>{if(!it.date)return ['최근 항목',''];const d=new Date(String(it.date).replace(' ','T'));if(isNaN(d))return ['최근 항목',''];return [`${d.getMonth()+1}월 ${d.getDate()}일`,String(d.getHours()).padStart(2,'0')+':'+String(d.getMinutes()).padStart(2,'0')]};
const PHOI=['<rect x="3" y="4" width="18" height="16" rx="3"/><circle cx="9" cy="10" r="1.800"/><path d="M4 18l5-5 4 4 3-3 4 4"/>','<path d="M3 7a2 2 0 012-2h5l2 2h7a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>'];
function pagePhotos(){
 const L=phoItems(),favs=L.filter(x=>x.fav);
 const grid=`<div class="pview2 on" id="pho-lib"><div class="scroll" style="padding-top:104px"><div class="pg">${L.map(phoTile).join('')}</div></div><div class="phh"><h1>보관함</h1><span class="nr">${gb('선택')}${gb(more,'round')}</span></div><div class="pseg"><span>연도</span><span>월</span><span class="on">전체</span></div></div>`;
 const cover=x=>x&&x.src?`<img src="${x.src}" alt="" onerror="this.remove()">`:'';
 const col=`<div class="pview2" id="pho-col"><div class="scroll" style="padding-top:64px"><div class="big" style="padding-top:44px">컬렉션</div><div class="albs"><div class="alb"><div class="cv" style="${L[0]&&L[0].bg?'background:'+L[0].bg:''}">${cover(L[0])}</div><b>최근 항목</b><small>${PHO.files.length||0}</small></div><div class="alb"><div class="cv" style="${favs[0]&&favs[0].bg?'background:'+favs[0].bg:''}">${cover(favs[0])}</div><b>즐겨찾는 항목</b><small>${favs.length}</small></div></div></div></div>`;
 const tabs=`<div class="ftabs"><div class="ftp">${['보관함','컬렉션'].map((t,i)=>`<div class="${i?'':'on'}" data-photab="${i}"><svg viewBox="0 0 24 24">${PHOI[i]}</svg>${t}</div>`).join('')}</div>${gb(magB,'round','data-noop')}</div>`;
 const viewer=`<div class="page right vwr" id="p-pviewer"><div class="vstrip" id="pvstrip">${L.map(it=>`<div class="vs" style="${it.bg?'background:'+it.bg:''}">${it.src?`<img src="${it.src}" alt="" draggable="false">`:''}</div>`).join('')}</div>${nav(backBtn('보관함','p-pviewer'),'')}<div class="ntitle" id="pvt"></div><div class="vbar">${gb(share,'round')}${gb('<svg viewBox="0 0 24 24"><path d="M12 20.500s-8.500-5.200-8.500-11A4.800 4.800 0 0112 6.800 4.800 4.800 0 0120.500 9.500c0 5.800-8.500 11-8.500 11z"/></svg>','round')}${gb('<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M12 11v6M12 7.500v.01"/></svg>','round')}${gb('<svg viewBox="0 0 24 24"><path d="M5 7h14M10 7V4.500h4V7M7 7l1 13h8l1-13"/></svg>','round')}</div></div>`;
 return `<div class="page" id="p-photos">${grid}${col}${tabs}</div>`+viewer}
registerApp('photos',pagePhotos);
(function(){
 const setT=()=>{const s=$('#pvstrip');if(!s)return;const L=phoItems(),i=Math.min(L.length-1,Math.round(s.scrollLeft/s.clientWidth)),[a,b]=phoDate(L[i]);$('#pvt').innerHTML=`${a}${b?`<small>${b}</small>`:''}`};
 document.addEventListener('scroll',e=>{if(e.target.id=='pvstrip')setT()},true);
 document.addEventListener('click',e=>{
  const t=e.target.closest('[data-photab]');
  if(t){const i=+t.dataset.photab;$$('[data-photab]').forEach(x=>x.classList.toggle('on',x===t));$('#pho-lib').classList.toggle('on',i==0);$('#pho-col').classList.toggle('on',i==1);$$('#app,#app .page,#phone').forEach(x=>{x.scrollLeft=0});return}
  const p=e.target.closest('[data-photo]');
  if(p){const s=$('#pvstrip');show('p-pviewer');s.scrollLeft=+p.dataset.photo*s.clientWidth;setT()}});
})();
