const Joi = require("joi");
const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Kullanıcıdan alınacak bilgilerin kuralları
const kullaniciKurallari = Joi.object({
    ad: Joi.string().min(2).required(),
    yas: Joi.number().integer().min(18).required(),
    email: Joi.string().email().required()
});

// Kullanıcıdan bilgileri al
rl.question("Adınız: ", (ad) => {
    rl.question("Yaşınız: ", (yas) => {
        rl.question("E-posta adresiniz: ", (email) => {

            const kullanici = {
                ad: ad,
                yas: Number(yas),
                email: email
            };

            // Bilgileri doğrula
            const sonuc = kullaniciKurallari.validate(kullanici);

            if (sonuc.error) {
                console.log("Hatalı bilgi:", sonuc.error.details[0].message);
            } else {
                console.log("Kullanıcı bilgileri geçerli!");
                console.log(kullanici);
            }

            rl.close();
        });
    });
});