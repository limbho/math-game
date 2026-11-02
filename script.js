// ==============================
// КОНФИГУРАЦИЯ СЛОЖНОСТИ
// ==============================
const DIFFICULTIES = {
  easy:   { time: 90, addRange: [1, 20],  mulRange: [2, 9] },
  normal: { time: 60, addRange: [1, 50],  mulRange: [2, 12] },
  hard:   { time: 45, addRange: [10, 99], mulRange: [3, 19] },
};

// ==============================
// МОДУЛЬНАЯ БАЗА ФОРМУЛ
// ==============================
// Каждая формула разбита на левую и правую части.
// Переменные хранятся в массиве vars с их "красивыми" названиями.
const formulas = [
  // МЕХАНИКА
  { left: 'E',    right: 'm·c²',           vars: [{ key: 'm', label: 'm' }, { key: 'c', label: 'c' }, { key: 'E', label: 'E' }] },
  { left: 'F',    right: 'm·a',            vars: [{ key: 'm', label: 'm' }, { key: 'a', label: 'a' }, { key: 'F', label: 'F' }] },
  { left: 'v',    right: 's/t',            vars: [{ key: 'v', label: 'v' }, { key: 's', label: 's' }, { key: 't', label: 't' }] },
  { left: 's',    right: 'v·t',            vars: [{ key: 's', label: 's' }, { key: 'v', label: 'v' }, { key: 't', label: 't' }] },
  { left: 'F',    right: 'm·g',            vars: [{ key: 'm', label: 'm' }, { key: 'g', label: 'g' }, { key: 'F', label: 'F' }] },
  { left: 'P',    right: 'm·g',            vars: [{ key: 'm', label: 'm' }, { key: 'g', label: 'g' }, { key: 'P', label: 'P' }] },
  { left: 'Eк',   right: '(m·v²)/2',       vars: [{ key: 'm', label: 'm' }, { key: 'v', label: 'v' }, { key: 'Eк', label: 'Eк' }] },
  { left: 'Eп',   right: 'm·g·h',          vars: [{ key: 'm', label: 'm' }, { key: 'g', label: 'g' }, { key: 'h', label: 'h' }, { key: 'Eп', label: 'Eп' }] },
  { left: 'A',    right: 'F·s',            vars: [{ key: 'A', label: 'A' }, { key: 'F', label: 'F' }, { key: 's', label: 's' }] },
  { left: 'N',    right: 'A/t',            vars: [{ key: 'N', label: 'N' }, { key: 'A', label: 'A' }, { key: 't', label: 't' }] },
  { left: 'p',    right: 'm·v',            vars: [{ key: 'p', label: 'p' }, { key: 'm', label: 'm' }, { key: 'v', label: 'v' }] },
  { left: 'a',    right: '(v-v₀)/t',       vars: [{ key: 'a', label: 'a' }, { key: 'v', label: 'v' }, { key: 'v₀', label: 'v₀' }, { key: 't', label: 't' }] },
  { left: 'F',    right: 'G·m₁·m₂/r²',     vars: [{ key: 'F', label: 'F' }, { key: 'G', label: 'G' }, { key: 'm₁', label: 'm₁' }, { key: 'm₂', label: 'm₂' }, { key: 'r²', label: 'r²' }] },

  // ЭЛЕКТРИЧЕСТВО
  { left: 'I',    right: 'U/R',            vars: [{ key: 'I', label: 'I' }, { key: 'U', label: 'U' }, { key: 'R', label: 'R' }] },
  { left: 'U',    right: 'I·R',            vars: [{ key: 'U', label: 'U' }, { key: 'I', label: 'I' }, { key: 'R', label: 'R' }] },
  { left: 'P',    right: 'U·I',            vars: [{ key: 'P', label: 'P' }, { key: 'U', label: 'U' }, { key: 'I', label: 'I' }] },
  { left: 'Q',    right: 'I²·R·t',         vars: [{ key: 'Q', label: 'Q' }, { key: 'I', label: 'I²' }, { key: 'R', label: 'R' }, { key: 't', label: 't' }] },
  { left: 'R',    right: 'ρ·L/S',          vars: [{ key: 'R', label: 'R' }, { key: 'ρ', label: 'ρ' }, { key: 'L', label: 'L' }, { key: 'S', label: 'S' }] },

  // ДАВЛЕНИЕ И ЖИДКОСТИ
  { left: 'p',    right: 'F/S',            vars: [{ key: 'p', label: 'p' }, { key: 'F', label: 'F' }, { key: 'S', label: 'S' }] },
  { left: 'p',    right: 'ρ·g·h',          vars: [{ key: 'p', label: 'p' }, { key: 'ρ', label: 'ρ' }, { key: 'g', label: 'g' }, { key: 'h', label: 'h' }] },
  { left: 'Fа',   right: 'ρ·g·V',          vars: [{ key: 'Fа', label: 'Fа' }, { key: 'ρ', label: 'ρ' }, { key: 'g', label: 'g' }, { key: 'V', label: 'V' }] },
  { left: 'ρ',    right: 'm/V',            vars: [{ key: 'ρ', label: 'ρ' }, { key: 'm', label: 'm' }, { key: 'V', label: 'V' }] },

  // ТЕПЛОТА
  { left: 'Q',    right: 'c·m·Δt',         vars: [{ key: 'Q', label: 'Q' }, { key: 'c', label: 'c' }, { key: 'm', label: 'm' }, { key: 'Δt', label: 'Δt' }] },
  { left: 'Q',    right: 'λ·m',            vars: [{ key: 'Q', label: 'Q' }, { key: 'λ', label: 'λ' }, { key: 'm', label: 'm' }] },
  { left: 'Q',    right: 'L·m',            vars: [{ key: 'Q', label: 'Q' }, { key: 'L', label: 'L' }, { key: 'm', label: 'm' }] },

  // ВОЛНЫ
  { left: 'v',    right: 'λ·ν',            vars: [{ key: 'v', label: 'v' }, { key: 'λ', label: 'λ' }, { key: 'ν', label: 'ν' }] },
  { left: 'T',    right: '1/ν',            vars: [{ key: 'T', label: 'T' }, { key: 'ν', label: 'ν' }] },
];

