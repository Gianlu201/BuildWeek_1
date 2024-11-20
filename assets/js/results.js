let result = "string";
let lecture;
let giuste = 0;
let sbagliate = 0;
const wrongs = document.getElementById("wrongs");
const corrects = document.getElementById("corrects");
const ctx = document.getElementById('myChart').getContext('2d');
const btnRateUs = document.getElementById("btnRateUs");



document.addEventListener("load", init());
function init() {
  lecture = fromLocalStorage();
  checkScore(lecture);
  printScore();
  graphicShow();
}

function fromLocalStorage() {
  const myObj = localStorage.getItem("string");
  let myObj2 = JSON.parse(myObj);
  return myObj2;
}
function checkScore(obj) {
  for (let i = 0; i < obj.domande.length; i++) {
    if (obj.domande[i].correct_answer === obj.risposte[i]) {
      giuste++;
    } else {
      sbagliate++;
    }

  }
  if (giuste >= 6) {
    result = `CONGRATULATION, you passed!`;
  } else {
    result = "SORRY, you didn\'t pass!";
  }
}
function printScore() {
  wrongs.innerText = sbagliate;
  corrects.innerText = giuste;
  document.getElementById("correctPercentage").innerText = giuste / lecture.domande.length * 100;
  document.getElementById("wrongPercentage").innerText = sbagliate / lecture.domande.length * 100;
}
function graphicShow() {
  var xValues = ["corrects", "wrongs"];
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

          ctx.save();

          // Calcola la posizione centrale
          const centerX = width / 2;
          const centerY = (top + bottom) / 2;

          // Aggiungi il testo
          ctx.font = 'bold 20px Arial';
          ctx.fillStyle = '#ffffff';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText(result, centerX, centerY);

          ctx.restore();
        },
      },
    ],
  });
}
btnRateUs.addEventListener('click', function (event) {
  event.preventDefault();
  window.location.assign('feedback.html');

});





























