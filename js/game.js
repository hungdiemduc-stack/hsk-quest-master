import {
  VOCABULARY,
  LEVEL_2_QUESTIONS,
  LEVEL_3_QUESTIONS,
  LEVEL_4_QUESTIONS,
  LEVELS,
  shuffle
} from './data.js';

import { playSound, speakChinese } from './audio.js';

import {
  getPlayerName,
  setPlayerName,
  getUnlockedLevel,
  getBestScores,
  fetchLeaderboard,
  savePlayerScore
} from './storage.js';

// Game state
let state = {
  screen: 'home', // 'home' | 'game' | 'board'
  playerName: '',
  unlockedLevel: 1,
  bestScores: {},
  leaderboard: [],
  currentLevel: 1,
  
  // In-game session variables
  score: 0,
  streak: 0,
  lives: 3,
  progress: 0,
  floatingText: null,
  isJumping: false,
  isHurt: false,
  isShaking: false,
  levelResult: null, // { correct, total }

  // Level specific state
  l1: {
    rounds: [],
    roundIdx: 0,
    selectedHz: null,
    matchedHz: [],
    wrongHz: null,
    wrongPinyin: null,
    errorsCount: 0
  },
  l2_3: {
    questions: [],
    qIdx: 0,
    selectedOption: null,
    correctCount: 0
  },
  l4: {
    questions: [],
    qIdx: 0,
    tray: [],
    answer: [],
    status: 'idle', // 'idle' | 'ok' | 'bad'
    correctCount: 0
  }
};

const appContainer = document.getElementById('app');

// Initialize Game
export function initGame() {
  state.playerName = getPlayerName();
  state.unlockedLevel = getUnlockedLevel();
  state.bestScores = getBestScores();
  
  fetchLeaderboard().then(board => {
    state.leaderboard = board;
    render();
  });

  render();
}

function getTotalStars() {
  return Object.values(state.bestScores).reduce((sum, val) => sum + val, 0);
}

// Master Render Router
function render() {
  if (!appContainer) return;
  appContainer.innerHTML = '';

  const wrapper = document.createElement('div');
  wrapper.className = 'min-h-screen game-bg text-foreground';

  const inner = document.createElement('div');
  inner.className = 'mx-auto max-w-md px-4 pb-12 pt-5';

  if (state.screen === 'home') {
    inner.appendChild(renderHomeScreen());
  } else if (state.screen === 'board') {
    inner.appendChild(renderLeaderboardScreen());
  } else if (state.screen === 'game') {
    inner.appendChild(renderGameScreen());
  }

  wrapper.appendChild(inner);
  appContainer.appendChild(wrapper);
}

