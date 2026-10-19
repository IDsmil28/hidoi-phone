/* ??? : 처음엔 ???만 보이고, 누르면 계약서와 [소원 이루기] 버튼이 나옴. 버튼을 누르면 화면이 어두워지며 사이트를 닫음 (앱 키는 'x') */
registerApp('x',()=>`<div class="page xx" id="p-x">
 <div class="x-intro" data-xopen><span>???</span></div>
 <div class="x-doc scroll">
  <div class="x-paper">
   <h2>계약 일자</h2>
   <p class="x-name">히도이 시렌 樋道井しれん - 15세</p>
   <p>위 당사자와 ■■(통칭 “마스코트”라 함)은 다음과 같이 마법소녀 계약을 체결한다.</p>
   <p class="x-gap">계약일 : XXXX..</p>
   <p>■■ ■■■■■■■■ ■■■■■</p>
   <p>■■■■ ?</p>
   <p>■■■■■ ■■■■■</p>
   <p class="x-gap x-reward">보상 : 모두의 기억에서 나를 지우는 것</p>
   <p class="x-date">XXXX년 월 일</p>
   <p class="x-seal"><span>(인)</span></p>
  </div>
  <button class="x-wish" data-xwish>소원 이루기</button>
 </div></div>`,{theme:'dark'});
document.addEventListener('click',e=>{
 const o=e.target.closest('[data-xopen]');if(o){$('#p-x').classList.add('open');return}
 if(e.target.closest('[data-xwish]'))xEnd()});
/* 소원 이루기: 화면이 서서히 검게 → 탭을 닫으려 시도 → 안 닫히면 빈 페이지로 이동 */
function xEnd(){if(document.getElementById('x-end'))return;
 const d=document.createElement('div');d.id='x-end';document.body.appendChild(d);
 requestAnimationFrame(()=>d.classList.add('on'));
 setTimeout(()=>{try{window.close()}catch(e){}setTimeout(()=>{if(!window.__noExit)location.replace('about:blank')},500)},2600)}
