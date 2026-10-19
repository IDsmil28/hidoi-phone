/* 홈 화면: 위젯(캘린더, 음악), 앱 아이콘 배치, 잠금화면 위젯(날씨, 배터리) */
function wCalendar(){
 const d=new Date(),y=d.getFullYear(),m=d.getMonth(),today=d.getDate();
 const first=new Date(y,m,1).getDay(),days=new Date(y,m+1,0).getDate();
 let cells='<i></i>'.repeat(first);
 for(let i=1;i<=days;i++){const w=(first+i-1)%7;cells+=`<i class="${w==0||w==6?'we':''}${i==today?' td':''}">${i}</i>`}
 const head=[...'일월화수목금토'].map((c,i)=>`<i class="${i==0||i==6?'we':''}">${c}</i>`).join('');
 return `<div class="app wg" data-k="calendar"><div class="wbox wcal"><div class="cm">${m+1}월</div><div class="cg ch">${head}</div><div class="cg cd">${cells}</div></div><span>캘린더</span></div>`}

const NOTE_SVG='<svg viewBox="0 0 24 24" fill="#fa2d48" aria-hidden="true"><path d="M8 5.6 20 3v2.7L8 8.3z"/><rect x="8" y="5.6" width="2" height="12"/><rect x="18" y="3" width="2" height="12"/><ellipse cx="6.700" cy="17.600" rx="3.300" ry="2.700"/><ellipse cx="16.700" cy="15" rx="3.300" ry="2.700"/></svg>';
const PLAY_SVG='<svg viewBox="0 0 12 14" fill="#fff" aria-hidden="true"><path d="M1 1.200v11.600a.8.8 0 001.200.7l9.600-5.800a.8.8 0 000-1.400L2.200.5A.8.8 0 001 1.200z"/></svg>';
const PAUSE_SVG='<svg viewBox="0 0 12 14" fill="#fff" aria-hidden="true"><rect x="1" y="1" width="3.600" height="12" rx="1"/><rect x="7.400" y="1" width="3.600" height="12" rx="1"/></svg>';
function wMusic(){
 return `<div class="app wg" data-k="music"><div class="wbox wmus">
  <div class="mt"><img class="mart" src="${PL.art}" alt="앨범 커버">${NOTE_SVG}</div>
  <div class="mk">최근 재생</div>
  <div class="mn">${PL.title}</div>
  <div class="ma">${PL.artist}</div>
  <div class="mp" id="wmp"></div>
 </div><span>음악</span></div>`}
function syncWmp(){const e=$('#wmp');if(e)e.innerHTML=(PL.playing?PAUSE_SVG:PLAY_SVG)+(PL.playing?'일시 정지':'재생')}

/* 잠금화면 위젯 */
function lockWidgets(){
 const B=SETTINGS.battery;
 const sun='<svg class="wx" viewBox="0 0 32 24" aria-hidden="true"><g stroke="#fff" stroke-width="1.700" stroke-linecap="round"><path d="M20 2.500v2.200M27.200 5.300l-1.500 1.500M30 12h-2.200M12.800 5.300l1.500 1.500"/></g><circle cx="20" cy="12" r="4.600" fill="#fff"/><path d="M8.500 22.500h13a4.500 4.500 0 00.4-9A6.300 6.300 0 0010 14.800a3.900 3.900 0 00-1.500 7.700z" fill="#fff" stroke="#000" stroke-opacity=".25" stroke-width="1"/></svg>';
 const hours=Math.round(B/100*18);
 return `<div class="lw"><div class="l1">${sun}<b>30°</b></div><div>부분적으로 흐림</div><div class="dim">최고:30° 최저:20°</div></div>
 <div class="lw lbat"><div class="bar" role="img" aria-label="배터리 ${B}%"><i style="height:${B}%"></i></div><div><div class="l1"><b>iPhone ${B}%</b></div><div>배터리</div><div class="dim">약 ${hours}시간 사용 가능</div></div></div>`}

/* 배치: 위젯 2개 + 아이콘 (메시지는 독에만 있음) */
$('#grid').innerHTML=wCalendar()+wMusic()+['line','photos','notes','safari','camera','settings','youtube','instagram','discord','hq','x'].map(k=>mk(k)).join('');
$('#lwg').innerHTML=lockWidgets();
$('#dock').innerHTML=['phone','safari','msg','music'].map(k=>mk(k,0)).join('');
plSub(syncWmp);syncWmp();
/* 위젯의 재생 버튼은 앱을 열지 않고 재생/일시정지만 */
$('#grid').addEventListener('click',e=>{if(e.target.closest('#wmp')){e.stopPropagation();plSet({playing:!PL.playing})}});
