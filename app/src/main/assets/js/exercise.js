
var exerciseTitle;
var exerciseRule;
var exerciseUnit;
var baseExerCount;
var accumlate = [];
var count_max;
var uuid;

window.onload = function () {
  fetchRules();
}

function fetchRules() {
  // 사용자의 Token을 로컬 스토리지에서 가져옵니다.
  const token = localStorage.getItem("token");

    // 서버로 GET 요청을 보냅니다.
  axios.get('http://52.78.221.233:3000/users/getRules', {
      headers: {
          Authorization: token // 토큰을 헤더에 포함
      }
  })
  .then((response) => {
      likeDo = response.data.activity;
      exerciseTitle = response.data.exercise;
      exerciseRule = response.data.activityNum;
      exerciseUnit = response.data.unit;
      baseExerCount = response.data.count;
      count_min = response.data.count_min;
      count_max = response.data.count_max;
      uuid = response.data.uuid;

      for(let i in count_min){
        accumlate[i] = count_min[i] + (baseExerCount[i] * (Number)(exerciseRule[i]));
      }
      console.log(uuid);
      makeSilder();
      makeDoExercise();
      makeBase();
      getCompleteDate();
      

  })
  .catch((error) => {
      console.error('Error fetching data:', error);
  });
}

function getGoalCountFirst(){
  for(let i in uuid){
    getTodayCount(uuid[i], i);
  }
}

function makeSilder(){

  for(var i = 0; i < Math.ceil(exerciseTitle.length / 6); i++){
    var totalDiv = document.createElement('div');
    totalDiv.className = `exercise-page page${i+1}`;
    totalDiv.style.width = "100%";
    for(var j = 0; j<6; j++){
      if(i * 6 + j > exerciseTitle.length - 1) break;
      const totalExerise = document.createElement('div');
      totalExerise.className = "show-exercise";
      var exerTitle = document.createElement('div');
      exerTitle.className = "exercise-title";
      exerTitle.innerText = `${exerciseTitle[i * 6 + j]}`;
  
      var exerCount = document.createElement('div');
      exerCount.className = "exercise-count";
      exerCount.innerText = `${accumlate[i * 6 + j]}`
      var exerUnit = document.createElement('div');
      exerUnit.classList = 'exercise-unit';
      exerUnit.innerText = `${exerciseUnit[i * 6 + j]}`;
  
      totalExerise.appendChild(exerTitle);
      totalExerise.appendChild(exerCount);
      totalExerise.appendChild(exerUnit);
  
      totalDiv.appendChild(totalExerise);
    }
    var slider = document.getElementsByClassName('kind_slider')[0];
    slider.appendChild(totalDiv);
      // slider
  }

  if(Math.ceil(exerciseTitle.length / 6) <= 1) moveButton.style.visibility = "hidden";
  else{
  for(var i = 1; i<=Math.ceil(exerciseTitle.length / 6); i++){
    const pages = document.createElement('input');
    pages.type = "radio";
    pages.name = "pageIndex";
    pages.style.border = 0;
    pages.className = `page-radio radio${i-1}`;
    if(i === 1) pages.checked = true;
    document.getElementsByClassName("page-count")[0].appendChild(pages);
  }

}
}


const kindWrap = document.getElementsByClassName('kind_wrap')[0];
const kindSilder = document.getElementsByClassName('kind_silder')[0];
const exercisePage = document.getElementsByClassName('exercise-page')[0];
const moveButton = document.getElementsByClassName('arrow')[0];
const exercisePageLenght =  document.getElementsByClassName('exercise-page').length;
const pageCnt = document.getElementsByClassName('page-count')[0];




let currentIdx = 0; // 슬라이드 현재 번호
let translate = 0; // 슬라이드 위치 값
moveButton.addEventListener('click', moveSlide);
let totalExerisePage = document.getElementsByClassName('kind_slider')[0];

function moveSlide(event) {
  event.preventDefault();
  var slider = document.getElementsByClassName('kind_slider')[0];

  if (event.target.className === 'next-button') {
    if (currentIdx !== exercisePageLenght -1) {
      translate -= totalExerisePage.clientWidth;
      slider.style.transform = `translateX(${translate}px)`;
      currentIdx += 1;
    }
  } else if (event.target.className === 'prev-button') {
      if (currentIdx !== 0) {
        translate += totalExerisePage.clientWidth;
        slider.style.transform = `translateX(${translate}px)`;
        currentIdx -= 1;
      }
    }
    var currectPage = document.getElementsByClassName(`radio${currentIdx}`)[0];
    currectPage.checked = true;
}




