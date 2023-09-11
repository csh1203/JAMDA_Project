function logout(){
    document.getElementsByClassName('logout-confirm')[0].style.visibility = "visible";
}

function check(flag){
    let confirmDiv = document.getElementsByClassName('logout-confirm')[0];
    confirmDiv.style.visibility = "hidden";
    if(flag){
        window.location.href = "./login.html";
    }
}

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
    document.getElementById('user-name').innerHTML = `<span>${userName}</span>님`;
  })
  .catch((error) => {
    console.error('사용자 정보를 가져오는 중 오류 발생:', error);
  });
    
}

window.addEventListener('load', fetchAndDisplayUserName);

