<<<<<<< HEAD
# EduVerse 🚀

**Tim:** [Nama Tim Kamu]
**Asal Sekolah:** [Nama Sekolah Kamu]
**Kategori Lomba:** Web Design Competition - Techne Fest 2026

*Repositori ini dibuat untuk memenuhi syarat pengumpulan karya Techne Fest 2026 sesuai format: NamaTim_NamaSekolah_WebDesign_TechneFest.*

---

EduVerse adalah aplikasi web produktivitas interaktif yang mengusung konsep **gamifikasi** untuk membantu pengguna (seperti pelajar atau profesional) agar tetap fokus dan termotivasi dalam menyelesaikan tugas mereka. 

EduVerse dirancang khusus untuk mengimplementasikan tema **"Where Creativity Meets Technology"**. Kami memadukan kreativitas desain antarmuka (UI/UX) yang ramah pelajar dengan pemanfaatan teknologi pengelolaan state (JavaScript) untuk menciptakan solusi nyata bagi masalah fokus belajar.

Dengan menggabungkan fitur manajemen tugas dan teknik fokus dengan elemen permainan (seperti XP, Level, dan Avatar), EduVerse membuat proses belajar dan bekerja menjadi lebih menyenangkan dan terukur.

---

## 🔗 Live Demo & Screenshot

**Live Demo:** [Masukkan Link Hosting Kamu di sini, cth: https://eduverse.vercel.app]

**Screenshot Dashboard:**
*(Ganti tautan gambar di bawah ini dengan screenshot aplikasimu sungguhan)*
![Dashboard EduVerse](./path-ke-gambar-screenshot.png)

---

## 🌟 Fitur Utama

1. **Dashboard Gamifikasi** 🎮
   - Melacak perkembangan pengguna secara *real-time* termasuk Level dan Total XP.
   - Menampilkan visualisasi data "Menit Fokus" menggunakan grafik garis (Chart.js) selama 7 hari terakhir.
2. **Kanban Planner** 📋
   - Sistem manajemen tugas berbasis papan Kanban untuk mengorganisir pekerjaan (Todo, In Progress, Done).
3. **Focus Room (Ruang Fokus)** ⏱️
   - Fitur penghitung waktu belajar/kerja yang terintegrasi. Pengguna bisa mendapatkan XP tambahan dengan mempertahankan fokus mereka dalam rentang waktu tertentu.
4. **Avatar Store** 🛒
   - Pengguna dapat membuka dan mengganti avatar/ikon profil mereka seiring dengan meningkatnya Level atau menukarkan poin.
5. **Sistem Penyimpanan Lokal** 💾
   - Proyek ini sepenuhnya bekerja di sisi klien (*client-side*). Semua data (XP, riwayat fokus, status profil) disimpan dengan aman di dalam `localStorage` browser.

---

## 💻 Teknologi yang Digunakan

Proyek ini dibangun menggunakan teknologi *front-end* modern namun ringan (tanpa proses *build* atau *bundler* yang rumit):

- **HTML5** & **CSS3**
- **JavaScript (Vanilla JS)**: Untuk logika gamifikasi, manajemen state (`localStorage`), dan interaksi UI.
- **Tailwind CSS (via CDN)**: *Utility-first framework* untuk mendesain antarmuka yang modern, *responsive*, dan rapi.
- **FontAwesome (v6.4.0)**: Menyediakan berbagai macam ikon yang digunakan di navigasi, avatar, dan elemen UI.
- **Chart.js**: *Library* visualisasi untuk membuat grafik analitik waktu fokus di halaman Dashboard.

---

## 📂 Struktur Direktori

```text
EduVerse/
├── css/
│   └── main.css          # File CSS tambahan/kustom (jika ada)
├── js/
│   └── main.js           # Core logic: State management, XP calculation, UI helpers
├── index.html            # Entry point (Otomatis me-redirect ke login/dashboard)
├── login.html            # Halaman autentikasi/pembuatan sesi awal
├── dashboard.html        # Halaman utama (Statistik, Grafik, XP)
├── planner.html          # Halaman Kanban board
├── focus.html            # Halaman Timer/Stopwatch untuk fokus
└── store.html            # Halaman toko Avatar
```

---

## 🔄 Alur Pembuatan Web

Proses pengembangan EduVerse dilakukan dalam waktu 10 hari dengan alur berikut:
1. **Ideasi & Konsep:** Menentukan fitur gamifikasi yang relevan dengan kebutuhan pelajar MA/SMA.
2. **Desain UI/UX:** Merancang tata letak dan skema warna *dark mode* yang tidak membuat mata lelah.
3. **Pengembangan Front-End & Prompting AI:** Menyusun kerangka HTML, styling menggunakan Tailwind CSS, dan dibantu oleh asisten AI untuk mempercepat penulisan boilerplate code.
4. **Implementasi Logika (JavaScript):** Menghubungkan elemen UI dengan fungsionalitas DOM dan mengonfigurasi `localStorage` sebagai database sisi klien.
5. **Testing & Debugging:** Memastikan seluruh fitur (Kanban, Timer, XP) berjalan optimal tanpa bug di desktop maupun perangkat mobile.

---

## 🚀 Cara Menjalankan Proyek

Karena EduVerse adalah aplikasi *client-side* murni, kamu tidak perlu menginstal dependensi *backend* (seperti Node.js) atau melakukan konfigurasi *database* yang rumit.

1. **Clone atau Unduh** *repository* ini ke komputer kamu.
2. Buka folder proyek `EduVerse`.
3. Klik dua kali pada file `index.html` untuk membukanya di browser favoritmu (disarankan menggunakan Google Chrome, Firefox, atau Edge).
4. Kamu akan diarahkan ke `login.html` untuk memasukkan nama pengguna pertama kali. Setelah itu, selamat menikmati EduVerse!

*(Opsional: Jika kamu ingin menggunakan fitur Live Server, kamu bisa membukanya melalui ekstensi Live Server di VS Code untuk melihat perubahan secara real-time saat melakukan pengembangan).*

---

## 🔧 Pengembangan Lebih Lanjut (State Management)
Pusat logika aplikasi berada di file `js/main.js`. Objek `AppState` mengelola cara kerja aplikasi dengan menyimpan struktur JSON sederhana di `localStorage` melalui *key* `edu_user`.
Kamu dapat dengan mudah menambahkan kalkulasi Level baru atau menambahkan fitur pencapaian (*Achievements*) dengan memodifikasi fungsi-fungsi seperti `addXP()` atau `addHistory()`.

---

Dibuat dengan ❤️ untuk lomba Techne Fest 2026.
=======
# EduVerse
>>>>>>> a7310c284ac1fe4e9a894e5b87109a5ddb52fb35
