let messageData = ['응원합니다', '행보가세여'];
let messageDiv = document.getElementsByClassName('message-div')[0];
let plusBtn = document.getElementsByClassName('plus-btn')[0];
let alertDiv = document.getElementsByClassName('alert')[0];
let alertTitle = document.getElementsByClassName('alert-title')[0];

for(let i in messageData){
    let messages = document.createElement('div');

    messages.className = "message";
    messages.innerText = `${messageData[i]}`;
    messageDiv.appendChild(messages);
}

function plus(){
    if(document.getElementsByClassName('plus-btn')[0].innerText == "확인"){
        let messages = document.getElementsByClassName('message-edit');
        for(let i in messageData){
            messageData[i] = messages[i].value;
        }
        edit();
        return 0;
    }else if(document.getElementsByClassName('plus-btn')[0].innerText == "추가하기"){
        messageData.push(document.getElementsByClassName('message-input')[0].value);
        document.getElementsByClassName('plus-btn')[0].innerText = "응원메세지 추가"
        return 0;
    }else{
        let messageCnt = document.getElementsByClassName('message').length;
        if(messageCnt >= 3){
            alertDiv.style.visibility = "visible";
            alertTitle.innerText = '응원메세지는 최대 3개 까지 설정 가능합니다';
        }else{
            let create = document.createElement('input');
            create.classList.add("message-input");
            create.classList.add("message");
            document.getElementsByClassName('plus-btn')[0].innerText = "추가하기";
            messageDiv.appendChild(create);
            document.getElementsByClassName('message-input')[0].focus();
        }
    }


}

function alertCheck(){
    alertDiv.style.visibility = "hidden"; //원래 창으로 돌아갈 때 이 코드
}

function edit(){
    if(document.getElementsByClassName('edit-btn')[0].innerText == "편집"){
        document.getElementsByClassName('edit-btn')[0].innerText = "돌아가기";
        document.getElementsByClassName('plus-btn')[0].innerText = "확인";
        toEdit();
    }else if(document.getElementsByClassName('edit-btn')[0].innerText == "돌아가기"){
        document.getElementsByClassName('edit-btn')[0].innerText = "편집";
        document.getElementsByClassName('plus-btn')[0].innerText = "응원메세지 추가";
        toHome();
    }
    
}

function toEdit(){
    let parent = document.getElementsByClassName('message-div')[0];
    parent.replaceChildren();
    for(let i in messageData){
        let messagePack = document.createElement('div');
        messagePack.className = "messagePack";

        let messages = document.createElement('input');
        let del = document.createElement('div');
        messages.className = "message-edit";
        messages.value = `${messageData[i]}`;
        del.className = "delete";
        del.innerHTML = `<img src="../image/ei_minus.svg" class="del-img"/>`;
        del.onclick = (event) => deleteMessage(event);
        messagePack.appendChild(del);
        messagePack.appendChild(messages);
        messageDiv.appendChild(messagePack);
    }
    document.getElementsByClassName('message-edit')[0].focus();

}

function toHome(){
    let parent = document.getElementsByClassName('message-div')[0];

    parent.replaceChildren();
    for(let i in messageData){
        let messages = document.createElement('div');
    
        messages.className = "message";
        messages.innerText = `${messageData[i]}`;
        messageDiv.appendChild(messages);
    }

}

function deleteMessage(event){
    let messageDiv = document.getElementsByClassName('message-edit');
    if(messageDiv.length <= 1){
        alertDiv.style.visibility = "visible";
        alertTitle.innerText = '응원메세지는 한 개 이상이어야 합니다.';
    }else{
        event.target.parentNode.parentNode.remove();
    }
}