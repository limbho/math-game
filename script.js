// ==============================
// СОСТОЯНИЕ ИГРЫ
// ==============================
const state = {
  mode: 'arithmetic',
  score: 0,
  time: 60,
  current: null,
  timerId: null,
  finished: false,
};

// ==============================
// БАЗА ФОРМУЛ
// ==============================
const formulas = [
  // === МЕХАНИКА ===
  { text: 'E = ?·c²',           answer: 'm', options: ['m', 'v', 'a', 'F'] },
  { text: 'F = m·?',             answer: 'a', options: ['a', 'v', 't', 's'] },
  { text: 'v = s / ?',           answer: 't', options: ['t', 'm', 'F', 'g'] },
  { text: 's = v·?',             answer: 't', options: ['t', 'm', 'a', 'F'] },
  { text: 'F = ?·g',             answer: 'm', options: ['m', 'v', 'a', 's'] },
  { text: 'P = m·?',             answer: 'g', options: ['g', 'v', 'a', 't'] },
  { text: 'Eк = m·v² / ?',       answer: '2', options: ['2', '3', '4', '5'] },
  { text: 'Eп = m·g·?',          answer: 'h', options: ['h', 'v', 't', 's'] },
  { text: 'A = F·?',             answer: 's', options: ['s', 'v', 't', 'm'] },
  { text: 'N = A / ?',           answer: 't', options: ['t', 's', 'v', 'F'] },
  { text: 'p = m·?',             answer: 'v', options: ['v', 'a', 'F', 's'] },
  { text: 'a = (v − v₀) / ?',    answer: 't', options: ['t', 's', 'a', 'm'] },
  { text: 'F = G·m₁·m₂ / ?',     answer: 'r²', options: ['r²', 'r', 'm', 't'] },

  // === ЭЛЕКТРИЧЕСТВО ===
  { text: 'I = ? / R',           answer: 'U', options: ['U', 'P', 'Q', 't'] },
  { text: 'U = I·?',             answer: 'R', options: ['R', 'Q', 't', 'P'] },
  { text: 'P = U·?',             answer: 'I', options: ['I', 'R', 't', 'Q'] },
  { text: 'Q = I²·R·?',          answer: 't', options: ['t', 'U', 'P', 'S'] },
  { text: 'R = ρ·L / ?',         answer: 'S', options: ['S', 'V', 't', 'm'] },

  // === ДАВЛЕНИЕ И ЖИДКОСТИ ===
  { text: 'p = ? / S',           answer: 'F', options: ['F', 'm', 'v', 'a'] },
  { text: 'p = ?·g·h',           answer: 'ρ', options: ['ρ', 'm', 'V', 'S'] },
  { text: 'Fа = ?·g·V',          answer: 'ρ', options: ['ρ', 'm', 'p', 'S'] },
  { text: 'ρ = ? / V',           answer: 'm', options: ['m', 'F', 'S', 'p'] },

  // === ТЕПЛОТА ===
  { text: 'Q = c·m·?',           answer: 'Δt', options: ['Δt', 'v', 'S', 'F'] },
  { text: 'Q = ?·m (плавление)', answer: 'λ', options: ['λ', 'c', 'ρ', 'g'] },
  { text: 'Q = ?·m (парообраз.)',answer: 'L', options: ['L', 'c', 'g', 'ρ'] },

  // === ВОЛНЫ ===
  { text: 'v = λ·?',             answer: 'ν', options: ['ν', 'T', 'm', 't'] },
  { text: 'T = 1 / ?',           answer: 'ν', options: ['ν', 'λ', 'v', 't'] },
];

