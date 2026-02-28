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

//날짜 클릭 시 파란 테두리 생성
const dayBox = document.querySelectorAll(".dayBox")
if(dayBox){
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

//여러개의 html 여러개를 js 파일에 넣으면 에러가 걸림