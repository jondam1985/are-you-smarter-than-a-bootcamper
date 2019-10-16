//These are the elements that this script file will update and control
var viewHiScore = document.getElementById("viewHiScore");
var counter = document.getElementById("counter");
var mainContainer = document.getElementById("mainContainer");
var initQuiz = document.getElementById("initQuiz");
var jsQuizStart = document.getElementById("jsQuizStart");
var playQuiz = document.getElementById("playQuiz");
var score = document.getElementById("score");
var yourScoreNum = document.getElementById("yourScoreNum");
var enterInitials = document.getElementById("enterInitials");
var errorMessage = document.getElementById("errorMessage");
var initialsSubmit = document.getElementById("initialsSumbit");
var hiScores = document.getElementById("hiScores");
var btnReturn = document.getElementById("btnReturn");
var btnClear = document.getElementById("btnClear");
var qTitle = document.getElementById("qTitle");
var ansOne = document.getElementById("ansOne");
var ansTwo = document.getElementById("ansTwo");
var ansThree = document.getElementById("ansThree");
var ansFour = document.getElementById("ansFour");
var ansResult = document.getElementById("asnResult");


//This function hides HTML elements. Sets "hidden" class
function elHide(element) {
    let hiddenEl = document.getElementById(element);
    hiddenEl.setAttribute("class", "hidden");
}

//This functions displays (unhides) HTML elements. Removes "hidden" class
function elDisplay(element) {
    let displayedEl = document.getElementById(element);
    displayedEl.removeAttribute("class");
}

//This function disables HTML buttons
function elDisable(element) {
    let disableEl = document.getElementById(element);
    disableEl.disabled = true;
}

//This function controls the countdown timer
var initTime = 10;
var index = 0
function startTimer() {
    let timer = setInterval(countdown, 1000);
    quizContent(index);
    function countdown() {
        initTime--;
        //console.log(initTime);
        counter.innerHTML = initTime;
        timeUp(initTime, timer);
    }
}

//This function verifies if counter is 0 and ends the Quiz if TRUE
function timeUp(time, timerVar) {
    if (time <= 0) {
        elHide("playQuiz");
        elDisplay("score");
        clearInterval(timerVar);
    }
}

//This function changes the content of each question and answer element
function quizContent(index) {
    let i = index;
    qTitle.innerHTML = jsQuestions[i].title;
    ansOne.innerHTML = jsQuestions[i].choices[0]
    ansTwo.innerHTML = jsQuestions[i].choices[1];
    ansThree.innerHTML = jsQuestions[i].choices[2];
    ansFour.innerHTML = jsQuestions[i].choices[3];
    i++
    endQuiz(i);
    ansOne.addEventListener("click", function() { quizContent(i) });
    ansTwo.addEventListener("click", function() { quizContent(i) });
    ansThree.addEventListener("click", function() { quizContent(i) });
    ansFour.addEventListener("click", function() { quizContent(i) });
}

//This function switches dive when the condition is TRUE
function endQuiz(index) {
    let i = index;
    if (i >= jsQuestions.length) {
        elHide("playQuiz");
        elDisplay("score");
    }
}

//This function checks if an answer is correct and tallies the number of correct answers
function checkAns(answer, index, points) {
    if(answer === jsQuestions[index]) {
        ansResult.innerHTML = "CORRECT";
        points++;
    }
    else {
        ansResult.innerHTML = "WRONG";
    }
    return points;
}

//This function calculates the total score given the number of corrhect answers and time left
function totalScore(correctAns, timeLeft) {
    let finalScore = correctAns * 100 + timeLeft * 10;
    return finalScore;
}

//This functions saves the playe's initials and score to the local storage

//This block shows the HIGH SCORES when user clicks View High Scores

viewHiScore.addEventListener("click", function () { elHide("initQuiz") });
viewHiScore.addEventListener("click", function () { elDisplay("hiScores") });

//This blocks triggers events when user clicks on START QUIZ

jsQuizStart.addEventListener("click", function () { elHide("initQuiz") });
jsQuizStart.addEventListener("click", function () { elDisplay("playQuiz") });
jsQuizStart.addEventListener("click", function () { startTimer() });
//jsQuizStart.addEventListener("click", function () { quizContent(0) });