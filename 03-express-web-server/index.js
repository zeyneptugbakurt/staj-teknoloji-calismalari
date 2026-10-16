const express = require("express");

const app = express();
const PORT = 3000;

// Ana sayfa
app.get("/", (req, res) => {
    res.send("Merhaba! Express sunucum çalışıyor.");
});

// Hakkımda sayfası
app.get("/hakkimda", (req, res) => {
    res.send("Ben bir bilgisayar mühendisliği öğrencisiyim.");
});

// Sunucuyu başlat
app.listen(PORT, () => {
    console.log(`Sunucu http://localhost:${PORT} adresinde çalışıyor.`);
});