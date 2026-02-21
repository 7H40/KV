function toggleTeams() {
    const checked = document.getElementById('useTeams').checked;
    document.getElementById('teamsOptions').style.display = checked ? 'block' : 'none';
}

function generateFrequencies() {
    const minFreq = 30;
    const maxFreq = 512;
    const numItemsInput = parseInt(document.getElementById('numFreq').value) || 6;
    if (isNaN(numItemsInput) || numItemsInput < 3 || numItemsInput > 16) {
        alert('Введите элементов на fireteam от 3 до 16');
        return;
    }
    const numFreqs = numItemsInput - 1; // количество частот без перехода
    const useTeams = document.getElementById('useTeams').checked;
    const numTeams = useTeams ? (parseInt(document.getElementById('numTeams').value) || 1) : 1;
    if (useTeams && (isNaN(numTeams) || numTeams < 1 || numTeams > 5)) {
        alert('Введите количество fireteams от 1 до 5');
        return;
    }
    const startFreqInput = document.getElementById('startFreq').value;
    const startFreq = parseFloat(startFreqInput);
    if (isNaN(startFreq) || startFreq < minFreq || startFreq > maxFreq) {
        alert(`Введите корректную начальную частоту от ${minFreq} до ${maxFreq}`);
        return;
    }
    const transitions = [0.5, 1.5, 2.5, 3.5, 4.5];
    const outputDiv = document.getElementById('output');
    outputDiv.innerHTML = '';

    for (let team = 1; team <= numTeams; team++) {
        let freq;
        if (team === 1) {
            freq = startFreq;
        } else {
            freq = Math.random() * (maxFreq - minFreq) + minFreq;
            freq = Math.round(freq * 2) / 2;
            freq = Math.max(minFreq, Math.min(maxFreq, freq));
        }
        const frequencies = [];

        frequencies.push(freq.toFixed(freq % 1 === 0 ? 0 : 1)); // добавляем начальную частоту для команды
  
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

        const transition = transitions[Math.floor(Math.random() * transitions.length)];
        frequencies.push('+' + transition);

        const teamOutput = frequencies.join(' || ');
        const p = document.createElement('p');
        p.textContent = numTeams === 1 ? teamOutput : `ft${team}: ${teamOutput}`;
        p.style.cursor = 'pointer';
        p.onclick = async () => {
            try {
                await navigator.clipboard.writeText(teamOutput);
                alert('Скопировано!');
            } catch (err) {
                alert('Не удалось скопировать');
            }
        };
        outputDiv.appendChild(p);
    }
}