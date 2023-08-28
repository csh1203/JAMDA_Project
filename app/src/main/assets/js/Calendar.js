const Day = new Date();
const todayMonth = Day.getMonth();
const todayYear = Day.getFullYear();
const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

let colorTheme;

let monthView = document.getElementsByClassName("month")[0];
let yearView = document.getElementsByClassName("year")[0];
monthView.innerText = month[todayMonth];
yearView.innerText = todayYear;

window.onload = function () {
    buildCalendar();
    buildMonthlyRecord();
    buildChart();
}    // 웹 페이지가 로드되면 buildCalendar 실행

let nowMonth = new Date();  // 현재 달을 페이지를 로드한 날의 달로 초기화
let today = new Date();     // 페이지를 로드한 날짜를 저장
// today.setHours(0,0,0,0);    // 비교 편의를 위해 today의 시간을 초기화

// 달력 생성 : 해당 달에 맞춰 테이블을 만들고, 날짜를 채워 넣는다.
function buildCalendar() {

    let firstDate = new Date(nowMonth.getFullYear(), nowMonth.getMonth(), 1);     // 이번달 1일
    let lastDate = new Date(nowMonth.getFullYear(), nowMonth.getMonth() + 1, 0);  // 이번달 마지막날

    let tbody_Calendar = document.querySelector(".Calendar > tbody");


    let nowRow = tbody_Calendar.insertRow();        // 첫번째 행 추가

    for (let j = 0; j < firstDate.getDay(); j++) {  // 이번달 1일의 요일만큼
        let nowColumn = nowRow.insertCell();        // 열 추가

    }

    for (let nowDay = firstDate; nowDay <= lastDate; nowDay.setDate(nowDay.getDate() + 1)) {   // day는 날짜를 저장하는 변수, 이번달 마지막날까지 증가시키며 반복

        let nowColumn = nowRow.insertCell();        // 새 열을 추가하고
        nowColumn.innerText = leftPad(nowDay.getDate());      // 추가한 열에 날짜 입력

        if(nowDay.getDate() % 10 === 0) {
            nowColumn.innerHTML += `<br><div class="stemp"><iconify-icon icon="gg:check-o"></iconify-icon></div>`;
        }

        if (nowDay.getDay() == 6) {                 // 토요일인 경우 글자색 파랑으로 하고
            nowRow = tbody_Calendar.insertRow();    // 새로운 행 추가
        }else if(nowDay.getDay() == 0){
            nowColumn.style.color = "#DC143C";
        }

    }




}

function buildMonthlyRecord(){
    let lastDate = new Date(nowMonth.getFullYear(), nowMonth.getMonth() + 1, 0);  // 이번달 마지막날

    const exerciseDay = document.getElementsByClassName("stemp").length;
    const finishExercise = Math.round((exerciseDay / lastDate.getDate() * 100));
    if(exerciseDay <= 0) document.getElementsByClassName("exercise-graph")[0].style.width = `0px`;
    else document.getElementsByClassName("exercise-graph")[0].style.width = `calc(7% + (${exerciseDay} / ${lastDate.getDate()} * 93%))`;
    document.getElementsByClassName("exercise-date")[0].innerText = `${exerciseDay}일`;
    document.getElementsByClassName("month-date")[0].innerText = `${lastDate.getDate()-exerciseDay}일`;
    document.getElementsByClassName("finish-exercise")[0].innerText = `이번 달 운동 완료일은 ${finishExercise}%입니다.`
}