// ==========================================
// 1. HOME SCREEN
// ==========================================
function renderHomeScreen() {
  const container = document.createElement('div');
  container.className = 'animate-fade-in';

  const totalStars = getTotalStars();
  const hasValidName = state.playerName.trim().length > 0;

  container.innerHTML = `
    <div class="text-center">
      <div class="inline-block rounded-full bg-accent px-3 py-1 text-xs font-bold text-accent-foreground">
        HSK 3 · Bài 2
      </div>
      <h1 class="mt-3 font-hz text-5xl font-black text-primary" style="text-shadow: 2px 2px 0px #222230;">
        他什么时候回来
      </h1>
      <p class="mt-1 font-display text-lg font-bold text-muted-foreground">
        Khi nào anh ấy trở về?
      </p>
    </div>

    <!-- Hero Banner -->
    <div class="mt-4 overflow-hidden rounded-3xl border-4 border-foreground shadow-chunky bg-card">
      <img 
        src="./assets/hero.png" 
        alt="Hai người bạn đi xuống núi" 
        class="h-44 w-full object-cover transition hover:scale-105"
      />
    </div>

    <!-- Name input & Total Stars -->
    <div class="mt-5 flex items-center gap-2 rounded-2xl border-4 border-foreground bg-card p-3 shadow-chunky">
      <span class="text-2xl">🧑‍🎓</span>
      <input 
        id="player-name-input"
        type="text"
        maxlength="20"
        value="${state.playerName}"
        placeholder="Nhập tên của bạn…"
        class="min-w-0 flex-1 bg-transparent font-display text-lg font-bold outline-none"
      />
      <div class="shrink-0 rounded-xl bg-secondary px-3 py-1 font-display font-black text-secondary-foreground">
        ⭐ ${totalStars}
      </div>
    </div>

    <!-- Level Cards List -->
    <div class="mt-6 space-y-4" id="level-buttons-container"></div>

    ${!hasValidName ? `
      <p class="mt-3 text-center text-sm font-bold text-destructive">
        Nhập tên để bắt đầu chơi!
      </p>
    ` : ''}

    <!-- Leaderboard Button -->
    <button 
      id="btn-open-leaderboard"
      class="mt-6 w-full rounded-2xl border-4 border-foreground bg-foreground py-4 font-display text-xl font-black text-background shadow-chunky active:translate-y-1"
      style="background-color: #222230; color: #fff;"
    >
      🏆 Bảng xếp hạng
    </button>
    <p class="mt-3 text-center text-xs font-semibold text-muted-foreground">
      Đạt ≥ 60% để mở khóa level tiếp theo
    </p>
  `;

  // Attach Input event
  const inputEl = container.querySelector('#player-name-input');
  inputEl.addEventListener('input', (e) => {
    state.playerName = e.target.value.slice(0, 20);
    setPlayerName(state.playerName);
    
    // Re-check validity of buttons
    const valid = state.playerName.trim().length > 0;
    container.querySelectorAll('.lvl-btn').forEach(btn => {
      const isLocked = btn.dataset.locked === 'true';
      btn.disabled = isLocked || !valid;
    });
  });

  // Attach Leaderboard button
  container.querySelector('#btn-open-leaderboard').addEventListener('click', () => {
    playSound('tap');
    fetchLeaderboard().then(board => {
      state.leaderboard = board;
      state.screen = 'board';
      render();
    });
  });

  // Render Level cards
  const lvlContainer = container.querySelector('#level-buttons-container');
  LEVELS.forEach(lvl => {
    const isLocked = lvl.n > state.unlockedLevel;
    const btn = document.createElement('button');
    btn.dataset.locked = isLocked ? 'true' : 'false';
    btn.disabled = isLocked || !hasValidName;
    btn.className = `lvl-btn flex w-full items-center gap-4 rounded-3xl border-4 border-foreground p-4 text-left shadow-chunky transition active:translate-y-1 active:shadow-none ${
      isLocked ? 'bg-muted opacity-60' : `lvl-${lvl.n}`
    } disabled:cursor-not-allowed`;

    const bestForLvl = state.bestScores[lvl.n];

    btn.innerHTML = `
      <div class="grid h-16 w-16 shrink-0 place-items-center overflow-hidden rounded-2xl border-4 border-foreground bg-card">
        ${isLocked 
          ? '<span class="text-3xl">🔒</span>' 
          : `<img src="${lvl.img}" alt="${lvl.title}" class="h-14 w-14 animate-wiggle object-contain" />`
        }
      </div>
      <div class="min-w-0 flex-1">
        <div class="font-display text-xs font-black uppercase tracking-widest text-muted-foreground">
          Level ${lvl.n}
        </div>
        <div class="truncate font-display text-xl font-black text-foreground">
          ${lvl.title}
        </div>
        <div class="truncate text-sm font-semibold opacity-80 text-foreground">
          ${lvl.desc}
        </div>
      </div>
      ${bestForLvl ? `
        <div class="shrink-0 font-display font-black text-lg">
          ⭐ ${bestForLvl}
        </div>
      ` : ''}
    `;

    btn.addEventListener('click', () => {
      playSound('tap');
      startLevel(lvl.n);
    });

    lvlContainer.appendChild(btn);
  });

  return container;
}

// ==========================================
// 2. LEADERBOARD SCREEN
// ==========================================
function renderLeaderboardScreen() {
  const container = document.createElement('div');
  container.className = 'animate-fade-in';

  container.innerHTML = `
    <button id="btn-back-home" class="font-display text-lg font-black hover:opacity-80">
      ← Về màn hình chính
    </button>
    <h2 class="mt-2 text-center font-display text-4xl font-black">
      🏆 Bảng xếp hạng
    </h2>
    <div class="mt-5 space-y-2" id="leaderboard-list"></div>
  `;

  container.querySelector('#btn-back-home').addEventListener('click', () => {
    playSound('tap');
    state.screen = 'home';
    render();
  });

  const listEl = container.querySelector('#leaderboard-list');
  const board = state.leaderboard;

  if (board.length === 0) {
    listEl.innerHTML = `
      <p class="text-center font-semibold text-muted-foreground py-6">
        Chưa có ai chơi. Hãy là người đầu tiên!
      </p>
    `;
  } else {
    board.forEach((item, idx) => {
      const isMe = item.name === state.playerName;
      const rankIcon = ['🥇', '🥈', '🥉'][idx] || (idx + 1);
      const row = document.createElement('div');
      row.className = `flex items-center gap-3 rounded-2xl border-4 border-foreground p-3 shadow-chunky ${
        isMe ? 'bg-secondary' : 'bg-card'
      }`;

      row.innerHTML = `
        <div class="w-10 shrink-0 text-center font-display text-2xl font-black">
          ${rankIcon}
        </div>
        <div class="min-w-0 flex-1 truncate font-display text-lg font-bold">
          ${item.name} ${isMe ? ' (Bạn)' : ''}
        </div>
        <div class="shrink-0 font-display text-xl font-black text-primary">
          ⭐ ${item.score}
        </div>
      `;
      listEl.appendChild(row);
    });
  }

  return container;
}

