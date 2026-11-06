import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Shuffle, Sparkles, Trophy, Flame, Heart, Volume2, VolumeX, Moon, Sun, Check, X, Zap, Award, BookOpen, Layers, HelpCircle, Timer, ArrowRight, BarChart2, CheckCircle2, AlertCircle, CheckCircle, Send, Bot, Settings, Lightbulb, User } from 'lucide-react';

// ==========================================
// HSK VOCABULARY DATABASE (HSK 1 - HSK 4)
// ==========================================
const HSK_DATA = {
  1: [{
    id: "h1_1",
    hanzi: "爱",
    pinyin: "ài",
    meaning: "yêu, thích",
    sentence: "我爱我的家人。 (Wǒ ài wǒ de jiārén.)",
    translation: "Tôi yêu gia đình của mình."
  }, {
    id: "h1_2",
    hanzi: "爱好",
    pinyin: "àihao",
    meaning: "sở thích",
    sentence: "他的爱好是画画。 (Tā de àihao shì huà huà.)",
    translation: "Sở thích của anh ấy là vẽ."
  }, {
    id: "h1_3",
    hanzi: "八",
    pinyin: "bā",
    meaning: "số 8",
    sentence: "今天是八号。 (Jīntiān shì bā hào.)",
    translation: "Hôm nay là ngày 8."
  }, {
    id: "h1_4",
    hanzi: "爸爸｜爸",
    pinyin: "bàba｜bà",
    meaning: "bố, ba, cha",
    sentence: "我爸爸很喜欢看书。 (Wǒ bàba hěn xǐhuan kàn shū.)",
    translation: "Bố tôi rất thích đọc sách."
  }, {
    id: "h1_5",
    hanzi: "吧",
    pinyin: "ba",
    meaning: "nào, nhé, chứ, đi",
    sentence: "我们走吧！ (Wǒmen zǒu ba!)",
    translation: "Chúng ta đi thôi!"
  }, {
    id: "h1_6",
    hanzi: "白",
    pinyin: "bái",
    meaning: "trắng",
    sentence: "这是一只白猫。 (Zhè shì yī zhī bái māo.)",
    translation: "Đây là một con mèo trắng."
  }, {
    id: "h1_7",
    hanzi: "白天",
    pinyin: "báitiān",
    meaning: "ban ngày",
    sentence: "白天很热。 (Báitiān hěn rè.)",
    translation: "Ban ngày rất nóng."
  }, {
    id: "h1_8",
    hanzi: "百",
    pinyin: "bǎi",
    meaning: "một trăm",
    sentence: "他有一百块钱。 (Tā yǒu yī bǎi kuài qián.)",
    translation: "Anh ấy có 100 đồng."
  }, {
    id: "h1_9",
    hanzi: "班",
    pinyin: "bān",
    meaning: "lớp",
    sentence: "我们班有二十个学生。 (Wǒmen bān yǒu èrshí ge xuéshēng.)",
    translation: "Lớp chúng tôi có 20 học sinh."
  }, {
    id: "h1_10",
    hanzi: "半",
    pinyin: "bàn",
    meaning: "một nửa",
    sentence: "我吃了一半。 (Wǒ chīle yī bàn.)",
    translation: "Tôi đã ăn một nửa."
  }, {
    id: "h1_11",
    hanzi: "半年",
    pinyin: "bànnián",
    meaning: "nửa năm",
    sentence: "我在中国住了半年。 (Wǒ zài Zhōngguó zhùle bàn nián.)",
    translation: "Tôi đã sống ở Trung Quốc nửa năm."
  }, {
    id: "h1_12",
    hanzi: "半天",
    pinyin: "bàntiān",
    meaning: "nửa ngày",
    sentence: "我等了他半天。 (Wǒ děngle tā bàntiān.)",
    translation: "Tôi đã đợi anh ấy nửa ngày."
  }, {
    id: "h1_13",
    hanzi: "帮",
    pinyin: "bāng",
    meaning: "giúp đỡ",
    sentence: "请帮我一下。 (Qǐng bāng wǒ yīxià.)",
    translation: "Làm ơn giúp tôi một chút."
  }, {
    id: "h1_14",
    hanzi: "帮忙",
    pinyin: "bāngmáng",
    meaning: "giúp đỡ",
    sentence: "他来帮忙。 (Tā lái bāngmáng.)",
    translation: "Anh ấy đến để giúp đỡ."
  }, {
    id: "h1_15",
    hanzi: "包",
    pinyin: "bāo",
    meaning: "bao, túi, gói",
    sentence: "这个包很重。 (Zhège bāo hěn zhòng.)",
    translation: "Cái túi này rất nặng."
  }, {
    id: "h1_16",
    hanzi: "包子",
    pinyin: "bāozi",
    meaning: "bánh bao",
    sentence: "我喜欢吃包子。 (Wǒ xǐhuan chī bāozi.)",
    translation: "Tôi thích ăn bánh bao."
  }, {
    id: "h1_17",
    hanzi: "杯",
    pinyin: "bēi",
    meaning: "cốc, ly",
    sentence: "请给我一杯水。 (Qǐng gěi wǒ yī bēi shuǐ.)",
    translation: "Làm ơn cho tôi một cốc nước."
  }, {
    id: "h1_18",
    hanzi: "杯子",
    pinyin: "bēizi",
    meaning: "cốc, chén, ly",
    sentence: "这个杯子很漂亮。 (Zhège bēizi hěn piàoliang.)",
    translation: "Chiếc cốc này rất đẹp."
  }, {
    id: "h1_19",
    hanzi: "北",
    pinyin: "běi",
    meaning: "phía Bắc",
    sentence: "他住在北方。 (Tā zhù zài běifāng.)",
    translation: "Anh ấy sống ở phía Bắc."
  }, {
    id: "h1_20",
    hanzi: "北边",
    pinyin: "běibiān",
    meaning: "phía Bắc",
    sentence: "学校在城市的北边。 (Xuéxiào zài chéngshì de běibiān.)",
    translation: "Trường học ở phía Bắc của thành phố."
  }, {
    id: "h1_21",
    hanzi: "北京",
    pinyin: "Běijīng",
    meaning: "Bắc Kinh",
    sentence: "北京是中国的首都。 (Běijīng shì Zhōngguó de shǒudū.)",
    translation: "Bắc Kinh là thủ đô của Trung Quốc."
  }, {
    id: "h1_22",
    hanzi: "本",
    pinyin: "běn",
    meaning: "cuốn, quyển, tập",
    sentence: "我有一本书。 (Wǒ yǒu yī běn shū.)",
    translation: "Tôi có một quyển sách."
  }, {
    id: "h1_23",
    hanzi: "本子",
    pinyin: "běnzi",
    meaning: "vở, cuốn vở",
    sentence: "我需要一个本子。 (Wǒ xūyào yī gè běnzi.)",
    translation: "Tôi cần một cuốn vở."
  }, {
    id: "h1_24",
    hanzi: "比",
    pinyin: "bǐ",
    meaning: "so, so với",
    sentence: "她比我高。 (Tā bǐ wǒ gāo.)",
    translation: "Cô ấy cao hơn tôi."
  }, {
    id: "h1_25",
    hanzi: "别",
    pinyin: "bié",
    meaning: "đừng, không được",
    sentence: "别说话。 (Bié shuōhuà.)",
    translation: "Đừng nói chuyện."
  }, {
    id: "h1_26",
    hanzi: "别的",
    pinyin: "biéde",
    meaning: "cái khác",
    sentence: "我想买别的东西。 (Wǒ xiǎng mǎi biéde dōngxi.)",
    translation: "Tôi muốn mua thứ khác."
  }, {
    id: "h1_27",
    hanzi: "别人",
    pinyin: "bié·rén",
    meaning: "người khác, người ta",
    sentence: "别人的意见很重要。 (Bié-rén de yìjiàn hěn zhòngyào.)",
    translation: "Ý kiến của người khác rất quan trọng."
  }, {
    id: "h1_28",
    hanzi: "病",
    pinyin: "bìng",
    meaning: "bệnh",
    sentence: "她生病了。 (Tā shēng bìng le.)",
    translation: "Cô ấy bị bệnh."
  }, {
    id: "h1_29",
    hanzi: "病人",
    pinyin: "bìngrén",
    meaning: "bệnh nhân",
    sentence: "医生正在照顾病人。 (Yīshēng zhèngzài zhàogù bìngrén.)",
    translation: "Bác sĩ đang chăm sóc bệnh nhân."
  }, {
    id: "h1_30",
    hanzi: "不大",
    pinyin: "bú dà",
    meaning: "nhỏ, không lớn",
    sentence: "这个房间不大。 (Zhège fángjiān bú dà.)",
    translation: "Căn phòng này không lớn."
  }, {
    id: "h1_31",
    hanzi: "不对",
    pinyin: "búduì",
    meaning: "không đúng",
    sentence: "你的答案不对。 (Nǐ de dá’àn búduì.)",
    translation: "Câu trả lời của bạn không đúng."
  }, {
    id: "h1_32",
    hanzi: "不客气",
    pinyin: "bú kèqi",
    meaning: "không có gì",
    sentence: "谢谢你！不客气！ (Xièxie nǐ! Bú kèqi!)",
    translation: "Cảm ơn bạn! Không có gì!"
  }, {
    id: "h1_33",
    hanzi: "不用",
    pinyin: "búyòng",
    meaning: "không cần",
    sentence: "今天不用上课。 (Jīntiān búyòng shàngkè.)",
    translation: "Hôm nay không cần đi học."
  }, {
    id: "h1_34",
    hanzi: "不",
    pinyin: "bù",
    meaning: "không",
    sentence: "我不喜欢喝咖啡。 (Wǒ bù xǐhuan hē kāfēi.)",
    translation: "Tôi không thích uống cà phê."
  }, {
    id: "h1_35",
    hanzi: "菜",
    pinyin: "cài",
    meaning: "đồ ăn, món ăn",
    sentence: "这道菜很好吃。 (Zhè dào cài hěn hǎochī.)",
    translation: "Món ăn này rất ngon."
  }, {
    id: "h1_36",
    hanzi: "差",
    pinyin: "chà",
    meaning: "thiếu, kém",
    sentence: "现在差五分十二点。 (Xiànzài chà wǔ fēn shí’èr diǎn.)",
    translation: "Bây giờ kém 5 phút đến 12 giờ."
  }, {
    id: "h1_37",
    hanzi: "茶",
    pinyin: "chá",
    meaning: "trà",
    sentence: "我喜欢喝茶。 (Wǒ xǐhuan hē chá.)",
    translation: "Tôi thích uống trà."
  }, {
    id: "h1_38",
    hanzi: "常",
    pinyin: "cháng",
    meaning: "thường",
    sentence: "他常来这里。 (Tā cháng lái zhèlǐ.)",
    translation: "Anh ấy thường đến đây."
  }, {
    id: "h1_39",
    hanzi: "常常",
    pinyin: "chángcháng",
    meaning: "thường thường",
    sentence: "我常常去公园散步。 (Wǒ chángcháng qù gōngyuán sànbù.)",
    translation: "Tôi thường đi dạo trong công viên."
  }, {
    id: "h1_40",
    hanzi: "唱",
    pinyin: "chàng",
    meaning: "hát",
    sentence: "她喜欢唱歌。 (Tā xǐhuan chànggē.)",
    translation: "Cô ấy thích hát."
  }, {
    id: "h1_41",
    hanzi: "唱歌",
    pinyin: "chànggē",
    meaning: "hát, ca hát",
    sentence: "他们在唱歌。 (Tāmen zài chànggē.)",
    translation: "Họ đang hát."
  }, {
    id: "h1_42",
    hanzi: "车",
    pinyin: "chē",
    meaning: "xe",
    sentence: "他买了一辆新车。 (Tā mǎile yī liàng xīn chē.)",
    translation: "Anh ấy đã mua một chiếc xe mới."
  }, {
    id: "h1_43",
    hanzi: "车票",
    pinyin: "chēpiào",
    meaning: "vé xe",
    sentence: "我忘了买车票。 (Wǒ wàngle mǎi chēpiào.)",
    translation: "Tôi quên mua vé xe."
  }, {
    id: "h1_44",
    hanzi: "车上",
    pinyin: "chē shàng",
    meaning: "trên xe",
    sentence: "车上有很多人。 (Chē shàng yǒu hěn duō rén.)",
    translation: "Trên xe có rất nhiều người."
  }, {
    id: "h1_45",
    hanzi: "车站",
    pinyin: "chēzhàn",
    meaning: "bến xe",
    sentence: "我们在车站见面吧。 (Wǒmen zài chēzhàn jiànmiàn ba.)",
    translation: "Chúng ta gặp nhau ở bến xe nhé."
  }, {
    id: "h1_46",
    hanzi: "吃",
    pinyin: "chī",
    meaning: "ăn",
    sentence: "他正在吃饭。 (Tā zhèngzài chīfàn.)",
    translation: "Anh ấy đang ăn."
  }, {
    id: "h1_47",
    hanzi: "吃饭",
    pinyin: "chīfàn",
    meaning: "ăn cơm",
    sentence: "你吃饭了吗？ (Nǐ chīfàn le ma?)",
    translation: "Bạn ăn cơm chưa?"
  }, {
    id: "h1_48",
    hanzi: "出",
    pinyin: "chū",
    meaning: "ra, xuất",
    sentence: "他刚刚出去了。 (Tā gānggāng chūqù le.)",
    translation: "Anh ấy vừa ra ngoài."
  }, {
    id: "h1_49",
    hanzi: "出来",
    pinyin: "chūlái",
    meaning: "xuất hiện, đi ra",
    sentence: "请你出来一下。 (Qǐng nǐ chūlái yīxià.)",
    translation: "Làm ơn ra đây một chút."
  }, {
    id: "h1_50",
    hanzi: "出去",
    pinyin: "chūqù",
    meaning: "ra, ra ngoài",
    sentence: "我想出去散散步。 (Wǒ xiǎng chūqù sàn sànbù.)",
    translation: "Tôi muốn ra ngoài đi dạo."
  }, {
    id: "h1_51",
    hanzi: "穿",
    pinyin: "chuān",
    meaning: "mặc",
    sentence: "我今天穿了一件红色的衣服。 (Wǒ jīntiān chuānle yī jiàn hóngsè de yīfu.)",
    translation: "Hôm nay tôi mặc một chiếc áo màu đỏ."
  }, {
    id: "h1_52",
    hanzi: "床",
    pinyin: "chuáng",
    meaning: "giường, đệm",
    sentence: "我每天七点起床。 (Wǒ měitiān qī diǎn qǐchuáng.)",
    translation: "Tôi thức dậy lúc 7 giờ mỗi ngày."
  }, {
    id: "h1_53",
    hanzi: "次",
    pinyin: "cì",
    meaning: "lần",
    sentence: "我去过那里两次。 (Wǒ qùguò nàlǐ liǎng cì.)",
    translation: "Tôi đã đến đó hai lần."
  }, {
    id: "h1_54",
    hanzi: "从",
    pinyin: "cóng",
    meaning: "từ, qua, theo",
    sentence: "从这儿到学校很近。 (Cóng zhèr dào xuéxiào hěn jìn.)",
    translation: "Từ đây đến trường rất gần."
  }, {
    id: "h1_55",
    hanzi: "错",
    pinyin: "cuò",
    meaning: "sai",
    sentence: "你错了。 (Nǐ cuò le.)",
    translation: "Bạn sai rồi."
  }, {
    id: "h1_56",
    hanzi: "打",
    pinyin: "dǎ",
    meaning: "đánh, bắt",
    sentence: "他在打篮球。 (Tā zài dǎ lánqiú.)",
    translation: "Anh ấy đang chơi bóng rổ."
  }, {
    id: "h1_57",
    hanzi: "打车",
    pinyin: "dǎchē",
    meaning: "bắt xe",
    sentence: "我们打车去吧。 (Wǒmen dǎchē qù ba.)",
    translation: "Chúng ta bắt xe đi nhé."
  }, {
    id: "h1_58",
    hanzi: "打电话",
    pinyin: "dǎ diànhuà",
    meaning: "gọi điện",
    sentence: "我正在打电话。 (Wǒ zhèngzài dǎ diànhuà.)",
    translation: "Tôi đang gọi điện thoại."
  }, {
    id: "h1_59",
    hanzi: "打开",
    pinyin: "dǎkāi",
    meaning: "mở, mở ra",
    sentence: "请把门打开。 (Qǐng bǎ mén dǎkāi.)",
    translation: "Làm ơn mở cửa ra."
  }, {
    id: "h1_60",
    hanzi: "打球",
    pinyin: "dǎqiú",
    meaning: "chơi bóng",
    sentence: "他们喜欢一起打球。 (Tāmen xǐhuan yīqǐ dǎ qiú.)",
    translation: "Họ thích chơi bóng cùng nhau."
  }, {
    id: "h1_61",
    hanzi: "大",
    pinyin: "dà",
    meaning: "to, lớn",
    sentence: "这棵树很大。 (Zhè kē shù hěn dà.)",
    translation: "Cây này rất to."
  }, {
    id: "h1_62",
    hanzi: "大学",
    pinyin: "dàxué",
    meaning: "đại học",
    sentence: "他在大学学习中文。 (Tā zài dàxué xuéxí Zhōngwén.)",
    translation: "Anh ấy học tiếng Trung tại đại học."
  }, {
    id: "h1_63",
    hanzi: "大学生",
    pinyin: "dàxuéshēng",
    meaning: "sinh viên đại học",
    sentence: "我是一个大学生。 (Wǒ shì yī gè dàxuéshēng.)",
    translation: "Tôi là sinh viên đại học."
  }, {
    id: "h1_64",
    hanzi: "到",
    pinyin: "dào",
    meaning: "đến, tới",
    sentence: "他已经到了。 (Tā yǐjīng dào le.)",
    translation: "Anh ấy đã đến rồi."
  }, {
    id: "h1_65",
    hanzi: "得到",
    pinyin: "dédào",
    meaning: "đạt được, nhận được",
    sentence: "他得到了第一名。 (Tā dédào le dì yī míng.)",
    translation: "Anh ấy đã giành được vị trí thứ nhất."
  }, {
    id: "h1_66",
    hanzi: "地",
    pinyin: "de",
    meaning: "(biểu thị trạng ngữ)",
    sentence: "他高兴地笑了。 (Tā gāoxìng de xiào le.)",
    translation: "Anh ấy cười vui vẻ."
  }, {
    id: "h1_67",
    hanzi: "的",
    pinyin: "de",
    meaning: "của",
    sentence: "这是我的书。 (Zhè shì wǒ de shū.)",
    translation: "Đây là sách của tôi."
  }, {
    id: "h1_68",
    hanzi: "等",
    pinyin: "děng",
    meaning: "đợi, chờ",
    sentence: "请等我一下。 (Qǐng děng wǒ yīxià.)",
    translation: "Làm ơn đợi tôi một chút."
  }, {
    id: "h1_69",
    hanzi: "地",
    pinyin: "dì",
    meaning: "đất, lục địa, trái đất",
    sentence: "地上有很多花。 (Dì shàng yǒu hěn duō huā.)",
    translation: "Trên đất có rất nhiều hoa."
  }, {
    id: "h1_70",
    hanzi: "地点",
    pinyin: "dìdiǎn",
    meaning: "địa điểm, nơi chốn",
    sentence: "我们在什么地点见面？ (Wǒmen zài shénme dìdiǎn jiànmiàn?)",
    translation: "Chúng ta gặp nhau ở đâu?"
  }, {
    id: "h1_71",
    hanzi: "地方",
    pinyin: "dìfāng",
    meaning: "nơi, địa phương",
    sentence: "我喜欢这个地方。 (Wǒ xǐhuan zhège dìfāng.)",
    translation: "Tôi thích nơi này."
  }, {
    id: "h1_72",
    hanzi: "地上",
    pinyin: "dìshàng",
    meaning: "trên mặt đất",
    sentence: "地上有一只猫。 (Dìshàng yǒu yī zhī māo.)",
    translation: "Trên đất có một con mèo."
  }, {
    id: "h1_73",
    hanzi: "地图",
    pinyin: "dìtú",
    meaning: "bản đồ",
    sentence: "我需要一张地图。 (Wǒ xūyào yī zhāng dìtú.)",
    translation: "Tôi cần một tấm bản đồ."
  }, {
    id: "h1_74",
    hanzi: "弟弟｜弟",
    pinyin: "dìdì｜dì",
    meaning: "em trai",
    sentence: "我的弟弟很聪明。 (Wǒ de dìdì hěn cōngmíng.)",
    translation: "Em trai tôi rất thông minh."
  }, {
    id: "h1_75",
    hanzi: "第（第二）",
    pinyin: "dì（dì-èr）",
    meaning: "thứ … (số thứ tự)",
    sentence: "这是第二个问题。 (Zhè shì dì-èr gè wèntí.)",
    translation: "Đây là câu hỏi thứ hai."
  }, {
    id: "h1_76",
    hanzi: "点",
    pinyin: "diǎn",
    meaning: "ít, chút, hơi",
    sentence: "他有一点累。 (Tā yǒu yīdiǎn lèi.)",
    translation: "Anh ấy hơi mệt."
  }, {
    id: "h1_77",
    hanzi: "电",
    pinyin: "diàn",
    meaning: "điện, pin",
    sentence: "我的手机没电了。 (Wǒ de shǒujī méi diàn le.)",
    translation: "Điện thoại của tôi hết pin rồi."
  }, {
    id: "h1_78",
    hanzi: "电话",
    pinyin: "diànhuà",
    meaning: "điện thoại",
    sentence: "请给我打电话。 (Qǐng gěi wǒ dǎ diànhuà.)",
    translation: "Làm ơn gọi điện cho tôi."
  }, {
    id: "h1_79",
    hanzi: "电脑",
    pinyin: "diànnǎo",
    meaning: "máy tính",
    sentence: "我需要用电脑。 (Wǒ xūyào yòng diànnǎo.)",
    translation: "Tôi cần sử dụng máy tính."
  }, {
    id: "h1_80",
    hanzi: "电视",
    pinyin: "diànshì",
    meaning: "truyền hình, TV",
    sentence: "我们一起看电视吧。 (Wǒmen yīqǐ kàn diànshì ba.)",
    translation: "Chúng ta cùng xem TV nhé."
  }, {
    id: "h1_81",
    hanzi: "电视机",
    pinyin: "diànshìjī",
    meaning: "(chiếc) TV",
    sentence: "这台电视机很贵。 (Zhè tái diànshìjī hěn guì.)",
    translation: "Chiếc TV này rất đắt."
  }, {
    id: "h1_82",
    hanzi: "电影",
    pinyin: "diànyǐng",
    meaning: "phim ảnh",
    sentence: "你喜欢看电影吗？ (Nǐ xǐhuan kàn diànyǐng ma?)",
    translation: "Bạn thích xem phim không?"
  }, {
    id: "h1_83",
    hanzi: "电影院",
    pinyin: "diànyǐngyuàn",
    meaning: "rạp chiếu phim",
    sentence: "我们去电影院看电影吧。 (Wǒmen qù diànyǐngyuàn kàn diànyǐng ba.)",
    translation: "Chúng ta đi rạp xem phim nhé."
  }, {
    id: "h1_84",
    hanzi: "东",
    pinyin: "dōng",
    meaning: "phía đông",
    sentence: "太阳从东边升起。 (Tàiyáng cóng dōngbiān shēngqǐ.)",
    translation: "Mặt trời mọc từ phía đông."
  }, {
    id: "h1_85",
    hanzi: "东边",
    pinyin: "dōngbiān",
    meaning: "phía đông",
    sentence: "学校在东边。 (Xuéxiào zài dōngbiān.)",
    translation: "Trường học ở phía đông."
  }, {
    id: "h1_86",
    hanzi: "东西",
    pinyin: "dōngxi",
    meaning: "đồ đạc, đồ, vật",
    sentence: "我买了一些东西。 (Wǒ mǎile yīxiē dōngxi.)",
    translation: "Tôi đã mua một vài thứ."
  }, {
    id: "h1_87",
    hanzi: "动",
    pinyin: "dòng",
    meaning: "động, chạm",
    sentence: "请不要动我的东西。 (Qǐng bùyào dòng wǒ de dōngxi.)",
    translation: "Xin đừng chạm vào đồ của tôi."
  }, {
    id: "h1_88",
    hanzi: "动作",
    pinyin: "dòngzuò",
    meaning: "động tác, hoạt động",
    sentence: "他的动作很快。 (Tā de dòngzuò hěn kuài.)",
    translation: "Động tác của anh ấy rất nhanh."
  }, {
    id: "h1_89",
    hanzi: "都",
    pinyin: "dōu",
    meaning: "đều",
    sentence: "我们都喜欢吃中国菜。 (Wǒmen dōu xǐhuan chī Zhōngguó cài.)",
    translation: "Chúng tôi đều thích ăn món Trung Quốc."
  }, {
    id: "h1_90",
    hanzi: "读",
    pinyin: "dú",
    meaning: "đọc",
    sentence: "他在读书。 (Tā zài dú shū.)",
    translation: "Anh ấy đang đọc sách."
  }, {
    id: "h1_91",
    hanzi: "读书",
    pinyin: "dúshū",
    meaning: "đọc sách",
    sentence: "我喜欢在晚上读书。 (Wǒ xǐhuan zài wǎnshàng dúshū.)",
    translation: "Tôi thích đọc sách vào buổi tối."
  }, {
    id: "h1_92",
    hanzi: "对",
    pinyin: "duì",
    meaning: "đúng",
    sentence: "你的答案是对的。 (Nǐ de dá’àn shì duì de.)",
    translation: "Câu trả lời của bạn là đúng."
  }, {
    id: "h1_93",
    hanzi: "对不起",
    pinyin: "duìbuqǐ",
    meaning: "xin lỗi",
    sentence: "对不起，我来晚了。 (Duìbuqǐ, wǒ lái wǎn le.)",
    translation: "Xin lỗi, tôi đến muộn."
  }, {
    id: "h1_94",
    hanzi: "多",
    pinyin: "duō",
    meaning: "nhiều",
    sentence: "这里的人很多。 (Zhèlǐ de rén hěn duō.)",
    translation: "Ở đây có rất nhiều người."
  }, {
    id: "h1_95",
    hanzi: "多少",
    pinyin: "duōshǎo",
    meaning: "bao nhiêu",
    sentence: "这个多少钱？ (Zhège duōshǎo qián?)",
    translation: "Cái này bao nhiêu tiền?"
  }, {
    id: "h1_96",
    hanzi: "饿",
    pinyin: "è",
    meaning: "đói",
    sentence: "我饿了。 (Wǒ è le.)",
    translation: "Tôi đói rồi."
  }, {
    id: "h1_97",
    hanzi: "儿子",
    pinyin: "érzi",
    meaning: "con trai",
    sentence: "他是我的儿子。 (Tā shì wǒ de érzi.)",
    translation: "Anh ấy là con trai tôi."
  }, {
    id: "h1_98",
    hanzi: "二",
    pinyin: "èr",
    meaning: "số 2",
    sentence: "今天是二号。 (Jīntiān shì èr hào.)",
    translation: "Hôm nay là ngày 2."
  }, {
    id: "h1_99",
    hanzi: "饭",
    pinyin: "fàn",
    meaning: "cơm",
    sentence: "我们吃饭吧。 (Wǒmen chīfàn ba.)",
    translation: "Chúng ta ăn cơm thôi."
  }, {
    id: "h1_100",
    hanzi: "饭店",
    pinyin: "fàndiàn",
    meaning: "quán ăn, nhà hàng",
    sentence: "这家饭店很好吃。 (Zhè jiā fàndiàn hěn hǎochī.)",
    translation: "Nhà hàng này rất ngon."
  }, {
    id: "h1_101",
    hanzi: "房间",
    pinyin: "fángjiān",
    meaning: "căn phòng",
    sentence: "这个房间很大。 (Zhège fángjiān hěn dà.)",
    translation: "Căn phòng này rất lớn."
  }, {
    id: "h1_102",
    hanzi: "房子",
    pinyin: "fángzi",
    meaning: "căn nhà, căn hộ",
    sentence: "我们家有两套房子。 (Wǒmen jiā yǒu liǎng tào fángzi.)",
    translation: "Nhà chúng tôi có hai căn nhà."
  }, {
    id: "h1_103",
    hanzi: "放",
    pinyin: "fàng",
    meaning: "thả, đặt, để",
    sentence: "请把书放在桌子上。 (Qǐng bǎ shū fàng zài zhuōzi shàng.)",
    translation: "Làm ơn đặt sách lên bàn."
  }, {
    id: "h1_104",
    hanzi: "放假",
    pinyin: "fàngjià",
    meaning: "nghỉ, nghỉ lễ",
    sentence: "学校下个月放假。 (Xuéxiào xià gè yuè fàngjià.)",
    translation: "Trường sẽ nghỉ lễ vào tháng sau."
  }, {
    id: "h1_105",
    hanzi: "放学",
    pinyin: "fàngxué",
    meaning: "tan học",
    sentence: "孩子们下午三点放学。 (Háizimen xiàwǔ sān diǎn fàngxué.)",
    translation: "Bọn trẻ tan học lúc 3 giờ chiều."
  }, {
    id: "h1_106",
    hanzi: "飞",
    pinyin: "fēi",
    meaning: "bay",
    sentence: "鸟儿在天上飞。 (Niǎo’ér zài tiānshàng fēi.)",
    translation: "Chim đang bay trên trời."
  }, {
    id: "h1_107",
    hanzi: "飞机",
    pinyin: "fēijī",
    meaning: "máy bay",
    sentence: "我坐飞机去北京。 (Wǒ zuò fēijī qù Běijīng.)",
    translation: "Tôi đi Bắc Kinh bằng máy bay."
  }, {
    id: "h1_108",
    hanzi: "非常",
    pinyin: "fēicháng",
    meaning: "vô cùng, rất",
    sentence: "这个问题非常重要。 (Zhège wèntí fēicháng zhòngyào.)",
    translation: "Vấn đề này rất quan trọng."
  }, {
    id: "h1_109",
    hanzi: "分",
    pinyin: "fēn",
    meaning: "phút",
    sentence: "现在是九点五分。 (Xiànzài shì jiǔ diǎn wǔ fēn.)",
    translation: "Bây giờ là 9 giờ 5 phút."
  }, {
    id: "h1_110",
    hanzi: "风",
    pinyin: "fēng",
    meaning: "gió",
    sentence: "今天的风很大。 (Jīntiān de fēng hěn dà.)",
    translation: "Hôm nay gió rất to."
  }, {
    id: "h1_111",
    hanzi: "干",
    pinyin: "gān",
    meaning: "khô",
    sentence: "衣服已经干了。 (Yīfu yǐjīng gān le.)",
    translation: "Quần áo đã khô rồi."
  }, {
    id: "h1_112",
    hanzi: "干净",
    pinyin: "gānjìng",
    meaning: "sạch sẽ",
    sentence: "我的房间很干净。 (Wǒ de fángjiān hěn gānjìng.)",
    translation: "Phòng của tôi rất sạch sẽ."
  }, {
    id: "h1_113",
    hanzi: "干",
    pinyin: "gàn",
    meaning: "làm",
    sentence: "你在干什么？ (Nǐ zài gàn shénme?)",
    translation: "Bạn đang làm gì?"
  }, {
    id: "h1_114",
    hanzi: "干什么",
    pinyin: "gàn shénme",
    meaning: "làm gì",
    sentence: "他昨天干什么了？ (Tā zuótiān gàn shénme le?)",
    translation: "Hôm qua anh ấy đã làm gì?"
  }, {
    id: "h1_115",
    hanzi: "高",
    pinyin: "gāo",
    meaning: "cao",
    sentence: "他比我高。 (Tā bǐ wǒ gāo.)",
    translation: "Anh ấy cao hơn tôi."
  }, {
    id: "h1_116",
    hanzi: "高兴",
    pinyin: "gāoxìng",
    meaning: "vui vẻ, vui mừng",
    sentence: "我今天很高兴。 (Wǒ jīntiān hěn gāoxìng.)",
    translation: "Hôm nay tôi rất vui."
  }, {
    id: "h1_117",
    hanzi: "告诉",
    pinyin: "gàosù",
    meaning: "nói, kể lại",
    sentence: "请告诉我你的名字。 (Qǐng gàosù wǒ nǐ de míngzì.)",
    translation: "Hãy nói cho tôi biết tên của bạn."
  }, {
    id: "h1_118",
    hanzi: "哥哥｜哥",
    pinyin: "gēge｜gē",
    meaning: "anh trai",
    sentence: "我的哥哥比我大三岁。 (Wǒ de gēge bǐ wǒ dà sān suì.)",
    translation: "Anh trai tôi lớn hơn tôi 3 tuổi."
  }, {
    id: "h1_119",
    hanzi: "歌",
    pinyin: "gē",
    meaning: "bài hát",
    sentence: "这首歌很好听。 (Zhè shǒu gē hěn hǎotīng.)",
    translation: "Bài hát này rất hay."
  }, {
    id: "h1_120",
    hanzi: "个",
    pinyin: "gè",
    meaning: "cái",
    sentence: "我买了一个苹果。 (Wǒ mǎile yī gè píngguǒ.)",
    translation: "Tôi đã mua một quả táo."
  }, {
    id: "h1_121",
    hanzi: "给",
    pinyin: "gěi",
    meaning: "cho",
    sentence: "请把书给我。 (Qǐng bǎ shū gěi wǒ.)",
    translation: "Làm ơn đưa quyển sách cho tôi."
  }, {
    id: "h1_122",
    hanzi: "跟",
    pinyin: "gēn",
    meaning: "với, cùng",
    sentence: "他跟我一起去学校。 (Tā gēn wǒ yīqǐ qù xuéxiào.)",
    translation: "Anh ấy cùng tôi đến trường."
  }, {
    id: "h1_123",
    hanzi: "工人",
    pinyin: "gōngrén",
    meaning: "công nhân",
    sentence: "他是一名工人。 (Tā shì yī míng gōngrén.)",
    translation: "Anh ấy là một công nhân."
  }, {
    id: "h1_124",
    hanzi: "工作",
    pinyin: "gōngzuò",
    meaning: "công việc/làm việc",
    sentence: "我喜欢我的工作。 (Wǒ xǐhuan wǒ de gōngzuò.)",
    translation: "Tôi thích công việc của mình."
  }, {
    id: "h1_125",
    hanzi: "关",
    pinyin: "guān",
    meaning: "đóng",
    sentence: "请关门。 (Qǐng guānmén.)",
    translation: "Làm ơn đóng cửa."
  }, {
    id: "h1_126",
    hanzi: "关上",
    pinyin: "guānshàng",
    meaning: "đóng lại",
    sentence: "把灯关上吧。 (Bǎ dēng guānshàng ba.)",
    translation: "Tắt đèn đi."
  }, {
    id: "h1_127",
    hanzi: "贵",
    pinyin: "guì",
    meaning: "đắt",
    sentence: "这件衣服太贵了。 (Zhè jiàn yīfu tài guì le.)",
    translation: "Chiếc áo này quá đắt."
  }, {
    id: "h1_128",
    hanzi: "国",
    pinyin: "guó",
    meaning: "quốc gia, đất nước",
    sentence: "我爱我的国家。 (Wǒ ài wǒ de guójiā.)",
    translation: "Tôi yêu đất nước của mình."
  }, {
    id: "h1_129",
    hanzi: "国家",
    pinyin: "guójiā",
    meaning: "đất nước, quốc gia",
    sentence: "中国是一个大国家。 (Zhōngguó shì yī gè dà guójiā.)",
    translation: "Trung Quốc là một quốc gia lớn."
  }, {
    id: "h1_130",
    hanzi: "国外",
    pinyin: "guó wài",
    meaning: "nước ngoài",
    sentence: "他从国外回来。 (Tā cóng guó wài huílái.)",
    translation: "Anh ấy vừa từ nước ngoài về."
  }, {
    id: "h1_131",
    hanzi: "过",
    pinyin: "guò",
    meaning: "qua, vượt qua",
    sentence: "我们过了桥就到了。 (Wǒmen guòle qiáo jiù dào le.)",
    translation: "Chúng ta qua cầu là đến."
  }, {
    id: "h1_132",
    hanzi: "还",
    pinyin: "hái",
    meaning: "vẫn, còn",
    sentence: "他还在家。 (Tā hái zài jiā.)",
    translation: "Anh ấy vẫn ở nhà."
  }, {
    id: "h1_133",
    hanzi: "还是",
    pinyin: "háishi",
    meaning: "hay là",
    sentence: "你喝茶还是咖啡？ (Nǐ hē chá háishi kāfēi?)",
    translation: "Bạn uống trà hay cà phê?"
  }, {
    id: "h1_134",
    hanzi: "还有",
    pinyin: "hái yǒu",
    meaning: "còn có, ngoài ra",
    sentence: "我还有一些问题。 (Wǒ hái yǒu yīxiē wèntí.)",
    translation: "Tôi còn vài câu hỏi nữa."
  }, {
    id: "h1_135",
    hanzi: "孩子",
    pinyin: "háizi",
    meaning: "trẻ em, con cái",
    sentence: "孩子们很开心。 (Háizimen hěn kāixīn.)",
    translation: "Bọn trẻ rất vui."
  }, {
    id: "h1_136",
    hanzi: "汉语",
    pinyin: "Hànyǔ",
    meaning: "tiếng Trung",
    sentence: "我在学习汉语。 (Wǒ zài xuéxí Hànyǔ.)",
    translation: "Tôi đang học tiếng Trung."
  }, {
    id: "h1_137",
    hanzi: "汉字",
    pinyin: "Hànzì",
    meaning: "chữ Hán",
    sentence: "我会写一些汉字。 (Wǒ huì xiě yīxiē Hànzì.)",
    translation: "Tôi biết viết một vài chữ Hán."
  }, {
    id: "h1_138",
    hanzi: "好",
    pinyin: "hǎo",
    meaning: "tốt",
    sentence: "这本书很好。 (Zhè běn shū hěn hǎo.)",
    translation: "Quyển sách này rất hay."
  }, {
    id: "h1_139",
    hanzi: "好吃",
    pinyin: "hǎochī",
    meaning: "ngon",
    sentence: "这个菜很好吃。 (Zhège cài hěn hǎochī.)",
    translation: "Món ăn này rất ngon."
  }, {
    id: "h1_140",
    hanzi: "好看",
    pinyin: "hǎokàn",
    meaning: "đẹp, dễ nhìn",
    sentence: "这个电影很好看。 (Zhège diànyǐng hěn hǎokàn.)",
    translation: "Bộ phim này rất hay."
  }, {
    id: "h1_141",
    hanzi: "好听",
    pinyin: "hǎotīng",
    meaning: "êm tai, dễ nghe",
    sentence: "这首歌很好听。 (Zhè shǒu gē hěn hǎotīng.)",
    translation: "Bài hát này rất dễ nghe."
  }, {
    id: "h1_142",
    hanzi: "好玩儿",
    pinyin: "hǎowánr",
    meaning: "vui, thú vị",
    sentence: "这个地方很好玩儿。 (Zhège dìfāng hěn hǎowánr.)",
    translation: "Nơi này rất thú vị."
  }, {
    id: "h1_143",
    hanzi: "号",
    pinyin: "hào",
    meaning: "ngày, số",
    sentence: "今天是几号？ (Jīntiān shì jǐ hào?)",
    translation: "Hôm nay là ngày mấy?"
  }, {
    id: "h1_144",
    hanzi: "喝",
    pinyin: "hē",
    meaning: "uống",
    sentence: "我喜欢喝茶。 (Wǒ xǐhuan hē chá.)",
    translation: "Tôi thích uống trà."
  }, {
    id: "h1_145",
    hanzi: "和",
    pinyin: "hé",
    meaning: "và",
    sentence: "我和他是朋友。 (Wǒ hé tā shì péngyou.)",
    translation: "Tôi và anh ấy là bạn."
  }, {
    id: "h1_146",
    hanzi: "很",
    pinyin: "hěn",
    meaning: "rất",
    sentence: "他很高兴。 (Tā hěn gāoxìng.)",
    translation: "Anh ấy rất vui."
  }, {
    id: "h1_147",
    hanzi: "后",
    pinyin: "hòu",
    meaning: "sau",
    sentence: "他站在我后边。 (Tā zhàn zài wǒ hòubian.)",
    translation: "Anh ấy đứng sau tôi."
  }, {
    id: "h1_148",
    hanzi: "后边",
    pinyin: "hòubian",
    meaning: "phía sau",
    sentence: "房子的后边有一个花园。 (Fángzi de hòubian yǒu yī gè huāyuán.)",
    translation: "Phía sau ngôi nhà có một khu vườn."
  }, {
    id: "h1_149",
    hanzi: "后天",
    pinyin: "hòutiān",
    meaning: "ngày kia",
    sentence: "后天我们去旅游。 (Hòutiān wǒmen qù lǚyóu.)",
    translation: "Ngày kia chúng tôi đi du lịch."
  }, {
    id: "h1_150",
    hanzi: "花",
    pinyin: "huā",
    meaning: "hoa",
    sentence: "花园里有很多花。 (Huāyuán lǐ yǒu hěn duō huā.)",
    translation: "Trong vườn có rất nhiều hoa."
  }],
  2: [{
    id: "h2_1",
    hanzi: "啊",
    pinyin: "ā",
    meaning: "a, chà, à",
    sentence: "啊。",
    translation: "a, chà, à."
  }, {
    id: "h2_2",
    hanzi: "爱情",
    pinyin: "àiqíng",
    meaning: "tình yêu",
    sentence: "爱情。",
    translation: "tình yêu."
  }, {
    id: "h2_3",
    hanzi: "安静",
    pinyin: "ānjìng",
    meaning: "yên lặng",
    sentence: "安静。",
    translation: "yên lặng."
  }, {
    id: "h2_4",
    hanzi: "爱人",
    pinyin: "àirén",
    meaning: "vợ/ chồng",
    sentence: "爱人。",
    translation: "vợ/ chồng."
  }, {
    id: "h2_5",
    hanzi: "安全",
    pinyin: "ānquán",
    meaning: "an toàn",
    sentence: "安全。",
    translation: "an toàn."
  }, {
    id: "h2_6",
    hanzi: "白色",
    pinyin: "báisè",
    meaning: "màu trắng",
    sentence: "白色。",
    translation: "màu trắng."
  }, {
    id: "h2_7",
    hanzi: "班长",
    pinyin: "bānzhǎng",
    meaning: "lớp trưởng",
    sentence: "班长。",
    translation: "lớp trưởng."
  }, {
    id: "h2_8",
    hanzi: "办",
    pinyin: "bàn",
    meaning: "làm",
    sentence: "办。",
    translation: "làm."
  }, {
    id: "h2_9",
    hanzi: "办法",
    pinyin: "bànfǎ",
    meaning: "cách, phương pháp",
    sentence: "办法。",
    translation: "cách, phương pháp."
  }, {
    id: "h2_10",
    hanzi: "办公室",
    pinyin: "bàngōngshì",
    meaning: "phòng làm việc",
    sentence: "办公室。",
    translation: "phòng làm việc."
  }, {
    id: "h2_11",
    hanzi: "半夜",
    pinyin: "bànyè",
    meaning: "nửa đêm",
    sentence: "半夜。",
    translation: "nửa đêm."
  }, {
    id: "h2_12",
    hanzi: "帮助",
    pinyin: "bāngzhù",
    meaning: "giúp đỡ",
    sentence: "帮助。",
    translation: "giúp đỡ."
  }, {
    id: "h2_13",
    hanzi: "饱",
    pinyin: "bǎo",
    meaning: "no, ăn no",
    sentence: "饱。",
    translation: "no, ăn no."
  }, {
    id: "h2_14",
    hanzi: "报名",
    pinyin: "bào//míng",
    meaning: "đăng kí, báo danh",
    sentence: "报名。",
    translation: "đăng kí, báo danh."
  }, {
    id: "h2_15",
    hanzi: "报纸",
    pinyin: "bàozhǐ",
    meaning: "báo (giấy)",
    sentence: "报纸。",
    translation: "báo (giấy)."
  }, {
    id: "h2_16",
    hanzi: "北方",
    pinyin: "běifāng",
    meaning: "phương Bắc",
    sentence: "北方。",
    translation: "phương Bắc."
  }, {
    id: "h2_17",
    hanzi: "背",
    pinyin: "bèi",
    meaning: "đọc thuộc",
    sentence: "背。",
    translation: "đọc thuộc."
  }, {
    id: "h2_18",
    hanzi: "比如",
    pinyin: "bǐrú",
    meaning: "ví dụ",
    sentence: "比如。",
    translation: "ví dụ."
  }, {
    id: "h2_19",
    hanzi: "比如说",
    pinyin: "bǐrúshuō",
    meaning: "Nói ví dụ như…",
    sentence: "比如说。",
    translation: "Nói ví dụ như…."
  }, {
    id: "h2_20",
    hanzi: "笔",
    pinyin: "bǐ",
    meaning: "bút",
    sentence: "笔。",
    translation: "bút."
  }, {
    id: "h2_21",
    hanzi: "笔记",
    pinyin: "bǐjì",
    meaning: "ghi chép",
    sentence: "笔记。",
    translation: "ghi chép."
  }, {
    id: "h2_22",
    hanzi: "笔记本",
    pinyin: "bǐjìběn",
    meaning: "vở ghi chép",
    sentence: "笔记本。",
    translation: "vở ghi chép."
  }, {
    id: "h2_23",
    hanzi: "必须",
    pinyin: "bìxū",
    meaning: "nhất định, phải",
    sentence: "必须。",
    translation: "nhất định, phải."
  }, {
    id: "h2_24",
    hanzi: "边",
    pinyin: "biān",
    meaning: "viền, cạnh bên",
    sentence: "边。",
    translation: "viền, cạnh bên."
  }, {
    id: "h2_25",
    hanzi: "变",
    pinyin: "biàn",
    meaning: "thay đổi",
    sentence: "变。",
    translation: "thay đổi."
  }, {
    id: "h2_26",
    hanzi: "变成",
    pinyin: "biànchéng",
    meaning: "trở thành, biến thành, thành ra",
    sentence: "变成。",
    translation: "trở thành, biến thành, thành ra."
  }, {
    id: "h2_27",
    hanzi: "遍",
    pinyin: "biàn",
    meaning: "lần",
    sentence: "遍。",
    translation: "lần."
  }, {
    id: "h2_28",
    hanzi: "表",
    pinyin: "biǎo",
    meaning: "đồng hồ",
    sentence: "表。",
    translation: "đồng hồ."
  }, {
    id: "h2_29",
    hanzi: "表示",
    pinyin: "biǎoshì",
    meaning: "bày tỏ, thể hiện",
    sentence: "表示。",
    translation: "bày tỏ, thể hiện."
  }, {
    id: "h2_30",
    hanzi: "不错",
    pinyin: "bùcuò",
    meaning: "ổn, không tồi",
    sentence: "不错。",
    translation: "ổn, không tồi."
  }, {
    id: "h2_31",
    hanzi: "不但",
    pinyin: "bùdàn",
    meaning: "không những…, không chỉ….",
    sentence: "不但。",
    translation: "không những…, không chỉ….."
  }, {
    id: "h2_32",
    hanzi: "不够",
    pinyin: "bùgòu",
    meaning: "chưa đủ",
    sentence: "不够。",
    translation: "chưa đủ."
  }, {
    id: "h2_33",
    hanzi: "不过",
    pinyin: "bùguò",
    meaning: "chẳng qua, nhưng mà",
    sentence: "不过。",
    translation: "chẳng qua, nhưng mà."
  }, {
    id: "h2_34",
    hanzi: "不太",
    pinyin: "bù tài",
    meaning: "không quá",
    sentence: "不太。",
    translation: "không quá."
  }, {
    id: "h2_35",
    hanzi: "不要",
    pinyin: "bùyào",
    meaning: "không cần, đừng",
    sentence: "不要。",
    translation: "không cần, đừng."
  }, {
    id: "h2_36",
    hanzi: "不好意思",
    pinyin: "bù hǎoyìsi",
    meaning: "ngại quá, thật là ngại",
    sentence: "不好意思。",
    translation: "ngại quá, thật là ngại."
  }, {
    id: "h2_37",
    hanzi: "不久",
    pinyin: "bùjiǔ",
    meaning: "không lâu",
    sentence: "不久。",
    translation: "không lâu."
  }, {
    id: "h2_38",
    hanzi: "不满",
    pinyin: "bùmǎn",
    meaning: "bất mãn, không hài lòng",
    sentence: "不满。",
    translation: "bất mãn, không hài lòng."
  }, {
    id: "h2_39",
    hanzi: "不如",
    pinyin: "bùrú",
    meaning: "chẳng bằng, hay là",
    sentence: "不如。",
    translation: "chẳng bằng, hay là."
  }, {
    id: "h2_40",
    hanzi: "不少",
    pinyin: "bù shǎo",
    meaning: "không ít, nhiều",
    sentence: "不少。",
    translation: "không ít, nhiều."
  }, {
    id: "h2_41",
    hanzi: "不同",
    pinyin: "bù tóng",
    meaning: "không giống nhau",
    sentence: "不同。",
    translation: "không giống nhau."
  }, {
    id: "h2_42",
    hanzi: "不行",
    pinyin: "bùxíng",
    meaning: "không ổn, không được",
    sentence: "不行。",
    translation: "không ổn, không được."
  }, {
    id: "h2_43",
    hanzi: "不一定",
    pinyin: "bùyīdìng",
    meaning: "chưa chắc",
    sentence: "不一定。",
    translation: "chưa chắc."
  }, {
    id: "h2_44",
    hanzi: "不一会儿",
    pinyin: "bù yīhuìr",
    meaning: "không lâu sau, mới một lát",
    sentence: "不一会儿。",
    translation: "không lâu sau, mới một lát."
  }, {
    id: "h2_45",
    hanzi: "部分",
    pinyin: "bùfèn",
    meaning: "phần",
    sentence: "部分。",
    translation: "phần."
  }, {
    id: "h2_46",
    hanzi: "才",
    pinyin: "cái",
    meaning: "(đến lúc đó) mới",
    sentence: "才。",
    translation: "(đến lúc đó) mới."
  }, {
    id: "h2_47",
    hanzi: "菜单",
    pinyin: "càidān",
    meaning: "thực đơn",
    sentence: "菜单。",
    translation: "thực đơn."
  }, {
    id: "h2_48",
    hanzi: "参观",
    pinyin: "cānguān",
    meaning: "tham quan",
    sentence: "参观。",
    translation: "tham quan."
  }, {
    id: "h2_49",
    hanzi: "参加",
    pinyin: "cānjiā",
    meaning: "tham gia",
    sentence: "参加。",
    translation: "tham gia."
  }, {
    id: "h2_50",
    hanzi: "草",
    pinyin: "cǎo",
    meaning: "cỏ",
    sentence: "草。",
    translation: "cỏ."
  }, {
    id: "h2_51",
    hanzi: "草地",
    pinyin: "cǎodì",
    meaning: "bãi cỏ",
    sentence: "草地。",
    translation: "bãi cỏ."
  }, {
    id: "h2_52",
    hanzi: "层",
    pinyin: "céng",
    meaning: "tầng, lớp",
    sentence: "层。",
    translation: "tầng, lớp."
  }, {
    id: "h2_53",
    hanzi: "査",
    pinyin: "chá",
    meaning: "tìm, tra cứu",
    sentence: "査。",
    translation: "tìm, tra cứu."
  }, {
    id: "h2_54",
    hanzi: "差不多",
    pinyin: "chàbùduō",
    meaning: "đại khái, xấp xỉ",
    sentence: "差不多。",
    translation: "đại khái, xấp xỉ."
  }, {
    id: "h2_55",
    hanzi: "长",
    pinyin: "cháng",
    meaning: "dài",
    sentence: "长。",
    translation: "dài."
  }, {
    id: "h2_56",
    hanzi: "常见",
    pinyin: "cháng jiàn",
    meaning: "thường thấy",
    sentence: "常见。",
    translation: "thường thấy."
  }, {
    id: "h2_57",
    hanzi: "常用",
    pinyin: "cháng yòng",
    meaning: "thường dùng, thông dụng",
    sentence: "常用。",
    translation: "thường dùng, thông dụng."
  }, {
    id: "h2_58",
    hanzi: "场",
    pinyin: "chǎng",
    meaning: "sân, bãi, cuộc",
    sentence: "场。",
    translation: "sân, bãi, cuộc."
  }, {
    id: "h2_59",
    hanzi: "超过",
    pinyin: "chāoguò",
    meaning: "hơn, vượt qua",
    sentence: "超过。",
    translation: "hơn, vượt qua."
  }, {
    id: "h2_60",
    hanzi: "超市",
    pinyin: "chāoshì",
    meaning: "siêu thị",
    sentence: "超市。",
    translation: "siêu thị."
  }, {
    id: "h2_61",
    hanzi: "车辆",
    pinyin: "chēliàng",
    meaning: "xe/ phương tiện giao thông",
    sentence: "车辆。",
    translation: "xe/ phương tiện giao thông."
  }, {
    id: "h2_62",
    hanzi: "称",
    pinyin: "chēng",
    meaning: "gọi, xưng hô",
    sentence: "称。",
    translation: "gọi, xưng hô."
  }, {
    id: "h2_63",
    hanzi: "成",
    pinyin: "chéng",
    meaning: "thành, hoàn thành",
    sentence: "成。",
    translation: "thành, hoàn thành."
  }, {
    id: "h2_64",
    hanzi: "成绩",
    pinyin: "chéngjì",
    meaning: "thành tích, thành tựu",
    sentence: "成绩。",
    translation: "thành tích, thành tựu."
  }, {
    id: "h2_65",
    hanzi: "成为",
    pinyin: "chéngwéi",
    meaning: "trở thành, biến thành",
    sentence: "成为。",
    translation: "trở thành, biến thành."
  }, {
    id: "h2_66",
    hanzi: "重复",
    pinyin: "chóngfù",
    meaning: "lặp lại, trùng lặp",
    sentence: "重复。",
    translation: "lặp lại, trùng lặp."
  }, {
    id: "h2_67",
    hanzi: "重新",
    pinyin: "chóngxīn",
    meaning: "làm lại từ đầu",
    sentence: "重新。",
    translation: "làm lại từ đầu."
  }, {
    id: "h2_68",
    hanzi: "出发",
    pinyin: "chūfā",
    meaning: "xuất phát",
    sentence: "出发。",
    translation: "xuất phát."
  }, {
    id: "h2_69",
    hanzi: "出国",
    pinyin: "chū//guó",
    meaning: "xuất ngoại, ra nước ngoài",
    sentence: "出国。",
    translation: "xuất ngoại, ra nước ngoài."
  }, {
    id: "h2_70",
    hanzi: "出口",
    pinyin: "chū kǒu",
    meaning: "lối ra",
    sentence: "出口。",
    translation: "lối ra."
  }, {
    id: "h2_71",
    hanzi: "出门",
    pinyin: "chū//mén",
    meaning: "đi ra ngoài, ra khỏi nhà",
    sentence: "出门。",
    translation: "đi ra ngoài, ra khỏi nhà."
  }, {
    id: "h2_72",
    hanzi: "出生",
    pinyin: "chūshēng",
    meaning: "sinh ra, ra đời",
    sentence: "出生。",
    translation: "sinh ra, ra đời."
  }, {
    id: "h2_73",
    hanzi: "出现",
    pinyin: "chūxiàn",
    meaning: "xuất hiện",
    sentence: "出现。",
    translation: "xuất hiện."
  }, {
    id: "h2_74",
    hanzi: "出院",
    pinyin: "chū//yuàn",
    meaning: "xuất viện, ra viện",
    sentence: "出院。",
    translation: "xuất viện, ra viện."
  }, {
    id: "h2_75",
    hanzi: "出租",
    pinyin: "chū zū",
    meaning: "cho thuê, cho mướn",
    sentence: "出租。",
    translation: "cho thuê, cho mướn."
  }, {
    id: "h2_76",
    hanzi: "出租车",
    pinyin: "chū zū chē",
    meaning: "xe cho thuê",
    sentence: "出租车。",
    translation: "xe cho thuê."
  }, {
    id: "h2_77",
    hanzi: "船",
    pinyin: "chuán",
    meaning: "thuyền, tàu",
    sentence: "船。",
    translation: "thuyền, tàu."
  }, {
    id: "h2_78",
    hanzi: "吹",
    pinyin: "chuī",
    meaning: "thổi, hà hơi, sấy",
    sentence: "吹。",
    translation: "thổi, hà hơi, sấy."
  }, {
    id: "h2_79",
    hanzi: "春节",
    pinyin: "Chūnjié",
    meaning: "Tết âm lịch, tết Nguyên Đán",
    sentence: "春节。",
    translation: "Tết âm lịch, tết Nguyên Đán."
  }, {
    id: "h2_80",
    hanzi: "春天",
    pinyin: "chūntiān",
    meaning: "mùa xuân",
    sentence: "春天。",
    translation: "mùa xuân."
  }, {
    id: "h2_81",
    hanzi: "词",
    pinyin: "cí",
    meaning: "từ",
    sentence: "词。",
    translation: "từ."
  }, {
    id: "h2_82",
    hanzi: "词典",
    pinyin: "cídiǎn",
    meaning: "từ điển",
    sentence: "词典。",
    translation: "từ điển."
  }, {
    id: "h2_83",
    hanzi: "词语",
    pinyin: "cíyǔ",
    meaning: "từ ngữ",
    sentence: "词语。",
    translation: "từ ngữ."
  }, {
    id: "h2_84",
    hanzi: "从小",
    pinyin: "cóngxiǎo",
    meaning: "từ nhỏ, từ bé",
    sentence: "从小。",
    translation: "từ nhỏ, từ bé."
  }, {
    id: "h2_85",
    hanzi: "答应",
    pinyin: "dāying",
    meaning: "trả lời, đồng ý",
    sentence: "答应。",
    translation: "trả lời, đồng ý."
  }, {
    id: "h2_86",
    hanzi: "打工",
    pinyin: "dǎ//gōng",
    meaning: "làm công, làm thêm",
    sentence: "打工。",
    translation: "làm công, làm thêm."
  }, {
    id: "h2_87",
    hanzi: "打算",
    pinyin: "dǎ·suàn",
    meaning: "định; dự toán",
    sentence: "打算。",
    translation: "định; dự toán."
  }, {
    id: "h2_88",
    hanzi: "打印",
    pinyin: "dǎyìn",
    meaning: "in, photo",
    sentence: "打印。",
    translation: "in, photo."
  }, {
    id: "h2_89",
    hanzi: "大部分",
    pinyin: "dàbùfèn",
    meaning: "đa số, phần lớn",
    sentence: "大部分。",
    translation: "đa số, phần lớn."
  }, {
    id: "h2_90",
    hanzi: "大大",
    pinyin: "dàdà",
    meaning: "rất, cực kỳ, vượt bậc",
    sentence: "大大。",
    translation: "rất, cực kỳ, vượt bậc."
  }, {
    id: "h2_91",
    hanzi: "大多数",
    pinyin: "dàduōshù",
    meaning: "đại đa số, phần lớn, số đông",
    sentence: "大多数。",
    translation: "đại đa số, phần lớn, số đông."
  }, {
    id: "h2_92",
    hanzi: "大海",
    pinyin: "dàhǎi",
    meaning: "biển cả, đại dương",
    sentence: "大海。",
    translation: "biển cả, đại dương."
  }, {
    id: "h2_93",
    hanzi: "大家",
    pinyin: "dàjiā",
    meaning: "mọi người",
    sentence: "大家。",
    translation: "mọi người."
  }, {
    id: "h2_94",
    hanzi: "大量",
    pinyin: "dàliàng",
    meaning: "nhiều, lượng lớn, hàng loạt",
    sentence: "大量。",
    translation: "nhiều, lượng lớn, hàng loạt."
  }, {
    id: "h2_95",
    hanzi: "大门",
    pinyin: "dàmén",
    meaning: "cổng, cửa chính",
    sentence: "大门。",
    translation: "cổng, cửa chính."
  }, {
    id: "h2_96",
    hanzi: "大人",
    pinyin: "dàrén",
    meaning: "người lớn",
    sentence: "大人。",
    translation: "người lớn."
  }, {
    id: "h2_97",
    hanzi: "大声",
    pinyin: "dà shēng",
    meaning: "nói to, lớn tiếng",
    sentence: "大声。",
    translation: "nói to, lớn tiếng."
  }, {
    id: "h2_98",
    hanzi: "大小",
    pinyin: "dàxiǎo",
    meaning: "khổ, cỡ",
    sentence: "大小。",
    translation: "khổ, cỡ."
  }, {
    id: "h2_99",
    hanzi: "大衣",
    pinyin: "dàyī",
    meaning: "áo khoác ngoài",
    sentence: "大衣。",
    translation: "áo khoác ngoài."
  }, {
    id: "h2_100",
    hanzi: "大自然",
    pinyin: "dàzìrán",
    meaning: "thiên nhiên, giới thiên nhiên",
    sentence: "大自然。",
    translation: "thiên nhiên, giới thiên nhiên."
  }, {
    id: "h2_101",
    hanzi: "带",
    pinyin: "dài",
    meaning: "mang theo, đem theo, dẫn",
    sentence: "带。",
    translation: "mang theo, đem theo, dẫn."
  }, {
    id: "h2_102",
    hanzi: "带来",
    pinyin: "dài·lái",
    meaning: "đem lại, mang tới",
    sentence: "带来。",
    translation: "đem lại, mang tới."
  }, {
    id: "h2_103",
    hanzi: "单位",
    pinyin: "dānwèi",
    meaning: "đơn vị",
    sentence: "单位。",
    translation: "đơn vị."
  }, {
    id: "h2_104",
    hanzi: "但",
    pinyin: "dàn",
    meaning: "nhưng",
    sentence: "但。",
    translation: "nhưng."
  }, {
    id: "h2_105",
    hanzi: "但是",
    pinyin: "dànshì",
    meaning: "nhưng mà",
    sentence: "但是。",
    translation: "nhưng mà."
  }, {
    id: "h2_106",
    hanzi: "蛋",
    pinyin: "dàn",
    meaning: "trứng",
    sentence: "蛋。",
    translation: "trứng."
  }, {
    id: "h2_107",
    hanzi: "当",
    pinyin: "dāng",
    meaning: "làm, đảm nhiệm",
    sentence: "当。",
    translation: "làm, đảm nhiệm."
  }, {
    id: "h2_108",
    hanzi: "当时",
    pinyin: "dāngshí",
    meaning: "lúc đó, khi đó",
    sentence: "当时。",
    translation: "lúc đó, khi đó."
  }, {
    id: "h2_109",
    hanzi: "倒",
    pinyin: "dǎo",
    meaning: "ngã, đổ",
    sentence: "倒。",
    translation: "ngã, đổ."
  }, {
    id: "h2_110",
    hanzi: "到处",
    pinyin: "dàochù",
    meaning: "khắp nơi, mọi nơi",
    sentence: "到处。",
    translation: "khắp nơi, mọi nơi."
  }, {
    id: "h2_111",
    hanzi: "倒",
    pinyin: "dào",
    meaning: "rót, đổ",
    sentence: "倒。",
    translation: "rót, đổ."
  }, {
    id: "h2_112",
    hanzi: "道",
    pinyin: "dào",
    meaning: "con đường, đường",
    sentence: "道。",
    translation: "con đường, đường."
  }, {
    id: "h2_113",
    hanzi: "道理",
    pinyin: "dào·lǐ",
    meaning: "đạo lý",
    sentence: "道理。",
    translation: "đạo lý."
  }, {
    id: "h2_114",
    hanzi: "道路",
    pinyin: "dàolù",
    meaning: "đường, đường phố",
    sentence: "道路。",
    translation: "đường, đường phố."
  }, {
    id: "h2_115",
    hanzi: "得",
    pinyin: "de",
    meaning: "biểu thị khả năng, sự có thể",
    sentence: "得。",
    translation: "biểu thị khả năng, sự có thể."
  }, {
    id: "h2_116",
    hanzi: "得出",
    pinyin: "déchū",
    meaning: "thu được, đạt được",
    sentence: "得出。",
    translation: "thu được, đạt được."
  }, {
    id: "h2_117",
    hanzi: "的话",
    pinyin: "dehuà",
    meaning: "nếu….",
    sentence: "的话。",
    translation: "nếu….."
  }, {
    id: "h2_118",
    hanzi: "得",
    pinyin: "dé",
    meaning: "được, nhận được",
    sentence: "得。",
    translation: "được, nhận được."
  }, {
    id: "h2_119",
    hanzi: "灯",
    pinyin: "dēng",
    meaning: "đèn",
    sentence: "灯。",
    translation: "đèn."
  }, {
    id: "h2_120",
    hanzi: "等",
    pinyin: "děng",
    meaning: "trợ từ biểu thị sự liệt kê",
    sentence: "等。",
    translation: "trợ từ biểu thị sự liệt kê."
  }, {
    id: "h2_121",
    hanzi: "等到",
    pinyin: "děngdào",
    meaning: "đến lúc, đến khi",
    sentence: "等到。",
    translation: "đến lúc, đến khi."
  }, {
    id: "h2_122",
    hanzi: "等于",
    pinyin: "děngyú",
    meaning: "bằng, là",
    sentence: "等于。",
    translation: "bằng, là."
  }, {
    id: "h2_123",
    hanzi: "低",
    pinyin: "dī",
    meaning: "thấp",
    sentence: "低。",
    translation: "thấp."
  }, {
    id: "h2_124",
    hanzi: "地球",
    pinyin: "dìqiú",
    meaning: "Trái Đất, địa cầu",
    sentence: "地球。",
    translation: "Trái Đất, địa cầu."
  }, {
    id: "h2_125",
    hanzi: "地铁",
    pinyin: "dìtiě",
    meaning: "tàu điện ngầm",
    sentence: "地铁。",
    translation: "tàu điện ngầm."
  }, {
    id: "h2_126",
    hanzi: "地铁站",
    pinyin: "dìtiězhàn",
    meaning: "ga tàu điện ngầm",
    sentence: "地铁站。",
    translation: "ga tàu điện ngầm."
  }, {
    id: "h2_127",
    hanzi: "点头",
    pinyin: "diǎntóu",
    meaning: "gật đầu",
    sentence: "点头。",
    translation: "gật đầu."
  }, {
    id: "h2_128",
    hanzi: "店",
    pinyin: "diàn",
    meaning: "tiệm, quán, cửa hàng",
    sentence: "店。",
    translation: "tiệm, quán, cửa hàng."
  }, {
    id: "h2_129",
    hanzi: "掉",
    pinyin: "diào",
    meaning: "rơi, rớt, mất",
    sentence: "掉。",
    translation: "rơi, rớt, mất."
  }, {
    id: "h2_130",
    hanzi: "东北",
    pinyin: "dōngběi",
    meaning: "Đông Bắc",
    sentence: "东北。",
    translation: "Đông Bắc."
  }, {
    id: "h2_131",
    hanzi: "东方",
    pinyin: "dōngfāng",
    meaning: "phương Đông",
    sentence: "东方。",
    translation: "phương Đông."
  }, {
    id: "h2_132",
    hanzi: "东南",
    pinyin: "dōngnán",
    meaning: "đông nam",
    sentence: "东南。",
    translation: "đông nam."
  }, {
    id: "h2_133",
    hanzi: "冬天",
    pinyin: "dōngtiān",
    meaning: "mùa đông",
    sentence: "冬天。",
    translation: "mùa đông."
  }, {
    id: "h2_134",
    hanzi: "懂",
    pinyin: "dǒng",
    meaning: "hiểu",
    sentence: "懂。",
    translation: "hiểu."
  }, {
    id: "h2_135",
    hanzi: "懂得",
    pinyin: "dǒngde",
    meaning: "hiểu được",
    sentence: "懂得。",
    translation: "hiểu được."
  }, {
    id: "h2_136",
    hanzi: "动物",
    pinyin: "dòngwù",
    meaning: "động vật",
    sentence: "动物。",
    translation: "động vật."
  }, {
    id: "h2_137",
    hanzi: "动物园",
    pinyin: "dòngwùyuán",
    meaning: "vườn bách thú, sở thú",
    sentence: "动物园。",
    translation: "vườn bách thú, sở thú."
  }, {
    id: "h2_138",
    hanzi: "读音",
    pinyin: "dúyīn",
    meaning: "cách đọc, âm đọc",
    sentence: "读音。",
    translation: "cách đọc, âm đọc."
  }, {
    id: "h2_139",
    hanzi: "度",
    pinyin: "dù",
    meaning: "độ",
    sentence: "度。",
    translation: "độ."
  }, {
    id: "h2_140",
    hanzi: "短",
    pinyin: "duǎn",
    meaning: "ngắn",
    sentence: "短。",
    translation: "ngắn."
  }, {
    id: "h2_141",
    hanzi: "短信",
    pinyin: "duǎnxìn",
    meaning: "tin nhắn",
    sentence: "短信。",
    translation: "tin nhắn."
  }, {
    id: "h2_142",
    hanzi: "段",
    pinyin: "duàn",
    meaning: "đoạn, quãng, khúc",
    sentence: "段。",
    translation: "đoạn, quãng, khúc."
  }, {
    id: "h2_143",
    hanzi: "队",
    pinyin: "duì",
    meaning: "đội, nhóm",
    sentence: "队。",
    translation: "đội, nhóm."
  }, {
    id: "h2_144",
    hanzi: "队长",
    pinyin: "duì zhǎng",
    meaning: "đội trưởng, nhóm trưởng",
    sentence: "队长。",
    translation: "đội trưởng, nhóm trưởng."
  }, {
    id: "h2_145",
    hanzi: "对",
    pinyin: "duì",
    meaning: "đối với, đối đãi",
    sentence: "对。",
    translation: "đối với, đối đãi."
  }, {
    id: "h2_146",
    hanzi: "对话",
    pinyin: "duìhuà",
    meaning: "đối thoại, hội thoại",
    sentence: "对话。",
    translation: "đối thoại, hội thoại."
  }, {
    id: "h2_147",
    hanzi: "对面",
    pinyin: "duìmiàn",
    meaning: "đối diện",
    sentence: "对面。",
    translation: "đối diện."
  }, {
    id: "h2_148",
    hanzi: "多",
    pinyin: "duō",
    meaning: "bao nhiêu, to nhường nào",
    sentence: "多。",
    translation: "bao nhiêu, to nhường nào."
  }, {
    id: "h2_149",
    hanzi: "多久",
    pinyin: "duōjiǔ",
    meaning: "bao lâu",
    sentence: "多久。",
    translation: "bao lâu."
  }, {
    id: "h2_150",
    hanzi: "多么",
    pinyin: "duōme",
    meaning: "bao nhiêu, bao xa",
    sentence: "多么。",
    translation: "bao nhiêu, bao xa."
  }],
  3: [{
    id: "h3_1",
    hanzi: "阿姨",
    pinyin: "ā yí",
    meaning: "cô, dì",
    sentence: "阿姨。",
    translation: "cô, dì."
  }, {
    id: "h3_2",
    hanzi: "啊",
    pinyin: "a",
    meaning: "a, à, ừ, ờ",
    sentence: "啊。",
    translation: "a, à, ừ, ờ."
  }, {
    id: "h3_3",
    hanzi: "矮",
    pinyin: "ǎi",
    meaning: "thấp",
    sentence: "矮。",
    translation: "thấp."
  }, {
    id: "h3_4",
    hanzi: "爱好",
    pinyin: "ài hào",
    meaning: "yêu thích, thích",
    sentence: "爱好。",
    translation: "yêu thích, thích."
  }, {
    id: "h3_5",
    hanzi: "安静",
    pinyin: "ān jìng",
    meaning: "yên lặng",
    sentence: "安静。",
    translation: "yên lặng."
  }, {
    id: "h3_6",
    hanzi: "把",
    pinyin: "bǎ",
    meaning: "lấy, đem",
    sentence: "把。",
    translation: "lấy, đem."
  }, {
    id: "h3_7",
    hanzi: "搬",
    pinyin: "bān",
    meaning: "chuyển đi",
    sentence: "搬。",
    translation: "chuyển đi."
  }, {
    id: "h3_8",
    hanzi: "班",
    pinyin: "bān",
    meaning: "lớp",
    sentence: "班。",
    translation: "lớp."
  }, {
    id: "h3_9",
    hanzi: "半",
    pinyin: "bàn",
    meaning: "nửa",
    sentence: "半。",
    translation: "nửa."
  }, {
    id: "h3_10",
    hanzi: "办法",
    pinyin: "bàn fǎ",
    meaning: "biện pháp, cách",
    sentence: "办法。",
    translation: "biện pháp, cách."
  }, {
    id: "h3_11",
    hanzi: "办公室",
    pinyin: "bàn gōng shì",
    meaning: "văn phòng",
    sentence: "办公室。",
    translation: "văn phòng."
  }, {
    id: "h3_12",
    hanzi: "帮忙",
    pinyin: "bāng máng",
    meaning: "giúp, giúp đỡ",
    sentence: "帮忙。",
    translation: "giúp, giúp đỡ."
  }, {
    id: "h3_13",
    hanzi: "包",
    pinyin: "bāo",
    meaning: "bao, túi",
    sentence: "包。",
    translation: "bao, túi."
  }, {
    id: "h3_14",
    hanzi: "饱",
    pinyin: "bǎo",
    meaning: "no",
    sentence: "饱。",
    translation: "no."
  }, {
    id: "h3_15",
    hanzi: "报纸",
    pinyin: "bào zhǐ",
    meaning: "báo chí",
    sentence: "报纸。",
    translation: "báo chí."
  }, {
    id: "h3_16",
    hanzi: "北方",
    pinyin: "běi fāng",
    meaning: "miền Bắc",
    sentence: "北方。",
    translation: "miền Bắc."
  }, {
    id: "h3_17",
    hanzi: "被",
    pinyin: "bèi",
    meaning: "bị, được",
    sentence: "被。",
    translation: "bị, được."
  }, {
    id: "h3_18",
    hanzi: "鼻子",
    pinyin: "bí zi",
    meaning: "mũi",
    sentence: "鼻子。",
    translation: "mũi."
  }, {
    id: "h3_19",
    hanzi: "比较",
    pinyin: "bǐ jiào",
    meaning: "so với",
    sentence: "比较。",
    translation: "so với."
  }, {
    id: "h3_20",
    hanzi: "比赛",
    pinyin: "bǐ sài",
    meaning: "thi đấu",
    sentence: "比赛。",
    translation: "thi đấu."
  }, {
    id: "h3_21",
    hanzi: "必须",
    pinyin: "bì xū",
    meaning: "phải, cần phải",
    sentence: "必须。",
    translation: "phải, cần phải."
  }, {
    id: "h3_22",
    hanzi: "变化",
    pinyin: "biàn huà",
    meaning: "biến hóa, thay đổi",
    sentence: "变化。",
    translation: "biến hóa, thay đổi."
  }, {
    id: "h3_23",
    hanzi: "表示",
    pinyin: "biǎo shì",
    meaning: "biểu thị, bày tỏ",
    sentence: "表示。",
    translation: "biểu thị, bày tỏ."
  }, {
    id: "h3_24",
    hanzi: "表演",
    pinyin: "biǎo yǎn",
    meaning: "biểu diễn",
    sentence: "表演。",
    translation: "biểu diễn."
  }, {
    id: "h3_25",
    hanzi: "别人",
    pinyin: "bié rén",
    meaning: "người khác",
    sentence: "别人。",
    translation: "người khác."
  }, {
    id: "h3_26",
    hanzi: "宾馆",
    pinyin: "bīn guǎn",
    meaning: "nhà khách, khách sạn",
    sentence: "宾馆。",
    translation: "nhà khách, khách sạn."
  }, {
    id: "h3_27",
    hanzi: "冰箱",
    pinyin: "bīng xiāng",
    meaning: "tủ lạnh, tủ đá",
    sentence: "冰箱。",
    translation: "tủ lạnh, tủ đá."
  }, {
    id: "h3_28",
    hanzi: "才",
    pinyin: "cái",
    meaning: "mới (động tác diễn ra muộn)",
    sentence: "才。",
    translation: "mới (động tác diễn ra muộn)."
  }, {
    id: "h3_29",
    hanzi: "菜单",
    pinyin: "cài dān",
    meaning: "thực đơn",
    sentence: "菜单。",
    translation: "thực đơn."
  }, {
    id: "h3_30",
    hanzi: "参加",
    pinyin: "cān jiā",
    meaning: "tham gia",
    sentence: "参加。",
    translation: "tham gia."
  }, {
    id: "h3_31",
    hanzi: "草",
    pinyin: "cǎo",
    meaning: "cỏ",
    sentence: "草。",
    translation: "cỏ."
  }, {
    id: "h3_32",
    hanzi: "层",
    pinyin: "céng",
    meaning: "tầng",
    sentence: "层。",
    translation: "tầng."
  }, {
    id: "h3_33",
    hanzi: "差",
    pinyin: "chà",
    meaning: "kém",
    sentence: "差。",
    translation: "kém."
  }, {
    id: "h3_34",
    hanzi: "超市",
    pinyin: "chāo shì",
    meaning: "siêu thị",
    sentence: "超市。",
    translation: "siêu thị."
  }, {
    id: "h3_35",
    hanzi: "衬衫",
    pinyin: "chèn shān",
    meaning: "áo sơ mi",
    sentence: "衬衫。",
    translation: "áo sơ mi."
  }, {
    id: "h3_36",
    hanzi: "成绩",
    pinyin: "chéng jì",
    meaning: "thành tích",
    sentence: "成绩。",
    translation: "thành tích."
  }, {
    id: "h3_37",
    hanzi: "城市",
    pinyin: "chéng shì",
    meaning: "thành phố",
    sentence: "城市。",
    translation: "thành phố."
  }, {
    id: "h3_38",
    hanzi: "迟到",
    pinyin: "chí dào",
    meaning: "đến muộn",
    sentence: "迟到。",
    translation: "đến muộn."
  }, {
    id: "h3_39",
    hanzi: "出现",
    pinyin: "chū xiàn",
    meaning: "xuất hiện",
    sentence: "出现。",
    translation: "xuất hiện."
  }, {
    id: "h3_40",
    hanzi: "厨房",
    pinyin: "chú fáng",
    meaning: "bếp",
    sentence: "厨房。",
    translation: "bếp."
  }, {
    id: "h3_41",
    hanzi: "除了",
    pinyin: "chú le",
    meaning: "ngoài ra, trừ ra",
    sentence: "除了。",
    translation: "ngoài ra, trừ ra."
  }, {
    id: "h3_42",
    hanzi: "春",
    pinyin: "chūn",
    meaning: "mùa xuân",
    sentence: "春。",
    translation: "mùa xuân."
  }, {
    id: "h3_43",
    hanzi: "词语",
    pinyin: "cí yǔ",
    meaning: "từ ngữ",
    sentence: "词语。",
    translation: "từ ngữ."
  }, {
    id: "h3_44",
    hanzi: "聪明",
    pinyin: "cōng ming",
    meaning: "thông minh",
    sentence: "聪明。",
    translation: "thông minh."
  }, {
    id: "h3_45",
    hanzi: "打扫",
    pinyin: "dǎ sǎo",
    meaning: "quét, quét dọn",
    sentence: "打扫。",
    translation: "quét, quét dọn."
  }, {
    id: "h3_46",
    hanzi: "打算",
    pinyin: "dǎ suàn",
    meaning: "định, dự định, tính toán",
    sentence: "打算。",
    translation: "định, dự định, tính toán."
  }, {
    id: "h3_47",
    hanzi: "带",
    pinyin: "dài",
    meaning: "đem, mang",
    sentence: "带。",
    translation: "đem, mang."
  }, {
    id: "h3_48",
    hanzi: "担心",
    pinyin: "dān xīn",
    meaning: "lo lắng",
    sentence: "担心。",
    translation: "lo lắng."
  }, {
    id: "h3_49",
    hanzi: "蛋糕",
    pinyin: "dàn gāo",
    meaning: "bánh ga tô",
    sentence: "蛋糕。",
    translation: "bánh ga tô."
  }, {
    id: "h3_50",
    hanzi: "当然",
    pinyin: "dāng rán",
    meaning: "đương nhiên",
    sentence: "当然。",
    translation: "đương nhiên."
  }, {
    id: "h3_51",
    hanzi: "灯",
    pinyin: "dēng",
    meaning: "đèn",
    sentence: "灯。",
    translation: "đèn."
  }, {
    id: "h3_52",
    hanzi: "低",
    pinyin: "dī",
    meaning: "thấp",
    sentence: "低。",
    translation: "thấp."
  }, {
    id: "h3_53",
    hanzi: "地方",
    pinyin: "dì fāng",
    meaning: "địa phương, chỗ, nơi vùng",
    sentence: "地方。",
    translation: "địa phương, chỗ, nơi vùng."
  }, {
    id: "h3_54",
    hanzi: "地铁",
    pinyin: "dì tiě",
    meaning: "xe điện ngầm",
    sentence: "地铁。",
    translation: "xe điện ngầm."
  }, {
    id: "h3_55",
    hanzi: "地图",
    pinyin: "dì tú",
    meaning: "bản đồ",
    sentence: "地图。",
    translation: "bản đồ."
  }, {
    id: "h3_56",
    hanzi: "电梯",
    pinyin: "diàn tī",
    meaning: "thang máy",
    sentence: "电梯。",
    translation: "thang máy."
  }, {
    id: "h3_57",
    hanzi: "电子邮件",
    pinyin: "diàn zǐ yóu jiàn",
    meaning: "e-mail",
    sentence: "电子邮件。",
    translation: "e-mail."
  }, {
    id: "h3_58",
    hanzi: "东",
    pinyin: "dōng",
    meaning: "phía đông",
    sentence: "东。",
    translation: "phía đông."
  }, {
    id: "h3_59",
    hanzi: "冬",
    pinyin: "dōng",
    meaning: "mùa đông",
    sentence: "冬。",
    translation: "mùa đông."
  }, {
    id: "h3_60",
    hanzi: "懂",
    pinyin: "dǒng",
    meaning: "hiểu",
    sentence: "懂。",
    translation: "hiểu."
  }, {
    id: "h3_61",
    hanzi: "动物",
    pinyin: "dòng wù",
    meaning: "động vật",
    sentence: "动物。",
    translation: "động vật."
  }, {
    id: "h3_62",
    hanzi: "短",
    pinyin: "duǎn",
    meaning: "ngắn",
    sentence: "短。",
    translation: "ngắn."
  }, {
    id: "h3_63",
    hanzi: "段",
    pinyin: "duàn",
    meaning: "đoạn",
    sentence: "段。",
    translation: "đoạn."
  }, {
    id: "h3_64",
    hanzi: "锻炼",
    pinyin: "duàn liàn",
    meaning: "tập luyện, rèn luyện",
    sentence: "锻炼。",
    translation: "tập luyện, rèn luyện."
  }, {
    id: "h3_65",
    hanzi: "多么",
    pinyin: "duō me",
    meaning: "bao nhiêu, biết bao",
    sentence: "多么。",
    translation: "bao nhiêu, biết bao."
  }, {
    id: "h3_66",
    hanzi: "饿",
    pinyin: "è",
    meaning: "đói",
    sentence: "饿。",
    translation: "đói."
  }, {
    id: "h3_67",
    hanzi: "而且",
    pinyin: "ér qiě",
    meaning: "mà còn, hơn nữa",
    sentence: "而且。",
    translation: "mà còn, hơn nữa."
  }, {
    id: "h3_68",
    hanzi: "耳朵",
    pinyin: "ěr duo",
    meaning: "tai",
    sentence: "耳朵。",
    translation: "tai."
  }, {
    id: "h3_69",
    hanzi: "发烧",
    pinyin: "fā shāo",
    meaning: "phát sốt, sốt",
    sentence: "发烧。",
    translation: "phát sốt, sốt."
  }, {
    id: "h3_70",
    hanzi: "发现",
    pinyin: "fā xiàn",
    meaning: "tìm ra, phát hiện",
    sentence: "发现。",
    translation: "tìm ra, phát hiện."
  }, {
    id: "h3_71",
    hanzi: "方便",
    pinyin: "fāng biàn",
    meaning: "thuận tiện, thuận lợi",
    sentence: "方便。",
    translation: "thuận tiện, thuận lợi."
  }, {
    id: "h3_72",
    hanzi: "放",
    pinyin: "fàng",
    meaning: "tha, thả",
    sentence: "放。",
    translation: "tha, thả."
  }, {
    id: "h3_73",
    hanzi: "放心",
    pinyin: "fàng xīn",
    meaning: "yên trí, yên tâm",
    sentence: "放心。",
    translation: "yên trí, yên tâm."
  }, {
    id: "h3_74",
    hanzi: "分",
    pinyin: "fēn",
    meaning: "phân chia, chia",
    sentence: "分。",
    translation: "phân chia, chia."
  }, {
    id: "h3_75",
    hanzi: "附近",
    pinyin: "fù jìn",
    meaning: "gần cận, cận",
    sentence: "附近。",
    translation: "gần cận, cận."
  }, {
    id: "h3_76",
    hanzi: "复习",
    pinyin: "fù xí",
    meaning: "ôn tập",
    sentence: "复习。",
    translation: "ôn tập."
  }, {
    id: "h3_77",
    hanzi: "干净",
    pinyin: "gān jìng",
    meaning: "sạch sẽ",
    sentence: "干净。",
    translation: "sạch sẽ."
  }, {
    id: "h3_78",
    hanzi: "敢",
    pinyin: "gǎn",
    meaning: "dám",
    sentence: "敢。",
    translation: "dám."
  }, {
    id: "h3_79",
    hanzi: "感冒",
    pinyin: "gǎn mào",
    meaning: "bị cảm",
    sentence: "感冒。",
    translation: "bị cảm."
  }, {
    id: "h3_80",
    hanzi: "刚才",
    pinyin: "gāng cái",
    meaning: "vừa, vừa mới",
    sentence: "刚才。",
    translation: "vừa, vừa mới."
  }, {
    id: "h3_81",
    hanzi: "跟",
    pinyin: "gēn",
    meaning: "theo",
    sentence: "跟。",
    translation: "theo."
  }, {
    id: "h3_82",
    hanzi: "根据",
    pinyin: "gēn jù",
    meaning: "căn cứ",
    sentence: "根据。",
    translation: "căn cứ."
  }, {
    id: "h3_83",
    hanzi: "更",
    pinyin: "gèng",
    meaning: "hơn nữa, càng, thêm",
    sentence: "更。",
    translation: "hơn nữa, càng, thêm."
  }, {
    id: "h3_84",
    hanzi: "公园",
    pinyin: "gōng yuán",
    meaning: "công viện",
    sentence: "公园。",
    translation: "công viện."
  }, {
    id: "h3_85",
    hanzi: "故事",
    pinyin: "gù shi",
    meaning: "truyện",
    sentence: "故事。",
    translation: "truyện."
  }, {
    id: "h3_86",
    hanzi: "刮风",
    pinyin: "guā fēng",
    meaning: "gió thổi",
    sentence: "刮风。",
    translation: "gió thổi."
  }, {
    id: "h3_87",
    hanzi: "关",
    pinyin: "guān",
    meaning: "đóng, tắt",
    sentence: "关。",
    translation: "đóng, tắt."
  }, {
    id: "h3_88",
    hanzi: "关系",
    pinyin: "guān xì",
    meaning: "quan hệ, liên quan",
    sentence: "关系。",
    translation: "quan hệ, liên quan."
  }, {
    id: "h3_89",
    hanzi: "关心",
    pinyin: "guān xīn",
    meaning: "quan tâm",
    sentence: "关心。",
    translation: "quan tâm."
  }, {
    id: "h3_90",
    hanzi: "关于",
    pinyin: "guān yú",
    meaning: "về",
    sentence: "关于。",
    translation: "về."
  }, {
    id: "h3_91",
    hanzi: "国家",
    pinyin: "guó jiā",
    meaning: "nhà nước, quốc gia",
    sentence: "国家。",
    translation: "nhà nước, quốc gia."
  }, {
    id: "h3_92",
    hanzi: "果汁",
    pinyin: "guǒ zhī",
    meaning: "nước hoa quả",
    sentence: "果汁。",
    translation: "nước hoa quả."
  }, {
    id: "h3_93",
    hanzi: "过去",
    pinyin: "guò qù",
    meaning: "đã qua, trước đây, đi qua",
    sentence: "过去。",
    translation: "đã qua, trước đây, đi qua."
  }, {
    id: "h3_94",
    hanzi: "还是",
    pinyin: "hái shì",
    meaning: "vẫn, còn, hoặc, hay",
    sentence: "还是。",
    translation: "vẫn, còn, hoặc, hay."
  }, {
    id: "h3_95",
    hanzi: "害怕",
    pinyin: "hài pà",
    meaning: "sợ",
    sentence: "害怕。",
    translation: "sợ."
  }, {
    id: "h3_96",
    hanzi: "河",
    pinyin: "hé",
    meaning: "sông",
    sentence: "河。",
    translation: "sông."
  }, {
    id: "h3_97",
    hanzi: "黑板",
    pinyin: "hēi bǎn",
    meaning: "bảng đen",
    sentence: "黑板。",
    translation: "bảng đen."
  }, {
    id: "h3_98",
    hanzi: "护照",
    pinyin: "hù zhào",
    meaning: "hộ chiếu",
    sentence: "护照。",
    translation: "hộ chiếu."
  }, {
    id: "h3_99",
    hanzi: "花",
    pinyin: "huā",
    meaning: "hoa",
    sentence: "花。",
    translation: "hoa."
  }, {
    id: "h3_100",
    hanzi: "花园",
    pinyin: "huā yuán",
    meaning: "hoa viên",
    sentence: "花园。",
    translation: "hoa viên."
  }, {
    id: "h3_101",
    hanzi: "画",
    pinyin: "huà",
    meaning: "vẽ, họa, bức tranh",
    sentence: "画。",
    translation: "vẽ, họa, bức tranh."
  }, {
    id: "h3_102",
    hanzi: "坏",
    pinyin: "huài",
    meaning: "xấu, hỏng",
    sentence: "坏。",
    translation: "xấu, hỏng."
  }, {
    id: "h3_103",
    hanzi: "还",
    pinyin: "huán",
    meaning: "hoàn trả",
    sentence: "还。",
    translation: "hoàn trả."
  }, {
    id: "h3_104",
    hanzi: "环境",
    pinyin: "huán jìng",
    meaning: "môi trường, hoàn cảnh",
    sentence: "环境。",
    translation: "môi trường, hoàn cảnh."
  }, {
    id: "h3_105",
    hanzi: "换",
    pinyin: "huàn",
    meaning: "đổi, thay đổi, trao đổi",
    sentence: "换。",
    translation: "đổi, thay đổi, trao đổi."
  }, {
    id: "h3_106",
    hanzi: "黄",
    pinyin: "huáng",
    meaning: "màu vàng",
    sentence: "黄。",
    translation: "màu vàng."
  }, {
    id: "h3_107",
    hanzi: "会议",
    pinyin: "huì yì",
    meaning: "hội nghị",
    sentence: "会议。",
    translation: "hội nghị."
  }, {
    id: "h3_108",
    hanzi: "或者",
    pinyin: "huò zhě",
    meaning: "hoặc",
    sentence: "或者。",
    translation: "hoặc."
  }, {
    id: "h3_109",
    hanzi: "几乎",
    pinyin: "jī hū",
    meaning: "hầu như, cơ hồ",
    sentence: "几乎。",
    translation: "hầu như, cơ hồ."
  }, {
    id: "h3_110",
    hanzi: "机会",
    pinyin: "jī huì",
    meaning: "cơ hội, dịp",
    sentence: "机会。",
    translation: "cơ hội, dịp."
  }, {
    id: "h3_111",
    hanzi: "极",
    pinyin: "jí",
    meaning: "rất, hết, cực",
    sentence: "极。",
    translation: "rất, hết, cực."
  }, {
    id: "h3_112",
    hanzi: "记得",
    pinyin: "jì dé",
    meaning: "nhớ, nhớ được",
    sentence: "记得。",
    translation: "nhớ, nhớ được."
  }, {
    id: "h3_113",
    hanzi: "季节",
    pinyin: "jì jié",
    meaning: "mùa, mùa khí hậu",
    sentence: "季节。",
    translation: "mùa, mùa khí hậu."
  }, {
    id: "h3_114",
    hanzi: "检查",
    pinyin: "jiǎn chá",
    meaning: "kiểm tra",
    sentence: "检查。",
    translation: "kiểm tra."
  }, {
    id: "h3_115",
    hanzi: "简单",
    pinyin: "jiǎn dān",
    meaning: "đơn giản",
    sentence: "简单。",
    translation: "đơn giản."
  }, {
    id: "h3_116",
    hanzi: "健康",
    pinyin: "jiàn kāng",
    meaning: "khỏe mạnh",
    sentence: "健康。",
    translation: "khỏe mạnh."
  }, {
    id: "h3_117",
    hanzi: "见面",
    pinyin: "jiàn miàn",
    meaning: "gặp mặt, gặp nhau",
    sentence: "见面。",
    translation: "gặp mặt, gặp nhau."
  }, {
    id: "h3_118",
    hanzi: "讲",
    pinyin: "jiǎng",
    meaning: "nói, kể, giảng",
    sentence: "讲。",
    translation: "nói, kể, giảng."
  }, {
    id: "h3_119",
    hanzi: "教",
    pinyin: "jiāo",
    meaning: "dạy",
    sentence: "教。",
    translation: "dạy."
  }, {
    id: "h3_120",
    hanzi: "角",
    pinyin: "jiǎo",
    meaning: "sừng, góc",
    sentence: "角。",
    translation: "sừng, góc."
  }, {
    id: "h3_121",
    hanzi: "脚",
    pinyin: "jiǎo",
    meaning: "chân",
    sentence: "脚。",
    translation: "chân."
  }, {
    id: "h3_122",
    hanzi: "接",
    pinyin: "jiē",
    meaning: "tiếp, nối, đón",
    sentence: "接。",
    translation: "tiếp, nối, đón."
  }, {
    id: "h3_123",
    hanzi: "街道",
    pinyin: "jiē dào",
    meaning: "phố, đường",
    sentence: "街道。",
    translation: "phố, đường."
  }, {
    id: "h3_124",
    hanzi: "结婚",
    pinyin: "jié hūn",
    meaning: "kết hôn, lấy nhau",
    sentence: "结婚。",
    translation: "kết hôn, lấy nhau."
  }, {
    id: "h3_125",
    hanzi: "节目",
    pinyin: "jié mù",
    meaning: "tiết mục",
    sentence: "节目。",
    translation: "tiết mục."
  }, {
    id: "h3_126",
    hanzi: "节日",
    pinyin: "jié rì",
    meaning: "ngày lễ, ngày tết",
    sentence: "节日。",
    translation: "ngày lễ, ngày tết."
  }, {
    id: "h3_127",
    hanzi: "结束",
    pinyin: "jié shù",
    meaning: "kết thúc, hết",
    sentence: "结束。",
    translation: "kết thúc, hết."
  }, {
    id: "h3_128",
    hanzi: "解决",
    pinyin: "jiě jué",
    meaning: "giải quyết",
    sentence: "解决。",
    translation: "giải quyết."
  }, {
    id: "h3_129",
    hanzi: "借",
    pinyin: "jiè",
    meaning: "mượn",
    sentence: "借。",
    translation: "mượn."
  }, {
    id: "h3_130",
    hanzi: "经常",
    pinyin: "jīng cháng",
    meaning: "thường, thường xuyên",
    sentence: "经常。",
    translation: "thường, thường xuyên."
  }, {
    id: "h3_131",
    hanzi: "经过",
    pinyin: "jīng guò",
    meaning: "quá trình, qua, đi qua",
    sentence: "经过。",
    translation: "quá trình, qua, đi qua."
  }, {
    id: "h3_132",
    hanzi: "经理",
    pinyin: "jīng lǐ",
    meaning: "giám đốc",
    sentence: "经理。",
    translation: "giám đốc."
  }, {
    id: "h3_133",
    hanzi: "久",
    pinyin: "jiǔ",
    meaning: "lâu, lâu đời",
    sentence: "久。",
    translation: "lâu, lâu đời."
  }, {
    id: "h3_134",
    hanzi: "旧",
    pinyin: "jiù",
    meaning: "cũ",
    sentence: "旧。",
    translation: "cũ."
  }, {
    id: "h3_135",
    hanzi: "举行",
    pinyin: "jǔ xíng",
    meaning: "tổ chức, cử hành",
    sentence: "举行。",
    translation: "tổ chức, cử hành."
  }, {
    id: "h3_136",
    hanzi: "句子",
    pinyin: "jù zǐ",
    meaning: "câu",
    sentence: "句子。",
    translation: "câu."
  }, {
    id: "h3_137",
    hanzi: "决定",
    pinyin: "jué dìng",
    meaning: "quyết định",
    sentence: "决定。",
    translation: "quyết định."
  }, {
    id: "h3_138",
    hanzi: "渴",
    pinyin: "kě",
    meaning: "khát",
    sentence: "渴。",
    translation: "khát."
  }, {
    id: "h3_139",
    hanzi: "可爱",
    pinyin: "kě ài",
    meaning: "đáng yêu, dễ thương",
    sentence: "可爱。",
    translation: "đáng yêu, dễ thương."
  }, {
    id: "h3_140",
    hanzi: "刻",
    pinyin: "kè",
    meaning: "chạm khắc",
    sentence: "刻。",
    translation: "chạm khắc."
  }, {
    id: "h3_141",
    hanzi: "客人",
    pinyin: "kè rén",
    meaning: "khách",
    sentence: "客人。",
    translation: "khách."
  }, {
    id: "h3_142",
    hanzi: "空调",
    pinyin: "kōng tiáo",
    meaning: "máy điều hòa nhiệt độ",
    sentence: "空调。",
    translation: "máy điều hòa nhiệt độ."
  }, {
    id: "h3_143",
    hanzi: "口",
    pinyin: "kǒu",
    meaning: "miệng, khẩu",
    sentence: "口。",
    translation: "miệng, khẩu."
  }, {
    id: "h3_144",
    hanzi: "哭",
    pinyin: "kū",
    meaning: "khóc",
    sentence: "哭。",
    translation: "khóc."
  }, {
    id: "h3_145",
    hanzi: "裤子",
    pinyin: "kù zi",
    meaning: "quần",
    sentence: "裤子。",
    translation: "quần."
  }, {
    id: "h3_146",
    hanzi: "块",
    pinyin: "kuài",
    meaning: "miếng, viên",
    sentence: "块。",
    translation: "miếng, viên."
  }, {
    id: "h3_147",
    hanzi: "筷子",
    pinyin: "kuài zi",
    meaning: "đũa",
    sentence: "筷子。",
    translation: "đũa."
  }, {
    id: "h3_148",
    hanzi: "蓝",
    pinyin: "lán",
    meaning: "xanh lam",
    sentence: "蓝。",
    translation: "xanh lam."
  }, {
    id: "h3_149",
    hanzi: "老",
    pinyin: "lǎo",
    meaning: "già",
    sentence: "老。",
    translation: "già."
  }, {
    id: "h3_150",
    hanzi: "离开",
    pinyin: "lí kāi",
    meaning: "rời khỏi",
    sentence: "离开。",
    translation: "rời khỏi."
  }, {
    id: "h3_151",
    hanzi: "礼物",
    pinyin: "lǐ wù",
    meaning: "quà, lễ vật",
    sentence: "礼物。",
    translation: "quà, lễ vật."
  }, {
    id: "h3_152",
    hanzi: "历史",
    pinyin: "lì shǐ",
    meaning: "lịch sử",
    sentence: "历史。",
    translation: "lịch sử."
  }, {
    id: "h3_153",
    hanzi: "脸",
    pinyin: "liǎn",
    meaning: "mặt",
    sentence: "脸。",
    translation: "mặt."
  }, {
    id: "h3_154",
    hanzi: "练习",
    pinyin: "liàn xí",
    meaning: "luyện tập",
    sentence: "练习。",
    translation: "luyện tập."
  }, {
    id: "h3_155",
    hanzi: "辆",
    pinyin: "liàng",
    meaning: "chiếc, cái, kiện",
    sentence: "辆。",
    translation: "chiếc, cái, kiện."
  }, {
    id: "h3_156",
    hanzi: "了解",
    pinyin: "liáo jiě",
    meaning: "hiểu rõ, biết rõ",
    sentence: "了解。",
    translation: "hiểu rõ, biết rõ."
  }, {
    id: "h3_157",
    hanzi: "邻居",
    pinyin: "lín jū",
    meaning: "hàng xóm",
    sentence: "邻居。",
    translation: "hàng xóm."
  }, {
    id: "h3_158",
    hanzi: "楼",
    pinyin: "lóu",
    meaning: "lầu, tầng",
    sentence: "楼。",
    translation: "lầu, tầng."
  }, {
    id: "h3_159",
    hanzi: "绿",
    pinyin: "lv",
    meaning: "xanh lục",
    sentence: "绿。",
    translation: "xanh lục."
  }, {
    id: "h3_160",
    hanzi: "马",
    pinyin: "mǎ",
    meaning: "con ngựa",
    sentence: "马。",
    translation: "con ngựa."
  }, {
    id: "h3_161",
    hanzi: "马上",
    pinyin: "mǎ shàng",
    meaning: "ngay, lập tức",
    sentence: "马上。",
    translation: "ngay, lập tức."
  }, {
    id: "h3_162",
    hanzi: "卖",
    pinyin: "mài",
    meaning: "bán",
    sentence: "卖。",
    translation: "bán."
  }, {
    id: "h3_163",
    hanzi: "满意",
    pinyin: "mǎn yì",
    meaning: "hài lòng",
    sentence: "满意。",
    translation: "hài lòng."
  }, {
    id: "h3_164",
    hanzi: "帽子",
    pinyin: "mào zǐ",
    meaning: "mũ",
    sentence: "帽子。",
    translation: "mũ."
  }, {
    id: "h3_165",
    hanzi: "门",
    pinyin: "mén",
    meaning: "cửa",
    sentence: "门。",
    translation: "cửa."
  }, {
    id: "h3_166",
    hanzi: "米",
    pinyin: "mǐ",
    meaning: "gạo",
    sentence: "米。",
    translation: "gạo."
  }, {
    id: "h3_167",
    hanzi: "面包",
    pinyin: "miàn bāo",
    meaning: "bánh mì",
    sentence: "面包。",
    translation: "bánh mì."
  }, {
    id: "h3_168",
    hanzi: "面条",
    pinyin: "miàn tiáo",
    meaning: "mì",
    sentence: "面条。",
    translation: "mì."
  }, {
    id: "h3_169",
    hanzi: "明白",
    pinyin: "míng bai",
    meaning: "rõ ràng, hiểu biết",
    sentence: "明白。",
    translation: "rõ ràng, hiểu biết."
  }, {
    id: "h3_170",
    hanzi: "奶奶",
    pinyin: "nǎi nǎi",
    meaning: "bà",
    sentence: "奶奶。",
    translation: "bà."
  }, {
    id: "h3_171",
    hanzi: "南",
    pinyin: "nán",
    meaning: "phía nam",
    sentence: "南。",
    translation: "phía nam."
  }, {
    id: "h3_172",
    hanzi: "难",
    pinyin: "nán",
    meaning: "khó",
    sentence: "难。",
    translation: "khó."
  }, {
    id: "h3_173",
    hanzi: "难过",
    pinyin: "nán guò",
    meaning: "khó chịu",
    sentence: "难过。",
    translation: "khó chịu."
  }, {
    id: "h3_174",
    hanzi: "音乐",
    pinyin: "yīn yuè",
    meaning: "âm nhạc",
    sentence: "音乐。",
    translation: "âm nhạc."
  }, {
    id: "h3_175",
    hanzi: "年级",
    pinyin: "nián jí",
    meaning: "lớp",
    sentence: "年级。",
    translation: "lớp."
  }, {
    id: "h3_176",
    hanzi: "年轻",
    pinyin: "nián qīng",
    meaning: "trẻ",
    sentence: "年轻。",
    translation: "trẻ."
  }, {
    id: "h3_177",
    hanzi: "鸟",
    pinyin: "niǎo",
    meaning: "con chim",
    sentence: "鸟。",
    translation: "con chim."
  }, {
    id: "h3_178",
    hanzi: "努力",
    pinyin: "nǔ lì",
    meaning: "cố gắng, nỗ lực",
    sentence: "努力。",
    translation: "cố gắng, nỗ lực."
  }, {
    id: "h3_179",
    hanzi: "爬山",
    pinyin: "pá shān",
    meaning: "leo núi",
    sentence: "爬山。",
    translation: "leo núi."
  }, {
    id: "h3_180",
    hanzi: "盘子",
    pinyin: "pán zi",
    meaning: "đĩa, mâm, khay",
    sentence: "盘子。",
    translation: "đĩa, mâm, khay."
  }, {
    id: "h3_181",
    hanzi: "胖",
    pinyin: "pàng",
    meaning: "béo",
    sentence: "胖。",
    translation: "béo."
  }, {
    id: "h3_182",
    hanzi: "啤酒",
    pinyin: "pí jiǔ",
    meaning: "bia",
    sentence: "啤酒。",
    translation: "bia."
  }, {
    id: "h3_183",
    hanzi: "葡萄",
    pinyin: "pú táo",
    meaning: "quả nho",
    sentence: "葡萄。",
    translation: "quả nho."
  }, {
    id: "h3_184",
    hanzi: "普通话",
    pinyin: "pǔ tōng huà",
    meaning: "tiếng phổ thông",
    sentence: "普通话。",
    translation: "tiếng phổ thông."
  }, {
    id: "h3_185",
    hanzi: "骑",
    pinyin: "qī",
    meaning: "cưỡi, đi",
    sentence: "骑。",
    translation: "cưỡi, đi."
  }, {
    id: "h3_186",
    hanzi: "奇怪",
    pinyin: "qí guài",
    meaning: "kỳ lạ, quái lạ",
    sentence: "奇怪。",
    translation: "kỳ lạ, quái lạ."
  }, {
    id: "h3_187",
    hanzi: "其实",
    pinyin: "qí shí",
    meaning: "kỳ thực, thực ra",
    sentence: "其实。",
    translation: "kỳ thực, thực ra."
  }, {
    id: "h3_188",
    hanzi: "其他",
    pinyin: "qí tā",
    meaning: "khác",
    sentence: "其他。",
    translation: "khác."
  }, {
    id: "h3_189",
    hanzi: "铅笔",
    pinyin: "qiān bǐ",
    meaning: "bút chì",
    sentence: "铅笔。",
    translation: "bút chì."
  }, {
    id: "h3_190",
    hanzi: "清楚",
    pinyin: "qīng chǔ",
    meaning: "rõ ràng, minh mẫn, hiểu rõ",
    sentence: "清楚。",
    translation: "rõ ràng, minh mẫn, hiểu rõ."
  }, {
    id: "h3_191",
    hanzi: "秋",
    pinyin: "qiū",
    meaning: "mùa thu",
    sentence: "秋。",
    translation: "mùa thu."
  }, {
    id: "h3_192",
    hanzi: "裙子",
    pinyin: "qún zi",
    meaning: "váy",
    sentence: "裙子。",
    translation: "váy."
  }, {
    id: "h3_193",
    hanzi: "然后",
    pinyin: "rán hòu",
    meaning: "sau đó, tiếp đó",
    sentence: "然后。",
    translation: "sau đó, tiếp đó."
  }, {
    id: "h3_194",
    hanzi: "热情",
    pinyin: "rè qíng",
    meaning: "nhiệt tình, nhiệt huyết",
    sentence: "热情。",
    translation: "nhiệt tình, nhiệt huyết."
  }, {
    id: "h3_195",
    hanzi: "认真",
    pinyin: "rèn zhēn",
    meaning: "chăm chỉ, nghiêm túc",
    sentence: "认真。",
    translation: "chăm chỉ, nghiêm túc."
  }, {
    id: "h3_196",
    hanzi: "容易",
    pinyin: "róng yi",
    meaning: "dễ, dễ dàng",
    sentence: "容易。",
    translation: "dễ, dễ dàng."
  }, {
    id: "h3_197",
    hanzi: "如果",
    pinyin: "rú guǒ",
    meaning: "nếu",
    sentence: "如果。",
    translation: "nếu."
  }, {
    id: "h3_198",
    hanzi: "伞",
    pinyin: "sǎn",
    meaning: "ô",
    sentence: "伞。",
    translation: "ô."
  }, {
    id: "h3_199",
    hanzi: "上网",
    pinyin: "shàng wǎng",
    meaning: "lên mạng",
    sentence: "上网。",
    translation: "lên mạng."
  }, {
    id: "h3_200",
    hanzi: "生气",
    pinyin: "shēng qì",
    meaning: "giận, tức giận",
    sentence: "生气。",
    translation: "giận, tức giận."
  }, {
    id: "h3_201",
    hanzi: "声音",
    pinyin: "shēng yīn",
    meaning: "âm thanh",
    sentence: "声音。",
    translation: "âm thanh."
  }, {
    id: "h3_202",
    hanzi: "使",
    pinyin: "shǐ",
    meaning: "khiến, sai bảo, dùng",
    sentence: "使。",
    translation: "khiến, sai bảo, dùng."
  }, {
    id: "h3_203",
    hanzi: "世界",
    pinyin: "shì jiè",
    meaning: "thế giới, gầy",
    sentence: "世界。",
    translation: "thế giới, gầy."
  }, {
    id: "h3_204",
    hanzi: "手机",
    pinyin: "shǒu jī",
    meaning: "điện thoại di động",
    sentence: "手机。",
    translation: "điện thoại di động."
  }, {
    id: "h3_205",
    hanzi: "瘦",
    pinyin: "shòu",
    meaning: "gầy",
    sentence: "瘦。",
    translation: "gầy."
  }, {
    id: "h3_206",
    hanzi: "舒服",
    pinyin: "shū fu",
    meaning: "thoải mái, dễ chịu",
    sentence: "舒服。",
    translation: "thoải mái, dễ chịu."
  }, {
    id: "h3_207",
    hanzi: "叔叔",
    pinyin: "shū shu",
    meaning: "chú",
    sentence: "叔叔。",
    translation: "chú."
  }, {
    id: "h3_208",
    hanzi: "树",
    pinyin: "shù",
    meaning: "cây",
    sentence: "树。",
    translation: "cây."
  }, {
    id: "h3_209",
    hanzi: "数学",
    pinyin: "shù xué",
    meaning: "toán học",
    sentence: "数学。",
    translation: "toán học."
  }, {
    id: "h3_210",
    hanzi: "刷牙",
    pinyin: "shuā yá",
    meaning: "chải răng",
    sentence: "刷牙。",
    translation: "chải răng."
  }, {
    id: "h3_211",
    hanzi: "双",
    pinyin: "shuāng",
    meaning: "đôi, hai, cặp",
    sentence: "双。",
    translation: "đôi, hai, cặp."
  }, {
    id: "h3_212",
    hanzi: "水平",
    pinyin: "shuǐ píng",
    meaning: "trình độ",
    sentence: "水平。",
    translation: "trình độ."
  }, {
    id: "h3_213",
    hanzi: "司机",
    pinyin: "sī jī",
    meaning: "lái xe",
    sentence: "司机。",
    translation: "lái xe."
  }, {
    id: "h3_214",
    hanzi: "认为",
    pinyin: "rèn wéi",
    meaning: "nghĩ",
    sentence: "认为。",
    translation: "nghĩ."
  }, {
    id: "h3_215",
    hanzi: "虽然",
    pinyin: "suī rán",
    meaning: "tuy, tuy nhiên",
    sentence: "虽然。",
    translation: "tuy, tuy nhiên."
  }, {
    id: "h3_216",
    hanzi: "太阳",
    pinyin: "tài yang",
    meaning: "thái dương, mặt trời",
    sentence: "太阳。",
    translation: "thái dương, mặt trời."
  }, {
    id: "h3_217",
    hanzi: "糖",
    pinyin: "táng",
    meaning: "đường, kẹo",
    sentence: "糖。",
    translation: "đường, kẹo."
  }, {
    id: "h3_218",
    hanzi: "特别",
    pinyin: "tè bié",
    meaning: "đặc biệt",
    sentence: "特别。",
    translation: "đặc biệt."
  }, {
    id: "h3_219",
    hanzi: "疼",
    pinyin: "téng",
    meaning: "đau",
    sentence: "疼。",
    translation: "đau."
  }, {
    id: "h3_220",
    hanzi: "提高",
    pinyin: "tí gāo",
    meaning: "nâng cao",
    sentence: "提高。",
    translation: "nâng cao."
  }, {
    id: "h3_221",
    hanzi: "体育",
    pinyin: "tǐ yù",
    meaning: "thể thao",
    sentence: "体育。",
    translation: "thể thao."
  }, {
    id: "h3_222",
    hanzi: "同事",
    pinyin: "tóng shì",
    meaning: "đồng nghiệp",
    sentence: "同事。",
    translation: "đồng nghiệp."
  }, {
    id: "h3_223",
    hanzi: "头发",
    pinyin: "tóu fà",
    meaning: "tóc",
    sentence: "头发。",
    translation: "tóc."
  }, {
    id: "h3_224",
    hanzi: "突然",
    pinyin: "tū rán",
    meaning: "đột nhiên, chợt",
    sentence: "突然。",
    translation: "đột nhiên, chợt."
  }, {
    id: "h3_225",
    hanzi: "图书馆",
    pinyin: "tú shū guán",
    meaning: "thư viện",
    sentence: "图书馆。",
    translation: "thư viện."
  }, {
    id: "h3_226",
    hanzi: "腿",
    pinyin: "tuǐ",
    meaning: "chân, đùi",
    sentence: "腿。",
    translation: "chân, đùi."
  }, {
    id: "h3_227",
    hanzi: "完成",
    pinyin: "wán chéng",
    meaning: "hoàn thành",
    sentence: "完成。",
    translation: "hoàn thành."
  }, {
    id: "h3_228",
    hanzi: "碗",
    pinyin: "wǎn",
    meaning: "bát, chén",
    sentence: "碗。",
    translation: "bát, chén."
  }, {
    id: "h3_229",
    hanzi: "万",
    pinyin: "wàn",
    meaning: "vạn, mười nghìn",
    sentence: "万。",
    translation: "vạn, mười nghìn."
  }, {
    id: "h3_230",
    hanzi: "忘记",
    pinyin: "wàng jì",
    meaning: "quên",
    sentence: "忘记。",
    translation: "quên."
  }, {
    id: "h3_231",
    hanzi: "为",
    pinyin: "wèi",
    meaning: "hành, vì, để cho",
    sentence: "为。",
    translation: "hành, vì, để cho."
  }, {
    id: "h3_232",
    hanzi: "位",
    pinyin: "wèi",
    meaning: "vị, chỗ, nơi",
    sentence: "位。",
    translation: "vị, chỗ, nơi."
  }, {
    id: "h3_233",
    hanzi: "为了",
    pinyin: "wèi le",
    meaning: "để, vì",
    sentence: "为了。",
    translation: "để, vì."
  }, {
    id: "h3_234",
    hanzi: "文化",
    pinyin: "wén huà",
    meaning: "văn hóa",
    sentence: "文化。",
    translation: "văn hóa."
  }, {
    id: "h3_235",
    hanzi: "西",
    pinyin: "xī",
    meaning: "tây",
    sentence: "西。",
    translation: "tây."
  }, {
    id: "h3_236",
    hanzi: "习惯",
    pinyin: "xí guàn",
    meaning: "quen",
    sentence: "习惯。",
    translation: "quen."
  }, {
    id: "h3_237",
    hanzi: "洗手间",
    pinyin: "xǐ shǒu jiān",
    meaning: "nhà vệ sinh",
    sentence: "洗手间。",
    translation: "nhà vệ sinh."
  }, {
    id: "h3_238",
    hanzi: "洗澡",
    pinyin: "xǐ zǎo",
    meaning: "tắm, tắm rửa",
    sentence: "洗澡。",
    translation: "tắm, tắm rửa."
  }, {
    id: "h3_239",
    hanzi: "夏",
    pinyin: "xià",
    meaning: "hè, hạ",
    sentence: "夏。",
    translation: "hè, hạ."
  }, {
    id: "h3_240",
    hanzi: "先",
    pinyin: "xiān",
    meaning: "trước, trước tiên",
    sentence: "先。",
    translation: "trước, trước tiên."
  }, {
    id: "h3_241",
    hanzi: "香蕉",
    pinyin: "xiāng jiāo",
    meaning: "quả chuối tiêu",
    sentence: "香蕉。",
    translation: "quả chuối tiêu."
  }, {
    id: "h3_242",
    hanzi: "相同",
    pinyin: "xiāng tóng",
    meaning: "giống nhau, tương đồng",
    sentence: "相同。",
    translation: "giống nhau, tương đồng."
  }, {
    id: "h3_243",
    hanzi: "相信",
    pinyin: "xiāng xìn",
    meaning: "tin, tin tưởng",
    sentence: "相信。",
    translation: "tin, tin tưởng."
  }, {
    id: "h3_244",
    hanzi: "像",
    pinyin: "xiàng",
    meaning: "giống như",
    sentence: "像。",
    translation: "giống như."
  }, {
    id: "h3_245",
    hanzi: "小心",
    pinyin: "xiǎo xīn",
    meaning: "coi chừng, cẩn thận",
    sentence: "小心。",
    translation: "coi chừng, cẩn thận."
  }, {
    id: "h3_246",
    hanzi: "校长",
    pinyin: "xiào zhǎng",
    meaning: "hiệu trưởng",
    sentence: "校长。",
    translation: "hiệu trưởng."
  }, {
    id: "h3_247",
    hanzi: "鞋",
    pinyin: "xié",
    meaning: "giầy",
    sentence: "鞋。",
    translation: "giầy."
  }, {
    id: "h3_248",
    hanzi: "新闻",
    pinyin: "xīn wén",
    meaning: "tin tức",
    sentence: "新闻。",
    translation: "tin tức."
  }, {
    id: "h3_249",
    hanzi: "新鲜",
    pinyin: "xīn xiān",
    meaning: "tươi",
    sentence: "新鲜。",
    translation: "tươi."
  }, {
    id: "h3_250",
    hanzi: "信",
    pinyin: "xìn",
    meaning: "thư, tin tưởng, chữ tín",
    sentence: "信。",
    translation: "thư, tin tưởng, chữ tín."
  }, {
    id: "h3_251",
    hanzi: "行李箱",
    pinyin: "xíng li xiāng",
    meaning: "va li",
    sentence: "行李箱。",
    translation: "va li."
  }, {
    id: "h3_252",
    hanzi: "兴趣",
    pinyin: "xìng qǔ",
    meaning: "hứng thú",
    sentence: "兴趣。",
    translation: "hứng thú."
  }, {
    id: "h3_253",
    hanzi: "熊猫",
    pinyin: "xióng māo",
    meaning: "gấu trúc",
    sentence: "熊猫。",
    translation: "gấu trúc."
  }, {
    id: "h3_254",
    hanzi: "需要",
    pinyin: "xū yào",
    meaning: "cần",
    sentence: "需要。",
    translation: "cần."
  }, {
    id: "h3_255",
    hanzi: "选择",
    pinyin: "xuǎn zé",
    meaning: "chọn, tuyển chọn",
    sentence: "选择。",
    translation: "chọn, tuyển chọn."
  }, {
    id: "h3_256",
    hanzi: "眼镜",
    pinyin: "yǎn jìng",
    meaning: "kính mắt",
    sentence: "眼镜。",
    translation: "kính mắt."
  }, {
    id: "h3_257",
    hanzi: "要求",
    pinyin: "yāo qiú",
    meaning: "yêu cầu",
    sentence: "要求。",
    translation: "yêu cầu."
  }, {
    id: "h3_258",
    hanzi: "一般",
    pinyin: "yī bān",
    meaning: "bình thường, phổ biến",
    sentence: "一般。",
    translation: "bình thường, phổ biến."
  }, {
    id: "h3_259",
    hanzi: "一边",
    pinyin: "yī biān",
    meaning: "mặt bên, một mặt, vừa",
    sentence: "一边。",
    translation: "mặt bên, một mặt, vừa."
  }, {
    id: "h3_260",
    hanzi: "爷爷",
    pinyin: "yé ye",
    meaning: "ông",
    sentence: "爷爷。",
    translation: "ông."
  }, {
    id: "h3_261",
    hanzi: "一定",
    pinyin: "yī dìng",
    meaning: "chính xác, nhất định",
    sentence: "一定。",
    translation: "chính xác, nhất định."
  }, {
    id: "h3_262",
    hanzi: "一共",
    pinyin: "yī gòng",
    meaning: "tổng cộng",
    sentence: "一共。",
    translation: "tổng cộng."
  }, {
    id: "h3_263",
    hanzi: "一会儿",
    pinyin: "yī huǐ er",
    meaning: "một lát, một chốc",
    sentence: "一会儿。",
    translation: "một lát, một chốc."
  }, {
    id: "h3_264",
    hanzi: "一样",
    pinyin: "yī yàng",
    meaning: "giống như",
    sentence: "一样。",
    translation: "giống như."
  }, {
    id: "h3_265",
    hanzi: "一直",
    pinyin: "yī zhí",
    meaning: "luôn luôn",
    sentence: "一直。",
    translation: "luôn luôn."
  }, {
    id: "h3_266",
    hanzi: "以后",
    pinyin: "yǐ hòu",
    meaning: "sau này, sau khi",
    sentence: "以后。",
    translation: "sau này, sau khi."
  }, {
    id: "h3_267",
    hanzi: "以前",
    pinyin: "yǐ qián",
    meaning: "trước đây, trước kia",
    sentence: "以前。",
    translation: "trước đây, trước kia."
  }, {
    id: "h3_268",
    hanzi: "以为",
    pinyin: "yǐ wéi",
    meaning: "cho rằng, cho là",
    sentence: "以为。",
    translation: "cho rằng, cho là."
  }, {
    id: "h3_269",
    hanzi: "银行",
    pinyin: "yín háng",
    meaning: "ngân hàng",
    sentence: "银行。",
    translation: "ngân hàng."
  }, {
    id: "h3_270",
    hanzi: "应该",
    pinyin: "yīng gāi",
    meaning: "nên, phải",
    sentence: "应该。",
    translation: "nên, phải."
  }, {
    id: "h3_271",
    hanzi: "印象",
    pinyin: "Yìn xiàng",
    meaning: "ấn tượng",
    sentence: "印象。",
    translation: "ấn tượng."
  }, {
    id: "h3_272",
    hanzi: "用",
    pinyin: "yòng",
    meaning: "dùng",
    sentence: "用。",
    translation: "dùng."
  }, {
    id: "h3_273",
    hanzi: "游戏",
    pinyin: "yóu xì",
    meaning: "trò chơi",
    sentence: "游戏。",
    translation: "trò chơi."
  }, {
    id: "h3_274",
    hanzi: "有名",
    pinyin: "yǒu míng",
    meaning: "nổi tiếng",
    sentence: "有名。",
    translation: "nổi tiếng."
  }, {
    id: "h3_275",
    hanzi: "又",
    pinyin: "yòu",
    meaning: "lại, vừa … lại",
    sentence: "又。",
    translation: "lại, vừa … lại."
  }, {
    id: "h3_276",
    hanzi: "遇到",
    pinyin: "yù dào",
    meaning: "gặp mặt",
    sentence: "遇到。",
    translation: "gặp mặt."
  }, {
    id: "h3_277",
    hanzi: "愿意",
    pinyin: "yuàn yì",
    meaning: "bằng lòng, mong muốn",
    sentence: "愿意。",
    translation: "bằng lòng, mong muốn."
  }, {
    id: "h3_278",
    hanzi: "越",
    pinyin: "yuè",
    meaning: "vượt qua, nhảy qua, càng",
    sentence: "越。",
    translation: "vượt qua, nhảy qua, càng."
  }, {
    id: "h3_279",
    hanzi: "月亮",
    pinyin: "yuè liàng",
    meaning: "mặt trăng",
    sentence: "月亮。",
    translation: "mặt trăng."
  }, {
    id: "h3_280",
    hanzi: "云",
    pinyin: "yún",
    meaning: "mây",
    sentence: "云。",
    translation: "mây."
  }, {
    id: "h3_281",
    hanzi: "站",
    pinyin: "zhàn",
    meaning: "đứng",
    sentence: "站。",
    translation: "đứng."
  }, {
    id: "h3_282",
    hanzi: "长",
    pinyin: "zhǎng",
    meaning: "dài",
    sentence: "长。",
    translation: "dài."
  }, {
    id: "h3_283",
    hanzi: "着急",
    pinyin: "zháo jí",
    meaning: "sốt ruột, lo lắng",
    sentence: "着急。",
    translation: "sốt ruột, lo lắng."
  }, {
    id: "h3_284",
    hanzi: "照顾",
    pinyin: "zhào gù",
    meaning: "chăm sóc",
    sentence: "照顾。",
    translation: "chăm sóc."
  }, {
    id: "h3_285",
    hanzi: "照片",
    pinyin: "zhào piàn",
    meaning: "bức ảnh",
    sentence: "照片。",
    translation: "bức ảnh."
  }, {
    id: "h3_286",
    hanzi: "照相机",
    pinyin: "zhào xiàng jī",
    meaning: "máy chụp ảnh",
    sentence: "照相机。",
    translation: "máy chụp ảnh."
  }, {
    id: "h3_287",
    hanzi: "只",
    pinyin: "zhǐ",
    meaning: "chỉ",
    sentence: "只。",
    translation: "chỉ."
  }, {
    id: "h3_288",
    hanzi: "中间",
    pinyin: "zhōng jiān",
    meaning: "ở giữa, bên trong",
    sentence: "中间。",
    translation: "ở giữa, bên trong."
  }, {
    id: "h3_289",
    hanzi: "终于",
    pinyin: "zhōng yú",
    meaning: "cuối cùng",
    sentence: "终于。",
    translation: "cuối cùng."
  }, {
    id: "h3_290",
    hanzi: "种",
    pinyin: "zhǒng",
    meaning: "loại kiểu",
    sentence: "种。",
    translation: "loại kiểu."
  }, {
    id: "h3_291",
    hanzi: "重要",
    pinyin: "zhòng yào",
    meaning: "quan trọng",
    sentence: "重要。",
    translation: "quan trọng."
  }, {
    id: "h3_292",
    hanzi: "周末",
    pinyin: "zhōu mò",
    meaning: "cuối tuần",
    sentence: "周末。",
    translation: "cuối tuần."
  }, {
    id: "h3_293",
    hanzi: "主要",
    pinyin: "zhǔ yào",
    meaning: "chủ yếu, chính",
    sentence: "主要。",
    translation: "chủ yếu, chính."
  }, {
    id: "h3_294",
    hanzi: "祝",
    pinyin: "zhù",
    meaning: "chúc, chúc mừng",
    sentence: "祝。",
    translation: "chúc, chúc mừng."
  }, {
    id: "h3_295",
    hanzi: "注意",
    pinyin: "zhù yì",
    meaning: "chú ý",
    sentence: "注意。",
    translation: "chú ý."
  }, {
    id: "h3_296",
    hanzi: "字典",
    pinyin: "zì diǎn",
    meaning: "từ điển",
    sentence: "字典。",
    translation: "từ điển."
  }, {
    id: "h3_297",
    hanzi: "自己",
    pinyin: "zì jǐ",
    meaning: "tự mình, bản thân",
    sentence: "自己。",
    translation: "tự mình, bản thân."
  }, {
    id: "h3_298",
    hanzi: "总是",
    pinyin: "zǒng shì",
    meaning: "luôn luôn, lúc nào cũng",
    sentence: "总是。",
    translation: "luôn luôn, lúc nào cũng."
  }, {
    id: "h3_299",
    hanzi: "最近",
    pinyin: "zuì jìn",
    meaning: "gần đây, dạo này",
    sentence: "最近。",
    translation: "gần đây, dạo này."
  }, {
    id: "h3_300",
    hanzi: "作业",
    pinyin: "zuò yè",
    meaning: "bài tập về nhà",
    sentence: "作业。",
    translation: "bài tập về nhà."
  }, {
    id: "h3_301",
    hanzi: "作用",
    pinyin: "zuò yòng",
    meaning: "tác dụng",
    sentence: "作用。",
    translation: "tác dụng."
  }],
  4: [{
    id: "h4_1",
    hanzi: "爱情",
    pinyin: "àiqíng",
    meaning: "tình yêu",
    sentence: "爱情。",
    translation: "tình yêu."
  }, {
    id: "h4_2",
    hanzi: "安排",
    pinyin: "ānpái",
    meaning: "sắp xếp",
    sentence: "安排。",
    translation: "sắp xếp."
  }, {
    id: "h4_3",
    hanzi: "安全",
    pinyin: "ānquán",
    meaning: "an toàn",
    sentence: "安全。",
    translation: "an toàn."
  }, {
    id: "h4_4",
    hanzi: "按时",
    pinyin: "ànshí",
    meaning: "đúng hạn",
    sentence: "按时。",
    translation: "đúng hạn."
  }, {
    id: "h4_5",
    hanzi: "按照",
    pinyin: "ànzhào",
    meaning: "theo",
    sentence: "按照。",
    translation: "theo."
  }, {
    id: "h4_6",
    hanzi: "百分之",
    pinyin: "bǎifēnzhī",
    meaning: "phần trăm",
    sentence: "百分之。",
    translation: "phần trăm."
  }, {
    id: "h4_7",
    hanzi: "棒",
    pinyin: "bàng",
    meaning: "xuất sắc, giỏi, hay",
    sentence: "棒。",
    translation: "xuất sắc, giỏi, hay."
  }, {
    id: "h4_8",
    hanzi: "抱",
    pinyin: "bào",
    meaning: "bế, bồng, ôm",
    sentence: "抱。",
    translation: "bế, bồng, ôm."
  }, {
    id: "h4_9",
    hanzi: "保护",
    pinyin: "bǎohù",
    meaning: "bảo vệ",
    sentence: "保护。",
    translation: "bảo vệ."
  }, {
    id: "h4_10",
    hanzi: "报名",
    pinyin: "bàomíng",
    meaning: "ghi danh, đăng ký",
    sentence: "报名。",
    translation: "ghi danh, đăng ký."
  }, {
    id: "h4_11",
    hanzi: "抱歉",
    pinyin: "bàoqiàn",
    meaning: "xin lỗi",
    sentence: "抱歉。",
    translation: "xin lỗi."
  }, {
    id: "h4_12",
    hanzi: "保证",
    pinyin: "bǎozhèng",
    meaning: "cam đoan, bảo đảm",
    sentence: "保证。",
    translation: "cam đoan, bảo đảm."
  }, {
    id: "h4_13",
    hanzi: "包子",
    pinyin: "bāozi",
    meaning: "bánh bao",
    sentence: "包子。",
    translation: "bánh bao."
  }, {
    id: "h4_14",
    hanzi: "倍",
    pinyin: "bèi",
    meaning: "lần",
    sentence: "倍。",
    translation: "lần."
  }, {
    id: "h4_15",
    hanzi: "笨",
    pinyin: "bèn",
    meaning: "đần, ngốc",
    sentence: "笨。",
    translation: "đần, ngốc."
  }, {
    id: "h4_16",
    hanzi: "本来",
    pinyin: "běnlái",
    meaning: "lúc đầu, trước đây",
    sentence: "本来。",
    translation: "lúc đầu, trước đây."
  }, {
    id: "h4_17",
    hanzi: "遍",
    pinyin: "biàn",
    meaning: "lần, lượt",
    sentence: "遍。",
    translation: "lần, lượt."
  }, {
    id: "h4_18",
    hanzi: "表格",
    pinyin: "biǎogé",
    meaning: "bản kê khai, mẫu đơn",
    sentence: "表格。",
    translation: "bản kê khai, mẫu đơn."
  }, {
    id: "h4_19",
    hanzi: "表示",
    pinyin: "biǎoshì",
    meaning: "có ý nghĩa, biểu thị",
    sentence: "表示。",
    translation: "có ý nghĩa, biểu thị."
  }, {
    id: "h4_20",
    hanzi: "表演",
    pinyin: "biǎoyǎn",
    meaning: "biểu diễn, trình diễn",
    sentence: "表演。",
    translation: "biểu diễn, trình diễn."
  }, {
    id: "h4_21",
    hanzi: "表扬",
    pinyin: "biǎoyáng",
    meaning: "khen ngợi, biểu dương",
    sentence: "表扬。",
    translation: "khen ngợi, biểu dương."
  }, {
    id: "h4_22",
    hanzi: "标准",
    pinyin: "biāozhǔn",
    meaning: "tiêu chuẩn, chuẩn mực",
    sentence: "标准。",
    translation: "tiêu chuẩn, chuẩn mực."
  }, {
    id: "h4_23",
    hanzi: "饼干",
    pinyin: "bǐnggān",
    meaning: "bánh quy",
    sentence: "饼干。",
    translation: "bánh quy."
  }, {
    id: "h4_24",
    hanzi: "并且",
    pinyin: "bìngqiě",
    meaning: "đồng thời, và",
    sentence: "并且。",
    translation: "đồng thời, và."
  }, {
    id: "h4_25",
    hanzi: "比如",
    pinyin: "bǐrú",
    meaning: "ví dụ",
    sentence: "比如。",
    translation: "ví dụ."
  }, {
    id: "h4_26",
    hanzi: "毕业",
    pinyin: "bìyè",
    meaning: "tốt nghiệp",
    sentence: "毕业。",
    translation: "tốt nghiệp."
  }, {
    id: "h4_27",
    hanzi: "博士",
    pinyin: "bóshì",
    meaning: "tiến sĩ",
    sentence: "博士。",
    translation: "tiến sĩ."
  }, {
    id: "h4_28",
    hanzi: "不得不",
    pinyin: "bùdébù",
    meaning: "phải, không thể không",
    sentence: "不得不。",
    translation: "phải, không thể không."
  }, {
    id: "h4_29",
    hanzi: "部分",
    pinyin: "bùfen",
    meaning: "phần, bộ phận",
    sentence: "部分。",
    translation: "phần, bộ phận."
  }, {
    id: "h4_30",
    hanzi: "不管",
    pinyin: "bùguǎn",
    meaning: "bất kể, bất luận",
    sentence: "不管。",
    translation: "bất kể, bất luận."
  }, {
    id: "h4_31",
    hanzi: "不过",
    pinyin: "búguò",
    meaning: "nhưng",
    sentence: "不过。",
    translation: "nhưng."
  }, {
    id: "h4_32",
    hanzi: "不仅",
    pinyin: "bùjǐn",
    meaning: "không những…",
    sentence: "不仅。",
    translation: "không những…."
  }, {
    id: "h4_33",
    hanzi: "擦",
    pinyin: "cā",
    meaning: "lau chùi",
    sentence: "擦。",
    translation: "lau chùi."
  }, {
    id: "h4_34",
    hanzi: "猜",
    pinyin: "cāi",
    meaning: "đoán",
    sentence: "猜。",
    translation: "đoán."
  }, {
    id: "h4_35",
    hanzi: "材料",
    pinyin: "cáiliào",
    meaning: "tư liệu, tài liệu",
    sentence: "材料。",
    translation: "tư liệu, tài liệu."
  }, {
    id: "h4_36",
    hanzi: "参观",
    pinyin: "cānguān",
    meaning: "tham quan",
    sentence: "参观。",
    translation: "tham quan."
  }, {
    id: "h4_37",
    hanzi: "餐厅",
    pinyin: "cāntīng",
    meaning: "nhà hàng",
    sentence: "餐厅。",
    translation: "nhà hàng."
  }, {
    id: "h4_38",
    hanzi: "厕所",
    pinyin: "cèsuǒ",
    meaning: "nhà vệ sinh",
    sentence: "厕所。",
    translation: "nhà vệ sinh."
  }, {
    id: "h4_39",
    hanzi: "差不多",
    pinyin: "chàbuduō",
    meaning: "gần như, hầu như",
    sentence: "差不多。",
    translation: "gần như, hầu như."
  }, {
    id: "h4_40",
    hanzi: "场",
    pinyin: "chǎng",
    meaning: "trận (được dùng cho thể thao hay các hoạt động giải trí)",
    sentence: "场。",
    translation: "trận (được dùng cho thể thao hay các hoạt động giải trí)."
  }, {
    id: "h4_41",
    hanzi: "尝",
    pinyin: "cháng",
    meaning: "thưởng thức, nếm",
    sentence: "尝。",
    translation: "thưởng thức, nếm."
  }, {
    id: "h4_42",
    hanzi: "长城",
    pinyin: "Chángchéng",
    meaning: "Trường Thành",
    sentence: "长城。",
    translation: "Trường Thành."
  }, {
    id: "h4_43",
    hanzi: "长江",
    pinyin: "Chángjiāng",
    meaning: "Sông Trường Giang",
    sentence: "长江。",
    translation: "Sông Trường Giang."
  }, {
    id: "h4_44",
    hanzi: "超过",
    pinyin: "chāoguò",
    meaning: "vượt quá",
    sentence: "超过。",
    translation: "vượt quá."
  }, {
    id: "h4_45",
    hanzi: "成功",
    pinyin: "chénggōng",
    meaning: "thành công",
    sentence: "成功。",
    translation: "thành công."
  }, {
    id: "h4_46",
    hanzi: "诚实",
    pinyin: "chéngshí",
    meaning: "thành thật",
    sentence: "诚实。",
    translation: "thành thật."
  }, {
    id: "h4_47",
    hanzi: "成为",
    pinyin: "chéngwéi",
    meaning: "trở thành",
    sentence: "成为。",
    translation: "trở thành."
  }, {
    id: "h4_48",
    hanzi: "乘坐",
    pinyin: "chéngzuò",
    meaning: "đi, đáp(xe buýt..)",
    sentence: "乘坐。",
    translation: "đi, đáp(xe buýt..)."
  }, {
    id: "h4_49",
    hanzi: "吃惊",
    pinyin: "chī jīng",
    meaning: "kinh ngạc",
    sentence: "吃惊。",
    translation: "kinh ngạc."
  }, {
    id: "h4_50",
    hanzi: "重新",
    pinyin: "chóngxīn",
    meaning: "lần nữa, lại một lần nữa",
    sentence: "重新。",
    translation: "lần nữa, lại một lần nữa."
  }, {
    id: "h4_51",
    hanzi: "抽烟",
    pinyin: "chōuyān",
    meaning: "hút thuốc",
    sentence: "抽烟。",
    translation: "hút thuốc."
  }, {
    id: "h4_52",
    hanzi: "窗户",
    pinyin: "chuānghu",
    meaning: "cửa sổ",
    sentence: "窗户。",
    translation: "cửa sổ."
  }, {
    id: "h4_53",
    hanzi: "传真",
    pinyin: "chuánzhēn",
    meaning: "gửi fax",
    sentence: "传真。",
    translation: "gửi fax."
  }, {
    id: "h4_54",
    hanzi: "出差",
    pinyin: "chūchāi",
    meaning: "đi công tác",
    sentence: "出差。",
    translation: "đi công tác."
  }, {
    id: "h4_55",
    hanzi: "出发",
    pinyin: "chūfā",
    meaning: "xuất phát, khởi hành",
    sentence: "出发。",
    translation: "xuất phát, khởi hành."
  }, {
    id: "h4_56",
    hanzi: "厨房",
    pinyin: "chúfáng",
    meaning: "nhà bếp",
    sentence: "厨房。",
    translation: "nhà bếp."
  }, {
    id: "h4_57",
    hanzi: "出生",
    pinyin: "chūshēng",
    meaning: "ra đời, sinh ra",
    sentence: "出生。",
    translation: "ra đời, sinh ra."
  }, {
    id: "h4_58",
    hanzi: "出现",
    pinyin: "chūxiàn",
    meaning: "xuất hiện, nảy sinh",
    sentence: "出现。",
    translation: "xuất hiện, nảy sinh."
  }, {
    id: "h4_59",
    hanzi: "词语",
    pinyin: "cíyǔ",
    meaning: "từ ngữ, cách diễn đạt",
    sentence: "词语。",
    translation: "từ ngữ, cách diễn đạt."
  }, {
    id: "h4_60",
    hanzi: "从来",
    pinyin: "cónglái",
    meaning: "từ trước đến nay, từ trước đến giờ",
    sentence: "从来。",
    translation: "từ trước đến nay, từ trước đến giờ."
  }, {
    id: "h4_61",
    hanzi: "存",
    pinyin: "cún",
    meaning: "gửi",
    sentence: "存。",
    translation: "gửi."
  }, {
    id: "h4_62",
    hanzi: "错误",
    pinyin: "cuòwù",
    meaning: "sai",
    sentence: "错误。",
    translation: "sai."
  }, {
    id: "h4_63",
    hanzi: "粗心",
    pinyin: "cūxīn",
    meaning: "cẩu thả",
    sentence: "粗心。",
    translation: "cẩu thả."
  }, {
    id: "h4_64",
    hanzi: "打招呼",
    pinyin: "dǎ zhāohu",
    meaning: "chào hỏi, chào",
    sentence: "打招呼。",
    translation: "chào hỏi, chào."
  }, {
    id: "h4_65",
    hanzi: "打针",
    pinyin: "dǎ zhēn",
    meaning: "tiêm, chích",
    sentence: "打针。",
    translation: "tiêm, chích."
  }, {
    id: "h4_66",
    hanzi: "答案",
    pinyin: "dá’àn",
    meaning: "đáp án",
    sentence: "答案。",
    translation: "đáp án."
  }, {
    id: "h4_67",
    hanzi: "打扮",
    pinyin: "dǎban",
    meaning: "trang điểm",
    sentence: "打扮。",
    translation: "trang điểm."
  }, {
    id: "h4_68",
    hanzi: "大概",
    pinyin: "dàgài",
    meaning: "khoảng chừng, có lẽ",
    sentence: "大概。",
    translation: "khoảng chừng, có lẽ."
  }, {
    id: "h4_69",
    hanzi: "戴",
    pinyin: "dài",
    meaning: "đeo, mang",
    sentence: "戴。",
    translation: "đeo, mang."
  }, {
    id: "h4_70",
    hanzi: "大夫",
    pinyin: "dàifu",
    meaning: "bác sĩ",
    sentence: "大夫。",
    translation: "bác sĩ."
  }, {
    id: "h4_71",
    hanzi: "当",
    pinyin: "dāng",
    meaning: "khi",
    sentence: "当。",
    translation: "khi."
  }, {
    id: "h4_72",
    hanzi: "当时",
    pinyin: "dāngshí",
    meaning: "lúc đó",
    sentence: "当时。",
    translation: "lúc đó."
  }, {
    id: "h4_73",
    hanzi: "倒",
    pinyin: "dào",
    meaning: "(chỉ sự tương phản) nhưng, lại",
    sentence: "倒。",
    translation: "(chỉ sự tương phản) nhưng, lại."
  }, {
    id: "h4_74",
    hanzi: "刀",
    pinyin: "dāo",
    meaning: "con dao",
    sentence: "刀。",
    translation: "con dao."
  }, {
    id: "h4_75",
    hanzi: "到处",
    pinyin: "dàochù",
    meaning: "khắp nơi",
    sentence: "到处。",
    translation: "khắp nơi."
  }, {
    id: "h4_76",
    hanzi: "到底",
    pinyin: "dàodǐ",
    meaning: "rốt cuộc",
    sentence: "到底。",
    translation: "rốt cuộc."
  }, {
    id: "h4_77",
    hanzi: "道歉",
    pinyin: "dàoqiàn",
    meaning: "xin lỗi",
    sentence: "道歉。",
    translation: "xin lỗi."
  }, {
    id: "h4_78",
    hanzi: "导游",
    pinyin: "dǎoyóu",
    meaning: "hướng dẫn viên du lịch",
    sentence: "导游。",
    translation: "hướng dẫn viên du lịch."
  }, {
    id: "h4_79",
    hanzi: "打扰",
    pinyin: "dǎrǎo",
    meaning: "quấy rầy, làm phiền",
    sentence: "打扰。",
    translation: "quấy rầy, làm phiền."
  }, {
    id: "h4_80",
    hanzi: "大使馆",
    pinyin: "dàshǐguǎn",
    meaning: "đại sứ quán",
    sentence: "大使馆。",
    translation: "đại sứ quán."
  }, {
    id: "h4_81",
    hanzi: "打印",
    pinyin: "dǎyìn",
    meaning: "in",
    sentence: "打印。",
    translation: "in."
  }, {
    id: "h4_82",
    hanzi: "大约",
    pinyin: "dàyuē",
    meaning: "khoảng chừng, ước chừng",
    sentence: "大约。",
    translation: "khoảng chừng, ước chừng."
  }, {
    id: "h4_83",
    hanzi: "打折",
    pinyin: "dǎzhé",
    meaning: "giảm giá",
    sentence: "打折。",
    translation: "giảm giá."
  }, {
    id: "h4_84",
    hanzi: "得",
    pinyin: "děi",
    meaning: "phải",
    sentence: "得。",
    translation: "phải."
  }, {
    id: "h4_85",
    hanzi: "等",
    pinyin: "děng",
    meaning: "vân vân",
    sentence: "等。",
    translation: "vân vân."
  }, {
    id: "h4_86",
    hanzi: "登机牌",
    pinyin: "dēngjīpái",
    meaning: "thẻ lên máy bay",
    sentence: "登机牌。",
    translation: "thẻ lên máy bay."
  }, {
    id: "h4_87",
    hanzi: "得意",
    pinyin: "déyì",
    meaning: "đắc chí",
    sentence: "得意。",
    translation: "đắc chí."
  }, {
    id: "h4_88",
    hanzi: "底",
    pinyin: "dǐ",
    meaning: "đáy",
    sentence: "底。",
    translation: "đáy."
  }, {
    id: "h4_89",
    hanzi: "低",
    pinyin: "dī",
    meaning: "thấp",
    sentence: "低。",
    translation: "thấp."
  }, {
    id: "h4_90",
    hanzi: "掉",
    pinyin: "diào",
    meaning: "mất, đi, hết",
    sentence: "掉。",
    translation: "mất, đi, hết."
  }, {
    id: "h4_91",
    hanzi: "调查",
    pinyin: "diàochá",
    meaning: "điều tra, khảo sát",
    sentence: "调查。",
    translation: "điều tra, khảo sát."
  }, {
    id: "h4_92",
    hanzi: "地点",
    pinyin: "dìdiǎn",
    meaning: "địa điểm",
    sentence: "地点。",
    translation: "địa điểm."
  }, {
    id: "h4_93",
    hanzi: "地球",
    pinyin: "dìqiú",
    meaning: "trái đất",
    sentence: "地球。",
    translation: "trái đất."
  }, {
    id: "h4_94",
    hanzi: "丢",
    pinyin: "diū",
    meaning: "ném, vứt",
    sentence: "丢。",
    translation: "ném, vứt."
  }, {
    id: "h4_95",
    hanzi: "地址",
    pinyin: "dìzhǐ",
    meaning: "địa chỉ",
    sentence: "地址。",
    translation: "địa chỉ."
  }, {
    id: "h4_96",
    hanzi: "动作",
    pinyin: "dòngzuò",
    meaning: "động tác, hành động",
    sentence: "动作。",
    translation: "động tác, hành động."
  }, {
    id: "h4_97",
    hanzi: "短信",
    pinyin: "duǎnxìn",
    meaning: "tin nhắn",
    sentence: "短信。",
    translation: "tin nhắn."
  }, {
    id: "h4_98",
    hanzi: "堵车",
    pinyin: "dǔchē",
    meaning: "kẹt xe",
    sentence: "堵车。",
    translation: "kẹt xe."
  }, {
    id: "h4_99",
    hanzi: "对话",
    pinyin: "duìhuà",
    meaning: "đối thoại, tiếp xúc",
    sentence: "对话。",
    translation: "đối thoại, tiếp xúc."
  }, {
    id: "h4_100",
    hanzi: "对面",
    pinyin: "duìmiàn",
    meaning: "đối diện, trước mặt",
    sentence: "对面。",
    translation: "đối diện, trước mặt."
  }, {
    id: "h4_101",
    hanzi: "对于",
    pinyin: "duìyú",
    meaning: "đối với",
    sentence: "对于。",
    translation: "đối với."
  }, {
    id: "h4_102",
    hanzi: "肚子",
    pinyin: "dùzi",
    meaning: "bụng",
    sentence: "肚子。",
    translation: "bụng."
  }, {
    id: "h4_103",
    hanzi: "而",
    pinyin: "ér",
    meaning: "trong khi đó, mà",
    sentence: "而。",
    translation: "trong khi đó, mà."
  }, {
    id: "h4_104",
    hanzi: "儿童",
    pinyin: "értóng",
    meaning: "trẻ em",
    sentence: "儿童。",
    translation: "trẻ em."
  }, {
    id: "h4_105",
    hanzi: "法律",
    pinyin: "fǎlǜ",
    meaning: "pháp luật, luật",
    sentence: "法律。",
    translation: "pháp luật, luật."
  }, {
    id: "h4_106",
    hanzi: "反对",
    pinyin: "fǎnduì",
    meaning: "phản đối",
    sentence: "反对。",
    translation: "phản đối."
  }, {
    id: "h4_107",
    hanzi: "房东",
    pinyin: "fángdōng",
    meaning: "chủ nhà (nhà cho thuê)",
    sentence: "房东。",
    translation: "chủ nhà (nhà cho thuê)."
  }, {
    id: "h4_108",
    hanzi: "方法",
    pinyin: "fāngfǎ",
    meaning: "phương pháp, cách thức",
    sentence: "方法。",
    translation: "phương pháp, cách thức."
  }, {
    id: "h4_109",
    hanzi: "方面",
    pinyin: "fāngmiàn",
    meaning: "khía cạnh, phương diện",
    sentence: "方面。",
    translation: "khía cạnh, phương diện."
  }, {
    id: "h4_110",
    hanzi: "放弃",
    pinyin: "fàngqì",
    meaning: "từ bỏ",
    sentence: "放弃。",
    translation: "từ bỏ."
  }, {
    id: "h4_111",
    hanzi: "放暑假",
    pinyin: "fàngshǔjià",
    meaning: "nghỉ hè",
    sentence: "放暑假。",
    translation: "nghỉ hè."
  }, {
    id: "h4_112",
    hanzi: "放松",
    pinyin: "fàngsōng",
    meaning: "thả lỏng, thư giãn",
    sentence: "放松。",
    translation: "thả lỏng, thư giãn."
  }, {
    id: "h4_113",
    hanzi: "方向",
    pinyin: "fāngxiàng",
    meaning: "phương hướng",
    sentence: "方向。",
    translation: "phương hướng."
  }, {
    id: "h4_114",
    hanzi: "烦恼",
    pinyin: "fánnǎo",
    meaning: "phiền muộn, buồn phiền",
    sentence: "烦恼。",
    translation: "phiền muộn, buồn phiền."
  }, {
    id: "h4_115",
    hanzi: "翻译",
    pinyin: "fānyì",
    meaning: "phiên dịch viên",
    sentence: "翻译。",
    translation: "phiên dịch viên."
  }, {
    id: "h4_116",
    hanzi: "发生",
    pinyin: "fāshēng",
    meaning: "xảy ra",
    sentence: "发生。",
    translation: "xảy ra."
  }, {
    id: "h4_117",
    hanzi: "发展",
    pinyin: "fāzhǎn",
    meaning: "phát triển",
    sentence: "发展。",
    translation: "phát triển."
  }, {
    id: "h4_118",
    hanzi: "份",
    pinyin: "fèn",
    meaning: "tờ, bản",
    sentence: "份。",
    translation: "tờ, bản."
  }, {
    id: "h4_119",
    hanzi: "丰富",
    pinyin: "fēngfù",
    meaning: "làm phong phú",
    sentence: "丰富。",
    translation: "làm phong phú."
  }, {
    id: "h4_120",
    hanzi: "否则",
    pinyin: "fǒuzé",
    meaning: "nếu không thì, bằng không",
    sentence: "否则。",
    translation: "nếu không thì, bằng không."
  }, {
    id: "h4_121",
    hanzi: "富",
    pinyin: "fù",
    meaning: "giàu",
    sentence: "富。",
    translation: "giàu."
  }, {
    id: "h4_122",
    hanzi: "符合",
    pinyin: "fúhé",
    meaning: "phù hợp",
    sentence: "符合。",
    translation: "phù hợp."
  }, {
    id: "h4_123",
    hanzi: "付款",
    pinyin: "fùkuǎn",
    meaning: "trả tiền",
    sentence: "付款。",
    translation: "trả tiền."
  }, {
    id: "h4_124",
    hanzi: "父亲",
    pinyin: "fùqīn",
    meaning: "cha, bố",
    sentence: "父亲。",
    translation: "cha, bố."
  }, {
    id: "h4_125",
    hanzi: "复印",
    pinyin: "fùyìn",
    meaning: "photocopy, sao chụp",
    sentence: "复印。",
    translation: "photocopy, sao chụp."
  }, {
    id: "h4_126",
    hanzi: "复杂",
    pinyin: "fùzá",
    meaning: "phức tạp, rắc rối",
    sentence: "复杂。",
    translation: "phức tạp, rắc rối."
  }, {
    id: "h4_127",
    hanzi: "负责",
    pinyin: "fùzé",
    meaning: "phụ trách, chịu trách nhiệm",
    sentence: "负责。",
    translation: "phụ trách, chịu trách nhiệm."
  }, {
    id: "h4_128",
    hanzi: "改变",
    pinyin: "gǎibiàn",
    meaning: "thay đổi",
    sentence: "改变。",
    translation: "thay đổi."
  }, {
    id: "h4_129",
    hanzi: "干",
    pinyin: "gàn",
    meaning: "làm",
    sentence: "干。",
    translation: "làm."
  }, {
    id: "h4_130",
    hanzi: "赶",
    pinyin: "gǎn",
    meaning: "vội, gấp rút",
    sentence: "赶。",
    translation: "vội, gấp rút."
  }, {
    id: "h4_131",
    hanzi: "敢",
    pinyin: "gǎn",
    meaning: "dám",
    sentence: "敢。",
    translation: "dám."
  }, {
    id: "h4_132",
    hanzi: "干杯",
    pinyin: "gānbēi",
    meaning: "cạn ly",
    sentence: "干杯。",
    translation: "cạn ly."
  }, {
    id: "h4_133",
    hanzi: "感动",
    pinyin: "gǎndòng",
    meaning: "cảm động, làm xúc động",
    sentence: "感动。",
    translation: "cảm động, làm xúc động."
  }, {
    id: "h4_134",
    hanzi: "刚",
    pinyin: "gāng",
    meaning: "vừa, vừa mới",
    sentence: "刚。",
    translation: "vừa, vừa mới."
  }, {
    id: "h4_135",
    hanzi: "感觉",
    pinyin: "gǎnjué",
    meaning: "cảm giác, cảm nghĩ",
    sentence: "感觉。",
    translation: "cảm giác, cảm nghĩ."
  }, {
    id: "h4_136",
    hanzi: "感情",
    pinyin: "gǎnqíng",
    meaning: "tiình cảm",
    sentence: "感情。",
    translation: "tiình cảm."
  }, {
    id: "h4_137",
    hanzi: "感谢",
    pinyin: "gǎnxiè",
    meaning: "cảm ơn",
    sentence: "感谢。",
    translation: "cảm ơn."
  }, {
    id: "h4_138",
    hanzi: "高速公路",
    pinyin: "gāosùgōnglù",
    meaning: "đường cao tốc",
    sentence: "高速公路。",
    translation: "đường cao tốc."
  }, {
    id: "h4_139",
    hanzi: "各",
    pinyin: "gè",
    meaning: "các, mọi",
    sentence: "各。",
    translation: "các, mọi."
  }, {
    id: "h4_140",
    hanzi: "胳膊",
    pinyin: "gēbo",
    meaning: "cánh tay",
    sentence: "胳膊。",
    translation: "cánh tay."
  }, {
    id: "h4_141",
    hanzi: "功夫",
    pinyin: "gōngfu",
    meaning: "võ thuật, môn võ kungfu",
    sentence: "功夫。",
    translation: "võ thuật, môn võ kungfu."
  }, {
    id: "h4_142",
    hanzi: "公里",
    pinyin: "gōnglǐ",
    meaning: "kilomet",
    sentence: "公里。",
    translation: "kilomet."
  }, {
    id: "h4_143",
    hanzi: "共同",
    pinyin: "gòngtóng",
    meaning: "chung, cùng",
    sentence: "共同。",
    translation: "chung, cùng."
  }, {
    id: "h4_144",
    hanzi: "工资",
    pinyin: "gōngzī",
    meaning: "tiền lương",
    sentence: "工资。",
    translation: "tiền lương."
  }, {
    id: "h4_145",
    hanzi: "够",
    pinyin: "gòu",
    meaning: "đủ",
    sentence: "够。",
    translation: "đủ."
  }, {
    id: "h4_146",
    hanzi: "购物",
    pinyin: "gòuwù",
    meaning: "mua sắm",
    sentence: "购物。",
    translation: "mua sắm."
  }, {
    id: "h4_147",
    hanzi: "挂",
    pinyin: "guà",
    meaning: "treo, móc",
    sentence: "挂。",
    translation: "treo, móc."
  }, {
    id: "h4_148",
    hanzi: "逛",
    pinyin: "guàng",
    meaning: "đi dạo",
    sentence: "逛。",
    translation: "đi dạo."
  }, {
    id: "h4_149",
    hanzi: "光",
    pinyin: "guāng",
    meaning: "chỉ",
    sentence: "光。",
    translation: "chỉ."
  }, {
    id: "h4_150",
    hanzi: "广播",
    pinyin: "guǎngbō",
    meaning: "chương trình phát thanh/truyền hình",
    sentence: "广播。",
    translation: "chương trình phát thanh/truyền hình."
  }, {
    id: "h4_151",
    hanzi: "广告",
    pinyin: "guǎnggào",
    meaning: "quảng cáo",
    sentence: "广告。",
    translation: "quảng cáo."
  }, {
    id: "h4_152",
    hanzi: "关键",
    pinyin: "guānjiàn",
    meaning: "điều quan trọng",
    sentence: "关键。",
    translation: "điều quan trọng."
  }, {
    id: "h4_153",
    hanzi: "管理",
    pinyin: "guǎnlǐ",
    meaning: "quản lý",
    sentence: "管理。",
    translation: "quản lý."
  }, {
    id: "h4_154",
    hanzi: "观众",
    pinyin: "guānzhòng",
    meaning: "khán giả",
    sentence: "观众。",
    translation: "khán giả."
  }, {
    id: "h4_155",
    hanzi: "规定",
    pinyin: "guīdìng",
    meaning: "quy định",
    sentence: "规定。",
    translation: "quy định."
  }, {
    id: "h4_156",
    hanzi: "估计",
    pinyin: "gūjì",
    meaning: "đoán chừng",
    sentence: "估计。",
    translation: "đoán chừng."
  }, {
    id: "h4_157",
    hanzi: "顾客",
    pinyin: "gùkè",
    meaning: "khách hàng",
    sentence: "顾客。",
    translation: "khách hàng."
  }, {
    id: "h4_158",
    hanzi: "鼓励",
    pinyin: "gǔlì",
    meaning: "khuyến khích",
    sentence: "鼓励。",
    translation: "khuyến khích."
  }, {
    id: "h4_159",
    hanzi: "过程",
    pinyin: "guòchéng",
    meaning: "quá trình",
    sentence: "过程。",
    translation: "quá trình."
  }, {
    id: "h4_160",
    hanzi: "国籍",
    pinyin: "guójí",
    meaning: "quốc tịch",
    sentence: "国籍。",
    translation: "quốc tịch."
  }, {
    id: "h4_161",
    hanzi: "国际",
    pinyin: "guójì",
    meaning: "quốc tế",
    sentence: "国际。",
    translation: "quốc tế."
  }, {
    id: "h4_162",
    hanzi: "果汁",
    pinyin: "guǒzhī",
    meaning: "nước trái cây",
    sentence: "果汁。",
    translation: "nước trái cây."
  }, {
    id: "h4_163",
    hanzi: "故意",
    pinyin: "gùyì",
    meaning: "cố tình, cố ý",
    sentence: "故意。",
    translation: "cố tình, cố ý."
  }, {
    id: "h4_164",
    hanzi: "害羞",
    pinyin: "hàixiū",
    meaning: "ngượng ngùng, thẹn thùng",
    sentence: "害羞。",
    translation: "ngượng ngùng, thẹn thùng."
  }, {
    id: "h4_165",
    hanzi: "海洋",
    pinyin: "hǎiyáng",
    meaning: "biển, đại dương",
    sentence: "海洋。",
    translation: "biển, đại dương."
  }, {
    id: "h4_166",
    hanzi: "汗",
    pinyin: "hàn",
    meaning: "mồ hôi",
    sentence: "汗。",
    translation: "mồ hôi."
  }, {
    id: "h4_167",
    hanzi: "航班",
    pinyin: "hángbān",
    meaning: "chuyến bay",
    sentence: "航班。",
    translation: "chuyến bay."
  }, {
    id: "h4_168",
    hanzi: "寒假",
    pinyin: "hánjià",
    meaning: "kỳ nghỉ đông",
    sentence: "寒假。",
    translation: "kỳ nghỉ đông."
  }, {
    id: "h4_169",
    hanzi: "好处",
    pinyin: "hǎochù",
    meaning: "lợi ích, điều tốt",
    sentence: "好处。",
    translation: "lợi ích, điều tốt."
  }, {
    id: "h4_170",
    hanzi: "号码",
    pinyin: "hàomǎ",
    meaning: "số",
    sentence: "号码。",
    translation: "số."
  }, {
    id: "h4_171",
    hanzi: "好像",
    pinyin: "hǎoxiàng",
    meaning: "giống như, dường như",
    sentence: "好像。",
    translation: "giống như, dường như."
  }, {
    id: "h4_172",
    hanzi: "合格",
    pinyin: "hégé",
    meaning: "đạt tiêu chuẩn, đạt yêu cầu",
    sentence: "合格。",
    translation: "đạt tiêu chuẩn, đạt yêu cầu."
  }, {
    id: "h4_173",
    hanzi: "合适",
    pinyin: "héshì",
    meaning: "thích hợp",
    sentence: "合适。",
    translation: "thích hợp."
  }, {
    id: "h4_174",
    hanzi: "盒子",
    pinyin: "hézi",
    meaning: "hộp",
    sentence: "盒子。",
    translation: "hộp."
  }, {
    id: "h4_175",
    hanzi: "厚",
    pinyin: "hòu",
    meaning: "dày, sâu nặng",
    sentence: "厚。",
    translation: "dày, sâu nặng."
  }, {
    id: "h4_176",
    hanzi: "后悔",
    pinyin: "hòuhuǐ",
    meaning: "ân hận",
    sentence: "后悔。",
    translation: "ân hận."
  }, {
    id: "h4_177",
    hanzi: "怀疑",
    pinyin: "huáiyí",
    meaning: "nghi ngờ, hoài nghi",
    sentence: "怀疑。",
    translation: "nghi ngờ, hoài nghi."
  }, {
    id: "h4_178",
    hanzi: "回忆",
    pinyin: "huíyì",
    meaning: "nhớ lại",
    sentence: "回忆。",
    translation: "nhớ lại."
  }, {
    id: "h4_179",
    hanzi: "互联网",
    pinyin: "hùliánwǎng",
    meaning: "mạng internet",
    sentence: "互联网。",
    translation: "mạng internet."
  }, {
    id: "h4_180",
    hanzi: "火",
    pinyin: "huǒ",
    meaning: "chạy, đắt, được nhiều người ưa chuộng",
    sentence: "火。",
    translation: "chạy, đắt, được nhiều người ưa chuộng."
  }, {
    id: "h4_181",
    hanzi: "获得",
    pinyin: "huòdé",
    meaning: "được, lấy được",
    sentence: "获得。",
    translation: "được, lấy được."
  }, {
    id: "h4_182",
    hanzi: "活动",
    pinyin: "huódòng",
    meaning: "hoạt động",
    sentence: "活动。",
    translation: "hoạt động."
  }, {
    id: "h4_183",
    hanzi: "活泼",
    pinyin: "huópō",
    meaning: "hoạt bát, nhanh nhẹn",
    sentence: "活泼。",
    translation: "hoạt bát, nhanh nhẹn."
  }, {
    id: "h4_184",
    hanzi: "护士",
    pinyin: "hùshi",
    meaning: "y tá",
    sentence: "护士。",
    translation: "y tá."
  }, {
    id: "h4_185",
    hanzi: "互相",
    pinyin: "hùxiāng",
    meaning: "lẫn nhau, qua lại",
    sentence: "互相。",
    translation: "lẫn nhau, qua lại."
  }, {
    id: "h4_186",
    hanzi: "寄",
    pinyin: "jì",
    meaning: "gửi",
    sentence: "寄。",
    translation: "gửi."
  }, {
    id: "h4_187",
    hanzi: "假",
    pinyin: "jiǎ",
    meaning: "giả dối, không thật",
    sentence: "假。",
    translation: "giả dối, không thật."
  }, {
    id: "h4_188",
    hanzi: "加班",
    pinyin: "jiābān",
    meaning: "tăng ca",
    sentence: "加班。",
    translation: "tăng ca."
  }, {
    id: "h4_189",
    hanzi: "价格",
    pinyin: "jiàgé",
    meaning: "giá cả",
    sentence: "价格。",
    translation: "giá cả."
  }, {
    id: "h4_190",
    hanzi: "家具",
    pinyin: "jiājù",
    meaning: "đồ dùng trong nhà",
    sentence: "家具。",
    translation: "đồ dùng trong nhà."
  }, {
    id: "h4_191",
    hanzi: "坚持",
    pinyin: "jiānchí",
    meaning: "kiên trì",
    sentence: "坚持。",
    translation: "kiên trì."
  }, {
    id: "h4_192",
    hanzi: "减肥",
    pinyin: "jiǎnféi",
    meaning: "giảm cân",
    sentence: "减肥。",
    translation: "giảm cân."
  }, {
    id: "h4_193",
    hanzi: "降低",
    pinyin: "jiàngdī",
    meaning: "giảm, hạ",
    sentence: "降低。",
    translation: "giảm, hạ."
  }, {
    id: "h4_194",
    hanzi: "奖金",
    pinyin: "jiǎngjīn",
    meaning: "tiền thưởng",
    sentence: "奖金。",
    translation: "tiền thưởng."
  }, {
    id: "h4_195",
    hanzi: "将来",
    pinyin: "jiānglái",
    meaning: "tương lai",
    sentence: "将来。",
    translation: "tương lai."
  }, {
    id: "h4_196",
    hanzi: "降落",
    pinyin: "jiàngluò",
    meaning: "đáp xuống, hạ cánh",
    sentence: "降落。",
    translation: "đáp xuống, hạ cánh."
  }, {
    id: "h4_197",
    hanzi: "减少",
    pinyin: "jiǎnshǎo",
    meaning: "giảm bớt",
    sentence: "减少。",
    translation: "giảm bớt."
  }, {
    id: "h4_198",
    hanzi: "建议",
    pinyin: "jiànyì",
    meaning: "kiến nghị",
    sentence: "建议。",
    translation: "kiến nghị."
  }, {
    id: "h4_199",
    hanzi: "交",
    pinyin: "jiāo",
    meaning: "kết giao",
    sentence: "交。",
    translation: "kết giao."
  }, {
    id: "h4_200",
    hanzi: "骄傲",
    pinyin: "jiào’ào",
    meaning: "kiêu ngạo",
    sentence: "骄傲。",
    translation: "kiêu ngạo."
  }, {
    id: "h4_201",
    hanzi: "交流",
    pinyin: "jiāoliú",
    meaning: "giao lưu, trao đổi",
    sentence: "交流。",
    translation: "giao lưu, trao đổi."
  }, {
    id: "h4_202",
    hanzi: "郊区",
    pinyin: "jiāoqū",
    meaning: "vùng ngoại ô",
    sentence: "郊区。",
    translation: "vùng ngoại ô."
  }, {
    id: "h4_203",
    hanzi: "教授",
    pinyin: "jiàoshòu",
    meaning: "giáo sư",
    sentence: "教授。",
    translation: "giáo sư."
  }, {
    id: "h4_204",
    hanzi: "交通",
    pinyin: "jiāotōng",
    meaning: "giao thông, thông tin liên lạc",
    sentence: "交通。",
    translation: "giao thông, thông tin liên lạc."
  }, {
    id: "h4_205",
    hanzi: "教育",
    pinyin: "jiàoyù",
    meaning: "giáo dục, dạy dỗ",
    sentence: "教育。",
    translation: "giáo dục, dạy dỗ."
  }, {
    id: "h4_206",
    hanzi: "饺子",
    pinyin: "jiǎozi",
    meaning: "bánh chẻo",
    sentence: "饺子。",
    translation: "bánh chẻo."
  }, {
    id: "h4_207",
    hanzi: "加油站",
    pinyin: "jiāyóuzhàn",
    meaning: "trạm xăng dầu",
    sentence: "加油站。",
    translation: "trạm xăng dầu."
  }, {
    id: "h4_208",
    hanzi: "基础",
    pinyin: "jīchǔ",
    meaning: "nền tảng, căn bản",
    sentence: "基础。",
    translation: "nền tảng, căn bản."
  }, {
    id: "h4_209",
    hanzi: "激动",
    pinyin: "jīdòng",
    meaning: "cảm động",
    sentence: "激动。",
    translation: "cảm động."
  }, {
    id: "h4_210",
    hanzi: "节",
    pinyin: "jié",
    meaning: "tiết (học)",
    sentence: "节。",
    translation: "tiết (học)."
  }, {
    id: "h4_211",
    hanzi: "结果",
    pinyin: "jiéguǒ",
    meaning: "kết quả",
    sentence: "结果。",
    translation: "kết quả."
  }, {
    id: "h4_212",
    hanzi: "解释",
    pinyin: "jiěshì",
    meaning: "giải thích",
    sentence: "解释。",
    translation: "giải thích."
  }, {
    id: "h4_213",
    hanzi: "接受",
    pinyin: "jiēshòu",
    meaning: "chấp nhận",
    sentence: "接受。",
    translation: "chấp nhận."
  }, {
    id: "h4_214",
    hanzi: "节约",
    pinyin: "jiéyuè",
    meaning: "tiết kiệm",
    sentence: "节约。",
    translation: "tiết kiệm."
  }, {
    id: "h4_215",
    hanzi: "接着",
    pinyin: "jiēzhe",
    meaning: "ngay sau đó",
    sentence: "接着。",
    translation: "ngay sau đó."
  }, {
    id: "h4_216",
    hanzi: "计划",
    pinyin: "jìhuà",
    meaning: "kế hoạch, lập kế hoạch",
    sentence: "计划。",
    translation: "kế hoạch, lập kế hoạch."
  }, {
    id: "h4_217",
    hanzi: "积极",
    pinyin: "jījí",
    meaning: "tích cực",
    sentence: "积极。",
    translation: "tích cực."
  }, {
    id: "h4_218",
    hanzi: "积累",
    pinyin: "jīlěi",
    meaning: "tích lũy",
    sentence: "积累。",
    translation: "tích lũy."
  }, {
    id: "h4_219",
    hanzi: "精彩",
    pinyin: "jīngcǎi",
    meaning: "tuyệt vời, xuất sắc",
    sentence: "精彩。",
    translation: "tuyệt vời, xuất sắc."
  }, {
    id: "h4_220",
    hanzi: "警察",
    pinyin: "jǐngchá",
    meaning: "cảnh sát",
    sentence: "警察。",
    translation: "cảnh sát."
  }, {
    id: "h4_221",
    hanzi: "经济",
    pinyin: "jīngjì",
    meaning: "kinh tế",
    sentence: "经济。",
    translation: "kinh tế."
  }, {
    id: "h4_222",
    hanzi: "京剧",
    pinyin: "jīngjù",
    meaning: "kinh kịch",
    sentence: "京剧。",
    translation: "kinh kịch."
  }, {
    id: "h4_223",
    hanzi: "经历",
    pinyin: "jīnglì",
    meaning: "trải qua",
    sentence: "经历。",
    translation: "trải qua."
  }, {
    id: "h4_224",
    hanzi: "竟然",
    pinyin: "jìngrán",
    meaning: "không ngờ, mà, vậy mà",
    sentence: "竟然。",
    translation: "không ngờ, mà, vậy mà."
  }, {
    id: "h4_225",
    hanzi: "景色",
    pinyin: "jǐngsè",
    meaning: "phong cảnh, cảnh vật",
    sentence: "景色。",
    translation: "phong cảnh, cảnh vật."
  }, {
    id: "h4_226",
    hanzi: "尽管",
    pinyin: "jǐnguǎn",
    meaning: "cho dù, mặc dù",
    sentence: "尽管。",
    translation: "cho dù, mặc dù."
  }, {
    id: "h4_227",
    hanzi: "经验",
    pinyin: "jīngyàn",
    meaning: "kinh nghiệm",
    sentence: "经验。",
    translation: "kinh nghiệm."
  }, {
    id: "h4_228",
    hanzi: "竞争",
    pinyin: "jìngzhèng",
    meaning: "cạnh tranh",
    sentence: "竞争。",
    translation: "cạnh tranh."
  }, {
    id: "h4_229",
    hanzi: "镜子",
    pinyin: "jìngzi",
    meaning: "gương, gương soi",
    sentence: "镜子。",
    translation: "gương, gương soi."
  }, {
    id: "h4_230",
    hanzi: "进行",
    pinyin: "jìnxíng",
    meaning: "tiến hành, thực hiện",
    sentence: "进行。",
    translation: "tiến hành, thực hiện."
  }, {
    id: "h4_231",
    hanzi: "紧张",
    pinyin: "jǐnzhāng",
    meaning: "hồi hộp, căng thẳng",
    sentence: "紧张。",
    translation: "hồi hộp, căng thẳng."
  }, {
    id: "h4_232",
    hanzi: "禁止",
    pinyin: "jìnzhǐ",
    meaning: "cấm",
    sentence: "禁止。",
    translation: "cấm."
  }, {
    id: "h4_233",
    hanzi: "既然",
    pinyin: "jìrán",
    meaning: "vì, đã… thì…",
    sentence: "既然。",
    translation: "vì, đã… thì…."
  }, {
    id: "h4_234",
    hanzi: "及时",
    pinyin: "jíshí",
    meaning: "đúng lúc, kịp thời",
    sentence: "及时。",
    translation: "đúng lúc, kịp thời."
  }, {
    id: "h4_235",
    hanzi: "即使",
    pinyin: "jíshǐ",
    meaning: "cho dù",
    sentence: "即使。",
    translation: "cho dù."
  }, {
    id: "h4_236",
    hanzi: "技术",
    pinyin: "jìshù",
    meaning: "kỹ thuật, công nghệ",
    sentence: "技术。",
    translation: "kỹ thuật, công nghệ."
  }, {
    id: "h4_237",
    hanzi: "究竟",
    pinyin: "jiūjìng",
    meaning: "rốt cuộc",
    sentence: "究竟。",
    translation: "rốt cuộc."
  }, {
    id: "h4_238",
    hanzi: "继续",
    pinyin: "jìxù",
    meaning: "tiếp tục",
    sentence: "继续。",
    translation: "tiếp tục."
  }, {
    id: "h4_239",
    hanzi: "记者",
    pinyin: "jìzhě",
    meaning: "phóng viên, nhà báo",
    sentence: "记者。",
    translation: "phóng viên, nhà báo."
  }, {
    id: "h4_240",
    hanzi: "举",
    pinyin: "jǔ",
    meaning: "nêu, đưa ra",
    sentence: "举。",
    translation: "nêu, đưa ra."
  }, {
    id: "h4_241",
    hanzi: "举办",
    pinyin: "jǔbàn",
    meaning: "tổ chức, tiến hành",
    sentence: "举办。",
    translation: "tổ chức, tiến hành."
  }, {
    id: "h4_242",
    hanzi: "聚会",
    pinyin: "jùhuì",
    meaning: "gặp gỡ, cuộc gặp mặt",
    sentence: "聚会。",
    translation: "gặp gỡ, cuộc gặp mặt."
  }, {
    id: "h4_243",
    hanzi: "拒绝",
    pinyin: "jùjué",
    meaning: "từ chối",
    sentence: "拒绝。",
    translation: "từ chối."
  }, {
    id: "h4_244",
    hanzi: "距离",
    pinyin: "jùlí",
    meaning: "khoảng cách",
    sentence: "距离。",
    translation: "khoảng cách."
  }, {
    id: "h4_245",
    hanzi: "举行",
    pinyin: "jǔxíng",
    meaning: "tổ chức",
    sentence: "举行。",
    translation: "tổ chức."
  }, {
    id: "h4_246",
    hanzi: "开玩笑",
    pinyin: "kāi wánxiào",
    meaning: "nói đùa, đùa",
    sentence: "开玩笑。",
    translation: "nói đùa, đùa."
  }, {
    id: "h4_247",
    hanzi: "开心",
    pinyin: "kāixīn",
    meaning: "vui vẻ",
    sentence: "开心。",
    translation: "vui vẻ."
  }, {
    id: "h4_248",
    hanzi: "看法",
    pinyin: "kànfǎ",
    meaning: "quan điểm, cách nhìn",
    sentence: "看法。",
    translation: "quan điểm, cách nhìn."
  }, {
    id: "h4_249",
    hanzi: "考虑",
    pinyin: "kǎolǜ",
    meaning: "suy xét, cân nhắc",
    sentence: "考虑。",
    translation: "suy xét, cân nhắc."
  }, {
    id: "h4_250",
    hanzi: "烤鸭",
    pinyin: "kǎoyā",
    meaning: "vịt quay",
    sentence: "烤鸭。",
    translation: "vịt quay."
  }, {
    id: "h4_251",
    hanzi: "棵",
    pinyin: "kē",
    meaning: "cây, ngọn (dược dùng cho thực vật)",
    sentence: "棵。",
    translation: "cây, ngọn (dược dùng cho thực vật)."
  }, {
    id: "h4_252",
    hanzi: "可怜",
    pinyin: "kělián",
    meaning: "đáng thương, tội nghiệp",
    sentence: "可怜。",
    translation: "đáng thương, tội nghiệp."
  }, {
    id: "h4_253",
    hanzi: "肯定",
    pinyin: "kěndìng",
    meaning: "chắc chắn, nhất định",
    sentence: "肯定。",
    translation: "chắc chắn, nhất định."
  }, {
    id: "h4_254",
    hanzi: "可是",
    pinyin: "kěshì",
    meaning: "nhưng",
    sentence: "可是。",
    translation: "nhưng."
  }, {
    id: "h4_255",
    hanzi: "咳嗽",
    pinyin: "késou",
    meaning: "ho",
    sentence: "咳嗽。",
    translation: "ho."
  }, {
    id: "h4_256",
    hanzi: "客厅",
    pinyin: "kètīng",
    meaning: "phòng khách",
    sentence: "客厅。",
    translation: "phòng khách."
  }, {
    id: "h4_257",
    hanzi: "可惜",
    pinyin: "kěxī",
    meaning: "đáng tiếc",
    sentence: "可惜。",
    translation: "đáng tiếc."
  }, {
    id: "h4_258",
    hanzi: "科学",
    pinyin: "kēxué",
    meaning: "khoa học",
    sentence: "科学。",
    translation: "khoa học."
  }, {
    id: "h4_259",
    hanzi: "空",
    pinyin: "kōng",
    meaning: "trống, rỗng, không",
    sentence: "空。",
    translation: "trống, rỗng, không."
  }, {
    id: "h4_260",
    hanzi: "恐怕",
    pinyin: "kǒngpà",
    meaning: "e rằng, có lẽ",
    sentence: "恐怕。",
    translation: "e rằng, có lẽ."
  }, {
    id: "h4_261",
    hanzi: "空气",
    pinyin: "kōngqì",
    meaning: "không khí",
    sentence: "空气。",
    translation: "không khí."
  }, {
    id: "h4_262",
    hanzi: "苦",
    pinyin: "kǔ",
    meaning: "đắng",
    sentence: "苦。",
    translation: "đắng."
  }, {
    id: "h4_263",
    hanzi: "矿泉水",
    pinyin: "kuàngquánshuǐ",
    meaning: "nước suối",
    sentence: "矿泉水。",
    translation: "nước suối."
  }, {
    id: "h4_264",
    hanzi: "困",
    pinyin: "kùn",
    meaning: "buồn ngủ",
    sentence: "困。",
    translation: "buồn ngủ."
  }, {
    id: "h4_265",
    hanzi: "困难",
    pinyin: "kùnnan",
    meaning: "khó khăn",
    sentence: "困难。",
    translation: "khó khăn."
  }, {
    id: "h4_266",
    hanzi: "辣",
    pinyin: "là",
    meaning: "cay",
    sentence: "辣。",
    translation: "cay."
  }, {
    id: "h4_267",
    hanzi: "拉",
    pinyin: "lā",
    meaning: "kéo, lôi, dắt",
    sentence: "拉。",
    translation: "kéo, lôi, dắt."
  }, {
    id: "h4_268",
    hanzi: "来不及",
    pinyin: "láibují",
    meaning: "không kịp",
    sentence: "来不及。",
    translation: "không kịp."
  }, {
    id: "h4_269",
    hanzi: "来得及",
    pinyin: "láidejí",
    meaning: "kịp",
    sentence: "来得及。",
    translation: "kịp."
  }, {
    id: "h4_270",
    hanzi: "来自",
    pinyin: "láizì",
    meaning: "đến từ",
    sentence: "来自。",
    translation: "đến từ."
  }, {
    id: "h4_271",
    hanzi: "垃圾桶",
    pinyin: "lājītǒng",
    meaning: "thùng rác",
    sentence: "垃圾桶。",
    translation: "thùng rác."
  }, {
    id: "h4_272",
    hanzi: "懒",
    pinyin: "lǎn",
    meaning: "lười, lười nhác",
    sentence: "懒。",
    translation: "lười, lười nhác."
  }, {
    id: "h4_273",
    hanzi: "浪费",
    pinyin: "làngfèi",
    meaning: "lãng phí, hoang phí",
    sentence: "浪费。",
    translation: "lãng phí, hoang phí."
  }, {
    id: "h4_274",
    hanzi: "浪漫",
    pinyin: "làngmàn",
    meaning: "lãng mạn",
    sentence: "浪漫。",
    translation: "lãng mạn."
  }, {
    id: "h4_275",
    hanzi: "老虎",
    pinyin: "lǎohǔ",
    meaning: "hổ, cọp",
    sentence: "老虎。",
    translation: "hổ, cọp."
  }, {
    id: "h4_276",
    hanzi: "冷静",
    pinyin: "lěngjìng",
    meaning: "bình tĩnh, điềm tĩnh",
    sentence: "冷静。",
    translation: "bình tĩnh, điềm tĩnh."
  }, {
    id: "h4_277",
    hanzi: "俩",
    pinyin: "liǎ",
    meaning: "hai",
    sentence: "俩。",
    translation: "hai."
  }, {
    id: "h4_278",
    hanzi: "连",
    pinyin: "lián",
    meaning: "ngay cả",
    sentence: "连。",
    translation: "ngay cả."
  }, {
    id: "h4_279",
    hanzi: "凉快",
    pinyin: "liángkuai",
    meaning: "mát mẻ",
    sentence: "凉快。",
    translation: "mát mẻ."
  }, {
    id: "h4_280",
    hanzi: "联系",
    pinyin: "liánxì",
    meaning: "liên hệ",
    sentence: "联系。",
    translation: "liên hệ."
  }, {
    id: "h4_281",
    hanzi: "礼拜天",
    pinyin: "lǐbàitiān",
    meaning: "chủ nhật",
    sentence: "礼拜天。",
    translation: "chủ nhật."
  }, {
    id: "h4_282",
    hanzi: "理发",
    pinyin: "lǐfà",
    meaning: "cắt tóc",
    sentence: "理发。",
    translation: "cắt tóc."
  }, {
    id: "h4_283",
    hanzi: "厉害",
    pinyin: "lìhai",
    meaning: "lợi hại",
    sentence: "厉害。",
    translation: "lợi hại."
  }, {
    id: "h4_284",
    hanzi: "理解",
    pinyin: "lǐjiě",
    meaning: "hiểu",
    sentence: "理解。",
    translation: "hiểu."
  }, {
    id: "h4_285",
    hanzi: "礼貌",
    pinyin: "lǐmào",
    meaning: "lễ phép, lịch sự",
    sentence: "礼貌。",
    translation: "lễ phép, lịch sự."
  }, {
    id: "h4_286",
    hanzi: "零钱",
    pinyin: "língqián",
    meaning: "tiền lẻ",
    sentence: "零钱。",
    translation: "tiền lẻ."
  }, {
    id: "h4_287",
    hanzi: "另外",
    pinyin: "lìngwài",
    meaning: "ngoài ra",
    sentence: "另外。",
    translation: "ngoài ra."
  }, {
    id: "h4_288",
    hanzi: "力气",
    pinyin: "lìqi",
    meaning: "sức lực, hơi sức",
    sentence: "力气。",
    translation: "sức lực, hơi sức."
  }, {
    id: "h4_289",
    hanzi: "例如",
    pinyin: "lìrú",
    meaning: "lấy ví dụ",
    sentence: "例如。",
    translation: "lấy ví dụ."
  }, {
    id: "h4_290",
    hanzi: "留",
    pinyin: "liú",
    meaning: "để lại",
    sentence: "留。",
    translation: "để lại."
  }, {
    id: "h4_291",
    hanzi: "流利",
    pinyin: "liúlì",
    meaning: "lưu loát, trôi chảy",
    sentence: "流利。",
    translation: "lưu loát, trôi chảy."
  }, {
    id: "h4_292",
    hanzi: "流行",
    pinyin: "liúxíng",
    meaning: "được nhiều người ưa chuộng",
    sentence: "流行。",
    translation: "được nhiều người ưa chuộng."
  }, {
    id: "h4_293",
    hanzi: "理想",
    pinyin: "lǐxiǎng",
    meaning: "lí tưởng",
    sentence: "理想。",
    translation: "lí tưởng."
  }, {
    id: "h4_294",
    hanzi: "乱",
    pinyin: "luàn",
    meaning: "lộn xộn, lúng túng",
    sentence: "乱。",
    translation: "lộn xộn, lúng túng."
  }, {
    id: "h4_295",
    hanzi: "律师",
    pinyin: "lǜshī",
    meaning: "luật  sư",
    sentence: "律师。",
    translation: "luật  sư."
  }, {
    id: "h4_296",
    hanzi: "旅行",
    pinyin: "lǚxíng",
    meaning: "du lịch",
    sentence: "旅行。",
    translation: "du lịch."
  }, {
    id: "h4_297",
    hanzi: "麻烦",
    pinyin: "máfan",
    meaning: "làm phiền",
    sentence: "麻烦。",
    translation: "làm phiền."
  }, {
    id: "h4_298",
    hanzi: "马虎",
    pinyin: "mǎhu",
    meaning: "cẩu thả, lơ đễnh",
    sentence: "马虎。",
    translation: "cẩu thả, lơ đễnh."
  }, {
    id: "h4_299",
    hanzi: "满",
    pinyin: "mǎn",
    meaning: "đủ, đầy, tròn",
    sentence: "满。",
    translation: "đủ, đầy, tròn."
  }, {
    id: "h4_300",
    hanzi: "毛",
    pinyin: "máo",
    meaning: "lông",
    sentence: "毛。",
    translation: "lông."
  }, {
    id: "h4_301",
    hanzi: "毛巾",
    pinyin: "máojīn",
    meaning: "khăn lau",
    sentence: "毛巾。",
    translation: "khăn lau."
  }, {
    id: "h4_302",
    hanzi: "美丽",
    pinyin: "měilì",
    meaning: "đẹp",
    sentence: "美丽。",
    translation: "đẹp."
  }, {
    id: "h4_303",
    hanzi: "梦",
    pinyin: "mèng",
    meaning: "giấc mơ",
    sentence: "梦。",
    translation: "giấc mơ."
  }, {
    id: "h4_304",
    hanzi: "免费",
    pinyin: "miǎnfèi",
    meaning: "miễn phí",
    sentence: "免费。",
    translation: "miễn phí."
  }, {
    id: "h4_305",
    hanzi: "秒",
    pinyin: "miǎo",
    meaning: "giây",
    sentence: "秒。",
    translation: "giây."
  }, {
    id: "h4_306",
    hanzi: "迷路",
    pinyin: "mílù",
    meaning: "lạc đường",
    sentence: "迷路。",
    translation: "lạc đường."
  }, {
    id: "h4_307",
    hanzi: "密码",
    pinyin: "mìmǎ",
    meaning: "mật mã",
    sentence: "密码。",
    translation: "mật mã."
  }, {
    id: "h4_308",
    hanzi: "民族",
    pinyin: "mínzú",
    meaning: "dân tộc",
    sentence: "民族。",
    translation: "dân tộc."
  }, {
    id: "h4_309",
    hanzi: "目的",
    pinyin: "mùdì",
    meaning: "mục đích",
    sentence: "目的。",
    translation: "mục đích."
  }, {
    id: "h4_310",
    hanzi: "母亲",
    pinyin: "mǔqīn",
    meaning: "mẹ",
    sentence: "母亲。",
    translation: "mẹ."
  }, {
    id: "h4_311",
    hanzi: "耐心",
    pinyin: "nàixīn",
    meaning: "lòng kiên nhẫn, sự nhẫn nại",
    sentence: "耐心。",
    translation: "lòng kiên nhẫn, sự nhẫn nại."
  }, {
    id: "h4_312",
    hanzi: "难道",
    pinyin: "nándào",
    meaning: "dùng trong câu hỏi tu từ để nhấn mạnh",
    sentence: "难道。",
    translation: "dùng trong câu hỏi tu từ để nhấn mạnh."
  }, {
    id: "h4_313",
    hanzi: "难受",
    pinyin: "nánshòu",
    meaning: "bực bội, buồn rầu",
    sentence: "难受。",
    translation: "bực bội, buồn rầu."
  }, {
    id: "h4_314",
    hanzi: "内",
    pinyin: "nèi",
    meaning: "trong",
    sentence: "内。",
    translation: "trong."
  }, {
    id: "h4_315",
    hanzi: "内容",
    pinyin: "nèiróng",
    meaning: "nội dung",
    sentence: "内容。",
    translation: "nội dung."
  }, {
    id: "h4_316",
    hanzi: "能力",
    pinyin: "nénglì",
    meaning: "năng lực, khả năng",
    sentence: "能力。",
    translation: "năng lực, khả năng."
  }, {
    id: "h4_317",
    hanzi: "年龄",
    pinyin: "niánlíng",
    meaning: "tuổi",
    sentence: "年龄。",
    translation: "tuổi."
  }, {
    id: "h4_318",
    hanzi: "弄",
    pinyin: "nòng",
    meaning: "làm",
    sentence: "弄。",
    translation: "làm."
  }, {
    id: "h4_319",
    hanzi: "暖和",
    pinyin: "nuǎnhuo",
    meaning: "ấm áp",
    sentence: "暖和。",
    translation: "ấm áp."
  }, {
    id: "h4_320",
    hanzi: "偶尔",
    pinyin: "ǒu’ěr",
    meaning: "thỉnh thoảng",
    sentence: "偶尔。",
    translation: "thỉnh thoảng."
  }, {
    id: "h4_321",
    hanzi: "排队",
    pinyin: "páiduì",
    meaning: "xếp hàng",
    sentence: "排队。",
    translation: "xếp hàng."
  }, {
    id: "h4_322",
    hanzi: "排列",
    pinyin: "páiliè",
    meaning: "sắp xếp",
    sentence: "排列。",
    translation: "sắp xếp."
  }, {
    id: "h4_323",
    hanzi: "判断",
    pinyin: "pànduàn",
    meaning: "nhận xét, đánh giá",
    sentence: "判断。",
    translation: "nhận xét, đánh giá."
  }, {
    id: "h4_324",
    hanzi: "陪",
    pinyin: "péi",
    meaning: "đi cùng, ở bên cạnh",
    sentence: "陪。",
    translation: "đi cùng, ở bên cạnh."
  }, {
    id: "h4_325",
    hanzi: "骗",
    pinyin: "piàn",
    meaning: "lừa gạt",
    sentence: "骗。",
    translation: "lừa gạt."
  }, {
    id: "h4_326",
    hanzi: "篇",
    pinyin: "piān",
    meaning: "bài, tờ",
    sentence: "篇。",
    translation: "bài, tờ."
  }, {
    id: "h4_327",
    hanzi: "皮肤",
    pinyin: "pífū",
    meaning: "da",
    sentence: "皮肤。",
    translation: "da."
  }, {
    id: "h4_328",
    hanzi: "乒乓球",
    pinyin: "pīngpāngqiú",
    meaning: "bóng bàn",
    sentence: "乒乓球。",
    translation: "bóng bàn."
  }, {
    id: "h4_329",
    hanzi: "平时",
    pinyin: "píngshí",
    meaning: "lúc thường, ngày thường",
    sentence: "平时。",
    translation: "lúc thường, ngày thường."
  }, {
    id: "h4_330",
    hanzi: "批评",
    pinyin: "pīpíng",
    meaning: "phê bình",
    sentence: "批评。",
    translation: "phê bình."
  }, {
    id: "h4_331",
    hanzi: "脾气",
    pinyin: "píqi",
    meaning: "tính tình, tính khí",
    sentence: "脾气。",
    translation: "tính tình, tính khí."
  }, {
    id: "h4_332",
    hanzi: "破",
    pinyin: "pò",
    meaning: "bị đứt, bị thủng",
    sentence: "破。",
    translation: "bị đứt, bị thủng."
  }, {
    id: "h4_333",
    hanzi: "普遍",
    pinyin: "pǔbiàn",
    meaning: "phổ biến",
    sentence: "普遍。",
    translation: "phổ biến."
  }, {
    id: "h4_334",
    hanzi: "葡萄",
    pinyin: "pútao",
    meaning: "quả nho",
    sentence: "葡萄。",
    translation: "quả nho."
  }, {
    id: "h4_335",
    hanzi: "普通话",
    pinyin: "pǔtōnghuà",
    meaning: "tiếng phổ thông, tiếng Quan Thoại",
    sentence: "普通话。",
    translation: "tiếng phổ thông, tiếng Quan Thoại."
  }, {
    id: "h4_336",
    hanzi: "千万",
    pinyin: "qiānwàn",
    meaning: "nhất thiết phải",
    sentence: "千万。",
    translation: "nhất thiết phải."
  }, {
    id: "h4_337",
    hanzi: "签证",
    pinyin: "qiānzhèng",
    meaning: "thị thực, visa",
    sentence: "签证。",
    translation: "thị thực, visa."
  }, {
    id: "h4_338",
    hanzi: "桥",
    pinyin: "qiáo",
    meaning: "cầu",
    sentence: "桥。",
    translation: "cầu."
  }, {
    id: "h4_339",
    hanzi: "敲",
    pinyin: "qiāo",
    meaning: "gõ, khua",
    sentence: "敲。",
    translation: "gõ, khua."
  }, {
    id: "h4_340",
    hanzi: "巧克力",
    pinyin: "qiǎokèlì",
    meaning: "sô cô la",
    sentence: "巧克力。",
    translation: "sô cô la."
  }, {
    id: "h4_341",
    hanzi: "其次",
    pinyin: "qícì",
    meaning: "thứ hai, sau đó",
    sentence: "其次。",
    translation: "thứ hai, sau đó."
  }, {
    id: "h4_342",
    hanzi: "气候",
    pinyin: "qìhòu",
    meaning: "khí hậu",
    sentence: "气候。",
    translation: "khí hậu."
  }, {
    id: "h4_343",
    hanzi: "轻",
    pinyin: "qīng",
    meaning: "nhẹ",
    sentence: "轻。",
    translation: "nhẹ."
  }, {
    id: "h4_344",
    hanzi: "情况",
    pinyin: "qíngkuàng",
    meaning: "tình hình, tình huống",
    sentence: "情况。",
    translation: "tình hình, tình huống."
  }, {
    id: "h4_345",
    hanzi: "轻松",
    pinyin: "qīngsōng",
    meaning: "nhẹ nhàng",
    sentence: "轻松。",
    translation: "nhẹ nhàng."
  }, {
    id: "h4_346",
    hanzi: "亲戚",
    pinyin: "qīnqi",
    meaning: "họ hàng thân thích",
    sentence: "亲戚。",
    translation: "họ hàng thân thích."
  }, {
    id: "h4_347",
    hanzi: "穷",
    pinyin: "qióng",
    meaning: "nghèo",
    sentence: "穷。",
    translation: "nghèo."
  }, {
    id: "h4_348",
    hanzi: "其中",
    pinyin: "qízhōng",
    meaning: "trong đó",
    sentence: "其中。",
    translation: "trong đó."
  }, {
    id: "h4_349",
    hanzi: "取",
    pinyin: "qǔ",
    meaning: "đạt được",
    sentence: "取。",
    translation: "đạt được."
  }, {
    id: "h4_350",
    hanzi: "全部",
    pinyin: "quánbù",
    meaning: "toàn bộ, tất cả",
    sentence: "全部。",
    translation: "toàn bộ, tất cả."
  }, {
    id: "h4_351",
    hanzi: "区别",
    pinyin: "qūbié",
    meaning: "sự khác biệt",
    sentence: "区别。",
    translation: "sự khác biệt."
  }, {
    id: "h4_352",
    hanzi: "却",
    pinyin: "què",
    meaning: "lại, nhưng mà",
    sentence: "却。",
    translation: "lại, nhưng mà."
  }, {
    id: "h4_353",
    hanzi: "缺点",
    pinyin: "quēdiǎn",
    meaning: "khuyết điểm, thiếu sót",
    sentence: "缺点。",
    translation: "khuyết điểm, thiếu sót."
  }, {
    id: "h4_354",
    hanzi: "缺少",
    pinyin: "quēshǎo",
    meaning: "thiếu",
    sentence: "缺少。",
    translation: "thiếu."
  }, {
    id: "h4_355",
    hanzi: "确实",
    pinyin: "quèshí",
    meaning: "thực sự",
    sentence: "确实。",
    translation: "thực sự."
  }, {
    id: "h4_356",
    hanzi: "然而",
    pinyin: "rán’ér",
    meaning: "nhưng, song",
    sentence: "然而。",
    translation: "nhưng, song."
  }, {
    id: "h4_357",
    hanzi: "热闹",
    pinyin: "rènao",
    meaning: "náo nhiệt",
    sentence: "热闹。",
    translation: "náo nhiệt."
  }, {
    id: "h4_358",
    hanzi: "扔",
    pinyin: "rēng",
    meaning: "vứt bỏ",
    sentence: "扔。",
    translation: "vứt bỏ."
  }, {
    id: "h4_359",
    hanzi: "仍然",
    pinyin: "réngrán",
    meaning: "vẫn",
    sentence: "仍然。",
    translation: "vẫn."
  }, {
    id: "h4_360",
    hanzi: "任何",
    pinyin: "rènhé",
    meaning: "bất cứ, bất kì",
    sentence: "任何。",
    translation: "bất cứ, bất kì."
  }, {
    id: "h4_361",
    hanzi: "任务",
    pinyin: "rènwu",
    meaning: "nhiệm vụ",
    sentence: "任务。",
    translation: "nhiệm vụ."
  }, {
    id: "h4_362",
    hanzi: "日记",
    pinyin: "rìjì",
    meaning: "nhật ký",
    sentence: "日记。",
    translation: "nhật ký."
  }, {
    id: "h4_363",
    hanzi: "入口",
    pinyin: "rùkǒu",
    meaning: "cổng vào",
    sentence: "入口。",
    translation: "cổng vào."
  }, {
    id: "h4_364",
    hanzi: "散步",
    pinyin: "sànbù",
    meaning: "đi dạo",
    sentence: "散步。",
    translation: "đi dạo."
  }, {
    id: "h4_365",
    hanzi: "森林",
    pinyin: "sēnlín",
    meaning: "rừng rậm",
    sentence: "森林。",
    translation: "rừng rậm."
  }, {
    id: "h4_366",
    hanzi: "沙发",
    pinyin: "shāfā",
    meaning: "ghế sofa",
    sentence: "沙发。",
    translation: "ghế sofa."
  }, {
    id: "h4_367",
    hanzi: "商量",
    pinyin: "shāngliang",
    meaning: "thương lượng, bàn bạc",
    sentence: "商量。",
    translation: "thương lượng, bàn bạc."
  }, {
    id: "h4_368",
    hanzi: "伤心",
    pinyin: "shāngxīn",
    meaning: "đau lòng",
    sentence: "伤心。",
    translation: "đau lòng."
  }, {
    id: "h4_369",
    hanzi: "稍微",
    pinyin: "shāowēi",
    meaning: "hơi, một chút",
    sentence: "稍微。",
    translation: "hơi, một chút."
  }, {
    id: "h4_370",
    hanzi: "勺子",
    pinyin: "sháozi",
    meaning: "cái muôi, cái thìa",
    sentence: "勺子。",
    translation: "cái muôi, cái thìa."
  }, {
    id: "h4_371",
    hanzi: "社会",
    pinyin: "shèhuì",
    meaning: "xã hội",
    sentence: "社会。",
    translation: "xã hội."
  }, {
    id: "h4_372",
    hanzi: "深",
    pinyin: "shēn",
    meaning: "sâu sắc",
    sentence: "深。",
    translation: "sâu sắc."
  }, {
    id: "h4_373",
    hanzi: "剩",
    pinyin: "shèng",
    meaning: "còn lại",
    sentence: "剩。",
    translation: "còn lại."
  }, {
    id: "h4_374",
    hanzi: "省",
    pinyin: "shěng",
    meaning: "tỉnh, tiết kiệm",
    sentence: "省。",
    translation: "tỉnh, tiết kiệm."
  }, {
    id: "h4_375",
    hanzi: "生活",
    pinyin: "shēnghuó",
    meaning: "cuộc sống, sống",
    sentence: "生活。",
    translation: "cuộc sống, sống."
  }, {
    id: "h4_376",
    hanzi: "生命",
    pinyin: "shēngmìng",
    meaning: "sự sống, sinh mệnh",
    sentence: "生命。",
    translation: "sự sống, sinh mệnh."
  }, {
    id: "h4_377",
    hanzi: "生意",
    pinyin: "shēngyi",
    meaning: "việc kinh doanh, buôn bán",
    sentence: "生意。",
    translation: "việc kinh doanh, buôn bán."
  }, {
    id: "h4_378",
    hanzi: "申请",
    pinyin: "shēnqǐng",
    meaning: "xin",
    sentence: "申请。",
    translation: "xin."
  }, {
    id: "h4_379",
    hanzi: "甚至",
    pinyin: "shènzhì",
    meaning: "thậm chí",
    sentence: "甚至。",
    translation: "thậm chí."
  }, {
    id: "h4_380",
    hanzi: "使",
    pinyin: "shǐ",
    meaning: "khiến cho, làm cho",
    sentence: "使。",
    translation: "khiến cho, làm cho."
  }, {
    id: "h4_381",
    hanzi: "失败",
    pinyin: "shībài",
    meaning: "thất bại",
    sentence: "失败。",
    translation: "thất bại."
  }, {
    id: "h4_382",
    hanzi: "十分",
    pinyin: "shífēn",
    meaning: "rất, vô cùng",
    sentence: "十分。",
    translation: "rất, vô cùng."
  }, {
    id: "h4_383",
    hanzi: "是否",
    pinyin: "shìfǒu",
    meaning: "hay không",
    sentence: "是否。",
    translation: "hay không."
  }, {
    id: "h4_384",
    hanzi: "师傅",
    pinyin: "shīfu",
    meaning: "sư phụ",
    sentence: "师傅。",
    translation: "sư phụ."
  }, {
    id: "h4_385",
    hanzi: "适合",
    pinyin: "shìhé",
    meaning: "phù hợp",
    sentence: "适合。",
    translation: "phù hợp."
  }, {
    id: "h4_386",
    hanzi: "世纪",
    pinyin: "shìjì",
    meaning: "thế kỷ",
    sentence: "世纪。",
    translation: "thế kỷ."
  }, {
    id: "h4_387",
    hanzi: "实际",
    pinyin: "shíjì",
    meaning: "thực tế",
    sentence: "实际。",
    translation: "thực tế."
  }, {
    id: "h4_388",
    hanzi: "失望",
    pinyin: "shīwàng",
    meaning: "thất vọng",
    sentence: "失望。",
    translation: "thất vọng."
  }, {
    id: "h4_389",
    hanzi: "适应",
    pinyin: "shìyìng",
    meaning: "thích nghi",
    sentence: "适应。",
    translation: "thích nghi."
  }, {
    id: "h4_390",
    hanzi: "使用",
    pinyin: "shǐyòng",
    meaning: "sử dụng",
    sentence: "使用。",
    translation: "sử dụng."
  }, {
    id: "h4_391",
    hanzi: "实在",
    pinyin: "shízài",
    meaning: "kì thực, quả thực",
    sentence: "实在。",
    translation: "kì thực, quả thực."
  }, {
    id: "h4_392",
    hanzi: "收",
    pinyin: "shōu",
    meaning: "nhận",
    sentence: "收。",
    translation: "nhận."
  }, {
    id: "h4_393",
    hanzi: "受不了",
    pinyin: "shòubuliǎo",
    meaning: "chịu không nổi",
    sentence: "受不了。",
    translation: "chịu không nổi."
  }, {
    id: "h4_394",
    hanzi: "受到",
    pinyin: "shòudào",
    meaning: "nhận được",
    sentence: "受到。",
    translation: "nhận được."
  }, {
    id: "h4_395",
    hanzi: "首都",
    pinyin: "shǒudū",
    meaning: "thủ đô",
    sentence: "首都。",
    translation: "thủ đô."
  }, {
    id: "h4_396",
    hanzi: "售货员",
    pinyin: "shòuhuòyuán",
    meaning: "nhân viên bán hàng",
    sentence: "售货员。",
    translation: "nhân viên bán hàng."
  }, {
    id: "h4_397",
    hanzi: "收入",
    pinyin: "shōurù",
    meaning: "thu nhập",
    sentence: "收入。",
    translation: "thu nhập."
  }, {
    id: "h4_398",
    hanzi: "收拾",
    pinyin: "shōushi",
    meaning: "thu dọn, sắp xếp",
    sentence: "收拾。",
    translation: "thu dọn, sắp xếp."
  }, {
    id: "h4_399",
    hanzi: "首先",
    pinyin: "shǒuxiān",
    meaning: "trước hết, trước tiên",
    sentence: "首先。",
    translation: "trước hết, trước tiên."
  }, {
    id: "h4_400",
    hanzi: "输",
    pinyin: "shū",
    meaning: "thua",
    sentence: "输。",
    translation: "thua."
  }, {
    id: "h4_401",
    hanzi: "帅",
    pinyin: "shuài",
    meaning: "đẹp",
    sentence: "帅。",
    translation: "đẹp."
  }, {
    id: "h4_402",
    hanzi: "数量",
    pinyin: "shùliàng",
    meaning: "số lượng",
    sentence: "数量。",
    translation: "số lượng."
  }, {
    id: "h4_403",
    hanzi: "顺便",
    pinyin: "shùnbiàn",
    meaning: "nhân tiện",
    sentence: "顺便。",
    translation: "nhân tiện."
  }, {
    id: "h4_404",
    hanzi: "顺利",
    pinyin: "shùnlì",
    meaning: "thuận lợi, suôn sẻ",
    sentence: "顺利。",
    translation: "thuận lợi, suôn sẻ."
  }, {
    id: "h4_405",
    hanzi: "顺序",
    pinyin: "shùnxù",
    meaning: "trật tự, thứ tự",
    sentence: "顺序。",
    translation: "trật tự, thứ tự."
  }, {
    id: "h4_406",
    hanzi: "说明",
    pinyin: "shuōmíng",
    meaning: "giải thích rõ, nói rõ",
    sentence: "说明。",
    translation: "giải thích rõ, nói rõ."
  }, {
    id: "h4_407",
    hanzi: "硕士",
    pinyin: "shuòshì",
    meaning: "thạc sĩ",
    sentence: "硕士。",
    translation: "thạc sĩ."
  }, {
    id: "h4_408",
    hanzi: "熟悉",
    pinyin: "shúxi",
    meaning: "hiểu rõ",
    sentence: "熟悉。",
    translation: "hiểu rõ."
  }, {
    id: "h4_409",
    hanzi: "数字",
    pinyin: "shùzì",
    meaning: "con số",
    sentence: "数字。",
    translation: "con số."
  }, {
    id: "h4_410",
    hanzi: "死",
    pinyin: "sǐ",
    meaning: "cố định, cứng nhắc",
    sentence: "死。",
    translation: "cố định, cứng nhắc."
  }, {
    id: "h4_411",
    hanzi: "酸",
    pinyin: "suān",
    meaning: "chua",
    sentence: "酸。",
    translation: "chua."
  }, {
    id: "h4_412",
    hanzi: "速度",
    pinyin: "sùdù",
    meaning: "tốc độ",
    sentence: "速度。",
    translation: "tốc độ."
  }, {
    id: "h4_413",
    hanzi: "随便",
    pinyin: "suíbiàn",
    meaning: "tình cờ, tùy tiện",
    sentence: "随便。",
    translation: "tình cờ, tùy tiện."
  }, {
    id: "h4_414",
    hanzi: "随着",
    pinyin: "suízhe",
    meaning: "cùng với",
    sentence: "随着。",
    translation: "cùng với."
  }, {
    id: "h4_415",
    hanzi: "塑料袋",
    pinyin: "sùliàodài",
    meaning: "túi nilong, túi nhựa",
    sentence: "塑料袋。",
    translation: "túi nilong, túi nhựa."
  }, {
    id: "h4_416",
    hanzi: "孙子",
    pinyin: "sūnzi",
    meaning: "cháu nội trai",
    sentence: "孙子。",
    translation: "cháu nội trai."
  }, {
    id: "h4_417",
    hanzi: "所有",
    pinyin: "suǒyǒu",
    meaning: "tất cả, toàn bộ",
    sentence: "所有。",
    translation: "tất cả, toàn bộ."
  }, {
    id: "h4_418",
    hanzi: "抬",
    pinyin: "tái",
    meaning: "giơ lên, đưa lên",
    sentence: "抬。",
    translation: "giơ lên, đưa lên."
  }, {
    id: "h4_419",
    hanzi: "台",
    pinyin: "tái",
    meaning: "(dùng cho máy móc) cái, chiếc",
    sentence: "台。",
    translation: "(dùng cho máy móc) cái, chiếc."
  }, {
    id: "h4_420",
    hanzi: "态度",
    pinyin: "tàidù",
    meaning: "thái dộ",
    sentence: "态度。",
    translation: "thái dộ."
  }, {
    id: "h4_421",
    hanzi: "谈",
    pinyin: "tán",
    meaning: "nói chuyện, thảo luận",
    sentence: "谈。",
    translation: "nói chuyện, thảo luận."
  }, {
    id: "h4_422",
    hanzi: "弹钢琴",
    pinyin: "tán gāngqín",
    meaning: "chơi đàn dương cầm",
    sentence: "弹钢琴。",
    translation: "chơi đàn dương cầm."
  }, {
    id: "h4_423",
    hanzi: "糖",
    pinyin: "táng",
    meaning: "kẹo",
    sentence: "糖。",
    translation: "kẹo."
  }, {
    id: "h4_424",
    hanzi: "趟",
    pinyin: "tàng",
    meaning: "lần, chuyến",
    sentence: "趟。",
    translation: "lần, chuyến."
  }, {
    id: "h4_425",
    hanzi: "躺",
    pinyin: "tǎng",
    meaning: "nằm",
    sentence: "躺。",
    translation: "nằm."
  }, {
    id: "h4_426",
    hanzi: "汤",
    pinyin: "tāng",
    meaning: "canh, súp",
    sentence: "汤。",
    translation: "canh, súp."
  }, {
    id: "h4_427",
    hanzi: "讨论",
    pinyin: "tǎolùn",
    meaning: "thảo luận, bàn bạc",
    sentence: "讨论。",
    translation: "thảo luận, bàn bạc."
  }, {
    id: "h4_428",
    hanzi: "讨厌",
    pinyin: "tǎoyàn",
    meaning: "ghét, không thích",
    sentence: "讨厌。",
    translation: "ghét, không thích."
  }, {
    id: "h4_429",
    hanzi: "特点",
    pinyin: "tèdiǎn",
    meaning: "đặc điểm",
    sentence: "特点。",
    translation: "đặc điểm."
  }, {
    id: "h4_430",
    hanzi: "提",
    pinyin: "tí",
    meaning: "nhắc đến",
    sentence: "提。",
    translation: "nhắc đến."
  }, {
    id: "h4_431",
    hanzi: "填空",
    pinyin: "tiánkòng",
    meaning: "điền vào chỗ trống",
    sentence: "填空。",
    translation: "điền vào chỗ trống."
  }, {
    id: "h4_432",
    hanzi: "条件",
    pinyin: "tiáojiàn",
    meaning: "điều kiện",
    sentence: "条件。",
    translation: "điều kiện."
  }, {
    id: "h4_433",
    hanzi: "提供",
    pinyin: "tígōng",
    meaning: "cung cấp",
    sentence: "提供。",
    translation: "cung cấp."
  }, {
    id: "h4_434",
    hanzi: "停",
    pinyin: "tíng",
    meaning: "ngừng, cúp, cắt",
    sentence: "停。",
    translation: "ngừng, cúp, cắt."
  }, {
    id: "h4_435",
    hanzi: "挺",
    pinyin: "tǐng",
    meaning: "rất",
    sentence: "挺。",
    translation: "rất."
  }, {
    id: "h4_436",
    hanzi: "提前",
    pinyin: "tíqián",
    meaning: "làm việc gì đó sớm hơn quy định, trước thời hạn",
    sentence: "提前。",
    translation: "làm việc gì đó sớm hơn quy định, trước thời hạn."
  }, {
    id: "h4_437",
    hanzi: "提醒",
    pinyin: "tíxǐng",
    meaning: "nhắc nhở",
    sentence: "提醒。",
    translation: "nhắc nhở."
  }, {
    id: "h4_438",
    hanzi: "通过",
    pinyin: "tōngguò",
    meaning: "qua, nhờ vào",
    sentence: "通过。",
    translation: "qua, nhờ vào."
  }, {
    id: "h4_439",
    hanzi: "同情",
    pinyin: "tóngqíng",
    meaning: "thông cảm, đồng tình",
    sentence: "同情。",
    translation: "thông cảm, đồng tình."
  }, {
    id: "h4_440",
    hanzi: "同时",
    pinyin: "tóngshí",
    meaning: "đồng thời, hơn nữa",
    sentence: "同时。",
    translation: "đồng thời, hơn nữa."
  }, {
    id: "h4_441",
    hanzi: "通知",
    pinyin: "tōngzhī",
    meaning: "báo tin, thông báo",
    sentence: "通知。",
    translation: "báo tin, thông báo."
  }, {
    id: "h4_442",
    hanzi: "推",
    pinyin: "tuī",
    meaning: "hoãn lại, đẩy, triển khai",
    sentence: "推。",
    translation: "hoãn lại, đẩy, triển khai."
  }, {
    id: "h4_443",
    hanzi: "推迟",
    pinyin: "tuīchí",
    meaning: "hoãn lại",
    sentence: "推迟。",
    translation: "hoãn lại."
  }, {
    id: "h4_444",
    hanzi: "脱",
    pinyin: "tuō",
    meaning: "cởi ra",
    sentence: "脱。",
    translation: "cởi ra."
  }, {
    id: "h4_445",
    hanzi: "网球",
    pinyin: "wǎngqiú",
    meaning: "quần vợt",
    sentence: "网球。",
    translation: "quần vợt."
  }, {
    id: "h4_446",
    hanzi: "往往",
    pinyin: "wǎngwǎng",
    meaning: "thường thường",
    sentence: "往往。",
    translation: "thường thường."
  }, {
    id: "h4_447",
    hanzi: "网站",
    pinyin: "wǎngzhàn",
    meaning: "trang web",
    sentence: "网站。",
    translation: "trang web."
  }, {
    id: "h4_448",
    hanzi: "完全",
    pinyin: "wánquán",
    meaning: "hoàn toàn",
    sentence: "完全。",
    translation: "hoàn toàn."
  }, {
    id: "h4_449",
    hanzi: "袜子",
    pinyin: "wàzi",
    meaning: "tất, vớ",
    sentence: "袜子。",
    translation: "tất, vớ."
  }, {
    id: "h4_450",
    hanzi: "味道",
    pinyin: "wèidào",
    meaning: "mùi vị",
    sentence: "味道。",
    translation: "mùi vị."
  }, {
    id: "h4_451",
    hanzi: "卫生间",
    pinyin: "wèishēngjiān",
    meaning: "nhà vệ sinh",
    sentence: "卫生间。",
    translation: "nhà vệ sinh."
  }, {
    id: "h4_452",
    hanzi: "危险",
    pinyin: "wēixiǎn",
    meaning: "nguy hiểm",
    sentence: "危险。",
    translation: "nguy hiểm."
  }, {
    id: "h4_453",
    hanzi: "温度",
    pinyin: "wēndù",
    meaning: "nhiệt độ",
    sentence: "温度。",
    translation: "nhiệt độ."
  }, {
    id: "h4_454",
    hanzi: "文章",
    pinyin: "wénzhāng",
    meaning: "bài văn, bài báo",
    sentence: "文章。",
    translation: "bài văn, bài báo."
  }, {
    id: "h4_455",
    hanzi: "无",
    pinyin: "wú",
    meaning: "không có, không",
    sentence: "无。",
    translation: "không có, không."
  }, {
    id: "h4_456",
    hanzi: "误会",
    pinyin: "wùhuì",
    meaning: "sự hiểu lầm",
    sentence: "误会。",
    translation: "sự hiểu lầm."
  }, {
    id: "h4_457",
    hanzi: "无聊",
    pinyin: "wúliáo",
    meaning: "vô vị, nhàm chán",
    sentence: "无聊。",
    translation: "vô vị, nhàm chán."
  }, {
    id: "h4_458",
    hanzi: "无论",
    pinyin: "wúlùn",
    meaning: "bất kể",
    sentence: "无论。",
    translation: "bất kể."
  }, {
    id: "h4_459",
    hanzi: "污染",
    pinyin: "wūrǎn",
    meaning: "ô nhiễm",
    sentence: "污染。",
    translation: "ô nhiễm."
  }, {
    id: "h4_460",
    hanzi: "咸",
    pinyin: "xián",
    meaning: "mặn",
    sentence: "咸。",
    translation: "mặn."
  }, {
    id: "h4_461",
    hanzi: "响",
    pinyin: "xiǎng",
    meaning: "reo, vang lên",
    sentence: "响。",
    translation: "reo, vang lên."
  }, {
    id: "h4_462",
    hanzi: "香",
    pinyin: "xiāng",
    meaning: "thơm",
    sentence: "香。",
    translation: "thơm."
  }, {
    id: "h4_463",
    hanzi: "相反",
    pinyin: "xiāngfǎn",
    meaning: "trái lại, ngược lại",
    sentence: "相反。",
    translation: "trái lại, ngược lại."
  }, {
    id: "h4_464",
    hanzi: "橡皮",
    pinyin: "xiàngpí",
    meaning: "cục gôm, tẩy",
    sentence: "橡皮。",
    translation: "cục gôm, tẩy."
  }, {
    id: "h4_465",
    hanzi: "相同",
    pinyin: "xiāngtóng",
    meaning: "giống nhau, như nhau",
    sentence: "相同。",
    translation: "giống nhau, như nhau."
  }, {
    id: "h4_466",
    hanzi: "详细",
    pinyin: "xiángxì",
    meaning: "chi tiết, tỉ mỉ",
    sentence: "详细。",
    translation: "chi tiết, tỉ mỉ."
  }, {
    id: "h4_467",
    hanzi: "现金",
    pinyin: "xiànjīn",
    meaning: "tiền mặt",
    sentence: "现金。",
    translation: "tiền mặt."
  }, {
    id: "h4_468",
    hanzi: "羡慕",
    pinyin: "xiànmù",
    meaning: "ước ao, ngưỡng mộ",
    sentence: "羡慕。",
    translation: "ước ao, ngưỡng mộ."
  }, {
    id: "h4_469",
    hanzi: "小吃",
    pinyin: "xiǎochī",
    meaning: "món ăn vặt",
    sentence: "小吃。",
    translation: "món ăn vặt."
  }, {
    id: "h4_470",
    hanzi: "效果",
    pinyin: "xiàoguǒ",
    meaning: "hiệu quả",
    sentence: "效果。",
    translation: "hiệu quả."
  }, {
    id: "h4_471",
    hanzi: "笑话",
    pinyin: "xiàohua",
    meaning: "truyện cười",
    sentence: "笑话。",
    translation: "truyện cười."
  }, {
    id: "h4_472",
    hanzi: "小伙子",
    pinyin: "xiǎohuǒzi",
    meaning: "chàng trai",
    sentence: "小伙子。",
    translation: "chàng trai."
  }, {
    id: "h4_473",
    hanzi: "小说",
    pinyin: "xiǎoshuō",
    meaning: "tiểu thuyết",
    sentence: "小说。",
    translation: "tiểu thuyết."
  }, {
    id: "h4_474",
    hanzi: "消息",
    pinyin: "xiāoxi",
    meaning: "tin tức",
    sentence: "消息。",
    translation: "tin tức."
  }, {
    id: "h4_475",
    hanzi: "西红柿",
    pinyin: "xīhóngshì",
    meaning: "cà chua",
    sentence: "西红柿。",
    translation: "cà chua."
  }, {
    id: "h4_476",
    hanzi: "信封",
    pinyin: "xìnfēng",
    meaning: "phong thư, bì thư",
    sentence: "信封。",
    translation: "phong thư, bì thư."
  }, {
    id: "h4_477",
    hanzi: "行",
    pinyin: "xíng",
    meaning: "được, đồng ý",
    sentence: "行。",
    translation: "được, đồng ý."
  }, {
    id: "h4_478",
    hanzi: "醒",
    pinyin: "xǐng",
    meaning: "thức dậy, tỉnh dậy",
    sentence: "醒。",
    translation: "thức dậy, tỉnh dậy."
  }, {
    id: "h4_479",
    hanzi: "性别",
    pinyin: "xìngbié",
    meaning: "giới tính",
    sentence: "性别。",
    translation: "giới tính."
  }, {
    id: "h4_480",
    hanzi: "兴奋",
    pinyin: "xīngfèn",
    meaning: "hăng hái, phấn khởi",
    sentence: "兴奋。",
    translation: "hăng hái, phấn khởi."
  }, {
    id: "h4_481",
    hanzi: "幸福",
    pinyin: "xìngfú",
    meaning: "hạnh phúc",
    sentence: "幸福。",
    translation: "hạnh phúc."
  }, {
    id: "h4_482",
    hanzi: "性格",
    pinyin: "xìnggé",
    meaning: "tính cách",
    sentence: "性格。",
    translation: "tính cách."
  }, {
    id: "h4_483",
    hanzi: "辛苦",
    pinyin: "xīnkǔ",
    meaning: "vất vả, cực nhọc",
    sentence: "辛苦。",
    translation: "vất vả, cực nhọc."
  }, {
    id: "h4_484",
    hanzi: "心情",
    pinyin: "xīnqíng",
    meaning: "tâm trạng",
    sentence: "心情。",
    translation: "tâm trạng."
  }, {
    id: "h4_485",
    hanzi: "信息",
    pinyin: "xìnxī",
    meaning: "tin tức, thông tin",
    sentence: "信息。",
    translation: "tin tức, thông tin."
  }, {
    id: "h4_486",
    hanzi: "信心",
    pinyin: "xìnxīn",
    meaning: "lòng tin, sự tự tin",
    sentence: "信心。",
    translation: "lòng tin, sự tự tin."
  }, {
    id: "h4_487",
    hanzi: "修理",
    pinyin: "xiūlǐ",
    meaning: "sửa chữa",
    sentence: "修理。",
    translation: "sửa chữa."
  }, {
    id: "h4_488",
    hanzi: "吸引",
    pinyin: "xīyǐn",
    meaning: "hấp dẫn, thu hút",
    sentence: "吸引。",
    translation: "hấp dẫn, thu hút."
  }, {
    id: "h4_489",
    hanzi: "许多",
    pinyin: "xǔduō",
    meaning: "rất nhiều",
    sentence: "许多。",
    translation: "rất nhiều."
  }, {
    id: "h4_490",
    hanzi: "学期",
    pinyin: "xuéqī",
    meaning: "học kỳ",
    sentence: "学期。",
    translation: "học kỳ."
  }, {
    id: "h4_491",
    hanzi: "呀",
    pinyin: "ya",
    meaning: "(biến thể của 啊, dùng ở cuối câu làm cho giọng điệu nhẹ nhàng hơn",
    sentence: "呀。",
    translation: "(biến thể của 啊, dùng ở cuối câu làm cho giọng điệu nhẹ nhàng hơn."
  }, {
    id: "h4_492",
    hanzi: "亚洲",
    pinyin: "Yàzhōu",
    meaning: "Châu Á",
    sentence: "亚洲。",
    translation: "Châu Á."
  }, {
    id: "h4_493",
    hanzi: "牙膏",
    pinyin: "yágāo",
    meaning: "kem đánh răng",
    sentence: "牙膏。",
    translation: "kem đánh răng."
  }, {
    id: "h4_494",
    hanzi: "压力",
    pinyin: "yālì",
    meaning: "áp lực",
    sentence: "压力。",
    translation: "áp lực."
  }, {
    id: "h4_495",
    hanzi: "盐",
    pinyin: "yán",
    meaning: "muối",
    sentence: "盐。",
    translation: "muối."
  }, {
    id: "h4_496",
    hanzi: "演出",
    pinyin: "yǎnchū",
    meaning: "biểu diễn",
    sentence: "演出。",
    translation: "biểu diễn."
  }, {
    id: "h4_497",
    hanzi: "养成",
    pinyin: "yǎngchéng",
    meaning: "hình thành/ tạo",
    sentence: "养成。",
    translation: "hình thành/ tạo."
  }, {
    id: "h4_498",
    hanzi: "严格",
    pinyin: "yángé",
    meaning: "nghiêm khắc, nghiêm ngặt",
    sentence: "严格。",
    translation: "nghiêm khắc, nghiêm ngặt."
  }, {
    id: "h4_499",
    hanzi: "阳光",
    pinyin: "yángguāng",
    meaning: "lạc quan,vui vẻ",
    sentence: "阳光。",
    translation: "lạc quan,vui vẻ."
  }, {
    id: "h4_500",
    hanzi: "样子",
    pinyin: "yàngzi",
    meaning: "kiểu dáng",
    sentence: "样子。",
    translation: "kiểu dáng."
  }, {
    id: "h4_501",
    hanzi: "眼镜",
    pinyin: "yǎnjìng",
    meaning: "mắt kính",
    sentence: "眼镜。",
    translation: "mắt kính."
  }, {
    id: "h4_502",
    hanzi: "研究",
    pinyin: "yánjiū",
    meaning: "nghiên cứu",
    sentence: "研究。",
    translation: "nghiên cứu."
  }, {
    id: "h4_503",
    hanzi: "演员",
    pinyin: "yǎnyuán",
    meaning: "diễn viên",
    sentence: "演员。",
    translation: "diễn viên."
  }, {
    id: "h4_504",
    hanzi: "严重",
    pinyin: "yánzhòng",
    meaning: "nghiêm trọng",
    sentence: "严重。",
    translation: "nghiêm trọng."
  }, {
    id: "h4_505",
    hanzi: "邀请",
    pinyin: "yāoqǐng",
    meaning: "mời",
    sentence: "邀请。",
    translation: "mời."
  }, {
    id: "h4_506",
    hanzi: "钥匙",
    pinyin: "yàoshi",
    meaning: "chìa khóa",
    sentence: "钥匙。",
    translation: "chìa khóa."
  }, {
    id: "h4_507",
    hanzi: "要是",
    pinyin: "yàoshi",
    meaning: "nếu như",
    sentence: "要是。",
    translation: "nếu như."
  }, {
    id: "h4_508",
    hanzi: "页",
    pinyin: "yè",
    meaning: "trang",
    sentence: "页。",
    translation: "trang."
  }, {
    id: "h4_509",
    hanzi: "也许",
    pinyin: "yěxǔ",
    meaning: "có lẽ, may ra",
    sentence: "也许。",
    translation: "có lẽ, may ra."
  }, {
    id: "h4_510",
    hanzi: "叶子",
    pinyin: "yèzi",
    meaning: "lá cây",
    sentence: "叶子。",
    translation: "lá cây."
  }, {
    id: "h4_511",
    hanzi: "以",
    pinyin: "yǐ",
    meaning: "dựa vào, bằng",
    sentence: "以。",
    translation: "dựa vào, bằng."
  }, {
    id: "h4_512",
    hanzi: "意见",
    pinyin: "yìjiàn",
    meaning: "ý kiến",
    sentence: "意见。",
    translation: "ý kiến."
  }, {
    id: "h4_513",
    hanzi: "因此",
    pinyin: "yīncǐ",
    meaning: "do đó, vì vậy",
    sentence: "因此。",
    translation: "do đó, vì vậy."
  }, {
    id: "h4_514",
    hanzi: "赢",
    pinyin: "yíng",
    meaning: "thắng",
    sentence: "赢。",
    translation: "thắng."
  }, {
    id: "h4_515",
    hanzi: "应聘",
    pinyin: "yìngpìn",
    meaning: "xin việc",
    sentence: "应聘。",
    translation: "xin việc."
  }, {
    id: "h4_516",
    hanzi: "引起",
    pinyin: "yǐnqǐ",
    meaning: "gây ra, dẫn đến",
    sentence: "引起。",
    translation: "gây ra, dẫn đến."
  }, {
    id: "h4_517",
    hanzi: "印象",
    pinyin: "yìnxiàng",
    meaning: "ấn tượng",
    sentence: "印象。",
    translation: "ấn tượng."
  }, {
    id: "h4_518",
    hanzi: "一切",
    pinyin: "yíqiè",
    meaning: "tất cả",
    sentence: "一切。",
    translation: "tất cả."
  }, {
    id: "h4_519",
    hanzi: "艺术",
    pinyin: "yìshù",
    meaning: "nghệ thuật, có tính nghệ thuật",
    sentence: "艺术。",
    translation: "nghệ thuật, có tính nghệ thuật."
  }, {
    id: "h4_520",
    hanzi: "以为",
    pinyin: "yǐwéi",
    meaning: "cho rằng, tưởng là",
    sentence: "以为。",
    translation: "cho rằng, tưởng là."
  }, {
    id: "h4_521",
    hanzi: "勇敢",
    pinyin: "yǒnggǎn",
    meaning: "dũng cảm",
    sentence: "勇敢。",
    translation: "dũng cảm."
  }, {
    id: "h4_522",
    hanzi: "永远",
    pinyin: "yǒngyuǎn",
    meaning: "mãi mãi",
    sentence: "永远。",
    translation: "mãi mãi."
  }, {
    id: "h4_523",
    hanzi: "由",
    pinyin: "yóu",
    meaning: "do",
    sentence: "由。",
    translation: "do."
  }, {
    id: "h4_524",
    hanzi: "优点",
    pinyin: "yōudiǎn",
    meaning: "ưu điểm",
    sentence: "优点。",
    translation: "ưu điểm."
  }, {
    id: "h4_525",
    hanzi: "友好",
    pinyin: "yǒuhǎo",
    meaning: "thân thiện",
    sentence: "友好。",
    translation: "thân thiện."
  }, {
    id: "h4_526",
    hanzi: "邮局",
    pinyin: "yóujú",
    meaning: "bưu điện",
    sentence: "邮局。",
    translation: "bưu điện."
  }, {
    id: "h4_527",
    hanzi: "幽默",
    pinyin: "yōumò",
    meaning: "hóm hỉnh, khôi hài",
    sentence: "幽默。",
    translation: "hóm hỉnh, khôi hài."
  }, {
    id: "h4_528",
    hanzi: "尤其",
    pinyin: "yóuqí",
    meaning: "đặc biệt là, nhất là",
    sentence: "尤其。",
    translation: "đặc biệt là, nhất là."
  }, {
    id: "h4_529",
    hanzi: "有趣",
    pinyin: "yǒuqù",
    meaning: "thú vị, lý thú",
    sentence: "有趣。",
    translation: "thú vị, lý thú."
  }, {
    id: "h4_530",
    hanzi: "优秀",
    pinyin: "yōuxiù",
    meaning: "xuất sắc, ưu tú",
    sentence: "优秀。",
    translation: "xuất sắc, ưu tú."
  }, {
    id: "h4_531",
    hanzi: "友谊",
    pinyin: "yǒuyì",
    meaning: "tình bạn",
    sentence: "友谊。",
    translation: "tình bạn."
  }, {
    id: "h4_532",
    hanzi: "由于",
    pinyin: "yóuyú",
    meaning: "bởi vì",
    sentence: "由于。",
    translation: "bởi vì."
  }, {
    id: "h4_533",
    hanzi: "与",
    pinyin: "yǔ",
    meaning: "với, và",
    sentence: "与。",
    translation: "với, và."
  }, {
    id: "h4_534",
    hanzi: "原来",
    pinyin: "yuánlái",
    meaning: "ban đầu",
    sentence: "原来。",
    translation: "ban đầu."
  }, {
    id: "h4_535",
    hanzi: "原谅",
    pinyin: "yuánliàng",
    meaning: "tha thứ",
    sentence: "原谅。",
    translation: "tha thứ."
  }, {
    id: "h4_536",
    hanzi: "原因",
    pinyin: "yuányīn",
    meaning: "nguyên nhân",
    sentence: "原因。",
    translation: "nguyên nhân."
  }, {
    id: "h4_537",
    hanzi: "阅读",
    pinyin: "yuèdú",
    meaning: "đọc",
    sentence: "阅读。",
    translation: "đọc."
  }, {
    id: "h4_538",
    hanzi: "约会",
    pinyin: "yuēhuì",
    meaning: "hẹn gặp, hẹn hò",
    sentence: "约会。",
    translation: "hẹn gặp, hẹn hò."
  }, {
    id: "h4_539",
    hanzi: "语法",
    pinyin: "yǔfǎ",
    meaning: "ngữ pháp",
    sentence: "语法。",
    translation: "ngữ pháp."
  }, {
    id: "h4_540",
    hanzi: "愉快",
    pinyin: "yúkuài",
    meaning: "vui vẻ",
    sentence: "愉快。",
    translation: "vui vẻ."
  }, {
    id: "h4_541",
    hanzi: "羽毛球",
    pinyin: "yǔmáoqiú",
    meaning: "cầu lông",
    sentence: "羽毛球。",
    translation: "cầu lông."
  }, {
    id: "h4_542",
    hanzi: "云",
    pinyin: "yún",
    meaning: "mây",
    sentence: "云。",
    translation: "mây."
  }, {
    id: "h4_543",
    hanzi: "允许",
    pinyin: "yǔnxǔ",
    meaning: "cho phép",
    sentence: "允许。",
    translation: "cho phép."
  }, {
    id: "h4_544",
    hanzi: "于是",
    pinyin: "yúshì",
    meaning: "thế là",
    sentence: "于是。",
    translation: "thế là."
  }, {
    id: "h4_545",
    hanzi: "预习",
    pinyin: "yùxí",
    meaning: "chuẩn bị bài",
    sentence: "预习。",
    translation: "chuẩn bị bài."
  }, {
    id: "h4_546",
    hanzi: "语言",
    pinyin: "yǔyán",
    meaning: "ngôn ngữ",
    sentence: "语言。",
    translation: "ngôn ngữ."
  }, {
    id: "h4_547",
    hanzi: "脏",
    pinyin: "zāng",
    meaning: "bẩn, bẩn thỉu",
    sentence: "脏。",
    translation: "bẩn, bẩn thỉu."
  }, {
    id: "h4_548",
    hanzi: "咱们",
    pinyin: "zánmen",
    meaning: "chúng ta, chúng mình",
    sentence: "咱们。",
    translation: "chúng ta, chúng mình."
  }, {
    id: "h4_549",
    hanzi: "暂时",
    pinyin: "zànshí",
    meaning: "tạm thời",
    sentence: "暂时。",
    translation: "tạm thời."
  }, {
    id: "h4_550",
    hanzi: "杂志",
    pinyin: "zázhì",
    meaning: "tạp chí",
    sentence: "杂志。",
    translation: "tạp chí."
  }, {
    id: "h4_551",
    hanzi: "增加",
    pinyin: "zēngjiā",
    meaning: "tăng thêm",
    sentence: "增加。",
    translation: "tăng thêm."
  }, {
    id: "h4_552",
    hanzi: "责任",
    pinyin: "zérèn",
    meaning: "trách nhiệm",
    sentence: "责任。",
    translation: "trách nhiệm."
  }, {
    id: "h4_553",
    hanzi: "战线",
    pinyin: "zhànxiàn",
    meaning: "(đường dây điện thoại) bận",
    sentence: "战线。",
    translation: "(đường dây điện thoại) bận."
  }, {
    id: "h4_554",
    hanzi: "照",
    pinyin: "zhào",
    meaning: "chụp (ảnh)",
    sentence: "照。",
    translation: "chụp (ảnh)."
  }, {
    id: "h4_555",
    hanzi: "招聘",
    pinyin: "zhāopìn",
    meaning: "tuyển dụng",
    sentence: "招聘。",
    translation: "tuyển dụng."
  }, {
    id: "h4_556",
    hanzi: "正常",
    pinyin: "zhèngcháng",
    meaning: "bình thường, thông thường",
    sentence: "正常。",
    translation: "bình thường, thông thường."
  }, {
    id: "h4_557",
    hanzi: "正好",
    pinyin: "zhènghǎo",
    meaning: "đúng lúc, được dịp, gặp dịp",
    sentence: "正好。",
    translation: "đúng lúc, được dịp, gặp dịp."
  }, {
    id: "h4_558",
    hanzi: "整理",
    pinyin: "zhěnglǐ",
    meaning: "thu dọn, dọn dẹp",
    sentence: "整理。",
    translation: "thu dọn, dọn dẹp."
  }, {
    id: "h4_559",
    hanzi: "证明",
    pinyin: "zhèngmíng",
    meaning: "chứng minh",
    sentence: "证明。",
    translation: "chứng minh."
  }, {
    id: "h4_560",
    hanzi: "正确",
    pinyin: "zhèngquè",
    meaning: "chính xác",
    sentence: "正确。",
    translation: "chính xác."
  }, {
    id: "h4_561",
    hanzi: "正式",
    pinyin: "zhèngshì",
    meaning: "chính thức, trang trọng",
    sentence: "正式。",
    translation: "chính thức, trang trọng."
  }, {
    id: "h4_562",
    hanzi: "真正",
    pinyin: "zhēnzhèng",
    meaning: "chân chính, thật sự",
    sentence: "真正。",
    translation: "chân chính, thật sự."
  }, {
    id: "h4_563",
    hanzi: "指",
    pinyin: "zhǐ",
    meaning: "chỉ về, nói đến",
    sentence: "指。",
    translation: "chỉ về, nói đến."
  }, {
    id: "h4_564",
    hanzi: "之",
    pinyin: "zhī",
    meaning: "được dùng để nối từ bổ nghĩa và từ được bổ nghĩa",
    sentence: "之。",
    translation: "được dùng để nối từ bổ nghĩa và từ được bổ nghĩa."
  }, {
    id: "h4_565",
    hanzi: "支持",
    pinyin: "zhīchí",
    meaning: "ủng hộ",
    sentence: "支持。",
    translation: "ủng hộ."
  }, {
    id: "h4_566",
    hanzi: "值得",
    pinyin: "zhídé",
    meaning: "đáng",
    sentence: "值得。",
    translation: "đáng."
  }, {
    id: "h4_567",
    hanzi: "只好",
    pinyin: "zhǐhǎo",
    meaning: "đành phải, buộc phải",
    sentence: "只好。",
    translation: "đành phải, buộc phải."
  }, {
    id: "h4_568",
    hanzi: "直接",
    pinyin: "zhíjiē",
    meaning: "trực tiếp, thẳng",
    sentence: "直接。",
    translation: "trực tiếp, thẳng."
  }, {
    id: "h4_569",
    hanzi: "质量",
    pinyin: "zhìliàng",
    meaning: "chất lượng",
    sentence: "质量。",
    translation: "chất lượng."
  }, {
    id: "h4_570",
    hanzi: "至少",
    pinyin: "zhìshǎo",
    meaning: "ít nhất",
    sentence: "至少。",
    translation: "ít nhất."
  }, {
    id: "h4_571",
    hanzi: "知识",
    pinyin: "zhīshi",
    meaning: "kiến thức",
    sentence: "知识。",
    translation: "kiến thức."
  }, {
    id: "h4_572",
    hanzi: "植物",
    pinyin: "zhíwù",
    meaning: "thực vật",
    sentence: "植物。",
    translation: "thực vật."
  }, {
    id: "h4_573",
    hanzi: "只要",
    pinyin: "zhǐyào",
    meaning: "chỉ cần, miễn là",
    sentence: "只要。",
    translation: "chỉ cần, miễn là."
  }, {
    id: "h4_574",
    hanzi: "职业",
    pinyin: "zhíyè",
    meaning: "nghề nghiệp",
    sentence: "职业。",
    translation: "nghề nghiệp."
  }, {
    id: "h4_575",
    hanzi: "重",
    pinyin: "zhòng",
    meaning: "nặng",
    sentence: "重。",
    translation: "nặng."
  }, {
    id: "h4_576",
    hanzi: "重点",
    pinyin: "zhòngdiǎn",
    meaning: "trọng điểm, trọng tâm",
    sentence: "重点。",
    translation: "trọng điểm, trọng tâm."
  }, {
    id: "h4_577",
    hanzi: "重视",
    pinyin: "zhòngshì",
    meaning: "xem trọng, chú trọng",
    sentence: "重视。",
    translation: "xem trọng, chú trọng."
  }, {
    id: "h4_578",
    hanzi: "周围",
    pinyin: "zhōuwéi",
    meaning: "xung quanh",
    sentence: "周围。",
    translation: "xung quanh."
  }, {
    id: "h4_579",
    hanzi: "赚",
    pinyin: "zhuàn",
    meaning: "kiếm tiền",
    sentence: "赚。",
    translation: "kiếm tiền."
  }, {
    id: "h4_580",
    hanzi: "转",
    pinyin: "zhuǎn",
    meaning: "quay, xoay",
    sentence: "转。",
    translation: "quay, xoay."
  }, {
    id: "h4_581",
    hanzi: "专门",
    pinyin: "zhuānmén",
    meaning: "đặc biệt, riêng biệt",
    sentence: "专门。",
    translation: "đặc biệt, riêng biệt."
  }, {
    id: "h4_582",
    hanzi: "专业",
    pinyin: "zhuānyè",
    meaning: "chuyên ngành",
    sentence: "专业。",
    translation: "chuyên ngành."
  }, {
    id: "h4_583",
    hanzi: "祝贺",
    pinyin: "zhùhè",
    meaning: "chúc mừng",
    sentence: "祝贺。",
    translation: "chúc mừng."
  }, {
    id: "h4_584",
    hanzi: "著名",
    pinyin: "zhùmíng",
    meaning: "nổi tiếng",
    sentence: "著名。",
    translation: "nổi tiếng."
  }, {
    id: "h4_585",
    hanzi: "准确",
    pinyin: "zhǔnquè",
    meaning: "chính xác, đúng",
    sentence: "准确。",
    translation: "chính xác, đúng."
  }, {
    id: "h4_586",
    hanzi: "准时",
    pinyin: "zhǔnshí",
    meaning: "đúng giờ",
    sentence: "准时。",
    translation: "đúng giờ."
  }, {
    id: "h4_587",
    hanzi: "注意",
    pinyin: "zhǔyi",
    meaning: "ý kiến",
    sentence: "注意。",
    translation: "ý kiến."
  }, {
    id: "h4_588",
    hanzi: "自然",
    pinyin: "zìrán",
    meaning: "đương nhiên, hiển nhiên",
    sentence: "自然。",
    translation: "đương nhiên, hiển nhiên."
  }, {
    id: "h4_589",
    hanzi: "仔细",
    pinyin: "zǐxì",
    meaning: "thận trọng, kỹ lưỡng",
    sentence: "仔细。",
    translation: "thận trọng, kỹ lưỡng."
  }, {
    id: "h4_590",
    hanzi: "自信",
    pinyin: "zìxìn",
    meaning: "tự tin",
    sentence: "自信。",
    translation: "tự tin."
  }, {
    id: "h4_591",
    hanzi: "总结",
    pinyin: "zǒngjié",
    meaning: "tổng kết",
    sentence: "总结。",
    translation: "tổng kết."
  }, {
    id: "h4_592",
    hanzi: "租",
    pinyin: "zū",
    meaning: "thuê, cho thuê",
    sentence: "租。",
    translation: "thuê, cho thuê."
  }, {
    id: "h4_593",
    hanzi: "最好",
    pinyin: "zuìhǎo",
    meaning: "tốt nhất",
    sentence: "最好。",
    translation: "tốt nhất."
  }, {
    id: "h4_594",
    hanzi: "尊重",
    pinyin: "zūnzhòng",
    meaning: "tôn trọng",
    sentence: "尊重。",
    translation: "tôn trọng."
  }, {
    id: "h4_595",
    hanzi: "座",
    pinyin: "zuò",
    meaning: "tòa, hòn, cây (dùng cho cây cầu, núi, cao ốc)",
    sentence: "座。",
    translation: "tòa, hòn, cây (dùng cho cây cầu, núi, cao ốc)."
  }, {
    id: "h4_596",
    hanzi: "作家",
    pinyin: "zuòjiā",
    meaning: "nhà văn",
    sentence: "作家。",
    translation: "nhà văn."
  }, {
    id: "h4_597",
    hanzi: "座位",
    pinyin: "zuòwèi",
    meaning: "chỗ ngồi",
    sentence: "座位。",
    translation: "chỗ ngồi."
  }, {
    id: "h4_598",
    hanzi: "作用",
    pinyin: "zuòyòng",
    meaning: "tác dụng",
    sentence: "作用。",
    translation: "tác dụng."
  }, {
    id: "h4_599",
    hanzi: "左右",
    pinyin: "zuǒyòu",
    meaning: "khoảng, khoảng chừng",
    sentence: "左右。",
    translation: "khoảng, khoảng chừng."
  }, {
    id: "h4_600",
    hanzi: "作者",
    pinyin: "zuòzhě",
    meaning: "tác giả",
    sentence: "作者。",
    translation: "tác giả."
  }]
};

