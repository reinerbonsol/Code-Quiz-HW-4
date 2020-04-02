
var startBtn = document.getElementById('start-btn')
var nextBtn = document.getElementById('next-btn')
var doneBtn = document.getElementById('done-btn')
var questionContainerEl = document.getElementById('question-container')
var questionElement = document.getElementById('question')
var answerBtnEl = document.getElementById('answer-buttons')
var score = 0;

let shuffledQuestions, currentQuestionIndex;

startBtn.addEventListener('click', startGame);
startBtn.addEventListener("click", setTime);
// doneBtn.addEventListener('click', doneQuiz);
nextBtn.addEventListener('click', () => {
    currentQuestionIndex++
    setNextQuestion()
})

var timeElement = document.getElementById("timer");
var secondsLeft = 50;

function setTime() {
    var timerInterval = setInterval(function () {
        secondsLeft--;
        timeElement.textContent = "Time Left: " + secondsLeft;

        if (secondsLeft === 0) {
            clearInterval(timerInterval);
            alert('You ran out of time');
        }
    }
        , 1000);
};

function startGame() {
    startBtn.classList.add('hide')
    shuffledQuestions = questions.sort(() => Math.random() - .5)
    currentQuestionIndex = 0
    questionContainerEl.classList.remove('hide')
    setNextQuestion()
}

function setNextQuestion() {
    resetState()
    showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
    questionElement.innerText = question.question
    question.answers.forEach(answer => {
        var button = document.createElement('button')
        button.innerText = answer.text
        button.classList.add('btn')
        if (answer.correct) {
            button.dataset.correct = answer.correct
        }
        button.addEventListener('click', selectAnswer)
        answerBtnEl.appendChild(button)
    })
}

function resetState() {
    clearStatusClass(document.body)
    nextBtn.classList.add('hide')
    while (answerBtnEl.firstChild) {
        answerBtnEl.removeChild(answerBtnEl.firstChild)
    }
}

function selectAnswer(e) {
    var selectedButton = e.target
    var correct = selectedButton.dataset.correct
    setStatusClass(document.body, correct)
    Array.from(answerBtnEl.children).forEach(button => {
        setStatusClass(button, button.dataset.correct)
    })
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
        nextBtn.classList.remove('hide')
    } else {
        startBtn.innerText = "Done!"
        startBtn.classList.remove('hide')
    }
}

// function doneQuiz() {
//     questionContainerEl.innerHTML = ''
//     var createH1 = document.questionContainerEl.createElement("h1");
//     createH1.setAttribute("id", "createH1");
//     createH1.textContent = "All Done!"

// }

function setStatusClass(element, correct) {
    clearStatusClass(element)
    if (correct) {
        element.classList.add('correct')
    } else {
        element.classList.add('wrong')
    }
}

function clearStatusClass(element) {
    element.classList.remove('correct')
    element.classList.remove('wrong')
}

var questions = [
    {
        question: 'What does HTML mean?',
        answers: [
            { text: 'Hypertext Markup Language', correct: true },
            { text: 'Hungry Trout Must Leave', correct: false },
            { text: 'Happy Trees Muse Live', correct: false },
            { text: 'Hungover Teens Make Love', correct: false }
        ]
    },
    {
        question: 'What is CSS?',
        answers: [
            { text: 'Cascading Style Sheet', correct: true },
            { text: 'Used to format layout of Web pages', correct: true },
            { text: 'Defines certain text styles and other aspects of the Web page', correct: true },
            { text: 'Crappy Style System', correct: false }
        ]
    },
    {
        question: 'What does JS mean?',
        answers: [
            { text: 'Janky Setup', correct: false },
            { text: 'Jumping Sets', correct: false },
            { text: 'Janitor System', correct: false },
            { text: 'JavaScript', correct: true }
        ]
    },
    {
        question: 'Which header will be the biggest?',
        answers: [
            { text: 'H3', correct: false },
            { text: 'H1', correct: true },
            { text: 'H2', correct: false },
            { text: 'H6', correct: false }
        ]
    },
    {
        question: 'Which HTML tag is used to define an internal style sheet?',
        answers: [
            { text: '<script>', correct: false },
            { text: '<css>', correct: false },
            { text: '<style>', correct: true },
            { text: '<stylesheet>', correct: false }
        ]
    }
]

//create separate function that logs score according to correct question.