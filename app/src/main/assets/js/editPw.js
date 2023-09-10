function change(){
    let pw1 = document.getElementsByClassName('input-pw')[1].value;
    let pw_check = document.getElementById('pw-check').value;

    function validatePassword(password) {
        const passwordRegex = /^(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[a-z\d@$!%*?&]{6,20}$/i;
        return passwordRegex.test(password);
    }

    if (!validatePassword(pw1)) {
        alert("비밀번호는 영문 소문자, 숫자, 특수문자를 사용하여 6~20자로 이루어져야 합니다.");
        return;
      }

    if(pw1 !== pw_check){
        alert('새로운 비밀번호를 일치하지 않습니다.');
        return 0;
    }
    window.location.href='./editIdPw.html';
}