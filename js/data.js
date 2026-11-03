// Dữ liệu nội dung ôn tập HSK 3 - Bài 2: 他什么时候回来 (Khi nào anh ấy trở về?)

export const VOCABULARY = [
  { hz: '腿', py: 'tuǐ', vi: 'chân' },
  { hz: '疼', py: 'téng', vi: 'đau' },
  { hz: '脚', py: 'jiǎo', vi: 'bàn chân' },
  { hz: '树', py: 'shù', vi: 'cây' },
  { hz: '容易', py: 'róngyì', vi: 'dễ' },
  { hz: '难', py: 'nán', vi: 'khó' },
  { hz: '太太', py: 'tàitai', vi: 'bà, vợ' },
  { hz: '秘书', py: 'mìshū', vi: 'thư ký' },
  { hz: '经理', py: 'jīnglǐ', vi: 'quản lý' },
  { hz: '办公室', py: 'bàngōngshì', vi: 'văn phòng' },
  { hz: '出去', py: 'chūqù', vi: 'đi ra ngoài' },
  { hz: '回来', py: 'huílái', vi: 'trở về' },
  { hz: '办事', py: 'bàn shì', vi: 'làm việc' },
  { hz: '告诉', py: 'gàosu', vi: 'nói, báo cho' },
  { hz: '打电话', py: 'dǎ diànhuà', vi: 'gọi điện thoại' },
  { hz: '胖', py: 'pàng', vi: 'béo, mập' },
  { hz: '运动', py: 'yùndòng', vi: 'vận động' },
  { hz: '瘦', py: 'shòu', vi: 'gầy' },
  { hz: '以前', py: 'yǐqián', vi: 'trước đây' },
  { hz: '一直', py: 'yìzhí', vi: 'luôn luôn, suốt' }
];

export const LEVEL_2_QUESTIONS = [
  {
    q: '小丽为什么要休息？',
    sub: 'Vì sao Tiểu Lệ muốn nghỉ?',
    options: ['腿和脚都疼', '她饿了', '她要打电话', '天黑了'],
    answer: 0
  },
  {
    q: '小刚说：上山___，下山难。',
    sub: 'Tiểu Cương nói: Lên núi..., xuống núi khó.',
    options: ['难', '容易', '累', '疼'],
    answer: 1
  },
  {
    q: '他们去哪儿坐一下？',
    sub: 'Họ đi đâu ngồi một lát?',
    options: ['办公室', '那边树多的地方', '山上', '书店'],
    answer: 1
  },
  {
    q: '周明是做什么的？',
    sub: 'Chu Minh làm nghề gì?',
    options: ['秘书', '老师', '经理', '医生'],
    answer: 2
  },
  {
    q: '周经理什么时候回来？',
    sub: 'Giám đốc Chu khi nào về?',
    options: ['上午', '晚上', '明天', '下午'],
    answer: 3
  },
  {
    q: '「秘书」nghĩa là gì?',
    sub: 'Chọn nghĩa đúng của từ:',
    options: ['quản lý', 'thư ký', 'văn phòng', 'bà, vợ'],
    answer: 1
  },
  {
    q: '「打电话」đọc là?',
    sub: 'Phiên âm pinyin đúng:',
    options: ['dǎ diànhuà', 'chūqù', 'bàn shì', 'gàosu'],
    answer: 0
  },
  {
    q: 'Trái nghĩa của 胖 là?',
    sub: 'Từ trái nghĩa với 胖 (béo):',
    options: ['难', '疼', '瘦', '累'],
    answer: 2
  }
];

export const LEVEL_3_QUESTIONS = [
  {
    q: '他到了办公室我___告诉他。',
    sub: 'Ngữ pháp: ...vừa đến... thì...',
    options: ['就', '才', '也', '还'],
    answer: 0
  },
  {
    q: '妈妈起___床就做早饭。',
    sub: 'Ngữ pháp: Động từ + 了... 就...',
    options: ['过', '了', '着', '的'],
    answer: 1
  },
  {
    q: '老师进教室___了。',
    sub: 'Thầy giáo đi vào lớp (hướng về phía người nói)',
    options: ['去', '来', '到', '在'],
    answer: 1
  },
  {
    q: '他回___去了。',
    sub: 'Anh ấy về nhà rồi (rời xa người nói)',
    options: ['家', '来', '了', '就'],
    answer: 0
  },
  {
    q: '你说我___不去吗？',
    sub: 'Câu phản vấn: Bạn nói xem tôi có thể không đi sao?',
    options: ['会', '要', '能', '想'],
    answer: 2
  },
  {
    q: '你下了课我们___去书店。',
    sub: 'Bạn tan học thì chúng ta lập tức đi hiệu sách',
    options: ['才', '就', '都', '再'],
    answer: 1
  },
  {
    q: '我们上楼___吧。',
    sub: 'Chúng ta lên lầu đi (hướng rời xa người nói)',
    options: ['来', '去', '了', '吗'],
    answer: 1
  },
  {
    q: '他一直运动，现在很___了。',
    sub: 'Anh ấy vận động suốt, giờ đã gầy rồi',
    options: ['瘦', '胖', '疼', '难'],
    answer: 0
  }
];

export const LEVEL_4_QUESTIONS = [
  {
    vi: 'Anh ấy khi nào trở về?',
    parts: ['他', '什么时候', '回来', '？']
  },
  {
    vi: 'Tôi bây giờ chân cũng đau.',
    parts: ['我', '现在', '腿', '也', '疼', '。']
  },
  {
    vi: 'Lên núi dễ, xuống núi khó.',
    parts: ['上山', '容易', '，', '下山', '难', '。']
  },
  {
    vi: 'Giám đốc Chu đi ra ngoài rồi.',
    parts: ['周经理', '出去', '了', '。']
  },
  {
    vi: 'Anh ấy đến văn phòng tôi sẽ báo anh ấy ngay.',
    parts: ['他', '到了', '办公室', '我', '就', '告诉', '他', '。']
  },
  {
    vi: 'Về rồi thì bảo anh ấy gọi điện cho tôi.',
    parts: ['回来了', '就', '让', '他', '给我', '打个电话', '。']
  }
];

export const LEVELS = [
  {
    n: 1,
    title: 'Nối từ vựng',
    img: './assets/lv1.png',
    desc: 'Chữ Hán ↔ Pinyin/Nghĩa'
  },
  {
    n: 2,
    title: 'Chọn đáp án',
    img: './assets/lv2.png',
    desc: 'Trắc nghiệm bài khóa'
  },
  {
    n: 3,
    title: 'Điền từ',
    img: './assets/lv3.png',
    desc: 'Ngữ pháp 来/去, 了…就, 能…吗'
  },
  {
    n: 4,
    title: 'Dịch câu',
    img: './assets/lv4.png',
    desc: 'Ghép từ thành câu'
  }
];

export function shuffle(array) {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}
