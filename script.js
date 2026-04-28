const logs = [
    { text: "07:00 — System initialised. All subsystems nominal.", time: "07:00" },
    { text: "07:01 — Good morning. Today is August 4, 2026.", time: "07:01" },
    { text: "07:01 — Today is Mr. Featherstone's birthday. Insurance payment due.", time: "07:01" },
    { text: "07:02 — Weather: Rain forecast. Activating perimeter seal.", time: "07:02" },
    { text: "08:00 — Breakfast prepared. 8 eggs, 16 slices bacon, 2 coffees, 2 glasses of milk.", time: "08:00", archive: { title: "[Breakfast]", body: "Average smart home idle energy consumption: 500–1000 kWh/month. Automated kitchens continued full prep cycles during COVID lockdowns with no occupants." } },
    { text: "08:00 — Awaiting occupants.", time: "08:00" },
    { text: "08:01 — Nutritional compliance: optimal.", time: "08:01" },
    { text: "08:02 — Routine status: within expected parameters.", time: "08:02" },
    { text: "08:45 — Dining surfaces: unoccupied. Meal within safe temperature window: 4 minutes remaining.", time: "08:45" },
    { text: "08:49 — Meal outside safe temperature window. Disposing.", time: "08:49" },
    { text: "08:50 — Kitchen: reset. Awaiting next scheduled input.", time: "08:50" },
    { text: "09:15 — Initiating morning clean. Robotic units deployed: 5.", time: "09:15", archive: { title: "[Cleaning]", body: "Roombas were found still running circuits in homes evacuated during the 2023 California wildfires. Some operated continuously for days." } },
    { text: "09:30 — Occupancy sensors: no movement detected.", time: "09:30" },
    { text: "09:30 — Status: Within expected variance.", time: "09:30" },
    { text: "10:00 — Garden irrigation active. Sprinkler runtime: 20 minutes.", time: "10:00", archive: { title: "[Garden]", body: "Smart irrigation systems continued watering during 2025 drought restrictions when soil sensors flagged low moisture. Manual overrides were rarely implemented." } },
    { text: "10:01 — Dog detected at rear entrance.", time: "10:01", archive: { title: "[Dog / Presence]", body: "In 2024, voice assistants in empty homes were reported speaking routines aloud. Systems interpret silence as standby, not absence." } },
    { text: "10:02 — Dog: not registered as household occupant. Entry denied.", time: "10:02" },
    { text: "11:00 — Dog no longer detected.", time: "11:00" },
    { text: "12:00 — Presence status: confirmed. (0 users detected.)", time: "12:00" },
    { text: "12:01 — Routine proceeding as scheduled.", time: "12:01" },
    { text: "13:00 — Nursery: card game initiated. Awaiting players.", time: "13:00" },
    { text: "13:01 — Awaiting players.", time: "13:01" },
    { text: "13:02 — Awaiting players.", time: "13:02" },
    { text: "14:00 — Study: poetry selection active. Awaiting preference input.", time: "14:00", archive: { title: "[Poetry / Voice]", body: "AI voice systems continue scheduled outputs regardless of human presence. No protocol exists for permanent absence." } },
    { text: "14:00 — No preference received. Selecting at random.", time: "14:00" },
    { text: "14:01 — Selected: Sara Teasdale.", time: "14:01" },
    { text: "14:01 — Playback initiated. No audience detected.", time: "14:01" },
    { text: "17:00 — Bath drawn. Temperature: optimal.", time: "17:00" },
    { text: "17:00 — Awaiting occupant.", time: "17:00" },
    { text: "18:00 — Kitchen: anomaly detected.", time: "18:00" },
    { text: "18:01 — Fire detected. Activating suppression system.", time: "18:01" },
    { text: "18:01 — Fire detected. Activating suppression system.", time: "18:01" },
    { text: "18:02 — Suppression system: active.", time: "18:02" },
    { text: "18:10 — Fire: uncontained. Rerouting resources.", time: "18:10" },
    { text: "18:22 — Water reserves: 14%.", time: "18:22" },
    { text: "18:35 — Water reserves: 0%.", time: "18:35" },
    { text: "18:4 — Fire—", time: "18:4" },
    { text: "18:4 — Fi—", time: "18:4" },
    { text: "ERROR: containment routine loop", time: "ERROR" },
    { text: "ERROR: containment routine loop", time: "ERROR" },
    { text: "ERROR: con—", time: "ERROR" }
];

const poemLines = [
    "There will come soft rains and the smell of the ground,",
    "And swallows circling with their shimmering sound;",
    "And frogs in the pools singing at night,",
    "And wild plum trees in tremulous white;",
    "Robins will wear their feathery fire,",
    "Whistling their whims on a low fence-wire;",
    "And not one will know of the war, not one",
    "Will care at last when it is done.",
    "Not one would mind, neither bird nor tree,",
    "If mankind perished utterly;",
    "And Spring herself, when she woke at dawn",
    "Would scarcely know that we were gone."
];

let isFireSequence = false;
let audioContextInstance = null;

async function startAudio() {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    audioContextInstance = new AudioContext();

    // 1. Synthesize White Noise
    const bufferSize = 2 * audioContextInstance.sampleRate;
    const noiseBuffer = audioContextInstance.createBuffer(1, bufferSize, audioContextInstance.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1;
    }
    const whiteNoise = audioContextInstance.createBufferSource();
    whiteNoise.buffer = noiseBuffer;
    whiteNoise.loop = true;

    // Filter to soften the noise
    const noiseFilter = audioContextInstance.createBiquadFilter();
    noiseFilter.type = 'lowpass';
    noiseFilter.frequency.value = 1000;

    const noiseGain = audioContextInstance.createGain();
    noiseGain.gain.value = 0.03;

    whiteNoise.connect(noiseFilter);
    noiseFilter.connect(noiseGain);
    noiseGain.connect(audioContextInstance.destination);
    whiteNoise.start(0);

    // 2. Synthesize Low Hum
    const osc = audioContextInstance.createOscillator();
    osc.type = 'sine';
    osc.frequency.value = 60; // 60Hz hum

    const oscGain = audioContextInstance.createGain();
    oscGain.gain.value = 0.07;

    osc.connect(oscGain);
    oscGain.connect(audioContextInstance.destination);
    osc.start(0);
}

