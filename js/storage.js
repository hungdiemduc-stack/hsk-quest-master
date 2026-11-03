// Quản lý LocalStorage & Bảng xếp hạng

const STORAGE_KEYS = {
  NAME: 'hsk_name',
  UNLOCKED: 'hsk_unlocked',
  BEST: 'hsk_best',
  LOCAL_BOARD: 'hsk_local_board'
};

const DEFAULT_BOARD = [
  { name: 'Minh Anh 🌸', score: 380, date: Date.now() - 3600000 * 5 },
  { name: 'Hoàng Nam 🚀', score: 350, date: Date.now() - 3600000 * 12 },
  { name: 'Lan Chi ✨', score: 310, date: Date.now() - 3600000 * 20 },
  { name: 'Tuấn Kiệt 🎯', score: 280, date: Date.now() - 3600000 * 28 },
  { name: 'Thanh Thảo 🐼', score: 240, date: Date.now() - 3600000 * 36 },
  { name: 'Hải Đăng 🌟', score: 200, date: Date.now() - 3600000 * 48 },
  { name: 'Mai Linh 📚', score: 160, date: Date.now() - 3600000 * 60 }
];

export function getStoredItem(key, defaultValue) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : defaultValue;
  } catch (e) {
    return defaultValue;
  }
}

export function setStoredItem(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error('Storage error:', e);
  }
}

export function getPlayerName() {
  return getStoredItem(STORAGE_KEYS.NAME, '');
}

export function setPlayerName(name) {
  setStoredItem(STORAGE_KEYS.NAME, name);
}

export function getUnlockedLevel() {
  return getStoredItem(STORAGE_KEYS.UNLOCKED, 1);
}

export function setUnlockedLevel(lvl) {
  setStoredItem(STORAGE_KEYS.UNLOCKED, lvl);
}

export function getBestScores() {
  return getStoredItem(STORAGE_KEYS.BEST, {});
}

export function setBestScores(scores) {
  setStoredItem(STORAGE_KEYS.BEST, scores);
}

export async function fetchLeaderboard() {
  // Check local leaderboard first
  let localList = getStoredItem(STORAGE_KEYS.LOCAL_BOARD, null);
  if (!localList || !Array.isArray(localList) || localList.length === 0) {
    localList = DEFAULT_BOARD;
    setStoredItem(STORAGE_KEYS.LOCAL_BOARD, localList);
  }

  // Also sort descending
  localList.sort((a, b) => b.score - a.score);
  return localList;
}

export async function savePlayerScore(name, levelNum, score, passed) {
  const currentBest = getBestScores();
  const prevBestForLevel = currentBest[levelNum] || 0;
  
  if (score > prevBestForLevel) {
    currentBest[levelNum] = score;
    setBestScores(currentBest);
  }

  // Calculate total score
  const totalScore = Object.values(currentBest).reduce((a, b) => a + b, 0);

  // Check unlock
  const currentUnlocked = getUnlockedLevel();
  if (passed && levelNum >= currentUnlocked && levelNum < 4) {
    setUnlockedLevel(levelNum + 1);
  }

  // Update leaderboard
  const playerName = (name || '').trim() || 'Người chơi';
  const board = await fetchLeaderboard();
  const existingIdx = board.findIndex(item => item.name === playerName);

  if (existingIdx >= 0) {
    if (totalScore > board[existingIdx].score) {
      board[existingIdx].score = totalScore;
      board[existingIdx].date = Date.now();
    }
  } else {
    board.push({
      name: playerName,
      score: totalScore,
      date: Date.now()
    });
  }

  board.sort((a, b) => b.score - a.score);
  setStoredItem(STORAGE_KEYS.LOCAL_BOARD, board.slice(0, 50));

  return {
    bestScores: currentBest,
    unlocked: getUnlockedLevel(),
    totalScore
  };
}