function makeDoExercise() {
  var doExerciseDiv = document.getElementsByClassName('do-exercise')[0];
  var doExerciseHeight = doExerciseDiv.clientHeight + (90 * exerciseTitle.length) + (20 * exerciseTitle.length - 1);
  doExerciseDiv.style.height = `${doExerciseHeight}px`;
  
  var exercises = document.createElement('div');
  exercises.className = "exercise-div"
  exercises.addEventListener('input', (event) => moveDoExercise(event));

  for(var i in exerciseTitle){
    var doExercise = document.createElement('div');
    var doExerTitle = document.createElement('div');
    var doExerDid = document.createElement('div');
    var doExerSlash = document.createElement('div');
    var doExerCount = document.createElement('div');
    var doExerUnit = document.createElement('div');
    var doExerSliderDiv = document.createElement('div');
    var doExerSlider = document.createElement('input');
    var doExerGraduation = document.createElement('div');
  
    doExercise.className = "exercise-kind";
    doExerTitle.className = "do-exer-title";
    doExerDid.className = "do-exer-did";
    doExerSlash.className = "doExerSlash";
    doExerCount.className = "do-exer-count";
    doExerUnit.className = "do-exer-unit";
    doExerSliderDiv.className = "do-exer-slider-div";
    doExerSlider.className = "do-exer-slider";
    doExerGraduation.className = "do-exer-graduation";
  
    doExerTitle.innerHTML = `${exerciseTitle[i]}`;
    doExerDid.innerText = 0;
    doExerSlash.innerText = '/';
    doExerCount.innerHTML = `${accumlate[i]}`;
    doExerUnit.innerHTML = `${exerciseUnit[i]}`;
    doExerSlider.type = "range";
    doExerSlider.min = 0;
    doExerSlider.max = `${accumlate[i]}`;
    doExerSlider.value = 0;
  
    for(let j = 1; j<accumlate[i]; j++){
      var graduation = document.createElement('div');
      graduation.className = "graduation";
      doExerGraduation.appendChild(graduation);
    }
  
    doExerSliderDiv.appendChild(doExerSlider);
    doExerSliderDiv.appendChild(doExerGraduation);
  
    doExercise.appendChild(doExerTitle);
    doExercise.appendChild(doExerDid);
    doExercise.appendChild(doExerSlash);
    doExercise.appendChild(doExerCount);
    doExercise.appendChild(doExerUnit);
    doExercise.appendChild(doExerSliderDiv);
  
    exercises.appendChild(doExercise);
  
    doExerciseDiv.appendChild(exercises);
  }
}



var completeButton = document.getElementsByClassName('complete-exercise')[0];
let flag = false;
function moveDoExercise(event){
  var parent = event.target.parentElement;

  console.log(parent);
  console.log(parent.children[1]);

  for(let i=0; i<event.target.max-1; i++) {
    var bar = parent.children[1].children[i];
    if(i < event.target.value) bar.style.background = "#FF6666";
    else bar.style.background = "#ececec";

  }

  var parent = event.target.parentElement;
  // parent.children[1].innerText = `${event.target.value}`;
  parent.parentElement.children[1].innerText = `${event.target.value}`
  var gradient_value = 100 / event.target.attributes.max.value;
  event.target.style.background = 'linear-gradient(to right, #FF6666 0%, #FF6666 '+gradient_value * event.target.value +'%, rgb(236, 236, 236) ' +gradient_value *  event.target.value + '%, rgb(236, 236, 236) 100%)';

  flag = true;

  for(var i = 0; i<document.getElementsByClassName('exercise-kind').length; i++){
    if(document.getElementsByClassName('exercise-kind')[i].children[1].innerText !== document.getElementsByClassName('exercise-kind')[i].children[3].innerText){
      flag = false;
      break;
    }else flag = true;
  }

  if(flag === true){
    completeButton.style.backgroundColor = "#FF6666";
    completeButton.style.cursor = "pointer";
  }else{
    completeButton.style.backgroundColor = "#FFC2C2";
  }
}


function completeExerciseButton(){
  if(flag === true){
    window.location.href = "../html/exerciseComplete.html";
  }
}

let resetCount = [];
let changeCount = [];
function makeBase(){
  for(var i in baseExerCount){
    resetCount.push(baseExerCount[i]);
    changeCount.push(baseExerCount[i]);
  }
}