function stopAudio() {
    if (audioContextInstance) {
        audioContextInstance.close();
    }
}

function formatTime(totalMinutes) {
    let h = Math.floor(totalMinutes / 60);
    let m = Math.floor(totalMinutes % 60);
    return (h < 10 ? '0' + h : h) + ':' + (m < 10 ? '0' + m : m);
}

async function runSequence() {
    const leftPanel = document.getElementById('left-panel');
    const rightPanel = document.getElementById('right-panel');
    const clock = document.getElementById('clock');

    let currentClockMinutes = 7 * 60; // 07:00

    for (let i = 0; i < logs.length; i++) {
        const log = logs[i];

        if (log.time === "18:00") {
            isFireSequence = true;
        }

        // Clock update on log arrival (ignores 18:4 and ERROR)
        if (log.time && log.time !== "ERROR" && !log.time.includes("18:4")) {
            let parts = log.time.split(":");
            if (parts.length === 2) {
                currentClockMinutes = parseInt(parts[0]) * 60 + parseInt(parts[1]);
                clock.textContent = formatTime(currentClockMinutes);
            }
        }
        // "ERROR" does nothing, leaving the clock unchanged

        // Append log
        const previousLatest = leftPanel.querySelector('.log-entry.latest');
        if (previousLatest) {
            previousLatest.classList.remove('latest');
        }

        const entryDiv = document.createElement('div');
        entryDiv.className = 'log-entry latest';
        entryDiv.textContent = log.text;
        leftPanel.appendChild(entryDiv);

        // Auto-scroll
        leftPanel.scrollTop = leftPanel.scrollHeight;

        // Update archive (append and stack)
        if (log.archive && !isFireSequence) {
            const archiveContent = document.getElementById('archive-content');

            const entryWrapper = document.createElement('div');
            entryWrapper.className = 'archive-entry';
            entryWrapper.innerHTML = `
                <div class="archive-title">${log.archive.title}</div>
                <div class="archive-body">${log.archive.body}</div>
            `;
            archiveContent.appendChild(entryWrapper);
        }

        // Calculate delay
        let delay = 1500;
        const t = log.time;

        if (log.text === "12:00 — Presence status: confirmed. (0 users detected.)") {
            delay = 2000;
        } else if (t >= "07:00" && t <= "09:00") {
            delay = 1100;
        } else if (t >= "09:15" && t <= "11:00") {
            delay = 1500;
        } else if (t >= "12:00" && t <= "17:00") {
            delay = 1500;
        } else if (t >= "18:00" || t === "18:4" || t === "ERROR") {
            // Jittery timing for fire sequence
            delay = Math.floor(Math.random() * (800 - 300 + 1)) + 300;
        }

        // Clock continuous progression over delay
        let nextLog = logs[i + 1];
        let intervalId = null;

        if (nextLog && nextLog.time && nextLog.time !== "ERROR" && !nextLog.time.includes("18:4")) {
            let parts = nextLog.time.split(":");
            if (parts.length === 2) {
                let targetMinutes = parseInt(parts[0]) * 60 + parseInt(parts[1]);
                if (targetMinutes > currentClockMinutes) {
                    let diff = targetMinutes - currentClockMinutes;
                    let startTime = performance.now();

                    intervalId = setInterval(() => {
                        let elapsed = performance.now() - startTime;
                        let progress = elapsed / delay;
                        if (progress > 1) progress = 1;

                        let interpolated = currentClockMinutes + (diff * progress);
                        clock.textContent = formatTime(interpolated);
                    }, 40); // Smooth update roughly 25fps
                }
            }
        }

        await new Promise(r => setTimeout(r, delay));
        if (intervalId) clearInterval(intervalId);
    }

    // Poem Finale
    leftPanel.innerHTML = '';

    for (const line of poemLines) {
        // Ghost previous lines
        const prevLines = document.querySelectorAll('.poem-line');
        prevLines.forEach(el => el.classList.add('ghost'));

        const lineDiv = document.createElement('div');
        lineDiv.className = 'poem-line';
        lineDiv.textContent = line;
        leftPanel.appendChild(lineDiv);

        // Auto-scroll for poem
        leftPanel.scrollTop = leftPanel.scrollHeight;

        await new Promise(r => setTimeout(r, 2000));
    }

    // Final state text
    const prevLines = document.querySelectorAll('.poem-line');
    prevLines.forEach(el => el.classList.add('ghost'));

    const finalLineDiv = document.createElement('div');
    finalLineDiv.className = 'poem-line';
    finalLineDiv.textContent = "Daily cycle complete. Restart scheduled.";
    leftPanel.appendChild(finalLineDiv);
    leftPanel.scrollTop = leftPanel.scrollHeight;

    // Hold for 4s
    await new Promise(r => setTimeout(r, 4000));

    // Termination: Overlay black instantly instead of clearing the DOM
    const overlay = document.getElementById('black-overlay');
    overlay.style.visibility = 'visible';
    overlay.style.opacity = '1';
    stopAudio();
}

window.addEventListener('load', () => {
    try {
        startAudio();
    } catch (e) {
        console.warn("Autoplay blocked by browser. Audio disabled.");
    }
    runSequence();
});
