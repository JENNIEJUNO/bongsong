// 길게 눌렀을때 기본적으로 나오는 브라우저 기능 막기
document.addEventListener("contextmenu", (event) => {
    event.preventDefault();
})

const mainImages = document.querySelector(".mainImages")
const imageBox = document.querySelector(".imageBox")
let i = 0;

//3초마다 이미지 왼쪽으로 자동 이동
if(imageBox){
    setInterval(() => {
        i++;
        imageBox.style.transition = "1s";
        imageBox.style.left = `-${i * 100}vw`;
    }, 3000);

    imageBox.addEventListener("transitionend", () => {
        if(i === 5){
            i = 0;
            imageBox.style.left = 0;
            imageBox.style.transition = "0s";
        }
    })
}

// informationBox colorChoiceBox 이벤트
const dayBox = document.querySelectorAll(".dayBox");
const dayNumber = document.querySelectorAll(".dayNumber")
const informationBox = document.querySelector(".informationBox");
const informationContent = document.querySelector(".informationContent")
let informationSwitch = false;
const titleColorPoint = document.querySelector("#titleColorPoint");
const colorChoiceBox = document.querySelector("#colorChoiceBox");
const subColorChoiceBox = document.querySelector(".subColorChoiceBox");
const success = document.querySelector(".success");
const cancel = document.querySelector(".cancel");
let colorChoiceBoxswitch = false;
const choiceColor = document.querySelectorAll(".choiceColor");
const title = document.querySelector("#title");
const obj = [];
let dayNumberChange = "";
const dayContent = document.querySelectorAll(".dayContent")
let dayBoxIndex;
let pressTimer;


//calendar Event
document.addEventListener("click", (event) => {
    const targetDayBox = event.target.closest(".dayBox")
    //컬러박스가 열려있지 않을때 informationBox 내부를 클릭 하지 않으면 informationBox 닫힘
    if(informationSwitch && !colorChoiceBoxswitch && !informationBox.contains(event.target)){
        informationBox.style.display = "none";
        informationSwitch = false;
        informationContent.innerHTML = "";
        title.value = "";
    }
    //컬러박스가 열려있을때 컬러박스 제외한 곳 클릭시 컬러박스 닫힘
    else if(informationSwitch && colorChoiceBoxswitch && !colorChoiceBox.contains(event.target)){
        colorChoiceBox.style.display = "none";
        colorChoiceBoxswitch = false;
    }
    //informationBox가 닫혀 있고 dayBox 클릭 시 informationBox 열림
    else if(targetDayBox && !informationSwitch){
        dayBoxIndex = Array.from(dayBox).indexOf(targetDayBox)
        informationBox.style.display = "block";
        informationSwitch = true;
        dayNumberChange = dayNumber[dayBoxIndex].textContent;

        let count = 0;
        for(let i = 0; i < obj.length; i++){
            if(dayNumberChange == obj[i].day){
                count++;
                if(informationContent.children.length < count){
                    creatGetText(i, dayBoxIndex)
                }
            }
        }
    }
    //컬러포인트 클릭 시 컬러박스 열림 or 닫힘
    else if(titleColorPoint.contains(event.target)){
        if(!colorChoiceBoxswitch){
            colorChoiceBox.style.display = "block";
            colorChoiceBoxswitch = true;
        }
        else{
            colorChoiceBox.style.display = "none";
            colorChoiceBoxswitch = false;
        }
    }
    //컬로포인트 색 변경
    else if(colorChoiceBoxswitch && colorChoiceBox.contains(event.target)){
        colorChance(event)
    }
    //성공 버튼 클릭
    else if(!colorChoiceBoxswitch && success.contains(event.target) && title.value !== ""){
        saveDate(dayNumberChange, title.value, window.getComputedStyle(titleColorPoint).backgroundColor, dayBoxIndex)
        informationContent.innerHTML = "";
        informationBox.style.display = "none";
        informationSwitch = false;
    }
    //취소 버튼 클릭
    else if(!colorChoiceBoxswitch && cancel.contains(event.target)){
        informationBox.style.display = "none";
        informationSwitch = false;
        informationContent.innerHTML = "";
        title.value = "";
    }
})

