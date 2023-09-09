let scrollDiv = document.getElementById("tit");
const plusBtn = document.getElementById('btn_plus'); // +버튼
let result = document.getElementById('resultbox');// 추가된 규칙
let editBtn = document.getElementById('edit_btn'); //편집
let title = document.getElementById('tit') // 창 제목
let alert = document.getElementById('delete_check');
let list, del, img, Alldelete;

//스크롤
scrollDiv.addEventListener("click", () => {
    (scrollDiv.parentElement.parentElement.getAttribute("class") === "slide_box open")
        ? scrollDiv.parentElement.parentElement.setAttribute("class", "slide_box closed")
        : scrollDiv.parentElement.parentElement.setAttribute("class", "slide_box open");
});

function createRule(e){
    location.href = "../html/addRule.html";
    setTimeout(() => addList(e));
}
//규칙 추가하기
plusBtn.addEventListener("click", (e)=>createRule(e));

function addList(e){
    //규칙 추가
    list = document.createElement("div"); //목록의 클래스 추가
    list.className = 'list_div';

    //규칙 삭제 버튼 추가
    img = new Image();
    img.src = '../image/ei_minus.svg';

    img.style.position = "absolute";
    img.style.top = "-5px";
    img.style.left = "-6px";
    img.style.display="block";

   //규칙 이름, 내용 보여주기
    let listTit = document.createElement("span");//규칙이름
    let listTex = document.createElement("span");//규칙내용
    listTit.classList.add("order"); listTex.classList.add("exir");
    listTit.innerText ="안녕";
    listTex.innerText ="버피 1 set";

    result.appendChild(list);
    list.appendChild(img);
    list.appendChild(listTit);
    list.appendChild(listTex);

    //규칙 삭제하기
    img.addEventListener('click', (event) => {
        let removeElement = event.currentTarget.parentElement;

        Alert().then((result) => {
            console.log(result); // true 또는 false 출력
            if(result == true)
            {
                removeElement.remove(removeElement);}
            else{}

        });

});

}
//삭제 확인 알림창
function Alert(){
    let yes =document.getElementById('delete_ok');
    let no = document.getElementById("delete_no");
    alert.style.display ='flex';
    alert.style.boxShadow = "rgba(0,0,0,0.5) 0 0 0 9999px, rgba(0,0,0,0) 0 0 0 0";
    return new Promise((resolve) => {
        yes.addEventListener('click', () => {
            resolve(true);
            alert.style.display='none';
        });
        no.addEventListener('click', () => {
            resolve(false);
            alert.style.display='none';
        });

    });
}

//규칙 편집하기
editBtn.addEventListener("click", (e)=> editList(e));

function editList(e){
    if(e.target.textContent === '편집'){
        title.innerText = "규칙 편집";
        editBtn.innerText = "완료";
        editBtn.style.color = "rgba(204, 82, 82, 1)";

        plusBtn.style.display = "flex";

        Alldelete =document.getElementsByClassName("delimg");
        for(let next of Alldelete){
            next.style.display="flex";
        }
    }else{
        title.innerText = "내 규칙";
        editBtn.innerText = "편집";
        editBtn.style.color = "black";

        plusBtn.style.display = "none";

        Alldelete =document.getElementsByClassName("delimg");
        for(let next of Alldelete){
            next.style.display="none";
        }
    }
}
