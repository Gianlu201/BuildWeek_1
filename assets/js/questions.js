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

  const shuffledQuestions = getRandomQuestion(questions);

  showQuestion(shuffledQuestions, questionIndex);
  questionNumber(questionIndex);

  let answersArray = shuffleAnswers(shuffledQuestions, questionIndex);
  showAnswers(answersArray);

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
    myDiv.classList.add("clickkata");
    const myRadio = document.createElement("input");
    myRadio.type = "radio";
    myRadio.id = `button${i + 1}`;
    myRadio.classList.add("hidden");
    myRadio.name = "answer";
    myRadio.value = arr[i];

    const myLabel = document.createElement("label");
    myLabel.classList.add('label');
    myLabel.setAttribute("for", `button${i + 1}`);
    myLabel.innerText = arr[i];

    myDiv.appendChild(myRadio);
    myDiv.appendChild(myLabel);

    answersContainer.appendChild(myDiv);
  }
}
const fishing = document.querySelectorAll(".clickkata");
console.log(fishing);
fishing.forEach((element) => {
  element.addEventListener("click", function () {
    ableButton();
  });
});

// Funzioni timer

let timeLeft = 30; // Durata iniziale del timer

// Configura il grafico Chart.js
const ctx = document.getElementById("timerChart").getContext("2d");

const timerChart = new Chart(ctx, {
  type: "doughnut",
  data: {
    datasets: [
      {
        data: [timeLeft, 0], // Tempo rimanente e tempo trascorso
        backgroundColor: ["#4caf50", "rgba(0, 0, 0, 0)"],
        borderWidth: 0,
      },
    ],
  },
  options: {
    responsive: true,
    cutout: "70%", // Aumenta il buco centrale
    plugins: {
      tooltip: {
        enabled: false, // Disabilita i tooltip per pulizia
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

        // Calcola la posizione centrale
        const centerX = width / 2;
        const centerY = (top + bottom) / 2;

        // Aggiungi il testo
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

// timerStart();
// Recupera l'elemento HTML per il timer

function timerStart() {
  const timerElement = document.getElementById("timer");

  // Funzione per aggiornare il timer e il grafico
  const countdown = setInterval(() => {
    // Aggiorna il testo del timer

    timeLeft--;
    // Aggiorna i dati del grafico
    timerChart.data.datasets[0].data = [timeLeft, 30 - timeLeft];
    timerChart.update();

    // Riduci il tempo

    // Ferma il timer e aggiorna il testo se il tempo è scaduto
    if (timeLeft === 0) {
      clearInterval(countdown);
      timerElement.textContent = "Tempo scaduto!";
    }
  }, 1000);
}
btnProceed.addEventListener("click", function () {
  e.preventDefault();
  btnCliccato();
});
function ck(){
  const array = document.querySelectorAll('input[type=radio]'); 
  console.log(array);
  array.forEach((element)=>{
    if(element.checked){
      console.log(element.value);
    }
  })
}
ck();
const localStorage = [];
function btnCliccato(e) {
  localStorage.push();
}