// ==============================
// НАСТРОЙКИ И СОСТОЯНИЕ
// ==============================
const settings = { mode: 'arithmetic', difficulty: 'normal', theme: 'light' };
const state = { score: 0, time: 60, maxTime: 60, current: null, timerId: null, combo: 0, maxCombo: 0, correct: 0, wrong: 0, finished: false };

function loadSettings() {
  try { Object.assign(settings, JSON.parse(localStorage.getItem('settings') || '{}')); } catch (e) {}
}
function saveSettings() { localStorage.setItem('settings', JSON.stringify(settings)); }
function rand(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }
function $(id) { return document.getElementById(id); }

function applyTheme() {
  const dark = settings.theme === 'dark' || (settings.theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
  document.body.classList.toggle('theme-dark', dark);
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', dark ? '#1a1d2e' : '#667eea');
}

window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => { if (settings.theme === 'system') applyTheme(); });

// ==============================
// ГЕНЕРАТОРЫ
// ==============================
function genArithmetic() {
  const cfg = DIFFICULTIES[settings.difficulty];
  const ops = ['+', '-', '×', '÷'];
  const op = ops[Math.floor(Math.random() * ops.length)];
  let a, b, answer;

  switch (op) {
    case '+': a = rand(...cfg.addRange); b = rand(...cfg.addRange); answer = a + b; break;
    case '-': a = rand(...cfg.addRange); b = rand(1, a); answer = a - b; break;
    case '×': a = rand(...cfg.mulRange); b = rand(...cfg.mulRange); answer = a * b; break;
    case '÷': b = rand(...cfg.mulRange); answer = rand(...cfg.mulRange); a = b * answer; break;
  }
  return { text: `${a} ${op} ${b} = ?`, answer, a, b, op, type: 'arithmetic' };
}

