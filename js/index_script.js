
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
  //effect: "creative",
  //creativeEffect: {
  //  prev: {
  //    shadow: true,
  //    translate: [0, 0, -400],
  //  },
  //  next: {
  //    translate: [0, "100%", 0],
  //  },
  //},
  
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
