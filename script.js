// ==============================
// КОНФИГУРАЦИЯ FIREBASE
// ==============================
const firebaseConfig = {
  apiKey: "AIzaSyB-sguJ8sJhMFFnBYfUmgid0KYwOek9jsk",
  authDomain: "math-challenge-1459c.firebaseapp.com",
  projectId: "math-challenge-1459c",
  storageBucket: "math-challenge-1459c.firebasestorage.app",
  messagingSenderId: "1021575462219",
  appId: "1:1021575462219:web:20a04cbfa3ae91582c7cce"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

let currentUser = null;

// ==============================
// КОНФИГУРАЦИЯ СЛОЖНОСТИ
// ==============================
const DIFFICULTIES = {
  easy:   { time: 90, addRange: [1, 20],  mulRange: [2, 9] },
  normal: { time: 60, addRange: [1, 50],  mulRange: [2, 12] },
  hard:   { time: 45, addRange: [10, 99], mulRange: [3, 19] },
};

// ... (ОСТАВЬ ЗДЕСЬ ВЕСЬ МАССИВ formulas БЕЗ ИЗМЕНЕНИЙ) ...

const formulas = [
  // Твой массив формул
];

// ==============================
// НАСТРОЙКИ И СОСТОЯНИЕ
// ==============================
const settings = { mode: 'arithmetic', difficulty: 'normal', playType: 'time', theme: 'light' };
const state = { 
  score: 0, time: 60, maxTime: 60, lives: 3, current: null, timerId: null, 
  combo: 0, maxCombo: 0, correct: 0, wrong: 0, finished: false, isPaused: false, isAnswering: false,
  formulaWeights: {}
};

// ... (ОСТАВЬ loadSettings, saveSettings, rand, $ БЕЗ ИЗМЕНЕНИЙ) ...

// ==============================
// ЛОГИКА АВТОРИЗАЦИИ И ЛИДЕРБОРДА
// ==============================
let isRegisterMode = false;

// Слушаем состояние авторизации
auth.onAuthStateChanged(user => {
  currentUser = user;
  const btn = $('userAuthBtn');
  if (user) {
    // Берем часть email до @ для отображения
    const name = user.email.split('@')[0];
    btn.textContent = `👤 ${name}`;
    btn.style.color = 'var(--accent)';
  } else {
    btn.textContent = 'Войти';
    btn.style.color = 'var(--text-muted)';
  }
});

// Открытие/закрытие модалки авторизации
$('userAuthBtn').onclick = () => {
  if (currentUser) {
    if (confirm("Выйти из аккаунта?")) auth.signOut();
    return;
  }
  $('authModal').classList.remove('hidden');
  $('authError').textContent = '';
  $('authEmail').value = '';
  $('authPassword').value = '';
};

$('closeAuthModal').onclick = () => $('authModal').classList.add('hidden');

$('authSwitchBtn').onclick = () => {
  isRegisterMode = !isRegisterMode;
  $('authTitle').textContent = isRegisterMode ? 'Регистрация' : 'Вход';
  $('authSubmitBtn').textContent = isRegisterMode ? 'Создать аккаунт' : 'Войти';
  $('authSwitchBtn').textContent = isRegisterMode ? 'У меня есть аккаунт' : 'Регистрация';
  $('authError').textContent = '';
};

$('authSubmitBtn').onclick = async () => {
  const email = $('authEmail').value.trim();
  const pass = $('authPassword').value;
  const errorEl = $('authError');
  
  if (!email || pass.length < 6) {
    errorEl.textContent = 'Введите корректный email и пароль (мин. 6 символов)';
    return;
  }
  
  try {
    $('authSubmitBtn').disabled = true;
    if (isRegisterMode) {
      await auth.createUserWithEmailAndPassword(email, pass);
    } else {
      await auth.signInWithEmailAndPassword(email, pass);
    }
    $('authModal').classList.add('hidden');
  } catch (err) {
    errorEl.textContent = err.message.replace('Firebase: ', '');
  } finally {
    $('authSubmitBtn').disabled = false;
  }
};

// ЛИДЕРБОРД
let currentLbMode = 'arithmetic';

$('leaderboardBtn').onclick = () => {
  $('leaderboardModal').classList.remove('hidden');
  loadLeaderboard(currentLbMode);
};

$('closeLeaderboardModal').onclick = () => $('leaderboardModal').classList.add('hidden');

// Кнопки переключения режима в лидерборде
document.querySelectorAll('[data-group="lbMode"] .option').forEach(btn => {
  btn.onclick = () => {
    document.querySelectorAll('[data-group="lbMode"] .option').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    currentLbMode = btn.dataset.value;
    loadLeaderboard(currentLbMode);
  };
});

async function loadLeaderboard(mode) {
  const list = $('leaderboardList');
  list.innerHTML = '<p style="text-align: center; color: var(--text-faint);">Загрузка...</p>';
  
  try {
    // Ищем топ-10 результатов для выбранного режима
    const q = db.collection('scores')
      .where('mode', '==', mode)
      .orderBy('score', 'desc')
      .limit(10);
      
    const snapshot = await q.get();
    
    list.innerHTML = '';
    if (snapshot.empty) {
      list.innerHTML = '<p style="text-align: center; color: var(--text-faint);">Пока нет результатов</p>';
      return;
    }
    
    let place = 1;
    snapshot.forEach(doc => {
      const data = doc.data();
      const row = document.createElement('div');
      row.className = 'lb-row';
      row.innerHTML = `
        <span class="lb-place">${place}.</span>
        <span class="lb-name">${data.name}</span>
        <span class="lb-score">${data.score}</span>
      `;
      list.appendChild(row);
      place++;
    });
  } catch (err) {
    console.error(err);
    list.innerHTML = '<p style="text-align: center; color: var(--error);">Ошибка загрузки</p>';
  }
}

// ==============================
// ОСТАЛЬНАЯ ЛОГИКА ИГРЫ (ОСТАВЛЯЕМ КАК БЫЛО)
// ==============================
// ... (Вставляешь свои функции applyTheme, genArithmetic, genFormula, genQuestion, calculatePoints, comboMultiplier, isBeautifulNumber, fireConfetti, generateNumberOptions, showScreen) ...

function startGame() {
  if (state.timerId) clearInterval(state.timerId);
  
  state.score = 0;
  state.maxTime = DIFFICULTIES[settings.difficulty].time;
  state.time = state.maxTime;
  state.lives = 3;
  state.combo = 0; state.maxCombo = 0; state.correct = 0; state.wrong = 0; 
  state.finished = false; state.formulaWeights = {}; 
  state.isAnswering = false; state.isPaused = false;

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
    if (state.isPaused) return;
    state.time--;
    $('timer').textContent = state.time;
    const pct = (state.time / state.maxTime) * 100;
    $('progressBar').style.width = `${pct}%`;
    if (pct < 20) $('progressBar').style.background = 'var(--error)';
    else if (pct < 50) $('progressBar').style.background = '#f39c12';
    if (state.time <= 0) { clearInterval(state.timerId); endGame(); }
  }, 1000);
}

