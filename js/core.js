/* 공통 변수와 앱 등록소 */
const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
const device=$('#device'),phone=$('#phone'),lock=$('#lock'),home=$('#home'),app=$('#app'),hbar=$('#hbar'),stat=$('#status'),cc=$('#cc');
const A=CHAR.apps,C=A.msg.contacts;
/* 앱 등록: registerApp('키', 화면을 만드는 함수, 옵션)
   옵션 theme: 'light'(항상 밝게) | 'dark'(항상 어둡게) | 생략(폰 테마를 따름) */
const APPS={},APPOPT={};
function registerApp(k,render,opt={}){APPS[k]=render;APPOPT[k]=opt}

/* 안 읽은 알림 상태: 메시지/LINE은 각 대화의 unread 숫자, 전화는 부재중 (전화 앱을 열면 확인한 것으로 처리) */
const sumUn=a=>a.reduce((s,c)=>s+(c.unread||0),0);
const UN={
 phoneSeen:false,
 count(k){return k=='msg'?sumUn(C):k=='line'?sumUn(A.line.chats):k=='phone'?(UN.phoneSeen?0:A.phone.calls.filter(c=>c.dir=='missed').length):((SETTINGS.badges||{})[k]||0)},
 /* 홈 화면 아이콘의 빨간 배지를 현재 상태로 다시 그림 */
 paint(){document.querySelectorAll('.app[data-k]').forEach(a=>{const w=a.querySelector('.iw');if(!w)return;let b=w.querySelector('.badge');const n=UN.count(a.dataset.k);
  if(!n){if(b)b.remove();return}if(!b){b=document.createElement('i');b.className='badge';w.appendChild(b)}b.textContent=n})},
 /* 잠금화면 알림 제거 (ref = 'line:대화이름' 같은 표식) */
 notifOff(ref){document.querySelectorAll('#nstack .notif').forEach(n=>{if(n.dataset.ref===ref)n.remove()})}
};
