let menu =[...document.getElementsByClassName("sub-menu")];
let menulist = document.getElementsByClassName("slide")[0];
let findid = document.getElementsByClassName("findid")[0];
let findpw = document.getElementsByClassName("findpw")[0];
let input = document.getElementsByTagName("input");
let button = document.querySelectorAll(".inputbox > input");
let btn = document.getElementsByClassName("in");
let find = document.getElementsByClassName("find");
btn[1].disabled = true;
btn[0].disabled = false;
find[0].disabled = true;
find[0].style.background="rgba(255, 194, 194, 1)";
for(var i in menu){
    menu[i].addEventListener("click", (e)=>{
    // console.log(e.target.animationName);
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
function disabledBtn(object){

    for(var i =0; i<btn.length; i++){
        //11글자 채우면 활성화
        if(btn[0] === object){
            btn[1].nextElementSibling.disabled = true;
            btn[0].nextElementSibling.style.background = "rgba(255, 102, 102, 1)";
            btn[0].disabled = true;
            btn[1].disabled = false;
            find[0].style.background ="rgba(255, 194, 194, 1)";
            find[0].disabled = true;
        }
        else if(btn[1] === object){
            btn[0].nextElementSibling.disabled = true;
            btn[0].nextElementSibling.style.background = "rgba(255, 194, 194, 1)";
            btn[1].nextElementSibling.style.background = "rgba(255, 102, 102, 1)";
            btn[1].disabled = true;
            btn[0].disabled = false;
            btn[0].disabled = false;
            find[0].disabled = false;
            notEdit();
        }
        else{}
    }
}
function notEdit(){
    find[0].style.background= "rgba(255, 102, 102, 1)";
    btn[0].disabled = true;
    btn[1].nextElementSibling.disabled=true;
    btn[1].nextElementSibling.style.background = "rgba(255, 194, 194, 1)";
}

// 인증번호 보내는 함수
function emailsubmit() {
    var email = document.getElementById("email").value;
    var authCode = document.getElementById("auth").value;
  
    // 아이디 중복 확인 API 엔드포인트 수정
    axios
    .post("http://localhost:3000/users/certificate", {
      email: email,
      authCode : authCode
    })
    .then((response) => {
      alert("이메일을 발송했습니다.");
    })
    .catch((e) => {
    console.error("Error during duplicate check:", e);
    alert("에러가 발생했습니다.");
    });
  }  
    
    
  let isEmailVerified = false; // 이메일 인증 상태를 나타내는 변수
    
  // 인증번호 확인 함수
  function checkAuthCode() {
    var email = document.getElementById("email").value;
    var authCode = document.getElementById("auth").value; // 입력한 인증번호 가져오기
  
    if (authCode.trim() === "") {
      alert("인증번호를 입력해주세요.");
      return;
    }
  
    axios
      .post("http://localhost:3000/users/check-auth-code", {
        email: email,
        code: authCode,
      })
      .then((response) => {
        if (response.status === 200 && response.data.message === '인증번호가 확인되었습니다.') {
          isEmailVerified = true; // 이메일 인증 성공
          alert("인증번호가 확인되었습니다.");
        } else {
          isEmailVerified = false; // 이메일 인증 실패
          alert("인증번호가 일치하지 않습니다. 다시 확인해주세요.");
        }
      })
      .catch((e) => {
        console.error("Error during auth code check:", e);
        alert("에러가 발생했습니다.");
      });
  }  
