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
var initialsSubmit = document.getElementById("initialsSubmit");
var hiScores = document.getElementById("hiScores");
var hiScoresDetails = document.getElementById("hiScoresDetails")
var btnReturn = document.getElementById("btnReturn");
var btnClear = document.getElementById("btnClear");
var qTitle = document.getElementById("qTitle");
var ansOne = document.getElementById("ansOne");
var ansTwo = document.getElementById("ansTwo");
var ansThree = document.getElementById("ansThree");
var ansFour = document.getElementById("ansFour");
var ansResult = document.getElementById("ansResult");
var yourScore = document.getElementById("yourScore");
var correct = document.getElementById("correct");
var wrong = document.getElementById("wrong");

jsQuizStart.addEventListener("click", function () { init() });

score.style.display = "none";
hiScores.style.display = "none";

function init() {

    viewHiScore.disabled = true;
    viewHiScore.style.color = "lightgray";

    if (localStorage.getItem("numPlayers") === null) {
        localStorage.setItem("numPlayers", "0");
    }

    initQuiz.style.display = "none";
    playQuiz.style.display = "initial";

    var initTime = 75;
    var timer = setInterval(countdown, 1000);
    function countdown() {
        initTime--;
        counter.innerText = initTime;

        if (initTime <= 0) {
            playQuiz.style.display = "none";
            score.style.display = "initial";
            counter.innerText = 0;
            clearInterval(timer);
        }
    }

    var ansArr = [];
    var choiceArr = [];
    var points = 0;
    var qIndex = 0
    quizContent();

    function quizContent() {

        if (qIndex < jsQuestions.length) {
            var correctAnswer = jsQuestions[qIndex].answer;
            //console.log("The correct ans is: ", correctAnswer);
            qTitle.innerText = jsQuestions[qIndex].title;
            ansOne.innerText = jsQuestions[qIndex].choices[0];
            ansTwo.innerText = jsQuestions[qIndex].choices[1];
            ansThree.innerText = jsQuestions[qIndex].choices[2];
            ansFour.innerText = jsQuestions[qIndex].choices[3];
            qIndex++;
            ansArr.push(correctAnswer);
            console.log(qIndex);
        }
        else {
            playQuiz.style.display = "none";
            score.style.display = "initial";
            clearInterval(timer);
            var scoreFromAns = parseFloat(yourScoreNum.textContent);
            var timeLeft = parseFloat(counter.textContent);
            console.log("scoreFromAns: ", scoreFromAns);
            console.log("timeLeft: ", timeLeft);
            console.log(typeof scoreFromAns);
            console.log(typeof timeLeft);
            var totalScore = scoreFromAns + timeLeft * 10;
            yourScoreNum.innerText = totalScore;
        }

        return correctAnswer;
    }

    function scoreTrack(choice) {
        var chosenAns = choice.textContent;
        choiceArr.push(chosenAns);
        console.log("correct ans: " + ansArr[qIndex - 1] + " you chose: " + choiceArr[qIndex - 1]);
        if (choiceArr[qIndex - 1] === ansArr[qIndex - 1]) {
            correct.play();
            ansResult.innerText = "CORRECT";
            ansResult.style.color = "green";
            points += 100;
            console.log(points);
        }
        else {
            wrong.play();
            ansResult.innerText = "WRONG";
            ansResult.style.color = "red";
            initTime -= 15;
        }
        var x = setTimeout(quizContent, 1000);
        var y = setTimeout(function () { ansResult.innerText = " " }, 1000);
        yourScoreNum.innerText = points;
    }

    function submitScore() {
        var playerInitials = enterInitials.value;
        var finalScore = yourScoreNum.textContent;
        if (playerInitials === "") {
            errorMessage.innerText = "Please enter at least two characters";
            errorMessage.style.color = "red";
            errorMessage.style.fontSize = "14px";
        }
        else {
            errorMessage.innerText = "";
            if (localStorage.getItem("Scores") == null) {
                var scoresObj = {};
                console.log("1: ", scoresObj);
            }
            else {
                var scoresObj = JSON.parse(localStorage.getItem("Scores"));
                console.log("2: ", scoresObj);

            }
            var playerIndex = parseFloat(localStorage.getItem("numPlayers"));
            var player = "player" + playerIndex;
            localStorage.setItem("numPlayers", playerIndex + 1);
            scoresObj[player] = {
                "initials": playerInitials,
                "score": finalScore
            }
            yourScore.innerText = playerInitials + ": " + finalScore;
            yourScore.style.color = "white";
            yourScore.style.backgroundColor = "black";
            localStorage.setItem("Scores", JSON.stringify(scoresObj));
            score.style.display = "none";
            hiScores.style.display = "initial";
            showHiScores();
        }
        //console.log(player);
        //console.log(scoresObj);
    }

    initialsSubmit.addEventListener("click", function () { submitScore() });

    ansOne.addEventListener("click", function () { scoreTrack(ansOne) });
    ansTwo.addEventListener("click", function () { scoreTrack(ansTwo) });
    ansThree.addEventListener("click", function () { scoreTrack(ansThree) });
    ansFour.addEventListener("click", function () { scoreTrack(ansFour) });
}

function showHiScores() {
    viewHiScore.disabled = true;
    hiScores.style.display = "initial";
    initQuiz.style.display = "none";
    var scoresObj = JSON.parse(localStorage.getItem("Scores"));
    console.log(scoresObj);
    var keysArr = Object.keys(scoresObj);
    for (var i = 0; i < keysArr.length; i++) {
        var newDiv = document.createElement("p");
        var newHr = document.createElement("hr");
        newDiv.style.textAlign = "center";
        newDiv.innerText = scoresObj[keysArr[i]].initials + ": " + scoresObj[keysArr[i]].score;
        hiScoresDetails.appendChild(newDiv);
        hiScoresDetails.appendChild(newHr);
    }
}

function clearVals() {
    localStorage.clear();
    hiScoresDetails.innerHTML = "";
}

viewHiScore.addEventListener("click", function() { showHiScores() });
btnReturn.addEventListener("click", function() { location.reload() });
btnClear.addEventListener("click", function() { clearVals() });