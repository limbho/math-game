// ==============================
// КОНФИГУРАЦИЯ СЛОЖНОСТИ
// ==============================
const DIFFICULTIES = {
  easy: {
    time: 90,
    addRange: [1, 20],
    mulRange: [2, 9],
  },
  normal: {
    time: 60,
    addRange: [1, 50],
    mulRange: [2, 12],
  },
  hard: {
    time: 45,
    addRange: [10, 99],
    mulRange: [3, 19],
  },
};

// ==============================
// БАЗА ФОРМУЛ
// ==============================
const formulas = [
  // МЕХАНИКА
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

  // ЭЛЕКТРИЧЕСТВО
  { text: 'I = ? / R',           answer: 'U', options: ['U', 'P', 'Q', 't'] },
  { text: 'U = I·?',             answer: 'R', options: ['R', 'Q', 't', 'P'] },
  { text: 'P = U·?',             answer: 'I', options: ['I', 'R', 't', 'Q'] },
  { text: 'Q = I²·R·?',          answer: 't', options: ['t', 'U', 'P', 'S'] },
  { text: 'R = ρ·L / ?',         answer: 'S', options: ['S', 'V', 't', 'm'] },

  // ДАВЛЕНИЕ И ЖИДКОСТИ
  { text: 'p = ? / S',           answer: 'F', options: ['F', 'm', 'v', 'a'] },
  { text: 'p = ?·g·h',           answer: 'ρ', options: ['ρ', 'm', 'V', 'S'] },
  { text: 'Fа = ?·g·V',          answer: 'ρ', options: ['ρ', 'm', 'p', 'S'] },
  { text: 'ρ = ? / V',           answer: 'm', options: ['m', 'F', 'S', 'p'] },

  // ТЕПЛОТА
  { text: 'Q = c·m·?',           answer: 'Δt', options: ['Δt', 'v', 'S', 'F'] },
  { text: 'Q = ?·m (плавл.)',    answer: 'λ', options: ['λ', 'c', 'ρ', 'g'] },
  { text: 'Q = ?·m (парообр.)',  answer: 'L', options: ['L', 'c', 'g', 'ρ'] },

  // ВОЛНЫ
  { text: 'v = λ·?',             answer: 'ν', options: ['ν', 'T', 'm', 't'] },
  { text: 'T = 1 / ?',           answer: 'ν', options: ['ν', 'λ', 'v', 't'] },
];

// ==============================
// НАСТРОЙКИ (сохраняются)
// ==============================
const settings = {
  mode: 'arithmetic',
  difficulty: 'normal',
  theme: 'light',
};

function loadSettings() {
  try {
    const saved = JSON.parse(localStorage.getItem('settings') || '{}');
    Object.assign(settings, saved);
  } catch (e) {}
}

function saveSettings() {
  localStorage.setItem('settings', JSON.stringify(settings));
}

// ==============================
// СОСТОЯНИЕ ИГРЫ
// ==============================
const state = {
  score: 0,
  time: 60,
  current: null,
  timerId: null,
  combo: 0,
  maxCombo: 0,
  correct: 0,
  wrong: 0,
  finished: false,
};

