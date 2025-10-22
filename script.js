    let curr = '0';
    let prev = '';
    let op = '';
    let freshStart = true;

    const prevDisplay = document.getElementById('prevDisplay');
    const currDisplay = document.getElementById('currDisplay');

    function updateDisplay() {
      currDisplay.textContent = curr;
      prevDisplay.textContent = prev || '\u00A0';
    }

    function handleNumber(num) {
      if (freshStart) {
        curr = num;
        freshStart = false;
      } else {
        curr = curr === '0' ? num : curr + num;
      }
      updateDisplay();
    }

    function handleOperator(newOp) {
      if (op && !freshStart) {
        calculate();
      }
      op = newOp;
      prev = curr + ' ' + newOp;
      freshStart = true;
      updateDisplay();
    }

    function calculate() {
      const a = parseFloat(prev);
      const b = parseFloat(curr);
      let result = 0;

      switch (op) {
        case '+': result = a + b; break;
        case '-': result = a - b; break;
        case '*': result = a * b; break;
        case '/': result = b !== 0 ? a / b : 'Error'; break;
      }

      curr = result.toString();
      prev = '';
      op = '';
      freshStart = true;
      updateDisplay();
    }

    document.querySelector('.pad').addEventListener('click', e => {
      const btn = e.target.closest('button');
      if (!btn) return;

      const num = btn.dataset.num;
      const action = btn.dataset.action;

      if (num !== undefined) {
        handleNumber(num);
      } else if (action) {
        switch (action) {
          case 'add':
          case 'subtract':
          case 'multiply':
          case 'divide':
            handleOperator(btn.textContent);
            break;
          case 'equals':
            if (op) calculate();
            break;
          case 'clear-all':
            curr = '0';
            prev = '';
            op = '';
            freshStart = true;
            updateDisplay();
            break;
          case 'clear-entry':
            curr = '0';
            freshStart = true;
            updateDisplay();
            break;
          case 'backspace':
            if (curr.length > 1) {
              curr = curr.slice(0, -1);
            } else {
              curr = '0';
            }
            updateDisplay();
            break;
          case 'dot':
            if (!curr.includes('.')) {
              curr += '.';
              updateDisplay();
            }
            break;
          case 'negate':
            curr = (parseFloat(curr) * -1).toString();
            updateDisplay();
            break;
          case 'square':
            curr = (parseFloat(curr) ** 2).toString();
            updateDisplay();
            break;
          case 'sqrt':
            curr = Math.sqrt(parseFloat(curr)).toString();
            updateDisplay();
            break;
          case 'percent':
            curr = (parseFloat(curr) / 100).toString();
            updateDisplay();
            break;
        }
      }
    });

    document.addEventListener('keydown', e => {
      if (e.key >= '0' && e.key <= '9') {
        handleNumber(e.key);
      } else if (e.key === '+') {
        handleOperator('+');
      } else if (e.key === '-') {
        handleOperator('-');
      } else if (e.key === '*') {
        handleOperator('*');
      } else if (e.key === '/') {
        e.preventDefault();
        handleOperator('/');
      } else if (e.key === 'Enter' || e.key === '=') {
        if (op) calculate();
      } else if (e.key === 'Backspace') {
        if (curr.length > 1) {
          curr = curr.slice(0, -1);
        } else {
          curr = '0';
        }
        updateDisplay();
      } else if (e.key === '.') {
        if (!curr.includes('.')) {
          curr += '.';
          updateDisplay();
        }
      } else if (e.key === '%') {
        curr = (parseFloat(curr) / 100).toString();
        updateDisplay();
      }
    });
