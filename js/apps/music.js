/* 음악 앱: 재생 화면 (버튼/바는 움직이지만 실제 소리는 나지 않음) */
const MI={
 star:'<svg viewBox="0 0 24 24"><path d="M12 3.500l2.600 5.400 5.900.8-4.300 4.100 1 5.800L12 16.800l-5.200 2.800 1-5.800L3.500 9.700l5.900-.8z"/></svg>',
 dots:'<svg viewBox="0 0 24 24"><circle cx="5" cy="12" r="1.700" fill="#fff" stroke="none"/><circle cx="12" cy="12" r="1.700" fill="#fff" stroke="none"/><circle cx="19" cy="12" r="1.700" fill="#fff" stroke="none"/></svg>',
 rw:'<svg viewBox="0 0 38 26"><path d="M19 3v20L3 13zM36 3v20L20 13z" stroke="#fff" stroke-width="3" stroke-linejoin="round"/></svg>',
 ff:'<svg viewBox="0 0 38 26"><path d="M19 3v20l16-10zM2 3v20l16-10z" stroke="#fff" stroke-width="3" stroke-linejoin="round"/></svg>',
 pause:'<svg viewBox="0 0 34 40"><rect x="1" y="1" width="10.500" height="38" rx="3"/><rect x="22.500" y="1" width="10.500" height="38" rx="3"/></svg>',
 play:'<svg viewBox="0 0 34 40"><path d="M6 5v30l26-15z" stroke="#fff" stroke-width="5" stroke-linejoin="round"/></svg>',
 vlo:'<svg viewBox="0 0 24 24"><path d="M3 9.500h4l5-4.500v14l-5-4.500H3z"/></svg>',
 vhi:'<svg viewBox="0 0 24 24"><path d="M2 9.500h4l5-4.500v14l-5-4.500H2z"/><path d="M14.500 9a4 4 0 010 6M17 6.500a8 8 0 010 11" fill="none" stroke="rgba(255,255,255,.55)" stroke-width="1.700" stroke-linecap="round"/></svg>',
 lyr:'<svg viewBox="0 0 24 24"><path d="M5 4h14a2 2 0 012 2v9a2 2 0 01-2 2h-6l-4 4v-4H5a2 2 0 01-2-2V6a2 2 0 012-2z"/><path d="M9 9.500h.01M15 9.500h.01" stroke-width="3"/></svg>',
 air:'<svg viewBox="0 0 24 24"><path d="M7.500 15.500a6.500 6.500 0 119 0M4.500 18a10.500 10.500 0 1115 0"/><path d="M12 14.500l4.500 5.500h-9z" fill="rgba(255,255,255,.62)"/></svg>',
 list:'<svg viewBox="0 0 24 24"><path d="M9 6h12M9 12h12M9 18h12"/><circle cx="4.500" cy="6" r="1"/><circle cx="4.500" cy="12" r="1"/><circle cx="4.500" cy="18" r="1"/></svg>'
};
function pageMusic(){
 return `<div class="page mp-page${PL.playing?'':' paused'}" id="p-music">
 <div class="mp-grab" data-back=""></div>
 <div class="mp-art"><img src="${PL.art}" alt="${PL.title}" draggable="false"></div>
 <div class="mp-t"><b>${PL.title}</b><span>${PL.artist}</span></div>
 <div class="mp-b like${PL.liked?' on':''}" id="mplike" data-mp="like">${MI.star}</div><div class="mp-b more" data-mp="noop">${MI.dots}</div>
 <div class="mp-bar pr" id="mpbar"><i id="mpf"></i></div>
 <div class="mp-time"><span id="mpl"></span><span id="mpr"></span></div>
 <div class="mp-ctl"><div class="rw" data-mp="rw">${MI.rw}</div><div class="pp" id="mppp" data-mp="pp"></div><div class="ff" data-mp="ff">${MI.ff}</div></div>
 <div class="mp-vi l">${MI.vlo}</div><div class="mp-bar vl" id="mpvbar"><i id="mpv"></i></div><div class="mp-vi r">${MI.vhi}</div>
 <div class="mp-bot"><div data-mp="noop">${MI.lyr}</div><div data-mp="noop">${MI.air}</div><div data-mp="noop">${MI.list}</div></div></div>`}
function mpSync(){
 const f=$('#mpf');if(!f)return;
 f.style.width=(PL.pos/PL.duration*100)+'%';$('#mpl').textContent=mmss(PL.pos);$('#mpr').textContent='−'+mmss(PL.duration-PL.pos);
 $('#mppp').innerHTML=PL.playing?MI.pause:MI.play;$('#p-music').classList.toggle('paused',!PL.playing);
 $('#mpv').style.width=(PL.vol*100)+'%';$('#mplike').classList.toggle('on',PL.liked)}
plSub(mpSync);
function mpBar(el,cb){
 const set=e=>{const r=el.getBoundingClientRect();cb(Math.min(1,Math.max(0,(e.clientX-r.left)/r.width)))};
 el.addEventListener('pointerdown',e=>{el.setPointerCapture(e.pointerId);set(e);el.onpointermove=set});
 el.addEventListener('pointerup',()=>{el.onpointermove=null})}
registerApp('music',pageMusic,{theme:'dark',onOpen(){
 mpBar($('#mpbar'),v=>plSet({pos:Math.round(v*PL.duration)}));
 mpBar($('#mpvbar'),v=>plSet({vol:v}));mpSync()}});
document.addEventListener('click',e=>{
 const t=e.target.closest('[data-mp]');if(!t)return;const k=t.dataset.mp;
 if(k=='pp')plSet({playing:!PL.playing});
 else if(k=='rw'||k=='ff')plSet({pos:0});
 else if(k=='like')plSet({liked:!PL.liked});
 else shake(t)});
