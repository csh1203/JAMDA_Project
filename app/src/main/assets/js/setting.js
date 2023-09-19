let today = new Date().getDate();
console.log(today);
function fetchAndDisplayUserName() {
  // localStorage에서 token 값을 가져와서 출력
  const token = localStorage.getItem('token');
  
  axios
    .get('http://52.78.221.233:3000/users/getUserInfo', {
      headers: {
        authorization: token,
      },
    })
    .then((response) => {
      const userName = response.data.name;
      const userBias = response.data.bias;
      const userWeight = response.data.weight;
      const userGoal_weight = response.data.goal_weight;
      const Dday = response.data.registration_date;

      // 디데이 설정 현재 날짜에서 Dday 빼면 됩니당
      let firstDay =new Date(Dday).getDate();
      console.log(firstDay);


      // 프로필 수정 이전의 무게
      const previousWeight = response.data.previousWeight; // 데이터베이스에서 가져와야 함

      // 무게 차이 계산
      const minus_kg = userWeight - previousWeight;

      document.getElementById('user-name').innerHTML = `<span>${userName}</span>님`;
      document.getElementById('d-day').innerHTML = `<span style="font-weight: bold">${userBias}</span>와(과) 함께 운동한지 <span>${firstDay-today+1}</span>일`;
      document.getElementById('present').innerHTML = `현재<span>${userWeight}kg</span>`;
      document.getElementById('goal').innerHTML = `목표<span>${userGoal_weight}kg</span>`;
      document.getElementById('minus_kg').innerHTML = `감량한 무게<span>${minus_kg}kg</span>`;
    })
    .catch((error) => {
      console.error('사용자 정보를 가져오는 중 오류 발생:', error);
    });
}



function logout(){
  document.getElementsByClassName('logout-confirm')[0].style.visibility = "visible";
}

function check(flag){
  let confirmDiv = document.getElementsByClassName('logout-confirm')[0];
  confirmDiv.style.visibility = "hidden";
  const id = localStorage.getItem('userid');
  if(flag){
    axios
    .post('http://52.78.221.233:3000/users/logout', {
      userid: id, // 사용자 ID를 적절한 값으로 대체하세요.
    })
    .then((response) => {
      if (response.status === 200) {
        // 로그아웃이 성공적으로 처리된 경우
        window.location.href = './login.html'; // 로그인 페이지로 이동하거나 다른 조치를 취할 수 있습니다.
      } else {
        console.error('로그아웃 실패:', response.data.message); // 실패한 경우 오류 메시지를 출력할 수 있습니다.
      }
    })
    .catch((error) => {
      console.error('로그아웃 중 오류 발생:', error);
    });
      window.location.href = "./login.html";
  }
}

window.addEventListener('load', fetchAndDisplayUserName);