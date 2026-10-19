/* 메모 */
function pageNotes(){const n=A.notes;
 return `<div class="page gray" id="p-notes">${nav(backBtn('폴더','','y'),gb(more,'round y'))}<div class="scroll"><div class="big">메모</div><div class="sbar">${mag}검색</div><div class="card">${n.map((x,i)=>`<div class="it" data-note="${i}"><b>${x.title}</b><small>${x.body.split('\n').filter(Boolean)[0]}</small></div>`).join('')}</div></div><div class="tb">${n.length}개의 메모<span class="rt">${gb(sq,'round y')}</span></div></div>`+
 n.map((x,i)=>`<div class="page right" id="p-note${i}">${nav(backBtn('메모','p-note'+i,'y'),gb(share,'round y')+gb(more,'round y'))}<div class="scroll"><div class="note"><div class="d">오늘 오후 3:12</div><b class="h">${x.title}</b>${x.body}</div></div></div>`).join('')}
registerApp('notes',pageNotes);
document.addEventListener('click',e=>{const n=e.target.closest('[data-note]');if(n)show('p-note'+n.dataset.note)});
