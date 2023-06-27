// Obtenemos los elementos del DOM
const incrementBtn = document.getElementById('increment-btn');
const decrementBtn = document.getElementById('decrement-btn');
const resetBtn = document.getElementById('reset-btn')
const countElement = document.getElementById('count');

let count = 0;

// Función para incrementar el contador
function incrementCount() {
  count++;
  countElement.textContent = count;
}

// Función para decrementar el contador
function decrementCount() {
  if (count > 0) {
    count--;
    countElement.textContent = count;
  }
}
// Función para resetear el contador
function resetCount() {
    count = 0;
    countElement.textContent = count;
  }

// Agregamos los event listeners a los botones
incrementBtn.addEventListener('click', incrementCount);
decrementBtn.addEventListener('click', decrementCount);
resetBtn.addEventListener('click', resetCount);