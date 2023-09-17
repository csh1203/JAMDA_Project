/* do-exer */
let circleChart = document.getElementsByClassName('pie')[0];
let innerPercent = document.getElementsByClassName('complete-percent')[0];
let percent = 0;

circleChart.style.setProperty('--p', percent);
innerPercent.innerText = `${percent}%`

function goExercise(){
    window.location.href = "../html/exercise.html";
} 

/* record-exer */
// var likeDo = ['셀카', '단독 스케줄', '버블', '라이브', '인스타스토리'];
// var exerciseTitle = ['스쿼트', '러닝', '플랭크', '버피', '런지'];
// var exerciseRule = [3, 1, 2, 4, 2];
// var exerciseUnit = ['set', 'km', 'set', 'min', 'set'];


var likeDo = [];
var exerciseTitle = [];
var exerciseRule = [];
var exerciseUnit = [];
var baseExerCount = [];
var uuid = '';

// 규칙을 불러오는 함수
// function fetchRules() {
function fetchRules() {
    const token = localStorage.getItem("token");

    axios.get('http://52.78.221.233:3000/users/getRules', {
        headers: {
            Authorization: token 
        }
    })
    .then((response) => {
        likeDo = response.data.activity;
        exerciseTitle = response.data.exercise;
        exerciseRule = response.data.activityNum;
        exerciseUnit = response.data.unit;
        count_min = response.data.count_min;
        count_max = response.data.count_max;
        baseExerCount = response.data.count;
        uuid = response.data.uuid;


        console.log(likeDo);
        console.log(exerciseTitle);
        console.log(exerciseRule);
        console.log(exerciseUnit);
        console.log(count_min);
        console.log(count_max);
        console.log(baseExerCount);
        console.log(uuid);
        
    
        makeDoExercise();

        return uuid;

    })
    .catch((error) => {
        console.error('Error fetching data:', error);
    });
}

fetchRules();

let recordExerDiv = document.getElementsByClassName('record-exercise')[0];
let exerKindDiv = document.getElementsByClassName('exer-kind-div')[0];

function makeDoExercise() {
    
    var divHeight = Math.ceil(likeDo.length / 2) * 100 + (Math.ceil(likeDo.length / 2) - 1) * 16;
  
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
        doCountNum.innerText += `0`;
        doCountDiv.appendChild(doCountNum);
        doCountDiv.innerHTML += `<iconify-icon icon="iconoir:plus" class="do-count-plus"></iconify-icon>`;
        // doCountPlus.innerHTML = `<iconify-icon icon="iconoir:plus" class="do-count-plus"></iconify-icon>`;
        // doCountDiv.appendChild(doCountMinus);
        // doCountDiv.appendChild(doCountPlus);

        exerDiv.appendChild(exerNameDiv);
        exerDiv.appendChild(likePromise);
        exerDiv.appendChild(doCountDiv);

        exerKindDiv.appendChild(exerDiv);

        console.log(uuid[0]);
    }
}

let correctUuid;
recordExerDiv.addEventListener('click', function(event){
    let doCount = document.getElementsByClassName('do-count');
// console.log(exerDiv);
    if(event.target.className === "do-count-minus" && event.target.parentElement.children[1].innerText >= 1){
        for(let i in doCount){
            if(doCount[i] === event.target.parentElement){
                event.target.parentElement.children[1].innerText--; 
                console.log(uuid[i]);       
                correctUuid = uuid[i];        
            }
        }
    }else if(event.target.className === "do-count-plus"){
        for(let i in doCount){
            if(doCount[i] === event.target.parentElement){
                event.target.parentElement.children[1].innerText++; 
                console.log(uuid[i]);               
            }
        }
    }
});

function increaseCount() {
    // 여기 아래에 correctUuid 불러와야함 
  
    // 아이디 중복 확인 API 엔드포인트 수정
    axios
    .post("http://52.78.221.233:3000/users/increaseCount", {
        uuid: id    // 여기 id 부분을 위에서 받아온 uuid[i]? 그거로 바꿔야함
    })
    .then((response) => {
        console.log("증가");
    })
    .catch((e) => {
        console.log(err);
    });
  }  

/* record-exer */
function goHowExercise(){
    window.location.href="./howExercise.html"
}