const checkbox = document.getElementById('startQuiz');
const btnProceed = document.getElementById('btnProceed');
const startQuiz = document.getElementById("startQuiz");
const p = document.getElementById('sentence');

btnProceed.addEventListener('click', function (event) {
  event.preventDefault();
  if (check()) {
    location.assign('questions.html');
  }
});

function init() {
  btnProceed.setAttribute('disabled', 'true');
}

function check() {

  if (checkbox.checked) {
    p.innerText = ' ';
    btnProceed.setAttribute('disable', 'false');
    return true;
  } else {
    p.innerText = 'Confirm the checkbox to start';

    return false;
  }
}
startQuiz.addEventListener("click", function () {
  p.innerText = " ";
})

