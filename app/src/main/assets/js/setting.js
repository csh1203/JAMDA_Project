function logout(){
    document.getElementsByClassName('logout-confirm')[0].style.visibility = "visible";
}

function check(flag){
    let confirmDiv = document.getElementsByClassName('logout-confirm')[0];
    confirmDiv.style.visibility = "hidden";
    if(flag){
        window.location.href = "./login.html";
    }
}
