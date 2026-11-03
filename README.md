# 🎮 HSK Quest Master - RPG Chinese Learning Game

Trò chơi học và luyện thi tiếng Trung tương tác phong cách RPG, bao quát toàn diện từ vựng từ **HSK 1 đến HSK 4** với hệ thống thăng cấp, chuỗi ngày học (streak), kinh nghiệm (XP) và 4 chế độ chơi cực cuốn!

---

## ✨ Tính năng nổi bật

- 🛡️ **Hệ thống RPG & Hồ sơ Hiệp sĩ**:
  - Tích lũy kinh nghiệm (XP) sau mỗi câu trả lời đúng, tự động thăng cấp (`Level Player`).
  - Danh hiệu thay đổi theo cấp độ: *Tân Thủ HSK 1*, *Học Giả HSK 2*, *Cao Thủ HSK 3*, *Đại Sư HSK 4*.
  - Theo dõi chuỗi ngày học (`Streak`), số từ đã làm chủ (`Mastered Words`) và bảng kỷ lục cá nhân.
- 📚 **Kho từ vựng chuẩn HSK 1 — HSK 4**:
  - Bao gồm chữ Hán, Pinyin, nghĩa tiếng Việt, câu ví dụ thực tế và bản dịch câu chuẩn ngữ pháp.
- 🎯 **4 Chế độ chơi đa dạng**:
  1. 🎴 **Flashcard Master (Thẻ 3D)**: Lật thẻ tương tác 3 chiều, nghe phát âm bản xứ, xem câu ví dụ và đánh dấu từ đã thuộc (+10 XP).
  2. ❓ **Quiz Quest**: Thử thách sinh tồn với 3 Trái Tim (`❤️`), chọn đáp án chính xác để vượt qua cửa ải.
  3. ✨ **Ghép Từ (Word Match)**: Thử thách phản xạ nối chữ Hán với nghĩa tiếng Việt trên lưới ô vuông (+120 XP thưởng khi hoàn thành).
  4. ⏱️ **Speed Run 30s**: Chế độ dồn dập 30 giây — trả lời đúng càng nhiều từ vựng càng tốt để xác lập kỷ lục điểm số!
- 🔊 **Âm thanh tổng hợp & Phát âm giọng chuẩn**:
  - Web Audio API Sound Synthesizer mô phỏng hiệu ứng âm thanh game 8-bit sống động (`correct`, `wrong`, `levelUp`, `click`).
  - Tích hợp giọng đọc tiếng Trung chuẩn bản xứ (Web Speech API TTS) mượt mà.
- 🌓 **Giao diện Dark Mode / Light Mode**:
  - Chuyển đổi linh hoạt giữa giao diện tối huyền bí và giao diện sáng thanh lịch chỉ với 1 cú click.
  - Tương thích 100% trên cả điện thoại di động và máy tính.

---

## 📁 Cấu trúc thư mục

```text
hsk-quest-master/
├── index.html          # Trang chủ ứng dụng, nạp React 18 & Tailwind CSS
├── favicon.ico         # Icon trang web
├── vite.config.js      # Cấu hình Vite với base path GitHub Pages
├── package.json        # Thông tin gói dự án
├── src/
│   ├── App.tsx         # Mã nguồn gốc React TypeScript (từ file hsk_quest_master.tsx)
│   ├── App.js          # Mã nguồn ứng dụng đã biên dịch
│   └── main.js         # Điểm khởi tạo và gắn kết React Root
└── README.md           # Hướng dẫn sử dụng
```

---

## 🚀 Trải nghiệm trực tuyến (GitHub Pages)

Trò chơi đã được xuất bản và chạy trực tiếp tại:
👉 **[https://hungdiemduc-stack.github.io/hsk-quest-master/](https://hungdiemduc-stack.github.io/hsk-quest-master/)**

---

## 💻 Chạy thử trên máy tính (Local)

Bạn có thể chạy thử trực tiếp trên máy bằng lệnh:
```bash
python -m http.server 8000
```
Sau đó truy cập [http://localhost:8000](http://localhost:8000).