// ==============================
// УТИЛИТЫ
// ==============================
function rand(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function $(id) {
  return document.getElementById(id);
}

// ==============================
// ТЕМА
// ==============================
function applyTheme() {
  const dark = settings.theme === 'dark' ||
    (settings.theme === 'system' &&
     window.matchMedia('(prefers-color-scheme: dark)').matches);
  document.body.classList.toggle('theme-dark', dark);
  document.querySelector('meta[name="theme-color"]')
    ?.setAttribute('content', dark ? '#1a1d2e' : '#667eea');
}

window.matchMedia('(prefers-color-scheme: dark)')
  .addEventListener('change', () => {
    if (settings.theme === 'system') applyTheme();
  });

// ==============================
// ГЕНЕРАТОРЫ ВОПРОСОВ
// ==============================
function genArithmetic() {
  const cfg = DIFFICULTIES[settings.difficulty];
  const ops = ['+', '-', '×', '÷'];
  const op = ops[Math.floor(Math.random() * ops.length)];
  let a, b, answer;

  switch (op) {
    case '+':
      a = rand(...cfg.addRange);
      b = rand(...cfg.addRange);
      answer = a + b;
      break;
    case '-':
      a = rand(...cfg.addRange);
      b = rand(1, a);
      answer = a - b;
      break;
    case '×':
      a = rand(...cfg.mulRange);
      b = rand(...cfg.mulRange);
      answer = a * b;
      break;
    case '÷':
      b = rand(...cfg.mulRange);
      answer = rand(...cfg.mulRange);
      a = b * answer;
      break;
  }

  return {
    text: `${a} ${op} ${b} = ?`,
    answer,
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

function genQuestion() {
  if (settings.mode === 'arithmetic') return genArithmetic();
  if (settings.mode === 'physics') return genFormula();
  // mixed
  return Math.random() < 0.5 ? genArithmetic() : genFormula();
}

// ==============================
// ПОДСЧЁТ ОЧКОВ
// ==============================
function calculatePoints(q) {
  if (q.type === 'formula') return 15;

  const { a, b, op } = q;
  const base = { '+': 3, '-': 3, '×': 6, '÷': 9 }[op] || 3;
  const sizeBonus = Math.floor(Math.log2(Math.max(a, b) + 1)) * 2;
  return base + sizeBonus;
}

// ==============================
// КОМБО И «КРАСИВЫЕ ЧИСЛА»
// ==============================
function comboMultiplier() {
  if (state.combo < 3) return 1;
  if (state.combo < 6) return 1.5;
  if (state.combo < 10) return 2;
  if (state.combo < 15) return 3;
  return 4;
}

// «Красивое» число: круглое, кратное 5/10/100 или с повторяющимися цифрами
function isBeautifulNumber(n) {
  if (typeof n !== 'number') return false;
  if (n < 10) return false;

  const s = String(n);

  // повторяющиеся цифры: 11, 333, 5555
  if (/^(\d)\1+$/.test(s)) return true;

  // круглые: 100, 200, 1000
  if (n % 100 === 0) return true;

  // кратные 5 (но не 10): 25, 45, 75, 125
  if (n % 5 === 0 && n % 10 !== 0) return true;

  // «зеркальные»: 121, 1221, 484
  if (s === [...s].reverse().join('')) return true;

  // круглые десятки: 30, 70, 120
  if (n % 10 === 0) return true;

  return false;
}

function fireConfetti() {
  if (typeof confetti !== 'function') return;

  confetti({
    particleCount: 80,
    spread: 70,
    origin: { y: 0.6 },
    colors: ['#667eea', '#764ba2', '#ff6b6b', '#ffa500', '#2ecc71'],
  });

  setTimeout(() => {
    confetti({
      particleCount: 40,
      angle: 60,
      spread: 55,
      origin: { x: 0 },
    });
    confetti({
      particleCount: 40,
      angle: 120,
      spread: 55,
      origin: { x: 1 },
    });
  }, 150);
}

// ==============================
// ВАРИАНТЫ ОТВЕТА ДЛЯ АРИФМЕТИКИ
// ==============================
function generateNumberOptions(correct) {
  const set = new Set([correct]);
  let guard = 0;
  while (set.size < 4 && guard < 100) {
    guard++;
    const delta = rand(-Math.max(5, Math.floor(correct * 0.3)),
                        Math.max(5, Math.floor(correct * 0.3)));
    if (delta !== 0) set.add(correct + delta);
  }
  return [...set];
}

// ==============================
// ЭКРАНЫ
// ==============================
function showScreen(name) {
  $('menuScreen').classList.toggle('hidden', name !== 'menu');
  $('gameScreen').classList.toggle('hidden', name !== 'game');
  $('endScreen').classList.toggle('hidden', name !== 'end');
}

// ==============================
// СТАРТ ИГРЫ
// ==============================
function startGame() {
  state.score = 0;
  state.time = DIFFICULTIES[settings.difficulty].time;
  state.combo = 0;
  state.maxCombo = 0;
  state.correct = 0;
  state.wrong = 0;
  state.finished = false;

  $('score').textContent = 0;
  $('timer').textContent = state.time;
  updateComboBadge();

  showScreen('game');
  nextQuestion();
  startTimer();
}

// ==============================
// ТАЙМЕР
// ==============================
function startTimer() {
  clearInterval(state.timerId);
  state.timerId = setInterval(() => {
    state.time--;
    $('timer').textContent = state.time;

    if (state.time <= 0) {
      clearInterval(state.timerId);
      endGame();
    }
  }, 1000);
}

// ==============================
// ВОПРОС
// ==============================
function nextQuestion() {
  if (state.finished) return;

  state.current = genQuestion();

  $('question').textContent = state.current.text;

  const basePts = calculatePoints(state.current);
  const mult = comboMultiplier();
  const totalPts = Math.round(basePts * mult);

  $('pointsBadge').textContent = mult > 1
    ? `+${totalPts} очков (${basePts} × ${mult})`
    : `+${totalPts} очков`;

  const options = state.current.type === 'arithmetic'
    ? generateNumberOptions(state.current.answer)
    : state.current.options;

  const container = $('answers');
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
  const fb = $('feedback');
  const basePts = calculatePoints(state.current);

  if (String(value) === correct) {
    // Комбо растёт ДО подсчёта очков
    state.combo++;
    if (state.combo > state.maxCombo) state.maxCombo = state.combo;

    const mult = comboMultiplier();
    const totalPts = Math.round(basePts * mult);
    state.score += totalPts;
    state.correct++;

    fb.textContent = mult > 1
      ? `✅ Верно! +${totalPts} (×${mult})`
      : `✅ Верно! +${totalPts}`;
    fb.style.color = 'var(--success)';

    // Конфетти за красивое число
    if (state.current.type === 'arithmetic' &&
        isBeautifulNumber(state.current.answer)) {
      fireConfetti();
      fb.textContent += ' 🎉';
    }

    // Конфетти за каждые 5 подряд
    if (state.combo > 0 && state.combo % 5 === 0) {
      fireConfetti();
    }

    updateComboBadge();
  } else {
    state.combo = 0;
    state.wrong++;
    const penalty = Math.round(basePts / 2);
    state.score = Math.max(0, state.score - penalty);

    fb.textContent = `❌ Правильно: ${correct} (−${penalty})`;
    fb.style.color = 'var(--error)';

    updateComboBadge();
  }

  $('score').textContent = state.score;

  setTimeout(() => {
    fb.textContent = '';
    nextQuestion();
  }, 900);
}

function updateComboBadge() {
  const badge = $('comboBadge');
  const mult = comboMultiplier();
  if (state.combo >= 2) {
    badge.classList.remove('hidden');
    badge.textContent = `🔥 ×${mult} (${state.combo} подряд)`;
  } else {
    badge.classList.add('hidden');
  }
}

// ==============================
// КОНЕЦ ИГРЫ
// ==============================
function endGame() {
  state.finished = true;
  clearInterval(state.timerId);

  $('finalScore').textContent = state.score;

  const best = Number(localStorage.getItem('bestScore') || 0);
  let bestLine = '';
  if (state.score > best) {
    localStorage.setItem('bestScore', state.score);
    bestLine = '<p style="color:var(--success)">🎉 Новый рекорд!</p>';
  } else {
    bestLine = `<p style="color:var(--text-faint)">Рекорд: ${best}</p>`;
  }

  const statsLine = `
    <p style="color:var(--text-muted);font-size:14px;margin:8px 0">
      Верно: ${state.correct} · Ошибок: ${state.wrong} · Макс. комбо: ${state.maxCombo}
    </p>
  `;

  $('endBest').innerHTML = bestLine + statsLine;
  showScreen('end');
}

// ==============================
// МЕНЮ: ВЫБОР ОПЦИЙ
// ==============================
function initMenu() {
  document.querySelectorAll('.option-group').forEach(group => {
    const key = group.dataset.group;
    group.querySelectorAll('.option').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.value === settings[key]);
      btn.onclick = () => {
        settings[key] = btn.dataset.value;
        group.querySelectorAll('.option')
          .forEach(b => b.classList.toggle('active', b === btn));
        saveSettings();

        if (key === 'theme') applyTheme();
      };
    });
  });

  // Рекорд в меню
  const best = Number(localStorage.getItem('bestScore') || 0);
  $('menuBest').textContent = `Рекорд: ${best}`;
}

// ==============================
// КНОПКИ
// ==============================
$('playBtn').onclick = startGame;
$('againBtn').onclick = startGame;
$('menuBtn').onclick = () => {
  initMenu();
  showScreen('menu');
};
$('quitBtn').onclick = () => {
  clearInterval(state.timerId);
  state.finished = true;
  initMenu();
  showScreen('menu');
};

// ==============================
// ИНИЦИАЛИЗАЦИЯ
// ==============================
loadSettings();
applyTheme();
initMenu();
showScreen('menu');