// МОДУЛЬНЫЙ ГЕНЕРАТОР ФОРМУЛ
function genFormula() {
  // 1. Берем случайную формулу из базы
  const f = formulas[Math.floor(Math.random() * formulas.length)];
  
  // 2. Выбираем случайную переменную, которую скроем (это будет вопросом)
  const hidden = f.vars[Math.floor(Math.random() * f.vars.length)];
  
  // 3. Выбираем 3 неправильных варианта из оставшихся переменных
  const wrongOpts = f.vars
    .filter(v => v.key !== hidden.key)
    .sort(() => Math.random() - 0.5)
    .slice(0, 3)
    .map(v => v.label);

  // Если в формуле меньше 4 переменных, добиваем случайными из других формул
  const allLabels = formulas.flatMap(fm => fm.vars.map(v => v.label));
  while (wrongOpts.length < 3) {
    const rnd = allLabels[Math.floor(Math.random() * allLabels.length)];
    if (rnd !== hidden.label && !wrongOpts.includes(rnd)) wrongOpts.push(rnd);
  }

  // 4. Формируем текст вопроса. Заменяем переменную на "?" в нужной части.
  let left = f.left;
  let right = f.right;
  
  if (left === hidden.key) left = '?';
  if (right === hidden.key) right = '?';
  // Если переменная сложная (с индексом/степенью), заменяем именно её
  right = right.replace(new RegExp(`(?<![a-zA-Zа-яА-Я])${hidden.key}(?![a-zA-Zа-яА-Я])`, 'g'), '?');
  left = left.replace(new RegExp(`(?<![a-zA-Zа-яА-Я])${hidden.key}(?![a-zA-Zа-яА-Я])`, 'g'), '?');

  return {
    text: `${left} = ${right}`,
    answer: hidden.label,
    options: [hidden.label, ...wrongOpts],
    type: 'formula'
  };
}

function genQuestion() {
  if (settings.mode === 'arithmetic') return genArithmetic();
  if (settings.mode === 'physics') return genFormula();
  return Math.random() < 0.5 ? genArithmetic() : genFormula();
}

// ==============================
// ПОДСЧЁТ ОЧКОВ И КОМБО
// ==============================
function calculatePoints(q) {
  if (q.type === 'formula') return 15;
  const { a, b, op } = q;
  const base = { '+': 3, '-': 3, '×': 6, '÷': 9 }[op] || 3;
  const sizeBonus = Math.floor(Math.log2(Math.max(a, b) + 1)) * 2;
  return base + sizeBonus;
}

function comboMultiplier() {
  if (state.combo < 3) return 1;
  if (state.combo < 6) return 1.5;
  if (state.combo < 10) return 2;
  if (state.combo < 15) return 3;
  return 4;
}

function isBeautifulNumber(n) {
  if (typeof n !== 'number' || n < 10) return false;
  const s = String(n);
  if (/^(\d)\1+$/.test(s)) return true;
  if (n % 100 === 0) return true;
  if (n % 5 === 0 && n % 10 !== 0) return true;
  if (s === [...s].reverse().join('')) return true;
  if (n % 10 === 0) return true;
  return false;
}

function fireConfetti() {
  if (typeof confetti !== 'function') return;
  confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 }, colors: ['#667eea', '#764ba2', '#ff6b6b', '#ffa500', '#2ecc71'] });
  setTimeout(() => {
    confetti({ particleCount: 40, angle: 60, spread: 55, origin: { x: 0 } });
    confetti({ particleCount: 40, angle: 120, spread: 55, origin: { x: 1 } });
  }, 150);
}

