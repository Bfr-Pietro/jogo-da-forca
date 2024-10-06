const phraseElement = document.getElementById('phrase');
const lettersElement = document.getElementById('letters');
const messageElement = document.getElementById('message');

const phrases = ['quer namorar comigo'];
const phrase = phrases[Math.floor(Math.random() * phrases.length)];
let guessedPhrase = Array.from(phrase).map(char => (char === ' ' ? ' ' : '_'));
let attempts = 6;

function updatePhrase() {
    phraseElement.textContent = guessedPhrase.join(' ');
}

function checkLetter(letter) {
    let correct = false;
    for (let i = 0; i < phrase.length; i++) {
        if (phrase[i] === letter) {
            guessedPhrase[i] = letter;
            correct = true;
        }
    }
    if (!correct) {
        attempts--;
    }
    updatePhrase();
    checkWin();
}

function checkWin() {
    if (guessedPhrase.join('') === phrase) {
        messageElement.textContent = 'Você acertou!';
        setTimeout(() => {
            window.location.href = 'success.html';
        }, 2000);
    } else if (attempts === 0) {
        messageElement.textContent = 'Você perdeu! A frase era "' + phrase + '"';
    }
}

function createLetterButtons() {
    for (let i = 97; i <= 122; i++) {
        const letter = String.fromCharCode(i);
        const button = document.createElement('button');
        button.textContent = letter;
        button.addEventListener('click', () => {
            button.disabled = true;
            checkLetter(letter);
        });
        lettersElement.appendChild(button);
    }
}

updatePhrase();
createLetterButtons();
