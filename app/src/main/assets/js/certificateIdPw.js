
let btn1 = document.getElementsByClassName("in")[0];
let btn2 = document.getElementsByClassName("in")[1];

let input1 = document.getElementsByClassName('tel-number')[0];
let input2 = document.getElementsByClassName('tel-number')[1];

var check = /[a-zA-Z0-9+-\_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;

btn1.addEventListener("input", () => {
    if((check.test(btn1.value) == true)) {
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

function btnok(){
    console.log(btn1.value, btn2.value);
    if(!(btn1.value==='')&&!(btn2.value==='')){
        location.href = '../html/findIdPw.html';
    }
}
