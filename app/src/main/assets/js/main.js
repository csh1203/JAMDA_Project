/* do-exer */
let circleChart = document.getElementsByClassName('pie')[0];
let innerPercent = document.getElementsByClassName('complete-percent')[0];
let percent = 0;

circleChart.style.setProperty('--p', percent);
innerPercent.innerText = `${percent}%`

function goExercise(){
    window.location.href = "../html/exercise.html";
}
/* do-exer */

/* record-exer */
var likeDo = ['셀카', '단독 스케줄', '버블', '라이브', '인스타스토리'];
var exerciseTitle = ['스쿼트', '러닝', '플랭크', '버피', '런지'];
var exerciseRule = [3, 1, 2, 4, 2];
var exerciseUnit = ['set', 'km', 'set', 'min', 'set'];

var baseExerCount = [2, 4, 3, 1, 4];

var divHeight = Math.ceil(likeDo.length / 2) * 100 + (Math.ceil(likeDo.length / 2) - 1) * 16;
let recordExerDiv = document.getElementsByClassName('record-exercise')[0];
let exerKindDiv = document.getElementsByClassName('exer-kind-div')[0];
recordExerDiv.style.height = `calc(${divHeight}px + 80px)`;
exerKindDiv.style.height = `${divHeight}px`;
for(let i in likeDo){
    var exerDiv = document.createElement('div');
    exerDiv.className = "exer-div";
    exerDiv.style.width = "140px";
    exerDiv.style.height = "100px";

    var exerNameDiv = document.createElement('div');
    var exerTitle = document.createElement('div');
    var exerCount = document.createElement('div');
    var exerUnit = document.createElement('div');
    exerNameDiv.className = "exer-name-div";
    exerTitle.className = "exer-title";
    exerCount.className = "exer-count";
    exerUnit.className = "exer-unit";
    exerTitle.innerText = `${exerciseTitle[i]}`;
    exerCount.innerText = `${exerciseRule[i]}`;
    exerUnit.innerText = `${exerciseUnit[i]}`;
    exerNameDiv.appendChild(exerTitle);
    exerNameDiv.appendChild(exerCount);
    exerNameDiv.appendChild(exerUnit);

    var likePromise = document.createElement('div');
    likePromise.innerText = `${likeDo[i]}`;
    likePromise.className = "like-promise";

    var doCountDiv = document.createElement('div');
    // var doCountMinus = document.createElement('div');
    var doCountNum = document.createElement('div');
    // var doCountPlus = document.createElement('div');
    doCountDiv.className = 'do-count';
    // doCountMinus.className = 'do-count-minus';
    doCountNum.className = 'do-count-num';
    // doCountPlus.className = 'do-count-plus';
    // doCountMinus.innerHTML = `<iconify-icon icon="radix-icons:minus" class="do-count-minus"></iconify-icon>`;
    doCountDiv.innerHTML += `<iconify-icon icon="radix-icons:minus" class="do-count-minus"></iconify-icon>`;
    doCountNum.innerText += `${baseExerCount[i]}`;
    doCountDiv.appendChild(doCountNum);
    doCountDiv.innerHTML += `<iconify-icon icon="iconoir:plus" class="do-count-plus"></iconify-icon>`;
    // doCountPlus.innerHTML = `<iconify-icon icon="iconoir:plus" class="do-count-plus"></iconify-icon>`;
    // doCountDiv.appendChild(doCountMinus);
    // doCountDiv.appendChild(doCountPlus);

    exerDiv.appendChild(exerNameDiv);
    exerDiv.appendChild(likePromise);
    exerDiv.appendChild(doCountDiv);

    exerKindDiv.appendChild(exerDiv);
}

recordExerDiv.addEventListener('click', function(event){
    if(event.target.className === "do-count-minus" && event.target.parentElement.children[1].innerText >= 1){
        event.target.parentElement.children[1].innerText--;
    }else if(event.target.className === "do-count-plus"){
        event.target.parentElement.children[1].innerText++;
    }
    // console.log(event.target.className);
});
/* record-exer */

function goHowExercise(){
    window.location.href="./howExercise.html"
}



