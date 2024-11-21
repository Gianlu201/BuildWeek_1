const checkbox = document.getElementById("startQuiz");
const btnProceed = document.getElementById("btnProceed");
const startQuiz = document.getElementById("startQuiz");
const p = document.getElementById("sentence");

//----------------------------------------------------------------

// funzione che permette il passaggio alla pagina 'questions.html'

btnProceed.addEventListener("click", function (event) {
  event.preventDefault();
  if (check()) {
    location.assign("questions.html");
  }
});

// funzione di controllo sulla checkbox

function check() {
  if (checkbox.checked) {
    p.innerText = " ";
    btnProceed.setAttribute("disable", "false");
    return true;
  } else {
    p.innerText = "Confirm the checkbox to start";

    return false;
  }
}

// funzione per togliere il messaggio sotto la checkbox

startQuiz.addEventListener("click", function () {
  p.innerText = " ";
});
