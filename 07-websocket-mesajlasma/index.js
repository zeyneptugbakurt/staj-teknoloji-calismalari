const express = require("express");
const http = require("http");
const WebSocket = require("ws");

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

const PORT = 3002;

// Kullanıcıya mesajlaşma sayfasını gönder
app.get("/", (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html lang="tr">
        <head>
            <meta charset="UTF-8">
            <title>WebSocket Mesajlaşma</title>
        </head>
        <body>
            <h1>WebSocket Mesajlaşma</h1>

            <input id="mesaj" placeholder="Mesajınızı yazın">
            <button id="gonder">Gönder</button>

            <h3>Mesajlar</h3>
            <ul id="mesajlar"></ul>

            <script>
                const ws = new WebSocket("ws://localhost:3002");

                const mesajKutusu = document.getElementById("mesaj");
                const gonderButonu = document.getElementById("gonder");
                const mesajListesi = document.getElementById("mesajlar");

                ws.onopen = () => {
                    console.log("WebSocket bağlantısı kuruldu.");
                };

                ws.onmessage = (event) => {
                    const li = document.createElement("li");
                    li.textContent = event.data;
                    mesajListesi.appendChild(li);
                };

                gonderButonu.onclick = () => {
                    const mesaj = mesajKutusu.value.trim();

                    if (mesaj && ws.readyState === WebSocket.OPEN) {
                        ws.send(mesaj);
                        mesajKutusu.value = "";
                    }
                };

                mesajKutusu.addEventListener("keydown", (event) => {
                    if (event.key === "Enter") {
                        gonderButonu.click();
                    }
                });
            </script>
        </body>
        </html>
    `);
});

// Yeni WebSocket bağlantısı kurulduğunda
wss.on("connection", (socket) => {
    console.log("Yeni bir kullanıcı bağlandı.");

    socket.on("message", (veri) => {
        const mesaj = veri.toString();

        if (!mesaj.trim() || mesaj.length > 500) {
            return;
        }

        console.log("Gelen mesaj:", mesaj);

        // Mesajı bağlı tüm kullanıcılara gönder
        wss.clients.forEach((istemci) => {
            if (istemci.readyState === WebSocket.OPEN) {
                istemci.send(mesaj);
            }
        });
    });

    socket.on("close", () => {
        console.log("Bir kullanıcının bağlantısı kapandı.");
    });
});

server.listen(PORT, () => {
    console.log(`Sunucu http://localhost:${PORT} adresinde çalışıyor.`);
});