// Fisher-Yates (Knuth) True Uniform Random Shuffle Algorithm
function shuffleArray(array) {
  if (!array || array.length <= 1) return array ? [...array] : [];
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
  }
  return arr;
}

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
  chat() {
    this.playBeep(600, 'sine', 0.06, 0.08);
    setTimeout(() => this.playBeep(900, 'sine', 0.08, 0.08), 50);
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

// ==========================================
// AI CHINESE TUTOR - INTELLIGENT ENGINE
// ==========================================
function getBuiltInAIResponse(userText, hskLevel) {
  const q = userText.trim().toLowerCase();

  // 1. Chào hỏi / Greetings
  if (['chào', 'hello', 'hi', '你好', 'xin chào', 'hế lô', 'alo'].some(k => q.includes(k))) {
    return {
      text: '你好呀！我是小华老师。很高兴和你一起练习中文！你今天想聊些什么呢？',
      pinyin: 'Nǐ hǎo ya! Wǒ shì Xiǎohuá lǎoshī. Hěn gāoxìng hé nǐ yìqǐ liànxí zhōngwén! Nǐ jīntiān xiǎng liáo xiē shénme ne?',
      translation: 'Chào em nhé! Cô là cô giáo Tiểu Hoa. Rất vui được cùng em luyện tiếng Trung! Hôm nay em muốn trò chuyện về chủ đề gì nào?',
      notes: '💡 Gợi ý câu trả lời: 我今天想练习口语 (Hôm nay em muốn luyện khẩu ngữ).'
    };
  }

  // 2. Hỏi thăm sức khỏe / How are you
  if (['khỏe không', 'thế nào', '你好吗', '怎么样', 'dạo này'].some(k => q.includes(k))) {
    return {
      text: '我很好，谢谢你的关心！你呢？今天心情怎么样？学中文累不累？',
      pinyin: 'Wǒ hěn hǎo, xièxie nǐ de guānxīn! Nǐ ne? Jīntiān xīnlíng zěnmeyàng? Xué zhōngwén lèi bu lèi?',
      translation: 'Cô rất khỏe, cảm ơn em đã quan tâm nhé! Còn em thì sao? Tâm trạng hôm nay thế nào? Học tiếng Trung có mệt không?',
      notes: '💡 Em có thể đáp lại: 我不累，我很喜欢学习中文 (Em không mệt, em rất thích học tiếng Trung).'
    };
  }

  // 3. Tên tuổi / Giới thiệu
  if (['tên là gì', 'giới thiệu', '你叫什么', '名字', '我是', 'tôi tên là', 'mình là', 'em là'].some(k => q.includes(k))) {
    return {
      text: '认识你很高兴！我是你的专属中文AI导师小华。无论你想练习HSK词汇、语法还是日常对话，我都会全力帮助你！',
      pinyin: 'Rènshi nǐ hěn gāoxìng! Wǒ shì nǐ de zhuānshǔ zhōngwén AI dǎoshī Xiǎohuá. Wúlùn nǐ xiǎng liànxí HSK cíhuì, yǔfǎ háishì rìcháng duìhuà, wǒ dōu huì quánlì bāngzhù nǐ!',
      translation: 'Rất vui được làm quen với em! Cô là Tiểu Hoa, gia sư AI tiếng Trung riêng của em. Dù em muốn luyện từ vựng HSK, ngữ pháp hay đối thoại thường ngày, cô đều sẽ dốc lòng giúp em!',
      notes: '💡 Cấu trúc tự giới thiệu: 我叫...，今年...岁，我是学中文的学生。'
    };
  }

  // 4. Gọi đồ uống / Trà sữa / Cà phê
  if (['trà sữa', 'gọi đồ', 'uống', '奶茶', '咖啡', 'cà phê', '喝', 'quán'].some(k => q.includes(k))) {
    return {
      text: '欢迎光临！请问你想喝点什么？我们有招牌珍珠奶茶和冰美式咖啡。你想喝热的还是冰的？甜度要怎么选？',
      pinyin: 'Huānyíng guānglín! Qǐngwèn nǐ xiǎng hē diǎn shénme? Wǒmen yǒu zhāopái zhēnzhū nǎichá hé bīng měishì kāfēi. Nǐ xiǎng hē rè de háishì bīng de? Tiándù yào zěnme xuǎn?',
      translation: 'Hoan nghênh quý khách! Xin hỏi bạn muốn uống gì ạ? Quán chúng tôi có trà sữa trân châu đặc biệt và cà phê Americano đá. Bạn muốn uống nóng hay đá? Độ ngọt chọn thế nào?',
      notes: '💡 Mẹo gọi chuẩn vị: “我要一杯珍珠奶茶，半糖少冰 (Cho tôi 1 cốc trà sữa trân châu, nửa đường ít đá)”.'
    };
  }

  // 5. Ăn uống / Nhà hàng / Món ăn
  if (['ăn', 'cơm', 'đói', 'món', '吃饭', '饿', '菜单', 'nhà hàng', 'menu'].some(k => q.includes(k))) {
    return {
      text: '服务员，请给我们看一下菜单！中国有很多特色美食，比如北京烤鸭、宫保鸡丁和火锅。你平时最喜欢吃哪道菜？',
      pinyin: 'Fúwùyuán, qǐng gěi wǒmen kàn yíxià càidān! Zhōngguó yǒu hěn duō tèsè měishí, bǐrú Běijīng kǎoyā, gōngbǎo jīdīng hé huǒguō. Nǐ píngshí zuì xǐhuan chī nǎ dào cài?',
      translation: 'Phục vụ ơi, xin cho chúng tôi xem thực đơn một chút! Trung Quốc có rất nhiều món ngon đặc sắc, ví dụ như vịt quay Bắc Kinh, gà xào Cung Bảo và lẩu. Bình thường em thích ăn món nào nhất?',
      notes: '💡 Khi thanh toán, hãy nói: 服务员，买单！(Fúwùyuán, mǎidān! - Phục vụ ơi, tính tiền!)'
    };
  }

  // 6. Hỏi đường / Giao thông / Sân bay
  if (['đường', 'hỏi đường', 'sân bay', 'ở đâu', 'chỗ nào', '去', '怎么走', '机场', '车站'].some(k => q.includes(k))) {
    return {
      text: '去机场的话，往前一直走，在第一个红绿灯往右拐，然后坐地铁三号线就能直达，非常方便！',
      pinyin: 'Qù jīchǎng de huà, wǎng qián yìzhí zǒu, zài dì yī gè hónglǜdēng wǎng yòu guǎi, ránhòu zuò dìtiě sān hào xiàn jiù néng zhídá, fēicháng fāngbiàn!',
      translation: 'Nếu muốn đi sân bay, hãy đi thẳng về phía trước, ở cột đèn giao thông đầu tiên thì rẽ phải, sau đó đi tàu điện ngầm tuyến số 3 là tới thẳng, rất thuận tiện!',
      notes: '💡 Từ vựng định hướng: 一直走 (đi thẳng), 往右拐 (rẽ phải), 往左拐 (rẽ trái).'
    };
  }

  // 7. Mua sắm / Mặc cả giá
  if (['tiền', 'bao nhiêu', 'đắt', 'rẻ', 'mặc cả', '多少钱', '贵', '便宜', '买', 'mua'].some(k => q.includes(k))) {
    return {
      text: '老板说这件大衣要三百块钱。你可以这样砍价：“太贵了，能不能便宜一点？二百块卖不卖？”',
      pinyin: 'Lǎobǎn shuō zhè jiàn dàyī yào sān bǎi kuài qián. Nǐ kěyǐ zhèyàng kǎnjià: “Tài guì le, néng bu néng piányi yìdiǎn? Èr bǎi kuài mài bu mài?”',
      translation: 'Chủ quán bảo chiếc áo khoác này giá 300 tệ. Em có thể mặc cả như thế này: “Đắt quá rồi, có thể rẻ hơn chút không? 200 tệ bác có bán không?”',
      notes: '💡 Câu cửa miệng khi mua hàng: 太贵了，便宜点吧！(Đắt quá, bớt chút đi mà!)'
    };
  }

  // 8. Khen ngợi & Cảm ơn
  if (['cảm ơn', 'thank', '谢谢', 'giỏi', 'hay', 'tuyệt', 'thích'].some(k => q.includes(k))) {
    return {
      text: '不客气！能帮到你我也感到非常开心。你的中文悟性很高，坚持每天练习，一定会取得巨大的进步！',
      pinyin: 'Bú kèqi! Néng bāng dào nǐ wǒ yě gǎndào fēicháng kāixīn. Nǐ de zhōngwén wùxìng hěn gāo, jiānchí měitiān liànxí, yídìng huì qǔdé jùdà de jìnbù!',
      translation: 'Không có chi em nhé! Giúp được em cô cũng thấy rất vui. Khả năng cảm thụ tiếng Trung của em rất tốt, kiên trì luyện tập mỗi ngày nhất định sẽ tiến bộ vượt bậc!',
      notes: '💡 Đáp lại lời cảm ơn: 不客气 (Bú kèqi) hoặc 不用谢 (Bú yòng xiè).'
    };
  }

  // 9. Ngữ pháp / Phương pháp học tiếng Trung
  if (['ngữ pháp', 'học', 'bí quyết', 'làm sao', 'hsk', 'kinh nghiệm', 'phương pháp'].some(k => q.includes(k))) {
    return {
      text: '学好中文的秘密只有八个字：“多听、多读、敢说、不怕错”。每天背15个生词，多和我聊天，不知不觉就能考过HSK了！',
      pinyin: 'Xué hǎo zhōngwén de mìmì zhǐ yǒu bā gè zì: “duō tīng, duō dú, gǎn shuō, bú pà cuò”. Měitiān bèi shíwǔ gè shēngcí, duō hé wǒ liáotiān, bùzhī bùjué jiù néng kǎo guò HSK le!',
      translation: 'Bí quyết học giỏi tiếng Trung chỉ gói gọn trong 8 chữ: “Nghe nhiều, đọc nhiều, dám nói, không sợ sai”. Mỗi ngày thuộc 15 từ mới, thường xuyên chat với cô, chẳng mấy chốc sẽ thi đỗ HSK thôi!',
      notes: '💡 Ngữ pháp HSK 3 trọng điểm: 一...就... (vừa... thì...), 动词 + 来/去 (bổ ngữ xu hướng).'
    };
  }

  // 10. Tra cứu từ vựng / Giải nghĩa
  if (['nghĩa là gì', 'là gì', 'nghĩa của', 'tiếng trung là gì'].some(k => q.includes(k))) {
    return {
      text: '学习新生词时，记得结合语境造句哦！比如“努力 (nǔlì)”是努力/cố gắng，造句：“只要努力，就一定能学好中文！”',
      pinyin: 'Xuéxí xīn shēngcí shí, jìde jiéhé yǔjìng zàojù o! Bǐrú “nǔlì” shì nỗ lực/cố gắng, zàojù: “Zhǐyào nǔlì, jiù yídìng néng xué hǎo zhōngwén!”',
      translation: 'Khi học từ vựng mới, nhớ kết hợp đặt câu theo ngữ cảnh nhé! Ví dụ từ “努力 (nǔlì)” nghĩa là nỗ lực/cố gắng, đặt câu: “Chỉ cần nỗ lực, nhất định sẽ học giỏi tiếng Trung!”',
      notes: '💡 Trong game có tới 1.201 từ vựng HSK 1-4, em có thể qua mục Flashcard để tra cứu và luyện tập thêm nhé!'
    };
  }

  // Fallback tổng quát tự nhiên
  return {
    text: `这句话说得很棒！“${userText}”。中文是一门很有魅力的语言，继续和我多聊几句吧，你想再探讨什么话题呢？`,
    pinyin: `Zhè jù huà shuō de hěn bàng! “${userText}”. Zhōngwén shì yì mén hěn yǒu mèilì de yǔyán, jìxù hé wǒ duō liáo jǐ jù ba, nǐ xiǎng zài tàntǎo shénme huàtí ne?`,
    translation: `Câu này em nói hay lắm! “${userText}”. Tiếng Trung là một ngôn ngữ vô cùng cuốn hút, hãy tiếp tục trò chuyện với cô thêm vài câu nhé, em muốn thảo luận về chủ đề gì tiếp theo?`,
    notes: '💡 Hãy thử bấm vào các gợi ý tình huống ở trên như “Gọi trà sữa”, “Hỏi đường” hoặc “Mặc cả” để luyện tập phản xạ nhé!'
  };
}

// Gọi API Gemini hoặc OpenAI nếu có Custom Key
async function callExternalAI(userText, apiKey, modelType, hskLevel) {
  if (modelType === 'gemini') {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;
    const systemPrompt = `Bạn là cô giáo Tiểu Hoa (小华老师) - một gia sư dạy tiếng Trung cực kỳ nhiệt tình, dịu dàng và thân thiện cho học viên người Việt Nam đang ôn thi HSK ${hskLevel}.
Quy tắc trả lời:
BẮT BUỘC trả về định dạng JSON hợp lệ duy nhất có cấu trúc:
{
  "text": "Câu trả lời bằng chữ Hán giản thể tự nhiên, phù hợp HSK ${hskLevel}",
  "pinyin": "Phiên âm pinyin chuẩn có thanh điệu",
  "translation": "Bản dịch nghĩa tiếng Việt tự nhiên, thân thiện",
  "notes": "Lời khuyên ngữ pháp hoặc mẹo giao tiếp bổ ích (ngắn gọn 1-2 câu)"
}
Người học nói: "${userText}". Hãy trả lời ngay.`;
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: systemPrompt
          }]
        }],
        generationConfig: {
          responseMimeType: 'application/json'
        }
      })
    });
    const data = await res.json();
    const candidate = data?.candidates?.[0]?.content?.parts?.[0]?.text;
    if (candidate) {
      return JSON.parse(candidate);
    }
  }
  throw new Error('API request failed');
}

