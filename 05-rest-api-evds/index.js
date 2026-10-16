require("dotenv").config();

const express = require("express");
const app = express();

const PORT = 3000;
const API_KEY = process.env.API_KEY;

const tarihFormat = (d) =>
    `${String(d.getDate()).padStart(2, "0")}-${String(d.getMonth() + 1).padStart(2, "0")}-${d.getFullYear()}`;

app.get("/doviz", async (req, res) => {
    try {
        if (!API_KEY) {
            return res.status(500).json({
                hata: "API anahtarı .env dosyasında bulunamadı."
            });
        }

        const bitis = new Date();
        const baslangic = new Date();
        baslangic.setDate(bitis.getDate() - 10);

        const seriler =
            "TP.DK.USD.A-TP.DK.EUR.A-TP.DK.GBP.A";

        const url =
            `https://evds3.tcmb.gov.tr/igmevdsms-dis/series=${seriler}` +
            `&startDate=${tarihFormat(baslangic)}` +
            `&endDate=${tarihFormat(bitis)}&type=json`;

        const cevap = await fetch(url, {
            headers: { key: API_KEY }
        });

        if (!cevap.ok) {
            throw new Error(`TCMB API hatası: ${cevap.status}`);
        }

        const veri = await cevap.json();
        const items = veri.items || [];

        const son = [...items].reverse().find((item) =>
            item.TP_DK_USD_A &&
            item.TP_DK_EUR_A &&
            item.TP_DK_GBP_A
        );

        if (!son) {
            return res.status(404).json({
                hata: "Uygun döviz verisi bulunamadı."
            });
        }

        res.json({
            tarih: son.Tarih,
            dolar: Number(son.TP_DK_USD_A),
            euro: Number(son.TP_DK_EUR_A),
            sterlin: Number(son.TP_DK_GBP_A)
        });

    } catch (hata) {
        console.error(hata);

        res.status(500).json({
            hata: "Döviz kurları alınamadı. API ayarlarını kontrol edin."
        });
    }
});

app.listen(PORT, () => {
    console.log(`Sunucu http://localhost:${PORT} adresinde çalışıyor.`);
});