let alertDiv = document.getElementsByClassName('alert')[0];
let alertTitle = document.getElementsByClassName('alert-title')[0];

let menu =[...document.getElementsByClassName("sub-menu")];
let menulist = document.getElementsByClassName("slide")[0];
let findid = document.getElementsByClassName("findid")[0];
let findpw = document.getElementsByClassName("findpw")[0];


let find1 = document.getElementsByClassName("find")[0];
let find2 = document.getElementsByClassName("find")[1];

let btn1 = document.getElementsByClassName("in")[0];
let btn2 = document.getElementsByClassName("in")[1];
let btn3 = document.getElementsByClassName("in")[2];
let btn4 = document.getElementsByClassName("in")[3];

let input1 = document.getElementsByClassName('tel-number')[0];
let input2 = document.getElementsByClassName('tel-number')[1];
let input3 = document.getElementsByClassName('tel-number')[2];
let input4 = document.getElementsByClassName('tel-number')[3];


let resultDiv = document.getElementsByClassName('wrap');
let resultTxt = document.querySelectorAll('.wrap > span');

resultDiv[0].style.display = 'none';
resultDiv[1].style.display = 'none';

console.log(btn1, btn2, btn3, btn4);
console.log(input1, input2, input3, input4);


for(var i in menu){
    menu[i].addEventListener("click", (e)=>{
    if(e.target.innerText == "아이디"){
        menulist.style.animationName = 'rollback-ani';
        findid.style.display = "flex";
        findpw.style.display = "none";
        resultDiv[0].style.display = 'none';
        resultDiv[1].style.display = 'none';

    }        
    else{
        menulist.style.animationName = 'box-ani';
        findid.style.display = "none";
        findpw.style.display = "flex";
        resultDiv[0].style.display = 'none';
        resultDiv[1].style.display = 'none';

    }
});
}

btn1.addEventListener("input", () => {
    if(btn1.value.length >= 11 && !(isNaN(btn1.value))) {
        input1.style.background = "rgba(255, 102, 102, 1)";
    }else{
        input1.style.background = "rgba(255, 194, 194, 1)";
    }
})
input1.onclick = () => {
    if(input1.style.background != "rgba(255, 194, 194, 1)"){
        input1.style.background = 'rgba(255, 194, 194, 1)';
    }
}
btn2.addEventListener("input", () => {
    if(btn2.value.length == 4 && !(isNaN(btn2.value))) {
        input2.style.background = "rgba(255, 102, 102, 1)";
    }else{
        input2.style.background = "rgba(255, 194, 194, 1)";
    }
});
input2.onclick = () => {
    if(input2.style.background != "rgba(255, 194, 194, 1)"){
        input2.style.background = 'rgba(255, 194, 194, 1)';
    }
}


btn3.addEventListener("input", () => {
  if(btn3.value.length >= 11 && !(isNaN(btn3.value))) {
      input3.style.background = "rgba(255, 102, 102, 1)";
  }else{
      input3.style.background = "rgba(255, 194, 194, 1)";
  }
});
input3.onclick = () => {
  if(input3.style.background != "rgba(255, 194, 194, 1)"){
      input3.style.background = 'rgba(255, 194, 194, 1)';
  }
}

btn4.addEventListener("input", () => {
  if(btn4.value.length == 4 && !(isNaN(btn4.value))) {
      input4.style.background = "rgba(255, 102, 102, 1)";
  }else{
      input4.style.background = "rgba(255, 194, 194, 1)";
  }
});
input4.onclick = () => {
  if(input4.style.background != "rgba(255, 194, 194, 1)"){
      input4.style.background = 'rgba(255, 194, 194, 1)';
  }
}


//id, pw: db에서 뽑은 값을 넣는 변수
find1.onclick = () => {
    resultDiv[0].style.display = 'flex';
    findid.style.display = 'none';
    id = '1234';
    resultTxt[0].innerHTML = `회원님의 아이디는 ${id} 입니다`;
}
find2.onclick = () => {
    resultDiv[1].style.display = 'flex';
    findpw.style.display = 'none';
    pw = '5678';
    resultTxt[1].innerHTML = `회원님의 비밀번호는 ${pw} 입니다`;
} 

function alertCheck(){
  alertDiv.style.visibility = "hidden"; //원래 창으로 돌아갈 때 이 코드
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
      alertDiv.style.visibility = "visible";
      alertTitle.innerText = '이메일을 발송했습니다.';

    })
    .catch((e) => {
    console.error("Error during duplicate check:", e);
    alertDiv.style.visibility = "visible";
    alertTitle.innerText = '에러가 발생했습니다.';
    });
  }  
    
    
  let isEmailVerified = false; // 이메일 인증 상태를 나타내는 변수
    
  // 인증번호 확인 함수
  function checkAuthCode() {
    var email = document.getElementById("email").value;
    var authCode = document.getElementById("auth").value; // 입력한 인증번호 가져오기
  
    if (authCode.trim() === "") {
      alertDiv.style.visibility = "visible";
      alertTitle.innerText = '인증번호를 입력해주세요';
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
          alertDiv.style.visibility = "visible";
          alertTitle.innerText = '인증번호가 확인되었습니다';
        } else {
          isEmailVerified = false; // 이메일 인증 실패
          
          alertDiv.style.visibility = "visible";
          alertTitle.innerText = '인증번호가 일치하지 않습니다. 다시 확인해주세요.';
        }
      })
      .catch((e) => {
        console.error("Error during auth code check:", e);
        alertDiv.style.visibility = "visible";
        alertTitle.innerText = '에러가 발생했습니다.';
      });
  }  
 