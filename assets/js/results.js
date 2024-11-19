var xValues = [];
var yValues = [44, 15];
var barColors = ['#b91d47', '#00aba9'];

const ctx = document.getElementById('myChart').getContext('2d');

new Chart(ctx, {
  type: 'doughnut',
  data: {
    datasets: [
      {
        data: [75, 25],
        backgroundColor: ['#4caf50', '#f44336'],
      },
    ],
  },
  options: {
    responsive: true,
    cutoutPercentage: 70, // Aumenta il buco centrale, valori tra 0 e 100
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
        ctx.fillText('Prova di testo', centerX, centerY);

        ctx.restore();
      },
    },
  ],
});
