function generateFrequencies() {
    const minFreq = 30;
    const maxFreq = 512;
    const numFreqs = Math.floor(Math.random() * 6) + 5; // от 5 до 10 частот
    const frequencies = [];

    for (let i = 0; i < numFreqs; i++) {
        let freq = Math.random() * (maxFreq - minFreq) + minFreq; 
        if (Math.random() < 0.5) {
            freq = Math.round(freq * 2) / 2;
        } else {
            freq = Math.round(freq);
        }

        freq = Math.max(minFreq, Math.min(maxFreq, freq));
        frequencies.push(freq.toFixed(freq % 1 === 0 ? 0 : 1));// округляем до 0 или 1 знака после запятой в зависимости от наличия дробной части
    }

    const transitions = [5, 0.5];
    const transition = transitions[Math.floor(Math.random() * transitions.length)];
    frequencies.push('+' + transition);

    const output = frequencies.join(' || ');// разделитель
    document.getElementById('output').textContent = output;
}