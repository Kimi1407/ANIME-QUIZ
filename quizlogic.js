class QuizManager {
  constructor() {
    this.currentQuiz = null;
    this.currentQuestionIndex = 0;
    this.score = 0;
    this.playerName = "";
    this.answers = [];
  }

  /**
   * Initialize a new quiz
   * @param {string} quizType - 'character' or 'anime'
   * @param {string} playerName - Player's name
   */
  initializeQuiz(quizType, playerName) {
    this.currentQuiz = getQuizData(quizType);
    this.playerName = playerName;
    this.currentQuestionIndex = 0;
    this.score = 0;
    this.answers = [];
  }

  /**
   * Get current question
   * @returns {object} Current question object
   */
  getCurrentQuestion() {
    if (
      !this.currentQuiz ||
      this.currentQuestionIndex >= this.currentQuiz.questions.length
    ) {
      return null;
    }
    return this.currentQuiz.questions[this.currentQuestionIndex];
  }

  /**
   * Check if answer is correct and advance
   * @param {number} answerIndex - Index of selected answer
   * @returns {boolean} Whether answer is correct
   */
  submitAnswer(answerIndex) {
    const question = this.getCurrentQuestion();
    if (!question) return false;

    const isCorrect = question.answers[answerIndex].correct;

    this.answers.push({
      questionId: question.id,
      selected: answerIndex,
      correct: isCorrect,
    });

    if (isCorrect) {
      this.score++;
    }

    return isCorrect;
  }

  /**
   * Move to next question
   * @returns {boolean} Whether there are more questions
   */
  nextQuestion() {
    this.currentQuestionIndex++;
    return this.currentQuestionIndex < this.currentQuiz.questions.length;
  }

  /**
   * Check if quiz is complete
   * @returns {boolean} Whether all questions answered
   */
  isQuizComplete() {
    return this.currentQuestionIndex >= this.currentQuiz.questions.length;
  }

  /**
   * Get quiz results
   * @returns {object} Results object with score and statistics
   */
  getResults() {
    const totalQuestions = this.currentQuiz.questions.length;
    const percentage = Math.round((this.score / totalQuestions) * 100);
    const incorrect = totalQuestions - this.score;

    return {
      playerName: this.playerName,
      score: this.score,
      totalQuestions: totalQuestions,
      incorrect: incorrect,
      percentage: percentage,
      quizTitle: this.currentQuiz.title,
    };
  }
}

// Global quiz manager instance
const quizManager = new QuizManager();

/**
 * Handle name form submission
 * @param {Event} event - Form submit event
 */
function handleNameSubmit(event) {
  event.preventDefault();
  const nameInput = document.getElementById("name-input").value.trim();

  if (nameInput.length > 0) {
    localStorage.setItem("playerName", nameInput);
    showScreen("quiz-selection-screen");
  }
}

/**
 * Start a quiz
 * @param {string} quizType - 'character' or 'anime'
 */
function startQuiz(quizType) {
  const playerName = localStorage.getItem("playerName") || "Player";
  quizManager.initializeQuiz(quizType, playerName);
  loadQuestion();
  showScreen("quiz-screen");
}

/**
 * Load current question
 */
function loadQuestion() {
  const question = quizManager.getCurrentQuestion();
  if (!question) return;

  // Update header
  document.getElementById("current-question").textContent =
    quizManager.currentQuestionIndex + 1;
  document.getElementById("current-score").textContent = quizManager.score;
  document.getElementById("player-name").textContent = quizManager.playerName;

  // Update question content
  document.getElementById("question-title").textContent = question.question;
  document.getElementById("question-image").src = question.image;
  document.getElementById("question-image").alt = `Question ${question.id}`;

  // Load answers
  const answersContainer = document.getElementById("answers-container");
  answersContainer.innerHTML = "";

  question.answers.forEach((answer, index) => {
    const button = document.createElement("button");
    button.className = "btn answer-btn";
    button.textContent = answer.text;
    button.onclick = () => selectAnswer(index);
    answersContainer.appendChild(button);
  });
}

/**
 * Handle answer selection
 * @param {number} answerIndex - Index of selected answer
 */
function selectAnswer(answerIndex) {
  const isCorrect = quizManager.submitAnswer(answerIndex);

  // Disable all buttons
  const buttons = document.querySelectorAll(".answer-btn");
  buttons.forEach((btn) => (btn.disabled = true));

  // Highlight correct answer
  const question = quizManager.getCurrentQuestion();
  buttons.forEach((btn, index) => {
    if (question.answers[index].correct) {
      btn.style.backgroundColor = "#4caf50";
      btn.style.color = "white";
      btn.style.borderColor = "#4caf50";
    }
  });

  // Auto proceed to next question after delay
  setTimeout(() => {
    if (quizManager.nextQuestion()) {
      loadQuestion();
    } else {
      showResults();
    }
  }, 2000);
}

/**
 * Display results screen
 */
function showResults() {
  const results = quizManager.getResults();

  document.getElementById("result-player-name").textContent =
    results.playerName;
  document.getElementById("results-message").textContent =
    `You answered ${results.score} out of ${results.totalQuestions} questions correctly!`;
  document.getElementById("results-percentage").textContent =
    `${results.percentage}%`;
  document.getElementById("result-correct").textContent = results.score;
  document.getElementById("result-incorrect").textContent = results.incorrect;

  showScreen("results-screen");
}

/**
 * Retake current quiz
 */
function retakeQuiz() {
  // Get quiz type from stored value
  const quizType = localStorage.getItem("lastQuizType") || "character";
  startQuiz(quizType);
}

/**
 * Change to different quiz
 */
function changeQuiz() {
  showScreen("quiz-selection-screen");
}

/**
 * Go back to home
 */
function goHome() {
  showScreen("landing-screen");
}

/**
 * Go back to previous screen
 */
function goBack() {
  const currentScreen = document.querySelector(".screen.active");

  if (currentScreen.id === "quiz-screen") {
    showScreen("quiz-selection-screen");
  } else if (currentScreen.id === "quiz-selection-screen") {
    showScreen("landing-screen");
  } else if (currentScreen.id === "results-screen") {
    showScreen("quiz-selection-screen");
  }
}