// ==========================================
// AI CHATBOT MODAL COMPONENT (TIỂU HOA 👩‍🏫)
// ==========================================
function AIChatModal({
  darkMode,
  onClose,
  muted,
  hskLevel,
  onGainXp
}) {
  const [messages, setMessages] = useState([{
    id: 'welcome',
    sender: 'ai',
    text: '你好！我是小华老师。今天你想用中文聊些什么呢？',
    pinyin: 'Nǐ hǎo! Wǒ shì Xiǎohuá lǎoshī. Jīntiān nǐ xiǎng yòng zhōngwén liáo xiē shénme ne?',
    translation: 'Xin chào! Cô là cô giáo Tiểu Hoa. Hôm nay em muốn trò chuyện về chủ đề gì bằng tiếng Trung nào?',
    notes: '💡 Em có thể gõ chữ Hán, Pinyin hoặc tiếng Việt, cô đều hiểu nhé! Bấm vào nút loa 🔊 để nghe phát âm.',
    timestamp: Date.now()
  }]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [apiKey, setApiKey] = useState(() => localStorage.getItem('hsk_ai_api_key') || '');
  const [aiProvider, setAiProvider] = useState(() => localStorage.getItem('hsk_ai_provider') || 'builtin');
  const messagesEndRef = useRef(null);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({
      behavior: 'smooth'
    });
  };
  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);
  const quickTopics = [{
    label: '☕ Gọi trà sữa',
    prompt: '老板，我想点一杯珍珠奶茶，半糖少冰。'
  }, {
    label: '✈️ Hỏi đường',
    prompt: '请问去机场怎么走？'
  }, {
    label: '🛍️ Mặc cả giá',
    prompt: '这件衣服多少钱？太贵了，能不能便宜一点？'
  }, {
    label: '🗣️ Tự giới thiệu',
    prompt: '你好！我叫阿明，今年二十岁，很高兴认识你！'
  }, {
    label: '📖 Bí quyết HSK',
    prompt: '老师，怎样才能提高汉语听力和口语水平？'
  }];
  const handleSendMessage = async textToSend => {
    const text = (textToSend || inputText).trim();
    if (!text || isTyping) return;
    if (!muted) sfx.click();
    setInputText('');
    const userMsg = {
      id: 'usr_' + Date.now(),
      sender: 'user',
      text: text,
      timestamp: Date.now()
    };
    setMessages(prev => [...prev, userMsg]);
    setIsTyping(true);
    try {
      let replyData = null;
      if (apiKey.trim() && aiProvider === 'gemini') {
        try {
          replyData = await callExternalAI(text, apiKey.trim(), 'gemini', hskLevel);
        } catch (e) {
          console.warn('Fallback to built-in AI:', e);
          replyData = getBuiltInAIResponse(text, hskLevel);
        }
      } else {
        // Built-in intelligent response engine
        await new Promise(r => setTimeout(r, 600)); // Natural typing delay
        replyData = getBuiltInAIResponse(text, hskLevel);
      }
      const aiMsg = {
        id: 'ai_' + Date.now(),
        sender: 'ai',
        text: replyData.text,
        pinyin: replyData.pinyin,
        translation: replyData.translation,
        notes: replyData.notes,
        timestamp: Date.now()
      };
      setMessages(prev => [...prev, aiMsg]);
      if (!muted) sfx.chat();
      onGainXp(10); // Reward for practicing!
    } catch (err) {
      setMessages(prev => [...prev, {
        id: 'err_' + Date.now(),
        sender: 'ai',
        text: '好的，我已经收到你的消息了！继续加油哦！',
        pinyin: 'Hǎo de, wǒ yǐjīng shōudào nǐ de xiāoxi le! Jìxù jiāyóu o!',
        translation: 'Được rồi, cô đã nhận được tin nhắn của em rồi! Tiếp tục cố gắng nhé!',
        timestamp: Date.now()
      }]);
    } finally {
      setIsTyping(false);
    }
  };
  const saveSettings = (newKey, newProvider) => {
    setApiKey(newKey);
    setAiProvider(newProvider);
    localStorage.setItem('hsk_ai_api_key', newKey);
    localStorage.setItem('hsk_ai_provider', newProvider);
    setShowSettings(false);
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/60 backdrop-blur-md animate-fadeIn"
  }, /*#__PURE__*/React.createElement("div", {
    className: `w-full max-w-2xl h-[92vh] sm:h-[85vh] rounded-3xl border flex flex-col shadow-2xl overflow-hidden transition-all ${darkMode ? 'bg-slate-900 border-slate-800 text-slate-100' : 'bg-white border-slate-200 text-slate-800'}`
  }, /*#__PURE__*/React.createElement("div", {
    className: `p-4 border-b flex items-center justify-between backdrop-blur-md ${darkMode ? 'bg-slate-900/90 border-slate-800' : 'bg-white/90 border-slate-200'}`
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-3"
  }, /*#__PURE__*/React.createElement("div", {
    className: "relative"
  }, /*#__PURE__*/React.createElement("div", {
    className: "w-11 h-11 rounded-2xl bg-gradient-to-tr from-rose-500 via-red-500 to-amber-500 flex items-center justify-center text-white text-xl shadow-lg shadow-red-500/20 font-bold"
  }, "\u534E"), /*#__PURE__*/React.createElement("span", {
    className: "absolute -bottom-0.5 -right-0.5 flex h-3.5 w-3.5"
  }, /*#__PURE__*/React.createElement("span", {
    className: "animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"
  }), /*#__PURE__*/React.createElement("span", {
    className: "relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500 border-2 border-slate-900"
  }))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "font-extrabold text-base sm:text-lg flex items-center gap-1.5"
  }, "C\xF4 gi\xE1o Ti\u1EC3u Hoa (\u5C0F\u534E\u8001\u5E08)"), /*#__PURE__*/React.createElement("span", {
    className: "text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-gradient-to-r from-red-500/20 to-rose-500/20 text-red-400 border border-red-500/30"
  }, "HSK ", hskLevel, " Tutor")), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-emerald-400 font-medium flex items-center gap-1"
  }, "\u25CF Tr\u1EF1c tuy\u1EBFn \xB7 S\u1EB5n s\xE0ng luy\u1EC7n kh\u1EA9u ng\u1EEF"))), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-1.5"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => setShowSettings(!showSettings),
    className: `p-2 rounded-xl transition ${darkMode ? 'hover:bg-slate-800 text-slate-400' : 'hover:bg-slate-100 text-slate-600'}`,
    title: "C\xE0i \u0111\u1EB7t AI Key"
  }, /*#__PURE__*/React.createElement(Settings, {
    className: "w-5 h-5"
  })), /*#__PURE__*/React.createElement("button", {
    onClick: onClose,
    className: `p-2 rounded-xl transition ${darkMode ? 'hover:bg-slate-800 text-slate-400 hover:text-white' : 'hover:bg-slate-100 text-slate-600'}`,
    title: "\u0110\xF3ng chatbox"
  }, /*#__PURE__*/React.createElement(X, {
    className: "w-5 h-5"
  })))), showSettings && /*#__PURE__*/React.createElement("div", {
    className: `p-4 border-b space-y-3 animate-fadeIn text-xs ${darkMode ? 'bg-slate-800/80 border-slate-700' : 'bg-slate-100 border-slate-200'}`
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex justify-between items-center font-bold"
  }, /*#__PURE__*/React.createElement("span", null, "\u2699\uFE0F C\xE0i \u0111\u1EB7t Tr\xED Tu\u1EC7 Nh\xE2n T\u1EA1o (T\xF9y ch\u1ECDn)"), /*#__PURE__*/React.createElement("button", {
    onClick: () => setShowSettings(false),
    className: "text-slate-400 hover:underline"
  }, "\u0110\xF3ng")), /*#__PURE__*/React.createElement("p", {
    className: "text-slate-400 leading-relaxed"
  }, "M\u1EB7c \u0111\u1ECBnh \u1EE9ng d\u1EE5ng d\xF9ng **AI Offline t\xEDch h\u1EE3p s\u1EB5n** kh\xF4ng c\u1EA7n key. N\u1EBFu mu\u1ED1n AI th\xF4ng minh si\xEAu c\u1EA5p, b\u1EA1n c\xF3 th\u1EC3 nh\u1EADp Gemini API Key mi\u1EC5n ph\xED d\u01B0\u1EDBi \u0111\xE2y:"), /*#__PURE__*/React.createElement("div", {
    className: "flex gap-2"
  }, /*#__PURE__*/React.createElement("input", {
    type: "password",
    placeholder: "D\xE1n Gemini API Key (t\xF9y ch\u1ECDn)...",
    value: apiKey,
    onChange: e => setApiKey(e.target.value),
    className: `flex-1 px-3 py-2 rounded-xl border text-xs outline-none ${darkMode ? 'bg-slate-900 border-slate-700' : 'bg-white border-slate-300'}`
  }), /*#__PURE__*/React.createElement("button", {
    onClick: () => saveSettings(apiKey, apiKey ? 'gemini' : 'builtin'),
    className: "px-4 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold"
  }, "L\u01B0u"))), /*#__PURE__*/React.createElement("div", {
    className: `px-4 py-2.5 border-b flex items-center gap-2 overflow-x-auto no-scrollbar ${darkMode ? 'bg-slate-900/40 border-slate-800' : 'bg-slate-50 border-slate-100'}`
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-[11px] font-bold text-slate-400 shrink-0 flex items-center gap-1"
  }, /*#__PURE__*/React.createElement(Lightbulb, {
    className: "w-3.5 h-3.5 text-amber-500"
  }), " G\u1EE3i \xFD:"), quickTopics.map((topic, i) => /*#__PURE__*/React.createElement("button", {
    key: i,
    onClick: () => handleSendMessage(topic.prompt),
    className: `shrink-0 px-3 py-1 rounded-full text-xs font-semibold border transition hover:scale-105 active:scale-95 ${darkMode ? 'bg-slate-800 border-slate-700 hover:border-slate-600 text-slate-300' : 'bg-white border-slate-200 hover:border-slate-300 text-slate-700'}`
  }, topic.label))), /*#__PURE__*/React.createElement("div", {
    className: "flex-1 overflow-y-auto p-4 space-y-4"
  }, messages.map(msg => {
    const isAI = msg.sender === 'ai';
    return /*#__PURE__*/React.createElement("div", {
      key: msg.id,
      className: `flex items-start gap-2.5 ${isAI ? 'justify-start' : 'justify-end'}`
    }, isAI && /*#__PURE__*/React.createElement("div", {
      className: "w-8 h-8 rounded-xl bg-gradient-to-tr from-rose-500 to-amber-500 flex items-center justify-center text-white text-xs font-bold shrink-0 shadow-md"
    }, "\u534E"), /*#__PURE__*/React.createElement("div", {
      className: `max-w-[85%] sm:max-w-[75%] rounded-2xl p-4 space-y-2 shadow-sm ${isAI ? darkMode ? 'bg-slate-800/90 border border-slate-700 text-slate-100' : 'bg-slate-100 border border-slate-200 text-slate-800' : 'bg-gradient-to-r from-red-600 to-amber-500 text-white rounded-br-none shadow-md shadow-red-500/10'}`
    }, isAI ? /*#__PURE__*/React.createElement("div", {
      className: "space-y-2"
    }, /*#__PURE__*/React.createElement("div", {
      className: "flex items-start justify-between gap-2"
    }, /*#__PURE__*/React.createElement("div", {
      className: "text-xl sm:text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-amber-500 tracking-wide"
    }, msg.text), /*#__PURE__*/React.createElement("button", {
      onClick: () => speakText(msg.text, muted),
      className: "p-1.5 rounded-full hover:bg-red-500/10 text-slate-400 hover:text-red-500 transition shrink-0",
      title: "Nghe ph\xE1t \xE2m chu\u1EA9n"
    }, /*#__PURE__*/React.createElement(Volume2, {
      className: "w-5 h-5 text-red-500"
    }))), msg.pinyin && /*#__PURE__*/React.createElement("div", {
      className: "text-xs sm:text-sm font-semibold text-amber-400 tracking-wide"
    }, "[", msg.pinyin, "]"), msg.translation && /*#__PURE__*/React.createElement("div", {
      className: `text-xs sm:text-sm leading-relaxed ${darkMode ? 'text-slate-300' : 'text-slate-700'}`
    }, "\uD83C\uDDFB\uD83C\uDDF3 ", msg.translation), msg.notes && /*#__PURE__*/React.createElement("div", {
      className: `mt-2 p-2.5 rounded-xl border text-xs leading-relaxed ${darkMode ? 'bg-slate-900/80 border-slate-700/60 text-slate-300' : 'bg-amber-50 border-amber-200 text-amber-900'}`
    }, msg.notes)) : /*#__PURE__*/React.createElement("div", {
      className: "text-sm sm:text-base font-medium"
    }, msg.text)), !isAI && /*#__PURE__*/React.createElement("div", {
      className: "w-8 h-8 rounded-xl bg-slate-700 flex items-center justify-center text-white text-xs font-bold shrink-0"
    }, /*#__PURE__*/React.createElement(User, {
      className: "w-4 h-4"
    })));
  }), isTyping && /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2 text-xs text-slate-400"
  }, /*#__PURE__*/React.createElement("div", {
    className: "w-7 h-7 rounded-xl bg-gradient-to-tr from-rose-500 to-amber-500 flex items-center justify-center text-white text-xs font-bold"
  }, "\u534E"), /*#__PURE__*/React.createElement("div", {
    className: `p-3 rounded-2xl flex items-center gap-1.5 ${darkMode ? 'bg-slate-800' : 'bg-slate-100'}`
  }, /*#__PURE__*/React.createElement("span", {
    className: "w-2 h-2 rounded-full bg-red-500 animate-bounce"
  }), /*#__PURE__*/React.createElement("span", {
    className: "w-2 h-2 rounded-full bg-amber-500 animate-bounce [animation-delay:0.2s]"
  }), /*#__PURE__*/React.createElement("span", {
    className: "w-2 h-2 rounded-full bg-rose-500 animate-bounce [animation-delay:0.4s]"
  }), /*#__PURE__*/React.createElement("span", {
    className: "ml-1 text-xs font-medium"
  }, "C\xF4 gi\xE1o Ti\u1EC3u Hoa \u0111ang so\u1EA1n ph\u1EA3n h\u1ED3i..."))), /*#__PURE__*/React.createElement("div", {
    ref: messagesEndRef
  })), /*#__PURE__*/React.createElement("div", {
    className: `p-3 sm:p-4 border-t ${darkMode ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200'}`
  }, /*#__PURE__*/React.createElement("form", {
    onSubmit: e => {
      e.preventDefault();
      handleSendMessage();
    },
    className: "flex items-center gap-2"
  }, /*#__PURE__*/React.createElement("input", {
    type: "text",
    value: inputText,
    onChange: e => setInputText(e.target.value),
    placeholder: "Nh\u1EADp ch\u1EEF H\xE1n, Pinyin ho\u1EB7c ti\u1EBFng Vi\u1EC7t...",
    className: `flex-1 px-4 py-3 rounded-2xl border text-sm sm:text-base outline-none transition focus:ring-2 focus:ring-red-500/50 ${darkMode ? 'bg-slate-800/80 border-slate-700 text-slate-100 placeholder-slate-500' : 'bg-slate-100 border-slate-200 text-slate-800 placeholder-slate-400'}`
  }), /*#__PURE__*/React.createElement("button", {
    type: "submit",
    disabled: !inputText.trim() || isTyping,
    className: "p-3 sm:px-5 sm:py-3 rounded-2xl bg-gradient-to-r from-red-600 to-amber-500 hover:opacity-90 active:scale-95 disabled:opacity-40 text-white font-bold transition shadow-lg shadow-red-500/20 flex items-center gap-1.5"
  }, /*#__PURE__*/React.createElement(Send, {
    className: "w-5 h-5"
  }), /*#__PURE__*/React.createElement("span", {
    className: "hidden sm:inline text-sm"
  }, "G\u1EEDi"))), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between mt-2 px-1 text-[11px] text-slate-400"
  }, /*#__PURE__*/React.createElement("span", null, "\u2728 Luy\u1EC7n kh\u1EA9u ng\u1EEF nh\u1EADn ngay +10 XP"), /*#__PURE__*/React.createElement("span", null, "G\xF5 Enter \u0111\u1EC3 g\u1EEDi tin nh\u1EAFn")))));
}

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
  const [showAIChatModal, setShowAIChatModal] = useState(false);

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
    className: `min-h-screen transition-colors duration-300 font-sans relative overflow-x-hidden ${darkMode ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-800'}`
  }, /*#__PURE__*/React.createElement("div", {
    className: "absolute top-0 left-1/4 -translate-x-1/2 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none -z-10"
  }), /*#__PURE__*/React.createElement("div", {
    className: "absolute top-64 right-10 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none -z-10"
  }), /*#__PURE__*/React.createElement("div", {
    className: "absolute bottom-10 left-10 w-80 h-80 bg-rose-500/10 rounded-full blur-3xl pointer-events-none -z-10"
  }), /*#__PURE__*/React.createElement("header", {
    className: `sticky top-0 z-40 backdrop-blur-md border-b ${darkMode ? 'bg-slate-900/80 border-slate-800 shadow-lg shadow-black/20' : 'bg-white/80 border-slate-200 shadow-sm'}`
  }, /*#__PURE__*/React.createElement("div", {
    className: "max-w-6xl mx-auto px-4 py-3 flex items-center justify-between"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-3 cursor-pointer group",
    onClick: () => setMode('hub')
  }, /*#__PURE__*/React.createElement("div", {
    className: "bg-gradient-to-tr from-red-600 via-rose-500 to-amber-500 p-2.5 rounded-2xl shadow-lg shadow-red-500/25 text-white font-bold text-xl flex items-center justify-center group-hover:scale-105 transition-transform"
  }, "\u6F22"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2"
  }, /*#__PURE__*/React.createElement("h1", {
    className: "font-extrabold text-lg sm:text-xl tracking-tight bg-gradient-to-r from-red-500 via-amber-500 to-orange-500 bg-clip-text text-transparent"
  }, "HSK Quest Master"), /*#__PURE__*/React.createElement("span", {
    className: "hidden sm:inline-block text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-red-500/10 text-red-400 border border-red-500/20"
  }, "RPG Edition")), /*#__PURE__*/React.createElement("p", {
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
  }), /*#__PURE__*/React.createElement("span", null, xp, " XP")), /*#__PURE__*/React.createElement("button", {
    onClick: () => {
      if (!muted) sfx.click();
      setShowAIChatModal(true);
    },
    className: "hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold border transition hover:scale-105 active:scale-95 bg-gradient-to-r from-red-500/20 via-rose-500/20 to-amber-500/20 border-red-500/30 text-rose-400 hover:text-rose-300"
  }, /*#__PURE__*/React.createElement(Bot, {
    className: "w-4 h-4 text-rose-500"
  }), /*#__PURE__*/React.createElement("span", null, "Chat AI Ti\u1EC3u Hoa")), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center border-l border-slate-700/50 pl-2 gap-1"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => setShowStatsModal(true),
    className: `p-2 rounded-lg transition ${darkMode ? 'hover:bg-slate-800 text-slate-400' : 'hover:bg-slate-100 text-slate-600'}`,
    title: "H\u1ED3 s\u01A1 & Th\u1ED1ng k\xEA"
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
    className: `p-2 rounded-lg transition ${darkMode ? 'hover:bg-slate-800 text-slate-400' : 'hover:bg-slate-100 text-slate-600'}`,
    title: darkMode ? 'Chuyển sang giao diện Sáng' : 'Chuyển sang giao diện Tối'
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
      if (m === 'ai-chat') {
        setShowAIChatModal(true);
      } else {
        setMode(m);
      }
    },
    darkMode: darkMode,
    highScores: highScores,
    masteredWords: masteredWords,
    onOpenAIChat: () => setShowAIChatModal(true)
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
  })), /*#__PURE__*/React.createElement("div", {
    className: "fixed bottom-6 right-6 z-40 flex items-center gap-2 group"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => {
      if (!muted) sfx.click();
      setShowAIChatModal(true);
    },
    className: "relative p-3.5 sm:px-4 sm:py-3 rounded-full bg-gradient-to-r from-red-600 via-rose-500 to-amber-500 text-white shadow-xl shadow-red-500/30 hover:scale-105 active:scale-95 transition-all flex items-center gap-2.5 border-2 border-white/20",
    title: "Tr\xF2 chuy\u1EC7n v\u1EDBi C\xF4 gi\xE1o AI Ti\u1EC3u Hoa"
  }, /*#__PURE__*/React.createElement("span", {
    className: "relative flex h-3 w-3"
  }, /*#__PURE__*/React.createElement("span", {
    className: "animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"
  }), /*#__PURE__*/React.createElement("span", {
    className: "relative inline-flex rounded-full h-3 w-3 bg-emerald-500"
  })), /*#__PURE__*/React.createElement(Bot, {
    className: "w-6 h-6 animate-bounce"
  }), /*#__PURE__*/React.createElement("span", {
    className: "hidden sm:inline font-bold text-sm tracking-wide"
  }, "Chat AI Ti\u1EC3u Hoa \uD83D\uDC69\u200D\uD83C\uDFEB"))), showStatsModal && /*#__PURE__*/React.createElement(StatsModal, {
    darkMode: darkMode,
    onClose: () => setShowStatsModal(false),
    xp: xp,
    playerLevel: playerLevel,
    streak: streak,
    masteredCount: masteredWords.size,
    highScores: highScores,
    title: title
  }), showAIChatModal && /*#__PURE__*/React.createElement(AIChatModal, {
    darkMode: darkMode,
    onClose: () => setShowAIChatModal(false),
    muted: muted,
    hskLevel: hskLevel,
    onGainXp: gainXp
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
  masteredWords,
  onOpenAIChat
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
  }, {
    id: 'ai-chat',
    title: 'AI Đối Thoại (Chat Tutor)',
    desc: 'Luyện khẩu ngữ 1-1 cùng cô giáo ảo Tiểu Hoa, sửa lỗi ngữ pháp & phát âm.',
    icon: Bot,
    color: 'from-rose-500 to-pink-600',
    badge: 'Gia Sư AI'
  }];
  const currentLevelWords = HSK_DATA[hskLevel] || [];
  const masteredInCurrentLevel = currentLevelWords.filter(w => masteredWords.has(w.id)).length;
  const percentMastered = currentLevelWords.length > 0 ? Math.round(masteredInCurrentLevel / currentLevelWords.length * 100) : 0;
  return /*#__PURE__*/React.createElement("div", {
    className: "space-y-8 animate-fadeIn"
  }, /*#__PURE__*/React.createElement("div", {
    className: `relative overflow-hidden rounded-3xl p-6 sm:p-8 border shadow-xl transition-all ${darkMode ? 'bg-gradient-to-r from-slate-900 via-slate-800 to-red-950/40 border-slate-800' : 'bg-gradient-to-r from-red-500/10 via-amber-500/10 to-orange-500/10 border-red-100'}`
  }, /*#__PURE__*/React.createElement("div", {
    className: "relative z-10 max-w-xl space-y-3"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex flex-wrap items-center gap-2"
  }, /*#__PURE__*/React.createElement("span", {
    className: "px-3 py-1 text-xs font-bold tracking-wider uppercase rounded-full bg-red-500/20 text-red-500 inline-flex items-center gap-1 border border-red-500/30"
  }, /*#__PURE__*/React.createElement(Sparkles, {
    className: "w-3.5 h-3.5"
  }), " H\u1ECDc Ti\u1EBFng Trung Gamified"), /*#__PURE__*/React.createElement("span", {
    className: "px-3 py-1 text-xs font-bold rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20"
  }, "\u2728 1.201 T\u1EEB v\u1EF1ng HSK 1-4"), /*#__PURE__*/React.createElement("button", {
    onClick: onOpenAIChat,
    className: "px-3 py-1 text-xs font-bold rounded-full bg-rose-500/20 text-rose-400 border border-rose-500/30 hover:scale-105 transition flex items-center gap-1"
  }, /*#__PURE__*/React.createElement(Bot, {
    className: "w-3.5 h-3.5"
  }), " Chat c\xF9ng AI Ti\u1EC3u Hoa")), /*#__PURE__*/React.createElement("h2", {
    className: "text-2xl sm:text-4xl font-extrabold tracking-tight"
  }, "Chinh Ph\u1EE5c HSK ", hskLevel, " C\xF9ng AI!"), /*#__PURE__*/React.createElement("p", {
    className: `${darkMode ? 'text-slate-400' : 'text-slate-600'} text-sm sm:text-base leading-relaxed`
  }, "\u0110\xE3 thu\u1ED9c: ", /*#__PURE__*/React.createElement("span", {
    className: "text-emerald-400 font-bold"
  }, masteredInCurrentLevel, "/", currentLevelWords.length), " t\u1EEB v\u1EF1ng (", percentMastered, "% ho\xE0n th\xE0nh). Ch\u1ECDn ch\u1EBF \u0111\u1ED9 luy\u1EC7n t\u1EADp ngay d\u01B0\u1EDBi \u0111\xE2y!"), /*#__PURE__*/React.createElement("div", {
    className: "w-full max-w-md h-2.5 bg-slate-800/80 rounded-full overflow-hidden border border-slate-700/50"
  }, /*#__PURE__*/React.createElement("div", {
    className: "h-full bg-gradient-to-r from-red-500 via-amber-500 to-emerald-400 transition-all duration-500",
    style: {
      width: `${percentMastered}%`
    }
  }))), /*#__PURE__*/React.createElement("div", {
    className: "absolute right-4 bottom-2 opacity-10 sm:opacity-20 pointer-events-none select-none text-9xl font-black text-red-500"
  }, "\u6F22")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between mb-4"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "text-sm font-bold tracking-wider uppercase text-slate-400 flex items-center gap-2"
  }, /*#__PURE__*/React.createElement(BookOpen, {
    className: "w-4 h-4 text-red-500"
  }), " Ch\u1ECDn C\u1EA5p \u0110\u1ED9 HSK Target"), /*#__PURE__*/React.createElement("span", {
    className: "text-xs text-slate-500 font-medium"
  }, "1.201 t\u1EEB chu\u1EA9n HSK 1-4")), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-2 sm:grid-cols-4 gap-4"
  }, [{
    lvl: 1,
    count: 150,
    desc: 'Cơ bản'
  }, {
    lvl: 2,
    count: 150,
    desc: 'Giao tiếp'
  }, {
    lvl: 3,
    count: 301,
    desc: 'Trung cấp'
  }, {
    lvl: 4,
    count: 600,
    desc: 'Thành thạo'
  }].map(({
    lvl,
    count,
    desc
  }) => {
    const isSelected = hskLevel === lvl;
    const lvlWords = HSK_DATA[lvl] || [];
    const masteredCount = lvlWords.filter(w => masteredWords.has(w.id)).length;
    const pct = lvlWords.length > 0 ? Math.round(masteredCount / lvlWords.length * 100) : 0;
    return /*#__PURE__*/React.createElement("button", {
      key: lvl,
      onClick: () => {
        sfx.click();
        setHskLevel(lvl);
      },
      className: `relative p-5 rounded-2xl border transition-all text-left group overflow-hidden ${isSelected ? 'border-red-500 shadow-xl shadow-red-500/20 bg-gradient-to-b from-red-500/10 via-amber-500/5 to-transparent scale-[1.02]' : darkMode ? 'bg-slate-900 border-slate-800 hover:border-slate-700' : 'bg-white border-slate-200 hover:border-slate-300'}`
    }, /*#__PURE__*/React.createElement("div", {
      className: "flex items-center justify-between mb-2"
    }, /*#__PURE__*/React.createElement("span", {
      className: `text-2xl font-black ${isSelected ? 'text-red-500' : darkMode ? 'text-slate-300' : 'text-slate-700'}`
    }, "HSK ", lvl), isSelected ? /*#__PURE__*/React.createElement(CheckCircle2, {
      className: "w-5 h-5 text-red-500 animate-pulse"
    }) : /*#__PURE__*/React.createElement("span", {
      className: "text-[10px] font-bold text-slate-500"
    }, pct, "%")), /*#__PURE__*/React.createElement("p", {
      className: "text-xs text-slate-400 mb-2 font-medium"
    }, count, " t\u1EEB - ", desc), /*#__PURE__*/React.createElement("div", {
      className: "w-full h-1.5 bg-slate-700/50 rounded-full overflow-hidden"
    }, /*#__PURE__*/React.createElement("div", {
      className: "bg-red-500 h-full transition-all duration-300",
      style: {
        width: `${pct}%`
      }
    })));
  }))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", {
    className: "text-sm font-bold tracking-wider uppercase text-slate-400 mb-4 flex items-center gap-2"
  }, /*#__PURE__*/React.createElement(Trophy, {
    className: "w-4 h-4 text-amber-500"
  }), " Ch\u1ECDn Ch\u1EBF \u0110\u1ED9 Luy\u1EC7n T\u1EADp (HSK ", hskLevel, ")"), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
  }, modes.map(m => {
    const Icon = m.icon;
    const isAIChat = m.id === 'ai-chat';
    return /*#__PURE__*/React.createElement("div", {
      key: m.id,
      onClick: () => setMode(m.id),
      className: `group relative p-6 rounded-2xl border cursor-pointer transition-all duration-300 hover:-translate-y-1 ${isAIChat ? 'border-rose-500/50 hover:border-rose-500' : ''} ${darkMode ? 'bg-slate-900/90 border-slate-800 hover:border-slate-700 hover:shadow-xl hover:shadow-black/40' : 'bg-white border-slate-200 hover:border-slate-300 hover:shadow-xl hover:shadow-slate-200/50'}`
    }, /*#__PURE__*/React.createElement("div", {
      className: "flex items-start gap-4"
    }, /*#__PURE__*/React.createElement("div", {
      className: `p-3.5 rounded-2xl bg-gradient-to-tr ${m.color} text-white shadow-md group-hover:scale-110 transition-transform shrink-0`
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
    }, isAIChat ? 'Trò chuyện ngay' : 'Bắt đầu ngay', " ", /*#__PURE__*/React.createElement(ArrowRight, {
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
  const [isShuffled, setIsShuffled] = useState(true);
  const [deckKey, setDeckKey] = useState(0);

  // Deck is randomized by default using Fisher-Yates
  const deck = useMemo(() => {
    return isShuffled ? shuffleArray(words) : [...words];
  }, [words, isShuffled, deckKey]);
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const currentWord = deck[index] || deck[0];
  const isMastered = masteredWords.has(currentWord?.id);
  const handleShuffle = () => {
    if (!muted) sfx.click();
    setDeckKey(k => k + 1);
    setIndex(0);
    setFlipped(false);
  };
  const handleNext = () => {
    if (!muted) sfx.click();
    setFlipped(false);
    setIndex(prev => prev < deck.length - 1 ? prev + 1 : 0);
    onGainXp(5);
  };
  const handlePrev = () => {
    if (!muted) sfx.click();
    setFlipped(false);
    setIndex(prev => prev > 0 ? prev - 1 : deck.length - 1);
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "max-w-xl mx-auto space-y-6"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: onBack,
    className: `px-3 py-1.5 rounded-lg text-sm font-semibold flex items-center gap-1.5 transition ${darkMode ? 'bg-slate-800 hover:bg-slate-700' : 'bg-slate-200 hover:bg-slate-300'}`
  }, "\u2190 Quay l\u1EA1i"), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: handleShuffle,
    className: `px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition ${darkMode ? 'bg-slate-800 hover:bg-slate-700 text-amber-400' : 'bg-slate-200 hover:bg-slate-300 text-amber-700'}`,
    title: "X\xE1o tr\u1ED9n ng\u1EABu nhi\xEAn to\xE0n b\u1ED9 th\u1EBB"
  }, /*#__PURE__*/React.createElement(Shuffle, {
    className: "w-3.5 h-3.5"
  }), /*#__PURE__*/React.createElement("span", null, "X\xE1o th\u1EBB")), /*#__PURE__*/React.createElement("button", {
    onClick: () => {
      setIsShuffled(!isShuffled);
      setIndex(0);
      setFlipped(false);
    },
    className: `px-2.5 py-1.5 rounded-lg text-xs font-semibold border transition ${isShuffled ? 'border-amber-500/40 text-amber-400 bg-amber-500/10' : 'border-slate-700 text-slate-400'}`
  }, isShuffled ? '🎲 Ngẫu nhiên' : '🔤 A-Z'), /*#__PURE__*/React.createElement("div", {
    className: "text-xs font-semibold text-slate-400 ml-1"
  }, index + 1, " / ", deck.length))), /*#__PURE__*/React.createElement("div", {
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
  const [sessionKey, setSessionKey] = useState(0);

  // Truly random 15 words chosen with Fisher-Yates
  const sessionWords = useMemo(() => {
    return shuffleArray(words).slice(0, 15);
  }, [words, sessionKey]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hearts, setHearts] = useState(3);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const currentWord = sessionWords[currentIndex] || sessionWords[0];

  // Truly random 4 options for current question, with answer shuffled uniformly
  const options = useMemo(() => {
    if (!currentWord) return [];
    const wrong = words.filter(w => w.id !== currentWord.id);
    const selectedWrong = shuffleArray(wrong).slice(0, 3);
    return shuffleArray([...selectedWrong, currentWord]);
  }, [currentIndex, words, currentWord, sessionKey]);
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
    if (currentIndex < sessionWords.length - 1) {
      setCurrentIndex(c => c + 1);
    } else {
      setGameOver(true);
    }
  };
  const resetGame = () => {
    setSessionKey(k => k + 1);
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
    }, "V\xF2ng M\u1EDBi (Random)")));
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
  }, "C\xE2u h\u1ECFi #", currentIndex + 1, " / ", sessionWords.length), /*#__PURE__*/React.createElement("div", {
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
  const [roundKey, setRoundKey] = useState(0);
  useEffect(() => {
    // 1. Pick 6 random words with Fisher-Yates
    const selectedSub = shuffleArray(words).slice(0, 6);

    // 2. Generate Hanzi and Meaning cards
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

    // 3. Shuffle all 12 cards thoroughly across grid
    setGridItems(shuffleArray([...hanziList, ...meaningList]));
    setSelectedItem(null);
    setMatchedIds([]);
  }, [words, roundKey]);
  const restartRound = () => {
    if (!muted) sfx.click();
    setRoundKey(k => k + 1);
  };
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
  }, "\u2190 Quay l\u1EA1i"), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-3"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: restartRound,
    className: `px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition ${darkMode ? 'bg-slate-800 hover:bg-slate-700 text-emerald-400' : 'bg-slate-200 hover:bg-slate-300 text-emerald-700'}`,
    title: "\u0110\u1ED5i b\u1ED9 6 t\u1EEB m\u1EDBi ng\u1EABu nhi\xEAn"
  }, /*#__PURE__*/React.createElement(Shuffle, {
    className: "w-3.5 h-3.5"
  }), /*#__PURE__*/React.createElement("span", null, "\u0110\u1ED5i b\u1ED9 t\u1EEB m\u1EDBi")), /*#__PURE__*/React.createElement("span", {
    className: "text-xs font-semibold text-slate-400"
  }, "\u0110\xE3 gh\xE9p: ", matchedIds.length, " / 6 C\u1EB7p"))), /*#__PURE__*/React.createElement("div", {
    className: "text-center"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "text-xl font-bold"
  }, "Gh\xE9p Ch\u1EEF H\xE1n & Ti\u1EBFng Vi\u1EC7t"), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-slate-400 mt-1"
  }, "V\u1ECB tr\xED c\xE1c th\u1EBB \u0111\u01B0\u1EE3c x\xE1o tr\u1ED9n ng\u1EABu nhi\xEAn ho\xE0n to\xE0n.")), isCompleted ? /*#__PURE__*/React.createElement("div", {
    className: `p-8 rounded-3xl border text-center space-y-4 ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`
  }, /*#__PURE__*/React.createElement("div", {
    className: "w-16 h-16 bg-emerald-500/10 text-emerald-500 rounded-full flex items-center justify-center mx-auto"
  }, /*#__PURE__*/React.createElement(Sparkles, {
    className: "w-8 h-8"
  })), /*#__PURE__*/React.createElement("h4", {
    className: "text-2xl font-black"
  }, "Xu\u1EA5t S\u1EAFc! Ho\xE0n Th\xE0nh Gh\xE9p T\u1EEB!"), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-slate-400"
  }, "+120 XP th\u01B0\u1EDFng \u0111\xE3 \u0111\u01B0\u1EE3c c\u1ED9ng."), /*#__PURE__*/React.createElement("div", {
    className: "flex justify-center gap-3"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: onBack,
    className: `px-5 py-3 rounded-xl font-bold text-sm ${darkMode ? 'bg-slate-800 hover:bg-slate-700' : 'bg-slate-200 hover:bg-slate-300'}`
  }, "Trang Ch\u1EE7"), /*#__PURE__*/React.createElement("button", {
    onClick: restartRound,
    className: "px-6 py-3 rounded-xl font-bold bg-gradient-to-r from-red-600 to-amber-500 text-white"
  }, "Ch\u01A1i V\xF2ng M\u1EDBi (Random)"))) : /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-3 sm:grid-cols-4 gap-3"
  }, gridItems.map((item, idx) => {
    const isMatched = matchedIds.includes(item.id);
    const isSelected = selectedItem?.val === item.val && selectedItem?.type === item.type;
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
  const [runKey, setRunKey] = useState(0);

  // Fully shuffled pool of words for this 30s run
  const shuffledRunWords = useMemo(() => {
    return shuffleArray(words);
  }, [words, runKey]);
  const currentWord = shuffledRunWords[currentIndex % shuffledRunWords.length] || shuffledRunWords[0];

  // Completely random 4 options for each question
  const options = useMemo(() => {
    if (!currentWord) return [];
    const wrong = words.filter(w => w.id !== currentWord.id);
    const selectedWrong = shuffleArray(wrong).slice(0, 3);
    return shuffleArray([...selectedWrong, currentWord]);
  }, [currentIndex, words, currentWord, runKey]);
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
    setRunKey(k => k + 1);
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
  }, "T\u1EEB v\u1EF1ng xu\u1EA5t hi\u1EC7n ng\u1EABu nhi\xEAn ho\xE0n to\xE0n. Tr\u1EA3 l\u1EDDi \u0111\xFAng c\xE0ng nhi\u1EC1u c\xE0ng t\u1ED1t!")), /*#__PURE__*/React.createElement("button", {
    onClick: startSpeedRun,
    className: "w-full py-4 rounded-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg hover:opacity-90 active:scale-95 transition"
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
    className: `p-4 rounded-2xl border text-center font-bold text-sm transition hover:scale-105 active:scale-95 ${darkMode ? 'bg-slate-900 border-slate-800 hover:border-purple-500' : 'bg-white border-slate-200 hover:border-purple-500'}`
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
    className: "w-full py-3.5 rounded-xl font-bold bg-purple-600 hover:bg-purple-500 active:scale-95 transition text-white"
  }, "Ch\u01A1i L\u1EA1i V\xF2ng M\u1EDBi")));
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