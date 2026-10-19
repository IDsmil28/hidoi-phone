/* 잠금화면: 알림, 잠금/해제, 손전등 */
const lastYou=c=>[...c.chat].reverse().find(x=>x[0]=='you')[1].split('\n')[0];
const GC=A.line.chats.find(c=>c.group),GL=[...GC.msgs].reverse().find(m=>m[0]!='me'&&!m[1].startsWith('[s]'));
const SO=C.find(c=>c.name=='아타마 소라')||C[0];
const NOTES=[{k:'msg',t:SO.name,b:lastYou(SO),w:'3분 전',ref:'msg:'+SO.name,cn:SO.name},{k:'line',t:GC.name,b:GL[0]+': '+GL[1],w:'27분 전',ref:'line:'+GC.name,cn:GC.name}];
$('#nstack').innerHTML=NOTES.map(n=>`<div class="notif" data-nk="${n.k}" data-ref="${n.ref}" data-cn="${n.cn}"><div class="ni">${iconEl(n.k)}</div><div class="nt"><div class="nh"><b>${n.t}</b><span>${n.w}</span></div><div class="nb">${n.b}</div></div></div>`).join('');

const isLocked=()=>!lock.classList.contains('gone');
function unlock(){lock.style.transform='';lock.style.opacity='';lock.classList.add('gone');home.classList.remove('locked');phone.classList.remove('lk');syncInk()}
function lockNow(){closeCC();lock.style.transform='';lock.style.opacity='';lock.classList.remove('gone');home.classList.add('locked');phone.classList.add('lk');syncInk()}

/* 위로 끌어 올려서 해제 (끌면 따라 올라감) */
let sy=null,dy=0,dragged=false;
lock.addEventListener('pointerdown',e=>{dragged=false;if(e.target.closest('.qb'))return;sy=e.clientY;dy=0;lock.style.transition='none'});
addEventListener('pointermove',e=>{if(sy===null)return;dy=Math.min(0,e.clientY-sy);lock.style.transform=`translateY(${dy}px)`;lock.style.opacity=Math.max(.3,1+dy/500)});
addEventListener('pointerup',()=>{
 if(sy===null)return;lock.style.transition='';dragged=Math.abs(dy)>=6;
 if(dy<-110||Math.abs(dy)<6)unlock();else{lock.style.transform='';lock.style.opacity=''}sy=null});

/* 알림을 누르면 알림이 사라지고, 잠금을 해제한 뒤 그 앱(대화방)을 연다 */
$('#nstack').addEventListener('click',e=>{const n=e.target.closest('.notif');if(!n)return;if(dragged){dragged=false;return}
 const k=n.dataset.nk,cn=n.dataset.cn;n.remove();openFromNotif(k,cn)});

/* 손전등 / 카메라 버튼 */
const flash=$('#qflash');
function setFlash(on){flash.classList.toggle('on',on);const t=$('#ccflash');if(t)t.classList.toggle('on',on)}
flash.addEventListener('click',()=>setFlash(!flash.classList.contains('on')));
$('#qcam').addEventListener('click',e=>e.currentTarget.animate([{transform:'translateX(-4px)'},{transform:'translateX(4px)'},{transform:'none'}],{duration:200}));
