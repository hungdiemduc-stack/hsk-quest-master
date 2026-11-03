import React, { useState, useEffect, useMemo } from 'react';
import { Sparkles, Trophy, Flame, Heart, Volume2, VolumeX, Moon, Sun, Check, X, Zap, Award, BookOpen, Layers, HelpCircle, Timer, ArrowRight, BarChart2, CheckCircle2, AlertCircle, CheckCircle } from 'lucide-react';

// ==========================================
// HSK VOCABULARY DATABASE (HSK 1 - HSK 4)
// ==========================================
const HSK_DATA = {
  1: [{
    id: 'h1_1',
    hanzi: '你好',
    pinyin: 'nǐ hǎo',
    meaning: 'Xin chào',
    sentence: '你好！很高兴认识你。',
    translation: 'Xin chào! Rất vui được gặp bạn.'
  }, {
    id: 'h1_2',
    hanzi: '谢谢',
    pinyin: 'xiè xie',
    meaning: 'Cảm ơn',
    sentence: '谢谢你的帮助。',
    translation: 'Cảm ơn sự giúp đỡ của bạn.'
  }, {
    id: 'h1_3',
    hanzi: '再见',
    pinyin: 'zài jiàn',
    meaning: 'Tạm biệt',
    sentence: '明天见，再见！',
    translation: 'Hẹn gặp lại vào ngày mai, tạm biệt!'
  }, {
    id: 'h1_4',
    hanzi: '中国',
    pinyin: 'Zhōng guó',
    meaning: 'Trung Quốc',
    sentence: '我是中国人在学习中文。',
    translation: 'Tôi là người Trung Quốc đang học tiếng Trung.'
  }, {
    id: 'h1_5',
    hanzi: '学习',
    pinyin: 'xué xí',
    meaning: 'Học tập',
    sentence: '我喜欢学习汉语。',
    translation: 'Tôi thích học tiếng Hán.'
  }, {
    id: 'h1_6',
    hanzi: '老师',
    pinyin: 'lǎo shī',
    meaning: 'Thầy/Cô giáo',
    sentence: '王老师是一位好老师。',
    translation: 'Thầy Vương là một giáo viên tốt.'
  }, {
    id: 'h1_7',
    hanzi: '学生',
    pinyin: 'xué sheng',
    meaning: 'Học sinh',
    sentence: '我们都是汉语学生。',
    translation: 'Chúng tôi đều là học sinh tiếng Trung.'
  }, {
    id: 'h1_8',
    hanzi: '朋友',
    pinyin: 'péng you',
    meaning: 'Bạn bè',
    sentence: '他是我的好朋友。',
    translation: 'Cậu ấy là bạn tốt của tôi.'
  }, {
    id: 'h1_9',
    hanzi: '喝水',
    pinyin: 'hē shuǐ',
    meaning: 'Uống nước',
    sentence: '天气很热，多喝水。',
    translation: 'Thời tiết rất nóng, uống nhiều nước nhé.'
  }, {
    id: 'h1_10',
    hanzi: '苹果',
    pinyin: 'píng guǒ',
    meaning: 'Quả táo',
    sentence: '我每天吃一个苹果。',
    translation: 'Mỗi ngày tôi ăn một quả táo.'
  }],
  2: [{
    id: 'h2_1',
    hanzi: '准备',
    pinyin: 'zhǔn bèi',
    meaning: 'Chuẩn bị',
    sentence: '你准备好了吗？',
    translation: 'Bạn đã chuẩn bị xong chưa?'
  }, {
    id: 'h2_2',
    hanzi: '运动',
    pinyin: 'yùn dòng',
    meaning: 'Vận động / Thể thao',
    sentence: '多做运动对身体好。',
    translation: 'Tập thể thao nhiều tốt cho sức khỏe.'
  }, {
    id: 'h2_3',
    hanzi: '时间',
    pinyin: 'shí jiān',
    meaning: 'Thời gian',
    sentence: '我们没有多少时间了。',
    translation: 'Chúng ta không còn nhiều thời gian nữa.'
  }, {
    id: 'h2_4',
    hanzi: '旅游',
    pinyin: 'lǚ yóu',
    meaning: 'Du lịch',
    sentence: '今年夏天我想去中国旅游。',
    translation: 'Mùa hè năm nay tôi muốn đi du lịch Trung Quốc.'
  }, {
    id: 'h2_5',
    hanzi: '非常',
    pinyin: 'fēi cháng',
    meaning: 'Rất / Cực kỳ',
    sentence: '这部电影非常好看。',
    translation: 'Bộ phim này cực kỳ hay.'
  }, {
    id: 'h2_6',
    hanzi: '希望',
    pinyin: 'xī wàng',
    meaning: 'Hy vọng',
    sentence: '希望你的梦想能实现。',
    translation: 'Hy vọng ước mơ của bạn có thể thành hiện thực.'
  }, {
    id: 'h2_7',
    hanzi: '机场',
    pinyin: 'jī chǎng',
    meaning: 'Sân bay',
    sentence: '我正在去机场的路上。',
    translation: 'Tôi đang trên đường đến sân bay.'
  }, {
    id: 'h2_8',
    hanzi: '帮助',
    pinyin: 'bāng zhù',
    meaning: 'Giúp đỡ',
    sentence: '非常感谢你的帮助。',
    translation: 'Rất cảm ơn sự giúp đỡ của bạn.'
  }],
  3: [{
    id: 'h3_1',
    hanzi: '选择',
    pinyin: 'xuǎn zé',
    meaning: 'Lựa chọn',
    sentence: '做出正确的选择很重要。',
    translation: 'Đưa ra lựa chọn đúng đắn rất quan trọng.'
  }, {
    id: 'h3_2',
    hanzi: '环境',
    pinyin: 'huán jìng',
    meaning: 'Môi trường',
    sentence: '我们要保护生态环境。',
    translation: 'Chúng ta cần bảo vệ môi trường sinh thái.'
  }, {
    id: 'h3_3',
    hanzi: '努力',
    pinyin: 'nǔ lì',
    meaning: 'Nỗ lực / Cố gắng',
    sentence: '只要努力，就一定能成功。',
    translation: 'Chỉ cần nỗ lực, nhất định sẽ thành công.'
  }, {
    id: 'h3_4',
    hanzi: '了解',
    pinyin: 'liǎo jiě',
    meaning: 'Hiểu rõ / Tìm hiểu',
    sentence: '我想更多地了解中国文化。',
    translation: 'Tôi muốn tìm hiểu nhiều hơn về văn hóa Trung Quốc.'
  }, {
    id: 'h3_5',
    hanzi: '历史',
    pinyin: 'lì shǐ',
    meaning: 'Lịch sử',
    sentence: '中国有着悠久的历史。',
    translation: 'Trung Quốc có lịch sử lâu đời.'
  }, {
    id: 'h3_6',
    hanzi: '关系',
    pinyin: 'guān xì',
    meaning: 'Mối quan hệ',
    sentence: '我们之间的关系非常好。',
    translation: 'Mối quan hệ giữa chúng tôi rất tốt.'
  }],
  4: [{
    id: 'h4_1',
    hanzi: '坚持',
    pinyin: 'jiān chí',
    meaning: 'Kiên trì',
    sentence: '坚持就是胜利。',
    translation: 'Kiên trì chính là thắng lợi.'
  }, {
    id: 'h4_2',
    hanzi: '成功',
    pinyin: 'chéng gōng',
    meaning: 'Thành công',
    sentence: '祝贺你获得了成功！',
    translation: 'Chúc mừng bạn đã đạt được thành công!'
  }, {
    id: 'h4_3',
    hanzi: '经验',
    pinyin: 'jīng yàn',
    meaning: 'Kinh nghiệm',
    sentence: '他在工作积累了丰富经验。',
    translation: 'Anh ấy tích lũy được nhiều kinh nghiệm trong công việc.'
  }, {
    id: 'h4_4',
    hanzi: '态度',
    pinyin: 'tài du',
    meaning: 'Thái độ',
    sentence: '态度决定一切。',
    translation: 'Thái độ quyết định tất cả.'
  }, {
    id: 'h4_5',
    hanzi: '积极',
    pinyin: 'jī jí',
    meaning: 'Tích cực',
    sentence: '用积极的心态面对生活。',
    translation: 'Dùng tâm thế tích cực đối mặt với cuộc sống.'
  }, {
    id: 'h4_6',
    hanzi: '责任',
    pinyin: 'zé rèn',
    meaning: 'Trách nhiệm',
    sentence: '勇敢承担属于自己的责任。',
    translation: 'Dũng cảm gánh vác trách nhiệm của chính mình.'
  }]
};

