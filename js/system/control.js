/* 제어 센터: 오른쪽 위에서 아래로 쓸어내리면 열림 */
const CI={
 air:'<path d="M21 15.500l-8-4.500V5.500a1.500 1.500 0 00-3 0V11l-8 4.500V18l8-2.200V19l-2.500 1.800V22.500l4-1 4 1v-1.700L13 19v-3.200l8 2.200z" fill="currentColor" stroke="none"/>',
 cell:'<path d="M4 20v-3M9 20v-6M14 20V9M19 20V4"/>',
 wifi:'<path d="M2.500 9a14 14 0 0119 0M5.500 12.500a9.500 9.500 0 0113 0M8.700 16a5 5 0 016.600 0"/><circle cx="12" cy="19.300" r="1" fill="currentColor" stroke="none"/>',
 bt:'<path d="M7 7.500l10 9-5 4.500V3l5 4.500-10 9"/>',
 lockrot:'<rect x="6" y="3" width="12" height="18" rx="3"/><path d="M12 8.500v3M10.500 11.500h3"/>',
 mirror:'<rect x="3" y="5" width="18" height="12" rx="2.500"/><path d="M9 21h6M12 17v4"/>',
 moon:'<path d="M20 14.500A8.500 8.500 0 019.500 4 8.500 8.500 0 1020 14.500z"/>',
 sun:'<circle cx="12" cy="12" r="4"/><path d="M12 2.500v2.500M12 19v2.500M2.500 12H5M19 12h2.500M5.300 5.300l1.800 1.800M16.900 16.900l1.800 1.800M5.300 18.700l1.800-1.800M16.900 7.100l1.800-1.800"/>',
 spk:'<path d="M4 9.500h3.500L12 5.500v13l-4.500-4H4z"/><path d="M15.500 9a4 4 0 010 6M18 6.500a8 8 0 010 11"/>',
 torch:'<path d="M8 2.500h8l-1.500 6h-5zM9 9h6l.5 3c0 1-.8 1.500-1.500 2v7a2 2 0 01-4 0v-7c-.7-.5-1.500-1-1.500-2z"/>',
 timer:'<circle cx="12" cy="13.500" r="7.500"/><path d="M12 9.500v4l2.500 1.500M10 2.500h4"/>',
 calc:'<rect x="5" y="3" width="14" height="18" rx="3"/><path d="M8.500 7.500h7M9 12h.01M12 12h.01M15 12h.01M9 16h.01M12 16h.01M15 16h.01"/>',
 cam:'<path d="M4 8h3l1.500-2.500h7L17 8h3v11H4z"/><circle cx="12" cy="13.500" r="3.500"/>',
 half:'<circle cx="12" cy="12" r="8.500"/><path d="M12 3.500v17A8.500 8.500 0 0112 3.500z" fill="currentColor"/>',
 batt:'<rect x="3" y="7.500" width="16" height="9" rx="2.500"/><path d="M21.500 10.500v3M11 9.500l-2 3h4l-2 3"/>',
 rec:'<circle cx="12" cy="12" r="8.500"/><circle cx="12" cy="12" r="3.500" fill="currentColor"/>',
 qr:'<path d="M4 8V5a1 1 0 011-1h3M16 4h3a1 1 0 011 1v3M20 16v3a1 1 0 01-1 1h-3M8 20H5a1 1 0 01-1-1v-3M8 8h3v3H8zM13 13h3v3h-3z"/>'
};
const ci=k=>`<svg viewBox="0 0 24 24">${CI[k]}</svg>`;
const PLAYB='<svg viewBox="0 0 24 24"><path d="M7 4.500v15a1 1 0 001.500.9l12-7.500a1 1 0 000-1.700l-12-7.500A1 1 0 007 4.500z"/></svg>';
const PAUSEB='<svg viewBox="0 0 24 24"><rect x="5.500" y="4" width="4.500" height="16" rx="1.200"/><rect x="14" y="4" width="4.500" height="16" rx="1.200"/></svg>';
const RWB='<svg viewBox="0 0 24 24"><path d="M11 6.500v11L2.500 12zM21 6.500v11L12.500 12z"/></svg>';
const FFB='<svg viewBox="0 0 24 24"><path d="M13 6.500v11l8.500-5.500zM3 6.500v11L11.500 12z"/></svg>';
$('#cc').innerHTML=`<div class="ccg">
 <div class="cct c22 conn">
  <div class="cb2 air" data-cc="air">${ci('air')}</div><div class="cb2 cell on" data-cc="tog">${ci('cell')}</div>
  <div class="cb2 on" data-cc="tog">${ci('wifi')}</div><div class="cb2 on" data-cc="tog">${ci('bt')}</div></div>
 <div class="cct c22 media">
  <div class="mtop"><img src="${PL.art}" alt=""><div style="min-width:0"><b>${PL.title}</b><small>${PL.artist}</small></div></div>
  <div class="mbar"><i id="ccbar"></i></div>
  <div class="mctl"><span data-cc="rw">${RWB}</span><span data-cc="pp" id="ccpp"></span><span data-cc="ff">${FFB}</span></div></div>
 <div class="cct" data-cc="tog">${ci('lockrot')}</div>
 <div class="cct" data-cc="noop">${ci('mirror')}</div>
 <div class="cct c12 sl2" id="ccbri"><i style="height:70%"></i>${ci('sun')}</div>
 <div class="cct c12 sl2" id="ccvol"><i style="height:${Math.round(PL.vol*100)}%"></i>${ci('spk')}</div>
 <div class="cct c21 focus" data-cc="tog">${ci('moon')}방해 금지 모드</div>
 <div class="cct" id="ccflash" data-cc="flash">${ci('torch')}</div>
 <div class="cct" data-cc="noop">${ci('timer')}</div>
 <div class="cct" data-cc="noop">${ci('calc')}</div>
 <div class="cct" data-cc="cam">${ci('cam')}</div>
 <div class="cct" id="ccdark" data-cc="dark">${ci('half')}</div>
 <div class="cct" data-cc="lp">${ci('batt')}</div>
 <div class="cct" data-cc="noop">${ci('rec')}</div>
 <div class="cct" data-cc="noop">${ci('qr')}</div>
</div>`;
const ccOpen=()=>cc.classList.contains('open');
function openCC(){if(ccOpen())return;$('#ccdark').classList.toggle('on',phone.classList.contains('dark'));cc.classList.add('open');syncInk()}
function closeCC(){cc.classList.remove('open');syncInk()}
function syncCC(){const pp=$('#ccpp');if(pp)pp.innerHTML=PL.playing?PAUSEB:PLAYB;const b=$('#ccbar');if(b)b.style.width=(PL.pos/PL.duration*100)+'%'}
plSub(syncCC);syncCC();
const shake=el=>el.animate([{transform:'translateX(-4px)'},{transform:'translateX(4px)'},{transform:'none'}],{duration:200});
cc.addEventListener('click',e=>{
 if(e.target===cc||e.target.classList.contains('ccg')){closeCC();return}
 const t=e.target.closest('[data-cc]');if(!t)return;
 const k=t.dataset.cc,box=t.closest('.cct,.cb2')||t;
 if(k=='tog'||k=='lp'||k=='dark'||k=='flash'||k=='air')box.classList.toggle('on');
 if(k=='air')phone.classList.toggle('air',box.classList.contains('on'));
 if(k=='lp')phone.classList.toggle('lp',box.classList.contains('on'));
 if(k=='dark')setDark(box.classList.contains('on'));
 if(k=='flash')setFlash(box.classList.contains('on'));
 if(k=='pp')plSet({playing:!PL.playing});
 if(k=='rw'||k=='ff')plSet({pos:0});
 if(k=='cam'){closeCC();shake($('#qcam'))}
 if(k=='noop')shake(box)});
/* 슬라이더 (밝기는 화면이 실제로 어두워짐) */
function slider(el,cb){
 const set=e=>{const r=el.getBoundingClientRect(),v=Math.min(1,Math.max(0,1-(e.clientY-r.top)/r.height));el.firstElementChild.style.height=(v*100)+'%';cb(v)};
 el.addEventListener('pointerdown',e=>{el.setPointerCapture(e.pointerId);set(e);el.onpointermove=set});
 el.addEventListener('pointerup',()=>{el.onpointermove=null})}
slider($('#ccbri'),v=>{$('#dim').style.opacity=((1-Math.max(v,.15))*.55).toFixed(2)});
slider($('#ccvol'),v=>plSet({vol:v}));
/* 위로 쓸어올려서 닫기 */
let cy=null;
cc.addEventListener('pointerdown',e=>{cy=e.target.closest('.sl2')?null:e.clientY});
addEventListener('pointerup',e=>{if(cy!==null&&cy-e.clientY>50)closeCC();cy=null});