// ==========================================
// 3. START GAME LEVEL LOGIC
// ==========================================
function startLevel(lvlNum) {
  state.currentLevel = lvlNum;
  state.screen = 'game';
  state.score = 0;
  state.streak = 0;
  state.lives = 3;
  state.progress = 0;
  state.floatingText = null;
  state.isJumping = false;
  state.isHurt = false;
  state.isShaking = false;
  state.levelResult = null;

  if (lvlNum === 1) {
    // 15 random words split into 3 rounds of 5
    const selected15 = shuffle(VOCABULARY).slice(0, 15);
    state.l1.rounds = [
      selected15.slice(0, 5),
      selected15.slice(5, 10),
      selected15.slice(10, 15)
    ];
    state.l1.roundIdx = 0;
    state.l1.selectedHz = null;
    state.l1.matchedHz = [];
    state.l1.wrongHz = null;
    state.l1.wrongPinyin = null;
    state.l1.errorsCount = 0;
  } else if (lvlNum === 2) {
    state.l2_3.questions = shuffle(LEVEL_2_QUESTIONS);
    state.l2_3.qIdx = 0;
    state.l2_3.selectedOption = null;
    state.l2_3.correctCount = 0;
  } else if (lvlNum === 3) {
    state.l2_3.questions = shuffle(LEVEL_3_QUESTIONS);
    state.l2_3.qIdx = 0;
    state.l2_3.selectedOption = null;
    state.l2_3.correctCount = 0;
  } else if (lvlNum === 4) {
    state.l4.questions = shuffle(LEVEL_4_QUESTIONS);
    state.l4.qIdx = 0;
    state.l4.correctCount = 0;
    setupL4Question(0);
  }

  render();
}

function setupL4Question(idx) {
  const q = state.l4.questions[idx];
  if (!q) return;
  state.l4.answer = [];
  state.l4.status = 'idle';
  state.l4.tray = shuffle(q.parts.map((t, i) => ({ id: `${idx}-${i}-${t}`, text: t })));
}

// Reward for correct answer
function onCorrect() {
  const points = 10 + state.streak * 2;
  state.score += points;
  state.streak += 1;
  playSound('ok');

  state.floatingText = `+${points}${state.streak >= 2 ? ' 🔥' : ''}`;
  state.isJumping = true;
  setTimeout(() => {
    state.isJumping = false;
    state.floatingText = null;
    render();
  }, 600);
}

// Penalty for wrong answer
function onWrong() {
  state.streak = 0;
  state.lives = Math.max(0, state.lives - 1);
  playSound('bad');

  state.isShaking = true;
  state.isHurt = true;
  setTimeout(() => {
    state.isShaking = false;
    state.isHurt = false;
    render();
  }, 500);
}

// Level Finished
function finishLevel(correct, total) {
  const passed = (correct / total) >= 0.6;
  playSound(passed ? 'win' : 'bad');
  state.levelResult = { correct, total, passed };

  // Save score and unlocks
  savePlayerScore(state.playerName, state.currentLevel, state.score, passed).then(res => {
    state.bestScores = res.bestScores;
    state.unlockedLevel = res.unlocked;
    fetchLeaderboard().then(b => {
      state.leaderboard = b;
    });
  });

  render();
}

