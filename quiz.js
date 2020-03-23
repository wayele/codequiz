var questions = [
    {
        question: "What is the Schuylkill?",
        choiceA: "A river in Philly",
        choiceB: "The tallest building in Philly",
        choiceC: "A street in Philly",
        choiceD: "Founder of Philly",
        rightAnswer: "A river in Philly"
    },

    {
        question: "Broad Street Bullies refers to:",
        choiceA: "A North Philly gang in the 90s",
        choiceB: "The Eagles during their Superbowl run in early 2000s",
        choiceC: "The Flyers during the early 70s",
        choiceD: "The 76ers during the 80s",
        rightAnswer: "The Flyers during the early 70s"
    },

    {
        question: "A true Philly sports fan definitely hates:",
        choiceA: "The Cowboys",
        choiceB: "The Patriots",
        choiceC: "Chip Kelly",
        choiceD: "All of the above",
        rightAnswer: "All of the above"
    },

    {
        question: "If you're between 13th and 15th street in downtown, you are:",
        choiceA: "in Old City",
        choiceB: "on 14th Street",
        choiceC: "on Broad Street",
        choiceD: "in Chinatown",
        rightAnswer: "on Broad Street"
    },

    {
        question: "A philly slang used to refer to a thing, place, person, or event that one need not or cannot give a specific name to.",
        choiceA: "jawn",
        choiceB: "jack",
        choiceC: "justy",
        choiceD: "jibro",
        rightAnswer: "jawn"
    }]

var currentQuestion = 0;
var userGuess = "";
var correctAnswers = 0;
var wrongAnswers = 0;
var startButton = document.getElementById("start-Btn");
var quiz = document.getElementById("quiz");
var question = document.getElementById("question");
var choiceA = document.getElementById("A");
var choiceB = document.getElementById("B");
var choiceC = document.getElementById("C");
var choiceD = document.getElementById("D");
var timerEl = document.getElementById("timer");
var scoreEl = document.getElementById("score");
var lastQuestion = questions.length - 1;
var restartQuizEl = document.getElementById("restart-btn")
restartQuizEl.style.opacity = 0;


$(document).ready(function () {
    startButton.addEventListener('click', startQuiz);
    // This is the function that starts the quiz
    function startQuiz() {
        TIMER = setInterval(showCountdown, 1000);
        console.log('Started')
        startButton.style.display = "none";
        showQuestion();
        quiz.style.display = "block";
        showCountdown();
        setNextQuestion();

    };
    // Display next question function to show the next question after a user selects an answer
    function setNextQuestion() {
        showQuestion[currentQuestion]
    };
    // Display question function to display the quiz question
    function showQuestion() {
        var q = questions[currentQuestion];

        question.innerHTML = "<h2>" + q.question + "</h2>";
        choiceA.innerHTML = q.choiceA;
        choiceB.innerHTML = q.choiceB;
        choiceC.innerHTML = q.choiceC;
        choiceD.innerHTML = q.choiceD;
    };

    // check answer function
    function checkAnswer(userGuess) {
        if (userGuess == questions[currentQuestion].rightAnswer) {
            correctAnswers++
        } else {
            wrongAnswers++
            timeLeft = timeLeft - (wrongAnswers * 10)
        }
        if (currentQuestion < questions.length - 1) {
            currentQuestion++
            showQuestion();
        }
        if (currentQuestion === questions.length - 1) {
            showScore();
            clearInterval(TIMER);
            restartQuiz();
        }
    }

    // User guess onclick function
    $('.choice').on("click", function () {
        var userGuess = $(this).text()
        console.log(userGuess);
        checkAnswer(userGuess);
    });

    // Countdown function
    var TIMER;
    var timeLeft = 90;
    function showCountdown() {
        if (timeLeft <= 0) {
            clearInterval(TIMER);
            alert("You are out of time!");
            showScore();
            restartQuiz();
        } else {
            timerEl.innerHTML = timeLeft + ' seconds remaining';
            timeLeft--;
        }
    }

    // Show score function
    function showScore() {
        scoreEl.style.display = "block";
        var scorePercent = Math.round(100 * correctAnswers / questions.length);
        scoreEl.innerHTML = "You got " + scorePercent + "%";
    }

    // Reset function to reset the score, answers and restart the game
    function restartQuiz() {
        $('#restart-btn').on('click', function () {
            document.getElementById("choices").disabled = true;
            restartQuizEl.style.opacity = 1;
            correctAnswers = "";
            wrongAnswers = "";
        })
    }

    // Highscores function
    // var highscoreEl = document.getElementById('scoreContainer')
    // highscoreEl.addEventListener('click', topScores)

});
