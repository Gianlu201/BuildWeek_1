const questions = [
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question: "What does CPU stand for?",
    correct_answer: "Central Processing Unit",
    incorrect_answers: [
      "Central Process Unit",
      "Computer Personal Unit",
      "Central Processor Unit",
    ],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question:
      "In the programming language Java, which of these keywords would you put on a variable to make sure it doesn&#039;t get modified?",
    correct_answer: "Final",
    incorrect_answers: ["Static", "Private", "Public"],
  },
  {
    category: "Science: Computers",
    type: "boolean",
    difficulty: "easy",
    question: "The logo for Snapchat is a Bell.",
    correct_answer: "False",
    incorrect_answers: ["True"],
  },
  {
    category: "Science: Computers",
    type: "boolean",
    difficulty: "easy",
    question:
      "Pointers were not used in the original C programming language; they were added later on in C++.",
    correct_answer: "False",
    incorrect_answers: ["True"],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question:
      "What is the most preferred image format used for logos in the Wikimedia database?",
    correct_answer: ".svg",
    incorrect_answers: [".png", ".jpeg", ".gif"],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question: "In web design, what does CSS stand for?",
    correct_answer: "Cascading Style Sheet",
    incorrect_answers: [
      "Counter Strike: Source",
      "Corrective Style Sheet",
      "Computer Style Sheet",
    ],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question:
      "What is the code name for the mobile operating system Android 7.0?",
    correct_answer: "Nougat",
    incorrect_answers: ["Ice Cream Sandwich", "Jelly Bean", "Marshmallow"],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question: "On Twitter, what is the character limit for a Tweet?",
    correct_answer: "140",
    incorrect_answers: ["120", "160", "100"],
  },
  {
    category: "Science: Computers",
    type: "boolean",
    difficulty: "easy",
    question: "Linux was first created as an alternative to Windows XP.",
    correct_answer: "False",
    incorrect_answers: ["True"],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question:
      "Which programming language shares its name with an island in Indonesia?",
    correct_answer: "Java",
    incorrect_answers: ["Python", "C", "Jakarta"],
  },
];

const btnProceed = document.getElementById("btnProceed");
let questionIndex = 0;
const questionText = document.getElementById("domanda");
const counter = document.getElementById("counter");
const answersContainer = document.getElementById("answersContainer");
const arrayAnswers = [];
let shuffledQuestions;
let answersArray;
let timeLeft;

// ---------------------------------------------------------

//Elenco funzioni

/*
  init()

  disableButton()

  getRandomQuestion()
  showQuestion()
  questionNumber()

  shuffleAnswers()
  showAnswers()

  timerStart()

*/

document.addEventListener("load", init());

function init() {
  disableButton();

  shuffledQuestions = getRandomQuestion(questions);

  showQuestion(shuffledQuestions, questionIndex);
  questionNumber(questionIndex);

  answersArray = shuffleAnswers(shuffledQuestions, questionIndex);
  showAnswers(answersArray);
  clickable();

  timerStart();
}

function disableButton() {
  btnProceed.classList.add("invisible");
}
function ableButton() {
  btnProceed.classList.remove("invisible");
}

function getRandomQuestion(arr) {
  const originalQuestions = [...arr];
  const myQuestions = [];

  for (let i = 0; i < arr.length; i++) {
    const question = Math.floor(Math.random() * originalQuestions.length);
    myQuestions.push(originalQuestions[question]);
    originalQuestions.splice(question, 1);
  }

  return myQuestions;
}

function showQuestion(arr, index) {
  questionText.innerText = `${arr[index].question}`;
}

function questionNumber(index) {
  counter.innerText = index + 1;
}

function shuffleAnswers(arr, index) {
  const myAnswers = arr[index].incorrect_answers.concat(
    arr[index].correct_answer
  );

  const originalAnswers = [...myAnswers];
  const myShuffleAnswers = [];

  for (let i = 0; i < myAnswers.length; i++) {
    const answer = Math.floor(Math.random() * originalAnswers.length);
    myShuffleAnswers.push(originalAnswers[answer]);
    originalAnswers.splice(answer, 1);
  }

  return myShuffleAnswers;
}

function showAnswers(arr) {
  console.log(arr);
  for (let i = 0; i < arr.length; i++) {
    const myDiv = document.createElement("div");
    myDiv.classList.add("pressed");
    const myRadio = document.createElement("input");
    myRadio.type = "radio";
    myRadio.id = `button${i + 1}`;
    myRadio.classList.add("hidden");
    myRadio.name = "answer";
    myRadio.value = arr[i];

    const myLabel = document.createElement("label");
    myLabel.classList.add("label");
    myLabel.setAttribute("for", `button${i + 1}`);
    myLabel.innerText = arr[i];

    myDiv.appendChild(myRadio);
    myDiv.appendChild(myLabel);

    answersContainer.appendChild(myDiv);
  }
}

// TO DO riguardare Canvas all'interno del timer 
// timerStart();

function timerStart() {
  timeLeft = 30;
  const ctx = document.getElementById("timerChart").getContext("2d");

const timerChart = new Chart(ctx, {
  type: "doughnut",
  data: {
    datasets: [
      {
        data: [timeLeft, 0],
        backgroundColor: ["#4caf50", "rgba(0, 0, 0, 0)"],
        borderWidth: 0,
      },
    ],
  },
  options: {
    responsive: true,
    cutout: "70%",
    plugins: {
      tooltip: {
        enabled: false,
      },
    },
  },
  plugins: [
    {
      id: "center-text",
      beforeDraw: (chart) => {
        const { width } = chart;
        const { top, bottom } = chart.chartArea;
        const ctx = chart.ctx;

        ctx.save();

        const centerX = width / 2;
        const centerY = (top + bottom) / 2;

        ctx.font = "bold 20px Arial";
        ctx.fillStyle = "#ffffff";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(`${timeLeft}`, centerX, centerY);

        ctx.restore();
      },
    },
  ],
});

  const timerElement = document.getElementById("timer");

  const countdown = setInterval(() => {
    timeLeft--;

    timerChart.data.datasets[0].data = [timeLeft, 30 - timeLeft];
    timerChart.update();

    if (timeLeft === 0) {
      clearInterval(countdown);
      timerElement.textContent = "Tempo scaduto!";
    }
  }, 1000);
}

function clickable() {
  const fishing = document.querySelectorAll(".pressed");
  fishing.forEach((element) => {
    element.addEventListener("click", function () {
      ableButton();
    });
  });
}

btnProceed.addEventListener("click", function (e) {
  e.preventDefault();
  check();
  if(questionIndex===9){
    toLocalStorage(arrayAnswers);
    location.assign('results.html');
  }

  questionIndex++;
  answersContainer.innerHTML='';

  disableButton();

  showQuestion(shuffledQuestions, questionIndex);
  questionNumber(questionIndex);

  answersArray = shuffleAnswers(shuffledQuestions, questionIndex);
  showAnswers(answersArray);
  clickable();

  timerStart();
});

function check() {
  const array = document.querySelectorAll("input[type=radio]");
  console.log(array);
  array.forEach((element) => {
    if (element.checked) {
      btnCliccato(element.value);
      console.log(arrayAnswers);
    }
  });
}

function btnCliccato(ele) {
  arrayAnswers.push(ele);
}

function toLocalStorage(array){
  let myString = JSON.stringify(array);
  localStorage.setItem('string', myString)
}

// TODO implementare la funzione di fine timer 
