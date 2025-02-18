
/* header 스크롤 */
const head = new EzenScrollClass("header");
const head_scroll = new EzenScrollClass("#main-view-b",{
  class : 'scrolled',
  baseline : 'top',
  add: 0.5,
});

// 햄버거 메뉴 클릭 시 .active 클래스 토글
document.getElementById('ham').addEventListener('click', function() {
  this.classList.toggle('active');
  document.getElementById('head-bottom').classList.toggle('active');
  document.querySelector('#head-top .Toolbar.left').classList.toggle('active');
});


/* main swiper */
const main_swiper = new Swiper("#inner-box",{
  wrapperClass: "wrap",
  slideClass: "area",
  slideActiveClass: "active",
  direction: "vertical",
  speed: 1200,
  mousewheel:{
    enabled:true,
    releaseOnEdges: true,
  },
  effect: "creative",
  creativeEffect: {
   prev: {
     shadow: true,
     translate: [0, "0%", -400],
   },
   next: {
     translate: [0, "100%", 100],
   },
  },
  
  pagination: {
    el: ".pager",
    clickable: true,
    bulletActiveClass: 'active',
    renderBullet: function (index, className) {
      const formattedIndex = (index + 1).toString().padStart(2, '0');
      return '<span class="' + className + '">' + formattedIndex + "</span>";
    },
  }, 
});



/* select 탭메뉴 만들기 */
var btns = document.querySelectorAll(".list a");

function removeActive(b, t){
  var actives = document.querySelectorAll("#select .active");
  var actives = Array.from(actives);
  t = Array.from(t);
  var re = actives.filter((x) => !t.includes(x));

  re.forEach(function(at){
    if(at !== b && at !== t) at.classList.remove("active");
  });
};

btns.forEach(function(btn){
  btn.addEventListener("click",function(e){
    e.preventDefault();
    var href = this.getAttribute("href");
    var targets = document.querySelectorAll(href);
    if(href == "All"){
      var targets = document.querySelectorAll("#select-sub article");
    }else{
      var targets = document.querySelectorAll(href);
    };
    targets.forEach(function(target){
      target.classList.add("active");
    });
    this.classList.add("active");
    removeActive(this, targets);
  });
});

/* select 스와이퍼 */
var selectSlider = new Swiper("#select-sub article",{
  wrapperClass: "item-wrap",
  slideClass: "item",
  slidesPerView: 1,   // 최소형태
  spaceBetween: 10,   // 최소형태
  breakpoints:{
    // 화면의 너비가 1024px 이상 적용
    430:{slidesPerView: 2, spaceBetween: 20},
    // 화면의 너비가 1024px 이상 적용
    1024:{slidesPerView: 3, spaceBetween: 30},
    // 화면의 너비가 1440px 이상 적용
    1440:{slidesPerView: 4, spaceBetween: 120},
  },
  scrollbar: {
    el: ".swiper-scrollbar",
    hide: false,
  },
  navigation: {
    nextEl: ".next",
    prevEl: ".prev",
  },
});


/* large-view click 효과 */
var largeBoxes = document.querySelectorAll('#large-view .box');

largeBoxes.forEach(function (box) {
  box.addEventListener('click', function () {
    largeBoxes.forEach(function (b) {
      b.classList.remove('active');
    });
    box.classList.add('active');
  });
});