// ==========================================
// 4. GAME SCREEN & WORLD RUNNER HUD
// ==========================================
function renderGameScreen() {
  const container = document.createElement('div');
  if (state.isShaking) {
    container.className = 'animate-shake';
  }

  // Check if Level Result Modal should be shown
  if (state.levelResult) {
    return renderResultScreen();
  }

  // Check if Hearts Ran Out
  if (state.lives === 0) {
    return renderGameOverScreen();
  }

  const lvlInfo = LEVELS[state.currentLevel - 1];

  // Top Progress & Lives Bar
  const topBar = document.createElement('div');
  topBar.className = 'flex items-center gap-3';
  topBar.innerHTML = `
    <button id="btn-exit-game" class="shrink-0 text-2xl font-black hover:opacity-75">✕</button>
    <div class="h-5 flex-1 overflow-hidden rounded-full border-4 border-foreground bg-card">
      <div 
        class="h-full bg-primary transition-all duration-500" 
        style="width: ${Math.min(100, Math.round(state.progress * 100))}%"
      ></div>
    </div>
    <div class="shrink-0 font-display font-black text-lg">
      ${'❤️'.repeat(state.lives)}${'🖤'.repeat(3 - state.lives)}
    </div>
  `;
  topBar.querySelector('#btn-exit-game').addEventListener('click', () => {
    playSound('tap');
    state.screen = 'home';
    render();
  });
  container.appendChild(topBar);

  // Subheader: Level Title & Score
  const subHeader = document.createElement('div');
  subHeader.className = 'relative mt-3 flex items-center justify-between';
  subHeader.innerHTML = `
    <div class="font-display text-sm font-black uppercase tracking-widest text-muted-foreground">
      Level ${state.currentLevel} · ${lvlInfo.title}
    </div>
    <div class="font-display text-lg font-black">
      ⭐ ${state.score}
      ${state.streak >= 2 ? `<span class="ml-1 text-primary">x${state.streak}</span>` : ''}
    </div>
    ${state.floatingText ? `
      <div class="animate-float-up pointer-events-none absolute right-0 top-6 font-display text-2xl font-black text-primary">
        ${state.floatingText}
      </div>
    ` : ''}
  `;
  container.appendChild(subHeader);

  // Runner World Track Canvas/Box
  const runnerBox = renderRunnerWorld();
  container.appendChild(runnerBox);

  // Level Content Box
  const contentBox = document.createElement('div');
  contentBox.className = 'mt-5';

  if (state.currentLevel === 1) {
    contentBox.appendChild(renderLevel1Content());
  } else if (state.currentLevel === 2) {
    contentBox.appendChild(renderLevel2Content());
  } else if (state.currentLevel === 3) {
    contentBox.appendChild(renderLevel3Content());
  } else if (state.currentLevel === 4) {
    contentBox.appendChild(renderLevel4Content());
  }

  container.appendChild(contentBox);
  return container;
}

// Runner World Graphic Display
function renderRunnerWorld() {
  const box = document.createElement('div');
  box.className = 'relative mt-4 h-40 overflow-hidden rounded-3xl border-4 border-foreground shadow-chunky';
  box.style.background = 'linear-gradient(180deg, #93c5fd 0%, #bfdbfe 60%, #bae6fd 100%)';

  const progressPercent = state.progress * 100;
  const charLeft = 4 + state.progress * 72; // From 4% to 76%

  const charAnimClass = state.isJumping
    ? 'animate-jump'
    : state.isHurt
    ? 'animate-hurt'
    : 'animate-run';

  box.innerHTML = `
    <!-- Star score overlay -->
    <div class="absolute left-3 top-2 z-10 font-display text-sm font-black tracking-wider text-white" style="text-shadow: 0 2px 0 rgba(0,0,0,0.5);">
      ⭐ ${String(state.score).padStart(4, '0')}
    </div>

    <!-- Lives overlay -->
    <div class="absolute right-3 top-2 z-10 text-sm" style="text-shadow: 0 2px 0 rgba(0,0,0,0.4);">
      ${'❤️'.repeat(state.lives)}${'🖤'.repeat(3 - state.lives)}
    </div>

    <!-- Floating Clouds -->
    <div class="animate-cloud absolute left-[10%] top-4 text-3xl opacity-90">☁️</div>
    <div class="animate-cloud-slow absolute left-[60%] top-8 text-2xl opacity-80">☁️</div>
    <div class="absolute right-[12%] top-3 text-2xl opacity-70">☁️</div>

    <!-- Coins on track at 20%, 40%, 60% -->
    <div class="absolute bottom-14 text-xl transition-all duration-500 ${progressPercent >= 20 ? 'scale-0 opacity-0' : 'animate-coin'}" style="left: 20%;">🪙</div>
    <div class="absolute bottom-14 text-xl transition-all duration-500 ${progressPercent >= 40 ? 'scale-0 opacity-0' : 'animate-coin'}" style="left: 40%;">🪙</div>
    <div class="absolute bottom-14 text-xl transition-all duration-500 ${progressPercent >= 60 ? 'scale-0 opacity-0' : 'animate-coin'}" style="left: 60%;">🪙</div>

    <!-- Finish Flag -->
    <div class="absolute bottom-8 right-2 flex flex-col items-center">
      <div class="text-2xl">🚩</div>
      <div class="h-10 w-1.5 rounded bg-white/90"></div>
    </div>

    <!-- Runner Ground Strip -->
    <div class="track-ground absolute bottom-0 left-0 right-0 h-8 border-t-4 border-foreground"></div>

    <!-- Character Sprite -->
    <div 
      class="absolute bottom-6 transition-all duration-700 ease-out" 
      style="left: ${charLeft}%;"
    >
      <img 
        src="./assets/char.png" 
        alt="Nhân vật" 
        class="h-16 w-16 object-contain drop-shadow-md ${charAnimClass}" 
      />
    </div>
  `;

  return box;
}

