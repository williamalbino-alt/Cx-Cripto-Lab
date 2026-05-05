let gameState = 'start';
let currentLevel = 0;
let currentQuestionIndex = 0;
let score = 0;
let timeLeft = 20;
let showFeedback = false;
let timerInterval;

const levels = ['Fácil', 'Medio', 'Difícil'];

function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
        screen.style.display = 'none';
    });
    const screen = document.getElementById(screenId);
    screen.style.display = 'block';
    setTimeout(() => screen.classList.add('active'), 10);
}

function startGame() {
    console.log("startGame chamado");
    gameState = 'playing';
    currentLevel = 0;
    currentQuestionIndex = 0;
    score = 0;
    timeLeft = 20;
    showScreen('game-screen');
    displayQuestion();
}

function displayQuestion() {
    const levelQuestions = questions.filter(q => q.level === currentLevel);
    const currentQuestion = levelQuestions[currentQuestionIndex];

    document.getElementById('level-title').innerText = `Nivel: ${levels[currentLevel]}`;
    document.getElementById('score').innerText = `${score} pts`;
    document.getElementById('timer').innerText = `${timeLeft}s`;
    document.getElementById('question-number').innerText = currentQuestionIndex + 1;
    document.getElementById('question-text').innerText = currentQuestion.question;

    const levelProgress = (currentQuestionIndex / levelQuestions.length) * 100;
    document.getElementById('level-progress-text').innerText = `${currentQuestionIndex + 1}/${levelQuestions.length}`;
    document.getElementById('level-progress-bar').style.width = `${levelProgress}%`;

    const overallProgress = ((currentLevel * 10 + currentQuestionIndex) / 30) * 100;
    document.getElementById('overall-progress-text').innerText = `${currentLevel * 10 + currentQuestionIndex + 1}/30`;
    document.getElementById('overall-progress-bar').style.width = `${overallProgress}%`;

    const optionsDiv = document.getElementById('options');
    optionsDiv.innerHTML = '';
    currentQuestion.options.forEach((option, index) => {
        const btn = document.createElement('button');
        btn.innerHTML = `<svg class="option-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg> ${option}`;
        btn.addEventListener('click', () => handleAnswer(index));
        optionsDiv.appendChild(btn);
    });

    startTimer();
}

function startTimer() {
    clearInterval(timerInterval);
    timeLeft = 20;
    document.getElementById('timer').innerText = `${timeLeft}s`;
    document.getElementById('timer-bar').style.width = '100%';
    timerInterval = setInterval(() => {
        timeLeft--;
        document.getElementById('timer').innerText = `${timeLeft}s`;
        document.getElementById('timer-bar').style.width = `${(timeLeft / 20) * 100}%`;
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            handleAnswer(-1);
        }
    }, 1000);
}

function handleAnswer(optionIndex) {
    if (showFeedback) return;

    const levelQuestions = questions.filter(q => q.level === currentLevel);
    const currentQuestion = levelQuestions[currentQuestionIndex];
    const isCorrect = optionIndex === currentQuestion.correctAnswer;

    if (isCorrect) score++;

    showFeedback = true;
    clearInterval(timerInterval);

    const feedbackDiv = document.getElementById('feedback');
    feedbackDiv.style.display = 'block';
    feedbackDiv.className = `feedback ${isCorrect ? 'correct' : 'incorrect'}`;
    feedbackDiv.innerText = isCorrect ? '¡Correcto! ¡Excelente respuesta!' : `Incorrecto. La respuesta correcta era: ${currentQuestion.options[currentQuestion.correctAnswer]}`;

    document.querySelectorAll('#options button').forEach((btn, idx) => {
        btn.disabled = true;
        if (idx === currentQuestion.correctAnswer) {
            btn.style.backgroundColor = 'rgba(34, 197, 94, 0.7)';
        } else if (idx === optionIndex) {
            btn.style.backgroundColor = 'rgba(239, 68, 68, 0.7)';
        }
    });

    setTimeout(() => {
        showFeedback = false;
        feedbackDiv.style.display = 'none';
        if (currentQuestionIndex < levelQuestions.length - 1) {
            currentQuestionIndex++;
            displayQuestion();
        } else {
            gameState = currentLevel < 2 ? 'level-complete' : 'game-complete';
            if (gameState === 'level-complete') showLevelComplete();
            else showGameComplete();
        }
    }, 4000);
}

function showLevelComplete() {
    document.getElementById('completed-level').innerText = levels[currentLevel];
    document.getElementById('current-score').innerText = score;
    document.getElementById('total-level-questions').innerText = (currentLevel + 1) * 10;
    showScreen('level-complete-screen');
}

function showGameComplete() {
    document.getElementById('final-score').innerText = score;
    const finalMessage = document.getElementById('final-message');
    finalMessage.innerText = score >= 25 ? '¡Eres un experto en criptomonedas!' :
                            score >= 15 ? '¡Buen conocimiento sobre criptomonedas!' :
                            '¡Sigue aprendiendo sobre el mundo cripto!';
    showScreen('game-complete-screen');
}

// Eventos
window.onload = function() {
    console.log("Adicionando event listener ao start-button");
    document.getElementById('start-button').addEventListener('click', startGame);
    document.getElementById('close-button').addEventListener('click', () => showScreen('start-screen'));
    document.getElementById('next-level-button').addEventListener('click', () => {
        currentLevel++;
        currentQuestionIndex = 0;
        gameState = 'playing';
        showScreen('game-screen');
        displayQuestion();
    });
    document.getElementById('reset-game-button').addEventListener('click', () => showScreen('start-screen'));
};