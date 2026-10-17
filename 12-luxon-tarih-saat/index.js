
const { DateTime } = require("luxon");

// Şu anki tarih ve saat
const simdi = DateTime.now();

console.log("Şu an:", simdi.toFormat("dd.MM.yyyy HH:mm"));

// Belirli bir tarih oluştur
const tarih = DateTime.fromISO("2026-10-20");

console.log("Belirlenen tarih:", tarih.toFormat("dd.MM.yyyy"));

// Tarihe 5 gün ekle
const yeniTarih = tarih.plus({ days: 5 });

console.log("5 gün sonrası:", yeniTarih.toFormat("dd.MM.yyyy"));

// İki tarih arasındaki gün farkı
const baslangic = DateTime.fromISO("2026-10-01");
const bitis = DateTime.fromISO("2026-10-20");

const fark = bitis.diff(baslangic, "days").days;

console.log("Gün farkı:", fark);