// ==============================
// УТИЛИТЫ
// ==============================
function rand(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// ==============================
// ГЕНЕРАТОРЫ ВОПРОСОВ
// ==============================
function genArithmetic() {
  const ops = ['+', '-', '×', '÷'];
  const op = ops[Math.floor(Math.random() * ops.length)];
  let a, b, answer;

  switch (op) {
    case '+':
      a = rand(1, 50); b = rand(1, 50); answer = a + b; break;
    case '-':
      a = rand(10, 50); b = rand(1, a); answer = a - b; break;
    case '×':
      a = rand(2, 12); b = rand(2, 12); answer = a * b; break;
    case '÷':
      b = rand(2, 12); answer = rand(2, 12); a = b * answer; break;
  }

  return {
    text: `${a} ${op} ${b} = ?`,
    answer: answer,
    a, b, op,
    type: 'arithmetic',
  };
}

function genFormula() {
  const f = formulas[Math.floor(Math.random() * formulas.length)];
  const options = f.options.includes(f.answer)
    ? [...f.options]
    : [f.answer, ...f.options.slice(0, 3)];
  return {
    text: f.text,
    answer: f.answer,
    options,
    type: 'formula',
  };
}

// ==============================
// ПОДСЧЁТ ОЧКОВ
// ==============================
function calculatePoints(q) {
  // Формулы — фиксированная награда
  if (q.type === 'formula') return 15;

  const { a, b, op } = q;

  // Базовые очки за операцию
  const base = { '+': 3, '-': 3, '×': 6, '÷': 9 }[op] || 3;

  // Бонус за размер чисел (логарифмический, чтобы не росло линейно)
  const sizeBonus = Math.floor(Math.log2(Math.max(a, b) + 1)) * 2;

  return base + sizeBonus;
}

// ==============================
// ГЕНЕРАЦИЯ ВАРИАНТОВ ОТВЕТА (для арифметики)
// ==============================
function generateNumberOptions(correct) {
  const set = new Set([correct]);
  while (set.size < 4) {
    const delta = rand(-10, 10);
    if (delta !== 0) set.add(correct + delta);
  }
  return [...set];
}

// ==============================
// ОТОБРАЖЕНИЕ ВОПРОСА
// ==============================
function nextQuestion() {
  if (state.finished) return;

  state.current = state.mode === 'arithmetic'
    ? genArithmetic()
    : genFormula();

  // Текст вопроса
  document.getElementById('question').textContent = state.current.text;

  // Бейдж с очками
  const pts = calculatePoints(state.current);
  document.getElementById('points-badge').textContent = `+${pts} очков`;

  // Варианты ответа
  const options = state.mode === 'arithmetic'
    ? generateNumberOptions(state.current.answer)
    : state.current.options;

  const container = document.getElementById('answers');
  container.innerHTML = '';

  [...options]
    .sort(() => Math.random() - 0.5)
    .forEach(opt => {
      const btn = document.createElement('button');
      btn.textContent = opt;
      btn.onclick = () => checkAnswer(opt);
      container.appendChild(btn);
    });
}

// ==============================
// ПРОВЕРКА ОТВЕТА
// ==============================
function checkAnswer(value) {
  if (state.finished) return;

  const correct = String(state.current.answer);
  const fb = document.getElementById('feedback');
  const pts = calculatePoints(state.current);

  if (String(value) === correct) {
    state.score += pts;
    fb.textContent = `✅ Верно! +${pts}`;
    fb.style.color = '#2ecc71';
  } else {
    const penalty = Math.round(pts / 2);
    state.score = Math.max(0, state.score - penalty);
    fb.textContent = `❌ Правильно: ${correct} (−${penalty})`;
    fb.style.color = '#e74c3c';
  }

  document.getElementById('score').textContent = state.score;

  setTimeout(() => {
    fb.textContent = '';
    nextQuestion();
  }, 900);
}

// ==============================
// ТАЙМЕР
// ==============================
function startTimer() {
  state.timerId = setInterval(() => {
    state.time--;
    document.getElementById('timer').textContent = state.time;

    if (state.time <= 0) {
      clearInterval(state.timerId);
      endGame();
    }
  }, 1000);
}

// ==============================
// КОНЕЦ ИГРЫ
// ==============================
function endGame() {
  state.finished = true;
  const best = Number(localStorage.getItem('bestScore') || 0);

  let bestLine = '';
  if (state.score > best) {
    localStorage.setItem('bestScore', state.score);
    bestLine = '<p style="color:#2ecc71">🎉 Новый рекорд!</p>';
  } else {
    bestLine = `<p style="color:#999">Рекорд: ${best}</p>`;
  }

  document.querySelector('.game').innerHTML = `
    <div class="game-over">
      <h1>Игра окончена!</h1>
      <div class="final-score">${state.score}</div>
      ${bestLine}
      <button onclick="location.reload()">Играть снова</button>
    </div>
  `;
}

// ==============================
// ПЕРЕКЛЮЧЕНИЕ РЕЖИМА
// ==============================
document.querySelectorAll('.mode-switch button').forEach(btn => {
  btn.onclick = () => {
    if (state.finished) return;

    document.querySelectorAll('.mode-switch button')
      .forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    state.mode = btn.dataset.mode;
    nextQuestion();
  };
});

// ==============================
// ЗАПУСК
// ==============================
nextQuestion();
startTimer();