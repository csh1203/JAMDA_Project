// import {addList}  from "/js/rule.js";
// let btn = document.getElementsByTagName("button");
// let scrollDiv = document.getElementById("tit"); 

function back(){
    window.location.href = "./rule.html";
}

function check(){
    var favorite_act = document.getElementById('favorite-action');
    var exer_select = document.getElementById('exer-select');
    var exer_nums = document.getElementById('exer-num');
    var exer_unit = document.getElementById('exer-unit');
    var exer_min = document.getElementById('exer-min');
    var exer_max = document.getElementById('exer-max');

    if(favorite_act.value.length === 0) {
        alert('최애의 행동을 입력해주세요!');
        return 0;
    }
    if(exer_select.value.length === 0) {
        alert('운동을 선택해주세요!');
        return 0;
    }
    if(exer_nums.value.length === 0) {
        alert('운동 횟수를 입력해주세요!');
        return 0;
    }
    if(exer_unit.value.length === 0) {
        alert('운동 단위를 입력해주세요!');
        return 0;
    }
    if(exer_min.value.length === 0) {
        alert('최솟값을 입력해주세요!');
        return 0;
    }
    if(exer_max.value.length === 0) {
        alert('최댓값 입력해주세요!');
        return 0;
    }
    if(exer_min.value > exer_max.value){
        alert('최댓값을 다시 입력해주세요!');
        return 0;
    }

    window.location.href = "./rule.html";
}