// RPG Titles based on HSK Level & XP
const getPlayerTitle = (level, hskLvl) => {
  if (hskLvl === 1) return `Tân Thủ HSK 1 (LV.${level})`;
  if (hskLvl === 2) return `Học Giả HSK 2 (LV.${level})`;
  if (hskLvl === 3) return `Cao Thủ HSK 3 (LV.${level})`;
  return `Đại Sư HSK 4 (LV.${level})`;
};

// ==========================================
// SOUND SYNTHESIS & AUDIO SYSTEM
// ==========================================
class SoundFxManager {
  constructor() {
    this.ctx = null;
  }
  init() {
    if (!this.ctx) {
      this.ctx = new (window.AudioContext || window.webkitAudioContext)();
    }
  }
  playBeep(freq, type, duration, vol = 0.1) {
    try {
      this.init();
      if (this.ctx.state === 'suspended') this.ctx.resume();
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
      gain.gain.setValueAtTime(vol, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + duration);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch (e) {}
  }
  correct() {
    this.playBeep(523.25, 'sine', 0.1, 0.15); // C5
    setTimeout(() => this.playBeep(659.25, 'sine', 0.25, 0.15), 80); // E5
  }
  wrong() {
    this.playBeep(220, 'sawtooth', 0.15, 0.15);
    setTimeout(() => this.playBeep(180, 'sawtooth', 0.25, 0.15), 100);
  }
  levelUp() {
    const notes = [440, 554.37, 659.25, 880];
    notes.forEach((freq, idx) => {
      setTimeout(() => this.playBeep(freq, 'triangle', 0.2, 0.2), idx * 90);
    });
  }
  click() {
    this.playBeep(800, 'sine', 0.04, 0.05);
  }
}
const sfx = new SoundFxManager();

// Native TTS Speech Synthesis
const speakText = (text, isMuted = false) => {
  if (isMuted || !('speechSynthesis' in window)) return;
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'zh-CN';
  utterance.rate = 0.85;
  window.speechSynthesis.speak(utterance);
};

// Main React App Component
export default function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [muted, setMuted] = useState(false);

  // RPG Player Stats
  const [hskLevel, setHskLevel] = useState(1);
  const [xp, setXp] = useState(150);
  const [streak, setStreak] = useState(5);
  const [masteredWords, setMasteredWords] = useState(new Set(['h1_1', 'h1_2']));
  const [highScores, setHighScores] = useState({
    speedrun: 120,
    quiz: 80,
    match: 60
  });
  const [showStatsModal, setShowStatsModal] = useState(false);

  // Navigation / Mode Select
  const [mode, setMode] = useState('hub');

