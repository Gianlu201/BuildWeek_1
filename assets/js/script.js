const checkbox = document.getElementById('startQuiz');
const btnProceed = document.getElementById('btnProceed');

btnProceed.addEventListener('click', function (event) {
  event.preventDefault();
  if (check()) {
    window.location.assign('questions.html');
  }
});

function init() {
  btnProceed.setAttribute('disabled', 'true');
}

function check() {
  const p = document.getElementById('sentence');
  if (checkbox.checked) {
    p.innerText = ' ';
    btnProceed.setAttribute('disable', 'false');
    return true;
  } else {
    p.innerText = 'Confirm the checkbox to start';
    return false;
  }
}

// TODO far scomparire il contenuto di p quando viene flaggato il box

