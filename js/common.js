const searchEl = document.querySelector(".search");
const searchInputEl = searchEl.querySelector("input");

searchEl.addEventListener("click", () => {
  searchInputEl.focus();
});

//포커스 되었을 때
searchInputEl.addEventListener("focus", () => {
  searchEl.classList.add("focused");
  searchInputEl.setAttribute("placeholder", "통합검색");
});

//포커스 해제되었을 때
searchInputEl.addEventListener("blur", () => {
  searchEl.classList.remove("focused");
  searchInputEl.setAttribute("placeholder", "");
});

//푸터에 카피라이트 년도 자동으로 현재년도로 바꾸게
const thisYear = document.querySelector(".this-year");
// .textContent : 요소가 갖고있는 글자내용들 값을 알아내거나 지정하는 용도!
thisYear.textContent = new Date().getFullYear();
