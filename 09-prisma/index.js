const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
    const email = "kurtzeyneptugba@gmail.com";

    // 1. Öğrenci var mı kontrol et
    let ogrenci = await prisma.ogrenci.findUnique({
        where: { email: email }
    });

    // 2. Yoksa ekle, varsa mevcut kaydı kullan
    if (!ogrenci) {
        ogrenci = await prisma.ogrenci.create({
            data: {
                ad: "Zeynep",
                yas: 20,
                email: email
            }
        });

        console.log("Yeni öğrenci eklendi:", ogrenci);
    } else {
        console.log("Öğrenci zaten kayıtlı:", ogrenci);
    }

    // 3. Öğrencileri listele
    const ogrenciler = await prisma.ogrenci.findMany();
    console.log("Tüm öğrenciler:", ogrenciler);

    // 4. Öğrencinin yaşını güncelle
    const guncellenen = await prisma.ogrenci.update({
        where: { email: email },
        data: { yas: 21 }
    });

    console.log("Güncellenen öğrenci:", guncellenen);
}

main()
    .catch((hata) => {
        console.error("Hata oluştu:", hata);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });