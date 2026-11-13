# Aplikasi Bendahara Revitalisasi Satuan Pendidikan

Aplikasi web statis (satu file `index.html`) untuk bendahara Program Revitalisasi Satuan Pendidikan:
Buku Kas Umum, BP Kas Tunai, Buku Bank, Buku Pajak, BP Kegiatan, Berita Acara Pemeriksaan Kas,
serta cetak nota/kuitansi. Data tersimpan di browser dan disinkronkan ke Google Sheet.

## 1. Siapkan Google Sheet (penyimpanan)
1. Buat Google Sheet baru, misalnya "Data Bendahara Revitalisasi".
2. Menu **Ekstensi > Apps Script**. Hapus isi bawaan, tempel isi `apps-script/Code.gs`.
3. Ganti nilai `TOKEN` dengan kode rahasia buatan Anda (acak, minimal 20 karakter). Simpan.
4. **Deploy > Deployment baru > Jenis: Aplikasi web**
   - Jalankan sebagai: **Saya**
   - Yang memiliki akses: **Siapa saja**
5. Setujui izin akses, lalu salin **URL Web App** (berakhiran `/exec`).
6. Bila nanti mengubah kode, pilih **Deploy > Kelola deployment > Edit > Versi baru** agar perubahan berlaku.

## 2. Deploy ke GitHub Pages
1. Buat repositori baru di GitHub, unggah `index.html` (boleh seluruh folder ini).
2. **Settings > Pages > Build and deployment**: Source *Deploy from a branch*, branch `main`, folder `/ (root)`.
3. Tunggu 1 sampai 2 menit, alamatnya `https://NAMA-AKUN.github.io/NAMA-REPO/`.

Jangan menaruh TOKEN atau URL Web App di dalam repositori. Keduanya diisi lewat halaman aplikasi.

## 3. Hubungkan aplikasi ke Sheet
Buka aplikasi, tab **Pengaturan**, bagian *Penyimpanan Google Sheet*: tempel URL Web App dan token,
lalu tekan **Tarik data dari Sheet** atau **Kirim data ke Sheet**. Setelah itu setiap perubahan dikirim otomatis.
Isian URL dan token disimpan per browser, jadi isi ulang di setiap perangkat.

## Catatan
- Sinkronisasi memakai prinsip "yang terakhir menang". Pakai satu perangkat dalam satu waktu.
- Jika koneksi putus, data tetap di browser dan dikirim pada kunjungan berikutnya.
- Tab Pengaturan menyediakan kotak cadangan JSON sebagai pengaman tambahan.
- Tarif pajak dan format kolom perlu dicocokkan dengan juknis revitalisasi yang berlaku untuk sekolah Anda.
