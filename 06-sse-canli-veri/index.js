const express = require("express");

const app = express();
const PORT = 3001;

// Tarayıcıya basit bir HTML sayfası gönder
app.get("/", (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html lang="tr">
        <head>
            <meta charset="UTF-8">
            <title>Canlı Veri Akışı</title>
        </head>
        <body>
            <h1>Canlı Sayaç</h1>
            <p>Sunucudan gelen sayı: <strong id="sayi">Bekleniyor...</strong></p>

            <script>
                const olaylar = new EventSource("/olaylar");

                olaylar.onmessage = (event) => {
                    document.getElementById("sayi").textContent = event.data;
                };
            </script>
        </body>
        </html>
    `);
});

// SSE bağlantısı
app.get("/olaylar", (req, res) => {
    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");

    let sayi = 0;

    const zamanlayici = setInterval(() => {
        sayi++;

        res.write(`data: ${sayi}\n\n`);
    }, 1000);

    // Tarayıcı bağlantıyı kapatınca zamanlayıcıyı temizle
    req.on("close", () => {
        clearInterval(zamanlayici);
    });
});

app.listen(PORT, () => {
    console.log(`Sunucu http://localhost:${PORT} adresinde çalışıyor.`);
});