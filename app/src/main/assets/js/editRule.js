

let addAlertDiv = document.getElementsByClassName('add-alert')[0];
let addAlertTitle = document.getElementsByClassName('add-alert-title')[0];

function alertCheck(){
    addAlertDiv.style.visibility = "hidden";
    
}

let listUuid = localStorage.getItem('uuid') //uuid 값 string 형태로 받아서 배열 형태로 바꿈 
console.log(listUuid); 


let likeDo, exerciseTitle, exerciseRule, exerciseUnit, count_min, count_max,baseExerCount;
function addRuleAndBack() {
  
    var favorite_act = document.getElementById('activity');
  var exer_select = document.getElementsByClassName('label')[0];
  var exer_nums = document.getElementById('activity_num');
  var exer_unit = document.getElementsByClassName('label')[1];
  var exer_min = document.getElementById('count_min');
  var exer_max = document.getElementById('count_max');

  if (exer_select.innerHTML == '<input type="text"> <img src="../image/ep_arrow-up.svg">') {
      exer_select = exer_select.firstChild.value;
  } else {
      exer_select = exer_select.innerText;
  }

  if (exer_unit.innerHTML == '<input type="text"> <img src="../image/ep_arrow-up.svg">') {
      exer_unit = exer_unit.firstChild.value;
  } else {
      exer_unit = exer_unit.innerText;
  }

  // favorite_act.value = likeDo;
  // // exer_select = exerciseRule;
  // exer_nums.value = exerciseTitle;
  // exer_unit = exer_unit;
  // exer_min.value = count_min;
  // exer_max.value = count_max;

    console.log(favorite_act.value);
    console.log(exer_select);
    console.log(exer_nums.value);
    console.log(exer_unit);
    console.log(exer_min.value);
    console.log(exer_max.value);

  if (favorite_act.value.length === 0) {
    //   alert('최애의 행동을 입력해주세요!');
    addAlertDiv.style.visibility = "visible";
    addAlertTitle.innerText = '최애의 행동을 입력해주세요!';
      return 0;
  }
  if (exer_select.length === 0 || exer_select == "운동") {
    addAlertDiv.style.visibility = "visible";
    addAlertTitle.innerText = '운동을 선택해주세요!';
      return 0;
  }
  if (exer_nums.value.length === 0) {
    addAlertDiv.style.visibility = "visible";
    addAlertTitle.innerText = '운동 횟수를 입력해주세요!';
      return 0;
  }
  if(isNaN(exer_nums.value)){
    addAlertDiv.style.visibility = "visible";
    addAlertTitle.innerText = '운동 횟수를 다시 입력해주세요!';
    return 0;
  }
  if (exer_unit.length === 0 || exer_unit == "단위") {
    addAlertDiv.style.visibility = "visible";
    addAlertTitle.innerText = '운동 단위를 입력해주세요!';
      return 0;
  }
  if (exer_min.value.length === 0) {
    addAlertDiv.style.visibility = "visible";
    addAlertTitle.innerText = '최솟값을 입력해주세요!';
      return 0;
  }
  if (exer_max.value.length === 0) {
    addAlertDiv.style.visibility = "visible";
    addAlertTitle.innerText = '최댓값 입력해주세요!';
      return 0;
  }
  if(isNaN(exer_min.value)){
    addAlertDiv.style.visibility = "visible";
    addAlertTitle.innerText = '최솟값을 다시 입력해주세요!';
    return 0;
  }

  if (exer_min.value > exer_max.value || isNaN(exer_max.value)) {
    addAlertDiv.style.visibility = "visible";
    addAlertTitle.innerText = '최댓값을 다시 입력해주세요!';
    return 0;
  }

  const id = localStorage.getItem("userid");

//   // 서버로 데이터 전송
//   axios.post("http://52.78.221.233:3000/users/rules", {
//           userid: id,
//           activity: favorite_act.value,
//           exercise: exer_select,
//           activity_num: exer_nums.value,
//           unit: exer_unit,
//           count_min: exer_min.value,
//           count_max: exer_max.value
//       }).then((response) => {
//           console.log("rules add successful!");
//           alert("규칙이 추가 되었습니다.");
//           window.location.href = "/html/rule.html";
//       }).catch((error) => {
//           console.error("Error adding rule:", error);
//           alert("규칙 추가 중 오류가 발생했습니다.");
//       });

//       localStorage.removeItem('btn-status');
//       localStorage.removeItem('slide_box_state');

//       localStorage.setItem("slide_box_state",'open');
//       localStorage.setItem('btn-status', 'click');
//         // 이후 현재 페이지를 새로고침하여 rule.html로 돌아가기
//       // window.location.replace( '../html/rule.html');
// }
}

// 규칙을 불러오는 함수
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
      count_min = response.data.count_min;
      count_max = response.data.count_max;
      baseExerCount = response.data.count;

      // console.log(likeDo);
      // console.log(exerciseTitle);
      // console.log(exerciseRule);
      // console.log(exerciseUnit);
      // console.log(count_min);
      // console.log(count_max);
      // console.log(baseExerCount);
      addRuleAndBack();
 
  })
  .catch((error) => {
      console.error('Error fetching data:', error);
      // 오류 처리를 추가하세요.
      // 예: showError(error);
  });
}

fetchRules();

function back(){
  window.location.href = "./rule.html";
}


function setMoveToTopFlag() {
  localStorage.setItem('moveToTop', 'true');
}

setMoveToTopFlag();