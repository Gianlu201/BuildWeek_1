const questions = [
  {
    category: 'Science: Computers',
    type: 'multiple',
    difficulty: 'easy',
    question: 'What does CPU stand for?',
    correct_answer: 'Central Processing Unit',
    incorrect_answers: [
      'Central Process Unit',
      'Computer Personal Unit',
      'Central Processor Unit',
    ],
  },
  {
    category: 'Science: Computers',
    type: 'multiple',
    difficulty: 'easy',
    question:
      "In the programming language Java, which of these keywords would you put on a variable to make sure it doesn't get modified?",
    correct_answer: 'Final',
    incorrect_answers: ['Static', 'Private', 'Public'],
  },
  {
    category: 'Science: Computers',
    type: 'boolean',
    difficulty: 'easy',
    question: 'The logo for Snapchat is a Bell.',
    correct_answer: 'False',
    incorrect_answers: ['True'],
  },
  {
    category: 'Science: Computers',
    type: 'boolean',
    difficulty: 'easy',
    question:
      'Pointers were not used in the original C programming language; they were added later on in C++.',
    correct_answer: 'False',
    incorrect_answers: ['True'],
  },
  {
    category: 'Science: Computers',
    type: 'multiple',
    difficulty: 'easy',
    question:
      'What is the most preferred image format used for logos in the Wikimedia database?',
    correct_answer: '.svg',
    incorrect_answers: ['.png', '.jpeg', '.gif'],
  },
  {
    category: 'Science: Computers',
    type: 'multiple',
    difficulty: 'easy',
    question: 'In web design, what does CSS stand for?',
    correct_answer: 'Cascading Style Sheet',
    incorrect_answers: [
      'Counter Strike: Source',
      'Corrective Style Sheet',
      'Computer Style Sheet',
    ],
  },
  {
    category: 'Science: Computers',
    type: 'multiple',
    difficulty: 'easy',
    question:
      'What is the code name for the mobile operating system Android 7.0?',
    correct_answer: 'Nougat',
    incorrect_answers: ['Ice Cream Sandwich', 'Jelly Bean', 'Marshmallow'],
  },
  {
    category: 'Science: Computers',
    type: 'multiple',
    difficulty: 'easy',
    question: 'On Twitter, what is the character limit for a Tweet?',
    correct_answer: '140',
    incorrect_answers: ['120', '160', '100'],
  },
  {
    category: 'Science: Computers',
    type: 'boolean',
    difficulty: 'easy',
    question: 'Linux was first created as an alternative to Windows XP.',
    correct_answer: 'False',
    incorrect_answers: ['True'],
  },
  {
    category: 'Science: Computers',
    type: 'multiple',
    difficulty: 'easy',
    question:
      'Which programming language shares its name with an island in Indonesia?',
    correct_answer: 'Java',
    incorrect_answers: ['Python', 'C', 'Jakarta'],
  },
];

const btnProceed = document.getElementById('btnProceed');
let questionIndex = 0;
const questionText = document.getElementById('domanda');
const counter = document.getElementById('counter');
const answersContainer = document.getElementById('answersContainer');
const ctx = document.getElementById('timerChart').getContext('2d');
const arrayAnswers = [];
let shuffledQuestions;
let answersArray;
let timeLeft;
let timerChart = {};
const timerElement = document.getElementById('timer');

//---------------------------------------------------------

document.addEventListener('load', init());

// funzione di caricamento pagina

function init() {
  onbeforeunload = function () {
    return false;
  };

  disableButton();

  shuffledQuestions = getRandomQuestion(questions);

  showQuestion(shuffledQuestions, questionIndex);
  questionNumber(questionIndex);

  answersArray = shuffleAnswers(shuffledQuestions, questionIndex);
  showAnswers(answersArray);
  clickable();

  timerStart();
}

// funzioni enable e disable del button 'proceed'

function disableButton() {
  btnProceed.classList.add('invisible');
}
function ableButton() {
  btnProceed.classList.remove('invisible');
}

// funzione che prende in input un array e ritorna un array con le domande randomizzate

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

// funzione per stampare le domande nell'html

function showQuestion(arr, index) {
  questionText.innerText = `${arr[index].question}`;
}

// counter per aumentare il numero della domanda a cui sei

function questionNumber(index) {
  counter.innerText = index + 1;
}

