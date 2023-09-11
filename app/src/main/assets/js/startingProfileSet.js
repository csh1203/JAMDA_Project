function submit() {
    var name = document.getElementById("name").value;
    var bias = document.getElementById("bias").value;
    var weight = document.getElementById("weight").value;
    var goal_weight = document.getElementById("goal_weight").value;
    // 프로필 설정 요청 시 클라이언트에서 저장된 토큰을 서버로 보냄
    const token = localStorage.getItem("token");
  
    axios
      .post("http://43.201.10.121:3000/users/setProfile", { // URL 수정
        accesstoken: token, // 혹은 필요에 따라 사용자 아이디로 전송
        name: name,
        bias: bias,
        weight: weight,
        goal_weight : goal_weight
      })
      .then((response) => {
        console.log("Registration successful!");
        alert("프로필이 설정되었습니다.");
        window.location.href = "/html/main.html";
      })
      .catch((e) => {
        console.error("Error during registration:", e);
        alert("에러가 발생했습니다.");
      });
  }