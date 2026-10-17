
const { Queue, Worker } = require("bullmq");

// Redis bağlantı ayarları
const connection = {
    host: "127.0.0.1",
    port: 6379
};

// İş kuyruğunu oluştur
const gorevKuyrugu = new Queue("gorevler", { connection });

// Kuyruktaki işleri çalıştıran worker
const worker = new Worker(
    "gorevler",
    async (job) => {
        console.log("İşleniyor:", job.data.gorev);

        // İşlemin yapıldığını simüle et
        await new Promise(resolve => setTimeout(resolve, 2000));

        console.log("Tamamlandı:", job.data.gorev);
    },
    { connection }
);

async function main() {
    // Kuyruğa üç iş ekle
    await gorevKuyrugu.add("gorev-1", {
        gorev: "Birinci görevi tamamla"
    });

    await gorevKuyrugu.add("gorev-2", {
        gorev: "İkinci görevi tamamla"
    });

    await gorevKuyrugu.add("gorev-3", {
        gorev: "Üçüncü görevi tamamla"
    });

    console.log("Üç görev kuyruğa eklendi.");
}

main().catch(console.error);

// Programı güvenli şekilde kapat
async function kapat() {
    await worker.close();
    await gorevKuyrugu.close();
    process.exit(0);
}

process.on("SIGINT", kapat);
