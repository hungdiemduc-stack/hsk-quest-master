# 🎮 HSK Quest Master — HSK 3 Bài 2: 他什么时候回来

Trò chơi web tương tác giúp ôn tập từ vựng, ngữ pháp và bài đọc **HSK 3 — Bài 2: 他什么时候回来 (Khi nào anh ấy trở về?)**, được thiết kế theo phong cách đồ họa **Neo-Brutalism** retro vui nhộn, sống động và tối ưu mượt mà trên cả máy tính lẫn điện thoại di động.

---

## ✨ Tính năng nổi bật

- 🏃‍♂️ **Đường đua nhân vật tương tác**: Nhân vật di chuyển dọc đường đua theo tiến độ trả lời, tự động nhảy lên khi trả lời đúng (`jump`), biểu cảm khi trả lời sai (`hurt`), thu thập xu vàng (`🪙`) và chạm cờ đích (`🚩`).
- 🎯 **4 Cấp độ chơi phong phú**:
  1. **Level 1 — Nối từ vựng**: 3 vòng nối chữ Hán (Hanzi) với Pinyin & nghĩa tiếng Việt tương ứng.
  2. **Level 2 — Chọn đáp án**: Trắc nghiệm bài đọc hiểu nội dung HSK 3 Bài 2.
  3. **Level 3 — Điền từ ngữ pháp**: Luyện các cấu trúc ngữ pháp trọng điểm (`来/去`, `动词 + 了...就...`, câu phản vấn `能...吗`). Chỗ trống được tự động điền từ ngay khi chọn.
  4. **Level 4 — Dịch câu**: Kéo thả / chạm để ghép các khối từ thành câu tiếng Trung hoàn chỉnh theo câu dịch tiếng Việt.
- 🔊 **Âm thanh tổng hợp Web Audio API**: Tự động tổng hợp âm thanh retro trực tiếp trên trình duyệt bằng tần số dao động (không tốn dung lượng tải file âm thanh ngoài).
- 🗣️ **Hỗ trợ phát âm tiếng Trung (TTS)**: Tự động phát âm chuẩn giọng đọc bản xứ khi bấm vào chữ Hán, câu hỏi và đáp án.
- 🏆 **Bảng xếp hạng & Tiến trình**:
  - Tự động lưu tên người chơi, số sao tích lũy và kỷ lục từng level vào `localStorage`.
  - Mở khóa level tiếp theo khi đạt từ 60% số câu đúng trở lên.
  - Xếp hạng vinh danh với huy chương 🥇, 🥈, 🥉.
- 🚀 **Zero-dependency**: Chạy trực tiếp bằng HTML, CSS và JavaScript thuần (ES Modules), không yêu cầu cài đặt môi trường phức tạp hay build tool, sẵn sàng triển khai ngay lên GitHub Pages.

---

## 📁 Cấu trúc thư mục

```text
hsk-quest-master/
├── index.html                  # Giao diện chính của trò chơi
├── favicon.ico                 # Icon trang web
├── assets/                     # Hình ảnh minh họa & icon nhân vật
│   ├── hero.png                # Banner chính bài học
│   ├── char.png                # Sprite nhân vật chính
│   ├── lv1.png                 # Icon Level 1
│   ├── lv2.png                 # Icon Level 2
│   ├── lv3.png                 # Icon Level 3
│   └── lv4.png                 # Icon Level 4
├── css/
│   └── game.css                # Toàn bộ hiệu ứng, hoạt ảnh & phong cách Neo-brutalism
├── js/
│   ├── data.js                 # Bộ dữ liệu từ vựng, câu hỏi & bài khóa
│   ├── audio.js                # Bộ tạo âm thanh Web Audio & phát âm tiếng Trung
│   ├── storage.js              # Quản lý lưu trữ điểm số & bảng xếp hạng
│   └── game.js                 # Điều khiển luồng chơi, logic tương tác & giao diện
└── .github/
    └── workflows/
        └── pages.yml           # Tự động triển khai lên GitHub Pages khi push code
```

---

## 💻 Hướng dẫn chạy thử trên máy tính (Local)

Bạn có thể chạy thử trực tiếp trên máy tính cá nhân bằng một trong các cách sau:

### Cách 1: Dùng Python HTTP Server (Khuyên dùng)
Mở cửa sổ dòng lệnh (PowerShell hoặc Terminal) tại thư mục dự án và chạy:
```bash
python -m http.server 8000
```
Sau đó mở trình duyệt và truy cập: [http://localhost:8000](http://localhost:8000)

### Cách 2: Dùng tiện ích Live Server trong VS Code
1. Mở thư mục này bằng **Visual Studio Code**.
2. Cài đặt tiện ích mở rộng **Live Server**.
3. Chuột phải vào file `index.html` và chọn **Open with Live Server**.

---

## 🚀 Hướng dẫn đưa lên GitHub (Push to GitHub)

### Bước 1: Tạo Repository mới trên GitHub
1. Đăng nhập vào tài khoản [GitHub](https://github.com/).
2. Nhấn vào dấu `+` ở góc trên cùng bên phải và chọn **New repository**.
3. Đặt tên kho lưu trữ (Repository name), ví dụ: `hsk-quest-master`.
4. Chọn chế độ **Public**.
5. **Không** tích vào *Initialize this repository with a README* (vì dự án đã có sẵn code và README).
6. Nhấn nút **Create repository**.

### Bước 2: Khởi tạo Git và đẩy code lên GitHub
Mở PowerShell tại thư mục dự án này (`c:\Users\ACER\hsk-quest-master`) và chạy các lệnh sau:

```bash
# 1. Khởi tạo kho git nội bộ
git init -b main

# 2. Thêm toàn bộ các file vào danh sách commit
git add .

# 3. Tạo commit đầu tiên
git commit -m "feat: initial commit HSK Quest Master game"

# 4. Liên kết với kho lưu trữ GitHub của bạn (thay URL bằng link repo bạn vừa tạo)
git remote add origin https://github.com/<tai-khoan-github-cua-ban>/hsk-quest-master.git

# 5. Đẩy code lên nhánh main
git push -u origin main
```

*(Lưu ý: Nếu GitHub yêu cầu đăng nhập, hãy đăng nhập qua trình duyệt hoặc nhập Personal Access Token của bạn).*

---

## 🌐 Hướng dẫn bật GitHub Pages để chơi trực tuyến (Miễn phí)

Sau khi đã đẩy code lên GitHub, bạn có thể biến kho code thành một website chạy trực tiếp trên internet:

1. Vào trang GitHub repository của bạn (`https://github.com/<tai-khoan>/hsk-quest-master`).
2. Nhấp vào tab **Settings** (Cài đặt) ở phía trên.
3. Ở thanh menu bên trái, tìm và nhấp vào mục **Pages** (trong phần *Code and automation*).
4. Tại mục **Build and deployment**:
   - **Source**: Chọn **Deploy from a branch**.
   - **Branch**: Chọn `main` và thư mục là `/(root)`.
5. Nhấn **Save**.
6. Đợi khoảng 1-2 phút, GitHub sẽ hiển thị đường link trang web của bạn:
   👉 `https://<tai-khoan-github-cua-ban>.github.io/hsk-quest-master/`

Bây giờ bạn có thể mở link trên điện thoại hoặc máy tính và chia sẻ cho bạn bè cùng ôn tập tiếng Trung!

---

## 📜 Bản quyền & Giấy phép
Dự án được tạo ra với mục đích học tập và chia sẻ kiến thức cộng đồng (MIT License). Chúc bạn học tiếng Trung vui vẻ và đạt điểm cao trong kỳ thi HSK!
