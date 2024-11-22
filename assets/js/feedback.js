const stars = document.querySelectorAll('#ratingStars label img');
const inputs = document.querySelectorAll('#ratingStars input');
const feedbackInput = document.getElementById('feedbackText');
const rateButton = document.getElementById('btnProceed');
let selectedRating = -1;
const formFeedback = document.getElementById('formFeedback');

//----------------------------------------------------------------------------

// Funzione per colorare le stelle fino alla selezionata

function highlightStars(index) {
  stars.forEach((star, i) => {
    if (i <= index) {
      star.style.filter = 'none'; // Colora la stella
    } else {
      star.style.filter = 'grayscale(100%)'; // Rende la stella in bianco e nero
    }
  });
}

// Funzione per resettare la colorazione delle stelle

function resetStars() {
  stars.forEach((star, i) => {
    if (i <= selectedRating) {
      star.style.filter = 'none';
    } else {
      star.style.filter = 'grayscale(100%)';
    }
  });
}

// Gestire il passaggio del mouse sopra le stelle

stars.forEach((star, index) => {
  star.addEventListener('mouseover', () => highlightStars(index));
  star.addEventListener('mouseout', () => resetStars());
});

// Gestire il click su una stella

inputs.forEach((input, index) => {
  input.addEventListener('change', () => {
    selectedRating = index; // Salva l'indice della stella selezionata
    resetStars(); // Mantieni le stelle illuminate fino alla selezionata
    console.log(`Valutazione selezionata: ${index + 1}`);
  });
});

// Funzione per gestire il click sul pulsante "Rate Us"

rateButton.addEventListener('click', (event) => {
  event.preventDefault();
  const feedbackText = feedbackInput.value.trim();

  if (selectedRating !== null) {
    const ratingValue = selectedRating + 1;
    console.log(`Valutazione: ${ratingValue}`);
    console.log(`Feedback: ${feedbackText || 'Nessun feedback fornito.'}`);

    toLocalStorage(ratingValue, feedbackText);

    alert(
      `Grazie per il tuo feedback!\nValutazione: ${ratingValue}\nCommento: ${
        feedbackText || 'Nessun commento'
      }`
    );
  } else {
    alert('Per favore seleziona una valutazione a stelle.');
  }

  selectedRating = -1;
  resetStars();
  formFeedback.reset();
});

// funzione per inserire in un local storage un oggetto contenente due attributi

function toLocalStorage(rating, comment) {
  const myObj = {
    valutazione: rating,
    recensione: comment,
  };
  let myString = JSON.stringify(myObj);
  localStorage.setItem('feedback', myString);
}