// ==========================================
// 5. LEVEL 1: NỐI TỪ VỰNG
// ==========================================
function renderLevel1Content() {
  const container = document.createElement('div');
  const round = state.l1.rounds[state.l1.roundIdx];
  if (!round) return container;

  // Keep a stable shuffle for each round
  if (!state.l1.shuffledHz || state.l1.currentRoundRef !== round) {
    state.l1.currentRoundRef = round;
    state.l1.shuffledHz = shuffle(round);
    state.l1.shuffledPinyin = shuffle(round);
  }

  const { shuffledHz, shuffledPinyin } = state.l1;

  container.innerHTML = `
    <p class="mb-4 text-center font-display text-lg font-bold">
      Nối chữ Hán với pinyin & nghĩa · Vòng ${state.l1.roundIdx + 1}/3
    </p>
    <div class="grid grid-cols-2 gap-3">
      <!-- Left Column: Hanzi -->
      <div class="space-y-3" id="hz-column"></div>
      <!-- Right Column: Pinyin & Meaning -->
      <div class="space-y-3" id="pinyin-column"></div>
    </div>
  `;

  const hzCol = container.querySelector('#hz-column');
  shuffledHz.forEach(word => {
    const isMatched = state.l1.matchedHz.includes(word.hz);
    const isSelected = state.l1.selectedHz === word.hz;
    const isWrong = state.l1.wrongHz === word.hz;

    const btn = document.createElement('button');
    btn.disabled = isMatched;
    btn.className = `w-full rounded-2xl border-4 border-foreground py-4 font-hz text-2xl font-black shadow-chunky transition active:translate-y-1 ${
      isMatched 
        ? 'scale-95 bg-success text-success-foreground opacity-50' 
        : isWrong
        ? 'bg-destructive text-destructive-foreground'
        : isSelected 
        ? 'bg-secondary -translate-y-1' 
        : 'bg-card'
    }`;
    btn.textContent = word.hz;

    btn.addEventListener('click', () => {
      playSound('tap');
      speakChinese(word.hz);
      state.l1.selectedHz = word.hz;
      state.l1.wrongHz = null;
      state.l1.wrongPinyin = null;
      render();
    });

    hzCol.appendChild(btn);
  });

  const pyCol = container.querySelector('#pinyin-column');
  shuffledPinyin.forEach(word => {
    const isMatched = state.l1.matchedHz.includes(word.hz);
    const isWrong = state.l1.wrongPinyin === word.hz;

    const btn = document.createElement('button');
    btn.disabled = isMatched;
    btn.className = `flex h-[68px] w-full flex-col items-center justify-center rounded-2xl border-4 border-foreground px-1 shadow-chunky transition active:translate-y-1 ${
      isMatched 
        ? 'scale-95 bg-success text-success-foreground opacity-50' 
        : isWrong
        ? 'bg-destructive text-destructive-foreground'
        : 'bg-card'
    }`;

    btn.innerHTML = `
      <span class="text-sm font-bold text-primary">${word.py}</span>
      <span class="text-sm font-bold leading-tight">${word.vi}</span>
    `;

    btn.addEventListener('click', () => {
      if (!state.l1.selectedHz || isMatched) return;

      if (state.l1.selectedHz === word.hz) {
        // Correct match!
        onCorrect();
        speakChinese(word.hz);
        state.l1.matchedHz.push(word.hz);
        state.l1.selectedHz = null;

        const totalMatched = state.l1.roundIdx * 5 + state.l1.matchedHz.length;
        state.progress = totalMatched / 15;

        // Check if round finished
        if (state.l1.matchedHz.length === 5) {
          setTimeout(() => {
            if (state.l1.roundIdx === 2) {
              // Level 1 complete!
              const correctTotal = Math.max(0, 15 - state.l1.errorsCount);
              finishLevel(correctTotal, 15);
            } else {
              state.l1.roundIdx += 1;
              state.l1.matchedHz = [];
              state.l1.selectedHz = null;
              state.l1.shuffledHz = null;
              render();
            }
          }, 500);
        } else {
          render();
        }
      } else {
        // Wrong match!
        onWrong();
        state.l1.errorsCount += 1;
        state.l1.wrongHz = state.l1.selectedHz;
        state.l1.wrongPinyin = word.hz;
        state.l1.selectedHz = null;
        render();

        setTimeout(() => {
          state.l1.wrongHz = null;
          state.l1.wrongPinyin = null;
          render();
        }, 450);
      }
    });

    pyCol.appendChild(btn);
  });

  return container;
}

