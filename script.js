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
const informationBox = document.querySelector(".informationBox");
let informationSwitch = false;
const titleColorPoint = document.querySelector("#titleColorPoint");
const colorChoiceBox = document.querySelector("#colorChoiceBox");
const subColorChoiceBox = document.querySelector(".subColorChoiceBox");
const success = document.querySelector(".success");
let colorChoiceBoxswitch = false;
const choiceColor = document.querySelectorAll(".choiceColor");
const title = document.querySelector("#title");

//dayBox 파란 테두리 생성 (information 이 꺼지면 파란테두리도 사라짐 수정 필요)  
for(let i = 0; i < dayBox.length; i++){
    dayBox[i].addEventListener("click", () => {
        for(let j = 0; j < dayBox.length; j++){
            if(i == j && !informationSwitch){
                dayBox[j].style.borderColor = "blue";
            }
            else{
                dayBox[j].style.borderColor = "transparent";
            }
        }
    })
}

document.addEventListener("click", informationEvent);

function informationEvent(event){
    // informationBox 가 닫혀있고 dayBox를 클릭시 informationBox 오픈
    if(event.target.closest(".dayBox") && !informationSwitch){
        informationBox.style.display = "block";
        informationSwitch = true;
    }
    // 컬러박스가 닫혀 있고 컬로포인트를 클릭하면 컬러박스 오픈
    else if(!colorChoiceBoxswitch && titleColorPoint.contains(event.target)){
        colorChoiceBox.style.display = "block";
        colorChoiceBoxswitch = true;
    }
    // 컬러박스가 열려있을때 컬러박스를 제외 한 어디를 눌러도 컬러박스 닫힘
    else if(colorChoiceBoxswitch && !colorChoiceBox.contains(event.target)){
        colorChoiceBox.style.display = "none";
        colorChoiceBoxswitch = false;
    }
    // 컬러 클릭시 컬로포인트 색 변경
    else if(colorChoiceBoxswitch && colorChoiceBox.contains(event.target)){
        colorChance(event);
    }
    // informationBox 박스가 열려있고 컬러박스가 닫혀 있을때 컬러포인트를 제외한 나머지 클릭시 informationBox 닫기
    else if(informationSwitch && !colorChoiceBoxswitch && !titleColorPoint.contains(event.target) && !informationBox.contains(event.target)){
        informationBox.style.display = "none";
        informationSwitch = false;
    }
    // 성공버튼 클릭 시 내용이 있을 경우 informationContent 안에 내용 추가
    else if(title.value.trim() !== "" && success.contains(event.target)){
        clickSuccess()
    }
}

// 컬러 클릭시 컬로포인트 색 변경 함수
function colorChance(event){ titleColorPoint.style.backgroundColor = event; }
// title에 내용이 있을 시 content에 내용 추가
function clickSuccess(){
    const informationContent = document.querySelector(".informationContent");
    // 컬러와 내용이 들어갈 요소
    const titleBox = document.createElement("div")
    titleBox.classList.add("titleBox")
    informationContent.appendChild(titleBox)
    // 선택한 컬러
    const titleColor = document.createElement("div")
    titleColor.classList.add("titleColor")
    // titleColorPoint와 같은 색 가져오기
    const getTitleColor = window.getComputedStyle(titleColorPoint).backgroundColor
    titleColor.style.backgroundColor = getTitleColor;
    titleBox.appendChild(titleColor)
    // 내용
    const content = document.createElement("div")
    content.classList.add("content")
    titleBox.appendChild(content)
    content.innerHTML = title.value;
    title.value = "";
}

// test //
const testBox = document.querySelector(".testBox");

// const obj = [];

// obj.push({
//     name: "김봉섭",
//     title: "제목"
// })

// testBox.innerHTML = obj[0].name;


