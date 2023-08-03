const today = new Date();
const todayMonth = today.getMonth();
const todayYear = today.getFullYear();
const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

let monthView = document.getElementsByClassName("month")[0];
let yearView = document.getElementsByClassName("year")[0];
monthView.innerText = month[todayMonth];
yearView.innerText = todayYear;


