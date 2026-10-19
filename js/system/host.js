/* 앱 열고 닫기 / 상태바 색 / 테마 / 화면 크기 맞춤 */
let cur=null;
const isDark=()=>phone.classList.contains('dark');
const appOpen=()=>app.classList.contains('open');
/* 지금 보이는 앱 화면이 밝은지 → 상태바 글자색 결정 */
function effLight(){if(!cur)return false;const t=APPOPT[cur].theme;return t==='light'||(t!=='dark'&&!isDark())}
function syncInk(){const ink=!isLocked()&&appOpen()&&!ccOpen()&&effLight();stat.classList.toggle('ink',ink);hbar.classList.toggle('ink',ink)}
function setDark(v){phone.classList.toggle('dark',v);syncInk()}

function openApp(k,el){
 if(!APPS[k]){shake((el&&el.animate)?el:home);return}
 const o=APPOPT[k],r=el.getBoundingClientRect(),p=phone.getBoundingClientRect(),s=p.width/phone.offsetWidth;
 app.style.transformOrigin=`${(r.left+r.width/2-p.left)/s}px ${(r.top+r.height/2-p.top)/s}px`;
 app.classList.toggle('fl',o.theme==='light');app.classList.toggle('fd',o.theme==='dark');
 cur=k;app.innerHTML=APPS[k]();
 app.querySelectorAll('.chat,.lbody').forEach(e=>e.scrollTop=1e5);
 if(o.onOpen)o.onOpen();
 app.classList.add('open');syncInk()}
function goHome(){app.classList.remove('open');cur=null;syncInk()}

/* 홈의 앱 아이콘 / 뒤로 가기 버튼 */
document.addEventListener('click',e=>{
 const a=e.target.closest('.app');
 if(a&&!appOpen()&&!isLocked()){openApp(a.dataset.k,a.querySelector('.icon,.wbox'));return}
 const b=e.target.closest('[data-back]');
 if(b){if(b.dataset.back)document.getElementById(b.dataset.back).classList.add('right');else goHome()}
});

/* 화면 크기에 맞게 */
function fit(){device.style.transform=innerWidth<=500?'':`scale(${Math.min(1,(innerHeight-30)/870)})`}
fit();addEventListener('resize',fit);