  // Level & Title calculation
  const playerLevel = Math.floor(xp / 100) + 1;
  const currentXpProgress = xp % 100;
  const title = getPlayerTitle(playerLevel, hskLevel);
  const gainXp = amount => {
    setXp(prevXp => {
      const nextXp = prevXp + amount;
      if (Math.floor(nextXp / 100) > Math.floor(prevXp / 100)) {
        if (!muted) sfx.levelUp();
      }
      return nextXp;
    });
  };
  const toggleMastered = wordId => {
    setMasteredWords(prev => {
      const updated = new Set(prev);
      if (updated.has(wordId)) {
        updated.delete(wordId);
      } else {
        updated.add(wordId);
        gainXp(10);
      }
      return updated;
    });
  };
  const updateHighScore = (gameMode, newScore) => {
    setHighScores(prev => ({
      ...prev,
      [gameMode]: Math.max(prev[gameMode] || 0, newScore)
    }));
  };
  return /*#__PURE__*/React.createElement("div", {
    className: `min-h-screen transition-colors duration-300 font-sans ${darkMode ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-800'}`
  }, /*#__PURE__*/React.createElement("header", {
    className: `sticky top-0 z-50 backdrop-blur-md border-b ${darkMode ? 'bg-slate-900/80 border-slate-800' : 'bg-white/80 border-slate-200'}`
  }, /*#__PURE__*/React.createElement("div", {
    className: "max-w-6xl mx-auto px-4 py-3 flex items-center justify-between"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-3 cursor-pointer",
    onClick: () => setMode('hub')
  }, /*#__PURE__*/React.createElement("div", {
    className: "bg-gradient-to-tr from-red-600 to-amber-500 p-2.5 rounded-xl shadow-lg shadow-red-500/20 text-white font-bold text-xl flex items-center justify-center"
  }, "\u6F22"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h1", {
    className: "font-extrabold text-lg sm:text-xl tracking-tight bg-gradient-to-r from-red-500 via-amber-500 to-orange-500 bg-clip-text text-transparent"
  }, "HSK Quest Master"), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-slate-400 font-medium"
  }, title))), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2 sm:gap-4"
  }, /*#__PURE__*/React.createElement("div", {
    onClick: () => setShowStatsModal(true),
    className: `flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border cursor-pointer hover:opacity-80 transition ${darkMode ? 'bg-slate-800 border-slate-700 text-amber-400' : 'bg-amber-50 border-amber-200 text-amber-700'}`
  }, /*#__PURE__*/React.createElement(Award, {
    className: "w-4 h-4 text-amber-500"
  }), /*#__PURE__*/React.createElement("span", null, "LV. ", playerLevel), /*#__PURE__*/React.createElement("div", {
    className: "w-12 h-2 bg-slate-700 rounded-full overflow-hidden ml-1 hidden sm:block"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bg-amber-400 h-full transition-all duration-300",
    style: {
      width: `${currentXpProgress}%`
    }
  }))), /*#__PURE__*/React.createElement("div", {
    className: `flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border ${darkMode ? 'bg-slate-800 border-slate-700 text-orange-400' : 'bg-orange-50 border-orange-200 text-orange-600'}`
  }, /*#__PURE__*/React.createElement(Flame, {
    className: "w-4 h-4 text-orange-500 fill-orange-500 animate-pulse"
  }), /*#__PURE__*/React.createElement("span", null, streak, " Ng\xE0y")), /*#__PURE__*/React.createElement("div", {
    className: `flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border ${darkMode ? 'bg-slate-800 border-slate-700 text-emerald-400' : 'bg-emerald-50 border-emerald-200 text-emerald-700'}`
  }, /*#__PURE__*/React.createElement(Zap, {
    className: "w-4 h-4 text-emerald-500"
  }), /*#__PURE__*/React.createElement("span", null, xp, " XP")), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center border-l border-slate-700/50 pl-2 gap-1"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => setShowStatsModal(true),
    className: `p-2 rounded-lg transition ${darkMode ? 'hover:bg-slate-800 text-slate-400' : 'hover:bg-slate-100 text-slate-600'}`,
    title: "Th\u1ED1ng k\xEA"
  }, /*#__PURE__*/React.createElement(BarChart2, {
    className: "w-5 h-5 text-indigo-400"
  })), /*#__PURE__*/React.createElement("button", {
    onClick: () => setMuted(!muted),
    className: `p-2 rounded-lg transition ${darkMode ? 'hover:bg-slate-800 text-slate-400' : 'hover:bg-slate-100 text-slate-600'}`,
    title: muted ? 'Bật âm thanh' : 'Tắt âm thanh'
  }, muted ? /*#__PURE__*/React.createElement(VolumeX, {
    className: "w-5 h-5 text-red-400"
  }) : /*#__PURE__*/React.createElement(Volume2, {
    className: "w-5 h-5"
  })), /*#__PURE__*/React.createElement("button", {
    onClick: () => setDarkMode(!darkMode),
    className: `p-2 rounded-lg transition ${darkMode ? 'hover:bg-slate-800 text-slate-400' : 'hover:bg-slate-100 text-slate-600'}`
  }, darkMode ? /*#__PURE__*/React.createElement(Sun, {
    className: "w-5 h-5 text-amber-300"
  }) : /*#__PURE__*/React.createElement(Moon, {
    className: "w-5 h-5 text-indigo-600"
  })))))), /*#__PURE__*/React.createElement("main", {
    className: "max-w-5xl mx-auto px-4 py-8"
  }, mode === 'hub' && /*#__PURE__*/React.createElement(HubView, {
    hskLevel: hskLevel,
    setHskLevel: setHskLevel,
    setMode: m => {
      if (!muted) sfx.click();
      setMode(m);
    },
    darkMode: darkMode,
    highScores: highScores,
    masteredWords: masteredWords
  }), mode === 'flashcards' && /*#__PURE__*/React.createElement(FlashcardView, {
    words: HSK_DATA[hskLevel],
    onBack: () => setMode('hub'),
    darkMode: darkMode,
    muted: muted,
    onGainXp: gainXp,
    masteredWords: masteredWords,
    toggleMastered: toggleMastered
  }), mode === 'quiz' && /*#__PURE__*/React.createElement(QuizQuestView, {
    words: HSK_DATA[hskLevel],
    onBack: () => setMode('hub'),
    darkMode: darkMode,
    muted: muted,
    onGainXp: gainXp,
    updateHighScore: sc => updateHighScore('quiz', sc)
  }), mode === 'match' && /*#__PURE__*/React.createElement(WordMatchView, {
    words: HSK_DATA[hskLevel],
    onBack: () => setMode('hub'),
    darkMode: darkMode,
    muted: muted,
    onGainXp: gainXp,
    updateHighScore: sc => updateHighScore('match', sc)
  }), mode === 'speedrun' && /*#__PURE__*/React.createElement(SpeedRunView, {
    words: HSK_DATA[hskLevel],
    onBack: () => setMode('hub'),
    darkMode: darkMode,
    muted: muted,
    onGainXp: gainXp,
    highScore: highScores.speedrun,
    updateHighScore: sc => updateHighScore('speedrun', sc)
  })), showStatsModal && /*#__PURE__*/React.createElement(StatsModal, {
    darkMode: darkMode,
    onClose: () => setShowStatsModal(false),
    xp: xp,
    playerLevel: playerLevel,
    streak: streak,
    masteredCount: masteredWords.size,
    highScores: highScores,
    title: title
  }));
}

