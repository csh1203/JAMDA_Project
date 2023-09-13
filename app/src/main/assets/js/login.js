function submitLogin() {
  var id = document.getElementById("id").value;
  var pw = document.getElementById("pw").value;

    // 클라이언트 로그인 후
  axios
  .post("http://43.201.10.121:3000/users/login", {
    userid: id,
    pw: pw,
  })
  .then((response) => {
    const token = response.data.token;
    const hasProfile = response.data.hasProfile; // 서버에서 받은 hasProfile 값

    localStorage.setItem("token", token);
    localStorage.setItem("userid", id);

    console.log(hasProfile);


    alert("로그인 되었습니다.");
    
    if (hasProfile === 0) {
      window.location.href = "/html/startingProfileSet.html"; // 프로필 설정이 필요한 경우
    } else {
      window.location.href = "/html/main.html"; // 이미 프로필 설정이 된 경우
    }
  })
  .catch((error) => {
    if (error.response && error.response.status === 401) {
      alert("아이디 또는 비밀번호가 일치하지 않습니다.");
    } else {
      alert("로그인 에러가 발생했습니다.");
      console.error("Error during login:", error);
    }
  });

}

