/* ===== 사진 앱 =====
   내 사진을 넣는 방법
   1) img/photos/ 폴더에 사진 파일을 넣는다
   2) 아래 files 배열에 파일 이름을 최신순으로 적는다
        files: ['01.jpg', '02.png', { src:'03.jpg', date:'2026-10-18 15:12', fav:true }]
      (문자열 = 파일 이름만, 객체 = 날짜/즐겨찾기까지 지정)
   files 가 비어 있으면 임시 타일(placeholders 색)이 보입니다. */
CHAR.apps.photos = {
  files: ['01.jpg','02.jpg','03.jpg','04.png','05.jpg','06.png','07.png','08.jpg','09.png'],
  placeholders: ['#ff1200','#5a1a1a','#2a2a2e','#7a2a2a','#cccccc','#3a1a1a','#8a0a00','#444','#1a1a1e']
};
