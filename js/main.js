const badgeEl = document.querySelector("header .badges");

/*
//브라우저 화면 자체에 이벤트 등록!
//스크롤할 때마다 이벤트 발생한다.
window.addEventListener("scroll", () => {
  console.log("scroll");
});
*/

//window scroll이벤트에 대하여 핸들러를 등록하면
//스크롤 할 때마다 수십개의 이벤트가 우루루 발생하는데,
//lodash 라이브러리의 throttle 메소드를 사용해서 제한을 걸어준다!
//0.3초 단위로 부하를 줘서 우루루 실행되는걸 방지!
window.addEventListener(
  "scroll",
  _.throttle(() => {
    //함수가 실행되었을 때의 브라우저의 스크롤 Y값 위치에 따라 뱃지가 보이고 안보이게.
    if (window.scrollY > 500) {
      //배지 숨기기
      /*gsap 사용방법
        gsap.to(요소, 지속시간, 옵션)
        요소 : gsap을 사용할 요소
        지속시간 : 애니메이션이 지속될 시간 (초단위)
        옵션 : 애니메이션을 어떻게 처리할지에 대한 옵션 (객체 데이터)
            -> opacity 속성처럼 객체의 속성에 대한 값을 숫자로 입력하는 속성들은 전환효과를 통해 요소의 전/후 상태를 중간 숫자의 값으로 자연스럽게 만들어줄 수 있지만,
            -> display 속성처럼 값이 숫자가 아닌 속성은 전/후 상태의 중간값이 존재하지 않기 때문에, 자연스러운 전환 효과를 적용할 수 없다!
      */
      gsap.to(badgeEl, 0.6, {
        opacity: 0, //gsap을 통해 배지를 숨기긴 했지만, 보이지만 않을 뿐 영역은 차지하고 있음..
        display: "none", //
      });
      //버튼 보이기
      //요소를 querySelector 통해 갖고와서 쓸 수도 있지만,
      //선택자 자체를 명시해서 갖고와서 쓸 수 있다는 것을 알 수 있다!
      //그래도 차피 찾아놓으면 여러번 쓸 수 있으니까 그냥 querySelector로 갖고와서 쓰는 것을 추천.
      gsap.to("#to-top", 0.2, {
        x: 0,
      });
    } else {
      //배지 보이기
      gsap.to(badgeEl, 0.6, {
        opacity: 1,
        display: "block",
      });
      //버튼 숨기기
      gsap.to("#to-top", 0.2, {
        x: 100,
      });
    }
  }, 300)
);

const toTopEl = document.querySelector("#to-top");
toTopEl.addEventListener("click", () => {
  //window객체는 화면에 출력되고 있는 그 화면에 대한 객체
  gsap.to(window, 0.7, {
    scrollTo: 0, //스크롤의 위치를 0px 위치(맨 위)로 옮겨주겠다!
  });
});

const fadeEls = document.querySelectorAll(".visual .fade-in");
fadeEls.forEach((fadeEl, index) => {
  gsap.to(fadeEl, 1, {
    delay: (index + 1) * 0.7, //0.7, 1.4, 2.1, 2.7초 마다 한 요소씩 보여지게
    opacity: 1,
  });
});

//Swiper 클래스 생성자
new Swiper(".notice-line .swiper-container", {
  direction: "vertical",
  autoplay: true,
  loop: true,
});

new Swiper(".promotion .swiper-container", {
  //direction: "horizontal", 이건 기본값이니 안써도 됨
  slidesPerView: 3, //한번에 세 슬라이드 보이게
  spaceBetwwn: 10, //슬라이드 사이 여백
  centeredSlides: true, //젤 첫번째 슬라이드가 왼쪽 끝에 나오는게 아니라 중앙부터 시작하게!
  loop: true, //끝이 안나고 반복적으로 다시 첨으로 들어가게
  autoplay: {
    delay: 5000, //기본값은 3000
  },
  pagination: {
    el: ".promotion .swiper-pagination", //페이지 번호 요소 선택자
    clickable: true, // 사용자가 페이지 번호 요소로 슬라이드 제어 가능한지
  },
  navigation: {
    //슬라이드 좌우로 이동하는 버튼에 대한 명시
    prevEl: ".promotion .swiper-prev", //왼쪽 버튼 요소 선택자
    nextEl: ".promotion .swiper-next", //오른쪽 버튼 요소 선택자
  },
});

const promotionEl = document.querySelector(".promotion");
const promotionToggleBtn = document.querySelector(".toggle-promotion");
let isHidePromotion = false; //프로모션 숨기고 싶으면 true

promotionToggleBtn.addEventListener("click", () => {
  isHidePromotion = !isHidePromotion; //토글해주기 (반대)
  if (isHidePromotion) {
    // 숨김처리!
    promotionEl.classList.add("hide");
  } else {
    // 보임처리!
    promotionEl.classList.remove("hide");
  }
});

// 범위 랜덤 함수(소수점 2자리까지)
function random(min, max) {
  // `.toFixed()`를 통해 반환된 문자 데이터를,
  // `parseFloat()`을 통해 소수점을 가지는 숫자 데이터로 변환
  return parseFloat((Math.random() * (max - min) + min).toFixed(2));
}

function floatingObject(selector, delay, size) {
  gsap.to(selector, random(1.5, 2.5), {
    y: size,
    repeat: -1, //무한반복
    yoyo: true, //한번재생했다가 다시 돌아갔다 다시 재생하는 구조
    ease: Power1.easeInOut,
    delay: random(0, delay), //지연시간
  });
}

floatingObject(".floating1", 1, 15);
floatingObject(".floating2", 0.5, 15);
floatingObject(".floating3", 1.5, 20);

const spyEls = document.querySelectorAll("section.scroll-spy");
spyEls.forEach((spyEl) => {
  //.scene : 특정한 요소를 감시하는 옵션을 지정하는 메소드
  //setClassToggle : 클래스 있으면 빼고 없으면 추가하고
  //addTo : ScrollMagic 라이브러리에 필요한 컨트롤러라는 개념을 추가하기 위해 사용해야하는 메소드
  new ScrollMagic.Scene({
    triggerElement: spyEl, // 보여짐 여부를 감시할 요소를 지정
    //화면이 시작하는 부분을 0%, 끝나는 부분을 100%라고 했을 때
    triggerHook: 0.8, // 화면의 80% 지점에서 걸렸을 때 체이닝된 다음 메소드가 실행되게!
  })
    .setClassToggle(spyEl, "show") //show라는 클래스가 spyEl에 없으면 추가하고, 있으면 제외하기!
    .addTo(new ScrollMagic.Controller()); //Scene에 할당한 옵션들을 컨트롤러에 할당해서 실제로 동작할 수 있도록 해준다! (필수!)
});

new Swiper(".awards .swiper-container", {
  //direction: "horizontal", 이건 기본값이니 안써도 됨
  autoplay: true,
  loop: true,
  spaceBetwwn: 30, //슬라이드 사이 여백
  slidesPerView: 5, //한번에 다섯개의 슬라이드 보이게
  navigation: {
    //슬라이드 좌우로 이동하는 버튼에 대한 명시
    prevEl: ".awards .swiper-prev", //왼쪽 버튼 요소 선택자
    nextEl: ".awards .swiper-next", //오른쪽 버튼 요소 선택자
  },
});
