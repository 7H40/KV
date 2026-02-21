function generateFrequencies() {
    const startFreqInput = document.getElementById('startFreq');
    const numFreqInput = document.getElementById('numFreq');
    
    if (!startFreqInput || !numFreqInput) {
        alert('Элементы не найдены на странице');
        return;
    }

    const minFreq = 30;
    const maxFreq = 512;
    
    const numItemsInput = parseInt(numFreqInput.value) || 6;
    if (isNaN(numItemsInput) || numItemsInput < 3 || numItemsInput > 16) {
        alert('Введите общее количество элементов от 3 до 16');
        return;
    }
    
    const numFreqs = numItemsInput - 1;
    const startFreq = parseFloat(startFreqInput.value);
    
    if (isNaN(startFreq) || startFreq < minFreq || startFreq > maxFreq) {
        alert(`Введите корректную начальную частоту от ${minFreq} до ${maxFreq}`);
        return;
    }
    
    let freq = startFreq;
    const frequencies = [];

    frequencies.push(freq.toFixed(freq % 1 === 0 ? 0 : 1));
  
    for (let i = 1; i < numFreqs; i++) {
        const increment = Math.random() * 50 + 1; 
        freq += increment;
        if (freq > maxFreq) freq = minFreq + (freq - maxFreq); 
        if (Math.random() < 0.3) {
            const decimal = Math.random() < 0.5 ? 0.5 : 0.4;
            freq += decimal;
        }
        freq = Math.max(minFreq, Math.min(maxFreq, freq));
        frequencies.push(freq.toFixed(freq % 1 === 0 ? 0 : 1));
    }

    const transitions = [0.5, 1.5, 2.5, 3.5, 4.5];
    const transition = transitions[Math.floor(Math.random() * transitions.length)];
    frequencies.push('+' + transition);

    const output = frequencies.join(' || ');
    const outputDiv = document.getElementById('output');
    
    if (!outputDiv) {
        alert('Элемент вывода не найден');
        return;
    }
    
    outputDiv.innerHTML = '';
    const p = document.createElement('p');
    p.textContent = output;
    p.style.cursor = 'pointer';
    p.style.padding = '10px';
    p.style.backgroundColor = '#e8f5e9';
    p.style.borderRadius = '3px';
    p.title = 'Нажмите для копирования';
    
    p.onclick = async () => {
        try {
            await navigator.clipboard.writeText(output);
            alert('Скопировано!');
        } catch (err) {
            alert('Не удалось скопировать');
        }
    };
    
    outputDiv.appendChild(p);
}