// ==========================================
// 1. HUB / HOME VIEW (LEVEL SELECT + MODES)
// ==========================================
function HubView({
  hskLevel,
  setHskLevel,
  setMode,
  darkMode,
  highScores,
  masteredWords
}) {
  const modes = [{
    id: 'flashcards',
    title: 'Flashcard Master',
    desc: 'Thẻ 3D lật tương tác, nghe phát âm và đánh dấu từ thuộc.',
    icon: Layers,
    color: 'from-blue-500 to-indigo-600',
    badge: 'Ghi Nhớ'
  }, {
    id: 'quiz',
    title: 'Quiz Quest',
    desc: 'Thử thách chọn đáp án với 3 Trái Tim sinh tồn & tích điểm.',
    icon: HelpCircle,
    color: 'from-amber-500 to-red-600',
    badge: 'Thử Thách'
  }, {
    id: 'match',
    title: 'Ghép Từ (Word Match)',
    desc: 'Nối chữ Hán với phiên âm hoặc nghĩa tương ứng.',
    icon: Sparkles,
    color: 'from-emerald-500 to-teal-600',
    badge: 'Phản Xạ'
  }, {
    id: 'speedrun',
    title: 'Speed Run 30s',
    desc: 'Thách thức 30 giây trả lời cực nhanh đạt điểm kỷ lục.',
    icon: Timer,
    color: 'from-purple-600 to-pink-600',
    badge: 'Tốc Độ'
  }];
  const currentLevelWords = HSK_DATA[hskLevel];
  const masteredInCurrentLevel = currentLevelWords.filter(w => masteredWords.has(w.id)).length;
  return /*#__PURE__*/React.createElement("div", {
    className: "space-y-8 animate-fadeIn"
  }, /*#__PURE__*/React.createElement("div", {
    className: `relative overflow-hidden rounded-3xl p-6 sm:p-8 border ${darkMode ? 'bg-gradient-to-r from-slate-900 via-slate-800 to-red-950/40 border-slate-800' : 'bg-gradient-to-r from-red-500/10 via-amber-500/10 to-orange-500/10 border-red-100'}`
  }, /*#__PURE__*/React.createElement("div", {
    className: "relative z-10 max-w-xl"
  }, /*#__PURE__*/React.createElement("span", {
    className: "px-3 py-1 text-xs font-bold tracking-wider uppercase rounded-full bg-red-500/20 text-red-500 inline-block mb-3"
  }, "H\u1ECDc Ti\u1EBFng Trung Gamified"), /*#__PURE__*/React.createElement("h2", {
    className: "text-2xl sm:text-4xl font-extrabold tracking-tight mb-2"
  }, "Chinh Ph\u1EE5c HSK ", hskLevel, " D\u1EC5 D\xE0ng!"), /*#__PURE__*/React.createElement("p", {
    className: `${darkMode ? 'text-slate-400' : 'text-slate-600'} text-sm sm:text-base`
  }, "\u0110\xE3 thu\u1ED9c: ", /*#__PURE__*/React.createElement("span", {
    className: "text-emerald-400 font-bold"
  }, masteredInCurrentLevel, "/", currentLevelWords.length), " t\u1EEB v\u1EF1ng. Ch\u1ECDn ch\u1EBF \u0111\u1ED9 luy\u1EC7n t\u1EADp ngay d\u01B0\u1EDBi \u0111\xE2y!")), /*#__PURE__*/React.createElement("div", {
    className: "absolute right-4 bottom-2 opacity-10 sm:opacity-20 pointer-events-none select-none text-9xl font-black text-red-500"
  }, "\u6F22")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", {
    className: "text-sm font-bold tracking-wider uppercase text-slate-400 mb-4 flex items-center gap-2"
  }, /*#__PURE__*/React.createElement(BookOpen, {
    className: "w-4 h-4 text-red-500"
  }), " Ch\u1ECDn C\u1EA5p \u0110\u1ED9 HSK Target"), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-2 sm:grid-cols-4 gap-4"
  }, [1, 2, 3, 4].map(lvl => {
    const isSelected = hskLevel === lvl;
    return /*#__PURE__*/React.createElement("button", {
      key: lvl,
      onClick: () => {
        sfx.click();
        setHskLevel(lvl);
      },
      className: `relative p-5 rounded-2xl border transition-all text-left group overflow-hidden ${isSelected ? 'border-red-500 shadow-lg shadow-red-500/20 bg-gradient-to-b from-red-500/10 to-transparent' : darkMode ? 'bg-slate-900 border-slate-800 hover:border-slate-700' : 'bg-white border-slate-200 hover:border-slate-300'}`
    }, /*#__PURE__*/React.createElement("div", {
      className: "flex items-center justify-between mb-2"
    }, /*#__PURE__*/React.createElement("span", {
      className: `text-2xl font-black ${isSelected ? 'text-red-500' : darkMode ? 'text-slate-300' : 'text-slate-700'}`
    }, "HSK ", lvl), isSelected && /*#__PURE__*/React.createElement(CheckCircle2, {
      className: "w-5 h-5 text-red-500"
    })), /*#__PURE__*/React.createElement("p", {
      className: "text-xs text-slate-400"
    }, lvl === 1 && '150 từ - Cơ bản', lvl === 2 && '300 từ - Giao tiếp', lvl === 3 && '600 từ - Trung cấp', lvl === 4 && '1200 từ - Thành thạo'));
  }))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", {
    className: "text-sm font-bold tracking-wider uppercase text-slate-400 mb-4 flex items-center gap-2"
  }, /*#__PURE__*/React.createElement(Trophy, {
    className: "w-4 h-4 text-amber-500"
  }), " Ch\u1ECDn Ch\u1EBF \u0110\u1ED9 Ch\u01A1i (HSK ", hskLevel, ")"), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-1 md:grid-cols-2 gap-4"
  }, modes.map(m => {
    const Icon = m.icon;
    return /*#__PURE__*/React.createElement("div", {
      key: m.id,
      onClick: () => setMode(m.id),
      className: `group relative p-6 rounded-2xl border cursor-pointer transition-all duration-300 hover:-translate-y-1 ${darkMode ? 'bg-slate-900/90 border-slate-800 hover:border-slate-700 hover:shadow-xl hover:shadow-black/40' : 'bg-white border-slate-200 hover:border-slate-300 hover:shadow-xl hover:shadow-slate-200/50'}`
    }, /*#__PURE__*/React.createElement("div", {
      className: "flex items-start gap-4"
    }, /*#__PURE__*/React.createElement("div", {
      className: `p-3.5 rounded-2xl bg-gradient-to-tr ${m.color} text-white shadow-md group-hover:scale-110 transition-transform`
    }, /*#__PURE__*/React.createElement(Icon, {
      className: "w-7 h-7"
    })), /*#__PURE__*/React.createElement("div", {
      className: "flex-1"
    }, /*#__PURE__*/React.createElement("div", {
      className: "flex items-center justify-between mb-1"
    }, /*#__PURE__*/React.createElement("h4", {
      className: "font-bold text-lg group-hover:text-red-500 transition-colors"
    }, m.title), /*#__PURE__*/React.createElement("span", {
      className: `text-[10px] uppercase font-bold px-2 py-0.5 rounded-md ${darkMode ? 'bg-slate-800 text-slate-300' : 'bg-slate-100 text-slate-600'}`
    }, m.badge)), /*#__PURE__*/React.createElement("p", {
      className: "text-xs text-slate-400 leading-relaxed mb-4"
    }, m.desc), /*#__PURE__*/React.createElement("div", {
      className: "flex items-center text-xs font-semibold text-red-500 group-hover:translate-x-1 transition-transform"
    }, "B\u1EAFt \u0111\u1EA7u ngay ", /*#__PURE__*/React.createElement(ArrowRight, {
      className: "w-3.5 h-3.5 ml-1"
    })))));
  }))));
}

