const question = document.getElementById('question');
const choices = Array.from(document.getElementsByClassName('choice-text'));
const progressText = document.getElementById('progressText');
const scoreText = document.getElementById('score');
const progressBarFull = document.getElementById('progressBarFull');
let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [];

fetch('questions.json').then(res => {
  console.log(res);
  return res.json();
}).then(loadedQuestions => {
  console.log(loadedQuestions);
  questions = loadedQuestions;
  startGame();
}).catch(err => {
  console.error(err);
});
    
// Constants
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 10;

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions]; // Spread operator: creates a new array with the elements of the existing array
    console.log(availableQuestions);
    getNewQuestion();
}

getNewQuestion = () => {
    if (availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score);
        // Go to the end page
        return window.location.assign('/end.html');
    }
    
    // Update the question counter
    questionCounter++; 
    progressText.innerText = ` Question ${questionCounter}/${MAX_QUESTIONS}`;

    // Update the progress bar
    
    progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;
    
    // Randomly select a question. Math.floor rounds down to the nearest whole number with max length of availableQuestions
    const questionIndex = Math.floor(Math.random() * availableQuestions.length); 
    currentQuestion = availableQuestions[questionIndex];
    question.innerText = currentQuestion.question;

    choices.forEach(choice => {
        const number = choice.dataset['number'];
        choice.innerText = currentQuestion['choice' + number];
    });

    availableQuestions.splice(questionIndex, 1);
    
    acceptingAnswers = true;
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if (!acceptingAnswers) return;

        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset['number'];

        const classToApply = 
            selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect';
            // Alternatively:
            // const classToApply = 'incorrect';
            // if (selectedAnswer == currentQuestion.answer) {
            //     classToApply = 'correct';
            // }

        if (classToApply === 'correct') {
            incrementScore(CORRECT_BONUS);
        }
            
        selectedChoice.parentElement.classList.add(classToApply);

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestion();
        }, 500); // 500 ms delay
    });
}
);

incrementScore = num => {
    score += num;
    scoreText.innerText = score;
}