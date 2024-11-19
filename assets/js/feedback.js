const stars = document.querySelectorAll("#ratingStars label img");
  const inputs = document.querySelectorAll("#ratingStars input");
  const feedbackInput = document.getElementById("feedbackText");
  const rateButton = document.getElementById("btnProceed");
  let selectedRating = null;

  // Funzione per colorare le stelle fino alla selezionata
  function highlightStars(index) {
    stars.forEach((star, i) => {
      if (i <= index) {
        star.style.filter = "none";  // Colora la stella
      } else {
        star.style.filter = "grayscale(100%)";  // Rende la stella in bianco e nero
      }
    });
  }
  // Funzione per resettare la colorazione delle stelle
  function resetStars() {
    stars.forEach((star, i) => {
        if (i <= selectedRating) {
            star.style.filter = "none";  // Colora la stella
          } else {
            star.style.filter = "grayscale(100%)";  // Rende la stella in bianco e nero
          }
  })};
  // Gestire il passaggio del mouse sopra le stelle
  stars.forEach((star, index) => {
    star.addEventListener("mouseover", () => highlightStars(index));
    star.addEventListener("mouseout", () => resetStars());
  });

  // Gestire il click su una stella
  inputs.forEach((input, index) => {
    input.addEventListener("change", () => {
      selectedRating = index; // Salva l'indice della stella selezionata
      resetStars(); // Mantieni le stelle illuminate fino alla selezionata
      console.log(`Valutazione selezionata: ${index + 1}`);
    });
  });

  // Funzione per gestire il click sul pulsante "Rate Us"
  rateButton.addEventListener("click", (event) => {
    event.preventDefault(); // Impedisce il refresh della pagina
    const feedbackText = feedbackInput.value.trim();

    if (selectedRating !== null) {
      const ratingValue = selectedRating + 1; // Indice +1 per avere il valore effettivo
      console.log(`Valutazione: ${ratingValue}`);
      console.log(`Feedback: ${feedbackText || "Nessun feedback fornito."}`);

      alert(
        `Grazie per il tuo feedback!\nValutazione: ${ratingValue}\nCommento: ${feedbackText || "Nessun commento"}`
      );
    } else {
      alert("Per favore seleziona una valutazione a stelle.");
    }
  });
