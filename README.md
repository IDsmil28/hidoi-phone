# 히도이 시렌 휴대폰
빌드 없이 index.html만 열면 동작합니다 (GitHub Pages 가능).

## 구조
- index.html: 화면 뼈대, CSS/JS 로드 순서
- css/: base(프레임·테마) lock home control app-common app-*(앱별)
- js/data/: 앱별 데이터 (base, messages, notes, line, safari, phone, photos, calendar, music, youtube)
- js/core.js icons.js ui.js player.js: 공통 도구
- js/apps/: 앱별 화면 (registerApp(키, 함수, 옵션)으로 등록)
- js/system/: clock home lock control host gestures
- img/: bg.jpg(배경), icons/(앱 아이콘 덮어쓰기), music/(앨범), photos/(사진)

## 자주 하는 작업
- 사진 추가: img/photos/에 파일을 넣고 js/data/photos.js의 files에 이름 추가. 날짜/즐겨찾기는 {src:'a.jpg',date:'2026-10-18 15:12',fav:true}
- 아이콘 교체: img/icons/<키>.png (img/icons/README.txt 참고)
- 새 앱: js/apps/에 파일을 만들고 registerApp 호출, index.html에 script 추가, js/system/home.js 배치에 키 추가
- 마법소녀본부: 데이터 js/data/hq.js (임무, 적 위치, 도감, 가챠), 화면 js/apps/hq.js, 스타일 css/app-hq.css. 일정은 캘린더 데이터 중 cal:'마법소녀'를 자동으로 가져옴
- ???(x): js/apps/unknown.js (현재 빈 화면)
- 안 읽은 표시: 메시지는 대화에 unread:숫자, LINE도 각 대화의 unread. 대화를 열면 홈 배지, 앱 안 숫자, 잠금화면 알림이 함께 사라짐
- 접속 후 알림: js/data/notify.js 의 timeline (after=초, app=line/msg/cal/hq)
- 메시지/LINE 입력창에서 보내기 가능 (답장은 없음)
- 유튜브 썸네일: 괴수·음악은 img/youtube/ 에 직접 만든 이미지 (교체 가능)

## 조작
상단 오른쪽 아래로 드래그: 제어 센터 / 상단 왼쪽·가운데 아래로 드래그: 잠금화면 / 하단 위로 스와이프: 홈 / 왼쪽 가장자리 오른쪽으로: 뒤로 / 오른쪽 전원 버튼: 잠금

## 이미지
아이콘, 프로필 사진, 갤러리, 배경 등 이미지 교체 방법은 `이미지-교체-가이드.md` 에 정리되어 있습니다.
- 프로필 사진: img/profiles/<이름>.png, 파일 이름 표는 js/data/profiles.js
- ??? 앱: 계약서 화면 (js/apps/unknown.js), [소원 이루기]를 누르면 화면이 어두워진 뒤 탭을 닫고, 안 닫히면 빈 페이지로 이동
