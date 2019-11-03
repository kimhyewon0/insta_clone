const heart = document.querySelector('.heart_btn');
const header = document.querySelector('#header');
const sidebox = document.querySelector('.side_box');



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
        sidebox.removeAttribute('style')
    }
}
// 바로 호출하지 않고 새로운 함수를 만듦
window.addEventListener('scroll',scrollFucn);