// ==========================================
// 6. LEVEL 2: CHỌN ĐÁP ÁN (TRẮC NGHIỆM BÀI KHÓA)
// ==========================================
function renderLevel2Content() {
  const container = document.createElement('div');
  container.className = 'animate-fade-in';

  const questions = state.l2_3.questions;
  const currentQ = questions[state.l2_3.qIdx];
  if (!currentQ) return container;

  container.innerHTML = `
    <div class="text-center text-sm font-bold text-muted-foreground">
      Câu ${state.l2_3.qIdx + 1}/${questions.length}
    </div>
    <div class="mt-2 rounded-3xl border-4 border-foreground bg-card p-6 text-center shadow-chunky">
      <p class="font-hz text-2xl font-black leading-relaxed">
        ${currentQ.q}
      </p>
      ${currentQ.sub ? `
        <p class="mt-2 text-sm font-semibold text-muted-foreground">
          ${currentQ.sub}
        </p>
      ` : ''}
    </div>
    <div class="mt-5 grid gap-3 grid-cols-1" id="quiz-options-container"></div>
  `;

  const optContainer = container.querySelector('#quiz-options-container');

  currentQ.options.forEach((optText, optIdx) => {
    const isSelected = state.l2_3.selectedOption === optIdx;
    const isAnswer = optIdx === currentQ.answer;

    let colorClass = 'bg-card';
    if (state.l2_3.selectedOption !== null) {
      if (isAnswer) {
        colorClass = 'bg-success text-success-foreground';
      } else if (isSelected) {
        colorClass = 'bg-destructive text-destructive-foreground';
      } else {
        colorClass = 'bg-card opacity-50';
      }
    }

    const btn = document.createElement('button');
    btn.className = `rounded-2xl border-4 border-foreground px-4 py-4 font-hz text-xl font-bold shadow-chunky transition active:translate-y-1 ${colorClass}`;
    btn.textContent = optText;

    btn.addEventListener('click', () => {
      if (state.l2_3.selectedOption !== null) return;
      state.l2_3.selectedOption = optIdx;

      if (optIdx === currentQ.answer) {
        onCorrect();
        speakChinese(optText);
        state.l2_3.correctCount += 1;
      } else {
        onWrong();
      }

      state.progress = (state.l2_3.qIdx + 1) / questions.length;
      render();

      setTimeout(() => {
        if (state.l2_3.qIdx + 1 >= questions.length) {
          finishLevel(state.l2_3.correctCount, questions.length);
        } else {
          state.l2_3.qIdx += 1;
          state.l2_3.selectedOption = null;
          render();
        }
      }, 900);
    });

    optContainer.appendChild(btn);
  });

  return container;
}