// ==========================================
// 2. FLASHCARD MASTER MODE (3D FLIP)
// ==========================================
function FlashcardView({
  words,
  onBack,
  darkMode,
  muted,
  onGainXp,
  masteredWords,
  toggleMastered
}) {
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const currentWord = words[index];
  const isMastered = masteredWords.has(currentWord?.id);
  const handleNext = () => {
    if (!muted) sfx.click();
    setFlipped(false);
    setIndex(prev => prev < words.length - 1 ? prev + 1 : 0);
    onGainXp(5);
  };
  const handlePrev = () => {
    if (!muted) sfx.click();
    setFlipped(false);
    setIndex(prev => prev > 0 ? prev - 1 : words.length - 1);
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "max-w-xl mx-auto space-y-6"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: onBack,
    className: `px-3 py-1.5 rounded-lg text-sm font-semibold flex items-center gap-1.5 transition ${darkMode ? 'bg-slate-800 hover:bg-slate-700' : 'bg-slate-200 hover:bg-slate-300'}`
  }, "\u2190 Quay l\u1EA1i"), /*#__PURE__*/React.createElement("div", {
    className: "text-xs font-semibold text-slate-400"
  }, "Th\u1EBB ", index + 1, " / ", words.length)), /*#__PURE__*/React.createElement("div", {
    onClick: () => setFlipped(!flipped),
    className: `relative min-h-[360px] rounded-3xl border cursor-pointer transition-all duration-500 p-8 flex flex-col items-center justify-between shadow-2xl text-center select-none ${darkMode ? 'bg-gradient-to-b from-slate-900 to-slate-900/90 border-slate-800 hover:border-slate-700' : 'bg-white border-slate-200 hover:border-slate-300'}`
  }, /*#__PURE__*/React.createElement("div", {
    className: "w-full flex justify-between items-center text-xs text-slate-400"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: e => {
      e.stopPropagation();
      toggleMastered(currentWord.id);
    },
    className: `flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold transition ${isMastered ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40' : 'bg-slate-800 text-slate-400'}`
  }, /*#__PURE__*/React.createElement(CheckCircle, {
    className: "w-3.5 h-3.5"
  }), isMastered ? 'Đã thuộc (+10 XP)' : 'Đánh dấu đã thuộc'), /*#__PURE__*/React.createElement("button", {
    onClick: e => {
      e.stopPropagation();
      speakText(currentWord.hanzi, muted);
    },
    className: "p-2 rounded-full hover:bg-red-500/10 text-red-500 transition"
  }, /*#__PURE__*/React.createElement(Volume2, {
    className: "w-5 h-5"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "my-auto py-6 space-y-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-6xl sm:text-7xl font-black tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-amber-500 to-orange-500"
  }, currentWord.hanzi), flipped ? /*#__PURE__*/React.createElement("div", {
    className: "space-y-3 animate-fadeIn"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-xl font-bold text-amber-500 tracking-wide"
  }, "[", currentWord.pinyin, "]"), /*#__PURE__*/React.createElement("div", {
    className: "text-2xl font-extrabold text-emerald-400"
  }, currentWord.meaning), /*#__PURE__*/React.createElement("div", {
    className: `mt-4 pt-4 border-t text-xs sm:text-sm italic ${darkMode ? 'border-slate-800 text-slate-400' : 'border-slate-200 text-slate-600'}`
  }, "\"", currentWord.sentence, "\"", /*#__PURE__*/React.createElement("div", {
    className: "not-italic text-xs font-medium text-slate-500 mt-1"
  }, "(", currentWord.translation, ")"))) : /*#__PURE__*/React.createElement("div", {
    className: "text-sm text-slate-500 font-medium tracking-wider uppercase"
  }, "Click \u0111\u1EC3 l\u1EADt th\u1EBB")), /*#__PURE__*/React.createElement("div", {
    className: "text-xs text-slate-500"
  }, "+5 XP khi xem t\u1EEB ti\u1EBFp theo")), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-4"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: handlePrev,
    className: `flex-1 py-3 rounded-xl font-bold transition text-sm ${darkMode ? 'bg-slate-800 hover:bg-slate-700' : 'bg-slate-200 hover:bg-slate-300'}`
  }, "Tr\u01B0\u1EDBc"), /*#__PURE__*/React.createElement("button", {
    onClick: handleNext,
    className: "flex-1 py-3 rounded-xl font-bold bg-gradient-to-r from-red-600 to-amber-500 hover:opacity-90 text-white transition text-sm shadow-lg shadow-red-500/20"
  }, "Ti\u1EBFp Theo")));
}

