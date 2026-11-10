// ==============================
// КОНФИГУРАЦИЯ СЛОЖНОСТИ
// ==============================
const DIFFICULTIES = {
  easy:   { time: 90, addRange: [1, 20],  mulRange: [2, 9],  hideCount: 1, hardFormulas: false },
  normal: { time: 60, addRange: [1, 50],  mulRange: [2, 12], hideCount: 1, hardFormulas: true },
  hard:   { time: 45, addRange: [10, 99], mulRange: [3, 19], hideCount: 2, hardFormulas: true },
};

// ==============================
// МОДУЛЬНАЯ БАЗА ФОРМУЛ
// ==============================
const formulas = [
  // Базовые формулы
  { left: 'F',    right: 'm·a',            vars: [{ key: 'm', label: 'm' }, { key: 'a', label: 'a' }, { key: 'F', label: 'F' }] },
  { left: 'v',    right: 's/t',            vars: [{ key: 'v', label: 'v' }, { key: 's', label: 's' }, { key: 't', label: 't' }] },
  { left: 's',    right: 'v·t',            vars: [{ key: 's', label: 's' }, { key: 'v', label: 'v' }, { key: 't', label: 't' }] },
  { left: 'F',    right: 'm·g',            vars: [{ key: 'm', label: 'm' }, { key: 'g', label: 'g' }, { key: 'F', label: 'F' }] },
  { left: 'A',    right: 'F·s',            vars: [{ key: 'A', label: 'A' }, { key: 'F', label: 'F' }, { key: 's', label: 's' }] },
  { left: 'p',    right: 'm·v',            vars: [{ key: 'p', label: 'p' }, { key: 'm', label: 'm' }, { key: 'v', label: 'v' }] },
  { left: 'I',    right: 'U/R',            vars: [{ key: 'I', label: 'I' }, { key: 'U', label: 'U' }, { key: 'R', label: 'R' }] },
  { left: 'U',    right: 'I·R',            vars: [{ key: 'U', label: 'U' }, { key: 'I', label: 'I' }, { key: 'R', label: 'R' }] },
  { left: 'p',    right: 'F/S',            vars: [{ key: 'p', label: 'p' }, { key: 'F', label: 'F' }, { key: 'S', label: 'S' }] },
  { left: 'ρ',    right: 'm/V',            vars: [{ key: 'ρ', label: 'ρ' }, { key: 'm', label: 'm' }, { key: 'V', label: 'V' }] },
  
  // Сложные формулы
  { isHard: true, left: 'E',    right: 'm·c²',           vars: [{ key: 'm', label: 'm' }, { key: 'c', label: 'c' }, { key: 'E', label: 'E' }] },
  { isHard: true, left: 'P',    right: 'm·g',            vars: [{ key: 'm', label: 'm' }, { key: 'g', label: 'g' }, { key: 'P', label: 'P' }] },
  { isHard: true, left: 'Eк',   right: 'm·v²/2',         vars: [{ key: 'm', label: 'm' }, { key: 'v', label: 'v' }, { key: 'Eк', label: 'Eк' }] },
  { isHard: true, left: 'Eп',   right: 'm·g·h',          vars: [{ key: 'm', label: 'm' }, { key: 'g', label: 'g' }, { key: 'h', label: 'h' }, { key: 'Eп', label: 'Eп' }] },
  { isHard: true, left: 'N',    right: 'A/t',            vars: [{ key: 'N', label: 'N' }, { key: 'A', label: 'A' }, { key: 't', label: 't' }] },
  { isHard: true, left: 'a',    right: '(v-v₀)/t',       vars: [{ key: 'a', label: 'a' }, { key: 'v', label: 'v' }, { key: 'v₀', label: 'v₀' }, { key: 't', label: 't' }] },
  { isHard: true, left: 'F',    right: 'G·m₁·m₂/r²',     vars: [{ key: 'F', label: 'F' }, { key: 'G', label: 'G' }, { key: 'm₁', label: 'm₁' }, { key: 'm₂', label: 'm₂' }, { key: 'r²', label: 'r²' }] },
  { isHard: true, left: 'P',    right: 'U·I',            vars: [{ key: 'P', label: 'P' }, { key: 'U', label: 'U' }, { key: 'I', label: 'I' }] },
  { isHard: true, left: 'Q',    right: 'I²·R·t',         vars: [{ key: 'Q', label: 'Q' }, { key: 'I', label: 'I²' }, { key: 'R', label: 'R' }, { key: 't', label: 't' }] },
  { isHard: true, left: 'R',    right: 'ρ·L/S',          vars: [{ key: 'R', label: 'R' }, { key: 'ρ', label: 'ρ' }, { key: 'L', label: 'L' }, { key: 'S', label: 'S' }] },
  { isHard: true, left: 'p',    right: 'ρ·g·h',          vars: [{ key: 'p', label: 'p' }, { key: 'ρ', label: 'ρ' }, { key: 'g', label: 'g' }, { key: 'h', label: 'h' }] },
  { isHard: true, left: 'Fа',   right: 'ρ·g·V',          vars: [{ key: 'Fа', label: 'Fа' }, { key: 'ρ', label: 'ρ' }, { key: 'g', label: 'g' }, { key: 'V', label: 'V' }] },
  { isHard: true, left: 'Q',    right: 'c·m·Δt',         vars: [{ key: 'Q', label: 'Q' }, { key: 'c', label: 'c' }, { key: 'm', label: 'm' }, { key: 'Δt', label: 'Δt' }] },
  { isHard: true, left: 'Q',    right: 'λ·m',            vars: [{ key: 'Q', label: 'Q' }, { key: 'λ', label: 'λ' }, { key: 'm', label: 'm' }] },
  { isHard: true, left: 'Q',    right: 'L·m',            vars: [{ key: 'Q', label: 'Q' }, { key: 'L', label: 'L' }, { key: 'm', label: 'm' }] },
  { isHard: true, left: 'v',    right: 'λ·ν',            vars: [{ key: 'v', label: 'v' }, { key: 'λ', label: 'λ' }, { key: 'ν', label: 'ν' }] },
  { isHard: true, left: 'T',    right: '1/ν',            vars: [{ key: 'T', label: 'T' }, { key: 'ν', label: 'ν' }] },
];

