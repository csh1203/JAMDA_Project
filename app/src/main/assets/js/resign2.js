var customCheckbox = document.getElementsByClassName('chbox');
var checkBox = document.getElementsByTagName('input');

function sitBtn(e){
    if(e.target.classList.contains('clickbox')){
        e.target.classList.remove('clickbox');
        e.target.classList.add('noclick');
        /*refactor : 값 받아가는 거 지안이가 어떻게 할 지 몰라서 일단 input 창 남겨둠... 필요없으면 지우시길*/
        e.target.previousElementSibling.checked=false;
    }
    else{
        e.target.classList.remove('noclick');
        e.target.classList.add('clickbox');
        e.target.previousElementSibling.checked=true;
    }
}