function generateNumberOptions(correct) {
  const set = new Set([correct]);
  let guard = 0;
  while (set.size < 4 && guard < 100) {
    guard++;
    const delta = rand(-Math.max(5, Math.floor(correct * 0.3)), Math.max(5, Math.floor(correct * 0.3)));
    if (delta !== 0) set.add(correct + delta);
  }
  return [...set];
}

function showScreen(name) {
  $('menuScreen').classList.toggle('hidden', name !== 'menu');
  $('gameScreen').classList.toggle('hidden', name !== 'game');
  $('endScreen').classList.toggle('hidden', name !== 'end');
}

// ==============================
// ЛОГИКА ИГРЫ
// ==============================
function startGame() {
  state.score = 0;
  state.maxTime = DIFFICULTIES[settings.difficulty].time;
  state.time = state.maxTime;
  state.combo = 0;
  state.maxCombo = 0;
  state.correct = 0;
  state.wrong = 0;
  state.finished = false;

  $('score').textContent = 0;
  $('timer').textContent = state.time;
  $('progressBar').style.width = '100%';
  $('progressBar').style.background = 'var(--accent)';
  updateComboBadge();

  showScreen('game');
  nextQuestion();
  startTimer();
}

function startTimer() {
  clearInterval(state.timerId);
  state.timerId = setInterval(() => {
    state.time--;
    $('timer').textContent = state.time;

    // Обновляем прогресс-бар
    const pct = (state.time / state.maxTime) * 100;
    $('progressBar').style.width = `${pct}%`;
    
    // Красим в красный, если времени мало
    if (pct < 20) $('progressBar').style.background = 'var(--error)';
    else if (pct < 50) $('progressBar').style.background = '#f39c12';

    if (state.time <= 0) {
      clearInterval(state.timerId);
      endGame();
    }
  }, 1000);
}

// АНИМАЦИЯ ВОПРОСА
function nextQuestion() {
  if (state.finished) return;

  const container = $('questionContainer');
  container.classList.add('fade-out');

  setTimeout(() => {
    state.current = genQuestion();
    $('question').textContent = state.current.text;

    const basePts = calculatePoints(state.current);
    const mult = comboMultiplier();
    const totalPts = Math.round(basePts * mult);

    $('pointsBadge').textContent = mult > 1 ? `+${totalPts} очков (${basePts} × ${mult})` : `+${totalPts} очков`;

    const options = state.current.type === 'arithmetic' 
      ? generateNumberOptions(state.current.answer) 
      : state.current.options;

    const ansContainer = $('answers');
    ansContainer.innerHTML = '';
    [...options].sort(() => Math.random() - 0.5).forEach(opt => {
      const btn = document.createElement('button');
      btn.textContent = opt;
      btn.onclick = () => checkAnswer(opt);
      ansContainer.appendChild(btn);
    });

    container.classList.remove('fade-out');
    container.classList.add('fade-in');
    setTimeout(() => container.classList.remove('fade-in'), 300);
  }, 200); // Ждём, пока fade-out завершится
}

function checkAnswer(value) {
  if (state.finished) return;

  const correct = String(state.current.answer);
  const fb = $('feedback');
  const basePts = calculatePoints(state.current);

  if (String(value) === correct) {
    state.combo++;
    if (state.combo > state.maxCombo) state.maxCombo = state.combo;
    const mult = comboMultiplier();
    const totalPts = Math.round(basePts * mult);
    state.score += totalPts;
    state.correct++;

    fb.textContent = mult > 1 ? `✅ Верно! +${totalPts} (×${mult})` : `✅ Верно! +${totalPts}`;
    fb.style.color = 'var(--success)';

    if (state.current.type === 'arithmetic' && isBeautifulNumber(state.current.answer)) {
      fireConfetti();
      fb.textContent += ' 🎉';
    }
    if (state.combo > 0 && state.combo % 5 === 0) fireConfetti();

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
  setTimeout(() => { fb.textContent = ''; nextQuestion(); }, 900);
}

function updateCom