// ==========================================
// 7. LEVEL 3: ĐIỀN TỪ (NGỮ PHÁP)
// ==========================================
function renderLevel3Content() {
  const container = document.createElement('div');
  container.className = 'animate-fade-in';

  const questions = state.l2_3.questions;
  const currentQ = questions[state.l2_3.qIdx];
  if (!currentQ) return container;

  // If answered, fill in the blank
  let displayedQuestion = currentQ.q;
  if (state.l2_3.selectedOption !== null) {
    displayedQuestion = currentQ.q.replace('___', currentQ.options[currentQ.answer]);
  }

  container.innerHTML = `
    <div class="text-center text-sm font-bold text-muted-foreground">
      Câu ${state.l2_3.qIdx + 1}/${questions.length} · Điền từ ngữ pháp
    </div>
    <div class="mt-2 rounded-3xl border-4 border-foreground bg-card p-6 text-center shadow-chunky">
      <p class="font-hz text-2xl font-black leading-relaxed">
        ${displayedQuestion}
      </p>
      ${currentQ.sub ? `
        <p class="mt-2 text-sm font-semibold text-muted-foreground">
          ${currentQ.sub}
        </p>
      ` : ''}
    </div>
    <div class="mt-5 grid grid-cols-2 gap-3" id="blank-options-container"></div>
  `;

  const optContainer = container.querySelector('#blank-options-container');

  currentQ.options.forEach((optText, optIdx) => {
    const isSelected = state.l2_3.selectedOption === optIdx;
    const isAnswer = optIdx === currentQ.answer;

    let colorClass = 'bg-card';
    if (state.l2_3.selectedOption !== null) {
      if (isAnswer) {
        colorClass = 'bg-success text-success-foreground';
      } else if (isSelected) {
        colorClass = 'bg-destructive text-destructive-foreground';
      } else {
        colorClass = 'bg-card opacity-50';
      }
    }

    const btn = document.createElement('button');
    btn.className = `rounded-2xl border-4 border-foreground px-4 py-4 font-hz text-2xl font-bold shadow-chunky transition active:translate-y-1 ${colorClass}`;
    btn.textContent = optText;

    btn.addEventListener('click', () => {
      if (state.l2_3.selectedOption !== null) return;
      state.l2_3.selectedOption = optIdx;

      if (optIdx === currentQ.answer) {
        onCorrect();
        speakChinese(displayedQuestion);
        state.l2_3.correctCount += 1;
      } else {
        onWrong();
      }

      state.progress = (state.l2_3.qIdx + 1) / questions.length;
      render();

      setTimeout(() => {
        if (state.l2_3.qIdx + 1 >= questions.length) {
          finishLevel(state.l2_3.correctCount, questions.length);
        } else {
          state.l2_3.qIdx += 1;
          state.l2_3.selectedOption = null;
          render();
        }
      }, 950);
    });

    optContainer.appendChild(btn);
  });

  return container;
}

// ==========================================
// 8. LEVEL 4: DỊCH CÂU (GHÉP TỪ THÀNH CÂU)
// ==========================================
function renderLevel4Content() {
  const container = document.createElement('div');
  container.className = 'animate-fade-in';

  const questions = state.l4.questions;
  const currentQ = questions[state.l4.qIdx];
  if (!currentQ) return container;

  const statusBg = state.l4.status === 'ok'
    ? 'bg-success/30'
    : state.l4.status === 'bad'
    ? 'bg-destructive/20'
    : 'bg-card/60';

  container.innerHTML = `
    <div class="text-center text-sm font-bold text-muted-foreground">
      Câu ${state.l4.qIdx + 1}/${questions.length} · Dịch sang tiếng Trung
    </div>
    
    <div class="mt-2 rounded-3xl border-4 border-foreground bg-card p-5 text-center shadow-chunky">
      <p class="font-display text-xl font-black">
        🇻🇳 ${currentQ.vi}
      </p>
    </div>

    <!-- Drop/Answer Box -->
    <div 
      class="mt-5 flex min-h-[84px] flex-wrap items-center gap-2 rounded-2xl border-4 border-dashed border-foreground p-3 transition-colors ${statusBg}" 
      id="sentence-answer-box"
    ></div>

    ${state.l4.status === 'bad' ? `
      <p class="mt-2 text-center font-hz font-bold text-destructive">
        Đáp án: ${currentQ.parts.join('')}
      </p>
    ` : ''}

    <!-- Available Word Tokens Tray -->
    <div class="mt-5 flex flex-wrap justify-center gap-2" id="sentence-tray-box"></div>

    <!-- Check Button -->
    <button 
      id="btn-check-sentence"
      ${state.l4.tray.length > 0 || state.l4.status !== 'idle' ? 'disabled' : ''}
      class="mt-8 w-full rounded-2xl border-4 border-foreground bg-primary py-4 font-display text-xl font-black text-primary-foreground shadow-chunky active:translate-y-1 disabled:opacity-40"
    >
      Kiểm tra
    </button>
  `;

  // Render Answer Tokens
  const answerBox = container.querySelector('#sentence-answer-box');
  state.l4.answer.forEach(token => {
    const btn = document.createElement('button');
    btn.className = 'animate-scale-in rounded-xl border-4 border-foreground bg-secondary px-3 py-2 font-hz text-xl font-bold shadow-chunky-sm active:translate-y-1';
    btn.textContent = token.text;

    btn.addEventListener('click', () => {
      if (state.l4.status !== 'idle') return;
      playSound('tap');
      state.l4.answer = state.l4.answer.filter(item => item.id !== token.id);
      state.l4.tray.push(token);
      render();
    });

    answerBox.appendChild(btn);
  });

  // Render Tray Tokens
  const trayBox = container.querySelector('#sentence-tray-box');
  state.l4.tray.forEach(token => {
    const btn = document.createElement('button');
    btn.className = 'rounded-xl border-4 border-foreground bg-card px-3 py-2 font-hz text-xl font-bold shadow-chunky-sm active:translate-y-1';
    btn.textContent = token.text;

    btn.addEventListener('click', () => {
      if (state.l4.status !== 'idle') return;
      playSound('tap');
      speakChinese(token.text);
      state.l4.tray = state.l4.tray.filter(item => item.id !== token.id);
      state.l4.answer.push(token);
      render();
    });

    trayBox.appendChild(btn);
  });

  // Check sentence logic
  const checkBtn = container.querySelector('#btn-check-sentence');
  checkBtn.addEventListener('click', () => {
    if (state.l4.tray.length > 0 || state.l4.status !== 'idle') return;

    const builtStr = state.l4.answer.map(t => t.text).join('');
    const targetStr = currentQ.parts.join('');
    const isCorrect = builtStr === targetStr;

    state.l4.status = isCorrect ? 'ok' : 'bad';

    if (isCorrect) {
      onCorrect();
      speakChinese(targetStr);
      state.l4.correctCount += 1;
    } else {
      onWrong();
    }

    state.progress = (state.l4.qIdx + 1) / questions.length;
    render();

    setTimeout(() => {
      if (state.l4.qIdx + 1 >= questions.length) {
        finishLevel(state.l4.correctCount, questions.length);
      } else {
        state.l4.qIdx += 1;
        setupL4Question(state.l4.qIdx);
        render();
      }
    }, 1400);
  });

  return container;
}

