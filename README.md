# :bulb: PDF to Image Converter

Repository ini berisi projek aplikasi berbasis web yang melakukan konversi file PDF menjadi gambar berformat JPG.

[Klik disini](https://espeka.vercel.app) untuk melihat demo aplikasi.

## :package: Prasyarat

Sebelum memulai, pastikan telah terinstall beberapa tools:
* Text editor
* Web browser
* Web server
* PHP
* Imagick Library
* Ghostscript

## :cd: Menginstall Aplikasi

Untuk menginstall aplikasi ini, ikuti langkah berikut:

```bash
# clone this repository
git clone https://github.com/kunkoder/pdf-image-converter.git

# change working directory
cd pdf-image-converter
```

## :open_file_folder: Struktur Projek

```text
├── css
│   ├── atlantis.min.css
│   ├── bootstrap.min.css
│   └── custom.css
├── img
│   ├── bg-math.png
│   ├── icon.ico
│   ├── gemapp-secondary.png
│   ├── gemapp-white.png
│   └── gemapp.svg
├── js
│   ├── atlantis.min.js
│   ├── bootstrap.min.js
│   ├── fontawesome.min.js
│   ├── jquery.min.js
│   └── popper.min.js
├── index.php
└── sw.js
```

>Note: file `sw.js` berisi service worker yang dapat diaktifkan di file `listener.js`.

## :computer: Menjalankan Aplikasi

Menggunakan web server php. Jalankan perintah `php -S localhost:8000` lalu buka [web browser](http://localhost:8000).

**Home**
![alt text](https://raw.githubusercontent.com/kunkoder/pdf-image-converter/main/img/home.png)

**Konversi**
![alt text](https://raw.githubusercontent.com/kunkoder/pdf-image-converter/main/img/converted.png)

## :balance_scale: Lisensi

[MIT License](https://github.com/kunkoder/espeka/blob/main/LICENSE)
