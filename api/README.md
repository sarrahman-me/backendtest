# Aplikasi Autentikasi Node.js dengan Express.js

Aplikasi ini adalah API untuk autentikasi pengguna menggunakan Node.js dengan Express.js sebagai framework dan PostgreSQL sebagai database. Ini adalah panduan singkat untuk menjalankan, menguji, dan mengkonfigurasi aplikasi ini.

## Menjalankan Aplikasi

### Persyaratan

Untuk menjalankan aplikasi ini, Anda memiliki dua opsi:

#### Opsi 1: Menggunakan Docker (Disarankan)

**Sangat disarankan** untuk menggunakan Docker. Docker adalah cara termudah dan paling aman untuk menjalankan aplikasi ini tanpa masalah konfigurasi. Jika Anda belum memiliki Docker, Anda dapat mengunduhnya dari [situs resmi Docker](https://www.docker.com/get-started).

1. Buka terminal dan arahkan ke direktori aplikasi ini.
2. Jalankan perintah berikut untuk memulai layanan Docker:

   ```bash
   docker-compose up
   ```

   Aplikasi ini akan berjalan di port 5000.

**Catatan**: Menggunakan Docker sangat disarankan untuk menghindari kesalahan tak terduga.

#### Opsi 2: Tanpa Docker

Jika Anda memilih **tidak menggunakan Docker**, pastikan Anda memiliki PostgreSQL terinstal di komputer Anda dan telah membuat database dengan nama "users" Selain itu, Anda perlu mengatur beberapa konfigurasi di file `.env`.

1. Buka file `.env` dan temukan baris berikut:

   ```env
   DB_HOST=postgres
   ```

2. Berikan tanda pagar (#) pada awal baris ini untuk mengkomentari baris tersebut:

   ```env
   # DB_HOST=postgres
   ```

3. Simpan perubahan pada file `.env`.

4. Pastikan database PostgreSQL berjalan sebelum melakukan pengujian.

5. Jalankan aplikasi dengan salah satu perintah berikut:

   - Menggunakan Nodemon (untuk pengembangan):

     ```bash
     npm run dev
     ```

   - Menggunakan Node.js:

     ```bash
     npm run start
     ```

## Pengujian

Aplikasi ini dilengkapi dengan pengujian menggunakan Supertest dan Jest. Sebelum melakukan pengujian, pastikan database PostgreSQL telah berjalan.

Untuk menjalankan pengujian, jalankan perintah berikut:

```bash
npm run test
```

## Kontribusi

Anda sangat dipersilakan untuk berkontribusi pada proyek ini dengan mengirimkan permintaan tarik (pull request) atau melaporkan masalah (issue) yang Anda temui.
