const quizzes = {
  character: {
    title: "Anime Character Quiz",
    description: "Identify characters from their images",
    questions: [
      {
        id: 1,
        image: "IMAGES/shinra kusakabe.jpg",
        question: "Can you guess the name of this character?",
        answers: [
          { text: "Tanjiro Kamado", correct: false },
          { text: "Katsuki Bakugo", correct: false },
          { text: "Suguru Geto", correct: false },
          { text: "Shinra Kusakabe", correct: true },
        ],
      },
      {
        id: 2,
        image: "IMAGES/Ishigami Senku.jpg",
        question: "Who is this character?",
        answers: [
          { text: "Ken Takakura", correct: false },
          { text: "Monkey D Luffy", correct: false },
          { text: "Ishigami Senku", correct: true },
          { text: "Yagami Light", correct: false },
        ],
      },
      {
        id: 3,
        image: "IMAGES/Sasha Braus.jpg",
        question: "Do you know this character?",
        answers: [
          { text: "Manjiro Sano", correct: false },
          { text: "Sasha Braus", correct: true },
          { text: "Ken Kaneki", correct: false },
          { text: "Shoyo Hinata", correct: false },
        ],
      },
      {
        id: 4,
        image: "IMAGES/Taka Kamitani.jpg",
        question: "Name this character:",
        answers: [
          { text: "Taka Kamitani", correct: true },
          { text: "Killua Zoldyck", correct: false },
          { text: "Meliodas", correct: false },
          { text: "Sakura Yamauchi", correct: false },
        ],
      },
      {
        id: 5,
        image: "IMAGES/Ishida Ryuken.jpg",
        question: "Who is this character?",
        answers: [
          { text: "Sebastian Michelis", correct: false },
          { text: "Kento Nanami", correct: false },
          { text: "Izumi Miyamura", correct: false },
          { text: "Ishida Ryuken", correct: true },
        ],
      },
    ],
  },
  anime: {
    title: "Anime Series Quiz",
    description: "Guess anime titles from scenes",
    questions: [
      {
        id: 1,
        image: "IMAGES/corpse party.jpg",
        question: "What anime is this from?",
        answers: [
          { text: "Danganronpa", correct: false },
          { text: "Elfen Lied", correct: false },
          { text: "Corpse Party", correct: true },
          { text: "Uzumaki", correct: false },
        ],
      },
      {
        id: 2,
        image: "IMAGES/dandadan.jpg",
        question: "Name this anime:",
        answers: [
          { text: "Dandadan", correct: true },
          { text: "Tokyo Ghoul", correct: false },
          { text: "Solo Levelling", correct: false },
          { text: "Mob Psycho 100", correct: false },
        ],
      },
      {
        id: 3,
        image: "IMAGES/dr stone.jpg",
        question: "Do you know this anime?",
        answers: [
          { text: "Jujutsu Kaisen", correct: false },
          { text: "Dr Stone", correct: true },
          { text: "One Piece", correct: false },
          { text: "Inazuma Eleven", correct: false },
        ],
      },
      {
        id: 4,
        image: "IMAGES/promise neverland.jpg",
        question: "Which anime is this?",
        answers: [
          { text: "The Promise Neverland", correct: true },
          { text: "Hunter X Hunter", correct: false },
          { text: "Death Note", correct: false },
          { text: "Demon Slayer", correct: false },
        ],
      },
      {
        id: 5,
        image: "IMAGES/silent voice.jpg",
        question: "What anime is this?",
        answers: [
          { text: "Spirited Away", correct: false },
          { text: "Your Name", correct: false },
          { text: "Horimiya", correct: false },
          { text: "A Silent Voice", correct: true },
        ],
      },
    ],
  },
};

/**
 * Get quiz data by type
 * @param {string} quizType - 'character' or 'anime'
 * @returns {object} Quiz data object
 */
function getQuizData(quizType) {
  return quizzes[quizType] || null;
}

/**
 * Get total number of questions in a quiz
 * @param {string} quizType - 'character' or 'anime'
 * @returns {number} Number of questions
 */
function getQuestionCount(quizType) {
  const quiz = getQuizData(quizType);
  return quiz ? quiz.questions.length : 0;
}
