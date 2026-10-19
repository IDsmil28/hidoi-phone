/* ===== 유튜브 앱 (메인 화면만) =====
   thumb = 위키미디어 커먼즈 파일 이름 (무료 이미지). 내 이미지를 쓰려면 'img/youtube/xxx.jpg' 처럼 경로로 적기 */
CHAR.apps.youtube = {
  chips: ['전체', '우파루파', '검도', '괴수', '음악', '라이브', '최근에 업로드된 동영상'],
  videos: [
    { title:'우파루파 수조 세팅 · 물갈이 루틴 | 초보 필독', ch:'우파루파 연구소', meta:'조회수 24만회 · 3주 전', dur:'12:08', thumb:'Axolotl.jpg', tag:'우파루파' },
    { title:'【검도】 면치기 · 손목치기 기본 타격 연습', ch:'검도 클리닉', meta:'조회수 8.1만회 · 1년 전', dur:'8:42', thumb:'Kendo (1).jpg', tag:'검도' },
    { title:'우파루파가 물 밖에서 버틸 수 있는 시간 (실험 아님)', ch:'쿠로쿠로 수족관', meta:'조회수 51만회 · 5개월 전', dur:'5:17', thumb:'Ambystoma mexicanum 1.jpg', tag:'우파루파' },
    { title:'전국 고교 검도 대회 결승 하이라이트', ch:'검도 채널 道', meta:'조회수 112만회 · 2년 전', dur:'14:55', thumb:'KENDO - Japanese art of fencing. (48107348241).jpg', tag:'검도' },
    { title:'알비노 우파루파 일상 브이로그 🫧', ch:'우파루파 연구소', meta:'조회수 9.3만회 · 8일 전', dur:'3:36', thumb:'Albino Axolotl (Ambystoma mexicanum) (13532447665).jpg', tag:'우파루파' },
    { title:'검도 호구 착용법 완전 정복', ch:'검도 클리닉', meta:'조회수 33만회 · 3년 전', dur:'10:21', thumb:'Kendo.JPG', tag:'검도' }
    ,{ title:'거대 괴수 출현 시 도시는 어떻게 되나? 시뮬레이션', ch:'괴수 연구소', meta:'조회수 67만회 · 4개월 전', dur:'18:24', thumb:'img/youtube/kaiju1.jpg', tag:'괴수' },
    { title:'【작업용 BGM】 어두운 방에서 듣는 새벽 2시 플레이리스트', ch:'midnight room', meta:'조회수 142만회 · 1년 전', dur:'2:10:05', thumb:'img/youtube/mix1.jpg', tag:'음악' },
    { title:'바다에서 올라오는 괴수 역대급 TOP 10', ch:'괴수 연구소', meta:'조회수 23만회 · 2주 전', dur:'11:47', thumb:'img/youtube/kaiju2.jpg', tag:'괴수' },
    { title:'비 오는 날 듣는 어두운 로파이 믹스 · 공부 / 휴식', ch:'midnight room', meta:'조회수 88만회 · 8개월 전', dur:'1:03:40', thumb:'img/youtube/mix2.jpg', tag:'음악' }
  ]
};

/* 주제가 번갈아 나오도록 순서를 섞음 (알고리즘 피드처럼) */
(function(){const g={};CHAR.apps.youtube.videos.forEach(v=>(g[v.tag]=g[v.tag]||[]).push(v));const ks=Object.keys(g),out=[];
 for(let i=0;out.length<CHAR.apps.youtube.videos.length;i++)ks.forEach(k=>{if(g[k][i])out.push(g[k][i])});CHAR.apps.youtube.videos=out})();