function goalSetting(){
  var lastDiv = document.getElementsByClassName('changeGoal')[0];
  var buttonDiv = document.getElementsByClassName('button-div')[0];
  lastDiv.style.visibility = "visible"

  if(document.getElementsByClassName('rule').length === 0){

    var baseRuleDiv = document.createElement('div');
    baseRuleDiv.className = "base-rule-div";
    buttonDiv.before(baseRuleDiv);

    for(var i in exerciseTitle){
      var baseRule = document.createElement('div');
      var exerName = document.createElement('div');
      var moveCount = document.createElement('div');
      baseRule.className = "rule";
      exerName.className = "exercise-name";
      moveCount.className = "move-count";

      var goalTitle = document.createElement('div');
      var goalUnit = document.createElement('div');
      var goalMinus = document.createElement('div');
      var goalCount = document.createElement('div');
      var goalPlus = document.createElement('div');

      goalTitle.className = "goal-title";
      goalUnit.className = "goal-unit";
      goalMinus.className = "goal-minus";
      goalCount.className = "goal-count";
      goalPlus.className = "goal-plus";

      goalMinus.onclick = (event) => minusClick(event);
      goalPlus.onclick = (event) => plusClick(event);

      goalTitle.innerText = `${exerciseTitle[i]}`;
      goalUnit.innerText = `/${exerciseUnit[i]}`;
      goalMinus.innerHTML = `<iconify-icon icon="radix-icons:minus" class="goal-minus"></iconify-icon>`;
      goalCount.innerText = `${resetCount[i]}`;
      goalPlus.innerHTML = `<iconify-icon icon="iconoir:plus" class="goal-plus"></iconify-icon>`;

      exerName.appendChild(goalTitle);
      exerName.appendChild(goalUnit);

      moveCount.appendChild(goalMinus);
      moveCount.appendChild(goalCount);
      moveCount.appendChild(goalPlus);

      baseRule.appendChild(exerName);
      baseRule.appendChild(moveCount);

      baseRuleDiv.appendChild(baseRule);
    }
  }else{
    for(var i in exerciseTitle){
      let changeNumber = document.getElementsByClassName('goal-count');
      for(let j in changeNumber){
        changeNumber[i].innerText = resetCount[i];
      }
    }
  }

  getGoalCountFirst();

  let scrollDiv = document.getElementsByClassName("base-rule-div")[0];
  if(scrollDiv.scrollTop + scrollDiv.clientHeight !== scrollDiv.scrollHeight){
    scrollDiv.style.boxShadow = "inset 0 0 10px 7px rgba(0, 0, 0, 0.03)"
  }

  scrollDiv.addEventListener('scroll', () => {
    if(scrollDiv.scrollTop + scrollDiv.clientHeight !== scrollDiv.scrollHeight){
      scrollDiv.style.boxShadow = "inset 0 0 10px 7px rgba(0, 0, 0, 0.03)"
    }else{
      scrollDiv.style.boxShadow = "inset 0 0 0 0 rgba(0, 0, 0, 0)"
    }
  });
  // function
}

function minusClick(event){
    let selectRule = event.target.parentElement.parentElement.parentElement;
    let count = event.target.parentElement.parentElement.children[1];
    let rules = document.getElementsByClassName('rule');

    // console.log(event.target);

    if(event.target.className == "goal-minus" && Number(count.innerText) >= 1){
      for(let i in document.getElementsByClassName('goal-count')){
        if(rules[i] === selectRule){
          changeCount[i] -= 1;
          count.innerText = Number(count.innerText) - 1;
        }
      }
    }
}

function plusClick(event){
  let selectRule = event.target.parentElement.parentElement.parentElement;
  let count = event.target.parentElement.parentElement.children[1];
  let rules = document.getElementsByClassName('rule');

  if(event.target.className == "goal-plus"){
    for(let i in document.getElementsByClassName('goal-count')){
      if(rules[i] === selectRule && count_max[i] > Number(count.innerText)){
        changeCount[i] += 1;
        count.innerText = Number(count.innerText) + 1;
      }
    }
  }else return;
}

function getTodayCount(uuid, i) {  // 오늘의 목표 카운트 값 불러오는 함수 
  let goalCount = document.getElementsByClassName('goal-count');
  axios
  .post("http://52.78.221.233:3000/users/getTodayCount", {
      uuid: uuid    
  })
  .then((response) => {
    const today_count = response.data.today_count;
    console.log(i, goalCount[i]);
    goalCount[i].innerText = `${today_count}`;
    console.log(today_count);
  })
  .catch((e) => {
      console.log(e);
  });
} 

var closeButton = document.getElementsByClassName('close')[0];
var settingGoal = document.getElementsByClassName('changeGoal')[0];

closeButton.addEventListener('click', function(event){
  settingGoal.style.visibility = "hidden";
  // let counts = document.getElementsByClassName('goal-count');
});

function Okay(){
  settingGoal.style.visibility = "hidden";
  let goalDiv = document.getElementsByClassName('goal-count');
  console.log(goalDiv);
  // 목표 값이 들어있는 배열
  let goalData = [];
  for(let i = 0; i<goalDiv.length; i++){
    goalData.push(goalDiv[i].innerHTML);
  }
  console.log(goalData);
}

// });


function getCompleteDate(){
  const token = localStorage.getItem("token");
  let today = new Date().getDate();
  console.log(today);

  axios.get('http://52.78.221.233:3000/users/getCompleteDate', {
      headers: {
          Authorization: token // 토큰을 헤더에 포함
      }
    })
    .then((response) => {
      let completeDate = response.data.completedate;
      // console.log(typeof (typeof completeDate));
      if((typeof completeDate) === "number"){
        if(completeDate == today){
          document.getElementsByClassName('complete-exercise')[0].innerText = "완료함";
        }
      }else{
        if(completeDate.indexOf(today) != -1){
          document.getElementsByClassName('complete-exercise')[0].innerText = "완료함";
        }
      }
      console.log(completeDate);
      
    })
    .catch((error) => {
      console.error('날짜를 불러오는 중 오류:', error);
    });
}