// ==============================
// НАСТРОЙКИ И СОСТОЯНИЕ
// ==============================
const settings = { mode: 'arithmetic', difficulty: 'normal', playType: 'time', theme: 'light' };
const state = { 
  score: 0, time: 60, maxTime: 60, lives: 3, current: null, timerId: null, 
  combo: 0, maxCombo: 0, correct: 0, wrong: 0, finished: false,
  formulaWeights: {}
};

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

function genFormula() {
  const cfg = DIFFICULTIES[settings.difficulty];
  let allPossibleQuestions = [];
  
  const availableFormulas = formulas.filter(f => !f.isHard || cfg.hardFormulas);

  availableFormulas.forEach((f, fIndex) => {
    let hideCount = cfg.hideCount;
    if (hideCount >= f.vars.length) hideCount = f.vars.length - 1;
    
    const shuffledVars = [...f.vars].sort(() => Math.random() - 0.5);
    const hiddenVars = shuffledVars.slice(0, hideCount);
    const targetVar = hiddenVars[0];

    let left = f.left;
    let right = f.right;

    hiddenVars.forEach(hv => {
      if (left === hv.key) left = '?';
      if (right === hv.key) right = '?';
      const regex = new RegExp(`(?<![a-zA-Zа-яА-Я])${hv.key}(?![a-zA-Zа-яА-Я])`, 'g');
      right = right.replace(regex, '?');
      left = left.replace(regex, '?');
    });

    let questionText = `${left} = ${right}`;
    if (hideCount > 1) {
            questionText += ' <br><span style="font-size:16px; color:var(--text-muted)">(Найди: ' + targetVar.label + ')</span>';
    }

    const key = `${fIndex}-${hiddenVars.map(v => v.key).join('-')}`;
    
    allPossibleQuestions.push({
      key,
      f,
      hidden: targetVar,
      text: questionText,
      answer: targetVar.label
    });
  });

  let totalWeight = 0;
  const weightedPool = allPossibleQuestions.map(q => {
    const w = state.formulaWeights[q.key] || 0;
    const chance = 1 / (w + 1); 
    totalWeight += chance;
    return { ...q, chance, currentWeight: totalWeight };
  });

  const roll = Math.random() * totalWeight;
  const selected = weightedPool.find(q => q.currentWeight >= roll) || weightedPool[weightedPool.length - 1];
  state.formulaWeights[selected.key] = (state.formulaWeights[selected.key] || 0) + 1;

  const wrongOpts = selected.f.vars.filter(v => v.key !== selected.hidden.key).map(v => v.label).sort(() => Math.random() - 0.5).slice(0, 3);
  const allLabels = formulas.flatMap(fm => fm.vars.map(v => v.label));
  while (wrongOpts.length < 3) {
    const rnd = allLabels[Math.floor(Math.random() * allLabels.length)];
    if (rnd !== selected.answer && !wrongOpts.includes(rnd)) wrongOpts.push(rnd);
  }
  
  return { text: selected.text, answer: selected.answer, options: [selected.answer, ...wrongOpts], type: 'formula' };
}

function genQuestion() {
  if (settings.mode === 'arithmetic') return genArithmetic();
  if (settings.mode === 'physics') return genFormula();
  return Math.random() < 0.5 ? genArithmetic() : genFormula();
}

