let speech = new SpeechSynthesisUtterance();
let voices = [];
const voiceSelect = document.querySelector("select");

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