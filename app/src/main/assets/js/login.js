let hiddenbtn = document.getElementsByClassName("eye")[0];
let pwDiv = document.getElementById("input-pw");

function hiddenPw(){
    if(pwDiv.type === "password"){
        pwDiv.type = "text";
        hiddenbtn.src = "/image/eye-close.svg";
    }
    else{
        pwDiv.type = "password";
        hiddenbtn.src = "/image/iconoir_eye-alt.svg";
    }
}
