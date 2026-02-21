function generateFrequencies() {
    const minFreq = 30;
    const maxFreq = 512;
    const startFreqInput = document.getElementById('startFreq').value;
    const startFreq = parseFloat(startFreqInput);
    if (isNaN(startFreq) || startFreq < minFreq || startFreq > maxFreq) {
        alert('Введите корректную начальную частоту от 30 до 512');
        return;
    }
    let freq = startFreq;
    const numFreqs = Math.floor(Math.random() * 6) + 5;
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