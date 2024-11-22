let result = 'error';
let lecture;
let giuste = 0;
let sbagliate = 0;
const wrongs = document.getElementById('wrongs');
const corrects = document.getElementById('corrects');
const ctx = document.getElementById('myChart').getContext('2d');
const btnRateUs = document.getElementById('btnRateUs');
const btnShowResults = document.getElementById('btnShowResults');
const resultMask = document.getElementById('resultMask');
const btnMask = document.getElementById('btnMask');
const maskContent = document.getElementById('maskContent');

//---------------------------------------------------------------

document.addEventListener('load', init());

// funzione di caricamento pagina

function init() {
  lecture = fromLocalStorage();
  checkScore(lecture);
  printScore();
  graphicShow();
  createQuizRecap(lecture);
}

// funzione di lettura del local storage

function fromLocalStorage() {
  const myObj = localStorage.getItem('string');
  let myObj2 = JSON.parse(myObj);
  return myObj2;
}

// funzione di confronto e calcolo del risultato

function checkScore(obj) {
  for (let i = 0; i < obj.domande.length; i++) {
    if (obj.domande[i].correct_answer === obj.risposte[i]) {
      giuste++;
    } else {
      sbagliate++;
    }
  }
}

// funzione di stampa del risultato

function printScore() {
  wrongs.innerText = sbagliate;
  corrects.innerText = giuste;
  document.getElementById('correctPercentage').innerText =
    (giuste / lecture.domande.length) * 100;
  document.getElementById('wrongPercentage').innerText =
    (sbagliate / lecture.domande.length) * 100;
}

// funzione per creazione del grafico e inserimento dei dati del risultato

function graphicShow() {
  var xValues = ['corrects', 'wrongs'];
  var yValues = [giuste, sbagliate];
  var barColors = ['#b91d47', '#00aba9'];
  new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: xValues,
      datasets: [
        {
          data: [giuste, sbagliate],
          backgroundColor: ['#4caf50', '#f44336'],
          borderWidth: 0,
        },
      ],
    },
    options: {
      legend: {
        display: false,
      },
      responsive: true,
      cutoutPercentage: 80, // Aumenta il buco centrale, valori tra 0 e 100
      layout: {
        padding: 20, // Spazio extra attorno al grafico
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

          // funzione per scrivere il testo nel grafico
          insideText();

          // // Calcola la posizione centrale
          // const centerX = width / 2;
          // const centerY = (top + bottom) / 2;

          // // Aggiungi il testo
          // ctx.font = 'bold 20px Arial';
          // ctx.fillStyle = '#ffffff';
          // ctx.textAlign = 'center';
          // ctx.textBaseline = 'middle';
          // ctx.fillText(result, centerX, centerY);

          ctx.restore();
        },
      },
    ],
  });
}

// funzione per scrivere il testo nel grafico

function insideText() {
  insideCanvas.innerHTML = '';
  let message;
  const myH4 = document.createElement('h4');
  const myH4Second = document.createElement('h4');

  if (giuste >= 6) {
    result = `CONGRATULATION!`;
    myH4.innerText = result;
    insideCanvas.appendChild(myH4);
    message = 'You passed the exam';
    myH4Second.style.color = 'green';
    myH4Second.innerText = message;
  } else {
    result = 'SORRY!';
    myH4.innerText = result;
    insideCanvas.appendChild(myH4);
    message = "You didn't pass the exam";
    myH4Second.style.color = 'red';
    myH4Second.innerText = message;
  }
  insideCanvas.appendChild(myH4Second);

  const myP = document.createElement('p');
  myP.innerText = 'Press SHOW RESULTS to check your answers';

  insideCanvas.appendChild(myP);
}

// funzione per button, che porta alla pagina 'feedback.html'

btnRateUs.addEventListener('click', function (event) {
  event.preventDefault();
  location.replace('feedback.html');
});

// funzione per far comparire la maschera con le domande quando viene premuto il bottone
btnShowResults.addEventListener('click', function () {
  resultMask.classList.toggle('hidden');
});

// funzione per far nascondere la maschera con le domande quando viene premuto il bottone
btnMask.addEventListener('click', function () {
  resultMask.classList.toggle('hidden');
});

// funzione per generare il recap del quiz
function createQuizRecap(obj) {
  for (let i = 0; i < obj.risposte.length; i++) {
    const myDiv = document.createElement('div');

    const myH4 = document.createElement('h4');
    myH4.innerText = obj.domande[i].question;
    myDiv.appendChild(myH4);

    const myUl = document.createElement('ul');
    for (let j = 0; j < obj.domande[i].incorrect_answers.length; j++) {
      const myLi = document.createElement('li');
      myLi.innerText = obj.domande[i].incorrect_answers[j];
      myUl.appendChild(myLi);
      if (checkMyAnswer(obj.domande[i].incorrect_answers[j], obj.risposte[i])) {
        myLi.style =
          'color: blueviolet; font-weight: bolder; font-size: 1.3em;';
      }
    }
    const myLi = document.createElement('li');
    myLi.innerText = obj.domande[i].correct_answer;
    myLi.innerText += ` ✔️`;
    if (checkMyAnswer(obj.domande[i].correct_answer, obj.risposte[i])) {
      myLi.style = 'color: blueviolet; font-weight: bolder; font-size: 1.3em;';
    }

    myUl.appendChild(myLi);
    myDiv.appendChild(myUl);
    maskContent.appendChild(myDiv);
  }
}

// funzione per verificare se la risposta che si sta passando corrisponde a quella data dall'utente
function checkMyAnswer(actualAnswer, myAnswer) {
  if (actualAnswer === myAnswer) {
    return true;
  } else {
    return false;
  }
}