// funzione che riceve un array delle risposte, riceve l'indice corrente, poi mescola l'array e ritorna le risposte randomizzate

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

// funzione che crea gli elementi html e ne stampa le risposte all'interno

function showAnswers(arr) {
  for (let i = 0; i < arr.length; i++) {
    const myDiv = document.createElement('div');
    myDiv.classList.add('pressed');
    const myRadio = document.createElement('input');
    myRadio.type = 'radio';
    myRadio.id = `button${i + 1}`;
    myRadio.classList.add('hidden');
    myRadio.name = 'answer';
    myRadio.value = arr[i];

    const myLabel = document.createElement('label');
    myLabel.classList.add('label');
    myLabel.setAttribute('for', `button${i + 1}`);
    myLabel.innerText = arr[i];

    myDiv.appendChild(myRadio);
    myDiv.appendChild(myLabel);

    answersContainer.appendChild(myDiv);
  }
}

// funzione che crea il timer ad ogni domanda e stampa all'interno un countdown

function timerStart() {
  timeLeft = 30;
  timerChart = new Chart(ctx, {
    type: 'doughnut',
    data: {
      datasets: [
        {
          data: [timeLeft, 0],
          backgroundColor: ['#4caf50', 'rgba(0, 0, 0, 0)'],
          borderWidth: 0,
        },
      ],
    },
    options: {
      responsive: true,
      cutout: '70%',
      plugins: {
        tooltip: {
          enabled: false,
        },
      },
    },
    plugins: [
      {
        id: 'center-text',
        beforeDraw: (chart) => {
          const { width } = chart;
          const { top, bottom } = chart.chartArea;

          const ctx = chart.ctx;
          ctx.shadowColor = '#222222';
          ctx.shadowBlur = 15;

          ctx.save();

          const centerX = width / 2;
          const centerY = (top + bottom) / 2;

          ctx.font = 'bold 20px Arial';
          ctx.fillStyle = '#ffffff';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText(`${timeLeft}`, centerX, centerY);

          ctx.restore();
        },
      },
    ],
  });

  const countdown = setInterval(() => {
    timerChart.data.datasets[0].data = [timeLeft, 30 - timeLeft];
    timerChart.update();

    if (timeLeft === 0) {
      btnCliccato('undefined');
      goNext();
    }
    timeLeft--;
  }, 1000);
}

// funzione per rende cliccabili i button delle risposte

function clickable() {
  const fishing = document.querySelectorAll('.pressed');
  fishing.forEach((element) => {
    element.addEventListener('click', function () {
      unselectAllButtons();
      element.classList.add('checked');
      ableButton();
    });
  });
}

// funzione per deselezionare una risposta già selezionata (a livello CSS)

function unselectAllButtons() {
  const previousSelected = document.querySelector('.checked');
  if (previousSelected) {
    previousSelected.classList.remove('checked');
  }
}

// funzione per inviare la risposta selezionata

btnProceed.addEventListener('click', function (e) {
  e.preventDefault();
  check();
  goNext();
});

// funzione per inserire il valore della risposta selezionata all'interno di un array

function check() {
  const array = document.querySelectorAll('input[type=radio]');

  for (let i = 0; i < array.length; i++) {
    if (array[i].checked) {
      btnCliccato(array[i].value);
    }
  }
}

// funzione per popolare l'array delle risposte date

function btnCliccato(ele) {
  arrayAnswers.push(ele);
}

// funzione per inserire in un local storage un oggetto che contiene l'array di oggetti e un array con le risposte date

function toLocalStorage(array1) {
  const myObj = {
    domande: shuffledQuestions,
    risposte: array1,
  };
  let myString = JSON.stringify(myObj);
  localStorage.setItem('string', myString);
}

// funzione con eventi di reset della pagina allo scadere del tempo e all'invio della domanda

function goNext() {
  if (questionIndex === questions.length - 1) {
    toLocalStorage(arrayAnswers);
    location.replace('results.html');
  }
  questionIndex++;
  answersContainer.innerHTML = '';

  disableButton();

  showQuestion(shuffledQuestions, questionIndex);
  questionNumber(questionIndex);

  answersArray = shuffleAnswers(shuffledQuestions, questionIndex);
  showAnswers(answersArray);
  clickable();

  timerStart();
}
