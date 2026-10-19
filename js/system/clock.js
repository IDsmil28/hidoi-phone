/* 상태바 + 시계 + 초기 테마 */
if(SETTINGS.silent)phone.classList.add('has-silent');
phone.classList.toggle('dark',!!SETTINGS.dark);
$('#carrier').textContent=SETTINGS.carrier;
$('#batf').setAttribute('width',(17*SETTINGS.battery/100).toFixed(1));
function tick(){const d=new Date(),t=String(d.getHours()).padStart(2,'0')+':'+String(d.getMinutes()).padStart(2,'0');
 $('#clock').textContent=t;$('#ltime').textContent=t;
 $('#ldate').textContent=(d.getMonth()+1)+'월 '+d.getDate()+'일 ('+'일월화수목금토'[d.getDay()]+')'}
tick();setInterval(tick,10000);
