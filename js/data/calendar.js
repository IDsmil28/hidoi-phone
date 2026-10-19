/* ===== 캘린더 앱 =====
   off = 오늘 기준 며칠 뒤 (0 = 오늘, 1 = 내일). 매년 반복은 date:'MM-DD'
   start / end = 'HH:MM' (없으면 하루 종일) */
CHAR.apps.calendar = {
  cals: { '학교':'#ff3b30', '검도부':'#34c759', '마법소녀':'#af52de', '개인':'#0a84ff' },
  events: [
    { off:0, start:'08:00', end:'09:00', title:'임무 집합 (트라이아스)', cal:'마법소녀' },
    { off:0, start:'17:00', end:'18:30', title:'훈련(카와이)', cal:'마법소녀' },
    { off:0, start:'19:00', end:'20:00', title:'저녁 식사 (본가)', cal:'개인' },
    { off:1, start:'17:00', end:'18:30', title:'검도부 정기 연습', cal:'검도부' },
    { off:2, start:'09:00', end:'09:40', title:'쪽지시험', cal:'학교' },
    { off:5, title:'검도 대회', cal:'검도부' },
    { off:4, start:'15:00', end:'17:00', title:'임무', cal:'마법소녀'}, 
    { off:6, start:'11:00', end:'12:30', title:'오르도비스 모임', cal:'개인' },
    { off:6, start:'15:00', end:'16:00', title:'리소우', cal:'개인' },
    { off:7, start:'15:00', end:'19:00', title:'임무', cal:'마법소녀'},
    { off:9, start:'16:00', end:'17:00', title:'마법소녀 정기 보고', cal:'마법소녀' },
    { off:10, start:'13:00', end:'17:00', title:'임무', cal:'마법소녀'},
    { date:'11-06', title:'히도이 시렌 생일', cal:'개인' }
  ]
};
