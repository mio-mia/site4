/*
    EzenScrollClass 플러그인 
    최종수정일:2024.12.09

    *********************************************************************
    [옵션항목]
    baseline :
    'top'(기본값) - 화면의 위를 기준으로 적용
    'bottom' - 화면의 아래를 기준으로 적용
    'middle' - 화면의 가운데를 기준으로 적용
    정수 - 적용되는 위치값을 직접설정

    class : 부여되는 클래스명
    'scrolled'(기본값)

    add : baseline(기준)의 위치를 가감함
    정수 - 입력된 값만큼(px) 가감됨.
    실수(1>n>-1) - 입력된 값의 화면비만큼 값이 가감됨.

    markers : 기준선 표시
    논리값(true & false) - false(기본값)

    addFunction : function(){}
    - 클래스를 부여받을 때 함수를 호출함.

    removeFunction : function(){}
    - 클래스가 제거될 때 함수를 호출함.

    *********************************************************************

	[EzenScrollClass 호출(실행)방법]
    
    var [이름] = new EzenScrollClass("[대상]",{옵션}); 
    
    - "var" or "let" or "const "
    - [이름] : 적당히 아무이름 설정, 중복되면 안됨.
    - [대상] : CSS선택자로 작성
    - {옵션} : 필요없으면 생략가능, 메모장이나 플러그인의 주석내용 참조
*/


function EzenScrollClass(target="body", options={}){
                  
    var obj = {
        baseline:'top',
        class:'scrolled',
        add:0,
        markers:false,
        addFunction:function(){},
        removeFunction:function(){}
        
    };
    
	let el_list; //DOM 객체를 넣을 배열
   	let el_All = new Array(); 
    let win_h = 0;
    let base = 0;
	
    let item_top = 0;
	var baseline = document.createElement("div");
    //객체 병합
	
    Object.assign(obj, options);    
 
    function SGC_init(){
        el_list = document.querySelectorAll(target); 
        el_list.forEach((item,i)=>{ 
            item_top = item.getBoundingClientRect().top + window.scrollY;
            if(!isNaN(obj.baseline)) item_top = obj.baseline;

            el_All.push({
                target:item,
                top: item_top,
            });                     
        });     
		base = 0;
        win_h = window.innerHeight;
        
        if(obj.baseline=='bottom') base += win_h;
        if(obj.baseline=='middle') base += win_h / 2;                     
        
        if( obj.add <= 1 && obj.add >= -1 ){
            base += win_h * obj.add;
        }else{
            base += obj.add;    
        }

        
		console.log(base+"/"+win_h+"/"+obj.add );
        if(obj.markers){
            markers_Y(base);
        }           
    }
    function markers_view(y=0){        
        var text = document.createTextNode("Baseline");
        baseline.style.borderTop = "1px solid #f00";
        baseline.style.position = "fixed";
        baseline.style.top = y+"px";
        baseline.style.right = 0;
        baseline.style.zIndex = "99999";
        baseline.style.color = "red";
        document.body.appendChild(baseline);
        baseline.appendChild(text);
    }
	function markers_Y(y=0){
		baseline.style.top = y+"px";
	}
	
    function scrolled(){       
        var win_Y = window.scrollY; //window.pageYOffset;
        win_Y += base;


        el_All.forEach((item)=>{
        	if(win_Y > item.top){
                obj.addFunction();
                item.target.classList.add(obj.class);
            }else{
                obj.removeFunction();
                item.target.classList.remove(obj.class);
            }
        });       
    }    

      
    window.addEventListener('load', function() {       
		if(obj.markers){
            markers_view(base);
        }          	
        SGC_init();
        scrolled();
    });       
    window.addEventListener("resize", function(){
        SGC_init();
        scrolled();
    });
    window.addEventListener('scroll', scrolled);
};