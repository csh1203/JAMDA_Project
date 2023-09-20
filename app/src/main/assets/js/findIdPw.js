let alertDiv = document.getElementsByClassName('alert')[0];
let alertTitle = document.getElementsByClassName('alert-title')[0];

let menu =[...document.getElementsByClassName("sub-menu")];
let menulist = document.getElementsByClassName("slide")[0];
let findid = document.getElementsByClassName("findid")[0];
let findpw = document.getElementsByClassName("findpw")[0];

let resultTxt = document.querySelector('.showid');

let nowId = document.getElementById('nowid').value;
let newPw = document.getElementById('newpw').value;
let checkPw = document.getElementById('newpw_check').value;

id = '1234';
resultTxt.innerText = `회원님의 아이디는 ${id} 입니다`;

for(var i in menu){
    menu[i].addEventListener("click", (e)=>{
    if(e.target.innerText == "아이디"){
        menulist.style.animationName = 'rollback-ani';
        findid.style.display = "flex";
        findpw.style.display = "none";
    }        
    else{
        menulist.style.animationName = 'box-ani';
        findid.style.display = "none";
        findpw.style.display = "flex";
    }
});
}

//비밀번호 변경되면 변경되었습니다 alert 필요 
function validatePassword() {
    const pwCheck = /^(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[a-z\d@$!%*?&]{6,20}$/i;
    console.log(pwCheck.test(newPw));
    console.log(newPw);
    return pwCheck.test(newPw);

  }

function paswordCheck() {
    if(nowId == ''){
        alertDiv.style.visibility = "visible";
        alertTitle.innerText = "아이디를 입력해 주세요";  
    }
    if (!validatePassword(newPw)) {
        alertDiv.style.visibility = "visible";
        alertTitle.innerText = "비밀번호는 영문 소문자, 숫자, 특수문자를 사용하여 6~20자로 이루어져야 합니다.";
    }
    else{
        alertDiv.style.visibility = "visible";
        alertTitle.innerText = "변경되었습니다";

    }
    if (newPw !== checkPw) {
        alertDiv.style.visibility = "visible";
        alertTitle.innerText = "비밀번호가 일치하지 않습니다.";
    }
}
function alertCheck(){
  alertDiv.style.visibility = "hidden"; 
//   location.href = '../html/login.html';
}





// // 인증번호 보내는 함수
// function emailsubmit() {
//     var email = document.getElementById("email").value;
//     var authCode = document.getElementById("auth").value;
//   axios
//     // 아이디 중복 확인 API 엔드포인52.78.221.233os
//     .post("http://52.78.221.233:3000/users/certificate", {
//       email: email,
//       authCode : authCode
//     })
//     .then((response) => {
//       alertDiv.style.visibility = "visible";
//       alertTitle.innerText = '이메일을 발송했습니다.';

//     })
//     .catch((e) => {
//     console.error("Error during duplicate check:", e);
//     alertDiv.style.visibility = "visible";
//     alertTitle.innerText = '에러가 발생했습니다.';
//     });
//   }  
    
    
//   let isEmailVerified = false; // 이메일 인증 상태를 나타내는 변수
    
//   // 인증번호 확인 함수
//   function checkAuthCode() {
//     var email = document.getElementById("email").value;
//     var authCode = document.getElementById("auth").value; // 입력한 인증번호 가져오기
  
//     if (authCode.trim() === "") {
//       alertDiv.style.visibility = "visible";
//       alertTitle.innerText = '인증번호를 입력해주세요';
//       return;
//     }
//     axios
//       .post("http://52.78.221.233:3000/users/check-auth-code", {
//         email: email,
//         code: authCode,
//       })
//       .then((response) => {
//         if (response.status === 200 && response.data.message === '인증번호가 확인되었습니다.') {
//           isEmailVerified = true; // 이메일 인증 성공
//           alertDiv.style.visibility = "visible";
//           alertTitle.innerText = '인증번호가 확인되었습니다';
//         } else {
//           isEmailVerified = false; // 이메일 인증 실패
          
//           alertDiv.style.visibility = "visible";
//           alertTitle.innerText = '인증번호가 일치하지 않습니다. 다시 확인해주세요.';
//         }
//       })
//       .catch((e) => {
//         console.error("Error during auth code check:", e);
//         alertDiv.style.visibility = "visible";
//         alertTitle.innerText = '에러가 발생했습니다.';
//       });
//   }  
          
// 아이디 불러오는 함수 
function findId() {
  var email = document.getElementById("email").value;

  axios
    .post("http://52.78.221.233:3000/users/findUserId", {
      email: email,
    })
    .then((response) => {
      const userid = response.data.userId;
      console.log(userid);
    })
    .catch((e) => {
      console.error("Error during auth code check:", e);
      alertDiv.style.visibility = "visible";
      alertTitle.innerText = '에러가 발생했습니다.';
    });
}
 