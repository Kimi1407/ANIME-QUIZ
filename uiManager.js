/**
 * @param {string} screenId
 */
function showScreen(screenId) {
  const screens = document.querySelectorAll(".screen");
  screens.forEach((screen) => screen.classList.remove("active"));

  const targetScreen = document.getElementById(screenId);
  if (targetScreen) {
    targetScreen.classList.add("active");
  }

  if (screenId === "quiz-screen") {
    const currentQuestion = quizManager.getCurrentQuestion();
    if (currentQuestion) {
      if (quizManager.currentQuiz && quizManager.currentQuiz.questions[0]) {
        const isCharacter =
          quizManager.currentQuiz.questions[0].id <= 5 &&
          quizManager.currentQuiz.title.includes("Character");
        localStorage.setItem(
          "lastQuizType",
          isCharacter ? "character" : "anime",
        );
      }
    }
  }

  window.scrollTo(0, 0);
}

function initializeUI() {
  setupEventListeners();

  const savedName = localStorage.getItem("playerName");
  if (savedName) {
    document.getElementById("name-input").value = savedName;
  }
}

function setupEventListeners() {
  const nameForm = document.getElementById("name-form");
  if (nameForm) {
    nameForm.addEventListener("submit", handleNameSubmit);
  }

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      goBack();
    }
  });
}

/**
 * @param {string} event - Event type
 * @param {object} data - Event data
 */
function logAnalytics(event, data) {
  console.log(`[Analytics] ${event}:`, data);
}

window.addEventListener("resize", () => {
  const viewport = window.innerWidth;
  if (viewport < 480) {
    document.body.style.fontSize = "14px";
  } else {
    document.body.style.fontSize = "16px";
  }
});

document.addEventListener("visibilitychange", () => {
  if (document.hidden) {
    logAnalytics("quiz_paused", { timestamp: new Date() });
  } else {
    logAnalytics("quiz_resumed", { timestamp: new Date() });
  }
});

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initializeUI);
} else {
  initializeUI();
}
