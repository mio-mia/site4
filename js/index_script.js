
/* header 스크롤 */
const head = new EzenScrollClass("header");
const head_scroll = new EzenScrollClass("#main-view-b",{
  class : 'scrolled',
  baseline : 'top',
  add: 0.5,
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
  spaceBetween: 0,
  breakpoints:{
    // 화면의 너비가 768px 이상 적용
    768:{slidesPerView: 2, spaceBetween: 50},
    // 화면의 너비가 1024px 이상 적용
    1024:{slidesPerView: 3, spaceBetween: 80},
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




/* 미디어 사이즈에 따른 값 설정 */
const mediaQueryList = window.matchMedia('(max-width: 1025px)');
const ham = document.getElementById('ham');
const ghost = document.querySelectorAll('.ghost');
const over = document.getElementById('over');
const under = document.getElementById('under');

  // #ham 클릭 시 이벤트
function handleSmallScreenClick(event) {
  if (event.target.closest('#ham')) {
    ham.classList.toggle('active');
    document.getElementById('head-bottom').classList.toggle('active');
  }
}

  // .ghost에 .hidden 클래스 추가
function handleLargeScreenClick() {
  ghost.forEach(element => {
    element.classList.add('hidden');
  });
}

  // #select gift 부분 hidden, only 부분 active
function handleSmallScreenSelect() {
  /* 
    1-1) #select-btn .gift a.active 에서 .active를 삭제 / .gift에 .hidden 추가
    1-2) #select-btn .only a에 .active 추가
    2-1) #select-sub #gift.active 에서 .active 삭제 / #gift에 .hidden 추가
    2-2) #select-sub #only에 .active 추가
   */ 
  document.querySelector('#select-btn .gift a.active').classList.remove('active');
  document.querySelector('#select-btn .gift').classList.add('hidden');
  
  document.querySelector('#select-btn .only a').classList.add('active');

  document.querySelector('#select-sub #gift.active').classList.remove('active');
  document.querySelector('#select-sub #gift').classList.add('hidden');

  document.querySelector('#select-sub #only').classList.add('active');
}
  // #select reset
function handleLargeScreenSelect() {
  document.querySelector('#select-btn .gift').classList.remove('hidden');
  document.querySelector('#select-btn .gift a').classList.add('active');
  
  document.querySelector('#select-btn .only a').classList.remove('active');
  
  document.querySelector('#select-sub #gift').classList.remove('hidden');
  document.querySelector('#select-sub #gift a').classList.add('active');

  document.querySelector('#select-sub #only a').classList.remove('active');
}

// 미디어 쿼리 변경 시 이벤트 리스너 설정
mediaQueryList.addEventListener('change', (event) => {
  if (event.matches) {
    // 1025px 이하일 때
    // #ham 작동 o
    ham.addEventListener('click', handleSmallScreenClick);
      // .hidden 클래스 제거
    document.querySelectorAll('#head-bottom .hidden').forEach(element => {
      element.classList.remove('hidden');
    });
    // #over에 .hidden 클래스 추가
    over.classList.add('hidden');
    // #under에서 .hidden 클래스 제거
    under.classList.remove('hidden');

    // #select 동작 작동동
    handleSmallScreenSelect();

  } else {
    // 1025px 이상일 때
    // #ham 작동 x
    ham.removeEventListener('click', handleSmallScreenClick);
    handleLargeScreenClick();
    // #over에서 .hidden 클래스 제거
    over.classList.remove('hidden');
    // #under에 .hidden 클래스 추가
    under.classList.add('hidden');
    // #select 옵션 되돌리기 추가
    handleLargeScreenSelect();
  }
});

// 초기 로드 시 이벤트 리스너 설정
if (mediaQueryList.matches) {
  ham.addEventListener('click', handleSmallScreenClick);
  // .hidden 클래스 제거
  document.querySelectorAll('#head-bottom .hidden').forEach(element => {
    element.classList.remove('hidden');
  });
  // #over에 .hidden 클래스 추가
  over.classList.add('hidden');
  // #under에서 .hidden 클래스 제거
  under.classList.remove('hidden');
  // #select 관련 동작 추가
  handleSmallScreenSelect();
} else {
  handleLargeScreenClick();
  // #over에서 .hidden 클래스 제거
  over.classList.remove('hidden');
  // #under에 .hidden 클래스 추가
  under.classList.add('hidden');
  // #select 옵션 되돌리기 추가
  handleLargeScreenSelect();
}


/* 431px 이하 footer 아코디언 메뉴 설정 */
function handleFooterAccordion() {
  var footerDivs = document.querySelectorAll("#footer-top .inner > div");

  footerDivs.forEach(function(div) {
    div.addEventListener("click", function() {
      // 클릭한 요소에 .active가 이미 있는 경우 제거
      if (div.classList.contains("active")) {
        div.classList.remove("active");
      } else {
        // 다른 요소에 들어간 "active" 제거하기
        footerDivs.forEach(function(re) {
          re.classList.remove("active");
        });
        // 클릭한 요소에 .active 추가
        div.classList.add("active");
      }
    });
  });
}

// 미디어 쿼리 설정
const footerMediaQueryList = window.matchMedia('(max-width: 431px)');

// 미디어 쿼리 변경 시 이벤트 리스너 설정
footerMediaQueryList.addEventListener('change', (event) => {
  if (event.matches) {
    handleFooterAccordion();
  } else {
    // 431px 이상일 때 active 클래스 제거
    var footerDivs = document.querySelectorAll("#footer-top .inner > div");
    footerDivs.forEach(function(div) {
      div.classList.remove("active");
    });
  }
});

// 초기 로드 시 이벤트 리스너 설정
if (footerMediaQueryList.matches) {
  handleFooterAccordion();
}