// ==========================================
// 9. RESULTS & GAME OVER SCREENS
// ==========================================
function renderResultScreen() {
  const container = document.createElement('div');
  container.className = 'animate-scale-in pt-10 text-center';

  const { correct, total, passed } = state.levelResult;
  const ratio = correct / total;
  const starsCount = ratio >= 0.9 ? 3 : ratio >= 0.6 ? 2 : correct > 0 ? 1 : 0;

  container.innerHTML = `
    <div class="text-7xl">${passed ? '🎉' : '😅'}</div>
    <h2 class="mt-3 font-display text-4xl font-black">
      ${passed ? 'Tuyệt vời!' : 'Cố lên nào!'}
    </h2>
    <div class="mt-3 text-5xl tracking-widest text-primary">
      ${'⭐'.repeat(starsCount)}${'☆'.repeat(3 - starsCount)}
    </div>
    <p class="mt-3 font-display text-xl font-bold">
      Đúng ${correct}/${total} · ⭐ ${state.score} điểm
    </p>

    <div class="mt-8 space-y-3">
      ${passed && state.currentLevel < 4 ? `
        <button 
          id="btn-next-level"
          class="w-full rounded-2xl border-4 border-foreground bg-primary py-4 font-display text-xl font-black text-primary-foreground shadow-chunky active:translate-y-1"
        >
          Level ${state.currentLevel + 1} →
        </button>
      ` : ''}
      <button 
        id="btn-home-from-result"
        class="w-full rounded-2xl border-4 border-foreground bg-card py-4 font-display text-xl font-black shadow-chunky active:translate-y-1"
      >
        Về màn hình chính
      </button>
    </div>
  `;

  const nextBtn = container.querySelector('#btn-next-level');
  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      playSound('tap');
      startLevel(state.currentLevel + 1);
    });
  }

  container.querySelector('#btn-home-from-result').addEventListener('click', () => {
    playSound('tap');
    state.screen = 'home';
    render();
  });

  return container;
}

function renderGameOverScreen() {
  const container = document.createElement('div');
  container.className = 'pt-10 text-center animate-fade-in';

  container.innerHTML = `
    <div class="text-6xl">💔</div>
    <p class="mt-3 font-display text-2xl font-black">
      Hết mạng rồi!
    </p>
    <button 
      id="btn-game-over-done"
      class="mt-6 rounded-2xl border-4 border-foreground bg-card px-6 py-3 font-display text-lg font-black shadow-chunky active:translate-y-1"
    >
      Xem kết quả
    </button>
  `;

  container.querySelector('#btn-game-over-done').addEventListener('click', () => {
    finishLevel(0, 1);
  });

  return container;
}
