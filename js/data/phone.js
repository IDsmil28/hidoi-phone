/* ===== 전화 앱: 연락처 + 통화 기록 =====
   contacts : id, name(저장된 이름), num(번호)
   calls    : 최신순. who=연락처 id, 또는 num(모르는 번호)
              dir = 'in'(수신) / 'out'(발신) / 'missed'(부재중)
              m = 몇 분 전(오늘 기록용) | d = 며칠 전 + t = 'HH:MM'
              s = 통화 시간(초) */
CHAR.apps.phone = {
  contacts: [
    { id:'mom',    name:'엄마',            num:'090-5521-0306' },
    { id:'dad',    name:'아빠',            num:'090-4417-2208' },
    { id:'kuro',   name:'쿠로',            num:'090-3405-7769' },
    { id:'sora',   name:'아타마 소라',      num:'090-7104-9921' },
    { id:'kinoko', name:'야사이 키노코',    num:'090-1957-3302' },
    { id:'kawai',  name:'아마리니 카와이',  num:'080-3318-2260' },
    { id:'dekiru', name:'야레바 데키루',    num:'090-2286-4413' },
    { id:'kyoka',  name:'히마데 쿄카',      num:'080-6642-1175' },
    { id:'shoma',  name:'오헤라 쇼마',      num:'090-6120-5834' },
    { id:'risou',  name:'키시얀 리소우',    num:'090-8830-5517' },
    { id:'risoub', name:'키시얀 오빠',      num:'090-5972-1046' },
    { id:'yuka',   name:'유카 선배',        num:'080-2741-9903' },
    { id:'kozuka', name:'코즈카 상',        num:'090-3318-7725' },
    { id:'buchou', name:'부장',            num:'080-1465-2290' },
    { id:'honbu',  name:'본부',            num:'03-5521-0307' },
    { id:'tan1',   name:'담임1',           num:'090-2083-6641' },
    { id:'tan2',   name:'담임2',           num:'090-9174-3350' },
    { id:'tan3',   name:'담임3',           num:'090-7726-4018' }
  ],
  calls: [
    { who:'mom',    dir:'out',    m:75,  s:47 },
    { who:'kawai',  dir:'in',     m:190, s:128 },
    { who:'mom',    dir:'in',     m:410, s:63 },
    { who:'sora',   dir:'missed', m:520 },
    { who:'dekiru', dir:'missed', d:1, t:'23:48' },
    { who:'dekiru', dir:'missed', d:1, t:'23:20' },
    { who:'dekiru', dir:'missed', d:1, t:'22:57' },
    { who:'kyoka',  dir:'in',     d:1, t:'20:05', s:372 },
    { who:'risou',  dir:'in',     d:2, t:'22:12', s:5047 },
    { num:'03-6052-1268', dir:'missed', d:3, t:'11:20' },
    { who:'kinoko', dir:'in',     d:3, t:'15:15', s:81 },
    { who:'kuro',   dir:'out',    d:4, t:'17:48', s:19 },
    { who:'dad',    dir:'in',     d:5, t:'19:02', s:35 },
    { who:'risou',  dir:'out',    d:5, t:'21:30', s:271 },
    { who:'yuka',   dir:'in',     d:6, t:'16:40', s:212 },
    { num:'045-520-5215', dir:'out', d:6, t:'12:05', s:94 },
    { who:'honbu',  dir:'in',     d:7, t:'20:15', s:58 },
    { who:'buchou', dir:'out',    d:8, t:'18:22', s:44 }
  ]
};
