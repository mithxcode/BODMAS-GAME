let score = 0;
let timer = 10;
let interval;
let correctAnswer;
let difficulty = "";
let questionCount = 0;
let correctCount = 0;

const TOTAL_QUESTIONS = 5;

function startGame(level) {
  difficulty = level;

  document.getElementById("startScreen").style.display = "none";
  document.getElementById("gameScreen").classList.remove("hidden");

  score = 0;
  questionCount = 0;
  correctCount = 0;

  document.getElementById("score").innerText = score;
  nextQuestion();
}

function restart() {
  clearInterval(interval);

  document.getElementById("resultScreen").classList.add("hidden");
  document.getElementById("startScreen").style.display = "flex";
  document.getElementById("gameScreen").classList.add("hidden");

  document.getElementById("options").innerHTML = "";
  document.getElementById("feedback").innerText = "";
  document.getElementById("progressBar").style.width = "0%";
}

function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateQuestion() {
  let a = getRandom(1, 10);
  let b = getRandom(1, 10);
  let c = getRandom(1, 10);

  if (difficulty === "easy") {
    correctAnswer = a + b;
    return `${a} + ${b}`;
  }

  if (difficulty === "medium") {
    correctAnswer = a + (b * c);
    return `${a} + ${b} × ${c}`;
  }

  correctAnswer = (a + b) * c;
  return `(${a} + ${b}) × ${c}`;
}

function generateOptions(answer) {
  let set = new Set([answer]);

  while (set.size < 4) {
    let val = answer + getRandom(-5, 5);
    if (val >= 0) set.add(val);
  }

  return Array.from(set).sort(() => Math.random() - 0.5);
}

function nextQuestion() {
  if (questionCount >= TOTAL_QUESTIONS) {
    endGame();
    return;
  }

  clearInterval(interval);
  timer = 10;
  document.getElementById("timer").innerText = timer;
  document.getElementById("feedback").innerText = "";

  questionCount++;

  document.getElementById("qCount").innerText =
    `Question ${questionCount} / ${TOTAL_QUESTIONS}`;

  document.getElementById("progressBar").style.width =
    (questionCount / TOTAL_QUESTIONS) * 100 + "%";

  let q = generateQuestion();
  document.getElementById("question").innerText = q;

  let options = generateOptions(correctAnswer);
  let container = document.getElementById("options");
  container.innerHTML = "";

  options.forEach(opt => {
    let btn = document.createElement("button");
    btn.innerText = opt;
    btn.onclick = () => checkAnswer(opt, btn);
    container.appendChild(btn);
  });

  startTimer();
}

function checkAnswer(selected, btn) {
  clearInterval(interval);

  let buttons = document.querySelectorAll(".options button");

  buttons.forEach(b => {
    if (parseInt(b.innerText) === correctAnswer) {
      b.classList.add("correct");
    }
  });

  if (selected === correctAnswer) {
    score += 10;
    correctCount++;
    document.getElementById("feedback").innerText = "Correct ✅";
  } else {
    btn.classList.add("wrong");
    document.getElementById("feedback").innerText =
      "Wrong ❌ (Ans: " + correctAnswer + ")";
  }

  document.getElementById("score").innerText = score;

  setTimeout(nextQuestion, 1200);
}

function startTimer() {
  interval = setInterval(() => {
    timer--;
    document.getElementById("timer").innerText = timer;

    if (timer === 0) {
      clearInterval(interval);
      document.getElementById("feedback").innerText = "Time's up ⏱️";
      setTimeout(nextQuestion, 1200);
    }
  }, 1000);
}

function endGame() {
  document.getElementById("gameScreen").classList.add("hidden");
  document.getElementById("resultScreen").classList.remove("hidden");

  document.getElementById("totalQ").innerText = TOTAL_QUESTIONS;
  document.getElementById("correctQ").innerText = correctCount;
  document.getElementById("finalScore").innerText = score;
}