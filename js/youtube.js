// Youtube IFrame API를 비동기로 로드합니다.
const tag = document.createElement("script");
tag.src = "https://www.youtube.com/iframe_api";
const firstScriptTag = document.getElementsByTagName("script")[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
//위 과정은 지금까지 내가 선언한 스크립트 태그 최상단에 새로 만든 스크립트 태그를 만들어주라는 것!

//이 함수는 꼭 똑같은 이름으로 명시해야한다!
function onYouTubePlayerAPIReady() {
  //첫번째 인자로 준 'player'는
  //<div id="player"></div>
  //html 코드에서 id로 넣어준 값!
  //앞에 # 붙이면 안됨
  new YT.Player("player", {
    videoId: "An6LvWQuj_8", // 재생할 유튜브 영상 ID
    playerVars: {
      //영상을 재생하기 위한 여러가지 속성
      autoplay: true, // 자동 재생 유무
      loop: true, // 반복 재생 유무
      playlist: "An6LvWQuj_8", // 반복 재생할 유튜브 영상 ID 목록
    },
    events: {
      // 영상이 준비되었을 때, 실행할 메소드
      onReady: function (event) {
        event.target.mute(); // 음소거!
      },
    },
  });
}
