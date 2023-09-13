function fetchAndDisplayUserName() {
  // localStorage에서 token 값을 가져와서 출력
const token = localStorage.getItem('token');

axios
.get('http://43.201.10.121:3000/users/getUserInfo', {
  headers: {
    authorization: token,
  },
})

.then((response) => {
  const userName = response.data.name;
  const userBias = response.data.bias;
  const userWeight = response.data.weight;
  const userGoal_weight = response.data.goal_weight;
  const Dday = response.data.daysSinceRegistration;
  document.getElementById('user-name').innerHTML = `<span>${userName}</span>님`;
  document.getElementById('d-day').innerHTML = `<span style="font-weight: bold">${userBias}</span>와(과) 함께 운동한지  <span>${Dday}</span>일`;
  document.getElementById('present').innerHTML = `현재<span>${userWeight}kg</span>`;
  document.getElementById('goal').innerHTML = `목표<span>${userGoal_weight}kg</span>`;
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
    .post('http://43.201.10.121:3000/users/logout', {
      userid: id, 
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
  }
}

window.addEventListener('load', fetchAndDisplayUserName);