// ==========================================
// 3. QUIZ QUEST MODE
// ==========================================
function QuizQuestView({
  words,
  onBack,
  darkMode,
  muted,
  onGainXp,
  updateHighScore
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hearts, setHearts] = useState(3);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const currentWord = words[currentIndex];
  const options = useMemo(() => {
    if (!currentWord) return [];
    const wrong = words.filter(w => w.id !== currentWord.id);
    const shuffledWrong = [...wrong].sort(() => 0.5 - Math.random()).slice(0, 3);
    return [...shuffledWrong, currentWord].sort(() => 0.5 - Math.random());
  }, [currentIndex, words]);
  const handleSelect = option => {
    if (isAnswered) return;
    setSelectedOption(option);
    setIsAnswered(true);
    if (option.id === currentWord.id) {
      if (!muted) sfx.correct();
      const newScore = score + 10;
      setScore(newScore);
      onGainXp(15);
      updateHighScore(newScore);
    } else {
      if (!muted) sfx.wrong();
      setHearts(h => {
        const nextH = h - 1;
        if (nextH <= 0) setGameOver(true);
        return nextH;
      });
    }
  };
  const handleNextQuestion = () => {
    if (!muted) sfx.click();
    setIsAnswered(false);
    setSelectedOption(null);
    if (currentIndex < words.length - 1) {
      setCurrentIndex(c => c + 1);
    } else {
      setGameOver(true);
    }
  };
  const resetGame = () => {
    setCurrentIndex(0);
    setHearts(3);
    setScore(0);
    setGameOver(false);
    setIsAnswered(false);
    setSelectedOption(null);
  };
  if (gameOver) {
    return /*#__PURE__*/React.createElement("div", {
      className: `max-w-md mx-auto p-8 rounded-3xl border text-center space-y-6 ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`
    }, /*#__PURE__*/React.createElement("div", {
      className: "w-16 h-16 bg-amber-500/10 text-amber-500 rounded-full flex items-center justify-center mx-auto"
    }, hearts > 0 ? /*#__PURE__*/React.createElement(Trophy, {
      className: "w-8 h-8"
    }) : /*#__PURE__*/React.createElement(AlertCircle, {
      className: "w-8 h-8 text-red-500"
    })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", {
      className: "text-2xl font-black"
    }, hearts > 0 ? 'Thành Công Rực Rỡ!' : 'Hết Trái Tim Rồi!'), /*#__PURE__*/React.createElement("p", {
      className: "text-xs text-slate-400 mt-1"
    }, "B\u1EA1n \u0111\xE3 ho\xE0n th\xE0nh th\u1EED th\xE1ch Quiz Quest.")), /*#__PURE__*/React.createElement("div", {
      className: "bg-slate-800/40 p-4 rounded-2xl flex justify-around"
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      className: "text-xs text-slate-400"
    }, "\u0110i\u1EC3m s\u1ED1"), /*#__PURE__*/React.createElement("div", {
      className: "text-xl font-extrabold text-amber-400"
    }, score)), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      className: "text-xs text-slate-400"
    }, "XP Nh\u1EADn \u0111\u01B0\u1EE3c"), /*#__PURE__*/React.createElement("div", {
      className: "text-xl font-extrabold text-emerald-400"
    }, "+", Math.round(score * 1.5)))), /*#__PURE__*/React.createElement("div", {
      className: "flex gap-3"
    }, /*#__PURE__*/React.createElement("button", {
      onClick: onBack,
      className: `flex-1 py-3 rounded-xl font-bold text-sm ${darkMode ? 'bg-slate-800 hover:bg-slate-700' : 'bg-slate-200 hover:bg-slate-300'}`
    }, "Quay l\u1EA1i Hub"), /*#__PURE__*/React.createElement("button", {
      onClick: resetGame,
      className: "flex-1 py-3 rounded-xl font-bold text-sm bg-red-600 hover:bg-red-500 text-white"
    }, "Th\u1EED l\u1EA1i")));
  }
  return /*#__PURE__*/React.createElement("div", {
    className: "max-w-xl mx-auto space-y-6"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: onBack,
    className: `px-3 py-1.5 rounded-lg text-sm font-semibold ${darkMode ? 'bg-slate-800' : 'bg-slate-200'}`
  }, "\u2190 Quay l\u1EA1i"), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-1"
  }, [1, 2, 3].map(h => /*#__PURE__*/React.createElement(Heart, {
    key: h,
    className: `w-6 h-6 transition-transform ${h <= hearts ? 'text-red-500 fill-red-500 scale-100' : 'text-slate-600 scale-90 opacity-40'}`
  })))), /*#__PURE__*/React.createElement("div", {
    className: `p-8 rounded-3xl border text-center relative ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-xs font-bold text-slate-400 uppercase tracking-widest"
  }, "T\u1EEB v\u1EF1ng #", currentIndex + 1), /*#__PURE__*/React.createElement("div", {
    className: "text-5xl sm:text-6xl font-black text-red-500 my-4 flex items-center justify-center gap-3"
  }, currentWord.hanzi, /*#__PURE__*/React.createElement("button", {
    onClick: () => speakText(currentWord.hanzi, muted),
    className: "p-2 rounded-full hover:bg-red-500/10 text-slate-400 hover:text-red-500 transition"
  }, /*#__PURE__*/React.createElement(Volume2, {
    className: "w-6 h-6"
  }))), /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-slate-400"
  }, "Ch\u1ECDn ngh\u0129a chu\u1EA9n x\xE1c nh\u1EA5t:")), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-1 sm:grid-cols-2 gap-3"
  }, options.map(opt => {
    let stateStyle = darkMode ? 'bg-slate-900 border-slate-800 hover:border-slate-700' : 'bg-white border-slate-200 hover:border-slate-300';
    if (isAnswered) {
      if (opt.id === currentWord.id) {
        stateStyle = 'bg-emerald-500/20 border-emerald-500 text-emerald-400 font-bold';
      } else if (selectedOption?.id === opt.id) {
        stateStyle = 'bg-red-500/20 border-red-500 text-red-400 font-bold';
      }
    }
    return /*#__PURE__*/React.createElement("button", {
      key: opt.id,
      disabled: isAnswered,
      onClick: () => handleSelect(opt),
      className: `p-4 rounded-2xl border text-left transition-all text-sm flex items-center justify-between ${stateStyle}`
    }, /*#__PURE__*/React.createElement("span", null, opt.meaning, " ", /*#__PURE__*/React.createElement("span", {
      className: "text-xs opacity-60"
    }, "(", opt.pinyin, ")")), isAnswered && opt.id === currentWord.id && /*#__PURE__*/React.createElement(Check, {
      className: "w-5 h-5 text-emerald-500"
    }), isAnswered && selectedOption?.id === opt.id && opt.id !== currentWord.id && /*#__PURE__*/React.createElement(X, {
      className: "w-5 h-5 text-red-500"
    }));
  })), isAnswered && /*#__PURE__*/React.createElement("button", {
    onClick: handleNextQuestion,
    className: "w-full py-3.5 rounded-xl font-bold bg-gradient-to-r from-red-600 to-amber-500 text-white shadow-lg shadow-red-500/20 animate-bounce"
  }, "C\xE2u Ti\u1EBFp Theo \u2192"));
}

// ==========================================
// 4. WORD MATCH MODE
// ==========================================
function WordMatchView({
  words,
  onBack,
  darkMode,
  muted,
  onGainXp,
  updateHighScore
}) {
  const [gridItems, setGridItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [matchedIds, setMatchedIds] = useState([]);
  const [score, setScore] = useState(0);
  useEffect(() => {
    const selectedSub = [...words].sort(() => 0.5 - Math.random()).slice(0, 6);
    const hanziList = selectedSub.map(w => ({
      id: w.id,
      type: 'hanzi',
      val: w.hanzi,
      pinyin: w.pinyin
    }));
    const meaningList = selectedSub.map(w => ({
      id: w.id,
      type: 'meaning',
      val: w.meaning
    }));
    setGridItems([...hanziList, ...meaningList].sort(() => 0.5 - Math.random()));
  }, [words]);
  const handleCardClick = item => {
    if (matchedIds.includes(item.id)) return;
    if (!selectedItem) {
      if (!muted) sfx.click();
      setSelectedItem(item);
      return;
    }
    if (selectedItem.type === item.type) {
      setSelectedItem(item);
      return;
    }
    if (selectedItem.id === item.id) {
      if (!muted) sfx.correct();
      setMatchedIds(prev => [...prev, item.id]);
      const newScore = score + 20;
      setScore(newScore);
      onGainXp(20);
      updateHighScore(newScore);
      setSelectedItem(null);
    } else {
      if (!muted) sfx.wrong();
      setSelectedItem(null);
    }
  };
  const isCompleted = matchedIds.length === 6;
  return /*#__PURE__*/React.createElement("div", {
    className: "max-w-2xl mx-auto space-y-6"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: onBack,
    className: `px-3 py-1.5 rounded-lg text-sm font-semibold ${darkMode ? 'bg-slate-800' : 'bg-slate-200'}`
  }, "\u2190 Quay l\u1EA1i"), /*#__PURE__*/React.createElement("span", {
    className: "text-xs font-semibold text-slate-400"
  }, "\u0110\xE3 gh\xE9p: ", matchedIds.length, " / 6 C\u1EB7p")), /*#__PURE__*/React.createElement("div", {
    className: "text-center"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "text-xl font-bold"
  }, "Gh\xE9p Ch\u1EEF H\xE1n & Ti\u1EBFng Vi\u1EC7t"), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-slate-400 mt-1"
  }, "N\u1ED1i \u0111\xFAng c\xE1c \xF4 t\u01B0\u01A1ng \u1EE9ng.")), isCompleted ? /*#__PURE__*/React.createElement("div", {
    className: `p-8 rounded-3xl border text-center space-y-4 ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`
  }, /*#__PURE__*/React.createElement("div", {
    className: "w-16 h-16 bg-emerald-500/10 text-emerald-500 rounded-full flex items-center justify-center mx-auto"
  }, /*#__PURE__*/React.createElement(Sparkles, {
    className: "w-8 h-8"
  })), /*#__PURE__*/React.createElement("h4", {
    className: "text-2xl font-black"
  }, "Xu\u1EA5t S\u1EAFc! Ho\xE0n Th\xE0nh Gh\xE9p T\u1EEB!"), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-slate-400"
  }, "+120 XP th\u01B0\u1EDFng \u0111\xE3 \u0111\u01B0\u1EE3c c\u1ED9ng."), /*#__PURE__*/React.createElement("button", {
    onClick: onBack,
    className: "px-6 py-3 rounded-xl font-bold bg-gradient-to-r from-red-600 to-amber-500 text-white"
  }, "Tr\u1EDF V\u1EC1 Trang Ch\u1EE7")) : /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-3 sm:grid-cols-4 gap-3"
  }, gridItems.map((item, idx) => {
    const isMatched = matchedIds.includes(item.id);
    const isSelected = selectedItem?.val === item.val;
    let cardStyle = darkMode ? 'bg-slate-900 border-slate-800 hover:border-slate-700' : 'bg-white border-slate-200 hover:border-slate-300';
    if (isMatched) {
      cardStyle = 'bg-emerald-500/10 border-emerald-500/30 opacity-30 pointer-events-none';
    } else if (isSelected) {
      cardStyle = 'bg-amber-500/20 border-amber-500 scale-95 ring-2 ring-amber-500/50';
    }
    return /*#__PURE__*/React.createElement("button", {
      key: idx,
      onClick: () => handleCardClick(item),
      className: `p-4 min-h-[90px] rounded-2xl border flex flex-col items-center justify-center transition-all ${cardStyle}`
    }, /*#__PURE__*/React.createElement("span", {
      className: `font-bold text-center ${item.type === 'hanzi' ? 'text-2xl text-red-500' : 'text-sm'}`
    }, item.val), item.pinyin && /*#__PURE__*/React.createElement("span", {
      className: "text-[10px] text-slate-400 mt-1"
    }, item.pinyin));
  })));
}

// ==========================================
// 5. SPEED RUN TIME ATTACK MODE (30 SECONDS)
// ==========================================
function SpeedRunView({
  words,
  onBack,
  darkMode,
  muted,
  onGainXp,
  highScore,
  updateHighScore
}) {
  const [timeLeft, setTimeLeft] = useState(30);
  const [score, setScore] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [isEnded, setIsEnded] = useState(false);
  const currentWord = words[currentIndex % words.length];
  const options = useMemo(() => {
    if (!currentWord) return [];
    const wrong = words.filter(w => w.id !== currentWord.id);
    const shuffledWrong = [...wrong].sort(() => 0.5 - Math.random()).slice(0, 3);
    return [...shuffledWrong, currentWord].sort(() => 0.5 - Math.random());
  }, [currentIndex, words]);
  useEffect(() => {
    let timer = null;
    if (isActive && timeLeft > 0) {
      timer = setInterval(() => setTimeLeft(t => t - 1), 1000);
    } else if (timeLeft === 0 && isActive) {
      setIsActive(false);
      setIsEnded(true);
      updateHighScore(score);
    }
    return () => clearInterval(timer);
  }, [isActive, timeLeft, score, updateHighScore]);
  const startSpeedRun = () => {
    if (!muted) sfx.click();
    setTimeLeft(30);
    setScore(0);
    setCurrentIndex(0);
    setIsActive(true);
    setIsEnded(false);
  };
  const handleAnswer = opt => {
    if (!isActive) return;
    if (opt.id === currentWord.id) {
      if (!muted) sfx.correct();
      const newScore = score + 20;
      setScore(newScore);
      onGainXp(10);
    } else {
      if (!muted) sfx.wrong();
    }
    setCurrentIndex(c => c + 1);
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "max-w-xl mx-auto space-y-6"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: onBack,
    className: `px-3 py-1.5 rounded-lg text-sm font-semibold ${darkMode ? 'bg-slate-800' : 'bg-slate-200'}`
  }, "\u2190 Quay l\u1EA1i"), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2 text-xs font-bold text-amber-500"
  }, /*#__PURE__*/React.createElement(Trophy, {
    className: "w-4 h-4"
  }), " K\u1EF7 L\u1EE5c: ", highScore)), !isActive && !isEnded && /*#__PURE__*/React.createElement("div", {
    className: `p-8 rounded-3xl border text-center space-y-6 ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`
  }, /*#__PURE__*/React.createElement("div", {
    className: "w-16 h-16 bg-purple-500/10 text-purple-500 rounded-full flex items-center justify-center mx-auto"
  }, /*#__PURE__*/React.createElement(Timer, {
    className: "w-8 h-8"
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", {
    className: "text-2xl font-black"
  }, "Speed Run 30s Attack"), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-slate-400 mt-1"
  }, "Tr\u1EA3 l\u1EDDi c\xE0ng nhi\u1EC1u t\u1EEB v\u1EF1ng \u0111\xFAng c\xE0ng t\u1ED1t trong 30 gi\xE2y!")), /*#__PURE__*/React.createElement("button", {
    onClick: startSpeedRun,
    className: "w-full py-4 rounded-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg"
  }, "S\u1EB5n S\xE0ng? B\u1EAFt \u0110\u1EA7u!")), isActive && /*#__PURE__*/React.createElement("div", {
    className: "space-y-6"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2 text-xl font-black text-purple-400"
  }, /*#__PURE__*/React.createElement(Timer, {
    className: "w-6 h-6 animate-spin"
  }), " ", timeLeft, "s"), /*#__PURE__*/React.createElement("div", {
    className: "text-2xl font-black text-amber-400"
  }, score, " \u0110i\u1EC3m")), /*#__PURE__*/React.createElement("div", {
    className: `p-8 rounded-3xl border text-center ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-6xl font-black text-red-500 mb-2"
  }, currentWord.hanzi), /*#__PURE__*/React.createElement("div", {
    className: "text-sm font-bold text-amber-500"
  }, "[", currentWord.pinyin, "]")), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-2 gap-3"
  }, options.map(opt => /*#__PURE__*/React.createElement("button", {
    key: opt.id,
    onClick: () => handleAnswer(opt),
    className: `p-4 rounded-2xl border text-center font-bold text-sm transition hover:scale-105 ${darkMode ? 'bg-slate-900 border-slate-800 hover:border-purple-500' : 'bg-white border-slate-200 hover:border-purple-500'}`
  }, opt.meaning)))), isEnded && /*#__PURE__*/React.createElement("div", {
    className: `p-8 rounded-3xl border text-center space-y-6 ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`
  }, /*#__PURE__*/React.createElement("h3", {
    className: "text-3xl font-black text-amber-400"
  }, "H\u1EBFt Gi\u1EDD!"), /*#__PURE__*/React.createElement("div", {
    className: "text-lg"
  }, "T\u1ED5ng \u0111i\u1EC3m c\u1EE7a b\u1EA1n: ", /*#__PURE__*/React.createElement("span", {
    className: "font-extrabold text-2xl text-emerald-400"
  }, score)), /*#__PURE__*/React.createElement("button", {
    onClick: startSpeedRun,
    className: "w-full py-3.5 rounded-xl font-bold bg-purple-600 text-white"
  }, "Ch\u01A1i L\u1EA1i")));
}

