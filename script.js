function generateFrequencies() {
    const minFreqInput = parseFloat(document.getElementById('minFreq').value) || 30;
    const maxFreqInput = parseFloat(document.getElementById('maxFreq').value) || 512;
    if (isNaN(minFreqInput) || isNaN(maxFreqInput) || minFreqInput >= maxFreqInput) {
        alert('Введите корректные мин и макс частоты');
        return;
    }
    const minFreq = minFreqInput;
    const maxFreq = maxFreqInput;
    const numFreqsInput = parseInt(document.getElementById('numFreq').value) || 5;
    if (isNaN(numFreqsInput) || numFreqsInput < 3 || numFreqsInput > 15) {
        alert('Введите количество частот от 3 до 15');
        return;
    }
    const numFreqs = numFreqsInput;
    const startFreqInput = document.getElementById('startFreq').value;
    const startFreq = parseFloat(startFreqInput);
    if (isNaN(startFreq) || startFreq < minFreq || startFreq > maxFreq) {
        alert(`Введите корректную начальную частоту от ${minFreq} до ${maxFreq}`);
        return;
    }
    let freq = startFreq;
    const frequencies = [];

    frequencies.push(freq.toFixed(freq % 1 === 0 ? 0 : 1)); // добавляем начальную частоту
  
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

    const output = frequencies.join(' || ');// разделитель
    document.getElementById('output').textContent = output;
}