
const { createClient } = require("redis");

const redis = createClient({
    url: "redis://localhost:6379"
});

redis.on("error", (err) => {
    console.error("Redis hatası:", err);
});

async function main() {
    await redis.connect();

    console.log("Redis bağlantısı başarılı!");

    // Veriyi 10 saniyelik süreyle kaydet
    await redis.set("ogrenci", "Zeynep", {
        EX: 10
    });

    console.log("Veri kaydedildi.");

    // Verinin mevcut olup olmadığını kontrol et
    console.log("İlk okuma:", await redis.get("ogrenci"));

    // 11 saniye bekle
    await new Promise(resolve => setTimeout(resolve, 11000));

    // Tekrar oku
    console.log("11 saniye sonraki okuma:", await redis.get("ogrenci"));

    await redis.quit();
}

main().catch(console.error);
