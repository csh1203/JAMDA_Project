function submit() {
  var name = document.getElementById("name").value;
  var bias = document.getElementById("bias").value;
  var weight = document.getElementById("weight").value;
  var goal_weight = document.getElementById("goal_weight").value;

  // 로컬 스토리지에서 유저 아이디 가져오기
  const token = localStorage.getItem("token");

  axios
    .post("http://43.201.10.121:3000/users/setProfile", {
      name: name,
      bias: bias,
      weight: weight,
      goal_weight: goal_weight,
    }, {headers: { authorization: token }},)
    .then((response) => {
      console.log("프로필 설정이 완료되었습니다.");
      alert("프로필이 설정되었습니다.");
      window.location.href = "/html/main.html";
    })
    .catch((e) => {
      console.error("프로필 설정 중 오류 발생:", e);
      alert("프로필 설정 중 오류가 발생했습니다.");
    });
}
