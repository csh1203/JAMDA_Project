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
            console.log(btn[0]);
            console.log(btn[1]);
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
            console.log(btn[0]);
            console.log(btn[1]);
            console.log(find[0]);
            notEdit();
        }
        else{}
    }
    certificationNumber(object);
}
function notEdit(){
    find[0].style.background= "rgba(255, 102, 102, 1)";
    btn[0].disabled = true;
    btn[1].nextElementSibling.disabled=true;
    btn[1].nextElementSibling.style.background = "rgba(255, 194, 194, 1)";
}