function buildChart(){
    //https://lts0606.tistory.com/297
    var canvas_back = document.getElementById("chartcanvas");
    var context_back = canvas_back.getContext("2d");
    var sw = canvas_back.width;
    var sh = canvas_back.height;
    var PADDING = 40;

    // Browser별 데이터 입력
    var data = [30.3, 24.6, 19.3, 16.3, 2.3, 7.2, 14.2, 9.8];
    var value = ['white', 'blue', 'pink', 'orange', 'yellow', 'red', 'brown', 'black'];

    //Browzer별 색상 입력
    var back_color = ['#D9D9D9', '#FF6666'];

    var center_X = sw/2; // 원의 중심 x 좌표
    var center_Y = sh/2; // 원의 중심 y 좌표

    // 두 계산값 중 작은 값은 값을 원의 반지름으로 설정
    var radius_back = Math.min(sw-(PADDING * 2), sh-(PADDING*2)) / 2;

    // var degree = 360;

    var angle = 0;
    var total = 0;
    data.forEach(arg => total += arg);

    for(var i = 0; i<data.length; i++){
        context_back.fillStyle = back_color[0]; //생성되는 부분의 채울 색 설정
        context_back.beginPath();

        context_back.moveTo(center_X, center_Y); // 원의 중심으로 이동
        context_back.arc(center_X, center_Y, radius_back, angle, angle + (Math.PI * 2 * (data[i]/total)));
        context_back.lineTo(center_X, center_Y);
        context_back.fill();
        angle += Math.PI * 2 * (data[i] / total);
    }

    var canvas = document.getElementById("chartcanvas");
    var context = canvas.getContext("2d");
    var sw = canvas.width;
    var sh = canvas.height;
    var PADDING = 45;

    //Browzer별 색상 입력
    var color = ['#FFE0E0', '#FFC2C2', '#FFA3A3','#FF8686','#EB7474','#CC5252'];
    var color_plus = '#FFF1F1';

    // 두 계산값 중 작은 값은 값을 원의 반지름으로 설정
    var radius = Math.min(sw-(PADDING * 2), sh-(PADDING*2)) / 2;

    var degree = 360;

    var angle = 0;
    var total = 0;
    data.forEach(arg => total += arg);

    var conv_array = data.slice().map((data)=>{
        var rate = data / total;
        var myDegree = degree * rate;
        return myDegree;
    });

    degree = 0;
    var plus = 0;
    var event_array = new Array(data.length);
    for(var i in data){
        event_array[i] = new Array(0);
    }

    for(var i = 0; i<event_array.length; i++){
        event_array[i].push(plus, plus + conv_array[i]);
        plus = plus + conv_array[i];
    }

    for(var i = 0; i<data.length; i++){
        if(i != 0 && i % color.length == 0) context.fillStyle = color_plus;
        else context.fillStyle = color[i % color.length];
        context.beginPath();

        context.moveTo(center_X, center_Y); // 원의 중심으로 이동
        context.arc(center_X, center_Y, radius, angle, angle + (Math.PI * 2 * (data[i]/total)));
        context.lineTo(center_X, center_Y);
        context.fill();
        context_back.restore();
        angle += Math.PI * 2 * (data[i] / total);
    }

    canvas.addEventListener('click', function(event){
        var x1 = event.offsetX;
        var y1 = event.offsetY;

        var inn = isInsideArc(x1, y1);
        if(inn.index > -1){  //대상이 맞으면
            drawed = true;
            hoverCanvas(inn.index);
            makeText(inn.index);
        }
    });

    //내부 + 범위에 들어온지 확인하는 함수
    function isInsideArc(x1, y1){
        var result1 = false;
        var result2 = false;
        var index = -1;
        var circle_len = radius;
        var x = sw/2 - x1;

        var y = sh/2 - y1;
        var my_len = Math.sqrt(Math.abs(x * x) + Math.abs(y * y));  //삼각함수
        if(circle_len >= my_len){
            result1 = true;
        }
        var rad = Math.atan2(y, x);
        rad = (rad*180)/Math.PI;  //음수가 나온다
        rad += 180;  //캔버스의 각도로 변경
        if(result1){
            event_array.forEach( (arr,idx) => {   //각도 범위에 해당하는지 확인
                if( rad >= arr[0] && rad <= arr[1]){
                    result2 = true;
                    index = idx;
                }
            });
        }
        return {result1:result1, result2:result2 ,index:index, degree : rad};
    }

    angle = 0;
    var before_index = -1;
    var flag = new Array(data.length).fill(0);
    function hoverCanvas(index){
        context_back.clearRect(0,0,sw, sh);
        for (var i = 0; i < conv_array.length; i++) {
            var item = conv_array[i];
            var innColor = back_color[0];
            if(index == i){
                innColor = back_color[1];  //대상이 맞으면 1.1배 크게 키운다.
                if(index == before_index && flag[index] === 0){
                    innColor = back_color[0];
                    flag[index] = 1;
                }else if(index != before_index){
                    flag[before_index] = 1;
                    flag[index] = 0;
                }else{
                    flag[index] = 0;
                }
                before_index = i;
            }

                context_back.beginPath();

                context_back.moveTo(center_X, center_Y); // 원의 중심으로 이동
                context_back.arc(center_X, center_Y, radius_back, angle, angle + (Math.PI * 2 * (data[i]/total)));
                context_back.lineTo(center_X, center_Y);
                context_back.fillStyle = innColor; //생성되는 부분의 채울 색 설정
                context_back.fill();
                context_back.restore();


                if(i != 0 && i % color.length == 0) context.fillStyle = color_plus;
                else context.fillStyle = color[i % color.length];                        context.beginPath();

                context.moveTo(center_X, center_Y); // 원의 중심으로 이동
                context.arc(center_X, center_Y, radius, angle, angle + (Math.PI * 2 * (data[i]/total)));
                context.lineTo(center_X, center_Y);
                context.fill();
                context_back.restore();
                angle += Math.PI * 2 * (data[i] / total);
        }
    }

    //도(degree)를 라디안(radian)으로 바꾸는 함수
    function degreesToRadians(degrees) {
        const pi = Math.PI;
        return degrees * (pi / 180);
    }

    function makeText(index){
            var img = new Image();
            img.src = '../img/blank.png';

            for (var i = 0; i < conv_array.length; i++) {
                var item = conv_array[i];
                if(index == i){
                    innColor = back_color[1];  //대상이 맞으면 1.1배 크게 키운다.
                    var half = (event_array[index][1] - event_array[index][0]) / 2;
                    var degg = event_array[index][0] + half;
                    if(flag[index] === 0){
                        img.onload = function(){
                            context.shadowColor = "rgba(0, 0, 0, 0.20)";
                            context.shadowBlur = 5;
                            context.shadowOffsetX = 0;
                            context.shadowOffsetY = 2;
                            context.drawImage(img, xx, yy);

                            context.shadowColor = "#FFFFFF";
                            context.shadowBlur = 0;
                            context.shadowOffsetX = 0;
                            context.shadowOffsetY = 0;
                            context.font = "12px Noto Sans KR";
                            context.fillStyle = "#FFFFFF";
                            context.textAlign = "center";
                            context.fillText(`${value[index]}`, xx + 37, yy + 17);

                            context.font = "15px malgun gothic";
                            context.fillStyle = "#FFFFFF";
                            context.textAlign = "center";
                            context.fillText(`${data[index]}`, xx+37, yy+35);
                        }

                    }
                }
            }
            var xx = Math.cos(degreesToRadians(degg)) * radius * 0.9 + sw / 2 - 20;
            var yy = Math.sin(degreesToRadians(degg)) * radius * 0.9 + sh / 2 - 50;
    }
}

 //input값이 한자리 숫자인 경우 앞에 '0' 붙혀주는 함수
function leftPad(value) {
    if (value < 10) {
        value = "0" + value;
        return value;
    }
    return value;
}

function btnOpen(){
    const colorPicker = document.getElementsByClassName('color-picker')[0];
    const colorPick = document.getElementById('clr-picker');
    colorPicker.style.visibility = 'visible';
    colorPick.style.visibility = 'visible';
    document.getElementById('pick').click();
    const colorEditor = document.getElementsByClassName('color-edit')[0];
    colorEditor.after(colorPick);
}

function btnClose(){
    const colorPicker = document.getElementsByClassName('color-picker')[0];
    const colorPick = document.getElementById('clr-picker');
    colorPick.style.visibility = 'hidden';
    colorPicker.style.visibility = 'hidden';
}









