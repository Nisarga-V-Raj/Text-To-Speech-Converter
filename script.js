let speech = new SpeechSynthesisUtterance();
let voices = [];
const voiceSelect = document.querySelector("select");
const pitchInput = document.getElementById("pitch");
const rateInput = document.getElementById("rate");
const themeSwitcher = document.getElementById("themeSwitcher");
const heroSection = document.querySelector(".hero");

// Theme switcher functionality
themeSwitcher.addEventListener("change", () => {
    document.body.classList.toggle("light-mode");
    heroSection.classList.toggle("light-mode");
});

speech.pitch = parseFloat(pitchInput.value);
speech.rate = parseFloat(rateInput.value);

pitchInput.addEventListener("input", () => {
    speech.pitch = parseFloat(pitchInput.value);
});
rateInput.addEventListener("input", () => {
    speech.rate = parseFloat(rateInput.value);
});

// Load voices asynchronously
window.speechSynthesis.onvoiceschanged = () => {
    voices = window.speechSynthesis.getVoices();
    if (voices.length > 0) {
        speech.voice = voices[0];
        voices.forEach((voice, i) => {
            const option = new Option(voice.name + " (" + voice.lang + ")", i);
            voiceSelect.add(option);
        });
    }
};

// Handle voice selection
voiceSelect.addEventListener("change", () => {
    speech.voice = voices[voiceSelect.value];
});

// Handle button click
document.querySelector("button").addEventListener("click", () => {
    const text = document.querySelector("textarea").value.trim();
    if (!text) {
        alert("Please enter some text!");
        return;
    }
    speech.text = text;
    window.speechSynthesis.cancel(); // stop previous speech if any
    window.speechSynthesis.speak(speech);
});