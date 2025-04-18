const calculator = document.getElementById('calculator');

// Create input display
const display = document.createElement('input');
display.type = 'text';
display.className = 'form-control mb-3';
display.readOnly = true;
calculator.appendChild(display);

// Memory store
let memory = 0;
if (localStorage.getItem("calculatorMemory")) {
  memory = parseFloat(localStorage.getItem("calculatorMemory"));
}

// Button values
const buttons = [
  ['7', '8', '9', '/', 'MC'],
  ['4', '5', '6', '*', 'M+'],
  ['1', '2', '3', '-', 'M-'],
  ['0', '%', 'C', '+', '=']
];

// Render buttons
buttons.forEach(row => {
  const div = document.createElement('div');
  div.className = 'row mb-2';
  row.forEach(val => {
    const col = document.createElement('div');
    col.className = 'col';
    const btn = document.createElement('button');
    btn.textContent = val;
    btn.className = 'btn btn-secondary';
    btn.onclick = () => handleButton(val);
    col.appendChild(btn);
    div.appendChild(col);
  });
  calculator.appendChild(div);
});

// Handle button click
function handleButton(value) {
  if (value === 'C') {
    display.value = '';
  } else if (value === '=') {
    try {
      display.value = eval(display.value);
    } catch {
      display.value = 'Error';
    }
  } else if (value === 'M+') {
    memory = eval(display.value || '0');
    localStorage.setItem("calculatorMemory", memory);
    alert("Stored to memory: " + memory);
  } else if (value === 'M-') {
    memory = 0;
    localStorage.setItem("calculatorMemory", memory);
    alert("Memory cleared");
  } else if (value === 'MC') {
    display.value = memory;
  } else {
    display.value += value;
  }
}

// Keyboard support
document.addEventListener('keydown', function (e) {
  const allowedKeys = /[0-9+\-*/%=]/;
  if (allowedKeys.test(e.key)) {
    display.value += e.key;
  } else if (e.key === 'Enter') {
    try {
      display.value = eval(display.value);
    } catch {
      display.value = 'Error';
    }
  } else if (e.key === 'Backspace') {
    display.value = display.value.slice(0, -1);
  } else {
    alert("Only numbers are allowed");
  }
});
