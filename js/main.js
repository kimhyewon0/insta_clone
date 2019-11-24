const header = document.querySelector('#header');
const sidebox = document.querySelector('.side_box');
const variableWidth = document.querySelectorAll('.contents_box .contents');
const delegation = document.querySelector('.contents_box');



// event delegation 대상의 부모에게 떠넘김
// 예를 들어 게시글이 100개 있는데 그 게시글의 모든 하트를 눌렀을때 100개의 이벤트가 필요함
// 불필요한 이벤트 추가를 하지 않게 하기위해서 사용함
function delegationFunc(e){
    let elem = e.target;
    console.log(elem);

    while(!elem.getAttribute('data-name')){
        //클릭시 데이터 네임이 없을 경우 실행

        //데이터노드가 없을 경우에는 부모노드의 data-name을 찾음
        elem = elem.parentNode;

        if(elem.nodeName === 'BODY'){
            // 부모노드가 body일 경우 null을 주고 함수종료
            elem = null;
            return;
        }

    }

    if(elem.matches('[data-name="heartbeat"]')){
        //클릭한 엘리먼트의 대상의 데이터 네임속성이 heartbeat라는 속성을 가지고 있을 때 이 문장이 실행됨
        console.log('하트');
        let pk = elem.getAttribute('name');

        $.ajax({
            type: 'POST',
            url: 'data/like.json',
            data: {pk},
            dataType: 'json',
            success: function(response){

                let likecount = document.querySelector('#like-count-37');
                likecount.innerHTML = "좋아요" + response.like_count + "개";
            },
            //ajax가 먹히지 않을 경우
            error:function (request, status, error) {
                alert('로그인이 필요합니다.');
                window.location.replace('www.daum.net');
            }
        })


    }else if(elem.matches('[data-name="bookmark"]')){
        console.log('북마크');

        //북마크부분의 name을 가져와서 pk로 지정해줌
        let pk = elem.getAttribute('name');

        $.ajax({
            type: 'POST',
            url: 'data/bookmark.json',
            data: {pk},
            dataType: 'json',
            success: function(response){
                let bookmarkCount = document.querySelector('#bookmark-count-37');
                bookmarkCount.innerHTML = '북마크' + response.bookmark_count + '개';
            },
            error:function (request, status, error) {
                alert('로그인이 필요합니다.');
                window.location.replace('www.daum.net');
            }
        })

    }else if(elem.matches('[data-name="comment"]')){
        let content = document.querySelector('#add-comment-post-37 > input[type=text]').value;

        //글자수 제한하기
        if(content.length > 140){
            alert('댓글은 최대 140자 입니다. 현재글자수' + content.length);
            return;
        }

        $.ajax({
            type: 'POST',
            url: './comment.html', //데이터타입을 html으로 받을 것
            data:{
                'pk': 37,
                'content': content,
            },
            dataType:'html',
            success:function (data) {
                document.querySelector('#comment-list-ajax-post-37').insertAdjacentHTML('afterbegin',data); //태그 자체를 추가하기
            },
            error:function (request, status, error) {
                alert('문제가 발생했습니다.');
            }
        });

    }else if(elem.matches('[data-name="comment_delete"]')){

    }else if(elem.matches('[data-name="follow"]')){

    }

    elem.classList.toggle('on');

}

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
            if(window.innerWidth>600){
                variableWidth[i].removeAttribute('style');
            }
        }
    }
}

function scrollFucn(){
    //스크롤 할때마다 위치를 출력해줌
    // console.log(pageYOffset);
    if (pageYOffset >= 10){
        header.classList.add('on');
        if (sidebox){
            sidebox.classList.add('on')
        }

        resizeFunc();
    }
    else{
        header.classList.remove('on');
        if (sidebox){
            sidebox.classList.remove('on');

        }
        // 고정된 left값을 삭제해주기 위함 -> 속성자체를 지우는게 편하다.
        sidebox.removeAttribute('style');
    }
}

setTimeout(function () {
    scrollTo(0,0)
},100)
// 바로 호출하지 않고 새로운 함수를 만듦

if(delegation){
    window.addEventListener('click',delegationFunc);

}
window.addEventListener('resize',resizeFunc);
window.addEventListener('scroll',scrollFucn);


