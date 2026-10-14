const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question("Birinci sayıyı gir: ", (cevap1) => {
    const sayi1 = Number(cevap1);

    rl.question("İkinci sayıyı gir: ", (cevap2) => {
        const sayi2 = Number(cevap2);

        console.log("Toplama:", sayi1 + sayi2);
        console.log("Çıkarma:", sayi1 - sayi2);
        console.log("Çarpma:", sayi1 * sayi2);
        console.log("Bölme:", sayi2 !== 0 ? sayi1 / sayi2 : "Sıfıra bölünemez!");

        rl.close();
    });
});