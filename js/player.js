/* 재생 상태 (음악 앱 / 홈 위젯 / 제어 센터가 같이 씀) */
const PL=Object.assign({},A.music,{playing:true,pos:A.music.start,vol:A.music.volume,liked:false});
const PLs=[];
const plSub=f=>PLs.push(f);
const plSet=o=>{Object.assign(PL,o);PLs.forEach(f=>f())};
const mmss=s=>Math.floor(s/60)+':'+String(Math.floor(s%60)).padStart(2,'0');
setInterval(()=>{if(PL.playing){PL.pos=PL.pos+1>=PL.duration?0:PL.pos+1;PLs.forEach(f=>f())}},1000);
