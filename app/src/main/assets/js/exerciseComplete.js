function moveToCalendar(){
    window.location.href = "../html/Calendar.html";
}
function addDate(){
    const id = localStorage.getItem('userid');

    axios
    .post("http://52.78.221.233:3000/users/dateCalendar", {
        userid: id,
    })
    .then((response) => {
        console.log("추가 완료");
    })
    .catch((e) => {
        console.log(err);
    }); 
  
}
addDate();
