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

// Clickin on Start Quiz button calls init() function
jsQuizStart.addEventListener("click", function () { init() });

//Hides divs while they are not being used
score.style.display = "none";
hiScores.style.display = "none";

//Master function that contains and executes smaller functions
function init() {

    //Disables View High Scores buttons while users play
    viewHiScore.disabled = true;
    viewHiScore.style.color = "lightgray";

    //Initializes the count to identify the differen properties of the SCORES object
    if (localStorage.getItem("numPlayers") === null) {
        localStorage.setItem("numPlayers", "0");
    }

    //Switched displayed div
    initQuiz.style.display = "none";
    playQuiz.style.display = "initial";

    //Iititalizes countdown
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

    //Modifies the text inside the Question and Answers elements
    //This advances through the quiz as users answer the questions
    var ansArr = [];
    var choiceArr = [];
    var points = 0;
    var qIndex = 0
    quizContent();

    function quizContent() {

        if (qIndex < jsQuestions.length) {
            var correctAnswer = jsQuestions[qIndex].answer;
            qTitle.innerText = jsQuestions[qIndex].title; //Renders question text
            ansOne.innerText = jsQuestions[qIndex].choices[0];  //Renders options 1 text
            ansTwo.innerText = jsQuestions[qIndex].choices[1];  //Renders options 2 text
            ansThree.innerText = jsQuestions[qIndex].choices[2];  //Renders options 3 text
            ansFour.innerText = jsQuestions[qIndex].choices[3];  //Renders options 4 text
            qIndex++;
            ansArr.push(correctAnswer);
            console.log(qIndex);
        }

        //If there are no more questions remaining the countdown stop, and the score div is displayed
        else {
            playQuiz.style.display = "none"; //Hides questions div
            score.style.display = "initial"; //Displays score div
            clearInterval(timer); //Stops countdown
            var scoreFromAns = parseFloat(yourScoreNum.textContent); //Gets score text from object
            var timeLeft = parseFloat(counter.textContent); //Gets remaining time
            var totalScore = scoreFromAns + timeLeft * 10; //Calculates total score
            yourScoreNum.innerText = totalScore; //Renders total score
        }

        return correctAnswer;
    }

    //Compares the selected answer to the correct answer
    function scoreTrack(choice) {
        var chosenAns = choice.textContent;
        choiceArr.push(chosenAns);
        console.log("correct ans: " + ansArr[qIndex - 1] + " you chose: " + choiceArr[qIndex - 1]);
        if (choiceArr[qIndex - 1] === ansArr[qIndex - 1]) {
            correct.play(); //Plays audio if answer is correct
            ansResult.innerText = "CORRECT"; //Renders CORRECT message if answer is correct
            ansResult.style.color = "green";
            points += 100; //Add 100 to var points
            console.log(points);
        }
        else {
            wrong.play(); //Plays audio if answer is incorrect
            ansResult.innerText = "WRONG"; //Renders WRONG message if answer is incorrect
            ansResult.style.color = "red";
            initTime -= 15; //Substracts 15 second from timer
        }
        var x = setTimeout(quizContent, 1000); //Waits one second before showing the next questions
        var y = setTimeout(function () { ansResult.innerText = " " }, 1000);
        yourScoreNum.innerText = points;
    }

    //Creates new property in SCORE object with Key = playerID and Value = Initials and Score
    function submitScore() {
        var playerInitials = enterInitials.value;
        var finalScore = yourScoreNum.textContent;
        if (playerInitials === "") { //Stops from sending empty value
            errorMessage.innerText = "Please enter at least two characters";
            errorMessage.style.color = "red";
            errorMessage.style.fontSize = "14px";
        }
        else {
            errorMessage.innerText = "";
            if (localStorage.getItem("Scores") == null) {
                var scoresObj = {}; //Initializes object if this is the first player
                console.log("1: ", scoresObj);
            }
            else {
                var scoresObj = JSON.parse(localStorage.getItem("Scores")); //Gets SCORE object if it already exists
                console.log("2: ", scoresObj);

            }
            var playerIndex = parseFloat(localStorage.getItem("numPlayers"));
            var player = "player" + playerIndex;
            localStorage.setItem("numPlayers", playerIndex + 1); //Creates a new property in SCORE object to identify the player
            scoresObj[player] = {
                "initials": playerInitials, //Stores player's initials
                "score": finalScore //Scores player's score
            }

            //Logs score and renders past scores
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

    initialsSubmit.addEventListener("click", function () { submitScore() }); //Submits initials and score on click

    ansOne.addEventListener("click", function () { scoreTrack(ansOne) }); //Selects and submits option 1
    ansTwo.addEventListener("click", function () { scoreTrack(ansTwo) }); //Selects and submits option 2
    ansThree.addEventListener("click", function () { scoreTrack(ansThree) }); //Selects and submits option 3
    ansFour.addEventListener("click", function () { scoreTrack(ansFour) }); //Selects and submits option 4
}

//Loops through the store scores and renders them in the scores div
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

//Deletes stored values from localStorage
function clearVals() {
    localStorage.clear();
    hiScoresDetails.innerHTML = "";
}

viewHiScore.addEventListener("click", function() { showHiScores() }); //Shows scores on click
btnReturn.addEventListener("click", function() { location.reload() }); //Goes back to the beginning of the site
btnClear.addEventListener("click", function() { clearVals() }); //Clears values on click