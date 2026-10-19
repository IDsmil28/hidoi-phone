/* ===== 접속 후 시간이 지나면 오는 알림 =====
   after = 접속하고 몇 초 뒤  /  app: 'line' | 'msg' | 'cal' | 'hq'
   line: from(보낸 사람), text, chat(그룹방이면 방 이름)
   msg : from(문자 앱 연락처 이름), text
   cal : off(오늘=0), pick(그날 일정 중 몇 번째, 0부터)  → 캘린더 데이터에서 제목/시각을 가져옴
   hq  : title, body, mission(본부 앱의 임무 목록에 추가될 임무)  */
CHAR.apps.notify = { timeline: [
  { after: 25,  app:'line', from:'아마리니 카와이', text:'선배 어디예요?? 저 벌써 도착했어요!' },
  { after: 60,  app:'msg',  from:'쿠로', text:'......누나 언제 와?' },
  { after: 95,  app:'cal',  off:0, pick:1 },
  { after: 130, app:'line', from:'야사이 키노코', chat:'트라이아스 마법소녀', text:'다들 내일 임무 장소 공지 봤어용?? 시부야!!!' },
  { after: 175, app:'hq',   title:'마법소녀본부', body:'[긴급] 시부야 센터가이 쟈쿠무 반응 감지 · C등급. 인근 마법소녀는 응답 바람',
    mission:{ id:'M-0991', title:'센터가이 쟈쿠무 소탕', place:'시부야구 · 센터가이', ward:'시부야', grade:'C', status:'wait', team:['히도이 시렌'], when:'긴급', reward:{hikari:14,coin:90}, note:'신규 발령 · 인근 인원 우선 출동' } },
  { after: 240, app:'msg',  from:'아타마 소라', text:'히도히돗 하늘 봐 진짜 파란 게 내려와' }
]};
