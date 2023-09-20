let alertDiv = document.getElementsByClassName('alert')[0];
let alertTitle = document.getElementsByClassName('alert-title')[0];

let menu =[...document.getElementsByClassName("sub-menu")];
let menulist = document.getElementsByClassName("slide")[0];
let findid = document.getElementsByClassName("findid")[0];
let findpw = document.getElementsByClassName("findpw")[0];

let resultTxt = document.querySelector('.showid');

const userid = localStorage.getItem('userid');
console.log(userid);

id = userid;
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

function alertCheck(){
  alertDiv.style.visibility = "hidden"; 
  location.href = '../html/login.html';
}
 