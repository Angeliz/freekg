// 鼠标悬停出现文字变色
var firstText=document.getElementsByClassName("first-text");
function changeTextColor() {
    for(var i=0;i<firstText.length;i++){
        firstText[i].style.color="white";
    }
}
function changeTextColorBack() {
    for(var i=0;i<firstText.length;i++){
        firstText[i].style.color="black";
    }
}

var first=document.getElementById("first");
first.onmouseover=function () {
    changeTextColor();
};
first.onmouseout=function () {
    changeTextColorBack();
};

var secondText=document.getElementsByClassName("second-text");
function changeTextColor2() {
    for(var i=0;i<firstText.length;i++){
        secondText[i].style.color="white";
    }
}
function changeTextColorBack2() {
    for(var i=0;i<firstText.length;i++){
        secondText[i].style.color="black";
    }
}
var second=document.getElementById("second");
second.onmouseover=function () {
    changeTextColor2();
};
second.onmouseout=function () {
    changeTextColorBack2();
};



var thirdText=document.getElementsByClassName("third-text");
function changeTextColor3() {
    for(var i=0;i<firstText.length;i++){
        thirdText[i].style.color="white";
    }
}
function changeTextColorBack3() {
    for(var i=0;i<firstText.length;i++){
        thirdText[i].style.color="black";
    }
}

var third=document.getElementById("third");
third.onmouseover=function () {
    changeTextColor3();
};
third.onmouseout=function () {
    changeTextColorBack3();
};