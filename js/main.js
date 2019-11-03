const heart = document.querySelector('.heart_btn');
const header = document.querySelector('#header');
const sidebox = document.querySelector('.side_box');
const variableWidth = document.querySelectorAll('.contents_box .contents');


heart.addEventListener('click',function () {
    heart.classList.toggle('on')
});

function resizeFunc(){
    if(pageYOffset >= 10){
        //fixed는 화면 기준임 그렇기 때문에 오른쪽으로 쏠려보임
        //그래서 이걸 컨텐츠 박스 옆에 붙이기 위해서 설정해줌
        //절반값 + 컨텐츠박스에서 떨어진 만큼을 더해서 표시해줌. (반응형에 대응하기 위해서)
        let calcWidth = (window.innerWidth*0.5) + 175;

        sidebox.style.left = calcWidth + 'px';
    }

    //화면이 800px 이하가 되었을 때 실행
    //해상도의 크기보다 커지가되면 스와이프를 할 때 좌우가 흔들리는 문제점이 생길 수 있다
    //해결하기 위해 작성 됨. -> '좌우값을 화면크기에 맞춰서 유지시키기'
    if(matchMedia('screen and (max-width : 800px)').matches){
        //모든 contents를 다 작동시키기위해서 반복문 설정함
        for(let i=0; i < variableWidth.length; i++){
            //20은 편차!
            variableWidth[i].style.width = window.innerWidth -20 + 'px';
        }
    }
    else{ //800보다 작아졌다가 높아졌을 때 삭제하기
        for(let i=0; i < variableWidth.length; i++){
            variableWidth[i].removeAttribute('style')
        }
    }
}

function scrollFucn(){
    //스크롤 할때마다 위치를 출력해줌
    console.log(pageYOffset);
    if (pageYOffset >= 10){
        header.classList.add('on');
        sidebox.classList.add('on');

        resizeFunc();
    }
    else{
        header.classList.remove('on');
        sidebox.classList.remove('on');
        // 고정된 left값을 삭제해주기 위함 -> 속성자체를 지우는게 편하다.
        sidebox.removeAttribute('style');
    }
}
// 바로 호출하지 않고 새로운 함수를 만듦
window.addEventListener('resize',resizeFunc);
window.addEventListener('scroll',scrollFucn);
