const question = document.getElementById('question');
const choices = Array.from(document.getElementsByClassName('choice-text'));
console.log(choices)

let currentQuestion = {};
let acceptingAnswers = true;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [
        {
          question: "What is the powerhouse of the cell?",
          choice1: "Nucleus",
          choice2: "Ribosome",
          choice3: "Mitochondrion",
          choice4: "Endoplasmic Reticulum",
          answer: 3
        },
        {
          question: "Which of the following is not a type of blood cell?",
          choice1: "Erythrocyte",
          choice2: "Leukocyte",
          choice3: "Thrombocyte",
          choice4: "Neuron",
          answer: 4
        },
        {
          question: "What is the primary function of red blood cells?",
          choice1: "Transport oxygen",
          choice2: "Fight infection",
          choice3: "Clotting",
          choice4: "Produce antibodies",
          answer: 1
        },
        {
          question: "Which organ is responsible for detoxifying the blood?",
          choice1: "Liver",
          choice2: "Lungs",
          choice3: "Kidneys",
          choice4: "Pancreas",
          answer: 1
        },
        {
          question: "What is the main function of the pancreas?",
          choice1: "Regulating blood sugar levels",
          choice2: "Producing bile",
          choice3: "Digesting proteins",
          choice4: "Filtering blood",
          answer: 1
        },
        {
          question: "Which hormone regulates calcium levels in the blood?",
          choice1: "Insulin",
          choice2: "Thyroxine",
          choice3: "Cortisol",
          choice4: "Parathyroid hormone",
          answer: 4
        },
        {
          question: "What is the function of the cerebellum?",
          choice1: "Regulating body temperature",
          choice2: "Coordinating movement",
          choice3: "Processing visual information",
          choice4: "Controlling hunger",
          answer: 2
        },
        {
          question: "Which of the following is not a part of the central nervous system?",
          choice1: "Brain",
          choice2: "Spinal cord",
          choice3: "Peripheral nerves",
          choice4: "Retina",
          answer: 3
        },
        {
          question: "Which of the following is not a symptom of diabetes?",
          choice1: "Excessive thirst",
          choice2: "Weight gain",
          choice3: "Frequent urination",
          choice4: "Blurred vision",
          answer: 2
        },
        {
          question: "What is the name of the smallest unit of life?",
          choice1: "Cell",
          choice2: "Molecule",
          choice3: "Atom",
          choice4: "Tissue",
          answer: 1
        }
        // Add more questions as needed...
    ];
    
// Constants
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 3;

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions]; // Spread operator: creates a new array with the elements of the existing array
    console.log(availableQuestions);
    getNewQuestion();
}

getNewQuestion = () => {
    if (availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
        // Go to the end page
        return window.location.assign('/end.html');
    }
    questionCounter++; // Update the question counter 
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


startGame();