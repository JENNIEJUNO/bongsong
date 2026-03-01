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

// 날짜 클릭 시
// 1.파란 테두리 생성
// 2. 내용 입력 창 오픈
const dayBox = document.querySelectorAll(".dayBox")

if(dayBox){
    // 파란 테두리 생성 함수
    blueBorder()
    // 내용 입력 창 오픈 
    informationBoxOpen()
}

// 파란 테두리 생성
function blueBorder (){
    for(let i = 0; i < dayBox.length; i++){
        for(let j = 0; j < dayBox.length; j++){
            dayBox[i].addEventListener('click', () => {
                if(i == j){
                    dayBox[j].style.borderColor = "blue";
                }
                else{
                    dayBox[j].style.borderColor = "transparent";
                }
            })
        }
    }
}

function informationBoxOpen(){
    const informationBox = document.querySelector(".informationBox")
    for(let i = 0; i < dayBox.length; i++){
        dayBox[i].addEventListener("click", () => {
            informationBox.style.display = "block"
        })
    }
}

//컬러 포인트 클릭 시 컬러초이스박스 오픈
const titleColorPoint = document.querySelector("#titleColorPoint")
titleColorPoint.addEventListener("click", () => {
    clockBoxOpen();
})

function clockBoxOpen(){
    const colorChoiceBox = document.querySelector("#colorChoiceBox")
    colorChoiceBox.style.display = 'block';
}

//버튼을 누르면 value 값 가져오기
// window.onload = function() {
//     const aaa = localStorage.getItem("myText");
//     if(aaa){
//         document.querySelector(".hear").textContent = aaa;
//     }
// }
// function getValue() {
//     const input = document.querySelector(".input")
//     const hear = document.querySelector(".hear").textContent = input.value;

//     localStorage.setItem("myText", input.value)
//     input.value = "";
// }

// // 버튼을 누르면 그 버튼 색깔이 되는 것
// function getColor(color) {
//     const colorColor = document.querySelector(".colorColor")
//     colorColor.style.backgroundColor = color;
// }

//여러개의 html 여러개를 js 파일에 넣으면 에러가 걸림
