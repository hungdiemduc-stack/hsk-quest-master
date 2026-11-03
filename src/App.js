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
    hanzi: '不客气',
    pinyin: 'bú kè qi',
    meaning: 'Đừng khách sáo',
    sentence: '不用谢，不客气！',
    translation: 'Không có chi, đừng khách sáo!'
  }, {
    id: 'h1_4',
    hanzi: '再见',
    pinyin: 'zài jiàn',
    meaning: 'Tạm biệt',
    sentence: '明天见，再见！',
    translation: 'Hẹn gặp lại vào ngày mai, tạm biệt!'
  }, {
    id: 'h1_5',
    hanzi: '中国',
    pinyin: 'Zhōng guó',
    meaning: 'Trung Quốc',
    sentence: '我是中国人在学习中文。',
    translation: 'Tôi là người Trung Quốc đang học tiếng Trung.'
  }, {
    id: 'h1_6',
    hanzi: '学习',
    pinyin: 'xué xí',
    meaning: 'Học tập',
    sentence: '我喜欢学习汉语。',
    translation: 'Tôi thích học tiếng Hán.'
  }, {
    id: 'h1_7',
    hanzi: '老师',
    pinyin: 'lǎo shī',
    meaning: 'Thầy/Cô giáo',
    sentence: '王老师是一位好老师。',
    translation: 'Thầy Vương là một giáo viên tốt.'
  }, {
    id: 'h1_8',
    hanzi: '学生',
    pinyin: 'xué sheng',
    meaning: 'Học sinh',
    sentence: '我们都是汉语学生。',
    translation: 'Chúng tôi đều là học sinh tiếng Trung.'
  }, {
    id: 'h1_9',
    hanzi: '朋友',
    pinyin: 'péng you',
    meaning: 'Bạn bè',
    sentence: '他是我的好朋友。',
    translation: 'Cậu ấy là bạn tốt của tôi.'
  }, {
    id: 'h1_10',
    hanzi: '喝水',
    pinyin: 'hē shuǐ',
    meaning: 'Uống nước',
    sentence: '天气很热，多喝水。',
    translation: 'Thời tiết rất nóng, uống nhiều nước nhé.'
  }, {
    id: 'h1_11',
    hanzi: '苹果',
    pinyin: 'píng guǒ',
    meaning: 'Quả táo',
    sentence: '我每天吃一个苹果。',
    translation: 'Mỗi ngày tôi ăn một quả táo.'
  }, {
    id: 'h1_12',
    hanzi: '吃饭',
    pinyin: 'chī fàn',
    meaning: 'Ăn cơm',
    sentence: '你中午想去哪里吃饭？',
    translation: 'Buổi trưa bạn muốn đi đâu ăn cơm?'
  }, {
    id: 'h1_13',
    hanzi: '喝茶',
    pinyin: 'hē chá',
    meaning: 'Uống trà',
    sentence: '中国人很喜欢喝茶。',
    translation: 'Người Trung Quốc rất thích uống trà.'
  }, {
    id: 'h1_14',
    hanzi: '爸爸',
    pinyin: 'bà ba',
    meaning: 'Bố / Ba',
    sentence: '我爸爸是一名医生。',
    translation: 'Bố tôi là một bác sĩ.'
  }, {
    id: 'h1_15',
    hanzi: '妈妈',
    pinyin: 'mā ma',
    meaning: 'Mẹ',
    sentence: '我妈妈做的菜很好吃。',
    translation: 'Món mẹ tôi nấu rất ngon.'
  }, {
    id: 'h1_16',
    hanzi: '家',
    pinyin: 'jiā',
    meaning: 'Nhà / Gia đình',
    sentence: '我家有四口人。',
    translation: 'Nhà tôi có bốn người.'
  }, {
    id: 'h1_17',
    hanzi: '学校',
    pinyin: 'xué xiào',
    meaning: 'Trường học',
    sentence: '我们的学校非常大。',
    translation: 'Trường học của chúng tôi rất lớn.'
  }, {
    id: 'h1_18',
    hanzi: '商店',
    pinyin: 'shāng diàn',
    meaning: 'Cửa hàng',
    sentence: '我去商店买点东西。',
    translation: 'Tôi đi cửa hàng mua chút đồ.'
  }, {
    id: 'h1_19',
    hanzi: '医院',
    pinyin: 'yī yuàn',
    meaning: 'Bệnh viện',
    sentence: '医院离这里不太远。',
    translation: 'Bệnh viện cách đây không xa lắm.'
  }, {
    id: 'h1_20',
    hanzi: '医生',
    pinyin: 'yī shēng',
    meaning: 'Bác sĩ',
    sentence: '李医生工作很认真。',
    translation: 'Bác sĩ Lý làm việc rất tận tâm.'
  }, {
    id: 'h1_21',
    hanzi: '今天',
    pinyin: 'jīn tiān',
    meaning: 'Hôm nay',
    sentence: '今天天气非常好。',
    translation: 'Hôm nay thời tiết rất đẹp.'
  }, {
    id: 'h1_22',
    hanzi: '明天',
    pinyin: 'míng tiān',
    meaning: 'Ngày mai',
    sentence: '明天你有时间吗？',
    translation: 'Ngày mai bạn có thời gian không?'
  }, {
    id: 'h1_23',
    hanzi: '昨天',
    pinyin: 'zuó tiān',
    meaning: 'Hôm qua',
    sentence: '昨天我去了图书馆。',
    translation: 'Hôm qua tôi đã đi thư viện.'
  }, {
    id: 'h1_24',
    hanzi: '年',
    pinyin: 'nián',
    meaning: 'Năm',
    sentence: '我学汉语一年了。',
    translation: 'Tôi đã học tiếng Trung được một năm.'
  }, {
    id: 'h1_25',
    hanzi: '月',
    pinyin: 'yuè',
    meaning: 'Tháng',
    sentence: '下个月我要回国。',
    translation: 'Tháng sau tôi sẽ về nước.'
  }, {
    id: 'h1_26',
    hanzi: '星期',
    pinyin: 'xīng qī',
    meaning: 'Tuần / Thứ',
    sentence: '这个星期天我们去公园吧。',
    translation: 'Chủ nhật tuần này chúng ta đi công viên nhé.'
  }, {
    id: 'h1_27',
    hanzi: '喜欢',
    pinyin: 'xǐ huan',
    meaning: 'Thích',
    sentence: '我很喜欢中国菜。',
    translation: 'Tôi rất thích món ăn Trung Quốc.'
  }, {
    id: 'h1_28',
    hanzi: '看书',
    pinyin: 'kàn shū',
    meaning: 'Đọc sách',
    sentence: '他正在房间里看书。',
    translation: 'Anh ấy đang đọc sách trong phòng.'
  }, {
    id: 'h1_29',
    hanzi: '听音乐',
    pinyin: 'tīng yīn yuè',
    meaning: 'Nghe nhạc',
    sentence: '休息时我常听音乐。',
    translation: 'Lúc nghỉ ngơi tôi thường nghe nhạc.'
  }, {
    id: 'h1_30',
    hanzi: '名字',
    pinyin: 'míng zi',
    meaning: 'Tên',
    sentence: '请问，你叫什么名字？',
    translation: 'Xin hỏi, bạn tên là gì?'
  }, {
    id: 'h1_31',
    hanzi: '认识',
    pinyin: 'rèn shi',
    meaning: 'Quen biết',
    sentence: '认识你很高兴！',
    translation: 'Rất vui được làm quen với bạn!'
  }, {
    id: 'h1_32',
    hanzi: '高兴',
    pinyin: 'gāo xìng',
    meaning: 'Vui vẻ',
    sentence: '今天大家都很高兴。',
    translation: 'Hôm nay mọi người đều rất vui.'
  }, {
    id: 'h1_33',
    hanzi: '多少',
    pinyin: 'duō shao',
    meaning: 'Bao nhiêu',
    sentence: '这个手机多少钱？',
    translation: 'Chiếc điện thoại này bao nhiêu tiền?'
  }, {
    id: 'h1_34',
    hanzi: '几点',
    pinyin: 'jǐ diǎn',
    meaning: 'Mấy giờ',
    sentence: '现在是几点？',
    translation: 'Bây giờ là mấy giờ rồi?'
  }, {
    id: 'h1_35',
    hanzi: '分钟',
    pinyin: 'fēn zhōng',
    meaning: 'Phút',
    sentence: '等我五分钟。',
    translation: 'Đợi tôi năm phút.'
  }, {
    id: 'h1_36',
    hanzi: '漂亮',
    pinyin: 'piào liang',
    meaning: 'Xinh đẹp',
    sentence: '这件衣服真漂亮！',
    translation: 'Bộ quần áo này thật đẹp!'
  }, {
    id: 'h1_37',
    hanzi: '睡觉',
    pinyin: 'shuì jiào',
    meaning: 'Đi ngủ',
    sentence: '太晚了，快去睡觉吧。',
    translation: 'Muộn quá rồi, mau đi ngủ thôi.'
  }, {
    id: 'h1_38',
    hanzi: '买',
    pinyin: 'mǎi',
    meaning: 'Mua',
    sentence: '你想买什么水果？',
    translation: 'Bạn muốn mua hoa quả gì?'
  }, {
    id: 'h1_39',
    hanzi: '下雨',
    pinyin: 'xià yǔ',
    meaning: 'Trời mưa',
    sentence: '外面正在下雨，带伞吧。',
    translation: 'Bên ngoài đang mưa, mang theo ô nhé.'
  }, {
    id: 'h1_40',
    hanzi: '天气',
    pinyin: 'tiān qì',
    meaning: 'Thời tiết',
    sentence: '明天的天气怎么样？',
    translation: 'Thời tiết ngày mai thế nào?'
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
  }, {
    id: 'h2_9',
    hanzi: '跑步',
    pinyin: 'pǎo bù',
    meaning: 'Chạy bộ',
    sentence: '他每天早晨坚持跑步。',
    translation: 'Anh ấy kiên trì chạy bộ mỗi sáng sớm.'
  }, {
    id: 'h2_10',
    hanzi: '游泳',
    pinyin: 'yóu yǒng',
    meaning: 'Bơi lội',
    sentence: '夏天去游泳最舒服了。',
    translation: 'Mùa hè đi bơi là dễ chịu nhất.'
  }, {
    id: 'h2_11',
    hanzi: '唱歌',
    pinyin: 'chàng gē',
    meaning: 'Hát',
    sentence: '妹妹唱歌非常好听。',
    translation: 'Em gái hát rất hay.'
  }, {
    id: 'h2_12',
    hanzi: '跳舞',
    pinyin: 'tiào wǔ',
    meaning: 'Khiêu vũ / Nhảy',
    sentence: '她从小就喜欢跳舞。',
    translation: 'Cô ấy từ nhỏ đã thích khiêu vũ.'
  }, {
    id: 'h2_13',
    hanzi: '生日',
    pinyin: 'shēng rì',
    meaning: 'Sinh nhật',
    sentence: '祝你生日快乐，心想事成！',
    translation: 'Chúc bạn sinh nhật vui vẻ, vạn sự như ý!'
  }, {
    id: 'h2_14',
    hanzi: '礼物',
    pinyin: 'lǐ wù',
    meaning: 'Quà tặng',
    sentence: '这是我送给你的生日礼物。',
    translation: 'Đây là món quà sinh nhật tôi tặng bạn.'
  }, {
    id: 'h2_15',
    hanzi: '晴天',
    pinyin: 'qíng tiān',
    meaning: 'Ngày nắng',
    sentence: '今天是个晴天，很适合出门。',
    translation: 'Hôm nay là một ngày nắng, rất hợp ra ngoài.'
  }, {
    id: 'h2_16',
    hanzi: '阴天',
    pinyin: 'yīn tiān',
    meaning: 'Trời râm mát / U ám',
    sentence: '外面是阴天，好像要下雨了。',
    translation: 'Bên ngoài trời âm u, hình như sắp mưa rồi.'
  }, {
    id: 'h2_17',
    hanzi: '便宜',
    pinyin: 'pián yi',
    meaning: 'Rẻ',
    sentence: '这家店的东西又好又便宜。',
    translation: 'Đồ của tiệm này vừa tốt vừa rẻ.'
  }, {
    id: 'h2_18',
    hanzi: '贵',
    pinyin: 'guì',
    meaning: 'Đắt',
    sentence: '这件大衣太贵了，不买了。',
    translation: 'Chiếc áo khoác này đắt quá, không mua nữa.'
  }, {
    id: 'h2_19',
    hanzi: '远',
    pinyin: 'yuǎn',
    meaning: 'Xa',
    sentence: '我家离公司比较远。',
    translation: 'Nhà tôi cách công ty tương đối xa.'
  }, {
    id: 'h2_20',
    hanzi: '近',
    pinyin: 'jìn',
    meaning: 'Gần',
    sentence: '学校就在我家附近，很近。',
    translation: 'Trường học ở ngay gần nhà tôi, rất gần.'
  }, {
    id: 'h2_21',
    hanzi: '欢迎',
    pinyin: 'huān yíng',
    meaning: 'Hoan nghênh / Chào đón',
    sentence: '热烈欢迎各位朋友光临！',
    translation: 'Nhiệt liệt chào đón các bạn ghé thăm!'
  }, {
    id: 'h2_22',
    hanzi: '介绍',
    pinyin: 'jiè shào',
    meaning: 'Giới thiệu',
    sentence: '让我向大家介绍一下新同事。',
    translation: 'Để tôi giới thiệu đồng nghiệp mới với mọi người.'
  }, {
    id: 'h2_23',
    hanzi: '懂',
    pinyin: 'dǒng',
    meaning: 'Hiểu',
    sentence: '老师说的话你听懂了吗？',
    translation: 'Lời thầy giáo nói bạn đã hiểu chưa?'
  }, {
    id: 'h2_24',
    hanzi: '问题',
    pinyin: 'wèn tí',
    meaning: 'Câu hỏi / Vấn đề',
    sentence: '这个问题有点复杂。',
    translation: 'Vấn đề này hơi phức tạp một chút.'
  }, {
    id: 'h2_25',
    hanzi: '告诉',
    pinyin: 'gàosu',
    meaning: 'Báo cho / Nói với',
    sentence: '有消息我会立刻告诉你。',
    translation: 'Có tin tức tôi sẽ báo ngay cho bạn.'
  }, {
    id: 'h2_26',
    hanzi: '事情',
    pinyin: 'shì qing',
    meaning: 'Sự việc / Công chuyện',
    sentence: '今天我有几件事情要办。',
    translation: 'Hôm nay tôi có vài việc cần xử lý.'
  }, {
    id: 'h2_27',
    hanzi: '妻子',
    pinyin: 'qī zi',
    meaning: 'Vợ',
    sentence: '他非常爱他的妻子。',
    translation: 'Anh ấy rất yêu thương vợ của mình.'
  }, {
    id: 'h2_28',
    hanzi: '丈夫',
    pinyin: 'zhàng fu',
    meaning: 'Chồng',
    sentence: '她的丈夫是一位工程师。',
    translation: 'Chồng cô ấy là một kỹ sư.'
  }, {
    id: 'h2_29',
    hanzi: '孩子',
    pinyin: 'hái zi',
    meaning: 'Trẻ con / Con cái',
    sentence: '孩子们正在草地上玩耍。',
    translation: 'Lũ trẻ đang nô đùa trên bãi cỏ.'
  }, {
    id: 'h2_30',
    hanzi: '已经',
    pinyin: 'yǐ jīng',
    meaning: 'Đã',
    sentence: '我已经把作业做完了。',
    translation: 'Tôi đã làm xong bài tập về nhà rồi.'
  }, {
    id: 'h2_31',
    hanzi: '开始',
    pinyin: 'kāi shǐ',
    meaning: 'Bắt đầu',
    sentence: '会议从九点正式开始。',
    translation: 'Cuộc họp chính thức bắt đầu từ 9 giờ.'
  }, {
    id: 'h2_32',
    hanzi: '结束',
    pinyin: 'jié shù',
    meaning: 'Kết thúc',
    sentence: '考试什么时候结束？',
    translation: 'Kỳ thi khi nào kết thúc?'
  }, {
    id: 'h2_33',
    hanzi: '正在',
    pinyin: 'zhèng zài',
    meaning: 'Đang',
    sentence: '妈妈正在厨房做晚餐。',
    translation: 'Mẹ đang nấu bữa tối trong bếp.'
  }, {
    id: 'h2_34',
    hanzi: '一起',
    pinyin: 'yì qǐ',
    meaning: 'Cùng nhau',
    sentence: '周末我们一起去看电影吧。',
    translation: 'Cuối tuần chúng ta cùng đi xem phim nhé.'
  }, {
    id: 'h2_35',
    hanzi: '因为',
    pinyin: 'yīn wèi',
    meaning: 'Bởi vì',
    sentence: '因为生病，他今天请假了。',
    translation: 'Bởi vì bị ốm, hôm nay cậu ấy xin nghỉ.'
  }, {
    id: 'h2_36',
    hanzi: '所以',
    pinyin: 'suǒ yǐ',
    meaning: 'Cho nên',
    sentence: '因为下雨，所以我没出门。',
    translation: 'Bởi vì trời mưa, cho nên tôi không ra ngoài.'
  }, {
    id: 'h2_37',
    hanzi: '虽然',
    pinyin: 'suī rán',
    meaning: 'Mặc dù',
    sentence: '虽然很累，但是很开心。',
    translation: 'Tuy rằng rất mệt, nhưng rất vui vẻ.'
  }, {
    id: 'h2_38',
    hanzi: '但是',
    pinyin: 'dàn shì',
    meaning: 'Nhưng',
    sentence: '汉语虽然难，但是很有趣。',
    translation: 'Tiếng Trung tuy khó, nhưng rất thú vị.'
  }, {
    id: 'h2_39',
    hanzi: '房间',
    pinyin: 'fáng jiān',
    meaning: 'Căn phòng',
    sentence: '请把房间打扫干净。',
    translation: 'Xin hãy quét dọn phòng thật sạch sẽ.'
  }, {
    id: 'h2_40',
    hanzi: '铅笔',
    pinyin: 'qiān bǐ',
    meaning: 'Bút chì',
    sentence: '你可以借我一支铅笔吗？',
    translation: 'Bạn có thể cho tôi mượn chiếc bút chì không?'
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
  }, {
    id: 'h3_7',
    hanzi: '腿',
    pinyin: 'tuǐ',
    meaning: 'Chân',
    sentence: '爬了一天的山，腿很酸。',
    translation: 'Leo núi cả ngày, chân rất mỏi.'
  }, {
    id: 'h3_8',
    hanzi: '疼',
    pinyin: 'téng',
    meaning: 'Đau',
    sentence: '我的头有点疼，想休息一下。',
    translation: 'Đầu tôi hơi đau, muốn nghỉ ngơi một chút.'
  }, {
    id: 'h3_9',
    hanzi: '容易',
    pinyin: 'róng yì',
    meaning: 'Dễ dàng',
    sentence: '学好一门外语并不容易。',
    translation: 'Học tốt một ngoại ngữ không hề dễ dàng.'
  }, {
    id: 'h3_10',
    hanzi: '难',
    pinyin: 'nán',
    meaning: 'Khó',
    sentence: '这道题太难了，我不会做。',
    translation: 'Câu đố này khó quá, tôi không biết làm.'
  }, {
    id: 'h3_11',
    hanzi: '经理',
    pinyin: 'jīng lǐ',
    meaning: 'Giám đốc / Quản lý',
    sentence: '周经理今天出差去北京了。',
    translation: 'Giám đốc Chu hôm nay đi công tác Bắc Kinh rồi.'
  }, {
    id: 'h3_12',
    hanzi: '秘书',
    pinyin: 'mì shū',
    meaning: 'Thư ký',
    sentence: '王秘书把日程安排得很妥当。',
    translation: 'Thư ký Vương sắp xếp lịch trình rất chu đáo.'
  }, {
    id: 'h3_13',
    hanzi: '办公室',
    pinyin: 'bàn gōng shì',
    meaning: 'Văn phòng',
    sentence: '请到我的办公室来一趟。',
    translation: 'Xin hãy ghé qua văn phòng tôi một chuyến.'
  }, {
    id: 'h3_14',
    hanzi: '瘦',
    pinyin: 'shòu',
    meaning: 'Gầy',
    sentence: '他最近经常运动，瘦了很多。',
    translation: 'Dạo này anh ấy thường vận động, gầy đi rất nhiều.'
  }, {
    id: 'h3_15',
    hanzi: '胖',
    pinyin: 'pàng',
    meaning: 'Béo / Mập',
    sentence: '吃太多甜食容易发胖。',
    translation: 'Ăn quá nhiều đồ ngọt rất dễ bị béo.'
  }, {
    id: 'h3_16',
    hanzi: '热情',
    pinyin: 'rè qíng',
    meaning: 'Nhiệt tình',
    sentence: '这里的市民对游客非常热情。',
    translation: 'Người dân nơi đây rất nhiệt tình với du khách.'
  }, {
    id: 'h3_17',
    hanzi: '认真',
    pinyin: 'rèn zhēn',
    meaning: 'Nghiêm túc / Chăm chỉ',
    sentence: '他工作一向十分认真。',
    translation: 'Anh ấy làm việc lúc nào cũng hết sức chăm chỉ.'
  }, {
    id: 'h3_18',
    hanzi: '习惯',
    pinyin: 'xí guàn',
    meaning: 'Thói quen / Quen với',
    sentence: '早睡早起是一个好习惯。',
    translation: 'Ngủ sớm dậy sớm là một thói quen tốt.'
  }, {
    id: 'h3_19',
    hanzi: '满意',
    pinyin: 'mǎn yì',
    meaning: 'Hài lòng',
    sentence: '客户对这次的服务很满意。',
    translation: 'Khách hàng rất hài lòng với dịch vụ lần này.'
  }, {
    id: 'h3_20',
    hanzi: '放心',
    pinyin: 'fàng xīn',
    meaning: 'Yên tâm',
    sentence: '你放心吧，事情交给我处理。',
    translation: 'Bạn cứ yên tâm đi, việc cứ giao tôi xử lý.'
  }, {
    id: 'h3_21',
    hanzi: '担心',
    pinyin: 'dān xīn',
    meaning: 'Lo lắng',
    sentence: '别担心，一切都会好起来的。',
    translation: 'Đừng lo lắng, mọi chuyện rồi sẽ ổn cả thôi.'
  }, {
    id: 'h3_22',
    hanzi: '变化',
    pinyin: 'biàn huà',
    meaning: 'Thay đổi / Biến đổi',
    sentence: '这几年家乡发生了巨大变化。',
    translation: 'Mấy năm nay quê hương đã diễn ra biến đổi to lớn.'
  }, {
    id: 'h3_23',
    hanzi: '提高',
    pinyin: 'tí gāo',
    meaning: 'Nâng cao',
    sentence: '我想提高自己的汉语听力水平。',
    translation: 'Tôi muốn nâng cao trình độ nghe tiếng Trung của mình.'
  }, {
    id: 'h3_24',
    hanzi: '水平',
    pinyin: 'shuǐ píng',
    meaning: 'Trình độ',
    sentence: '他的中文水平进步非常快。',
    translation: 'Trình độ tiếng Trung của anh ấy tiến bộ rất nhanh.'
  }, {
    id: 'h3_25',
    hanzi: '借',
    pinyin: 'jiè',
    meaning: 'Mượn / Vay',
    sentence: '我想去图书馆借几本书。',
    translation: 'Tôi muốn đến thư viện mượn vài cuốn sách.'
  }, {
    id: 'h3_26',
    hanzi: '还',
    pinyin: 'huán',
    meaning: 'Trả lại',
    sentence: '借的书一定要按时还给图书馆。',
    translation: 'Sách mượn nhất định phải trả thư viện đúng giờ.'
  }, {
    id: 'h3_27',
    hanzi: '清楚',
    pinyin: 'qīng chu',
    meaning: 'Rõ ràng',
    sentence: '你把具体要求说清楚了吗？',
    translation: 'Bạn đã nói rõ các yêu cầu cụ thể chưa?'
  }, {
    id: 'h3_28',
    hanzi: '奇怪',
    pinyin: 'qí guài',
    meaning: 'Kỳ lạ',
    sentence: '今天他的行为举止有点奇怪。',
    translation: 'Hôm nay hành vi cử chỉ của anh ấy có chút kỳ lạ.'
  }, {
    id: 'h3_29',
    hanzi: '参加',
    pinyin: 'cān jiā',
    meaning: 'Tham gia',
    sentence: '很多人报名参加这次比赛。',
    translation: 'Rất nhiều người đăng ký tham gia cuộc thi này.'
  }, {
    id: 'h3_30',
    hanzi: '会议',
    pinyin: 'huì yì',
    meaning: 'Cuộc họp',
    sentence: '请大家准时参加下午的会议。',
    translation: 'Mời mọi người tham gia cuộc họp buổi chiều đúng giờ.'
  }, {
    id: 'h3_31',
    hanzi: '检查',
    pinyin: 'jiǎn chá',
    meaning: 'Kiểm tra',
    sentence: '交卷前请仔细检查一遍。',
    translation: 'Trước khi nộp bài xin hãy kiểm tra kỹ một lượt.'
  }, {
    id: 'h3_32',
    hanzi: '影响',
    pinyin: 'yǐng xiǎng',
    meaning: 'Ảnh hưởng',
    sentence: '熬夜对身体有很大的不良影响。',
    translation: 'Thức khuya gây ảnh hưởng xấu rất lớn cho sức khỏe.'
  }, {
    id: 'h3_33',
    hanzi: '解决',
    pinyin: 'jiě jué',
    meaning: 'Giải quyết',
    sentence: '我们终于解决了这个棘手难题。',
    translation: 'Chúng tôi cuối cùng đã giải quyết được câu hỏi khó khăn này.'
  }, {
    id: 'h3_34',
    hanzi: '办法',
    pinyin: 'bàn fǎ',
    meaning: 'Biện pháp / Cách',
    sentence: '遇到困难时要多想办法。',
    translation: 'Gặp khó khăn phải nghĩ nhiều phương pháp.'
  }, {
    id: 'h3_35',
    hanzi: '相信',
    pinyin: 'xiāng xìn',
    meaning: 'Tin tưởng',
    sentence: '你要相信自己的潜力和能力。',
    translation: 'Bạn phải tin tưởng vào tiềm năng và năng lực của mình.'
  }, {
    id: 'h3_36',
    hanzi: '突然',
    pinyin: 'tū rán',
    meaning: 'Đột nhiên',
    sentence: '天空突然下起了倾盆大雨。',
    translation: 'Bầu trời đột nhiên đổ cơn mưa rào như trút.'
  }, {
    id: 'h3_37',
    hanzi: '一般',
    pinyin: 'yì bān',
    meaning: 'Bình thường / Phổ biến',
    sentence: '周末我一般喜欢在家里休息。',
    translation: 'Cuối tuần tôi thường thích nghỉ ngơi ở nhà.'
  }, {
    id: 'h3_38',
    hanzi: '特别',
    pinyin: 'tè bié',
    meaning: 'Đặc biệt',
    sentence: '今天这道菜做得特别美味。',
    translation: 'Hôm nay món này làm đặc biệt thơm ngon.'
  }, {
    id: 'h3_39',
    hanzi: '必须',
    pinyin: 'bì xū',
    meaning: 'Bắt buộc / Phải',
    sentence: '每个人都必须遵守交通规则。',
    translation: 'Mỗi người đều bắt buộc phải tuân thủ luật giao thông.'
  }, {
    id: 'h3_40',
    hanzi: '机会',
    pinyin: 'jī huì',
    meaning: 'Cơ hội',
    sentence: '好机会往往留给有准备的人。',
    translation: 'Cơ hội tốt luôn dành cho người có sự chuẩn bị.'
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
  }, {
    id: 'h4_7',
    hanzi: '安排',
    pinyin: 'ān pái',
    meaning: 'Sắp xếp / Bố trí',
    sentence: '领导对项目做出了合理的安排。',
    translation: 'Lãnh đạo đã đưa ra sự sắp xếp hợp lý cho dự án.'
  }, {
    id: 'h4_8',
    hanzi: '丰富',
    pinyin: 'fēng fù',
    meaning: 'Phong phú',
    sentence: '他的课外生活十分丰富多彩。',
    translation: 'Đời sống ngoại khóa của anh ấy vô cùng phong phú đa dạng.'
  }, {
    id: 'h4_9',
    hanzi: '交流',
    pinyin: 'jiāo liú',
    meaning: 'Giao lưu / Trao đổi',
    sentence: '语言是人与人交流的重要工具。',
    translation: 'Ngôn ngữ là công cụ quan trọng để con người giao lưu.'
  }, {
    id: 'h4_10',
    hanzi: '考虑',
    pinyin: 'kǎo lǜ',
    meaning: 'Cân nhắc / Suy nghĩ',
    sentence: '请给我几天时间仔细考虑。',
    translation: 'Xin hãy cho tôi vài ngày để suy nghĩ kỹ càng.'
  }, {
    id: 'h4_11',
    hanzi: '精彩',
    pinyin: 'jīng cǎi',
    meaning: 'Đặc sắc / Tuyệt vời',
    sentence: '今晚的演出真是太精彩了！',
    translation: 'Buổi biểu diễn tối nay thật là tuyệt vời!'
  }, {
    id: 'h4_12',
    hanzi: '过程',
    pinyin: 'guò chéng',
    meaning: 'Quá trình',
    sentence: '享受学习的过程比结果更重要。',
    translation: 'Tận hưởng quá trình học hỏi quan trọng hơn kết quả.'
  }, {
    id: 'h4_13',
    hanzi: '效果',
    pinyin: 'xiào guǒ',
    meaning: 'Hiệu quả',
    sentence: '这种新药的治疗效果非常显著。',
    translation: 'Hiệu quả trị liệu của loại thuốc mới này rất rõ rệt.'
  }, {
    id: 'h4_14',
    hanzi: '鼓励',
    pinyin: 'gǔ lì',
    meaning: 'Khích lệ / Cổ vũ',
    sentence: '老师经常鼓励学生大胆开口表达。',
    translation: 'Thầy giáo thường xuyên khích lệ học sinh mạnh dạn mở lời diễn đạt.'
  }, {
    id: 'h4_15',
    hanzi: '幽默',
    pinyin: 'yōu mò',
    meaning: 'Hài hước',
    sentence: '他是一个充满幽默感的人。',
    translation: 'Anh ấy là một người đầy sự hài hước.'
  }, {
    id: 'h4_16',
    hanzi: '骄傲',
    pinyin: 'jiāo ào',
    meaning: 'Tự hào / Kiêu ngạo',
    sentence: '父母为孩子的优异成绩感到骄傲。',
    translation: 'Cha mẹ cảm thấy tự hào về thành tích xuất sắc của con cái.'
  }, {
    id: 'h4_17',
    hanzi: '关键',
    pinyin: 'guān jiàn',
    meaning: 'Then chốt / Mấu chốt',
    sentence: '找准问题是解决矛盾的关键所在。',
    translation: 'Nhận diện đúng vấn đề là mấu chốt để giải quyết mâu thuẫn.'
  }, {
    id: 'h4_18',
    hanzi: '勇敢',
    pinyin: 'yǒng gǎn',
    meaning: 'Dũng cảm',
    sentence: '面对困境我们要勇敢向前。',
    translation: 'Đối mặt nghịch cảnh chúng ta cần phải dũng cảm tiến lên.'
  }, {
    id: 'h4_19',
    hanzi: '尊重',
    pinyin: 'zūn zhòng',
    meaning: 'Tôn trọng',
    sentence: '每个人都渴望得到他人的尊重。',
    translation: 'Mỗi người đều khao khát nhận được sự tôn trọng của người khác.'
  }, {
    id: 'h4_20',
    hanzi: '礼貌',
    pinyin: 'lǐ mào',
    meaning: 'Lễ phép / Lịch sự',
    sentence: '待人有礼貌是良好教养的体现。',
    translation: 'Đối xử lịch sự là biểu hiện của sự giáo dục tốt.'
  }, {
    id: 'h4_21',
    hanzi: '适应',
    pinyin: 'shì yìng',
    meaning: 'Thích nghi',
    sentence: '新员工需要尽快适应公司的工作节奏。',
    translation: 'Nhân viên mới cần nhanh chóng thích nghi với nhịp độ công việc.'
  }, {
    id: 'h4_22',
    hanzi: '顺利',
    pinyin: 'shùn lì',
    meaning: 'Thuận lợi',
    sentence: '祝愿你的新工程一切顺利！',
    translation: 'Chúc cho công trình mới của bạn mọi sự thuận lợi!'
  }, {
    id: 'h4_23',
    hanzi: '严格',
    pinyin: 'yán gé',
    meaning: 'Nghiêm khắc',
    sentence: '教练对队员的训练要求非常严格。',
    translation: 'Huấn luyện viên có yêu cầu tập luyện rất nghiêm khắc với đội viên.'
  }, {
    id: 'h4_24',
    hanzi: '诚实',
    pinyin: 'chéng shí',
    meaning: 'Trung thực / Thật thà',
    sentence: '诚实做人是一生中最重要的美德。',
    translation: 'Sống trung thực là phẩm đức quan trọng nhất trong một đời.'
  }, {
    id: 'h4_25',
    hanzi: '放弃',
    pinyin: 'fàng qì',
    meaning: 'Từ bỏ',
    sentence: '无论遇到什么挫折，都绝不轻言放弃。',
    translation: 'Bất luận gặp phải trở ngại nào, cũng quyết không nói lời từ bỏ.'
  }, {
    id: 'h4_26',
    hanzi: '竞争',
    pinyin: 'jìng zhēng',
    meaning: 'Cạnh tranh',
    sentence: '现代职场充满了激烈的竞争。',
    translation: 'Môi trường làm việc hiện đại đầy sự cạnh tranh khốc liệt.'
  }, {
    id: 'h4_27',
    hanzi: '压力',
    pinyin: 'yā lì',
    meaning: 'Áp lực',
    sentence: '适当的压力可以转化为前进的动力。',
    translation: 'Áp lực vừa phải có thể chuyển hóa thành động lực tiến bước.'
  }, {
    id: 'h4_28',
    hanzi: '流行',
    pinyin: 'liú xíng',
    meaning: 'Thịnh hành / Phổ biến',
    sentence: '这种穿搭风格在年轻人中非常流行。',
    translation: 'Phong cách phối đồ này cực kỳ thịnh hành trong giới trẻ.'
  }, {
    id: 'h4_29',
    hanzi: '甚至',
    pinyin: 'shèn zhì',
    meaning: 'Thậm chí',
    sentence: '他太忙了，甚至连午饭都顾不上吃。',
    translation: 'Anh ấy bận quá, thậm chí đến bữa trưa cũng không kịp ăn.'
  }, {
    id: 'h4_30',
    hanzi: '无论',
    pinyin: 'wú lùn',
    meaning: 'Bất luận / Bất kể',
    sentence: '无论风吹雨打，他每天都准时晨读。',
    translation: 'Bất kể gió giông mưa bão, cậu ấy ngày nào cũng đọc sách sáng đúng giờ.'
  }, {
    id: 'h4_31',
    hanzi: '尽管',
    pinyin: 'jǐn guǎn',
    meaning: 'Mặc dù / Cho dù',
    sentence: '尽管困难重重，团队依旧充满了信心。',
    translation: 'Dù khó khăn trùng trùng, đội nhóm vẫn tràn trề lòng tin.'
  }, {
    id: 'h4_32',
    hanzi: '既然',
    pinyin: 'jì rán',
    meaning: 'Đã... thì...',
    sentence: '既然决定了，就要全力以赴做好。',
    translation: 'Một khi đã quyết định, thì phải dốc toàn lực làm tốt.'
  }, {
    id: 'h4_33',
    hanzi: '并且',
    pinyin: 'bìng qiě',
    meaning: 'Đồng thời / Và',
    sentence: '他不仅按时完成了任务，并且质量极高。',
    translation: 'Anh ấy chẳng những hoàn thành đúng giờ, đồng thời chất lượng cực cao.'
  }, {
    id: 'h4_34',
    hanzi: '究竟',
    pinyin: 'jiū jìng',
    meaning: 'Rốt cuộc / Cuối cùng',
    sentence: '事情的真相究竟是什么？',
    translation: 'Chân tướng của sự việc rốt cuộc là gì?'
  }, {
    id: 'h4_35',
    hanzi: '基础',
    pinyin: 'jī chǔ',
    meaning: 'Cơ sở / Nền tảng',
    sentence: '打好基础对于学好语言至关重要。',
    translation: 'Tạo dựng nền tảng vững vàng vô cùng quan trọng để học tốt ngôn ngữ.'
  }, {
    id: 'h4_36',
    hanzi: '规定',
    pinyin: 'guī dìng',
    meaning: 'Quy định',
    sentence: '请大家严格遵守考场的相关规定。',
    translation: 'Mời mọi người nghiêm túc tuân thủ các quy định phòng thi.'
  }, {
    id: 'h4_37',
    hanzi: '建议',
    pinyin: 'jiàn yì',
    meaning: 'Đề xuất / Lời khuyên',
    sentence: '非常感谢你提出的宝贵建议。',
    translation: 'Vô cùng cảm ơn lời khuyên quý báu mà bạn đã đưa ra.'
  }, {
    id: 'h4_38',
    hanzi: '获得',
    pinyin: 'huò dé',
    meaning: 'Giành được / Đạt được',
    sentence: '他在比赛中获得了第一名的好成绩。',
    translation: 'Cậu ấy đã giành được thành tích hạng nhất trong cuộc thi.'
  }, {
    id: 'h4_39',
    hanzi: '值得',
    pinyin: 'zhí de',
    meaning: 'Xứng đáng / Đáng giá',
    sentence: '这本书非常深刻，值得多读几遍。',
    translation: 'Cuốn sách này rất sâu sắc, đáng để đọc lại nhiều lần.'
  }, {
    id: 'h4_40',
    hanzi: '精彩',
    pinyin: 'jīng cǎi',
    meaning: 'Đặc sắc / Xuất sắc',
    sentence: '让我们为选手的精彩表现热烈鼓掌！',
    translation: 'Hãy cùng vỗ tay nhiệt liệt cho màn thể hiện đặc sắc của thí sinh!'
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