// ==============================
// ОЧКИ И КОМБО
// ==============================
function calculatePoints(q) {
  if (q.type === 'formula') return 15;
  const { a, b, op } = q;
  const base = { '+': 3, '-': 3, '×': 6, '÷': 9 }[op] || 3;
  return base + Math.floor(Math.log2(Math.max(a, b) + 1)) * 2;
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
  if (/^(\d)\1+$/.test(s) || n % 100 === 0 || (n % 5 === 0 && n % 10 !== 0) || s === [...s].reverse().join('') || n % 10 === 0) return true;
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

function startGame() {
  state.score = 0;
  state.maxTime = DIFFICULTIES[settings.difficulty].time;
  state.time = state.maxTime;
  state.lives = 3;
  state.combo = 0; state.maxCombo = 0; state.correct = 0; state.wrong = 0; state.finished = false; state.formulaWeights = {}; 

  $('score').textContent = 0;
  $('lives').textContent = '❤️❤️❤️';
  $('timer').textContent = state.time;
  $('progressBar').style.width = '100%';
  $('progressBar').style.background = 'var(--accent)';

  if (settings.playType === 'time') {
    $('timerContainer').classList.remove('hidden');
    $('livesContainer').classList.add('hidden');
    $('progressContainer').classList.remove('hidden');
    startTimer();
  } else {
    $('timerContainer').classList.add('hidden');
    $('livesContainer').classList.remove('hidden');
    $('progressContainer').classList.add('hidden');
    clearInterval(state.timerId);
  }

  updateComboBadge();
  showScreen('game');
  nextQuestion();
}

function startTimer() {
  clearInterval(state.timerId);
  state.timerId = setInterval(() => {
    state.time--;
    $('timer').textContent = state.time;
    const pct = (state.time / state.maxTime) * 100;
    $('progressBar').style.width = `${pct}%`;
    if (pct < 20) $('progressBar').style.background = 'var(--error)';
    else if (pct < 50) $('progressBar').style.background = '#f39c12';
    if (state.time <= 0) { clearInterval(state.timerId); endGame(); }
  }, 1000);
}

function nextQuestion() {
  if (state.finished) return;
  const container = $('questionContainer');
  container.classList.add('fade-out');
  setTimeout(() => {
    state.current = genQuestion();
    $('question').innerHTML = state.current.text;
    const basePts = calculatePoints(state.current);
    const mult = comboMultiplier();
    const totalPts = Math.round(basePts * mult);
    $('pointsBadge').textContent = mult > 1 ? `+${totalPts} очков (${basePts} × ${mult})` : `+${totalPts} очков`;
    const options = state.current.type === 'arithmetic' ? generateNumberOptions(state.current.answer) : state.current.options;
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
  }, 200);
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

    if (settings.playType === 'lives') {
      state.lives--;
      const hearts = '❤️'.repeat(Math.max(0, state.lives)) + '🤍'.repeat(3 - Math.max(0, state.lives));
      $('lives').textContent = hearts;
      
      if (state.lives <= 0) {
        $('score').textContent = state.score;
        setTimeout(endGame, 900);
        return;
      }
    }
  }

  $('score').textContent = state.score;
  setTimeout(() => { fb.textContent = ''; nextQuestion(); }, 900);
}

function updateComboBadge() {
  const badge = $('comboBadge');
  const mult = comboMultiplier();
  
  if (state.combo >= 2) {
    badge.classList.remove('hidden');
    badge.style.display = 'flex';
    badge.querySelector('.stat-value').textContent = `×${mult} (${state.combo})`;
  } else {
    badge.classList.add('hidden');
    badge.style.display = 'none';
  }
}

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

function initMenu() {
  document.querySelectorAll('.option-group').forEach(group => {
    const key = group.dataset.group;
    group.querySelectorAll('.option').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.value === settings[key]);
      btn.onclick = () => {
        settings[key] = btn.dataset.value;
        group.querySelectorAll('.option').forEach(b => b.classList.toggle('active', b === btn));
        saveSettings();
      };
    });
  });

  const themeBtn = $('themeToggle');
  if (themeBtn) {
    updateThemeButton(themeBtn);
    themeBtn.onclick = () => {
      if (settings.theme === 'light') settings.theme = 'dark';
      else if (settings.theme === 'dark') settings.theme = 'system';
      else settings.theme = 'light';
      saveSettings();
      applyTheme();
      updateThemeButton(themeBtn);
    };
  }

  const best = Number(localStorage.getItem('bestScore') || 0);
  $('menuBest').textContent = `Рекорд: ${best}`;
}

function updateThemeButton(btn) {
  if (settings.theme === 'light') btn.textContent = '☀️';
  else if (settings.theme === 'dark') btn.textContent = '🌙';
  else btn.textContent = '🌗';
}

// Привязка событий
$('playBtn').onclick = startGame;
$('againBtn').onclick = startGame;
$('menuBtn').onclick = () => { initMenu(); showScreen('menu'); };
$('quitBtn').onclick = () => { clearInterval(state.timerId); state.finished = true; initMenu(); showScreen('menu'); };

// Инициализация
loadSettings();
applyTheme();
initMenu();
showScreen('menu');

// Автообновление при смене SW
if ('serviceWorker' in navigator) {
  let refreshing = false;
  navigator.serviceWorker.addEventListener('controllerchange', () => {
    if (refreshing) return;
    refreshing = true;
    window.location.reload();
  });
}
