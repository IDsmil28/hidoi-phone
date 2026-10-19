/* 유튜브 앱 (메인 화면만). 영상 목록은 js/data/youtube.js */
const YT=A.youtube;
const ytSrc=t=>/^(https?:|img\/)/.test(t)?t:'https://commons.wikimedia.org/wiki/Special:FilePath/'+encodeURIComponent(t)+'?width=720';
const ytCol=s=>{let h=0;for(const c of s)h=(h*31+c.charCodeAt(0))%360;return `linear-gradient(135deg,hsl(${h} 45% 52%),hsl(${(h+30)%360} 45% 36%))`};
const YI={
 cast:'<svg viewBox="0 0 24 24"><path d="M3 7.500V6a2 2 0 012-2h14a2 2 0 012 2v12a2 2 0 01-2 2h-5M3 12a9 9 0 019 9M3 16.500a4.500 4.500 0 014.500 4.500M3 21h.01"/></svg>',
 bell:'<svg viewBox="0 0 24 24"><path d="M6 17V11a6 6 0 0112 0v6l1.500 2h-15zM10 21h4"/></svg>',
 home:'<svg viewBox="0 0 24 24"><path d="M4 11l8-7 8 7v9h-5v-6H9v6H4z"/></svg>',
 shorts:'<svg viewBox="0 0 24 24"><path d="M8 3.500l9 4.500a3 3 0 010 5l-1 .5M16 20.500L7 16a3 3 0 010-5l1-.5"/><path d="M10 9.500v5l4.500-2.500z"/></svg>',
 plus:'<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M12 7v10M7 12h10"/></svg>',
 sub:'<svg viewBox="0 0 24 24"><rect x="4" y="8" width="16" height="12" rx="2.500"/><path d="M6 4.500h12M8.500 8V6.500"/><path d="M10.500 12v4l3.500-2z"/></svg>',
 lib:'<svg viewBox="0 0 24 24"><circle cx="12" cy="8.500" r="4"/><path d="M4 21c1-4.500 4-6.500 8-6.500s7 2 8 6.500"/></svg>'
};
const ytMore='<svg viewBox="0 0 24 24"><circle cx="12" cy="5" r="1.800"/><circle cx="12" cy="12" r="1.800"/><circle cx="12" cy="19" r="1.800"/></svg>';
function pageYouTube(){
 return `<div class="page" id="p-yt"><div class="yt-top"><h1>YouTube</h1><div class="yt-ic">${YI.cast}${YI.bell}<svg viewBox="0 0 24 24"><circle cx="10.500" cy="10.500" r="6.500"/><path d="M16 16l5 5"/></svg></div></div>
 <div class="scroll" style="padding-top:104px;padding-bottom:110px"><div class="yt-chips">${YT.chips.map((c,i)=>`<span class="${i?'':'on'}">${c}</span>`).join('')}</div>
 ${YT.videos.map(v=>`<div class="yt-v"><div class="yt-th"><span>${v.tag||''}</span><img src="${ytSrc(v.thumb)}" alt="" referrerpolicy="no-referrer" draggable="false" onerror="this.remove()"><em>${v.dur}</em></div><div class="yt-m"><div class="av" style="background:${ytCol(v.ch)}">${v.ch[0]}</div><div style="min-width:0"><b>${v.title}</b><small>${v.ch} · ${v.meta}</small></div>${ytMore}</div></div>`).join('')}</div>
 <div class="yt-tabs">${[['home','홈',1],['shorts','Shorts'],['plus','','pl'],['sub','구독'],['lib','보관함']].map(t=>`<div class="${t[2]==1?'on':''}${t[2]=='pl'?' pl':''}">${YI[t[0]]}${t[1]}</div>`).join('')}</div></div>`}
registerApp('youtube',pageYouTube);
