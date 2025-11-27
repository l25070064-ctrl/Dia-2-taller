const aInput = document.getElementById('a');
const bInput = document.getElementById('b');
const resultEl = document.getElementById('result');
const errorEl = document.getElementById('error');
const opButtons = Array.from(document.querySelectorAll('.ops button[data-op]'));
let currentOp = 'add';

opButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    opButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    currentOp = btn.dataset.op;
    errorEl.textContent = '';
  });
});
// marcar suma por defecto
const defaultBtn = document.querySelector('.ops button[data-op="add"]');
if(defaultBtn) defaultBtn.classList.add('active');

function parseNumber(value){
  if (typeof value !== 'string') value = String(value);
  value = value.trim().replace(',','.');
  if (value === '') return NaN;
  return Number(value);
}

function showError(msg){ errorEl.textContent = msg; resultEl.textContent = ''; }

function formatResult(n){
  if (!Number.isFinite(n)) return String(n);
  // limitar precisión razonable
  return Number.parseFloat(n.toPrecision(12)).toString();
}

function compute(){
  const a = parseNumber(aInput.value);
  const b = parseNumber(bInput.value);
  if (Number.isNaN(a) || Number.isNaN(b)){
    showError('Introduce números válidos en ambos campos.');
    return;
  }
  let res;
  switch(currentOp){
    case 'add': res = a + b; break;
    case 'sub': res = a - b; break;
    case 'mul': res = a * b; break;
    case 'div':
      if (b === 0){ showError('Error: división por cero.'); return; }
      res = a / b; break;
    default: res = a + b;
  }
  errorEl.textContent = '';
  resultEl.textContent = formatResult(res);
}

document.getElementById('equals').addEventListener('click', compute);
document.getElementById('clear').addEventListener('click', () => {
  aInput.value = '';
  bInput.value = '';
  resultEl.textContent = '';
  errorEl.textContent = '';
  aInput.focus();
});

[aInput, bInput].forEach(input => {
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') compute();
  });
});

aInput.focus();
