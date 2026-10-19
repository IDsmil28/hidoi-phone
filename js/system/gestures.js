/* 제스처: 오른쪽 위=제어 센터, 왼쪽/가운데 위=잠금화면 내리기, 아래 가장자리 위로=홈,
   왼쪽 가장자리=뒤로 가기, 오른쪽 옆 버튼=화면 잠금 */
(function(){
 let g=null;
 const pos=e=>{const r=phone.getBoundingClientRect(),s=r.width/phone.offsetWidth;return{x:(e.clientX-r.left)/s,y:(e.clientY-r.top)/s}};
 function edgeBack(){
  const pages=$$('#app .page:not(.right)').filter(p=>[...p.querySelectorAll('[data-back]')].some(b=>b.dataset.back));
  const p=pages[pages.length-1];if(!p)return;
  const b=[...p.querySelectorAll('[data-back]')].find(x=>x.dataset.back);if(b)b.click()}
 phone.addEventListener('pointerdown',e=>{
  const {x,y}=pos(e);g=null;
  if(y<48&&x>250)g={t:'cc',x,y};
  else if(y<48&&!isLocked()&&!ccOpen())g={t:'curtain',x,y};
  else if(y>804)g={t:'home',x,y};
  else if(x<22&&!isLocked()&&!ccOpen())g={t:'edge',x,y}});
 addEventListener('pointermove',e=>{
  if(!g||g.done)return;const {x,y}=pos(e),dx=x-g.x,dy=y-g.y;
  if(g.t=='cc'&&dy>40){g.done=true;openCC();syncInk()}
  else if(g.t=='curtain'&&dy>50){g.done=true;lockNow()}
  else if(g.t=='home'&&dy<-45){g.done=true;if(isLocked())unlock();else if(ccOpen()){closeCC();syncInk()}else if(appOpen())goHome()}
  else if(g.t=='edge'&&dx>70&&Math.abs(dy)<70){g.done=true;edgeBack()}});
 addEventListener('pointerup',()=>{g=null});
 /* 홈 인디케이터를 탭 */
 hbar.addEventListener('click',()=>{if(isLocked())unlock();else if(ccOpen()){closeCC();syncInk()}else if(appOpen())goHome()});
 /* 전원(옆) 버튼 */
 $('#pwbtn').addEventListener('click',()=>{if(isLocked())unlock();else lockNow()});
})();