// ==========================================
// 6. STATS & PROGRESS MODAL
// ==========================================
function StatsModal({
  darkMode,
  onClose,
  xp,
  playerLevel,
  streak,
  masteredCount,
  highScores,
  title
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn"
  }, /*#__PURE__*/React.createElement("div", {
    className: `w-full max-w-md p-6 rounded-3xl border space-y-6 ${darkMode ? 'bg-slate-900 border-slate-800 text-slate-100' : 'bg-white border-slate-200 text-slate-800'}`
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between border-b pb-4 border-slate-700/50"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-3"
  }, /*#__PURE__*/React.createElement("div", {
    className: "p-2.5 bg-amber-500/10 text-amber-500 rounded-2xl"
  }, /*#__PURE__*/React.createElement(Award, {
    className: "w-6 h-6"
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", {
    className: "font-extrabold text-lg"
  }, "H\u1ED3 S\u01A1 Hi\u1EC7p S\u0129"), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-slate-400"
  }, title))), /*#__PURE__*/React.createElement("button", {
    onClick: onClose,
    className: "p-2 text-slate-400 hover:text-white"
  }, /*#__PURE__*/React.createElement(X, {
    className: "w-5 h-5"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-2 gap-3 text-center"
  }, /*#__PURE__*/React.createElement("div", {
    className: "p-4 rounded-2xl bg-slate-800/40 border border-slate-700/50"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-xs text-slate-400 mb-1"
  }, "C\u1EA5p \u0110\u1ED9 Player"), /*#__PURE__*/React.createElement("div", {
    className: "text-2xl font-black text-amber-400"
  }, "LV.", playerLevel)), /*#__PURE__*/React.createElement("div", {
    className: "p-4 rounded-2xl bg-slate-800/40 border border-slate-700/50"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-xs text-slate-400 mb-1"
  }, "Kinh Nghi\u1EC7m"), /*#__PURE__*/React.createElement("div", {
    className: "text-2xl font-black text-emerald-400"
  }, xp, " XP")), /*#__PURE__*/React.createElement("div", {
    className: "p-4 rounded-2xl bg-slate-800/40 border border-slate-700/50"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-xs text-slate-400 mb-1"
  }, "Chu\u1ED7i H\u1ECDc (Streak)"), /*#__PURE__*/React.createElement("div", {
    className: "text-2xl font-black text-orange-400"
  }, streak, " Ng\xE0y")), /*#__PURE__*/React.createElement("div", {
    className: "p-4 rounded-2xl bg-slate-800/40 border border-slate-700/50"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-xs text-slate-400 mb-1"
  }, "T\u1EEB \u0110\xE3 Thu\u1ED9c"), /*#__PURE__*/React.createElement("div", {
    className: "text-2xl font-black text-blue-400"
  }, masteredCount, " T\u1EEB"))), /*#__PURE__*/React.createElement("div", {
    className: "space-y-2 border-t pt-4 border-slate-700/50"
  }, /*#__PURE__*/React.createElement("h4", {
    className: "text-xs font-bold uppercase tracking-wider text-slate-400 mb-2"
  }, "K\u1EF7 L\u1EE5c Mini Game"), /*#__PURE__*/React.createElement("div", {
    className: "flex justify-between text-xs py-1.5 border-b border-slate-800"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-slate-400"
  }, "Speed Run 30s:"), /*#__PURE__*/React.createElement("span", {
    className: "font-bold text-amber-400"
  }, highScores.speedrun || 0, " \u0111i\u1EC3m")), /*#__PURE__*/React.createElement("div", {
    className: "flex justify-between text-xs py-1.5 border-b border-slate-800"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-slate-400"
  }, "Quiz Quest:"), /*#__PURE__*/React.createElement("span", {
    className: "font-bold text-amber-400"
  }, highScores.quiz || 0, " \u0111i\u1EC3m")), /*#__PURE__*/React.createElement("div", {
    className: "flex justify-between text-xs py-1.5"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-slate-400"
  }, "Gh\xE9p T\u1EEB:"), /*#__PURE__*/React.createElement("span", {
    className: "font-bold text-amber-400"
  }, highScores.match || 0, " \u0111i\u1EC3m"))), /*#__PURE__*/React.createElement("button", {
    onClick: onClose,
    className: "w-full py-3 rounded-xl font-bold bg-slate-800 hover:bg-slate-700 text-sm"
  }, "\u0110\xF3ng")));
}