// titleBox 1초 클릭 시 삭제 박스 오픈
document.addEventListener("pointerdown", (event) => {
    const titleBoxs = event.target.closest(".titleBox")
    if(titleBoxs){
        pressTimer = setTimeout(() => {
            document.querySelector("#contentDeleteBox").style.height = "40%";
        }, 1000)
    }
})

// // titleBox 에서 마우스를 떼면 이벤트 취소
document.addEventListener("pointerup", () => {
    clearTimeout(pressTimer);
})

title.addEventListener("keydown", (event) => {
    if(title.value !== "" && event.key === "Enter" && !colorChoiceBoxswitch){
        saveDate(dayNumberChange, title.value, window.getComputedStyle(titleColorPoint).backgroundColor, dayBoxIndex)
        informationContent.innerHTML = "";
        informationBox.style.display = "none";
        informationSwitch = false;
    }
})

//성공버튼 클릭시 text 생성 (컬러박스가 닫혀 있을 때)
function saveDate(day, content, color, index){
    obj.push({
        year: "",
        month: "",
        day: day,
        content: content,
        color: color
    })
    let count = 0;
    for(let i = 0; i < obj.length; i++){
        if(day == obj[i].day){
            count++;
            if(informationContent.children.length < count){
                creatGetText(i, index, informationSwitch)
            }
        }
    }
    title.value = "";
}

// informationContent 안에 들어갈 텍스트 만들기
function creatGetText(event, index, doxSwitch){
    // 컬러와 내용이 들어갈 요소
    const titleBox = document.createElement("div")
    titleBox.classList.add("titleBox")
    informationContent.appendChild(titleBox)
    // 선택한 컬러
    const titleColor = document.createElement("div")
    titleColor.classList.add("titleColor")
    titleColor.style.backgroundColor = obj[event].color
    // titleColorPoint와 같은 색 가져오기
    titleBox.appendChild(titleColor)
    // 내용
    const content = document.createElement("div")
    content.classList.add("content")
    content.innerHTML = obj[event].content;
    titleBox.appendChild(content)

    //dayBox
    // 컬러와 내용이 들어갈 요소
    // 성공을 or enter 를 누르면 dayBox에 생성
    if(doxSwitch == true){
        const daycolorContentBox = document.createElement("div")
        daycolorContentBox.classList.add("daycolorContentBox")
        dayContent[index].appendChild(daycolorContentBox)
        // 선택한 컬러
        const dayColor = document.createElement("div")
        dayColor.classList.add("dayColor")
        dayColor.style.backgroundColor = obj[event].color
        daycolorContentBox.appendChild(dayColor)
        // 내용
        const dayTitle = document.createElement("div")
        dayTitle.classList.add("dayTitle")
        dayTitle.innerHTML = obj[event].content;
        daycolorContentBox.appendChild(dayTitle)
    }
    title.value = "";
}

// 컬러 클릭시 컬로포인트 색 변경
function colorChance(event){
    titleColorPoint.style.backgroundColor = event;
    colorChoiceBoxswitch = false;
    colorChoiceBox.style.display = "none";
}
// 삭제박스 No 버튼
function titleNoButton(){
    document.querySelector("#contentDeleteBox").style.height = 0;
}
// 삭제박스 Yes 버튼
function titleYesButton(){
    //yes 버튼 클릭 시 해당 titleBox 삭제
    //클릭한 titleBox 가져와서 그 안에 titleBox 컨텐츠와 day 비교하고 obj 와 맞으면 obj 삭제
    //obj 안에 해당 내용 삭제
    document.querySelector("#contentDeleteBox").style.height = 0;
    const titleBoxs = document.querySelectorAll(".titleBox")
    for(let i = 0; i < obj.length; i++){
        if(obj[i].content == titleBoxs){
            obj.splice(i, 1)
            break;
        }
    }
    
}
// test
