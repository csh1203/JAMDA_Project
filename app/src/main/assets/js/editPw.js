
function change() {
    const currentPw = document.getElementById("current-pw").value;
    const newPw = document.getElementById("new-pw").value;
    const confirmPw = document.getElementById("confirm-pw").value;

    const token = localStorage.getItem("token");
  
    // 현재 비밀번호, 새 비밀번호, 비밀번호 확인의 유효성을 검사합니다.
    if (!currentPw || !newPw || !confirmPw) {
      alert("비밀번호를 입력하세요.");
      return;
    }
  
    if (newPw !== confirmPw) {
      alert("새 비밀번호와 비밀번호 확인이 일치하지 않습니다.");
      return;
    }

    function validatePassword(password) {
        const passwordRegex = /^(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[a-z\d@$!%*?&]{6,20}$/i;
        return passwordRegex.test(password);
    }

    if (!validatePassword(newPw)) {
        alert("비밀번호는 영문 소문자, 숫자, 특수문자를 사용하여 6~20자로 이루어져야 합니다.");
        return;
    }
  
    // 서버로 비밀번호 변경 요청을 보냅니다.
    axios
      .post("http://52.78.221.233:3000/users/change-password", {
        currentPassword: currentPw,
        newPassword: newPw,
      }, {headers: { authorization: token }})
      .then((response) => {
        alert(response.data.message); // 비밀번호 변경 결과 메시지를 표시
        // 비밀번호 변경이 성공하면 필요한 작업을 수행하세요.
        window.location.href='./editIdPw.html';
      })
      .catch((error) => {
        console.error("비밀번호 변경 중 오류 발생:", error);
        alert("비밀번호 변경 중 오류가 발생했습니다.");
      });
  }
  