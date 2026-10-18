# Luxon ile Tarih ve Saat İşlemleri

Bu proje, JavaScript'te tarih ve saat işlemlerini kolaylaştıran **Luxon** kütüphanesini öğrenmek amacıyla hazırlanmıştır. Projede güncel tarih ve saat gösterme, tarih biçimlendirme, tarihe gün ekleme ve iki tarih arasındaki gün farkını hesaplama işlemleri gerçekleştirilmiştir.

## Kullanılan Teknolojiler

- **JavaScript:** Programlama dili
- **Node.js:** JavaScript kodunu çalıştırmak için
- **Luxon:** Tarih ve saat işlemleri için kullanılan kütüphane
- **npm:** Paket yönetimi

## ⚙️ Kurulum

Projeyi çalıştırmak için terminalde aşağıdaki komutları sırasıyla çalıştırın:

```bash
npm init -y
npm install luxon
```

## ▶️ Projeyi Çalıştırma

Terminalde proje klasörüne girdikten sonra şu komutu çalıştırın:

```bash
node index.js
```

## Uygulanan İşlemler

1. **Güncel tarih ve saat:** `DateTime.now()` ile mevcut tarih ve saat alınır.
2. **Tarih biçimlendirme:** `toFormat()` ile tarih, `dd.MM.yyyy` ve saat, `HH:mm` biçiminde gösterilir.
3. **Belirli bir tarih oluşturma:** `DateTime.fromISO()` ile ISO formatındaki tarih metni tarih nesnesine dönüştürülür.
4. **Tarihe gün ekleme:** `plus({ days: 5 })` ile belirli bir tarihe 5 gün eklenir.
5. **İki tarih arasındaki gün farkı:** `diff()` metodu ile iki tarih arasındaki gün farkı hesaplanır.

## 📋 Örnek Çıktı

```text
Şu an: 17.10.2026 14:30
Belirlenen tarih: 20.10.2026
5 gün sonrası: 25.10.2026
Gün farkı: 19
```