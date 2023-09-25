# Aplikasi Autentikasi Node.js dengan PostgreSQL

Aplikasi ini adalah API untuk autentikasi pengguna menggunakan Node.js dengan Express.js sebagai framework dan PostgreSQL sebagai database. Ini adalah panduan singkat untuk menjalankan, menguji, dan mengkonfigurasi aplikasi ini.

## Menjalankan Aplikasi

### Persyaratan

Untuk menjalankan aplikasi ini, pastikan Anda telah menginstal Docker. Jika Anda belum memiliki Docker, Anda dapat mengunduhnya dari [situs resmi Docker](https://www.docker.com/get-started).

### Menggunakan Docker

1. Buka terminal dan arahkan ke direktori aplikasi ini.
2. Jalankan perintah berikut untuk memulai layanan Docker:

   ```bash
   docker-compose up
   ```

   Aplikasi ini akan berjalan di port 5000.

### Tanpa Docker

Jika Anda ingin menjalankan aplikasi ini tanpa Docker, pastikan Anda memiliki PostgreSQL terinstal di komputer Anda. Selain itu, Anda perlu mengatur beberapa konfigurasi di file `.env`.

1. Buka file `.env` dan temukan baris berikut:

   ```env
   DB_HOST=postgres
   ```

2. Berikan tanda pagar (#) pada awal baris ini untuk mengkomentari baris tersebut:

   ```env
   # DB_HOST=postgres
   ```

3. Simpan perubahan pada file `.env`.

4. Jalankan aplikasi dengan salah satu perintah berikut:

   - Menggunakan Nodemon (untuk pengembangan):

     ```bash
     npm run dev
     ```

   - Menggunakan Node.js:

     ```bash
     npm run start
     ```

## Pengujian

Aplikasi ini dilengkapi dengan pengujian menggunakan Supertest dan Jest. Untuk menjalankan pengujian, jalankan perintah berikut:

```bash
npm run test
```

## Kontribusi

Anda sangat dipersilakan untuk berkontribusi pada proyek ini dengan mengirimkan permintaan tarik (pull request) atau melaporkan masalah (issue) yang Anda temui.