// ... (ОСТАВЬ nextQuestion И checkAnswer БЕЗ ИЗМЕНЕНИЙ) ...

function endGame() {
  state.finished = true;
  state.isPaused = false;
  clearInterval(state.timerId);

  $('finalScore').textContent = state.score;

  const best = Number(localStorage.getItem('bestScore') || 0);
  let bestLine = '';
  if (state.score > best) {
    localStorage.setItem('bestScore', state.score);
    bestLine = '<p style="color:var(--success)">🎉 Новый рекорд!</p>';
  } else {
    bestLine = `<p style="color:var(--text-faint)">Личный рекорд: ${best}</p>`;
  }

  // ОТПРАВЛЯЕМ РЕЗУЛЬТАТ В БАЗУ, ЕСЛИ ПОЛЬЗОВАТЕЛЬ АВТОРИЗОВАН
  if (currentUser && state.score > 0) {
    const userName = currentUser.email.split('@')[0];
    db.collection('scores').add({
      uid: currentUser.uid,
      name: userName,
      score: state.score,
      mode: settings.mode,
      difficulty: settings.difficulty,
      date: firebase.firestore.FieldValue.serverTimestamp()
    }).catch(e => console.error("Ошибка сохранения рекорда:", e));
  }

  const statsLine = `
    <p style="color:var(--text-muted);font-size:14px;margin:8px 0">
      Верно: ${state.correct} · Ошибок: ${state.wrong} · Макс. комбо: ${state.maxCombo}
    </p>
  `;

  $('endBest').innerHTML = bestLine + statsLine;
  showScreen('end');
}

// ... (ОСТАВЬ initMenu, updateThemeButton, обработчики pauseBtn и кнопок навигации) ...
